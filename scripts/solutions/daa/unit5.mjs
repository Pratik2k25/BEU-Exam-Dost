// BEU Model Solutions - DAA Unit 5
export const unit5Solutions = [
  {
    "id": "daa-q16",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Graph Traversals systematically visit every vertex and edge in a graph. The two foundational traversal strategies are Breadth-First Search (BFS, exploring level-by-level) and Depth-First Search (DFS, exploring deeply along paths before backtracking).",
    "table": {
      "title": "BFS vs DFS Comprehensive Comparison",
      "headers": [
        "Feature / Dimension",
        "Breadth-First Search (BFS)",
        "Depth-First Search (DFS)"
      ],
      "rows": [
        [
          "Underlying Data Structure",
          "Queue (FIFO)",
          "Stack (LIFO) or Recursive Call Stack"
        ],
        [
          "Traversal Order",
          "Level-by-level (radiates outward in concentric circles)",
          "Path-by-path (advances along unvisited branches to dead end)"
        ],
        [
          "Shortest Path Property",
          "Finds Shortest Path in unweighted graphs",
          "Does NOT guarantee shortest paths"
        ],
        [
          "Space Complexity",
          "O(W) where W is maximum width of tree (O(V) worst-case)",
          "O(H) where H is maximum depth/height of tree"
        ],
        [
          "Time Complexity",
          "O(V + E) with adjacency list",
          "O(V + E) with adjacency list"
        ],
        [
          "Tree Edge Classifications",
          "Tree edges, Cross edges",
          "Tree edges, Back edges, Forward edges, Cross edges"
        ],
        [
          "Primary Applications",
          "Shortest path, bipartite checking, peer-to-peer crawling",
          "Topological sort, cycle detection, strongly connected components (SCC)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Breadth-First Search (BFS) Algorithm",
        "points": [
          "1. Enqueue start vertex s; mark visited[s] = true; dist[s] = 0.",
          "2. While queue is not empty:",
          "   a. u = DEQUEUE().",
          "   b. For each adjacent vertex v ∈ Adj[u]:",
          "      If not visited[v]: mark visited[v] = true, dist[v] = dist[u] + 1, parent[v] = u, ENQUEUE(v)."
        ]
      },
      {
        "heading": "2. Depth-First Search (DFS) Algorithm",
        "points": [
          "Uses discovery time d[u] and finish time f[u] counters:",
          "<code>DFS-VISIT(u):</code>",
          "1. time = time + 1; d[u] = time; color[u] = GRAY.",
          "2. For each v ∈ Adj[u]:",
          "   If color[v] == WHITE (unvisited): parent[v] = u; DFS-VISIT(v).",
          "3. color[u] = BLACK; time = time + 1; f[u] = time."
        ]
      }
    ],
    "conclusion": "BFS and DFS represent dual exploration strategies: BFS provides optimal unweighted pathfinding via queues, while DFS enables structural topological and connectivity analysis via recursion.",
    "markingScheme": [
      {
        "component": "BFS Concept, Queue Data Structure & Pseudo-code",
        "marks": 2
      },
      {
        "component": "DFS Concept, Stack / Recursion, Discovery & Finish Timestamps",
        "marks": 2
      },
      {
        "component": "Comprehensive Comparison Table (BFS vs DFS)",
        "marks": 2
      },
      {
        "component": "Time Complexity Derivations (O(V + E)) & Application Areas",
        "marks": 1
      }
    ],
    "examTip": "Mention the DFS edge classifications: Back edges indicate cycles; Tree edges form the DFS forest. For BFS, emphasize the unweighted shortest-path property."
  },
  {
    "id": "daa-q17",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Floyd–Warshall Algorithm is an all-pairs shortest path dynamic programming algorithm that computes the shortest path between every pair of vertices in a directed, weighted graph with positive or negative edge weights (provided no negative-weight cycles exist).",
    "sections": [
      {
        "heading": "1. Dynamic Programming Formulation",
        "points": [
          "Let vertices be numbered 1, 2, ..., n.",
          "Let <code>D^{(k)}[i, j]</code> be the shortest path weight from vertex i to vertex j using only intermediate vertices from the set <code>{1, 2, ..., k}</code>:",
          "• <b>Base Case (k = 0):</b> <code>D^{(0)}[i, j] = w(i, j)</code> if edge (i, j) exists, 0 if i = j, and ∞ otherwise.",
          "• <b>Recursive Step:</b> For each k from 1 to n:",
          "  <code>D^{(k)}[i, j] = min( D^{(k-1)}[i, j], D^{(k-1)}[i, k] + D^{(k-1)}[k, j] )</code>",
          "Either vertex k is not on the shortest path (cost remains D^{(k-1)}[i, j]), or k is an intermediate node (cost is path through k)."
        ]
      },
      {
        "heading": "2. Trace on a 4-Vertex Graph",
        "points": [
          "Vertices: {1, 2, 3, 4}. Edges: (1,2)=3, (1,4)=7, (2,1)=8, (2,3)=2, (3,1)=5, (3,4)=1, (4,1)=2.",
          "• <b>Initial Matrix D^(0):</b>",
          "  [  0,   3,  ∞,   7 ]",
          "  [  8,   0,   2,  ∞ ]",
          "  [  5,  ∞,   0,   1 ]",
          "  [  2,  ∞,  ∞,   0 ]",
          "• <b>After k = 1 (intermediate node 1):</b>",
          "  Row 1 and Col 1 unchanged. D[2,4] = min(∞, D[2,1]+D[1,4]=8+7)=15. D[3,2] = min(∞, 5+3)=8.",
          "• <b>After k = 2 (intermediate node 2):</b> Paths via 2 updated.",
          "• <b>After k = 3 (intermediate node 3):</b> Paths via 3 updated.",
          "• <b>After k = 4 (intermediate node 4):</b> All intermediate vertices considered.",
          "<b>Final All-Pairs Shortest Path Matrix D^(4):</b>",
          "  [ 0,  3,  5,  6 ]",
          "  [ 5,  0,  2,  3 ]",
          "  [ 3,  6,  0,  1 ]",
          "  [ 2,  5,  7,  0 ]"
        ]
      }
    ],
    "conclusion": "Floyd–Warshall computes all-pairs shortest paths in compact O(V^3) time and O(V^2) space using three nested loops, elegantly detecting negative cycles if any diagonal element D[i, i] < 0.",
    "markingScheme": [
      {
        "component": "Floyd–Warshall Concept & Bellman Recurrence Equation",
        "marks": 2
      },
      {
        "component": "Three-Loop Algorithm Structure & In-Place Space Optimization",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step Matrix Trace (D^(0) to D^(4)) on 4-Vertex Graph",
        "marks": 2.5
      },
      {
        "component": "Negative Cycle Detection Criterion (D[i, i] < 0) & O(V^3) Complexity",
        "marks": 1
      }
    ],
    "examTip": "Show the three nested for-loops (for k, for i, for j). State clearly that if any diagonal element D[i, i] becomes negative, the graph contains a negative cycle."
  },
  {
    "id": "daa-q18",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The N-Queens Problem places N non-attacking chess queens on an N × N chessboard such that no two queens share the same row, column, or diagonal. It is solved efficiently using Backtracking with a state-space tree pruned by bounding functions.",
    "sections": [
      {
        "heading": "1. Mathematical Bounding Function for Queens",
        "points": [
          "Represent board placement as an array <code>X[1..N]</code> where <code>X[k] = col</code> means the queen in row k is placed at column col.",
          "By definition, placing one queen per row eliminates row conflicts automatically.",
          "<b>Column Conflict Test:</b> <code>X[i] == X[k]</code>",
          "<b>Diagonal Conflict Test:</b> Two queens at (i, X[i]) and (k, X[k]) share a diagonal if the absolute column difference equals the absolute row difference:",
          "<code>|X[i] - X[k]| == |i - k|</code>",
          "<b>Bounding Function PLACE(k, col):</b> Returns TRUE if placing queen k at column col conflicts with no previously placed queen i (for all 1 <= i < k)."
        ]
      },
      {
        "heading": "2. 4-Queens State-Space Tree Trace",
        "points": [
          "Board size 4 × 4. Initial: root at level 0.",
          "• <b>Row 1:</b> Try X[1] = 1.",
          "• <b>Row 2:</b> Try X[2] = 1 (col conflict). Try X[2] = 2 (diagonal |2-1| == |2-1| conflict). Try X[2] = 3 (valid! PLACE=true).",
          "• <b>Row 3:</b> Try X[3] = 1 (diagonal with (2,3)). Try X[3] = 2 (diagonal with (1,1)). Try X[3] = 3 (col conflict with row 2). Try X[3] = 4 (diagonal with row 2). All columns pruned! BACKTRACK to Row 2.",
          "• <b>Row 2:</b> Try X[2] = 4 (valid!).",
          "• <b>Row 3:</b> Try X[3] = 1 (valid!).",
          "• <b>Row 4:</b> Try X[4] = 1 (col conflict). Try X[4] = 2 (valid! PLACE=true). Try X[4] = 3 (diagonal).",
          "All 4 queens placed successfully without conflicts!",
          "<b>First Valid Solution:</b> <code>X = [2, 4, 1, 3]</code> (or symmetrically <code>[3, 1, 4, 2]</code>)."
        ]
      }
    ],
    "conclusion": "Backtracking dramatically prunes the state-space tree from N^N combinatorial leaves to manageable search depths by abandoning infeasible partial solutions immediately.",
    "markingScheme": [
      {
        "component": "N-Queens Problem Formulation & Representation Array X[1..N]",
        "marks": 1.5
      },
      {
        "component": "Mathematical Bounding Function Formula (|X[i] - X[k]| == |i - k|)",
        "marks": 2
      },
      {
        "component": "State-Space Tree Pruning Trace for 4-Queens",
        "marks": 2.5
      },
      {
        "component": "Final Solution Vector [2, 4, 1, 3] & Backtracking Efficiency",
        "marks": 1
      }
    ],
    "examTip": "Write out the diagonal test formula explicitly: abs(X[i] - X[k]) == abs(i - k). Draw the pruned state-space tree showing cross marks (X) on pruned branches."
  }
];
