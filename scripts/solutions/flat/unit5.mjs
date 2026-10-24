// BEU Model Solutions - FLAT Unit 5
export const unit5Solutions = [
  {
    "id": "flat-q13",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Turing Machine (TM) is the fundamental mathematical model of modern general-purpose computing. Introduced by Alan Turing in 1936, it features a finite control unit and an infinite, bidirectional read-write tape divided into discrete cells.",
    "sections": [
      {
        "heading": "1. Turing Machine Design for L = {0^n 1^n | n >= 1}",
        "points": [
          "<b>High-Level Strategy:</b>",
          "1. In state q0, read the leftmost 0, mark it with X, and transition to state q1.",
          "2. Move right across remaining 0s and Ys until the first unmarked 1 is found; mark it with Y, and transition to state q2.",
          "3. Move left across Ys and 0s until reaching the most recent X; move one cell right and repeat from state q0.",
          "4. In state q0, if all 0s are already marked as X and a Y is encountered, transition to state q3 to verify that no trailing unmarked 1s remain.",
          "5. If blank symbol B is encountered, enter accepting halt state q4."
        ]
      },
      {
        "heading": "2. State Transition Function Table (δ)",
        "points": [
          "• δ(q0, 0) = (q1, X, R); δ(q0, Y) = (q3, Y, R)",
          "• δ(q1, 0) = (q1, 0, R); δ(q1, Y) = (q1, Y, R); δ(q1, 1) = (q2, Y, L)",
          "• δ(q2, 0) = (q2, 0, L); δ(q2, Y) = (q2, Y, L); δ(q2, X) = (q0, X, R)",
          "• δ(q3, Y) = (q3, Y, R); δ(q3, B) = (q4, B, R) [q4 is final accepting state]"
        ]
      },
      {
        "heading": "3. Instantaneous Descriptions (ID) Trace for Input w = 0011",
        "points": [
          "q0 0011 -> X q1 011 -> X0 q1 11 -> X q2 0Y1 -> q2 XY0Y1 -> X q0 Y0Y1 (Wait: q2 reaches X, moves R to state q0 at 0):",
          "Full trace: q0 0011 ⊢ X q1 011 ⊢ X0 q1 11 ⊢ X q2 0Y1 ⊢ q2 X0Y1 ⊢ X q0 0Y1 ⊢ XX q1 Y1 ⊢ XXY q1 1 ⊢ XX q2 YY ⊢ X q2 XYY ⊢ XX q0 YY ⊢ XXY q3 Y ⊢ XXYY q3 B ⊢ XXYYB q4 B (HALT & ACCEPT)."
        ]
      }
    ],
    "conclusion": "The step-by-step trace demonstrates how the Turing machine balances paired symbols using bidirectional tape movement and read-write head replacement, recognizing non-regular languages systematically.",
    "markingScheme": [
      {
        "component": "Turing Machine Formal 7-Tuple Definition",
        "marks": 1
      },
      {
        "component": "Algorithm Strategy & State Design (q0 to q4)",
        "marks": 2
      },
      {
        "component": "Complete State Transition Function Table",
        "marks": 2
      },
      {
        "component": "Step-by-Step Instantaneous Description (ID) Trace for 0011",
        "marks": 2
      }
    ],
    "examTip": "Write out the full instantaneous description sequence (q0 0011 |-- ... |-- XXYY q4 B). Showing each tape cell transition step-by-step guarantees full marks."
  },
  {
    "id": "flat-q14",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "In computability theory, languages recognized by Turing machines are categorized into Recursive Languages (decidable) and Recursively Enumerable Languages (partially decidable / recognizable).",
    "table": {
      "title": "Recursive vs Recursively Enumerable Languages",
      "headers": [
        "Comparison Criterion",
        "Recursive Language (Turing-Decidable)",
        "Recursively Enumerable (RE / Turing-Recognizable)"
      ],
      "rows": [
        [
          "Machine Behavior on w ∈ L",
          "Turing Machine halts in accepting state",
          "Turing Machine halts in accepting state"
        ],
        [
          "Machine Behavior on w ∉ L",
          "Turing Machine halts in rejecting state (Always halts)",
          "Turing Machine may reject OR loop infinitely"
        ],
        [
          "Decidability Status",
          "Decidable (Membership algorithm exists)",
          "Undecidable (Semi-decidable only)"
        ],
        [
          "Halting Guarantee",
          "Guaranteed to halt on ALL input strings",
          "Halting guaranteed ONLY for strings in language"
        ],
        [
          "Complement Closure",
          "Closed under complementation (L is Rec => L' is Rec)",
          "NOT closed under complement (L and L' both RE => L is Rec)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Closure Properties Comparison",
        "points": [
          "<b>Recursive Languages:</b> Closed under Union, Intersection, Complement, Concatenation, and Kleene Star.",
          "<b>Recursively Enumerable Languages:</b> Closed under Union, Intersection, Concatenation, and Kleene Star; strictly NOT closed under Complement.",
          "<b>Fundamental Theorem:</b> A language L is Recursive if and only if both L and its complement L' are Recursively Enumerable."
        ]
      }
    ],
    "conclusion": "Recursive languages represent practical computational solvability where an algorithm always delivers an answer, whereas RE languages represent verifiable problems where negative instances may never terminate.",
    "markingScheme": [
      {
        "component": "Definitions of Decidable (Recursive) vs Recognizable (RE)",
        "marks": 2
      },
      {
        "component": "Halting Characteristics & Infinite Loop Vulnerability",
        "marks": 1.5
      },
      {
        "component": "Comprehensive Comparison Table",
        "marks": 2
      },
      {
        "component": "Complementation Theorem & Closure Properties Analysis",
        "marks": 1.5
      }
    ],
    "examTip": "Always state the vital theorem: \"A language L is recursive if and only if both L and its complement are recursively enumerable.\" This is a key BEU scoring point."
  },
  {
    "id": "flat-q15",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Turing machine variants introduce architectural extensions such as multiple tapes, multi-dimensional tapes, or non-determinism to enhance design convenience without expanding the fundamental class of computable functions.",
    "sections": [
      {
        "heading": "1. Multi-Tape Turing Machine Model & Equivalence Proof",
        "points": [
          "<b>Definition:</b> A k-tape TM has k independent read/write heads and k separate tapes. The transition function is: <code>δ: Q × Γ^k -> Q × Γ^k × {L, R, S}^k</code>.",
          "<b>Simulation on Single-Tape TM:</b>",
          "A single-tape TM can simulate a k-tape TM by partitioning its single tape into 2k virtual tracks:",
          "• k tracks store the contents of the k tapes.",
          "• k tracks store virtual head markers (indicating the current head position on each tape).",
          "To simulate one step of the k-tape TM, the single head scans across all tracks to find all k head markers, stores the symbols in its finite control, determines the transition, and makes a second scan to update symbols and shift head markers.",
          "<b>Time Complexity:</b> If the k-tape TM runs in T(n) steps, the single-tape TM simulates it in <code>O(T(n)^2)</code> steps. The computational power is identical."
        ]
      },
      {
        "heading": "2. Non-Deterministic Turing Machine (NTM) Equivalence",
        "points": [
          "In an NTM, the transition function maps to a set of choices: <code>δ: Q × Γ -> P(Q × Γ × {L, R})</code>.",
          "A deterministic 3-tape TM can simulate an NTM using Breadth-First Search (BFS) over the computation tree: Tape 1 holds the input, Tape 2 generates address paths (1, 2, ..., b), and Tape 3 simulates execution.",
          "BFS guarantees finding an accepting path if one exists without getting trapped in infinite branches."
        ]
      }
    ],
    "conclusion": "The Church-Turing Thesis is reinforced by the computational equivalence of multi-tape and non-deterministic machines to standard single-tape Turing machines.",
    "markingScheme": [
      {
        "component": "Multi-Tape TM Formal Model & Track Simulation Concept",
        "marks": 2.5
      },
      {
        "component": "Time Complexity Derivation (Quadratic Overhead O(T^2))",
        "marks": 1.5
      },
      {
        "component": "Non-Deterministic TM Simulation via 3-Tape BFS Tree",
        "marks": 2
      },
      {
        "component": "Church-Turing Thesis Conclusion",
        "marks": 1
      }
    ],
    "examTip": "Explain the 2k-track representation for multi-tape simulation and state that while multi-tape reduces running time, it cannot compute any function that a single-tape TM cannot."
  }
];
