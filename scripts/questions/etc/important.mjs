const importantRecords = [
  ['etc-q1', 1, 'Explain the Information Development Life Cycle (IDLC) with its distinct phases from requirement analysis and audience profiling to design and maintenance.', 'idlc lifecycle'],
  ['etc-q2', 1, 'Compare technical information design for print media and online digital media. Discuss differences in layout, typography, navigation, and readability.', 'print vs online media design'],
  ['etc-q3', 2, 'Explain the four major stages of the Technical Writing Process (Pre-writing, Drafting, Revising, Editing) in detail.', 'technical writing process'],
  ['etc-q4', 2, 'Discuss the core characteristics of effective technical writing: Clarity, Conciseness, Accuracy, Objectivity, and Audience Adaptation.', 'technical writing principles'],
  ['etc-q5', 2, 'What is Collaborative Writing? Discuss its advantages, team roles, version control workflows, and common challenges in software engineering teams.', 'collaborative writing'],
  ['etc-q6', 3, 'Explain the role of self-assessment, self-awareness, and emotional intelligence in career planning and professional growth for engineers.', 'self-assessment and emotional intelligence'],
  ['etc-q7', 3, 'Discuss effective Time Management strategies for engineering students, including the Eisenhower Matrix, Pomodoro Technique, and prioritization frameworks.', 'time management techniques'],
  ['etc-q8', 4, 'Explain the 7 C’s of Effective Communication (Completeness, Conciseness, Consideration, Concreteness, Courtesy, Clearness, Correctness).', '7 cs of communication'],
  ['etc-q9', 4, 'Explain how to deliver an impactful technical oral presentation. Discuss audience analysis, slide design guidelines, body language, and managing Q&A sessions.', 'technical oral presentations'],
  ['etc-q10', 4, 'Discuss the dynamics of Group Discussions (GD) as a recruitment tool. What traits do evaluators look for, and what common mistakes must candidates avoid?', 'group discussion dynamics'],
  ['etc-q11', 4, 'Explain the STAR (Situation, Task, Action, Result) method for answering behavioral questions in technical job interviews with a concrete example.', 'star interview method'],
  ['etc-q12', 5, 'Draft a comprehensive outline of a Formal Technical Report on a completed software engineering project with standard sections, formatting, and references.', 'formal technical report'],
  ['etc-q13', 5, 'Draft a Project Proposal requesting financial grant and college resources for an AI-based campus waste management system with objective, budget, and timeline.', 'project proposal drafting'],
  ['etc-q14', 5, 'Explain the format and importance of Minutes of a Meeting (MoM). Draft sample meeting minutes for a college technical symposium planning committee.', 'minutes of meeting'],
  ['etc-q15', 5, 'Differentiate between a Business Letter, an Office Memorandum (Memo), and an Email in terms of tone, structure, and communication scope.', 'business correspondence formats'],
  ['etc-q16', 6, 'Explain Engineering Ethics and the fundamental canons of professional conduct specified by IEEE and ACM codes of ethics.', 'engineering ethics and codes'],
  ['etc-q17', 6, 'Discuss the ethical responsibilities of software engineers regarding user data privacy, software safety, and intellectual property rights.', 'software privacy and safety ethics'],
  ['etc-q18', 6, 'Explain professional email etiquette in corporate settings. List 8 essential dos and don’ts when communicating with clients or senior management.', 'email etiquette and professional conduct']
];

export const etcImportantQuestions = importantRecords.map(([id, unit, question, topic]) => ({
  id,
  canonicalId: id,
  kind: 'important',
  subject: 'etc',
  unit,
  question,
  marks: 7,
  topics: [topic],
  solutionRef: id
}));
