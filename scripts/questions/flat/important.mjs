const importantRecords = [
  ['flat-q1', 1, 'Explain the Chomsky Hierarchy of grammars with language types (Type 0, 1, 2, 3), production rule formats, recognizing automata, and practical examples.', 'chomsky hierarchy'],
  ['flat-q2', 1, 'Define alphabet, string, language, grammar, and derivations. Differentiate between Leftmost and Rightmost derivations with parse tree illustrations.', 'formal grammars and derivations'],
  ['flat-q3', 2, 'Convert an NFA with ε-transitions into an equivalent DFA using subset construction. Show the transition table and resulting state diagram.', 'nfa to dfa conversion'],
  ['flat-q4', 2, 'State and prove the Pumping Lemma for Regular Languages. Prove that L = {0^n 1^n | n >= 1} is not a regular language.', 'pumping lemma for regular languages'],
  ['flat-q5', 2, 'Explain the DFA State Minimization procedure using the Myhill-Nerode table-filling partitioning algorithm with a worked example.', 'dfa minimization'],
  ['flat-q6', 2, 'State Arden’s Theorem. Explain how to find the regular expression of a finite automaton using Arden’s theorem with a step-by-step example.', 'ardens theorem'],
  ['flat-q7', 3, 'What is an ambiguous grammar? Prove that the grammar E -> E + E | E * E | id is ambiguous by constructing two distinct leftmost derivations and parse trees for id + id * id.', 'grammar ambiguity'],
  ['flat-q8', 3, 'Explain the step-by-step conversion of a Context-Free Grammar (CFG) into Chomsky Normal Form (CNF) with an illustrative example.', 'chomsky normal form'],
  ['flat-q9', 3, 'Construct a Pushdown Automaton (PDA) for the language L = {w c w^R | w in {a, b}*}. Explain transitions for acceptance by empty stack and final state.', 'pushdown automata'],
  ['flat-q10', 3, 'State the Pumping Lemma for Context-Free Languages (CFL). Prove that L = {a^n b^n c^n | n >= 1} is not context-free.', 'pumping lemma for cfl'],
  ['flat-q11', 4, 'Explain Context-Sensitive Grammars (CSG) and Context-Sensitive Languages (CSL). How does CSG differ from CFG in production structure?', 'context-sensitive grammars'],
  ['flat-q12', 4, 'Explain the model and working of Linear Bounded Automata (LBA) and discuss how LBA accepts context-sensitive languages.', 'linear bounded automata'],
  ['flat-q13', 5, 'Design a standard Turing Machine (TM) to recognize the language L = {0^n 1^n | n >= 1}. Draw its state transition diagram and write instantaneous descriptions for input 0011.', 'turing machine design'],
  ['flat-q14', 5, 'Differentiate between Recursive Languages (Turing-decidable) and Recursively Enumerable Languages (Turing-recognizable). Discuss their closure properties.', 'decidable and re languages'],
  ['flat-q15', 5, 'Explain variants of Turing Machines (Multi-tape TM, Non-deterministic TM) and prove their computational equivalence to standard single-tape deterministic TM.', 'turing machine variants'],
  ['flat-q16', 6, 'State and prove the Halting Problem of Turing Machines. Prove that the halting problem is undecidable using a proof by contradiction.', 'halting problem undecidability'],
  ['flat-q17', 6, 'Explain the concept of the Universal Turing Machine (UTM). How does it encode machine states and tape symbols to simulate an arbitrary TM?', 'universal turing machine'],
  ['flat-q18', 6, 'State Rice’s Theorem. Explain its significance and demonstrate how it is used to prove that non-trivial semantic properties of RE languages are undecidable.', 'rices theorem']
];

export const flatImportantQuestions = importantRecords.map(([id, unit, question, topic]) => ({
  id,
  canonicalId: id,
  kind: 'important',
  subject: 'flat',
  unit,
  question,
  marks: 7,
  topics: [topic],
  solutionRef: id
}));
