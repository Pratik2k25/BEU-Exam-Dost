// BEU Model Solutions - FLAT Unit 2
export const unit2Solutions = [
  {
    "id": "flat-q3",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "An Non-deterministic Finite Automaton with epsilon transitions (NFA-ε) can change states spontaneously without consuming input symbols. Converting an NFA-ε into an equivalent Deterministic Finite Automaton (DFA) is accomplished via the Subset Construction Algorithm coupled with ε-closure computation.",
    "sections": [
      {
        "heading": "1. Mathematical Concepts: ε-Closure and Subset Construction",
        "points": [
          "<b>ε-Closure(q):</b> The set of all states reachable from state q by following zero or more ε-transitions.",
          "<b>ε-Closure(T):</b> For a set of states T: <code>ε-Closure(T) = ⋃_{q ∈ T} ε-Closure(q)</code>.",
          "<b>DFA State Definition:</b> Each DFA state represents a distinct subset of NFA states. The initial DFA state is <code>q0_DFA = ε-Closure(q0_NFA)</code>.",
          "<b>DFA Transition Function (δ_DFA):</b> For DFA state S and input symbol a ∈ Σ: <code>δ_DFA(S, a) = ε-Closure( ⋃_{p ∈ S} δ_NFA(p, a) )</code>.",
          "<b>DFA Final States:</b> Any DFA state containing at least one final state of the original NFA becomes an accepting/final state in the DFA."
        ]
      },
      {
        "heading": "2. Worked Conversion Procedure",
        "points": [
          "1. Compute ε-closure of the start state to establish DFA start state A.",
          "2. For each discovered DFA state and each input symbol a ∈ Σ, compute the set of reachable states, take their ε-closure, and define a new DFA state if not previously encountered.",
          "3. Record transitions in a DFA Transition Table until no new state subsets are generated.",
          "4. Mark all subset states containing the NFA target accepting state as double-circled accepting states.",
          "5. Draw the resulting DFA state transition diagram."
        ]
      }
    ],
    "conclusion": "The subset construction algorithm guarantees that every language recognizable by an NFA-ε is equally recognizable by a deterministic finite automaton, proving the fundamental computational equivalence of DFA, NFA, and NFA-ε.",
    "markingScheme": [
      {
        "component": "Formal Definition of NFA-ε and ε-Closure",
        "marks": 1.5
      },
      {
        "component": "Subset Construction Algorithm Formulation & Transition Formula",
        "marks": 2
      },
      {
        "component": "DFA Transition Table & State Transition Diagram",
        "marks": 2.5
      },
      {
        "component": "Equivalence Proof & Deterministic Conclusion",
        "marks": 1
      }
    ],
    "examTip": "Always define the ε-closure formally first. Show the transition table with rows labelled as sets (e.g., A={q0, q1}) before drawing the final DFA state graph."
  },
  {
    "id": "flat-q4",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Pumping Lemma for Regular Languages is an essential property of all regular languages derived from the Pigeonhole Principle. It provides a formal method to prove by contradiction that a given language is NOT regular.",
    "sections": [
      {
        "heading": "1. Formal Statement of the Pumping Lemma",
        "points": [
          "If L is a regular language, then there exists a constant pumping length <code>p >= 1</code> (depending only on L) such that any string <code>w ∈ L</code> with length <code>|w| >= p</code> can be divided into three substrings: <code>w = xyz</code>, satisfying the three mandatory conditions:",
          "1. <b>|y| >= 1</b> (the pumped substring y is non-empty),",
          "2. <b>|xy| <= p</b> (the substring xy occurs within the first p symbols of w),",
          "3. <b>For all integers i >= 0, xy^i z ∈ L</b> (pumping y any number of times produces a string that remains in L)."
        ]
      },
      {
        "heading": "2. Proof that L = {0^n 1^n | n >= 1} is Not Regular",
        "points": [
          "<b>Step 1 (Assumption):</b> Assume for contradiction that L is regular. Therefore, the Pumping Lemma holds with pumping length p.",
          "<b>Step 2 (String Selection):</b> Choose string <code>w = 0^p 1^p</code>. Notice that w ∈ L and |w| = 2p >= p.",
          "<b>Step 3 (Partitioning Constraints):</b> According to Condition 2, |xy| <= p. Because the first p symbols of w are entirely 0s, the substring xy consists entirely of 0s. Thus, y must consist of k zeros: <code>y = 0^k</code>, where <code>1 <= k <= p</code>.",
          "Therefore: <code>x = 0^(p-k)</code>, <code>y = 0^k</code>, and <code>z = 1^p</code>.",
          "<b>Step 4 (Pumping / Contradiction):</b> Choose pumping index <code>i = 2</code>. According to Condition 3, <code>xy^2 z</code> must belong to L.",
          "<code>xy^2 z = 0^(p-k) · (0^k)^2 · 1^p = 0^(p+k) 1^p</code>.",
          "Because k >= 1, the number of zeros is <code>p + k > p</code>, while the number of ones remains exactly p. Thus, the number of zeros does not equal the number of ones.",
          "Therefore, <code>xy^2 z ∉ L</code>, directly contradicting the Pumping Lemma.",
          "<b>Conclusion:</b> The initial assumption that L is regular is false. Hence, L = {0^n 1^n | n >= 1} is not regular."
        ]
      }
    ],
    "conclusion": "Because finite automata possess finite memory (states) and cannot count an unbounded number of matching 0s and 1s, languages requiring unbounded matching memory fail the Pumping Lemma and are non-regular.",
    "markingScheme": [
      {
        "component": "Formal Statement of Pumping Lemma with 3 Mandatory Conditions",
        "marks": 2
      },
      {
        "component": "Pigeonhole Principle Justification & Pumping Length p",
        "marks": 1
      },
      {
        "component": "Rigorous 4-Step Proof by Contradiction for L = {0^n 1^n}",
        "marks": 3
      },
      {
        "component": "Clear Contradiction Statement & Concluding Remark",
        "marks": 1
      }
    ],
    "examTip": "Explicitly state all three conditions (|y| >= 1, |xy| <= p, and xy^i z in L for all i >= 0). For the string w = 0^p 1^p, clearly show that y contains only 0s due to |xy| <= p."
  },
  {
    "id": "flat-q5",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "DFA Minimization transforms a given deterministic finite automaton into an equivalent unique minimal-state DFA by identifying and merging equivalent (indistinguishable) states using the Myhill-Nerode Table-Filling Partitioning Algorithm.",
    "sections": [
      {
        "heading": "1. State Equivalence & Indistinguishability",
        "points": [
          "Two states p and q are equivalent (indistinguishable, p ≡ q) if for all input strings w ∈ Σ*:",
          "<code>δ*(p, w) ∈ F  <=>  δ*(q, w) ∈ F</code>",
          "If there exists at least one string w such that one state transitions to an accepting state and the other transitions to a non-accepting state, the states are distinguishable."
        ]
      },
      {
        "heading": "2. Table-Filling Algorithm Steps",
        "points": [
          "1. <b>Initialization:</b> Construct a lower-triangular table of all state pairs (p, q) with p ≠ q.",
          "2. <b>Base Marking (0-distinguishable):</b> Place a mark (X) in every cell (p, q) where one state is an accepting state (p ∈ F) and the other is non-accepting (q ∉ F).",
          "3. <b>Iterative Marking:</b> For every unmarked pair (p, q) and each input symbol a ∈ Σ, compute next states p' = δ(p, a) and q' = δ(q, a). If cell (p', q') is already marked, mark (p, q).",
          "4. <b>Fixed-Point Termination:</b> Repeat step 3 until a complete pass produces no new marked cells.",
          "5. <b>Partition & Merge:</b> All pairs (p, q) remaining unmarked are equivalent (p ≡ q). Merge equivalent states into single composite states in the minimized DFA."
        ]
      }
    ],
    "conclusion": "The Myhill-Nerode table-filling theorem guarantees that the resulting minimized DFA is unique up to state renaming, optimizing hardware circuit implementation and software regex matchers.",
    "markingScheme": [
      {
        "component": "Concept of State Equivalence & Indistinguishability",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step Table-Filling Algorithm Rules",
        "marks": 2.5
      },
      {
        "component": "Triangular Table Marking Procedure & Termination Criteria",
        "marks": 2
      },
      {
        "component": "State Merging & Minimal DFA Construction Conclusion",
        "marks": 1
      }
    ],
    "examTip": "Mention the base case clearly: mark (p, q) if one state is final and the other is non-final. State that the resulting minimal DFA is unique."
  },
  {
    "id": "flat-q6",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Arden’s Theorem provides an algebraic method for solving linear regular expression equations of the form R = Q + RP, establishing a direct mathematical bridge between finite automata state transition equations and regular expressions.",
    "sections": [
      {
        "heading": "1. Formal Statement & Proof of Arden’s Theorem",
        "points": [
          "<b>Theorem Statement:</b> Let P and Q be two regular expressions over alphabet Σ. If P does not contain the null string ε (i.e., ε ∉ P), then the equation <code>R = Q + RP</code> has a UNIQUE solution given by <code>R = QP*</code>.",
          "<b>Proof of Existence:</b>",
          "Substitute R = QP* into the right-hand side of R = Q + RP:",
          "<code>RHS = Q + (QP*)P = Q(ε + P*P) = Q(P*) = QP* = LHS</code>. Thus, R = QP* is a valid solution.",
          "<b>Proof of Uniqueness:</b> Repeatedly substitute R = Q + RP into itself:",
          "<code>R = Q + (Q + RP)P = Q + QP + RP^2 = Q(ε + P + P^2 + ... + P^n) + RP^(n+1)</code>",
          "As n -> infinity, any string in R of length <= n must belong to Q P*. Because ε ∉ P, P^(n+1) cannot generate strings of length <= n. Thus, R = QP* is the unique solution."
        ]
      },
      {
        "heading": "2. Application to Finite Automata State Equations",
        "points": [
          "For an automaton with states q1, q2, ..., qn where q1 is the initial state:",
          "1. Formulate transition equations for each state qi by summing incoming transitions: <code>qi = ⋃ (qj · a) + (ε if qi is start state)</code>.",
          "2. Apply Arden’s theorem (R = Q + RP => R = QP*) to eliminate self-loops and variable states algebraically.",
          "3. The final regular expression representing the language accepted by the automaton is the union of equations for all final accepting states: <code>L(M) = ⋃_{qf ∈ F} qf</code>."
        ]
      }
    ],
    "conclusion": "Arden’s theorem transforms the algorithmic task of finding regular expressions from state graphs into clean, algebraic linear system substitution.",
    "markingScheme": [
      {
        "component": "Statement of Arden’s Theorem & Precondition (ε ∉ P)",
        "marks": 1.5
      },
      {
        "component": "Formal Proof of Existence (Substitution Verification)",
        "marks": 1.5
      },
      {
        "component": "Formal Proof of Uniqueness (Inductive Expansion)",
        "marks": 2
      },
      {
        "component": "Step-by-Step Procedure for Finite Automata State Equations",
        "marks": 2
      }
    ],
    "examTip": "Highlight the precondition: ε must not belong to P. If ε in P, the solution R = QP* exists but is not unique."
  }
];
