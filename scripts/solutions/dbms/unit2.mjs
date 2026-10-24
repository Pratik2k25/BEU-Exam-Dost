// BEU Model Solutions - DBMS Unit 2
export const unit2Solutions = [
  {
    "id": "dbms-q3",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Relational Algebra is a formal procedural query language where input relations are manipulated through mathematical operators to produce a new resulting relation without side effects.",
    "table": {
      "title": "Core Relational Algebra Operators",
      "headers": [
        "Operator Type",
        "Symbol & Syntax",
        "Mathematical Definition",
        "Practical SQL Equivalent"
      ],
      "rows": [
        [
          "Selection",
          "σ_p(R)",
          "Filters rows satisfying predicate p: {t | t ∈ R and p(t)}",
          "SELECT * FROM R WHERE p"
        ],
        [
          "Projection",
          "π_{A1...An}(R)",
          "Selects specified columns and removes duplicate rows",
          "SELECT DISTINCT A1, ... FROM R"
        ],
        [
          "Union",
          "R ∪ S",
          "Combines tuples from union-compatible relations R and S",
          "SELECT * FROM R UNION SELECT * FROM S"
        ],
        [
          "Set Difference",
          "R - S",
          "Tuples in R that are not present in S",
          "SELECT * FROM R EXCEPT SELECT * FROM S"
        ],
        [
          "Cartesian Product",
          "R × S",
          "All pair combinations: {t · q | t ∈ R and q ∈ S}",
          "SELECT * FROM R CROSS JOIN S"
        ],
        [
          "Rename",
          "ρ_S(A1...An)(R)",
          "Renames relation R to S and its attributes",
          "SELECT ... AS ..."
        ],
        [
          "Natural Join (Derived)",
          "R ⨝ S",
          "Equi-join on all common attributes followed by projection",
          "SELECT * FROM R NATURAL JOIN S"
        ],
        [
          "Division (Derived)",
          "R ÷ S",
          "Finds tuples in R associated with ALL tuples in S",
          "Correlated subquery with NOT EXISTS"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Relational Division (R ÷ S) In-Depth",
        "points": [
          "Let relation R have attribute set A and S have attribute set B, where B ⊆ A. Let C = A - B.",
          "<code>R ÷ S = π_C(R) - π_C( (π_C(R) × S) - R )</code>",
          "<i>Classic Use Case:</i> \"Find all students who have enrolled in ALL courses taught by Professor Sharma.\""
        ]
      }
    ],
    "conclusion": "Relational algebra provides the theoretical foundation for database query processing, enabling query optimizers to transform declarative SQL into algebraically optimized physical execution plans.",
    "markingScheme": [
      {
        "component": "Definition & Procedural Nature of Relational Algebra",
        "marks": 1
      },
      {
        "component": "6 Fundamental Operators (Select, Project, Union, Diff, Product, Rename)",
        "marks": 3
      },
      {
        "component": "Derived Operators: Natural Join (⨝) & Division (÷) Formulas",
        "marks": 2
      },
      {
        "component": "Summary Table & SQL Correspondence",
        "marks": 1
      }
    ],
    "examTip": "State the formal definition of union compatibility (same degree and compatible domains) for Union and Set Difference. Write out the division operator formula explicitly."
  },
  {
    "id": "dbms-q4",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Functional Dependencies (FDs) are semantic integrity constraints governing relational schemas. An FD X -> Y specifies that if two tuples agree on attribute set X, they must also agree on attribute set Y. Armstrong’s Axioms form the complete and sound set of inference rules for deriving the closure of functional dependencies.",
    "sections": [
      {
        "heading": "1. Armstrong’s Primary Axioms & Derived Rules",
        "points": [
          "• <b>Axiom of Reflexivity:</b> If Y ⊆ X, then X -> Y (trivial FD).",
          "• <b>Axiom of Augmentation:</b> If X -> Y, then XZ -> YZ for any attribute set Z.",
          "• <b>Axiom of Transitivity:</b> If X -> Y and Y -> Z, then X -> Z.",
          "• <i>Derived Rule 1 (Union):</i> If X -> Y and X -> Z, then X -> YZ.",
          "• <i>Derived Rule 2 (Decomposition):</i> If X -> YZ, then X -> Y and X -> Z.",
          "• <i>Derived Rule 3 (Pseudotransitivity):</i> If X -> Y and WY -> Z, then WX -> Z."
        ]
      },
      {
        "heading": "2. Candidate Key Solution for R(A, B, C, D, E) with F = {A->BC, CD->E, B->D, E->A}",
        "points": [
          "Compute attribute closures to determine candidate keys:",
          "<b>Test Attribute A:</b>",
          "A+ = {A} -> using A->BC -> {A, B, C} -> using B->D -> {A, B, C, D} -> using CD->E -> {A, B, C, D, E}.",
          "Since A+ contains all attributes of R, <b>A is a Candidate Key</b>.",
          "<b>Find Other Candidate Keys by tracing LHS dependencies:</b>",
          "• Check dependency E -> A: Since A can be derived from E, compute E+:",
          "  E+ = {E} -> using E->A -> {E, A} -> using A->BC -> {E, A, B, C} -> using B->D -> {A, B, C, D, E}.",
          "  Since E+ contains all attributes of R and no subset does, <b>E is a Candidate Key</b>.",
          "• Check dependency CD -> E: Since E can be derived from CD, compute (CD)+:",
          "  (CD)+ = {C, D} -> using CD->E -> {C, D, E} -> using E->A -> {C, D, E, A} -> using A->BC -> {A, B, C, D, E}.",
          "  Check proper subsets: C+ = {C}; D+ = {D}. Neither is superkey. Thus, <b>CD is a Candidate Key</b>.",
          "• Check dependency B -> D: Substitute B for D in CD to test (BC)+:",
          "  (BC)+ = {B, C} -> using B->D -> {B, C, D} -> using CD->E -> {B, C, D, E} -> using E->A -> {A, B, C, D, E}.",
          "  Check proper subsets: B+ = {B, D}; C+ = {C}. Thus, <b>BC is a Candidate Key</b>.",
          "<b>Final Result:</b> The candidate keys of relation R are <code>{ A, E, CD, BC }</code>."
        ]
      }
    ],
    "conclusion": "Attribute closure computation derived from Armstrong’s axioms deterministically identifies all minimal superkeys, forming the indispensable prerequisite for relational schema normalization.",
    "markingScheme": [
      {
        "component": "Functional Dependency Formal Definition & Armstrong’s Axioms",
        "marks": 2
      },
      {
        "component": "Attribute Closure Computation Algorithm (X+)",
        "marks": 1
      },
      {
        "component": "Step-by-Step Derivation of All 4 Candidate Keys (A, E, CD, BC)",
        "marks": 3.5
      },
      {
        "component": "Final Summary of Candidate Keys",
        "marks": 0.5
      }
    ],
    "examTip": "Show the closure calculation for every single candidate key (A+, E+, (CD)+, (BC)+). Conclude with a clear list of all four candidate keys."
  },
  {
    "id": "dbms-q5",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Normalization is the systematic process of decomposing relational tables to eliminate data redundancy and prevent undesirable insertion, deletion, and update anomalies while preserving functional dependencies.",
    "table": {
      "title": "Hierarchical Normal Forms Comparison",
      "headers": [
        "Normal Form",
        "Core Requirement / Condition",
        "Eliminated Anomaly",
        "Allowed Functional Dependencies"
      ],
      "rows": [
        [
          "1NF (First Normal Form)",
          "All attribute values must be atomic (no multi-valued or composite attributes)",
          "Non-atomic collections, repeating groups",
          "Any valid functional dependencies"
        ],
        [
          "2NF (Second Normal Form)",
          "In 1NF and no Partial Dependency (no non-prime attribute depends on a proper subset of candidate key)",
          "Redundancy from composite keys",
          "Non-prime attributes must depend on the WHOLE candidate key"
        ],
        [
          "3NF (Third Normal Form)",
          "In 2NF and no Transitive Dependency (for every X -> A, X is superkey OR A is prime attribute)",
          "Transitive non-prime dependencies",
          "X is superkey OR A is prime"
        ],
        [
          "BCNF (Boyce-Codd NF)",
          "For every non-trivial functional dependency X -> A, X must be a SUPERKEY",
          "All redundancy based on functional dependencies",
          "STRICT: Every LHS determinant X must be a superkey"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Relational Update Anomalies",
        "points": [
          "• <b>Insertion Anomaly:</b> Cannot insert valid data about an entity without redundantly fabricating or inserting data about another unrelated entity (e.g., cannot add a new course until a student enrolls).",
          "• <b>Deletion Anomaly:</b> Deleting data about one entity inadvertently obliterates data about a completely different entity (e.g., dropping the last student in a course deletes all course details).",
          "• <b>Update (Modification) Anomaly:</b> Modifying a shared value requires updating multiple redundant rows; failure to update every row introduces data inconsistency."
        ]
      },
      {
        "heading": "2. Normalization Example to BCNF",
        "points": [
          "Consider relation <code>STUDENT_ADVISOR(StudentID, Subject, Advisor)</code> with FDs: <code>{ (StudentID, Subject) -> Advisor, Advisor -> Subject }</code>.",
          "Candidate keys: (StudentID, Subject) and (StudentID, Advisor).",
          "Check 3NF: For Advisor -> Subject, Subject is a prime attribute, so relation is in 3NF.",
          "Check BCNF: For Advisor -> Subject, Advisor is NOT a superkey. Violates BCNF!",
          "<b>BCNF Decomposition:</b> Split into: (1) <code>ADVISOR_SUBJECT(<u>Advisor</u>, Subject)</code> where Advisor is primary key, and (2) <code>STUDENT_ADVISOR_LINK(<u>StudentID</u>, <u>Advisor</u>)</code>. Both sub-relations are now in BCNF."
        ]
      }
    ],
    "conclusion": "Progressing from 1NF to BCNF systematically purges data anomalies, producing clean relational designs with minimal storage redundancy.",
    "markingScheme": [
      {
        "component": "Database Anomalies Explained (Insertion, Deletion, Update)",
        "marks": 1.5
      },
      {
        "component": "Definitions of 1NF, 2NF, 3NF, and BCNF",
        "marks": 2.5
      },
      {
        "component": "Comprehensive Comparison Table of Normal Forms",
        "marks": 1.5
      },
      {
        "component": "Step-by-Step BCNF Normalization Worked Example",
        "marks": 1.5
      }
    ],
    "examTip": "State the difference between 3NF and BCNF: in 3NF, the condition \"A is a prime attribute\" is allowed, but BCNF strictly forbids it—X must be a superkey."
  },
  {
    "id": "dbms-q6",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "When decomposing a relational schema R into sub-schemas {R1, R2, ..., Rk}, two critical formal properties must be evaluated: Lossless-Join Decomposition (non-negotiable correctness) and Dependency Preservation (performance optimization).",
    "sections": [
      {
        "heading": "1. Lossless-Join Decomposition (Non-Additive Join)",
        "points": [
          "<b>Definition:</b> A decomposition of relation R into R1 and R2 is lossless if applying a natural join to the projections reproduces the exact original relation without spurious or missing tuples: <code>R1 ⨝ R2 = R</code>.",
          "If R1 ⨝ R2 ⊃ R (strictly larger), the decomposition is lossy because false spurious tuples have been generated.",
          "<b>Formal Necessary and Sufficient Condition (for 2 relations):</b> Decomposition of R into R1 and R2 is lossless if and only if their common attribute set forms a superkey for at least one of the decomposed relations:",
          "<code>(R1 ∩ R2) -> R1  OR  (R1 ∩ R2) -> R2</code>"
        ]
      },
      {
        "heading": "2. Dependency Preservation",
        "points": [
          "<b>Definition:</b> A decomposition preserves dependencies if the union of functional dependencies enforceable within each individual decomposed relation logically implies all original dependencies: <code>(F1 ∪ F2)+ = F+</code>.",
          "Enables the DBMS to enforce all business constraints within single tables without performing costly cross-table joins on every INSERT or UPDATE."
        ]
      },
      {
        "heading": "3. Matrix Testing Algorithm for Lossless Join",
        "points": [
          "For arbitrary decomposition into k relations R1, ..., Rk:",
          "1. Initialize a k × n matrix where rows represent sub-relations and columns represent attributes.",
          "2. Populate cell (i, j) with <code>a_j</code> if attribute Aj ∈ Ri, otherwise with <code>b_{ij}</code>.",
          "3. For each FD X -> Y in F, if multiple rows match on X, equalize their Y values (preferring symbols a_j over b_{ij}).",
          "4. Repeat step 3 until no changes occur. If any complete row becomes <code>[a1, a2, ..., an]</code>, the decomposition is formally proven to be Lossless."
        ]
      }
    ],
    "conclusion": "Lossless join is mandatory to prevent data corruption, while dependency preservation ensures efficient transactional constraint enforcement; 3NF always guarantees both, whereas BCNF guarantees lossless join but may sacrifice dependency preservation.",
    "markingScheme": [
      {
        "component": "Definitions of Lossless Join & Dependency Preservation",
        "marks": 2
      },
      {
        "component": "Mathematical Equivalence Condition ((R1 ∩ R2) -> R1 or R2)",
        "marks": 2
      },
      {
        "component": "Tableau / Matrix Testing Algorithm for Arbitrary k Decompositions",
        "marks": 2
      },
      {
        "component": "3NF vs BCNF Trade-off Summary",
        "marks": 1
      }
    ],
    "examTip": "Write the theorem: (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2. Note that BCNF is always lossless but does not always preserve dependencies, whereas 3NF achieves both."
  }
];
