const importantRecords = [
  ['dbms-q1', 1, 'Explain the Three-Schema Architecture of DBMS with a neat diagram. Differentiate between Logical Data Independence and Physical Data Independence.', 'three-schema architecture'],
  ['dbms-q2', 1, 'Construct an Entity-Relationship (ER) diagram for a University / Hospital Management System. Identify entities, relationships, primary keys, and cardinality ratios.', 'er modeling and diagram'],
  ['dbms-q3', 2, 'Explain fundamental Relational Algebra operations (Select, Project, Union, Set Difference, Cartesian Product, Rename) and derived operations (Natural Join, Division) with examples.', 'relational algebra operations'],
  ['dbms-q4', 2, 'Explain Functional Dependencies and Armstrong’s Axioms. Given relation R(A, B, C, D, E) and F = {A->BC, CD->E, B->D, E->A}, find all candidate keys.', 'functional dependencies and candidate keys'],
  ['dbms-q5', 2, 'Explain 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF) with insertion, deletion, and update anomalies. Normalize a sample relation to BCNF.', 'normalization and normal forms'],
  ['dbms-q6', 2, 'Define Lossless-Join Decomposition and Dependency Preservation. Explain the testing algorithm to verify if a decomposition of R into R1 and R2 is lossless.', 'decomposition properties'],
  ['dbms-q7', 3, 'Explain the B+ Tree index structure. Describe the search, insertion, and node splitting procedures in a B+ tree of order p.', 'b+ tree indexing'],
  ['dbms-q8', 3, 'Compare Indexing and Hashing techniques. Explain Extendible Hashing with global depth, local depth, directory expansion, and bucket splitting.', 'extendible hashing'],
  ['dbms-q9', 4, 'Explain ACID properties of database transactions with bank transfer examples. How does the DBMS transaction manager guarantee each property?', 'acid properties'],
  ['dbms-q10', 4, 'What is Conflict Serializability? Explain how a precedence (serialization) graph is constructed and used to test if a concurrent schedule is conflict serializable.', 'conflict serializability and precedence graph'],
  ['dbms-q11', 4, 'Explain Two-Phase Locking (2PL) protocol. Differentiate between Basic 2PL, Strict 2PL, and Rigorous 2PL. How does 2PL ensure serializability?', 'two-phase locking protocol'],
  ['dbms-q12', 4, 'Explain Log-Based Database Recovery techniques: Deferred Database Modification and Immediate Database Modification using Checkpoints.', 'log-based recovery'],
  ['dbms-q13', 5, 'Compare Discretionary Access Control (DAC) using SQL GRANT/REVOKE, Mandatory Access Control (MAC), and Role-Based Access Control (RBAC).', 'database access control'],
  ['dbms-q14', 5, 'Explain SQL Injection attacks with an example vulnerable web query. Discuss counter-measures including prepared statements and parameterized inputs.', 'sql injection and security'],
  ['dbms-q15', 6, 'Explain Distributed Database Systems. Discuss horizontal, vertical, and hybrid fragmentation, data replication, and distributed query processing.', 'distributed databases and fragmentation'],
  ['dbms-q16', 6, 'Differentiate between Data Warehousing and Data Mining. Explain multidimensional data schemas: Star schema and Snowflake schema.', 'data warehousing and schemas']
];

export const dbmsImportantQuestions = importantRecords.map(([id, unit, question, topic]) => ({
  id,
  canonicalId: id,
  kind: 'important',
  subject: 'dbms',
  unit,
  question,
  marks: 7,
  topics: [topic],
  solutionRef: id
}));
