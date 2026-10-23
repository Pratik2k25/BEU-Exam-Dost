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

const qs={
  cn:[
    ['Which OSI layer routes packets between different networks using logical addressing?',['Data Link Layer','Network Layer','Transport Layer','Application Layer'],1,'The Network layer (Layer 3) handles logical IP addressing and packet routing across networks.'],
    ['For 192.168.10.70/26, what is the subnet broadcast address?',['192.168.10.63','192.168.10.127','192.168.10.191','192.168.10.255'],1,'A /26 prefix divides the class C network into blocks of 64 addresses (.0-.63, .64-.127, .128-.191, .192-.255). 192.168.10.70 falls in the second block whose broadcast address is .127.'],
    ['Which routing protocol uses a Link-State routing approach with Dijkstra’s shortest path algorithm?',['RIP','OSPF','BGP','EGP'],1,'OSPF (Open Shortest Path First) is a link-state routing protocol that utilizes Dijkstra’s algorithm.'],
    ['Which protocol resolves a domain name like www.beu.ac.in to an IP address?',['FTP','TCP','DNS','ARP'],2,'DNS (Domain Name System) translates human-readable domain names into machine-readable IP addresses.'],
    ['How many usable host IP addresses are in a standard IPv4 /27 subnet?',['16','32','30','62'],2,'2^(32-27) = 32 total addresses. Subtracting 2 for Network ID and Broadcast ID yields 30 usable hosts.'],
    ['Which transport layer protocol provides connection-oriented, reliable, and ordered byte stream delivery?',['UDP','IP','ICMP','TCP'],3,'TCP (Transmission Control Protocol) uses sequence numbers, ACKs, and checksums for reliable in-order data delivery.']
  ],
  coa:[
    ['A cache hit means the requested data block is located in…',['Main memory only','Cache memory','Secondary storage','An I/O register'],1,'A cache hit occurs when CPU finds the requested word or memory block present in high-speed cache memory.'],
    ['Which functional unit of the CPU executes binary arithmetic and logical operations?',['CU','MAR','ALU','PC'],2,'The Arithmetic Logic Unit (ALU) performs fundamental arithmetic operations and bitwise Boolean logic.'],
    ['Booth’s multiplication algorithm is designed for…',['Fast sorting','Signed 2’s complement binary multiplication','Packet routing','Virtual memory allocation'],1,'Booth’s recoding algorithm handles signed binary multiplication in 2’s complement representation with fewer addition operations.'],
    ['Which type of computer memory is volatile and loses its contents when power is turned off?',['ROM','Flash memory','RAM','Optical storage'],2,'RAM (Random Access Memory) requires power to maintain storage state and is therefore volatile.'],
    ['Direct Memory Access (DMA) primarily reduces…',['CPU involvement during high-speed data transfers','RAM storage capacity','Bus width','Address space size'],0,'DMA allows peripheral controllers to transfer data blocks directly to/from main memory without constant CPU intervention.'],
    ['A 5-stage ideal pipeline executes 10 instructions in how many clock cycles?',['10','14','50','5'],1,'For a k-stage ideal pipeline executing n instructions, total clock cycles = k + n - 1 = 5 + 10 - 1 = 14 cycles.']
  ],
  flat:[
    ['A Deterministic Finite Automaton (DFA) has how many state transitions for each input symbol from any state?',['Zero transitions','Exactly one deterministic transition','At least two transitions','Infinitely many'],1,'By mathematical definition, the transition function of a DFA maps (State, Symbol) -> exactly one unique next state.'],
    ['Which computational model is formally capable of recognizing Context-Free Languages (CFL)?',['Finite Automaton','Pushdown Automaton (PDA)','Only a DFA','A combinational logic gate'],1,'A Pushdown Automaton (PDA) incorporates a stack memory, granting it the power to recognize context-free languages.'],
    ['The Pumping Lemma for regular languages is mathematically used to prove that a language is…',['Non-regular','Always regular','Finite in size','Decidable only'],0,'The pumping lemma gives a necessary property of regular languages; showing a language violates this property proves it is non-regular.'],
    ['Which regular expression operator denotes zero or more repetitions of a symbol or string?',['a+','a*','ab','a?b'],1,'The Kleene Star (*) operator represents zero or more repetitions of the operand.'],
    ['A standard Turing Machine features…',['A finite input buffer only','An infinite/unbounded read-write tape','No internal states','No transition function'],1,'A Turing Machine model features an unbounded tape divided into cells and a bidirectional read/write tape head.'],
    ['Which fundamental problem is undecidable in automata theory?',['DFA membership problem','DFA emptiness problem','General Turing Machine halting problem','Sorting an array of integers'],2,'Alan Turing proved in 1936 that no universal algorithm can decide whether an arbitrary Turing machine will halt on a given input.']
  ],
  dbms:[
    ['Which SQL clause is used to filter aggregated group results produced by GROUP BY?',['WHERE','ORDER BY','HAVING','SELECT'],2,'HAVING filters summary rows after aggregation, whereas WHERE filters individual rows before grouping.'],
    ['A Candidate Key in the relational model must be…',['A minimal superkey','Always a single numeric column','A foreign key','Non-unique'],0,'A candidate key is a minimal superkey capable of uniquely distinguishing every tuple in a relation.'],
    ['Which ACID property ensures all operations in a transaction complete successfully or none take effect?',['Consistency','Isolation','Durability','Atomicity'],3,'Atomicity enforces all-or-nothing execution of a database transaction.'],
    ['A Foreign Key establishes…',['A referential integrity relationship with a candidate key','A sorting algorithm','A physical disk pointer','A view only'],0,'Foreign keys reference primary/candidate keys of another relation to enforce referential integrity.'],
    ['Which normal form eliminates partial functional dependency of non-prime attributes on a composite key?',['1NF','2NF','4NF','None'],1,'2NF (Second Normal Form) mandates that all non-prime attributes are fully functionally dependent on every candidate key.'],
    ['In a B+ Tree index, actual data records or data pointers are stored in…',['Leaf nodes only','Root node only','Internal nodes only','Every node evenly'],0,'Unlike standard B-Trees, B+ Trees store all actual record pointers at the linked leaf level, optimizing sequential range searches.']
  ],
  daa:[
    ['Binary Search on sorted input has a worst-case time complexity of…',['O(n)','O(log n)','O(n²)','O(n log n)'],1,'Binary search halves the search space at each iteration, resulting in O(log n) running time.'],
    ['Merge Sort worst-case running time complexity is…',['O(n²)','O(log n)','O(n log n)','O(1)'],2,'Merge sort divides the list into log n levels with linear O(n) merging work per level, guaranteeing O(n log n) time.'],
    ['Which graph traversal discovers unweighted shortest paths from a source vertex?',['DFS','BFS','Inorder','Postorder'],1,'Breadth-First Search (BFS) explores vertices in order of increasing distance, guaranteeing shortest paths on unweighted graphs.'],
    ['Dijkstra’s algorithm for single-source shortest path requires all edge weights to be…',['Negative','Non-negative','Identical integers','Prime numbers'],1,'Dijkstra’s greedy approach assumes edge weights are non-negative; negative edge weights require the Bellman-Ford algorithm.'],
    ['Dynamic Programming is most effective when a problem exhibits…',['Overlapping subproblems and optimal substructure','No subproblems at all','Only tree topologies','Sorted input data'],0,'Dynamic programming solves overlapping subproblems once and stores their solutions in a table (memoization/tabulation).'],
    ['A computational problem in Class NP has candidate solutions that can be verified in…',['Polynomial time','Constant space only','Infinite time','Exponential time only'],0,'Class NP consists of decision problems whose candidate certificates can be validated in polynomial time.']
  ],
  etc:[
    ['Effective technical communication prioritizes…',['Ambiguity and verbosity','Clarity, conciseness, and accuracy','Jargon without explanation','Lengthy sentences'],1,'Technical writing serves the reader by conveying precise information clearly, concisely, and objectively.'],
    ['A professional email subject line should be…',['Blank','Specific, concise, and informative','Completely unrelated','Always humorous'],1,'A specific subject line informs the recipient of the email’s purpose and urgency before opening.'],
    ['An executive summary in an engineering report presents…',['Only bibliographical references','Key findings, conclusions, and recommendations','Unedited raw laboratory data','Company history only'],1,'The executive summary condenses essential objectives, methodology, key findings, and action recommendations.'],
    ['Active listening in professional engineering settings involves…',['Interrupting the speaker frequently','Paraphrasing to confirm mutual understanding','Ignoring feedback from team members','Planning an argument while the speaker speaks'],1,'Active listening requires focused attention and paraphrasing to verify that the speaker’s message was accurately understood.'],
    ['An engineering resume should primarily highlight…',['Fabricated achievements','Relevant technical skills, projects, and evidence','Hobbies and trivia only','Unverified claims'],1,'A technical resume must provide verifiable evidence of relevant skills, coursework, and technical projects.'],
    ['Ethical engineering writing demands…',['Plagiarism and uncredited copying','Accurate citations and intellectual property attribution','Concealing data sources','Fabricating experimental figures'],1,'Professional ethics mandate honest attribution of all sources, data, and intellectual property.']
  ]
};

export function quizQuestions(subject){
  return (qs[subject]||[]).map(([text,options,answer,explanation],i)=>({
    id:`${subject}-q-${i+1}`,
    text,
    options,
    answer,
    explanation,
    unit:i+1
  }));
}

export function pyqs(subject){
  return pyqData[subject] || [];
}

export const allTopics=subjects.flatMap(s=>s.units.flatMap(u=>u.topics));
