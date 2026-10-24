// BEU Model Solutions - DBMS Unit 4
export const unit4Solutions = [
  {
    "id": "dbms-q9",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Database Transaction is a logical unit of database processing that includes one or more database access operations. To ensure database integrity, the DBMS transaction manager guarantees four fundamental properties known as the ACID properties.",
    "table": {
      "title": "ACID Properties and DBMS Implementation Modules",
      "headers": [
        "ACID Property",
        "Formal Definition",
        "Threat / Failure Prevented",
        "Responsible DBMS Subsystem"
      ],
      "rows": [
        [
          "Atomicity (All or Nothing)",
          "Either all operations execute to completion, or none do",
          "System crashes or aborts leaving partial updates",
          "Recovery Manager (Undo Log, Rollback)"
        ],
        [
          "Consistency (Correct State)",
          "Execution transforms database from one valid state to another",
          "Violation of schema constraints, balance anomalies",
          "Integrity Constraints & Application Logic"
        ],
        [
          "Isolation (Independence)",
          "Concurrent transactions execute as if running sequentially in isolation",
          "Dirty reads, unrepeatable reads, lost updates",
          "Concurrency Control Manager (Locks, 2PL, MVCC)"
        ],
        [
          "Durability (Permanence)",
          "Once committed, state changes survive any subsequent crash",
          "Loss of committed transactions upon hardware failure",
          "Recovery Manager (Redo Log, Write-Ahead Logging WAL)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Concrete Bank Transfer Example",
        "points": [
          "Transferring ₹5,000 from Account A (initial ₹20,000) to Account B (initial ₹10,000):",
          "<code>T: Read(A); A <- A - 5000; Write(A); [CRASH POINT]; Read(B); B <- B + 5000; Write(B); Commit;</code>",
          "• <b>Atomicity:</b> If a system crash occurs at [CRASH POINT], the Recovery Manager uses log records to rollback A back to ₹20,000. It prevents ₹5,000 from vanishing.",
          "• <b>Consistency:</b> Total money across accounts before transfer is 20k + 10k = 30k; after transfer, 15k + 15k = 30k. Conservation of money invariant is preserved.",
          "• <b>Isolation:</b> If another transaction T2 checks Account A while T is running, it must not read intermediate uncommitted balances (e.g., reading A after debit but before credit).",
          "• <b>Durability:</b> Once Commit is issued, Write-Ahead Logging (WAL) ensures the updates are flushed to non-volatile disk. Even if power cuts 1 ms later, A = 15k and B = 15k are guaranteed on reboot."
        ]
      }
    ],
    "conclusion": "The ACID properties provide the formal contract underpinning mission-critical relational database systems, maintaining unwavering data reliability across concurrency and crashes.",
    "markingScheme": [
      {
        "component": "Transaction Definition & ACID Properties Concept",
        "marks": 1
      },
      {
        "component": "Detailed Analysis of Atomicity, Consistency, Isolation, Durability",
        "marks": 3
      },
      {
        "component": "Concrete Bank Transfer Example Tracing All Four Properties",
        "marks": 2
      },
      {
        "component": "DBMS Subsystem Responsibilities (Recovery, Concurrency Manager, WAL)",
        "marks": 1
      }
    ],
    "examTip": "Use the classic bank transfer example (Account A to B). Show the exact crash point between debit and credit to explain how Atomicity and Durability operate."
  },
  {
    "id": "dbms-q10",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Conflict Serializability is a property of concurrent transaction schedules. A schedule is conflict serializable if it is conflict equivalent to some serial schedule—meaning it can be transformed into a serial schedule by swapping non-conflicting adjacent operations.",
    "sections": [
      {
        "heading": "1. Conflicting Operations Criterion",
        "points": [
          "Two operations I_i and I_j in a schedule are in conflict if and only if they satisfy all three conditions:",
          "1. They belong to different transactions (T_i ≠ T_j).",
          "2. They access the exact same data item Q.",
          "3. At least one of the operations is a Write operation (Write(Q)).",
          "<b>The Three Conflicting Pairs:</b> (1) Read(Q) - Write(Q), (2) Write(Q) - Read(Q), (3) Write(Q) - Write(Q)."
        ]
      },
      {
        "heading": "2. Precedence (Serialization) Graph Construction Algorithm",
        "points": [
          "A Precedence Graph is a directed graph <code>G = (V, E)</code> constructed as follows:",
          "• <b>Vertices (V):</b> A node for each active transaction T_i in the schedule.",
          "• <b>Directed Edges (E):</b> Draw a directed edge <code>T_i -> T_j</code> if an operation of T_i precedes and conflicts with an operation of T_j.",
          "<b>Conflict Serializability Theorem:</b> A schedule S is conflict serializable if and only if its precedence graph G contains NO DIRECTED CYCLES.",
          "If the precedence graph is acyclic, topological sorting of G gives the equivalent serial schedule order."
        ]
      },
      {
        "heading": "3. Worked Example",
        "points": [
          "Consider schedule S: <code>r1(X); r2(X); w1(X); r2(Y); w2(Y); r1(Y); w1(Y);</code>",
          "• r2(X) precedes w1(X) on item X -> draw edge <b>T2 -> T1</b>.",
          "• w2(Y) precedes r1(Y) and w1(Y) on item Y -> draw edge <b>T2 -> T1</b>.",
          "Precedence graph has edges { T2 -> T1 } with no cycles. S is conflict serializable with equivalent serial schedule <code>T2 -> T1</code>."
        ]
      }
    ],
    "conclusion": "Precedence graph cycle detection provides a mathematically rigorous testing algorithm for database schedulers to guarantee serializable transaction isolation without data anomalies.",
    "markingScheme": [
      {
        "component": "Conflict Serializability Formal Definition & 3 Conflict Conditions",
        "marks": 2
      },
      {
        "component": "Precedence Graph Construction Algorithm Rules",
        "marks": 2
      },
      {
        "component": "Acyclicity Theorem & Topological Sort Equivalence",
        "marks": 1.5
      },
      {
        "component": "Worked Schedule Trace with Graph & Serial Order",
        "marks": 1.5
      }
    ],
    "examTip": "State the three conditions for conflicting operations explicitly. Emphasize that \"Schedule is conflict serializable <=> Precedence graph is acyclic.\""
  },
  {
    "id": "dbms-q11",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Two-Phase Locking (2PL) protocol is a concurrency control protocol that guarantees conflict serializability of concurrent schedules through a disciplined two-stage lock acquisition and release mechanism.",
    "table": {
      "title": "Two-Phase Locking Protocol Variants",
      "headers": [
        "2PL Variant",
        "Growing Phase Rule",
        "Shrinking Phase / Lock Release Rule",
        "Serializability Guarantee",
        "Cascading Rollback Risk"
      ],
      "rows": [
        [
          "Basic 2PL",
          "Acquires locks; no locks released",
          "Releases locks; no new locks acquired",
          "Guarantees Conflict Serializability",
          "Vulnerable to cascading aborts"
        ],
        [
          "Strict 2PL",
          "Acquires Shared and Exclusive locks",
          "Holds all EXCLUSIVE (X) locks until transaction commits or aborts",
          "Guarantees Conflict Serializability",
          "Eliminates cascading aborts (Strict)"
        ],
        [
          "Rigorous 2PL",
          "Acquires Shared and Exclusive locks",
          "Holds ALL locks (Shared & Exclusive) until commit or abort",
          "Guarantees Conflict Serializability",
          "Eliminates cascading aborts; simpler serialization"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Fundamental Phases of 2PL",
        "points": [
          "• <b>Growing (Expanding) Phase:</b> The transaction may acquire new locks (Shared or Exclusive) as needed, but cannot release any lock.",
          "• <b>Lock Point:</b> The instant when the transaction acquires its final lock (maximum lock holding state).",
          "• <b>Shrinking (Contracting) Phase:</b> The transaction may release locks, but cannot acquire any new lock.",
          "<b>Proof of Serializability:</b> Ordering transactions by their Lock Points produces an equivalent serial schedule order, proving that 2PL guarantees conflict serializability."
        ]
      },
      {
        "heading": "2. Deadlock Vulnerability in 2PL",
        "points": [
          "While 2PL prevents conflict serialization anomalies, it does NOT prevent deadlocks.",
          "<i>Example:</i> T1 holds Lock(A) and waits for Lock(B); T2 holds Lock(B) and waits for Lock(A).",
          "Must be paired with deadlock prevention (Wait-Die, Wound-Wait) or deadlock detection (Wait-For Graph cycle detection)."
        ]
      }
    ],
    "conclusion": "Strict and Rigorous 2PL represent the predominant locking mechanisms in commercial DBMS engines, eliminating cascading aborts while enforcing mathematical serializability.",
    "markingScheme": [
      {
        "component": "Two-Phase Locking Concept, Growing Phase & Shrinking Phase",
        "marks": 2
      },
      {
        "component": "Proof / Justification of Conflict Serializability via Lock Points",
        "marks": 1.5
      },
      {
        "component": "Comparison of Basic 2PL, Strict 2PL, and Rigorous 2PL",
        "marks": 2.5
      },
      {
        "component": "Deadlock Vulnerability & Mitigation Techniques",
        "marks": 1
      }
    ],
    "examTip": "Draw a graph of \"Number of Locks Held vs Time\" showing the Growing phase rising to the Lock Point and Shrinking phase falling. Note that 2PL does not prevent deadlocks."
  },
  {
    "id": "dbms-q12",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Log-Based Recovery guarantees transaction Atomicity and Durability by recording all state modifications in an append-only log on stable storage prior to writing updates to the database disk, adhering to the Write-Ahead Logging (WAL) protocol.",
    "table": {
      "title": "Deferred vs Immediate Database Modification",
      "headers": [
        "Architectural Dimension",
        "Deferred Database Modification",
        "Immediate Database Modification"
      ],
      "rows": [
        [
          "Disk Write Timing",
          "Deferred until transaction issues Commit",
          "Immediate: can write to disk while transaction is still active"
        ],
        [
          "Log Records Generated",
          "<T, start>, <T, X, V_new>, <T, commit>",
          "<T, start>, <T, X, V_old, V_new>, <T, commit>"
        ],
        [
          "Crash Recovery Action",
          "Requires REDO only; NEVER requires UNDO",
          "Requires both UNDO (for uncommitted) and REDO (for committed)"
        ],
        [
          "Buffer Memory Pressure",
          "High: all dirty pages must remain buffered until commit",
          "Low: buffer frames can be flushed to disk anytime (Steal policy)"
        ],
        [
          "Implementation Complexity",
          "Simpler recovery logic",
          "More complex; requires maintaining old undo values"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Checkpointing Mechanism",
        "points": [
          "Without checkpoints, the recovery manager must scan the entire log from the beginning of time upon reboot, creating unacceptable recovery latency.",
          "<b>Checkpoint Operation:</b>",
          "1. Temporarily pause transaction starts.",
          "2. Flush all modified buffer pages (dirty blocks) from main memory to disk.",
          "3. Output a <code><checkpoint L></code> record to stable log storage, where L lists all active uncommitted transactions.",
          "4. Flush the log to disk and resume normal processing.",
          "<b>Recovery Scope:</b> Upon crash, the recovery manager scans backward only to the most recent checkpoint. Transactions active at checkpoint or started after it are categorized into REDO and UNDO lists."
        ]
      }
    ],
    "conclusion": "Immediate database modification with checkpoints forms the core of modern WAL recovery architectures (such as ARIES), enabling fast restart and robust crash resiliency.",
    "markingScheme": [
      {
        "component": "Log-Based Recovery Purpose & Write-Ahead Logging (WAL) Rule",
        "marks": 1.5
      },
      {
        "component": "Deferred Database Modification Workflow (REDO-only)",
        "marks": 1.5
      },
      {
        "component": "Immediate Database Modification Workflow (UNDO and REDO)",
        "marks": 1.5
      },
      {
        "component": "Checkpointing Purpose, Protocol Steps & Fast Recovery Algorithm",
        "marks": 2.5
      }
    ],
    "examTip": "Emphasize that Deferred modification stores only new values in the log and never needs UNDO. Immediate modification stores both old and new values and needs both UNDO and REDO."
  }
];
