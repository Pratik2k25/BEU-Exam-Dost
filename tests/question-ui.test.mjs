import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  filterWrittenQuestions,
  questionSourceLabel,
  renderQuestionFilters,
  questionEmptyState,
} from '../dist/question-view.js';

test('marking allocation is presented as a suggested guide, not an official BEU scheme', () => {
  const appSource = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
  assert.match(appSource, /Suggested Point-wise Marking Guide/);
  assert.doesNotMatch(appSource, /BEU Point-wise Marking Scheme/);
});

test('filterWrittenQuestions filters by kind, unit, year, and saved state', () => {
  const items = [
    {id: 'orig-1', kind: 'original', unit: 1, source: {year: 2024, paperCode: '154501', questionNumber: '2(a)'}},
    {id: 'orig-2', kind: 'original', unit: 2, source: {year: 2023, paperCode: '154501', questionNumber: '3(b)'}},
    {id: 'imp-1', kind: 'important', unit: 1},
    {id: 'imp-2', kind: 'important', unit: 2},
  ];

  // Default: original
  assert.deepEqual(
    filterWrittenQuestions(items, {kind: 'original'}).map(i => i.id),
    ['orig-1', 'orig-2'],
  );

  // Filter by kind: important
  assert.deepEqual(
    filterWrittenQuestions(items, {kind: 'important'}).map(i => i.id),
    ['imp-1', 'imp-2'],
  );

  // Filter by unit
  assert.deepEqual(
    filterWrittenQuestions(items, {kind: 'original', unit: 1}).map(i => i.id),
    ['orig-1'],
  );

  // Filter by year
  assert.deepEqual(
    filterWrittenQuestions(items, {kind: 'original', year: 2024}).map(i => i.id),
    ['orig-1'],
  );

  // Filter by saved state
  assert.deepEqual(
    filterWrittenQuestions(items, {kind: 'important', savedOnly: true, saved: ['imp-2']}).map(i => i.id),
    ['imp-2'],
  );
});

test('questionSourceLabel formats original and important sources truthfully', () => {
  const originalItem = {
    kind: 'original',
    source: {year: 2024, paperCode: '154501', questionNumber: '2(a)'},
  };
  assert.equal(
    questionSourceLabel(originalItem),
    'BEU 2024 · 154501 · Q.2(a)',
  );

  const importantItem = {kind: 'important'};
  assert.equal(
    questionSourceLabel(importantItem),
    'Important 7-Mark Question',
  );
  assert.equal(questionSourceLabel({kind:'original',source:{year:2025,session:'supplementary',paperCode:'105401',questionNumber:'Q3(a)'}}),'BEU 2025 (S) · 105401 · Q.3(a)');
});

test('PYQ cards retain exam metadata without public source-scan links', () => {
  const appSource = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(appSource, /questionSourceLink|source-link|View source scan/);
  assert.match(appSource, /questionSourceLabel\(q\)/);
});

test('renderQuestionFilters renders category chips and conditional year selector', () => {
  const units = [{id: 1, title: 'Unit 1'}, {id: 2, title: 'Unit 2'}];
  const years = [2024, 2023, 2022];

  // Original mode: includes both kind chips and year selector
  const origHtml = renderQuestionFilters({kind: 'original', units, years});
  assert.match(origHtml, /data-kind="original"/);
  assert.match(origHtml, /data-kind="important"/);
  assert.match(origHtml, /id="pyq-year"/);

  // Important mode: year selector omitted
  const impHtml = renderQuestionFilters({kind: 'important', units, years});
  assert.match(impHtml, /data-kind="original"/);
  assert.match(impHtml, /data-kind="important"/);
  assert.equal(impHtml.includes('id="pyq-year"'), false);
});

test('questionEmptyState provides truthful messaging per category', () => {
  assert.match(questionEmptyState('original', false), /verified original PYQ/i);
  assert.match(questionEmptyState('important', false), /important questions/i);
  assert.match(questionEmptyState('important', true), /No saved questions/i);
});
