// Uses the existing BEU Telegram relay. No bot credentials or signup database.
const relay='https://app.beudeveloper.in/api/telemetry';
const attempts=new Map();
const sources=new Set(['BEU Developer','BEU Exam Dost Web/PWA']);
const reply=(status,body)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export function validate(input){
 if(!input||typeof input!=='object'||Array.isArray(input))return {error:'Invalid signup.'};
 const name=typeof input.name==='string'?input.name.trim():'';
 const email=typeof input.email==='string'?input.email.trim():'';
 if(typeof input.website_url==='string'&&input.website_url.trim())return {error:'Unable to process this request.'};
 if(name.length<2||name.length>90||/[\u0000-\u001f\u007f<>]/.test(name))return {error:'Please enter a valid name.'};
 if(email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))return {error:'Please enter a valid email address.'};
 if(!sources.has(input.website))return {error:'Invalid website source.'};
 if(input.consent!==true)return {error:'Please agree to receive updates.'};
 return {name,email,website:input.website};
}
export async function handle(request,send=fetch){
 if(request.method!=='POST')return reply(405,{error:'Method not allowed.'});
 const url=new URL(request.url),origin=request.headers.get('origin');
 if(origin&&origin!==url.origin&&!['https://beudeveloper.in','https://www.beudeveloper.in','https://app.beudeveloper.in'].includes(origin))return reply(403,{error:'Origin not allowed.'});
 if(!(request.headers.get('content-type')||'').startsWith('application/json'))return reply(415,{error:'Please send JSON.'});
 const now=Date.now(),ip=request.headers.get('x-real-ip')||'unknown';
 for(const [key,item]of attempts)if(now-item.since>3600000)attempts.delete(key);
 const item=attempts.get(ip)||{since:now,count:0};item.count++;attempts.set(ip,item);
 if(item.count>8)return reply(429,{error:'Too many attempts. Please try again later.'});
 let body;try{const text=await request.text();if(new TextEncoder().encode(text).length>4096)return reply(413,{error:'Request is too large.'});body=JSON.parse(text);}catch{return reply(400,{error:'Invalid request body.'});}
 const signup=validate(body);if(signup.error)return reply(400,{error:signup.error});
 const payload={event:'help_request',device:{os:'Other',appMode:'web'},help:{name:signup.name,college:signup.website,branch:'Early access',category:'Early-preview signup',subject:signup.website,message:`Email: ${signup.email}\nSource: ${signup.website}\nOpted in: Yes\nSubmitted: ${new Date().toISOString()}`}};
 try{
  const response=await send(relay,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(9000)});
  const result=await response.json().catch(()=>null);
  if(!response.ok||result?.ok!==true)return reply(502,{error:'We could not deliver your signup. Please try again later.'});
  return reply(200,{ok:true});
 }catch{return reply(502,{error:'Could not reach the signup service. Please try again later.'});}
}
export default {fetch(request){return handle(request);}};
