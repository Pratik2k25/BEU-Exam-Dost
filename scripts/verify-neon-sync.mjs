import { randomBytes } from 'node:crypto';
import pg from 'pg';
import syncApi from '../api/sync.js';
import { SyncClient, parsePairingLink } from '../dist/sync-client.js';
import { secureConnectionString } from '../api/_db.js';

const { Client } = pg;
const tempTag = randomBytes(6).toString('hex');
let accountId;
async function apiFetch(_url, options={}) {
  return syncApi.fetch(new Request('http://localhost/api/sync', {
    method: options.method || 'GET', headers: options.headers || {}, ...(options.body ? { body: options.body } : {}),
  }));
}
function makeClient() {
  const values = new Map();
  return new SyncClient({ origin:'https://app.beudeveloper.in', storage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)}, fetcher:apiFetch });
}
function assert(value,message){if(!value)throw new Error(message);}
const phone=makeClient(), pinDesktop=makeClient(), qrDesktop=makeClient();
const initial={profile:{name:`Temporary sync check ${tempTag}`},settings:{theme:'dark'},topics:{cn:{unit1:true}}};
try{
  const enrolled=await phone.enroll(initial,'Verification phone',true);accountId=enrolled.accountId;
  assert(enrolled.pendingReview===false,'primary enrollment failed');

  // Phone creates the PIN; desktop claims it; phone approves; desktop receives phone snapshot.
  const pin=await phone.beginPhonePairing('PIN verification desktop');
  assert(pin.code.length===4&&[...pin.code].every(c=>c>='0'&&c<='9'),'phone PIN generation failed');
  const claim=await pinDesktop.claimPairingCode(pin.code,'PIN verification desktop');
  assert(claim.method==='pin','desktop PIN claim failed');
  const claimed=await phone.phonePairingStatus();
  assert(claimed.status==='claimed','phone did not see desktop PIN claim');
  await phone.approvePhonePairing();
  assert((await pinDesktop.pairingStatus()).status==='approved','phone PIN approval failed');
  const pinSnapshot=await pinDesktop.completePairing();
  assert(JSON.stringify(pinSnapshot.snapshot)===JSON.stringify(initial),'PIN pairing did not transfer phone data');

  // QR scan path: desktop creates QR link; phone parses and approves; desktop loads linked state.
  const qr=await qrDesktop.beginPairing('QR verification desktop');
  const scanned=parsePairingLink(qr.link,'https://app.beudeveloper.in');
  assert(scanned?.sessionId===qr.sessionId,'desktop QR link is invalid');
  await phone.approvePairing(scanned.sessionId,scanned.requestCredential,scanned.publicKey);
  assert((await qrDesktop.pairingStatus()).status==='approved','phone QR approval failed');
  assert((await qrDesktop.completePairing()).status==='approved','QR snapshot transfer failed');

  // Writes from desktop are available to the primary app on its next sync cycle.
  const changed={...initial,topics:{cn:{unit1:true,unit2:true}}};
  await pinDesktop.sync(changed);
  const back=await phone.sync(initial);
  assert(back.data.topics.cn.unit2===true,'desktop changes did not sync back to the primary app');

  const listed=await phone.devices();
  assert(listed.length===3,'linked devices were not recorded');
  await phone.revoke(pinDesktop.metadata().deviceId);
  let revoked=false;try{await pinDesktop.sync(changed);}catch(error){revoked=error.status===401;}
  assert(revoked,'revoked desktop credentials were not rejected');
  await phone.deleteAccount();
  console.log('Neon sync verification passed: encrypted enrollment, phone-generated PIN claim/approval, QR scan approval, snapshot transfer, desktop-to-phone sync, device listing and revocation.');
} finally {
  const connectionString=process.env.DATABASE_URL_UNPOOLED||process.env.DATABASE_URL;
  if(connectionString&&accountId){const client=new Client({connectionString:secureConnectionString(connectionString),connectionTimeoutMillis:10000});try{await client.connect();await client.query('DELETE FROM exam_dost_sync_accounts WHERE account_id=$1',[accountId]);}finally{await client.end().catch(()=>{});}}
}
