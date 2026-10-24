// BEU Model Solutions - FLAT Unit 6
export const unit6Solutions = [
  {
    "id": "flat-q16",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Halting Problem is the quintessential undecidable decision problem in theoretical computer science, first proven by Alan Turing in 1936. It asks whether an arbitrary algorithm halts on a given input or runs forever.",
    "sections": [
      {
        "heading": "1. Formal Problem Formulation",
        "points": [
          "Let <code>Halt(M, w)</code> be a hypothetical decider Turing Machine that takes the encoding of a Turing Machine <code><M></code> and an input string <code>w</code>, and decides:",
          "• <code>Halt(<M>, w) = YES</code> (accepts) if M halts on input w.",
          "• <code>Halt(<M>, w) = NO</code> (rejects) if M loops infinitely on input w."
        ]
      },
      {
        "heading": "2. Proof by Contradiction via Diagonalization",
        "points": [
          "<b>Step 1:</b> Assume for contradiction that such a halting decider <code>H</code> exists.",
          "<b>Step 2 (Construct Adversary Machine D):</b> Construct a new Turing Machine <code>D</code> that takes machine description <code><M></code> as input, invokes H as a subroutine on <code><M, <M>></code>, and inverts its behavior:",
          "• If H(<M, <M>>) = YES (M halts on its own description): D enters an infinite loop.",
          "• If H(<M, <M>>) = NO (M loops on its own description): D halts immediately.",
          "<b>Step 3 (Self-Reference Paradox):</b> Feed machine D its own description <code><D></code> as input:",
          "• If D(<D>) halts -> then H(<D, <D>>) says YES -> by definition of D, D must loop infinitely! (Contradiction).",
          "• If D(<D>) loops infinitely -> then H(<D, <D>>) says NO -> by definition of D, D halts immediately! (Contradiction).",
          "<b>Conclusion:</b> Both possibilities yield a logical impossibility. Therefore, the assumption that halting decider H exists is impossible. The Halting Problem is undecidable."
        ]
      }
    ],
    "conclusion": "The undecidability of the Halting Problem proves that there are mathematically well-defined problems that no computer algorithm can ever solve, defining the absolute boundaries of computation.",
    "markingScheme": [
      {
        "component": "Formal Definition of the Halting Problem Language H_TM",
        "marks": 1.5
      },
      {
        "component": "Construction of Adversary Machine D with Inverted Behavior",
        "marks": 2.5
      },
      {
        "component": "Rigorous Diagonalization Contradiction Proof (D(<D>))",
        "marks": 2
      },
      {
        "component": "Philosophical & Practical Significance of Undecidability",
        "marks": 1
      }
    ],
    "examTip": "Use a clear adversary diagram showing Machine D calling H. Clearly write the double contradiction: \"D halts if and only if D loops forever.\""
  },
  {
    "id": "flat-q17",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Universal Turing Machine (UTM) is a single, programmable Turing Machine that can simulate any arbitrary Turing Machine M executing on any arbitrary input string w, given the binary encoding <M, w>.",
    "sections": [
      {
        "heading": "1. Binary Encoding Scheme for Turing Machines",
        "points": [
          "To allow a TM to read another TM, states, symbols, and transitions are encoded into binary unaries (1s separated by 0s):",
          "• States: q1 = 1, q2 = 11, q3 = 111, ..., qi = 1^i.",
          "• Tape symbols: 0 = 1, 1 = 11, B = 111, ..., sj = 1^j.",
          "• Directions: L = 1, R = 11.",
          "• A transition δ(qi, sj) = (qk, sl, Dm) is encoded as: <code>1^i 0 1^j 0 1^k 0 1^l 0 1^m</code>.",
          "• Entire machine <M> is encoded by concatenating transition codes separated by pairs of zeros (00)."
        ]
      },
      {
        "heading": "2. 3-Tape Architecture of the Universal Turing Machine",
        "points": [
          "<b>Tape 1 (Program Store):</b> Holds the complete binary description of machine M (<M>).",
          "<b>Tape 2 (Simulation Workspace):</b> Holds the simulated contents of M’s tape on input w.",
          "<b>Tape 3 (State Register):</b> Holds the current state of M (encoded as 1^i).",
          "<b>Simulation Loop:</b> (1) Match current state on Tape 3 and current symbol on Tape 2 with the rules on Tape 1; (2) Update symbol on Tape 2; (3) Shift simulated head on Tape 2; (4) Update state on Tape 3. Repeat until M reaches a halting state."
        ]
      }
    ],
    "conclusion": "The Universal Turing Machine constitutes the theoretical blueprint of the stored-program computer (von Neumann architecture), proving that single hardware can execute arbitrary software algorithms.",
    "markingScheme": [
      {
        "component": "UTM Concept & Stored-Program Computing Foundation",
        "marks": 1.5
      },
      {
        "component": "Standard Binary Encoding Format for States, Symbols & Transitions",
        "marks": 2.5
      },
      {
        "component": "3-Tape Simulation Architecture & Operational Execution Cycle",
        "marks": 2
      },
      {
        "component": "Historical Link to von Neumann Architecture",
        "marks": 1
      }
    ],
    "examTip": "Detail the binary encoding method (unary 1s separated by 0s). Explain the 3-tape simulation model clearly (Tape 1: Program, Tape 2: Data, Tape 3: State)."
  },
  {
    "id": "flat-q18",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Rice’s Theorem, proven by Henry Gordon Rice in 1953, is a sweeping generalization of the undecidability of the halting problem. It states that any non-trivial semantic property of the languages recognized by Turing machines is undecidable.",
    "sections": [
      {
        "heading": "1. Formal Statement of Rice’s Theorem",
        "points": [
          "Let P be a property of languages recognized by Turing Machines (P ⊆ RE):",
          "1. <b>Semantic Property:</b> P is a property of the language accepted by M (L(M)), not the syntax/encoding of M. If L(M1) = L(M2), then either both M1, M2 possess P, or neither does.",
          "2. <b>Non-Trivial Property:</b> P is non-trivial if there exists at least one RE language that possesses P, and at least one RE language that does not possess P (P ≠ ∅ and P ≠ RE).",
          "<b>Theorem:</b> If P is a non-trivial semantic property of RE languages, then the problem of determining whether L(M) has property P (Language L_P = {<M> | L(M) ∈ P}) is UNDECIDABLE."
        ]
      },
      {
        "heading": "2. Application Examples Proving Undecidability",
        "points": [
          "By applying Rice’s Theorem, the following problems are immediately proven undecidable without individual reduction proofs:",
          "• <b>Emptiness Problem (Is L(M) = ∅?):</b> Non-trivial (some TMs accept nothing, some accept Σ*). Language property -> Undecidable.",
          "• <b>Finiteness Problem (Is L(M) finite?):</b> Non-trivial (some languages are finite, some infinite) -> Undecidable.",
          "• <b>Regularity Problem (Is L(M) regular?):</b> Non-trivial -> Undecidable.",
          "• <b>Totality Problem (Does L(M) = Σ*?):</b> Non-trivial -> Undecidable."
        ]
      }
    ],
    "conclusion": "Rice’s Theorem demonstrates that automated static analysis can never determine non-trivial run-time behavioral properties of arbitrary programs, establishing fundamental limits on software verification.",
    "markingScheme": [
      {
        "component": "Formal Definition of Semantic vs Syntactic Properties",
        "marks": 1.5
      },
      {
        "component": "Formal Statement of Rice’s Theorem with Non-Triviality Conditions",
        "marks": 2.5
      },
      {
        "component": "Proof by Reduction from Halting Problem (H_TM <= L_P)",
        "marks": 1.5
      },
      {
        "component": "Four Practical Undecidable Applications (Empty, Finite, Regular, Total)",
        "marks": 1.5
      }
    ],
    "examTip": "Distinguish clearly between semantic properties (about L(M)) and syntactic properties (about <M>, such as \"has 5 states\"). Rice’s theorem applies only to semantic properties."
  }
];
