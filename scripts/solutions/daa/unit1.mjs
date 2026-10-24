// BEU Model Solutions - DAA Unit 1
export const unit1Solutions = [
  {
    "id": "daa-q1",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Asymptotic Notations are formal mathematical notations used in algorithm analysis to describe the limiting runtime or space behavior of an algorithm as the input size n approaches infinity, abstracting away hardware-dependent constants.",
    "table": {
      "title": "Asymptotic Notations Mathematical Definitions",
      "headers": [
        "Notation",
        "Name / Meaning",
        "Formal Mathematical Set Definition",
        "Limit Ratio Condition lim (f(n)/g(n))"
      ],
      "rows": [
        [
          "O(g(n))",
          "Big-O (Asymptotic Upper Bound)",
          "{f(n) | ∃ c > 0, n0 >= 1 s.t. 0 <= f(n) <= c·g(n) ∀ n >= n0}",
          "lim n->∞ (f(n)/g(n)) < ∞ (Finite or 0)"
        ],
        [
          "Ω(g(n))",
          "Big-Omega (Asymptotic Lower Bound)",
          "{f(n) | ∃ c > 0, n0 >= 1 s.t. 0 <= c·g(n) <= f(n) ∀ n >= n0}",
          "lim n->∞ (f(n)/g(n)) > 0 (Positive or ∞)"
        ],
        [
          "Θ(g(n))",
          "Big-Theta (Asymptotically Tight Bound)",
          "{f(n) | ∃ c1, c2 > 0, n0 >= 1 s.t. 0 <= c1·g(n) <= f(n) <= c2·g(n) ∀ n >= n0}",
          "lim n->∞ (f(n)/g(n)) = c (where 0 < c < ∞)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Graphical Interpretation and Constants",
        "points": [
          "• <b>Big-O (Upper Bound):</b> Guarantees an algorithm will not take longer than c · g(n) for sufficiently large n. Represents the worst-case ceiling.",
          "• <b>Big-Omega (Lower Bound):</b> Guarantees an algorithm will take at least c · g(n) time for large n. Establishes theoretical best-case efficiency floor.",
          "• <b>Big-Theta (Tight Bound):</b> Sandwich condition: f(n) is squeezed between c1 · g(n) and c2 · g(n) for all n >= n0. f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n))."
        ]
      },
      {
        "heading": "2. Concrete Mathematical Example",
        "points": [
          "Prove that <code>f(n) = 3n^2 + 5n + 7 = Θ(n^2)</code>:",
          "1. Upper bound (Big-O): For n >= 1, 3n^2 + 5n + 7 <= 3n^2 + 5n^2 + 7n^2 = 15n^2. Choose c2 = 15, n0 = 1. Thus, f(n) = O(n^2).",
          "2. Lower bound (Big-Omega): For n >= 1, 3n^2 + 5n + 7 >= 3n^2. Choose c1 = 3, n0 = 1. Thus, f(n) = Ω(n^2).",
          "3. Because 3n^2 <= 3n^2 + 5n + 7 <= 15n^2 for all n >= 1, f(n) = Θ(n^2) is rigorously proven."
        ]
      }
    ],
    "conclusion": "Asymptotic notations provide a machine-independent vocabulary for comparing algorithmic efficiency, focusing on growth rates rather than clock frequencies.",
    "markingScheme": [
      {
        "component": "Definitions of Big-O, Big-Omega, Big-Theta with Formal Set Notation",
        "marks": 2.5
      },
      {
        "component": "Graphical Representation / Curves & Meaning of Constants c, n0",
        "marks": 1.5
      },
      {
        "component": "Limit-Based Definitions & Tight Bound Equivalence Theorem",
        "marks": 1.5
      },
      {
        "component": "Complete Mathematical Proof Example (f(n) = 3n^2 + 5n + 7 = Θ(n^2))",
        "marks": 1.5
      }
    ],
    "examTip": "Write the complete existential quantifiers: \"there exist positive constants c and n0 such that...\". Show the c1*g(n) <= f(n) <= c2*g(n) sandwich inequality for Big-Theta."
  },
  {
    "id": "daa-q2",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Master Theorem provides a cookbook method for solving divide-and-conquer recurrences of the canonical form T(n) = a T(n/b) + f(n), where an algorithm divides a problem of size n into a subproblems, each of size n/b, with f(n) combining cost.",
    "sections": [
      {
        "heading": "1. Master Theorem Statement and the Three Cases",
        "points": [
          "For recurrence <code>T(n) = a T(n/b) + f(n)</code> (with a >= 1, b > 1):",
          "Compare f(n) with the watershed function <code>n^{log_b a}</code>:",
          "• <b>Case 1:</b> If <code>f(n) = O(n^{log_b a - ε})</code> for some constant ε > 0, then <code>T(n) = Θ(n^{log_b a})</code> (subproblems dominate).",
          "• <b>Case 2:</b> If <code>f(n) = Θ(n^{log_b a} · log^k n)</code> for some k >= 0, then <code>T(n) = Θ(n^{log_b a} · log^{k+1} n)</code> (equal balance).",
          "• <b>Case 3:</b> If <code>f(n) = Ω(n^{log_b a + ε})</code> for some constant ε > 0, and the regularity condition <code>a · f(n/b) <= c · f(n)</code> holds for some c < 1, then <code>T(n) = Θ(f(n))</code> (combine cost dominates)."
        ]
      },
      {
        "heading": "2. Solving the Three Target Recurrences Step-by-Step",
        "points": [
          "<b>Recurrence 1: T(n) = 2T(n/2) + n</b>",
          "• a = 2, b = 2, f(n) = n.",
          "• Compute watershed: <code>n^{log_b a} = n^{log_2 2} = n^1 = n</code>.",
          "• Compare: f(n) = n = Θ(n^{log_b a} · log^0 n) -> Case 2 with k = 0.",
          "• Solution: <code>T(n) = Θ(n · log n)</code> (Standard Merge Sort complexity).",
          "<b>Recurrence 2: T(n) = 4T(n/2) + n^2</b>",
          "• a = 4, b = 2, f(n) = n^2.",
          "• Compute watershed: <code>n^{log_b a} = n^{log_2 4} = n^2</code>.",
          "• Compare: f(n) = n^2 = Θ(n^2 · log^0 n) -> Case 2 with k = 0.",
          "• Solution: <code>T(n) = Θ(n^2 · log n)</code>.",
          "<b>Recurrence 3: T(n) = 3T(n/4) + n log n</b>",
          "• a = 3, b = 4, f(n) = n log n.",
          "• Compute watershed: <code>n^{log_b a} = n^{log_4 3} ≈ n^{0.793}</code>.",
          "• Compare: Since 1 > 0.793, f(n) = n log n = Ω(n^{0.793 + ε}) where ε ≈ 0.207 -> Case 3.",
          "• Regularity Check: a · f(n/b) = 3 · (n/4) log(n/4) = (3/4) n (log n - 2) <= (3/4) n log n. Holds with c = 3/4 < 1.",
          "• Solution: <code>T(n) = Θ(f(n)) = Θ(n log n)</code>."
        ]
      }
    ],
    "conclusion": "The Master Theorem systematically solves divide-and-conquer recurrences by identifying whether leaf computation, root combining, or inter-level balance dominates algorithmic execution time.",
    "markingScheme": [
      {
        "component": "Master Theorem Standard Form & 3 Formal Cases Stated",
        "marks": 2
      },
      {
        "component": "Solution to Problem 1: T(n) = 2T(n/2) + n (Θ(n log n))",
        "marks": 1.5
      },
      {
        "component": "Solution to Problem 2: T(n) = 4T(n/2) + n^2 (Θ(n^2 log n))",
        "marks": 1.5
      },
      {
        "component": "Solution to Problem 3: T(n) = 3T(n/4) + n log n with Regularity Check",
        "marks": 2
      }
    ],
    "examTip": "In Case 3, never forget the regularity condition check (a*f(n/b) <= c*f(n) for c < 1). Evaluators actively deduct marks if regularity verification is skipped."
  },
  {
    "id": "daa-q3",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Recursion Tree Method visualizes the cost expansion of a recurrence relation as a tree where each node represents the subproblem cost at that level, allowing total cost to be computed by summing across levels.",
    "sections": [
      {
        "heading": "1. Recursion Tree Construction for T(n) = 2T(n/2) + cn",
        "points": [
          "• <b>Level 0 (Root):</b> 1 node of size n, cost = <code>cn</code>.",
          "• <b>Level 1:</b> 2 nodes of size n/2, cost = 2 × (c · n/2) = <code>cn</code>.",
          "• <b>Level 2:</b> 4 nodes of size n/4, cost = 4 × (c · n/4) = <code>cn</code>.",
          "• <b>General Level i:</b> 2^i nodes of size n/2^i, cost = 2^i × (c · n / 2^i) = <code>cn</code>.",
          "• <b>Tree Height:</b> Subproblem size reduces from n to 1 when n / 2^k = 1 => <code>k = log_2 n</code>. Thus, tree height is <code>log_2 n</code>.",
          "• <b>Base Level (Leaves):</b> Total leaves = 2^{log_2 n} = n leaves. Total base cost = n · T(1) = <code>Θ(n)</code>.",
          "• <b>Total Cost:</b> Sum across all levels from i = 0 to log_2 n - 1:",
          "  <code>Total = ∑_{i=0}^{log_2 n - 1} cn + Θ(n) = cn · log_2 n + Θ(n) = Θ(n log n)</code>."
        ]
      },
      {
        "heading": "2. Mathematical Induction Verification (Substitution Method)",
        "points": [
          "<b>Claim:</b> <code>T(n) <= d · n log_2 n</code> for all n >= 2, where d is a positive constant.",
          "<b>Base Case (n = 2):</b> T(2) = 2T(1) + 2c = 2c_0 + 2c. For d >= c_0 + c, d · 2 log_2 2 = 2d >= T(2). Holds.",
          "<b>Inductive Hypothesis:</b> Assume T(k) <= d · k log_2 k holds for all k < n, specifically for k = n/2.",
          "<b>Inductive Step:</b>",
          "<code>T(n) = 2 T(n/2) + cn</code>",
          "<code>T(n) <= 2 [d · (n/2) log_2(n/2)] + cn</code>",
          "<code>T(n) <= d · n [log_2 n - log_2 2] + cn</code>",
          "<code>T(n) <= d · n log_2 n - d · n + cn</code>",
          "<code>T(n) <= d · n log_2 n - (d - c) n</code>",
          "For any choice of <code>d >= c</code>, the term <code>-(d - c) n <= 0</code>.",
          "Therefore, <code>T(n) <= d · n log_2 n</code>. By mathematical induction, <code>T(n) = O(n log n)</code> is verified."
        ]
      }
    ],
    "conclusion": "The recursion tree method provides the visual intuition that every level costs exactly cn across log2 n levels, while mathematical induction formally verifies the Θ(n log n) tight bound.",
    "markingScheme": [
      {
        "component": "Recursion Tree Structure & Node Expansion Analysis",
        "marks": 1.5
      },
      {
        "component": "Per-Level Cost Derivation (Level 0, 1, 2, i) & Tree Height log n",
        "marks": 2
      },
      {
        "component": "Summation to Total Cost Θ(n log n)",
        "marks": 1.5
      },
      {
        "component": "Complete Mathematical Induction Verification (Base, Hypothesis, Step)",
        "marks": 2
      }
    ],
    "examTip": "Show that each level sums to exactly cn. In the induction step, write out log2(n/2) = log2 n - 1 clearly to show how -d*n cancels the +cn term."
  }
];
