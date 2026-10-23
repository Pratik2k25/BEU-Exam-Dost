// BEU routine issued 22 October 2026, Exam IDs 260104 / 260204.
// Verified against the supplied four-page university PDF (pages 1–4).
export const examSession=Object.freeze({start:'14:00',end:'17:00',timeZone:'Asia/Kolkata',label:'2:00 PM – 5:00 PM',issued:'2026-10-22',source:'./assets/exam-routine-2026.pdf'});
export const examSchedule=Object.freeze([
 {subject:'cn',date:'2026-10-29'},
 {subject:'coa',date:'2026-10-31'},
 {subject:'flat',date:'2026-11-02'},
 {subject:'dbms',date:'2026-11-03'},
 {subject:'daa',date:'2026-11-05'},
 {subject:'etc',date:'2026-11-07'}
].map(Object.freeze));
// Shared app content takes precedence over legacy dates in device backups.
export const examDates=Object.freeze(Object.fromEntries(examSchedule.map(e=>[e.subject,e.date])));
