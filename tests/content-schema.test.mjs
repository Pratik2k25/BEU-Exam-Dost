import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {cnQuestions as compiledCnQuestions, cnSolutions as compiledCnSolutions} from '../dist/solutions/cn-solutions.js';
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

test('CN migration preserves original, legacy, and supplemental questions while separating marks', () => {
  const importantSolutions = [
    ...unit1Solutions,
    ...unit2Solutions,
    ...unit3Solutions,
    ...unit4Solutions,
    ...unit5Solutions,
    ...unit6Solutions,
  ];
  const migratedQuestions = [...cnOriginalQuestions, ...cnImportantQuestions, ...cnSupplementalQuestions];
  const migratedSolutions = [...importantSolutions, ...cnSupplementalSolutions];
  const questionById = new Map(migratedQuestions.map((question) => [question.id, question]));
  const solutionById = new Map(migratedSolutions.map((solution) => [solution.id, solution]));
  const expectedIds = [
    ...cnOriginalQuestions.map(({id}) => id),
    'cn-q1', 'cn-q10', 'cn-q11', 'cn-q12', 'cn-q13', 'cn-q14', 'cn-q15', 'cn-q16',
    'cn-q17', 'cn-q18', 'cn-q2', 'cn-q20', 'cn-q21', 'cn-q28', 'cn-q29', 'cn-q3',
    'cn-q30', 'cn-q31', 'cn-q32', 'cn-q33', 'cn-q34', 'cn-q35', 'cn-q36', 'cn-q37',
    'cn-q38', 'cn-q39', 'cn-q4', 'cn-q40', 'cn-q41', 'cn-q42', 'cn-q43', 'cn-q44',
    'cn-q45', 'cn-q46', 'cn-q47', 'cn-q48', 'cn-q49', 'cn-q5', 'cn-q50', 'cn-q51',
    'cn-q52', 'cn-q53', 'cn-q54', 'cn-q55', 'cn-q56', 'cn-q57', 'cn-q6', 'cn-q7',
    'cn-q8', 'cn-q9',
  ].sort();

  assert.equal(migratedQuestions.length, 98);
  assert.equal(cnOriginalQuestions.length, 48, 'all source-backed CN seven-mark occurrences must be present');
  assert.equal(migratedSolutions.length, solutionById.size, 'solution IDs must be unique');
  assert.equal(questionById.size, 98, 'question IDs must be unique');
  assert.deepEqual([...questionById.keys()].sort(), expectedIds);
  for (const question of migratedQuestions) {
    assert.ok(solutionById.has(question.solutionRef), `missing solution for ${question.id}`);
  }

  for (const compiledQ of compiledCnQuestions) {
    const migratedQuestion = questionById.get(compiledQ.id);
    assert.deepEqual(compiledQ, migratedQuestion, compiledQ.id);
    const migratedSolution = solutionById.get(compiledQ.solutionRef);
    assert.ok(migratedSolution, `missing solution reference ${compiledQ.solutionRef}`);
    assert.deepEqual(
      migratedSolution,
      compiledCnSolutions[compiledQ.solutionRef],
      compiledQ.id,
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

  assert.equal(cnOriginalQuestions.length, 48);
  assert.ok(cnOriginalQuestions.every(({kind, marks, source}) => (
    kind === 'original' && marks === 7 && source.verification === 'cross-checked-scan'
  )));
  assert.deepEqual(
    cnSupplementalQuestions.map(({marks}) => marks).sort((left, right) => left - right),
    [3, 4, 14, 14, 14, 14],
  );
  assert.deepEqual(
    cnSupplementalQuestions.map(({id}) => id).sort(),
    ['cn-q45', 'cn-q46', 'cn-q47', 'cn-q55', 'cn-q56', 'cn-q57'].sort(),
  );

  assert.deepEqual(
    validateSubjectContent(
      'cn',
      cnImportantQuestions,
      importantSolutions.filter(({id}) => cnImportantQuestions.some((question) => question.solutionRef === id)),
    ),
    {
      subject: 'cn',
      questions: cnImportantQuestions,
      solutions: importantSolutions.filter(({id}) => cnImportantQuestions.some((question) => question.solutionRef === id)),
    },
  );
  for (const question of cnSupplementalQuestions) {
    assert.equal(question.kind, 'supplemental');
    assert.equal(question.subject, 'cn');
    assert.equal(Object.hasOwn(question, 'years'), false);
    assert.equal(Object.hasOwn(question, 'source'), false);
    validateSolution(solutionById.get(question.solutionRef), question.marks);
  }
});

test('CN 2025 Q3(a) original CRC answer has scan provenance and correct division', () => {
  const question = cnOriginalQuestions.find(({id}) => id === 'cn-original-2025-100602-q3a');
  const solution = unit3Solutions.find(({id}) => id === 'cn-original-2025-100602-q3a');

  assert.ok(question);
  assert.equal(question.kind, 'original');
  assert.equal(question.marks, 7);
  assert.deepEqual(question.source, {
    year: 2025,
    paperCode: '100602',
    questionNumber: 'Q3(a)',
    url: 'docs/content-sources/CN-2025-Q3a-scan.png',
    verification: 'cross-checked-scan',
  });
  assert.ok(solution);
  assert.deepEqual(solution.table.rows, [
    ['1', '1100', '1100 ⊕ 1001', '0101'],
    ['2', '1011', '1011 ⊕ 1001', '0010'],
    ['3', '1000', '1000 ⊕ 1001', '0001'],
    ['4', '1100', '1100 ⊕ 1001', '0101'],
    ['5', '1010', '1010 ⊕ 1001', '0011'],
  ]);
  assert.match(solution.conclusion, /011.*11001001011/);
  assert.match(solution.sections[4].points[0], /remainder <code>000<\/code>/);
  assert.equal(sumMarkingScheme(solution.markingScheme), 7);
});

test('CN 2025 Q3(b) original ALOHA answer has scan provenance and correct maxima', () => {
  const question = cnOriginalQuestions.find(({id}) => id === 'cn-original-2025-100602-q3b');
  const solution = unit3Solutions.find(({id}) => id === 'cn-original-2025-100602-q3b');

  assert.ok(question);
  assert.equal(question.kind, 'original');
  assert.equal(question.question, 'Differentiate between Pure ALOHA and Slotted ALOHA. How does Slotted ALOHA improve the efficiency of Pure ALOHA?');
  assert.equal(question.marks, 7);
  assert.deepEqual(question.source, {
    year: 2025,
    paperCode: '100602',
    questionNumber: 'Q3(b)',
    url: 'docs/content-sources/CN-2025-Q3b-scan.png',
    verification: 'cross-checked-scan',
  });
  assert.ok(solution);
  assert.equal(solution.table.rows[3][1], 'S = G e^(−2G)');
  assert.equal(solution.table.rows[3][2], 'S = G e^(−G)');
  assert.match(solution.sections[1].points[0], /1\/\(2e\) ≈ 0\.184/);
  assert.match(solution.sections[1].points[1], /1\/e ≈ 0\.368/);
  assert.match(solution.sections[1].points[2], /does not mean Slotted ALOHA is exactly twice as efficient at every offered load/);
  assert.equal(sumMarkingScheme(solution.markingScheme), 7);
});

test('important migration extracts the 88 questions truthfully', async () => {
  const {coaImportantQuestions} = await import('../scripts/questions/coa/important.mjs');
  const {flatImportantQuestions} = await import('../scripts/questions/flat/important.mjs');
  const {dbmsImportantQuestions} = await import('../scripts/questions/dbms/important.mjs');
  const {daaImportantQuestions} = await import('../scripts/questions/daa/important.mjs');
  const {etcImportantQuestions} = await import('../scripts/questions/etc/important.mjs');

  const expectedCounts = {
    coa: 15,
    flat: 18,
    dbms: 16,
    daa: 21,
    etc: 18,
  };

  const subjectMaps = {
    coa: coaImportantQuestions,
    flat: flatImportantQuestions,
    dbms: dbmsImportantQuestions,
    daa: daaImportantQuestions,
    etc: etcImportantQuestions,
  };

  for (const [subj, questions] of Object.entries(subjectMaps)) {
    assert.equal(questions.length, expectedCounts[subj], `${subj} count mismatch`);
    for (const q of questions) {
      assert.equal(q.kind, 'important', `${q.id} must be kind: important`);
      assert.equal(q.subject, subj, `${q.id} subject mismatch`);
      assert.equal(q.marks, 7, `${q.id} must be 7 marks`);
      assert.equal(Object.hasOwn(q, 'years'), false, `${q.id} must not have years`);
      assert.equal(Object.hasOwn(q, 'source'), false, `${q.id} must not have source`);
      assert.ok(Array.isArray(q.topics) && q.topics.length > 0, `${q.id} must have topics`);
      assert.ok(q.solutionRef, `${q.id} must have solutionRef`);
    }
  }
});

test('all 88 important questions across 5 non-CN subjects validate against schema and match their Important solutions', async () => {
  const subjects = ['coa', 'flat', 'dbms', 'daa', 'etc'];
  const expectedCounts = {
    coa: 15,
    flat: 18,
    dbms: 16,
    daa: 21,
    etc: 18,
  };

  for (const subj of subjects) {
    const qMod = await import(`../scripts/questions/${subj}/important.mjs`);
    const questions = qMod[`${subj}ImportantQuestions`];
    const solutions = [];

    for (let u = 1; u <= 6; u++) {
      const uMod = await import(`../scripts/solutions/${subj}/unit${u}.mjs`);
      solutions.push(...uMod[`unit${u}Solutions`]);
    }

    assert.equal(questions.length, expectedCounts[subj], `${subj} questions count mismatch`);
    const importantSolutionRefs = new Set(questions.map(({solutionRef}) => solutionRef));
    const importantSolutions = solutions.filter(({id}) => importantSolutionRefs.has(id));

    assert.equal(importantSolutions.length, expectedCounts[subj], `${subj} Important solutions count mismatch`);

    // Validates every question, every solution, 7-mark totals, and 1:1 references
    validateSubjectContent(subj, questions, importantSolutions);
  }
});

test('build-solutions generates browser modules and rejects stale output in check mode', async () => {
  const {buildSolutions} = await import('../scripts/build-solutions.mjs');
  const tempDir = join(tmpdir(), `exam-dost-solutions-${Date.now()}`);

  try {
    // 1. Build into temp directory
    const buildRes = await buildSolutions({outputDir: tempDir, check: false});
    assert.equal(buildRes.written, true);
    assert.equal(buildRes.fileCount, 7); // 6 subjects + index.js

    // 2. Check mode passes when unchanged
    const checkRes = await buildSolutions({outputDir: tempDir, check: true});
    assert.equal(checkRes.checked, true);
    assert.equal(checkRes.fileCount, 7);

    // 3. Mutating one byte triggers 'Generated content is stale' error
    const testFile = join(tempDir, 'cn-solutions.js');
    const originalContent = readFileSync(testFile, 'utf8');
    writeFileSync(testFile, originalContent + '\n// mutation\n');

    await assert.rejects(
      async () => buildSolutions({outputDir: tempDir, check: true}),
      /Generated content is stale/,
    );
  } finally {
    rmSync(tempDir, {recursive: true, force: true});
  }
});

test('written question adapter normalizes all subjects with kind and attached solutions', async () => {
  const {pyqs} = await import('../dist/data.js');
  const subjects = ['coa', 'flat', 'dbms', 'daa', 'etc'];
  const expectedCounts = {
    coa: 105,
    flat: 18,
    dbms: 16,
    daa: 21,
    etc: 18,
  };

  for (const subj of subjects) {
    const questions = pyqs(subj);
    assert.equal(questions.length, expectedCounts[subj], `${subj} count mismatch`);
    for (const q of questions) {
      assert.ok(['important', 'original'].includes(q.kind), `${q.id} must have a supported kind`);
      assert.ok(Array.isArray(q.topics) && q.topics.length > 0, `${q.id} must have topics`);
      assert.ok(q.solution, `${q.id} must have attached solution`);
      assert.equal(q.solution.id, q.solutionRef, `${q.id} solution reference must resolve`);
      if (q.kind === 'important') {
        assert.equal(Object.hasOwn(q, 'years'), false, `${q.id} must not have years`);
      }
    }
  }

  const cnItems = pyqs('cn');
  assert.equal(cnItems.length, 92);
  const cnOriginals = cnItems.filter(({kind}) => kind === 'original');
  assert.equal(cnOriginals.length, 48);
  for (const q of cnItems) {
    assert.ok(q.solution);
    assert.equal(q.solution.id, q.solutionRef);
    if (q.kind === 'original') {
      assert.equal(q.source.verification, 'cross-checked-scan');
      assert.ok(q.source.questionNumber);
    } else {
      assert.equal(q.kind, 'important');
    }
  }
});
