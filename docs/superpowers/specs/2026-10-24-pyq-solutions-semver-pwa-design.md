# PYQ Solutions, Semantic Versioning, and PWA Release Design

**Date:** 2026-10-24  
**Status:** Awaiting written-spec review  
**Application:** BEU Exam Dost

## 1. Context

BEU Exam Dost currently has six subjects: Computer Networks (CN), Computer Organization & Architecture (COA), Formal Languages & Automata Theory (FLAT), Database Management Systems (DBMS), Design & Analysis of Algorithms (DAA), and Effective Technical Communication (ETC).

CN has 50 solution-bearing entries compiled from six hand-authored unit modules. The other five subjects have 88 listed 7-mark questions but no solutions: 15 COA, 18 FLAT, 16 DBMS, 21 DAA, and 18 ETC. The current list mixes paper-like year claims with syllabus-derived important questions, and the repository does not contain source records proving every claim. CN also contains 3-mark, 4-mark, and 14-mark entries inside a surface described as a 7-mark bank.

The existing release system already creates a content-derived build ID, produces a uniquely named service-worker cache, installs releases in the background, and waits for every open client to be safe before activation. The displayed application version comes from `package.json`, while `package-lock.json` is currently stale at `0.2.0` compared with application version `0.2.3`. CN content compilation is not yet part of the standard build command. The current Vercel build command invokes `node scripts/build.mjs` directly, so it also bypasses the repository's syntax checks, tests, and CN compiler.

## 2. Goals

1. Publish two truthful written-question collections for all six subjects:
   - source-traceable Original PYQs from 2022 through 2025;
   - syllabus-derived Important 7-Mark Questions.
2. Give every published question a correct, exam-ready solution using the established CN presentation style.
3. Use the same authoring and compilation method as CN for every subject.
4. Preserve offline operation, saved-question state, marked-question state, and stable question IDs.
5. Make content generation mandatory before checks and production builds.
6. Use strict Semantic Versioning for every user-facing production release.
7. Ensure every successful Git-connected deployment is discovered and safely installed by existing PWAs.

## 3. Non-goals

- Do not generate solutions at runtime or require an API connection.
- Do not present predicted or syllabus-derived questions as original PYQs.
- Do not invent paper years, question numbers, paper codes, verification labels, or examiner-approved marking schemes.
- Do not add authentication, analytics, a remote CMS, or cloud content storage.
- Do not force-refresh an active quiz, open dialog, or dirty form.
- Do not automatically infer a major, minor, or patch release from arbitrary commit text.
- Do not include 2026 as an original paper before that examination paper exists and is verified.

## 4. Source and Classification Rules

### 4.1 Original PYQ

An entry may be classified as `original` only when the exact question can be traced to an authentic paper source. Each original entry must record:

- examination year;
- paper or subject code;
- question number and subpart;
- exact marks;
- exact or faithfully normalized wording;
- source URL or bundled source-file reference;
- source type and verification status.

The preferred source order is:

1. Bihar Engineering University official Question Bank or official paper PDF;
2. a clear scan of the original paper supplied by the user;
3. a reputable archive scan whose paper identity can be cross-checked against an official examination programme.

If the source is incomplete or ambiguous, the entry stays out of the Original PYQ collection and is recorded in a coverage report. It may be included as an Important Question only when it is independently syllabus-aligned, without carrying the unsupported paper metadata.

### 4.2 Important 7-Mark Question

An entry may be classified as `important` when it is derived from the applicable syllabus, recurring concepts, and exam structure. It must:

- carry exactly 7 marks;
- identify its unit and syllabus topics;
- omit `years`, paper code, question number, and original-paper verification language;
- use a label such as `Important 7-Mark Question`;
- avoid promises that it will appear in an examination.

The 88 current non-CN questions begin in this category unless an authentic paper source promotes a particular occurrence into the Original PYQ collection.

### 4.3 Repeated Questions

Each distinct paper occurrence remains traceable. When multiple papers contain materially identical wording, occurrence metadata may point to a shared canonical question and `solutionRef`. This avoids duplicating a long solution while preserving year, paper code, question number, and wording for every source occurrence.

### 4.4 CN Audit

Existing CN entries must be audited under the same rules. Unsupported year labels move to Important Questions. Verified paper occurrences move to Original PYQs. Entries worth 3, 4, or 14 marks retain their true marks and are excluded from a filter that promises only 7-mark questions. A combined 14-mark question may expose independently sourced 7-mark subparts when the paper structure supports that split.

## 5. Content Architecture

### 5.1 Authoring Layout

Every subject follows the existing CN unit-module pattern:

```text
scripts/
  solutions/
    cn/unit1.mjs ... unit6.mjs
    coa/unit1.mjs ... unit6.mjs
    flat/unit1.mjs ... unit6.mjs
    dbms/unit1.mjs ... unit6.mjs
    daa/unit1.mjs ... unit6.mjs
    etc/unit1.mjs ... unit6.mjs
  questions/
    cn/original.mjs
    cn/important.mjs
    ...same pair for every subject...
  build-solutions.mjs
  validate-content.mjs
```

The existing flat CN unit files will be moved into `scripts/solutions/cn/` without changing their stable question IDs or solution output. A single orchestrator will compile all subjects using the same schema and validation logic. Generated browser modules remain under `dist/` and are included in the offline shell.

### 5.2 Generated Output

Each subject produces one generated browser module, for example:

```text
dist/solutions/cn-solutions.js
dist/solutions/coa-solutions.js
dist/solutions/flat-solutions.js
dist/solutions/dbms-solutions.js
dist/solutions/daa-solutions.js
dist/solutions/etc-solutions.js
```

`dist/data.js` imports the generated question and solution exports and exposes one normalized question list per subject. The UI consumes only this normalized shape and never imports authoring modules directly.

### 5.3 Question Schema

```js
{
  id: 'dbms-original-2024-105502-q5a',
  canonicalId: 'dbms-normalization-bcnf',
  kind: 'original', // or 'important'
  subject: 'dbms',
  unit: 2,
  question: '...',
  marks: 7,
  topics: ['normalization', 'BCNF'],
  source: {
    year: 2024,
    paperCode: '105502',
    questionNumber: '5(a)',
    url: 'https://...',
    verification: 'official'
  },
  solutionRef: 'dbms-sol-normalization-bcnf'
}
```

Important questions omit `source` and use stable IDs such as `dbms-important-q5`. Existing IDs are retained where possible so saved and marked state continues to work.

## 6. Solution Standard

Solutions use the established CN object shape:

- `verified` or an honest category label;
- `intro`;
- zero or more `diagrams` with title and ASCII representation;
- an optional comparison or calculation `table`;
- numbered `sections` containing point-wise explanation;
- `conclusion`;
- `markingScheme` whose numeric total equals the question marks;
- `examTip`.

The structure is consistent, but content adapts to each subject:

- **CN:** protocol stacks, packet flows, timing ladders, formulas, and network diagrams.
- **COA:** datapaths, register-transition tables, Boolean derivations, memory layouts, and pipeline timing.
- **FLAT:** transition tables, state diagrams, derivations, parse trees, instantaneous descriptions, and formal proofs.
- **DBMS:** schemas, ER diagrams, relational-algebra steps, normalization tables, schedules, and recovery traces.
- **DAA:** pseudocode, recurrence derivations, dry runs, DP tables, graphs, correctness reasoning, and complexity analysis.
- **ETC:** exam-ready document formats, structured examples, comparison tables, ethical reasoning, and concise professional language.

Diagrams and tables are included only when they improve the answer or are requested by the question. Numerical answers must show intermediate work and be independently recalculated. Formal proofs must state assumptions and reach the claimed conclusion. Marking schemes describe a reasonable model-answer allocation and must not be represented as an official BEU examiner rubric unless an official rubric is available.

## 7. User Experience

Each subject question-bank page receives two primary filters:

- `Original PYQs`
- `Important 7-Mark Questions`

Original PYQs also support year and unit filters. Important Questions support unit and saved-only filters. Every card displays its truthful category. Original cards display source metadata; important cards never display `Asked in` years.

The year-analysis table counts only verified original occurrences. Important questions do not influence recurrence claims. Saved and marked actions continue to use stable IDs. The solution panel keeps the existing CN rendering and styling, with responsive horizontal scrolling for wide ASCII diagrams and tables.

If an original occurrence shares a solution, opening it renders the canonical solution while retaining that occurrence's source details above the answer.

## 8. Build and Validation Flow

The standard local and deployment pipeline becomes:

```text
npm run build:content
  -> validate authored questions and solutions
  -> generate every dist/solutions/*.js module

npm run check
  -> validate source content and verify generated modules are current
  -> syntax-check source and generated modules
  -> fail when generated files are stale

npm test
  -> data, content, update, and existing core tests

npm run build
  -> build:content
  -> static build with content-derived build ID
  -> release.json and uniquely named service-worker cache

npm run release:build
  -> build:content
  -> npm run check
  -> npm test
  -> static build with content-derived build ID
  -> release.json and uniquely named service-worker cache
```

`vercel.json` must use `npm run release:build` as its build command. GitHub Actions must run the same release build, or the equivalent explicit sequence, so local CI and Vercel cannot disagree about whether a commit is releasable.

Content validation fails for:

- duplicate IDs;
- missing solution references;
- missing source metadata on original entries;
- paper metadata on important entries;
- marks other than 7 inside the Important 7-Mark collection;
- marking-scheme totals that do not equal question marks;
- malformed tables, diagrams, or solution sections;
- unknown subjects or units;
- unsupported verification labels;
- generated modules that do not match the authoring source.

## 9. Semantic Versioning

The application uses strict `MAJOR.MINOR.PATCH` versions only.

- **MAJOR:** incompatible changes to stored user data, backup format, or application contracts.
- **MINOR:** backward-compatible features or substantial new content, such as the complete multi-subject solution bank.
- **PATCH:** corrections, content fixes, accessibility improvements, and small backward-compatible behavior fixes.

`package.json` is the release-version source of truth. The same value must be synchronized to `package-lock.json`, injected into built `app-meta.js`, written to `release.json`, and displayed in the profile footer. The first complete solution-bank release is planned as `0.3.0`.

Version choice remains deliberate rather than being guessed from commit text. A CI version gate compares the current commit with its base/previous production commit. When user-facing files change, CI fails unless the SemVer value increases. Documentation-only, test-only, and internal workflow-only changes do not require a user-visible version bump.

For pull requests, the comparison version comes from the merge base with the production branch. For direct production-branch pushes, it comes from the previous commit in that push. The checkout must contain enough Git history to make this comparison; a missing comparison base is a CI failure rather than permission to skip the version gate.

The gate also fails when:

- the version is not valid SemVer;
- `package.json` and `package-lock.json` disagree;
- the new version is not greater than the comparison version;
- a release changes public state incompatibly without the required major-version decision.

## 10. PWA Deployment and Update Behaviour

The connected Vercel Git integration remains responsible for deployments:

- pushes to the production branch create production deployments;
- other branches create preview deployments;
- failed checks or failed builds do not become valid releases.

The existing content hash remains separate from the visible SemVer. SemVer communicates release meaning to users; the build ID guarantees cache uniqueness for every successful build.

On a successful deployment:

1. the build hashes the complete static output;
2. the service-worker cache name uses that build ID;
3. the complete new shell is downloaded before installation succeeds;
4. open clients vote on whether activation is safe;
5. active quizzes, open dialogs, and dirty forms defer activation;
6. user state is saved before the automatic reload;
7. the old complete cache remains usable if the new download fails.

Installed PWAs check for updates on launch, foreground return, restored connectivity, page show, and periodic checks while open. A fully closed or offline PWA updates on its next online launch; this is an inherent lifecycle boundary and must not be described as an instantaneous background update.

## 11. Testing and Verification

### 11.1 Automated

- Unit tests for classification and source rules.
- Unit tests for solution-reference resolution and stable IDs.
- Unit tests for marking-scheme arithmetic.
- Regression tests proving all 88 current non-CN important questions have solutions.
- Coverage assertions for every verified original 7-mark occurrence found in the selected 2022-2025 source set.
- Tests for CN 3-, 4-, 7-, and 14-mark filtering.
- Version-gate tests for major, minor, patch, invalid, unchanged, and lockfile-mismatch cases.
- Existing safe-update tests plus multi-tab, offline, dirty-form, open-dialog, and active-quiz cases.
- Syntax checks, complete test suite, and production build.

### 11.2 Browser

Verify at mobile and desktop widths:

- both question categories for all six subjects;
- unit, year, and saved filters;
- one expanded solution from every subject;
- wide diagrams and tables without page-level horizontal overflow;
- source metadata and category labels;
- marking-scheme totals;
- save/mark persistence after reload;
- displayed SemVer matching `release.json`;
- safe update activation and deferred update behaviour.

### 11.3 Content Review

Each subject receives a coverage report listing:

- sources examined;
- original 7-mark occurrences captured;
- unresolved or unreadable source gaps;
- important questions included;
- shared-solution mappings;
- numerical/formal answers independently checked.

No subject is reported complete until its authored modules, generated output, automated validations, and representative browser checks all pass.

## 12. Rollout Order

1. Establish normalized schemas, validators, content compiler, and CN migration.
2. Add Original/Important UI classification and filters.
3. Add strict SemVer synchronization and CI version gate.
4. Verify the existing service-worker release pipeline against the new generated outputs.
5. Research and record the 2022-2025 source inventory.
6. Complete subjects in dependency-light batches: COA, FLAT, DBMS, DAA, then ETC.
7. Run the full cross-subject content, build, browser, and update verification.
8. Release the completed solution-bank feature as `0.3.0` only after all acceptance criteria pass.

## 13. References

- BEU Question Bank: `https://beu-bih.ac.in/examination/question-bank`
- Vercel Git deployments: `https://vercel.com/docs/git`
- Vercel system environment variables: `https://vercel.com/docs/environment-variables/system-environment-variables`

## 14. Acceptance Criteria

The work is complete when:

- all six subjects expose separate Original PYQ and Important Question collections;
- every published question has a resolvable, exam-ready solution;
- all current 88 non-CN questions have 7-mark solutions;
- every captured 2022-2025 original question has traceable source metadata;
- no important question claims an unsupported occurrence year;
- CN non-7-mark entries are labelled and filtered correctly;
- the same unit-module compilation method is used for every subject;
- content compilation is mandatory and stale output cannot pass CI;
- the application and lockfile versions match and satisfy strict SemVer;
- every user-facing production change requires an increased release version;
- successful deployments generate a unique cache and installed PWAs update safely;
- syntax checks, automated tests, production build, and required browser checks pass;
- coverage reports disclose any unavailable or unreadable source papers without filling gaps by invention.
