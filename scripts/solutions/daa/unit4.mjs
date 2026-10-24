// BEU Model Solutions - DAA Unit 4
export const unit4Solutions = [
  {
    "id": "daa-q12",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The 0/1 Knapsack Problem is a classic dynamic programming optimization problem where items must be included completely (1) or excluded entirely (0) to maximize total value within weight capacity W without fractional splitting.",
    "sections": [
      {
        "heading": "1. Recurrence Relation Formulation",
        "points": [
          "Let <code>V[i, w]</code> be the maximum value achievable using a subset of the first i items with maximum weight capacity w:",
          "• <b>Base Cases:</b> <code>V[0, w] = 0</code> for all w >= 0, and <code>V[i, 0] = 0</code> for all i >= 0.",
          "• <b>Recurrence Step:</b>",
          "  If <code>w_i > w</code> (item i is too heavy for current capacity w):",
          "     <code>V[i, w] = V[i - 1, w]</code>",
          "  If <code>w_i <= w</code> (choice between including or excluding item i):",
          "     <code>V[i, w] = max( V[i - 1, w], v_i + V[i - 1, w - w_i] )</code>"
        ]
      },
      {
        "heading": "2. Step-by-Step DP Table: Weights [2, 3, 4, 5], Values [3, 4, 5, 6], W = 5",
        "points": [
          "Items: Item 1 (w=2, v=3), Item 2 (w=3, v=4), Item 3 (w=4, v=5), Item 4 (w=5, v=6). Capacity W = 5.",
          "Construct table V[0..4, 0..5]:",
          "• <b>Row 0:</b> [0, 0, 0, 0, 0, 0]",
          "• <b>Row 1 (w1=2, v1=3):</b> w < 2: V[0, w]; w >= 2: max(0, 3 + V[0, w-2]) -> [0, 0, 3, 3, 3, 3]",
          "• <b>Row 2 (w2=3, v2=4):</b> w=3: max(3, 4+0)=4; w=4: max(3, 4+0)=4; w=5: max(3, 4+V[1, 2]=4+3)=7 -> [0, 0, 3, 4, 4, 7]",
          "• <b>Row 3 (w3=4, v3=5):</b> w=4: max(4, 5+0)=5; w=5: max(7, 5+V[2, 1]=5+0)=7 -> [0, 0, 3, 4, 5, 7]",
          "• <b>Row 4 (w4=5, v4=6):</b> w=5: max(7, 6+0)=7 -> [0, 0, 3, 4, 5, 7]",
          "<b>Maximum Value = V[4, 5] = 7.</b>",
          "<b>Backtracking Selected Items:</b>",
          "• V[4, 5] = 7 == V[3, 5] -> Item 4 is NOT included.",
          "• V[3, 5] = 7 == V[2, 5] -> Item 3 is NOT included.",
          "• V[2, 5] = 7 ≠ V[1, 5] (which is 3) -> <b>Item 2 IS included</b> (Value 4, Weight 3). Remaining capacity = 5 - 3 = 2.",
          "• V[1, 2] = 3 ≠ V[0, 2] (which is 0) -> <b>Item 1 IS included</b> (Value 3, Weight 2). Remaining capacity = 2 - 2 = 0.",
          "<b>Optimal Selection:</b> Items {1, 2} with Total Weight = 2 + 3 = 5 and <b>Total Value = 3 + 4 = 7</b>."
        ]
      }
    ],
    "conclusion": "The dynamic programming approach eliminates overlapping subproblem re-computation, solving 0/1 Knapsack in pseudo-polynomial O(n · W) time.",
    "markingScheme": [
      {
        "component": "Optimal Substructure Property & Bellman Recurrence Equation",
        "marks": 2
      },
      {
        "component": "Complete DP Matrix Construction (Row 0 to 4, Col 0 to 5)",
        "marks": 3
      },
      {
        "component": "Backtracking Trace Identifying Selected Items {1, 2}",
        "marks": 1.5
      },
      {
        "component": "Time Complexity (O(nW)) vs NP-Complete Status Analysis",
        "marks": 0.5
      }
    ],
    "examTip": "Draw the full 5x6 table showing values at each cell. Trace back from V[4,5]=7 to identify that items 1 and 2 are selected."
  },
  {
    "id": "daa-q13",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Matrix Chain Multiplication (MCM) determines the most computationally efficient parenthesization order to multiply a sequence of matrices, minimizing the total number of scalar multiplications without altering the matrices themselves.",
    "sections": [
      {
        "heading": "1. Recurrence Relation Formulation",
        "points": [
          "Let dimensions be <code><p0, p1, ..., pn></code> where matrix A_i has dimension <code>p_{i-1} × p_i</code>.",
          "Let <code>m[i, j]</code> be the minimum scalar multiplications to compute A_i ··· A_j:",
          "• <code>m[i, i] = 0</code> (single matrix requires 0 multiplications).",
          "• <code>m[i, j] = min_{i <= k < j} { m[i, k] + m[k+1, j] + p_{i-1} · p_k · p_j }</code> (for i < j)."
        ]
      },
      {
        "heading": "2. Execution Trace for Dimensions <5, 10, 3, 12, 5, 50>",
        "points": [
          "Dimensions: p0=5, p1=10, p2=3, p3=12, p4=5, p5=50. Total 5 matrices (A1 to A5).",
          "• A1: 5×10, A2: 10×3, A3: 3×12, A4: 12×5, A5: 5×50.",
          "<b>Chain Length L = 2:</b>",
          "• m[1, 2] = p0·p1·p2 = 5 × 10 × 3 = <b>150</b> (s=1)",
          "• m[2, 3] = p1·p2·p3 = 10 × 3 × 12 = <b>360</b> (s=2)",
          "• m[3, 4] = p2·p3·p4 = 3 × 12 × 5 = <b>180</b> (s=3)",
          "• m[4, 5] = p3·p4·p5 = 12 × 5 × 50 = <b>3000</b> (s=4)",
          "<b>Chain Length L = 3:</b>",
          "• m[1, 3] = min(k=1: m[1,1]+m[2,3]+5·10·12=0+360+600=960; k=2: m[1,2]+m[3,3]+5·3·12=150+0+180=330) = <b>330</b> (s=2)",
          "• m[2, 4] = min(k=2: 0+180+10·3·5=330; k=3: 360+0+10·12·5=960) = <b>330</b> (s=2)",
          "• m[3, 5] = min(k=3: 0+3000+3·12·50=4800; k=4: 180+0+3·5·50=930) = <b>930</b> (s=4)",
          "<b>Chain Length L = 4:</b>",
          "• m[1, 4] = min(k=1: 0+330+5·10·5=580; k=2: 150+180+5·3·5=405; k=3: 330+0+5·12·5=630) = <b>405</b> (s=2)",
          "• m[2, 5] = min(k=2: 0+930+10·3·50=2430; k=3: 360+3000+10·12·50=9360; k=4: 330+0+10·5·50=2830) = <b>2430</b> (s=2)",
          "<b>Chain Length L = 5:</b>",
          "• m[1, 5] = min(k=1: 0+2430+5·10·50=4930; k=2: 150+930+5·3·50=1830; k=3: 330+3000+5·12·50=6330; k=4: 405+0+5·5·50=1655) = <b>1655</b> (s=4).",
          "<b>Minimum Scalar Multiplications:</b> <code>1655</code>.",
          "<b>Optimal Parenthesization:</b> Split at s[1,5]=4 -> ((A1 · A2 · A3 · A4) · A5); s[1,4]=2 -> <b>(((A1 · A2) · (A3 · A4)) · A5)</b>."
        ]
      }
    ],
    "conclusion": "Dynamic programming cuts matrix multiplication costs by orders of magnitude, reducing operations from over 10,000 to just 1,655 scalar multiplications in O(n^3) time.",
    "markingScheme": [
      {
        "component": "MCM Optimization Problem & Recurrence Relation",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step Diagonal Computation for Chain Lengths L = 2, 3, 4, 5",
        "marks": 3.5
      },
      {
        "component": "Final Minimum Cost (1655) & Optimal Parenthesization String",
        "marks": 1.5
      },
      {
        "component": "Time Complexity Derivation (O(n^3)) and Space O(n^2)",
        "marks": 0.5
      }
    ],
    "examTip": "Compute diagonally by chain length L = 2 to n. Show the split table s[i, j] and write the final parenthesization with nested parentheses: (((A1 A2) (A3 A4)) A5)."
  },
  {
    "id": "daa-q14",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Longest Common Subsequence (LCS) problem finds the longest sequence of characters that appear in the same relative order (not necessarily contiguous) within two sequences X and Y.",
    "sections": [
      {
        "heading": "1. Recurrence Relation Formulation",
        "points": [
          "Let X = <x1, ..., xm> and Y = <y1, ..., yn>. Let <code>c[i, j]</code> be the length of LCS of X[1..i] and Y[1..j]:",
          "• <code>c[i, j] = 0</code> if i = 0 or j = 0 (Base case).",
          "• <code>c[i, j] = c[i - 1, j - 1] + 1</code> if <code>x_i == y_j</code> (Character match: diagonal step).",
          "• <code>c[i, j] = max( c[i - 1, j], c[i, j - 1] )</code> if <code>x_i ≠ y_j</code> (Character mismatch: take max from top or left)."
        ]
      },
      {
        "heading": "2. Trace for X = \"ABCBDAB\" (m=7) and Y = \"BDCABA\" (n=6)",
        "points": [
          "Construct table c[0..7, 0..6]:",
          "• Row 0 (ε): [0, 0, 0, 0, 0, 0, 0]",
          "• Row 1 (A): [0, 0, 0, 0, 1, 1, 1] (match at Y[4]=A, Y[6]=A)",
          "• Row 2 (B): [0, 1, 1, 1, 1, 2, 2] (match at Y[1]=B, Y[5]=B)",
          "• Row 3 (C): [0, 1, 1, 2, 2, 2, 2] (match at Y[3]=C)",
          "• Row 4 (B): [0, 1, 1, 2, 2, 3, 3] (match at Y[1]=B, Y[5]=B)",
          "• Row 5 (D): [0, 1, 2, 2, 2, 3, 3] (match at Y[2]=D)",
          "• Row 6 (A): [0, 1, 2, 2, 3, 3, 4] (match at Y[4]=A, Y[6]=A)",
          "• Row 7 (B): [0, 1, 2, 2, 3, 4, 4] (match at Y[1]=B, Y[5]=B)",
          "<b>Length of LCS:</b> <code>c[7, 6] = 4</code>.",
          "<b>Backtracking Path from c[7, 6]:</b>",
          "• c[7, 6]=4 == c[6, 6]=4 -> move Up to (6, 6).",
          "• At (6, 6): X[6]='A' == Y[6]='A' -> <b>Select 'A'</b>; move diagonally to (5, 5).",
          "• At (5, 5): c[5, 5]=3 == c[4, 5]=3 -> move Up to (4, 5).",
          "• At (4, 5): X[4]='B' == Y[5]='B' -> <b>Select 'B'</b>; move diagonally to (3, 4).",
          "• At (3, 4): c[3, 4]=2 == c[3, 3]=2 -> move Left to (3, 3).",
          "• At (3, 3): X[3]='C' == Y[3]='C' -> <b>Select 'C'</b>; move diagonally to (2, 2).",
          "• At (2, 2): c[2, 2]=1 == c[2, 1]=1 -> move Left to (2, 1).",
          "• At (2, 1): X[2]='B' == Y[1]='B' -> <b>Select 'B'</b>; move diagonally to (1, 0).",
          "Reversing selections yields: <b>LCS = \"BCBA\"</b> (length 4). [Alternative valid LCS: \"BDAB\"]."
        ]
      }
    ],
    "conclusion": "The dynamic programming solution determines the longest common subsequence in O(m · n) time and space, forming the foundation of diff tools (git diff) and DNA sequence alignment.",
    "markingScheme": [
      {
        "component": "LCS Problem Definition & Bellman Recurrence Equation",
        "marks": 1.5
      },
      {
        "component": "Complete DP Table Construction for \"ABCBDAB\" vs \"BDCABA\"",
        "marks": 3
      },
      {
        "component": "Backtrack Path Trace & String Extraction (\"BCBA\" or \"BDAB\")",
        "marks": 1.5
      },
      {
        "component": "Time and Space Complexity Analysis (O(m · n))",
        "marks": 1
      }
    ],
    "examTip": "Show arrow pointers (diagonal ↖, up ↑, left ←) in your table to visualize backtracking. Both \"BCBA\" and \"BDAB\" are length-4 optimal solutions; mention both for completeness."
  },
  {
    "id": "daa-q15",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Dijkstra’s Algorithm is a greedy graph algorithm that computes the Shortest Path from a single source vertex to all other vertices in a directed or undirected graph with NON-NEGATIVE edge weights.",
    "sections": [
      {
        "heading": "1. Dijkstra’s Algorithm Execution Steps",
        "points": [
          "1. Initialize distance array: <code>dist[s] = 0</code> for source s, and <code>dist[v] = ∞</code> for all v ≠ s. Set parent[v] = NIL.",
          "2. Insert all vertices into a Min-Priority Queue Q keyed by dist.",
          "3. While Q is not empty:",
          "   a. Extract vertex u with minimum distance: <code>u = EXTRACT-MIN(Q)</code>.",
          "   b. For each adjacent vertex v ∈ Adj[u]:",
          "      <b>Relaxation Step:</b> If <code>dist[u] + w(u, v) < dist[v]</code>:",
          "         Set <code>dist[v] = dist[u] + w(u, v)</code>; parent[v] = u; DECREASE-KEY(Q, v, dist[v])."
        ]
      },
      {
        "heading": "2. Why Dijkstra Fails with Negative Edge Weights",
        "points": [
          "<b>Core Greedy Assumption:</b> Dijkstra assumes that once a vertex u is extracted from the priority queue (added to the permanent set S), its distance <code>dist[u]</code> is final and cannot be improved.",
          "This assumption holds strictly only when all edge weights are non-negative, because any alternative path to u must travel through remaining nodes in Q, which already have distances >= dist[u] and adding non-negative edges can only increase path length.",
          "<b>Counter-Example with Negative Edge:</b>",
          "• Graph: Vertices {A, B, C}. Source A.",
          "• Edges: (A, B) weight 3; (A, C) weight 5; (B, C) weight -4.",
          "1. Initially dist[A]=0, dist[B]=∞, dist[C]=∞.",
          "2. Extract A. Relax neighbors: dist[B] = 3, dist[C] = 5.",
          "3. Next minimum is B (dist=3). Extract B as permanent.",
          "   Relax neighbor C: dist[C] = min(5, dist[B] + (-4)) = min(5, 3 - 4) = <b>-1</b>.",
          "4. Now suppose an edge (C, B) with weight -10 existed: B’s distance would become -11 after B was already marked permanent, violating the algorithm’s core invariant.",
          "<b>Correct Algorithm for Negative Weights:</b> Bellman-Ford algorithm (runs in O(V · E) time and detects negative-weight cycles)."
        ]
      }
    ],
    "conclusion": "Dijkstra’s algorithm provides optimal O((V + E) log V) routing on positive networks, but fundamental greedy finality requires Bellman-Ford when negative edge weights are present.",
    "markingScheme": [
      {
        "component": "Dijkstra’s Algorithm Definition, Greedy Strategy & Relaxation Logic",
        "marks": 2
      },
      {
        "component": "Step-by-Step Priority Queue Workflow Description",
        "marks": 1.5
      },
      {
        "component": "Theoretical Proof of Failure on Negative Weights (Greedy Invariant Violation)",
        "marks": 2
      },
      {
        "component": "Concrete 3-Node Counter-Example Trace & Bellman-Ford Alternative",
        "marks": 1.5
      }
    ],
    "examTip": "Draw the 3-node counter-example graph (A->B with +3, A->C with +5, B->C with -4) and explain that Dijkstra freezes B prematurely, failing to recognize that traveling through B yields a shorter path to C."
  }
];
