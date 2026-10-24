# Content and Release Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a source-first question/solution compiler, truthful Original-versus-Important UI, strict SemVer release gate, and mandatory safe PWA release pipeline.

**Architecture:** Keep authored questions and solutions in subject/unit ES modules under `scripts/`, validate them with shared pure functions, and generate browser-ready modules under `dist/solutions/`. Preserve the current static PWA and service-worker update protocol, while routing GitHub and Vercel through one tested release command.

**Tech Stack:** Node.js 22 ES modules, Node test runner, static HTML/CSS/JavaScript, service workers, GitHub Actions, Vercel Git deployments.

**Depends on:** `docs/superpowers/specs/2026-10-24-pyq-solutions-semver-pwa-design.md`

**Execution workspace:** Before Task 1, invoke `superpowers:using-git-worktrees` and create an isolated feature worktree on branch `feat/pyq-solutions-v0.3.0`.

## Approved-Spec Traceability

- Source truth and Original-versus-Important classification: foundation Tasks 1-8, then content-rollout Tasks 1-3 and 9.
- Shared CN-style authoring and compilation for all six subjects: foundation Tasks 1-6, then content-rollout Tasks 3-9.
- Complete solutions for the existing 88 non-CN questions: foundation Task 4 establishes full first-pass coverage; content-rollout Tasks 4-9 independently test and correct every subject.
- Exact 2022-2025 Original PYQ coverage without invented metadata: content-rollout Tasks 1-3 and 9.
- Truthful UI, filtering, source labels, and saved-state compatibility: foundation Tasks 6-8 and 12; content-rollout Task 10.
- Strict professional SemVer and the planned `0.3.0` release: foundation Tasks 9-10; content-rollout Task 11.
- Unique-cache PWA updates after successful Git deployments: foundation Tasks 10-12; content-rollout Tasks 10-11.
- Automated, content, and browser acceptance evidence: foundation Tasks 11-12; content-rollout Tasks 9-11.

---

## File Structure

### New source files

- `scripts/content/schema.mjs` — question/solution contracts and validation helpers.
- `scripts/content/compiler.mjs` — deterministic subject-module serialization.
- `scripts/content/registry.mjs` — imports all authored subject content for compilation.
- `scripts/build-solutions.mjs` — CLI that writes or checks generated modules.
- `scripts/check-version.mjs` — SemVer parsing, comparison, lockfile synchronization, and changed-path gate.
- `scripts/questions/<subject>/important.mjs` — authored Important Question metadata.
- `scripts/questions/<subject>/original.mjs` — authored verified paper occurrences.
- `scripts/solutions/<subject>/unit1.mjs` through `unit6.mjs` — authored solutions.
- `dist/solutions/<subject>-solutions.js` — generated browser data, one module per subject.
- `dist/solutions/index.js` — generated aggregate question export.
- `tests/content-schema.test.mjs` — schema and compiler tests.
- `tests/question-ui.test.mjs` — render/filter contract tests extracted from `app.js` helpers.
- `tests/version.test.mjs` — SemVer and changed-path tests.
- `tests/release-build.test.mjs` — release command/configuration assertions.

### Modified files

- `scripts/solutions/unit1.mjs` through `unit6.mjs` — moved to `scripts/solutions/cn/` with history preserved.
- `scripts/build-cn-solutions.mjs` — replaced by the shared compiler entry point.
- `dist/data.js` — imports normalized generated written-question data.
- `dist/app.js` — uses category/year/unit filters and source metadata.
- `dist/style.css` — category controls and source-detail styles.
- `dist/sw.js` — retains safe activation while generated files join the shell.
- `dist/app-meta.js` — remains the build-time version template.
- `package.json` and `package-lock.json` — synchronized SemVer and release scripts.
- `.github/workflows/check.yml` — installs dependencies and runs the release build.
- `vercel.json` — uses the mandatory release command.
- `README.md` and `docs/REVIEW.md` — document the real authoring and release workflow.

Authoring export names are fixed: every `important.mjs` exports `importantQuestions`, every `original.mjs` exports `originalQuestions`, and every `unitN.mjs` exports `unitNSolutions`. The registry imports these repeated names with subject-specific aliases.

## Task 1: Add the Content Contract with Failing Tests

**Files:**
- Create: `tests/content-schema.test.mjs`
- Create: `scripts/content/schema.mjs`

- [ ] **Step 1: Write failing contract tests**

Create `tests/content-schema.test.mjs` with these concrete cases:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sumMarkingScheme,
  validateQuestion,
  validateSolution,
  validateSubjectContent
} from '../scripts/content/schema.mjs';

const important={
  id:'coa-important-q1',canonicalId:'coa-instruction-cycle',kind:'important',
  subject:'coa',unit:1,question:'Explain the instruction cycle.',marks:7,
  topics:['instruction cycle'],solutionRef:'coa-sol-instruction-cycle'
};
const original={
  id:'coa-original-2024-154501-q2a',canonicalId:'coa-instruction-cycle',kind:'original',
  subject:'coa',unit:1,question:'Explain the instruction cycle.',marks:7,
  topics:['instruction cycle'],solutionRef:'coa-sol-instruction-cycle',
  source:{year:2024,paperCode:'154501',questionNumber:'2(a)',url:'https://beu-bih.ac.in/example.pdf',verification:'official'}
};
const solution={
  id:'coa-sol-instruction-cycle',verified:'Important 7-Mark Model Answer',
  intro:'The instruction cycle is the ordered sequence used to execute one instruction.',
  diagrams:[{title:'Instruction cycle',ascii:'FETCH -> DECODE -> EXECUTE'}],
  sections:[{heading:'1. Phases',points:['Fetch the instruction.','Decode and execute it.']}],
  conclusion:'The cycle repeats until execution stops.',
  markingScheme:[{component:'Definition',marks:'1.0'},{component:'Phases',marks:'6.0'}],
  examTip:'Label every phase.'
};

test('important questions reject paper occurrence metadata',()=>{
  assert.throws(()=>validateQuestion({...important,years:[2024]}),/must not contain years/);
  assert.throws(()=>validateQuestion({...important,source:original.source}),/must not contain source/);
});

test('original questions require complete traceable source metadata',()=>{
  assert.doesNotThrow(()=>validateQuestion(original));
  assert.throws(()=>validateQuestion({...original,source:{...original.source,paperCode:''}}),/paperCode/);
});

test('solution marking scheme must equal the question marks',()=>{
  assert.equal(sumMarkingScheme(solution.markingScheme),7);
  assert.doesNotThrow(()=>validateSolution(solution,7));
  assert.throws(()=>validateSolution({...solution,markingScheme:[{component:'Body',marks:'6.5'}]},7),/marking scheme/);
});

test('subject content rejects duplicate IDs and missing solution references',()=>{
  assert.throws(()=>validateSubjectContent('coa',[important,important],[solution]),/duplicate question id/);
  assert.throws(()=>validateSubjectContent('coa',[{...important,solutionRef:'missing'}],[solution]),/missing solution/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/content-schema.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/content/schema.mjs`.

- [ ] **Step 3: Implement the minimal shared schema**

Create `scripts/content/schema.mjs` exporting the tested functions. Use these fixed rules:

```js
export const SUBJECT_IDS=Object.freeze(['cn','coa','flat','dbms','daa','etc']);
export const QUESTION_KINDS=Object.freeze(['original','important']);
export const SOURCE_VERIFICATIONS=Object.freeze(['official','cross-checked-scan']);

const requiredString=(value,name)=>{
  if(typeof value!=='string'||!value.trim())throw Error(`${name} must be a non-empty string`);
};
export const sumMarkingScheme=items=>items.reduce((sum,item)=>sum+Number(item.marks),0);

export function validateQuestion(question){
  requiredString(question.id,'id');requiredString(question.canonicalId,'canonicalId');
  requiredString(question.question,'question');requiredString(question.solutionRef,'solutionRef');
  if(!QUESTION_KINDS.includes(question.kind))throw Error(`invalid kind for ${question.id}`);
  if(!SUBJECT_IDS.includes(question.subject))throw Error(`invalid subject for ${question.id}`);
  if(!Number.isInteger(question.unit)||question.unit<1||question.unit>6)throw Error(`invalid unit for ${question.id}`);
  if(!Number.isInteger(question.marks)||question.marks<1)throw Error(`invalid marks for ${question.id}`);
  if(!Array.isArray(question.topics)||!question.topics.length)throw Error(`topics required for ${question.id}`);
  if(question.kind==='important'){
    if('years' in question)throw Error(`important question ${question.id} must not contain years`);
    if('source' in question)throw Error(`important question ${question.id} must not contain source`);
    if(question.marks!==7)throw Error(`important question ${question.id} must be 7 marks`);
  }else{
    const source=question.source||{};
    if(!Number.isInteger(source.year)||source.year<2022||source.year>2025)throw Error(`source year invalid for ${question.id}`);
    for(const key of ['paperCode','questionNumber','url','verification'])requiredString(source[key],`source.${key}`);
    if(!SOURCE_VERIFICATIONS.includes(source.verification))throw Error(`source verification invalid for ${question.id}`);
  }
  return question;
}

export function validateSolution(solution,marks){
  requiredString(solution.id,'solution.id');requiredString(solution.verified,'solution.verified');
  requiredString(solution.intro,'solution.intro');
  requiredString(solution.conclusion,'solution.conclusion');requiredString(solution.examTip,'solution.examTip');
  if(!Array.isArray(solution.sections)||!solution.sections.length)throw Error(`sections required for ${solution.id}`);
  for(const section of solution.sections){
    requiredString(section.heading,'section.heading');
    if(!Array.isArray(section.points)||!section.points.length)throw Error(`section points required for ${solution.id}`);
    for(const point of section.points)requiredString(point,'section point');
  }
  for(const diagram of solution.diagrams||[]){requiredString(diagram.title,'diagram.title');requiredString(diagram.ascii,'diagram.ascii');}
  if(solution.table){
    requiredString(solution.table.title,'table.title');
    if(!Array.isArray(solution.table.headers)||!solution.table.headers.length)throw Error(`table headers required for ${solution.id}`);
    for(const row of solution.table.rows||[])if(row.length!==solution.table.headers.length)throw Error(`table row width invalid for ${solution.id}`);
  }
  if(!Array.isArray(solution.markingScheme)||!solution.markingScheme.length)throw Error(`marking scheme required for ${solution.id}`);
  for(const item of solution.markingScheme){requiredString(item.component,'marking component');if(!(Number(item.marks)>0))throw Error(`marking marks invalid for ${solution.id}`);}
  if(Math.abs(sumMarkingScheme(solution.markingScheme)-marks)>1e-9)throw Error(`marking scheme for ${solution.id} must total ${marks}`);
  return solution;
}

export function validateSubjectContent(subject,questions,solutions){
  if(!SUBJECT_IDS.includes(subject))throw Error(`unknown subject ${subject}`);
  const questionIds=new Set(),solutionIds=new Set(solutions.map(item=>item.id));
  for(const question of questions){
    validateQuestion(question);
    if(questionIds.has(question.id))throw Error(`duplicate question id ${question.id}`);
    questionIds.add(question.id);
    if(!solutionIds.has(question.solutionRef))throw Error(`missing solution ${question.solutionRef}`);
  }
  for(const solution of solutions){
    const marks=[...new Set(questions.filter(q=>q.solutionRef===solution.id).map(q=>q.marks))];
    if(marks.length!==1)throw Error(`solution ${solution.id} must serve one mark value`);
    validateSolution(solution,marks[0]);
  }
  return {subject,questions,solutions};
}
```

- [ ] **Step 4: Run the contract tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: 4 tests pass.

- [ ] **Step 5: Commit the contract**

```powershell
git add -- scripts/content/schema.mjs tests/content-schema.test.mjs
git commit -m "test(content): define question and solution contracts"
```

## Task 2: Add the Deterministic Compiler

**Files:**
- Create: `scripts/content/compiler.mjs`
- Modify: `tests/content-schema.test.mjs`

- [ ] **Step 1: Add a failing deterministic-output test**

Append a test that calls `compileSubjectModule({subject:'coa',questions:[important],solutions:[solution]})` twice and asserts byte-identical output containing `export const coaQuestions` and `export const coaSolutions`.

- [ ] **Step 2: Run the targeted test and confirm failure**

Run: `node --test --test-name-pattern="deterministic" tests/content-schema.test.mjs`

Expected: FAIL because `compileSubjectModule` is not exported.

- [ ] **Step 3: Implement `compileSubjectModule`**

Create `scripts/content/compiler.mjs`:

```js
import {validateSubjectContent} from './schema.mjs';

export function compileSubjectModule({subject,questions,solutions}){
  validateSubjectContent(subject,questions,solutions);
  const orderedQuestions=[...questions].sort((a,b)=>a.id.localeCompare(b.id));
  const solutionMap=Object.fromEntries([...solutions].sort((a,b)=>a.id.localeCompare(b.id)).map(item=>[item.id,item]));
  return `// Generated by scripts/build-solutions.mjs. Do not edit.\n`+
    `export const ${subject}Questions=${JSON.stringify(orderedQuestions,null,2)};\n`+
    `export const ${subject}Solutions=${JSON.stringify(solutionMap,null,2)};\n`;
}
```

- [ ] **Step 4: Run all schema/compiler tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Commit the compiler**

```powershell
git add -- scripts/content/compiler.mjs tests/content-schema.test.mjs
git commit -m "feat(content): add deterministic solution compiler"
```

## Task 3: Migrate CN to the Shared Unit Layout

**Files:**
- Create: `scripts/solutions/cn/unit1.mjs` through `unit6.mjs`
- Create: `scripts/questions/cn/important.mjs`
- Create: `scripts/questions/cn/original.mjs`
- Delete after parity: `scripts/solutions/unit1.mjs` through `unit6.mjs`
- Delete after parity: `scripts/build-cn-solutions.mjs`
- Modify: `tests/content-schema.test.mjs`

- [ ] **Step 1: Add a failing CN parity test**

Read the current `allCnPyqs` and `cnSolutions` from `dist/cn-solutions.js`, then assert the migrated registry produces 50 questions, resolves all 50 solutions, and preserves every existing question ID before classification changes.

- [ ] **Step 2: Run the parity test and confirm the new registry is missing**

Run: `node --test --test-name-pattern="CN migration" tests/content-schema.test.mjs`

Expected: FAIL with module-not-found for `scripts/questions/cn/important.mjs`.

- [ ] **Step 3: Move the six CN authoring modules**

Use `git mv` for each file so history remains traceable:

```powershell
New-Item -ItemType Directory -Force -Path scripts\solutions\cn | Out-Null
1..6 | ForEach-Object { git mv "scripts/solutions/unit$_.mjs" "scripts/solutions/cn/unit$_.mjs" }
```

Update their exports to retain the names `unit1Solutions` through `unit6Solutions`.

- [ ] **Step 4: Extract CN question metadata conservatively**

Create `scripts/questions/cn/important.mjs` with the current 18 base questions classified as `important`, stable IDs retained, unsupported `years` removed, `marks:7`, topic arrays added, and `solutionRef` pointing to the existing matching solution.

Create `scripts/questions/cn/original.mjs` exporting an empty array at this foundation stage:

```js
export const cnOriginalQuestions=[];
```

Convert the remaining CN entries to Important Questions only when they are 7 marks. Preserve 3-, 4-, and 14-mark entries in separate `cnSupplementalQuestions` and `cnSupplementalSolutions` exports so they remain available to the later source audit but do not enter the compiled question registry or Important 7-Mark UI.

- [ ] **Step 5: Run CN parity and contract tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: all tests pass; the test reports 50 preserved stable IDs, with non-7-mark items outside the Important collection.

- [ ] **Step 6: Commit the CN migration**

```powershell
git add -- scripts/solutions/cn scripts/questions/cn tests/content-schema.test.mjs
git rm -- scripts/build-cn-solutions.mjs
git commit -m "refactor(content): migrate CN to shared compiler layout"
```

## Task 4: Extract the 88 Existing Questions as Important Content

**Files:**
- Create: `scripts/questions/coa/important.mjs`, `original.mjs`
- Create: `scripts/questions/flat/important.mjs`, `original.mjs`
- Create: `scripts/questions/dbms/important.mjs`, `original.mjs`
- Create: `scripts/questions/daa/important.mjs`, `original.mjs`
- Create: `scripts/questions/etc/important.mjs`, `original.mjs`
- Create: `scripts/solutions/<subject>/unit1.mjs` through `unit6.mjs` for five subjects
- Modify: `tests/content-schema.test.mjs`

- [ ] **Step 1: Add failing count and truthfulness tests**

Assert exact Important Question counts `{coa:15,flat:18,dbms:16,daa:21,etc:18}`. Assert every migrated item has `kind:'important'`, `marks:7`, no `years`, and no `source`.

- [ ] **Step 2: Run the tests and confirm missing modules**

Run: `node --test --test-name-pattern="important migration" tests/content-schema.test.mjs`

Expected: FAIL because subject question modules do not exist.

- [ ] **Step 3: Move the current metadata out of `dist/data.js`**

Create each subject's `important.mjs` from its existing list. Preserve `coa-q1` through `coa-q15`, `flat-q1` through `flat-q18`, `dbms-q1` through `dbms-q16`, `daa-q1` through `daa-q21`, and `etc-q1` through `etc-q18`. Add `canonicalId`, `kind`, `subject`, `topics`, and `solutionRef`. Remove every unverified `years` field.

Create every `original.mjs` with an empty, explicitly named subject export until the source-audit plan populates it.

- [ ] **Step 4: Add complete first-pass solutions**

Create unit modules exporting solution arrays for all 88 IDs. Each solution must fully answer its prompt and contain complete `intro`, `sections`, `conclusion`, seven-mark `markingScheme`, and `examTip` fields; diagrams and tables remain optional only when the prompt does not require them. Do not use stub strings, repeated generic answers, or placeholder prose. The subject-content rollout plan independently checks and corrects each answer against subject-specific calculations, proofs, formats, and sources before release.

- [ ] **Step 5: Run count and schema tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: all content modules load, counts equal 88, and every solution reference resolves.

- [ ] **Step 6: Commit the extracted authored content**

```powershell
git add -- scripts/questions scripts/solutions tests/content-schema.test.mjs
git commit -m "refactor(content): extract important question modules"
```

## Task 5: Generate Browser Modules and Reject Stale Output

**Files:**
- Create: `scripts/content/registry.mjs`
- Create: `scripts/build-solutions.mjs`
- Create: `dist/solutions/*.js`
- Modify: `package.json`
- Modify: `.gitignore`
- Modify: `tests/content-schema.test.mjs`

- [ ] **Step 1: Add a failing stale-output test**

Use a temporary output directory. Write generated files, mutate one byte, run check mode, and assert it throws `Generated content is stale`.

- [ ] **Step 2: Run the test and confirm failure**

Run: `node --test --test-name-pattern="stale" tests/content-schema.test.mjs`

Expected: FAIL because `buildSolutions` does not exist.

- [ ] **Step 3: Implement the registry and build CLI**

`scripts/content/registry.mjs` must export an ordered registry for `cn`, `coa`, `flat`, `dbms`, `daa`, and `etc`. `scripts/build-solutions.mjs` must export `buildSolutions({outputDir,check})`, create one generated subject file plus `index.js`, and compare exact bytes in `--check` mode.

Add scripts:

```json
{
  "build:content": "node scripts/build-solutions.mjs",
  "check:content": "node scripts/build-solutions.mjs --check"
}
```

Do not ignore `dist/solutions/`; generated files remain reviewed and committed source artifacts like the current `dist/cn-solutions.js`.

- [ ] **Step 4: Generate and check output**

Run: `npm run build:content && npm run check:content`

Expected: six subject modules and one index module are generated; check mode exits 0.

- [ ] **Step 5: Run tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: all tests pass, including stale-output detection.

- [ ] **Step 6: Commit generated output and builder**

```powershell
git add -- scripts/content/registry.mjs scripts/build-solutions.mjs dist/solutions package.json tests/content-schema.test.mjs
git commit -m "feat(content): generate subject solution modules"
```

## Task 6: Replace the Written-Question Adapter

**Files:**
- Modify: `dist/data.js`
- Delete: `dist/cn-solutions.js`
- Modify: `tests/content-schema.test.mjs`
- Modify: `tests/core.test.mjs`

- [ ] **Step 1: Add failing normalized-adapter tests**

Import `pyqs` from `dist/data.js` and assert each subject returns questions with `kind`, `topics`, `solution`, and stable IDs. Assert the five non-CN counts remain 15/18/16/21/18 and no Important Question has a `years` property.

- [ ] **Step 2: Run the adapter tests and verify failure**

Run: `node --test --test-name-pattern="written question adapter" tests/content-schema.test.mjs`

Expected: FAIL because current items lack `kind` and solution data.

- [ ] **Step 3: Import generated subject data in `dist/data.js`**

Replace the `allCnPyqs`/`cnSolutions` import and the large inline `pyqData` object with:

```js
import {writtenQuestionsBySubject} from './solutions/index.js';
```

Build normalized questions by resolving `solutionRef` during generation, so `pyqs(subject)` remains a simple array lookup and the UI does not need to know compiler internals.

- [ ] **Step 4: Remove the obsolete generated CN file**

Run: `git rm -- dist/cn-solutions.js`

Update `package.json` syntax checks and `dist/sw.js` source shell references to the generated `dist/solutions/` files.

- [ ] **Step 5: Run content, core, and worker tests**

Run: `npm run build:content; node --test tests/content-schema.test.mjs tests/core.test.mjs tests/worker.test.mjs`

Expected: all tests pass.

- [ ] **Step 6: Commit the adapter migration**

```powershell
git add -- dist/data.js dist/sw.js package.json tests/content-schema.test.mjs tests/core.test.mjs dist/solutions
git commit -m "refactor(data): consume generated written-question modules"
```

## Task 7: Extract and Test Question-Page View Helpers

**Files:**
- Create: `dist/question-view.js`
- Create: `tests/question-ui.test.mjs`
- Modify: `dist/app.js`

- [ ] **Step 1: Write failing pure-helper tests**

Test `filterWrittenQuestions` with category, unit, year, and saved-only combinations. Test `questionSourceLabel` returns `BEU 2024 · 154501 · Q.2(a)` for an original and `Important 7-Mark Question` for an important item.

- [ ] **Step 2: Run the test and verify module-not-found**

Run: `node --test tests/question-ui.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement `dist/question-view.js`**

```js
export function filterWrittenQuestions(items,{kind='original',unit='all',year='all',savedOnly=false,saved=[]}={}){
  return items.filter(item=>item.kind===kind)
    .filter(item=>unit==='all'||item.unit===Number(unit))
    .filter(item=>year==='all'||item.source?.year===Number(year))
    .filter(item=>!savedOnly||saved.includes(item.id));
}

export function questionSourceLabel(item){
  if(item.kind==='important')return 'Important 7-Mark Question';
  return `BEU ${item.source.year} · ${item.source.paperCode} · Q.${item.source.questionNumber}`;
}
```

- [ ] **Step 4: Run helper tests**

Run: `node --test tests/question-ui.test.mjs`

Expected: all helper tests pass.

- [ ] **Step 5: Import the helpers in `dist/app.js`**

Add `pyqKind='original'` and `pyqYear='all'` route state. Replace inline list filtering and source-label construction with the tested helpers.

- [ ] **Step 6: Commit the tested UI helpers**

```powershell
git add -- dist/question-view.js dist/app.js tests/question-ui.test.mjs
git commit -m "refactor(pyq): add tested question view helpers"
```

## Task 8: Add Original and Important Question Controls

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/style.css`
- Modify: `tests/question-ui.test.mjs`

- [ ] **Step 1: Add failing rendered-contract tests**

Export a small `renderQuestionFilters` helper from `question-view.js`. Assert it renders two buttons with `data-kind="original"` and `data-kind="important"`, a year selector only for Original PYQs, and truthful empty-state copy.

- [ ] **Step 2: Run tests and confirm failure**

Run: `node --test tests/question-ui.test.mjs`

Expected: FAIL because the render helper is missing.

- [ ] **Step 3: Implement category and year controls**

Update the subject page to show Original PYQs and Important 7-Mark Questions as primary chips. Original mode shows verified source labels, year selector, and original-only recurrence analysis. Important mode hides year controls and uses `Syllabus-aligned practice; not claimed as a previous paper question.`

- [ ] **Step 4: Add responsive styles**

Add focused styles for `.question-kind-tabs`, `.source-meta`, `.source-link`, and narrow-screen wrapping. Reuse existing chips, badges, colours, radii, and spacing tokens.

- [ ] **Step 5: Run UI and full unit tests**

Run: `node --test tests/question-ui.test.mjs tests/core.test.mjs`

Expected: all tests pass.

- [ ] **Step 6: Commit the category UI**

```powershell
git add -- dist/app.js dist/question-view.js dist/style.css tests/question-ui.test.mjs
git commit -m "feat(pyq): separate original and important questions"
```

## Task 9: Implement Strict SemVer Validation

**Files:**
- Create: `scripts/check-version.mjs`
- Create: `tests/version.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Write failing SemVer tests**

Test valid strict versions `0.2.3`, `0.3.0`, and `1.0.0`; reject `v0.3.0`, `0.3`, dates, hashes, and prerelease suffixes. Test comparison ordering and user-facing path classification. Test lockfile mismatch.

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/version.test.mjs`

Expected: FAIL because `scripts/check-version.mjs` does not exist.

- [ ] **Step 3: Implement pure SemVer helpers and CLI**

Use regex `/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/`. Export `parseVersion`, `compareVersions`, `isUserFacingPath`, and `validateVersionFiles`. The CLI reads the base ref from `BASE_SHA`, then `VERCEL_GIT_PREVIOUS_SHA`, then `HEAD^`; a missing base exits non-zero.

Treat these prefixes as user-facing: `dist/`, `landing/`, `scripts/questions/`, `scripts/solutions/`, `scripts/content/`, `scripts/build-solutions.mjs`, and `package.json`. Exclude `docs/`, `tests/`, `.github/`, and generated `build/`.

- [ ] **Step 4: Synchronize the current lockfile**

Set both root version fields in `package-lock.json` to the same current version as `package.json` without changing dependencies.

- [ ] **Step 5: Add and test the version script**

Add `"check:version":"node scripts/check-version.mjs"` and run:

`node --test tests/version.test.mjs`

Expected: tests pass. Do not run the production comparison gate until the combined feature is deliberately bumped to `0.3.0` in the content rollout plan.

- [ ] **Step 6: Commit SemVer enforcement**

```powershell
git add -- scripts/check-version.mjs tests/version.test.mjs package.json package-lock.json
git commit -m "feat(release): enforce strict semantic versions"
```

## Task 10: Make One Mandatory Release Build

**Files:**
- Modify: `package.json`
- Modify: `vercel.json`
- Modify: `.github/workflows/check.yml`
- Create: `tests/release-build.test.mjs`

- [ ] **Step 1: Write failing release-configuration tests**

Read the three JSON/YAML files and assert:

- `build:content`, `check:content`, `check:version`, `build`, and `release:build` exist;
- `vercel.json.buildCommand` equals `npm run release:build`;
- GitHub Actions runs `npm ci` and `npm run release:build`;
- checkout uses `fetch-depth: 0` and `persist-credentials: false`.

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/release-build.test.mjs`

Expected: FAIL because Vercel still runs `node scripts/build.mjs`.

- [ ] **Step 3: Wire package scripts**

Set:

```json
{
  "build": "npm run build:content && node scripts/build.mjs",
  "release:build": "npm run build:content && npm run check && npm test && npm run check:version && node scripts/build.mjs"
}
```

Make `check` run `npm run check:content` before syntax checks and include every new generated/source module.

- [ ] **Step 4: Update Vercel and GitHub Actions**

Set `vercel.json.buildCommand` to `npm run release:build`. In GitHub Actions, add `npm ci`, configure full history, expose the event base SHA as `BASE_SHA`, and run `npm run release:build` once.

- [ ] **Step 5: Run release-configuration tests and a local feature build**

Run: `node --test tests/release-build.test.mjs; npm run build`

Expected: tests pass; the feature build succeeds; `build/release.json` contains the synchronized current SemVer and build ID. The complete `release:build` is exercised after the planned `0.3.0` bump.

- [ ] **Step 6: Commit the release gate**

```powershell
git add -- package.json package-lock.json vercel.json .github/workflows/check.yml tests/release-build.test.mjs
git commit -m "ci: require tested content-aware releases"
```

## Task 11: Verify PWA Update Safety with Generated Content

**Files:**
- Modify: `tests/build.test.mjs`
- Modify: `tests/worker.test.mjs`
- Modify: `tests/updates.test.mjs`
- Modify only if a test proves necessary: `dist/sw.js`, `dist/updates.js`

- [ ] **Step 1: Add failing generated-content cache assertions**

Assert the built worker shell contains every `solutions/*.js` file, `release.json` matches the built SemVer/build ID, a changed solution changes the build ID, and an unchanged solution tree does not.

- [ ] **Step 2: Add multi-client and failed-install assertions**

Extend worker tests to cover a closed-client set, one unsafe client, all-safe activation, and cache cleanup only after activation. Extend update tests to prove an active quiz and dirty form both defer reload.

- [ ] **Step 3: Run update tests and observe failures**

Run: `node --test tests/build.test.mjs tests/worker.test.mjs tests/updates.test.mjs`

Expected: new generated-content assertions fail until shell generation includes the new files; existing safety behavior continues passing.

- [ ] **Step 4: Make the minimum build/worker changes**

Keep `scripts/build.mjs` recursive file discovery and content-derived cache naming. Adjust only path/version handling proven by the tests. Do not weaken the unanimous safe-client vote.

- [ ] **Step 5: Run the update suite and production build**

Run: `node --test tests/build.test.mjs tests/worker.test.mjs tests/updates.test.mjs; npm run build`

Expected: all tests pass and build succeeds.

- [ ] **Step 6: Commit PWA release verification**

```powershell
git add -- tests/build.test.mjs tests/worker.test.mjs tests/updates.test.mjs scripts/build.mjs dist/sw.js dist/updates.js
git commit -m "test(pwa): verify generated-content updates"
```

## Task 12: Document and Browser-Verify the Foundation

**Files:**
- Modify: `README.md`
- Modify: `docs/REVIEW.md`
- Modify: `dist/app-meta.js`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Update documentation truthfully**

Document authored versus generated files, `npm run build:content`, Original/Important classification, strict SemVer rules, release-build order, and the real closed/offline PWA update boundary.

- [ ] **Step 2: Run the full automated verification**

Run: `npm run check; npm test; npm run build`

Expected: syntax/content checks pass, all tests pass, and the production build succeeds.

- [ ] **Step 3: Serve and inspect the built app**

Run: `npx --yes serve build -l 4173`

At widths 360, 768, and 1440, verify all six subjects, both category tabs, empty Original state before source import, Important counts, one CN expanded solution, saved/marked persistence, and no page-level horizontal overflow.

- [ ] **Step 4: Verify update behavior using two builds**

Serve build A, install/register its worker, change one authored test fixture on the feature branch, produce build B, and confirm build B downloads but waits during an active quiz. Exit the quiz and confirm one reload, preserved local state, updated build ID, and correct displayed SemVer.

- [ ] **Step 5: Record actual evidence**

Add commands, test totals, build ID, tested viewports, and any remaining source-content gaps to `docs/REVIEW.md`. Do not label the content rollout complete here.

- [ ] **Step 6: Commit the verified foundation**

```powershell
git add -- README.md docs/REVIEW.md dist/app-meta.js package.json package-lock.json
git commit -m "docs: record content release foundation"
```

## Foundation Completion Gate

Before beginning the subject-content rollout, require:

- all authored data validates;
- all generated modules are current;
- CN and 88 non-CN IDs remain stable;
- Original and Important UI states behave truthfully;
- strict SemVer and lockfile checks pass;
- Vercel and GitHub use the mandatory release build;
- safe service-worker activation tests pass;
- the foundation browser matrix passes;
- the work remains on a feature branch until the complete `0.3.0` content release is ready.
