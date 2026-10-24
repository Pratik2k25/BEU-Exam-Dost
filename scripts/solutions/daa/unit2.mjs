// BEU Model Solutions - DAA Unit 2
export const unit2Solutions = [
  {
    "id": "daa-q4",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Merge Sort is a classic Divide-and-Conquer sorting algorithm that recursively splits an array into two equal halves, sorts each half, and merges the sorted sub-arrays into a single sorted output.",
    "sections": [
      {
        "heading": "1. Merge Sort Algorithm & Pseudo-Code",
        "points": [
          "<code>MERGE-SORT(A, p, r):</code>",
          "1. if p < r then:",
          "2.    q = floor((p + r) / 2)  // Divide",
          "3.    MERGE-SORT(A, p, q)     // Conquer left",
          "4.    MERGE-SORT(A, q + 1, r) // Conquer right",
          "5.    MERGE(A, p, q, r)       // Combine in O(n) time"
        ]
      },
      {
        "heading": "2. Trace for Array: [38, 27, 43, 3, 9, 82, 10]",
        "points": [
          "Initial array of size n = 7:",
          "• <b>Divide Phase:</b>",
          "  Split into Left [38, 27, 43] and Right [3, 9, 82, 10].",
          "  Left [38, 27, 43] splits into [38, 27] and [43]; [38, 27] splits into [38] and [27].",
          "  Right [3, 9, 82, 10] splits into [3, 9] and [82, 10].",
          "• <b>Conquer & Merge Phase:</b>",
          "  Merge [38] and [27] -> [27, 38].",
          "  Merge [27, 38] and [43] -> [27, 38, 43] (Left half sorted).",
          "  Merge [3] and [9] -> [3, 9]; Merge [82] and [10] -> [10, 82].",
          "  Merge [3, 9] and [10, 82] -> [3, 9, 10, 82] (Right half sorted).",
          "  Final Merge: Merge [27, 38, 43] and [3, 9, 10, 82] comparing heads:",
          "  -> <b>[3, 9, 10, 27, 38, 43, 82]</b>."
        ]
      },
      {
        "heading": "3. Recurrence Relation & Complexity Derivation",
        "points": [
          "Recurrence: <code>T(n) = 2 T(n/2) + Θ(n)</code> (for n > 1), T(1) = Θ(1).",
          "Applying Master Theorem (a = 2, b = 2, f(n) = n): Case 2 applies with k = 0.",
          "Therefore, <b>Best, Average, and Worst-Case Time Complexity:</b> <code>Θ(n log n)</code>.",
          "<b>Space Complexity:</b> <code>O(n)</code> auxiliary space required for the temporary merge buffer. Stable sort."
        ]
      }
    ],
    "conclusion": "Merge Sort guarantees deterministic O(n log n) sorting performance regardless of initial element ordering, making it the algorithm of choice for linked lists and external sorting.",
    "markingScheme": [
      {
        "component": "Divide-and-Conquer Paradigm Description & Merge Sort Pseudo-code",
        "marks": 2
      },
      {
        "component": "Step-by-Step Tree Trace on Target Array [38, 27, 43, 3, 9, 82, 10]",
        "marks": 2.5
      },
      {
        "component": "Recurrence Relation Formulation (T(n) = 2T(n/2) + cn)",
        "marks": 1
      },
      {
        "component": "Time Complexity Derivation (Θ(n log n)) & O(n) Space Analysis",
        "marks": 1.5
      }
    ],
    "examTip": "Draw the binary split tree showing divide down to single elements and the bottom-up merge steps. Mention that Merge Sort is stable with O(n) extra space."
  },
  {
    "id": "daa-q5",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Quick Sort is a highly efficient in-place divide-and-conquer sorting algorithm. It selects a pivot element, partitions the array such that all elements smaller than the pivot precede it and all larger elements follow it, and then recursively sorts the subarrays.",
    "sections": [
      {
        "heading": "1. Partitioning Mechanism (Lomuto Partitioning)",
        "points": [
          "<code>LOMUTO-PARTITION(A, p, r):</code>",
          "1. x = A[r]  // Pivot is rightmost element",
          "2. i = p - 1",
          "3. for j = p to r - 1 do:",
          "4.    if A[j] <= x then:",
          "5.       i = i + 1; swap A[i] with A[j]",
          "6. swap A[i + 1] with A[r]",
          "7. return i + 1  // Final pivot index"
        ]
      },
      {
        "heading": "2. Average-Case Time Complexity Derivation: O(n log n)",
        "points": [
          "In the average case, the pivot does not partition equally, but splits with reasonable balance (e.g., 9-to-1 split or 1-to-1 split).",
          "Average recurrence: <code>T(n) = (1/n) ∑_{k=0}^{n-1} [T(k) + T(n - 1 - k)] + cn</code>.",
          "Solving via substitution or induction yields <code>T(n) <= 2c · n ln n = O(n log n)</code>.",
          "Because in-place memory cache locality is exceptional, Quick Sort typically runs 2x-3x faster in practice than Merge Sort."
        ]
      },
      {
        "heading": "3. Worst-Case Analysis: O(n^2)",
        "points": [
          "<b>When Worst-Case Occurs:</b>",
          "1. The array is already completely sorted in ascending order.",
          "2. The array is sorted in reverse descending order.",
          "3. All array elements are identical.",
          "In these cases, the pivot is always the extreme (minimum or maximum) element, producing a maximally unbalanced 0-to-(n-1) partition: <code>T(n) = T(n - 1) + cn = c ∑_{i=1}^n i = c · n(n+1)/2 = O(n^2)</code>.",
          "<b>Mitigation:</b> Randomized Quick Sort (choosing pivot uniformly at random) or Median-of-Three pivot selection guarantees O(n log n) expected time on all inputs."
        ]
      }
    ],
    "conclusion": "Quick Sort is the standard general-purpose in-place sorting algorithm across standard libraries (qsort, C++ std::sort) due to its minimal cache misses and O(n log n) average performance.",
    "markingScheme": [
      {
        "component": "Quick Sort Algorithm Concept & Partitioning Pseudo-code",
        "marks": 2
      },
      {
        "component": "Average-Case Mathematical Derivation (O(n log n))",
        "marks": 2
      },
      {
        "component": "Worst-Case Degeneration Conditions & O(n^2) Derivation",
        "marks": 2
      },
      {
        "component": "Randomized Pivot & Median-of-Three Mitigation Techniques",
        "marks": 1
      }
    ],
    "examTip": "State the worst-case recurrence explicitly: T(n) = T(n-1) + O(n). Mention Randomized Quick Sort as the universal industrial fix to eliminate worst-case triggers."
  },
  {
    "id": "daa-q6",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Heap Sort is an in-place, non-recursive O(n log n) sorting algorithm based on the Binary Heap data structure—a complete binary tree satisfying the Heap Property (in a Max-Heap, parent node >= child nodes).",
    "sections": [
      {
        "heading": "1. Max-Heapify and Heap Sort Procedures",
        "points": [
          "<b>Array Representation:</b> Root is at index 0 (or 1). For node at index i: Left Child = <code>2i + 1</code>, Right Child = <code>2i + 2</code>, Parent = <code>floor((i - 1) / 2)</code>.",
          "<b>MAX-HEAPIFY(A, i, heap_size):</b> Fixes a single heap property violation at root i assuming subtrees are already max-heaps. Sifts the element downward by swapping with the larger child. Time: <code>O(log n)</code>.",
          "<b>HEAP-SORT(A):</b>",
          "1. BUILD-MAX-HEAP(A).",
          "2. For i = n - 1 down to 1: Swap root A[0] (maximum element) with A[i]. Reduce heap_size by 1. Run MAX-HEAPIFY(A, 0, heap_size)."
        ]
      },
      {
        "heading": "2. Proof that BUILD-MAX-HEAP Runs in O(n) Time",
        "points": [
          "A naive analysis suggests n calls to MAX-HEAPIFY gives O(n log n). However, tighter analysis proves linear O(n) time:",
          "• In a heap of size n, the number of nodes at height h is at most <code>ceil(n / 2^{h+1})</code>.",
          "• The height of the tree is <code>floor(log_2 n)</code>. The cost to heapify a node at height h is O(h).",
          "• Total cost: <code>T(n) = ∑_{h=0}^{floor(log n)} ceil(n / 2^{h+1}) · O(h) = O(n · ∑_{h=0}^∞ (h / 2^h))</code>.",
          "• The infinite geometric series <code>∑_{h=0}^∞ (h / 2^h) = (1/2) / (1 - 1/2)^2 = 2</code> (a constant!).",
          "• Therefore, <code>T(n) = O(n · 2) = O(n)</code>. Build-Heap runs in strictly linear time."
        ]
      }
    ],
    "conclusion": "Heap Sort combines the O(n log n) guaranteed worst-case efficiency of Merge Sort with the O(1) auxiliary space efficiency of Quick Sort, making it ideal for real-time and embedded systems.",
    "markingScheme": [
      {
        "component": "Binary Heap Structure & Max-Heap Property Definition",
        "marks": 1.5
      },
      {
        "component": "Max-Heapify Algorithm & Heap Sort Step-by-Step Procedure",
        "marks": 2
      },
      {
        "component": "Rigorous Mathematical Summation Proof that Build-Heap is O(n)",
        "marks": 2.5
      },
      {
        "component": "Time Complexity (O(n log n)) and In-Place Space (O(1)) Summary",
        "marks": 1
      }
    ],
    "examTip": "The summation proof sum(h / 2^h) = 2 is the most critical part of this question. Write out the geometric Taylor expansion sum to prove linear O(n) Build-Heap time."
  },
  {
    "id": "daa-q7",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Strassen’s Matrix Multiplication, introduced by Volker Strassen in 1969, is a divide-and-conquer algorithm that multiplies two n × n matrices in O(n^2.807) time, breaking the classical O(n^3) barrier by reducing scalar multiplications from 8 to 7.",
    "sections": [
      {
        "heading": "1. Standard Divide-and-Conquer vs Strassen’s Innovation",
        "points": [
          "Let A and B be partitioned into four (n/2) × (n/2) submatrices:",
          "<code>C = A · B => [C11 C12; C21 C22] = [A11 A12; A21 A22] · [B11 B12; B21 B22]</code>",
          "Standard multiplication requires 8 matrix products: C11 = A11 B11 + A12 B21, etc. Recurrence: <code>T(n) = 8 T(n/2) + O(n^2) => T(n) = O(n^{log_2 8}) = O(n^3)</code>.",
          "Strassen devised 7 ingenious products (P1 through P7) using additions and subtractions of submatrices."
        ]
      },
      {
        "heading": "2. The Seven Strassen Products (P1 to P7)",
        "points": [
          "• <code>P1 = A11 · (B12 - B22)</code>",
          "• <code>P2 = (A11 + A12) · B22</code>",
          "• <code>P3 = (A21 + A22) · B11</code>",
          "• <code>P4 = A22 · (B21 - B11)</code>",
          "• <code>P5 = (A11 + A22) · (B11 + B22)</code>",
          "• <code>P6 = (A12 - A22) · (B21 + B22)</code>",
          "• <code>P7 = (A11 - A21) · (B11 + B12)</code>",
          "Reconstructing Output Matrix C:",
          "• <code>C11 = P5 + P4 - P2 + P6</code>",
          "• <code>C12 = P1 + P2</code>",
          "• <code>C21 = P3 + P4</code>",
          "• <code>C22 = P5 + P1 - P3 - P7</code>"
        ]
      },
      {
        "heading": "3. Recurrence & Asymptotic Time Complexity Derivation",
        "points": [
          "Since Strassen performs 7 multiplications of size n/2 and 18 matrix additions of size n/2:",
          "<code>T(n) = 7 T(n/2) + Θ(n^2)</code>",
          "Applying Master Theorem (a = 7, b = 2, f(n) = n^2):",
          "• Watershed: <code>n^{log_2 7} ≈ n^{2.8074}</code>.",
          "• Since 2 < 2.8074, Case 1 applies: <code>T(n) = Θ(n^{log_2 7}) ≈ Θ(n^{2.81})</code>."
        ]
      }
    ],
    "conclusion": "By trading costly multiplications for cheaper additions, Strassen demonstrated for the first time that matrix multiplication is sub-cubic, inspiring modern fast tensor algorithms.",
    "markingScheme": [
      {
        "component": "Standard Matrix Multiplication Complexity & Limitation (8 Multiplies)",
        "marks": 1.5
      },
      {
        "component": "The 7 Strassen Multiplication Formulations (P1 to P7)",
        "marks": 2.5
      },
      {
        "component": "Reconstruction Equations for C11, C12, C21, C22",
        "marks": 1.5
      },
      {
        "component": "Recurrence Relation (T(n) = 7T(n/2) + O(n^2)) & Time Complexity Proof",
        "marks": 1.5
      }
    ],
    "examTip": "Write down all 7 products P1 to P7 and the reconstruction formulas for C11 to C22. Calculate log2(7) ≈ 2.807 to show the exact asymptotic speedup over O(n^3)."
  }
];
