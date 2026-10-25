import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterWrittenQuestions,
  questionSourceLabel,
  questionSourceLink,
  renderQuestionFilters,
  questionEmptyState,
} from '../dist/question-view.js';

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
});

test('questionSourceLink resolves bundled scans from the app root and labels them as scans', () => {
  assert.deepEqual(questionSourceLink({
    kind: 'original',
    source: {
      url: 'docs/content-sources/CN-2025-Q3a-scan.png',
      verification: 'cross-checked-scan',
    },
  }), {
    href: '/docs/content-sources/CN-2025-Q3a-scan.png',
    label: 'View source scan',
  });
  assert.deepEqual(questionSourceLink({
    kind: 'original',
    source: {url: 'https://example.edu/paper.pdf', verification: 'official'},
  }), {
    href: 'https://example.edu/paper.pdf',
    label: 'Official paper',
  });
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
