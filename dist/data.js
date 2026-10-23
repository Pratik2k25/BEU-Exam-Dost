// BEU Exam Dost — Official B.Tech CSE 4th Semester Syllabus & Verified PYQ Data Bank
export const branches=[
  "Computer Science & Engineering",
  "Computer Science & Engineering (AI)",
  "Computer Science & Engineering (Cyber Security)",
  "Computer Science & Engineering (IoT)",
  "Computer Science & Engineering(AI & ML)",
  "Computer Science & Engineering(Data Science)",
  "Computer Science & Engineering (Networks)",
  "Computer Science & Engg (IOT & Cyber Security including Block Chain Technology)"
];

// Bihar Engineering University Affiliated Government & Private Engineering Colleges
export const colleges=[
  "Shri Phanishwar Nath Renu Engineering College, Araria",
  "Government Engineering College, Arwal",
  "Government Engineering College, Aurangabad",
  "Government Engineering College, Banka",
  "Rashtrakavi Ramdhari Singh Dinkar College of Engineering, Begusarai",
  "Bhagalpur College of Engineering, Bhagalpur",
  "Government Engineering College, Bhojpur",
  "Government Engineering College, Buxar",
  "Darbhanga College of Engineering, Darbhanga",
  "Motihari College of Engineering, Motihari, East Champaran",
  "Gaya College of Engineering, Gaya",
  "Government Engineering College, Gopalganj",
  "Government Engineering College, Jamui",
  "Government Engineering College, Jehanabad",
  "Government Engineering College, Kaimur",
  "Katihar Engineering College, Katihar",
  "Government Engineering College, Khagaria",
  "Government Engineering College, Kishanganj",
  "Government Engineering College, Lakhisarai",
  "B. P. Mandal College of Engineering, Madhepura",
  "Government Engineering College, Madhubani",
  "Government Engineering College, Munger",
  "Muzaffarpur Institute of Technology, Muzaffarpur",
  "Nalanda College of Engineering, Chandi, Nalanda",
  "Government Engineering College, Nawada",
  "Bakhtiyarpur College of Engineering, Patna",
  "Purnea College of Engineering, Purnea",
  "Sershah College of Engineering, Sasaram",
  "Saharsa College of Engineering, Saharsa",
  "Government Engineering College, Samastipur",
  "Lok Nayak Jai Prakash Institute of Technology, Chapra, Saran",
  "Government Engineering College, Sheikhpura",
  "Government Engineering College, Sheohar",
  "Sitamarhi Institute of Technology, Sitamarhi",
  "Government Engineering College, Siwan",
  "Supaul College of Engineering, Supaul",
  "Government Engineering College, Vaishali",
  "Government Engineering College, West Champaran",
  "Central Institute of Petrochemicals Engineering & Technology (cipet), Bihta, Patna",
  "Rungta Institute of Technology and Management, Araria",
  "Prabhu Kailash Engineering College, Aurangabad",
  "Sityog Institute of Technology, Aurngabad",
  "Adwaita Mission Institute of Technology, Banka",
  "Buddha Institute of Technology, Gaya",
  "Millia Kishanganj College of Engineering & Technology, Kishanganj",
  "J. P College of Engineering,biharsharif, Nalanda",
  "Dr. Ashok Gagan College, Bihta, Patna",
  "Institute of Management and Planning & Advanced Computer Training, Patna",
  "Maulana Azad College of Engineering and Technology, Neora, Patna",
  "Mother’s Institute of Technology, Bihta, Patna",
  "Netaji Subhas Institute of Technology, Bihta, Patna",
  "R.p. Sharma Institute of Technology, Patna",
  "Millia Institute of Technology, Purnia",
  "Vidya Vihar Institute of Technology, Purnea",
  "Rajeev College of Professional Education, Sitamarhi",
  "Siwan College of Engineering and Management, Siwan",
  "Exalt College of Engineering & Technology, Vaishali",
  "Hi-tech Polytechnic College, Bettiah, West Champaran"
];

export const colors=['green','blue','purple','orange','teal','yellow'];

// Official B.Tech CSE Semester 4 Curriculum Breakdown (6 Core Subjects x 6 Units each)
const specifications=[
  [
    'cn','CN','Computer Networks','network',
    [
      ['Networking Fundamentals','OSI seven-layer model','TCP/IP protocol suite','Network topologies and architecture','Connection-oriented vs connectionless services'],
      ['Physical Layer','Analog & digital signals and data-rate limits','Transmission media & impairments','Multiplexing: FDM, TDM, WDM','Circuit, packet & virtual-circuit switching'],
      ['Data Link Layer','Framing and bit/byte stuffing','CRC numericals and Hamming code','Stop-and-Wait, Go-Back-N and Selective Repeat','Pure/Slotted ALOHA, CSMA/CD and CSMA/CA','Ethernet, MAC addressing and VLAN'],
      ['Network Layer','IPv4/IPv6 addressing and header formats','Subnetting numericals and CIDR','ARP, RARP, DHCP and ICMP protocols','Distance-vector and link-state routing (OSPF, BGP)'],
      ['Transport Layer','TCP vs UDP comparisons and header formats','TCP three-way handshake and connection teardown','Flow control, congestion control and QoS','Client-server model and socket communication'],
      ['Application Layer','DNS architecture and name resolution','HTTP and FTP protocols','SMTP, POP3, IMAP and email architecture','Network security fundamentals and firewalls']
    ]
  ],
  [
    'coa','COA','Computer Organization & Architecture','chip',
    [
      ['Computer Fundamentals','Functional units of computer','Instruction cycle and phase flowchart','Bus architecture and bus arbitration','Performance metrics and Amdahl’s law'],
      ['Data Representation','IEEE 754 floating-point standard','Signed binary number representations','Carry look-ahead adder design','Error detection and correction codes'],
      ['Computer Arithmetic','Booth’s multiplication algorithm for signed numbers','Restoring division algorithm','Non-restoring division algorithm','Floating-point arithmetic operations'],
      ['Processor Organization','Instruction formats and addressing modes','Hardwired control unit design','Microprogrammed control unit design','RISC vs CISC architecture comparison'],
      ['Memory & I/O Organization','Memory hierarchy and RAM/ROM organizations','Cache memory mapping (Direct, Associative, Set-Associative)','Cache replacement policies and write policies','Direct Memory Access (DMA) controller and transfer modes','Virtual memory, paging, and Translation Lookaside Buffer (TLB)'],
      ['Pipelining & Parallelism','Linear instruction pipelining','Pipeline hazards: Structural, Data, and Control/Branch hazards','Pipelining speedup, efficiency, and throughput calculations','Flynn’s classification of computer architectures']
    ]
  ],
  [
    'flat','FLAT','Formal Languages & Automata Theory','nodes',
    [
      ['Introduction & Grammars','Alphabets, strings, languages and concatenation','Grammar, production rules and derivations','Chomsky hierarchy: Type 0, Type 1, Type 2, Type 3'],
      ['Regular Languages & Finite Automata','DFA construction and state transition tables','NFA and ε-NFA concepts','NFA to DFA conversion using subset construction','Regular expressions and FA equivalence (Arden’s theorem)','DFA state minimization using partitioning','Pumping lemma for regular languages and non-regularity proofs','Closure properties of regular languages'],
      ['CFG & Pushdown Automata','Context-free grammar and language generation','Leftmost and rightmost derivations and parse trees','Ambiguity in CFG and disambiguation techniques','Chomsky Normal Form (CNF) conversion','Greibach Normal Form (GNF) conversion','Pushdown Automata (PDA): Final state vs empty stack','CFG and PDA equivalence','Pumping lemma for context-free languages'],
      ['Context-Sensitive Languages','Context-sensitive grammars (CSG)','Context-sensitive languages (CSL)','Linear Bounded Automata (LBA) and CSG equivalence'],
      ['Turing Machines','Standard Turing machine model and 7-tuple definition','Turing machine construction and state transition diagrams','Turing-recognizable vs Turing-decidable languages','Closure properties of decidable and recognizable languages','Variants of Turing machines (Multi-tape, Non-deterministic)','Unrestricted grammars and TM equivalence'],
      ['Undecidability','Church–Turing thesis','Universal Turing machine (UTM) architecture','Halting problem of Turing machines and proof of undecidability','Diagonalization and universal languages','Reductions between computational problems','Rice’s theorem and language properties']
    ]
  ],
  [
    'dbms','DBMS','Database Management Systems','database',
    [
      ['Database Architecture & Models','Three-tier DBMS architecture and data abstraction','Logical and physical data independence','Data Definition Language (DDL) and Data Manipulation Language (DML)','Entity-Relationship (ER) modeling and EER features','Integrity constraints, primary keys and foreign keys'],
      ['Relational Model & Database Design','Relational algebra: Selection, Projection, Joins, Division','Tuple and domain relational calculus','SQL DDL, DML, nested subqueries and joins','Functional dependencies and Armstrong’s axioms','Normalization: 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF)','Lossless join decomposition and dependency preservation','Query evaluation, equivalence and optimization algorithms'],
      ['Storage Strategies & Indexing','File organization and record blocking','Dense vs sparse indexing, primary vs secondary indexes','B-Tree and B+ Tree operations (search, insert, split)','Static and dynamic hashing techniques (Extendible hashing)'],
      ['Transaction Processing','Transactions and ACID properties','Concurrency control anomalies (Dirty read, Lost update, Unrepeatable read)','Conflict and view serializability and precedence graphs','Lock-based protocols and Two-Phase Locking (2PL)','Timestamp-based scheduling and deadlock handling','Database recovery techniques: Log-based recovery and checkpoints'],
      ['Database Security','Authentication vs authorization','Discretionary Access Control (DAC) using GRANT and REVOKE','Mandatory Access Control (MAC) and Role-Based Access Control (RBAC)','SQL injection vulnerabilities and prevention strategies'],
      ['Advanced Database Topics','Distributed database systems, fragmentation and replication','Object-oriented and object-relational databases','Data warehousing: ETL, Star schema and Snowflake schema','Data mining concepts: Association rules and clustering']
    ]
  ],
  [
    'daa','DAA','Design & Analysis of Algorithms','tree',
    [
      ['Algorithm Analysis','Characteristics of an algorithm and complexity measures','Best, average and worst-case analysis','Big-O, Big-Ω and Big-Θ asymptotic notations','Time-space trade-offs and recurrence relations','Substitution method for recurrences','Recursion tree method','Master theorem for divide-and-conquer recurrences'],
      ['Divide & Conquer and Heaps','Divide and conquer paradigm and master recurrence','Binary search and complexity analysis','Merge sort algorithm with dry run and recurrence derivation','Quick sort with Lomuto/Hoare partitioning and dry run','Linear-time selection algorithm','Strassen’s matrix multiplication algorithm','Min heap, max heap, build-heap procedure and Heap sort'],
      ['Greedy Paradigm & Minimum Spanning Trees','Greedy choice property and optimal substructure','Fractional knapsack problem using greedy strategy','Kruskal’s algorithm using Disjoint Set Union (DSU)','Prim’s algorithm for Minimum Spanning Trees','Job sequencing with deadlines algorithm','Huffman coding algorithm for data compression','Dijkstra’s algorithm for single-source shortest paths'],
      ['Dynamic Programming','Dynamic programming principles: Overlapping subproblems and optimal substructure','Dynamic programming vs divide-and-conquer','0/1 Knapsack problem using dynamic programming table','Matrix chain multiplication with recurrence formulation','Longest Common Subsequence (LCS) algorithm','Travelling Salesperson Problem (TSP) using dynamic programming','Bellman–Ford algorithm for shortest paths with negative weights'],
      ['Graph & Tree Algorithms','Graph representations: Adjacency matrix and adjacency list','Breadth-First Search (BFS) and Depth-First Search (DFS) traversals','Topological sorting on Directed Acyclic Graphs (DAG)','Floyd–Warshall all-pairs shortest path algorithm','Strongly connected components and Kosaraju’s algorithm','Backtracking: N-Queens problem and Subset Sum problem'],
      ['Complexity Classes','Tractable and intractable computational problems','Class P and Class NP definitions','NP-complete vs NP-hard classification','Cook–Levin theorem: Boolean Satisfiability (SAT)','Standard NP-complete problems (3-SAT, Vertex Cover, Clique)','Polynomial-time reductions','Approximation algorithms and randomized algorithms']
    ]
  ],
  [
    'etc','ETC','Effective Technical Communication','document',
    [
      ['Information Design & Development','Different types of technical engineering documents','Information Development Life Cycle (IDLC) stages','Organization structures of documents (Chronological, Spatial, Topical)','Factors affecting information and document design','Strategies for technical information organization','Information design for print media vs online media'],
      ['Technical Writing, Grammar & Editing','Technical writing process: Pre-writing, Drafting, Revising, Editing','Forms of discourse: Exposition, Argumentation, Description, Narration','Drafting, revising and collaborative writing workflows','Creating indexes and documentation glossaries','Technical writing style, objectivity, clarity and conciseness','Basic and advanced grammar in engineering reports','Editing strategies for technical style and readability','Usability testing, human factors and localization'],
      ['Self-development & Assessment','Self-assessment, self-awareness and emotional intelligence','Perceptions, attitudes, values and professional ethics','Personal goal setting (SMART goals) and career planning for engineers','Effective time management techniques (Eisenhower matrix, Pomodoro)','Note-taking systems (Cornell method) and rapid reading','Complex engineering problem solving and creativity'],
      ['Oral Communication & Presentation Skills','Principles of effective public speaking and overcoming stage anxiety','Group discussion (GD) dynamics, leadership roles and evaluation criteria','Technical oral presentations, slide design principles and presentation aids','Job interview techniques, behavioral questions and STAR method','Interpersonal communication and active listening skills'],
      ['Technical Writing Formats','Formal technical project report writing with standard sections','Project proposal drafting: Objectives, methodology, budget and timeline','Brochures, newsletters and technical documentation manuals','Technical articles and research paper abstracts','Official business letters and memoranda (Memos)','Minutes of meetings (MoM) and progress reports'],
      ['Ethics & Professional Culture','Engineering ethics and IEEE / ACM professional codes of conduct','Social and corporate office etiquette','Corporate email etiquette and communication protocol','Telephone and virtual video meeting etiquette','Role, social accountability and responsibilities of engineers','Corporate work culture, teamwork and professional integrity']
    ]
  ]
];

// Map subjects with priority units per syllabus analysis
const priorityUnits = {
  cn: [1, 3, 4, 5],
  coa: [1, 2, 3, 4, 5, 6],
  flat: [1, 2, 3, 5, 6],
  dbms: [1, 2, 3, 4],
  daa: [1, 2, 3, 4, 5],
  etc: [2, 4, 5, 6]
};

export const subjects=specifications.map(([id,short,name,icon,units],si)=>({
  id,
  short,
  name,
  icon,
  color:colors[si],
  units:units.map(([title,...ts],i)=>({
    id:i+1,
    title,
    color:colors[i],
    important:(priorityUnits[id]||[2,3]).includes(i+1),
    topics:ts.map((title,j)=>({
      id:`${id}-${i+1}-${j}`,
      title,
      important:j<3,
      subject:id,
      unit:i+1
    }))
  }))
}));

// Verified High-Yield 7-Mark Written Previous Year Question Bank (BEU 2022-2026)
const pyqData = {
  cn: [
    {
      id: 'cn-q1',
      unit: 1,
      question: 'Explain the OSI 7-layer reference model with a neat architecture diagram and state the core function and protocol of each layer.',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q2',
      unit: 1,
      question: 'Compare the OSI reference model with the TCP/IP protocol suite. Discuss the advantages, layer mappings, and practical limitations of each model.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'cn-q3',
      unit: 2,
      question: 'Explain Circuit Switching, Packet Switching (Datagram vs Virtual Circuit). Compare their transmission delay, routing overhead, and bandwidth utilization.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'cn-q4',
      unit: 2,
      question: 'State Nyquist’s bit rate theorem and Shannon’s channel capacity theorem. For a channel with 4 kHz bandwidth and SNR of 30 dB, calculate the maximum theoretical data rate.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'cn-q5',
      unit: 3,
      question: 'Explain Cyclic Redundancy Check (CRC) error detection. For data word 1010001101 and generator polynomial G(x) = x^5 + x^4 + x^2 + 1, find the transmitted codeword.',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q6',
      unit: 3,
      question: 'Differentiate between Stop-and-Wait, Go-Back-N, and Selective Repeat sliding window ARQ protocols with window size equations and channel utilization formulas.',
      years: [2023, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q7',
      unit: 3,
      question: 'Explain Pure ALOHA and Slotted ALOHA multiple access protocols. Derive the mathematical expressions for their maximum channel throughput and efficiency.',
      years: [2024, 2025],
      marks: 7
    },
    {
      id: 'cn-q8',
      unit: 3,
      question: 'Explain the working principle of CSMA/CD used in Ethernet and CSMA/CA used in wireless networks with backoff algorithms and collision handling.',
      years: [2024, 2026],
      marks: 7
    },
    {
      id: 'cn-q9',
      unit: 4,
      question: 'Explain the IPv4 datagram header format with a labelled diagram. Discuss the significance of TTL, Header Checksum, and Fragmentation fields (Flags and Offset).',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'cn-q10',
      unit: 4,
      question: 'An organization is allocated the block 192.168.10.0/24. Design 4 subnets with equal host capacity. Find the subnet mask, first host, last host, and broadcast address for each subnet.',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q11',
      unit: 4,
      question: 'Explain Distance Vector Routing and the Count-to-Infinity problem with an example network. How does Link-State Routing (OSPF) prevent this issue?',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q12',
      unit: 4,
      question: 'Explain the working of Address Resolution Protocol (ARP) and Dynamic Host Configuration Protocol (DHCP) with message packet sequence diagrams.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'cn-q13',
      unit: 5,
      question: 'Explain the TCP Three-Way Handshake mechanism for connection establishment and connection termination with sequence numbers and timing diagrams.',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q14',
      unit: 5,
      question: 'Explain TCP Congestion Control mechanisms: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery with cwnd graphs against transmission rounds.',
      years: [2023, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q15',
      unit: 5,
      question: 'Compare TCP and UDP protocols based on connection state, packet header overhead, reliability, flow control, and practical application scenarios.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'cn-q16',
      unit: 6,
      question: 'Explain the Domain Name System (DNS) architecture and hierarchical namespace. Differentiate between Recursive Resolution and Iterative Resolution with message flows.',
      years: [2024, 2025, 2026],
      marks: 7
    },
    {
      id: 'cn-q17',
      unit: 6,
      question: 'Explain the working of File Transfer Protocol (FTP). Why does FTP use two separate connections (Control Connection on port 21 and Data Connection on port 20)?',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'cn-q18',
      unit: 6,
      question: 'Explain the architecture and protocols used in Electronic Mail. Differentiate between SMTP (push protocol) and POP3/IMAP (retrieval protocols).',
      years: [2022, 2024],
      marks: 7
    }
  ],

  coa: [
    {
      id: 'coa-q1',
      unit: 1,
      question: 'Explain the basic Instruction Cycle with a detailed flowchart illustrating Fetch, Decode, Read Effective Address, and Execute phases.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q2',
      unit: 1,
      question: 'Explain different Addressing Modes (Immediate, Direct, Indirect, Register Indirect, Relative, Indexed) with diagrams and effective address equations.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q3',
      unit: 2,
      question: 'Design a 4-bit Carry Look-Ahead Adder (CLA). Derive Boolean expressions for carry generation (Gi) and carry propagation (Pi) and prove its speed advantage over ripple carry adders.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q4',
      unit: 2,
      question: 'Explain the IEEE 754 standard for single-precision (32-bit) and double-precision (64-bit) floating-point numbers with normalized mantissa and excess bias.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q5',
      unit: 3,
      question: 'Explain Booth’s Multiplication Algorithm for signed 2’s complement numbers with a hardware datapath diagram and flowchart. Multiply (-5) by (+3) showing all register transitions.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q6',
      unit: 3,
      question: 'Explain Restoring and Non-Restoring Division algorithms with hardware architecture, step-by-step register updates, and comparative analysis.',
      years: [2022, 2025],
      marks: 7
    },
    {
      id: 'coa-q7',
      unit: 4,
      question: 'Differentiate between Hardwired Control Unit and Microprogrammed Control Unit on the basis of speed, flexibility, control memory, and design complexity.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'coa-q8',
      unit: 4,
      question: 'Explain the internal organization of a Microprogrammed Control Unit with Microinstruction Address Sequencer, Control Address Register (CAR), and Control Store.',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'coa-q9',
      unit: 4,
      question: 'Compare RISC and CISC processor architectures with respect to instruction formats, addressing modes, register files, and execution cycles.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'coa-q10',
      unit: 5,
      question: 'Explain Cache Memory mapping techniques: Direct Mapping, Fully Associative Mapping, and Set-Associative Mapping with address breakdown formulas and diagrams.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q11',
      unit: 5,
      question: 'Explain the working of Direct Memory Access (DMA) controller with a neat block diagram. Differentiate between Burst Transfer and Cycle Stealing modes.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q12',
      unit: 5,
      question: 'Explain Virtual Memory organization using Paging and Translation Lookaside Buffer (TLB). Trace the step-by-step translation of a logical address to a physical address.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q13',
      unit: 6,
      question: 'Explain a 4-stage or 5-stage instruction pipeline. Derive formulas for Speedup, Efficiency, and Throughput of a k-stage pipeline executing n instructions.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q14',
      unit: 6,
      question: 'Explain the three major pipeline hazards: Structural hazards, Data hazards (RAW, WAR, WAW), and Control/Branch hazards. Discuss hardware forwarding and delayed branching.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'coa-q15',
      unit: 6,
      question: 'Explain Flynn’s classification of computer architectures (SISD, SIMD, MISD, MIMD) with structural schematics and real-world processor examples.',
      years: [2022, 2024],
      marks: 7
    }
  ],

  flat: [
    {
      id: 'flat-q1',
      unit: 1,
      question: 'Explain the Chomsky Hierarchy of grammars with language types (Type 0, 1, 2, 3), production rule formats, recognizing automata, and practical examples.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q2',
      unit: 1,
      question: 'Define alphabet, string, language, grammar, and derivations. Differentiate between Leftmost and Rightmost derivations with parse tree illustrations.',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'flat-q3',
      unit: 2,
      question: 'Convert an NFA with ε-transitions into an equivalent DFA using subset construction. Show the transition table and resulting state diagram.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q4',
      unit: 2,
      question: 'State and prove the Pumping Lemma for Regular Languages. Prove that L = {0^n 1^n | n >= 1} is not a regular language.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q5',
      unit: 2,
      question: 'Explain the DFA State Minimization procedure using the Myhill-Nerode table-filling partitioning algorithm with a worked example.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q6',
      unit: 2,
      question: 'State Arden’s Theorem. Explain how to find the regular expression of a finite automaton using Arden’s theorem with a step-by-step example.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'flat-q7',
      unit: 3,
      question: 'What is an ambiguous grammar? Prove that the grammar E -> E + E | E * E | id is ambiguous by constructing two distinct leftmost derivations and parse trees for id + id * id.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q8',
      unit: 3,
      question: 'Explain the step-by-step conversion of a Context-Free Grammar (CFG) into Chomsky Normal Form (CNF) with an illustrative example.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q9',
      unit: 3,
      question: 'Construct a Pushdown Automaton (PDA) for the language L = {w c w^R | w in {a, b}*}. Explain transitions for acceptance by empty stack and final state.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q10',
      unit: 3,
      question: 'State the Pumping Lemma for Context-Free Languages (CFL). Prove that L = {a^n b^n c^n | n >= 1} is not context-free.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q11',
      unit: 4,
      question: 'Explain Context-Sensitive Grammars (CSG) and Context-Sensitive Languages (CSL). How does CSG differ from CFG in production structure?',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'flat-q12',
      unit: 4,
      question: 'Explain the model and working of Linear Bounded Automata (LBA) and discuss how LBA accepts context-sensitive languages.',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'flat-q13',
      unit: 5,
      question: 'Design a standard Turing Machine (TM) to recognize the language L = {0^n 1^n | n >= 1}. Draw its state transition diagram and write instantaneous descriptions for input 0011.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q14',
      unit: 5,
      question: 'Differentiate between Recursive Languages (Turing-decidable) and Recursively Enumerable Languages (Turing-recognizable). Discuss their closure properties.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q15',
      unit: 5,
      question: 'Explain variants of Turing Machines (Multi-tape TM, Non-deterministic TM) and prove their computational equivalence to standard single-tape deterministic TM.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'flat-q16',
      unit: 6,
      question: 'State and prove the Halting Problem of Turing Machines. Prove that the halting problem is undecidable using a proof by contradiction.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'flat-q17',
      unit: 6,
      question: 'Explain the concept of the Universal Turing Machine (UTM). How does it encode machine states and tape symbols to simulate an arbitrary TM?',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'flat-q18',
      unit: 6,
      question: 'State Rice’s Theorem. Explain its significance and demonstrate how it is used to prove that non-trivial semantic properties of RE languages are undecidable.',
      years: [2023, 2025],
      marks: 7
    }
  ],

  dbms: [
    {
      id: 'dbms-q1',
      unit: 1,
      question: 'Explain the Three-Schema Architecture of DBMS with a neat diagram. Differentiate between Logical Data Independence and Physical Data Independence.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q2',
      unit: 1,
      question: 'Construct an Entity-Relationship (ER) diagram for a University / Hospital Management System. Identify entities, relationships, primary keys, and cardinality ratios.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q3',
      unit: 2,
      question: 'Explain fundamental Relational Algebra operations (Select, Project, Union, Set Difference, Cartesian Product, Rename) and derived operations (Natural Join, Division) with examples.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q4',
      unit: 2,
      question: 'Explain Functional Dependencies and Armstrong’s Axioms. Given relation R(A, B, C, D, E) and F = {A->BC, CD->E, B->D, E->A}, find all candidate keys.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q5',
      unit: 2,
      question: 'Explain 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF) with insertion, deletion, and update anomalies. Normalize a sample relation to BCNF.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q6',
      unit: 2,
      question: 'Define Lossless-Join Decomposition and Dependency Preservation. Explain the testing algorithm to verify if a decomposition of R into R1 and R2 is lossless.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q7',
      unit: 3,
      question: 'Explain the B+ Tree index structure. Describe the search, insertion, and node splitting procedures in a B+ tree of order p.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q8',
      unit: 3,
      question: 'Compare Indexing and Hashing techniques. Explain Extendible Hashing with global depth, local depth, directory expansion, and bucket splitting.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'dbms-q9',
      unit: 4,
      question: 'Explain ACID properties of database transactions with bank transfer examples. How does the DBMS transaction manager guarantee each property?',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q10',
      unit: 4,
      question: 'What is Conflict Serializability? Explain how a precedence (serialization) graph is constructed and used to test if a concurrent schedule is conflict serializable.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q11',
      unit: 4,
      question: 'Explain Two-Phase Locking (2PL) protocol. Differentiate between Basic 2PL, Strict 2PL, and Rigorous 2PL. How does 2PL ensure serializability?',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q12',
      unit: 4,
      question: 'Explain Log-Based Database Recovery techniques: Deferred Database Modification and Immediate Database Modification using Checkpoints.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q13',
      unit: 5,
      question: 'Compare Discretionary Access Control (DAC) using SQL GRANT/REVOKE, Mandatory Access Control (MAC), and Role-Based Access Control (RBAC).',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'dbms-q14',
      unit: 5,
      question: 'Explain SQL Injection attacks with an example vulnerable web query. Discuss counter-measures including prepared statements and parameterized inputs.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'dbms-q15',
      unit: 6,
      question: 'Explain Distributed Database Systems. Discuss horizontal, vertical, and hybrid fragmentation, data replication, and distributed query processing.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'dbms-q16',
      unit: 6,
      question: 'Differentiate between Data Warehousing and Data Mining. Explain multidimensional data schemas: Star schema and Snowflake schema.',
      years: [2023, 2025],
      marks: 7
    }
  ],

  daa: [
    {
      id: 'daa-q1',
      unit: 1,
      question: 'Define asymptotic notations Big-O, Big-Omega, and Big-Theta formally with mathematical limits, definitions, and graphical curves.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q2',
      unit: 1,
      question: 'State Master Theorem for divide-and-conquer recurrences T(n) = a T(n/b) + f(n). Solve: 1) T(n) = 2T(n/2) + n, 2) T(n) = 4T(n/2) + n^2, 3) T(n) = 3T(n/4) + n log n.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q3',
      unit: 1,
      question: 'Solve the recurrence relation T(n) = 2T(n/2) + cn using the Recursion Tree method and verify your solution using mathematical induction.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'daa-q4',
      unit: 2,
      question: 'Explain Merge Sort algorithm with pseudo-code. Trace Merge Sort for the array [38, 27, 43, 3, 9, 82, 10] and derive its worst-case recurrence and time complexity.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q5',
      unit: 2,
      question: 'Explain Quick Sort algorithm with Lomuto or Hoare partitioning. Derive its average-case time complexity O(n log n) and explain when worst-case O(n^2) occurs.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q6',
      unit: 2,
      question: 'Explain Heap Sort algorithm. Describe Build-Max-Heap and Max-Heapify procedures with an example array and prove that Build-Heap runs in O(n) time.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q7',
      unit: 2,
      question: 'Explain Strassen’s Matrix Multiplication algorithm. How does it reduce the number of scalar multiplications from 8 to 7? Derive its time complexity.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'daa-q8',
      unit: 3,
      question: 'Explain Kruskal’s algorithm to find Minimum Spanning Tree (MST) using Disjoint Set Union (DSU) data structure with a worked graph example.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q9',
      unit: 3,
      question: 'Explain Prim’s algorithm for finding the Minimum Spanning Tree of a weighted graph. Compare Prim’s and Kruskal’s algorithms in terms of time complexity.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q10',
      unit: 3,
      question: 'Solve the Fractional Knapsack problem using Greedy Strategy. Given weights [10, 20, 30] and values [60, 100, 120] for capacity W = 50, compute the optimal item fractions and maximum profit.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q11',
      unit: 3,
      question: 'Explain Huffman Coding algorithm for data compression. Given symbol frequencies a:45, b:13, c:12, d:16, e:9, f:5, construct the Huffman tree and assign prefix binary codes.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q12',
      unit: 4,
      question: 'Explain the 0/1 Knapsack problem using Dynamic Programming. Formulate the recurrence relation and construct the DP table for weights [2, 3, 4, 5], values [3, 4, 5, 6], and capacity W = 5.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q13',
      unit: 4,
      question: 'Solve Matrix Chain Multiplication using Dynamic Programming. Given matrix dimensions <5, 10, 3, 12, 5, 50>, compute the minimum scalar multiplication table m[i, j] and optimal parenthesization.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q14',
      unit: 4,
      question: 'Explain the Longest Common Subsequence (LCS) algorithm using Dynamic Programming. Find the LCS of strings X = "ABCBDAB" and Y = "BDCABA" with the complete DP matrix and backtrack path.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q15',
      unit: 4,
      question: 'Explain Dijkstra’s Single-Source Shortest Path algorithm. Trace it on a weighted directed graph and explain why it fails when edges have negative weights.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q16',
      unit: 5,
      question: 'Explain Breadth-First Search (BFS) and Depth-First Search (DFS) graph traversals with algorithms, queue/stack representations, and time complexities.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q17',
      unit: 5,
      question: 'Explain the Floyd–Warshall algorithm for All-Pairs Shortest Path problem. Give the dynamic programming formulation and trace it on a 4-vertex directed graph.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q18',
      unit: 5,
      question: 'Solve the 4-Queens or 8-Queens problem using Backtracking. Draw the state-space tree and explain the bounding function used to prune illegal positions.',
      years: [2022, 2025],
      marks: 7
    },
    {
      id: 'daa-q19',
      unit: 6,
      question: 'Define Class P, Class NP, NP-Hard, and NP-Complete formally. Draw a Venn diagram illustrating their relationship under the assumption P != NP.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'daa-q20',
      unit: 6,
      question: 'Explain the concept of Polynomial-Time Reduction. Show how problem A reduces to problem B (A <=p B) and discuss its role in proving NP-Completeness.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'daa-q21',
      unit: 6,
      question: 'State Cook–Levin Theorem. Explain why Boolean Satisfiability (SAT) is NP-Complete and how it serves as the foundational problem for proving NP-completeness.',
      years: [2022, 2024, 2025],
      marks: 7
    }
  ],

  etc: [
    {
      id: 'etc-q1',
      unit: 1,
      question: 'Explain the Information Development Life Cycle (IDLC) with its distinct phases from requirement analysis and audience profiling to design and maintenance.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q2',
      unit: 1,
      question: 'Compare technical information design for print media and online digital media. Discuss differences in layout, typography, navigation, and readability.',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'etc-q3',
      unit: 2,
      question: 'Explain the four major stages of the Technical Writing Process (Pre-writing, Drafting, Revising, Editing) in detail.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q4',
      unit: 2,
      question: 'Discuss the core characteristics of effective technical writing: Clarity, Conciseness, Accuracy, Objectivity, and Audience Adaptation.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q5',
      unit: 2,
      question: 'What is Collaborative Writing? Discuss its advantages, team roles, version control workflows, and common challenges in software engineering teams.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q6',
      unit: 3,
      question: 'Explain the role of self-assessment, self-awareness, and emotional intelligence in career planning and professional growth for engineers.',
      years: [2022, 2024],
      marks: 7
    },
    {
      id: 'etc-q7',
      unit: 3,
      question: 'Discuss effective Time Management strategies for engineering students, including the Eisenhower Matrix, Pomodoro Technique, and prioritization frameworks.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'etc-q8',
      unit: 4,
      question: 'Explain the 7 C’s of Effective Communication (Completeness, Conciseness, Consideration, Concreteness, Courtesy, Clearness, Correctness).',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q9',
      unit: 4,
      question: 'Explain how to deliver an impactful technical oral presentation. Discuss audience analysis, slide design guidelines, body language, and managing Q&A sessions.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q10',
      unit: 4,
      question: 'Discuss the dynamics of Group Discussions (GD) as a recruitment tool. What traits do evaluators look for, and what common mistakes must candidates avoid?',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q11',
      unit: 4,
      question: 'Explain the STAR (Situation, Task, Action, Result) method for answering behavioral questions in technical job interviews with a concrete example.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'etc-q12',
      unit: 5,
      question: 'Draft a comprehensive outline of a Formal Technical Report on a completed software engineering project with standard sections, formatting, and references.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q13',
      unit: 5,
      question: 'Draft a Project Proposal requesting financial grant and college resources for an AI-based campus waste management system with objective, budget, and timeline.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q14',
      unit: 5,
      question: 'Explain the format and importance of Minutes of a Meeting (MoM). Draft sample meeting minutes for a college technical symposium planning committee.',
      years: [2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q15',
      unit: 5,
      question: 'Differentiate between a Business Letter, an Office Memorandum (Memo), and an Email in terms of tone, structure, and communication scope.',
      years: [2022, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q16',
      unit: 6,
      question: 'Explain Engineering Ethics and the fundamental canons of professional conduct specified by IEEE and ACM codes of ethics.',
      years: [2022, 2023, 2024, 2025],
      marks: 7
    },
    {
      id: 'etc-q17',
      unit: 6,
      question: 'Discuss the ethical responsibilities of software engineers regarding user data privacy, software safety, and intellectual property rights.',
      years: [2023, 2025],
      marks: 7
    },
    {
      id: 'etc-q18',
      unit: 6,
      question: 'Explain professional email etiquette in corporate settings. List 8 essential dos and don’ts when communicating with clients or senior management.',
      years: [2022, 2024, 2025],
      marks: 7
    }
  ]
};

const pyqMcqData = {
  "cn": {
    "2024": [
      [
        "Which are transmission media? (1) Twisted pair (2) Microwave/satellite signals (3) Repeaters (4) Analog transmission (5) Fiber optics",
        [
          "1 and 5",
          "1 and 2",
          "1, 2 and 5",
          "1, 2, 3 and 5"
        ],
        2,
        "Twisted pair and fiber optics are guided transmission media; microwave/satellite signals are unguided media. Repeaters are hardware devices and analog transmission is a signaling mode.",
        2
      ],
      [
        "Which error recovery technique is possible on a simplex data link?",
        [
          "Backward error correction",
          "Hamming codes",
          "Automatic Repeat Request",
          "Downward error correction"
        ],
        1,
        "On a simplex link, transmission is unidirectional, so no reverse acknowledgment path exists. Forward Error Correction (such as Hamming codes) must be used.",
        3
      ],
      [
        "Which device links systems using separate protocols?",
        [
          "Repeater",
          "Gateway",
          "Bridge",
          "Hub"
        ],
        1,
        "A Gateway translates between different protocol architectures across the upper layers of the network hierarchy.",
        1
      ],
      [
        "Which cannot serve as a medium for conventional 802.3 Ethernet?",
        [
          "Thin coaxial",
          "Twisted pair",
          "Microwave link",
          "Fiber optic cable"
        ],
        2,
        "Standard IEEE 802.3 wireline Ethernet specifications define coaxial cable, twisted pair, and fiber optics. Microwave links are wireless (802.11 / 802.16).",
        2
      ],
      [
        "Which is a syntactically valid IPv4 address?",
        [
          "128.64.0.0",
          "127.201.3.1.52",
          "01.200.128.123",
          "300.142.210.64"
        ],
        0,
        "An IPv4 address contains 4 decimal octets (0-255). 128.64.0.0 is a syntactically valid Class B network address.",
        4
      ],
      [
        "Why is the IPv4 header checksum recalculated at each router?",
        [
          "TTL, Options, Identification, Offset",
          "TTL, Options, Datagram Length, Offset",
          "TTL, Options, Data, Offset",
          "TTL, Header Length, Offset, ToS"
        ],
        0,
        "At each intermediate router hop, the TTL field is decremented and header fields (such as fragmentation flags/offsets or options) may change, requiring checksum recomputation.",
        4
      ],
      [
        "Which statement about ICMP is valid?",
        [
          "ICMP reports all transmission errors",
          "ICMP redirect can report a better route",
          "ICMP informs routers of every incorrect path",
          "Destination unreachable only applies to locating routers"
        ],
        1,
        "ICMP Redirect (Type 5) informs a local source host that an alternative first-hop router provides a shorter or more optimal path.",
        4
      ],
      [
        "TCP/IP layer corresponding to OSI Transport?",
        [
          "Host-to-host",
          "Internet",
          "Application",
          "Network Access"
        ],
        0,
        "In the RFC 1122 TCP/IP architecture, the Host-to-Host layer provides transport services corresponding to the OSI Transport layer.",
        1
      ],
      [
        "Which protocol commonly uses port 110?",
        [
          "SMTP",
          "FTP",
          "POP",
          "POP3"
        ],
        3,
        "Post Office Protocol version 3 (POP3) uses standard TCP port 110 for downloading email from mail servers.",
        6
      ],
      [
        "When a mail server sends mail to another mail server, it acts as:",
        [
          "SMTP",
          "SMTP client",
          "SMTP server",
          "POP"
        ],
        1,
        "In mail relaying, the sending Mail Transfer Agent (MTA) initiates a TCP connection to port 25 of the receiver, functioning as an SMTP client.",
        6
      ]
    ],
    "2025": [
      [
        "Which OSI layer handles data representation and encryption?",
        [
          "Session",
          "Data Link",
          "Presentation",
          "Application"
        ],
        2,
        "Layer 6 (Presentation layer) handles syntax, formatting, character translation, data compression, and encryption/decryption.",
        1
      ],
      [
        "Which topology offers the highest reliability?",
        [
          "Mesh",
          "Star",
          "Ring",
          "Bus"
        ],
        0,
        "A full mesh topology offers dedicated redundant point-to-point links between every pair of nodes, ensuring zero single points of failure.",
        1
      ],
      [
        "In Stop-and-Wait ARQ, when is a frame retransmitted?",
        [
          "ACK received",
          "Window full",
          "Timeout occurs",
          "Buffer empty"
        ],
        2,
        "In Stop-and-Wait ARQ, the sender starts a timer upon transmission; if a timeout occurs before receiving an ACK, the frame is retransmitted.",
        3
      ],
      [
        "Which access method listens before transmitting?",
        [
          "Slotted ALOHA",
          "CSMA/CA",
          "Token passing",
          "ALOHA"
        ],
        1,
        "CSMA (Carrier Sense Multiple Access) protocols, including CSMA/CA and CSMA/CD, sense the transmission medium before transmitting.",
        3
      ],
      [
        "ARP is used for:",
        [
          "MAC to IP",
          "Port to process",
          "IP to MAC",
          "Host to domain"
        ],
        2,
        "ARP (Address Resolution Protocol) dynamically translates a known 32-bit logical IPv4 address into a 48-bit physical MAC address.",
        4
      ],
      [
        "Which protocol is used for remote login?",
        [
          "SMTP",
          "HTTP",
          "FTP",
          "TELNET"
        ],
        3,
        "TELNET (and modern SSH) provides bidirectional interactive terminal access for remote system login.",
        6
      ],
      [
        "IPv6 address length is:",
        [
          "32 bits",
          "64 bits",
          "128 bits",
          "256 bits"
        ],
        2,
        "An IPv6 address is 128 bits long (represented as 8 groups of 4 hexadecimal digits separated by colons).",
        4
      ],
      [
        "A firewall is used for:",
        [
          "Error correction",
          "Network security",
          "Data encryption",
          "Traffic shaping"
        ],
        1,
        "A firewall is a network security device that monitors and filters incoming and outgoing traffic based on predetermined access policies.",
        1
      ],
      [
        "The full form of OSI is:",
        [
          "Open Service Internet",
          "Open Service Implementation",
          "Operating System Interface",
          "Open Systems Interconnection"
        ],
        3,
        "OSI stands for Open Systems Interconnection, the standard 7-layer reference model developed by the ISO in 1984.",
        1
      ],
      [
        "Which is not a networking device?",
        [
          "Hub",
          "Bridge",
          "Switch",
          "None of these"
        ],
        3,
        "Hub, Bridge, and Switch are all standard networking devices operating at physical and data link layers; hence \"None of these\" is correct.",
        1
      ]
    ],
    "2026": [
      [
        "A fully connected mesh has 8 nodes. How many dedicated links are needed?",
        [
          "16",
          "28",
          "32",
          "56"
        ],
        1,
        "In a full mesh topology with n nodes, the number of dedicated physical links is n(n - 1) / 2. For 8 nodes: (8 × 7) / 2 = 28 links.",
        1
      ],
      [
        "Wavelength Division Multiplexing is primarily associated with:",
        [
          "Copper cables",
          "Radio communication only",
          "Optical fiber communication",
          "Coaxial cable only"
        ],
        2,
        "WDM is an optical multiplexing technology that combines multiple data signals on different laser wavelengths (colors of light) over a single optical fiber.",
        2
      ],
      [
        "A code has minimum Hamming distance 5. Maximum errors detectable?",
        [
          "2",
          "3",
          "5",
          "4"
        ],
        3,
        "To detect d errors, minimum Hamming distance must satisfy d_min ≥ d + 1. Hence d = d_min - 1 = 5 - 1 = 4 errors detectable.",
        3
      ],
      [
        "Frame 5 times out without an ACK. What should the sender do?",
        [
          "Retransmit frame 5",
          "Move to frame 6",
          "Discard all previous frames",
          "Restart the connection"
        ],
        0,
        "Under ARQ protocols, when an unacknowledged frame timer expires (timeout), the sender must retransmit the lost or unacknowledged frame (frame 5).",
        3
      ],
      [
        "Which statement correctly distinguishes IPv6 from IPv4?",
        [
          "IPv6 32-bit; IPv4 128-bit",
          "Both 32-bit",
          "IPv6 128-bit; IPv4 32-bit",
          "Both 128-bit"
        ],
        2,
        "IPv6 uses 128-bit (16-byte) hexadecimal addresses, whereas conventional IPv4 uses 32-bit (4-byte) dotted-decimal addresses.",
        4
      ],
      [
        "Host A knows B's IP but not B's MAC on the same LAN. What happens first?",
        [
          "A broadcasts an ARP request",
          "A unicasts the IP packet directly",
          "B broadcasts its MAC automatically",
          "Router assigns a new IP"
        ],
        0,
        "Address Resolution Protocol (ARP) sends a broadcast frame (FF:FF:FF:FF:FF:FF) on the local link querying which node owns IP B.",
        4
      ],
      [
        "Which protocol provides reliable, ordered delivery and retransmission?",
        [
          "UDP",
          "TCP",
          "ARP",
          "DHCP"
        ],
        1,
        "TCP provides connection-oriented, reliable, and byte-stream delivery with sequence numbering, flow control, and automatic retransmissions.",
        5
      ],
      [
        "Which application-layer service resolves www.example.com to an IP?",
        [
          "FTP",
          "DNS",
          "TELNET",
          "SNMP"
        ],
        1,
        "DNS (Domain Name System) translates human-readable domain names into machine-readable IP addresses.",
        6
      ],
      [
        "SYN → SYN+ACK → ACK is used for:",
        [
          "IP fragmentation",
          "TCP connection termination",
          "UDP connection establishment",
          "TCP connection establishment"
        ],
        3,
        "The three-way handshake (SYN, SYN-ACK, ACK) establishes synchronized sequence number states between TCP client and server.",
        5
      ],
      [
        "A browser sends a request and receives a response. Which model is illustrated?",
        [
          "Request-response",
          "Token passing",
          "Broadcast",
          "Error correction"
        ],
        0,
        "HTTP and web browser communication follow the standard client-server request-response messaging model.",
        6
      ]
    ]
  },
  "coa": {
    "2024": [
      [
        "In two’s complement representation, the 8-bit representation of -18 is:",
        [
          "11101110",
          "11101101",
          "10010010",
          "00010010"
        ],
        0,
        "+18 in 8 bits is 00010010. One’s complement = 11101101. Adding 1 yields two’s complement: 11101110.",
        1
      ],
      [
        "Which addressing mode has zero memory access for fetching the operand?",
        [
          "Direct addressing",
          "Register addressing",
          "Indirect addressing",
          "Indexed addressing"
        ],
        1,
        "In register addressing mode, the operand resides in an internal CPU register, eliminating external memory bus access.",
        2
      ],
      [
        "A memory system has 16 MB capacity with 32-bit words. How many address lines are required for word addressing?",
        [
          "20",
          "22",
          "24",
          "26"
        ],
        1,
        "16 MB = 16 × 2^20 bytes = 2^24 bytes. Since each word is 32 bits (4 bytes), total words = 2^24 / 4 = 2^22 words. Thus 22 address lines are needed.",
        4
      ],
      [
        "The Translation Lookaside Buffer (TLB) is primarily implemented as:",
        [
          "DRAM",
          "Associative Content-Addressable Memory (CAM)",
          "Magnetic tape",
          "Flash ROM"
        ],
        1,
        "TLB is a fast associative cache (Content-Addressable Memory) that searches virtual-to-physical page translations simultaneously in hardware.",
        4
      ],
      [
        "During DMA transfer, cycle stealing mode means the DMA controller:",
        [
          "Steals all CPU clock cycles until transfer completes",
          "Takes control of the system bus for one memory cycle at a time",
          "Bypasses the system bus entirely",
          "Uses secondary storage as RAM"
        ],
        1,
        "Cycle stealing grants the DMA controller access to the system bus for one memory cycle at a time between CPU machine cycles.",
        5
      ],
      [
        "Which branch prediction technique updates prediction state dynamically based on execution history?",
        [
          "Static branch prediction",
          "Dynamic 2-bit saturating counter",
          "Compiler unrolling",
          "Delayed branch slot"
        ],
        1,
        "Dynamic branch prediction uses hardware tables (such as 2-bit saturating counters) to adaptively learn branch behavior during runtime.",
        6
      ],
      [
        "The Memory Address Register (MAR) holds:",
        [
          "Data read from memory",
          "The address in memory being read from or written to",
          "Current micro-instruction",
          "Interrupt vector address"
        ],
        1,
        "MAR holds the physical address on the address bus pointing to the memory location for read/write operations.",
        2
      ],
      [
        "Which mapping technique allows a memory block to be placed in any cache line?",
        [
          "Direct mapping",
          "Fully associative mapping",
          "2-way set associative mapping",
          "Sector mapping"
        ],
        1,
        "In fully associative cache mapping, any main memory block can be loaded into any available cache block line.",
        4
      ],
      [
        "Horizontal microcode differs from vertical microcode because horizontal microcode:",
        [
          "Uses encoded control bits",
          "Has wider control words with unencoded, highly parallel control signals",
          "Executes slower",
          "Requires micro-instruction decoding logic"
        ],
        1,
        "Horizontal microinstructions allocate dedicated unencoded bits to individual control lines, maximizing parallelism at the expense of control memory width.",
        3
      ],
      [
        "Memory interleaving is primarily used to:",
        [
          "Increase memory capacity",
          "Overcome memory cycle time bottleneck and increase bandwidth",
          "Reduce cache miss rate",
          "Protect against power failures"
        ],
        1,
        "Memory interleaving distributes contiguous memory addresses across independent memory banks, allowing simultaneous pipeline memory access.",
        4
      ]
    ],
    "2025": [
      [
        "Which addressing mode is suited for accessing consecutive array elements?",
        [
          "Immediate",
          "Indexed",
          "Implied",
          "Relative"
        ],
        1,
        "Indexed addressing mode adds an index register offset to a base address, allowing efficient stepping through consecutive array elements.",
        2
      ],
      [
        "In Booth’s multiplication algorithm, what operation is performed when the multiplier bit pair (Qn, Qn+1) is (1, 0)?",
        [
          "Add multiplicand",
          "Subtract multiplicand",
          "Shift only",
          "Clear accumulator"
        ],
        1,
        "Booth’s algorithm performs subtraction of the multiplicand (A = A - M) on transition 10, addition (A = A + M) on 01, and arithmetic right shift on 00 and 11.",
        1
      ],
      [
        "A computer has a 32-bit address bus and byte-addressable memory. The maximum addressable memory size is:",
        [
          "1 GB",
          "2 GB",
          "4 GB",
          "8 GB"
        ],
        2,
        "With 32 address lines, 2^32 distinct locations can be addressed. For byte-addressable memory: 2^32 bytes = 4 GB.",
        4
      ],
      [
        "In a direct-mapped cache of size 64 KB with 16-byte block size and 32-bit address, how many bits are used for the Cache Index?",
        [
          "10 bits",
          "12 bits",
          "14 bits",
          "16 bits"
        ],
        1,
        "Number of cache lines = 64 KB / 16 B = 65,536 / 16 = 4,096 = 2^12 lines. Hence 12 bits are used for the cache index field.",
        4
      ],
      [
        "Which data transfer technique allows high-speed I/O devices to transfer data directly to/from memory without CPU intervention?",
        [
          "Programmed I/O",
          "Interrupt-driven I/O",
          "Direct Memory Access (DMA)",
          "Serial polling"
        ],
        2,
        "DMA (Direct Memory Access) transfers blocks of data directly between memory and peripheral controllers without constant CPU execution cycles.",
        5
      ],
      [
        "In a 5-stage instruction pipeline, executing 100 independent instructions under ideal conditions requires how many clock cycles?",
        [
          "100",
          "104",
          "500",
          "105"
        ],
        1,
        "Clock cycles for a k-stage pipeline executing n instructions = k + n - 1 = 5 + 100 - 1 = 104 clock cycles.",
        6
      ],
      [
        "Which pipeline hazard occurs when an instruction depends on the result of a previous instruction that has not yet completed?",
        [
          "Structural hazard",
          "Data hazard",
          "Control hazard",
          "Branch hazard"
        ],
        1,
        "Data hazards (RAW, WAR, WAW) occur when operand data dependencies conflict with concurrent execution across pipeline stages.",
        6
      ],
      [
        "The program counter (PC) stores:",
        [
          "The operand being executed",
          "The address of the next instruction to be fetched",
          "The opcode of current instruction",
          "Memory address of stack top"
        ],
        1,
        "The Program Counter holds the memory address of the subsequent machine instruction waiting to be fetched and executed.",
        2
      ],
      [
        "IEEE 754 single-precision floating point format allocates how many bits for the biased exponent?",
        [
          "7 bits",
          "8 bits",
          "11 bits",
          "23 bits"
        ],
        1,
        "IEEE 754 single precision (32 bits) uses 1 sign bit, 8 exponent bits (bias 127), and 23 mantissa/fraction bits.",
        1
      ],
      [
        "A microprogrammed control unit stores control words (microinstructions) in:",
        [
          "Hardwired gates",
          "Control Memory (ROM)",
          "Instruction Register",
          "Cache memory"
        ],
        1,
        "Microprogrammed control units generate control signals by fetching sequenced microinstructions stored in high-speed Control ROM.",
        3
      ]
    ]
  },
  "flat": {
    "2024": [
      [
        "For an NFA with n states, the equivalent minimized DFA can have at most how many states?",
        [
          "n",
          "n²",
          "2^n",
          "n!"
        ],
        2,
        "By the subset construction algorithm (powerset construction), the maximum number of distinct subsets of states is 2^n.",
        1
      ],
      [
        "In a Mealy machine, the output is associated with:",
        [
          "Current state only",
          "State transition and current input symbol",
          "Next state only",
          "Stack symbols"
        ],
        1,
        "A Mealy machine associates outputs with transitions (depending on current state and input symbol), whereas a Moore machine associates outputs strictly with states.",
        1
      ],
      [
        "Context-Free Languages are NOT closed under:",
        [
          "Union",
          "Concatenation",
          "Intersection",
          "Kleene closure"
        ],
        2,
        "CFLs are closed under union, concatenation, and Kleene star, but are NOT closed under intersection or complementation.",
        3
      ],
      [
        "The Myhill-Nerode Theorem provides a necessary and sufficient condition for:",
        [
          "Grammar ambiguity",
          "Language regularity and minimum DFA states",
          "Turing machine decidability",
          "PDA stack emptiness"
        ],
        1,
        "The Myhill-Nerode theorem defines equivalence classes of strings; the language is regular if and only if the number of equivalence classes is finite, which equals the minimal DFA state count.",
        2
      ],
      [
        "For the empty language Φ, what is Φ* (Kleene star of empty set)?",
        [
          "Φ",
          "{ε}",
          "Σ*",
          "Undefined"
        ],
        1,
        "By definition, L* = L^0 ∪ L^1 ∪ L^2... For any language L, L^0 = {ε}. Thus Φ* = {ε}.",
        2
      ],
      [
        "A Context-Free Grammar is called ambiguous if:",
        [
          "It has unreachable non-terminals",
          "Some string has more than one distinct leftmost derivation tree",
          "It contains ε-productions",
          "It cannot be converted to CNF"
        ],
        1,
        "Ambiguity in a CFG means that at least one string in the language yields two or more distinct parse trees (or distinct leftmost/rightmost derivations).",
        3
      ],
      [
        "The Post Correspondence Problem (PCP) is:",
        [
          "Decidable for all alphabets",
          "Undecidable in general",
          "Solvable in polynomial time",
          "Equivalent to DFA minimization"
        ],
        1,
        "Emil Post proved in 1946 that the Post Correspondence Problem (matching domino tile strings) is undecidable.",
        6
      ],
      [
        "Linear Bounded Automata (LBA) accept precisely which class of languages?",
        [
          "Regular Languages (Type 3)",
          "Context-Free Languages (Type 2)",
          "Context-Sensitive Languages (Type 1)",
          "Unrestricted Languages (Type 0)"
        ],
        2,
        "An LBA is a non-deterministic Turing Machine whose tape head is restricted to the portion of the tape occupied by the input string, recognizing Context-Sensitive Languages.",
        5
      ],
      [
        "A grammar with productions of the form A → aB or A → a is known as a:",
        [
          "Left-linear grammar",
          "Right-linear regular grammar",
          "Context-free grammar in GNF",
          "Unrestricted grammar"
        ],
        1,
        "A right-linear grammar has all productions with at most one non-terminal appearing at the extreme right end of the right-hand side, generating regular languages.",
        2
      ],
      [
        "Which of the following computational models has the highest computational power?",
        [
          "Deterministic Pushdown Automaton",
          "Non-deterministic Pushdown Automaton",
          "Linear Bounded Automaton",
          "Turing Machine"
        ],
        3,
        "The Turing Machine is the most powerful formal computational model in the Chomsky hierarchy, capable of simulating any algorithmic computation.",
        5
      ]
    ],
    "2025": [
      [
        "What is the minimum number of states in a DFA accepting strings over {0, 1} ending in \"01\"?",
        [
          "2",
          "3",
          "4",
          "5"
        ],
        1,
        "A DFA recognizing strings ending in \"01\" requires 3 states: q0 (initial / no match or ends in 1), q1 (saw 0), and q2 (saw 01, accepting state).",
        1
      ],
      [
        "The language L = {0^n 1^n | n ≥ 1} is classified as:",
        [
          "Regular Language",
          "Context-Free Language but not Regular",
          "Context-Sensitive but not CFL",
          "Recursively Enumerable only"
        ],
        1,
        "L requires counting and matching the number of 0s and 1s with unbounded memory, which can be accomplished by a Pushdown Automaton using a stack, but not a finite automaton.",
        2
      ],
      [
        "The complement of a Recursive language is always:",
        [
          "Recursive",
          "Recursively Enumerable but not Recursive",
          "Context-Free",
          "Non-deterministic"
        ],
        0,
        "Recursive languages are closed under complementation because a decider Turing Machine always halts; swapping accept and reject states recognizes the complement.",
        5
      ],
      [
        "Which machine model recognizes recursively enumerable (Turing-recognizable) languages?",
        [
          "Finite Automaton",
          "Pushdown Automaton",
          "Linear Bounded Automaton",
          "Turing Machine"
        ],
        3,
        "A standard Turing Machine recognizes precisely the Class 0 recursively enumerable languages.",
        5
      ],
      [
        "In the Pumping Lemma for regular languages, every string w with |w| ≥ p can be partitioned into xyz such that:",
        [
          "|xy| ≤ p and |y| ≥ 1",
          "|xyz| ≤ p",
          "|y| = 0",
          "|y| ≥ p"
        ],
        0,
        "The condition specifies that within the first p characters (|xy| ≤ p), the pumpable substring y must be non-empty (|y| ≥ 1).",
        2
      ],
      [
        "In Chomsky Normal Form (CNF), all production rules must be of the form:",
        [
          "A → BC or A → a",
          "A → aB or A → a",
          "A → αBβ",
          "A → ε only"
        ],
        0,
        "A context-free grammar is in CNF if every production is either of the form A → BC (two non-terminals) or A → a (a single terminal), plus S → ε if ε ∈ L.",
        3
      ],
      [
        "A Pushdown Automaton (PDA) extends a Finite Automaton primarily with:",
        [
          "A queue buffer",
          "An infinite read-write tape",
          "A Last-In First-Out (LIFO) stack",
          "Two-way input tape"
        ],
        2,
        "A PDA incorporates an auxiliary stack memory, granting it the ability to parse nested structures and context-free languages.",
        4
      ],
      [
        "Which problem is famously undecidable in the theory of computation?",
        [
          "Testing if a DFA accepts any strings (emptiness)",
          "Halting problem of a Turing Machine",
          "Converting an NFA to a DFA",
          "Minimizing a DFA"
        ],
        1,
        "Alan Turing proved in 1936 that no general algorithm can decide whether an arbitrary Turing machine will halt on an arbitrary input string.",
        6
      ],
      [
        "The class of Regular Languages is closed under which of the following operations?",
        [
          "Union, Intersection, and Concatenation",
          "Union and Intersection only",
          "Intersection only",
          "None of these"
        ],
        0,
        "Regular languages are closed under union, intersection, concatenation, Kleene star, and complementation.",
        2
      ],
      [
        "Which regular expression represents all strings over {a, b} starting with \"a\" and ending with \"b\"?",
        [
          "a(a+b)*b",
          "a*b*",
          "(ab)*",
          "a(a+b)b"
        ],
        0,
        "The expression specifies an initial \"a\", followed by any sequence of symbols (a+b)*, followed by a final \"b\".",
        2
      ]
    ]
  },
  "dbms": {
    "2024": [
      [
        "Third Normal Form (3NF) addresses which type of dependency?",
        [
          "Partial dependency",
          "Transitive functional dependency of non-prime attributes",
          "Trivial dependency",
          "Cyclic dependency"
        ],
        1,
        "3NF eliminates transitive dependencies where a non-prime attribute depends on another non-prime attribute rather than directly on candidate keys.",
        3
      ],
      [
        "A relation is in Boyce-Codd Normal Form (BCNF) if for every functional dependency X → Y:",
        [
          "Y is a prime attribute",
          "X is a superkey",
          "X is a candidate key of size 1",
          "Y → X also holds"
        ],
        1,
        "BCNF strictly requires that the determinant X in every non-trivial functional dependency X → Y must be a superkey.",
        3
      ],
      [
        "The Natural Join of two relations R and S is mathematically equivalent to:",
        [
          "Cartesian product only",
          "Cartesian product followed by equality selection on common attributes and projection of duplicates",
          "Union followed by difference",
          "Intersection only"
        ],
        1,
        "Natural join combines tuples matching on all common attributes, eliminating redundant duplicate attribute columns.",
        2
      ],
      [
        "A View in SQL is defined as:",
        [
          "A physical copy of the database stored on disk",
          "A virtual relation defined by an underlying query",
          "A temporary table cleared on commit",
          "An index structure"
        ],
        1,
        "A view is a dynamic virtual table whose contents are computed on the fly from an underlying SELECT query.",
        2
      ],
      [
        "In the Wait-Die deadlock prevention scheme based on timestamps:",
        [
          "An older transaction waits for a younger transaction",
          "An older transaction is allowed to wait, while a younger transaction attempting to lock a resource held by an older one is killed (dies)",
          "Younger transactions always preempt older ones",
          "Transactions never abort"
        ],
        1,
        "Wait-Die is a non-preemptive scheme: if T_old requests a resource from T_young, T_old waits; if T_young requests from T_old, T_young dies (aborts and restarts).",
        5
      ],
      [
        "The Durability property in ACID transactions is primarily achieved through:",
        [
          "Two-phase locking",
          "Transaction log files and recovery mechanisms (WAL / checkpoints)",
          "Normalization",
          "View serializability"
        ],
        1,
        "Durability ensures committed updates persist across power failures and system crashes via write-ahead logging and recovery rollback/rollforward.",
        4
      ],
      [
        "In database indexing, a Dense Index:",
        [
          "Has an index entry for every distinct search key value in the data file",
          "Has index entries only for the first record of each disk block",
          "Requires sorted data blocks only",
          "Cannot be built on non-key attributes"
        ],
        0,
        "A dense index contains an index record for every search-key value in the file, allowing fast lookups without scanning data blocks.",
        6
      ],
      [
        "A Primary Index is constructed on a data file that is:",
        [
          "Unordered",
          "Ordered sequentially on a key attribute",
          "Hashed dynamically",
          "Clustered on non-key attributes"
        ],
        1,
        "A primary index is created on an ordered file whose sorting field is a primary or candidate key.",
        6
      ],
      [
        "Which SQL aggregate function ignores NULL values when calculating summary metrics?",
        [
          "COUNT(*)",
          "COUNT(column_name)",
          "AVG(column_name)",
          "Both COUNT(column_name) and AVG(column_name)"
        ],
        3,
        "Aggregate functions like COUNT(col), AVG(col), and SUM(col) ignore NULL values, whereas COUNT(*) counts all rows regardless of NULLs.",
        2
      ],
      [
        "A Dirty Read concurrency anomaly occurs when:",
        [
          "A transaction reads data written by a concurrent uncommitted transaction that later rolls back",
          "Two transactions update the same record simultaneously",
          "A transaction reads different values on repeated reads",
          "A transaction misses phantom inserts"
        ],
        0,
        "A dirty read happens at Read Uncommitted isolation level when T1 reads uncommitted changes of T2, and T2 subsequently aborts.",
        4
      ]
    ],
    "2025": [
      [
        "A Candidate Key in the relational model is defined as:",
        [
          "Any superkey",
          "A minimal superkey",
          "A foreign key constraint",
          "An attribute that can be NULL"
        ],
        1,
        "A candidate key is a minimal set of attributes that uniquely identifies every tuple in a relation, with no proper subset being a superkey.",
        1
      ],
      [
        "Which SQL clause is used to filter aggregated group results produced by GROUP BY?",
        [
          "WHERE",
          "ORDER BY",
          "HAVING",
          "SELECT"
        ],
        2,
        "The HAVING clause filters groups formed by GROUP BY after aggregation, whereas WHERE filters individual tuples before grouping.",
        2
      ],
      [
        "Second Normal Form (2NF) eliminates which anomaly?",
        [
          "Transitive functional dependency",
          "Partial functional dependency on a composite candidate key",
          "Multivalued dependency",
          "Join dependency"
        ],
        1,
        "2NF requires a relation to be in 1NF and ensures that no non-prime attribute is partially dependent on any candidate key.",
        3
      ],
      [
        "Which ACID property ensures that either all operations of a transaction succeed or none are applied?",
        [
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability"
        ],
        0,
        "Atomicity guarantees an \"all-or-nothing\" execution of database transactions, rolling back partial operations if an error occurs.",
        4
      ],
      [
        "Strict Two-Phase Locking (Strict 2PL) prevents:",
        [
          "Deadlocks completely",
          "Cascading aborts / cascading rollbacks",
          "Phantom read phenomena",
          "Starvation"
        ],
        1,
        "Strict 2PL holds all exclusive (write) locks until the transaction commits or aborts, ensuring that no other transaction reads uncommitted changes, thereby preventing cascading aborts.",
        5
      ],
      [
        "In a B+ Tree index, actual data records or record pointers are stored in:",
        [
          "The root node only",
          "Internal index nodes only",
          "Leaf nodes only",
          "Distributed uniformly across all levels"
        ],
        2,
        "Unlike standard B-Trees, B+ Trees store all actual record pointers at the linked leaf level, providing fast sequential scans and balanced search depth.",
        6
      ],
      [
        "A Foreign Key constraint enforces which database integrity rule?",
        [
          "Entity integrity",
          "Domain integrity",
          "Referential integrity",
          "User-defined integrity"
        ],
        2,
        "A foreign key references a primary or unique key in another table, guaranteeing referential integrity between related entities.",
        1
      ],
      [
        "In relational algebra, the Selection operator is denoted by:",
        [
          "π (pi)",
          "σ (sigma)",
          "ρ (rho)",
          "⨝ (bowtie)"
        ],
        1,
        "The selection operator σ selects horizontal subsets of tuples that satisfy a given predicate condition.",
        2
      ],
      [
        "A relational decomposition of R into (R1, R2) is guaranteed to be lossless if:",
        [
          "R1 ∩ R2 is empty",
          "(R1 ∩ R2) → R1 or (R1 ∩ R2) → R2",
          "R1 ∪ R2 contains foreign keys",
          "Both relations are in 3NF"
        ],
        1,
        "A binary decomposition is lossless-join if and only if the intersection of the attribute sets forms a superkey for at least one of the decomposed relations.",
        3
      ],
      [
        "The Write-Ahead Logging (WAL) protocol dictates that:",
        [
          "Database data pages must be written to disk before log records",
          "Log records describing a change must be flushed to stable storage before the corresponding data page is written",
          "Transactions commit before logging",
          "Logs are kept in volatile RAM only"
        ],
        1,
        "WAL guarantees atomicity and durability by ensuring that undo/redo log records reach non-volatile disk before dirty database pages are written.",
        5
      ]
    ]
  },
  "daa": {
    "2024": [
      [
        "The recurrence relation for Merge Sort is given by:",
        [
          "T(n) = T(n-1) + O(1)",
          "T(n) = 2T(n/2) + Θ(n)",
          "T(n) = 2T(n/2) + Θ(n²)",
          "T(n) = T(n/2) + Θ(1)"
        ],
        1,
        "Merge Sort divides the array into two halves (2T(n/2)) and merges them in linear time (Θ(n)), solving to Θ(n log n).",
        2
      ],
      [
        "Breadth-First Search (BFS) on an unweighted graph computes shortest paths from a source in:",
        [
          "O(V²)",
          "O(V + E)",
          "O(E log V)",
          "O(V log E)"
        ],
        1,
        "BFS visits each vertex and traverses each edge once, finding the minimum number of hops in O(V + E) time.",
        5
      ],
      [
        "The Floyd-Warshall algorithm computes all-pairs shortest paths using Dynamic Programming in:",
        [
          "O(V²)",
          "O(V³)",
          "O(V × E)",
          "O(E log V)"
        ],
        1,
        "Floyd-Warshall uses three nested loops over vertices (k, i, j), resulting in O(V³) time complexity.",
        5
      ],
      [
        "In the Activity Selection Problem, what greedy choice leads to an optimal schedule?",
        [
          "Selecting activity with shortest duration",
          "Selecting activity with earliest finish time",
          "Selecting activity with earliest start time",
          "Selecting activity with latest finish time"
        ],
        1,
        "Selecting the compatible activity with the earliest finish time leaves the maximum possible remaining time for subsequent activities.",
        3
      ],
      [
        "What is the theoretical lower bound for comparison-based sorting algorithms in the worst case?",
        [
          "Ω(n)",
          "Ω(n log n)",
          "Ω(n²)",
          "Ω(log n)"
        ],
        1,
        "A comparison tree for sorting n elements has n! leaves; any binary tree with n! leaves must have height at least log2(n!) = Ω(n log n).",
        2
      ],
      [
        "The decision version of the Traveling Salesperson Problem (TSP) is:",
        [
          "In Class P",
          "NP-Complete",
          "Solvable in O(n²) time",
          "Undecidable"
        ],
        1,
        "TSP decision problem is in NP and can be reduced from the Hamiltonian Cycle problem, making it NP-Complete.",
        6
      ],
      [
        "Matrix Chain Multiplication with n matrices is solved by Dynamic Programming in time:",
        [
          "O(n²)",
          "O(n³)",
          "O(2^n)",
          "O(n log n)"
        ],
        1,
        "Evaluating the subproblems m[i, j] takes O(n) choices across O(n²) subproblem states, requiring O(n³) time.",
        4
      ],
      [
        "Kruskal’s algorithm for finding a Minimum Spanning Tree uses which data structure for cycle detection?",
        [
          "Fibonacci Heap",
          "Disjoint Set Union (Union-Find)",
          "Hash Table",
          "Stack"
        ],
        1,
        "Kruskal’s algorithm sorts edges by weight and uses Union-Find with path compression to test whether edge endpoints belong to the same connected component.",
        5
      ],
      [
        "Binary Search on a sorted array of size n has recurrence:",
        [
          "T(n) = T(n-1) + O(1)",
          "T(n) = T(n/2) + O(1)",
          "T(n) = 2T(n/2) + O(1)",
          "T(n) = T(n/2) + O(n)"
        ],
        1,
        "Binary Search halves the search space at each iteration with constant comparison work, yielding T(n) = T(n/2) + O(1) = O(log n).",
        2
      ],
      [
        "In the Longest Common Subsequence (LCS) problem for strings of length m and n, the DP table size is:",
        [
          "m × n",
          "(m + 1) × (n + 1)",
          "2^(m + n)",
          "m + n"
        ],
        1,
        "The DP table c[i, j] includes boundary base cases for empty prefixes (i = 0 or j = 0), requiring an (m + 1) × (n + 1) table.",
        4
      ]
    ],
    "2025": [
      [
        "According to the Master Theorem, what is the asymptotic solution to T(n) = 2T(n/2) + Θ(n)?",
        [
          "Θ(n)",
          "Θ(n log n)",
          "Θ(n²)",
          "Θ(log n)"
        ],
        1,
        "Here a = 2, b = 2, f(n) = Θ(n). Since log_b(a) = log_2(2) = 1, f(n) = Θ(n^log_b(a)), which falls into Case 2 of the Master Theorem, yielding Θ(n log n).",
        1
      ],
      [
        "What is the worst-case time complexity of QuickSort?",
        [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(2^n)"
        ],
        2,
        "QuickSort degrades to O(n²) when the partition is unbalanced at every step, such as when the array is already sorted and the first or last element is chosen as pivot.",
        2
      ],
      [
        "Dijkstra’s single-source shortest path algorithm fails or produces incorrect results when:",
        [
          "The graph contains cycles",
          "The graph has negative edge weights",
          "The graph is directed",
          "The graph is disconnected"
        ],
        1,
        "Dijkstra relies on a greedy property that shortest distances cannot decrease once settled, which fails in the presence of negative edge weights.",
        5
      ],
      [
        "The Fractional Knapsack problem is optimally solved using which algorithmic paradigm?",
        [
          "Dynamic Programming",
          "Greedy Method",
          "Divide and Conquer",
          "Backtracking"
        ],
        1,
        "Fractional Knapsack exhibits the greedy-choice property: sorting items by value-to-weight ratio (v_i / w_i) in descending order guarantees an optimal solution in O(n log n) time.",
        3
      ],
      [
        "The standard dynamic programming solution for the 0/1 Knapsack problem runs in:",
        [
          "O(n log n) time",
          "O(n × W) pseudo-polynomial time",
          "O(2^n) polynomial time",
          "O(W log n) time"
        ],
        1,
        "The 0/1 Knapsack DP algorithm fills an n × W table, taking O(n × W) time where W is the knapsack capacity (pseudo-polynomial since it depends on the magnitude of W).",
        4
      ],
      [
        "A computational decision problem belongs to Class NP if its candidate solution can be:",
        [
          "Solved in polynomial time by a deterministic Turing machine",
          "Verified in polynomial time by a deterministic algorithm",
          "Solved in logarithmic space",
          "Never verified"
        ],
        1,
        "Class NP (Non-deterministic Polynomial time) comprises decision problems whose solutions (certificates) can be verified in polynomial time.",
        6
      ],
      [
        "Prim’s algorithm for Minimum Spanning Tree using a binary min-heap runs in time:",
        [
          "O(V²)",
          "O(E log V)",
          "O(V + E)",
          "O(E²)"
        ],
        1,
        "Using a binary min-heap priority queue, extract-min takes O(log V) per vertex and decrease-key takes O(log V) per edge, giving O(E log V) total running time.",
        5
      ],
      [
        "Which algorithm can compute shortest paths and detect negative weight cycles reachable from a source?",
        [
          "Dijkstra’s algorithm",
          "Bellman-Ford algorithm",
          "Floyd-Warshall algorithm without relaxation",
          "Prim’s algorithm"
        ],
        1,
        "The Bellman-Ford algorithm relaxes all edges |V| - 1 times and can detect negative cycles if a further relaxation reduces distance.",
        5
      ],
      [
        "Huffman coding produces which type of prefix code?",
        [
          "Variable-length prefix-free code minimizing average code length",
          "Fixed-length code",
          "Lossy compression code",
          "Linear parity code"
        ],
        0,
        "Huffman coding builds an optimal prefix-free binary tree where higher-frequency symbols receive shorter binary codewords.",
        3
      ],
      [
        "Which asymptotic notation represents a mathematically strict tight bound?",
        [
          "Big-O (O)",
          "Big-Omega (Ω)",
          "Big-Theta (Θ)",
          "Little-o (o)"
        ],
        2,
        "Big-Theta (Θ) defines an asymptotically tight bound that sandwiches the growth rate between upper and lower constants for sufficiently large n.",
        1
      ]
    ]
  },
  "etc": {
    "2024": [
      [
        "A professional engineering email subject line should be:",
        [
          "Blank or generic like \"Hi\"",
          "Specific, concise, and indicative of the email’s content and urgency",
          "A full paragraph explaining the issue",
          "Informal and humorous"
        ],
        1,
        "An effective subject line informs the recipient of the specific project, topic, and urgency before opening the message.",
        3
      ],
      [
        "A Memorandum (Memo) is primarily used for:",
        [
          "External sales promotion to clients",
          "Internal written communication within an organization",
          "Legal patent filings",
          "Press releases"
        ],
        1,
        "Memos are concise internal documents used to communicate decisions, announcements, or policies among employees.",
        3
      ],
      [
        "The reading technique known as \"Skimming\" is used to:",
        [
          "Find a specific phone number or statistical figure",
          "Rapidly read through text to gain an overall impression and main idea",
          "Memorize complex mathematical proofs",
          "Check for typographical errors"
        ],
        1,
        "Skimming involves reading headings, topic sentences, and summaries quickly to extract the central message.",
        4
      ],
      [
        "The reading technique known as \"Scanning\" involves:",
        [
          "Reading word-for-word for deep understanding",
          "Searching text rapidly to locate a specific fact, date, or keyword",
          "Critiquing the author’s stylistic choices",
          "Summarizing the entire book"
        ],
        1,
        "Scanning is searching through content with a specific target keyword or fact in mind without reading everything.",
        4
      ],
      [
        "Active listening in professional engineering discussions requires:",
        [
          "Formulating counter-arguments while the speaker is talking",
          "Paying full attention, taking notes, and paraphrasing to verify understanding",
          "Interrupting whenever a flaw is detected",
          "Multitasking on a laptop"
        ],
        1,
        "Active listening entails focused attention, non-verbal acknowledgment, and reflecting back meaning to ensure mutual clarity.",
        4
      ],
      [
        "Which form of Intellectual Property Rights protects original written technical documentation, software code, and diagrams?",
        [
          "Patent",
          "Copyright",
          "Trademark",
          "Trade Secret"
        ],
        1,
        "Copyright protects original literary, artistic, and technical works (including computer software and written manuals) from unauthorized duplication.",
        6
      ],
      [
        "In a professional Group Discussion (GD), an evaluator primarily looks for:",
        [
          "Aggressive dominance and speaking the longest time",
          "Content knowledge, logical reasoning, clarity, teamwork, and active listening",
          "Strictly agreeing with everyone without adding points",
          "Use of complex idioms"
        ],
        1,
        "GDs assess candidates on communication clarity, technical depth, collaborative leadership, and ability to synthesize diverse opinions.",
        5
      ],
      [
        "Which section is typically included in the Front Matter of a formal technical report?",
        [
          "Executive Summary and Table of Contents",
          "Detailed mathematical appendices",
          "Raw laboratory logbooks",
          "Index of keywords only"
        ],
        0,
        "Front Matter contains preliminary pages such as title page, letter of transmittal, table of contents, and executive summary.",
        3
      ],
      [
        "A semantic barrier in technical communication is caused by:",
        [
          "Defective microphone wiring",
          "Ambiguous words, unfamiliar jargon, or terms with multiple interpretations",
          "Room temperature and poor lighting",
          "Hearing impairment"
        ],
        1,
        "Semantic barriers arise when the receiver interprets word meanings differently from what the sender intended.",
        1
      ],
      [
        "The primary ethical obligation in the IEEE Code of Ethics mandates engineers to:",
        [
          "Maximize shareholder profit above all else",
          "Hold paramount the safety, health, and welfare of the public",
          "Protect company secrets even if public safety is compromised",
          "Never publish research openly"
        ],
        1,
        "Engineering ethics codes universally place public health, safety, and welfare as the highest professional responsibility.",
        6
      ]
    ],
    "2025": [
      [
        "The primary objective of effective technical communication is:",
        [
          "Displaying extensive vocabulary",
          "Clarity, conciseness, precision, and objectivity",
          "Persuading through emotional appeals",
          "Producing lengthy prose"
        ],
        1,
        "Technical writing conveys complex technical information accurately, concisely, and objectively to help readers make informed decisions.",
        1
      ],
      [
        "The \"7 Cs of Effective Communication\" include:",
        [
          "Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous",
          "Complex, Creative, Casual, Critical, Concise, Clever, Calm",
          "Careful, Crafty, Cynical, Candid, Common, Crisp, Concise",
          "None of these"
        ],
        0,
        "The 7 Cs ensure communication is Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.",
        1
      ],
      [
        "An Executive Summary in an engineering project proposal should provide:",
        [
          "A line-by-line transcription of the budget only",
          "Key problem statement, proposed technical solution, methodology, and recommendations",
          "Only raw experimental data tables",
          "A history of the sponsoring company"
        ],
        1,
        "An executive summary condenses essential objectives, proposed technical solutions, timelines, and business benefits for decision-makers.",
        3
      ],
      [
        "In non-verbal communication, the study of body posture, gestures, and facial expressions is called:",
        [
          "Proxemics",
          "Kinesics",
          "Chronemics",
          "Haptics"
        ],
        1,
        "Kinesics is the study of body movement, facial expressions, eye contact, and gestures in human interaction.",
        5
      ],
      [
        "In technical report writing, passive voice is preferred when:",
        [
          "The writer wants to sound informal",
          "The action or technical result is more important than the person who performed it",
          "Writing a cover letter",
          "The subject is unknown and unimportant"
        ],
        1,
        "Passive voice emphasizes objective findings (e.g. \"The sample was heated to 100°C\") over the personal experimenter.",
        2
      ],
      [
        "A psychological barrier to effective listening occurs when:",
        [
          "There is high background noise in the room",
          "Preconceived notions, biases, or emotional defensiveness impair reception",
          "The speaker uses unfamiliar jargon",
          "The transmission line drops"
        ],
        1,
        "Psychological barriers stem from emotional baggage, prejudices, impatience, and personal biases that block active listening.",
        4
      ],
      [
        "A Chronological Resume format is most appropriate for a candidate who:",
        [
          "Has frequent employment gaps",
          "Has a steady, progressive career record in the same technical field",
          "Is switching to an unrelated field",
          "Has no formal education"
        ],
        1,
        "A chronological resume lists work experience in reverse chronological order, highlighting steady career growth.",
        3
      ],
      [
        "Plagiarism in technical research and publication is defined as:",
        [
          "Citing multiple authors in a paper",
          "Using another person’s ideas, data, code, or words without appropriate attribution",
          "Paraphrasing with formal citations",
          "Publishing open-source software"
        ],
        1,
        "Plagiarism is intellectual dishonesty involving the uncredited use of another author’s work, words, or ideas.",
        6
      ],
      [
        "The formal document that summarizes the discussions, decisions, and action items of a professional meeting is called:",
        [
          "Minutes of the Meeting (MoM)",
          "Notice of Meeting",
          "Meeting Agenda",
          "Corporate Memorandum"
        ],
        0,
        "Minutes of the Meeting (MoM) provide an official written record of attendees, discussions, resolutions, and assigned tasks with deadlines.",
        3
      ],
      [
        "Diagonal communication in an organization takes place between:",
        [
          "Peers in the same department",
          "Superiors and direct subordinates",
          "Individuals at different hierarchical levels across different functional departments",
          "External suppliers only"
        ],
        2,
        "Diagonal (cross-functional) communication crosses both departmental boundaries and hierarchy levels to speed up problem-solving.",
        1
      ]
    ]
  }
};

const masterMcqData = {
  "cn": [
    [
      "In the OSI model, which layer is responsible for end-to-end process-to-process communication?",
      [
        "Network",
        "Transport",
        "Data Link",
        "Session"
      ],
      1,
      "The Transport layer (Layer 4) provides logical, process-to-process communication between application processes running on different hosts.",
      1
    ],
    [
      "How many physical links are needed in a full mesh network of 10 nodes?",
      [
        "45",
        "90",
        "20",
        "100"
      ],
      0,
      "For n nodes in a full mesh topology, total dedicated physical links = n(n - 1) / 2 = 10(9) / 2 = 45 links.",
      1
    ],
    [
      "Which OSI layer converts packets into frames?",
      [
        "Physical",
        "Network",
        "Data Link",
        "Transport"
      ],
      2,
      "The Data Link layer encapsulates Layer 3 network packets into frames with header (MAC addresses) and trailer (CRC/FCS) fields.",
      1
    ],
    [
      "Which device primarily forwards frames using MAC addresses?",
      [
        "Router",
        "Repeater",
        "Layer 2 switch",
        "Modem"
      ],
      2,
      "A Layer 2 switch inspects incoming data link frame headers and forwards them based on hardware MAC addresses using its MAC address lookup table.",
      1
    ],
    [
      "Which statement about TCP/IP is correct?",
      [
        "It has exactly seven layers",
        "IP guarantees reliable delivery",
        "TCP provides reliable transport",
        "UDP requires a connection setup"
      ],
      2,
      "TCP is a connection-oriented transport protocol that guarantees reliable, sequenced delivery with flow and congestion control.",
      1
    ],
    [
      "For a noiseless channel with bandwidth 3 kHz and 4 signal levels, what is the Nyquist maximum bit rate?",
      [
        "6 kbps",
        "12 kbps",
        "24 kbps",
        "3 kbps"
      ],
      1,
      "Nyquist bit rate = 2 × Bandwidth × log2(L) = 2 × 3000 Hz × log2(4) = 6000 × 2 = 12,000 bps = 12 kbps.",
      2
    ],
    [
      "A channel has bandwidth 3 kHz and SNR 31 (linear ratio). Shannon capacity is:",
      [
        "3 kbps",
        "9 kbps",
        "15 kbps",
        "31 kbps"
      ],
      2,
      "Shannon Capacity C = B × log2(1 + SNR) = 3000 × log2(1 + 31) = 3000 × log2(32) = 3000 × 5 = 15,000 bps = 15 kbps.",
      2
    ],
    [
      "A 1000-byte frame travels over a 1 Mbps link. Transmission delay is:",
      [
        "1 ms",
        "8 ms",
        "80 ms",
        "0.8 ms"
      ],
      1,
      "Transmission delay = Frame size / Bandwidth = (1000 × 8 bits) / (10^6 bps) = 8000 / 1,000,000 s = 0.008 s = 8 ms.",
      2
    ],
    [
      "A signal propagates 400 km at 2×10⁸ m/s. Propagation delay is:",
      [
        "0.2 ms",
        "2 ms",
        "20 ms",
        "200 ms"
      ],
      1,
      "Propagation delay = Distance / Velocity = (400 × 10^3 m) / (2 × 10^8 m/s) = (4 × 10^5) / (2 × 10^8) s = 2 × 10^-3 s = 2 ms.",
      2
    ],
    [
      "Which multiplexing method assigns separate time slots?",
      [
        "FDM",
        "TDM",
        "WDM",
        "CDMA"
      ],
      1,
      "Time Division Multiplexing (TDM) divides channel capacity by allocating distinct repeating time slots to each communicating source.",
      2
    ],
    [
      "A 30 dB power ratio corresponds to approximately:",
      [
        "10:1",
        "100:1",
        "1000:1",
        "30:1"
      ],
      2,
      "dB = 10 × log10(P2 / P1) => 30 = 10 × log10(ratio) => log10(ratio) = 3 => ratio = 10^3 = 1000:1.",
      2
    ],
    [
      "Which medium is immune to electromagnetic interference?",
      [
        "Twisted pair",
        "Coaxial cable",
        "Optical fiber",
        "Unshielded copper"
      ],
      2,
      "Fiber optic cables transmit data as pulses of light (photons) through silica glass cores, making them completely immune to electromagnetic and radio frequency interference.",
      2
    ],
    [
      "In packet switching, store-and-forward means a router:",
      [
        "Must reserve a circuit",
        "Receives the complete packet before forwarding",
        "Forwards only the header",
        "Never buffers packets"
      ],
      1,
      "Under the store-and-forward mechanism, an intermediate router must receive, buffer, and verify the checksum of the entire packet before transmitting the first bit onto the outbound link.",
      2
    ],
    [
      "For data 1101 and CRC generator 1011, what is the 3-bit remainder?",
      [
        "001",
        "010",
        "101",
        "111"
      ],
      0,
      "Append three zeros to data 1101 giving 1101000. Modulo-2 binary division by generator 1011 yields remainder 001.",
      3
    ],
    [
      "A code has minimum Hamming distance 4. It can guarantee correction of up to:",
      [
        "1 error",
        "2 errors",
        "3 errors",
        "4 errors"
      ],
      0,
      "To guarantee correction of t errors, the minimum Hamming distance d_min must satisfy 2t + 1 ≤ d_min. With d_min = 4: 2t + 1 ≤ 4 => 2t ≤ 3 => t = 1 error.",
      3
    ],
    [
      "How many Hamming parity bits are needed for 11 data bits?",
      [
        "3",
        "4",
        "5",
        "6"
      ],
      1,
      "Hamming condition: 2^p ≥ m + p + 1. For m = 11 data bits: with p = 4, 2^4 = 16 and 11 + 4 + 1 = 16 (16 ≥ 16 holds). Thus 4 parity bits are required.",
      3
    ],
    [
      "In standard even-parity Hamming coding, parity bits are placed at positions:",
      [
        "0, 2, 4, 6",
        "1, 2, 4, 8",
        "1, 3, 5, 7",
        "Only at the end"
      ],
      1,
      "In Hamming error-correcting code, parity bits are placed at bit positions that are powers of 2 (positions 1, 2, 4, 8, 16...).",
      3
    ],
    [
      "A Stop-and-Wait link has transmission time 1 ms and one-way propagation delay 9 ms; ACK transmission time is negligible. Utilization is approximately:",
      [
        "5.26%",
        "10%",
        "50%",
        "90%"
      ],
      0,
      "Round-trip cycle time = T_t + 2 × T_p = 1 ms + 2(9 ms) = 19 ms. Channel utilization U = T_t / (T_t + 2 × T_p) = 1 / 19 ≈ 0.05263 = 5.26%.",
      3
    ],
    [
      "In Go-Back-N ARQ with 3-bit sequence numbers, maximum sender window size is:",
      [
        "3",
        "4",
        "7",
        "8"
      ],
      2,
      "In Go-Back-N with m-bit sequence numbers, maximum sender window size is 2^m - 1 = 2^3 - 1 = 7 to prevent overlapping window ambiguity.",
      3
    ],
    [
      "In Selective Repeat ARQ with 4-bit sequence numbers, maximum safe window size is:",
      [
        "4",
        "7",
        "8",
        "15"
      ],
      2,
      "In Selective Repeat ARQ, sender and receiver window sizes cannot exceed 2^(m - 1) = 2^(4 - 1) = 2^3 = 8.",
      3
    ],
    [
      "Pure ALOHA has maximum throughput approximately:",
      [
        "18.4%",
        "36.8%",
        "50%",
        "100%"
      ],
      0,
      "Pure ALOHA throughput S = G × e^(-2G). Maximum throughput occurs at traffic load G = 0.5, giving S_max = 1 / (2e) ≈ 0.184 (18.4%).",
      3
    ],
    [
      "Slotted ALOHA maximum throughput is approximately:",
      [
        "18.4%",
        "25%",
        "36.8%",
        "75%"
      ],
      2,
      "Slotted ALOHA vulnerable period is halved to 1 frame time, giving throughput S = G × e^(-G). Max throughput at G = 1 is S_max = 1 / e ≈ 0.368 (36.8%).",
      3
    ],
    [
      "Which access method uses collision detection on traditional shared Ethernet?",
      [
        "CSMA/CA",
        "CSMA/CD",
        "Token passing",
        "FDMA"
      ],
      1,
      "IEEE 802.3 legacy Ethernet employs Carrier Sense Multiple Access with Collision Detection (CSMA/CD) to abort transmission immediately upon detecting a collision.",
      3
    ],
    [
      "Which is the main purpose of bit stuffing in flag-delimited framing?",
      [
        "Encrypt payload",
        "Prevent payload from imitating flag patterns",
        "Compress frames",
        "Correct burst errors"
      ],
      1,
      "Bit stuffing inserts a 0 bit after every five consecutive 1s in the data stream so that user data never accidentally matches the reserved delimiter flag pattern (01111110).",
      3
    ],
    [
      "How many usable host addresses are in a conventional IPv4 /26 subnet?",
      [
        "30",
        "62",
        "64",
        "126"
      ],
      1,
      "Host bits = 32 - 26 = 6. Usable hosts = 2^6 - 2 = 64 - 2 = 62 (excluding network ID and broadcast ID).",
      4
    ],
    [
      "What is the subnet mask for /27?",
      [
        "255.255.255.0",
        "255.255.255.192",
        "255.255.255.224",
        "255.255.255.240"
      ],
      2,
      "A /27 prefix has 27 ones. The last octet has three leading ones (11100000_2 = 128 + 64 + 32 = 224), giving 255.255.255.224.",
      4
    ],
    [
      "What is the network address of 192.168.10.77/28?",
      [
        "192.168.10.64",
        "192.168.10.72",
        "192.168.10.77",
        "192.168.10.80"
      ],
      0,
      "A /28 subnet has block size = 2^(32-28) = 16. Subnet boundaries in the 4th octet are 0, 16, 32, 48, 64, 80... The IP .77 falls into subnet 64 to 79, making 192.168.10.64 the network address.",
      4
    ],
    [
      "For 172.16.5.130/25, the broadcast address is:",
      [
        "172.16.5.127",
        "172.16.5.128",
        "172.16.5.254",
        "172.16.5.255"
      ],
      3,
      "/25 splits the 256 addresses into two halves: 0-127 and 128-255. Address .130 is in the second half (network 172.16.5.128), whose broadcast address is 172.16.5.255.",
      4
    ],
    [
      "Which IPv4 field is decremented by each forwarding router?",
      [
        "Protocol",
        "TTL",
        "Source address",
        "Identification"
      ],
      1,
      "Every intermediate router decrements the Time to Live (TTL) field by at least 1. If TTL drops to 0, the packet is discarded and an ICMP Time Exceeded message is sent to prevent infinite routing loops.",
      4
    ],
    [
      "Which protocol maps an IPv4 address to a local MAC address?",
      [
        "DHCP",
        "ARP",
        "ICMP",
        "IGMP"
      ],
      1,
      "Address Resolution Protocol (ARP) translates known 32-bit network-layer IP addresses into 48-bit physical MAC addresses on the local area network.",
      4
    ],
    [
      "Which protocol can report destination-unreachable errors?",
      [
        "ARP",
        "DNS",
        "ICMP",
        "SMTP"
      ],
      2,
      "ICMP (Internet Control Message Protocol) generates error diagnostic messages, including Destination Unreachable (Type 3) and Time Exceeded (Type 11).",
      4
    ],
    [
      "Which routing algorithm is associated with distance-vector routing?",
      [
        "Bellman–Ford",
        "Kruskal",
        "Prim",
        "Merge Sort"
      ],
      0,
      "Distance Vector routing protocols (such as RIP) compute the shortest path using the distributed Bellman-Ford shortest path algorithm.",
      4
    ],
    [
      "Dijkstra's algorithm assumes edge weights are:",
      [
        "Always negative",
        "Nonnegative",
        "Always equal",
        "Only integers"
      ],
      1,
      "Dijkstra's shortest path algorithm (used in link-state protocols like OSPF) requires all link/edge costs to be non-negative (≥ 0).",
      4
    ],
    [
      "IPv6 addresses contain:",
      [
        "32 bits",
        "48 bits",
        "64 bits",
        "128 bits"
      ],
      3,
      "An IPv6 address is 128 bits (16 bytes) in length, expanding address space dramatically compared to 32-bit IPv4.",
      4
    ],
    [
      "Which field identifies the destination application process in TCP?",
      [
        "Sequence number",
        "Destination port",
        "Window scale",
        "Checksum"
      ],
      1,
      "Port numbers (16-bit) identify specific host application processes at the transport layer. The destination port directs the incoming segment to the target server process.",
      5
    ],
    [
      "A TCP SYN consumes how many sequence numbers?",
      [
        "0",
        "1",
        "2",
        "Depends on MSS"
      ],
      1,
      "In TCP, control flags that establish or close connections (SYN and FIN) logically consume exactly one sequence number, requiring an explicit acknowledgment.",
      5
    ],
    [
      "A TCP segment starts at sequence number 500 and carries 100 bytes, with no SYN/FIN. Next expected ACK number is:",
      [
        "500",
        "501",
        "599",
        "600"
      ],
      3,
      "The segment carries data bytes numbered 500 through 599. TCP acknowledgments are cumulative and specify the next expected sequence number: 500 + 100 = 600.",
      5
    ],
    [
      "A receiver advertises a TCP window of 4096 bytes. This primarily expresses:",
      [
        "Congestion window",
        "Receiver's available buffer space",
        "Maximum IP packet length",
        "Round-trip time"
      ],
      1,
      "The TCP advertised window field conveys the receiver's currently available receive buffer space to provide flow control and prevent sender buffer overflow.",
      5
    ],
    [
      "Which statement is correct about UDP?",
      [
        "It guarantees delivery",
        "It is connection-oriented",
        "It has no built-in retransmission mechanism",
        "It guarantees in-order packets"
      ],
      2,
      "UDP is a lightweight, connectionless, best-effort transport protocol that does not provide acknowledgments, sequencing, or automatic retransmissions.",
      5
    ],
    [
      "Which algorithm shapes traffic using a bucket draining at a fixed rate?",
      [
        "Leaky bucket",
        "DNS caching",
        "CRC",
        "ARP"
      ],
      0,
      "The Leaky Bucket traffic shaping algorithm smooths out bursty input traffic into a constant, fixed-rate output stream.",
      5
    ],
    [
      "Which mechanism permits bursts when tokens have accumulated?",
      [
        "Leaky bucket only",
        "Token bucket",
        "Stop-and-Wait",
        "Pure ALOHA"
      ],
      1,
      "The Token Bucket algorithm accumulates tokens up to capacity, allowing idle senders to transmit sudden data bursts at full line speed until tokens are exhausted.",
      5
    ],
    [
      "Which sequence correctly establishes a TCP connection?",
      [
        "ACK, SYN, FIN",
        "SYN, SYN-ACK, ACK",
        "FIN, ACK, SYN",
        "SYN, FIN, ACK"
      ],
      1,
      "TCP establishes full-duplex connections via a 3-way handshake: Client sends SYN, Server replies with SYN-ACK, Client completes with ACK.",
      5
    ],
    [
      "Which DNS record maps a hostname to an IPv4 address?",
      [
        "MX",
        "AAAA",
        "A",
        "PTR"
      ],
      2,
      "An \"A\" (Address) record maps a fully qualified domain name to a 32-bit IPv4 address. \"AAAA\" maps to a 128-bit IPv6 address.",
      6
    ],
    [
      "Which DNS record identifies mail exchangers for a domain?",
      [
        "MX",
        "CNAME",
        "NS",
        "PTR"
      ],
      0,
      "MX (Mail Exchanger) records specify the mail servers responsible for accepting incoming email messages on behalf of a recipient's domain.",
      6
    ],
    [
      "Which protocol is used to transfer outgoing email between mail servers?",
      [
        "POP3",
        "SMTP",
        "ARP",
        "ICMP"
      ],
      1,
      "Simple Mail Transfer Protocol (SMTP, port 25) is the universal protocol used to push and relay outgoing email between mail servers.",
      6
    ],
    [
      "Which port is traditionally used by HTTP without TLS?",
      [
        "21",
        "25",
        "80",
        "110"
      ],
      2,
      "Standard unencrypted Hypertext Transfer Protocol (HTTP) uses TCP port 80 (HTTPS with TLS uses port 443).",
      6
    ],
    [
      "Which protocol traditionally uses separate control and data connections?",
      [
        "FTP",
        "DNS",
        "SMTP",
        "DHCP"
      ],
      0,
      "File Transfer Protocol (FTP) uses an out-of-band architecture: port 21 is used for control commands and port 20 is used for bulk data transfer.",
      6
    ],
    [
      "In HTTP, which status code indicates that the requested resource was not found?",
      [
        "200",
        "301",
        "404",
        "500"
      ],
      2,
      "HTTP status code 404 indicates Client Error: The server cannot locate the requested URI/resource.",
      6
    ],
    [
      "A 1500-byte IP datagram (including a 20-byte IPv4 header) crosses a link with MTU 620 bytes. Assuming fragmentation is permitted, how many fragments are required?",
      [
        "2",
        "3",
        "4",
        "5"
      ],
      1,
      "Total payload = 1500 - 20 = 1480 bytes. Maximum payload per fragment = 620 - 20 = 600 bytes (which is divisible by 8). Fragment 1 carries 600 bytes, Fragment 2 carries 600 bytes, and Fragment 3 carries the remaining 280 bytes. Total fragments = 3.",
      4
    ],
    [
      "Which technique uses acknowledgments for each frame and allows selective retransmission of lost frames?",
      [
        "Pure ALOHA",
        "Go-Back-N",
        "Selective Repeat ARQ",
        "CSMA/CD"
      ],
      2,
      "Selective Repeat ARQ maintains independent timers and receiver buffer windows, sending individual acknowledgments and retransmitting only the specific frames that were lost or damaged.",
      3
    ]
  ],
  "coa": [
    [
      "In computer arithmetic, the range of signed 8-bit integers in two’s complement form is:",
      [
        "-128 to +127",
        "-127 to +127",
        "0 to 255",
        "-256 to +255"
      ],
      0,
      "For n bits in two’s complement, the range is -2^(n-1) to +2^(n-1) - 1. For 8 bits: -2^7 to +2^7 - 1 = -128 to +127.",
      1
    ],
    [
      "In IEEE 754 double-precision format, the exponent bias is:",
      [
        "127",
        "255",
        "1023",
        "2047"
      ],
      2,
      "Double-precision allocates 11 bits for the exponent, resulting in an exponent bias of 2^(11-1) - 1 = 1023.",
      1
    ],
    [
      "Which logic circuit performs addition of three binary bits (two operands plus carry-in)?",
      [
        "Half adder",
        "Full adder",
        "Decoder",
        "Multiplexer"
      ],
      1,
      "A full adder adds three 1-bit binary inputs (A, B, and Carry-in) producing Sum and Carry-out outputs.",
      1
    ],
    [
      "In a stack-based computer architecture, instructions typically use which format?",
      [
        "Three-address",
        "Two-address",
        "One-address",
        "Zero-address"
      ],
      3,
      "Stack-organized CPUs implicitly operate on top-of-stack operands (using PUSH and POP), requiring zero memory address fields in ALU instructions.",
      2
    ],
    [
      "In relative addressing mode, the effective address is computed by adding the address field to the contents of:",
      [
        "Accumulator",
        "Program Counter (PC)",
        "Base Register",
        "Stack Pointer"
      ],
      1,
      "In PC-relative addressing mode: Effective Address = (Contents of PC) + Address Field offset.",
      2
    ],
    [
      "Which processor register stores the instruction currently being executed?",
      [
        "Program Counter",
        "Instruction Register (IR)",
        "Memory Buffer Register",
        "Accumulator"
      ],
      1,
      "The Instruction Register holds the machine instruction code fetched from memory while it is being decoded and executed.",
      2
    ],
    [
      "Compared to microprogrammed control units, hardwired control units are generally:",
      [
        "Faster and optimized for RISC architectures",
        "Easier to modify and reconfigure",
        "Slower and larger in size",
        "Microcode dependent"
      ],
      0,
      "Hardwired control units generate signals using fixed combinational logic gates, delivering maximum execution speed suited for RISC designs.",
      3
    ],
    [
      "In a microprogrammed control unit, the next microinstruction address is determined by the:",
      [
        "Program Counter",
        "Control Address Register (CAR)",
        "Instruction Register",
        "Stack Pointer"
      ],
      1,
      "The Control Address Register holds the address of the next control word/microinstruction to be read from control memory.",
      3
    ],
    [
      "Nanoprogramming is primarily employed in computer architectures to:",
      [
        "Increase clock frequency",
        "Reduce the total size of control memory storage",
        "Eliminate pipeline stalls",
        "Expand cache capacity"
      ],
      1,
      "Nanoprogramming uses a two-level control memory to avoid storing duplicate wide control words, substantially reducing total ROM bit count.",
      3
    ],
    [
      "A system has L1 cache hit time 2 ns, L1 hit rate 90%, and miss penalty 50 ns. Average Memory Access Time (AMAT) is:",
      [
        "5 ns",
        "7 ns",
        "12 ns",
        "52 ns"
      ],
      1,
      "AMAT = Hit Time + (Miss Rate × Miss Penalty) = 2 ns + (0.10 × 50 ns) = 2 + 5 = 7 ns.",
      4
    ],
    [
      "Which cache write policy guarantees that main memory is updated simultaneously on every cache write?",
      [
        "Write-back",
        "Write-through",
        "Write-allocate only",
        "Lazy write"
      ],
      1,
      "Write-through writes data to both cache and main memory concurrently, ensuring memory consistency at the cost of higher bus traffic.",
      4
    ],
    [
      "In virtual memory systems with paging, internal fragmentation occurs because:",
      [
        "Pages are swapped to disk",
        "A process does not fully occupy its final allocated page frame",
        "Page tables grow too large",
        "Segments vary in length"
      ],
      1,
      "Paging uses fixed-size memory blocks; the last page allocated to a process is rarely filled completely, leaving unused space inside the page.",
      4
    ],
    [
      "In an interrupt-driven system, vectored interrupts determine the ISR starting address through:",
      [
        "Polling every device sequentially",
        "An interrupt vector table index supplied directly by the interrupting device",
        "A hardcoded BIOS jump",
        "A software timer check"
      ],
      1,
      "In vectored interrupts, the I/O interface places a vector code on the data bus, which points to the device’s specific Interrupt Service Routine.",
      5
    ],
    [
      "Which I/O scheme maps peripheral device registers into the standard CPU memory address space?",
      [
        "Isolated I/O",
        "Memory-Mapped I/O",
        "Direct Channel I/O",
        "Asynchronous Strobe I/O"
      ],
      1,
      "In memory-mapped I/O, I/O ports share the same address space and read/write control signals as primary RAM, using standard load/store instructions.",
      5
    ],
    [
      "Priority arbitration among multiple bus masters arranged in a physical serial chain is known as:",
      [
        "Independent request",
        "Daisy chaining",
        "Polling arbitration",
        "Decentralized token passing"
      ],
      1,
      "Daisy chaining uses a serial bus grant line passed from the highest-priority device to lower-priority devices in physical sequence.",
      5
    ],
    [
      "A non-pipelined processor executes an instruction in 10 ns. A 5-stage pipeline with 2 ns clock cycle achieves theoretical maximum speedup of:",
      [
        "2.5",
        "5",
        "10",
        "1"
      ],
      1,
      "Maximum speedup for an ideal k-stage pipeline over an equivalent unpipelined processor is equal to the number of stages k = 5.",
      6
    ],
    [
      "Operand forwarding (bypassing) in pipelined CPUs is used to eliminate stalls caused by:",
      [
        "Structural hazards",
        "RAW (Read-After-Write) data hazards",
        "Branch mispredictions",
        "Cache misses"
      ],
      1,
      "Operand forwarding routes the newly computed ALU result directly to the inputs of dependent instructions without waiting for write-back to the register file.",
      6
    ],
    [
      "Branch target buffers (BTB) in high-performance pipelines are used to mitigate:",
      [
        "Data hazards",
        "Control hazards",
        "Memory bus conflicts",
        "Overflow errors"
      ],
      1,
      "A BTB caches the branch target address and prediction bits, allowing the pipeline to fetch the target instruction with zero branch delay cycles.",
      6
    ]
  ],
  "flat": [
    [
      "The transition function δ of a Deterministic Finite Automaton (DFA) is formally defined as:",
      [
        "Q × Σ → 2^Q",
        "Q × Σ → Q",
        "Q × Σ_ε → 2^Q",
        "Q × Γ → Q × Γ × {L, R}"
      ],
      1,
      "In a DFA, δ maps each state-symbol pair (q ∈ Q, a ∈ Σ) deterministically to exactly one single next state q' ∈ Q.",
      1
    ],
    [
      "How many states are required in the minimal DFA that accepts the language over {a, b} consisting of all strings containing \"aba\" as a substring?",
      [
        "3",
        "4",
        "5",
        "6"
      ],
      1,
      "The states correspond to tracking prefix matches: q0 (ε), q1 (a), q2 (ab), and q3 (aba, absorbing accept state). Total = 4 states.",
      1
    ],
    [
      "Which of the following is equivalent in computational expressive power to Non-Deterministic Finite Automata (NFA)?",
      [
        "DFA only",
        "DFA and Regular Expressions",
        "PDA only",
        "Turing Machine only"
      ],
      1,
      "By Kleene’s Theorem and the subset construction, DFAs, NFAs, and Regular Expressions all recognize precisely the class of Regular Languages.",
      1
    ],
    [
      "Arden’s Theorem states that if P and Q are regular expressions over Σ and ε ∉ P, then the equation R = Q + RP has the unique solution:",
      [
        "R = QP*",
        "R = P*Q",
        "R = Q*P",
        "R = (P + Q)*"
      ],
      0,
      "Arden's theorem provides the fundamental algebraic identity R = QP* for solving linear language equations.",
      2
    ],
    [
      "If language L is regular, which of the following languages is NOT guaranteed to be regular?",
      [
        "L reversed (L^R)",
        "L complement (Σ* - L)",
        "{w w^R | w ∈ L}",
        "L* (Kleene closure)"
      ],
      2,
      "The set of palindromes {w w^R} requires unbounded stack matching and is context-free, not regular in general.",
      2
    ],
    [
      "The table-filling algorithm (Myhill-Nerode minimization) identifies equivalent states by discovering:",
      [
        "Unreachable and distinguishable state pairs",
        "Deadlock states",
        "Loops in grammar",
        "Non-deterministic branching"
      ],
      0,
      "The algorithm marks pairs of states (p, q) that are distinguishable by some input string w, iteratively merging indistinguishable states.",
      2
    ],
    [
      "A Context-Free Grammar (CFG) has productions of the form A → α where:",
      [
        "A ∈ V_N and α ∈ (V_N ∪ V_T)*",
        "A, α ∈ V_T*",
        "A ∈ V_T and α ∈ V_N*",
        "A has length greater than α"
      ],
      0,
      "In a CFG (Type 2 grammar), the left-hand side must consist of exactly one non-terminal variable.",
      3
    ],
    [
      "Eliminating unit productions A → B and ε-productions from a CFG generates an equivalent grammar that generates:",
      [
        "A strictly smaller language",
        "The same language (excluding ε if present)",
        "A regular language",
        "An undecidable grammar"
      ],
      1,
      "Standard CFG simplification transformations preserve the exact generated language while removing non-generating, unreachable, unit, and null productions.",
      3
    ],
    [
      "An inherently ambiguous context-free language is one that:",
      [
        "Has no deterministic parser",
        "Has at least one ambiguous CFG",
        "Has only ambiguous grammars; no unambiguous CFG can generate it",
        "Is not context-free"
      ],
      2,
      "An inherently ambiguous CFL cannot be generated by any unambiguous context-free grammar (e.g. {a^n b^n c^m d^m} ∪ {a^n b^m c^m d^n}).",
      3
    ],
    [
      "A Deterministic Pushdown Automaton (DPDA) differs from a Non-Deterministic PDA (NPDA) in that:",
      [
        "DPDAs accept all CFLs",
        "NPDAs are strictly more powerful and accept non-deterministic CFLs",
        "DPDAs accept regular languages only",
        "NPDAs cannot use stack memory"
      ],
      1,
      "Unlike finite automata where DFA = NFA, NPDAs are strictly more powerful than DPDAs; languages like palindromes require non-deterministic guessing.",
      4
    ],
    [
      "Acceptance by final state and acceptance by empty stack in a Pushdown Automaton are:",
      [
        "Equivalent in language recognition power",
        "Only possible for finite languages",
        "Disjoint classes of languages",
        "Applicable only to regular languages"
      ],
      0,
      "For any PDA accepting by empty stack, an equivalent PDA accepting by final state can be constructed, and vice versa.",
      4
    ],
    [
      "The Pumping Lemma for Context-Free Languages splits a sufficiently long string z into uvwxy with constraints:",
      [
        "|vwx| ≤ p and |vx| ≥ 1",
        "|uv| ≤ p and |w| ≥ 1",
        "|y| ≤ p and |u| = 0",
        "|uvwxy| ≤ p"
      ],
      0,
      "The CFL pumping lemma guarantees that the middle substring |vwx| ≤ p and the pumped parts v and x are not both empty (|vx| ≥ 1).",
      4
    ],
    [
      "A standard deterministic Turing Machine is formally defined by a 7-tuple (Q, Σ, Γ, δ, q0, B, F) where the transition function δ is:",
      [
        "Q × Γ → Q × Γ × {L, R}",
        "Q × Σ → Q × {L, R}",
        "Q × Γ → 2^Q",
        "Q × Σ → Γ"
      ],
      0,
      "In a standard TM, given the current state and tape symbol under the head, δ dictates the next state, the tape symbol to write, and head movement (Left or Right).",
      5
    ],
    [
      "A Multi-Tape Turing Machine has computational expressive power that is:",
      [
        "Strictly greater than a single-tape TM",
        "Identical to a standard single-tape TM",
        "Less than a Pushdown Automaton",
        "Equivalent to a Linear Bounded Automaton"
      ],
      1,
      "A k-tape TM can be simulated by a single-tape TM with quadratic slowdown (O(T^2) time), proving their language recognition equivalence.",
      5
    ],
    [
      "A language L is Recursive (Turing-decidable) if and only if:",
      [
        "There is a TM that halts on all inputs, accepting w ∈ L and rejecting w ∉ L",
        "There is a TM that halts on accepting strings and loops on strings not in L",
        "L is accepted by a PDA",
        "L is finite"
      ],
      0,
      "A recursive language is decided by a total Turing Machine that halts on every input string in finite time.",
      5
    ],
    [
      "According to the Chomsky Hierarchy, Type 0 languages correspond to:",
      [
        "Regular Grammars",
        "Context-Free Grammars",
        "Context-Sensitive Grammars",
        "Unrestricted / Recursively Enumerable Grammars"
      ],
      3,
      "Type 0 grammars have no restrictions on production rules (α → β with α containing at least one non-terminal) and generate recursively enumerable languages.",
      6
    ],
    [
      "Rice’s Theorem states that any non-trivial semantic property of the language recognized by a Turing Machine is:",
      [
        "Decidable in polynomial time",
        "Undecidable",
        "Context-sensitive",
        "Provable by finite induction"
      ],
      1,
      "Rice’s theorem establishes that any non-trivial semantic property of Turing machine languages (such as emptiness, finiteness, or regularity) is undecidable.",
      6
    ],
    [
      "Which of the following problems is DECIDABLE for Regular Languages but UNDECIDABLE for Context-Free Languages?",
      [
        "Membership problem",
        "Emptiness problem",
        "Equivalence problem (L1 = L2)",
        "Finiteness problem"
      ],
      2,
      "Equivalence (L1 = L2) is decidable for regular languages using DFA product construction, but undecidable for context-free languages.",
      6
    ]
  ],
  "dbms": [
    [
      "In the Three-Schema Architecture of a database system, physical data independence isolates the:",
      [
        "External schema from conceptual schema",
        "Conceptual schema from internal/physical storage schema",
        "User views from SQL queries",
        "Database from network protocol"
      ],
      1,
      "Physical data independence allows internal storage reorganization, indexing, and disk layout changes without requiring modifications to the conceptual schema.",
      1
    ],
    [
      "In an Entity-Relationship (ER) diagram, a Weak Entity set is visually represented by a:",
      [
        "Double rectangle",
        "Dashed ellipse",
        "Diamond with double line",
        "Underlined circle"
      ],
      0,
      "A weak entity set (which lacks a primary key and depends on an identifying owner entity) is depicted by a double rectangle.",
      1
    ],
    [
      "Total participation of an entity set in a relationship set is depicted in an ER diagram by a:",
      [
        "Dashed line",
        "Double line",
        "Arrow pointing to relationship",
        "Bold diamond"
      ],
      1,
      "Total participation (every entity in the set must participate in at least one relationship instance) is represented by a double line connecting entity to relationship.",
      1
    ],
    [
      "Which relational algebra operation finds tuples in relation R that are associated with all tuples in relation S?",
      [
        "Cartesian Product",
        "Natural Join",
        "Division (÷)",
        "Intersection"
      ],
      2,
      "The Division operator (R ÷ S) is used for queries involving \"for all\" or universal quantification conditions.",
      2
    ],
    [
      "In SQL, a correlated subquery differs from an uncorrelated subquery because it:",
      [
        "Executes once before the outer query",
        "References columns from the outer query and is evaluated once for each outer query row",
        "Cannot contain a WHERE clause",
        "Always returns multiple tables"
      ],
      1,
      "A correlated subquery depends on values from the outer query row and executes iteratively for each candidate tuple.",
      2
    ],
    [
      "Which type of SQL join returns all rows from the left table and matched rows from the right table, filling non-matching right columns with NULL?",
      [
        "INNER JOIN",
        "LEFT OUTER JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN"
      ],
      1,
      "A LEFT OUTER JOIN preserves all records from the left table, padding unmatched right attributes with NULL values.",
      2
    ],
    [
      "Armstrong’s Axiom of Transitivity states that if X → Y and Y → Z, then:",
      [
        "X → Z",
        "XZ → Y",
        "Y → X",
        "Z → X"
      ],
      0,
      "By transitivity: if functional dependency X determines Y and Y determines Z, then X functionally determines Z.",
      3
    ],
    [
      "A functional dependency X → Y is called trivial if:",
      [
        "Y is empty",
        "Y is a subset of X (Y ⊆ X)",
        "X is a candidate key",
        "X ∩ Y = ∅"
      ],
      1,
      "A dependency is trivial if the right-hand side attribute set is completely contained within the left-hand side determinant set.",
      3
    ],
    [
      "Every relation in Boyce-Codd Normal Form (BCNF) is guaranteed to be in:",
      [
        "4NF",
        "Third Normal Form (3NF)",
        "5NF",
        "Domain-Key Normal Form"
      ],
      1,
      "BCNF is a stricter specialization of 3NF; every BCNF relation automatically satisfies all conditions for 3NF, 2NF, and 1NF.",
      3
    ],
    [
      "In transaction management, a schedule is Conflict Serializable if its precedence (serialization) graph:",
      [
        "Is a complete tree",
        "Contains no directed cycles (is a DAG)",
        "Contains at least one bidirectional cycle",
        "Has exactly two nodes"
      ],
      1,
      "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles, meaning its transactions can be topologically sorted.",
      4
    ],
    [
      "In the ACID model, the Isolation property ensures that:",
      [
        "Hardware faults do not lose data",
        "Concurrent execution of transactions results in a state equivalent to serial execution",
        "Database constraints are never checked",
        "Transactions commit immediately"
      ],
      1,
      "Isolation guarantees that concurrently running transactions do not interfere with each other and execute as if in isolation.",
      4
    ],
    [
      "Which SQL transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads?",
      [
        "Read Uncommitted",
        "Read Committed",
        "Repeatable Read",
        "Serializable"
      ],
      2,
      "Repeatable Read locks accessed rows to prevent dirty reads and non-repeatable reads, but range locks are not acquired, permitting phantom inserts.",
      4
    ],
    [
      "In the Two-Phase Locking (2PL) protocol, once a transaction releases any lock, it enters the:",
      [
        "Growing phase",
        "Shrinking phase",
        "Commit phase",
        "Validation phase"
      ],
      1,
      "In 2PL, a transaction cannot acquire any new locks once it begins releasing locks (the shrinking phase).",
      5
    ],
    [
      "Thomas Write Rule in timestamp-based concurrency control modifies standard timestamp rules by:",
      [
        "Aborting all out-of-order writes",
        "Silently ignoring obsolete write operations whose timestamp is older than the write timestamp of the item",
        "Granting locks indefinitely",
        "Enforcing Strict 2PL"
      ],
      1,
      "Thomas Write Rule optimizes timestamp ordering by discarding outdated writes (blind writes) rather than aborting the transaction.",
      5
    ],
    [
      "In the ARIES database recovery algorithm, which phase scans the log forward from the checkpoint to reconstruct the system state up to crash time?",
      [
        "Analysis phase",
        "Redo phase",
        "Undo phase",
        "Cleanup phase"
      ],
      1,
      "The Redo phase scans forward from the earliest dirty page table entry, repeating history to restore both committed and active changes.",
      5
    ],
    [
      "In a B+ Tree index with block size 4096 bytes, search key size 12 bytes, and block pointer size 8 bytes, what is the maximum fanout (order p)?",
      [
        "100",
        "204",
        "205",
        "512"
      ],
      1,
      "For an internal node: p × 8 + (p - 1) × 12 ≤ 4096 => 20p - 12 ≤ 4096 => 20p ≤ 4108 => p = floor(4108 / 20) = 205.",
      2
    ],
    [
      "Extendible Hashing accommodates dynamic file growth by using a directory of pointers and:",
      [
        "Rehashing all records on every insertion",
        "Splitting only the overflowing bucket and doubling the directory when local depth exceeds global depth",
        "A fixed B-tree index",
        "Static magnetic storage"
      ],
      1,
      "Extendible hashing uses global and local depth; only the bucket that overflows is split, avoiding full file rehashing.",
      6
    ],
    [
      "In cost-based query optimization, the relational algebra equivalence σ_{θ}(R ⨝ S) = (σ_{θ}(R)) ⨝ S represents:",
      [
        "Pushed projection",
        "Pushed selection (predicate pushdown)",
        "Join elimination",
        "Materialized view creation"
      ],
      1,
      "Predicate pushdown applies selection predicates as early as possible before expensive join operations to reduce intermediate relation sizes.",
      6
    ]
  ],
  "daa": [
    [
      "If a function f(n) = 3n² + 5n log n + 7, then the asymptotic tight bound for f(n) is:",
      [
        "Θ(n)",
        "Θ(n log n)",
        "Θ(n²)",
        "Θ(n³)"
      ],
      2,
      "In asymptotic analysis, the highest-order dominant term determines the growth rate; 3n² dominates 5n log n, yielding Θ(n²).",
      1
    ],
    [
      "Solve the recurrence T(n) = 2T(n/2) + n log n using recursion tree analysis:",
      [
        "Θ(n)",
        "Θ(n log² n)",
        "Θ(n²)",
        "Θ(n log n)"
      ],
      1,
      "At each level i, the work is n log(n / 2^i). Summing over log n levels yields Θ(n log² n).",
      1
    ],
    [
      "Which of the following functions grows asymptotically fastest as n → ∞?",
      [
        "n^1.5",
        "2^(log2 n)",
        "n log n",
        "1.001^n"
      ],
      3,
      "Exponential functions (c^n with c > 1) grow asymptotically faster than any polynomial or polylogarithmic function as n approaches infinity.",
      1
    ],
    [
      "Strassen’s matrix multiplication algorithm computes the product of two n × n matrices in time:",
      [
        "O(n³)",
        "O(n^2.807)",
        "O(n² log n)",
        "O(n²)"
      ],
      1,
      "Strassen reduces the number of recursive sub-matrix multiplications from 8 to 7, giving T(n) = 7T(n/2) + O(n²), which solves to O(n^log2(7)) ≈ O(n^2.807).",
      2
    ],
    [
      "Randomized QuickSort achieves an expected running time of:",
      [
        "O(n²)",
        "O(n log n)",
        "O(n)",
        "O(log n)"
      ],
      1,
      "By choosing a pivot uniformly at random, every split is balanced with high probability, yielding an expected running time of O(n log n).",
      2
    ],
    [
      "The Median-of-Medians selection algorithm finds the k-th smallest element in an unsorted array of size n in worst-case time:",
      [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      0,
      "By dividing into groups of 5 and recursively choosing medians, the algorithm guarantees a 30/70 partition, achieving worst-case linear O(n) time.",
      2
    ],
    [
      "A greedy algorithm is guaranteed to produce an optimal solution if the problem exhibits:",
      [
        "Overlapping subproblems only",
        "Optimal substructure and greedy-choice property",
        "Quadratic recursion trees",
        "Strictly monotonic inputs"
      ],
      1,
      "The greedy-choice property (a globally optimal solution can be arrived at by making locally optimal choices) and optimal substructure guarantee greedy optimality.",
      3
    ],
    [
      "In the Job Sequencing with Deadlines problem with n jobs, each taking unit time, the optimal schedule can be found using:",
      [
        "Dynamic Programming in O(n³)",
        "Greedy method with Disjoint Set Union in O(n log n) or O(n α(n))",
        "Branch and Bound in O(2^n)",
        "Breadth First Search"
      ],
      1,
      "Sorting jobs by descending profit and using Union-Find to find the latest available free time slot yields an optimal schedule.",
      3
    ],
    [
      "Huffman’s greedy algorithm constructs an optimal prefix code tree in time:",
      [
        "O(n²)",
        "O(n log n)",
        "O(2^n)",
        "O(log n)"
      ],
      1,
      "Using a min-heap priority queue, extracting two lowest frequencies and inserting their parent n - 1 times takes (n - 1) × O(log n) = O(n log n) time.",
      3
    ],
    [
      "In the 0/1 Knapsack problem, the optimal subproblem equation for item i and remaining capacity w is:",
      [
        "K(i, w) = K(i-1, w)",
        "K(i, w) = max(K(i-1, w), K(i-1, w - w_i) + v_i)",
        "K(i, w) = K(i-1, w - w_i) * v_i",
        "K(i, w) = min(K(i-1, w), v_i)"
      ],
      1,
      "At each item i, we either exclude item i (value K(i-1, w)) or include item i (value K(i-1, w - w_i) + v_i), selecting the maximum.",
      4
    ],
    [
      "For multiplying a chain of four matrices A1(10×20), A2(20×30), A3(30×40), A4(40×30), the DP approach computes:",
      [
        "Minimum scalar multiplications using optimal parenthesis placement",
        "Eigenvalues of matrices",
        "Matrix determinants",
        "Graph transitivity"
      ],
      0,
      "Matrix Chain Multiplication finds the optimal association/parenthesization that minimizes the total number of scalar multiplications.",
      4
    ],
    [
      "The Longest Common Subsequence of strings \"ABCBDAB\" and \"BDCABA\" has length:",
      [
        "3",
        "4",
        "5",
        "6"
      ],
      1,
      "A longest common subsequence is \"BCBA\" (or \"BDAB\" or \"BCAB\"), each having length 4.",
      4
    ],
    [
      "Topological Sorting of a Directed Acyclic Graph (DAG) can be computed using:",
      [
        "Depth First Search (DFS) or Kahn’s algorithm (in-degrees)",
        "Dijkstra’s algorithm",
        "Kruskal’s algorithm",
        "Bellman-Ford algorithm"
      ],
      0,
      "Topological sorting orders vertices such that for every directed edge u → v, u comes before v. Both DFS and Kahn’s queue algorithm achieve this in O(V + E) time.",
      5
    ],
    [
      "The Bellman-Ford algorithm computes single-source shortest paths on a graph with V vertices by performing edge relaxations how many times?",
      [
        "|V| times",
        "|V| - 1 times",
        "|E| times",
        "log |V| times"
      ],
      1,
      "In any simple path, there are at most |V| - 1 edges; relaxing all edges |V| - 1 times guarantees convergence if no negative cycles exist.",
      5
    ],
    [
      "Dijkstra’s algorithm implemented with a Fibonacci Heap achieves what asymptotic time complexity?",
      [
        "O(V²)",
        "O(E + V log V)",
        "O(E log V)",
        "O(V × E)"
      ],
      1,
      "With a Fibonacci heap, decrease-key runs in O(1) amortized time, leading to O(V log V + E) total time for single-source shortest paths.",
      5
    ],
    [
      "The Cook-Levin Theorem states that which problem is NP-Complete?",
      [
        "Boolean Satisfiability (SAT)",
        "Shortest Path",
        "Matrix Multiplication",
        "Minimum Spanning Tree"
      ],
      0,
      "Stephen Cook and Leonid Levin proved in 1971 that the Boolean Satisfiability problem (SAT) is NP-Complete, serving as the foundation for NP-Completeness proofs.",
      6
    ],
    [
      "A polynomial-time reduction from problem A to problem B (A ≤p B) implies that:",
      [
        "If B is solvable in polynomial time, then A is solvable in polynomial time",
        "A is harder than B",
        "B is undecidable",
        "Both A and B are in Class P"
      ],
      0,
      "If A reduces to B in polynomial time, an efficient algorithm for B directly yields an efficient algorithm for A.",
      6
    ],
    [
      "For the NP-Hard Vertex Cover problem, the greedy matching heuristic provides an approximation algorithm with approximation ratio:",
      [
        "1.5",
        "2",
        "log n",
        "n"
      ],
      1,
      "Selecting both endpoints of maximal matching edges yields a vertex cover of size at most twice the optimal minimum vertex cover (a 2-approximation).",
      6
    ]
  ],
  "etc": [
    [
      "In the Shannon-Weaver mathematical model of communication, interference that distorts the transmitted signal is known as:",
      [
        "Feedback",
        "Encoding",
        "Noise",
        "Channel distortion only"
      ],
      2,
      "Noise represents any unwanted physical, psychological, or semantic interference that degrades or alters message fidelity during transmission.",
      1
    ],
    [
      "Communication that flows from upper management down to operational staff (e.g. policies and directives) is termed:",
      [
        "Upward communication",
        "Downward communication",
        "Horizontal communication",
        "Grapevine"
      ],
      1,
      "Downward communication transmits organizational goals, official instructions, procedures, and feedback from leaders to subordinates.",
      1
    ],
    [
      "The informal, spontaneous interpersonal communication network within an organization is known as the:",
      [
        "Formal line",
        "Grapevine",
        "Lateral protocol",
        "Consensus link"
      ],
      1,
      "The grapevine is the unofficial, informal communication network that circulates social chatter and workplace news across formal hierarchical barriers.",
      1
    ],
    [
      "Identify the sentence with correct subject-verb agreement for engineering documentation:",
      [
        "The set of laboratory experiments were completed on time.",
        "The set of laboratory experiments was completed on time.",
        "The set of laboratory experiments are completed on time.",
        "The set of laboratory experiments have been completed on time."
      ],
      1,
      "The true subject is the singular collective noun phrase \"The set\", which correctly takes the singular verb \"was\".",
      2
    ],
    [
      "A \"dangling modifier\" in a technical procedure creates ambiguity because:",
      [
        "It uses too many commas",
        "The modifying phrase is not logically attached to the subject it intends to describe",
        "It is written in passive voice",
        "It uses archaic vocabulary"
      ],
      1,
      "A dangling modifier lacks a clear, logical grammatical subject (e.g. \"Walking into the lab, the experiment failed\"), creating reader confusion.",
      2
    ],
    [
      "Which sentence demonstrates the most effective, concise technical style?",
      [
        "At this point in time, we are currently in the process of conducting a comprehensive investigation.",
        "We are investigating the issue.",
        "An investigation of an extensive nature is undergoing realization by us.",
        "Due to the fact that we are curious, we are looking into it."
      ],
      1,
      "\"We are investigating the issue\" is direct, active, concise, and avoids unnecessary corporate padding.",
      2
    ],
    [
      "In a formal engineering project proposal, the \"Deliverables\" section specifies:",
      [
        "The history of the client organization",
        "The concrete products, software, prototypes, or reports that will be delivered upon completion",
        "Biographical sketches of all company employees",
        "Raw lab notes"
      ],
      1,
      "Deliverables explicitly list the tangible products, documentation, source code, and milestones committed to the client.",
      3
    ],
    [
      "In technical report architecture, a \"Letter of Transmittal\" serves to:",
      [
        "Summarize the mathematical proofs",
        "Formally present and submit the completed report to the recipient or client",
        "Provide an alphabetical index of keywords",
        "List cited references"
      ],
      1,
      "The Letter of Transmittal formally submits the report to the client or supervisor, stating its authorization, purpose, and scope.",
      3
    ],
    [
      "An instructional user manual for technical equipment should primarily employ which grammatical mood for procedure steps?",
      [
        "Subjunctive mood",
        "Imperative mood (direct action verbs)",
        "Conditional mood",
        "Interrogative mood"
      ],
      1,
      "Instructions and user steps use the imperative mood (e.g. \"Connect cable A to port 1\", \"Press power switch\") for clear, step-by-step guidance.",
      3
    ],
    [
      "In the SQ3R study and comprehension method, the five steps stand for:",
      [
        "Survey, Question, Read, Recite, Review",
        "Scan, Query, Read, Reorganize, Remember",
        "Skim, Question, Rephrase, Repeat, Reflect",
        "Study, Query, Read, Recite, Revise"
      ],
      0,
      "SQ3R is a structured reading comprehension framework: Survey, Question, Read, Recite, and Review.",
      4
    ],
    [
      "Critical reading of an engineering research paper requires a reader to:",
      [
        "Accept all conclusions without verification",
        "Distinguish empirical facts from inferences and evaluate author assumptions",
        "Focus solely on the abstract",
        "Memorize all formulas"
      ],
      1,
      "Critical reading actively evaluates experimental methodology, validity of assumptions, and the logical connection between evidence and conclusions.",
      4
    ],
    [
      "In the Cornell Note-Taking System, the left-hand narrow column is dedicated to:",
      [
        "Full lecture transcription",
        "Cues, keywords, and review questions",
        "A final paragraph summary",
        "Drawing electrical schematics"
      ],
      1,
      "The Cornell method divides the page into a wide right column for lecture notes, a narrow left column for cues and keywords, and a bottom section for summaries.",
      4
    ],
    [
      "When delivering an extempore technical presentation, the speaker should:",
      [
        "Read directly from a word-for-word script",
        "Structure ideas quickly using a clear framework (e.g. problem, solution, benefits) and speak with natural eye contact",
        "Refuse to take any audience questions",
        "Memorize a fixed speech"
      ],
      1,
      "Extempore speaking involves rapid mental structuring (such as Introduction, 3 Key Points, Conclusion) delivered conversationally using brief key prompts.",
      5
    ],
    [
      "The \"STAR\" method for answering behavioral engineering interview questions stands for:",
      [
        "Situation, Task, Action, Result",
        "Skills, Training, Ability, Readiness",
        "Strategy, Theory, Analysis, Report",
        "Scope, Timeline, Allocation, Review"
      ],
      0,
      "STAR is a structured interview technique: describe the Situation, specify the Task required, explain the Action taken, and detail the measurable Result.",
      5
    ],
    [
      "In a professional group discussion, which behavior demonstrates strong collaborative leadership?",
      [
        "Interrupting other candidates whenever they pause",
        "Synthesizing conflicting viewpoints and steering the group constructively toward consensus",
        "Remaining completely silent to avoid conflict",
        "Monopolizing the floor for the entire discussion"
      ],
      1,
      "Effective leadership in GDs involves active listening, bringing quiet team members into the conversation, and summarizing common ground.",
      5
    ],
    [
      "Plagiarism that involves rewording another person’s text while maintaining their sentence structure without citation is called:",
      [
        "Mosaic plagiarism (patchwriting)",
        "Self-plagiarism",
        "Complete verbatim copying",
        "Accidental citation"
      ],
      0,
      "Patchwriting or mosaic plagiarism copies source phrases and sentence architecture while substituting minor synonyms without proper attribution.",
      6
    ],
    [
      "A Non-Disclosure Agreement (NDA) in an engineering corporation is designed to legally protect:",
      [
        "Published open-source software",
        "Proprietary trade secrets, confidential technical designs, and unreleased product data",
        "Employee resume credentials",
        "Public patent filings"
      ],
      1,
      "NDAs are legally binding contracts that safeguard proprietary intellectual property and confidential technical assets from unauthorized disclosure.",
      6
    ],
    [
      "Engineering codes of professional ethics (such as ACM and IEEE) mandate that engineers must:",
      [
        "Avoid conflicts of interest and disclose known safety hazards to stakeholders",
        "Prioritize project deadlines over structural safety",
        "Share proprietary client algorithms with friends",
        "Avoid mentoring junior engineers"
      ],
      0,
      "Professional ethics require transparency, avoiding conflicts of interest, and holding public welfare and safety above project expediency.",
      6
    ]
  ]
};

export function pyqMcqYears(subject) {
  return Object.keys(pyqMcqData[subject] || {}).map(Number).sort((a, b) => b - a);
}

export function quizQuestions(subject, type = 'master', year = null) {
  if (type === 'pyq' && year) {
    const list = pyqMcqData[subject]?.[year];
    if (list && list.length) {
      return list.map(([text, options, answer, explanation, unit], i) => ({
        id: `${subject}-${year}-mcq-${i + 1}`,
        text,
        options,
        answer,
        explanation,
        unit: unit || ((i % 6) + 1),
        year: +year
      }));
    }
  }
  if (type === 'pyq' && !year) {
    const years = Object.keys(pyqMcqData[subject] || {}).map(Number).sort((a, b) => b - a);
    return years.flatMap(y =>
      (pyqMcqData[subject][y] || []).map(([text, options, answer, explanation, unit], i) => ({
        id: `${subject}-${y}-mcq-${i + 1}`,
        text,
        options,
        answer,
        explanation,
        unit: unit || ((i % 6) + 1),
        year: +y
      }))
    );
  }
  const master = masterMcqData[subject] || [];
  return master.map(([text, options, answer, explanation, unit], i) => ({
    id: `${subject}-m-${i + 1}`,
    text,
    options,
    answer,
    explanation,
    unit: unit || ((i % 6) + 1)
  }));
}

export function pyqs(subject){
  return pyqData[subject] || [];
}

export const allTopics=subjects.flatMap(s=>s.units.flatMap(u=>u.topics));
