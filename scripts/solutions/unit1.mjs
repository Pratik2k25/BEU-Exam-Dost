export const unit1Solutions = [
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
            'Downstream transmission adds headers (H7 to H2) and a Data Link trailer (T2 with CRC-32).',
            'Upstream reception decapsulates and strips each layer header, passing the payload upward to the receiving application process.'
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
      sections: [
        {
          heading: '1. Layer Architectural Functions & Protocol Suite',
          points: [
            '<b>Application Layer:</b> Handles user interaction and high-level communications. Combines OSI application, presentation, and session services. Protocols: HTTP/HTTPS, FTP, SMTP, DNS.',
            '<b>Transport Layer:</b> Manages process-to-process delivery. TCP provides reliable byte-stream delivery with sliding-window flow control and congestion control. UDP provides lightweight, connectionless datagram transport.',
            '<b>Internet Layer:</b> Provides logical host addressing and best-effort routing across heterogeneous networks using IP. Companion protocols include ICMP (diagnostics) and ARP (address translation).',
            '<b>Network Access Layer:</b> Manages physical frame transmission over hardware media (Ethernet 802.3, Wi-Fi 802.11, optical links).'
          ]
        },
        {
          heading: '2. Critiques & Limitations of the TCP/IP Model',
          points: [
            '<b>No Clear Separation of Concepts:</b> Does not clearly distinguish between service, interface, and protocol (which the OSI model rigorously defines).',
            '<b>Not Truly General:</b> Strongly tailored to the TCP/IP protocol suite; difficult to describe other protocol architectures (e.g., Bluetooth, cellular LTE) using TCP/IP.',
            '<b>Host-to-Network Ambiguity:</b> The lowest layer is not really a protocol layer, but an interface between network and data link protocols.',
            '<b>No Physical/Data Link Separation:</b> Blends framing, MAC sublayers, and electrical bit signaling, obscuring hardware boundaries.',
            '<b>Protocols Preceded the Model:</b> Protocols were designed first and the model was retrofitted later, resulting in an imperfect architectural description.'
          ]
        }
      ],
      conclusion: 'The TCP/IP model is highly practical and dominant in real-world deployments, while the OSI model remains the superior framework for structured teaching and theoretical analysis.',
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
