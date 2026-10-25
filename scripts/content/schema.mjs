import {posix as posixPath} from 'node:path';

export const SUBJECT_IDS = Object.freeze(['cn', 'coa', 'flat', 'dbms', 'daa', 'etc']);
export const QUESTION_KINDS = Object.freeze(['original', 'important']);
export const SOURCE_VERIFICATIONS = Object.freeze(['official', 'cross-checked-scan']);

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`);
  }
}

function requireString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${label} must be a non-empty string`);
  }
}

function requireAllowed(value, allowed, label) {
  if (!allowed.includes(value)) {
    throw new TypeError(`${label} is not allowed`);
  }
}

const SOURCE_PATH_PREFIX = 'docs/content-sources/';
const SOURCE_PATH_ROOT = 'docs/content-sources';
const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;
const SAFE_PATH_SEGMENT = /^[A-Za-z0-9 _().-]+$/;

function invalidSourceReference() {
  throw new TypeError('question.source.url must be a safe HTTPS URL or bundled source path');
}

function requireBundledSourcePath(value) {
  if (!value.startsWith(SOURCE_PATH_PREFIX)
      || value.includes('\\')
      || value.includes('%')
      || value.includes('?')
      || value.includes('#')
      || value.includes(':')
      || CONTROL_CHARACTER.test(value)
      || posixPath.isAbsolute(value)) {
    invalidSourceReference();
  }

  const segments = value.split('/');
  const fileSegments = segments.slice(2);
  if (fileSegments.length === 0
      || fileSegments.some((segment) => (
        segment === ''
        || segment === '.'
        || segment === '..'
        || !SAFE_PATH_SEGMENT.test(segment)
      ))) {
    invalidSourceReference();
  }

  const normalized = posixPath.normalize(value);
  const relative = posixPath.relative(SOURCE_PATH_ROOT, normalized);
  if (normalized !== value
      || relative === ''
      || relative === '.'
      || relative === '..'
      || relative.startsWith('../')
      || posixPath.isAbsolute(relative)) {
    invalidSourceReference();
  }
}

function requireHttpsSourceUrl(value) {
  if (value.includes('\\') || CONTROL_CHARACTER.test(value)) {
    invalidSourceReference();
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    invalidSourceReference();
  }

  if (url.protocol !== 'https:'
      || url.hostname === ''
      || url.username !== ''
      || url.password !== '') {
    invalidSourceReference();
  }

  let pathname = url.pathname;
  for (let depth = 0; depth < 8; depth += 1) {
    if (pathname.includes('\\')
        || CONTROL_CHARACTER.test(pathname)
        || pathname.split('/').some((segment) => segment === '.' || segment === '..')) {
      invalidSourceReference();
    }

    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return;
    }
    if (decoded === pathname) return;
    pathname = decoded;
  }

  invalidSourceReference();
}

function requireSourceReference(value) {
  if (value.startsWith(SOURCE_PATH_PREFIX)) {
    requireBundledSourcePath(value);
    return;
  }
  requireHttpsSourceUrl(value);
}

export function sumMarkingScheme(items) {
  if (!Array.isArray(items)) throw new TypeError('markingScheme must be an array');
  return items.reduce((total, item) => total + Number(item.marks), 0);
}

export function validateQuestion(question) {
  requireObject(question, 'question');
  for (const key of ['id', 'canonicalId', 'kind', 'subject', 'question', 'solutionRef']) {
    requireString(question[key], `question.${key}`);
  }
  requireAllowed(question.kind, QUESTION_KINDS, 'question.kind');
  requireAllowed(question.subject, SUBJECT_IDS, 'question.subject');
  if (!Number.isInteger(question.unit) || question.unit < 1 || question.unit > 6) {
    throw new TypeError('question.unit must be an integer from 1 to 6');
  }
  if (!Number.isInteger(question.marks) || question.marks <= 0) {
    throw new TypeError('question.marks must be a positive integer');
  }
  if (!Array.isArray(question.topics) || question.topics.length === 0) {
    throw new TypeError('question.topics must be a non-empty array');
  }
  question.topics.forEach((topic, index) => requireString(topic, `question.topics[${index}]`));

  if (question.kind === 'important') {
    if (hasOwn(question, 'years')) throw new TypeError('important question must not have years');
    if (hasOwn(question, 'source')) throw new TypeError('important question must not have source');
    if (question.marks !== 7) throw new TypeError('important question must be worth 7 marks');
    return question;
  }

  requireObject(question.source, 'question.source');
  if (!Number.isInteger(question.source.year)
      || question.source.year < 2022
      || question.source.year > 2025) {
    throw new TypeError('question.source.year must be an integer from 2022 to 2025');
  }
  for (const key of ['paperCode', 'questionNumber', 'url', 'verification']) {
    requireString(question.source[key], `question.source.${key}`);
  }
  requireAllowed(
    question.source.verification,
    SOURCE_VERIFICATIONS,
    'question.source.verification',
  );
  if (hasOwn(question.source, 'session')) {
    requireAllowed(question.source.session, ['regular', 'supplementary'], 'question.source.session');
  }
  requireSourceReference(question.source.url);
  return question;
}

function validateTable(table) {
  requireObject(table, 'solution.table');
  requireString(table.title, 'solution.table.title');
  if (!Array.isArray(table.headers) || table.headers.length === 0) {
    throw new TypeError('solution.table.headers must be a non-empty array');
  }
  table.headers.forEach((header, index) => requireString(header, `solution.table.headers[${index}]`));
  if (!Array.isArray(table.rows)) throw new TypeError('solution.table.rows must be an array');
  table.rows.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== table.headers.length) {
      throw new TypeError(`solution.table.rows[${index}] must match the header width`);
    }
    row.forEach((cell, cellIndex) => (
      requireString(cell, `solution.table.rows[${index}][${cellIndex}]`)
    ));
  });
}

export function validateSolution(solution, marks) {
  requireObject(solution, 'solution');
  for (const key of ['id', 'verified', 'intro', 'conclusion', 'examTip']) {
    requireString(solution[key], `solution.${key}`);
  }
  if (!Number.isInteger(marks) || marks <= 0) {
    throw new TypeError('target marks must be a positive integer');
  }

  if (hasOwn(solution, 'diagrams')) {
    if (!Array.isArray(solution.diagrams)) throw new TypeError('solution.diagrams must be an array');
    solution.diagrams.forEach((diagram, index) => {
      requireObject(diagram, `solution.diagrams[${index}]`);
      requireString(diagram.title, `solution.diagrams[${index}].title`);
      requireString(diagram.ascii, `solution.diagrams[${index}].ascii`);
    });
  }
  if (hasOwn(solution, 'table')) validateTable(solution.table);

  if (!Array.isArray(solution.sections) || solution.sections.length === 0) {
    throw new TypeError('solution.sections must be a non-empty array');
  }
  solution.sections.forEach((section, sectionIndex) => {
    requireObject(section, `solution.sections[${sectionIndex}]`);
    requireString(section.heading, `solution.sections[${sectionIndex}].heading`);
    if (!Array.isArray(section.points) || section.points.length === 0) {
      throw new TypeError(`solution.sections[${sectionIndex}].points must be a non-empty array`);
    }
    section.points.forEach((point, pointIndex) => (
      requireString(point, `solution.sections[${sectionIndex}].points[${pointIndex}]`)
    ));
  });

  if (!Array.isArray(solution.markingScheme) || solution.markingScheme.length === 0) {
    throw new TypeError('solution.markingScheme must be a non-empty array');
  }
  solution.markingScheme.forEach((item, index) => {
    requireObject(item, `solution.markingScheme[${index}]`);
    requireString(item.component, `solution.markingScheme[${index}].component`);
    if ((typeof item.marks !== 'number' && typeof item.marks !== 'string')
        || (typeof item.marks === 'string' && item.marks.trim() === '')
        || !Number.isFinite(Number(item.marks))
        || Number(item.marks) <= 0) {
      throw new TypeError(`solution.markingScheme[${index}].marks must be positive and numeric`);
    }
  });
  if (Math.abs(sumMarkingScheme(solution.markingScheme) - marks) > 1e-9) {
    throw new TypeError('solution marking scheme must equal the target marks');
  }
  return solution;
}

export function validateSubjectContent(subject, questions, solutions) {
  requireAllowed(subject, SUBJECT_IDS, 'subject');
  if (!Array.isArray(questions)) throw new TypeError('questions must be an array');
  if (!Array.isArray(solutions)) throw new TypeError('solutions must be an array');

  const questionIds = new Set();
  for (const question of questions) {
    validateQuestion(question);
    if (question.subject !== subject) throw new TypeError('question subject does not match content subject');
    if (questionIds.has(question.id)) throw new TypeError(`duplicate question id: ${question.id}`);
    questionIds.add(question.id);
  }

  const solutionById = new Map();
  for (const solution of solutions) {
    requireObject(solution, 'solution');
    requireString(solution.id, 'solution.id');
    if (solutionById.has(solution.id)) throw new TypeError(`duplicate solution id: ${solution.id}`);
    solutionById.set(solution.id, solution);
  }

  const marksBySolution = new Map(solutions.map((solution) => [solution.id, new Set()]));
  for (const question of questions) {
    if (!solutionById.has(question.solutionRef)) {
      throw new TypeError(`missing solution reference: ${question.solutionRef}`);
    }
    marksBySolution.get(question.solutionRef).add(question.marks);
  }

  for (const solution of solutions) {
    const markValues = marksBySolution.get(solution.id);
    if (markValues.size !== 1) {
      throw new TypeError(`solution ${solution.id} must serve exactly one mark value`);
    }
    validateSolution(solution, markValues.values().next().value);
  }

  return {subject, questions, solutions};
}
