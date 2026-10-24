// dist/changelog.js
// ─────────────────────────────────────────────────────────────────────────────
// In-app update changelog for BEU Exam Dost.
// Each entry appears as a dismissible notification card.
// Add newest entries at the TOP of the array.
// Fields:
//   id        — unique string, used as localStorage dismiss key
//   date      — ISO 8601 datetime string (shown to user)
//   type      — 'content' | 'feature' | 'fix' | 'announcement'
//   title     — short headline
//   body      — 1–3 sentence description for students
//   badge     — optional badge label override (defaults to type)
// ─────────────────────────────────────────────────────────────────────────────

export const changelog = [
  {
    id: 'v0.3.0-solutions-all',
    date: '2026-10-24T09:00:00',
    type: 'content',
    title: '📚 Model Answers Added for All 6 Subjects',
    body: 'Detailed 7-mark model answers with marking schemes, diagrams, and exam tips are now available for CN, COA, FLAT, DBMS, DAA, and ETC. Tap any Important Question to read the full solution.',
    badge: 'New Content',
  },
  {
    id: 'v0.3.0-pyq-tabs',
    date: '2026-10-24T09:00:00',
    type: 'feature',
    title: '🗂️ Original PYQs and Important Questions Separated',
    body: 'The PYQs section now has two category tabs — Original PYQs (verified papers with year and paper code) and Important 7-Mark Questions (prediction-based study questions). Filter by year or unit for quick revision.',
    badge: 'New Feature',
  },
  {
    id: 'v0.3.0-semver',
    date: '2026-10-24T09:00:00',
    type: 'fix',
    title: '⚙️ App Version Updated to v0.3.0',
    body: 'This release bumps the app to v0.3.0 with strict version verification across all sources. All 48 automated tests pass. Check your profile footer to confirm you are running the latest build.',
    badge: 'Release',
  },
  {
    id: 'v0.2.3-planner-exam',
    date: '2026-10-23T09:00:00',
    type: 'content',
    title: '📅 BEU 4th Sem Exam Routine Added',
    body: 'The official BEU April–May exam schedule for all 6 papers (CN, COA, FLAT, DBMS, DAA, ETC) is now live in the Study Planner. Countdown timers update daily.',
    badge: 'Content',
  },
  {
    id: 'v0.2.3-offline',
    date: '2026-10-23T09:00:00',
    type: 'feature',
    title: '📶 Offline-First PWA Improvements',
    body: 'The service worker now pre-caches all question and solution modules. Once loaded once, the entire app works without any internet connection.',
    badge: 'Feature',
  },
];
