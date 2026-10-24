// BEU Exam Dost — Official B.Tech CSE 4th Semester Syllabus & Verified PYQ Data Bank
import { writtenQuestionsBySubject, cnSolutions } from './solutions/index.js';
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

// Written questions are loaded from compiled modules via writtenQuestionsBySubject

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
    "2025": [
      [
            "Which addressing mode is best suited to access elements of an array of contiguous memory locations?",
            [
                  "Indexed addressing mode",
                  "Relative address mode",
                  "Immediate addressing mode",
                  "Displacement mode"
            ],
            0,
            "Indexed addressing mode computes Effective Address = Base Address + (Index Register × Scale), making it ideal for stepping through contiguous array elements.",
            1
      ],
      [
            "In ______ method, the word is written to the block in both the cache and main memory, in parallel.",
            [
                  "Write through",
                  "Write back",
                  "Write protected",
                  "Direct mapping"
            ],
            0,
            "Write-through cache policy updates both cache memory and primary main memory simultaneously on every write operation to maintain strict coherence.",
            3
      ],
      [
            "How many 32K × 1 RAM chips are needed to provide a memory capacity of 256K bytes?",
            [
                  "8",
                  "32",
                  "64",
                  "128"
            ],
            2,
            "Total capacity needed = 256K bytes = 256K × 8 bits = 2048K bits. Capacity of one chip = 32K × 1 bit = 32K bits. Number of chips = 2048K / 32K = 64 chips.",
            3
      ],
      [
            "The device which is used to connect a peripheral to bus is known as:",
            [
                  "Control register",
                  "Communication protocol",
                  "Interface",
                  "None of these"
            ],
            2,
            "An I/O Interface (or controller) synchronizes data transfer and bridges electrical/logical protocol differences between peripheral devices and the system bus.",
            4
      ],
      [
            "Array processors are put in which one of the following categories?",
            [
                  "SISD",
                  "MISD",
                  "SIMD",
                  "MIMD"
            ],
            2,
            "Array (vector) processors execute a Single Instruction across Multiple Data streams simultaneously in parallel, categorizing them as SIMD under Flynn's classification.",
            6
      ],
      [
            "Which of the following holds data and instructions temporarily until the CPU needs it?",
            [
                  "ROM",
                  "Control Unit",
                  "Main memory",
                  "Coprocessor chip"
            ],
            2,
            "Main memory (RAM) holds executing program instructions and active operational data loaded from secondary storage until requested by CPU registers.",
            1
      ],
      [
            "The number of cycles required to complete n tasks in a k-stage pipeline is:",
            [
                  "k + n − 1",
                  "k + n + 1",
                  "nk − 1",
                  "None of these"
            ],
            0,
            "The first task requires k cycles to fill all stages. Each of the remaining (n - 1) tasks completes at the rate of 1 task per cycle under ideal conditions, totaling k + n - 1 cycles.",
            5
      ],
      [
            "A micro-programmed control unit:",
            [
                  "Is faster than hard-wired control unit",
                  "Facilitates easy implementation of new instructions",
                  "Is useful when every small control program is to be run",
                  "Usually refers to the control unit of microprocessors"
            ],
            1,
            "Microprogrammed control stores control signals as microcode in control memory, making instruction set extensions and architectural modifications straightforward without rewiring logic gates.",
            3
      ],
      [
            "Which type of data hazard is not possible?",
            [
                  "WAR",
                  "RAR",
                  "RAW",
                  "WAW"
            ],
            1,
            "Read After Read (RAR) is not a hazard because concurrent read operations do not modify register contents or cause data inconsistency.",
            5
      ],
      [
            "A direct mapped cache memory with n blocks is nothing but which of the following set associative cache memory organization?",
            [
                  "0-way set associative",
                  "2-way set associative",
                  "1-way set associative",
                  "n-way set associative"
            ],
            2,
            "In direct mapping, each set consists of exactly 1 cache line (block), making direct-mapped cache mathematically identical to a 1-way set-associative cache.",
            3
      ]
],
    "2024": [
      [
            "What is the first step in the instruction execution cycle?",
            [
                  "Decode",
                  "Execute",
                  "Fetch",
                  "Store"
            ],
            2,
            "The CPU instruction execution cycle begins by fetching the instruction pointed to by the Program Counter (PC) from memory into the Instruction Register (IR).",
            1
      ],
      [
            "What is the advantage of carry look-ahead adders over ripple carry adders?",
            [
                  "Simplicity in design",
                  "Increased latency",
                  "Reduced power consumption",
                  "Faster addition by reducing carry propagation delay"
            ],
            3,
            "Carry Look-Ahead (CLA) adders compute carry bits concurrently in parallel using generate (G) and propagate (P) logic functions, eliminating the O(n) ripple carry propagation delay.",
            2
      ],
      [
            "Which type of control unit is faster but more difficult to modify?",
            [
                  "Hardwired control unit",
                  "Microprogrammed control unit",
                  "Cache control unit",
                  "Memory management unit"
            ],
            0,
            "Hardwired control units generate signals via fixed combinational logic circuits, achieving superior execution speed but requiring physical circuit redesign for modifications.",
            3
      ],
      [
            "Which I/O method involves the CPU polling the device until data is ready?",
            [
                  "DMA",
                  "Program-controlled I/O",
                  "Interrupt-driven I/O",
                  "Asynchronous I/O"
            ],
            1,
            "In programmed (polled) I/O, the processor repeatedly checks the status flag of an I/O device in a loop until it indicates readiness, wasting CPU cycles.",
            4
      ],
      [
            "What does a branch prediction mechanism in a CPU help reduce?",
            [
                  "Data hazards",
                  "Control hazards",
                  "Structural hazards",
                  "Cache delay"
            ],
            1,
            "Branch prediction anticipates branch outcomes before condition evaluation completes, avoiding pipeline stalls and speculative flush penalties that cause control hazards.",
            5
      ],
      [
            "Which is NOT a type of parallel processor architecture in Flynn's classification?",
            [
                  "SIMD",
                  "SISD",
                  "SIMO",
                  "Multi-core"
            ],
            2,
            "Flynn's classic taxonomy defines SISD, SIMD, MISD, and MIMD. SIMO (Single Instruction Multiple Output) is not a standard architectural category.",
            6
      ],
      [
            "Which cache replacement algorithm removes the least recently used block?",
            [
                  "FIFO",
                  "LRU",
                  "LFU",
                  "Random replacement"
            ],
            1,
            "The Least Recently Used (LRU) algorithm tracks access recency and replaces the cache block that has gone unreferenced for the longest time interval.",
            6
      ],
      [
            "Which technique is used to handle data hazards in pipelining?",
            [
                  "Increasing memory size",
                  "Parallel processing",
                  "Instruction scheduling",
                  "Increasing clock speed"
            ],
            2,
            "Compiler instruction scheduling (reordering independent instructions) and hardware operand forwarding fill hazard slots and eliminate pipeline stalls.",
            5
      ],
      [
            "Which addressing mode directly specifies the operand within the instruction?",
            [
                  "Direct addressing",
                  "Immediate addressing",
                  "Indirect addressing",
                  "Indexed addressing"
            ],
            1,
            "In immediate addressing mode, the actual numerical operand value is encoded directly inside the instruction's address field.",
            1
      ],
      [
            "A computer with 32-bit-wide data bus uses 1K × 8 static RAM chips. What is the smallest memory capacity this computer can have?",
            [
                  "32K bits (4K bytes)",
                  "8K bytes",
                  "16K bytes",
                  "24K bytes"
            ],
            0,
            "With a 32-bit data bus, each memory access must provide 32 bits. Using 8-bit chips, at least 32 / 8 = 4 chips must be accessed in parallel per bank, giving 4 × 1K = 4K bytes (32K bits).",
            3
      ]
],
    "2023": [
      [
            "A pipeline stage:",
            [
                  "Is sequential circuit",
                  "Is combination circuit",
                  "Consists of both sequential and combinational circuit",
                  "None of these"
            ],
            2,
            "A pipeline stage consists of combinational processing logic bounded by sequential synchronizing buffer latches/registers.",
            5
      ],
      [
            "A direct mapped cache with n blocks is equivalent to which set associative organization?",
            [
                  "0-way",
                  "1-way",
                  "2-way",
                  "n-way"
            ],
            1,
            "Direct-mapped cache has 1 block per set, making it functionally equivalent to 1-way set-associative cache.",
            3
      ],
      [
            "The performance of a pipelined processor suffers if:",
            [
                  "Pipeline stages have different delays",
                  "Consecutive instructions are dependent",
                  "Pipeline stages share hardware resources",
                  "All of these"
            ],
            3,
            "Unbalanced stage delays, operand data dependencies, and shared resource contention (structural hazards) all cause pipeline stalls.",
            5
      ],
      [
            "A computer with cache access time 100 ns, main memory access time 1000 ns, and hit ratio 0.9 produces access time of:",
            [
                  "250 ns",
                  "200 ns",
                  "190 ns",
                  "None of these"
            ],
            1,
            "In standard hierarchical access: T_avg = Hit Time + (Miss Rate × Miss Penalty) = 100 ns + (0.1 × 1000 ns) = 100 + 100 = 200 ns.",
            3
      ],
      [
            "Which of the following processor classifications has no practical modern usage?",
            [
                  "SISD",
                  "SIMD",
                  "MISD",
                  "MIMD"
            ],
            2,
            "MISD (Multiple Instruction, Single Data) has virtually no commercial practical applications, except specialized fault-tolerant voting systems.",
            6
      ],
      [
            "A micro programmed control unit:",
            [
                  "Is faster than hardwired control",
                  "Facilitates easy implementation of new instructions",
                  "Is useful when every small program is to be run",
                  "Usually refers to microprocessor control"
            ],
            1,
            "Microprogramming allows designers to add new or complex instructions simply by updating control store microcode routines.",
            3
      ],
      [
            "In memory-mapped I/O:",
            [
                  "I/O devices and memory share address space",
                  "I/O devices have separate address space",
                  "Memory and I/O have separate instruction sets",
                  "A part of memory is specified for data transfer to I/O"
            ],
            0,
            "Memory-mapped I/O assigns peripheral device registers into the standard unified physical memory address space.",
            4
      ],
      [
            "How many 128K × 8 RAM chips are needed to design 32K × 32 RAM?",
            [
                  "4",
                  "8",
                  "16",
                  "32"
            ],
            0,
            "Total bits required = 32K × 32 = 1024K bits. A 128K × 8 chip provides 1024K bits. To achieve 32-bit word width, 4 chips of 8 bits each are arranged in parallel (with address decoding).",
            3
      ],
      [
            "The stalling of the processor due to unavailability of the instruction is called:",
            [
                  "Control hazard",
                  "Structural hazard",
                  "Input hazard",
                  "None of the above"
            ],
            0,
            "Control hazards (branch hazards) occur when the pipeline cannot immediately determine the address of the next instruction to fetch due to conditional jumps.",
            5
      ],
      [
            "The addressing mode where you directly specify the operand value is:",
            [
                  "Immediate",
                  "Direct",
                  "Definite",
                  "Relative"
            ],
            0,
            "In immediate addressing mode, the operand operand constant is embedded directly in the instruction text.",
            1
      ]
],
    "2022": [
      [
            "The 8-bit encoding format used to store data in a computer is:",
            [
                  "ASCII",
                  "EBCDIC",
                  "ANCI",
                  "USCII"
            ],
            1,
            "Extended Binary Coded Decimal Interchange Code (EBCDIC) is an 8-bit character encoding system developed by IBM.",
            2
      ],
      [
            "The bus used to connect the monitor and graphics card to the CPU is:",
            [
                  "PCI bus",
                  "SCSI bus",
                  "Memory bus",
                  "RAM bus"
            ],
            0,
            "Peripheral Component Interconnect (PCI / PCIe) is the standard high-bandwidth expansion bus for connecting display adapters and peripherals.",
            4
      ],
      [
            "The alternate way of writing the instruction ADD #5, R1 is:",
            [
                  "ADD (5),[R1]",
                  "ADD 5,R1",
                  "ADDIME 5,[R1]",
                  "There is no other way"
            ],
            1,
            "The prefix # signifies immediate data 5; many assemblers represent this as ADD 5, R1 or explicit immediate opcodes.",
            1
      ],
      [
            "The instruction fetch phase ends with:",
            [
                  "Placing data from MAR into MDR",
                  "Placing address of data into MAR",
                  "Completing execution and storing address in MAR",
                  "Decoding data in MDR and placing it in IR"
            ],
            3,
            "Fetch retrieves the instruction word from memory into the MDR (Memory Data Register) and transfers it into the IR (Instruction Register) for decoding.",
            1
      ],
      [
            "For converting a virtual address into a physical address, programs are divided into:",
            [
                  "Pages",
                  "Frames",
                  "Segments",
                  "Blocks"
            ],
            0,
            "Virtual memory divides program address spaces into fixed-size logical units called Pages, which map to physical memory Frames.",
            3
      ],
      [
            "The transfer of large chunks of data with minimal involvement of the processor is done by:",
            [
                  "DMA controller",
                  "Arbitrator",
                  "User system programs",
                  "None of the above"
            ],
            0,
            "The Direct Memory Access (DMA) controller manages high-speed block data transfers directly to/from memory, freeing the CPU.",
            4
      ],
      [
            "The computer architecture aimed at reducing the time of execution of instructions is:",
            [
                  "CISC",
                  "RISC",
                  "ISA",
                  "ANNA"
            ],
            1,
            "Reduced Instruction Set Computer (RISC) architectures streamline instruction sets to execute simple, single-cycle instructions with high clock frequency.",
            1
      ],
      [
            "Which table stores addresses of interrupt-handling subroutines?",
            [
                  "Interrupt-vector table",
                  "Vector table",
                  "Symbol link table",
                  "None"
            ],
            0,
            "The Interrupt Vector Table (IVT) contains memory pointers to the entry points of all Interrupt Service Routines (ISRs).",
            4
      ],
      [
            "The situation wherein the data of operands are not available is called:",
            [
                  "Data hazard",
                  "Stack",
                  "Deadlock",
                  "Structural hazard"
            ],
            0,
            "A data hazard occurs when an instruction in the pipeline depends on the output of a preceding instruction that has not yet been written back.",
            5
      ],
      [
            "A standard DMA controller typically has how many primary internal registers?",
            [
                  "4",
                  "2",
                  "3",
                  "1"
            ],
            2,
            "A typical basic DMA controller features at least 3 primary registers: Address Register, Word Count Register, and Control/Status Register.",
            4
      ]
]
  },
  "flat": {
      "2022": [
          [
              "The language {aᵐbⁿcᵐ⁺ⁿ | m,n ≥ 1} is:",
              [
                  "Regular",
                  "Context-free but not regular",
                  "Context-sensitive but not context-free",
                  "Type-0 but not context-sensitive"
              ],
              1,
              "Rewriting as aᵐbⁿcⁿcᵐ, a PDA pushes 'a's, pushes 'b's, pops 'b's against the first n 'c's, and pops 'a's against the remaining m 'c's in LIFO order.",
              3
          ],
          [
              "Which of the following pairs have DIFFERENT expressive powers?",
              [
                  "DFA and NDFA",
                  "DPDA and NDPDA",
                  "Deterministic single-tape TM and nondeterministic single-tape TM",
                  "Single-tape TM and multi-tape TM"
              ],
              1,
              "DFA = NFA, single-tape TM = multi-tape TM = nondeterministic TM. However, DPDA recognizes DCFLs which is strictly less expressive than NPDA (CFLs).",
              3
          ],
          [
              "The logic of the pumping lemma is a good example of:",
              [
                  "Pigeon-hole principle",
                  "Divide-and-conquer technique",
                  "Recursion",
                  "Iteration"
              ],
              0,
              "Processing a string of length ≥ |Q| ensures some state repeats by the Pigeonhole Principle.",
              2
          ],
          [
              "If L1 and L2 are context-free languages, the set difference L1 − L2 is:",
              [
                  "Always context-free",
                  "Sometimes context-free",
                  "Never context-free",
                  "None of these"
              ],
              1,
              "Since CFLs are not closed under complementation or difference, L1 − L2 is context-free in some cases (e.g., L2 = ∅) but not in general.",
              3
          ],
          [
              "A parse tree is the acyclic graphical representation of:",
              [
                  "Binary tree",
                  "Octree",
                  "Parse tree derivation",
                  "None of the above"
              ],
              2,
              "A parse tree (or syntax tree) is an ordered tree representing the hierarchical syntactic structure of a string derived from a grammar.",
              3
          ],
          [
              "Which of the following pairs of regular expressions are equivalent?",
              [
                  "x* and x*x",
                  "1(01)* and (10)*1",
                  "x(xx)* and (xx)*x",
                  "All of the above"
              ],
              2,
              "Both x(xx)* and (xx)*x denote all odd-length strings of x: x, xxx, xxxxx, etc.",
              2
          ],
          [
              "The maximum number of states of a DFA converted from an NFA with n states is:",
              [
                  "n",
                  "n²",
                  "2ⁿ",
                  "None of these"
              ],
              2,
              "By subset construction, every DFA state corresponds to a subset of NFA states. A set of n elements has 2ⁿ subsets.",
              2
          ],
          [
              "For L = {aⁿᵏ | k > 0, n a positive integer constant}, the minimum number of DFA states needed is:",
              [
                  "k+1",
                  "n+1",
                  "2n+1",
                  "2k+1"
              ],
              1,
              "To recognize positive multiples of n (n, 2n, 3n...), the minimal DFA requires an initial non-accepting state plus a modulo-n ring (total n+1 states).",
              2
          ],
          [
              "A grammar with at most one non-terminal on the right-hand side of each production is a:",
              [
                  "Linear grammar",
                  "Linear bounded grammar",
                  "Regular grammar",
                  "None of the above"
              ],
              0,
              "A linear grammar allows at most one nonterminal on the right-hand side of any production rule (e.g., A → αBβ or A → α).",
              3
          ],
          [
              "Let N be an NFA with n states and M the minimized DFA with m states recognizing the same language. Which is necessarily true?",
              [
                  "m ≤ 2ⁿ",
                  "n ≤ m",
                  "M has one accept state",
                  "m = 2ⁿ"
              ],
              0,
              "Power set construction yields at most 2ⁿ states, and minimization cannot increase states, so m ≤ 2ⁿ is always guaranteed.",
              2
          ]
      ],
      "2023": [
          [
              "Let S be an infinite countable set. Then its power set P(S) will be:",
              [
                  "Countable",
                  "Not countable",
                  "Can't be determined",
                  "None of the above"
              ],
              1,
              "By Cantor's theorem, for any set S, |P(S)| > |S|. The power set of countably infinite set ℕ has cardinality 2^ℵ₀, which is uncountable.",
              6
          ],
          [
              "Assuming P ≠ NP, which of the following is true?",
              [
                  "NP-complete = NP",
                  "NP-complete ∩ P = ∅",
                  "NP-hard = NP",
                  "P = NP-complete"
              ],
              1,
              "If P ≠ NP, no NP-complete problem can be solvable in polynomial time, meaning NP-complete and P are mutually disjoint.",
              6
          ],
          [
              "Which of the following pairs of regular expressions is NOT equivalent?",
              [
                  "1(01)* and (10)*1",
                  "x(xx)* and (xx)*x",
                  "(ab)* and a*b*",
                  "x+ and x*x+"
              ],
              2,
              "(ab)* generates {ε, ab, abab, ...} where a's and b's strictly alternate, whereas a*b* generates strings like 'aab' and 'abb' where all a's precede all b's.",
              2
          ],
          [
              "The logic of the Pumping Lemma for regular languages is an application of:",
              [
                  "The pigeon-hole principle",
                  "The divide and conquer technique",
                  "Recursion",
                  "Iteration"
              ],
              0,
              "When a DFA with n states processes a string of length ≥ n, by the Pigeonhole Principle at least one state must be visited more than once, forming a cycle.",
              2
          ],
          [
              "A Pushdown Automaton behaves like a Turing Machine when the number of auxiliary stacks it has is:",
              [
                  "0",
                  "1 or more",
                  "2 or more",
                  "None of the above"
              ],
              2,
              "A two-stack PDA can simulate a Turing Machine tape: one stack stores tape cells to the left of the head, and the other stack stores tape cells to the right.",
              5
          ],
          [
              "The language recognizing capability of DPDA and NPDA is:",
              [
                  "Different",
                  "Same",
                  "Can't be decided",
                  "None of the above"
              ],
              0,
              "Deterministic PDAs recognize only Deterministic Context-Free Languages (DCFLs), which is a strict proper subset of the CFLs recognized by non-deterministic PDAs.",
              3
          ],
          [
              "If L is a recursive language, then will its complement be also recursive? It is a:",
              [
                  "Decidable problem",
                  "Un-decidable problem",
                  "Can't be said",
                  "None of the above"
              ],
              0,
              "Recursive languages are closed under complementation. Given a decider for L, swapping its accept and reject states yields a decider for its complement.",
              6
          ],
          [
              "If a language L and its complement are both recursively enumerable, then the language is:",
              [
                  "Regular",
                  "Context-free",
                  "Context-sensitive",
                  "Recursive"
              ],
              3,
              "By Post's Theorem, a language L is recursive (decidable) if and only if both L and L's complement are recursively enumerable.",
              6
          ],
          [
              "Context-Free Languages are NOT closed under:",
              [
                  "Union",
                  "Kleene star",
                  "Complementation",
                  "Product"
              ],
              2,
              "CFLs are closed under union, concatenation (product), and Kleene star, but are NOT closed under intersection or complementation.",
              3
          ],
          [
              "The intersection of a context-free language and a regular language (L_CFL ∩ L_REG) is:",
              [
                  "Need not be regular",
                  "Need not be context-free",
                  "Always context-free",
                  "None of the above"
              ],
              2,
              "CFLs are closed under intersection with regular languages: L_CFL ∩ L_REG is always a context-free language.",
              3
          ]
      ],
      "2024": [
          [
              "In the Chomsky hierarchy, which type of grammar corresponds to Regular languages?",
              [
                  "Type-0",
                  "Type-1",
                  "Type-2",
                  "Type-3"
              ],
              3,
              "Type-3 grammars are regular grammars (left-linear or right-linear) and generate exactly the class of regular languages.",
              1
          ],
          [
              "Which language is generated by the grammar S → aS | bS | ε?",
              [
                  "All strings over {a,b} ending with a",
                  "All strings over {a,b}",
                  "All strings over {a,b} starting with b",
                  "Only ε"
              ],
              1,
              "The productions permit prepending any sequence of 'a's and 'b's and terminating with ε, generating all possible strings in {a, b}*.",
              2
          ],
          [
              "The pumping lemma for regular languages is used to:",
              [
                  "Prove that a language is regular",
                  "Construct regular expressions",
                  "Minimize DFA",
                  "Prove a language is not regular"
              ],
              3,
              "Pumping lemma is a necessary condition for regularity; failure to satisfy it establishes via contradiction that a language is not regular.",
              2
          ],
          [
              "Which regular expression represents all strings containing an even number of a's (over alphabet {a})?",
              [
                  "(aa)*",
                  "a*",
                  "(a|b)*",
                  "a*b+"
              ],
              0,
              "Over alphabet {a}, (aa)* generates strings of 'a's with even lengths: ε, aa, aaaa, aaaaaa, etc.",
              2
          ],
          [
              "Which normal form is used to convert CFGs into a format suitable for parsing algorithms?",
              [
                  "Chomsky Normal Form",
                  "Greibach Normal Form",
                  "Both a and b",
                  "Pumping Form"
              ],
              2,
              "Both CNF (used in CYK dynamic programming parsing) and GNF (used in top-down predictive parsing) are standard normal forms for parsing.",
              3
          ],
          [
              "Ambiguity in a Context-Free Grammar means:",
              [
                  "CFG generates no string",
                  "CFG has more than one leftmost derivation for the same string",
                  "CFG produces infinite strings",
                  "Grammar has no terminal symbols"
              ],
              1,
              "A CFG is ambiguous if there exists at least one string in L(G) that has two or more distinct leftmost derivations (or parse trees).",
              3
          ],
          [
              "Which of the following is true for context-sensitive languages (CSL)?",
              [
                  "Closed under union",
                  "Closed under complement",
                  "Accepted by linear bounded automata",
                  "All of the above"
              ],
              3,
              "Context-sensitive languages are accepted by LBAs, and by the Immerman–Szelepcsényi theorem, are closed under union, intersection, concatenation, and complementation.",
              4
          ],
          [
              "Which of the following decision problems is undecidable?",
              [
                  "Whether a DFA accepts a string",
                  "Whether a Turing machine halts on all inputs",
                  "Whether a CFG generates a particular string",
                  "Whether two DFAs accept the same language"
              ],
              1,
              "Whether a Turing machine halts on all inputs is undecidable (a consequence of the Halting Problem and Rice's theorem).",
              6
          ],
          [
              "A language is said to be recursively enumerable if:",
              [
                  "There exists a TM that halts on every input",
                  "There exists a TM that accepts all strings and rejects all nonmembers",
                  "There exists a TM that accepts strings in the language and may loop on nonmembers",
                  "It can be expressed by regular expressions"
              ],
              2,
              "A Turing-recognizable (RE) language requires only that the TM halts in an accept state on valid strings; for non-members it may either halt in a reject state or loop indefinitely.",
              5
          ],
          [
              "Which language class is accepted by a Turing machine that always halts (a decider)?",
              [
                  "Regular",
                  "Context-Free",
                  "Recursive",
                  "Recursively Enumerable"
              ],
              2,
              "A recursive (or Turing-decidable) language is one for which there exists a total Turing machine that halts on every input.",
              5
          ]
      ],
      "2025": [
          [
              "Which of the following is the smallest unit in the definition of a formal language?",
              [
                  "Grammar",
                  "Alphabet",
                  "String",
                  "Production"
              ],
              1,
              "An alphabet (Σ) is a finite, non-empty set of basic symbols, which forms the fundamental building block from which strings and languages are defined.",
              1
          ],
          [
              "A language is defined formally as a:",
              [
                  "Set of alphabets",
                  "Set of strings over an alphabet",
                  "Set of grammars",
                  "Set of automata"
              ],
              1,
              "A formal language L over an alphabet Σ is defined as any subset of Σ* (the set of all possible finite strings formed from symbols in Σ).",
              1
          ],
          [
              "Which grammar type is the most powerful in the Chomsky hierarchy?",
              [
                  "Type-0",
                  "Type-1",
                  "Type-2",
                  "Type-3"
              ],
              0,
              "Type-0 grammars (unrestricted phrase-structure grammars) generate recursively enumerable languages and are recognized by Turing machines, making them the most expressive grammar class.",
              1
          ],
          [
              "Epsilon (ε) transitions are allowed in:",
              [
                  "DFA only",
                  "Both DFA and NFA",
                  "NFA only",
                  "None"
              ],
              2,
              "Standard DFAs strictly forbid spontaneous transitions without consuming an input symbol; ε-transitions are permitted in Nondeterministic Finite Automata (ε-NFA).",
              2
          ],
          [
              "Context-Free Grammars are equivalent in expressive power to:",
              [
                  "Finite Automata",
                  "Turing Machines",
                  "Linear Bounded Automata",
                  "Pushdown Automata"
              ],
              3,
              "Context-Free Grammars (CFGs, Type-2) and Nondeterministic Pushdown Automata (NPDA) recognize exactly the same class: Context-Free Languages (CFLs).",
              3
          ],
          [
              "The Pumping Lemma for Context-Free Languages is used to prove a language is:",
              [
                  "Not Context-Free",
                  "Regular",
                  "Decidable",
                  "Turing recognizable"
              ],
              0,
              "The pumping lemma for CFLs is a necessary condition for context-freeness; its primary application is proof by contradiction to demonstrate that a language is NOT context-free.",
              3
          ],
          [
              "Which of the following languages requires context sensitivity?",
              [
                  "aⁿbⁿ",
                  "aⁿbⁿcⁿ",
                  "(a+b)*",
                  "a*"
              ],
              1,
              "The language {aⁿbⁿcⁿ | n ≥ 1} requires matching three independent counts simultaneously, which cannot be handled by a single stack PDA and requires a Context-Sensitive Grammar / Linear Bounded Automaton.",
              4
          ],
          [
              "Recursively Enumerable languages are also called:",
              [
                  "Turing Recognizable",
                  "Turing Decidable",
                  "Regular",
                  "Context-Free"
              ],
              0,
              "A language is recursively enumerable (RE) if and only if there exists a Turing Machine that accepts every string in the language (it may loop on non-members), hence Turing-recognizable.",
              5
          ],
          [
              "The Halting Problem of Turing Machines is:",
              [
                  "Decidable",
                  "Undecidable",
                  "Context-Free",
                  "Regular"
              ],
              1,
              "Alan Turing proved in 1936 using diagonalization that no general algorithm can decide whether an arbitrary Turing machine halts on a given input.",
              6
          ],
          [
              "Which of the following is used to prove many undecidability results for language properties?",
              [
                  "Pumping Lemma",
                  "Rice's Theorem",
                  "Chomsky Normal Form",
                  "Subset Construction"
              ],
              1,
              "Rice's Theorem states that any non-trivial semantic property of the language recognized by a Turing machine is undecidable.",
              6
          ]
      ]
  },
  "dbms": {
      "2025": [
          [
              "Which statement is FALSE regarding relational database design?",
              [
                  "Every weak entity depends on a strong entity",
                  "A weak entity can have a partial key",
                  "Every many-to-many relationship becomes a separate relation",
                  "Every relation generated from ER always has a single candidate key"
              ],
              3,
              "Relations frequently have multiple candidate keys (e.g., roll number, registration number, and email).",
              1
          ],
          [
              "For relation R(A,B,C) with FDs = {A→B, B→A}, which statement is true?",
              [
                  "A and B both are candidate keys",
                  "Only A is key",
                  "Only B is key",
                  "Neither A nor B is key"
              ],
              3,
              "Attribute C does not appear on the RHS of any FD, so every candidate key must contain C. The candidate keys are AC and BC. Neither A nor B alone is a key.",
              2
          ],
          [
              "The relational algebra expression π_A(R) − π_A((π_A(R) × S) − R) is equivalent to:",
              [
                  "Selection",
                  "Join",
                  "Division",
                  "Projection"
              ],
              2,
              "This is the formal relational algebra formulation of the division operator R ÷ S using Cartesian product, projection, and set difference.",
              2
          ],
          [
              "Which query is best solved using the relational division operation?",
              [
                  "Find students enrolled in DBMS",
                  "Find students enrolled in all courses",
                  "Find students with marks >80",
                  "Find students from CSE"
              ],
              1,
              "Relational division corresponds to universal quantification ('for all'). Finding students enrolled in all courses divides Enrollment by Course.",
              2
          ],
          [
              "A relation is in Boyce-Codd Normal Form (BCNF) if:",
              [
                  "Every non-prime attribute depends on key",
                  "Every FD is trivial",
                  "Every determinant is a superkey",
                  "Every attribute is atomic"
              ],
              2,
              "BCNF strictly requires that for every non-trivial functional dependency X → Y, the determinant X must be a superkey.",
              2
          ],
          [
              "Suppose relation R(A,B,C) is decomposed into R1(A,B) and R2(B,C). The decomposition is lossless if:",
              [
                  "B→A or B→C",
                  "A→B",
                  "A→C",
                  "C→B"
              ],
              0,
              "A decomposition into R1 and R2 is lossless join if and only if R1 ∩ R2 (which is B) is a superkey of R1 (B→A) or of R2 (B→C).",
              2
          ],
          [
              "Compared with B-tree indexing, hashing is preferred when queries mainly involve:",
              [
                  "Range searches",
                  "Ordered traversal",
                  "Exact match search",
                  "Sorting"
              ],
              2,
              "Hash indexes provide expected O(1) time complexity for equality/point lookups (WHERE id = 101), but do not support range searches or ordered scans.",
              3
          ],
          [
              "For a B-tree of order m, every non-root internal node must have at least:",
              [
                  "m/2 children",
                  "[m/2] children",
                  "[m/2]−1 children",
                  "m−1 children"
              ],
              1,
              "In a B-tree of order m, every internal node except the root must contain at least ⌈m/2⌉ children.",
              3
          ],
          [
              "Consider the schedule: R1(X), R2(X), W1(X), W2(X). The schedule is:",
              [
                  "View serializable only",
                  "Conflict serializable",
                  "Not serializable",
                  "Recoverable"
              ],
              2,
              "R2(X) precedes W1(X) causing edge T2→T1. W1(X) precedes W2(X) causing edge T1→T2. The precedence graph has a cycle T1 ⇆ T2, so it is not serializable.",
              4
          ],
          [
              "Under strict two-phase locking (Strict 2PL):",
              [
                  "Exclusive locks are held until commit/abort",
                  "Deadlocks are impossible",
                  "Locks can be released anytime",
                  "Transactions become serial"
              ],
              0,
              "Strict 2PL requires all exclusive (X) locks acquired by a transaction to be held until the transaction finishes (commit or abort), preventing cascading rollbacks.",
              4
          ]
      ]
  },
  "daa": {},
  "etc": {
      "2023": [
          [
              "Which of the following is a key difference between writing for print and online media?",
              [
                  "Length of sentences",
                  "Use of visuals",
                  "Formatting styles",
                  "All of the above"
              ],
              3,
              "Online media requires scannable text, shorter sentences, hyperlinks, responsive visual hierarchy, and distinct formatting compared to formal print documents.",
              2
          ],
          [
              "What is the first step in the technical writing process?",
              [
                  "Editing",
                  "Research",
                  "Drafting",
                  "Proofreading"
              ],
              1,
              "Before planning, drafting, or editing, technical writers must conduct research to gather factual information, identify requirements, and understand the topic.",
              2
          ],
          [
              "Which phase of technical writing involves organizing information and creating a coherent structure?",
              [
                  "Planning",
                  "Drafting",
                  "Editing",
                  "Revising"
              ],
              0,
              "The planning phase involves defining audience, purpose, and scope, and organizing content into logical outlines and structural frameworks.",
              2
          ],
          [
              "Which one is a primary advantage of collaborative writing?",
              [
                  "Reduced creativity",
                  "Increased workload",
                  "Diverse perspectives",
                  "Limited resources"
              ],
              2,
              "Collaborative writing brings together interdisciplinary expertise, multiple viewpoints, and diverse perspectives for more comprehensive documentation.",
              4
          ],
          [
              "Which tool is commonly used for real-time collaborative writing?",
              [
                  "Word processor",
                  "Email",
                  "Spreadsheet",
                  "Social media"
              ],
              0,
              "Cloud word processors (such as Google Docs and Microsoft Word 365) enable simultaneous multi-author editing, commenting, and version tracking.",
              4
          ],
          [
              "Effective public speaking includes:",
              [
                  "Speaking quickly to save time",
                  "Using technical jargon",
                  "Maintaining eye contact",
                  "Ignoring audience reactions"
              ],
              2,
              "Maintaining eye contact engages listeners, conveys confidence, and allows the speaker to monitor and adjust to audience feedback.",
              4
          ],
          [
              "What is a useful technique for managing nervousness before a speech?",
              [
                  "Avoiding preparation",
                  "Drinking excessive caffeine",
                  "Deep breathing exercises",
                  "Memorizing the entire speech"
              ],
              2,
              "Deep breathing exercises stimulate the parasympathetic nervous system, lowering heart rate and controlling adrenaline prior to public speaking.",
              4
          ],
          [
              "What is the first step in effective career planning?",
              [
                  "Applying for jobs",
                  "Assessing skills and interests",
                  "Negotiating salary",
                  "Quitting current job"
              ],
              1,
              "Self-assessment of strengths, technical skills, interests, and professional values is the essential first step in career planning.",
              5
          ],
          [
              "Which step is crucial in complex problem-solving processes?",
              [
                  "Avoiding collaboration",
                  "Ignoring potential solutions",
                  "Defining the problem clearly",
                  "Rushing to conclusions"
              ],
              2,
              "A problem well-stated is half-solved; clearly defining constraints, root causes, and success criteria is the most crucial first step.",
              6
          ],
          [
              "What is the primary purpose of a business letter?",
              [
                  "Sharing personal experiences",
                  "Providing detailed analysis",
                  "Formal communication",
                  "Writing fictional stories"
              ],
              2,
              "Business letters serve as formal, official communications between organizations or with external clients and stakeholders.",
              3
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
        "Which register holds the address of the next instruction to be fetched?",
        [
            "MAR",
            "PC",
            "IR",
            "MDR"
        ],
        1,
        "The Program Counter (PC) holds the memory address of the next instruction waiting to be fetched from memory.",
        1
    ],
    [
        "Which addressing mode places the actual operand in the instruction?",
        [
            "Direct",
            "Indirect",
            "Immediate",
            "Indexed"
        ],
        2,
        "In immediate addressing mode, the actual numerical operand value is encoded directly inside the instruction's address field.",
        1
    ],
    [
        "If register R1 contains address 2000 and memory[2000] = 45, register-indirect addressing using R1 yields operand:",
        [
            "2000",
            "45",
            "R1",
            "2045"
        ],
        1,
        "In register-indirect addressing, R1 holds the memory pointer 2000; accessing memory at address 2000 yields operand value 45.",
        1
    ],
    [
        "An instruction has 8-bit opcode and 12-bit address field. Maximum number of distinct opcodes is:",
        [
            "8",
            "12",
            "256",
            "4096"
        ],
        2,
        "With 8 opcode bits, the maximum number of distinct operations that can be encoded is 2^8 = 256.",
        1
    ],
    [
        "Which operation is normally performed by the ALU?",
        [
            "Instruction fetching",
            "Integer addition",
            "Cache replacement",
            "DMA arbitration"
        ],
        1,
        "The Arithmetic Logic Unit (ALU) performs fundamental arithmetic operations (such as integer addition and subtraction) and bitwise logic.",
        1
    ],
    [
        "Which architecture is traditionally classified as CISC?",
        [
            "ARMv8-A",
            "RISC-V",
            "x86",
            "MIPS"
        ],
        2,
        "Intel/AMD x86 processors implement a Complex Instruction Set Computer (CISC) design with variable-length instructions and memory-operand operations.",
        1
    ],
    [
        "Which register normally contains the instruction currently being decoded?",
        [
            "IR",
            "PC",
            "MAR",
            "SP"
        ],
        0,
        "The Instruction Register (IR) holds the machine instruction word fetched from memory while the control unit decodes and executes it.",
        1
    ],
    [
        "An instruction contains an address field of 500; memory[500] = 900; memory[900] = 25. With memory-indirect addressing, the operand is:",
        [
            "500",
            "900",
            "25",
            "Cannot be determined"
        ],
        2,
        "Memory-indirect addressing looks up memory[500] to obtain effective address 900, and then fetches the operand at memory[900], which is 25.",
        1
    ],
    [
        "The 8-bit two's complement representation of −13 is:",
        [
            "00001101",
            "11110010",
            "11110011",
            "10001101"
        ],
        2,
        "+13 is 00001101. Its 1's complement is 11110010. Adding 1 gives 2's complement: 11110011.",
        2
    ],
    [
        "The range of signed 8-bit two's complement integers is:",
        [
            "−127 to +127",
            "−128 to +127",
            "0 to 255",
            "−256 to +255"
        ],
        1,
        "The range of an n-bit two's complement signed integer is -2^(n-1) to +2^(n-1) - 1. For n = 8: -128 to +127.",
        2
    ],
    [
        "In Booth multiplication, bit pair (Q0, Q−1) = (1, 0) means:",
        [
            "Add multiplicand",
            "Subtract multiplicand",
            "No arithmetic operation",
            "Clear accumulator"
        ],
        1,
        "In Booth's algorithm, transition 10 signifies the beginning of a block of 1s, which requires subtracting the multiplicand from accumulator A (A = A - M).",
        2
    ],
    [
        "In Booth multiplication, bit pair (Q0, Q−1) = (0, 1) means:",
        [
            "Add multiplicand",
            "Subtract multiplicand",
            "Stop",
            "Complement multiplier"
        ],
        0,
        "Transition 01 signifies the end of a block of 1s, requiring the addition of the multiplicand to accumulator A (A = A + M).",
        2
    ],
    [
        "In a 4-bit adder, generate and propagate for bit i are usually defined as:",
        [
            "Gi=Ai+Bi, Pi=AiBi",
            "Gi=AiBi, Pi=Ai⊕Bi",
            "Gi=Ai⊕Bi, Pi=Ci",
            "Gi=Ci, Pi=AiBi"
        ],
        1,
        "Carry generate Gi = Ai AND Bi (generates a carry regardless of carry-in); carry propagate Pi = Ai XOR Bi (propagates carry-in).",
        2
    ],
    [
        "In a carry-lookahead adder, C2 equals:",
        [
            "G1 + P1G0 + P1P0C0",
            "G0 + P0C0",
            "G1P1 + G0P0",
            "P1P0 only"
        ],
        0,
        "Expanding carry equations: C1 = G0 + P0C0; C2 = G1 + P1C1 = G1 + P1(G0 + P0C0) = G1 + P1G0 + P1P0C0.",
        2
    ],
    [
        "In IEEE 754 single precision, exponent field width is:",
        [
            "8 bits",
            "11 bits",
            "23 bits",
            "32 bits"
        ],
        0,
        "IEEE 754 single precision allocates 1 sign bit, 8 exponent bits, and 23 fraction/mantissa bits (total 32 bits).",
        2
    ],
    [
        "The exponent bias in IEEE 754 single precision is:",
        [
            "63",
            "127",
            "128",
            "1023"
        ],
        1,
        "With an 8-bit exponent, the bias constant is 2^(8-1) - 1 = 127.",
        2
    ],
    [
        "What is the 8-bit two's complement result of 01111111 + 00000001?",
        [
            "10000000 with signed overflow",
            "10000000 without overflow",
            "00000000",
            "01111110"
        ],
        0,
        "01111111 (+127) plus 00000001 (+1) yields 10000000 (-128 in two's complement). Adding two positive numbers produced a negative result, triggering signed overflow (V=1).",
        2
    ],
    [
        "How many 32K×1 RAM chips are needed for 256 KiB memory?",
        [
            "8",
            "32",
            "64",
            "128"
        ],
        2,
        "256 KiB = 256 × 8 = 2048 Kbits. Each chip is 32 Kbits. 2048 / 32 = 64 chips.",
        3
    ],
    [
        "How many 64K×8 chips are needed to build 256K×16 memory?",
        [
            "4",
            "6",
            "8",
            "16"
        ],
        2,
        "Row expansion = 256K / 64K = 4. Word width expansion = 16 / 8 = 2. Total chips = 4 × 2 = 8 chips.",
        3
    ],
    [
        "A 32-bit address system has 4 KiB cache blocks. Block offset bits required:",
        [
            "8",
            "10",
            "12",
            "16"
        ],
        2,
        "Block size = 4 KiB = 4096 bytes = 2^12 bytes. Therefore, 12 bits are needed for the byte offset within each cache line.",
        3
    ],
    [
        "A direct-mapped cache contains 64 lines. The cache line index requires:",
        [
            "4 bits",
            "6 bits",
            "8 bits",
            "12 bits"
        ],
        1,
        "Number of cache lines = 64 = 2^6. Hence 6 bits are required for the cache index.",
        3
    ],
    [
        "A 32-bit byte-addressed system has a 16 KiB direct-mapped cache with 64-byte blocks. Tag bits required:",
        [
            "12",
            "16",
            "18",
            "20"
        ],
        2,
        "Block offset = log2(64) = 6 bits. Number of cache lines = 16 KiB / 64 B = 256 lines = 2^8 (8 index bits). Tag bits = 32 - (8 + 6) = 18 bits.",
        3
    ],
    [
        "A cache has hit time 2 ns, miss rate 5%, miss penalty 80 ns. AMAT is:",
        [
            "2 ns",
            "4 ns",
            "6 ns",
            "82 ns"
        ],
        2,
        "Average Memory Access Time (AMAT) = Hit Time + (Miss Rate × Miss Penalty) = 2 ns + (0.05 × 80 ns) = 2 + 4 = 6 ns.",
        3
    ],
    [
        "A 4-way set associative cache contains 128 total lines. Number of sets:",
        [
            "16",
            "32",
            "64",
            "512"
        ],
        1,
        "Number of sets = Total lines / Associativity = 128 / 4 = 32 sets.",
        3
    ],
    [
        "Which cache write policy immediately updates main memory on every cache write?",
        [
            "Write-back",
            "Write-through",
            "Write-allocate",
            "No-write-allocate"
        ],
        1,
        "Write-through updates primary main memory simultaneously with every cache write, preventing stale data in memory.",
        3
    ],
    [
        "Which statement about microprogrammed control is correct?",
        [
            "Always faster than hardwired",
            "Control signals are generated using stored microinstructions",
            "Cannot implement complex instructions",
            "Uses no control memory"
        ],
        1,
        "Microprogrammed control units fetch sequential microinstructions from internal control ROM to generate control signals.",
        3
    ],
    [
        "Which method transfers large blocks between an I/O device and main memory with minimal CPU intervention?",
        [
            "Programmed I/O",
            "DMA",
            "Polling",
            "Register addressing"
        ],
        1,
        "Direct Memory Access (DMA) transfers large data blocks directly between peripheral controllers and memory, bypassing the CPU during transfer.",
        4
    ],
    [
        "In cycle stealing, a DMA controller:",
        [
            "Disables all interrupts",
            "Temporarily uses memory bus cycles",
            "Deletes cache contents",
            "Stops the system clock"
        ],
        1,
        "In cycle stealing, the DMA controller temporarily borrows one bus cycle from the CPU to transfer a word of data.",
        4
    ],
    [
        "A DMA transfer moves 4096 bytes at 1024 bytes/ms. Ideal transfer time is:",
        [
            "1 ms",
            "2 ms",
            "4 ms",
            "8 ms"
        ],
        2,
        "Transfer time = 4096 bytes / (1024 bytes/ms) = 4 ms.",
        4
    ],
    [
        "In memory-mapped I/O, peripheral registers:",
        [
            "Use the normal memory address space",
            "Require only special I/O addresses",
            "Cannot be accessed by CPU",
            "Are stored only in cache"
        ],
        0,
        "Memory-mapped I/O shares the unified physical address space between memory and peripheral registers, using standard load/store instructions.",
        4
    ],
    [
        "In interrupt-driven I/O, the CPU normally:",
        [
            "Polls continuously",
            "Responds to an interrupt when service is needed",
            "Cannot execute other tasks",
            "Transfers data only via DMA"
        ],
        1,
        "The CPU executes its regular program tasks uninterrupted until an external device raises an interrupt request line requiring service.",
        4
    ],
    [
        "A vectored interrupt provides:",
        [
            "An interrupt handler address or vector",
            "A faster CPU clock",
            "A cache tag",
            "A DMA byte count"
        ],
        0,
        "In vectored interrupts, the interrupting hardware supplies an interrupt vector pointing to the entry address of its Interrupt Service Routine (ISR).",
        4
    ],
    [
        "In a daisy-chain priority interrupt arrangement, highest priority usually belongs to:",
        [
            "Last device in chain",
            "First device in chain",
            "Device with most memory",
            "Device with slowest clock"
        ],
        1,
        "The first device closest to the CPU on the serial daisy chain intercepts the interrupt acknowledge signal first, giving it highest priority.",
        4
    ],
    [
        "Which is an example of a standard peripheral interface?",
        [
            "USB",
            "Booth encoding",
            "LRU",
            "RISC"
        ],
        0,
        "Universal Serial Bus (USB) is an industry-standard serial peripheral interface specification.",
        4
    ],
    [
        "An ideal k-stage pipeline completing n instructions requires how many clock cycles?",
        [
            "nk",
            "n+k−1",
            "n−k",
            "k/n"
        ],
        1,
        "Under ideal conditions without stalls, completing n instructions in a k-stage pipeline requires k + n - 1 clock cycles.",
        5
    ],
    [
        "A 5-stage pipeline executes 20 instructions with no stalls. Number of cycles:",
        [
            "20",
            "24",
            "25",
            "100"
        ],
        1,
        "Cycles = k + n - 1 = 5 + 20 - 1 = 24 clock cycles.",
        5
    ],
    [
        "A non-pipelined design needs 5 cycles per instruction. Ideal 5-stage pipeline completes 100 instructions in 104 cycles. Speedup approximately:",
        [
            "2.5",
            "4.81",
            "5.20",
            "10"
        ],
        1,
        "Unpipelined = 100 × 5 = 500 cycles. Pipelined = 104 cycles. Speedup = 500 / 104 ≈ 4.807 ≈ 4.81.",
        5
    ],
    [
        "A 4-stage pipeline has stage delays 100, 150, 120 and 130 ns and 10 ns latch overhead. Minimum clock period:",
        [
            "100 ns",
            "150 ns",
            "160 ns",
            "500 ns"
        ],
        2,
        "Clock period is governed by the longest stage delay plus latch setup time: max(100, 150, 120, 130) + 10 ns = 150 + 10 = 160 ns.",
        5
    ],
    [
        "Which hazard occurs when two pipeline stages need the same hardware resource simultaneously?",
        [
            "Data hazard",
            "Control hazard",
            "Structural hazard",
            "Arithmetic overflow"
        ],
        2,
        "A structural hazard occurs when conflicting resource demands (such as a single memory bus port) prevent concurrent execution.",
        5
    ],
    [
        "Which technique helps reduce branch-related control hazards?",
        [
            "Branch prediction",
            "Increasing memory address bits",
            "Changing ASCII encoding",
            "Write-through cache"
        ],
        0,
        "Branch prediction guesses conditional branch directions early, minimizing pipeline stall penalties.",
        5
    ],
    [
        "Which dependency is called a true data dependency?",
        [
            "WAR",
            "WAW",
            "RAW",
            "RAR"
        ],
        2,
        "Read-After-Write (RAW) represents a true data dependency where an instruction must wait for an operand produced by an earlier instruction.",
        5
    ],
    [
        "Which Flynn classification has one instruction stream operating on multiple data elements?",
        [
            "SISD",
            "SIMD",
            "MISD",
            "MIMD"
        ],
        1,
        "Single Instruction, Multiple Data (SIMD) processes multiple data points simultaneously using a single instruction stream.",
        5
    ],
    [
        "Amdahl's law: 80% of a program is parallelizable, using 4 processors. Ideal speedup:",
        [
            "2.0",
            "2.5",
            "4.0",
            "5.0"
        ],
        1,
        "Speedup = 1 / ((1 - 0.8) + 0.8 / 4) = 1 / (0.2 + 0.2) = 1 / 0.4 = 2.5.",
        5
    ],
    [
        "Which replacement algorithm evicts the least recently used cache line?",
        [
            "FIFO",
            "LRU",
            "Random",
            "Optimal"
        ],
        1,
        "The Least Recently Used (LRU) algorithm discards the cache line that has remained unaccessed for the greatest duration.",
        6
    ],
    [
        "A 2-way set associative cache has 16 sets. Total cache lines:",
        [
            "8",
            "16",
            "32",
            "64"
        ],
        2,
        "Total cache lines = Sets × Lines per set = 16 × 2 = 32 lines.",
        6
    ],
    [
        "A cache records 900 hits and 100 misses. Hit ratio:",
        [
            "80%",
            "85%",
            "90%",
            "95%"
        ],
        2,
        "Hit ratio = 900 / (900 + 100) = 900 / 1000 = 0.90 = 90%.",
        6
    ],
    [
        "Which Flynn classification uses multiple instruction streams and multiple data streams?",
        [
            "SISD",
            "SIMD",
            "MISD",
            "MIMD"
        ],
        3,
        "Multiple Instruction, Multiple Data (MIMD) systems execute independent instruction streams on different data sets concurrently.",
        6
    ],
    [
        "Cache coherence primarily addresses:",
        [
            "Consistency of shared cached data",
            "Binary subtraction",
            "Instruction decoding",
            "Character encoding"
        ],
        0,
        "Cache coherence protocols guarantee that all processors in a multiprocessor system observe a consistent, up-to-date view of shared memory.",
        6
    ],
    [
        "Which memory is generally volatile and commonly used as main system RAM?",
        [
            "ROM",
            "DRAM",
            "Flash",
            "Optical disc"
        ],
        1,
        "Dynamic Random Access Memory (DRAM) requires periodic refreshing and is volatile, serving as primary main system memory.",
        6
    ],
    [
        "Memory interleaving improves performance mainly by:",
        [
            "Removing the CPU",
            "Allowing overlapping access across memory banks",
            "Eliminating addressing",
            "Converting RAM into ROM"
        ],
        1,
        "Memory interleaving distributes successive words across independent memory banks, allowing overlapping memory accesses and higher throughput.",
        6
    ]
],
  "flat": [
      [
          "For alphabet Σ = {0,1}, which set represents Σ²?",
          [
              "{00,01,10,11}",
              "{0,1,00,11}",
              "{ε,0,1}",
              "All binary strings"
          ],
          0,
          "Σ² is the Cartesian product Σ × Σ, containing all strings of length exactly 2: {00, 01, 10, 11}.",
          1
      ],
      [
          "Which language class inclusion chain correctly depicts the Chomsky hierarchy?",
          [
              "Regular ⊊ CFL ⊊ CSL ⊊ RE",
              "RE ⊊ CSL ⊊ CFL ⊊ Regular",
              "CFL ⊊ Regular ⊊ RE ⊊ CSL",
              "CSL ⊊ Regular ⊊ CFL ⊊ RE"
          ],
          0,
          "In the Chomsky hierarchy: Type 3 (Regular) ⊊ Type 2 (Context-Free) ⊊ Type 1 (Context-Sensitive) ⊊ Type 0 (Recursively Enumerable).",
          1
      ],
      [
          "A Type-1 (Context-Sensitive) grammar is characterized by:",
          [
              "Only right-linear productions",
              "Noncontracting productions (|α| ≤ |β|), with a standard restricted exception for S→ε",
              "Only A→a productions",
              "Completely unrestricted productions"
          ],
          1,
          "Type-1 grammars require non-contracting productions where the length of the RHS is at least the length of the LHS (|α| ≤ |β|), with S→ε allowed if S does not appear on the RHS.",
          1
      ],
      [
          "A derivation in a grammar is called leftmost when:",
          [
              "The leftmost terminal is replaced",
              "The leftmost nonterminal is expanded at every step",
              "Only one production is used",
              "The rightmost nonterminal is expanded"
          ],
          1,
          "A leftmost derivation consistently replaces the leftmost variable (nonterminal) in the current sentential form at each step.",
          1
      ],
      [
          "Which of the following grammars is right-linear?",
          [
              "S→aA; A→bS | ε",
              "S→aSb | ε",
              "S→AB; A→a; B→b",
              "S→aSbS | ε"
          ],
          0,
          "A right-linear grammar has productions of the form A → wB or A → w, where w is a string of terminals and B is a nonterminal.",
          1
      ],
      [
          "Which statement about the empty string ε is correct?",
          [
              "ε is an alphabet symbol",
              "ε has length one",
              "ε is the empty string and |ε| = 0",
              "ε is always excluded from every language"
          ],
          2,
          "ε denotes the unique string containing zero symbols; its length is 0, and ε ∈ L whenever a language accepts the empty string.",
          1
      ],
      [
          "The language L = {aⁿbⁿ | n ≥ 0} belongs to which class?",
          [
              "Regular",
              "Context-free but not regular",
              "Context-sensitive but not context-free",
              "Not recursively enumerable"
          ],
          1,
          "{aⁿbⁿ | n ≥ 0} requires unbounded counting of matching symbols, which can be accomplished with a single stack (PDA) but not with finite memory (DFA).",
          1
      ],
      [
          "A formal grammar is defined as ambiguous if:",
          [
              "Its language is infinite",
              "Some string in its language has two distinct parse trees",
              "It contains ε-productions",
              "It contains more than one nonterminal"
          ],
          1,
          "Ambiguity in grammars means there exists at least one string with multiple distinct leftmost derivations or distinct parse trees.",
          1
      ],
      [
          "A complete DFA over alphabet {0,1} recognizing strings ending in 01 requires at least:",
          [
              "2 states",
              "3 states",
              "4 states",
              "5 states"
          ],
          1,
          "Three states are required: q0 (start/seen nothing or 1), q1 (seen 0), and q2 (seen 01, accept state).",
          2
      ],
      [
          "An ε-NFA has 5 states. Subset construction can produce a DFA with at most how many states?",
          [
              "5 states",
              "10 states",
              "25 states",
              "32 states"
          ],
          3,
          "The powerset of a 5-state set contains 2⁵ = 32 distinct subset combinations.",
          2
      ],
      [
          "Which regular expression denotes all binary strings containing exactly two 1s?",
          [
              "0*10*10*",
              "(0+1)*11(0+1)*",
              "1*01*01*",
              "0*11*0*"
          ],
          0,
          "0*10*10* guarantees exactly two occurrences of '1' with arbitrary numbers of '0's permitted before, between, and after them.",
          2
      ],
      [
          "Which of the following languages is NOT regular?",
          [
              "{0ⁿ1ⁿ | n ≥ 0}",
              "{w | w ends in 00}",
              "{w | number of 1s is even}",
              "{w | |w| is divisible by 3}"
          ],
          0,
          "{0ⁿ1ⁿ | n ≥ 0} cannot be recognized by any finite automaton because it requires unbounded memory to count 0s and 1s.",
          2
      ],
      [
          "For a language with Myhill–Nerode equivalence index 7, its minimal complete DFA has:",
          [
              "6 states",
              "7 states",
              "8 states",
              "14 states"
          ],
          1,
          "By the Myhill–Nerode theorem, the number of states in the minimal complete DFA equals the number of equivalence classes (index) of the language, which is 7.",
          2
      ],
      [
          "Which of the following operations preserves regularity?",
          [
              "Intersection",
              "Complement",
              "Reversal",
              "All three"
          ],
          3,
          "Regular languages are closed under union, intersection, complementation, reversal, concatenation, and Kleene star.",
          2
      ],
      [
          "A DFA with n states over an alphabet of k symbols has how many total transitions in its transition function δ: Q × Σ → Q?",
          [
              "n + k",
              "n · k",
              "2ⁿ",
              "nᵏ"
          ],
          1,
          "In a complete DFA, every state has exactly one outgoing transition for each of the k alphabet symbols, giving n × k total transitions.",
          2
      ],
      [
          "A regular language L is recognized by an NFA with 4 states. Its equivalent minimal DFA can have:",
          [
              "At most 4 states",
              "At most 8 states",
              "At most 16 states",
              "Exactly 16 states"
          ],
          2,
          "The powerset of 4 states contains 2⁴ = 16 states; therefore the minimal DFA has at most 16 states.",
          2
      ],
      [
          "Which statement represents the correct logical application of the pumping lemma for regular languages?",
          [
              "It proves every pumpable language is regular",
              "It proves nonregularity by contradicting a necessary condition",
              "It constructs the minimal DFA",
              "It proves context-freeness"
          ],
          1,
          "The pumping lemma is a necessary (not sufficient) property of regular languages; failure to satisfy it establishes nonregularity by contradiction.",
          2
      ],
      [
          "For the binary language of strings with an even number of 0s and an odd number of 1s, the minimal DFA requires:",
          [
              "2 states",
              "3 states",
              "4 states",
              "8 states"
          ],
          2,
          "The states track parity combinations: (even 0, even 1), (even 0, odd 1), (odd 0, even 1), and (odd 0, odd 1) — exactly 2 × 2 = 4 states.",
          2
      ],
      [
          "Which grammar generates the language {aⁿbⁿ | n ≥ 0}?",
          [
              "S → aSb | ε",
              "S → aS | bS | ε",
              "S → abS | a",
              "S → aSbS | a"
          ],
          0,
          "S → aSb | ε generates equal numbers of 'a's and 'b's in order, including ε for n = 0.",
          3
      ],
      [
          "A nondeterministic pushdown automaton (NPDA) recognizes exactly the class of:",
          [
              "Regular languages",
              "Context-free languages",
              "Context-sensitive languages",
              "Recursively enumerable languages only"
          ],
          1,
          "By equivalence theorems of automata theory, NPDAs recognize precisely the Context-Free Languages (CFLs).",
          3
      ],
      [
          "Which statement is true regarding deterministic vs nondeterministic pushdown automata?",
          [
              "DPDA and NPDA recognize identical language classes",
              "Every CFL is deterministic context-free",
              "DPDAs recognize a proper subclass of CFLs",
              "A PDA has no stack"
          ],
          2,
          "Deterministic CFLs (DCFLs) form a strict proper subset of Context-Free Languages; for example, even-length palindromes {ww^R} require nondeterminism.",
          3
      ],
      [
          "In Chomsky Normal Form (CNF), ordinary productions strictly have the form:",
          [
              "A → BC or A → a",
              "A → aB or A → ε",
              "A → aBC only",
              "A → BCD only"
          ],
          0,
          "In CNF, every production rule has either two nonterminals on the RHS (A → BC) or a single terminal (A → a).",
          3
      ],
      [
          "In Greibach Normal Form (GNF), productions generally have the form:",
          [
              "A → BC",
              "A → aα where α is a sequence of zero or more nonterminals",
              "A → ε only",
              "A → Ba"
          ],
          1,
          "GNF requires every production to begin with exactly one terminal symbol followed by a string of zero or more nonterminals (A → aα).",
          3
      ],
      [
          "Which problem is decidable for an arbitrary CFG G and string w?",
          [
              "Whether L(G) is inherently ambiguous",
              "Whether G is ambiguous",
              "Whether w belongs to L(G)",
              "Whether L(G) is regular"
          ],
          2,
          "The membership problem for CFGs (w ∈ L(G)) is decidable in O(n³) time using the Cocke–Younger–Kasami (CYK) dynamic programming algorithm.",
          3
      ],
      [
          "Which closure property does NOT hold for Context-Free Languages in general?",
          [
              "Union",
              "Concatenation",
              "Kleene star",
              "Intersection"
          ],
          3,
          "CFLs are closed under union, concatenation, and Kleene star, but are NOT closed under intersection or complementation.",
          3
      ],
      [
          "If L is a context-free language and R is a regular language, then L ∩ R is:",
          [
              "Always regular",
              "Always context-free",
              "Never context-free",
              "Always finite"
          ],
          1,
          "CFLs are closed under intersection with regular languages (proven via the cross-product construction of a PDA and a DFA).",
          3
      ],
      [
          "The language {aⁿbⁿcⁿ | n ≥ 0} belongs to which class?",
          [
              "Regular",
              "Context-free but not regular",
              "Context-sensitive but not context-free",
              "Not context-sensitive"
          ],
          2,
          "Pumping lemma for CFLs proves that {aⁿbⁿcⁿ | n ≥ 0} is not context-free; it is recognized by a Linear Bounded Automaton and is context-sensitive.",
          3
      ],
      [
          "A CFG has two distinct leftmost derivations for the same terminal string. The grammar is:",
          [
              "Deterministic",
              "Ambiguous",
              "Regular",
              "Unproductive"
          ],
          1,
          "By definition, a grammar is ambiguous if any string in its language has more than one leftmost derivation or distinct parse tree.",
          3
      ],
      [
          "A Linear Bounded Automaton (LBA) is a Turing machine whose usable tape is:",
          [
              "Constant size",
              "Bounded linearly in the input length (k · n)",
              "Always infinite",
              "Bounded logarithmically"
          ],
          1,
          "An LBA is a restricted Turing machine whose tape head cannot move beyond the portion of tape originally occupied by the input and endmarkers.",
          4
      ],
      [
          "Which language class is characterized and accepted by nondeterministic LBAs?",
          [
              "Regular",
              "Context-free",
              "Context-sensitive",
              "Recursively enumerable only"
          ],
          2,
          "Nondeterministic Linear Bounded Automata recognize precisely the class of Context-Sensitive Languages (CSL, Type-1).",
          4
      ],
      [
          "Context-sensitive languages are closed under which operations?",
          [
              "Union only",
              "Complement only",
              "Intersection only",
              "Union, intersection and complement"
          ],
          3,
          "By the Immerman–Szelepcsényi theorem (1987), context-sensitive languages are closed under complementation, as well as union, intersection, and concatenation.",
          4
      ],
      [
          "Which of the following languages is context-sensitive but NOT context-free?",
          [
              "{aⁿbⁿcⁿ | n ≥ 1}",
              "{aⁿbⁿ | n ≥ 0}",
              "a*b*",
              "{ε}"
          ],
          0,
          "{aⁿbⁿcⁿ | n ≥ 1} requires simultaneous matching of three independent counts, which exceeds single-stack PDA capabilities but is easily accepted by an LBA.",
          4
      ],
      [
          "Every context-sensitive language is guaranteed to be:",
          [
              "Regular",
              "Context-free",
              "Recursive (decidable)",
              "Undecidable"
          ],
          2,
          "Because LBAs have a finite number of tape configurations for any input of length n, an LBA simulator can always halt, making all CSLs decidable (recursive).",
          4
      ],
      [
          "For a noncontracting grammar production α → β (outside the standard S → ε rule), the length condition is:",
          [
              "|α| > |β|",
              "|α| ≤ |β|",
              "|α| = 0",
              "|β| = 0"
          ],
          1,
          "Noncontracting grammars require that the length of the right-hand side is greater than or equal to the left-hand side (|α| ≤ |β|).",
          4
      ],
      [
          "A standard deterministic single-tape TM and a multitape TM differ in:",
          [
              "Language recognition power",
              "Decidability power",
              "Efficiency, not computability",
              "Ability to represent symbols"
          ],
          2,
          "A single-tape TM can simulate any k-tape TM with at most a quadratic slowdown (time O(t²)); they recognize and decide the exact same class of languages.",
          5
      ],
      [
          "A language is Turing-recognizable (recursively enumerable) if a TM:",
          [
              "Halts on every input",
              "Accepts every member and may loop on nonmembers",
              "Rejects every input",
              "Uses only finite memory"
          ],
          1,
          "Turing recognizability requires halting in an accept state on valid strings; on invalid strings, the machine may either reject or loop indefinitely.",
          5
      ],
      [
          "A language is decidable (recursive) if there exists a Turing Machine that:",
          [
              "Accepts members and may loop on nonmembers",
              "Halts on every input and answers membership correctly",
              "Has exactly two states",
              "Has no reject state"
          ],
          1,
          "A Turing machine that halts on every input (a decider) decides the language.",
          5
      ],
      [
          "If language L and its complement are both Turing-recognizable, then L is:",
          [
              "Regular",
              "Context-free",
              "Decidable (recursive)",
              "Necessarily finite"
          ],
          2,
          "Post's Theorem states that a language L is decidable if and only if both L and its complement are Turing-recognizable (RE and co-RE).",
          5
      ],
      [
          "Which of the following languages is recursively enumerable (Turing-recognizable) but undecidable?",
          [
              "The set of valid DFA encodings",
              "The TM acceptance language A_TM",
              "{0ⁿ1ⁿ | n ≥ 0}",
              "All binary strings"
          ],
          1,
          "A_TM = {<M, w> | M is a TM and M accepts w} is Turing-recognizable via simulation on a Universal TM, but is undecidable by Turing's diagonalization proof.",
          5
      ],
      [
          "A Universal Turing Machine (UTM):",
          [
              "Recognizes only regular languages",
              "Simulates an arbitrary encoded TM on its encoded input",
              "Always halts",
              "Uses no tape"
          ],
          1,
          "A UTM takes an encoding of a Turing machine <M> and input w, and executes the exact transitions of M on w.",
          5
      ],
      [
          "Which statement about the Church–Turing thesis is correct?",
          [
              "It is a mathematical theorem proved from ZFC",
              "It identifies intuitive effective calculability with Turing machine computability",
              "It claims all computer programs halt",
              "It equates NP with P"
          ],
          1,
          "The Church–Turing thesis is a foundational hypothesis that any algorithmic computation that can be carried out by a human or computer can be performed by a Turing machine.",
          5
      ],
      [
          "Which of the following decision problems is decidable?",
          [
              "Whether an arbitrary TM halts on blank input",
              "Whether an arbitrary TM accepts every string",
              "Whether a given DFA accepts a given string (A_DFA)",
              "Whether two arbitrary TMs accept the same language"
          ],
          2,
          "A_DFA is decidable: simulate the DFA on the input string and check if it ends in an accept state.",
          5
      ],
      [
          "The Halting Problem HALT_TM is classified as:",
          [
              "Decidable",
              "Undecidable but Turing-recognizable",
              "Neither recognizable nor co-recognizable",
              "Regular"
          ],
          1,
          "HALT_TM is Turing-recognizable (simulate the TM; if it halts, accept), but is undecidable by reduction from A_TM.",
          6
      ],
      [
          "Rice's Theorem applies to which class of properties?",
          [
              "Any property of the source-code length",
              "Nontrivial semantic properties of TM-recognized languages",
              "The number of states in a TM",
              "Whether a string is accepted by a DFA"
          ],
          1,
          "Rice's Theorem states that every non-trivial property of the language recognized by a Turing machine is undecidable.",
          6
      ],
      [
          "Which property is NOT covered by Rice's theorem because it is a syntactic property of the machine rather than a language property?",
          [
              "Whether a TM's language is empty",
              "Whether a TM's language is finite",
              "Whether a TM has exactly 10 states",
              "Whether a TM's language is regular"
          ],
          2,
          "Counting states is an inspection of the Turing machine's description (syntax), not a property of the language it accepts (semantics).",
          6
      ],
      [
          "To prove that problem B is undecidable using a known undecidable problem A, one must establish a mapping reduction:",
          [
              "B ≤m A",
              "A ≤m B",
              "A is finite",
              "B is regular"
          ],
          1,
          "A reduction A ≤m B shows that if B were decidable, A would be decidable. Since A is known to be undecidable, B must also be undecidable.",
          6
      ],
      [
          "Which problem is undecidable for arbitrary Context-Free Grammars?",
          [
              "CFG membership (w ∈ L(G))",
              "CFG emptiness (L(G) = ∅)",
              "CFG finiteness (|L(G)| < ∞)",
              "CFG equivalence (L(G1) = L(G2))"
          ],
          3,
          "While CFG membership, emptiness, and finiteness are all decidable, CFG equivalence (L(G1) = L(G2)) and totality (L(G) = Σ*) are undecidable.",
          6
      ],
      [
          "Which problem is decidable for Deterministic Finite Automata?",
          [
              "Language equivalence (L(A) = L(B))",
              "Whether an arbitrary TM halts",
              "TM language emptiness",
              "Post Correspondence Problem"
          ],
          0,
          "DFA equivalence is decidable: construct the symmetric difference (A ∩ B') ∪ (A' ∩ B) and test for emptiness.",
          6
      ],
      [
          "The Post Correspondence Problem (PCP) is:",
          [
              "Always decidable by a DFA",
              "Undecidable in general",
              "A regular-language membership test",
              "Equivalent to DFA minimization"
          ],
          1,
          "Emil Post proved in 1946 that finding a matching sequence of dominoes in PCP is undecidable in general.",
          6
      ],
      [
          "Which relationship between decidable and recognizable languages is correct?",
          [
              "Every recognizable language is decidable",
              "Every decidable language is recognizable",
              "No infinite language is decidable",
              "Rice's theorem makes DFA membership undecidable"
          ],
          1,
          "Decidable languages are a strict subset of Turing-recognizable languages (Decidable ⊊ Recognizable).",
          6
      ]
  ],
  "dbms": [
      [
          "In an Entity-Relationship (ER) model, a weak entity is identified using:",
          [
              "Its partial key and owner's key",
              "Only its partial key",
              "Only a foreign key unrelated to its owner",
              "A multivalued attribute"
          ],
          0,
          "A weak entity possesses no independent primary key; it is uniquely identified by combining its discriminator (partial key) with the primary key of its identifying owner entity.",
          1
      ],
      [
          "A many-to-many (M:N) relationship between Student and Course is normally mapped to relational tables by:",
          [
              "A single foreign key in Student",
              "A single foreign key in Course",
              "A separate relation containing primary keys of both participating entities",
              "Two unrelated tables"
          ],
          2,
          "M:N relationships require an associative/junction table containing the foreign keys referencing both participating entity tables, which together form a composite primary key.",
          1
      ],
      [
          "A multivalued attribute Phone of Employee is best represented relationally by:",
          [
              "A comma-separated column",
              "A separate EmployeePhone relation referencing Employee ID",
              "A composite primary key in Employee only",
              "A view without stored data"
          ],
          1,
          "First normal form (1NF) forbids multivalued attributes in a single tuple; representing it requires a separate relation (EmployeeID, PhoneNumber).",
          1
      ],
      [
          "Which of the following represents a derived attribute?",
          [
              "Date of birth",
              "Age calculated from date of birth",
              "Employee ID",
              "Primary key"
          ],
          1,
          "A derived attribute can be computed dynamically from existing stored attributes (e.g. CurrentDate − DateOfBirth = Age).",
          1
      ],
      [
          "In an ISA specialization/generalization hierarchy, 'total participation' means:",
          [
              "Every superclass entity must belong to at least one subclass",
              "Each entity belongs to exactly one subclass",
              "Subclasses cannot overlap",
              "All subclass keys differ"
          ],
          0,
          "Total participation dictates that every entity instance in the superclass must be a member of at least one specialized subclass.",
          1
      ],
      [
          "Physical data independence means having the ability to modify:",
          [
              "The physical storage organization without altering the conceptual schema",
              "The conceptual schema without altering user views",
              "SQL data values without a transaction",
              "The application code whenever indexes change"
          ],
          0,
          "Physical data independence isolates conceptual schemas and application programs from changes made to physical file structures, access methods, or storage devices.",
          1
      ],
      [
          "A candidate key in relational database theory is defined as:",
          [
              "Any superkey, even with redundant attributes",
              "A minimal superkey",
              "Any attribute allowing NULL",
              "Always a single attribute"
          ],
          1,
          "A candidate key is a superkey from which no attribute can be removed without losing the uniqueness property (i.e. minimal superkey).",
          1
      ],
      [
          "For a relationship where every Department has many Employees, but each Employee belongs to exactly one Department, the relationship is:",
          [
              "1:1",
              "M:N",
              "1:N from Department to Employee",
              "N:1 from Department to Employee"
          ],
          2,
          "One department maps to multiple employees (1:N), and the foreign key is placed in the Employee table referencing Department.",
          1
      ],
      [
          "For relation R(A,B) = {(1,2), (1,3), (2,4)}, how many tuples are present in the projection π_A(R)?",
          [
              "1",
              "2",
              "3",
              "4"
          ],
          1,
          "In formal relational algebra, relations are mathematical sets. Projecting on A yields distinct values {1, 2}, which is exactly 2 tuples.",
          2
      ],
      [
          "If relation R contains 5 tuples (|R|=5) and S contains 4 tuples (|S|=4), with no join predicate, the Cartesian product |R × S| has:",
          [
              "9 tuples",
              "20 tuples",
              "5 tuples",
              "1 tuple"
          ],
          1,
          "The Cartesian product pairs every tuple of R with every tuple of S, producing 5 × 4 = 20 tuples.",
          2
      ],
      [
          "Which relational algebra operation naturally expresses 'Find students enrolled in every compulsory course'?",
          [
              "Union",
              "Selection",
              "Division",
              "Difference only"
          ],
          2,
          "The division operator (R ÷ S) expresses universal quantification ('for all' / 'every') in relational calculus.",
          2
      ],
      [
          "In SQL, what does SELECT COUNT(*) FROM T return for a table with values (5), (NULL), (5)?",
          [
              "1",
              "2",
              "3",
              "NULL"
          ],
          2,
          "COUNT(*) counts the total number of rows regardless of whether individual columns contain NULL values (total 3 rows).",
          2
      ],
      [
          "In SQL, what does SELECT COUNT(x) FROM T return for rows with column x values 5, NULL, 5?",
          [
              "1",
              "2",
              "3",
              "NULL"
          ],
          1,
          "Aggregate functions like COUNT(column_name) ignore NULL values, so only the two non-null values (5 and 5) are counted.",
          2
      ],
      [
          "In SQL, what does SELECT COUNT(DISTINCT x) FROM T return for column x values 5, NULL, 5, 7?",
          [
              "1",
              "2",
              "3",
              "4"
          ],
          1,
          "COUNT(DISTINCT x) eliminates duplicates and ignores NULL, leaving the unique values 5 and 7 (total 2).",
          2
      ],
      [
          "For rows (dept, salary) = (A,10), (A,20), (B,30), what does SELECT dept, SUM(salary) FROM T GROUP BY dept HAVING SUM(salary) > 25 return?",
          [
              "A only",
              "B only",
              "A and B",
              "No rows"
          ],
          2,
          "Group A has sum 10 + 20 = 30 > 25. Group B has sum 30 > 25. Both groups satisfy the HAVING condition.",
          2
      ],
      [
          "In SQL, evaluating the condition WHERE salary = NULL produces:",
          [
              "All rows with NULL salary",
              "All rows with non-NULL salary",
              "No rows where the predicate evaluates to TRUE",
              "A syntax error in all DBMSs"
          ],
          2,
          "In three-valued SQL logic, any comparison with NULL using = evaluates to UNKNOWN, which is treated as FALSE in WHERE clauses. Testing for NULL requires IS NULL.",
          2
      ],
      [
          "For tables A = {1, 2, 3} and B = {2, 3, 4}, the query SELECT x FROM A UNION SELECT x FROM B produces:",
          [
              "{1, 2, 2, 3, 3, 4}",
              "{2, 3}",
              "{1, 2, 3, 4}",
              "{1, 4}"
          ],
          2,
          "SQL UNION without ALL automatically eliminates duplicate rows, yielding {1, 2, 3, 4}.",
          2
      ],
      [
          "In a LEFT OUTER JOIN from Customers to Orders, when a customer has placed no orders, the result tuple contains:",
          [
              "No customer row",
              "The customer row with NULL values for all Orders columns",
              "A duplicate of every order",
              "An automatic error"
          ],
          1,
          "A LEFT OUTER JOIN preserves every tuple from the left table; unmatched right-side attributes are padded with NULLs.",
          2
      ],
      [
          "For relation R(A,B,C) with functional dependencies F = {A → B, B → C}, the attribute closure A⁺ is:",
          [
              "{A, B}",
              "{A, C}",
              "{A, B, C}",
              "{A}"
          ],
          2,
          "Starting with {A}: A → B gives {A,B}, and B → C gives {A,B,C}.",
          3
      ],
      [
          "For relation R(A,B,C) with FDs F = {A → B, B → A}, the candidate keys are:",
          [
              "A and B",
              "AC and BC",
              "AB only",
              "C only"
          ],
          1,
          "Attribute C does not appear on the RHS of any dependency, so C must be included in all candidate keys. Since A⁺ = {A,B} and B⁺ = {B,A}, AC⁺ = {A,B,C} and BC⁺ = {B,A,C}.",
          3
      ],
      [
          "Which normal form eliminates partial dependencies of non-prime attributes on a proper subset of any candidate key?",
          [
              "1NF",
              "2NF",
              "3NF",
              "BCNF"
          ],
          1,
          "Second Normal Form (2NF) requires 1NF and guarantees that no non-prime attribute is functionally dependent on a proper subset of any candidate key.",
          3
      ],
      [
          "For relation R(A,B,C) with dependencies A → B and B → C, where A is the only candidate key, which dependency violates 3NF?",
          [
              "A → B",
              "B → C",
              "A → C",
              "A → A"
          ],
          1,
          "In B → C, B is not a superkey and C is not a prime attribute, forming a transitive dependency that violates 3NF.",
          3
      ],
      [
          "Boyce-Codd Normal Form (BCNF) strictly requires that for every non-trivial functional dependency X → Y:",
          [
              "Y is prime",
              "X is a superkey",
              "X is a single attribute",
              "Y is a candidate key"
          ],
          1,
          "BCNF eliminates all transitive dependencies by mandating that every determinant X must be a superkey.",
          3
      ],
      [
          "A decomposition of R(A,B,C) into R1(A,B) and R2(B,C) is lossless join if and only if:",
          [
              "B → A or B → C",
              "A → C only",
              "A → B only",
              "C → A only"
          ],
          0,
          "Lossless join decomposition requires that R1 ∩ R2 (which is attribute B) functionally determines either (R1 − R2) or (R2 − R1).",
          3
      ],
      [
          "Which statement is true concerning BCNF decomposition?",
          [
              "It always preserves all functional dependencies",
              "It always loses information",
              "It can always achieve lossless join, but may not preserve all dependencies",
              "It requires every relation to have a single-attribute key"
          ],
          2,
          "A BCNF decomposition is always guaranteed to be lossless, but it may fail to be dependency preserving (unlike 3NF, which guarantees both).",
          3
      ],
      [
          "For relation R(A,B,C,D) with dependencies F = {A → B, B → C, C → D}, what is the candidate key?",
          [
              "B",
              "C",
              "D",
              "A"
          ],
          3,
          "A⁺ = {A, B, C, D}. Since no attribute determines A, A is the unique candidate key.",
          3
      ],
      [
          "A relation is in First Normal Form (1NF) when:",
          [
              "Every attribute value is atomic under the relational domain",
              "It contains no transitive dependencies",
              "Every determinant is a superkey",
              "It contains no foreign keys"
          ],
          0,
          "1NF requires that each column contains only atomic (indivisible) values and that there are no repeating groups.",
          3
      ],
      [
          "A B+ tree differs fundamentally from a standard B-tree because:",
          [
              "All data records/pointers are stored exclusively at the leaf level",
              "B+ trees cannot support range scans",
              "B+ trees use no index nodes",
              "B+ trees cannot split"
          ],
          0,
          "In a B+ tree, internal nodes store only search-key copies for routing, while all actual data records/pointers reside in leaf nodes.",
          4
      ],
      [
          "A B+ tree with sequentially linked leaf nodes is especially efficient for:",
          [
              "Range queries and ordered scans",
              "Only equality lookups",
              "Deadlock detection",
              "Log recovery"
          ],
          0,
          "Doubly or singly linked leaf nodes allow traversing sorted records directly without re-traversing the tree from root.",
          4
      ],
      [
          "A B-tree has a maximum of 5 children per internal node. What is the minimum number of children for a non-root internal node?",
          [
              "2",
              "3",
              "4",
              "5"
          ],
          1,
          "For a B-tree of order m = 5, every non-root internal node must contain at least ⌈m/2⌉ = ⌈5/2⌉ = 3 children.",
          4
      ],
      [
          "A B-tree node can have at most 6 children. What is the maximum number of keys such a node can store?",
          [
              "5",
              "6",
              "7",
              "12"
          ],
          0,
          "A node with k children contains exactly k − 1 keys; therefore, at most 6 − 1 = 5 keys.",
          4
      ],
      [
          "A hash index is generally most suitable for:",
          [
              "Exact equality lookups (WHERE id = 50)",
              "Sorted output (ORDER BY)",
              "Range scanning (WHERE age BETWEEN 20 AND 30)",
              "Finding the next greater key"
          ],
          0,
          "Hash indexing maps keys to buckets in expected O(1) time for exact match lookups, but destroys ordering required for range queries.",
          4
      ],
      [
          "In extendible hashing, the directory has global depth d = 4. How many directory entries are present?",
          [
              "4",
              "8",
              "16",
              "32"
          ],
          2,
          "An extendible hash directory of global depth d contains 2ᵈ entries: 2⁴ = 16 directory pointers.",
          4
      ],
      [
          "A dense index in database file organization has:",
          [
              "An index record for every search-key value in the data file",
              "Only one index record per disk block",
              "No pointers",
              "No entries for duplicate keys"
          ],
          0,
          "A dense index maintains an entry for every search-key value appearing in the file, enabling fast key lookups without accessing data blocks.",
          4
      ],
      [
          "Which condition causes a B+ tree node to split?",
          [
              "An insertion causes the node to exceed its maximum permitted key/pointer capacity",
              "The query uses ORDER BY",
              "A transaction commits",
              "A row is read twice"
          ],
          0,
          "When an insertion causes an internal or leaf node to overflow, the node splits in two and pushes a median key up to its parent.",
          4
      ],
      [
          "Which ACID property ensures that once a transaction commits, its modifications persist permanently even across power failures?",
          [
              "Atomicity",
              "Consistency",
              "Isolation",
              "Durability"
          ],
          3,
          "Durability guarantees that committed database updates survive crashes, power outages, and system failures using stable logs.",
          5
      ],
      [
          "In a precedence (serialization) graph, a transaction schedule is conflict-serializable if and only if:",
          [
              "Every node has degree 1",
              "The precedence graph is acyclic (contains no directed cycles)",
              "The graph has a cycle",
              "Every transaction performs a write"
          ],
          1,
          "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles, allowing topological sorting into an equivalent serial schedule.",
          5
      ],
      [
          "For the schedule W1(X), R2(X), W2(X), R1(Y), what is the directed edge in the precedence graph?",
          [
              "T2 → T1 only",
              "T1 → T2 only",
              "Both directions",
              "No edges"
          ],
          1,
          "W1(X) precedes R2(X) and W2(X), creating directed edge T1 → T2. No conflict exists on Y to create T2 → T1.",
          5
      ],
      [
          "Strict Two-Phase Locking (Strict 2PL) mandates that:",
          [
              "All exclusive (X) locks acquired by a transaction must be held until it commits or aborts",
              "Every lock must be released immediately after use",
              "Deadlocks are impossible",
              "Transactions acquire only shared locks"
          ],
          0,
          "Strict 2PL prevents cascading aborts and guarantees recoverability by holding all exclusive locks until transaction completion.",
          5
      ],
      [
          "A 'dirty read' (uncommitted dependency) anomaly occurs when:",
          [
              "Transaction T2 reads data written by T1 that has not yet been committed",
              "A transaction reads its own committed data",
              "A transaction uses an index",
              "A query sorts records"
          ],
          0,
          "If T1 updates a record and T2 reads it before T1 aborts, T2 has read an invalid, uncommitted state (dirty read).",
          5
      ],
      [
          "In deadlock detection, a cycle in a wait-for graph indicates:",
          [
              "A deadlock condition under single-resource lock models",
              "A successful commit",
              "A lossless decomposition",
              "A checkpoint"
          ],
          0,
          "In a wait-for graph where nodes represent active transactions and edges represent lock dependencies, a cycle indicates a circular wait (deadlock).",
          5
      ],
      [
          "The Write-Ahead Logging (WAL) protocol dictates that:",
          [
              "Log records describing an update must reach stable storage before the dirty data page reaches disk",
              "Data pages always reach disk before log records",
              "Logging occurs only after commit",
              "No undo information is saved"
          ],
          0,
          "WAL ensures atomicity and durability: undo and redo log records must be flushed to stable storage before uncommitted changes overwrite data on disk.",
          5
      ],
      [
          "A schedule where T2 reads a value updated by T1, and T2 commits before T1 commits, is classified as:",
          [
              "Recoverable",
              "Nonrecoverable",
              "Necessarily serial",
              "Necessarily strict"
          ],
          1,
          "If T1 subsequently aborts, T2 has already committed invalid data and cannot be rolled back, making the schedule nonrecoverable.",
          5
      ],
      [
          "Which SQL Data Control Language (DCL) statement is primarily used to grant database privileges to users?",
          [
              "GRANT",
              "COMMIT",
              "ROLLBACK",
              "GROUP BY"
          ],
          0,
          "The GRANT statement assigns SELECT, INSERT, UPDATE, DELETE, or administrative privileges to users and roles.",
          6
      ],
      [
          "The security principle of 'least privilege' recommends:",
          [
              "Giving users only the minimum permissions necessary to complete their job tasks",
              "Full database replication across all clients",
              "Using Strict 2PL for every query",
              "Physical data independence"
          ],
          0,
          "Least privilege minimizes vulnerability exposure by restricting each user and process strictly to required operations.",
          6
      ],
      [
          "SQL injection attacks are most effectively prevented by:",
          [
              "Using parameterized queries (prepared statements)",
              "Concatenating raw user inputs into SQL strings",
              "Disabling all indexes",
              "Using SELECT * everywhere"
          ],
          0,
          "Parameterized queries treat user input strictly as literal values rather than executable SQL code, neutralizing injection vulnerabilities.",
          6
      ],
      [
          "In distributed database design, horizontal fragmentation partitions a relation by:",
          [
              "Rows (tuples) satisfying specific selection predicates",
              "Columns (attributes)",
              "Index levels",
              "Log records"
          ],
          0,
          "Horizontal fragmentation splits a relation into subsets of tuples (rows) using selection conditions (e.g. branch = 'North').",
          6
      ],
      [
          "In distributed databases, vertical fragmentation partitions a relation primarily by:",
          [
              "Rows",
              "Subsets of attributes/columns (projected with the primary key)",
              "Transactions",
              "Storage sectors"
          ],
          1,
          "Vertical fragmentation divides attributes across sites, retaining the primary key in each fragment to permit reconstruction via join.",
          6
      ],
      [
          "The Two-Phase Commit (2PC) protocol is primarily designed to:",
          [
              "Ensure atomic commitment of a distributed transaction across multiple participating nodes",
              "Sort query result sets",
              "Split B+ tree leaf nodes",
              "Parse SQL queries"
          ],
          0,
          "2PC uses Prepare and Commit phases to coordinate distributed databases so that either all participant nodes commit or all abort.",
          6
      ],
      [
          "Document-oriented NoSQL databases (e.g., MongoDB, Couchbase) represent data primarily as:",
          [
              "JSON / BSON semi-structured documents",
              "Strictly rectangular relational tables with fixed schemas",
              "B-tree leaf pointers only",
              "SQL views only"
          ],
          0,
          "Document NoSQL databases store self-describing, nested, schema-flexible documents (typically JSON or BSON formats).",
          6
      ]
  ],
  "daa": [
      [
          "What is the tight asymptotic bound Θ of the function f(n) = 3n² + 10n log n + 7?",
          [
              "Θ(n log n)",
              "Θ(n²)",
              "Θ(n³)",
              "Θ(log n)"
          ],
          1,
          "The highest-order term is 3n², which dominates 10n log n and constant 7 as n approaches infinity; hence Θ(n²).",
          1
      ],
      [
          "Solve the recurrence T(n) = 2T(n/2) + n, with base case T(1) = Θ(1).",
          [
              "Θ(n)",
              "Θ(log n)",
              "Θ(n log n)",
              "Θ(n²)"
          ],
          2,
          "By the Master Theorem: a = 2, b = 2, f(n) = n. Since n^{log_b a} = n^1 = n = f(n), this is Case 2: T(n) = Θ(n log n).",
          1
      ],
      [
          "Solve the recurrence T(n) = T(n/2) + 1, with base case T(1) = Θ(1).",
          [
              "Θ(1)",
              "Θ(log n)",
              "Θ(n)",
              "Θ(n log n)"
          ],
          1,
          "This is the binary search recurrence: a = 1, b = 2, f(n) = 1. Since n^{log_2 1} = n^0 = 1 = f(n), T(n) = Θ(log n).",
          1
      ],
      [
          "Solve the recurrence T(n) = 3T(n/2) + n using the Master Theorem.",
          [
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n^{log₂3})",
              "Θ(n²)"
          ],
          2,
          "Here a = 3, b = 2, f(n) = n. n^{log_2 3} ≈ n^{1.585}. Since f(n) = O(n^{1.585 - ε}), Case 1 applies: T(n) = Θ(n^{log₂3}).",
          1
      ],
      [
          "What is the worst-case time complexity of binary search on a sorted array of n elements?",
          [
              "O(1)",
              "O(log n)",
              "O(n)",
              "O(n log n)"
          ],
          1,
          "Binary search halves the search space at each iteration, requiring at most ⌊log₂ n⌋ + 1 comparisons: O(log n).",
          1
      ],
      [
          "The arithmetic series sum 1 + 2 + 3 + ... + n has asymptotic growth rate:",
          [
              "Θ(log n)",
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n²)"
          ],
          3,
          "Sum = n(n + 1) / 2 = 0.5 n² + 0.5 n = Θ(n²).",
          1
      ],
      [
          "An algorithm executes an outer loop n times and an inner loop i times on iteration i (1 ≤ i ≤ n). What is the total operation count?",
          [
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n²)",
              "Θ(n³)"
          ],
          2,
          "Total operations = ∑_{i=1}^n i = n(n+1)/2 = Θ(n²).",
          1
      ],
      [
          "Which relationship always holds if f(n) = Θ(g(n)) for asymptotically positive functions?",
          [
              "f(n) = O(g(n)) and f(n) = Ω(g(n))",
              "f(n) = o(g(n))",
              "f(n) = ω(g(n))",
              "f(n) = g(n) exactly"
          ],
          0,
          "By definition, f(n) = Θ(g(n)) if and only if there exist positive constants c1, c2 such that c1 g(n) ≤ f(n) ≤ c2 g(n), meaning f(n) is both O(g(n)) and Ω(g(n)).",
          1
      ],
      [
          "Which sorting algorithm guarantees Θ(n log n) time complexity in the worst-case in its standard implementation?",
          [
              "Insertion sort",
              "Selection sort",
              "Merge sort",
              "Bubble sort"
          ],
          2,
          "Merge sort always divides the array into two halves and merges in linear time, yielding T(n) = 2T(n/2) + O(n) = Θ(n log n) in all cases.",
          2
      ],
      [
          "Standard Quicksort has what worst-case time complexity?",
          [
              "Θ(log n)",
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n²)"
          ],
          3,
          "When the pivot is consistently the smallest or largest element (e.g. already sorted array with first element as pivot), Quicksort degrades to Θ(n²).",
          2
      ],
      [
          "The expected (average-case) running time of randomized quicksort is:",
          [
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n²)",
              "Θ(log n)"
          ],
          1,
          "Randomizing pivot selection yields a balanced partition on average, guaranteeing expected running time of Θ(n log n) with high probability.",
          2
      ],
      [
          "Which of the following sorting algorithms is stable in its standard array implementation?",
          [
              "Heap sort",
              "Merge sort with stable merging",
              "Selection sort",
              "In-place quicksort"
          ],
          1,
          "Standard merge sort preserves the relative order of duplicate elements because ties during the merge step favor the left subarray.",
          2
      ],
      [
          "For an array of 1024 elements, binary search requires at most how many comparisons in the worst case?",
          [
              "9",
              "10",
              "11",
              "1024"
          ],
          2,
          "Maximum comparisons = ⌊log₂ 1024⌋ + 1 = 10 + 1 = 11.",
          2
      ],
      [
          "Which algorithm finds the kth smallest element in an unordered array in expected linear time Θ(n)?",
          [
              "Merge sort",
              "Randomized quickselect",
              "Floyd–Warshall",
              "Kruskal"
          ],
          1,
          "Randomized Quickselect recurses on only one partition instead of both, achieving expected running time T(n) = T(n/2) + O(n) = O(n).",
          2
      ],
      [
          "The worst-case time complexity for constructing a binary heap from an unsorted array of n elements using bottom-up heapify (Build-Heap) is:",
          [
              "Θ(log n)",
              "Θ(n)",
              "Θ(n log n)",
              "Θ(n²)"
          ],
          1,
          "Building a heap bottom-up takes ∑_{h=0}^{⌊log n⌋} ⌈n/2^{h+1}⌉ O(h) = O(n) linear time.",
          2
      ],
      [
          "The worst-case lower bound for comparison-based sorting algorithms is:",
          [
              "Ω(log n)",
              "Ω(n)",
              "Ω(n log n)",
              "Ω(n²)"
          ],
          2,
          "A comparison sort decision tree with n! leaves must have minimum height ⌈log₂(n!)⌉ = Ω(n log n) by Stirling's approximation.",
          2
      ],
      [
          "In Strassen's matrix multiplication, the number of recursive multiplications performed on half-size submatrices is:",
          [
              "4",
              "7",
              "8",
              "16"
          ],
          1,
          "Standard divide-and-conquer matrix multiplication uses 8 multiplications; Strassen's clever algebraic combinations reduce this to 7 multiplications.",
          2
      ],
      [
          "Which greedy strategy guarantees an optimal solution for the unweighted activity-selection problem?",
          [
              "Select the longest activity first",
              "Select the compatible activity with the earliest finishing time",
              "Select the latest starting activity always",
              "Select highest duration first"
          ],
          1,
          "Greedily choosing the earliest finish time leaves the maximum possible remaining time for subsequent compatible activities.",
          3
      ],
      [
          "Fractional Knapsack is solved optimally by considering items in decreasing order of:",
          [
              "Weight",
              "Total value",
              "Value-to-weight ratio (v_i / w_i)",
              "Original index"
          ],
          2,
          "Because items can be divided into fractions, prioritizing highest density (value per unit weight) maximizes total value within the weight constraint.",
          3
      ],
      [
          "Why does the greedy value-to-weight ratio strategy fail to guarantee optimality for the 0/1 Knapsack problem?",
          [
              "Items have negative weights",
              "Items cannot be fractionally divided to completely fill residual capacity",
              "Values must be equal",
              "Capacity is infinite"
          ],
          1,
          "In 0/1 knapsack, items cannot be broken; choosing a high ratio item might leave unusable slack capacity that could have held two items with higher combined value.",
          3
      ],
      [
          "Which algorithm constructs a Minimum Spanning Tree by maintaining a forest and greedily adding the lightest edge that does not form a cycle?",
          [
              "Bellman–Ford",
              "Kruskal's algorithm",
              "Floyd–Warshall",
              "Knuth-Morris-Pratt"
          ],
          1,
          "Kruskal's algorithm sorts all edges by weight and uses a Disjoint Set Union (Union-Find) data structure to greedily add edges without creating cycles.",
          3
      ],
      [
          "Prim's algorithm grows a Minimum Spanning Tree from an arbitrary root by:",
          [
              "Choosing the shortest path from source",
              "Repeatedly adding the minimum-weight edge connecting the tree to a non-tree vertex",
              "Removing all cycles first",
              "Sorting vertices by degree"
          ],
          1,
          "Prim's algorithm maintains a single connected component and greedily adds the lightest edge crossing the cut between vertices in the tree and vertices outside.",
          3
      ],
      [
          "Which shortest-path algorithm requires all edge weights to be non-negative for correctness?",
          [
              "Dijkstra's algorithm",
              "Bellman–Ford algorithm",
              "Floyd–Warshall algorithm",
              "Topological sorting"
          ],
          0,
          "Dijkstra's greedy choice assumes that once a vertex distance is finalized, no shorter path can be discovered later; negative edges violate this property.",
          3
      ],
      [
          "In Huffman prefix coding, which two symbols are merged first into a subtree?",
          [
              "The two highest-frequency symbols",
              "The two lowest-frequency symbols",
              "The first two alphabetically",
              "The two symbols with longest names"
          ],
          1,
          "Huffman's greedy strategy repeatedly merges the two nodes with the lowest frequencies to ensure infrequent characters receive longer codewords and frequent ones receive shorter ones.",
          3
      ],
      [
          "If an undirected connected weighted graph has distinct edge weights, its Minimum Spanning Tree is:",
          [
              "Always unique",
              "Never unique",
              "Guaranteed to contain all edges",
              "Guaranteed to be a simple path"
          ],
          0,
          "By the Cut Property, every cut has a unique minimum-weight crossing edge that must belong to the MST, guaranteeing a unique MST.",
          3
      ],
      [
          "For coin denominations {1, 3, 4}, what does the largest-first greedy approach use to make change for amount 6?",
          [
              "Two 3-coins",
              "One 4-coin and two 1-coins (total 3 coins)",
              "Six 1-coins",
              "One 3-coin and three 1-coins"
          ],
          1,
          "Greedy picks the largest coin 4 first, leaving 2, which requires two 1-coins (total 3 coins). The optimal DP solution uses two 3-coins (total 2 coins).",
          3
      ],
      [
          "Which two core properties indicate that a problem can be solved effectively using Dynamic Programming?",
          [
              "Optimal substructure and overlapping subproblems",
              "Only constant-time recursion and memoization",
              "Negative weights and unique paths",
              "Greedy choice property only"
          ],
          0,
          "DP applies when an optimal solution to the problem contains optimal solutions to subproblems (optimal substructure) and recursive subproblems repeat many times (overlapping subproblems).",
          4
      ],
      [
          "For the 0/1 Knapsack problem with n items and integer capacity W, the standard table-based DP running time is:",
          [
              "O(log n)",
              "O(n + W)",
              "O(n · W)",
              "O(2ⁿ · W)"
          ],
          2,
          "The DP table has dimensions (n + 1) × (W + 1), and filling each cell takes O(1) time, giving pseudo-polynomial complexity O(nW).",
          4
      ],
      [
          "For two strings of lengths m and n, what is the time complexity of finding their Longest Common Subsequence (LCS) using DP?",
          [
              "O(m + n)",
              "O(m · n)",
              "O(2^{m+n})",
              "O(log mn)"
          ],
          1,
          "The LCS table stores solutions for all prefixes of length i (0 ≤ i ≤ m) and j (0 ≤ j ≤ n), taking O(mn) time and space.",
          4
      ],
      [
          "What is the length of the Longest Common Subsequence of strings 'ABC' and 'ACB'?",
          [
              "1",
              "2",
              "3",
              "0"
          ],
          1,
          "Common subsequences are 'A', 'AB', and 'AC'. The maximum length is 2.",
          4
      ],
      [
          "For Matrix-Chain Multiplication of n matrices, the standard interval dynamic programming algorithm runs in:",
          [
              "O(n)",
              "O(n log n)",
              "O(n²)",
              "O(n³)"
          ],
          3,
          "There are O(n²) subchain intervals (i, j), and finding the optimal split point k takes O(n) steps, yielding O(n³) total time.",
          4
      ],
      [
          "The Floyd–Warshall dynamic programming algorithm computes:",
          [
              "Only minimum spanning trees",
              "All-pairs shortest paths in a weighted graph",
              "Only topological orders",
              "Maximum network flow"
          ],
          1,
          "Floyd–Warshall uses DP over intermediate vertices to compute shortest paths between all pairs of vertices in O(V³) time.",
          4
      ],
      [
          "The Floyd–Warshall recurrence relation for shortest paths using intermediate vertices up to k is:",
          [
              "d^{(k)}(i,j) = min(d^{(k-1)}(i,j), d^{(k-1)}(i,k) + d^{(k-1)}(k,j))",
              "d^{(k)}(i,j) = max(d^{(k-1)}(i,j), 0)",
              "d^{(k)}(i,j) = d^{(k-1)}(i,j) + 1",
              "d^{(k)}(i,j) = d^{(k-1)}(i,k) · d^{(k-1)}(k,j)"
          ],
          0,
          "A path from i to j using intermediate vertices {1..k} either bypasses vertex k (weight d^{(k-1)}(i,j)) or passes through k.",
          4
      ],
      [
          "A memoized recursive Fibonacci algorithm storing each computed F(k) runs in what time complexity?",
          [
              "Θ(2ⁿ)",
              "Θ(n)",
              "Θ(n²)",
              "Θ(log n)"
          ],
          1,
          "With memoization, each subproblem F(0) through F(n) is computed exactly once in O(1) time, resulting in linear Θ(n) time.",
          4
      ],
      [
          "Breadth-First Search (BFS) on an unweighted graph starting from source s computes:",
          [
              "Minimum spanning tree by weight",
              "Shortest path distances (minimum number of edges) from s to all reachable vertices",
              "Shortest paths with arbitrary negative weights",
              "All Hamiltonian cycles"
          ],
          1,
          "BFS explores vertices in order of their distance from the source level by level, finding shortest unweighted paths in O(V + E) time.",
          5
      ],
      [
          "Using adjacency lists, what is the running time of BFS or DFS on a graph G = (V, E)?",
          [
              "O(V + E)",
              "O(V · E)",
              "O(V² · E)",
              "O(log V)"
          ],
          0,
          "Every vertex is visited once (O(V)) and every edge is scanned once in directed graphs (or twice in undirected graphs, O(E)), giving O(V + E).",
          5
      ],
      [
          "Topological sorting is possible if and only if the directed graph is:",
          [
              "Connected",
              "A Directed Acyclic Graph (DAG)",
              "Bipartite",
              "Complete"
          ],
          1,
          "A topological ordering requires that for every directed edge u → v, u appears before v. If the graph contains a directed cycle, no such ordering can exist.",
          5
      ],
      [
          "The Bellman–Ford algorithm is capable of:",
          [
              "Only disconnected components",
              "Finding single-source shortest paths and detecting reachable negative-weight cycles",
              "Only articulation points",
              "Only bipartite graphs"
          ],
          1,
          "Bellman–Ford relaxes all |E| edges |V| − 1 times; if any edge can still be relaxed on the |V|-th pass, a negative cycle is detected.",
          5
      ],
      [
          "A connected undirected graph with V vertices has how many edges in any of its spanning trees?",
          [
              "V",
              "V − 1",
              "V + 1",
              "2V"
          ],
          1,
          "By graph theory fundamentals, any tree with V vertices contains exactly V − 1 edges and no cycles.",
          5
      ],
      [
          "In the backtracking solution for the N-Queens problem, a candidate board placement is pruned when:",
          [
              "Two queens share the same row, column, or diagonal",
              "A queen is in the first column",
              "N is an even number",
              "A queen is placed on a dark square"
          ],
          0,
          "Backtracking places queens row by row and prunes any branch where the newly placed queen attacks another queen along column or diagonals.",
          5
      ],
      [
          "In a graph-coloring backtracking algorithm, a valid assignment requires that:",
          [
              "Every vertex has the same color",
              "Adjacent vertices connected by an edge have different colors",
              "Only the first vertex is colored",
              "The graph is a tree"
          ],
          1,
          "A proper vertex coloring requires that no two adjacent vertices share the same color.",
          5
      ],
      [
          "A Hamiltonian cycle in a graph is defined as a closed tour that:",
          [
              "Visits every edge exactly once",
              "Visits every vertex exactly once and returns to the starting vertex",
              "Visits only vertices of even degree",
              "Traverses only minimum-weight edges"
          ],
          1,
          "An Eulerian circuit visits every edge once; a Hamiltonian cycle visits every vertex once before returning to the start.",
          5
      ],
      [
          "The complexity class P contains all decision problems that can be solved:",
          [
              "In polynomial time by a deterministic Turing machine",
              "In exponential time only",
              "In constant space only",
              "In nondeterministic exponential time only"
          ],
          0,
          "Class P consists of decision problems solvable by a deterministic algorithm running in time O(n^k) for some constant k.",
          6
      ],
      [
          "The complexity class NP consists of decision problems whose YES instances have:",
          [
              "Certificates (proofs) verifiable in polynomial time by a deterministic algorithm",
              "Only exponential-size certificates",
              "No verifiable certificates",
              "Guaranteed linear-time solutions"
          ],
          0,
          "NP is the class of problems for which a proposed candidate solution (certificate) can be verified in polynomial time.",
          6
      ],
      [
          "Which of the following inclusion relationships is mathematically proven?",
          [
              "P = NP",
              "P ≠ NP",
              "P ⊆ NP",
              "NP ⊂ P"
          ],
          2,
          "Since any problem solvable in polynomial time can also be verified in polynomial time (by running the solver itself), P is a subset of NP.",
          6
      ],
      [
          "A decision problem is defined to be NP-complete if:",
          [
              "It is in P and not NP-hard",
              "It is in NP, and every problem in NP is polynomial-time reducible to it (it is NP-hard)",
              "It is only NP-hard",
              "It is undecidable"
          ],
          1,
          "NP-complete problems represent the hardest problems in NP: they are in NP, and any algorithm solving one in polynomial time solves all of NP in polynomial time.",
          6
      ],
      [
          "To prove that a new decision problem B is NP-hard using a known NP-complete problem A, one must show:",
          [
              "B ≤p A",
              "A ≤p B (polynomial-time reduction from A to B)",
              "B ∈ P",
              "A ∉ NP"
          ],
          1,
          "Reducing known hard problem A to B (A ≤p B) demonstrates that B is at least as hard as A.",
          6
      ],
      [
          "Which of the following is a classic NP-complete decision problem?",
          [
              "Binary search",
              "2-SAT",
              "3-SAT",
              "Single-source shortest path with nonnegative weights"
          ],
          2,
          "The Cook–Levin Theorem proved SAT is NP-complete, and 3-SAT was reduced from it. 2-SAT and Shortest Path are in P.",
          6
      ],
      [
          "The decision version of the Traveling Salesperson Problem (TSP) asks:",
          [
              "Find any spanning tree",
              "Whether there exists a traveling salesperson tour of total cost at most K",
              "Whether a graph is connected",
              "Sort edge weights"
          ],
          1,
          "The decision version of an optimization problem poses a yes/no question using a threshold bound K.",
          6
      ],
      [
          "If any single NP-complete problem is proved to have a polynomial-time deterministic algorithm, what would be the consequence?",
          [
              "P = NP",
              "P ≠ NP",
              "NP becomes empty",
              "All problems become decidable"
          ],
          0,
          "Because every problem in NP reduces to any NP-complete problem in polynomial time, a polynomial solver for one yields a polynomial solver for all of NP (P = NP).",
          6
      ]
  ],
  "etc": [
      [
          "Which communication model explicitly includes a feedback loop as an essential element?",
          [
              "One-way linear model",
              "Interactive communication model",
              "Only the Shannon–Weaver transmission model",
              "A notice-board announcement"
          ],
          1,
          "The interactive (and transactional) communication model accounts for the receiver encoding a response back to the sender as feedback.",
          1
      ],
      [
          "A technical presentation packed with unexplained domain jargon and acronyms primarily introduces which type of barrier?",
          [
              "Physical barrier",
              "Semantic barrier",
              "Mechanical barrier",
              "Time-zone barrier"
          ],
          1,
          "Semantic barriers arise from misunderstandings of words, jargon, ambiguous terms, or technical symbols between sender and receiver.",
          1
      ],
      [
          "Choose the grammatically correct sentence adhering to subject-verb agreement:",
          [
              "Each of the engineers have submitted their report.",
              "Each of the engineers has submitted their report.",
              "Each of the engineers are submitting their report.",
              "Each of the engineers were submitted their report."
          ],
          1,
          "The indefinite pronoun 'Each' is grammatically singular and requires the singular verb 'has'.",
          1
      ],
      [
          "Choose the grammatically correct sentence using proximity agreement with 'neither...nor':",
          [
              "Neither the manager nor the employees was available.",
              "Neither the manager nor the employees were available.",
              "Neither the manager nor the employees is available.",
              "Neither the manager nor the employees has available."
          ],
          1,
          "With 'neither...nor', the verb agrees with the closer subject. Since 'employees' is plural, the plural verb 'were' is correct.",
          1
      ],
      [
          "Which sentence demonstrates the most concise and professional technical style?",
          [
              "Due to the fact that the server was down, the process failed.",
              "The process failed because the server was down.",
              "The process failed owing to the fact of server unavailability being present.",
              "It was the server being down that resulted in the failure of the process."
          ],
          1,
          "'The process failed because the server was down' eliminates redundant wordy phrases like 'due to the fact that'.",
          1
      ],
      [
          "Which sentence demonstrates correct parallel structure in technical prose?",
          [
              "The role involves designing, testing, and to deploy software.",
              "The role involves design, testing, and deploying software.",
              "The role involves designing, testing, and deploying software.",
              "The role involves to design, testing, and deployment."
          ],
          2,
          "Parallelism requires identical grammatical forms for coordinated items: all gerunds ('designing', 'testing', 'deploying').",
          1
      ],
      [
          "In a formal technical specification, the statement 'The application may crash if memory exceeds 2 GB' primarily conveys:",
          [
              "Absolute certainty",
              "Possibility or conditional likelihood",
              "An imperative command",
              "A completed past action"
          ],
          1,
          "The modal verb 'may' indicates possibility or conditional occurrence rather than mandatory compliance ('shall' / 'must').",
          1
      ],
      [
          "Which revision best transforms 'The data was analyzed by the software team' into an active, actor-focused sentence?",
          [
              "The software team analyzed the data.",
              "The data got analyzed.",
              "Analysis of the data was performed by them.",
              "The data was subjected to analysis."
          ],
          0,
          "Active voice places the agent performing the action as the grammatical subject ('The software team analyzed...').",
          1
      ],
      [
          "A receiver interpreting an email message differently than intended due to disparate cultural assumptions is an example of:",
          [
              "Semantic or cultural noise",
              "Improved channel encoding",
              "Perfect feedback",
              "Transmission capacity"
          ],
          0,
          "Cultural noise occurs when cultural backgrounds, idiomatic expressions, or implicit values distort the intended meaning of a message.",
          1
      ],
      [
          "What critical step should normally precede the drafting of a formal technical report?",
          [
              "Publishing the report online",
              "Defining the target audience, purpose, and scope",
              "Removing all headings",
              "Choosing decorative fonts"
          ],
          1,
          "Before drafting, technical writers must establish who the audience is, what the report aims to accomplish, and what boundaries define the scope.",
          2
      ],
      [
          "Which section of a formal technical report provides a standalone overview of the problem, key findings, and final recommendations?",
          [
              "Appendix",
              "Executive summary",
              "Bibliography",
              "Glossary"
          ],
          1,
          "The executive summary distills the entire report for busy decision-makers who may not read the full technical body.",
          2
      ],
      [
          "The methodology section of a technical investigation report should primarily describe:",
          [
              "How the investigation or experiment was conducted step-by-step",
              "The author's personal career history",
              "Only the final subjective conclusions",
              "The marketing budget"
          ],
          0,
          "Methodology details experimental procedures, testing apparatus, and data collection methods to ensure reproducibility.",
          2
      ],
      [
          "Which element most strongly supports reproducibility in a scientific or technical report?",
          [
              "Vague qualitative impressions",
              "Detailed procedures, explicit parameters, and stated assumptions",
              "Decorative illustrations only",
              "Uncited assertions"
          ],
          1,
          "Reproducibility requires explicit documentation of equipment, parameters, algorithms, and assumptions so others can independently replicate results.",
          2
      ],
      [
          "Which visual representation is generally most suitable for depicting variations in network latency measured continuously over 30 days?",
          [
              "Line chart",
              "Organizational chart",
              "Pie chart",
              "Flowchart"
          ],
          0,
          "Line charts are optimal for displaying continuous time-series data and highlighting trends over time.",
          2
      ],
      [
          "Which section of a technical report should house bulky raw measurement tables or extensive code listings that would interrupt reading flow?",
          [
              "Title page",
              "Appendix",
              "Acknowledgements only",
              "Executive summary"
          ],
          1,
          "Appendices contain supplementary material (raw data, derivations, code) that provides depth without cluttering the primary narrative.",
          2
      ],
      [
          "Which sentence represents an effective, actionable technical instruction?",
          [
              "Do the necessary thing properly.",
              "Click Settings, select Network, and toggle Wi-Fi to On.",
              "Make sure everything is good.",
              "Configure it as usual."
          ],
          1,
          "Effective technical instructions use imperative verbs and specific step-by-step sequences without ambiguity.",
          2
      ],
      [
          "Plagiarism in engineering documentation is best prevented by:",
          [
              "Modifying a few words without referencing the original paper",
              "Crediting all original sources and distinguishing direct quotes from paraphrases",
              "Removing all references completely",
              "Citing only images and omitting text citations"
          ],
          1,
          "Academic and professional integrity requires accurate attribution, citation of ideas, and clear quotation markers for verbatim text.",
          2
      ],
      [
          "Which revision is most audience-centred when explaining an outage to a non-technical corporate client?",
          [
              "The API returns HTTP 503 due to upstream worker pool exhaustion.",
              "The service is temporarily unavailable because our supporting server is experiencing high traffic.",
              "The upstream gateway has exhausted its thread pool.",
              "The reverse proxy failed its backend health check."
          ],
          1,
          "Audience-centred communication translates internal technical jargon into clear, plain-language impacts for non-technical stakeholders.",
          2
      ],
      [
          "Which subject line is most effective for an employee requesting sick leave?",
          [
              "Hi",
              "Important!!!",
              "Request for Sick Leave — 12 November [Employee Name]",
              "Please read immediately"
          ],
          2,
          "Professional email subject lines must be specific, scannable, and include the core request, date, and sender identification.",
          3
      ],
      [
          "A formal business letter should generally adhere to:",
          [
              "Clear purpose, appropriate formal salutation, structured body paragraphs, and professional sign-off",
              "Only emojis, abbreviations, and informal slang",
              "Omitting recipient details and dates",
              "Unrelated personal anecdotes"
          ],
          0,
          "Business letters require conventional formatting: sender/recipient addresses, date, professional salutation, concise body, and complimentary close.",
          3
      ],
      [
          "When drafting a formal customer complaint letter, which strategy is most effective?",
          [
              "Using emotional insults to demonstrate urgency",
              "Clearly stating the defect, citing invoice/order evidence, and specifying the desired resolution",
              "Omitting transaction dates and order IDs",
              "Threatening legal action immediately without detailing the issue"
          ],
          1,
          "Constructive complaints maintain a polite, objective tone, provide factual documentation, and propose a specific remedy.",
          3
      ],
      [
          "When sending a project milestone update to several team members where all should see each other's addresses and participate in replies, use:",
          [
              "BCC only",
              "To or CC fields according to primary responsibility and informational roles",
              "Subject line only",
              "Attachment filename"
          ],
          1,
          "'To' is for direct action owners, while 'CC' (Carbon Copy) is for colleagues kept informed; both remain visible to all recipients.",
          3
      ],
      [
          "The Blind Carbon Copy (BCC) field is primarily recommended when:",
          [
              "Recipients must reply-all to coordinate tasks",
              "Sending an email to a large distribution list where recipient addresses must remain private",
              "Attaching a PDF file",
              "Writing the subject header"
          ],
          1,
          "BCC conceals recipient email addresses from one another, protecting privacy and preventing accidental 'Reply All' mail storms.",
          3
      ],
      [
          "Which email closing is most appropriate for a formal inquiry sent to a company recruiter?",
          [
              "Catch you later!",
              "Yours sincerely, / Best regards,",
              "LOL bye",
              "No sign-off under any circumstances"
          ],
          1,
          "Formal business correspondence requires polite, conventional closures such as 'Yours sincerely,' or 'Best regards,'.",
          3
      ],
      [
          "Before emailing a confidential technical audit report to an external partner, the sender should:",
          [
              "Forward it to all personal contacts",
              "Verify recipient addresses, attachment contents, and access permission levels",
              "Omit the subject line",
              "Remove password protection and classification markers"
          ],
          1,
          "Protecting sensitive corporate information requires double-checking recipient accuracy, encryption, and classification protocols.",
          3
      ],
      [
          "Which sentence demonstrates an appropriate tone for a professional follow-up email?",
          [
              "Why are you ignoring me?",
              "I am following up on my job application submitted on 10 October and would welcome an update on its status.",
              "Reply now.",
              "You must answer today."
          ],
          1,
          "A courteous, professional follow-up states the reference point, expresses patience, and requests status politely.",
          3
      ],
      [
          "In collaborative technical authoring, establishing a shared style guide primarily helps maintain:",
          [
              "Consistent terminology, formatting, and authorial voice across all sections",
              "Conflicting revisions across chapters",
              "Anonymous authorship",
              "Arbitrarily long documents"
          ],
          0,
          "A style guide establishes standard terms, heading hierarchies, citation rules, and tone so multi-author documents read cohesively.",
          4
      ],
      [
          "Which feature in modern collaborative writing software is most effective for reviewing and reconciling edits?",
          [
              "Version history and tracked changes with inline comments",
              "Deleting all earlier drafts immediately",
              "Disabling comments across collaborators",
              "Using different fonts per author"
          ],
          0,
          "Version history and tracked changes permit comparing revisions, resolving conflicts, and preserving audit trails.",
          4
      ],
      [
          "During a technical presentation, if a speaker observes confused expressions among audience members, the optimal response is to:",
          [
              "Ignore the reaction and proceed quickly",
              "Pause, clarify the core concept with a simple analogy, and invite brief questions",
              "Speak twice as fast to finish on time",
              "Add dense mathematical jargon"
          ],
          1,
          "Dynamic public speakers actively read nonverbal feedback and adjust pacing to ensure audience comprehension.",
          4
      ],
      [
          "Which slide-design practice is most effective for technical conference presentations?",
          [
              "Filling each slide with dense paragraphs of text",
              "Maintaining clear visual hierarchy, minimal high-impact text, and relevant diagrams",
              "Using complex animations on every bullet point",
              "Using tiny 8pt fonts"
          ],
          1,
          "Presentation slides serve as visual aids, not teleprompters; concise bullet points and clear diagrams maintain audience focus.",
          4
      ],
      [
          "Which physiological technique helps speakers manage nervous apprehension prior to speaking?",
          [
              "Skipping all preparation",
              "Rehearsing thoroughly and utilizing controlled deep diaphragmatic breathing",
              "Drinking excess caffeinated beverages",
              "Memorizing every physical gesture"
          ],
          1,
          "Controlled deep breathing stimulates the vagus nerve, reducing heart rate and mitigating stage fright.",
          4
      ],
      [
          "In a Group Discussion (GD), constructive disagreement involves:",
          [
              "Launching ad hominem personal attacks",
              "Challenging ideas respectfully while supporting counterpoints with logical reasoning",
              "Interrupting other speakers repeatedly",
              "Refusing to acknowledge factual evidence"
          ],
          1,
          "Professional collaboration welcomes diverse ideas through reasoned critique of concepts rather than personal confrontation.",
          4
      ],
      [
          "During an oral presentation, eye contact should ideally be:",
          [
              "Locked onto a single person in the front row",
              "Distributed naturally across all quadrants of the audience",
              "Avoided completely",
              "Directed down at the podium notes"
          ],
          1,
          "Sweeping eye contact across the room creates rapport and includes all attendees in the conversation.",
          4
      ],
      [
          "What is the most compelling way to conclude an engineering presentation?",
          [
              "Introducing several new unrelated topics",
              "Summarizing key findings and articulating clear, actionable next steps",
              "Reading the full slide deck again",
              "Stopping abruptly without a closing remark"
          ],
          1,
          "A strong conclusion reinforces the central takeaways and points decision-makers toward actionable implementation steps.",
          4
      ],
      [
          "What is the recommended first step in systematic career planning?",
          [
              "Applying randomly to hundreds of job postings",
              "Conducting a candid self-assessment of skills, interests, and career goals",
              "Negotiating salary before receiving an offer",
              "Copying another student's resume"
          ],
          1,
          "Self-assessment clarifies strengths, gaps, and aspirations, allowing targeted skill development and job searching.",
          5
      ],
      [
          "In behavioural job interviews, what does the STAR framework stand for?",
          [
              "Situation, Task, Action, Result",
              "Skill, Training, Ability, Reward",
              "Summary, Topic, Argument, Review",
              "Situation, Theory, Analysis, Revision"
          ],
          0,
          "The STAR method structures compelling behavioural answers: Situation, Task, Action taken, and measurable Result achieved.",
          5
      ],
      [
          "When an interviewer asks about a past technical obstacle you faced, the most effective response is to:",
          [
              "State that you never faced any challenges",
              "Describe the challenge objectively, detail your specific contribution, and explain the positive outcome",
              "Blame other team members for the failure",
              "Change the subject immediately"
          ],
          1,
          "Employers look for problem-solving maturity, accountability, and the ability to extract lessons from technical adversity.",
          5
      ],
      [
          "Active listening in an engineering team meeting involves:",
          [
              "Formulating your rebuttal while the other person is still speaking",
              "Paraphrasing key points to confirm understanding, taking notes, and withholding interruption",
              "Constantly checking smartphone notifications",
              "Assuming speaker intent without asking questions"
          ],
          1,
          "Active listening requires undivided attention, nonverbal acknowledgment, and validating comprehension through reflective questioning.",
          5
      ],
      [
          "Constructive performance feedback is most effective when it is:",
          [
              "Specific, respectful, focused on observed behaviour, and actionable",
              "Vague, subjective, and personal",
              "Delivered publicly to maximize embarrassment",
              "Deferred until months after the incident"
          ],
          0,
          "Feedback must focus on modifiable actions with specific examples and guidance on how to improve.",
          5
      ],
      [
          "An entry-level engineering resume should prioritize:",
          [
              "Technical projects, internships, verified skills, and measurable results",
              "Unverifiable hyperbolic claims",
              "Elaborate decorative graphics that confuse automated ATS parsers",
              "Personal hobbies unrelated to engineering"
          ],
          0,
          "Technical recruiters prioritize demonstrable project experience, coding proficiencies, and quantifiable achievements formatted cleanly.",
          5
      ],
      [
          "If a project teammate misses an agreed milestone deadline, the most productive initial action is to:",
          [
              "Publicly humiliate them on a team-wide channel",
              "Converse privately to understand root bottlenecks and formulate an adjusted catch-up plan",
              "Ignore the delay indefinitely",
              "Delete their previous contributions"
          ],
          1,
          "Professional project managers handle delays with empathy and urgency by diagnosing root causes and reallocating resources privately.",
          5
      ],
      [
          "Which behaviour demonstrates high emotional intelligence (EQ) in the workplace?",
          [
              "Recognizing a peer's frustration during debugging and offering supportive collaboration",
              "Escalating minor disputes to upper management immediately",
              "Ignoring nonverbal cues from stakeholders",
              "Assuming silence always implies agreement"
          ],
          0,
          "Emotional intelligence encompasses self-awareness, empathy, and constructive interpersonal navigation under stress.",
          5
      ],
      [
          "An engineer discovers a critical safety defect in medical device firmware hours before commercial release. The ethical first response is to:",
          [
              "Conceal the defect to meet the release date",
              "Document the vulnerability and immediately report it through established safety channels to halt deployment",
              "Delete the test logs",
              "Wait for end-user field complaints"
          ],
          1,
          "Engineering codes of ethics (IEEE, ACM) prioritize the safety, health, and welfare of the public above financial or schedule pressures.",
          6
      ],
      [
          "Which practice best safeguards sensitive intellectual property and client data in software projects?",
          [
              "Sharing production database credentials in unencrypted chat groups",
              "Enforcing role-based access controls, encryption, and secure repositories",
              "Posting proprietary code to public forums for help",
              "Downloading source code onto untracked personal devices"
          ],
          1,
          "Data security requires encrypted transit and rest, principle of least privilege, and compliance with non-disclosure agreements.",
          6
      ],
      [
          "What is the first step in systematic engineering problem-solving?",
          [
              "Implementing the first idea that comes to mind",
              "Clearly defining the problem, constraints, and success criteria",
              "Ignoring stakeholder requirements",
              "Drafting the final conclusions"
          ],
          1,
          "Accurately characterizing the problem scope and boundary conditions prevents wasting resources on the wrong solution.",
          6
      ],
      [
          "When selecting among competing architectural solutions, an engineering team should:",
          [
              "Choose the most fashionable framework without investigation",
              "Evaluate alternatives systematically against explicit technical criteria, costs, and risks",
              "Flip a coin",
              "Avoid documenting trade-offs"
          ],
          1,
          "Rational decision-making requires objective trade-off analyses (decision matrices) evaluating performance, cost, maintainability, and scalability.",
          6
      ],
      [
          "A professional conflict of interest occurs when:",
          [
              "Personal financial or familial interests could improperly bias professional judgment or duty to a client/employer",
              "Two developers favor different IDEs",
              "A project has aggressive milestone targets",
              "A sprint meeting runs over schedule"
          ],
          0,
          "Conflicts of interest compromise objectivity and require transparent disclosure or recusal.",
          6
      ],
      [
          "If a manager asks you to copy a competitor's copyrighted code directly into a commercial product, you should:",
          [
              "Comply silently if the deadline is urgent",
              "Respectfully decline, explain the copyright/licensing violation, and propose developing an original clean-room implementation",
              "Scramble the variable names to conceal the copying",
              "Publish the competitor's code online"
          ],
          1,
          "Engineers must uphold intellectual property laws and professional ethics, refusing to engage in plagiarism or copyright infringement.",
          6
      ],
      [
          "Responsible professional use of AI-assisted writing tools (e.g. LLMs) in technical documentation requires:",
          [
              "Submitting generated text blindly without human verification",
              "Fact-checking every claim, ensuring confidential data is not exposed to public models, and disclosing AI usage per company policy",
              "Inventing citations to make the text look authentic",
              "Claiming AI-generated text as personal experimental data"
          ],
          1,
          "Engineers remain fully accountable for technical accuracy, confidentiality, and transparency when utilizing assistive AI tools.",
          6
      ],
      [
          "If you discover a substantial numerical error in a technical report you submitted to a client last week, the ethical action is to:",
          [
              "Remain silent and hope nobody discovers it",
              "Promptly notify stakeholders, explain the error, and provide a corrected addendum",
              "Blame the client for misinterpreting the numbers",
              "Destroy the underlying source data"
          ],
          1,
          "Professional integrity requires timely disclosure of errors to preserve client safety, trust, and data accuracy.",
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
  return writtenQuestionsBySubject[subject] || [];
}

export { cnSolutions };

export const allTopics=subjects.flatMap(s=>s.units.flatMap(u=>u.topics));

export const unitWeightage = {
  "cn": [
    {
      "unit": 1,
      "title": "Networking Fundamentals",
      "marks": 14,
      "mcqs": 5,
      "pyqs": 16,
      "priority": "VERY HIGH",
      "flow": "OSI Reference Model → TCP/IP Architecture → Mesh/Star Topologies → Layer 2 Switching"
    },
    {
      "unit": 2,
      "title": "Physical Layer",
      "marks": 16,
      "mcqs": 8,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "Data Rate Limits (Nyquist & Shannon) → Transmission Media → Multiplexing (FDM/TDM/WDM) → Packet Switching"
    },
    {
      "unit": 3,
      "title": "Data Link Layer & MAC",
      "marks": 21,
      "mcqs": 11,
      "pyqs": 22,
      "priority": "CRITICAL",
      "flow": "Framing & Bit Stuffing → CRC Polynomial Division → Hamming Codes → ARQ Protocols → ALOHA & CSMA/CD"
    },
    {
      "unit": 4,
      "title": "Network Layer",
      "marks": 19,
      "mcqs": 10,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "IPv4 Addressing & CIDR Subnetting → IPv6 → Routing Algorithms (Dijkstra / Bellman-Ford) → ARP & ICMP"
    },
    {
      "unit": 5,
      "title": "Transport Layer",
      "marks": 16,
      "mcqs": 8,
      "pyqs": 17,
      "priority": "VERY HIGH",
      "flow": "TCP 3-Way Handshake → Flow Control (Sliding Window) → Congestion Control (Leaky/Token Bucket) → UDP"
    },
    {
      "unit": 6,
      "title": "Application Layer",
      "marks": 14,
      "mcqs": 6,
      "pyqs": 14,
      "priority": "HIGH",
      "flow": "DNS Hierarchy & Records → HTTP/HTTPS Architecture → SMTP & POP3 Relaying → FTP Dual Connections"
    }
  ],
  "coa": [
    {
      "unit": 1,
      "title": "CPU, ISA & Addressing",
      "marks": 16,
      "mcqs": 8,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "Processor Registers (PC/IR/MAR/MDR) → Instruction Execution Cycle → Addressing Modes (Indexed/Immediate) → CISC vs RISC"
    },
    {
      "unit": 2,
      "title": "Computer Arithmetic",
      "marks": 18,
      "mcqs": 9,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "Two’s Complement Range & Overflow → Booth’s Signed Multiplication → Carry Look-Ahead Adders → IEEE 754 Floating Point"
    },
    {
      "unit": 3,
      "title": "Control Unit & Memory Hierarchy",
      "marks": 18,
      "mcqs": 9,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "Hardwired vs Microprogrammed Control ROM → RAM Chip Organization (32K×1) → Direct & Set-Associative Cache → AMAT"
    },
    {
      "unit": 4,
      "title": "I/O Organization & DMA",
      "marks": 16,
      "mcqs": 8,
      "pyqs": 17,
      "priority": "VERY HIGH",
      "flow": "Programmed vs Interrupt-Driven I/O → Vectored Interrupts & Priority Daisy Chaining → DMA Controllers & Cycle Stealing"
    },
    {
      "unit": 5,
      "title": "Instruction Pipelining",
      "marks": 18,
      "mcqs": 9,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "Pipeline Clock Cycles (k+n-1) → Speedup Calculations → Hazards (RAW Data, Control, Structural) → Branch Prediction"
    },
    {
      "unit": 6,
      "title": "Memory System & Parallelism",
      "marks": 14,
      "mcqs": 7,
      "pyqs": 13,
      "priority": "HIGH",
      "flow": "Cache Replacement (LRU/FIFO) → Flynn’s Taxonomy (SISD/SIMD/MIMD) → Cache Coherence Protocols → Memory Interleaving"
    }
  ],
  "flat": [
    {
      "unit": 1,
      "title": "Finite Automata",
      "marks": 16,
      "mcqs": 6,
      "pyqs": 17,
      "priority": "VERY HIGH",
      "flow": "Alphabet & Languages → DFA State Minimization → NFA Subset Construction → Mealy & Moore Machines"
    },
    {
      "unit": 2,
      "title": "Regular Languages",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "Regular Expressions & Arden’s Theorem → Pumping Lemma for Regular Languages → Closure Properties → Myhill-Nerode"
    },
    {
      "unit": 3,
      "title": "Context-Free Grammars",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "CFG Derivation Trees → Grammar Ambiguity → Chomsky Normal Form (CNF) → Greibach Normal Form (GNF)"
    },
    {
      "unit": 4,
      "title": "Pushdown Automata",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "PDA Formal Definition → Acceptance by Final State vs Empty Stack → DPDA vs NPDA → Pumping Lemma for CFL"
    },
    {
      "unit": 5,
      "title": "Turing Machines",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "Turing Machine 7-Tuple → Multi-Tape Simulation → Halting Problem Proof → Recursive vs Recursively Enumerable"
    },
    {
      "unit": 6,
      "title": "Chomsky Hierarchy & Decidability",
      "marks": 14,
      "mcqs": 6,
      "pyqs": 16,
      "priority": "HIGH",
      "flow": "Chomsky 4-Level Hierarchy → Linear Bounded Automata (CSL) → Post Correspondence Problem (PCP) → Rice’s Theorem"
    }
  ],
  "dbms": [
    {
      "unit": 1,
      "title": "Database Concepts & ER Modeling",
      "marks": 15,
      "mcqs": 6,
      "pyqs": 16,
      "priority": "HIGH",
      "flow": "Three-Schema Architecture & Data Independence → ER Diagrams (Weak Entities & Participation) → Relational Mapping"
    },
    {
      "unit": 2,
      "title": "Relational Model & SQL",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "Relational Algebra (σ, π, ⨝, ÷) → Complex SQL (GROUP BY / HAVING / Subqueries) → Outer Joins & Integrity Constraints"
    },
    {
      "unit": 3,
      "title": "Relational Database Design",
      "marks": 20,
      "mcqs": 6,
      "pyqs": 22,
      "priority": "CRITICAL",
      "flow": "Functional Dependencies & Armstrong’s Axioms → Normal Forms (1NF, 2NF, 3NF, BCNF) → Lossless-Join & Dependency Preservation"
    },
    {
      "unit": 4,
      "title": "Transaction Processing",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "ACID Properties → Conflict & View Serializability Precedence Graphs → SQL Transaction Isolation Levels"
    },
    {
      "unit": 5,
      "title": "Concurrency Control & Recovery",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 18,
      "priority": "CRITICAL",
      "flow": "Two-Phase Locking (Strict 2PL) → Deadlock Prevention (Wait-Die) → Timestamp Ordering → Write-Ahead Logging & ARIES"
    },
    {
      "unit": 6,
      "title": "Storage & Indexing",
      "marks": 13,
      "mcqs": 6,
      "pyqs": 13,
      "priority": "HIGH",
      "flow": "Dense vs Sparse Indexing → B+ Tree Order & Fanout Calculations → Dynamic Extendible Hashing → Predicate Pushdown"
    }
  ],
  "daa": [
    {
      "unit": 1,
      "title": "Algorithm Analysis",
      "marks": 16,
      "mcqs": 6,
      "pyqs": 17,
      "priority": "VERY HIGH",
      "flow": "Asymptotic Notations (O, Ω, Θ) → Master Theorem Analysis → Recursion Tree Method → Amortized Analysis"
    },
    {
      "unit": 2,
      "title": "Divide and Conquer",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "Merge Sort Recurrence → QuickSort Partitioning & Worst-Case → Strassen’s Matrix Multiplication → Median of Medians"
    },
    {
      "unit": 3,
      "title": "Greedy Method",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "Greedy-Choice Property & Optimal Substructure → Fractional Knapsack → Huffman Prefix Coding → Job Sequencing"
    },
    {
      "unit": 4,
      "title": "Dynamic Programming",
      "marks": 20,
      "mcqs": 6,
      "pyqs": 22,
      "priority": "CRITICAL",
      "flow": "Memoization vs Tabulation → 0/1 Knapsack DP Table → Matrix Chain Multiplication → Longest Common Subsequence (LCS)"
    },
    {
      "unit": 5,
      "title": "Graph Algorithms",
      "marks": 17,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "BFS & DFS Traversal → MST (Prim’s & Kruskal’s with Union-Find) → Dijkstra Shortest Paths → Bellman-Ford Cycles"
    },
    {
      "unit": 6,
      "title": "NP-Completeness",
      "marks": 12,
      "mcqs": 6,
      "pyqs": 10,
      "priority": "HIGH",
      "flow": "Class P and Class NP Definitions → Polynomial-Time Reductions → Cook-Levin SAT Proof → Vertex Cover Approximation"
    }
  ],
  "etc": [
    {
      "unit": 1,
      "title": "Communication Theory",
      "marks": 15,
      "mcqs": 6,
      "pyqs": 16,
      "priority": "HIGH",
      "flow": "Shannon-Weaver Transmission Model → Downward, Upward & Diagonal Flow → Grapevine Networks → Communication Barriers"
    },
    {
      "unit": 2,
      "title": "Technical Writing & Grammar",
      "marks": 16,
      "mcqs": 6,
      "pyqs": 17,
      "priority": "VERY HIGH",
      "flow": "Conciseness & Active vs Passive Voice → Subject-Verb Agreement → Dangling Modifiers → Clear Engineering Style"
    },
    {
      "unit": 3,
      "title": "Professional Documents",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 20,
      "priority": "CRITICAL",
      "flow": "Formal Engineering Reports & Front Matter → Project Proposals & Deliverables → Executive Summaries → Memos & MoM"
    },
    {
      "unit": 4,
      "title": "Reading & Note-Taking",
      "marks": 15,
      "mcqs": 6,
      "pyqs": 16,
      "priority": "HIGH",
      "flow": "SQ3R Reading Strategy → Skimming vs Scanning → Cornell Note-Taking System → Critical Evaluation of Literature"
    },
    {
      "unit": 5,
      "title": "Oral Presentation & GD",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "Extempore Delivery Strategies → Group Discussion Leadership & Consensus → Body Language (Kinesics) → STAR Interviews"
    },
    {
      "unit": 6,
      "title": "Ethics & Intellectual Property",
      "marks": 18,
      "mcqs": 6,
      "pyqs": 19,
      "priority": "CRITICAL",
      "flow": "IEEE Code of Ethics Public Safety Mandate → Plagiarism Prevention (Patchwriting) → Copyright & Patents → NDAs"
    }
  ]
};
