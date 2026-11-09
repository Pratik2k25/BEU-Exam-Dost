import {handle} from '../api/early-access.js';
for(const website of ['BEU Developer','BEU Exam Dost Web/PWA']){
const response=await handle(new Request('https://app.beudeveloper.in/api/early-access',{method:'POST',headers:{'Content-Type':'application/json','x-real-ip':'deployment-check-'+website},body:JSON.stringify({name:'BEU deployment verification',email:'deployment-test@example.com',website,consent:true,website_url:''})}));
const result=await response.json();
console.log(JSON.stringify({check:'real-telegram-delivery',source:website,status:response.status,confirmed:response.ok&&result.ok===true}));
if(!response.ok||result.ok!==true)throw Error('Telegram delivery verification failed.');
}
