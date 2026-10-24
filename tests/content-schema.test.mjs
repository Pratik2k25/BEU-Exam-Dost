import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sumMarkingScheme,
  validateQuestion,
  validateSolution,
  validateSubjectContent,
} from '../scripts/content/schema.mjs';

const importantQuestion = {
  id: 'coa-important-01',
  canonicalId: 'coa-u1-number-representation',
  kind: 'important',
  subject: 'coa',
  unit: 1,
  question: 'Explain signed number representation with examples.',
  marks: 7,
  topics: ['number representation', 'signed integers'],
  solutionRef: 'coa-solution-01',
};

const originalQuestion = {
  id: 'coa-2024-2a',
  canonicalId: 'coa-u1-number-representation',
  kind: 'original',
  subject: 'coa',
  unit: 1,
  question: 'Explain signed number representation with examples.',
  marks: 7,
  topics: ['number representation', 'signed integers'],
  solutionRef: 'coa-solution-01',
  source: {
    year: 2024,
    paperCode: '154501',
    questionNumber: '2(a)',
    url: 'https://example.edu/coa-2024.pdf',
    verification: 'official',
  },
};

const validSolution = {
  id: 'coa-solution-01',
  verified: 'faculty-reviewed',
  intro: 'Signed representations encode positive and negative binary integers.',
  diagrams: [{title: 'Sign-magnitude layout', ascii: '[sign][magnitude]'}],
  sections: [
    {
      heading: 'Common representations',
      points: ['Sign magnitude uses the leading bit.', 'Two\'s complement supports direct arithmetic.'],
    },
  ],
  conclusion: 'Two\'s complement is preferred for arithmetic hardware.',
  markingScheme: [
    {component: 'Definition', marks: '2'},
    {component: 'Representations', marks: '3'},
    {component: 'Example and conclusion', marks: '2'},
  ],
  examTip: 'Show the bit pattern and state the assumed word size.',
};

test('important question rejects years and source', () => {
  assert.throws(() => validateQuestion({...importantQuestion, years: [2024]}));
  assert.throws(() => validateQuestion({...importantQuestion, source: originalQuestion.source}));
});

test('original question accepts complete source but rejects empty paperCode', () => {
  assert.equal(validateQuestion(originalQuestion), originalQuestion);
  assert.throws(() => validateQuestion({
    ...originalQuestion,
    source: {...originalQuestion.source, paperCode: ''},
  }));
});

test('solution marking scheme must total the question marks exactly', () => {
  assert.equal(sumMarkingScheme(validSolution.markingScheme), 7);
  assert.equal(validateSolution(validSolution, 7), validSolution);

  const shortScheme = validSolution.markingScheme.map((item, index) => (
    index === 2 ? {...item, marks: '1.5'} : item
  ));
  assert.throws(() => validateSolution({...validSolution, markingScheme: shortScheme}, 7));
});

test('subject content rejects duplicate question IDs and missing solution references', () => {
  assert.throws(() => validateSubjectContent(
    'coa',
    [importantQuestion, {...originalQuestion, id: importantQuestion.id}],
    [validSolution],
  ));

  assert.throws(() => validateSubjectContent(
    'coa',
    [{...importantQuestion, solutionRef: 'missing-solution'}],
    [validSolution],
  ));
});
