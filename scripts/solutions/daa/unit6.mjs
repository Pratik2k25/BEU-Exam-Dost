// BEU Model Solutions - DAA Unit 6
export const unit6Solutions = [
  {
    "id": "daa-q19",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Computational Complexity Theory classifies decision problems into fundamental complexity classes based on the time and memory resources required for algorithmic solution and verification.",
    "table": {
      "title": "Complexity Classes Formal Comparison",
      "headers": [
        "Complexity Class",
        "Formal Definition",
        "Machine Model",
        "Representative Example Problems"
      ],
      "rows": [
        [
          "Class P",
          "Problems solvable in deterministic polynomial time: O(n^k)",
          "Deterministic Turing Machine (DTM)",
          "Sorting, Shortest Path, Minimum Spanning Tree, Matrix Multiplication"
        ],
        [
          "Class NP",
          "Problems verifiable in deterministic polynomial time (or solvable in poly-time by NTM)",
          "Non-Deterministic Turing Machine (NTM)",
          "0/1 Knapsack, Traveling Salesperson (TSP Decision), Graph Coloring"
        ],
        [
          "Class NP-Hard",
          "Problems at least as hard as the hardest problems in NP; every L ∈ NP reduces to it in poly-time",
          "Can be undecidable or non-NP",
          "Halting Problem, Optimization TSP, General ILP"
        ],
        [
          "Class NP-Complete",
          "Problems that are BOTH in NP and NP-Hard (NPC = NP ∩ NP-Hard)",
          "Non-Deterministic Poly-Time with reduction",
          "Boolean SAT, 3-SAT, Vertex Cover, Clique, Hamiltonian Cycle"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Venn Diagram Architecture under P ≠ NP Assumption",
        "points": [
          "Under the widely accepted mathematical conjecture that P ≠ NP:",
          "• <b>P ⊂ NP:</b> Every problem solvable in polynomial time is trivially verifiable in polynomial time.",
          "• <b>NP-Complete = NP ∩ NP-Hard:</b> The hardest problems in NP. If ANY single NP-Complete problem can be solved in deterministic polynomial time, then P = NP.",
          "• <b>NP-Hard extends outside NP:</b> Contains undecidable problems (like the Halting problem) and optimization problems that are not decision problems."
        ]
      }
    ],
    "conclusion": "The P versus NP question remains the paramount open problem in computer science; the classification provides a rigorous framework for proving theoretical computational intractability.",
    "markingScheme": [
      {
        "component": "Formal Mathematical Definitions of P, NP, NP-Hard, NP-Complete",
        "marks": 3
      },
      {
        "component": "Labelled Venn Diagram under P ≠ NP Assumption",
        "marks": 2
      },
      {
        "component": "Deterministic vs Non-Deterministic Turing Machine Distinction",
        "marks": 1
      },
      {
        "component": "Significance of NP-Completeness (If P = NP)",
        "marks": 1
      }
    ],
    "examTip": "Draw the Venn diagram showing P inside NP, NP-Complete as the intersection of NP and NP-Hard, and NP-Hard extending outside NP. State that NPC = NP ∩ NP-Hard."
  },
  {
    "id": "daa-q20",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Polynomial-Time Reduction is a fundamental technique in computational complexity that translates instances of one decision problem into instances of another decision problem in polynomial time, establishing relative hardness.",
    "sections": [
      {
        "heading": "1. Formal Definition of Polynomial-Time Many-One Reduction",
        "points": [
          "Let A and B be two decision problems (languages) over alphabets Σ_A and Σ_B.",
          "Problem A is polynomial-time reducible to problem B (written <code>A <=_p B</code>) if there exists a polynomial-time computable function <code>f: Σ_A* -> Σ_B*</code> such that for every string w:",
          "<code>w ∈ A  <=>  f(w) ∈ B</code>",
          "<b>Key Implications:</b>",
          "• If B is easy (B ∈ P), then A is easy (A ∈ P).",
          "• If A is hard (A is NP-Hard), then B must be at least as hard (B is NP-Hard)."
        ]
      },
      {
        "heading": "2. Role in Proving NP-Completeness",
        "points": [
          "To prove that a new target problem L is NP-Complete:",
          "1. <b>Prove L ∈ NP:</b> Show that a candidate solution (certificate) can be verified by a deterministic algorithm in polynomial time.",
          "2. <b>Select Known NPC Problem X:</b> Choose an established NP-Complete problem X (e.g., 3-SAT, Vertex Cover).",
          "3. <b>Construct Reduction Function f:</b> Design a function that maps any instance of X to an instance of L in polynomial time.",
          "4. <b>Prove Equivalence:</b> Prove that instance x is a YES-instance of X if and only if f(x) is a YES-instance of L.",
          "5. <b>Conclusion:</b> Since X <=_p L and X is NP-Hard, L is NP-Hard. Combined with L ∈ NP, L is proven NP-Complete!"
        ]
      }
    ],
    "conclusion": "Polynomial-time reduction creates an interconnected web of algorithmic hardness, demonstrating that hundreds of seemingly disparate combinatorial problems share an identical core computational complexity.",
    "markingScheme": [
      {
        "component": "Polynomial-Time Reduction Mathematical Definition & Mapping f",
        "marks": 2
      },
      {
        "component": "Directionality of Reduction (A <=_p B means B is at least as hard as A)",
        "marks": 1.5
      },
      {
        "component": "Standard 4-Step Recipe for Proving NP-Completeness",
        "marks": 2.5
      },
      {
        "component": "Transitivity of Polynomial Reductions Proof",
        "marks": 1
      }
    ],
    "examTip": "Remember the direction: to prove B is NP-complete, reduce FROM known problem A TO target problem B (A <=p B). Reducing B to A is a classic student error that proves nothing."
  },
  {
    "id": "daa-q21",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Cook–Levin Theorem, proven independently by Stephen Cook (1971) and Leonid Levin (1973), is the foundational cornerstone of complexity theory. It proved that the Boolean Satisfiability Problem (SAT) is NP-Complete, providing the first known NP-Complete problem.",
    "sections": [
      {
        "heading": "1. The Boolean Satisfiability Problem (SAT)",
        "points": [
          "Given a Boolean formula Φ in Conjunctive Normal Form (CNF) consisting of variables and clauses: <code>Φ = C1 ∧ C2 ∧ ... ∧ Ck</code>.",
          "<b>Question:</b> Does there exist a truth assignment of TRUE/FALSE to the variables such that the entire formula Φ evaluates to TRUE?",
          "• <b>SAT is in NP:</b> Given a proposed truth assignment (certificate), a deterministic algorithm can evaluate Φ in linear time O(|Φ|). Hence, SAT ∈ NP."
        ]
      },
      {
        "heading": "2. Cook’s Proof Strategy: Simulating Any NTM in Polynomial Time",
        "points": [
          "Because SAT was the FIRST problem, Cook could not reduce from an existing NPC problem.",
          "Instead, Cook proved that for ANY arbitrary language L ∈ NP recognized by a polynomial-time Nondeterministic Turing Machine M in n^k steps, there exists a polynomial-time algorithm that translates any input string w into a Boolean formula <code>Φ_{M, w}</code> such that:",
          "<code>w ∈ L  <=>  Φ_{M, w} is Satisfiable</code>.",
          "<b>Formula Construction:</b> Cook constructed Boolean variables encoding the NTM computation matrix:",
          "• Cell variables: Tape cell i contains symbol j at step t.",
          "• State variables: Machine is in state q at step t.",
          "• Head variables: Tape head is at position i at step t.",
          "Clauses enforce validity: valid start configuration, legal transitions according to δ, and reaching the accept state. The formula has size O(n^{2k}), strictly polynomial."
        ]
      },
      {
        "heading": "3. Foundation for All Subsequent NP-Completeness Proofs",
        "points": [
          "Once SAT was established as NP-Complete, Richard Karp (1972) proved that 21 classic combinatorial problems (3-SAT, Clique, Vertex Cover, Hamiltonian Cycle) are NP-Complete by reducing SAT to them in polynomial cascades.",
          "Thus, SAT serves as the parent ancestor of all modern computational intractability proofs."
        ]
      }
    ],
    "conclusion": "The Cook–Levin Theorem grounded complexity theory by proving that universal nondeterministic computation can be completely encoded as Boolean logic satisfiability.",
    "markingScheme": [
      {
        "component": "SAT Problem Definition & Proof that SAT ∈ NP",
        "marks": 1.5
      },
      {
        "component": "Cook–Levin Theorem Statement & Universal Simulation Concept",
        "marks": 2
      },
      {
        "component": "Boolean Clause Encoding of NTM Computation Grid",
        "marks": 2.5
      },
      {
        "component": "Role as Seed for Karp’s 21 NP-Complete Problems",
        "marks": 1
      }
    ],
    "examTip": "Explain why Cook had to simulate a Turing Machine directly: because no prior NP-complete problem existed! Mention Karp’s 21 problems as the legacy of Cook’s theorem."
  }
];
