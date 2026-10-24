// BEU Model Solutions - FLAT Unit 3
export const unit3Solutions = [
  {
    "id": "flat-q7",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Context-Free Grammar (CFG) is ambiguous if there exists at least one string in its language that can generate two or more distinct parse trees (or equivalently, two distinct leftmost derivations or two distinct rightmost derivations).",
    "sections": [
      {
        "heading": "1. Ambiguity Proof for Grammar: E -> E + E | E * E | id",
        "points": [
          "Target input string: <code>w = id + id * id</code>.",
          "<b>Leftmost Derivation 1 (Addition First / High Precedence):</b>",
          "E => E * E => E + E * E => id + E * E => id + id * E => id + id * id.",
          "(Parse Tree 1 groups (id + id) together as left subtree multiplied by id).",
          "<b>Leftmost Derivation 2 (Multiplication First / High Precedence):</b>",
          "E => E + E => id + E => id + E * E => id + id * E => id + id * id.",
          "(Parse Tree 2 groups (id * id) together as right subtree added to id).",
          "<b>Conclusion of Proof:</b> Because string <code>id + id * id</code> possesses two distinct leftmost derivations resulting in structurally different parse trees, the grammar is formally proven to be ambiguous."
        ]
      },
      {
        "heading": "2. Compiler Issues & Disambiguation Strategy",
        "points": [
          "Ambiguity causes fatal semantic dilemmas in compiler front-ends because different parse trees yield conflicting evaluation results: (id + id) * id vs id + (id * id).",
          "<b>Disambiguated Equivalent Grammar:</b> Introduce non-terminals for precedence and associativity levels:",
          "<code>E -> E + T | T</code> (enforces left-associative addition)",
          "<code>T -> T * F | F</code> (enforces left-associative multiplication with higher precedence)",
          "<code>F -> (E) | id</code> (enforces atomic primary operands and parentheses)"
        ]
      }
    ],
    "conclusion": "While grammar ambiguity is undecidable in general, expression grammars are routinely disambiguated in practical compiler construction by layering precedence hierarchies.",
    "markingScheme": [
      {
        "component": "Definition of Grammar Ambiguity with Parse Tree Criteria",
        "marks": 1.5
      },
      {
        "component": "Derivation 1 (LMD) & Corresponding Parse Tree Structure",
        "marks": 2
      },
      {
        "component": "Derivation 2 (LMD) & Conflicting Parse Tree Structure",
        "marks": 2
      },
      {
        "component": "Disambiguated Unambiguous Grammar (E, T, F Precedence Hierarchy)",
        "marks": 1.5
      }
    ],
    "examTip": "Show both distinct leftmost derivations side by side for the exact string id + id * id, and provide the disambiguated grammar E -> E + T | T, T -> T * F | F, F -> id."
  },
  {
    "id": "flat-q8",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Chomsky Normal Form (CNF) is a canonical standard form for Context-Free Grammars where every production rule is restricted to either two variables (A -> BC) or a single terminal (A -> a). CNF is foundational for polynomial-time parsing algorithms such as Cocke-Younger-Kasami (CYK).",
    "sections": [
      {
        "heading": "1. CNF Production Constraints",
        "points": [
          "A CFG is in Chomsky Normal Form if all production rules are strictly of the form:",
          "1. <code>A -> BC</code> (where A, B, C ∈ V, and B, C ≠ S),",
          "2. <code>A -> a</code> (where A ∈ V and a ∈ Σ),",
          "3. <code>S -> ε</code> (permitted only if the language contains ε, provided start symbol S does not appear on the RHS of any production)."
        ]
      },
      {
        "heading": "2. Four-Step Conversion Algorithm",
        "points": [
          "<b>Step 1 (Start Symbol Isolation):</b> Create a new start symbol S0 and add rule <code>S0 -> S</code> to ensure the start symbol never appears on any RHS.",
          "<b>Step 2 (Eliminate Null / ε-Productions):</b> Identify nullable variables (A =>* ε). Replace rules A -> ε and for every rule containing nullable variables, add copies with all subsets of those variables deleted.",
          "<b>Step 3 (Eliminate Unit Productions):</b> Eliminate rules of the form <code>A -> B</code> (where A, B ∈ V) by computing unit pairs and substituting reachable non-unit productions.",
          "<b>Step 4 (Binarization & Terminal Isolation):</b>",
          "• For rules mixing terminals and variables (e.g., A -> aB), replace terminal a with a new variable Ta and add rule Ta -> a.",
          "• For rules with more than 2 variables (e.g., A -> BCD), introduce intermediate variables: A -> B D1, D1 -> CD."
        ]
      }
    ],
    "conclusion": "Converting a CFG into Chomsky Normal Form normalizes rule structures, ensuring that any string of length n is derived in exactly 2n - 1 derivation steps.",
    "markingScheme": [
      {
        "component": "CNF Definition & Production Rule Constraints",
        "marks": 1.5
      },
      {
        "component": "Detailed 4-Step Simplification & Conversion Pipeline",
        "marks": 3.5
      },
      {
        "component": "Derivation Length Property (2n - 1) & CYK Parsing Context",
        "marks": 2
      }
    ],
    "examTip": "List the exact order: (1) S0 -> S, (2) Remove ε, (3) Remove Unit rules, (4) Restrict lengths to A -> BC and A -> a. Emphasize that ε removal must precede unit removal."
  },
  {
    "id": "flat-q9",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Pushdown Automaton (PDA) is a theoretical model of computation extending finite state automata with an auxiliary infinite Last-In First-Out (LIFO) stack memory, enabling the recognition of context-free languages.",
    "sections": [
      {
        "heading": "1. Mathematical 7-Tuple Specification of PDA",
        "points": [
          "A PDA M is defined as a 7-tuple: <code>M = (Q, Σ, Γ, δ, q0, Z0, F)</code>",
          "• Q: Finite set of states: {q0, q1, q2}.",
          "• Σ: Input alphabet: {a, b, c}.",
          "• Γ: Stack alphabet: {a, b, Z0}.",
          "• q0: Initial state (q0).",
          "• Z0: Bottom-of-stack initial symbol (Z0).",
          "• F: Set of accepting states: {q2}."
        ]
      },
      {
        "heading": "2. PDA Design for Language L = {w c w^R | w in {a, b}*}",
        "points": [
          "The language consists of an arbitrary string w over {a, b}, followed by a distinct center marker c, followed by the exact reverse string w^R.",
          "<b>Phase 1 (Pushing w in state q0):</b> For every input symbol a or b before marker c, push it onto the stack:",
          "• δ(q0, a, Z0) = {(q0, aZ0)}; δ(q0, b, Z0) = {(q0, bZ0)}",
          "• δ(q0, a, a) = {(q0, aa)}; δ(q0, a, b) = {(q0, ab)}; δ(q0, b, a) = {(q0, ba)}; δ(q0, b, b) = {(q0, bb)}",
          "<b>Phase 2 (Center Marker Transition):</b> On reading center marker c, transition to state q1 without modifying the stack:",
          "• δ(q0, c, a) = {(q1, a)}; δ(q0, c, b) = {(q1, b)}; δ(q0, c, Z0) = {(q1, Z0)} (for empty w = ε)",
          "<b>Phase 3 (Matching w^R and Popping):</b> In state q1, each input symbol must match the top of the stack:",
          "• δ(q1, a, a) = {(q1, ε)}; δ(q1, b, b) = {(q1, ε)}",
          "<b>Phase 4 (Acceptance):</b> When all input is consumed (ε) and the bottom-of-stack marker Z0 is exposed:",
          "• Acceptance by Final State: δ(q1, ε, Z0) = {(q2, Z0)} (q2 ∈ F).",
          "• Acceptance by Empty Stack: δ(q1, ε, Z0) = {(q1, ε)} (stack completely empty)."
        ]
      }
    ],
    "conclusion": "The pushdown automaton elegantly leverages its LIFO stack to store w in forward order so that popping produces w^R in reverse order, verifying palindrome symmetry deterministically.",
    "markingScheme": [
      {
        "component": "7-Tuple Formal Definition of PDA",
        "marks": 1.5
      },
      {
        "component": "State Transition Functions (Phase 1 Push, Phase 2 Center, Phase 3 Pop)",
        "marks": 3.5
      },
      {
        "component": "Dual Acceptance Mechanisms (Final State vs Empty Stack)",
        "marks": 2
      }
    ],
    "examTip": "Write out the δ transition rules using standard tuple notation δ(q, a, X) = (p, Y). Explain how center marker c enables deterministic state transition."
  },
  {
    "id": "flat-q10",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Pumping Lemma for Context-Free Languages (also known as the Bar-Hillel Lemma or uvwxy lemma) provides an inherent structural property of all context-free languages used to prove that a language is NOT context-free.",
    "sections": [
      {
        "heading": "1. Formal Statement of the CFL Pumping Lemma",
        "points": [
          "If L is a context-free language, there exists a constant pumping length <code>p >= 1</code> such that any string <code>s ∈ L</code> with <code>|s| >= p</code> can be divided into five substrings: <code>s = u v w x y</code>, satisfying:",
          "1. <b>|vx| >= 1</b> (at least one of the pumped substrings v or x is non-empty),",
          "2. <b>|vwx| <= p</b> (the middle substring vwx is bounded in length by p),",
          "3. <b>For all i >= 0, u v^i w x^i y ∈ L</b> (simultaneously pumping v and x preserves language membership)."
        ]
      },
      {
        "heading": "2. Proof that L = {a^n b^n c^n | n >= 1} is Not Context-Free",
        "points": [
          "<b>Step 1 (Assumption):</b> Assume for contradiction that L is context-free. Let p be the pumping length.",
          "<b>Step 2 (String Selection):</b> Choose string <code>s = a^p b^p c^p ∈ L</code>. Clearly |s| = 3p >= p.",
          "<b>Step 3 (Substrings Analysis):</b> Since |vwx| <= p, the substring vwx cannot span across all three symbol types (a, b, and c). It can contain at most two distinct symbols:",
          "• <i>Case 1:</i> vwx contains only a's (or only b's or only c's). Pumping s with i = 2 increases one symbol type without changing the other two.",
          "• <i>Case 2:</i> vwx contains a's and b's only (no c's). Pumping s with i = 2 increases a's and/or b's, while the count of c's remains fixed at p.",
          "• <i>Case 3:</i> vwx contains b's and c's only (no a's). Pumping s with i = 2 increases b's and/or c's, while the count of a's remains fixed at p.",
          "<b>Step 4 (Contradiction):</b> In every case, for <code>s' = u v^2 w x^2 y</code>, the counts of a's, b's, and c's are no longer equal. Thus, s' ∉ L.",
          "<b>Conclusion:</b> This contradicts the Pumping Lemma. Hence, L = {a^n b^n c^n | n >= 1} is NOT context-free."
        ]
      }
    ],
    "conclusion": "Because pushdown automata possess only a single LIFO stack, they can compare at most two independent counts (e.g., a^n b^n); verifying three mutually synchronized counts (a^n b^n c^n) requires a context-sensitive language or Turing machine.",
    "markingScheme": [
      {
        "component": "CFL Pumping Lemma Statement & 3 Mandatory Conditions (uvwxy)",
        "marks": 2
      },
      {
        "component": "Parse Tree Derivation Basis (Repeated Variables in Long Paths)",
        "marks": 1
      },
      {
        "component": "Rigorous Case-by-Case Contradiction Proof for a^n b^n c^n",
        "marks": 3
      },
      {
        "component": "Single-Stack Architectural Limitation Conclusion",
        "marks": 1
      }
    ],
    "examTip": "Carefully state Condition 2: |vwx| <= p. This condition guarantees that vwx cannot contain all three symbols (a, b, and c), making the case analysis watertight."
  }
];
