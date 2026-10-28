const unit1Entries = [
  {
    id: 'cn-q1',
    num: 1,
    title: 'OSI 7-Layer Reference Model & Protocols',
    unit: 1,
    verified: 'BEU 2024 · Q.2 / 2025 · 7 Marks',
    years: [2024, 2025, 2026],
    marks: 7,
    question: 'Explain the OSI 7-layer reference model with a neat architecture diagram and state the core function and protocol of each layer.',
    solution: {
      verified: 'BEU 2024 · Q.2 / 2025 · 7 Marks',
      intro: 'The Open Systems Interconnection (OSI) reference model, developed by the ISO in 1984, provides an abstract, modular 7-layer architecture for standardizing network communication between heterogeneous computer systems.',
      diagrams: [
        {
          title: 'OSI 7-Layer Architecture Stack & Encapsulation Flow',
          ascii:
`+-----------------------------------------------------------+  Data Unit
| 7. APPLICATION LAYER  (HTTP, FTP, DNS, SMTP, Telnet)     |  Data
+-----------------------------------------------------------+    |
| 6. PRESENTATION LAYER (SSL/TLS, ASCII, JPEG, Encryption)  |  Data
+-----------------------------------------------------------+    |
| 5. SESSION LAYER      (RPC, NetBIOS, PPTP, Sockets)       |  Data
+-----------------------------------------------------------+    | [Segment]
| 4. TRANSPORT LAYER    (TCP, UDP, SCTP, Port Addressing)   |  Segment
+-----------------------------------------------------------+    | [Packet]
| 3. NETWORK LAYER      (IPv4, IPv6, ICMP, OSPF, BGP)       |  Packet
+-----------------------------------------------------------+    | [Frame]
| 2. DATA LINK LAYER    (Ethernet, PPP, Switch, MAC 48-bit) |  Frame
+-----------------------------------------------------------+    | [Bits]
| 1. PHYSICAL LAYER     (Cables, Hub, Repeater, NRZ/Biphase)|  Bits
+-----------------------------------------------------------+    v`
        }
      ],
      table: {
        title: 'Summary of the OSI 7-Layer Architecture',
        headers: ['Layer #', 'Layer Name', 'PDU Name', 'Primary Addressing', 'Core Responsibilities', 'Representative Protocols'],
        rows: [
          ['7', 'Application', 'Data / Message', 'Application Names / URLs', 'Network service interface for end users, distributed file access, directory services', 'HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet'],
          ['6', 'Presentation', 'Data', 'Syntax / Encoding Tag', 'Data syntax translation (ASCII/EBCDIC), data compression, cryptographic encryption/decryption', 'SSL/TLS, JPEG, MPEG, ASCII, MIDI'],
          ['5', 'Session', 'Data', 'Connection ID / Session ID', 'Session establishment, maintenance, token management, dialog synchronization checkpoints', 'RPC, NetBIOS, PPTP, AppleTalk ASP'],
          ['4', 'Transport', 'Segment (TCP) / Datagram (UDP)', 'Port Number (16-bit, 0–65535)', 'End-to-end process-to-process delivery, segmentation, flow control, error recovery', 'TCP, UDP, SCTP, RTP'],
          ['3', 'Network', 'Packet', 'Logical IP Address (32/128-bit)', 'Host-to-host delivery, logical addressing, dynamic routing, packet fragmentation', 'IPv4, IPv6, ICMP, IGMP, OSPF, BGP, RIP'],
          ['2', 'Data Link', 'Frame', 'Physical MAC Address (48-bit)', 'Hop-to-hop node delivery, physical framing, media access control, error detection (CRC)', 'Ethernet (802.3), Wi-Fi (802.11), PPP, HDLC'],
          ['1', 'Physical', 'Bit (0s and 1s)', 'None (Physical interface/pin)', 'Transmission of raw unstructured bits over physical media, signal encoding, voltages', '100BASE-TX, RS-232, RJ-45, V.35, DSL']
        ]
      },
      sections: [
        {
          heading: '1. Layer-by-Layer Architectural Functions',
          points: [
            '<b>7. Application Layer:</b> Provides network services directly to end-user applications. Implements file access, directory services, and distributed transactions (Protocols: HTTP, FTP, DNS, SMTP, SSH).',
            '<b>6. Presentation Layer:</b> Handles data syntax, translation, data compression (Huffman, Run-length), and cryptographic encryption/decryption (SSL/TLS, ASCII/EBCDIC conversion).',
            '<b>5. Session Layer:</b> Establishes, maintains, synchronizes, and terminates dialogues between cooperating processes. Inserts synchronization checkpoints to enable rollback upon network failure.',
            '<b>4. Transport Layer:</b> Provides reliable or best-effort end-to-end process-to-process delivery. Manages port addressing (16-bit), segment reassembly, flow control (sliding window), and error recovery (TCP/UDP).',
            '<b>3. Network Layer:</b> Responsible for source-to-destination packet delivery across multiple subnets. Handles logical IP addressing, routing table maintenance (OSPF, BGP), and packet fragmentation.',
            '<b>2. Data Link Layer:</b> Transforms raw physical bit streams into error-free frames across node-to-node links. Manages physical MAC addressing (48-bit), framing, media access control (CSMA/CD), and error detection (CRC).',
            '<b>1. Physical Layer:</b> Transmits raw, unstructured bit streams (0s and 1s) over transmission media. Defines electrical voltage levels, optical wavelengths, pinouts, and bit timing.'
          ]
        },
        {
          heading: '2. Data Encapsulation & Protocol Data Unit (PDU) Mapping',
          points: [
            '<b>Encapsulation (Sender Side):</b> As application data descends the stack, each layer prepends its own protocol control header (H7 through H2). The Data Link Layer also appends a trailer (T2) containing the 32-bit CRC checksum. Finally, the physical layer converts the framed bits into electrical, optical, or radio signals.',
            '<b>Decapsulation (Receiver Side):</b> Upon receiving physical signals, the receiver reconstructs the bits, verifies the CRC trailer at the Data Link Layer, strips each corresponding header (H2 to H7), and passes the decapsulated payload upward to the targeted application process.',
            '<b>Peer-to-Peer Communication Principle:</b> Although physical transmission occurs vertically through adjacent layers down to the physical cable, each layer logically communicates directly with its peer layer on the remote host governed by layer-specific protocol rules.'
          ]
        }
      ],
      conclusion: 'The OSI model cleanly isolates networking functions into distinct modular layers, ensuring that changes in physical media or routing protocols do not break user applications.',
      markingScheme: [
        { component: 'OSI Reference Model Definition & ISO Standard Context', marks: '1.0' },
        { component: 'Neat Labelled 7-Layer Stack Architecture Diagram', marks: '1.5' },
        { component: 'Upper Layer Functions (Application, Presentation, Session)', marks: '1.5' },
        { component: 'Lower Layer Functions (Transport, Network, Data Link, Physical)', marks: '2.0' },
        { component: 'Protocol Mapping & Encapsulation Summary', marks: '1.0' }
      ],
      examTip: 'Examiners award full marks when layer names are numbered correctly from 1 (Physical) to 7 (Application) and their corresponding Protocol Data Units (PDU) are explicitly stated.'
    }
  },
  {
    id: 'cn-q2',
    num: 2,
    title: 'OSI vs TCP/IP Protocol Stack Comparison',
    unit: 1,
    verified: 'BEU 2023 · Q.2 / 2025 · 7 Marks',
    years: [2023, 2025],
    marks: 7,
    question: 'Compare the OSI reference model with the TCP/IP protocol suite. Discuss the advantages, layer mappings, and practical limitations of each model.',
    solution: {
      verified: 'BEU 2023 · Q.2 / 2025 · 7 Marks',
      intro: 'While the OSI model is a theoretical, vendor-neutral 7-layer reference framework, the TCP/IP model is a pragmatic 4-layer protocol stack that serves as the actual operational backbone of the global Internet.',
      diagrams: [
        {
          title: 'Layer Mapping: OSI 7-Layer vs TCP/IP 4-Layer Architecture',
          ascii:
`    OSI REFERENCE MODEL                    TCP/IP PROTOCOL SUITE
+-------------------------+             +-------------------------+
| 7. Application Layer    |             |                         |
+-------------------------+ === maps => |  4. Application Layer   |
| 6. Presentation Layer   |             | (HTTP, DNS, SMTP, FTP)  |
+-------------------------+             |                         |
| 5. Session Layer        |             +-------------------------+
+-------------------------+             |  3. Transport Layer     |
| 4. Transport Layer      | === maps => |  (TCP, UDP)             |
+-------------------------+             +-------------------------+
| 3. Network Layer        | === maps => |  2. Internet Layer (IP) |
+-------------------------+             +-------------------------+
| 2. Data Link Layer      |             |  1. Network Access      |
+-------------------------+ === maps => |     Layer (Host-to-Net) |
| 1. Physical Layer       |             |  (Ethernet, Wi-Fi, PPP) |
+-------------------------+             +-------------------------+`
        }
      ],
      table: {
        title: 'Key Structural Differences: OSI vs TCP/IP',
        headers: ['Evaluation Parameter', 'OSI Reference Model', 'TCP/IP Protocol Suite'],
        rows: [
          ['Number of Layers', '7 distinct layers', '4 functional layers'],
          ['Architectural Nature', 'Theoretical reference model', 'Practical implementation model'],
          ['Development Timing', 'Model was created before protocols', 'Protocols created first; model followed'],
          ['Concept Separation', 'Strictly separates Service, Interface, Protocol', 'Does not clearly separate these concepts'],
          ['Transport Delivery', 'Connection-oriented only', 'Both Connection-oriented (TCP) & Connectionless (UDP)'],
          ['Network Layer Delivery', 'Supports both Connectionless & Connection-oriented', 'Strictly Connectionless (IP datagram)'],
          ['Session & Presentation', 'Dedicated layers 5 and 6', 'Integrated directly into application protocols'],
          ['Industry Adoption', 'Low commercial adoption; used for teaching', 'Universal global adoption (World Wide Web)']
        ]
      },
      sections: [
        {
          heading: '1. Practical Strengths & Weaknesses',
          points: [
            '<b>OSI Strengths:</b> Clean abstractions, ideal for network engineering education, vendor-neutral standard.',
            '<b>OSI Weaknesses:</b> High complexity, repetitive session/presentation overhead, poor timing (bad technology, bad timing).',
            '<b>TCP/IP Strengths:</b> Robust, simple, open-standard, scalable, battle-tested across billions of devices.',
            '<b>TCP/IP Weaknesses:</b> Poor distinction between interface and protocol; tightly coupled to IP suite.'
          ]
        }
      ],
      conclusion: 'The OSI model excels as a conceptual guide for protocol design, but TCP/IP won the global networking standard due to its simplicity, resilience, and free open implementation.',
      markingScheme: [
        { component: 'Architectural Comparison & Layer Mapping Diagram', marks: '2.0' },
        { component: 'Detailed Comparison Table (≥6 technical rows)', marks: '2.5' },
        { component: 'Strengths and Limitations Analysis', marks: '1.5' },
        { component: 'Summary & Real-World Adoption Context', marks: '1.0' }
      ],
      examTip: 'Draw the layer mapping diagram showing how OSI Layers 5, 6, and 7 collapse into TCP/IP Application layer, and Layers 1 and 2 collapse into Network Access layer.'
    }
  },
  {
    id: 'cn-q28',
    num: 28,
    title: 'TCP/IP Model and Its Criticisms',
    unit: 1,
    verified: 'BEU 2024 · Q.2(a) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Draw and explain the TCP/IP model used for the networks. Also explain the critiques of TCP/IP model.',
    solution: {
      verified: 'BEU 2024 · Q.2(a) · 7 Marks',
      intro: 'The TCP/IP model provides a 4-layer architecture for communication over interconnected networks. Developed through ARPANET research, it became the foundation of the modern Internet.',
      diagrams: [
        {
          title: 'Neat Labelled Architecture Diagram of TCP/IP Model',
          ascii:
`+-------------------------------------------------------------+
|                     APPLICATION LAYER                       |
|   HTTP, FTP, SMTP, DNS, SSH, SNMP, Telnet                   |
+-------------------------------------------------------------+
|                      TRANSPORT LAYER                        |
|   TCP (Reliable, Conn-Oriented) | UDP (Fast, Connectionless)|
+-------------------------------------------------------------+
|                      INTERNET LAYER                         |
|   IPv4, IPv6, ICMP, IGMP, ARP, RARP                         |
+-------------------------------------------------------------+
|                 NETWORK ACCESS LAYER (Link)                 |
|   Ethernet (802.3), Wi-Fi (802.11), PPP, Frame Relay        |
+-------------------------------------------------------------+`
        }
      ],
      table: {
        title: 'TCP/IP 4-Layer Architecture Summary & Protocol Stack',
        headers: ['Layer #', 'Layer Name', 'PDU / Data Unit', 'Primary Addressing', 'Core Responsibilities', 'Representative Protocols'],
        rows: [
          ['4', 'Application Layer', 'Application Message / Data', 'Application Names / Port URLs', 'Direct application services, data formatting, encryption, session management', 'HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet, SNMP'],
          ['3', 'Transport Layer', 'Segment (TCP) / Datagram (UDP)', 'Port Number (16-bit, 0–65535)', 'End-to-end process delivery, connection management, flow control (rwnd), error recovery', 'TCP (connection-oriented, reliable), UDP (connectionless, best-effort)'],
          ['2', 'Internet Layer', 'Datagram / Packet', 'IP Address (IPv4: 32-bit, IPv6: 128-bit)', 'Host-to-host delivery, logical addressing, dynamic routing, packet fragmentation and reassembly', 'IPv4, IPv6, ICMP (diagnostics), IGMP (multicast), ARP, RARP'],
          ['1', 'Network Access Layer', 'Frame / Physical Bits', 'Physical MAC Address (48-bit)', 'Hardware interface to physical medium, frame encapsulation, media access control, bit signaling', 'Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), Point-to-Point Protocol (PPP), Frame Relay']
        ]
      },
      sections: [
        {
          heading: '1. Layer Architectural Functions & Protocol Suite',
          points: [
            '<b>Layer 4 — Application Layer:</b> Corresponds to the combined Application, Presentation, and Session layers of the OSI model. It handles high-level user communications, data representation, formatting, compression, and session dialogs. Common protocols include HTTP/HTTPS (web browsing), FTP (file transfer), SMTP/IMAP (email), DNS (hostname translation), and SSH (secure remote terminal).',
            '<b>Layer 3 — Transport Layer:</b> Provides end-to-end, process-to-process communication between host applications using 16-bit port numbers (0–65535). It implements two primary transport protocols: TCP (RFC 793), which guarantees ordered, error-checked, flow-controlled, and congestion-controlled byte streams; and UDP (RFC 768), which provides low-latency, lightweight, connectionless datagram transport without retransmissions.',
            '<b>Layer 2 — Internet Layer:</b> Responsible for source-to-destination logical host addressing and packet routing across heterogeneous, interconnected network fabrics. It encapsulates transport segments into IP datagrams (IPv4 32-bit or IPv6 128-bit), performs fragmentation and reassembly when exceeding path MTU, and determines optimum transmission paths using routing protocols. Companion protocols include ICMP (network diagnostics and error reporting), IGMP (multicast group management), and ARP (translating 32-bit IP addresses to 48-bit hardware MAC addresses).',
            '<b>Layer 1 — Network Access Layer (Host-to-Network):</b> The foundational layer that manages the physical transmission of binary bits over communication media. It packages IP datagrams into physical frames (Ethernet 802.3, Wi-Fi 802.11, PPP, optical SONET), assigns hardware MAC addresses, arbitrates media access control, detects link-level bit errors, and modulates digital bits into electrical, optical, or radio frequency waveforms.'
          ]
        },
        {
          heading: '2. Critiques & Limitations of the TCP/IP Model',
          points: [
            '<b>1. No Clear Separation of Service, Interface, and Protocol:</b> A major architectural flaw is that TCP/IP does not rigorously distinguish between what a layer does (service), how to access it (interface), and how it is implemented (protocol). In contrast, the OSI model strictly defines these boundaries, making protocol replacement cleaner.',
            '<b>2. Not Truly General Purpose:</b> The TCP/IP model was retrofitted specifically around the TCP and IP protocols after they were deployed. Consequently, it is ill-suited to describe non-IP architectures such as Bluetooth personal area networks, cellular telephony signaling networks, or sensor mesh networks.',
            '<b>3. Host-to-Network Layer Ambiguity:</b> The Network Access Layer is not a true cohesive protocol layer in the conventional sense; rather, it is an interface between the network software and the underlying hardware drivers. It completely obscures the critical boundary between Data Link framing (MAC) and Physical Layer bit signaling (voltages/frequencies).',
            '<b>4. Protocols Preceded the Model:</b> Because the protocols were designed first by ARPA researchers to solve immediate connectivity needs and the four-layer model was documented later, the fit is imperfect, resulting in redundant functionality (e.g., error detection occurring at link, network, and transport layers).',
            '<b>5. Lack of Dedicated Session and Presentation Layers:</b> By folding session management and presentation syntax into the application layer, every individual application protocol must reinvent its own encryption (TLS), compression, and checkpointing mechanisms, leading to significant code duplication.'
          ]
        }
      ],
      conclusion: 'The TCP/IP model is pragmatic, resilient, and powers the entire global Internet, whereas the OSI model remains the gold standard for academic instruction, theoretical protocol engineering, and modular network design.',
      markingScheme: [
        { component: 'Introduction & Layered Definition', marks: '0.5' },
        { component: 'Neat Labelled 4-Layer Architecture Diagram', marks: '1.5' },
        { component: 'Detailed Functions of All Four Layers', marks: '2.0' },
        { component: 'Detailed Criticisms of TCP/IP Model (≥4 points)', marks: '2.0' },
        { component: 'Conclusion & Summary', marks: '1.0' }
      ],
      examTip: 'Do not forget the criticisms! The question explicitly asks for "critiques". Dedicate at least 4 clear bullet points to secure the 2.0 marks allocated to critiques.'
    }
  },
  {
    id: 'cn-q50',
    num: 50,
    title: 'Distinguishing Differences Between OSI and TCP/IP Models',
    unit: 1,
    verified: 'BEU 2023 · Q.3(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Write down the distinguishing differences between OSI and TCP/IP model.',
    solution: {
      verified: 'BEU 2023 · Q.3(a) · 7 Marks',
      intro: 'Computer networks require standardized communication architectures so that diverse devices, operating systems, and distributed applications can seamlessly exchange data. The two foundational layered architectures are the ISO OSI 7-Layer Reference Model and the TCP/IP 4-Layer Internet Protocol Suite. While the OSI model was developed by ISO as a formal, vendor-neutral conceptual reference architecture, the TCP/IP model emerged from ARPANET research and standardizes the operational protocol family powering the global Internet.',
      diagrams: [
        {
          title: 'Layer Mapping: OSI 7-Layer Reference Model vs TCP/IP 4-Layer Internet Model',
          ascii:
`          OSI REFERENCE MODEL                       TCP/IP MODEL
     +-----------------------------+
L7   |      APPLICATION LAYER      |----+
     +-----------------------------+    |
L6   |     PRESENTATION LAYER      |----+---> +-----------------------------+
     +-----------------------------+    |     |      APPLICATION LAYER      |
L5   |        SESSION LAYER        |----+     | (HTTP, HTTPS, DNS, SMTP, FTP)|
     +-----------------------------+          +-----------------------------+
L4   |       TRANSPORT LAYER       |--------> |       TRANSPORT LAYER       |
     | (End-to-End Reliability)    |          |   (TCP: Conn, UDP: Datagram)|
     +-----------------------------+          +-----------------------------+
L3   |        NETWORK LAYER        |--------> |       INTERNET LAYER        |
     | (Logical Addr, OSPF, BGP)   |          |  (IPv4, IPv6, ICMP, Routing)|
     +-----------------------------+          +-----------------------------+
L2   |       DATA LINK LAYER       |----+---> +-----------------------------+
     | (Framing, MAC, Switch)      |    |     |    NETWORK ACCESS / LINK    |
     +-----------------------------+    |     | (Ethernet, Wi-Fi 802.11,    |
L1   |       PHYSICAL LAYER        |----+     |  Physical Cables, Optical)  |
     | (Bits, Voltage, Frequency)  |          +-----------------------------+
     +-----------------------------+`
        },
        {
          title: 'Practical Example: Step-by-Step Data Flow When Opening a Website',
          ascii:
`                     USER OPENS WEB BROWSER (HTTPS)
                                    |
                                    v
       +---------------------------------------------------------+
       | 1. APPLICATION LAYER (HTTP / HTTPS / DNS)               |
       |    Constructs HTTP GET request message payload.         |
       +---------------------------------------------------------+
                                    |
                                    v
       +---------------------------------------------------------+
       | 2. TRANSPORT LAYER (TCP)                                |
       |    Establishes 3-way handshake; adds TCP port header.   |
       +---------------------------------------------------------+
                                    |
                                    v
       +---------------------------------------------------------+
       | 3. INTERNET LAYER (IPv4 / IPv6)                         |
       |    Adds Source & Destination IP addresses; routes packet.|
       +---------------------------------------------------------+
                                    |
                                    v
       +---------------------------------------------------------+
       | 4. NETWORK ACCESS LAYER (Ethernet / Wi-Fi)              |
       |    Adds MAC header + CRC trailer; transmits on physical.|
       +---------------------------------------------------------+
                                    |
                                    v
                         PHYSICAL TRANSMISSION MEDIUM`
        }
      ],
      table: {
        title: 'Comprehensive Distinguishing Differences: OSI Reference Model vs TCP/IP Protocol Suite',
        headers: ['Comparison Criterion', 'OSI Reference Model (ISO)', 'TCP/IP Internet Protocol Suite'],
        rows: [
          ['Full Expansion', 'Open Systems Interconnection', 'Transmission Control Protocol / Internet Protocol'],
          ['Standardizing Body', 'International Organization for Standardization (ISO)', 'Internet Engineering Task Force (IETF) / DARPA'],
          ['Number of Layers', '7 distinct, rigid layers', '4 practical functional layers (or 5 in some texts)'],
          ['Architectural Nature', 'Theoretical reference architecture', 'Pragmatic, operational protocol suite'],
          ['Development Approach', 'Model was standardized BEFORE protocols were designed', 'Protocols were implemented first; model followed later'],
          ['Upper Layer Services', 'Three separate layers: Application, Presentation, Session', 'All upper services combined into a single Application layer'],
          ['Transport Services', 'Abstract transport service definitions; connection-oriented', 'Explicit protocols: TCP (connection-oriented), UDP (datagram)'],
          ['Network Layer Service', 'Defines both Connectionless and Connection-oriented', 'Strictly Connectionless (IP best-effort packet delivery)'],
          ['Hardware Layering', 'Separates Data Link (L2) and Physical (L1) cleanly', 'Combines Data Link and Physical into Network Access Layer'],
          ['Protocol Independence', 'Strictly independent of any single protocol implementation', 'Tightly coupled to the IP protocol family'],
          ['Concept Separation', 'Explicitly separates Services, Interfaces, and Protocols', 'Does not clearly isolate service, interface, and protocol'],
          ['Practical Adoption', 'Mainly used for education, specifications, and diagnostics', 'Universal global adoption (foundation of World Wide Web)'],
          ['Layer Boundaries', 'Strict, formal architectural boundaries', 'Flexible, pragmatic boundaries (e.g. TLS, QUIC)'],
          ['Representative Protocols', 'X.25, ISO-TP4, CLNP, FTAM (largely historical)', 'HTTP, HTTPS, DNS, TCP, UDP, IPv4, IPv6, Ethernet']
        ]
      },
      sections: [
        {
          heading: '1. Major Distinguishing Points in Detail',
          points: [
            '<b>A. Number of Layers:</b> The OSI model mandates 7 layers, whereas the TCP/IP model consolidates them into 4 functional layers. OSI Layers 5, 6, and 7 collapse into TCP/IP Application Layer; Layers 1 and 2 collapse into Network Access Layer.',
            '<b>B. Treatment of Session and Presentation:</b> OSI provides dedicated Session (dialogue control, checkpoints) and Presentation (syntax, ASCII/EBCDIC, encryption) layers. In TCP/IP, these functions are integrated directly into application libraries (e.g., OpenSSL, TLS, JSON encoders).',
            '<b>C. Design Philosophy:</b> The OSI model prioritized formal top-down architectural perfection before writing code. In contrast, TCP/IP adopted the bottom-up IETF philosophy: <i>"We reject kings, presidents and voting; we believe in rough consensus and running code."</i>',
            '<b>D. Internetworking Layer:</b> OSI describes network services abstractly (supporting both connection-oriented CONS and connectionless CLNS). TCP/IP mandates a single, universal connectionless Internet Protocol (IP) that provides scalable best-effort delivery across heterogeneous subnets.',
            '<b>E. Real-World Viability:</b> OSI suffered from the "bad timing, bad technology, bad implementation" syndrome. TCP/IP was freely distributed with BSD Unix, becoming the dominant global communications architecture.'
          ]
        },
        {
          heading: '2. Architectural Advantages of Both Models',
          points: [
            '<b>Advantages of OSI Model:</b> Clear conceptual separation makes it the gold standard for university curricula, professional certifications, and systematic network troubleshooting. Clean modularity ensures that hardware changes do not invalidate higher-layer specifications.',
            '<b>Advantages of TCP/IP Model:</b> Lightweight, battle-tested across billions of devices, resilient against node failures, and natively supports heterogeneous physical media (copper, fiber, wireless satellite).'
          ]
        }
      ],
      conclusion: 'Both models employ layered abstraction to structure computer communication. The OSI model serves as the ideal theoretical reference architecture for system analysis and modular design, whereas the TCP/IP model provides the battle-tested, pragmatic protocol implementation that powers the global Internet.',
      markingScheme: [
        { component: 'Introduction & Clear Definitions of Both Models', marks: '0.5' },
        { component: 'Neat Labelled OSI 7-Layer Architecture Diagram', marks: '1.0' },
        { component: 'Neat Labelled TCP/IP 4-Layer Architecture Diagram', marks: '1.0' },
        { component: 'Accurate Layer-to-Layer Architectural Mapping', marks: '1.0' },
        { component: 'Comprehensive Comparison Table (≥10 criteria)', marks: '2.5' },
        { component: 'Practical Web-Browsing Example Across Layers', marks: '0.5' },
        { component: 'Conclusion & Adoption Summary', marks: '0.5' }
      ],
      examTip: 'Bhai, Q.3(a) mein "distinguishing differences" poocha gaya hai, isliye 10–12 points ka comparison table sabse important hoga. Dono models ka layer diagram aur correct mapping bhi likhna. Sirf OSI ke seven layers explain karna is question ka complete answer nahi hai.'
    }
  }
];

const toSolution = ({id, solution}) => ({id, ...solution});

export const unit1Solutions = [
  ...unit1Entries.map(toSolution),
  {
    id: 'cn-original-2023-100602-q3a',
    verified: 'BEU 2023 · Q.3(a) · 7 Marks · Cross-checked scan',
    intro: 'The Open Systems Interconnection (OSI) reference model (developed by ISO in 1984) and the Transmission Control Protocol/Internet Protocol (TCP/IP) suite (developed by DARPA in the 1970s) are the two foundational layered architectural models in computer networking. While the OSI model serves as an abstract, vendor-independent theoretical blueprint defining 7 modular layers, TCP/IP represents the pragmatic, operational 4-layer protocol stack that powers the modern global Internet.',
    diagrams: [
      {
        title: 'Architectural Comparison & Layer Mapping: OSI 7-Layer vs TCP/IP 4-Layer Architecture',
        ascii:
`       OSI 7-LAYER MODEL                       TCP/IP 4-LAYER SUITE
+-------------------------------+             +-------------------------------+
|  7. APPLICATION LAYER         |             |                               |
|  (HTTP, FTP, SMTP, DNS)       |             |                               |
+-------------------------------+             |                               |
|  6. PRESENTATION LAYER        | ===maps===> |     4. APPLICATION LAYER      |
|  (SSL/TLS, ASCII, JPEG)       |             |  (HTTP, HTTPS, FTP, SMTP, DNS)|
+-------------------------------+             |                               |
|  5. SESSION LAYER             |             |                               |
|  (RPC, NetBIOS, Sockets)      |             |                               |
+-------------------------------+             +-------------------------------+
|  4. TRANSPORT LAYER           |             |     3. TRANSPORT LAYER        |
|  (TCP, UDP, Port 16-bit)      | ===maps===> |     (TCP, UDP, SCTP)          |
+-------------------------------+             +-------------------------------+
|  3. NETWORK LAYER             |             |     2. INTERNET LAYER         |
|  (IPv4, IPv6, ICMP, Routing)  | ===maps===> |     (IPv4, IPv6, ICMP, ARP)   |
+-------------------------------+             +-------------------------------+
|  2. DATA LINK LAYER           |             |     1. NETWORK ACCESS /       |
|  (Ethernet, MAC 48-bit, LLC)  | ===maps===> |        HOST-TO-NETWORK        |
+-------------------------------+             |  (Ethernet, Wi-Fi, PPP, Fiber)|
|  1. PHYSICAL LAYER            |             |                               |
|  (Bits, Cables, Hub, Signals) |             |                               |
+-------------------------------+             +-------------------------------+`
      }
    ],
    table: {
      title: 'Comprehensive Structural & Operational Comparison: OSI vs TCP/IP',
      headers: ['Evaluation Parameter', 'OSI Reference Model (ISO)', 'TCP/IP Protocol Suite (DARPA)'],
      rows: [
        ['Layer Count', '7 strictly separated layers (Application to Physical)', '4 operational layers (Application, Transport, Internet, Network Access)'],
        ['Model Nature', 'Theoretical, vendor-neutral conceptual reference framework', 'Practical, protocol-driven operational implementation architecture'],
        ['Development Timing', 'Model was standardized (1984) before protocols were built', 'Protocols were developed (1970s ARPANET) before the model was formalized'],
        ['Separation of Concepts', 'Explicitly distinguishes Services, Interfaces, and Protocols', 'Does not clearly separate Services, Interfaces, and Protocols'],
        ['Upper Layers (5, 6, 7)', 'Session, Presentation, and Application are three distinct layers', 'Session and Presentation functions are integrated into the Application layer'],
        ['Transport Layer', 'Guarantees reliable, connection-oriented end-to-end transport', 'Supports both connection-oriented (TCP) and connectionless (UDP) transport'],
        ['Network / Internet Layer', 'Supports both connectionless (CLNP) and connection-oriented (CONS)', 'Strictly connectionless (IP datagram); reliability is handled at Transport layer'],
        ['Protocol Dependency', 'Protocol-independent; can describe any networking protocol', 'Protocol-dependent; architectural layers are built around IP, TCP, and UDP'],
        ['Encapsulation PDUs', 'APDU → PPDU → SPDU → Segment (TPDU) → Packet → Frame → Bits', 'Data (Stream/Message) → Segment/Datagram → Packet → Frame → Bits'],
        ['Global Adoption', 'Low commercial adoption in software; primarily used for education', 'Universal global adoption; standard backbone of the World Wide Web']
      ]
    },
    sections: [
      {
        heading: '1. Core Architectural Similarities',
        points: [
          '<b>Layered Organization & Modularity:</b> Both models use a hierarchical, modular layered structure where each layer provides well-defined services to the layer above it and consumes services from the layer below it, simplifying troubleshooting and software development.',
          '<b>End-to-End Transport Delivery:</b> Both models contain a dedicated Transport layer (Layer 4) responsible for process-to-process delivery, segmentation, flow control (sliding window), and error recovery.',
          '<b>Logical Addressing & Routing:</b> Both models implement a distinct network/internetwork layer responsible for logical addressing (IP addresses), packet forwarding, and path determination across heterogeneous subnets.',
          '<b>Encapsulation & Decapsulation:</b> Both architectures use downstream header addition (encapsulation) at the sender and upstream header removal (decapsulation) at the receiver to maintain protocol state.',
          '<b>Interoperability Standard:</b> Both models were created to enable heterogeneous computer systems from different manufacturers (e.g., IBM, DEC, Sun, Intel) to communicate seamlessly without hardware lock-in.'
        ]
      },
      {
        heading: '2. Critical Structural & Operational Differences',
        points: [
          '<b>Service vs Protocol Decoupling:</b> The OSI model strictly separates services (what a layer does), interfaces (how a layer is accessed), and protocols (how a layer works). In TCP/IP, the model was fitted to pre-existing protocols, making it difficult to replace protocols without redesigning the layer.',
          '<b>Network Layer Philosophy:</b> OSI allows connection-oriented virtual circuits at Layer 3 (X.25 style), whereas TCP/IP insists that the Internet Layer (IP) must remain strictly connectionless and stateless ("dumb network, smart endpoints"), delegating all connection state and retransmission to host transport layers.',
          '<b>Combination of Session and Presentation:</b> OSI devotes two whole layers to Session (dialog control, checkpoints) and Presentation (syntax translation, ASN.1, encryption). TCP/IP recognized that these tasks are application-specific and combined them directly into application protocols (e.g., SSL/TLS and HTTP).'
        ]
      },
      {
        heading: '3. Need for Layered Architecture in Computer Networks',
        points: [
          '<b>1. Reduces System Complexity:</b> Breaks the colossal task of global data communication into smaller, self-contained, and manageable modular components.',
          '<b>2. Simplifies Troubleshooting & Fault Isolation:</b> Network engineers can systematically isolate errors to specific layers (e.g., ping tests Layer 3 connectivity; cable tester checks Layer 1).',
          '<b>3. Promotes Standardization & Interoperability:</b> Standard layer interfaces enable hardware and software from competing vendors (Cisco, Juniper, Linux, Windows) to interoperate seamlessly.',
          '<b>4. Supports Independent Evolution & Development:</b> Modifying a protocol at one layer (e.g., upgrading from IPv4 to IPv6 or from copper Ethernet to optical fiber) does not require altering higher-level application software.',
          '<b>5. Modularity & Code Reusability:</b> Upper layers do not need to rewrite code for physical bit transmission; they simply invoke lower-layer services.'
        ]
      }
    ],
    conclusion: 'The OSI model remains the peerless pedagogical reference model for teaching network architecture and understanding protocol boundaries, while the TCP/IP model is the robust, battle-tested operational standard that built and powers the global Internet.',
    markingScheme: [
      { component: 'Formal Definition & Origins (ISO OSI vs DARPA TCP/IP)', marks: '1.0' },
      { component: 'Neat Labelled Layer-Mapping Architectural Diagram', marks: '1.5' },
      { component: 'Key Similarities Breakdown (Layering, Transport, Encapsulation)', marks: '1.5' },
      { component: 'Comprehensive 10-Parameter Comparative Table', marks: '1.5' },
      { component: 'Need for Layered Architecture (5+ Points) & Conclusion', marks: '1.5' }
    ],
    examTip: 'Draw the 7-to-4 layer mapping diagram first. Clearly show how OSI Layers 5, 6, 7 merge into TCP/IP Application Layer and Layers 1, 2 merge into Network Access Layer. Mentioning the reasons for a layered architecture guarantees full 7/7 marks from BEU examiners.'
  },
];
export const unit1SupplementalSolutions = [];
