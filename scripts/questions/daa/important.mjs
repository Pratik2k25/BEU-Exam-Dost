const importantRecords = [
  ['daa-q1', 1, 'Define asymptotic notations Big-O, Big-Omega, and Big-Theta formally with mathematical limits, definitions, and graphical curves.', 'asymptotic notations'],
  ['daa-q2', 1, 'State Master Theorem for divide-and-conquer recurrences T(n) = a T(n/b) + f(n). Solve: 1) T(n) = 2T(n/2) + n, 2) T(n) = 4T(n/2) + n^2, 3) T(n) = 3T(n/4) + n log n.', 'master theorem'],
  ['daa-q3', 1, 'Solve the recurrence relation T(n) = 2T(n/2) + cn using the Recursion Tree method and verify your solution using mathematical induction.', 'recursion tree method'],
  ['daa-q4', 2, 'Explain Merge Sort algorithm with pseudo-code. Trace Merge Sort for the array [38, 27, 43, 3, 9, 82, 10] and derive its worst-case recurrence and time complexity.', 'merge sort'],
  ['daa-q5', 2, 'Explain Quick Sort algorithm with Lomuto or Hoare partitioning. Derive its average-case time complexity O(n log n) and explain when worst-case O(n^2) occurs.', 'quick sort'],
  ['daa-q6', 2, 'Explain Heap Sort algorithm. Describe Build-Max-Heap and Max-Heapify procedures with an example array and prove that Build-Heap runs in O(n) time.', 'heap sort'],
  ['daa-q7', 2, 'Explain Strassen’s Matrix Multiplication algorithm. How does it reduce the number of scalar multiplications from 8 to 7? Derive its time complexity.', 'strassen matrix multiplication'],
  ['daa-q8', 3, 'Explain Kruskal’s algorithm to find Minimum Spanning Tree (MST) using Disjoint Set Union (DSU) data structure with a worked graph example.', 'kruskal mst and dsu'],
  ['daa-q9', 3, 'Explain Prim’s algorithm for finding the Minimum Spanning Tree of a weighted graph. Compare Prim’s and Kruskal’s algorithms in terms of time complexity.', 'prim mst algorithm'],
  ['daa-q10', 3, 'Solve the Fractional Knapsack problem using Greedy Strategy. Given weights [10, 20, 30] and values [60, 100, 120] for capacity W = 50, compute the optimal item fractions and maximum profit.', 'fractional knapsack'],
  ['daa-q11', 3, 'Explain Huffman Coding algorithm for data compression. Given symbol frequencies a:45, b:13, c:12, d:16, e:9, f:5, construct the Huffman tree and assign prefix binary codes.', 'huffman coding'],
  ['daa-q12', 4, 'Explain the 0/1 Knapsack problem using Dynamic Programming. Formulate the recurrence relation and construct the DP table for weights [2, 3, 4, 5], values [3, 4, 5, 6], and capacity W = 5.', '0/1 knapsack dynamic programming'],
  ['daa-q13', 4, 'Solve Matrix Chain Multiplication using Dynamic Programming. Given matrix dimensions <5, 10, 3, 12, 5, 50>, compute the minimum scalar multiplication table m[i, j] and optimal parenthesization.', 'matrix chain multiplication'],
  ['daa-q14', 4, 'Explain the Longest Common Subsequence (LCS) algorithm using Dynamic Programming. Find the LCS of strings X = "ABCBDAB" and Y = "BDCABA" with the complete DP matrix and backtrack path.', 'longest common subsequence'],
  ['daa-q15', 4, 'Explain Dijkstra’s Single-Source Shortest Path algorithm. Trace it on a weighted directed graph and explain why it fails when edges have negative weights.', 'dijkstra shortest path'],
  ['daa-q16', 5, 'Explain Breadth-First Search (BFS) and Depth-First Search (DFS) graph traversals with algorithms, queue/stack representations, and time complexities.', 'bfs and dfs graph traversals'],
  ['daa-q17', 5, 'Explain the Floyd–Warshall algorithm for All-Pairs Shortest Path problem. Give the dynamic programming formulation and trace it on a 4-vertex directed graph.', 'floyd warshall algorithm'],
  ['daa-q18', 5, 'Solve the 4-Queens or 8-Queens problem using Backtracking. Draw the state-space tree and explain the bounding function used to prune illegal positions.', 'n-queens backtracking'],
  ['daa-q19', 6, 'Define Class P, Class NP, NP-Hard, and NP-Complete formally. Draw a Venn diagram illustrating their relationship under the assumption P != NP.', 'complexity classes p and np'],
  ['daa-q20', 6, 'Explain the concept of Polynomial-Time Reduction. Show how problem A reduces to problem B (A <=p B) and discuss its role in proving NP-Completeness.', 'polynomial time reduction'],
  ['daa-q21', 6, 'State Cook–Levin Theorem. Explain why Boolean Satisfiability (SAT) is NP-Complete and how it serves as the foundational problem for proving NP-completeness.', 'cook levin theorem and sat']
];

export const daaImportantQuestions = importantRecords.map(([id, unit, question, topic]) => ({
  id,
  canonicalId: id,
  kind: 'important',
  subject: 'daa',
  unit,
  question,
  marks: 7,
  topics: [topic],
  solutionRef: id
}));
