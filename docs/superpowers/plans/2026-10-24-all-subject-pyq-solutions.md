# All-Subject PYQ Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate every subject with source-traceable 2022-2025 Original PYQs and complete, independently checked CN-style solutions for all Original and Important 7-mark questions.

**Architecture:** Treat paper provenance and answer content as authored source data. Each subject owns Original/Important question modules and six unit solution modules; the shared compiler and validators from the foundation plan produce the offline browser bundle and block incomplete content.

**Tech Stack:** Node.js 22 ES modules, Node test runner, BEU official paper sources, static PWA content modules, browser QA.

**Depends on:** Complete `docs/superpowers/plans/2026-10-24-content-release-foundation.md` first.

**Execution workspace:** Continue in the isolated `feat/pyq-solutions-v0.3.0` worktree created for the foundation plan; do not merge partial content to `main`.

## Professor-Invigilator Mentor Gate

Use a fresh mentor subagent after each subject solution task and once more after the cross-subject review. The mentor acts as both a university professor and an exam invigilator grading what a student would actually write. It must inspect every changed solution against its exact question and independently check:

- factual, mathematical, algorithmic, and terminology accuracy;
- whether the answer directly addresses every command word and subpart;
- whether derivations, examples, diagrams, tables, proofs, and calculations are internally consistent;
- whether the depth is realistic for a correct seven-mark university answer;
- whether the marking scheme totals seven and rewards content present in the answer;
- whether Original PYQ wording and provenance match the recorded source;
- whether unsupported claims, invented years, fake verification labels, copied boilerplate, and misleading shortcuts are absent;
- whether a student reproducing the answer could receive full marks from a strict evaluator.

The mentor records per-solution `PASS`, `REVISE`, or `BLOCK` findings with concrete reasons in `docs/content-sources/mentor-review-report.md`. Any `REVISE` or `BLOCK` finding returns to the subject implementer for correction and then to the same mentor for re-review. Release is forbidden until every published solution has a final `PASS` and automated content validation agrees with the report.

---

## File Structure

- `scripts/questions/sources.mjs` — paper/source registry and coverage status.
- `scripts/questions/<subject>/original.mjs` — exact verified paper occurrences.
- `scripts/questions/<subject>/important.mjs` — syllabus-derived 7-mark questions.
- `scripts/solutions/<subject>/unit1.mjs` through `unit6.mjs` — canonical solutions.
- `tests/solutions/source-coverage.test.mjs` — paper/source and occurrence completeness.
- `tests/solutions/cn.test.mjs` — CN classification and worked-answer checks.
- `tests/solutions/coa.test.mjs` — COA coverage and arithmetic checks.
- `tests/solutions/flat.test.mjs` — FLAT coverage and formal-language checks.
- `tests/solutions/dbms.test.mjs` — DBMS coverage and relational checks.
- `tests/solutions/daa.test.mjs` — DAA coverage and algorithm-result checks.
- `tests/solutions/etc.test.mjs` — ETC coverage and document-format checks.
- `docs/content-sources/2022-2025-paper-coverage.md` — human-readable audit trail.
- `docs/REVIEW.md` — final automated/browser evidence.

## Task 1: Build the 2022-2025 Paper Source Inventory

**Files:**
- Create: `scripts/questions/sources.mjs`
- Create: `tests/solutions/source-coverage.test.mjs`
- Create: `docs/content-sources/2022-2025-paper-coverage.md`

- [ ] **Step 1: Write a failing source-registry test**

Create a test that requires each registry item to contain `subject`, `year`, `paperCode`, `exam`, `url`, `verification`, and `status`. Restrict years to 2022-2025, verification to `official` or `cross-checked-scan`, and status to `captured`, `not-published`, or `unreadable`.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {paperSources} from '../../scripts/questions/sources.mjs';

const subjects=['cn','coa','flat','dbms','daa','etc'];
test('paper registry covers every selected subject and year explicitly',()=>{
  for(const subject of subjects){
    for(const year of [2022,2023,2024,2025]){
      assert.ok(paperSources.some(item=>item.subject===subject&&item.year===year),`${subject} ${year}`);
    }
  }
});
test('captured papers have traceable identity',()=>{
  for(const item of paperSources.filter(source=>source.status==='captured')){
    assert.match(item.paperCode,/^\d{6}$/);
    assert.match(item.url,/^https:\/\//);
    assert.ok(['official','cross-checked-scan'].includes(item.verification));
  }
});
```

- [ ] **Step 2: Run the test and confirm the registry is missing**

Run: `node --test tests/solutions/source-coverage.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Research the official source set**

Start at `https://beu-bih.ac.in/examination/question-bank`. Match subject title, cohort/semester, and paper code against official BEU examination programmes. Record one explicit registry row for every subject/year combination, including `not-published` or `unreadable` rather than silently omitting a gap. Do not infer paper identity from a title alone.

- [ ] **Step 4: Cross-check non-official scans**

Use a non-official scan only when its header, year, paper code, total marks, and question structure agree with official programme metadata. Set `verification:'cross-checked-scan'`; never label it official.

- [ ] **Step 5: Write the coverage report**

For each subject/year, record source URL, paper code, capture status, legibility, and the count of exact 7-mark occurrences. Include the reason for every unavailable paper.

- [ ] **Step 6: Run and commit source coverage**

Run: `node --test tests/solutions/source-coverage.test.mjs`

Expected: tests pass and every one of the 24 subject/year cells is explicit.

```powershell
git add -- scripts/questions/sources.mjs tests/solutions/source-coverage.test.mjs docs/content-sources/2022-2025-paper-coverage.md
git commit -m "docs(content): inventory BEU paper sources"
```

## Task 2: Extract Exact Original 7-Mark Occurrences

**Files:**
- Modify: `scripts/questions/<subject>/original.mjs` for all six subjects
- Modify: `tests/solutions/source-coverage.test.mjs`

- [ ] **Step 1: Add failing occurrence-source tests**

For every captured paper, assert at least one occurrence or an explicit `sevenMarkQuestionCount:0` on the source record. Assert every original question points to a captured source with the same year and paper code. Assert `(subject, year, paperCode, questionNumber)` is unique.

- [ ] **Step 2: Run tests before extraction**

Run: `node --test tests/solutions/source-coverage.test.mjs`

Expected: FAIL because captured sources do not yet have matching occurrences.

- [ ] **Step 3: Transcribe paper questions exactly**

For each captured paper, transcribe all 7-mark questions and 7-mark subparts. Normalize only whitespace, obvious OCR character substitutions, and mathematical typography. Preserve the original meaning, numbering, and marks. Do not merge occurrences across years.

- [ ] **Step 4: Assign canonical solution references**

Give repeated concepts one canonical `solutionRef` only when the required answer is materially the same. Keep separate solutions when wording changes the required proof, example, numerical inputs, diagram, or scope.

- [ ] **Step 5: Reconcile Important Questions**

Keep syllabus-derived Important Questions in their own collection even when an Original occurrence covers a similar concept. Link both to one solution only when that solution answers both prompts completely.

- [ ] **Step 6: Run source and content validation**

Run: `npm run build:content; npm run check:content; node --test tests/solutions/source-coverage.test.mjs`

Expected: every captured source and every Original occurrence cross-resolve without duplicate occurrence keys.

- [ ] **Step 7: Commit exact occurrence metadata**

```powershell
git add -- scripts/questions scripts/questions/sources.mjs tests/solutions/source-coverage.test.mjs docs/content-sources/2022-2025-paper-coverage.md dist/solutions
git commit -m "feat(pyq): add source-traceable original occurrences"
```

## Task 3: Audit and Correct Computer Networks

**Files:**
- Modify: `scripts/questions/cn/original.mjs`
- Modify: `scripts/questions/cn/important.mjs`
- Modify: `scripts/solutions/cn/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/cn.test.mjs`

- [ ] **Step 1: Write failing CN audit tests**

Assert Important entries are exactly 7 marks, Original entries match source records, supplemental 3/4/14-mark entries do not appear in the 7-mark lists, and every question resolves a solution. Add calculation checks for CRC `1110`, IPv4 fragments `(1500,0,MF=1)`, `(1500,185,MF=1)`, `(1040,370,MF=0)`, Slotted ALOHA maximum `1/e`, and Pure ALOHA maximum `1/(2e)`.

- [ ] **Step 2: Run the audit tests and record failures**

Run: `node --test tests/solutions/cn.test.mjs`

Expected: FAIL on unsupported classifications or calculation text that does not match the checked result.

- [ ] **Step 3: Reclassify every CN entry**

Promote only source-matched occurrences to Original. Keep syllabus-derived 7-mark prompts as Important. Preserve true 3-, 4-, and 14-mark records as supplemental content outside both 7-mark tabs.

- [ ] **Step 4: Review every canonical CN solution**

Check definitions, port numbers, protocol state transitions, formulas, arithmetic, ASCII labels, conclusion, marking total, and exam tip. Correct overclaims such as calling a model marking scheme official.

- [ ] **Step 5: Run CN and shared validation**

Run: `node --test tests/solutions/cn.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: all tests pass and generated CN content is current.

- [ ] **Step 6: Commit CN corrections**

```powershell
git add -- scripts/questions/cn scripts/solutions/cn tests/solutions/cn.test.mjs dist/solutions/cn-solutions.js dist/solutions/index.js
git commit -m "fix(cn): audit PYQ sources and solution accuracy"
```

## Task 4: Complete COA Solutions

**Files:**
- Modify: `scripts/solutions/coa/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/coa.test.mjs`

- [ ] **Step 1: Write failing COA coverage tests**

Require Important IDs `coa-q1` through `coa-q15`, every COA Original occurrence, and one valid solution per `solutionRef`. Add worked checks: Booth multiplication `(-5)*(+3)=-15`, single-precision bias `127`, double-precision bias `1023`, and ideal pipeline speedup tending to stage count `k` as instruction count grows.

- [ ] **Step 2: Run tests and confirm incomplete content**

Run: `node --test tests/solutions/coa.test.mjs`

Expected: FAIL on missing or insufficient canonical solutions.

- [ ] **Step 3: Author Units 1-3**

Write exam-ready answers for `coa-q1` through `coa-q6` and matching Originals. Include instruction-cycle flow, addressing equations, CLA derivation, IEEE 754 layouts, Booth register trace, and restoring/non-restoring division trace.

- [ ] **Step 4: Author Units 4-6**

Write answers for `coa-q7` through `coa-q15` and matching Originals. Include control-unit block diagrams, RISC/CISC comparison, cache address splits, DMA timing, TLB translation, pipeline equations, hazard remedies, and Flynn schematics.

- [ ] **Step 5: Verify COA content**

Run: `node --test tests/solutions/coa.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: tests pass; every marking scheme totals the question marks.

- [ ] **Step 6: Commit COA**

```powershell
git add -- scripts/solutions/coa tests/solutions/coa.test.mjs dist/solutions/coa-solutions.js dist/solutions/index.js
git commit -m "feat(coa): add verified written solutions"
```

## Task 5: Complete FLAT Solutions

**Files:**
- Modify: `scripts/solutions/flat/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/flat.test.mjs`

- [ ] **Step 1: Write failing FLAT coverage tests**

Require Important IDs `flat-q1` through `flat-q18` and all Original references. Add structural checks that proof questions contain assumptions and contradiction/conclusion sections, machine questions contain transition representations, and grammar-conversion questions show intermediate productions.

- [ ] **Step 2: Run tests and confirm incomplete content**

Run: `node --test tests/solutions/flat.test.mjs`

Expected: FAIL on missing proof or transition evidence.

- [ ] **Step 3: Author Units 1-3**

Complete `flat-q1` through `flat-q10`: Chomsky hierarchy, derivations, epsilon-NFA conversion, regular pumping proof, DFA minimization, Arden equations, ambiguity proof with two parse trees, CNF conversion, PDA for `wcw^R`, and CFL pumping proof.

- [ ] **Step 4: Author Units 4-6**

Complete `flat-q11` through `flat-q18`: CSG/LBA, TM for `0^n1^n` with `0011` trace, recursive versus recognizable closure, TM variants, halting contradiction, UTM encoding, and Rice's theorem application.

- [ ] **Step 5: Verify FLAT content**

Run: `node --test tests/solutions/flat.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: all tests pass and generated FLAT content is current.

- [ ] **Step 6: Commit FLAT**

```powershell
git add -- scripts/solutions/flat tests/solutions/flat.test.mjs dist/solutions/flat-solutions.js dist/solutions/index.js
git commit -m "feat(flat): add verified written solutions"
```

## Task 6: Complete DBMS Solutions

**Files:**
- Modify: `scripts/solutions/dbms/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/dbms.test.mjs`

- [ ] **Step 1: Write failing DBMS coverage tests**

Require Important IDs `dbms-q1` through `dbms-q16` and all Original references. Add deterministic checks that `dbms-q4` derives candidate keys `A`, `E`, `BC`, and `CD`; that serializability depends on an acyclic precedence graph; that 2PL acquires locks only in the growing phase and releases them only in the shrinking phase; and that SQL injection prevention uses parameter binding rather than escaping claims.

- [ ] **Step 2: Run tests and confirm incomplete content**

Run: `node --test tests/solutions/dbms.test.mjs`

Expected: FAIL on missing worked or structural requirements.

- [ ] **Step 3: Author Units 1-3**

Complete `dbms-q1` through `dbms-q8`: three-schema architecture, an explicitly scoped ER model, relational algebra examples, closure/candidate-key derivation, normalization decomposition, lossless/dependency tests, B+ tree operations, and extendible hashing.

- [ ] **Step 4: Author Units 4-6**

Complete `dbms-q9` through `dbms-q16`: ACID, serializability graph, 2PL variants, WAL/checkpoint recovery, DAC/MAC/RBAC, parameterized-query defense, distributed fragmentation/replication, and star/snowflake comparisons.

- [ ] **Step 5: Verify DBMS content**

Run: `node --test tests/solutions/dbms.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: all tests pass and generated DBMS content is current.

- [ ] **Step 6: Commit DBMS**

```powershell
git add -- scripts/solutions/dbms tests/solutions/dbms.test.mjs dist/solutions/dbms-solutions.js dist/solutions/index.js
git commit -m "feat(dbms): add verified written solutions"
```

## Task 7: Complete DAA Solutions

**Files:**
- Modify: `scripts/solutions/daa/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/daa.test.mjs`

- [ ] **Step 1: Write failing DAA coverage tests**

Require Important IDs `daa-q1` through `daa-q21` and all Original references. Check known results: fractional knapsack profit `240`, 0/1 knapsack optimum `7`, Huffman weighted path length `224` for the supplied frequencies, matrix-chain minimum cost `1655`, LCS length `4`, and each stated recurrence bound.

- [ ] **Step 2: Run tests and confirm incomplete content**

Run: `node --test tests/solutions/daa.test.mjs`

Expected: FAIL on missing traces or incorrect expected values.

- [ ] **Step 3: Author Units 1-3**

Complete `daa-q1` through `daa-q11`: asymptotic definitions, Master Theorem cases, recursion tree/induction, merge/quick/heap sorts, Strassen recurrence, Kruskal/Prim traces, fractional knapsack, and Huffman tree.

- [ ] **Step 4: Author Units 4-6**

Complete `daa-q12` through `daa-q21`: DP tables for knapsack/MCM/LCS, Dijkstra limitation, BFS/DFS, Floyd-Warshall matrices, N-Queens state tree, P/NP relations, reductions, and Cook-Levin explanation.

- [ ] **Step 5: Verify DAA content**

Run: `node --test tests/solutions/daa.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: all tests pass and generated DAA content is current.

- [ ] **Step 6: Commit DAA**

```powershell
git add -- scripts/solutions/daa tests/solutions/daa.test.mjs dist/solutions/daa-solutions.js dist/solutions/index.js
git commit -m "feat(daa): add verified written solutions"
```

## Task 8: Complete ETC Solutions

**Files:**
- Modify: `scripts/solutions/etc/unit1.mjs` through `unit6.mjs`
- Create: `tests/solutions/etc.test.mjs`

- [ ] **Step 1: Write failing ETC coverage tests**

Require Important IDs `etc-q1` through `etc-q18` and all Original references. Assert report, proposal, minutes, letter, memo, and email questions contain the required document sections. Assert ethics answers distinguish attributed IEEE/ACM principles from general professional advice.

- [ ] **Step 2: Run tests and confirm incomplete content**

Run: `node --test tests/solutions/etc.test.mjs`

Expected: FAIL on missing document formats or attribution structure.

- [ ] **Step 3: Author Units 1-3**

Complete `etc-q1` through `etc-q7`: IDLC, print/online comparison, writing process, effective-writing characteristics, collaborative workflow, self-awareness/emotional intelligence, and time management.

- [ ] **Step 4: Author Units 4-6**

Complete `etc-q8` through `etc-q18`: 7 Cs, presentation, group discussion, STAR example, technical report, grant proposal with internally consistent budget/timeline, minutes, business formats, engineering ethics, privacy/safety/IP, and professional email etiquette.

- [ ] **Step 5: Verify ETC content**

Run: `node --test tests/solutions/etc.test.mjs tests/content-schema.test.mjs; npm run build:content; npm run check:content`

Expected: all tests pass and generated ETC content is current.

- [ ] **Step 6: Commit ETC**

```powershell
git add -- scripts/solutions/etc tests/solutions/etc.test.mjs dist/solutions/etc-solutions.js dist/solutions/index.js
git commit -m "feat(etc): add verified written solutions"
```

## Task 9: Run Cross-Subject Content Review

**Files:**
- Modify: `tests/content-schema.test.mjs`
- Modify: `tests/solutions/*.test.mjs`
- Modify: `docs/content-sources/2022-2025-paper-coverage.md`

- [ ] **Step 1: Add full-bank invariants**

Assert all 88 existing non-CN Important IDs remain present, every Original occurrence points to a captured source, all Important questions are 7 marks, all solution references resolve, all marking totals match, and no unsupported year/verified label remains.

- [ ] **Step 2: Run the complete content suite**

Run: `node --test tests/content-schema.test.mjs tests/solutions/*.test.mjs`

Expected: all tests pass. Treat any failure as a content defect, not a test to weaken.

- [ ] **Step 3: Review duplication and answer length**

Check every shared `solutionRef` against all linked wording. Split any canonical answer that does not fully answer one linked prompt. Remove repeated generic paragraphs that do not earn marks.

- [ ] **Step 4: Review diagrams and mathematical notation**

Check ASCII diagrams at narrow width, every state/edge/table label, every numeric trace, and every proof symbol. Replace decorative diagrams with useful exam-copyable ones.

- [ ] **Step 5: Update the coverage report**

Record final counts per subject for Important questions, Original occurrences, canonical solutions, shared references, unavailable papers, and independently checked numerical/formal answers.

- [ ] **Step 6: Commit review corrections**

```powershell
git add -- scripts/questions scripts/solutions tests/content-schema.test.mjs tests/solutions docs/content-sources/2022-2025-paper-coverage.md dist/solutions
git commit -m "fix(content): complete cross-subject solution review"
```

## Task 10: Browser-Verify All Subjects

**Files:**
- Modify: `docs/REVIEW.md`
- Modify only when a defect is reproduced: `dist/app.js`, `dist/style.css`, `dist/question-view.js`

- [ ] **Step 1: Build and serve the candidate**

Run: `npm run check; npm test; npm run build; npx --yes serve build -l 4173`

Expected: checks/tests/build pass and the server exposes the candidate at `http://127.0.0.1:4173`.

- [ ] **Step 2: Verify every subject at 360px**

For CN, COA, FLAT, DBMS, DAA, and ETC, switch between Original and Important, filter each populated unit/year, expand at least one diagram-heavy and one table-heavy solution, save/mark an item, reload, and confirm no horizontal page overflow.

- [ ] **Step 3: Verify every subject at 768px and 1440px**

Repeat category/filter/source/solution checks. Confirm wide tables scroll inside their card, ASCII remains readable, recurrence counts use Original occurrences only, and Important cards never say `Asked in`.

- [ ] **Step 4: Verify offline and update behavior**

Load all subject modules online, switch offline, reopen representative solutions from every subject, then install a second candidate build. Confirm an active quiz defers activation and state survives the eventual update.

- [ ] **Step 5: Record exact evidence**

Add tested routes, viewport widths, test totals, build ID, source coverage counts, and any explicitly unresolved source gaps to `docs/REVIEW.md`.

- [ ] **Step 6: Commit browser fixes and evidence**

```powershell
git add -- dist/app.js dist/style.css dist/question-view.js docs/REVIEW.md
git commit -m "test(pyq): verify all-subject solution bank"
```

## Task 11: Prepare the `0.3.0` Production Release

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `dist/app-meta.js`
- Modify: `README.md`
- Modify: `docs/REVIEW.md`

- [ ] **Step 1: Set synchronized release version**

Set `package.json` and both root package-version fields in `package-lock.json` to `0.3.0`. Leave `dist/app-meta.js` as a build template that `scripts/build.mjs` rewrites to the package version.

- [ ] **Step 2: Run the mandatory release build**

Run with the feature branch comparison base supplied:

`$env:BASE_SHA=(git merge-base HEAD main); npm run release:build`

Expected: content compilation, stale checks, syntax checks, all tests, strict SemVer comparison, and static build pass.

- [ ] **Step 3: Inspect release artifacts**

Confirm `build/release.json` reports version `0.3.0`, the current build ID, and commit metadata when provided. Confirm `build/app-meta.js` and the profile footer show `0.3.0` only.

- [ ] **Step 4: Review the final diff and working tree**

Run: `git diff --check; git status --short; git diff --stat main...HEAD`

Expected: no whitespace errors, no unrelated files, no secrets, no temporary paper downloads, and only intended authored/generated/test/documentation changes.

- [ ] **Step 5: Commit the release version**

```powershell
git add -- package.json package-lock.json dist/app-meta.js README.md docs/REVIEW.md
git commit -m "chore(release): prepare v0.3.0"
```

- [ ] **Step 6: Re-run release verification at the committed SHA**

Run: `$env:BASE_SHA=(git merge-base HEAD main); npm run release:build; git status --short`

Expected: release build passes and the working tree is clean except ignored `build/` output.

## Content Completion Gate

Do not report completion or merge the feature branch until:

- the 24 subject/year source cells are explicitly accounted for;
- every captured 7-mark Original occurrence is transcribed and sourced;
- all 88 existing non-CN Important Questions have complete solutions;
- every CN item is truthfully classified by source and marks;
- all subject-specific correctness tests pass;
- all generated content is current;
- all six subjects pass mobile/tablet/desktop and offline checks;
- strict SemVer reports `0.3.0` consistently;
- the Professor-Invigilator mentor report gives every published solution a final `PASS`, with no unresolved `REVISE` or `BLOCK` findings;
- the mandatory release build passes at the committed SHA.
