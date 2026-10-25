import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {changelog} from '../dist/changelog.js';
import {claimNewNotifications,formatNotifDate,sortNotifications,SEEN_NOTIFICATIONS_KEY} from '../dist/notifications.js';

function storage(){const values=new Map();return {getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};}

test('notification dates show the original instant in IST with a date and time',()=>{
 assert.equal(formatNotifDate('2026-10-24T10:25:07Z'),formatNotifDate('2026-10-24T15:55:07+05:30'));
 assert.match(formatNotifDate('2026-10-24T10:25:07Z'),/24 Oct 2026.*3:55:07 pm IST/i);
 assert.equal(formatNotifDate('bad'),'Date unavailable');
});

test('notification inbox sorts by issue time without mutating its input',()=>{
 const entries=[{id:'old',date:'2026-10-23T16:04:21+05:30'},{id:'new',date:'2026-10-24T15:55:07+05:30'}];
 assert.deepEqual(sortNotifications(entries).map(n=>n.id),['new','old']);
 assert.equal(entries[0].id,'old');
});

test('first upgrade seeds old cards but alerts for the new approved published card once',()=>{
 const store=storage();const entries=[{id:'legacy-test',historical:true,date:'2026-10-23T16:04:21+05:30'},{id:'fresh-test',date:'2026-10-25T07:00:00Z',version:'0.5.2'}];
 assert.deepEqual(claimNewNotifications(entries,store).map(n=>n.id),['fresh-test']);
 assert.deepEqual(claimNewNotifications(entries,store),[]);
 assert.deepEqual(JSON.parse(store.getItem(SEEN_NOTIFICATIONS_KEY)),['legacy-test','fresh-test']);
 assert.equal(store.getItem('exam-dost-dismissed-notifs'),null);
 assert.equal(entries.length,2);
});

test('a later content release is announced even when prior releases are already seen',()=>{
 const store=storage();const first={id:'release-one-test',date:'2026-10-25T07:00:00Z'};
 claimNewNotifications([first],store);
 const next={id:'release-two-test',date:'2026-10-25T08:00:00Z'};
 assert.deepEqual(claimNewNotifications([first,next],store).map(n=>n.id),['release-two-test']);
});

test('blocked storage does not replay the same alert on every render',()=>{
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 const entry={id:'blocked-storage-test',date:'2026-10-25T07:00:00Z'};
 assert.equal(claimNewNotifications([entry],blocked).length,1);
 assert.equal(claimNewNotifications([entry],blocked).length,0);
});

test('historical cards have timezone-aware release timestamps and strict versions',()=>{
 for(const entry of changelog){
  assert.match(entry.date,/(Z|[+-]\d\d:\d\d)$/);
  assert.ok(Number.isFinite(Date.parse(entry.date)));
  assert.match(entry.version,/^\d+\.\d+\.\d+$/);
 }
 assert.ok(new Set(changelog.map(n=>n.date)).size>1);
});

test('question cards omit source scan links and notifications use machine-readable timestamps',()=>{
 const app=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
 assert.doesNotMatch(app,/questionSourceLink|sourceLink|source-link|View source scan/);
 assert.match(app,/<time class="notif-time" datetime=/);
 assert.match(app,/sortNotifications\(changelog\)/);
});
