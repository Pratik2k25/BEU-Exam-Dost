// BEU Model Solutions - DBMS Unit 6
export const unit6Solutions = [
  {
    "id": "dbms-q15",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Distributed Database System (DDBMS) is a collection of multiple logically interrelated databases distributed over a computer network, managed by a centralized or federated Distributed DBMS that makes distribution transparent to users.",
    "sections": [
      {
        "heading": "1. Data Fragmentation Techniques",
        "points": [
          "Fragmentation partitions a relation R into smaller sub-relations (fragments) distributed across network sites:",
          "• <b>Horizontal Fragmentation:</b> Splits relation by rows based on selection predicates: <code>R_i = σ_{p_i}(R)</code>. <i>Example:</i> Patna branch stores only customers where Branch = 'Patna'. Reconstructed via UNION: <code>R = R1 ∪ R2 ∪ ... ∪ Rk</code>.",
          "• <b>Vertical Fragmentation:</b> Splits relation by columns based on projection: <code>R_i = π_{attrs_i}(R)</code>. Every fragment MUST include the Primary Key to permit lossless reconstruction via Natural Join: <code>R = R1 ⨝ R2 ⨝ ... ⨝ Rk</code>.",
          "• <b>Hybrid (Mixed) Fragmentation:</b> Combination of horizontal and vertical fragmentation."
        ]
      },
      {
        "heading": "2. Rules for Correct Fragmentation",
        "points": [
          "1. <b>Completeness:</b> Every data item in R must appear in at least one fragment.",
          "2. <b>Reconstruction:</b> The original relation R must be reconstructible using relational algebra operators (UNION for horizontal, JOIN for vertical).",
          "3. <b>Disjointness:</b> If an item is in fragment R_i, it must not be in any other fragment R_j (except primary key in vertical fragmentation)."
        ]
      },
      {
        "heading": "3. Data Replication & Distributed Query Processing",
        "points": [
          "<b>Replication:</b> Storing copies of fragments at multiple sites improves read availability and performance, but introduces update synchronization overhead. Managed as Full Replication or Partial Replication.",
          "<b>Distributed Query Processing:</b> Queries must minimize costly network transmission delays. Techniques like Semijoin (⋉) reduce the size of intermediate relations shipped over the network."
        ]
      }
    ],
    "conclusion": "Distributed databases provide high scalability and geographic fault tolerance, relying on fragmentation and replication to balance local autonomy against global query efficiency.",
    "markingScheme": [
      {
        "component": "Distributed DBMS Definition & Transparency Objectives",
        "marks": 1.5
      },
      {
        "component": "Horizontal, Vertical & Hybrid Fragmentation with Algebraic Formulas",
        "marks": 2.5
      },
      {
        "component": "3 Correctness Rules of Fragmentation (Completeness, Reconstruction, Disjointness)",
        "marks": 1.5
      },
      {
        "component": "Data Replication & Distributed Query Processing (Semijoin Concept)",
        "marks": 1.5
      }
    ],
    "examTip": "Always mention the three formal correctness rules for fragmentation: Completeness, Reconstruction, and Disjointness. Explain that vertical fragments must retain the primary key."
  },
  {
    "id": "dbms-q16",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Data Warehousing and Data Mining represent complementary analytical technologies in modern business intelligence: warehouses integrate and structure historical data, while mining extracts hidden patterns, correlations, and predictive insights.",
    "table": {
      "title": "Data Warehousing vs Data Mining",
      "headers": [
        "Comparison Criterion",
        "Data Warehousing (OLAP)",
        "Data Mining (KDD)",
        "Operational Database (OLTP)"
      ],
      "rows": [
        [
          "Primary Objective",
          "Store, consolidate, and report historical multidimensional data",
          "Discover hidden patterns, trends, and predictive models",
          "Manage day-to-day transaction processing"
        ],
        [
          "Data Characteristics",
          "Subject-oriented, integrated, time-variant, non-volatile",
          "Derived patterns, clusters, association rules",
          "Current, up-to-date, volatile, normalized"
        ],
        [
          "Underlying Technology",
          "Relational OLAP (ROLAP), Multidimensional OLAP (MOLAP)",
          "Machine learning, statistical algorithms, neural nets",
          "Relational DBMS with ACID transactions"
        ],
        [
          "Query Type",
          "Complex aggregation queries (SUM, AVG, GROUP BY over millions of rows)",
          "Pattern mining algorithms (Apriori, K-Means, Decision Trees)",
          "Simple read/write transactions (INSERT, UPDATE)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Multidimensional Data Schemas",
        "points": [
          "<b>Fact Table:</b> Central table containing quantitative numerical measurements (metrics/facts like SalesRevenue, QuantitySold) and foreign keys referencing dimension tables.",
          "<b>Dimension Tables:</b> Surrounding tables containing descriptive context attributes (e.g., Time, StoreLocation, Product, Customer).",
          "• <b>Star Schema:</b> A central Fact table connected directly to completely de-normalized Dimension tables. Resembles a star. Fast query performance with minimal joins; simple query generation.",
          "• <b>Snowflake Schema:</b> A variant of the star schema where dimension tables are normalized into multiple related sub-tables (e.g., Product -> Subcategory -> Category). Reduces data redundancy and disk storage, but requires more table joins during query execution."
        ]
      }
    ],
    "conclusion": "Data warehouses provide the cleansed, unified multidimensional foundation from which advanced data mining algorithms extract predictive intelligence for strategic decision-making.",
    "markingScheme": [
      {
        "component": "Data Warehousing Concepts & 4 Characteristics (Inmon Definition)",
        "marks": 1.5
      },
      {
        "component": "Data Warehousing vs Data Mining Comprehensive Comparison Table",
        "marks": 2
      },
      {
        "component": "Star Schema Architecture (Central Fact Table + Denormalized Dimensions)",
        "marks": 2
      },
      {
        "component": "Snowflake Schema Architecture & Comparison with Star Schema",
        "marks": 1.5
      }
    ],
    "examTip": "Draw simple block diagrams comparing the Star Schema (Fact table surrounded by single-level dimensions) and Snowflake Schema (Fact table surrounded by normalized multi-level dimensions)."
  }
];
