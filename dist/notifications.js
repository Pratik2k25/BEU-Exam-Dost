// Only published entries belong in changelog.js; drafts stay outside the app.
export const SEEN_NOTIFICATIONS_KEY='exam-dost-seen-notifs-v1';
const sessionSeen=new Set();

export function sortNotifications(entries){
 return [...entries].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
}

export function formatNotifDate(iso){
 const date=new Date(iso);
 if(!Number.isFinite(date.getTime()))return 'Date unavailable';
 return new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true}).format(date)+' IST';
}

// Seeing an alert and dismissing a notification are independent actions.
// Old cards stay in the inbox, without replaying years of alerts on migration.
export function claimNewNotifications(entries,storage){
 let seen;
 try{const stored=JSON.parse(storage.getItem(SEEN_NOTIFICATIONS_KEY)||'[]');seen=new Set(Array.isArray(stored)?stored:[]);}catch{seen=new Set();}
 const fresh=sortNotifications(entries).filter(entry=>!entry.historical&&!seen.has(entry.id)&&!sessionSeen.has(entry.id));
 for(const entry of entries){seen.add(entry.id);sessionSeen.add(entry.id);}
 try{storage.setItem(SEEN_NOTIFICATIONS_KEY,JSON.stringify([...seen]));}catch{/* Session memory still prevents repeated alerts if storage is unavailable. */}
 return fresh;
}
