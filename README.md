# BEU Exam Dost

Account-free, offline-first study companion for Bihar Engineering University (BEU) B.Tech CSE students.

- **Web App (PWA):** [https://app.beudeveloper.in/](https://app.beudeveloper.in/)
- **Developer & Project Portal:** [https://beudeveloper.in/](https://beudeveloper.in/)
- **GitHub Repository:** [https://github.com/Pratik2k25/BEU-Exam-Dost](https://github.com/Pratik2k25/BEU-Exam-Dost)

## Run
Serve `dist/` using any static HTTPS host or localhost server. No dependencies or compilation are required. Run `npm test` and `npm run check` for core verification. The application routes use URL hashes; no server rewrites are required.

## Features
- First-launch local profile (name, searchable/typed college, CSE specialisation).
- Home, six-subject syllabus tracking, dedicated unit checklists, importance badges and matching progress colours.
- Written PYQs grouped by unit, save/mark state and whole-subject year occurrence table.
- Quiz type first, then subject, then year/set configuration. Active quiz has a timer, on-demand question dropdown, exit/resume and previous/next navigation.
- Results show correct/wrong/skipped, score, attempted accuracy, active time and serial answer/explanation review with per-question cumulative time.
- Planner with a shared read-only BEU exam routine, manual study tasks, daily availability, study slot/goal and optional automatic pending-task regeneration.
- Profile, light/dark appearance, local quiz history, export/import, privacy and browser installation guidance.
- Web manifest, local fonts/art, service worker offline shell.

## Data and storage
`dist/data.js` is the isolated demo-content adapter. Stable topic/question IDs preserve progress across content updates. Replace demo units/topics, quiz banks and written questions here. Do not describe demo MCQs as actual sourced PYQs. The supplied sample year cards deliberately reuse demo questions for UI review.
`dist/core.js` owns pure score, timing, backup, planner and year-count logic.
`dist/app.js` owns routes and interaction state. Browser localStorage key: `exam-dost-v1`; exports use `{app:'exam-dost',version:1,state}`.

No name/college/branch is transmitted. No analytics or student-record service is configured. Wire the chosen provider only after endpoint/account configuration and the privacy disclosure are finalized. Do not put provider administrative credentials in frontend code.

## Timing semantics
Only foreground active quiz time counts. Revisits accumulate on the relevant question. Save & exit pauses the attempt. No wall-clock expiry runs in the background. The configured countdown therefore measures active study time, not a proctored exam deadline. Confirmation dialogs pause timing; cancel resumes it.

## PWA / APK
Use HTTPS for service workers and installation. APK/AAB packaging has not been done. It requires final public hosting, package identity, signing keys and Digital Asset Links. Install UI honestly marks APK unavailable. Sites' private review audience is a hosting gate, not app authentication. Final no-gate hosting can be selected after review.

## Source map
- `dist/index.html`, `style.css`: shell, responsive design tokens, shared bottom safe-area offset.
- `dist/assets`: local generated study art, custom vector logo, icons and Outfit font (OFL).
- `dist/manifest.webmanifest`, `sw.js`: install/offline shell.
- `tests/core.test.mjs`: meaningful edge-case coverage.

The live review uses real zero-based progress, never invented personal scores. Only content examples carry demo labels. Browser data can be lost when storage is cleared; regular exports are recommended.

The verified exam routine is maintained in `dist/schedule.js`, with the supplied source PDF bundled at `dist/assets/exam-routine-2026.pdf`. All six papers use the same 2–5 PM IST session. Home countdowns and study-plan priority read this shared module; legacy device/backup exam dates are retained for compatibility but ignored by these features.

## Automatic releases (v0.2)

GitHub source: https://github.com/Pratik2k25/BEU-Exam-Dost

The connected Vercel project deploys `main` automatically; other branches produce previews. Every deployment runs syntax checks, tests, and `npm run build`. The build hashes all bundled content and writes a unique worker cache, versioned entry URLs, and `build/release.json`. No manually incremented service-worker cache constant is needed.

Installed PWAs check the uncached release manifest on launch, return to the foreground, connectivity restoration, and every five seconds while visible and online. A complete release is cached before activation, and local state is saved before one automatic reload. Active quizzes, open dialogs and unsaved forms defer that window's reload. Hidden windows do not block a safe foreground window from updating. Failed downloads retain the previous complete offline release. Offline or fully closed apps receive updates on their next online session.

Source scans are retained as development evidence and excluded from public releases and offline downloads. See `AGENTS.md` for the required approval process before issuing any release or content notification. Notification cards store a fixed, timezone-aware issue timestamp; historical timestamps use verified feature-release commits. Future approved alerts appear once per device and remain in the Notifications page until dismissed. The user explicitly waived a new notification for version 0.5.2.

`dist/` is editable source. `build/` is generated and ignored. Run `npm run check`, `npm test`, then `npm run build`. The GitHub workflow runs the same checks, while `vercel.json` makes passing checks part of the actual deployment build.

The original ChatGPT Sites URL and a Git-connected Vercel URL are separate origins. Browser-local data does not move across origins: use Profile → Export backup on the old URL and Import backup on the new URL. Once using the new origin, subsequent automatic releases preserve its local data.
