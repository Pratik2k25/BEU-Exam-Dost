// BEU Model Solutions - FLAT Unit 4
export const unit4Solutions = [
  {
    "id": "flat-q11",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Context-Sensitive Grammars (CSG, Type 1 in Chomsky Hierarchy) generate Context-Sensitive Languages (CSL). They extend Context-Free Grammars by allowing the replacement of a non-terminal variable to depend upon its surrounding context symbols.",
    "sections": [
      {
        "heading": "1. Production Structure of Context-Sensitive Grammars",
        "points": [
          "<b>Standard Definition:</b> Productions have the form: <code>α A β -> α γ β</code>",
          "Where A ∈ V (the variable being replaced), α, β ∈ (V ∪ Σ)* (the left and right contexts), and γ ∈ (V ∪ Σ)+ (the replacement string, non-empty).",
          "The variable A can be rewritten as γ only when preceded by context α and followed by context β.",
          "<b>Non-Contracting Form:</b> Alternatively defined as rules of the form <code>α -> β</code> such that <code>|α| <= |β|</code>. Both formulations are computationally equivalent."
        ]
      },
      {
        "heading": "2. Comparison: CSG vs CFG",
        "points": [
          "• <b>Left-Hand Side:</b> In CFG, the LHS must be a SINGLE non-terminal (A -> γ). In CSG, the LHS can contain multiple terminals and non-terminals (αAβ or |α| <= |β|).",
          "• <b>Context Sensitivity:</b> In CFG, variable substitution is totally independent of neighboring symbols. In CSG, neighboring symbols dictate rule applicability.",
          "• <b>Expressiveness:</b> CSL can generate complex non-CFL languages such as {a^n b^n c^n | n >= 1} and {w w | w ∈ {a, b}*}.",
          "• <b>Automaton:</b> CFGs are recognized by Pushdown Automata; CSGs are recognized by Linear Bounded Automata (LBA)."
        ]
      }
    ],
    "conclusion": "Context-sensitive grammars bridge the gap between context-free syntax and Turing-complete unrestricted grammars, formalizing semantic context checks in compiler design.",
    "markingScheme": [
      {
        "component": "CSG Formal Definition & Context Variable Notation",
        "marks": 2
      },
      {
        "component": "Non-Contracting Rule Equivalence (|α| <= |β|)",
        "marks": 1.5
      },
      {
        "component": "Detailed Differences between CSG and CFG",
        "marks": 2.5
      },
      {
        "component": "Recognizing Automaton (LBA) & Expressive Capabilities",
        "marks": 1
      }
    ],
    "examTip": "Show the classic production rule αAβ -> αγβ clearly, identifying α as left context and β as right context. State the non-contracting condition |α| <= |β|."
  },
  {
    "id": "flat-q12",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Linear Bounded Automaton (LBA) is a restricted form of a Non-deterministic Turing Machine whose tape head is bounded strictly to the segment of tape occupied by the input string, flanked by special left and right endmarkers.",
    "sections": [
      {
        "heading": "1. Architectural Model of Linear Bounded Automaton",
        "points": [
          "An LBA is an 8-tuple: <code>M = (Q, Σ, Γ, δ, q0, [, ], F)</code>",
          "• <b>Tape Boundedness:</b> The read/write tape is bounded by left endmarker [ and right endmarker ].",
          "• The tape head cannot write over the endmarkers or move beyond them: for an input string of length n, the workspace is strictly bounded by <code>k · n</code> cells (where k is a constant fixed by the machine definition).",
          "• Unlike a standard Turing Machine with infinite tape, an LBA has a finite number of tape configurations for any input of length n."
        ]
      },
      {
        "heading": "2. Acceptance of Context-Sensitive Languages",
        "points": [
          "<b>Theorem:</b> A language L is accepted by an LBA if and only if L is a Context-Sensitive Language (Type 1).",
          "Because CSG productions are non-contracting (|α| <= |β|), a derivation never shrinks. Therefore, an LBA can simulate any CSG derivation backwards (parsing) within the space of the input string without requiring additional tape cells.",
          "<b>Decidability Property:</b> The membership problem for LBA (is w ∈ L(M)?) is DECIDABLE because the total number of distinct machine configurations for an input of length n is finite: <code>|Q| · n · |Γ|^n</code>. If the machine runs longer than this configuration bound without halting, it is in an infinite loop."
        ]
      }
    ],
    "conclusion": "Linear Bounded Automata represent the exact computational automaton for Context-Sensitive Languages, establishing a decidable yet expressive tier between Pushdown Automata and Turing Machines.",
    "markingScheme": [
      {
        "component": "LBA Definition & Tape Bounding Endmarkers Architecture",
        "marks": 2
      },
      {
        "component": "Equivalence Theorem: LBA Accepts Context-Sensitive Languages",
        "marks": 2
      },
      {
        "component": "Decidability of LBA Membership Problem & Configuration Bound",
        "marks": 2
      },
      {
        "component": "Comparison with Standard Unrestricted Turing Machine",
        "marks": 1
      }
    ],
    "examTip": "State the total number of configurations |Q| · n · |Γ|^n to prove that the membership problem for LBA is decidable, unlike the general Turing machine halting problem."
  }
];
