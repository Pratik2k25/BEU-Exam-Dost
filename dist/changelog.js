// dist/changelog.js
// ─────────────────────────────────────────────────────────────────────────────
// In-app update changelog for BEU Exam Dost.
// Each entry appears as a dismissible notification card.
// Add newest entries at the TOP of the array.
// Fields:
//   id        — unique string, used as localStorage dismiss key
//   date      — actual issue time, ISO 8601 with UTC offset (never Date.now() in the UI)
//   version   — release SemVer
//   historical — old card: date recovered from its feature/release Git commit
//   type      — 'content' | 'feature' | 'fix' | 'announcement'
//   title     — short headline
//   body      — 1–3 sentence description for students
//   badge     — optional badge label override (defaults to type)
// ─────────────────────────────────────────────────────────────────────────────

export const changelog = [
  {
    id: 'v0.3.0-solutions-all',
    date: '2026-10-24T15:55:07+05:30',
    version: '0.3.0',
    historical: true,
    type: 'content',
    title: '📚 Model Answers Added for All 6 Subjects',
    body: 'Detailed 7-mark model answers with marking schemes, diagrams, and exam tips are now available for CN, COA, FLAT, DBMS, DAA, and ETC. Tap any Important Question to read the full solution.',
    badge: 'New Content',
  },
  {
    id: 'v0.3.0-pyq-tabs',
    date: '2026-10-24T13:28:36+05:30',
    version: '0.3.0',
    historical: true,
    type: 'feature',
    title: '🗂️ Original PYQs and Important Questions Separated',
    body: 'The PYQs section now has two category tabs — Original PYQs (verified papers with year and paper code) and Important 7-Mark Questions (prediction-based study questions). Filter by year or unit for quick revision.',
    badge: 'New Feature',
  },
  {
    id: 'v0.3.0-semver',
    date: '2026-10-24T15:55:07+05:30',
    version: '0.3.0',
    historical: true,
    type: 'fix',
    title: '⚙️ App Version Updated to v0.3.0',
    body: 'This release bumps the app to v0.3.0 with strict version verification across all sources. All 48 automated tests pass. Check your profile footer to confirm you are running the latest build.',
    badge: 'Release',
  },
  {
    id: 'v0.2.3-planner-exam',
    date: '2026-10-23T15:59:29+05:30',
    version: '0.2.3',
    historical: true,
    type: 'content',
    title: '📅 BEU 4th Sem Exam Routine Added',
    body: 'The official BEU October–November exam schedule for all 6 papers (CN, COA, FLAT, DBMS, DAA, ETC) is now live in the Study Planner. Countdown timers update daily.',
    badge: 'Content',
  },
  {
    id: 'v0.2.3-offline',
    date: '2026-10-23T16:04:21+05:30',
    version: '0.2.3',
    historical: true,
    type: 'feature',
    title: '📶 Offline-First PWA Improvements',
    body: 'The service worker now pre-caches all question and solution modules. Once loaded once, the entire app works without any internet connection.',
    badge: 'Feature',
  },
];
