// BEU Model Solutions - FLAT Unit 1
export const unit1Solutions = [
  {
    "id": "flat-q1",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Chomsky Hierarchy, formulated by linguist Noam Chomsky in 1956, classifies formal grammars and languages into four hierarchical levels based on the structural constraints imposed on their production rules.",
    "table": {
      "title": "Chomsky Hierarchy of Formal Languages",
      "headers": [
        "Grammar Type",
        "Language Family",
        "Production Rule Constraints (α -> β)",
        "Recognizing Automaton",
        "Practical Application"
      ],
      "rows": [
        [
          "Type 0",
          "Unrestricted / Recursively Enumerable (RE)",
          "α -> β where α ∈ (V ∪ Σ)+, β ∈ (V ∪ Σ)* (No restriction)",
          "Turing Machine (TM)",
          "General-purpose computing, AI systems"
        ],
        [
          "Type 1",
          "Context-Sensitive Language (CSL)",
          "αAβ -> αγβ with |αAβ| <= |αγβ| (Non-contracting)",
          "Linear Bounded Automaton (LBA)",
          "Natural language parsing, context semantic checks"
        ],
        [
          "Type 2",
          "Context-Free Language (CFL)",
          "A -> γ where A ∈ V, γ ∈ (V ∪ Σ)*",
          "Non-deterministic Pushdown Automaton (NPDA)",
          "Programming language syntax, compilers, parsers"
        ],
        [
          "Type 3",
          "Regular Language (RL)",
          "A -> aB or A -> a (Right-Linear) / A -> Ba or A -> a (Left-Linear)",
          "Deterministic / Non-deterministic Finite Automaton (DFA/NFA)",
          "Lexical analyzers (lex/flex), regex search"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Mathematical Definition of Grammar Components",
        "points": [
          "A formal grammar G is defined mathematically as a 4-tuple: <code>G = (V, Σ, R, S)</code>",
          "• <b>V (or N):</b> Finite set of non-terminal (variable) symbols.",
          "• <b>Σ (or T):</b> Finite set of terminal symbols disjoint from V (V ∩ Σ = ∅).",
          "• <b>R (or P):</b> Finite set of production rules of the form α -> β.",
          "• <b>S:</b> Start symbol (S ∈ V)."
        ]
      },
      {
        "heading": "2. Inclusion Hierarchy and Expressive Power",
        "points": [
          "The languages form a strict subset containment hierarchy:",
          "<code>Regular Languages (Type 3) ⊂ Context-Free Languages (Type 2) ⊂ Context-Sensitive Languages (Type 1) ⊂ Recursively Enumerable Languages (Type 0)</code>",
          "Every regular language is context-free, but L = {a^n b^n | n >= 1} is context-free and not regular.",
          "Every context-free language is context-sensitive, but L = {a^n b^n c^n | n >= 1} is context-sensitive and not context-free."
        ]
      }
    ],
    "conclusion": "The Chomsky Hierarchy establishes the theoretical bedrock of computer science, linking formal language expressiveness directly to the computational limits of finite automata, pushdown automata, and Turing machines.",
    "markingScheme": [
      {
        "component": "Chomsky Hierarchy Definition & 4-Tuple Grammar Formalism",
        "marks": 1
      },
      {
        "component": "Complete Summary Table (Type 0 to Type 3 with Rules & Automata)",
        "marks": 3.5
      },
      {
        "component": "Strict Containment Proofs & Representative Counter-Examples",
        "marks": 1.5
      },
      {
        "component": "Conclusion & Compiler Application Overview",
        "marks": 1
      }
    ],
    "examTip": "Draw concentric circles or an inclusion chain (Type 3 ⊂ Type 2 ⊂ Type 1 ⊂ Type 0). Mention both the production constraint and the exact accepting automaton for each type."
  },
  {
    "id": "flat-q2",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Formal language theory builds from elementary discrete mathematical primitives—alphabets, strings, and languages—governed by generative grammars that derive valid strings through rule applications.",
    "sections": [
      {
        "heading": "1. Foundational Formal Definitions",
        "points": [
          "<b>Alphabet (Σ):</b> A non-empty, finite set of atomic symbols. Example: binary alphabet Σ = {0, 1}.",
          "<b>String (w):</b> A finite sequence of symbols chosen from Σ. Length |w| is the count of symbols. Empty string is denoted by ε (|ε| = 0).",
          "<b>Language (L):</b> A subset of the Kleene closure of an alphabet: L ⊆ Σ*. L can be finite or infinite.",
          "<b>Grammar (G):</b> A generative system G = (V, Σ, P, S) that defines valid strings via string rewrite operations.",
          "<b>Derivation:</b> The sequence of replacement steps applying productions α -> β to transform the start symbol S into a terminal string w (S =>* w)."
        ]
      },
      {
        "heading": "2. Leftmost Derivation (LMD) vs Rightmost Derivation (RMD)",
        "points": [
          "<b>Leftmost Derivation (LMD):</b> At every derivation step, the leftmost variable (non-terminal) in the sentential form is chosen for replacement.",
          "<b>Rightmost Derivation (RMD / Canonical):</b> At every derivation step, the rightmost variable in the sentential form is chosen for replacement.",
          "<b>Illustrative Grammar:</b> Consider CFG: <code>E -> E + E | E * E | id</code>. Deriving string <code>id + id * id</code>:",
          "• <b>LMD:</b> E => E + E => id + E => id + E * E => id + id * E => id + id * id",
          "• <b>RMD:</b> E => E + E => E + E * E => E + E * id => E + id * id => id + id * id",
          "Both derivations construct the exact same semantic parse tree if precedence is preserved, but traverse the tree differently (pre-order vs reverse post-order)."
        ]
      }
    ],
    "conclusion": "Alphabets and strings form the syntactic alphabet of computation, while leftmost and rightmost derivations provide the systematic execution paths underlying top-down (LL) and bottom-up (LR) compiler parsers.",
    "markingScheme": [
      {
        "component": "Precise Mathematical Definitions of Alphabet, String, Language, Grammar",
        "marks": 2
      },
      {
        "component": "Formal Definition of Derivation & Sentential Forms",
        "marks": 1
      },
      {
        "component": "Detailed Comparison of LMD vs RMD with Step-by-Step Derivation",
        "marks": 2.5
      },
      {
        "component": "Parse Tree Illustration & Compiler Parser Relevance",
        "marks": 1.5
      }
    ],
    "examTip": "Write out the step-by-step derivation for both LMD and RMD on the same sample string (like id + id * id) and state their connection to LL(k) and LR(k) parsers."
  }
];
