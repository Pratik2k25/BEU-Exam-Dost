// BEU Model Solutions - DAA Unit 3
export const unit3Solutions = [
  {
    "id": "daa-q8",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Kruskal’s Algorithm is a greedy graph algorithm that constructs a Minimum Spanning Tree (MST) for a connected weighted undirected graph by examining edges in ascending order of weight and adding an edge if it does not form a cycle, using the Disjoint Set Union (DSU) data structure.",
    "sections": [
      {
        "heading": "1. Disjoint Set Union (DSU / Union-Find) Data Structure",
        "points": [
          "Maintains a collection of disjoint dynamic sets. Key operations:",
          "• <b>MAKE-SET(v):</b> Initializes a set containing single element v with parent[v] = v and rank[v] = 0.",
          "• <b>FIND-SET(v) with Path Compression:</b> Recursively traverses up to find the representative root, flattening the tree by pointing all examined nodes directly to the root.",
          "• <b>UNION(u, v) by Rank:</b> Attaches the root of the smaller rank tree as a child of the higher rank tree. If ranks are equal, increment the parent rank by 1.",
          "With Path Compression and Union by Rank, m operations on n elements take nearly linear <code>O(m · α(n))</code> time (where α is the inverse Ackermann function, α(n) <= 4 for all practical universe sizes)."
        ]
      },
      {
        "heading": "2. Kruskal’s Algorithm Steps & Time Complexity",
        "points": [
          "1. Initialize empty MST set E_T = ∅. Call MAKE-SET(v) for every vertex v ∈ V.",
          "2. Sort all edges E in non-decreasing order of weight w(u, v). Cost: <code>O(E log E) = O(E log V)</code>.",
          "3. For each edge (u, v) in sorted order:",
          "   • If FIND-SET(u) ≠ FIND-SET(v) (adding edge does not form a cycle):",
          "     Add (u, v) to E_T; call UNION(u, v).",
          "   • Else: Discard edge (cycle would be created).",
          "4. Stop when E_T contains |V| - 1 edges.",
          "<b>Total Time Complexity:</b> Sorting takes O(E log E). DSU operations take O(E · α(V)). Overall time: <code>O(E log V)</code>."
        ]
      }
    ],
    "conclusion": "Kruskal’s algorithm provides an optimal greedy MST construction whose running time is dominated by edge sorting, making it particularly efficient for sparse graphs (E ≈ V).",
    "markingScheme": [
      {
        "component": "Kruskal’s Algorithm Greedy Principle & MST Concept",
        "marks": 1.5
      },
      {
        "component": "Disjoint Set Union (DSU) Operations: FIND-SET & UNION by Rank",
        "marks": 2.5
      },
      {
        "component": "Cycle Detection Mechanism via DSU & Step-by-Step Procedure",
        "marks": 1.5
      },
      {
        "component": "Time Complexity Derivation (O(E log V)) for Sparse Graphs",
        "marks": 1.5
      }
    ],
    "examTip": "Explain why DSU makes cycle checking O(α(V)) instead of running a full DFS/BFS cycle check O(V). State that sorting dominates the O(E log V) time."
  },
  {
    "id": "daa-q9",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Prim’s Algorithm is a greedy algorithm that grows a Minimum Spanning Tree (MST) outward from an arbitrary start vertex by iteratively selecting the minimum-weight cut edge connecting a vertex in the growing tree to a vertex outside the tree.",
    "table": {
      "title": "Prim’s vs Kruskal’s Algorithm Comparison",
      "headers": [
        "Comparison Criterion",
        "Prim’s Algorithm",
        "Kruskal’s Algorithm"
      ],
      "rows": [
        [
          "Greedy Strategy",
          "Grows a single continuous tree component from a root",
          "Grows a forest of trees, connecting components"
        ],
        [
          "Core Data Structure",
          "Min-Priority Queue / Binary Heap / Fibonacci Heap",
          "Disjoint Set Union (DSU / Union-Find)"
        ],
        [
          "Graph Requirement",
          "Must be connected; operates on edge cuts",
          "Can operate on disconnected graphs (builds MSF)"
        ],
        [
          "Time Complexity (Binary Heap)",
          "O((V + E) log V) = O(E log V)",
          "O(E log E) = O(E log V)"
        ],
        [
          "Time Complexity (Fibonacci Heap)",
          "O(E + V log V)",
          "O(E log V)"
        ],
        [
          "Optimal Graph Density",
          "Dense graphs (E ≈ V^2) using Fibonacci Heap or Adjacency Matrix",
          "Sparse graphs (E ≈ V)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Prim’s Algorithm Execution Steps",
        "points": [
          "1. Initialize key[v] = ∞ and parent[v] = NIL for all vertices. Set key[r] = 0 for start vertex r.",
          "2. Insert all vertices into a Min-Priority Queue Q keyed by key values.",
          "3. While Q is not empty:",
          "   a. Extract vertex u with minimum key: <code>u = EXTRACT-MIN(Q)</code>.",
          "   b. For each adjacent vertex v ∈ Adj[u]:",
          "      If v ∈ Q and w(u, v) < key[v]:",
          "         Set parent[v] = u; DECREASE-KEY(Q, v, w(u, v)).",
          "4. Resulting tree edges: {(v, parent[v]) for all v ≠ r}."
        ]
      }
    ],
    "conclusion": "Prim’s algorithm is ideal for dense networks where edge-cut priority updates minimize traversal overhead, complementing Kruskal’s edge-sorting approach on sparse graphs.",
    "markingScheme": [
      {
        "component": "Prim’s Algorithm Greedy Cut Principle",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step Algorithm with Priority Queue / DECREASE-KEY",
        "marks": 2.5
      },
      {
        "component": "Comprehensive Comparison Table (Prim vs Kruskal)",
        "marks": 2
      },
      {
        "component": "Time Complexity Derivations for Binary and Fibonacci Heaps",
        "marks": 1
      }
    ],
    "examTip": "Highlight the difference: Prim grows a single tree from a starting vertex, whereas Kruskal adds global edges and maintains a forest until it connects."
  },
  {
    "id": "daa-q10",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Fractional Knapsack problem is an optimization problem where a knapsack of capacity W must be filled with fractions of items to maximize total monetary value. It exhibits the Greedy-Choice Property and Optimal Substructure.",
    "sections": [
      {
        "heading": "1. Greedy Strategy & Algorithm",
        "points": [
          "Unlike the 0/1 Knapsack problem where items cannot be broken, the Fractional Knapsack allows fractional amounts: <code>0 <= x_i <= 1</code>.",
          "<b>Greedy Choice:</b> Always select items in descending order of Value-to-Weight Ratio: <code>r_i = v_i / w_i</code>.",
          "Take as much of the highest ratio item as possible; if the knapsack cannot fit the whole item, take the exact fraction remaining to fill capacity W."
        ]
      },
      {
        "heading": "2. Numerical Trace: Weights [10, 20, 30], Values [60, 100, 120], W = 50",
        "points": [
          "Given items:",
          "• Item 1: Weight w1 = 10, Value v1 = 60 -> Ratio <code>r1 = 60 / 10 = 6.0</code>.",
          "• Item 2: Weight w2 = 20, Value v2 = 100 -> Ratio <code>r2 = 100 / 20 = 5.0</code>.",
          "• Item 3: Weight w3 = 30, Value v3 = 120 -> Ratio <code>r3 = 120 / 30 = 4.0</code>.",
          "Sorted order by ratio: <b>Item 1 (6.0) > Item 2 (5.0) > Item 3 (4.0)</b>.",
          "<b>Step-by-Step Filling:</b>",
          "• Initial Capacity W = 50. Total Profit = 0.",
          "• <b>Take Item 1:</b> w1 = 10 <= 50. Take fraction <code>x1 = 1.0</code>. Remaining capacity = 50 - 10 = 40. Profit = 0 + 60 = 60.",
          "• <b>Take Item 2:</b> w2 = 20 <= 40. Take fraction <code>x2 = 1.0</code>. Remaining capacity = 40 - 20 = 20. Profit = 60 + 100 = 160.",
          "• <b>Take Item 3:</b> w3 = 30 > 20 (cannot take whole item). Take fraction <code>x3 = 20 / 30 = 2/3</code>. Remaining capacity = 20 - 20 = 0. Profit = 160 + (2/3 × 120) = 160 + 80 = 240.",
          "<b>Final Result:</b>",
          "• Optimal Item Fractions: <code>[x1 = 1.0, x2 = 1.0, x3 = 2/3 (0.667)]</code>.",
          "• <b>Maximum Profit = ₹240.0</b>."
        ]
      }
    ],
    "conclusion": "The greedy strategy guarantees the mathematically optimal solution for Fractional Knapsack in O(n log n) time due to sorting, whereas 0/1 Knapsack requires Dynamic Programming.",
    "markingScheme": [
      {
        "component": "Greedy Choice Property & Value-to-Weight Ratio Formulation",
        "marks": 1.5
      },
      {
        "component": "Sorting and Step-by-Step Knapsack Capacity Filling Trace",
        "marks": 3.5
      },
      {
        "component": "Calculation of Final Item Fractions [1.0, 1.0, 2/3] & Max Profit ₹240",
        "marks": 1.5
      },
      {
        "component": "Time Complexity Analysis (O(n log n))",
        "marks": 0.5
      }
    ],
    "examTip": "Calculate the ratio v_i / w_i for every item first. State the final fraction vector [1, 1, 2/3] and the total value 240 clearly in a summary box."
  },
  {
    "id": "daa-q11",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Huffman Coding is a greedy lossless data compression algorithm that assigns variable-length prefix-free binary codes to symbols based on their frequencies of occurrence: frequently occurring characters receive shorter binary codes.",
    "sections": [
      {
        "heading": "1. Huffman Tree Construction Algorithm",
        "points": [
          "1. Insert all alphabet symbols into a Min-Priority Queue keyed by their frequencies.",
          "2. While the queue contains more than one node:",
          "   a. Extract the two nodes with the lowest frequencies: x and y.",
          "   b. Create a new internal node z with frequency: <code>freq[z] = freq[x] + freq[y]</code>.",
          "   c. Set left child of z as x (assign code bit 0) and right child as y (assign code bit 1).",
          "   d. Insert z back into the priority queue.",
          "3. The remaining single node in the queue becomes the root of the Huffman Tree."
        ]
      },
      {
        "heading": "2. Worked Example: a:45, b:13, c:12, d:16, e:9, f:5",
        "points": [
          "Initial frequencies: f:5, e:9, c:12, b:13, d:16, a:45.",
          "• <b>Step 1:</b> Combine smallest f(5) and e(9) -> new node [fe: 14]. Set: c:12, b:13, [fe:14], d:16, a:45.",
          "• <b>Step 2:</b> Combine c(12) and b(13) -> new node [cb: 25]. Set: [fe:14], d:16, [cb:25], a:45.",
          "• <b>Step 3:</b> Combine [fe:14] and d(16) -> new node [fed: 30]. Set: [cb:25], [fed:30], a:45.",
          "• <b>Step 4:</b> Combine [cb:25] and [fed:30] -> new node [cbfed: 55]. Set: a:45, [cbfed:55].",
          "• <b>Step 5:</b> Combine a(45) and [cbfed:55] -> Root [100].",
          "<b>Resulting Prefix Codes:</b>",
          "• <b>a:</b> <code>0</code> (1 bit)",
          "• <b>c:</b> <code>100</code> (3 bits)",
          "• <b>b:</b> <code>101</code> (3 bits)",
          "• <b>f:</b> <code>1100</code> (4 bits)",
          "• <b>e:</b> <code>1101</code> (4 bits)",
          "• <b>d:</b> <code>111</code> (3 bits)",
          "<b>Average Code Length:</b>",
          "L_avg = (45×1 + 13×3 + 12×3 + 16×3 + 9×4 + 5×4) / 100 = (45 + 39 + 36 + 48 + 36 + 20) / 100 = <b>2.24 bits/char</b> (vs 3 bits for fixed 6-character code)."
        ]
      }
    ],
    "conclusion": "Huffman coding achieves optimal prefix-free variable-length encoding, reducing storage bandwidth proportional to character entropy in O(n log n) time.",
    "markingScheme": [
      {
        "component": "Prefix Code Concept & Huffman Greedy Tree Algorithm",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step Tree Merge Trace for Frequencies a:45, b:13, c:12, d:16, e:9, f:5",
        "marks": 3.5
      },
      {
        "component": "Final Code Table Generation (a, b, c, d, e, f)",
        "marks": 1
      },
      {
        "component": "Average Code Length Calculation (2.24 bits/char) & Compression Ratio",
        "marks": 1
      }
    ],
    "examTip": "Show each step of combining the two smallest frequencies. Verify that no code is a prefix of any other code (e.g., a=0, c=100)."
  }
];
