import { SUBJECT_IDS } from './schema.mjs';

export const SUBJECT_ORDER = Object.freeze(['cn', 'coa', 'flat', 'dbms', 'daa', 'etc']);

export const subjectRegistry = Object.freeze([
  { id: 'cn', name: 'Computer Networks' },
  { id: 'coa', name: 'Computer Organization & Architecture' },
  { id: 'flat', name: 'Formal Language & Automata Theory' },
  { id: 'dbms', name: 'Database Management Systems' },
  { id: 'daa', name: 'Design & Analysis of Algorithms' },
  { id: 'etc', name: 'Effective Technical Communication' },
]);

export async function loadSubjectContent(subject) {
  if (!SUBJECT_IDS.includes(subject)) {
    throw new TypeError(`Unknown subject: ${subject}`);
  }

  const origMod = await import(`../questions/${subject}/original.mjs`);
  const impMod = await import(`../questions/${subject}/important.mjs`);

  const originalQuestions = origMod[`${subject}OriginalQuestions`] || [];
  const importantQuestions = impMod[`${subject}ImportantQuestions`] || [];
  const questions = [...originalQuestions, ...importantQuestions];

  const solutions = [];
  for (let u = 1; u <= 6; u++) {
    const uMod = await import(`../solutions/${subject}/unit${u}.mjs`);
    const unitSols = uMod[`unit${u}Solutions`] || [];
    solutions.push(...unitSols);
  }

  return {
    subject,
    questions,
    solutions,
  };
}

export async function loadAllSubjects() {
  const subjects = [];
  for (const id of SUBJECT_ORDER) {
    subjects.push(await loadSubjectContent(id));
  }
  return subjects;
}
