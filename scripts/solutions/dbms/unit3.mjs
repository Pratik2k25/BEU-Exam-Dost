// BEU Model Solutions - DBMS Unit 3
export const unit3Solutions = [
  {
    "id": "dbms-q7",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A B+ Tree is a self-balancing, multi-way search tree optimized for systems reading and writing large blocks of memory. Unlike standard B-trees, all actual data records (or record pointers) are stored exclusively in leaf nodes, which are linked sequentially as a doubly linked list for fast range traversals.",
    "diagrams": [
      {
        "title": "B+ Tree Node Structure & Sequential Leaf Linked List",
        "ascii": "                      +-----------------------+\n                      |   [ P0 | K1 | P1 ]    |  Internal Root\n                      +-------+-------+-------+\n                              |       |\n            +-----------------+       +-----------------+\n            v                                           v\n+-----------------------+                   +-----------------------+\n|  [ P0 | K1 | P1 ]     | Internal          |  [ P0 | K1 | P1 ]     | Internal\n+-------+-------+-------+                   +-------+-------+-------+\n        |       |                                   |       |\n   +----+   +---+---+                           +---+   +---+----+\n   v        v       v                           v       v        v\n+-------+ +-------+ +-------+               +-------+ +-------+ +-------+\n|K1| * -|->|K2| * -|->|K3| * -|-> ...       ->|Kn| * -|->|Km| * -|->|Kz|NIL | Leaf Nodes\n+-------+ +-------+ +-------+               +-------+ +-------+ +-------+\n(Leaf nodes contain actual Record Pointers and are linked sequentially for range queries)"
      }
    ],
    "sections": [
      {
        "heading": "1. B+ Tree Architectural Properties of Order p",
        "points": [
          "• <b>Internal Nodes:</b> Hold at most p pointers and p - 1 search keys. Must contain at least ceil(p / 2) pointers (except root). Serve strictly as routing index routers.",
          "• <b>Leaf Nodes:</b> Store key values and direct record/tuple pointers. Must contain at least ceil((p_leaf) / 2) keys. Contain a forward pointer to the next leaf node, providing O(log n + k) sequential range scanning.",
          "• <b>Balance:</b> Perfectly height-balanced; all leaf nodes reside at the exact same tree depth."
        ]
      },
      {
        "heading": "2. Search, Insertion, and Splitting Procedures",
        "points": [
          "<b>Search Procedure:</b> Start at root. At each internal node, find the smallest key Ki > SearchKey and traverse down pointer P_{i-1}. When reaching the leaf node, perform binary search. Time complexity: O(log_B N).",
          "<b>Insertion Procedure:</b> Search for target leaf node L. If L has space, insert key and record pointer in sorted order.",
          "<b>Node Splitting (Overflow Handling):</b>",
          "• If leaf node L has p keys (overflow): Split into two nodes. Retain first ceil(p/2) keys in L, move remaining keys to new leaf node L'. Copy the smallest key of L' upward into the parent internal node, and link L to L'.",
          "• If internal node overflows: Split into two nodes, but PROMOTE the middle key into the parent (do not keep a duplicate copy in the internal nodes). Propagate upward; if the root splits, a new root is created, increasing tree height by 1."
        ]
      }
    ],
    "conclusion": "B+ trees represent the industry standard for relational database storage engines (InnoDB, PostgreSQL heap indexes) because their shallow depth minimizes costly disk I/O seek operations.",
    "markingScheme": [
      {
        "component": "B+ Tree Architectural Definition & Distinctions from B-Tree",
        "marks": 1.5
      },
      {
        "component": "Internal vs Leaf Node Structural Diagrams & Pointer Layout",
        "marks": 2
      },
      {
        "component": "Search, Insertion & Splitting Algorithm Mechanics",
        "marks": 2.5
      },
      {
        "component": "Range Query Efficiency & Database Storage Engine Role",
        "marks": 1
      }
    ],
    "examTip": "Emphasize that in a B+ tree, the leaf split copies the key up (copy-up), while an internal node split pushes the middle key up (push-up). Mention the leaf-level linked list."
  },
  {
    "id": "dbms-q8",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Indexing and Hashing represent complementary physical database access mechanisms. Indexing maintains sorted tree structures ideal for point and range queries, whereas Hashing transforms search keys through hash functions for O(1) point lookups.",
    "table": {
      "title": "Tree-Structured Indexing vs Hashing",
      "headers": [
        "Evaluation Parameter",
        "B+ Tree Indexing",
        "Extendible Dynamic Hashing"
      ],
      "rows": [
        [
          "Point Query Speed",
          "O(log_B N) tree traversal steps",
          "O(1) direct bucket lookup"
        ],
        [
          "Range Query Support",
          "Outstanding: sequential leaf linked-list traversal",
          "Poor: hash functions scatter keys randomly"
        ],
        [
          "Dynamic Growth Adaptation",
          "Smooth node splitting; tree height grows logarithmically",
          "Directory doubling when local depth exceeds global depth"
        ],
        [
          "Storage Overhead",
          "Internal routing nodes and leaf pointers",
          "Directory array of 2^d pointers plus bucket blocks"
        ],
        [
          "Best Use Cases",
          "Primary relational keys, timestamp ranges, salary bounds",
          "Exact equality matches (Session IDs, user logins)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Extendible Hashing Architectural Components",
        "points": [
          "Overcomes the fixed-capacity limitations of static hashing by dynamically expanding buckets without full file reorganization.",
          "• <b>Hash Function h(k):</b> Generates a fixed-length binary bit sequence (e.g., 32 bits).",
          "• <b>Global Depth (d):</b> Number of leading binary bits used to index into the Directory array of size 2^d.",
          "• <b>Directory Array:</b> An array of 2^d pointers pointing to physical data buckets.",
          "• <b>Local Depth (d_i):</b> Associated with each individual bucket, indicating the number of bits shared by all keys currently stored in that bucket (d_i <= d)."
        ]
      },
      {
        "heading": "2. Bucket Splitting & Directory Expansion Rules",
        "points": [
          "When a key inserts into an already full bucket B with capacity C:",
          "• <b>Case 1 (d_i < d):</b> Local depth is less than global depth. No directory expansion needed! Split bucket B into B and B', increment local depths to d_i + 1, redistribute entries using the (d_i + 1)-th bit, and update directory pointers.",
          "• <b>Case 2 (d_i = d):</b> Local depth equals global depth. Directory must double! Increment global depth to d + 1, double directory size from 2^d to 2^(d+1), duplicate pointer mappings, then split bucket B as in Case 1."
        ]
      }
    ],
    "conclusion": "Extendible hashing provides predictable constant-time access for massive equality workloads, whereas B+ trees remain the versatile general-purpose database standard.",
    "markingScheme": [
      {
        "component": "Comparative Overview of Indexing vs Hashing",
        "marks": 1.5
      },
      {
        "component": "Extendible Hashing Architecture (Global Depth d vs Local Depth d_i)",
        "marks": 2
      },
      {
        "component": "Bucket Overflow & Directory Doubling Algorithm Steps",
        "marks": 2.5
      },
      {
        "component": "Comparison Table & Practical Use Case Guidelines",
        "marks": 1
      }
    ],
    "examTip": "Distinguish clearly between Global Depth (directory size = 2^d) and Local Depth (bits shared in bucket). Show what happens when d_i = d (directory doubles)."
  }
];
