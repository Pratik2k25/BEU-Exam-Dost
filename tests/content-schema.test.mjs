import test from 'node:test';
import assert from 'node:assert/strict';
import {allCnPyqs, cnSolutions as legacyCnSolutions} from '../dist/cn-solutions.js';
import {compileSubjectModule} from '../scripts/content/compiler.mjs';
import {
  sumMarkingScheme,
  validateQuestion,
  validateSolution,
  validateSubjectContent,
} from '../scripts/content/schema.mjs';
import {
  cnImportantQuestions,
  cnSupplementalQuestions,
} from '../scripts/questions/cn/important.mjs';
import {cnOriginalQuestions} from '../scripts/questions/cn/original.mjs';
import {unit1Solutions} from '../scripts/solutions/cn/unit1.mjs';
import {unit2Solutions} from '../scripts/solutions/cn/unit2.mjs';
import {unit3Solutions} from '../scripts/solutions/cn/unit3.mjs';
import {unit4Solutions} from '../scripts/solutions/cn/unit4.mjs';
import {unit5Solutions} from '../scripts/solutions/cn/unit5.mjs';
import {unit6Solutions} from '../scripts/solutions/cn/unit6.mjs';
import {cnSupplementalSolutions} from '../scripts/solutions/cn/supplemental.mjs';

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
  table: {
    title: 'Representation comparison',
    headers: ['Representation', 'Key property'],
    rows: [['Two\'s complement', 'Single representation for zero']],
  },
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
  assert.throws(() => validateQuestion({...importantQuestion, years: [2024]}), /years/);
  assert.throws(
    () => validateQuestion({...importantQuestion, source: originalQuestion.source}),
    /source/,
  );
});

test('original question accepts complete source but rejects empty paperCode', () => {
  assert.equal(validateQuestion(originalQuestion), originalQuestion);
  assert.throws(() => validateQuestion({
    ...originalQuestion,
    source: {...originalQuestion.source, paperCode: ''},
  }), /paperCode/);
});

test('original question accepts a bundled source-file reference', () => {
  const safeReferences = [
    'docs/content-sources/coa-2024.pdf',
    'docs/content-sources/COA 2024 (official).pdf',
    'https://example.edu/papers/COA%202024.pdf',
    'https://example.edu/paper?download=100%25',
    'https://example.edu/paper?sig=a%252Fb',
  ];

  for (const url of safeReferences) {
    const question = {...originalQuestion, source: {...originalQuestion.source, url}};
    assert.equal(validateQuestion(question), question, url);
  }
});

test('original question rejects unsafe source references', () => {
  const unsafeReferences = [
    'javascript:alert(1)',
    'http://example.edu/coa-2024.pdf',
    '../secret.pdf',
    'docs/content-sources/../secret.pdf',
    'C:\\secret.pdf',
    '/absolute.pdf',
    'not a source reference',
    'docs/content-sources/%2e%2e%5csecret.pdf',
    'docs/content-sources/%5c..%5csecret.pdf',
    'docs/content-sources/%252e%252e/secret.pdf',
    'docs/content-sources/%2E%2E%5Csecret.pdf',
    'docs/content-sources/coa%00.pdf',
    'docs/content-sources/coa\u0000.pdf',
    'https://example.edu/%5c..%5csecret.pdf',
    'https://example.edu/%5C..%5Csecret.pdf',
    'https://example.edu/%252e%252e/secret.pdf',
    'https://example.edu/%25252e%25252e/secret.pdf',
    'https://example.edu/%255c..%255csecret.pdf',
    'https://user:pass@example.edu/coa-2024.pdf',
    'https://example.edu/coa-\u0001-2024.pdf',
  ];

  for (const url of unsafeReferences) {
    assert.throws(
      () => validateQuestion({...originalQuestion, source: {...originalQuestion.source, url}}),
      /source\.url/,
      url,
    );
  }
});

test('solution marking scheme must total the question marks exactly', () => {
  assert.equal(sumMarkingScheme(validSolution.markingScheme), 7);
  assert.equal(validateSolution(validSolution, 7), validSolution);

  const shortScheme = validSolution.markingScheme.map((item, index) => (
    index === 2 ? {...item, marks: '1.5'} : item
  ));
  assert.throws(
    () => validateSolution({...validSolution, markingScheme: shortScheme}, 7),
    /marking scheme/,
  );
});

test('solution table requires every cell to be a non-empty string', () => {
  assert.equal(validateSolution(validSolution, 7), validSolution);

  for (const cell of [null, {}, 1n, '']) {
    const table = {...validSolution.table, rows: [['Two\'s complement', cell]]};
    assert.throws(
      () => validateSolution({...validSolution, table}, 7),
      /table\.rows\[0\]\[1\]/,
      String(cell),
    );
  }
});

test('subject content rejects duplicate question IDs and missing solution references', () => {
  assert.throws(() => validateSubjectContent(
    'coa',
    [importantQuestion, {...originalQuestion, id: importantQuestion.id}],
    [validSolution],
  ), /duplicate question id/);

  assert.throws(() => validateSubjectContent(
    'coa',
    [{...importantQuestion, solutionRef: 'missing-solution'}],
    [validSolution],
  ), /missing solution reference/);
});

test('subject content accepts valid questions with distinct IDs and solution references', () => {
  const secondSolution = {...validSolution, id: 'coa-solution-02'};
  const questions = [
    importantQuestion,
    {...originalQuestion, solutionRef: secondSolution.id},
  ];
  const solutions = [validSolution, secondSolution];

  assert.deepEqual(
    validateSubjectContent('coa', questions, solutions),
    {subject: 'coa', questions, solutions},
  );
});

test('subject content rejects ambiguous solutions, orphan solutions, and subject mismatches', () => {
  const secondSolution = {...validSolution, id: 'coa-solution-02'};
  const cases = [
    {
      name: 'duplicate solution IDs',
      questions: [importantQuestion],
      solutions: [validSolution, {...validSolution}],
      match: /duplicate solution id/,
    },
    {
      name: 'orphan solution',
      questions: [importantQuestion],
      solutions: [validSolution, secondSolution],
      match: /must serve exactly one mark value/,
    },
    {
      name: 'one solution serving 7- and 14-mark questions',
      questions: [importantQuestion, {...originalQuestion, marks: 14}],
      solutions: [validSolution],
      match: /must serve exactly one mark value/,
    },
    {
      name: 'question subject mismatch',
      questions: [{...importantQuestion, subject: 'cn'}],
      solutions: [validSolution],
      match: /question subject does not match content subject/,
    },
  ];

  for (const {name, questions, solutions, match} of cases) {
    assert.throws(
      () => validateSubjectContent('coa', questions, solutions),
      match,
      name,
    );
  }
});

test('compiler output is deterministic without mutating caller arrays', () => {
  const secondSolution = {...validSolution, id: 'coa-solution-02'};
  const questions = [
    {...originalQuestion, solutionRef: secondSolution.id},
    importantQuestion,
  ];
  const solutions = [secondSolution, validSolution];
  const questionsBefore = structuredClone(questions);
  const solutionsBefore = structuredClone(solutions);

  const firstOutput = compileSubjectModule({subject: 'coa', questions, solutions});
  const repeatedOutput = compileSubjectModule({subject: 'coa', questions, solutions});
  const reorderedOutput = compileSubjectModule({
    subject: 'coa',
    questions: [...questions].reverse(),
    solutions: [...solutions].reverse(),
  });

  assert.equal(firstOutput, repeatedOutput);
  assert.equal(firstOutput, reorderedOutput);
  assert.match(firstOutput, /export const coaQuestions/);
  assert.match(firstOutput, /export const coaSolutions/);
  assert.deepEqual(questions, questionsBefore);
  assert.deepEqual(solutions, solutionsBefore);
});

test('compiler deterministically orders canonically equivalent IDs by UTF-16 code units', () => {
  const decomposedSolution = {...validSolution, id: 'coa-solution-e\u0301'};
  const composedSolution = {...validSolution, id: 'coa-solution-é'};
  const questions = [
    {...importantQuestion, id: 'coa-question-e\u0301', solutionRef: decomposedSolution.id},
    {...originalQuestion, id: 'coa-question-é', solutionRef: composedSolution.id},
  ];
  const solutions = [decomposedSolution, composedSolution];

  const originalOutput = compileSubjectModule({subject: 'coa', questions, solutions});
  const reversedOutput = compileSubjectModule({
    subject: 'coa',
    questions: [...questions].reverse(),
    solutions: [...solutions].reverse(),
  });

  assert.equal(originalOutput, reversedOutput);
});

test('compiler preserves __proto__ as an own solution key in generated modules', async () => {
  const protoSolution = {...validSolution, id: '__proto__'};
  const protoQuestion = {...importantQuestion, solutionRef: protoSolution.id};
  const output = compileSubjectModule({
    subject: 'coa',
    questions: [protoQuestion],
    solutions: [protoSolution],
  });
  const moduleUrl = new URL(`data:text/javascript;charset=utf-8,${encodeURIComponent(output)}`);
  moduleUrl.hash = `test-${crypto.randomUUID()}`;

  const compiled = await import(moduleUrl.href);

  assert.equal(Object.hasOwn(compiled.coaSolutions, '__proto__'), true);
  assert.deepEqual(Object.keys(compiled.coaSolutions), ['__proto__']);
  assert.deepEqual(compiled.coaSolutions.__proto__, protoSolution);
  assert.deepEqual(compiled.coaQuestions, [protoQuestion]);
});

test('CN migration preserves every legacy question and solution while separating marks', () => {
  const importantSolutions = [
    ...unit1Solutions,
    ...unit2Solutions,
    ...unit3Solutions,
    ...unit4Solutions,
    ...unit5Solutions,
    ...unit6Solutions,
  ];
  const migratedQuestions = [...cnImportantQuestions, ...cnSupplementalQuestions];
  const migratedSolutions = [...importantSolutions, ...cnSupplementalSolutions];
  const questionById = new Map(migratedQuestions.map((question) => [question.id, question]));
  const solutionById = new Map(migratedSolutions.map((solution) => [solution.id, solution]));
  const legacyIds = allCnPyqs.map((question) => question.id).sort();

  assert.equal(migratedQuestions.length, 50);
  assert.equal(migratedSolutions.length, 50);
  assert.equal(questionById.size, 50, 'question IDs must be unique');
  assert.equal(solutionById.size, 50, 'solution IDs must be unique');
  assert.deepEqual([...questionById.keys()].sort(), legacyIds);
  assert.deepEqual([...solutionById.keys()].sort(), legacyIds);

  for (const legacyQuestion of allCnPyqs) {
    const migratedQuestion = questionById.get(legacyQuestion.id);
    assert.deepEqual(
      {
        id: migratedQuestion.id,
        unit: migratedQuestion.unit,
        question: migratedQuestion.question,
        marks: migratedQuestion.marks,
      },
      {
        id: legacyQuestion.id,
        unit: legacyQuestion.unit,
        question: legacyQuestion.question,
        marks: legacyQuestion.marks,
      },
      legacyQuestion.id,
    );
    assert.equal(migratedQuestion.solutionRef, legacyQuestion.id, legacyQuestion.id);

    const migratedSolution = solutionById.get(migratedQuestion.solutionRef);
    assert.deepEqual(
      migratedSolution,
      {id: legacyQuestion.id, ...legacyCnSolutions[legacyQuestion.id]},
      legacyQuestion.id,
    );
  }

  assert.equal(cnImportantQuestions.length, 44);
  for (const question of cnImportantQuestions) {
    assert.equal(question.kind, 'important');
    assert.equal(question.subject, 'cn');
    assert.equal(question.marks, 7);
    assert.equal(Object.hasOwn(question, 'years'), false);
    assert.equal(Object.hasOwn(question, 'source'), false);
    assert.equal(question.canonicalId, question.id);
    assert.ok(question.topics.length > 0);
  }

  assert.deepEqual(cnOriginalQuestions, []);
  assert.deepEqual(
    cnSupplementalQuestions.map(({marks}) => marks).sort((left, right) => left - right),
    [3, 4, 14, 14, 14, 14],
  );
  assert.deepEqual(
    cnSupplementalQuestions.map(({id}) => id).sort(),
    allCnPyqs.filter(({marks}) => marks !== 7).map(({id}) => id).sort(),
  );

  assert.deepEqual(
    validateSubjectContent('cn', cnImportantQuestions, importantSolutions),
    {subject: 'cn', questions: cnImportantQuestions, solutions: importantSolutions},
  );
  for (const question of cnSupplementalQuestions) {
    assert.equal(question.kind, 'supplemental');
    assert.equal(question.subject, 'cn');
    assert.equal(Object.hasOwn(question, 'years'), false);
    assert.equal(Object.hasOwn(question, 'source'), false);
    validateSolution(solutionById.get(question.solutionRef), question.marks);
  }
});
