// BEU Exam Dost — Computer Networks 7-Mark Solutions Data Bank
// Auto-compiled module preserving exact numerical, character, symbol, and diagram fidelity.

export const cnSolutions = {
  "cn-q1": {
    "verified": "BEU 2024 · Q.2 / 2025 · 7 Marks",
    "intro": "The Open Systems Interconnection (OSI) reference model, developed by the ISO in 1984, provides an abstract, modular 7-layer architecture for standardizing network communication between heterogeneous computer systems.",
    "diagrams": [
      {
        "title": "OSI 7-Layer Architecture Stack & Encapsulation Flow",
        "ascii": "+-----------------------------------------------------------+  Data Unit\n| 7. APPLICATION LAYER  (HTTP, FTP, DNS, SMTP, Telnet)     |  Data\n+-----------------------------------------------------------+    |\n| 6. PRESENTATION LAYER (SSL/TLS, ASCII, JPEG, Encryption)  |  Data\n+-----------------------------------------------------------+    |\n| 5. SESSION LAYER      (RPC, NetBIOS, PPTP, Sockets)       |  Data\n+-----------------------------------------------------------+    | [Segment]\n| 4. TRANSPORT LAYER    (TCP, UDP, SCTP, Port Addressing)   |  Segment\n+-----------------------------------------------------------+    | [Packet]\n| 3. NETWORK LAYER      (IPv4, IPv6, ICMP, OSPF, BGP)       |  Packet\n+-----------------------------------------------------------+    | [Frame]\n| 2. DATA LINK LAYER    (Ethernet, PPP, Switch, MAC 48-bit) |  Frame\n+-----------------------------------------------------------+    | [Bits]\n| 1. PHYSICAL LAYER     (Cables, Hub, Repeater, NRZ/Biphase)|  Bits\n+-----------------------------------------------------------+    v"
      }
    ],
    "sections": [
      {
        "heading": "1. Layer-by-Layer Architectural Functions",
        "points": [
          "<b>7. Application Layer:</b> Provides network services directly to end-user applications. Implements file access, directory services, and distributed transactions (Protocols: HTTP, FTP, DNS, SMTP, SSH).",
          "<b>6. Presentation Layer:</b> Handles data syntax, translation, data compression (Huffman, Run-length), and cryptographic encryption/decryption (SSL/TLS, ASCII/EBCDIC conversion).",
          "<b>5. Session Layer:</b> Establishes, maintains, synchronizes, and terminates dialogues between cooperating processes. Inserts synchronization checkpoints to enable rollback upon network failure.",
          "<b>4. Transport Layer:</b> Provides reliable or best-effort end-to-end process-to-process delivery. Manages port addressing (16-bit), segment reassembly, flow control (sliding window), and error recovery (TCP/UDP).",
          "<b>3. Network Layer:</b> Responsible for source-to-destination packet delivery across multiple subnets. Handles logical IP addressing, routing table maintenance (OSPF, BGP), and packet fragmentation.",
          "<b>2. Data Link Layer:</b> Transforms raw physical bit streams into error-free frames across node-to-node links. Manages physical MAC addressing (48-bit), framing, media access control (CSMA/CD), and error detection (CRC).",
          "<b>1. Physical Layer:</b> Transmits raw, unstructured bit streams (0s and 1s) over transmission media. Defines electrical voltage levels, optical wavelengths, pinouts, and bit timing."
        ]
      },
      {
        "heading": "2. Data Encapsulation & Protocol Data Unit (PDU) Mapping",
        "points": [
          "Downstream transmission adds headers (H7 to H2) and a Data Link trailer (T2 with CRC-32).",
          "Upstream reception decapsulates and strips each layer header, passing the payload upward to the receiving application process."
        ]
      }
    ],
    "conclusion": "The OSI model cleanly isolates networking functions into distinct modular layers, ensuring that changes in physical media or routing protocols do not break user applications.",
    "markingScheme": [
      {
        "component": "OSI Reference Model Definition & ISO Standard Context",
        "marks": "1.0"
      },
      {
        "component": "Neat Labelled 7-Layer Stack Architecture Diagram",
        "marks": "1.5"
      },
      {
        "component": "Upper Layer Functions (Application, Presentation, Session)",
        "marks": "1.5"
      },
      {
        "component": "Lower Layer Functions (Transport, Network, Data Link, Physical)",
        "marks": "2.0"
      },
      {
        "component": "Protocol Mapping & Encapsulation Summary",
        "marks": "1.0"
      }
    ],
    "examTip": "Examiners award full marks when layer names are numbered correctly from 1 (Physical) to 7 (Application) and their corresponding Protocol Data Units (PDU) are explicitly stated."
  },
  "cn-q2": {
    "verified": "BEU 2023 · Q.2 / 2025 · 7 Marks",
    "intro": "While the OSI model is a theoretical, vendor-neutral 7-layer reference framework, the TCP/IP model is a pragmatic 4-layer protocol stack that serves as the actual operational backbone of the global Internet.",
    "diagrams": [
      {
        "title": "Layer Mapping: OSI 7-Layer vs TCP/IP 4-Layer Architecture",
        "ascii": "    OSI REFERENCE MODEL                    TCP/IP PROTOCOL SUITE\n+-------------------------+             +-------------------------+\n| 7. Application Layer    |             |                         |\n+-------------------------+ === maps => |  4. Application Layer   |\n| 6. Presentation Layer   |             | (HTTP, DNS, SMTP, FTP)  |\n+-------------------------+             |                         |\n| 5. Session Layer        |             +-------------------------+\n+-------------------------+             |  3. Transport Layer     |\n| 4. Transport Layer      | === maps => |  (TCP, UDP)             |\n+-------------------------+             +-------------------------+\n| 3. Network Layer        | === maps => |  2. Internet Layer (IP) |\n+-------------------------+             +-------------------------+\n| 2. Data Link Layer      |             |  1. Network Access      |\n+-------------------------+ === maps => |     Layer (Host-to-Net) |\n| 1. Physical Layer       |             |  (Ethernet, Wi-Fi, PPP) |\n+-------------------------+             +-------------------------+"
      }
    ],
    "table": {
      "title": "Key Structural Differences: OSI vs TCP/IP",
      "headers": [
        "Evaluation Parameter",
        "OSI Reference Model",
        "TCP/IP Protocol Suite"
      ],
      "rows": [
        [
          "Number of Layers",
          "7 distinct layers",
          "4 functional layers"
        ],
        [
          "Architectural Nature",
          "Theoretical reference model",
          "Practical implementation model"
        ],
        [
          "Development Timing",
          "Model was created before protocols",
          "Protocols created first; model followed"
        ],
        [
          "Concept Separation",
          "Strictly separates Service, Interface, Protocol",
          "Does not clearly separate these concepts"
        ],
        [
          "Transport Delivery",
          "Connection-oriented only",
          "Both Connection-oriented (TCP) & Connectionless (UDP)"
        ],
        [
          "Network Layer Delivery",
          "Supports both Connectionless & Connection-oriented",
          "Strictly Connectionless (IP datagram)"
        ],
        [
          "Session & Presentation",
          "Dedicated layers 5 and 6",
          "Integrated directly into application protocols"
        ],
        [
          "Industry Adoption",
          "Low commercial adoption; used for teaching",
          "Universal global adoption (World Wide Web)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Practical Strengths & Weaknesses",
        "points": [
          "<b>OSI Strengths:</b> Clean abstractions, ideal for network engineering education, vendor-neutral standard.",
          "<b>OSI Weaknesses:</b> High complexity, repetitive session/presentation overhead, poor timing (bad technology, bad timing).",
          "<b>TCP/IP Strengths:</b> Robust, simple, open-standard, scalable, battle-tested across billions of devices.",
          "<b>TCP/IP Weaknesses:</b> Poor distinction between interface and protocol; tightly coupled to IP suite."
        ]
      }
    ],
    "conclusion": "The OSI model excels as a conceptual guide for protocol design, but TCP/IP won the global networking standard due to its simplicity, resilience, and free open implementation.",
    "markingScheme": [
      {
        "component": "Architectural Comparison & Layer Mapping Diagram",
        "marks": "2.0"
      },
      {
        "component": "Detailed Comparison Table (≥6 technical rows)",
        "marks": "2.5"
      },
      {
        "component": "Strengths and Limitations Analysis",
        "marks": "1.5"
      },
      {
        "component": "Summary & Real-World Adoption Context",
        "marks": "1.0"
      }
    ],
    "examTip": "Draw the layer mapping diagram showing how OSI Layers 5, 6, and 7 collapse into TCP/IP Application layer, and Layers 1 and 2 collapse into Network Access layer."
  },
  "cn-q28": {
    "verified": "BEU 2024 · Q.2(a) · 7 Marks",
    "intro": "The TCP/IP model provides a 4-layer architecture for communication over interconnected networks. Developed through ARPANET research, it became the foundation of the modern Internet.",
    "diagrams": [
      {
        "title": "Neat Labelled Architecture Diagram of TCP/IP Model",
        "ascii": "+-------------------------------------------------------------+\n|                     APPLICATION LAYER                       |\n|   HTTP, FTP, SMTP, DNS, SSH, SNMP, Telnet                   |\n+-------------------------------------------------------------+\n|                      TRANSPORT LAYER                        |\n|   TCP (Reliable, Conn-Oriented) | UDP (Fast, Connectionless)|\n+-------------------------------------------------------------+\n|                      INTERNET LAYER                         |\n|   IPv4, IPv6, ICMP, IGMP, ARP, RARP                         |\n+-------------------------------------------------------------+\n|                 NETWORK ACCESS LAYER (Link)                 |\n|   Ethernet (802.3), Wi-Fi (802.11), PPP, Frame Relay        |\n+-------------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Layer Architectural Functions & Protocol Suite",
        "points": [
          "<b>Application Layer:</b> Handles user interaction and high-level communications. Combines OSI application, presentation, and session services. Protocols: HTTP/HTTPS, FTP, SMTP, DNS.",
          "<b>Transport Layer:</b> Manages process-to-process delivery. TCP provides reliable byte-stream delivery with sliding-window flow control and congestion control. UDP provides lightweight, connectionless datagram transport.",
          "<b>Internet Layer:</b> Provides logical host addressing and best-effort routing across heterogeneous networks using IP. Companion protocols include ICMP (diagnostics) and ARP (address translation).",
          "<b>Network Access Layer:</b> Manages physical frame transmission over hardware media (Ethernet 802.3, Wi-Fi 802.11, optical links)."
        ]
      },
      {
        "heading": "2. Critiques & Limitations of the TCP/IP Model",
        "points": [
          "<b>No Clear Separation of Concepts:</b> Does not clearly distinguish between service, interface, and protocol (which the OSI model rigorously defines).",
          "<b>Not Truly General:</b> Strongly tailored to the TCP/IP protocol suite; difficult to describe other protocol architectures (e.g., Bluetooth, cellular LTE) using TCP/IP.",
          "<b>Host-to-Network Ambiguity:</b> The lowest layer is not really a protocol layer, but an interface between network and data link protocols.",
          "<b>No Physical/Data Link Separation:</b> Blends framing, MAC sublayers, and electrical bit signaling, obscuring hardware boundaries.",
          "<b>Protocols Preceded the Model:</b> Protocols were designed first and the model was retrofitted later, resulting in an imperfect architectural description."
        ]
      }
    ],
    "conclusion": "The TCP/IP model is highly practical and dominant in real-world deployments, while the OSI model remains the superior framework for structured teaching and theoretical analysis.",
    "markingScheme": [
      {
        "component": "Introduction & Layered Definition",
        "marks": "0.5"
      },
      {
        "component": "Neat Labelled 4-Layer Architecture Diagram",
        "marks": "1.5"
      },
      {
        "component": "Detailed Functions of All Four Layers",
        "marks": "2.0"
      },
      {
        "component": "Detailed Criticisms of TCP/IP Model (≥4 points)",
        "marks": "2.0"
      },
      {
        "component": "Conclusion & Summary",
        "marks": "1.0"
      }
    ],
    "examTip": "Do not forget the criticisms! The question explicitly asks for \"critiques\". Dedicate at least 4 clear bullet points to secure the 2.0 marks allocated to critiques."
  },
  "cn-q50": {
    "verified": "BEU 2023 · Q.3(a) · 7 Marks",
    "intro": "Computer networks require standardized communication architectures so that diverse devices, operating systems, and distributed applications can seamlessly exchange data. The two foundational layered architectures are the ISO OSI 7-Layer Reference Model and the TCP/IP 4-Layer Internet Protocol Suite. While the OSI model was developed by ISO as a formal, vendor-neutral conceptual reference architecture, the TCP/IP model emerged from ARPANET research and standardizes the operational protocol family powering the global Internet.",
    "diagrams": [
      {
        "title": "Layer Mapping: OSI 7-Layer Reference Model vs TCP/IP 4-Layer Internet Model",
        "ascii": "          OSI REFERENCE MODEL                       TCP/IP MODEL\n     +-----------------------------+\nL7   |      APPLICATION LAYER      |----+\n     +-----------------------------+    |\nL6   |     PRESENTATION LAYER      |----+---> +-----------------------------+\n     +-----------------------------+    |     |      APPLICATION LAYER      |\nL5   |        SESSION LAYER        |----+     | (HTTP, HTTPS, DNS, SMTP, FTP)|\n     +-----------------------------+          +-----------------------------+\nL4   |       TRANSPORT LAYER       |--------> |       TRANSPORT LAYER       |\n     | (End-to-End Reliability)    |          |   (TCP: Conn, UDP: Datagram)|\n     +-----------------------------+          +-----------------------------+\nL3   |        NETWORK LAYER        |--------> |       INTERNET LAYER        |\n     | (Logical Addr, OSPF, BGP)   |          |  (IPv4, IPv6, ICMP, Routing)|\n     +-----------------------------+          +-----------------------------+\nL2   |       DATA LINK LAYER       |----+---> +-----------------------------+\n     | (Framing, MAC, Switch)      |    |     |    NETWORK ACCESS / LINK    |\n     +-----------------------------+    |     | (Ethernet, Wi-Fi 802.11,    |\nL1   |       PHYSICAL LAYER        |----+     |  Physical Cables, Optical)  |\n     | (Bits, Voltage, Frequency)  |          +-----------------------------+\n     +-----------------------------+"
      },
      {
        "title": "Practical Example: Step-by-Step Data Flow When Opening a Website",
        "ascii": "                     USER OPENS WEB BROWSER (HTTPS)\n                                    |\n                                    v\n       +---------------------------------------------------------+\n       | 1. APPLICATION LAYER (HTTP / HTTPS / DNS)               |\n       |    Constructs HTTP GET request message payload.         |\n       +---------------------------------------------------------+\n                                    |\n                                    v\n       +---------------------------------------------------------+\n       | 2. TRANSPORT LAYER (TCP)                                |\n       |    Establishes 3-way handshake; adds TCP port header.   |\n       +---------------------------------------------------------+\n                                    |\n                                    v\n       +---------------------------------------------------------+\n       | 3. INTERNET LAYER (IPv4 / IPv6)                         |\n       |    Adds Source & Destination IP addresses; routes packet.|\n       +---------------------------------------------------------+\n                                    |\n                                    v\n       +---------------------------------------------------------+\n       | 4. NETWORK ACCESS LAYER (Ethernet / Wi-Fi)              |\n       |    Adds MAC header + CRC trailer; transmits on physical.|\n       +---------------------------------------------------------+\n                                    |\n                                    v\n                         PHYSICAL TRANSMISSION MEDIUM"
      }
    ],
    "table": {
      "title": "Comprehensive Distinguishing Differences: OSI Reference Model vs TCP/IP Protocol Suite",
      "headers": [
        "Comparison Criterion",
        "OSI Reference Model (ISO)",
        "TCP/IP Internet Protocol Suite"
      ],
      "rows": [
        [
          "Full Expansion",
          "Open Systems Interconnection",
          "Transmission Control Protocol / Internet Protocol"
        ],
        [
          "Standardizing Body",
          "International Organization for Standardization (ISO)",
          "Internet Engineering Task Force (IETF) / DARPA"
        ],
        [
          "Number of Layers",
          "7 distinct, rigid layers",
          "4 practical functional layers (or 5 in some texts)"
        ],
        [
          "Architectural Nature",
          "Theoretical reference architecture",
          "Pragmatic, operational protocol suite"
        ],
        [
          "Development Approach",
          "Model was standardized BEFORE protocols were designed",
          "Protocols were implemented first; model followed later"
        ],
        [
          "Upper Layer Services",
          "Three separate layers: Application, Presentation, Session",
          "All upper services combined into a single Application layer"
        ],
        [
          "Transport Services",
          "Abstract transport service definitions; connection-oriented",
          "Explicit protocols: TCP (connection-oriented), UDP (datagram)"
        ],
        [
          "Network Layer Service",
          "Defines both Connectionless and Connection-oriented",
          "Strictly Connectionless (IP best-effort packet delivery)"
        ],
        [
          "Hardware Layering",
          "Separates Data Link (L2) and Physical (L1) cleanly",
          "Combines Data Link and Physical into Network Access Layer"
        ],
        [
          "Protocol Independence",
          "Strictly independent of any single protocol implementation",
          "Tightly coupled to the IP protocol family"
        ],
        [
          "Concept Separation",
          "Explicitly separates Services, Interfaces, and Protocols",
          "Does not clearly isolate service, interface, and protocol"
        ],
        [
          "Practical Adoption",
          "Mainly used for education, specifications, and diagnostics",
          "Universal global adoption (foundation of World Wide Web)"
        ],
        [
          "Layer Boundaries",
          "Strict, formal architectural boundaries",
          "Flexible, pragmatic boundaries (e.g. TLS, QUIC)"
        ],
        [
          "Representative Protocols",
          "X.25, ISO-TP4, CLNP, FTAM (largely historical)",
          "HTTP, HTTPS, DNS, TCP, UDP, IPv4, IPv6, Ethernet"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Major Distinguishing Points in Detail",
        "points": [
          "<b>A. Number of Layers:</b> The OSI model mandates 7 layers, whereas the TCP/IP model consolidates them into 4 functional layers. OSI Layers 5, 6, and 7 collapse into TCP/IP Application Layer; Layers 1 and 2 collapse into Network Access Layer.",
          "<b>B. Treatment of Session and Presentation:</b> OSI provides dedicated Session (dialogue control, checkpoints) and Presentation (syntax, ASCII/EBCDIC, encryption) layers. In TCP/IP, these functions are integrated directly into application libraries (e.g., OpenSSL, TLS, JSON encoders).",
          "<b>C. Design Philosophy:</b> The OSI model prioritized formal top-down architectural perfection before writing code. In contrast, TCP/IP adopted the bottom-up IETF philosophy: <i>\"We reject kings, presidents and voting; we believe in rough consensus and running code.\"</i>",
          "<b>D. Internetworking Layer:</b> OSI describes network services abstractly (supporting both connection-oriented CONS and connectionless CLNS). TCP/IP mandates a single, universal connectionless Internet Protocol (IP) that provides scalable best-effort delivery across heterogeneous subnets.",
          "<b>E. Real-World Viability:</b> OSI suffered from the \"bad timing, bad technology, bad implementation\" syndrome. TCP/IP was freely distributed with BSD Unix, becoming the dominant global communications architecture."
        ]
      },
      {
        "heading": "2. Architectural Advantages of Both Models",
        "points": [
          "<b>Advantages of OSI Model:</b> Clear conceptual separation makes it the gold standard for university curricula, professional certifications, and systematic network troubleshooting. Clean modularity ensures that hardware changes do not invalidate higher-layer specifications.",
          "<b>Advantages of TCP/IP Model:</b> Lightweight, battle-tested across billions of devices, resilient against node failures, and natively supports heterogeneous physical media (copper, fiber, wireless satellite)."
        ]
      }
    ],
    "conclusion": "Both models employ layered abstraction to structure computer communication. The OSI model serves as the ideal theoretical reference architecture for system analysis and modular design, whereas the TCP/IP model provides the battle-tested, pragmatic protocol implementation that powers the global Internet.",
    "markingScheme": [
      {
        "component": "Introduction & Clear Definitions of Both Models",
        "marks": "0.5"
      },
      {
        "component": "Neat Labelled OSI 7-Layer Architecture Diagram",
        "marks": "1.0"
      },
      {
        "component": "Neat Labelled TCP/IP 4-Layer Architecture Diagram",
        "marks": "1.0"
      },
      {
        "component": "Accurate Layer-to-Layer Architectural Mapping",
        "marks": "1.0"
      },
      {
        "component": "Comprehensive Comparison Table (≥10 criteria)",
        "marks": "2.5"
      },
      {
        "component": "Practical Web-Browsing Example Across Layers",
        "marks": "0.5"
      },
      {
        "component": "Conclusion & Adoption Summary",
        "marks": "0.5"
      }
    ],
    "examTip": "Bhai, Q.3(a) mein \"distinguishing differences\" poocha gaya hai, isliye 10–12 points ka comparison table sabse important hoga. Dono models ka layer diagram aur correct mapping bhi likhna. Sirf OSI ke seven layers explain karna is question ka complete answer nahi hai."
  },
  "cn-q4": {
    "verified": "BEU 2023 · Q.4 / 2025 · 7 Marks",
    "intro": "In data communication, the maximum theoretical transmission rate across a physical channel is governed by two fundamental laws: Nyquist’s Theorem for noiseless channels and Shannon’s Theorem for noisy channels subject to thermal Gaussian noise.",
    "diagrams": [
      {
        "title": "Channel Capacity Limits & Signal-to-Noise Ratio",
        "ascii": "[ NOISELESS CHANNEL: NYQUIST ]      [ NOISY CHANNEL: SHANNON-HARTLEY ]\nBandwidth B, Signal Levels L        Bandwidth B, Thermal Noise N\nMax Bit Rate = 2 * B * log2(L)      Capacity C = B * log2(1 + S/N)\n                                                 \n             +-----------------------------------------+\nSignal S --->|   Physical Channel (Bandwidth B = 4 kHz)| ---> Output\n             |   Thermal White Noise N (SNR = 30 dB)   |\n             +-----------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Theoretical Formulations",
        "points": [
          "<b>Nyquist Bit Rate Theorem (Noiseless Channel):</b> For an ideal noiseless channel of bandwidth B (Hz) carrying discrete signals with L signaling levels: <br><code>Bit Rate = 2 × B × log₂(L) bps</code>",
          "<b>Shannon’s Channel Capacity Theorem (Noisy Channel):</b> Establishes the absolute theoretical upper bound on error-free data transmission in the presence of Additive White Gaussian Noise (AWGN): <br><code>C = B × log₂(1 + SNR) bps</code>, where SNR is the linear signal-to-noise power ratio."
        ]
      },
      {
        "heading": "2. Step-by-Step Numerical Solution",
        "points": [
          "<b>Step 1: Given Parameters:</b><br>• Bandwidth <code>B = 4 kHz = 4,000 Hz</code><br>• Signal-to-Noise Ratio <code>SNR_dB = 30 dB</code>",
          "<b>Step 2: Convert Decibels to Linear SNR:</b><br><code>SNR_dB = 10 × log₁₀(SNR)</code><br><code>30 = 10 × log₁₀(SNR) ⇒ log₁₀(SNR) = 3</code><br><code>SNR = 10³ = 1,000</code>",
          "<b>Step 3: Apply Shannon Channel Capacity Formula:</b><br><code>C = B × log₂(1 + SNR)</code><br><code>C = 4,000 × log₂(1 + 1000) = 4,000 × log₂(1001)</code>",
          "<b>Step 4: Compute Logarithm:</b><br><code>log₂(1001) = ln(1001) / ln(2) = 6.90875 / 0.69315 ≈ 9.9672</code><br><code>C = 4,000 × 9.9672 ≈ 39,869 bps ≈ 39.87 kbps</code>",
          "<b>Step 5: Determine Nyquist Signal Levels Needed:</b><br>To achieve 39.87 kbps: <code>2 × 4,000 × log₂(L) = 39,869 ⇒ 8,000 × log₂(L) = 39,869</code><br><code>log₂(L) ≈ 4.98 ⇒ L = 2⁴·⁹⁸ ≈ 32 levels</code>."
        ]
      }
    ],
    "conclusion": "The maximum theoretical channel capacity is 39.87 kbps. Regardless of how many signal levels are engineered, thermal noise fundamentally caps transmission at this upper limit.",
    "markingScheme": [
      {
        "component": "Nyquist Theorem Statement & Equation",
        "marks": "1.5"
      },
      {
        "component": "Shannon-Hartley Theorem Statement & Equation",
        "marks": "1.5"
      },
      {
        "component": "Conversion of 30 dB to Linear SNR (1000)",
        "marks": "1.0"
      },
      {
        "component": "Step-by-Step Capacity Calculation (39.87 kbps)",
        "marks": "2.0"
      },
      {
        "component": "Calculation of Signal Levels L & Conclusion",
        "marks": "1.0"
      }
    ],
    "examTip": "Always convert 30 dB to linear scale (1,000). Never write log₂(1 + 30); that is the most common student blunder!"
  },
  "cn-q29": {
    "verified": "BEU 2024 · Q.2(b) · 7 Marks",
    "intro": "Packet switching networks transmit data in discrete units called packets. Communication is achieved through either the connectionless Datagram Approach or the connection-oriented Virtual Circuit Approach.",
    "diagrams": [
      {
        "title": "Datagram (Independent Routing) vs Virtual Circuit (Pre-set Path)",
        "ascii": "[ DATAGRAM APPROACH (Connectionless) ]\nPackets travel independently; may arrive out-of-order.\n\nHost A --- [Router 1] ===== [Router 2] --- Host B\n                             /\n               === [R3] ====/\nPacket 1: A -> R1 -> R2 -> B\nPacket 2: A -> R1 -> R3 -> R2 -> B  (Alternate path taken)\n\n[ VIRTUAL CIRCUIT APPROACH (Connection-Oriented) ]\nCall Setup Phase establishes fixed logical path; packets share VC ID.\n\nHost A ---(VC 12)--- [R1] ---(VC 5)--- [R2] ---(VC 8)--- Host B\n(Setup Request -> Setup ACK -> Data Transmission -> Teardown)"
      }
    ],
    "sections": [
      {
        "heading": "1. Datagram Approach (Connectionless)",
        "points": [
          "Each packet contains full source and destination IP addresses in its header.",
          "Routers evaluate routing tables dynamically; consecutive packets between the same host pair may take completely different paths.",
          "Packets may arrive out-of-order, requiring reordering at the transport layer (TCP).",
          "High robustness: If an intermediate router fails, subsequent datagrams are dynamically rerouted."
        ]
      },
      {
        "heading": "2. Virtual Circuit Approach (Connection-Oriented)",
        "points": [
          "Operates in three phases: (1) Setup Phase, (2) Data Transfer Phase, and (3) Teardown Phase.",
          "Intermediate switches maintain Virtual Circuit Tables mapping incoming (port, VCI) to outgoing (port, VCI).",
          "Packets carry only a short Virtual Circuit Identifier (VCI), reducing header overhead.",
          "Guarantees in-order delivery and predictable latency, but switch failure terminates the virtual circuit."
        ]
      }
    ],
    "table": {
      "title": "Comparison: Datagram vs Virtual Circuit",
      "headers": [
        "Feature",
        "Datagram Approach",
        "Virtual Circuit Approach"
      ],
      "rows": [
        [
          "Connection State",
          "Connectionless (No setup phase)",
          "Connection-Oriented (Setup, Data, Teardown)"
        ],
        [
          "Addressing in Header",
          "Full Source & Destination IP (32/128 bits)",
          "Short Virtual Circuit Identifier (VCI, 16 bits)"
        ],
        [
          "Packet Path",
          "Dynamic (Each packet routed independently)",
          "Static (All packets follow pre-established path)"
        ],
        [
          "Switch State Info",
          "Switches store destination routing tables",
          "Switches store per-connection state tables (VCI)"
        ],
        [
          "Packet Ordering",
          "Packets may arrive out of order",
          "Packets strictly arrive in order"
        ],
        [
          "Failure Vulnerability",
          "Highly resilient; packets rerouted around dead nodes",
          "Vulnerable; switch failure terminates entire VC"
        ],
        [
          "Bandwidth Allocation",
          "Statistical multiplexing, best-effort",
          "Can reserve dedicated bandwidth and buffers (QoS)"
        ],
        [
          "Real-world Example",
          "Internet IPv4 / IPv6 network layer",
          "ATM, X.25, Frame Relay, MPLS"
        ]
      ]
    },
    "conclusion": "Datagram networks maximize flexibility and fault tolerance (ideal for general internet traffic), while Virtual Circuits provide deterministic QoS and bandwidth reservation (ideal for carrier telecommunications).",
    "markingScheme": [
      {
        "component": "Datagram Working Principle & Characteristics",
        "marks": "1.5"
      },
      {
        "component": "Virtual Circuit Working Principle & 3 Phases",
        "marks": "1.5"
      },
      {
        "component": "Clear Architectural Diagrams for Both Approaches",
        "marks": "2.0"
      },
      {
        "component": "Comparison Table (≥6 technical parameters)",
        "marks": "1.5"
      },
      {
        "component": "Conclusion & Practical Use Cases",
        "marks": "0.5"
      }
    ],
    "examTip": "Draw both diagrams side-by-side. For Virtual Circuit, explicitly label the 3 phases: Setup (Call Request/Accept), Data Transfer, and Teardown (Clear Request)."
  },
  "cn-q41": {
    "verified": "BEU 2023 · Q.2(a) · 7 Marks",
    "intro": "Switching is the mechanism of forwarding data across network links. Circuit Switching and Packet Switching represent the two fundamental models of telecommunications architecture.",
    "diagrams": [
      {
        "title": "Timing Diagrams: Circuit Switching vs Packet Switching",
        "ascii": "[ CIRCUIT SWITCHING ]               [ PACKET SWITCHING ]\nSender             Receiver        Sender             Receiver\n  |                  |               |                  |\n  |-- Setup Request->|               |-- Packet 1 ------>|\n  |                  |               |-- Packet 2 ------>| (Pipelined)\n  |<- Setup Confirmed|               |-- Packet 3 ------>|\n  |==================| (Dedicated)   |                  |\n  |===== DATA =======| (Continuous)  |                  |\n  |==================|               |                  |\n  |-- Teardown ----->|               |                  |\n  v                  v               v                  v\n(High setup delay, zero transfer delay) (No setup delay, store-and-forward delay)"
      }
    ],
    "table": {
      "title": "Comparative Analysis: Circuit Switching vs Packet Switching",
      "headers": [
        "Parameter",
        "Circuit Switching",
        "Packet Switching"
      ],
      "rows": [
        [
          "Dedicated Path",
          "Yes, dedicated physical circuit",
          "No, shared physical transmission path"
        ],
        [
          "Bandwidth Utilization",
          "Low; wasted during silence/idle periods",
          "High; dynamic statistical multiplexing"
        ],
        [
          "Call Setup Phase",
          "Mandatory before any data transfer",
          "None (for datagram packet switching)"
        ],
        [
          "Store-and-Forward Delay",
          "Zero queuing delay during transmission",
          "Present at every intermediate router"
        ],
        [
          "Congestion Vulnerability",
          "Occurs at call setup (call blocked)",
          "Occurs at routers (queuing delay & packet drops)"
        ],
        [
          "Charging Scheme",
          "Billed by connection time / distance",
          "Billed by volume of data (MB/GB transferred)"
        ],
        [
          "Traffic Suitability",
          "Continuous constant bit-rate (Voice PSTN)",
          "Bursty, asynchronous computer data (Web, Email)"
        ],
        [
          "Protocol Overhead",
          "Minimal header overhead after connection",
          "Header overhead on every single packet"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Technical Highlights",
        "points": [
          "<b>Circuit Switching</b> locks physical circuits, guaranteeing zero jitter and constant bandwidth at the expense of wasted capacity during idle times.",
          "<b>Packet Switching</b> leverages statistical multiplexing: packets from multiple conversations dynamically interleave over shared links, maximizing bandwidth efficiency."
        ]
      }
    ],
    "conclusion": "Circuit switching provides guaranteed QoS for continuous voice calls, whereas packet switching dominates modern telecommunications due to superior bandwidth efficiency and scalability.",
    "markingScheme": [
      {
        "component": "Circuit Switching Architecture & Operation",
        "marks": "1.5"
      },
      {
        "component": "Packet Switching Architecture & Store-and-Forward",
        "marks": "1.5"
      },
      {
        "component": "Comparative Timing Ladder Diagrams",
        "marks": "1.5"
      },
      {
        "component": "Detailed Comparison Table (≥6 criteria)",
        "marks": "2.0"
      },
      {
        "component": "Conclusion",
        "marks": "0.5"
      }
    ],
    "examTip": "Highlight the difference between connection setup time and transmission delay. Emphasize that packet switching uses statistical multiplexing."
  },
  "cn-q52": {
    "verified": "BEU 2023 · Q.6(a) · 7 Marks",
    "intro": "Transmission media provide the physical pathway across which data travels from sender to receiver in a communication network. Located at Layer 1 (Physical Layer), transmission media are broadly categorized into Guided Media (bounded physical conduits such as copper wires and glass fibers) and Unguided Media (unbounded wireless propagation of electromagnetic waves through free space).",
    "diagrams": [
      {
        "title": "Transmission Media Classification: Guided (Cabled) vs Unguided (Wireless)",
        "ascii": "[ GUIDED MEDIA (Conducted / Bounded) ]\n+-------------+      Physical Cable (Conductor / Waveguide)     +-------------+\n| Transmitter |================================================>|  Receiver   |\n+-------------+       (Twisted-Pair, Coaxial, Optical Fiber)    +-------------+\nSignals travel along a constrained physical path; bounded by metallic/dielectric walls.\n\n[ UNGUIDED MEDIA (Radiated / Unbounded) ]\n+-------------+                                                 +-------------+\n| Transmitter | ~ ~ ~ ~ ~ Electromagnetic Radio Waves ~ ~ ~ ~ ~>|  Receiver   |\n|   Antenna   |              Through Free Space / Atmosphere    |   Antenna   |\n+-------------+                                                 +-------------+\nWaves radiate through air, vacuum, or seawater; requires no physical cable conduit."
      },
      {
        "title": "Physical Cable Cross-Sections: Twisted-Pair vs Coaxial vs Optical Fiber",
        "ascii": "1. TWISTED-PAIR CABLE:\nWire A: -----\\ /-----\\ /-----\\ /-----   (Insulated copper conductors twisted\n              X       X       X         to cancel out electromagnetic\nWire B: -----/ \\-----/ \\-----/ \\-----   interference and mutual crosstalk)\n\n2. COAXIAL CABLE:\n+------------------------------------+\n| Plastic Protective Outer Jacket    |\n| +--------------------------------+ |\n| | Braided Metallic Copper Shield | |  <-- Provides EMI shielding & ground return\n| | +----------------------------+ | |\n| | | Solid Dielectric Insulator | | |\n| | |         ● Central Copper   | | |  <-- Carries high-frequency electrical signal\n| | +----------------------------+ | |\n| +--------------------------------+ |\n+------------------------------------+\n\n3. OPTICAL FIBER CABLE:\n+------------------------------------+\n| Outer Polyethylene Jacket          |\n| +--------------------------------+ |\n| | Aramid / Kevlar Strength Member| |\n| | +----------------------------+ | |\n| | | Cladding (Lower n2 ≈ 1.46) | | |  <-- Confines light within core via\n| | |   +--------------------+   | | |      Total Internal Reflection (TIR)\n| | |   | Core (Higher n1≈1.48)| | |\n| | |   | ~~~ LIGHT RAY ~~~> | | | |\n| | |   +--------------------+   | | |\n| | +----------------------------+ | |\n| +--------------------------------+ |\n+------------------------------------+"
      }
    ],
    "table": {
      "title": "Comparative Analysis: Guided Transmission Media vs Unguided Transmission Media",
      "headers": [
        "Evaluation Parameter",
        "Guided Media (Bounded / Cabled)",
        "Unguided Media (Unbounded / Wireless)"
      ],
      "rows": [
        [
          "Physical Pathway",
          "Conducted via metallic wire or optical glass waveguide",
          "Radiated through atmosphere, vacuum, or free space"
        ],
        [
          "Signal Form",
          "Electrical voltages / currents or optical light pulses",
          "Electromagnetic radio waves, microwaves, or infrared"
        ],
        [
          "Mobility Support",
          "Fixed / Stationary; physical tethering required",
          "Full terminal mobility supported (laptops, mobile phones)"
        ],
        [
          "Installation & Civil Cost",
          "High civil work: digging trenches, conduits, cable trays",
          "Lower initial infrastructure: antennas, towers, transceivers"
        ],
        [
          "Interference Vulnerability",
          "Low to moderate; shielded by jacket/cladding",
          "High; susceptible to weather, multipath fading, jamming"
        ],
        [
          "Transmission Range",
          "Limited by cable length, resistance, and dispersion",
          "Vast line-of-sight and satellite planetary coverage"
        ],
        [
          "Security & Eavesdropping",
          "High physical security; tapping requires physical access",
          "Lower privacy; eavesdroppers within radiation cone can intercept"
        ],
        [
          "Bandwidth Potential",
          "Enormous (up to multi-terabits/sec over optical fiber)",
          "Constrained by international spectrum allocation (FCC/DoT)"
        ],
        [
          "Attenuation Profile",
          "Exponential with distance (dB/km); highly predictable",
          "Inverse square law (1/R²) + atmospheric absorption losses"
        ],
        [
          "Representative Examples",
          "Cat 6A UTP, RG-6 Coaxial, Single-mode Fiber",
          "Wi-Fi 802.11, 4G/5G Cellular, Satellite, Bluetooth"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Advantages of Optical Fiber over Twisted-Pair and Coaxial Cable",
        "points": [
          "<b>1. Immense Bandwidth Capacity:</b> Optical frequencies (~10¹⁴ Hz) offer orders-of-magnitude greater carrier bandwidth than copper. A single optical fiber strand can transmit tens of Terabits per second using Dense Wavelength Division Multiplexing (DWDM).",
          "<b>2. Exceptionally Low Signal Attenuation:</b> Modern silica glass fiber exhibits loss as low as <code>0.2 dB/km</code> at the 1550 nm window. Fiber links routinely span 40 to 80 km between optical amplifiers, whereas twisted pair Ethernet is limited to 100 meters.",
          "<b>3. Total Immunity to Electromagnetic Interference (EMI):</b> Because optical fiber carries non-conductive dielectric light photons rather than electrical electrons, it is 100% immune to external electromagnetic fields, radio frequency interference (RFI), lightning strikes, and cross-talk from nearby high-voltage power lines.",
          "<b>4. True Electrical Isolation:</b> Fiber provides complete galvanic isolation between endpoints. There are no common ground loops, zero spark hazards in explosive petrochemical plants, and zero risk of equipment damage from electrical ground potential differentials.",
          "<b>5. Drastically Reduced Physical Size & Weight:</b> A hair-thin fiber strand (125 µm cladding diameter) provides vastly greater throughput than thousands of heavy copper pairs, dramatically reducing cable tray congestion and duct rental costs in data centers.",
          "<b>6. Superior Data Security:</b> Optical fiber does not radiate electromagnetic energy. Non-intrusive eavesdropping is impossible without physically cutting or bending the core (which causes detectable optical power drops), unlike copper which easily radiates interceptible RF signals."
        ]
      },
      {
        "heading": "2. Attenuation Numerical Example",
        "points": [
          "<b>Formula:</b> Total attenuation is given by <code>A = α × L</code> (dB), where α is the attenuation coefficient (dB/km) and L is the link distance (km).",
          "<b>Given Parameters:</b> Fiber attenuation <code>α = 0.2 dB/km</code> at 1550 nm, and fiber link distance <code>L = 40 km</code>.",
          "<b>Calculation:</b> <code>A = 0.2 dB/km × 40 km = 8.0 dB</code>.",
          "<b>Significance:</b> The optical signal experiences only 8 dB of power reduction across 40 km! A comparable copper link would require repeaters every 1 to 2 km due to massive high-frequency attenuation."
        ]
      },
      {
        "heading": "3. Limitations of Optical Fiber",
        "points": [
          "<b>Higher Cost of Transceivers:</b> Optical-to-electrical converters (SFP+ laser transceivers) are more expensive than RJ-45 copper PHYs.",
          "<b>Specialized Splicing Tools:</b> Fusion splicing requires expensive precision arc splicers and highly trained technicians.",
          "<b>Physical Fragility:</b> Glass fibers are vulnerable to tight bend radiuses (macro-bending losses) and accidental mechanical shear.",
          "<b>No Power Delivery:</b> Unlike copper Power-over-Ethernet (PoE IEEE 802.3bt), standard glass fiber cannot carry electrical current to power IP cameras or access points."
        ]
      }
    ],
    "conclusion": "Guided media channel signals through physical cables, while unguided media propagate electromagnetic waves through free space. Optical fiber represents the gold standard of guided transmission, providing virtually limitless bandwidth, negligible attenuation (8 dB over 40 km), electrical isolation, and complete immunity to EMI.",
    "markingScheme": [
      {
        "component": "Introduction & Classification of Transmission Media",
        "marks": "0.5"
      },
      {
        "component": "Guided Media Types & Detailed Cable Cross-Section Diagrams",
        "marks": "1.0"
      },
      {
        "component": "Unguided Media Definition & Free-Space Propagation Diagram",
        "marks": "0.5"
      },
      {
        "component": "Guided vs Unguided Media Comparison Table (≥8 rows)",
        "marks": "1.5"
      },
      {
        "component": "Core Advantages of Optical Fiber (Bandwidth, Attenuation, EMI, Isolation)",
        "marks": "2.0"
      },
      {
        "component": "Attenuation Numerical Calculation (A = αL = 8 dB) & Fiber Limitations",
        "marks": "1.0"
      },
      {
        "component": "Conclusion & Technological Significance",
        "marks": "0.5"
      }
    ],
    "examTip": "Bhai, original question ke two parts hain: pehle guided vs unguided media ka comparison table, phir optical fiber ke 7 major advantages over twisted-pair & coaxial. 8 dB attenuation numerical mention karne se examiner impress hota hai!"
  },
  "cn-q30": {
    "verified": "BEU 2024 · Q.3(a) · 7 Marks",
    "intro": "Go-Back-N (GBN) ARQ is a sliding window protocol that enables pipelined transmission of multiple data frames before requiring an acknowledgment (ACK), significantly improving channel utilization over Stop-and-Wait.",
    "diagrams": [
      {
        "title": "Go-Back-N Sliding Window Mechanism & Retransmission Ladder",
        "ascii": "[ SENDER WINDOW: Size Ws = 2^m - 1 = 3 (m = 2 bits) ]\n[ 0  1  2 ] 3  0  1  2 ...   (Frames 0, 1, 2 sent)\n\nSENDER                                           RECEIVER\n  |                                                 |\n  |--- Frame 0 ------------------------------------>| Accepted, ACK 1 sent\n  |--- Frame 1 (LOST IN TRANSIT X)                  | (Discarded)\n  |--- Frame 2 ------------------------------------>| Out-of-order! Discarded\n  |--- Frame 3 ------------------------------------>| Out-of-order! Discarded\n  |                                                 |\n  |<-- ACK 1 ---------------------------------------| (Slide window by 1)\n  | [TIMER FOR FRAME 1 EXPIRES!]                    |\n  |                                                 |\n  |=== GO BACK TO N: Retransmit ALL from 1 ===      |\n  |--- Frame 1 ------------------------------------>| Accepted, ACK 2 sent\n  |--- Frame 2 ------------------------------------>| Accepted, ACK 3 sent\n  |--- Frame 3 ------------------------------------>| Accepted, ACK 0 sent\n  v                                                 v"
      }
    ],
    "sections": [
      {
        "heading": "1. Window Sizes and Mathematical Constraint",
        "points": [
          "<b>Sender Window Size (Ws):</b> For an m-bit sequence number, <code>Ws ≤ 2ᵐ - 1</code>.",
          "<b>Receiver Window Size (Wr):</b> Strictly <code>Wr = 1</code> (accepts only the next expected in-order frame).",
          "<b>Why Ws Cannot Be 2ᵐ:</b> If <code>Ws = 2ᵐ</code>, a lost cumulative ACK makes it impossible for the receiver to distinguish between retransmitted duplicate frames and a brand-new window of frames (Sequence Number Ambiguity)."
        ]
      },
      {
        "heading": "2. Operational Dynamics & Channel Efficiency",
        "points": [
          "<b>Cumulative ACK:</b> <code>ACK n</code> acknowledges all frames up to <code>n - 1</code>. If an intermediate frame is lost, receiver discards all subsequent frames.",
          "<b>Single Retransmission Timer:</b> Sender maintains a timer for the oldest unacknowledged frame. On timeout, sender \"goes back\" and retransmits all unacknowledged frames in the current window.",
          "<b>Channel Efficiency (η):</b> <code>η = Ws / (1 + 2a)</code>, where <code>a = Tp / Tt</code> (propagation time / transmission time)."
        ]
      }
    ],
    "conclusion": "Go-Back-N drastically improves channel utilization over noisy high-bandwidth links compared to Stop-and-Wait, but wastes link bandwidth during high error rates due to bulk retransmissions.",
    "markingScheme": [
      {
        "component": "Go-Back-N Principle & Window Constraints (Ws = 2ᵐ - 1, Wr = 1)",
        "marks": "2.0"
      },
      {
        "component": "Sequence Number Ambiguity Proof",
        "marks": "1.5"
      },
      {
        "component": "Neat Timing Ladder Diagram with Frame Loss & Recovery",
        "marks": "2.0"
      },
      {
        "component": "Channel Efficiency Equation & Performance Analysis",
        "marks": "1.5"
      }
    ],
    "examTip": "Examiners always look for the proof of why Ws = 2ᵐ - 1 (not 2ᵐ). Show the scenario where ACK is lost and the receiver cannot distinguish new frame 0 from old frame 0."
  },
  "cn-q31": {
    "verified": "BEU 2024 · Q.3(b) · 7 Marks",
    "intro": "Cyclic Redundancy Check (CRC) is an algebraic error-detecting code based on polynomial modulo-2 arithmetic (where addition and subtraction are identical to bitwise XOR, without carries or borrows).",
    "sections": [
      {
        "heading": "1. Given Parameters & Generator Conversion",
        "points": [
          "<b>Message:</b> <code>M = 1101011011</code> (k = 10 bits)",
          "<b>Generator Polynomial:</b> <code>G(X) = X⁴ + X + 1 = 1·X⁴ + 0·X³ + 0·X² + 1·X¹ + 1·X⁰</code>",
          "<b>Binary Divisor:</b> <code>G = 10011</code> (degree r = 4, length = 5 bits)",
          "<b>Appended Zeros:</b> Append r = 4 zeros to message: <code>Dividend = 11010110110000</code> (14 bits)"
        ]
      },
      {
        "heading": "2. Step-by-Step Modulo-2 Binary Long Division",
        "points": [
          "<b>Step 1:</b> First 5 bits: <code>11010 ⊕ 10011 = 01001</code>. Bring down next bit 1 → <code>10011</code>.",
          "<b>Step 2:</b> <code>10011 ⊕ 10011 = 00000</code>. Bring down next bit 1, 0, 1 → <code>10110</code>.",
          "<b>Step 3:</b> <code>10110 ⊕ 10011 = 00101</code>. Bring down next bit 1, 1 → <code>10100</code>.",
          "<b>Step 4:</b> <code>10100 ⊕ 10011 = 00111</code>. Bring down remaining 0 → <code>1110</code>.",
          "<b>Remainder (CRC):</b> <code>R = 1110</code> (4 bits)."
        ]
      }
    ],
    "diagrams": [
      {
        "title": "Full Modulo-2 XOR Long Division Layout",
        "ascii": "Divisor: 10011 ) 11010110110000 ( Quotient: 1100010011\n                 10011\n                 -----\n                  10011\n                  10011\n                  -----\n                   0000010110\n                        10011\n                        -----\n                         010100\n                          10011\n                          -----\n                           01110  <--- CRC Remainder R = 1110"
      },
      {
        "title": "Sender to Receiver Verification Flow",
        "ascii": "[ SENDER ]                                        [ RECEIVER ]\nMessage: 1101011011                               Codeword: 11010110111110\nAppend r=4 zeros: 11010110110000                  Divide by G = 10011\nDivide by 10011 -> Remainder R = 1110             Modulo-2 division gives:\nCodeword T = M || R = 11010110111110 -----------> Remainder = 0000 (NO ERROR!)"
      }
    ],
    "sections_extra": [
      {
        "heading": "3. Codeword Formation & Receiver Verification",
        "points": [
          "<b>Transmitted Codeword (T):</b> <code>T = Message || Remainder = 1101011011 || 1110 = 11010110111110</code> (14 bits).",
          "<b>Receiver Verification:</b> Receiver divides <code>11010110111110 ÷ 10011</code>. Since the remainder is strictly <code>0000</code>, the transmission is accepted as error-free."
        ]
      }
    ],
    "conclusion": "The CRC checksum is 1110, resulting in the transmitted frame 11010110111110. The zero remainder at the receiver mathematically verifies correctness.",
    "markingScheme": [
      {
        "component": "Polynomial to Binary Conversion (G = 10011, r = 4)",
        "marks": "1.0"
      },
      {
        "component": "Appending 4 Zeros to Message (11010110110000)",
        "marks": "0.5"
      },
      {
        "component": "Step-by-Step Modulo-2 Division Execution",
        "marks": "3.0"
      },
      {
        "component": "Correct CRC Remainder (1110) & Codeword Construction",
        "marks": "1.5"
      },
      {
        "component": "Receiver Verification (Remainder = 0000)",
        "marks": "1.0"
      }
    ],
    "examTip": "Highlight the final CRC remainder 1110 and box the transmitted frame 11010110111110 clearly in your answer sheet."
  },
  "cn-q32": {
    "verified": "BEU 2024 · Q.4(a) · 7 Marks",
    "intro": "Framing is the Data Link Layer process of encapsulating physical layer bit streams into distinct, recognizable units called frames by marking boundaries between consecutive frames.",
    "diagrams": [
      {
        "title": "Framing Techniques Comparison",
        "ascii": "1. CHARACTER COUNT: [ 5 | A | B | C | D ] [ 3 | E | F ] (Count includes itself)\n   (Flaw: If count '5' corrupts to '7', framing synchronization is lost permanently!)\n\n2. BYTE STUFFING:   [ FLAG | Payload: D | ESC | FLAG | ESC | ESC | E | FLAG ]\n   (ESC inserted before any accidental FLAG or ESC byte in payload)\n\n3. BIT STUFFING:    01111110 [ 011011111(0)1011111(0)00 ] 01111110\n   (Sender inserts '0' after five consecutive '1's; receiver removes it)"
      }
    ],
    "sections": [
      {
        "heading": "1. Detailed Framing Methods",
        "points": [
          "<b>Character Count:</b> Uses a field in the frame header to specify the total number of characters in the frame. Fatal weakness: A single-bit transmission error in the count field de-synchronizes all subsequent frames.",
          "<b>Byte Stuffing (Character-Oriented):</b> Uses dedicated delimiter flag bytes (e.g., DLE STX / DLE ETX or 0x7E). Whenever a flag byte appears naturally in user data, sender prefixes it with an Escape character (ESC). Receiver strips ESC.",
          "<b>Bit Stuffing (Bit-Oriented, HDLC):</b> Delineates frames with unique flag sequence <code>01111110</code> (0x7E). Sender hardware automatically injects a \"0\" bit after every sequence of five consecutive \"1\"s in the payload. Receiver detects five 1s followed by 0 and destuffs the 0."
        ]
      },
      {
        "heading": "2. Worked Bit Stuffing Numerical Example",
        "points": [
          "Input Data Stream: <code>01101111111010111110</code>",
          "Sender Process: After first five 1s, inject 0: <code>011011111(0)1101011111(0)0</code>",
          "Transmitted Frame: <code>01111110 0110111110110101111100 01111110</code>",
          "Receiver Process: Detects 111110 and removes stuffed 0, restoring exact original bit stream."
        ]
      }
    ],
    "conclusion": "Bit stuffing is universally preferred in modern synchronous protocols (HDLC, PPP) because it is independent of character codes and operates efficiently at the hardware layer.",
    "markingScheme": [
      {
        "component": "Framing Definition & Synchronization Role",
        "marks": "1.0"
      },
      {
        "component": "Character Count Explanation & Synchronization Vulnerability",
        "marks": "1.5"
      },
      {
        "component": "Byte Stuffing Explanation with ESC Mechanism",
        "marks": "2.0"
      },
      {
        "component": "Bit Stuffing Rule (5 ones -> stuff 0) & Worked Example",
        "marks": "2.0"
      },
      {
        "component": "Comparison & Conclusion",
        "marks": "0.5"
      }
    ],
    "examTip": "Demonstrate bit stuffing with a clear binary string containing six 1s (01111110). Show how the inserted 0 prevents false flag detection."
  },
  "cn-q33": {
    "verified": "BEU 2024 · Q.4(b) · 7 Marks",
    "intro": "In Random Access Medium Access Control (MAC) protocols, ALOHA allows multiple stations to share a single channel. While Slotted ALOHA doubles maximum throughput, its delay characteristics at light network load differ counter-intuitively.",
    "diagrams": [
      {
        "title": "Low-Load Transmission Delay: Pure ALOHA vs Slotted ALOHA",
        "ascii": "[ PURE ALOHA: Immediate Transmission ]\nPacket arrives at t0 --------> [ Frame Transmitted Immediately ]\nInitial Delay = Tfr (Transmission Time only!)\n\n[ SLOTTED ALOHA: Must Synchronize to Slot Boundary ]\nSlot boundary                  Slot boundary                  Slot boundary\n      |                              |                              |\n      |     Packet arrives at t0     |                              |\n      |     [ Wait for boundary ]    |=== Frame Transmitted =======>|\n      |<---------- wait ----------->|<----------- Tfr ------------->|\nInitial Delay = Average (Tfr / 2) + Tfr = 1.5 * Tfr!"
      }
    ],
    "sections": [
      {
        "heading": "1. Mathematical Throughput Equations",
        "points": [
          "<b>Pure ALOHA:</b> Vulnerable period = <code>2 × Tfr</code>. Throughput: <code>S = G × e⁻²ᴳ</code>. Maximum throughput = <code>18.4%</code> at G = 0.5.",
          "<b>Slotted ALOHA:</b> Vulnerable period = <code>1 × Tfr</code>. Throughput: <code>S = G × e⁻ᴳ</code>. Maximum throughput = <code>36.8%</code> at G = 1.0."
        ]
      },
      {
        "heading": "2. Rigorous Delay Analysis at Low Load (G → 0)",
        "points": [
          "At very low traffic load (G → 0), collision probability is virtually zero (<code>P_coll ≈ 0</code>). Almost every packet transmits successfully on its first attempt without retransmissions.",
          "<b>Pure ALOHA Delay:</b> Transmits instantly when generated. Delay = <code>Tfr</code>.",
          "<b>Slotted ALOHA Delay:</b> Must wait for the beginning of the next synchronized slot. Uniform arrival distribution gives average slot wait of <code>Tfr / 2</code>. Total Delay = <code>Tfr / 2 + Tfr = 1.5 × Tfr</code>.",
          "<b>Conclusion:</b> Pure ALOHA has LESS delay at low load (1.0 Tfr vs 1.5 Tfr)."
        ]
      }
    ],
    "conclusion": "At low network load, Pure ALOHA experiences 33% less delay than Slotted ALOHA because it transmits immediately without waiting for slot boundaries.",
    "markingScheme": [
      {
        "component": "Pure vs Slotted ALOHA Definitions & Vulnerable Times",
        "marks": "1.5"
      },
      {
        "component": "Throughput Formulas (S = G·e⁻²ᴳ and S = G·e⁻ᴳ)",
        "marks": "1.5"
      },
      {
        "component": "Mathematical Delay Derivation at G → 0",
        "marks": "2.0"
      },
      {
        "component": "Comparative Timing Diagram (Immediate vs Slot Alignment)",
        "marks": "1.5"
      },
      {
        "component": "Final Definitive Answer (Pure ALOHA has less delay)",
        "marks": "0.5"
      }
    ],
    "examTip": "Many students wrongly answer Slotted ALOHA because its maximum throughput is higher. Be precise: the question specifically asks about DELAY at LOW LOAD, where Pure ALOHA wins!"
  },
  "cn-q46": {
    "verified": "BEU 2023 · Q.8(a) · 4 Marks",
    "intro": "Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) is the primary channel access protocol for wireless IEEE 802.11 networks. It actively avoids collisions because wireless transceivers cannot detect collisions while transmitting.",
    "diagrams": [
      {
        "title": "CSMA/CA Complete Execution Flowchart",
        "ascii": "       [ Start: Frame to Send ]\n                  |\n                  v\n       < Sense Channel Idle? > <-----------+\n            /           \\                   |\n          Yes            No                 |\n          /               \\                 |\n         v                 v                |\n  [ Wait DIFS time ]   [ Wait until idle ]  |\n         |                     |            |\n  < Still Idle? >              v            |\n      /     \\           [ Wait DIFS ]       |\n    Yes      No                |            |\n    /         \\                v            |\n   v           v        [ Set Random ]      |\n[ Send Frame ]  +-----> [ Backoff Timer]    |\n       |                       |            |\n  < ACK Received? >     [ Count down timer ]|\n       /     \\          [ while channel idle|\n     Yes      No               |            |\n     /         \\               v            |\n    v           v       < Timer == 0? >     |\n[ Success ]  < Exceeded Max? > /            |\n                 /         \\  Yes           |\n               Yes          No              |\n               /             \\              |\n              v               +-------------+\n        [ Abort / Fail ]"
      }
    ],
    "sections": [
      {
        "heading": "1. Core Inter-Frame Spacings & Protocol Steps",
        "points": [
          "<b>DIFS (Distributed Inter-Frame Space):</b> Mandatory idle period before initiating contention.",
          "<b>Binary Exponential Backoff:</b> Selects random slot in contention window <code>[0, 2ⁿ - 1]</code> to stagger competing stations.",
          "<b>RTS/CTS Handshake:</b> Sender sends Request to Send (RTS); Access Point responds with Clear to Send (CTS), announcing NAV duration to all nearby stations.",
          "<b>SIFS (Short Inter-Frame Space):</b> Ultra-short delay between DATA and immediate ACK response."
        ]
      }
    ],
    "conclusion": "CSMA/CA minimizes wireless collisions through proactive avoidance, carrier sensing, random backoff timers, and explicit link-layer acknowledgments.",
    "markingScheme": [
      {
        "component": "CSMA/CA Principle & Wireless Need",
        "marks": "1.0"
      },
      {
        "component": "Complete Labelled Flowchart (DIFS, Backoff, ACK)",
        "marks": "2.0"
      },
      {
        "component": "Inter-Frame Spacings Explanation (DIFS, SIFS, Backoff)",
        "marks": "1.0"
      }
    ],
    "examTip": "Draw the decision diamond for DIFS sensing and include the exponential backoff decrement loop for full marks."
  },
  "cn-q47": {
    "verified": "BEU 2023 · Q.8(b) · 3 Marks",
    "intro": "CSMA/CD (Carrier Sense Multiple Access with Collision Detection), while highly effective in wired Ethernet, cannot be implemented in IEEE 802.11 Wireless Local Area Networks due to fundamental physical and hardware limitations.",
    "diagrams": [
      {
        "title": "Hidden Terminal Problem & Severe Wireless Signal Attenuation",
        "ascii": "[ 1. SIGNAL ATTENUATION DROWNS OUT COLLISION ]\nLocal Tx Power = +20 dBm (100 mW) ======> Local Receiver Antenna\nIncoming Collision Signal = -80 dBm (0.00001 mW) (Drowned out by Tx signal!)\n\n[ 2. HIDDEN TERMINAL PROBLEM ]\nStation A <--- Range A ---> Station B <--- Range C ---> Station C\n  (Transmitting)              (Collision!)                (Transmitting)\n• A cannot sense C transmitting because C is outside A's radio range!\n• Carrier sensing at A reports channel IDLE, causing collision at B!"
      }
    ],
    "sections": [
      {
        "heading": "1. The Three Primary Technical Reasons",
        "points": [
          "<b>1. Huge Dynamic Range (Severe Signal Attenuation):</b> A transmitting antenna emits high power (e.g., 100 mW). The received signal from another transmitting node has attenuated by <code>10⁵ to 10⁸</code> times (inverse-square law). Transmit energy overwhelms receive hardware, masking any collision.",
          "<b>2. Hidden Terminal Problem:</b> Two wireless stations out of radio range of each other (hidden) both sense the medium as idle and transmit simultaneously to a mutual intermediate station, causing a collision that neither sender can detect.",
          "<b>3. Half-Duplex Hardware Cost:</b> Full-duplex wireless hardware requires expensive circulators and echo-cancellation circuits that are commercially impractical for low-cost consumer Wi-Fi."
        ]
      }
    ],
    "conclusion": "Because wireless stations cannot detect collisions during active transmission, 802.11 WLANs discard Collision Detection (CSMA/CD) in favor of Collision Avoidance (CSMA/CA).",
    "markingScheme": [
      {
        "component": "Signal Attenuation / Power Discrepancy Reason",
        "marks": "1.0"
      },
      {
        "component": "Hidden Terminal Problem with Diagram",
        "marks": "1.0"
      },
      {
        "component": "Half-Duplex Hardware Constraint & Conclusion",
        "marks": "1.0"
      }
    ],
    "examTip": "Mention both the Signal Attenuation factor (Tx power >> Rx power) and the Hidden Terminal Problem to get all 3 marks."
  },
  "cn-q48": {
    "verified": "BEU 2023 · Q.8(c) & Q.8(d) · 4 + 3 = 7 Marks",
    "intro": "This answer addresses two core Data Link Layer concepts: the mathematical necessity of sequence numbers in Stop-and-Wait ARQ and the architectural structure of IEEE 802.3 Ethernet frames.",
    "diagrams": [
      {
        "title": "Duplicate Frame Ambiguity When ACKs Lack Numbering",
        "ascii": "SENDER                                                 RECEIVER\n  |--- Frame 0 ----------------------------------------->| (Delivered)\n  |<-- ACK (Unnumbered ACK LOST in network!) ----------X |\n  | [Timer Expires!]                                     |\n  |--- Frame 0 (Retransmission) ------------------------>| (Duplicate!)\n  |                                                      | Without sequence numbers,\n  |                                                      | receiver cannot know if\n  |                                                      | this is new frame or duplicate!"
      },
      {
        "title": "IEEE 802.3 Ethernet Frame Format (Minimum 64 Bytes)",
        "ascii": "+----------+-----+----------+----------+--------+----------------+-------+\n| Preamble | SFD | Dest MAC | Src MAC  | Length | Data Payload   |  FCS  |\n|  7 Bytes | 1 B | 6 Bytes  | 6 Bytes  | 2 Bytes| 46 - 1500 B    |  4 B  |\n+----------+-----+----------+----------+--------+----------------+-------+\n<----------------- MAC Frame (64 to 1518 Bytes) ------------------------->"
      }
    ],
    "sections": [
      {
        "heading": "1. Why Stop-and-Wait Requires ACK Numbering (Q.8c · 4 Marks)",
        "points": [
          "If an ACK is delayed or lost, sender times out and retransmits the frame.",
          "Without 1-bit sequence numbers (0 and 1), the receiver cannot determine whether the incoming frame is a duplicate or the next sequential frame.",
          "1-bit sequence numbering (modulo-2: 0, 1) is both necessary and sufficient to prevent undetected duplicates."
        ]
      },
      {
        "heading": "2. IEEE 802.3 Ethernet Header & Padding (Q.8d · 3 Marks)",
        "points": [
          "<b>Header Fields:</b> Preamble (7B), Start of Frame Delimiter (1B), Destination MAC (6B), Source MAC (6B), Length/Type (2B), FCS/CRC-32 (4B). Total overhead = 18 bytes.",
          "<b>Minimum Frame Size:</b> Ethernet requires minimum 64-byte frame size for CSMA/CD collision detection: <code>64 - 18 = 46 bytes</code> minimum payload.",
          "<b>Padding Rule:</b> If user payload is less than 46 bytes, padding bytes (zeros) must be added: <code>Padding = 46 - Payload</code>. Example: A 20-byte payload requires <code>46 - 20 = 26 bytes</code> of padding."
        ]
      }
    ],
    "conclusion": "Stop-and-Wait requires 1-bit sequence numbering to prevent duplicate deliveries, and Ethernet mandates 46-byte minimum payload padding to guarantee reliable CSMA/CD collision detection.",
    "markingScheme": [
      {
        "component": "Lost ACK Duplicate Ambiguity Proof (Q.8c)",
        "marks": "2.0"
      },
      {
        "component": "1-Bit Numbering Sufficiency Derivation (Q.8c)",
        "marks": "2.0"
      },
      {
        "component": "IEEE 802.3 Header Structure & Fields (Q.8d)",
        "marks": "1.5"
      },
      {
        "component": "Minimum Frame Size (64B) & Padding Calculation (Q.8d)",
        "marks": "1.5"
      }
    ],
    "examTip": "State the padding formula clearly: Padding = 46 - Payload Length. For a 20-byte payload, state: 26 bytes of padding are added."
  },
  "cn-q20": {
    "verified": "BEU 2022 · Q.4(b) · 7 Marks",
    "intro": "Hamming Code, developed by Richard Hamming, is a linear block error-correcting code that detects and corrects single-bit transmission errors by calculating redundant parity bits located at powers-of-two bit positions (1, 2, 4, 8...).",
    "diagrams": [
      {
        "title": "7-Bit Hamming Code Position Grid (Powers of 2 = Parity)",
        "ascii": "Bit Position:   7     6     5     4     3     2     1\nBit Type:      D7    D6    D5    P4    D3    P2    P1\nGiven Data:     1     0     1     ?     1     ?     ?\nBinary Pos:   111   110   101   100   011   010   001\nParity P1:     *           *           *           *  (LSB = 1: bits 1,3,5,7)\nParity P2:     *     *                 *     *        (2nd bit = 1: bits 2,3,6,7)\nParity P4:     *     *     *     *                    (3rd bit = 1: bits 4,5,6,7)"
      }
    ],
    "sections": [
      {
        "heading": "1. Step-by-Step Codeword Construction",
        "points": [
          "<b>Data Word:</b> <code>D = 1011</code> (4 bits: D7=1, D6=0, D5=1, D3=1).",
          "<b>Parity Bit P1:</b> Checks bit positions with LSB 1 (1, 3, 5, 7):<br><code>P1 ⊕ D3 ⊕ D5 ⊕ D7 = 0 ⇒ P1 ⊕ 1 ⊕ 1 ⊕ 1 = 0 ⇒ P1 ⊕ 1 = 0 ⇒ P1 = 1</code>.",
          "<b>Parity Bit P2:</b> Checks bit positions with 2nd bit 1 (2, 3, 6, 7):<br><code>P2 ⊕ D3 ⊕ D6 ⊕ D7 = 0 ⇒ P2 ⊕ 1 ⊕ 0 ⊕ 1 = 0 ⇒ P2 ⊕ 0 = 0 ⇒ P2 = 0</code>.",
          "<b>Parity Bit P4:</b> Checks bit positions with 3rd bit 1 (4, 5, 6, 7):<br><code>P4 ⊕ D5 ⊕ D6 ⊕ D7 = 0 ⇒ P4 ⊕ 1 ⊕ 0 ⊕ 1 = 0 ⇒ P4 ⊕ 0 = 0 ⇒ P4 = 0</code>.",
          "<b>Transmitted 7-Bit Codeword:</b> <code>[D7 D6 D5 P4 D3 P2 P1] = [1 0 1 0 1 0 1]</code>."
        ]
      },
      {
        "heading": "2. Error Detection & Correction Demonstration",
        "points": [
          "<b>Transmission Error:</b> Suppose bit position 6 flips from 0 to 1 during transit.<br>Received Codeword: <code>[1 1 1 0 1 0 1]</code>.",
          "<b>Syndrome Bit S1:</b> <code>b1 ⊕ b3 ⊕ b5 ⊕ b7 = 1 ⊕ 1 ⊕ 1 ⊕ 1 = 0</code>.",
          "<b>Syndrome Bit S2:</b> <code>b2 ⊕ b3 ⊕ b6 ⊕ b7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1</code>.",
          "<b>Syndrome Bit S4:</b> <code>b4 ⊕ b5 ⊕ b6 ⊕ b7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1</code>.",
          "<b>Syndrome Word:</b> <code>S = S4 S2 S1 = 110₂ = 6₁₀</code>!",
          "<b>Correction:</b> Syndrome 6 explicitly identifies bit 6 as the corrupted bit. Inverting bit 6 restores original codeword <code>1010101</code>."
        ]
      }
    ],
    "conclusion": "The 7-bit Hamming code for 1011 is 1010101. When bit 6 is corrupted, syndrome S = 110 (decimal 6) accurately pinpoints and corrects the faulty bit.",
    "markingScheme": [
      {
        "component": "Hamming Code Redundancy Equation (2ʳ ≥ m + r + 1)",
        "marks": "1.0"
      },
      {
        "component": "Parity Bit Position Grid & Assignment",
        "marks": "1.5"
      },
      {
        "component": "Parity Bit Calculations (P1=1, P2=0, P4=0)",
        "marks": "2.0"
      },
      {
        "component": "Codeword Formation (1010101)",
        "marks": "0.5"
      },
      {
        "component": "Syndrome Calculation (S = 110 = 6) & Correction Proof",
        "marks": "2.0"
      }
    ],
    "examTip": "Write out the binary positions (1=001, 2=010, 3=011, 4=100, 5=101, 6=110, 7=111). It shows the examiner you understand the parity grouping instantly."
  },
  "cn-q8": {
    "verified": "BEU 2023 · Q.3(a) · 7 Marks",
    "intro": "CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is the media access control mechanism used in traditional shared Ethernet. Stations listen before transmitting and listen while transmitting to abort corrupted transmissions immediately.",
    "diagrams": [
      {
        "title": "Worst-Case Collision Scenario Timing Ladder (Round Trip Time = 2 * Tp)",
        "ascii": "Station A (Left end)                           Station B (Right end)\n   |                                              |\nt=0|=== Transmits Frame =========================>|\n   |                                              | t = Tp - ε (B senses idle,\n   |                                              |<-- B transmits, COLLISION!)\n   |                                              |=== Collision Jam signal ===>\nt=2*Tp-ε|<== Collision signal arrives at A =======|\n   v                                              v\nStation A MUST still be transmitting at t = 2*Tp to detect this collision!"
      }
    ],
    "sections": [
      {
        "heading": "1. Mathematical Derivation of Minimum Frame Size",
        "points": [
          "Let distance between farthest stations be d, propagation speed be v.",
          "Propagation Delay: <code>Tp = d / v</code>.",
          "Transmission Delay of frame of length L bits at data rate R bps: <code>Tt = L / R</code>.",
          "<b>Worst-Case Scenario:</b> Station A transmits at t = 0. Just before the frame reaches Station B at <code>t = Tp - ε</code>, Station B senses medium idle and transmits. A collision occurs near B.",
          "The collision signal propagates back to Station A, arriving at <code>t = 2 × Tp</code>.",
          "To detect the collision, Station A must still be actively transmitting when the collision fragment returns: <br><code>Tt ≥ 2 × Tp</code>",
          "Substitute <code>Tt = L_min / R</code>:<br><code>L_min / R ≥ 2 × Tp  ⇒  L_min ≥ 2 × R × Tp</code>."
        ]
      },
      {
        "heading": "2. Numerical Application to Standard 10 Mbps Ethernet",
        "points": [
          "For classical Ethernet: <code>R = 10 Mbps</code>, <code>2 × Tp = 51.2 μs</code> (Slot Time).",
          "<code>L_min = 10 × 10⁶ bps × 51.2 × 10⁻⁶ s = 512 bits = 64 Bytes</code>.",
          "This is the origin of Ethernet’s fundamental 64-byte minimum frame size!"
        ]
      }
    ],
    "conclusion": "The condition L_min ≥ 2·R·Tp guarantees that a transmitting station detects collisions before completing transmission, establishing the classic 64-byte Ethernet standard.",
    "markingScheme": [
      {
        "component": "CSMA/CD Operating Principle (Listen before & during Tx)",
        "marks": "1.5"
      },
      {
        "component": "Worst-Case Collision Scenario Timing Diagram",
        "marks": "2.0"
      },
      {
        "component": "Mathematical Derivation of L_min ≥ 2·R·Tp",
        "marks": "2.5"
      },
      {
        "component": "Application to 10 Mbps Ethernet (64 Bytes)",
        "marks": "1.0"
      }
    ],
    "examTip": "Show both steps: t = Tp - ε for collision near B, and t = 2·Tp for collision echo reaching A. Never skip the substitution of Tt = L/R."
  },
  "cn-q49": {
    "verified": "BEU 2023 · Q.2(b) · 7 Marks",
    "intro": "Cyclic Redundancy Check (CRC) is an error-detection technique operating at the Data Link Layer. Binary datawords are treated as algebraic polynomials over Galois Field GF(2). Error detection is achieved through modulo-2 polynomial long division using a predefined generator polynomial. The sender computes a remainder and appends it to the dataword; the receiver performs identical modulo-2 division, where a zero remainder confirms error-free transmission.",
    "diagrams": [
      {
        "title": "Complete CRC Transmission Architecture: Sender Generation & Receiver Verification",
        "ascii": "                    SENDER GENERATION PROCESS\n                               |\n                               v\n                     Original 10-Bit Dataword\n                         D = 1010011110\n                               |\n                               v\n               Append r = 3 Zeros (Augmented Dividend)\n                         1010011110 000\n                               |\n                               v\n              Modulo-2 Division by Divisor G = 1011\n                               |\n                               v\n                     3-Bit Remainder R = 001\n                               |\n                               v\n                 Transmitted Codeword T = D || R\n                         1010011110 001\n                               |\n                               v\n                     COMMUNICATION CHANNEL\n                               |\n                               v\n                   RECEIVER VERIFICATION PROCESS\n                               |\n                               v\n                     Received 13-Bit Codeword\n                         1010011110 001\n                               |\n                               v\n              Modulo-2 Division by Same Divisor G = 1011\n                               |\n                               v\n                     Remainder = 000 (ZERO)\n                               |\n                               v\n             [ VERIFICATION SUCCESS: NO ERROR DETECTED ]"
      },
      {
        "title": "Sender Modulo-2 Division Trace (Bit-by-Bit XOR Alignment)",
        "ascii": "Dividend:   1 0 1 0 0 1 1 1 1 0 0 0 0    (10-bit data + 3 appended zeros)\nDivisor:    1 0 1 1\n-----------------------------------------\nStep 1:     1 0 1 0 0 1 1 1 1 0 0 0 0\nXOR @ 0:    1 0 1 1\n            -------\n            0 0 0 1 0 1 1 1 1 0 0 0 0\nStep 2:           1 0 1 1\n                  -------\n            0 0 0 0 0 0 0 1 1 0 0 0 0\nStep 3:                   1 0 1 1\n                          -------\n            0 0 0 0 0 0 0 0 1 1 1 0 0\nStep 4:                     1 0 1 1\n                            -------\n            0 0 0 0 0 0 0 0 0 1 0 1 0\nStep 5:                       1 0 1 1\n                              -------\nRemainder:  0 0 0 0 0 0 0 0 0 0 0 0 1  ==> Remainder R = 001"
      }
    ],
    "sections": [
      {
        "heading": "1. Given Parameters & Generator Degree Analysis",
        "points": [
          "<b>Dataword (D):</b> <code>1010011110</code> (Length <code>k = 10 bits</code>).",
          "<b>Divisor / Generator (G):</b> <code>1011</code> (Length = 4 bits).",
          "<b>Polynomial Form:</b> <code>G(x) = 1·x³ + 0·x² + 1·x¹ + 1·x⁰ = x³ + x + 1</code>.",
          "<b>Generator Degree (r):</b> <code>r = 4 - 1 = 3 bits</code>.",
          "<b>Number of Appended Zeros:</b> Append exactly <code>r = 3</code> zeros to the dataword.",
          "<b>Augmented Dividend:</b> <code>1010011110 000</code> (Length = 13 bits)."
        ]
      },
      {
        "heading": "2. Modulo-2 Arithmetic Rules",
        "points": [
          "Modulo-2 arithmetic uses pure bitwise XOR (exclusive OR) operations without carrying or borrowing.",
          "<code>0 ⊕ 0 = 0</code>, <code>0 ⊕ 1 = 1</code>, <code>1 ⊕ 0 = 1</code>, <code>1 ⊕ 1 = 0</code>.",
          "Whenever the leftmost bit of the current working block is <code>1</code>, we perform XOR with <code>1011</code>; if the leftmost bit is <code>0</code>, we shift right until encountering a leading <code>1</code>."
        ]
      },
      {
        "heading": "3. Step-by-Step Modulo-2 Division Execution",
        "points": [
          "<b>Initial Dividend:</b> <code>1010011110000</code>.",
          "<b>XOR 1 (at index 0):</b> <code>1010 ⊕ 1011 = 0001</code>. Bring down next bits to get <code>0001011</code>.",
          "<b>XOR 2 (at index 3):</b> Leading bit is at index 3. <code>1011 ⊕ 1011 = 0000</code>. Bring down next bits to get <code>00000001100</code>.",
          "<b>XOR 3 (at index 7):</b> Working group is <code>1100</code>. <code>1100 ⊕ 1011 = 0111</code>. Bring down next bit 0 to get <code>1110</code>.",
          "<b>XOR 4 (at index 8):</b> <code>1110 ⊕ 1011 = 0101</code>. Bring down next bit 0 to get <code>1010</code>.",
          "<b>XOR 5 (at index 9):</b> <code>1010 ⊕ 1011 = 0001</code>.",
          "<b>Final 3-Bit Remainder:</b> <code>R = 001</code>."
        ]
      },
      {
        "heading": "4. Codeword Construction & Verification (Check Your Answer)",
        "points": [
          "<b>Transmitted Codeword (T):</b> Replace the 3 appended zeros with the 3-bit remainder: <code>T = D || R = 1010011110 001</code>.",
          "<b>Verification by Receiver Division:</b> Divide the received codeword <code>1010011110001</code> by generator <code>1011</code>:",
          "• XOR at index 0: <code>1010 ⊕ 1011 = 0001</code>",
          "• XOR at index 3: <code>1011 ⊕ 1011 = 0000</code>",
          "• XOR at index 7: <code>1100 ⊕ 1011 = 0111</code>",
          "• XOR at index 8: <code>1110 ⊕ 1011 = 0101</code>",
          "• XOR at index 9: <code>1011 ⊕ 1011 = 0000</code>",
          "<b>Final Verification Remainder:</b> <code>000</code> (Zero). Since remainder is zero, the received codeword is completely valid and free of detectable errors!"
        ]
      }
    ],
    "table": {
      "title": "Step-by-Step XOR Division Trace Summary Table",
      "headers": [
        "Division Step",
        "Working Bit Position",
        "Current Working Bits",
        "Divisor XOR",
        "Resulting Remainder Group"
      ],
      "rows": [
        [
          "Step 1",
          "Bit 0 – 3",
          "1010",
          "1011",
          "0001 (Shift right by 3)"
        ],
        [
          "Step 2",
          "Bit 3 – 6",
          "1011",
          "1011",
          "0000 (Shift right by 4)"
        ],
        [
          "Step 3",
          "Bit 7 – 10",
          "1100",
          "1011",
          "0111 (Shift right by 1)"
        ],
        [
          "Step 4",
          "Bit 8 – 11",
          "1110",
          "1011",
          "0101 (Shift right by 1)"
        ],
        [
          "Step 5",
          "Bit 9 – 12",
          "1010",
          "1011",
          "0001 (Final 3-bit CRC)"
        ],
        [
          "Result",
          "Final Remainder",
          "—",
          "—",
          "CRC = 001"
        ]
      ]
    },
    "conclusion": "For dataword D = 1010011110 and divisor G = 1011, the calculated CRC remainder is 001. The transmitted codeword is T = 1010011110001. Modulo-2 division of the transmitted codeword by divisor 1011 yields remainder 000, confirming complete mathematical correctness.",
    "markingScheme": [
      {
        "component": "CRC Definition & Mathematical Foundation (GF(2) Modulo-2)",
        "marks": "0.5"
      },
      {
        "component": "Generator Degree r = 3 & Augmented Dividend (1010011110000)",
        "marks": "0.5"
      },
      {
        "component": "Appending 3 Zeros & Modulo-2 XOR Division Rules",
        "marks": "1.0"
      },
      {
        "component": "Complete Modulo-2 Long Division Steps (Steps 1 to 5)",
        "marks": "2.5"
      },
      {
        "component": "Correct CRC Remainder (R = 001)",
        "marks": "0.5"
      },
      {
        "component": "Correct Transmitted Codeword (T = 1010011110001)",
        "marks": "0.5"
      },
      {
        "component": "Receiver Verification by Long Division (Remainder = 000)",
        "marks": "1.0"
      },
      {
        "component": "Conclusion & Summary",
        "marks": "0.5"
      }
    ],
    "examTip": "Bhai, numerical mein CRC = 001 aur transmitted codeword = 1010011110001 dono likhna. Question mein \"Check your answer\" bhi diya hai, toh final remainder 000 dikhaye bina answer complete nahi maana jayega."
  },
  "cn-q51": {
    "verified": "BEU 2023 · Q.4(a) · 7 Marks",
    "intro": "ALOHA is the foundational random-access Medium Access Control (MAC) protocol pioneered by Norman Abramson in 1970 at the University of Hawaii. In ALOHA, multiple distributed stations share a common broadcast channel. Collisions occur whenever two or more frame transmissions overlap in time. The two fundamental variants are Pure ALOHA (unconstrained transmission timing) and Slotted ALOHA (synchronized discrete time slots).",
    "diagrams": [
      {
        "title": "Vulnerable Period Comparison: Pure ALOHA (2T) vs Slotted ALOHA (T)",
        "ascii": "[ PURE ALOHA: Vulnerable Period = 2T ]\nTime: ----------(t - T)-------------------(t)-------------------(t + T)---------->\nFrame A:          [================ Target Frame ===============]\nFrame B:   [====== Overlap ======]\nFrame C:                                             [====== Overlap ======]\nAny frame starting in interval (t - T, t + T) collides! Vulnerable Window = 2 * T.\n\n[ SLOTTED ALOHA: Vulnerable Period = T ]\nTime:      |     Slot k - 1    |        Slot k         |       Slot k + 1     |\n           |                   |                       |                      |\nStation 1: |                   |  [===== Frame 1 =====]|                      |\nStation 2: |                   |  [===== Frame 2 =====]|                      |\n                                           ^\n                                           | COLLISION!\nFrames transmit ONLY at slot boundaries. Vulnerable Window = T (halved!)."
      },
      {
        "title": "Throughput S vs Offered Traffic Load G Characteristic Curves",
        "ascii": "Throughput S (Successful Frames / Frame Time)\n0.40 +                                     Slotted ALOHA (Max S = 1/e ≈ 36.8% @ G=1)\n     |                                          .-''''-.\n0.35 +                                        .'        '.\n0.30 +                                       /            \\\n0.25 +                                      /              \\\n0.20 +              Pure ALOHA             /                \\\n     |          (Max S = 1/(2e)           /                  \\\n0.15 +           ≈ 18.4% @ G=0.5)        /                    \\\n     |                .---.             /                      \\\n0.10 +              .'     '.          /                        \\\n0.05 +             /         \\        /                          \\\n0.00 +---+----+---/-----------\\------+----+----+----+----+----+----+----> Offered Load G\n     0  0.2  0.4 0.5         1.0         1.5         2.0         2.5"
      }
    ],
    "table": {
      "title": "Comprehensive Performance Comparison: Pure ALOHA vs Slotted ALOHA",
      "headers": [
        "Performance Metric",
        "Pure ALOHA Protocol",
        "Slotted ALOHA Protocol"
      ],
      "rows": [
        [
          "Transmission Timing",
          "Continuous; stations transmit anytime at will",
          "Discrete; transmission only at beginning of synchronized slots"
        ],
        [
          "Slot Synchronization",
          "None required; completely uncoordinated",
          "Global time synchronization required (GPS / central clock)"
        ],
        [
          "Vulnerable Window",
          "2 × T (from t - T to t + T)",
          "1 × T (only within the designated slot)"
        ],
        [
          "Probability of Success",
          "P(0) = e^(-2G)",
          "P(0) = e^(-G)"
        ],
        [
          "Throughput Formula",
          "S_Pure = G × e^(-2G)",
          "S_Slotted = G × e^(-G)"
        ],
        [
          "Maximum Throughput",
          "S_max = 1 / (2e) ≈ 0.184 (18.4%)",
          "S_max = 1 / e ≈ 0.368 (36.8%)"
        ],
        [
          "Optimal Offered Load",
          "G = 0.5 attempts / frame time",
          "G = 1.0 attempt / slot"
        ],
        [
          "Expected Attempts E[N]",
          "E[N] = e^(2G)",
          "E[N] = e^G"
        ],
        [
          "Initial Delay at Low Load",
          "Zero slot-alignment waiting delay",
          "Average synchronization delay of T/2 before slot starts"
        ],
        [
          "Delay Equation (Retry B)",
          "D_Pure = T·e^(2G) + (e^(2G) - 1)·B_Pure",
          "D_Slotted = T/2 + T·e^G + (e^G - 1)·B_Slotted"
        ],
        [
          "Channel Utilization",
          "Poor (wasted by frequent partial collisions)",
          "Twice as efficient; collisions restricted to complete slots"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Mathematical Derivations of Throughput",
        "points": [
          "<b>Traffic Model:</b> Transmission attempts follow a Poisson distribution: <code>P(k) = (λ^k · e^(-λ)) / k!</code>, where G is the offered traffic per frame transmission time T.",
          "<b>Pure ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>2T</code> (a competing frame starting between t - T and t + T causes a collision).<br>• Average attempts in vulnerable period: <code>λ = 2G</code>.<br>• Probability of zero competing attempts: <code>P_success = P(0) = e^(-2G)</code>.<br>• Throughput: <code>S_Pure = G · P_success = G · e^(-2G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-2G) · (1 - 2G) = 0 ⇒ G = 0.5</code>.<br>• <code>S_max = 0.5 · e^(-1) = 1 / (2e) ≈ 0.184 (18.4%)</code>.",
          "<b>Slotted ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>T</code> (collisions occur only if two or more frames attempt transmission in the exact same time slot).<br>• Average attempts in slot: <code>λ = G</code>.<br>• Probability of successful transmission: <code>P_success = e^(-G)</code>.<br>• Throughput: <code>S_Slotted = G · e^(-G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-G) · (1 - G) = 0 ⇒ G = 1.0</code>.<br>• <code>S_max = 1.0 · e^(-1) = 1 / e ≈ 0.368 (36.8%)</code>.<br>• <b>Throughput Ratio:</b> <code>S_max(Slotted) / S_max(Pure) = (1/e) / (1/(2e)) = 2.0</code>. Slotted ALOHA doubles the maximum capacity!"
        ]
      },
      {
        "heading": "2. Average Delay Formulations",
        "points": [
          "<b>Definition:</b> Average delay is the mean time elapsed from the instant a frame is generated until it is successfully delivered and acknowledged.",
          "<b>Transmission Attempts Model:</b> Since each transmission attempt succeeds independently with probability p, the number of attempts N follows a Geometric distribution: <code>E[N] = 1 / p</code>.",
          "<b>Pure ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-2G) ⇒ E[N] = e^(2G)</code>.<br>• Expected transmission-attempt time: <code>D_trans = T · e^(2G)</code>.<br>• With mean retransmission backoff B: <code>D_Pure = T · e^(2G) + (e^(2G) - 1) · B_Pure</code>.",
          "<b>Slotted ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-G) ⇒ E[N] = e^G</code>.<br>• Initial synchronization wait: If frame arrivals are uniformly distributed within a slot, the average waiting time until the next slot boundary is <code>T / 2</code>.<br>• Total delay with backoff B: <code>D_Slotted = T/2 + T · e^G + (e^G - 1) · B_Slotted</code>."
        ]
      },
      {
        "heading": "3. Numerical Comparison Example (G = 0.2, T = 1 ms)",
        "points": [
          "<b>Given Parameters:</b> Offered load <code>G = 0.2</code>, Frame transmission time <code>T = 1.0 ms</code>.",
          "<b>Pure ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.4) = 0.2 · 0.67032 ≈ 0.1341 (13.41%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.4) ≈ 1.4918 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.4918 = 1.4918 ms</code>.",
          "<b>Slotted ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.2) = 0.2 · 0.81873 ≈ 0.1637 (16.37%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.2) ≈ 1.2214 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.2214 = 1.2214 ms</code>.<br>• Including initial slot wait: <code>0.5 ms + 1.2214 ms = 1.7214 ms</code>.<br>• <b>Key Insight:</b> At light load (G=0.2), Slotted ALOHA achieves higher throughput and fewer collisions, but its total initial latency is slightly higher due to waiting for the slot boundary."
        ]
      }
    ],
    "conclusion": "Pure ALOHA permits unrestricted transmissions resulting in a 2T vulnerable window and maximum throughput of 18.4% at G=0.5. Slotted ALOHA enforces discrete slot boundaries, reducing the vulnerable period to T and doubling maximum throughput to 36.8% at G=1.0. While Slotted ALOHA dramatically reduces collisions, its end-to-end delay includes an initial T/2 slot-synchronization wait.",
    "markingScheme": [
      {
        "component": "ALOHA Protocol Introduction & Poisson Traffic Assumptions",
        "marks": "0.5"
      },
      {
        "component": "Pure ALOHA Vulnerable Window (2T) & Diagram",
        "marks": "0.5"
      },
      {
        "component": "Pure ALOHA Throughput Derivation (S = G·e^(-2G))",
        "marks": "1.0"
      },
      {
        "component": "Slotted ALOHA Vulnerable Window (T) & Diagram",
        "marks": "0.5"
      },
      {
        "component": "Slotted ALOHA Throughput Derivation (S = G·e^(-G))",
        "marks": "1.0"
      },
      {
        "component": "Maximum Throughput Calculations (18.4% vs 36.8%) & Derivation Steps",
        "marks": "1.0"
      },
      {
        "component": "Average Delay Expressions & Geometric Retrial Model",
        "marks": "1.0"
      },
      {
        "component": "Performance Comparison Table, Numerical Example & Conclusion",
        "marks": "1.5"
      }
    ],
    "examTip": "Bhai, Q.4(a) mein sabse important results hain Pure ALOHA: G·e^(-2G), 18.4% aur Slotted ALOHA: G·e^(-G), 36.8%. Delay ke question mein retransmission assumptions explicitly likhna, kyunki throughput ke unlike delay ka ek universal formula nahi hota."
  },
  "cn-q53": {
    "verified": "BEU 2023 · Q.7(a) · 7 Marks",
    "intro": "Go-Back-N (GBN) Automatic Repeat reQuest is a sliding window flow and error control protocol operating at the Data Link and Transport layers. It allows the sender to transmit multiple outstanding frames before pausing for acknowledgements. Because sequence numbers are encoded in an m-bit header field, the total available sequence number space is finite and repeats cyclically modulo 2^m. To prevent catastrophic frame ambiguity and duplicate data acceptance after acknowledgement loss, the sender window size W_s must strictly satisfy W_s ≤ 2^m - 1.",
    "diagrams": [
      {
        "title": "Unsafe Case (Ws = 2^m = 4 for m = 2): Catastrophic Duplicate Frame Delivery",
        "ascii": "SENDER (Window Ws = 4)                                   RECEIVER (Window Wr = 1)\nSequence Space: {0, 1, 2, 3}                             Expects Frame 0\n   |                                                            |\n   |========== Frame 0 ========================================>| Accept Frame 0 (Expects 1)\n   |========== Frame 1 ========================================>| Accept Frame 1 (Expects 2)\n   |========== Frame 2 ========================================>| Accept Frame 2 (Expects 3)\n   |========== Frame 3 ========================================>| Accept Frame 3 (Expects 0!)\n   |                                                            |   [Window WRAPS AROUND]\n   |   <---- ACK 0, ACK 1, ACK 2, ACK 3 (ALL LOST!) ----- X     |\n   |                                                            |\n   | [TIMER EXPIRES for Frame 0]                                |\n   |                                                            |\n   |========== Frame 0 (RETRANSMISSION) =======================>|\n   |                                                            | Receiver expects Frame 0!\n   |                                                            | WRONGLY ACCEPTS old Frame 0\n   |                                                            | as NEW Frame 0!\n   v                                                            v\n   [ FATAL AMBIGUITY: DUPLICATE DATA DELIVERED TO HIGHER LAYER ]"
      },
      {
        "title": "Safe Case (Ws = 2^m - 1 = 3 for m = 2): Correct Error Recovery",
        "ascii": "SENDER (Window Ws = 3)                                   RECEIVER (Window Wr = 1)\nSequence Space: {0, 1, 2, 3}                             Expects Frame 0\n   |                                                            |\n   |========== Frame 0 ========================================>| Accept Frame 0 (Expects 1)\n   |========== Frame 1 ========================================>| Accept Frame 1 (Expects 2)\n   |========== Frame 2 ========================================>| Accept Frame 2 (Expects 3!)\n   |   [Sender window exhausted; cannot send Frame 3]           |\n   |                                                            |\n   |   <---- ACK 0, ACK 1, ACK 2 (ALL LOST!) ------------ X     |\n   |                                                            |\n   | [TIMER EXPIRES for Frame 0]                                |\n   |                                                            |\n   |========== Frame 0 (RETRANSMISSION) =======================>|\n   |                                                            | Receiver expects Frame 3!\n   |                                                            | Sees Frame 0 != 3.\n   |                                                            | DISCARDS old Frame 0!\n   |   <---- Re-sends Cumulative ACK 2 =========================| Re-sends ACK 2.\n   v                                                            v\n   [ COMPLETE PROTOCOL INTEGRITY PRESERVED: ZERO DUPLICATES ]"
      }
    ],
    "table": {
      "title": "Sequence Number Space vs Maximum Sender Window Size in Sliding Window Protocols",
      "headers": [
        "Sequence Bits (m)",
        "Sequence Number Space (N = 2^m)",
        "Max Go-Back-N Window (Ws = 2^m - 1)",
        "Max Selective Repeat Window (Ws = 2^(m-1))"
      ],
      "rows": [
        [
          "m = 1 bit",
          "2  (0, 1)",
          "1  (Stop-and-Wait ARQ)",
          "1  (Stop-and-Wait)"
        ],
        [
          "m = 2 bits",
          "4  (0, 1, 2, 3)",
          "3 frames",
          "2 frames"
        ],
        [
          "m = 3 bits",
          "8  (0, 1, 2 ... 7)",
          "7 frames",
          "4 frames"
        ],
        [
          "m = 4 bits",
          "16 (0, 1, 2 ... 15)",
          "15 frames",
          "8 frames"
        ],
        [
          "m = 7 bits",
          "128 (HDLC / SDLC)",
          "127 frames",
          "64 frames"
        ],
        [
          "m = 16 bits",
          "65,536 (TCP)",
          "65,535 bytes",
          "32,768 bytes"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Mathematical Derivation of Sender Window Upper Bound",
        "points": [
          "<b>Sequence Number Space:</b> An m-bit sequence number field provides <code>N = 2^m</code> distinct sequence identifiers: <code>{0, 1, 2, ..., 2^m - 1}</code>, which repeat cyclically modulo <code>2^m</code>.",
          "<b>Receiver Characteristics in Go-Back-N:</b> The receiver window size is strictly <code>W_r = 1</code>. The receiver accepts only the next sequentially expected frame with sequence number <code>R_next</code>. Out-of-order frames are silently discarded.",
          "<b>Condition for Unambiguous Decoding:</b> To avoid ambiguity between an initial transmission of a new frame and a retransmission of an old frame following sequence wraparound, the sum of sender and receiver window sizes must not exceed the total sequence number space: <br><code>W_s + W_r ≤ 2^m</code>.",
          "<b>Substituting Receiver Window W_r = 1:</b><br><code>W_s + 1 ≤ 2^m</code><br><code>W_s ≤ 2^m - 1</code>.",
          "<b>Conclusion:</b> Therefore, the maximum allowable sender window size in Go-Back-N ARQ is strictly: <br><code>W_(s, max) = 2^m - 1</code>."
        ]
      },
      {
        "heading": "2. Exhaustive Step-by-Step Proof by Counterexample (m = 2)",
        "points": [
          "Let <code>m = 2</code> bits. The available sequence numbers are <code>{0, 1, 2, 3}</code> (total <code>N = 2² = 4</code>).",
          "<b>Case A: Suppose W_s = 2^m = 4 (Flawed Design):</b><br>1. Sender transmits frames 0, 1, 2, and 3.<br>2. Receiver receives all 4 frames in perfect order. Its internal expected variable advances: <code>0 → 1 → 2 → 3 → 0</code> (due to modulo 4 wraparound).<br>3. Receiver generates cumulative ACKs for all frames, but all ACKs are lost in transit.<br>4. Sender’s retransmission timer expires for Frame 0.<br>5. Sender retransmits the original Frame 0.<br>6. Receiver checks the arriving frame: it is expecting Frame 0! It cannot distinguish whether this Frame 0 is a new frame from the next generation or an old retransmitted frame.<br>7. Receiver wrongly accepts the duplicate frame and delivers duplicate data to the application layer. This breaks protocol correctness!",
          "<b>Case B: Suppose W_s = 2^m - 1 = 3 (Correct Design):</b><br>1. Sender transmits frames 0, 1, and 2. It is barred from sending Frame 3.<br>2. Receiver successfully receives frames 0, 1, and 2. Its expected sequence number advances to <code>3</code>.<br>3. All ACKs are lost; sender times out and retransmits Frame 0.<br>4. Receiver inspects the arriving frame: it is expecting Frame 3, but receives Frame 0.<br>5. Receiver immediately detects that Frame 0 is an old, already-accepted duplicate. It drops Frame 0 and retransmits ACK 2.<br>6. Sender receives ACK 2 and advances its window. No duplicate data is accepted!"
        ]
      },
      {
        "heading": "3. Comparison with Selective Repeat ARQ Window Size",
        "points": [
          "In Selective Repeat ARQ, both sender and receiver maintain sliding windows: <code>W_s = W_r</code>.",
          "Applying the general correctness theorem: <code>W_s + W_r ≤ 2^m ⇒ 2 · W_s ≤ 2^m ⇒ W_s ≤ 2^(m - 1)</code>.",
          "Thus, for <code>m = 2</code>: Go-Back-N allows <code>W_s = 3</code>, whereas Selective Repeat allows only <code>W_s = 2</code>."
        ]
      }
    ],
    "conclusion": "In Go-Back-N ARQ, the maximum sender window size must be restricted to W_s = 2^m - 1. If W_s were equal to 2^m, an entire cycle of sequence numbers could be outstanding simultaneously; if all ACKs are lost, retransmitted old frames would coincide with the wrapped-around expected sequence number, causing fatal duplicate data delivery.",
    "markingScheme": [
      {
        "component": "Introduction to Go-Back-N ARQ & Sliding Window Concept",
        "marks": "0.5"
      },
      {
        "component": "Sequence Number Space Derivation (N = 2^m, Modulo Arithmetic)",
        "marks": "1.0"
      },
      {
        "component": "Receiver Window Characteristics (Wr = 1, In-Order Acceptance)",
        "marks": "0.5"
      },
      {
        "component": "Mathematical Derivation (Ws + Wr ≤ 2^m ⇒ Ws ≤ 2^m - 1)",
        "marks": "1.5"
      },
      {
        "component": "Detailed Failure Trace for Ws = 2^m (m=2) with Duplicate Acceptance",
        "marks": "1.5"
      },
      {
        "component": "Safe Operational Trace for Ws = 2^m - 1 (m=2) with Correct Discarding",
        "marks": "1.0"
      },
      {
        "component": "Conclusion & Comparison with Selective Repeat (Ws = 2^(m-1))",
        "marks": "1.0"
      }
    ],
    "examTip": "Bhai, ye proof-based question hai. Sirf formula 2^m - 1 likhna enough nahi. ACK lost + sequence wraparound + duplicate frame accepted wala case diagram ke saath explain karna. Yehi actual reason hai window size ko restrict karne ka."
  },
  "cn-q55": {
    "verified": "BEU 2022 · Q.3 · 14 Marks",
    "intro": "Ethernet is the predominant wired local area network (LAN) technology globally, standardized under the IEEE 802.3 working group. First developed at Xerox PARC by Robert Metcalfe in 1973, Ethernet defines physical layer cabling, signaling specifications, data link layer framing, and medium access control. Modern Ethernet has evolved from shared coaxial bus networks running at 10 Mbps to dedicated, full-duplex switched networks operating at 1 Gbps, 10 Gbps, 100 Gbps, and beyond over copper and optical fiber.",
    "diagrams": [
      {
        "title": "Modern Switched Ethernet Architecture vs Legacy Shared Coaxial Bus",
        "ascii": "[ MODERN SWITCHED ETHERNET: STAR TOPOLOGY (Full Duplex, Point-to-Point) ]\n                   +---------------------------+\n                   |   LAYER 2 ETHERNET SWITCH |\n                   +---------------------------+\n                    /            |            \\\n       1 Gbps UTP  /   10 Gbps   |   1 Gbps    \\  10 Gbps Fiber\n                  /     Fiber    |      UTP     \\\n             +------+         +------+         +------+\n             | Host |         | Server|        | Host |\n             |  A   |         | Farm |         |  C   |\n             +------+         +------+         +------+\nEach port has dedicated bandwidth; collision domains isolated; simultaneous Tx/Rx.\n\n[ LEGACY SHARED ETHERNET: BUS TOPOLOGY (Half Duplex, CSMA/CD) ]\n50Ω Terminator                                                   50Ω Terminator\n      |                                                                 |\n      +==========[10BASE5 Thicknet / 10BASE2 Thinnet Coaxial]===========+\n                 |                           |\n             Vampire Tap                BNC T-Connector\n                 |                           |\n              [Host A]                    [Host B]"
      },
      {
        "title": "Standard IEEE 802.3 Ethernet MAC Frame Structure (64 to 1518 Bytes)",
        "ascii": "+------------+--------+------------+------------+-----------+---------------+----------+\n|  PREAMBLE  |  SFD   |  DEST MAC  | SOURCE MAC |TYPE/LENGTH| DATA PAYLOAD  |   FCS    |\n|  7 Bytes   | 1 Byte |  6 Bytes   |  6 Bytes   |  2 Bytes  | 46-1500 Bytes | 4 Bytes  |\n+------------+--------+------------+------------+-----------+---------------+----------+\n|<-- Physical Sync -->|<----------------- MAC Frame (64 to 1518 Bytes) ------------------>|\n• Preamble (7B): Alternating 10101010 pattern for clock synchronization.\n• Start Frame Delimiter (1B): 10101011 pattern indicating payload arrival.\n• MAC Addresses (6B each): 48-bit hardware identifiers (e.g., 00:1A:2B:3C:4D:5E).\n• Type/Length (2B): Values ≥ 1536 indicate EtherType (0x0800 for IPv4, 0x86DD for IPv6).\n• Data Payload: 46 to 1500 bytes (padded with zeros if payload < 46 bytes).\n• Frame Check Sequence (4B): CRC-32 cyclic redundancy check for error detection."
      }
    ],
    "table": {
      "title": "Comprehensive Engineering Comparison: Ethernet Transmission Media",
      "headers": [
        "Specification Parameter",
        "Twisted-Pair Copper (UTP/STP)",
        "Coaxial Cable (Legacy)",
        "Optical Fiber (Single/Multimode)"
      ],
      "rows": [
        [
          "Physical Medium",
          "Twisted insulated copper pairs (Cat 5e/6/6A/8)",
          "Solid central copper wire with braided outer shield",
          "Silica glass core & cladding (9 µm / 50 µm)"
        ],
        [
          "Signal Carried",
          "Differential electrical voltages",
          "Single-ended radio frequency electrical signal",
          "Optical light pulses (LED / Laser diodes)"
        ],
        [
          "Common Standards",
          "100BASE-TX, 1000BASE-T, 10GBASE-T",
          "10BASE5 (Thicknet), 10BASE2 (Thinnet)",
          "1000BASE-SX/LX, 10GBASE-SR/LR, 100GBASE-SR4"
        ],
        [
          "Maximum Segment Distance",
          "100 meters (channel limit)",
          "500 m (10BASE5), 185 m (10BASE2)",
          "550 m (Multimode), 10 km to 80 km (Single-mode)"
        ],
        [
          "Data Rate Capability",
          "10 Mbps up to 10 Gbps (Cat 6A) / 40 Gbps (Cat 8)",
          "10 Mbps (historic maximum on baseband coax)",
          "1 Gbps to 400 Gbps+ (terabit DWDM backbones)"
        ],
        [
          "EMI / Crosstalk Immunity",
          "Moderate; twists cancel noise; shielding (STP) helps",
          "High shielding against external interference",
          "100% immune to electromagnetic fields and lightning"
        ],
        [
          "Connector Type",
          "RJ-45 modular plug (8P8C)",
          "BNC connector, BNC T-piece, 50Ω terminators",
          "LC, SC, ST, MPO/MTP multi-fiber connectors"
        ],
        [
          "Installation & Flexibility",
          "High flexibility; inexpensive, easy field termination",
          "Stiff, bulky; difficult to bend around tight corners",
          "Fragile glass; requires precision splicing tools"
        ],
        [
          "Cost & Power Delivery",
          "Very low cost; supports Power-over-Ethernet (PoE)",
          "Obsolete in enterprise LANs; moderate cost",
          "Higher transceiver cost; cannot conduct DC power"
        ],
        [
          "Typical LAN Deployment",
          "Horizontal desktop cabling, patch panels, APs",
          "Historical legacy; vintage lab networks",
          "Campus backbones, data center inter-switch links"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Types of Cables Commonly Used for Ethernet",
        "points": [
          "<b>A. Twisted-Pair Copper Cables (Most Pervasive):</b><br>• Composed of 4 pairs (8 conductors) of color-coded insulated copper wires twisted together at varying twist rates (twists/inch) to cancel out electromagnetic interference and alien crosstalk.<br>• <b>Unshielded Twisted Pair (UTP):</b> Standard for commercial offices; lightweight, inexpensive, flexible.<br>• <b>Shielded Twisted Pair (STP / S/FTP):</b> Encased in metallic foil or braided screening; used in industrial factory floors with heavy electrical motors.<br>• <b>Categories:</b> <i>Cat 5e</i> (100 MHz, 1 Gbps up to 100m); <i>Cat 6</i> (250 MHz, 1 Gbps @ 100m, 10 Gbps up to 55m); <i>Cat 6A</i> (500 MHz, full 10 Gbps @ 100m); <i>Cat 8</i> (2000 MHz, 25/40 Gbps data center links up to 30m).<br>• <b>Termination:</b> Uses 8P8C modular connectors (commonly called RJ-45) following T568A or T568B pinout standards. Modern switches use Auto MDI/MDI-X to automatically detect and correct pin configurations.",
          "<b>B. Coaxial Cables (Historical Foundation):</b><br>• Consists of a central copper conductor insulated by dielectric polyethylene, surrounded by a continuous braided metallic shield and protective jacket.<br>• <b>10BASE5 (\"Thicknet\"):</b> Thick 0.5-inch coaxial cable operating at 10 Mbps over shared bus segments up to 500 meters. Transceivers attached via mechanical \"vampire taps\" piercing the shield.<br>• <b>10BASE2 (\"Thinnet\" / \"Cheapernet\"):</b> Thinner, flexible RG-58 cable operating at 10 Mbps over segments up to 185 meters. Used BNC T-connectors directly at NICs and 50Ω terminators at bus ends.<br>• Today, coaxial Ethernet is completely replaced by twisted pair and optical fiber in structured cabling.",
          "<b>C. Optical Fiber Cables (High-Speed & Backbone):</b><br>• Transmits digital bits as modulated light pulses through ultra-pure silica glass waveguides via Total Internal Reflection (TIR).<br>• <b>Multimode Fiber (MMF - OM1 to OM5):</b> Larger core (50 µm or 62.5 µm); light rays bounce across multiple propagation paths (modal dispersion). Cost-effective VCSEL 850 nm light sources. Ideal for inter-rack server and building backbones up to 550 meters (10GBASE-SR).<br>• <b>Single-Mode Fiber (SMF - OS1/OS2):</b> Ultra-narrow core (8–9 µm); allows only a single spatial light mode, eliminating modal dispersion. Uses 1310 nm / 1550 nm infrared lasers. Spans campus backbones and metropolitan links from 10 km (10GBASE-LR) up to 80 km without repeaters."
        ]
      },
      {
        "heading": "2. Serialization Transmission Time Numerical Example",
        "points": [
          "<b>Problem Formulation:</b> Calculate the serialization transmission time for a standard maximum-size Ethernet payload of 1500 bytes over: (a) 100 Mbps Fast Ethernet, and (b) 1 Gbps Gigabit Ethernet.",
          "<b>Data Conversion:</b> <code>1500 bytes = 1500 × 8 bits = 12,000 bits</code>.",
          "<b>Case (a) at 100 Mbps:</b><br><code>T_tx = Number of Bits / Transmission Rate = 12,000 / (100 × 10⁶) = 0.00012 seconds = 120 µs</code>.",
          "<b>Case (b) at 1 Gbps:</b><br><code>T_tx = 12,000 / (10⁹) = 0.000012 seconds = 12 µs</code>.",
          "<b>Conclusion:</b> Upgrading from Fast Ethernet to Gigabit Ethernet reduces frame serialization latency by a factor of 10 (from 120 µs down to 12 µs), massively increasing network responsiveness."
        ]
      },
      {
        "heading": "3. Architectural Advantages of Modern Ethernet",
        "points": [
          "<b>Ubiquitous Interoperability:</b> Globally standardized under IEEE 802.3, ensuring seamless compatibility across multi-vendor equipment.",
          "<b>Seamless Speed Scalability:</b> Preserves the exact same MAC frame format from 10 Mbps to 400 Gbps, enabling seamless protocol continuity across network generations.",
          "<b>Power Delivery Integration:</b> Copper UTP delivers both data and DC power (PoE / PoE+ / PoE++ up to 90W) to VoIP phones, surveillance cameras, and Wi-Fi access points.",
          "<b>Full-Duplex Switching:</b> Micro-segmentation eliminates collisions, provides dedicated bandwidth per link, and removes distance limits previously imposed by CSMA/CD round-trip timing."
        ]
      }
    ],
    "conclusion": "Ethernet is the foundational wired networking technology standardized by IEEE 802.3. While legacy Ethernet relied on coaxial bus cables (10BASE5/10BASE2), modern deployments exclusively use twisted-pair copper (Cat 5e/6/6A) for horizontal desktop runs up to 100 meters, and optical fiber (Single-mode/Multimode) for high-speed campus and data center backbones spanning up to 80 km.",
    "markingScheme": [
      {
        "component": "Ethernet Definition, IEEE 802.3 Scope & Evolutionary History",
        "marks": "1.5"
      },
      {
        "component": "Ethernet MAC Frame Format Diagram & Detailed Field Breakdown",
        "marks": "1.5"
      },
      {
        "component": "Twisted-Pair Cabling (UTP/STP, Cat 5e/6/6A/8, RJ-45, T568A/B)",
        "marks": "2.5"
      },
      {
        "component": "Coaxial Cable Standards (10BASE5 Thicknet vs 10BASE2 Thinnet)",
        "marks": "2.0"
      },
      {
        "component": "Optical Fiber Types (Single-mode vs Multimode, Standards 10GBASE-SR/LR)",
        "marks": "2.5"
      },
      {
        "component": "Comprehensive Cable Comparison Table (≥8 technical rows)",
        "marks": "2.0"
      },
      {
        "component": "Frame Transmission Time Numerical (120 µs @ 100M vs 12 µs @ 1G) & Advantages",
        "marks": "2.0"
      }
    ],
    "examTip": "Bhai, is 14-mark question mein Ethernet definition + three cable types + diagrams + comparison table zaroor dena. 10BASE5 aur 10BASE2 historical standards mention karna answer ko stronger banata hai."
  },
  "cn-q34": {
    "verified": "BEU 2024 · Q.5(b) · 7 Marks",
    "intro": "Variable Length Subnet Masking (VLSM) and Classless Inter-Domain Routing (CIDR) allow hierarchical allocation of IP addresses according to exact organizational needs, minimizing address wastage.",
    "diagrams": [
      {
        "title": "Hierarchical CIDR Address Space Partitioning",
        "ascii": "[ TOTAL ISP BLOCK: 190.100.0.0/16 (65,536 Addresses) ]\n+------------------------------------+------------------------------------+\n|   GROUP 1: 64 /24s (16,384 Addrs)  |   GROUP 2: 128 /25s (16,384 Addrs) |\n| 190.100.0.0 to 190.100.63.255      | 190.100.64.0 to 190.100.127.255    |\n+-----------------+------------------+------------------------------------+\n| GROUP 3: 128/26s| UNUSED / UNALLOCATED ISP CAPACITY                     |\n| (8,192 Addrs)   | 24,576 Available Addresses (190.100.160.0 to .255.255)|\n| .128.0 - .159.255+------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Group 1 Allocation (64 Customers × 256 Addresses)",
        "points": [
          "Each customer requires 256 addresses: <code>2⁸ = 256 ⇒ Host bits = 8</code>.",
          "Prefix length: <code>32 - 8 = /24</code> (Mask: <code>255.255.255.0</code>).",
          "Customer 1: <code>190.100.0.0/24</code> (Range: 190.100.0.0 – 190.100.0.255)",
          "Customer 64: <code>190.100.63.0/24</code> (Range: 190.100.63.0 – 190.100.63.255)",
          "Group 1 Total: <code>64 × 256 = 16,384 addresses</code> (Range: 190.100.0.0 – 190.100.63.255)."
        ]
      },
      {
        "heading": "2. Group 2 Allocation (128 Customers × 128 Addresses)",
        "points": [
          "Each customer requires 128 addresses: <code>2⁷ = 128 ⇒ Host bits = 7</code>.",
          "Prefix length: <code>32 - 7 = /25</code> (Mask: <code>255.255.255.128</code>).",
          "Next available address starts at: <code>190.100.64.0</code>.",
          "Customer 1: <code>190.100.64.0/25</code> (Range: 190.100.64.0 – 190.100.64.127)",
          "Customer 128: <code>190.100.127.128/25</code> (Range: 190.100.127.128 – 190.100.127.255)",
          "Group 2 Total: <code>128 × 128 = 16,384 addresses</code> (Range: 190.100.64.0 – 190.100.127.255)."
        ]
      },
      {
        "heading": "3. Group 3 Allocation (128 Customers × 64 Addresses)",
        "points": [
          "Each customer requires 64 addresses: <code>2⁶ = 64 ⇒ Host bits = 6</code>.",
          "Prefix length: <code>32 - 6 = /26</code> (Mask: <code>255.255.255.192</code>).",
          "Next available address starts at: <code>190.100.128.0</code>.",
          "Customer 1: <code>190.100.128.0/26</code> (Range: 190.100.128.0 – 190.100.128.63)",
          "Customer 128: <code>190.100.159.192/26</code> (Range: 190.100.159.192 – 190.100.159.255)",
          "Group 3 Total: <code>128 × 64 = 8,192 addresses</code> (Range: 190.100.128.0 – 190.100.159.255)."
        ]
      },
      {
        "heading": "4. Total Allocated & Unused Addresses Calculation",
        "points": [
          "Total Allocated: <code>16,384 (Gr 1) + 16,384 (Gr 2) + 8,192 (Gr 3) = 40,960 addresses</code>.",
          "Total ISP Capacity: <code>2¹⁶ = 65,536 addresses</code>.",
          "<b>Remaining Unallocated:</b> <code>65,536 - 40,960 = 24,576 addresses</code>.",
          "Unused Address Range: <code>190.100.160.0</code> to <code>190.100.255.255</code> (comprising a /19 block and a /18 block)."
        ]
      }
    ],
    "table": {
      "title": "Master VLSM Customer Allocation Table",
      "headers": [
        "Customer Group",
        "Customers",
        "Addrs/Cust",
        "CIDR Mask",
        "Start Address",
        "End Address",
        "Total Allocated"
      ],
      "rows": [
        [
          "Group 1",
          "64",
          "256",
          "/24 (255.255.255.0)",
          "190.100.0.0",
          "190.100.63.255",
          "16,384"
        ],
        [
          "Group 2",
          "128",
          "128",
          "/25 (255.255.255.128)",
          "190.100.64.0",
          "190.100.127.255",
          "16,384"
        ],
        [
          "Group 3",
          "128",
          "64",
          "/26 (255.255.255.192)",
          "190.100.128.0",
          "190.100.159.255",
          "8,192"
        ],
        [
          "Unused",
          "—",
          "—",
          "/19 and /18 blocks",
          "190.100.160.0",
          "190.100.255.255",
          "24,576"
        ]
      ]
    },
    "conclusion": "The ISP successfully allocates 40,960 contiguous addresses across 320 customers while retaining 24,576 unallocated addresses for future growth.",
    "markingScheme": [
      {
        "component": "Group 1 Subnet Design & Ranges (16,384 addrs)",
        "marks": "2.0"
      },
      {
        "component": "Group 2 Subnet Design & Ranges (16,384 addrs)",
        "marks": "2.0"
      },
      {
        "component": "Group 3 Subnet Design & Ranges (8,192 addrs)",
        "marks": "1.5"
      },
      {
        "component": "Accurate Unused Address Calculation (24,576 addrs)",
        "marks": "1.5"
      }
    ],
    "examTip": "Double check the 3rd octet boundary when moving to Group 2: Group 1 ends at 190.100.63.255, so Group 2 MUST start at 190.100.64.0."
  },
  "cn-q35": {
    "verified": "BEU 2024 · Q.6(a) · 7 Marks",
    "intro": "Routing Information Protocol (RIP) is an Interior Gateway Protocol (IGP) based on the Distance Vector algorithm, widely deployed in small-to-medium autonomous systems.",
    "diagrams": [
      {
        "title": "RIP Routing Architecture & Periodic Advertisement Flow",
        "ascii": "[ Autonomous System (AS) - RIP Domain ]\nRouter A <---(1 Hop)---> Router B <---(1 Hop)---> Router C <---(1 Hop)---> Dest D\nCost: 0                  Cost: 1                  Cost: 2                  Cost: 3\n\n• Every 30 seconds: Routers broadcast RIP response packets over UDP Port 520.\n• Hop Count Metric: 1 to 15 (16 Hops = Metric of Infinity / Unreachable)."
      }
    ],
    "sections": [
      {
        "heading": "1. Protocol Specifications & Bellman-Ford Equation",
        "points": [
          "<b>Metric:</b> Pure hop count (number of intermediate subnets/routers). Bandwidth, latency, and reliability are ignored.",
          "<b>Infinity Threshold:</b> Maximum allowed hop count is 15. A hop count of 16 indicates an unreachable destination, bounding convergence time.",
          "<b>Bellman-Ford Formulation:</b> Distance from router x to destination y: <br><code>Dx(y) = min_v { c(x, v) + Dv(y) }</code>, where v iterates over all direct neighbors of x."
        ]
      },
      {
        "heading": "2. Timers and Loop-Prevention Mechanisms",
        "points": [
          "<b>Periodic Timer (30s):</b> Routers exchange complete routing tables with immediate neighbors every 30 seconds.",
          "<b>Route Timeout (180s):</b> If no update is received for a route within 180s, its hop count is marked as 16 (unreachable).",
          "<b>Split Horizon:</b> A router never advertises a route back out of the interface through which it was learned.",
          "<b>Poison Reverse:</b> The router advertises the route back to the source, but with an explicit hop count of 16 (infinity), actively killing looping updates."
        ]
      }
    ],
    "conclusion": "RIP is simple and computationally lightweight, but its 15-hop limit and slow convergence make it unsuitable for large modern enterprise networks.",
    "markingScheme": [
      {
        "component": "RIP Overview & Distance Vector Foundation",
        "marks": "1.0"
      },
      {
        "component": "Hop Count Metric & 16-Hop Infinity Rule",
        "marks": "1.5"
      },
      {
        "component": "Bellman-Ford Formula & Periodic Timers",
        "marks": "2.0"
      },
      {
        "component": "Loop Prevention (Split Horizon & Poison Reverse)",
        "marks": "2.0"
      },
      {
        "component": "Conclusion & Practical Scope",
        "marks": "0.5"
      }
    ],
    "examTip": "Highlight the difference between Split Horizon (do not advertise back) and Poison Reverse (advertise back with metric 16)."
  },
  "cn-q36": {
    "verified": "BEU 2024 · Q.6(b) · 7 Marks",
    "intro": "Distance Vector Routing operates on the principle that each router shares its knowledge of the entire network with its immediate neighbors at regular intervals using the Bellman-Ford equation.",
    "diagrams": [
      {
        "title": "5-Node Network Topology with Link Costs",
        "ascii": "      (1)            (3)\n (A)--------(B)----------------(C)\n  |          |                  |\n (4)        (2)                (1)\n  |          |                  |\n (D)--------(E)-----------------+\n      (2)            (4)"
      }
    ],
    "sections": [
      {
        "heading": "1. Topology Link Cost Matrix",
        "points": [
          "Links: A–B (1), A–D (4), B–C (3), B–E (2), D–E (2), C–E (1).",
          "Non-adjacent pairs start with cost = ∞."
        ]
      },
      {
        "heading": "2. Initial Routing Vectors (Step 0 - Direct Neighbors Only)",
        "points": [
          "<b>At Node A:</b> [A:0, B:1, C:∞, D:4, E:∞]",
          "<b>At Node B:</b> [A:1, B:0, C:3, D:∞, E:2]",
          "<b>At Node C:</b> [A:∞, B:3, C:0, D:∞, E:1]",
          "<b>At Node D:</b> [A:4, B:∞, C:∞, D:0, E:2]",
          "<b>At Node E:</b> [A:∞, B:2, C:1, D:2, E:0]"
        ]
      },
      {
        "heading": "3. Iteration 1 Exchange Updates (Applying Bellman-Ford)",
        "points": [
          "<b>Node A learns from B & D:</b><br>• Distance to C: <code>min{c(A,B) + D_B(C)} = 1 + 3 = 4</code> (via B).<br>• Distance to E: <code>min{c(A,B) + D_B(E)} = 1 + 2 = 3</code> (via B).<br>• Distance to D: <code>min{c(A,D), c(A,B) + D_B(D)} = min{4, 1 + ∞} = 4</code>.<br>Updated Vector A: <code>[A:0, B:1, C:4, D:4, E:3]</code>.",
          "<b>Node D learns from A & E:</b><br>• Distance to B: <code>c(D,E) + D_E(B) = 2 + 2 = 4</code> (via E).<br>• Distance to C: <code>c(D,E) + D_E(C) = 2 + 1 = 3</code> (via E).<br>Updated Vector D: <code>[A:4, B:4, C:3, D:0, E:2]</code>."
        ]
      },
      {
        "heading": "4. Final Converged Routing Tables (All Nodes Stable)",
        "points": [
          "<b>Node A:</b> Dest B (cost 1, next B), Dest C (cost 4, next B), Dest D (cost 4, next D), Dest E (cost 3, next B).",
          "<b>Node B:</b> Dest A (cost 1, next A), Dest C (cost 3, next C or E), Dest D (cost 4, next E), Dest E (cost 2, next E).",
          "<b>Node C:</b> Dest A (cost 4, next B), Dest B (cost 3, next B or E), Dest D (cost 3, next E), Dest E (cost 1, next E)."
        ]
      }
    ],
    "conclusion": "The network converges completely in 2 exchange iterations. Every node obtains the globally shortest path using strictly local neighbor exchanges.",
    "markingScheme": [
      {
        "component": "Network Topology Diagram & Initial Step 0 Vectors",
        "marks": "2.0"
      },
      {
        "component": "Bellman-Ford Formula Application in Iteration 1",
        "marks": "2.5"
      },
      {
        "component": "Final Converged Distance Vector Tables for All Nodes",
        "marks": "2.5"
      }
    ],
    "examTip": "Show at least one intermediate vector computation in detail: DA(C) = c(A,B) + DB(C) = 1 + 3 = 4. Examiners reward clear calculation steps!"
  },
  "cn-q43": {
    "verified": "BEU 2023 · Q.9(d) · 7 Marks",
    "intro": "Network Address Translation (NAT), defined in RFC 3022, enables an entire private local network to share one or a small pool of globally unique public IPv4 addresses, mitigating IPv4 address exhaustion.",
    "diagrams": [
      {
        "title": "NAT Operation & Translation Table Mapping",
        "ascii": "[ PRIVATE NETWORK: 192.168.1.0/24 ]          [ PUBLIC INTERNET ]\nHost A: 192.168.1.10:5001 ----+\n                              |\nHost B: 192.168.1.20:5002 ----+---> [ NAT ROUTER ] =======> Web Server\n                                    Public IP: 203.0.113.1  142.250.190.46:80\n+----------------------------------------------------------------------------+\n| NAT TRANSLATION TABLE                                                      |\n| Inside Local IP:Port  | Inside Global IP:Port | Outside Global IP:Port     |\n| 192.168.1.10 : 5001   | 203.0.113.1 : 40001   | 142.250.190.46 : 80        |\n| 192.168.1.20 : 5002   | 203.0.113.1 : 40002   | 142.250.190.46 : 80        |\n+----------------------------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Three Major Flavors of NAT",
        "points": [
          "<b>1. Static NAT:</b> Maps a single private IP address to a single public IP address permanently on a 1-to-1 basis. Used for hosting internal web/mail servers.",
          "<b>2. Dynamic NAT:</b> Maps an unregistered private IP address to an available public IP from a pre-configured pool of registered public IPs on a first-come, first-served basis.",
          "<b>3. Port Address Translation (PAT / NAT Overload):</b> Maps thousands of private host sockets to a single public IP address by tracking unique Layer 4 ephemeral port numbers (up to ~65,000 concurrent sessions)."
        ]
      },
      {
        "heading": "2. Advantages and Limitations",
        "points": [
          "<b>Advantages:</b> Drastically conserves global IPv4 address space; enhances internal network security by hiding private topologies.",
          "<b>Limitations:</b> Breaks end-to-end IP principle; complicates peer-to-peer applications (VoIP, BitTorrent) requiring STUN/TURN traversal servers."
        ]
      }
    ],
    "conclusion": "NAT remains a cornerstone of enterprise networking, allowing millions of private devices to access the Internet simultaneously using a single public IPv4 address.",
    "markingScheme": [
      {
        "component": "NAT Definition & IPv4 Conservation Motivation",
        "marks": "1.5"
      },
      {
        "component": "Architectural Flow Diagram with Translation Table",
        "marks": "2.0"
      },
      {
        "component": "Types of NAT (Static, Dynamic, PAT/Overload)",
        "marks": "2.5"
      },
      {
        "component": "Advantages and Limitations Analysis",
        "marks": "1.0"
      }
    ],
    "examTip": "Draw the NAT translation table showing Inside Local, Inside Global, and Outside Global addresses. Emphasize that PAT uses port numbers."
  },
  "cn-q45": {
    "verified": "BEU 2023 · Q.5(a) & Q.5(b) · 14 Marks",
    "intro": "This comprehensive 14-mark question requires designing a multi-tier Classless Inter-Domain Routing (CIDR) block plan for 7 organizations using Variable Length Subnet Masking (VLSM).",
    "diagrams": [
      {
        "title": "Hierarchical CIDR Allocation Tree (Total Block: 2048 Addresses)",
        "ascii": "[ ISP BLOCK: 80.70.56.0/21 (Total Capacity: 2^11 = 2048 Addresses) ]\nRange: 80.70.56.0 to 80.70.63.255\n\nGroup 1 (2 Orgs x 512 Addrs):\n• Org 1: 80.70.56.0/23 [80.70.56.0 - 80.70.57.255] (512 addrs)\n• Org 2: 80.70.58.0/23 [80.70.58.0 - 80.70.59.255] (512 addrs)\n\nGroup 2 (2 Orgs x 256 Addrs):\n• Org 3: 80.70.60.0/24 [80.70.60.0 - 80.70.60.255] (256 addrs)\n• Org 4: 80.70.61.0/24 [80.70.61.0 - 80.70.61.255] (256 addrs)\n\nGroup 3 (3 Orgs x 64 Addrs):\n• Org 5: 80.70.62.0/26   [80.70.62.0   - 80.70.62.63]   (64 addrs)\n• Org 6: 80.70.62.64/26  [80.70.62.64  - 80.70.62.127]  (64 addrs)\n• Org 7: 80.70.62.128/26 [80.70.62.128 - 80.70.62.191]  (64 addrs)\n\nUNUSED CAPACITY (320 Available Addresses):\n• Subnet A: 80.70.62.192/26 (64 addresses: .62.192 - .62.255)\n• Subnet B: 80.70.63.0/24   (256 addresses: .63.0   - .63.255)"
      }
    ],
    "sections": [
      {
        "heading": "1. Group 1 Allocation (Org 1 & Org 2: 500 Addresses Each)",
        "points": [
          "Needs 500 addresses ⇒ Smallest power of 2 is <code>2⁹ = 512</code>.",
          "Prefix: <code>32 - 9 = /23</code> (Subnet Mask: <code>255.255.254.0</code>).",
          "<b>Org 1:</b> <code>80.70.56.0/23</code> (Range: 80.70.56.0 – 80.70.57.255, 512 addresses).",
          "<b>Org 2:</b> <code>80.70.58.0/23</code> (Range: 80.70.58.0 – 80.70.59.255, 512 addresses).",
          "Group 1 Total: 1,024 addresses."
        ]
      },
      {
        "heading": "2. Group 2 Allocation (Org 3 & Org 4: 250 Addresses Each)",
        "points": [
          "Needs 250 addresses ⇒ Smallest power of 2 is <code>2⁸ = 256</code>.",
          "Prefix: <code>32 - 8 = /24</code> (Subnet Mask: <code>255.255.255.0</code>).",
          "<b>Org 3:</b> <code>80.70.60.0/24</code> (Range: 80.70.60.0 – 80.70.60.255, 256 addresses).",
          "<b>Org 4:</b> <code>80.70.61.0/24</code> (Range: 80.70.61.0 – 80.70.61.255, 256 addresses).",
          "Group 2 Total: 512 addresses."
        ]
      },
      {
        "heading": "3. Group 3 Allocation (Org 5, Org 6, Org 7: 50 Addresses Each)",
        "points": [
          "Needs 50 addresses ⇒ Smallest power of 2 is <code>2⁶ = 64</code>.",
          "Prefix: <code>32 - 6 = /26</code> (Subnet Mask: <code>255.255.255.192</code>).",
          "<b>Org 5:</b> <code>80.70.62.0/26</code> (Range: 80.70.62.0 – 80.70.62.63, 64 addresses).",
          "<b>Org 6:</b> <code>80.70.62.64/26</code> (Range: 80.70.62.64 – 80.70.62.127, 64 addresses).",
          "<b>Org 7:</b> <code>80.70.62.128/26</code> (Range: 80.70.62.128 – 80.70.62.191, 64 addresses).",
          "Group 3 Total: 192 addresses."
        ]
      },
      {
        "heading": "4. Mathematical Audit of Total Unused Addresses",
        "points": [
          "Total ISP Capacity: <code>2³²⁻²¹ = 2¹¹ = 2,048 addresses</code>.",
          "Total Allocated: <code>1024 (Gr 1) + 512 (Gr 2) + 192 (Gr 3) = 1,728 addresses</code>.",
          "<b>Remaining Unallocated:</b> <code>2,048 - 1,728 = 320 addresses</code>.",
          "Unallocated Subnet 1: <code>80.70.62.192/26</code> (64 addresses: 80.70.62.192 to 80.70.62.255).",
          "Unallocated Subnet 2: <code>80.70.63.0/24</code> (256 addresses: 80.70.63.0 to 80.70.63.255).",
          "Total Unused Check: <code>64 + 256 = 320 addresses</code> (Exact match!)."
        ]
      }
    ],
    "table": {
      "title": "Master Allocation Table for All 7 Organizations",
      "headers": [
        "Organization",
        "Required",
        "Allocated Subnet",
        "Subnet Mask",
        "Usable / Total Range",
        "Addresses"
      ],
      "rows": [
        [
          "Org 1",
          "500",
          "80.70.56.0/23",
          "255.255.254.0",
          "80.70.56.0 – 80.70.57.255",
          "512"
        ],
        [
          "Org 2",
          "500",
          "80.70.58.0/23",
          "255.255.254.0",
          "80.70.58.0 – 80.70.59.255",
          "512"
        ],
        [
          "Org 3",
          "250",
          "80.70.60.0/24",
          "255.255.255.0",
          "80.70.60.0 – 80.70.60.255",
          "256"
        ],
        [
          "Org 4",
          "250",
          "80.70.61.0/24",
          "255.255.255.0",
          "80.70.61.0 – 80.70.61.255",
          "256"
        ],
        [
          "Org 5",
          "50",
          "80.70.62.0/26",
          "255.255.255.192",
          "80.70.62.0 – 80.70.62.63",
          "64"
        ],
        [
          "Org 6",
          "50",
          "80.70.62.64/26",
          "255.255.255.192",
          "80.70.62.64 – 80.70.62.127",
          "64"
        ],
        [
          "Org 7",
          "50",
          "80.70.62.128/26",
          "255.255.255.192",
          "80.70.62.128 – 80.70.62.191",
          "64"
        ],
        [
          "Unused Block 1",
          "—",
          "80.70.62.192/26",
          "255.255.255.192",
          "80.70.62.192 – 80.70.62.255",
          "64"
        ],
        [
          "Unused Block 2",
          "—",
          "80.70.63.0/24",
          "255.255.255.0",
          "80.70.63.0 – 80.70.63.255",
          "256"
        ]
      ]
    },
    "conclusion": "The ISP successfully provisions all 7 organizations with contiguous power-of-two CIDR subnets, leaving 320 unassigned addresses cleanly summarized in two standard subnets.",
    "markingScheme": [
      {
        "component": "Total Capacity & Initial Boundary Analysis (2048 addrs)",
        "marks": "2.0"
      },
      {
        "component": "Group 1 Subnet Design & Ranges (Org 1, Org 2)",
        "marks": "3.0"
      },
      {
        "component": "Group 2 Subnet Design & Ranges (Org 3, Org 4)",
        "marks": "3.0"
      },
      {
        "component": "Group 3 Subnet Design & Ranges (Org 5, Org 6, Org 7)",
        "marks": "3.0"
      },
      {
        "component": "Master Allocation Table & Unused Address Proof (320 addrs)",
        "marks": "3.0"
      }
    ],
    "examTip": "This was a full 14-mark question in BEU 2023! Allocate enough space to show the 320 unused addresses split into 80.70.62.192/26 (64) and 80.70.63.0/24 (256)."
  },
  "cn-q9": {
    "verified": "BEU 2022 / 2024 · 7 Marks",
    "intro": "When an IP datagram encounters a link with a Maximum Transmission Unit (MTU) smaller than the datagram length, the network layer must fragment the packet into smaller units that can safely traverse the physical link.",
    "diagrams": [
      {
        "title": "IPv4 Datagram Fragmentation Mechanism (MTU = 1500 Bytes)",
        "ascii": "[ ORIGINAL PACKET: 4000 Bytes ] (Header: 20 Bytes, Payload: 3980 Bytes)\n                      |\n                      v  Link MTU = 1500 Bytes (Max Data/Frag = 1480 Bytes)\n+-------------------------------------------------------------------------+\n| Frag 1: [Header: 20B][Payload: 1480B] -> Total: 1500B, MF=1, Offset=0   |\n| Frag 2: [Header: 20B][Payload: 1480B] -> Total: 1500B, MF=1, Offset=185 |\n| Frag 3: [Header: 20B][Payload: 1020B] -> Total: 1040B, MF=0, Offset=370 |\n+-------------------------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Given Parameters & Mathematical Constraints",
        "points": [
          "Original Total Length = 4000 bytes; Header Length = 20 bytes.",
          "Original Data Payload = <code>4000 - 20 = 3980 bytes</code>.",
          "Outgoing Link MTU = 1500 bytes.",
          "<b>Crucial 8-Byte Rule:</b> Each fragment payload must be a multiple of 8 bytes (because Fragment Offset is measured in 8-byte units).",
          "Max payload per fragment: <code>1500 - 20 = 1480 bytes</code>. (Check: <code>1480 / 8 = 185</code> — perfectly divisible!)."
        ]
      },
      {
        "heading": "2. Fragment Generation Calculations",
        "points": [
          "<b>Fragment 1:</b><br>• Data Payload: Bytes 0 to 1479 (1480 bytes).<br>• Total Length: <code>1480 + 20 = 1500 bytes</code>.<br>• More Fragments (MF) Flag: <code>1</code> (more fragments follow).<br>• Fragment Offset: <code>0 / 8 = 0</code>.",
          "<b>Fragment 2:</b><br>• Data Payload: Bytes 1480 to 2959 (1480 bytes).<br>• Total Length: <code>1480 + 20 = 1500 bytes</code>.<br>• More Fragments (MF) Flag: <code>1</code>.<br>• Fragment Offset: <code>1480 / 8 = 185</code>.",
          "<b>Fragment 3 (Last Fragment):</b><br>• Remaining Payload: <code>3980 - 2960 = 1020 bytes</code> (Bytes 2960 to 3979).<br>• Total Length: <code>1020 + 20 = 1040 bytes</code>.<br>• More Fragments (MF) Flag: <code>0</code> (indicates end of original datagram).<br>• Fragment Offset: <code>2960 / 8 = 370</code>."
        ]
      }
    ],
    "table": {
      "title": "Complete Fragmentation Parameter Summary Table",
      "headers": [
        "Fragment #",
        "Byte Range",
        "Data Length",
        "Header Length",
        "Total Length",
        "MF Flag",
        "Fragment Offset"
      ],
      "rows": [
        [
          "Fragment 1",
          "0 – 1479",
          "1480 Bytes",
          "20 Bytes",
          "1500 Bytes",
          "1",
          "0"
        ],
        [
          "Fragment 2",
          "1480 – 2959",
          "1480 Bytes",
          "20 Bytes",
          "1500 Bytes",
          "1",
          "185"
        ],
        [
          "Fragment 3",
          "2960 – 3979",
          "1020 Bytes",
          "20 Bytes",
          "1040 Bytes",
          "0",
          "370"
        ],
        [
          "Total Check",
          "0 – 3979",
          "3980 Bytes",
          "—",
          "—",
          "—",
          "—"
        ]
      ]
    },
    "conclusion": "The original 4000-byte datagram is fragmented into three packets. Total payload reassembles to 1480 + 1480 + 1020 = 3980 bytes, matching the original datagram.",
    "markingScheme": [
      {
        "component": "Max Payload Calculation with 8-Byte Divisibility Rule",
        "marks": "1.5"
      },
      {
        "component": "Fragment 1 Parameters (Len 1500, MF=1, Offset=0)",
        "marks": "1.5"
      },
      {
        "component": "Fragment 2 Parameters (Len 1500, MF=1, Offset=185)",
        "marks": "1.5"
      },
      {
        "component": "Fragment 3 Parameters (Len 1040, MF=0, Offset=370)",
        "marks": "1.5"
      },
      {
        "component": "Summary Table & Reassembly Verification",
        "marks": "1.0"
      }
    ],
    "examTip": "Always explain why 1480 is divided by 8 to get Offset 185. The Fragment Offset field in the IPv4 header is only 13 bits wide, so it counts units of 8 octets."
  },
  "cn-q21": {
    "verified": "BEU 2023 · Q.6(a) · 7 Marks",
    "intro": "Link State Routing (e.g., OSPF) relies on each node acquiring a complete, identical map of the network topology via Link State Advertisements (LSA) flooding, followed by local execution of Dijkstra’s Shortest Path First (SPF) algorithm.",
    "diagrams": [
      {
        "title": "6-Node Weighted Network Topology Graph",
        "ascii": "         (2)           (3)\n    (A)-------(B)------------(D)\n     |       /   \\            |\n    (4)    (1)    (2)        (1)\n     |     /        \\         |\n    (C)---/          +-------(E)\n     |                        |\n    (5)                      (2)\n     |                        |\n     +-----------------------(F)"
      }
    ],
    "sections": [
      {
        "heading": "1. Five Phases of Link State Routing",
        "points": [
          "<b>1. Discover Neighbors:</b> Send HELLO packets on each interface.",
          "<b>2. Measure Link Cost:</b> Measure round-trip delay or assign link cost based on inverse bandwidth.",
          "<b>3. Construct LSA:</b> Build Link State Packet containing list of direct neighbors and link costs.",
          "<b>4. Reliable Flooding:</b> Flood LSA to all routers in the autonomous system.",
          "<b>5. Compute Shortest Path:</b> Run Dijkstra’s algorithm locally to construct Shortest Path Tree (SPT)."
        ]
      },
      {
        "heading": "2. Dijkstra’s Algorithm Step-by-Step Trace (Source Node A)",
        "points": [
          "<b>Step 0:</b> Permanent set <code>N' = {A}</code>. Direct costs: D(B)=2, D(C)=4. All others = ∞. Minimum is B (2). Add B to N'.",
          "<b>Step 1:</b> <code>N' = {A, B}</code>. Update neighbors of B: D(C) = min(4, 2+1) = 3 (via B), D(D) = 2+3 = 5 (via B), D(E) = 2+2 = 4 (via B). Minimum is C (3). Add C to N'.",
          "<b>Step 2:</b> <code>N' = {A, B, C}</code>. Update from C: D(F) = 3+5 = 8 (via C). Current candidate costs: D(E)=4, D(D)=5, D(F)=8. Minimum is E (4). Add E to N'.",
          "<b>Step 3:</b> <code>N' = {A, B, C, E}</code>. Update from E: D(D) = min(5, 4+1) = 5, D(F) = min(8, 4+2) = 6 (via E). Minimum is D (5). Add D to N'.",
          "<b>Step 4:</b> <code>N' = {A, B, C, D, E}</code>. Candidate D(F) = 6. Add F to N'.",
          "<b>Step 5:</b> <code>N' = {A, B, C, D, E, F}</code>. All 6 nodes are permanent!"
        ]
      }
    ],
    "table": {
      "title": "Complete Dijkstra Iteration Execution Table",
      "headers": [
        "Step",
        "Permanent Set N'",
        "D(B), p(B)",
        "D(C), p(C)",
        "D(D), p(D)",
        "D(E), p(E)",
        "D(F), p(F)"
      ],
      "rows": [
        [
          "0",
          "{A}",
          "2, A",
          "4, A",
          "∞",
          "∞",
          "∞"
        ],
        [
          "1",
          "{A, B}",
          "—",
          "3, B",
          "5, B",
          "4, B",
          "∞"
        ],
        [
          "2",
          "{A, B, C}",
          "—",
          "—",
          "5, B",
          "4, B",
          "8, C"
        ],
        [
          "3",
          "{A, B, C, E}",
          "—",
          "—",
          "5, B",
          "—",
          "6, E"
        ],
        [
          "4",
          "{A, B, C, D, E}",
          "—",
          "—",
          "—",
          "—",
          "6, E"
        ],
        [
          "5",
          "{A, B, C, D, E, F}",
          "—",
          "—",
          "—",
          "—",
          "—"
        ]
      ]
    },
    "conclusion": "The shortest paths from Source Node A are: B (cost 2, next B), C (cost 3, next B), E (cost 4, next B), D (cost 5, next B), F (cost 6, next B). All traffic routes initially through B.",
    "markingScheme": [
      {
        "component": "Link State 5-Step Operational Overview",
        "marks": "1.5"
      },
      {
        "component": "Network Graph Diagram & Initialization",
        "marks": "1.5"
      },
      {
        "component": "Step-by-Step Dijkstra Trace Table (Steps 0 to 5)",
        "marks": "2.5"
      },
      {
        "component": "Final Routing Table & Shortest Path Tree",
        "marks": "1.5"
      }
    ],
    "examTip": "Always write both the cost and parent node in the table (e.g. \"3, B\" meaning cost 3 via parent B). It prevents path reconstruction errors."
  },
  "cn-q12": {
    "verified": "BEU 2022 · Q.7 / 2024 · 7 Marks",
    "intro": "In local area networks, successful packet forwarding requires two distinct levels of addressing: logical 32-bit IP addresses for end-to-end routing, and physical 48-bit MAC addresses for node-to-node frame delivery. Address Resolution Protocol (ARP) maps known IP addresses to physical MAC addresses, while Dynamic Host Configuration Protocol (DHCP) automates IP, gateway, and DNS configuration for joining hosts.",
    "diagrams": [
      {
        "title": "ARP Request (Broadcast) vs ARP Reply (Unicast) Frame Flow",
        "ascii": "HOST A (Sender)                                            HOST B (Target)\nIP: 192.168.1.10                                           IP: 192.168.1.20\nMAC: AA:AA:AA:AA:AA:AA                                     MAC: BB:BB:BB:BB:BB:BB\n       |                                                             |\n       |===== 1. ARP REQUEST (BROADCAST) ===========================>|\n       |      \"Who has 192.168.1.20? Tell 192.168.1.10\"              |\n       |      Dest MAC: FF:FF:FF:FF:FF:FF (Flooded to all LAN nodes) |\n       |                                                             | (Host B checks target IP;\n       |                                                             |  matches! Updates its ARP\n       |                                                             |  cache with A's IP & MAC)\n       |                                                             |\n       |<==== 2. ARP REPLY (UNICAST) ================================|\n       |      \"192.168.1.20 is at BB:BB:BB:BB:BB:BB\"                 |\n       |      Dest MAC: AA:AA:AA:AA:AA:AA (Direct unicast to Host A) |\n       v                                                             v"
      },
      {
        "title": "DHCP 4-Step DORA Message Exchange Protocol Ladder",
        "ascii": "CLIENT (New Node, Port 68)                             DHCP SERVER (Port 67)\n  |                                                              |\n  |--- 1. DHCP DISCOVER (Broadcast: 255.255.255.255) ----------->|\n  |       \"Looking for an available IP address\"                  |\n  |                                                              |\n  |<-- 2. DHCP OFFER (Unicast / Broadcast) ----------------------|\n  |       \"Here is an offered IP: 192.168.1.50, Mask: /24,       |\n  |        Gateway: 192.168.1.1, DNS: 8.8.8.8, Lease: 86400s\"   |\n  |                                                              |\n  |--- 3. DHCP REQUEST (Broadcast) ----------------------------->|\n  |       \"Accepting IP 192.168.1.50 from Server\"                |\n  |                                                              |\n  |<-- 4. DHCP ACK (Acknowledgment) -----------------------------|\n  |       \"Lease confirmed! IP 192.168.1.50 is officially yours\" |\n  v                                                              v"
      }
    ],
    "sections": [
      {
        "heading": "1. Working of Address Resolution Protocol (ARP)",
        "points": [
          "<b>ARP Need:</b> When a host has an outgoing IP datagram for a local destination whose MAC is unknown, it cannot build the Ethernet Frame. It must query the LAN for the physical address.",
          "<b>ARP Request (Broadcast):</b> Encapsulated in an Ethernet frame with Destination MAC <code>FF:FF:FF:FF:FF:FF</code>. Every interface on the LAN receives and processes the request.",
          "<b>ARP Reply (Unicast):</b> Only the target node matching the queried IP address replies, filling its own hardware address and sending the response directly back to the requester.",
          "<b>ARP Cache Table:</b> Both nodes cache the mapping for a timeout period (typically 20 minutes) to eliminate repetitive network broadcasts for subsequent packets."
        ]
      },
      {
        "heading": "2. Working of Dynamic Host Configuration Protocol (DHCP)",
        "points": [
          "<b>Application Layer Architecture:</b> DHCP runs over UDP using Server Port 67 and Client Port 68.",
          "<b>The Four-Step DORA Sequence:</b><br>• <i>Discover:</i> Unconfigured host broadcasts <code>0.0.0.0:68 → 255.255.255.255:67</code>.<br>• <i>Offer:</i> DHCP server reserves an IP from its pool and sends candidate configuration.<br>• <i>Request:</i> Client accepts the offer, broadcasting so other competing DHCP servers can retract their offers.<br>• <i>Acknowledgment (ACK):</i> Server formalizes lease duration (T1 renewal at 50%, T2 rebind at 87.5%)."
        ]
      }
    ],
    "table": {
      "title": "Comparison: ARP vs DHCP",
      "headers": [
        "Feature",
        "Address Resolution Protocol (ARP)",
        "Dynamic Host Configuration Protocol (DHCP)"
      ],
      "rows": [
        [
          "Layer in Stack",
          "Data Link / Network Interface (Layer 2.5)",
          "Application Layer (Layer 7) over UDP"
        ],
        [
          "Primary Role",
          "Resolves known IP to unknown MAC",
          "Dynamically allocates IP, mask, gateway, and DNS"
        ],
        [
          "Scope",
          "Local single broadcast domain only",
          "Can cross subnets using DHCP Relay Agents"
        ],
        [
          "Ports Used",
          "Raw Ethernet type 0x0806 (no port numbers)",
          "UDP Port 67 (Server) and Port 68 (Client)"
        ],
        [
          "Lifetime of Data",
          "ARP Cache timeout (10–20 mins)",
          "Configurable Lease Time (hours to days)"
        ]
      ]
    },
    "conclusion": "ARP provides the essential hardware-binding glue for local packet delivery, while DHCP automates host network configuration, eliminating manual IP allocation errors across enterprise and campus networks.",
    "markingScheme": [
      {
        "component": "ARP Definition, Broadcast/Unicast Workflow & Frame Diagram",
        "marks": "2.0"
      },
      {
        "component": "ARP Cache Table Management & Timeout",
        "marks": "1.0"
      },
      {
        "component": "DHCP Role & Transport Layer Ports (UDP 67/68)",
        "marks": "1.0"
      },
      {
        "component": "DHCP DORA 4-Step Message Ladder & Lease Timing",
        "marks": "2.0"
      },
      {
        "component": "ARP vs DHCP Summary Comparison Table",
        "marks": "1.0"
      }
    ],
    "examTip": "Remember: ARP Request is ALWAYS Broadcast (FF:FF:FF:FF:FF:FF), but ARP Reply is ALWAYS Unicast! Stating this explicitly is worth an entire mark."
  },
  "cn-q54": {
    "verified": "BEU 2023 · Q.7(b) · 7 Marks",
    "intro": "Modern computer network architectures employ a strict division of responsibilities across protocol layers. To accomplish end-to-end communication across interconnected networks, two fundamentally different addressing schemes are essential: Logical IP Addresses at Layer 3 (Network Layer) and Physical MAC Addresses at Layer 2 (Data Link Layer). Each addressing scheme operates at a different scope, fulfills distinct topological requirements, and is optimized for different forwarding hardware.",
    "diagrams": [
      {
        "title": "End-to-End Hop-by-Hop Packet Forwarding: IP Invariance vs MAC Mutability",
        "ascii": "HOST A (Source LAN)                                                 HOST B (Destination LAN)\nIP: 10.0.1.10                                                       IP: 10.0.2.20\nMAC: AA:AA:AA:AA:AA:01                                              MAC: BB:BB:BB:BB:BB:02\n       |                                                                   ^\n       | [Hop 1: Source LAN]                                               | [Hop 2: Dest LAN]\n       | Src IP:  10.0.1.10 (INVARIANT)                                    | Src IP:  10.0.1.10\n       | Dest IP: 10.0.2.20 (INVARIANT)                                    | Dest IP: 10.0.2.20\n       | Src MAC:  AA:AA:AA:AA:AA:01                                       | Src MAC:  R2:22:22:22:22:02\n       | Dest MAC: R1:11:11:11:11:01                                       | Dest MAC: BB:BB:BB:BB:BB:02\n       v                                                                   |\n+---------------------+          WAN / Backbone Link          +---------------------+\n| ROUTER R1 (Gateway) |======================================>| ROUTER R2 (Gateway) |\n| LAN MAC: R1:11...01 |                                       | LAN MAC: R2:22...02 |\n+---------------------+                                       +---------------------+\nKey Law: IP addresses identify end-to-end source and destination across the globe.\n         MAC addresses identify immediate next-hop hardware on the local physical link!"
      },
      {
        "title": "Address Architectural Structure: IPv6 (128-Bit) vs MAC (48-Bit)",
        "ascii": "1. IPv6 LOGICAL ADDRESS (128 Bits / 16 Octets / Hexadecimal Colon Notation):\n+------------------------------------------+------------------------------------------+\n|      ROUTING PREFIX / SUBNET ID          |           INTERFACE IDENTIFIER           |\n|                64 Bits                   |                 64 Bits                  |\n+------------------------------------------+------------------------------------------+\nExample: 2001 : 0db8 : 85a3 : 0000 : 0000 : 8a2e : 0370 : 7334\nCompressed: 2001:db8:85a3::8a2e:370:7334\n\n2. ETHERNET MAC ADDRESS (48 Bits / 6 Octets / Hexadecimal Dash/Colon Notation):\n+------------------------------------------+------------------------------------------+\n|  ORGANIZATIONALLY UNIQUE IDENTIFIER(OUI) |     NETWORK INTERFACE CONTROLLER (NIC)   |\n|         24 Bits (Vendor ID)              |             24 Bits (Serial)             |\n+------------------------------------------+------------------------------------------+\nExample: 02 : 1A : 2B : 3C : 4D : 5E"
      }
    ],
    "table": {
      "title": "Fundamental Differences: Network Layer IP Address vs Data Link Layer MAC Address",
      "headers": [
        "Comparison Criterion",
        "IP Address (IPv4 / IPv6)",
        "MAC Address (IEEE 802 Ethernet/Wi-Fi)"
      ],
      "rows": [
        [
          "OSI Protocol Layer",
          "Layer 3 (Network Layer)",
          "Layer 2 (Data Link Layer)"
        ],
        [
          "Address Length",
          "IPv4: 32 bits (4B); IPv6: 128 bits (16B)",
          "Standard Ethernet: 48 bits (6B / 6 octets)"
        ],
        [
          "Address Hierarchy",
          "Hierarchical (Network ID + Subnet ID + Host ID)",
          "Flat (24-bit Vendor OUI + 24-bit Serial Number)"
        ],
        [
          "Primary Function",
          "Global logical addressing & end-to-end packet routing",
          "Hop-by-hop local frame delivery within a single subnet"
        ],
        [
          "Mobility & Reassignment",
          "Dynamic; changes when moving to another network (DHCP)",
          "Permanently burned into NIC hardware (ROM/EEPROM)"
        ],
        [
          "Mutability in Transit",
          "Source and Destination IP remain INVARIANT end-to-end",
          "Source and Destination MAC change at EVERY router hop"
        ],
        [
          "Forwarding Device",
          "Routers & Layer 3 switches (Routing Table lookup)",
          "Layer 2 Ethernet switches (CAM / MAC Address Table)"
        ],
        [
          "Address Resolution",
          "Resolved to MAC via ARP (IPv4) or ND (IPv6)",
          "Used directly by NIC physical layer frame filter"
        ],
        [
          "Address Space Size",
          "IPv4: 4.3×10⁹ addrs; IPv6: 3.4×10³⁸ addresses",
          "2⁴⁸ ≈ 2.81 × 10¹⁴ total unique hardware devices"
        ],
        [
          "Representation Format",
          "Dotted-decimal (IPv4) or Hex-colon (IPv6)",
          "Six hyphenated or colon-separated hex bytes"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Why Networks Strictly Require Both Address Types",
        "points": [
          "<b>A. Hierarchical Routing vs Flat Addressing:</b> Global internet routers cannot store flat MAC addresses. If routers had to track 48-bit flat MACs for billions of global devices, routing tables would require trillions of unaggregatable entries, crashing the Internet backbone. IP addresses are hierarchical (like country → state → pin code), allowing routers to summarize millions of hosts into a single CIDR prefix (e.g. /16).",
          "<b>B. Decoupling Hardware from Network Topology:</b> If your device’s network identity were tied strictly to its MAC address, changing physical network interfaces (or switching from Ethernet to Wi-Fi) would break all running connections. IP abstracts the underlying hardware technology, allowing seamless communication across Ethernet, Wi-Fi, satellite, and fiber.",
          "<b>C. Local Link Multicasting & Frame Demultiplexing:</b> Within an Ethernet switch, hardware ASIC chips inspect 48-bit MAC addresses at line rate (nanosecond latency) to forward frames to specific physical switch ports without needing expensive Layer 3 IP route table lookups."
        ]
      },
      {
        "heading": "2. What Would Happen If Only IP Addresses Were Used in Computer Networks?",
        "points": [
          "<b>1. Total Breakdown of Existing Layer 2 Ethernet Infrastructure:</b> Standard Ethernet frames (IEEE 802.3) require 6-byte source and destination MAC address fields. Eliminating MAC addresses would invalidate billions of existing Ethernet switches, Wi-Fi access points, and network interface cards (NICs).",
          "<b>2. Enormous Switch Hardware Costs:</b> Ethernet switches forward frames at multi-gigabit speeds using cheap Content Addressable Memory (CAM) tables indexing 48-bit MACs. Without MACs, every basic home switch would need expensive Layer 3 routing engines capable of longest-prefix-match IP lookups.",
          "<b>3. Obsoleting Address Resolution Protocols:</b> ARP (in IPv4) and Neighbor Discovery (in IPv6) exist solely to bind Layer 3 logical IPs to Layer 2 physical MACs. In an IP-only network, ARP/ND would be eliminated, but hosts would require a completely new mechanism to identify which specific physical station on a shared cable or wireless frequency should process incoming bits.",
          "<b>4. Loss of Technology Independence:</b> Different physical link technologies (Ethernet, ATM, PPP, Frame Relay) use different physical addressing formats. Point-to-point links (like HDLC/PPP) already operate without MAC addresses because there is only one possible receiver at the other end of the wire. However, on multi-access broadcast media (Ethernet, Wi-Fi 802.11), physical identifiers are indispensable.",
          "<b>5. NIC Hardware Filtering Disabled:</b> NICs filter out unwanted LAN traffic in hardware by matching the destination MAC. If only IP were used, every single broadcasted packet on a Wi-Fi or Ethernet bus would interrupt the CPU to parse IP headers, causing severe CPU performance degradation."
        ]
      },
      {
        "heading": "3. Why IPv6 Uses 128 Bits",
        "points": [
          "<b>Address Space Expansion:</b> IPv4 uses 32 bits (<code>2³² ≈ 4.29 × 10⁹</code> addresses), which was exhausted by mobile phones, IoT, and cloud services. IPv6 provides 128 bits, yielding <code>2¹²⁸ ≈ 3.4 × 10³⁸</code> addresses (over <code>6.67 × 10²³</code> addresses per square meter of Earth).",
          "<b>Ratio of Address Spaces:</b> <code>2¹²⁸ / 2³² = 2⁹⁶ ≈ 7.92 × 10²⁸</code> times larger than IPv4!",
          "<b>Hierarchical Efficiency:</b> The 128-bit space allows structured 64-bit network routing prefixes (Global Routing Prefix + Subnet ID) and 64-bit Interface Identifiers (SLAAC auto-configuration), eliminating the need for NAT while preserving scalable global route aggregation."
        ]
      }
    ],
    "conclusion": "IP addresses and MAC addresses are complementary, not redundant. IP addresses provide logical, hierarchical addressing enabling scalable global routing across heterogeneous networks. MAC addresses provide physical, flat addressing enabling high-speed local frame delivery across immediate physical links. While point-to-point links can operate without MAC addresses, multi-access LANs (Ethernet and Wi-Fi) strictly require both.",
    "markingScheme": [
      {
        "component": "Introduction & Clear Definitions of IP (Layer 3) and MAC (Layer 2)",
        "marks": "1.0"
      },
      {
        "component": "Architectural Address Formats (128-Bit IPv6 vs 48-Bit MAC) & Diagram",
        "marks": "1.0"
      },
      {
        "component": "Core Necessity: End-to-End Routing vs Local Hop-by-Hop Frame Delivery",
        "marks": "1.5"
      },
      {
        "component": "Hop-by-Hop Communication Diagram Showing IP Invariance vs MAC Rewriting",
        "marks": "1.0"
      },
      {
        "component": "Exhaustive Analysis of IP-Only Network Consequences (5 Technical Points)",
        "marks": "1.5"
      },
      {
        "component": "IPv6 128-Bit Address Space Comparison (2^96 Ratio) & Conclusion",
        "marks": "1.0"
      }
    ],
    "examTip": "Bhai, is question mein sirf IPv6 = 128 bits, MAC = 48 bits likhna enough nahi. Examiner ko explain karna hai ki IP address routing ke liye hai aur MAC address local frame delivery ke liye. Router ke through packet forwarding wala diagram is answer ka strongest part hai."
  },
  "cn-q37": {
    "verified": "BEU 2024 · Q.7(a) · 7 Marks",
    "intro": "TCP provides an end-to-end flow control service to match the sender’s transmission rate with the receiver’s application consumption rate, preventing the sender from overflowing the receiver’s buffer.",
    "diagrams": [
      {
        "title": "TCP Receiver Buffer & Receive Window (rwnd) Relationship",
        "ascii": "[ RECEIVER BUFFER: Total Capacity = RcvBuffer ]\n+-------------------------+-------------------------+--------------------+\n| Bytes read by App       | Buffered, Unread Data   | Free Space (rwnd)  |\n+-------------------------+-------------------------+--------------------+\n0                   LastByteRead              LastByteRcvd         Buffer End\n                          |<--- In Buffer Data ---->|<---- rwnd -------->|\n\nrwnd = RcvBuffer - [ LastByteRcvd - LastByteRead ]"
      }
    ],
    "sections": [
      {
        "heading": "1. Mathematical Variables at Receiver & Sender",
        "points": [
          "<b>Receiver Variables:</b><br>• <code>LastByteRead</code>: Number of the last byte read by the application.<br>• <code>LastByteRcvd</code>: Number of the last byte arrived and buffered.<br>• Receiver Buffer Constraint: <code>LastByteRcvd - LastByteRead ≤ RcvBuffer</code>.<br>• Advertised Window: <code>rwnd = RcvBuffer - [LastByteRcvd - LastByteRead]</code>.<br>Receiver conveys <code>rwnd</code> inside every TCP header window field.",
          "<b>Sender Variables & Invariant:</b><br>• <code>LastByteSent</code>: Number of the last byte transmitted.<br>• <code>LastByteAcked</code>: Number of the last byte acknowledged by receiver.<br>• Unacknowledged Data: <code>LastByteSent - LastByteAcked ≤ rwnd</code>.<br>By strictly maintaining this inequality, TCP guarantees that unacknowledged in-flight data never exceeds the receiver’s free buffer space."
        ]
      },
      {
        "heading": "2. Edge Cases: Zero-Window Probing & Silly Window Syndrome",
        "points": [
          "<b>Zero-Window Probing:</b> When <code>rwnd = 0</code>, sender stops transmitting. When receiver app reads data, a window update ACK could be lost, deadlocking both sides. TCP solves this using a <i>Persist Timer</i>: upon expiration, sender transmits a 1-byte probe segment, forcing receiver to re-advertise its current <code>rwnd</code>.",
          "<b>Silly Window Syndrome (SWS):</b> Occurs when sender transmits tiny chunks (e.g., 1 byte payload inside a 40-byte TCP/IP header = 2.5% efficiency). Solutions: <br>• <i>Clark’s Solution (Receiver-side):</i> Receiver advertises rwnd = 0 until it can open by at least MSS or half RcvBuffer.<br>• <i>Nagle’s Algorithm (Sender-side):</i> Sender buffers small data and only transmits if a full MSS is accumulated or all previous packets are acknowledged."
        ]
      }
    ],
    "conclusion": "TCP dynamically throttles transmission using rwnd feedback, and prevents deadlocks and micro-packet inefficiencies using persist timers and Nagle/Clark algorithms.",
    "markingScheme": [
      {
        "component": "Flow Control Definition & Receiver Buffer Diagram",
        "marks": "2.0"
      },
      {
        "component": "Receiver & Sender Variables Formulation (rwnd inequality)",
        "marks": "2.0"
      },
      {
        "component": "Zero-Window Deadlock & Persist Timer Probe",
        "marks": "1.5"
      },
      {
        "component": "Silly Window Syndrome & Solutions (Nagle and Clark)",
        "marks": "1.5"
      }
    ],
    "examTip": "Write out the core inequality clearly: LastByteSent - LastByteAcked ≤ rwnd. Examiners award 2 marks directly for this mathematical statement."
  },
  "cn-q38": {
    "verified": "BEU 2024 · Q.7(b) · 7 Marks",
    "intro": "User Datagram Protocol (UDP) is a minimal, connectionless transport-layer protocol (RFC 768) that provides process-to-process multiplexing and optional error checking with minimal overhead.",
    "diagrams": [
      {
        "title": "UDP 8-Byte Header Architecture & Pseudo-Header",
        "ascii": " 0                   15 16                  31  Bits\n+----------------------+----------------------+\n|   Source Port (16)   | Destination Port (16)|  4 Bytes\n+----------------------+----------------------+\n|      Length (16)     |     Checksum (16)    |  4 Bytes\n+----------------------+----------------------+\n|                 Data Payload ...            |  Variable\n+---------------------------------------------+\n\n[ UDP PSEUDO-HEADER (For Checksum Calculation Only) ]\n+-----------------------------------------------------+\n|              32-bit Source IP Address               |\n+-----------------------------------------------------+\n|           32-bit Destination IP Address             |\n+----------------------+----------------------+-------+\n|     All Zeros (8)    | Protocol 17=UDP (8)  |Length |\n+----------------------+----------------------+-------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Detailed Analysis of the Four Header Fields",
        "points": [
          "<b>Source Port (16 bits):</b> Port number of sending process; optional (set to 0 if client requires no reply).",
          "<b>Destination Port (16 bits):</b> Port number of receiving process on target host (e.g., DNS port 53, DHCP port 67).",
          "<b>Length (16 bits):</b> Total length of UDP segment in bytes (Header + Payload). Minimum value is 8 bytes.",
          "<b>Checksum (16 bits):</b> 16-bit one’s complement sum covering pseudo-header, UDP header, and payload. Set to all zeros if checksum is disabled."
        ]
      },
      {
        "heading": "2. Numerical Checksum Calculation (16-Bit One’s Complement)",
        "points": [
          "Suppose we calculate the checksum for three 16-bit binary words:<br>• Word 1: <code>1001 0101 0101 0010</code> (Hex: <code>0x9552</code>)<br>• Word 2: <code>1000 1100 1010 0101</code> (Hex: <code>0x8CA5</code>)<br>• Word 3: <code>0100 0000 0000 0001</code> (Hex: <code>0x4001</code>)",
          "<b>Step 1: Add Word 1 and Word 2:</b><br><code>  0x9552</code><br><code>+ 0x8CA5</code><br><code>-------</code><br><code> 0x121F7</code> (17-bit sum with carry bit 1).",
          "<b>Step 2: Add End-Around Carry:</b><br><code>  0x21F7 + 1 = 0x21F8</code>.",
          "<b>Step 3: Add Word 3:</b><br><code>  0x21F8 + 0x4001 = 0x61F9</code> (<code>0110 0001 1111 1001₂</code>).",
          "<b>Step 4: Take One’s Complement Inversion:</b><br>Invert all bits: <code>~0x61F9 = 0x9E06</code> (<code>1001 1110 0000 0110₂</code>).",
          "<b>Transmitted Checksum:</b> <code>0x9E06</code>.",
          "<b>Step 5: Receiver Verification:</b><br>Receiver adds all words PLUS the checksum: <code>0x61F9 + 0x9E06 = 0xFFFF</code> (all 1s). Since the sum is all 1s (one’s complement zero), NO error is detected!"
        ]
      }
    ],
    "conclusion": "The UDP header is fixed at 8 bytes. The 16-bit one’s complement checksum detects bit errors across both transport and network layer pseudo-header fields.",
    "markingScheme": [
      {
        "component": "UDP Segment 8-Byte Layout Diagram",
        "marks": "1.5"
      },
      {
        "component": "Detailed Field Function Descriptions (Ports, Length, Checksum)",
        "marks": "2.0"
      },
      {
        "component": "Pseudo-Header Concept Explanation",
        "marks": "1.0"
      },
      {
        "component": "Step-by-Step Numerical Checksum Calculation with Carry",
        "marks": "1.5"
      },
      {
        "component": "Receiver Verification (Sum = 0xFFFF)",
        "marks": "1.0"
      }
    ],
    "examTip": "Always mention the \"End-Around Carry\" wrap-around step and prove that the receiver gets 0xFFFF (all ones) for full 7 marks."
  },
  "cn-q39": {
    "verified": "BEU 2024 · Q.8(b) · 7 Marks",
    "intro": "Congestion in computer networks occurs when the aggregate packet arrival rate exceeds the forwarding or buffering capacity of intermediate routers, causing queue overflow, packet drops, and throughput collapse.",
    "diagrams": [
      {
        "title": "TCP Congestion Window (cwnd) Evolution Curve Across Phases",
        "ascii": "cwnd (MSS)\n  ^\n16|                              [ CONGESTION AVOIDANCE (AIMD) ]\n  |                              /|\n12|                             / |\n  |                            /  | <--- 3 Duplicate ACKs (Triple Dup ACK)\n 8|            +--------------+   |\n  |           / [ssthresh = 8]    | [Fast Recovery: cwnd = ssthresh + 3]\n 4|          /                    |\\\n  |         / [SLOW START]        | \\\n 2|        /                      |  \\\n 1|---+---+                       +---+------------------------> Time (RTTs)\n      0   1   2   3   4   5   6   7   8   9  10  11  12"
      }
    ],
    "sections": [
      {
        "heading": "1. Three Fundamental Transport-Layer Policies",
        "points": [
          "<b>1. Slow Start:</b> Begins at <code>cwnd = 1 MSS</code>. For every received ACK, cwnd increases by 1 MSS (effectively doubling cwnd every RTT: 1 → 2 → 4 → 8). Exponential growth continues until cwnd reaches the slow-start threshold (<code>ssthresh</code>).",
          "<b>2. Congestion Avoidance (Additive Increase):</b> Once <code>cwnd ≥ ssthresh</code>, growth shifts to linear increase: <code>cwnd = cwnd + 1 MSS</code> per RTT. Probes for available bandwidth cautiously without overwhelming buffers.",
          "<b>3. Fast Retransmit & Fast Recovery (Multiplicative Decrease):</b><br>• <i>Fast Retransmit:</i> When sender receives 3 duplicate ACKs for the same segment, it assumes the packet was dropped and immediately retransmits it without waiting for the retransmission timer to expire.<br>• <i>Fast Recovery:</i> Instead of resetting cwnd back to 1 (which TCP Tahoe did), TCP Reno sets <code>ssthresh = cwnd / 2</code> and <code>cwnd = ssthresh + 3 MSS</code>, continuing linear increase."
        ]
      }
    ],
    "conclusion": "By combining exponential probing (Slow Start), additive increase (Avoidance), and multiplicative decrease (Fast Recovery), TCP stabilizes global Internet traffic without central coordination.",
    "markingScheme": [
      {
        "component": "Network Congestion Definition & Symptoms",
        "marks": "1.0"
      },
      {
        "component": "Slow Start Mechanism & Exponential Growth Formula",
        "marks": "1.5"
      },
      {
        "component": "Congestion Avoidance (AIMD) Mechanism",
        "marks": "1.5"
      },
      {
        "component": "Fast Retransmit & Fast Recovery (3 Duplicate ACKs)",
        "marks": "1.5"
      },
      {
        "component": "Labelled cwnd vs Time Progression Graph",
        "marks": "1.5"
      }
    ],
    "examTip": "Label ssthresh clearly on the graph where the exponential curve transitions into a straight line (linear growth)."
  },
  "cn-q44": {
    "verified": "BEU 2023 · Q.3(b) · 7 Marks",
    "intro": "Traffic shaping controls the volume and rate of traffic sent into a network to ensure QoS. Leaky Bucket and Token Bucket are the two primary traffic shaping algorithms used in packet networks.",
    "diagrams": [
      {
        "title": "Leaky Bucket (Rigid Uniform Rate) vs Token Bucket (Bursts Allowed)",
        "ascii": "[ LEAKY BUCKET ]                                [ TOKEN BUCKET ]\nBursty Packet Inflow                            Tokens generated at rate r\n       |                                                |\n       v                                                v\n+--------------+                                +--------------+\n| Packet Queue | (Fixed capacity C)             | Token Bucket | (Capacity b)\n+--------------+                                +--------------+\n       |                                                |\n       | Water leaks at CONSTANT rate                   v (Packet grabs token)\n       v                                         +--------------+\nStrictly Constant Output Stream                  | Output Gate  | ===> Burst Out\n(Bursts completely eliminated)                   +--------------+      at Peak M"
      }
    ],
    "sections": [
      {
        "heading": "1. Leaky Bucket Algorithm",
        "points": [
          "Buffers incoming bursty packets in a finite queue of capacity C.",
          "Discharges packets at a strictly uniform, constant rate (r), regardless of inflow rate.",
          "If packet inflow exceeds bucket capacity, subsequent packets overflow and are dropped.",
          "Cannot transmit bursts even if the network link is completely idle."
        ]
      },
      {
        "heading": "2. Token Bucket Algorithm & Maximum Burst Equation",
        "points": [
          "Tokens are deposited into a token bucket of capacity b at a constant rate r tokens/sec.",
          "To transmit a packet of size m bytes, m tokens are removed from the bucket. If not enough tokens, packet waits.",
          "When the bucket is full (b tokens accumulated during idle periods), the sender can transmit a short burst at maximum link speed M.",
          "<b>Maximum Burst Duration Formula:</b> Let burst duration be S seconds. Total bytes transmitted during burst = <code>b + r × S</code>.<br>At peak rate M: <code>M × S = b + r × S ⇒ S = b / (M - r) seconds</code>."
        ]
      }
    ],
    "table": {
      "title": "Comparison: Leaky Bucket vs Token Bucket",
      "headers": [
        "Feature",
        "Leaky Bucket Algorithm",
        "Token Bucket Algorithm"
      ],
      "rows": [
        [
          "Output Rate",
          "Strictly constant, uniform rate",
          "Average rate r, but allows bursts up to peak rate M"
        ],
        [
          "Burst Handling",
          "Smooths bursts; bursts never transmitted",
          "Allows controlled, bounded bursts"
        ],
        [
          "Discard Behavior",
          "Discards packets when queue fills",
          "Discards tokens when token bucket fills (never drops packets)"
        ],
        [
          "Resource Saved",
          "Buffers packets",
          "Accumulates tokens (virtual permissions)"
        ],
        [
          "Token Dependency",
          "No tokens used",
          "Packet must capture token to transmit"
        ]
      ]
    },
    "conclusion": "Token Bucket provides superior flexibility for computer data because it accommodates natural bursts while enforcing long-term average bandwidth limits.",
    "markingScheme": [
      {
        "component": "Leaky Bucket Working Principle & Constant Leak Rate",
        "marks": "1.5"
      },
      {
        "component": "Token Bucket Working Principle & Token Accumulation",
        "marks": "1.5"
      },
      {
        "component": "Neat Architectural Diagrams for Both Algorithms",
        "marks": "1.5"
      },
      {
        "component": "Maximum Burst Duration Derivation [S = b / (M - r)]",
        "marks": "1.5"
      },
      {
        "component": "Comparison Table & Conclusion",
        "marks": "1.0"
      }
    ],
    "examTip": "Always write down the burst formula S = b / (M - r). Examiners look specifically for this mathematical expression."
  },
  "cn-q13": {
    "verified": "BEU 2022 · Q.7(a) / 2024 · 7 Marks",
    "intro": "Transmission Control Protocol (TCP) establishes an end-to-end full-duplex byte-stream connection using a Three-Way Handshake and terminates it using a Four-Way Handshake with symmetric half-closes.",
    "diagrams": [
      {
        "title": "TCP 3-Way Handshake & 4-Way Teardown Timing Ladder",
        "ascii": "CLIENT (Active Open)                                SERVER (Passive Open)\n  |                                                    | (LISTEN)\n  |---- SYN, Seq=x ----------------------------------->| (SYN_RCVD)\n  |<--- SYN-ACK, Seq=y, Ack=x+1 -----------------------|\n  |---- ACK, Seq=x+1, Ack=y+1 ------------------------>| (ESTABLISHED)\n  |                                                    |\n  |================ CONNECTION ESTABLISHED ============|\n  |                                                    |\n  |---- FIN, Seq=u ----------------------------------->| (CLOSE_WAIT)\n  |<--- ACK, Ack=u+1 ----------------------------------|\n  |                                                    | (Server finishes data)\n  |<--- FIN, Seq=v ------------------------------------| (LAST_ACK)\n  |---- ACK, Ack=v+1 --------------------------------->| (CLOSED)\n  | [TIME_WAIT State: Wait 2MSL = 120s]                |\n  v (CLOSED)                                           v"
      }
    ],
    "sections": [
      {
        "heading": "1. Three-Way Handshake (Connection Establishment)",
        "points": [
          "<b>Step 1 (SYN):</b> Client selects random Initial Sequence Number (ISN) x and transmits <code>SYN = 1, Seq = x</code>.",
          "<b>Step 2 (SYN-ACK):</b> Server allocates buffers and responds with <code>SYN = 1, ACK = 1, Seq = y, Ack = x + 1</code>.",
          "<b>Step 3 (ACK):</b> Client acknowledges server’s sequence number: <code>ACK = 1, Seq = x + 1, Ack = y + 1</code>. May carry user payload."
        ]
      },
      {
        "heading": "2. Four-Way Handshake & Why 2MSL TIME-WAIT is Mandatory",
        "points": [
          "<b>Four-Way Teardown:</b> Because TCP is full-duplex, each direction closes independently (FIN from client, ACK from server; then FIN from server, ACK from client).",
          "<b>Why 2MSL TIME-WAIT (2 × Maximum Segment Lifetime ≈ 120s):</b><br>• <i>Reason 1: Reliable Final ACK Delivery:</i> If client’s final ACK is lost, server retransmits FIN. The client must stay alive in TIME-WAIT to re-send the ACK, preventing server from hanging in LAST_ACK.<br>• <i>Reason 2: Clearing Phantom Duplicate Segments:</i> Ensures all delayed duplicate segments from the old connection dissipate in the network before the same socket pair (IP:Port) can be reused."
        ]
      }
    ],
    "conclusion": "TCP connection management guarantees synchronized sequence numbers before data transfer and prevents duplicate cross-connection data corruption via the 2MSL TIME-WAIT state.",
    "markingScheme": [
      {
        "component": "Three-Way Handshake Sequence Number Flow",
        "marks": "2.0"
      },
      {
        "component": "Neat Handshake & Teardown Timing Diagrams",
        "marks": "2.0"
      },
      {
        "component": "Four-Way Teardown Half-Close Explanation",
        "marks": "1.5"
      },
      {
        "component": "Justification of 2MSL TIME-WAIT State (2 reasons)",
        "marks": "1.5"
      }
    ],
    "examTip": "Draw separate labelled sequence diagrams for SYN → SYN-ACK → ACK setup and FIN/ACK teardown; state that TIME-WAIT lasts 2MSL so delayed duplicates expire and the final ACK can be retransmitted."
  },
  "cn-q15": {
    "verified": "BEU 2023 · Q.7 / 2025 · 7 Marks",
    "intro": "The Internet Transport Layer provides two primary end-to-end communication protocols offering fundamentally different service guarantees: Transmission Control Protocol (TCP, RFC 793) providing reliable, connection-oriented, ordered byte-stream delivery; and User Datagram Protocol (UDP, RFC 768) providing lightweight, connectionless, best-effort datagram transport with minimum transmission delay.",
    "diagrams": [
      {
        "title": "Header Structure Comparison: TCP (20–60 Bytes) vs UDP (Fixed 8 Bytes)",
        "ascii": "[ TCP SEGMENT HEADER: 20 TO 60 BYTES ]\n 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                        Sequence Number                        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Acknowledgment Number                      |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|  Data | Res |U|A|P|R|S|F|     |                               |\n| Offset| erv |R|C|S|S|Y|I|     |         Window Size           |\n|       |     |G|K|H|T|N|N|     |                               |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|           Checksum            |        Urgent Pointer         |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Options (0 to 40 Bytes)                    |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n\n[ UDP DATAGRAM HEADER: FIXED 8 BYTES ]\n 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|            Length             |           Checksum            |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
      }
    ],
    "table": {
      "title": "Comprehensive Comparison: TCP vs UDP",
      "headers": [
        "Feature Parameter",
        "Transmission Control Protocol (TCP)",
        "User Datagram Protocol (UDP)"
      ],
      "rows": [
        [
          "Connection Model",
          "Connection-oriented (requires 3-way handshake)",
          "Connectionless (no handshake, sends directly)"
        ],
        [
          "Delivery Reliability",
          "Guaranteed (uses ACKs, retransmissions, timeouts)",
          "Unreliable / Best-effort (packets can be lost/duplicated)"
        ],
        [
          "Byte Ordering",
          "Strictly ordered byte stream (in-sequence delivery)",
          "No sequencing; datagrams can arrive out of order"
        ],
        [
          "Header Overhead",
          "20 bytes base (up to 60 bytes with options)",
          "Fixed 8 bytes only (minimal protocol tax)"
        ],
        [
          "Flow Control",
          "Yes (Sliding Window based on receiver window rwnd)",
          "No flow control mechanism"
        ],
        [
          "Congestion Control",
          "Yes (Slow Start, Congestion Avoidance, Fast Recovery)",
          "No built-in congestion control"
        ],
        [
          "Transmission Mode",
          "Unicast only (point-to-point connection)",
          "Supports Unicast, Multicast, and Broadcast"
        ],
        [
          "Data Framing Boundary",
          "Stream-oriented (continuous byte stream, no boundaries)",
          "Message-oriented (preserves application packet boundaries)"
        ],
        [
          "Speed & Latency",
          "Higher latency due to handshakes and ACKs",
          "Ultra-fast, lowest latency (ideal for real-time traffic)"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Engineering Trade-offs & Application Mapping",
        "points": [
          "<b>When to use TCP:</b> When absolute data integrity is required and losing a single byte would corrupt the transaction (e.g., HTTP/HTTPS web browsing, FTP file transfer, SSH remote terminals, SMTP/IMAP email, database transactions).",
          "<b>When to use UDP:</b> When speed, timely delivery, and low overhead outweigh packet loss tolerance (e.g., DNS name queries, VoIP audio calls, live video streaming, DHCP address configuration, SNMP network telemetry, online gaming)."
        ]
      }
    ],
    "conclusion": "TCP prioritizes absolute reliability, flow control, and data ordering at the expense of higher latency, whereas UDP prioritizes minimal delay and low protocol overhead for real-time and query-based network applications.",
    "markingScheme": [
      {
        "component": "Architectural Overview & Connection Philosophy",
        "marks": "1.0"
      },
      {
        "component": "Neat Labelled Header Format Diagrams (TCP & UDP)",
        "marks": "2.0"
      },
      {
        "component": "Comparison Table (≥7 parameters)",
        "marks": "2.0"
      },
      {
        "component": "Flow Control & Congestion Control Comparison",
        "marks": "1.0"
      },
      {
        "component": "Application Protocol Mapping & Use Cases",
        "marks": "1.0"
      }
    ],
    "examTip": "Examiners award top marks for drawing the 8-byte UDP header precisely (Port, Port, Length, Checksum) and explaining why real-time voice (VoIP) prefers UDP over TCP (retransmitting old audio packets is useless in live talk)."
  },
  "cn-q56": {
    "verified": "BEU 2022 · Q.4 · 14 Marks",
    "intro": "In multi-tasking networked operating systems, multiple network applications (e.g., Web browser, email client, SSH shell, database service) run concurrently on the same host sharing a single physical network interface. The operating system must demultiplex incoming transport segments to the exact application process. To achieve this, networking architectures utilize two distinct abstractions: Ports (16-bit transport-layer numerical identifiers) and Sockets (operating-system-managed communication endpoints bound to an IP address and port).",
    "diagrams": [
      {
        "title": "Host Transport Multiplexing: Single IP Address Serving Multiple Application Ports",
        "ascii": "                             HOST MACHINE (IP: 192.0.2.10)\n +-----------------------------------------------------------------------------------+\n | APPLICATION LAYER PROCESSES                                                       |\n |   +-------------------+   +-------------------+   +---------------------------+   |\n |   | HTTP Web Server   |   | HTTPS Secure Web  |   | SSH Remote Administration |   |\n |   | Process (PID 1420)|   | Process (PID 1421)|   | Process (PID 890)         |   |\n |   +-------------------+   +-------------------+   +---------------------------+   |\n |             |                       |                           |                 |\n |             v                       v                           v                 |\n |    TCP Port 80             TCP Port 443                TCP Port 22                |\n +-------------+-----------------------+---------------------------+-----------------+\n | TRANSPORT LAYER (TCP / UDP Demultiplexing via 16-Bit Port Numbers)                |\n +-------------------------------------+---------------------------------------------+\n                                       |\n                                       v\n +-----------------------------------------------------------------------------------+\n | NETWORK LAYER (Single Logical Host IP Address: 192.0.2.10)                        |\n +-----------------------------------------------------------------------------------+"
      },
      {
        "title": "TCP Socket Client-Server Lifecycle & Four-Tuple Connection State",
        "ascii": "CLIENT HOST (IP: 192.0.2.20)                               SERVER HOST (IP: 198.51.100.10)\n  +----------------------+                                    +----------------------+\n  | socket()             |                                    | socket()             |\n  | (Create descriptor)  |                                    | (Create master socket|\n  +----------------------+                                    +----------------------+\n             |                                                           |\n             |                                                           v\n             |                                                +----------------------+\n             |                                                | bind(198.51.100.10:443|\n             |                                                +----------------------+\n             |                                                           |\n             |                                                           v\n             |                                                +----------------------+\n             |                                                | listen()             |\n             |                                                | (Queue incoming SYN) |\n             |                                                +----------------------+\n             |                                                           |\n             |                                                           v\n  +----------------------+   1. SYN (Seq=x, Port 51000->443)  +----------------------+\n  | connect()            |===================================>| accept()             |\n  | (Ephemeral Port 51000|   2. SYN+ACK (Seq=y, Ack=x+1)      | (Blocks until conn;  |\n  |  bound automatically)|<===================================|  spawns new socket)  |\n  |                      |   3. ACK (Ack=y+1)                 +----------------------+\n  |                      |===================================>           |\n  +----------------------+                                               v\n  Client Socket Address:                                      Server Socket Address:\n  192.0.2.20:51000                                            198.51.100.10:443\n             \\                                                         /\n              +-------------------------------------------------------+\n              | TCP CONNECTION FOUR-TUPLE:                            |\n              | (Src IP: 192.0.2.20, Src Port: 51000,                 |\n              |  Dest IP: 198.51.100.10, Dest Port: 443)             |\n              +-------------------------------------------------------+"
      }
    ],
    "table": {
      "title": "Comprehensive Engineering Comparison: Port vs Socket",
      "headers": [
        "Evaluation Parameter",
        "Port (Transport Layer Identifier)",
        "Socket (OS Communication Endpoint)"
      ],
      "rows": [
        [
          "Basic Definition",
          "A 16-bit integer identifying an application service",
          "An OS-managed communication endpoint data structure"
        ],
        [
          "Architectural Layer",
          "Layer 4 (Transport Layer field in TCP/UDP header)",
          "OS Application Programming Interface (API) layer"
        ],
        [
          "Representation",
          "Integer value ranging from 0 to 65535",
          "File descriptor / handle associated with (IP, Port, Protocol)"
        ],
        [
          "Information Stored",
          "Contains only the numerical port number",
          "Stores local IP, local port, remote IP, remote port, buffers"
        ],
        [
          "Operating System Entity",
          "Passive numerical address in protocol demultiplexing",
          "Active kernel resource with send/receive socket buffers"
        ],
        [
          "Data Transfer Role",
          "Cannot independently transmit or buffer data",
          "Provides read(), write(), send(), and recv() operations"
        ],
        [
          "Connection State",
          "Has no concept of connection state",
          "Maintains finite state machine (ESTABLISHED, TIME_WAIT)"
        ],
        [
          "Creation Mechanism",
          "Assigned by IANA or selected by operating system",
          "Instantiated via socket() system call in software"
        ],
        [
          "Notation Format",
          "Single integer, e.g., 443 or 80",
          "Socket Address: IP:Port, e.g., 198.51.100.10:443"
        ],
        [
          "Multiplexing Role",
          "Identifies target service on the host",
          "Identifies a unique connection instance via 4-tuple"
        ],
        [
          "Multiplicity",
          "One port can be associated with multiple open sockets",
          "Each active connection requires a distinct socket descriptor"
        ],
        [
          "Standard Analogy",
          "Apartment door number inside an apartment building",
          "The physical telephone instrument plugged into that door"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Port Numbers & IANA Range Classification",
        "points": [
          "<b>Definition:</b> A port is a 16-bit unsigned integer (<code>0 to 65535 = 2¹⁶ total</code>) embedded in transport layer headers (TCP/UDP) to deliver segments to the correct application process.",
          "<b>Well-Known Ports (0 to 1023):</b> Reserved by IANA for standardized system services. Examples: HTTP (80), HTTPS (443), DNS (53), SSH (22), SMTP (25), FTP Control (21), SNMP (161). Require administrator/root privileges to bind.",
          "<b>Registered Ports (1024 to 49151):</b> Registered for specific user applications and database services. Examples: MySQL (3306), PostgreSQL (5432), Oracle DB (1521), Microsoft RDP (3389).",
          "<b>Dynamic / Private / Ephemeral Ports (49152 to 65535):</b> Temporarily allocated by the client operating system kernel when initiating an outbound connection. Automatically released upon connection termination."
        ]
      },
      {
        "heading": "2. Socket Architecture & Four-Tuple Identification",
        "points": [
          "<b>Definition:</b> A socket is an abstract operating system resource created via the Berkeley Socket API (POSIX) that acts as the bidirectional software endpoint for network I/O.",
          "<b>Socket Address Structure:</b> In IPv4, a socket address is the combination: <code>Socket Address = (IP Address, Port Number)</code>, written as <code>192.0.2.10:8080</code>.",
          "<b>TCP Connection Four-Tuple:</b> An established TCP connection is uniquely identified by the 4-tuple: <code>(Source IP, Source Port, Destination IP, Destination Port)</code>.",
          "<b>Demultiplexing Proof:</b> Why can thousands of clients connect to a single web server on Port 443 simultaneously? Because each client connection has a unique 4-tuple! <br>• Connection 1: <code>(ClientA_IP, 50000, Server_IP, 443)</code><br>• Connection 2: <code>(ClientB_IP, 50001, Server_IP, 443)</code><br>The server operating system demultiplexes incoming packets to the exact socket matching the 4-tuple!"
        ]
      },
      {
        "heading": "3. Berkeley Sockets System Call Sequence",
        "points": [
          "<b>TCP Server Sequence:</b> <code>socket()</code> (creates endpoint) → <code>bind()</code> (binds IP:Port) → <code>listen()</code> (marks as passive listening) → <code>accept()</code> (blocks until client arrives; returns NEW connected socket descriptor) → <code>recv() / send()</code> → <code>close()</code>.",
          "<b>TCP Client Sequence:</b> <code>socket()</code> → <code>connect()</code> (initiates 3-way handshake; kernel automatically binds ephemeral port) → <code>send() / recv()</code> → <code>close()</code>.",
          "<b>UDP Sockets:</b> Because UDP is connectionless, it does not use <code>listen()</code> or <code>accept()</code>. Applications use <code>sendto()</code> and <code>recvfrom()</code> passing destination address structures with each datagram."
        ]
      },
      {
        "heading": "4. Numerical Example",
        "points": [
          "<b>Given Parameters:</b> Client IP = <code>203.0.113.25</code>, Client Ephemeral Port = <code>50000</code>. Server IP = <code>198.51.100.40</code>, Server Well-Known Port = <code>443</code> (HTTPS).",
          "<b>Client Socket Address:</b> <code>203.0.113.25:50000</code>.",
          "<b>Server Socket Address:</b> <code>198.51.100.40:443</code>.",
          "<b>Established TCP Connection Four-Tuple:</b> <code>(203.0.113.25, 50000, 198.51.100.40, 443)</code>."
        ]
      }
    ],
    "conclusion": "A port is a 16-bit transport layer numerical address used for process demultiplexing, whereas a socket is an active operating-system-managed endpoint data structure that combines an IP address, a port number, and connection state. A port number is merely an address component; the socket is the actual software engine that enables applications to transmit and receive data.",
    "markingScheme": [
      {
        "component": "Introduction & Clear Definitions of Port and Socket",
        "marks": "1.5"
      },
      {
        "component": "Port Classification (Well-Known, Registered, Ephemeral) & Standard Port Table",
        "marks": "1.5"
      },
      {
        "component": "Socket Architecture, Socket Address (IP:Port) & Four-Tuple Identification",
        "marks": "2.0"
      },
      {
        "component": "Exhaustive Port vs Socket Comparison Table (≥10 criteria)",
        "marks": "3.0"
      },
      {
        "component": "TCP Socket Lifecycle System Calls (socket, bind, listen, accept) & Diagram",
        "marks": "2.0"
      },
      {
        "component": "UDP Datagram Socket Working & Contrast with TCP Sockets",
        "marks": "1.0"
      },
      {
        "component": "Numerical Example (Four-Tuple Calculation) & Multi-Client Demultiplexing Proof",
        "marks": "2.0"
      },
      {
        "component": "Conclusion & Summary",
        "marks": "1.0"
      }
    ],
    "examTip": "Bhai, port aur socket ka difference likhte waqt sabse common mistake hai socket = IP + port bolkar ruk jaana. Technically IP + port ek socket address hai; actual socket operating system ka communication endpoint hota hai. Ye distinction likhne se answer precise banega."
  },
  "cn-q57": {
    "verified": "BEU 2022 · Q.9 · 14 Marks",
    "intro": "The Transport Layer (Layer 4) provides logical, end-to-end process-to-process communication between distributed application programs. In the Internet Protocol suite, transport services are delivered primarily by two contrasting protocols: Transmission Control Protocol (TCP), which offers a connection-oriented, highly reliable byte-stream service, and User Datagram Protocol (UDP), which provides a lightweight, connectionless best-effort datagram service with minimal protocol overhead.",
    "diagrams": [
      {
        "title": "TCP Three-Way Handshake Connection vs UDP Connectionless Datagram Flow",
        "ascii": "[ TCP: CONNECTION-ORIENTED (Three-Way Handshake + Reliable Byte Stream) ]\nTCP CLIENT (122.45.12.7:1000)                                TCP SERVER (200.11.24.59:161)\n       |                                                                   |\n       |===== 1. SYN (Seq=100) ===========================================>| [State: SYN_RCVD]\n       |<==== 2. SYN+ACK (Seq=300, Ack=101) ===============================|\n       |===== 3. ACK (Seq=101, Ack=301) ==================================>| [State: ESTABLISHED]\n       |                                                                   |\n       |===== 4. DATA SEGMENT (Seq=101, 500 Bytes) =======================>|\n       |<==== 5. ACKNOWLEDGEMENT (Ack=601) ================================|\nReliable, sequenced, flow-controlled, congestion-controlled byte stream.\n\n[ UDP: CONNECTIONLESS (Zero Handshake, Standalone Datagrams) ]\nUDP CLIENT (122.45.12.7:1000)                                UDP SERVER (200.11.24.59:161)\n       |                                                                   |\n       |===== DATAGRAM 1 (No connection setup; 8-Byte UDP Header) ========>|\n       |<==== DATAGRAM 2 (Independent reply; no ACK required) =============|\nUnreliable, unsequenced, no flow control, minimal latency overhead."
      },
      {
        "title": "Segment Header Architecture: TCP (20 to 60 Bytes) vs UDP (8 Bytes Fixed)",
        "ascii": "1. TCP SEGMENT HEADER (Variable Length: 20 to 60 Bytes):\n 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        | (16 bits each)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                        Sequence Number                        | (32 bits)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Acknowledgement Number                     | (32 bits)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|Data |Reserved |U|A|P|R|S|F|           Window Size             | (16 bits)\n|Offst|         |R|C|S|S|Y|I|                                   |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|           Checksum            |        Urgent Pointer         | (16 bits each)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Options (0 to 40 Bytes)                    |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n\n2. UDP SEGMENT HEADER (Fixed Length: Exactly 8 Bytes):\n 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        | (16 bits each)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|            Length             |           Checksum            | (16 bits each)\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
      }
    ],
    "table": {
      "title": "Comprehensive Technical Comparison: TCP vs UDP Transport Protocols",
      "headers": [
        "Technical Feature",
        "Transmission Control Protocol (TCP)",
        "User Datagram Protocol (UDP)"
      ],
      "rows": [
        [
          "Connection Requirement",
          "Connection-Oriented (Requires 3-way handshake)",
          "Connectionless (Sends datagrams immediately)"
        ],
        [
          "Delivery Reliability",
          "Guaranteed reliable delivery; lost segments retransmitted",
          "Best-effort; no retransmission or delivery guarantee"
        ],
        [
          "Data Ordering",
          "Strictly ordered byte stream (reorders via Sequence Nos)",
          "No ordering guarantee (datagrams may arrive out-of-order)"
        ],
        [
          "Flow Control Mechanism",
          "Sliding Window protocol matching receiver window size",
          "None; application must handle buffer overflow"
        ],
        [
          "Congestion Control",
          "Yes (Slow Start, Congestion Avoidance, Fast Recovery)",
          "None; transmits at full application line rate"
        ],
        [
          "Header Overhead",
          "20 to 60 bytes (variable; options supported)",
          "8 bytes fixed (minimal overhead)"
        ],
        [
          "Message Boundaries",
          "Continuous byte stream (does not preserve frame boundaries)",
          "Preserves distinct datagram message boundaries"
        ],
        [
          "Error Detection",
          "Mandatory 16-bit 1’s complement checksum",
          "Optional in IPv4; mandatory in IPv6"
        ],
        [
          "Handshake Overhead",
          "Round-trip delay for SYN/SYN-ACK before any data transfer",
          "Zero connection establishment latency"
        ],
        [
          "Communication Mode",
          "Strictly Unicast (point-to-point only)",
          "Unicast, Broadcast, and Multicast supported"
        ],
        [
          "State Overhead on Host",
          "High (stores sequence numbers, buffers, timers)",
          "Stateless; minimal memory consumption on host"
        ],
        [
          "Typical Applications",
          "HTTP/HTTPS, SSH, FTP, SMTP, MySQL, BGP",
          "DNS, SNMP (Port 161), DHCP, VoIP, Online Gaming, NTP"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Part B — Step-by-Step Socket Address Numerical Solution",
        "points": [
          "<b>Given Parameters:</b><br>• Client Host IP Address: <code>122.45.12.7</code><br>• Server Host IP Address: <code>200.11.24.59</code><br>• Server Well-Known Port: <code>161</code><br>• Client Ephemeral Port: <code>1000</code>",
          "<b>Definition of a Socket Address:</b> In computer networking, a socket address identifies a specific transport endpoint on a network host: <br><code>Socket Address = (IP Address, Port Number)</code>, commonly formatted as <code>IP:Port</code>.",
          "<b>1. Client Socket Address:</b><br>Client IP = <code>122.45.12.7</code>, Client Port = <code>1000</code>.<br><code>Client Socket Address = (122.45.12.7, 1000)</code> or <code>122.45.12.7:1000</code>.",
          "<b>2. Server Socket Address:</b><br>Server IP = <code>200.11.24.59</code>, Server Port = <code>161</code>.<br><code>Server Socket Address = (200.11.24.59, 161)</code> or <code>200.11.24.59:161</code>.",
          "<b>3. Required Pair of Socket Addresses:</b><br><code>(122.45.12.7:1000, 200.11.24.59:161)</code>.",
          "<b>4. Connection Four-Tuple:</b><br>For the client-to-server request message: <br><code>(Source IP: 122.45.12.7, Source Port: 1000, Destination IP: 200.11.24.59, Destination Port: 161)</code>."
        ]
      },
      {
        "heading": "2. Directional Message Header Fields (Request vs Reply)",
        "points": [
          "<b>Client-to-Server Request Message:</b><br>• Source IP: <code>122.45.12.7</code><br>• Destination IP: <code>200.11.24.59</code><br>• Source Port: <code>1000</code><br>• Destination Port: <code>161</code>",
          "<b>Server-to-Client Reply Message:</b><br>• Source IP: <code>200.11.24.59</code><br>• Destination IP: <code>122.45.12.7</code><br>• Source Port: <code>161</code><br>• Destination Port: <code>1000</code><br><i>Notice that the source and destination addresses are completely swapped in the response!</i>"
        ]
      },
      {
        "heading": "3. Protocol Context & Application Insight (Senior Solver Note)",
        "points": [
          "<b>Identified Protocol:</b> Well-known port <code>161</code> is the official IANA port assigned to <b>SNMP (Simple Network Management Protocol)</b>.",
          "<b>Transport Protocol:</b> SNMP operates over <b>UDP (User Datagram Protocol)</b> on Port 161 for SNMP queries and agent monitoring.",
          "<b>Ephemeral Port Clarification:</b> Modern IANA ephemeral ports range from 49152 to 65535. Although port <code>1000</code> falls below this modern range, historical implementations and university exam questions explicitly specify custom client ports. We faithfully use the exact value <code>1000</code> as specified in the university paper."
        ]
      }
    ],
    "conclusion": "TCP provides connection-oriented, reliable, sequenced byte-stream delivery with flow and congestion control at the cost of 20-byte header overhead and connection latency. UDP provides lightweight, connectionless datagram delivery with an 8-byte header and zero handshake delay. For the given BEU numerical, the client socket address is 122.45.12.7:1000 and the server socket address is 200.11.24.59:161, forming the communication pair (122.45.12.7:1000, 200.11.24.59:161).",
    "markingScheme": [
      {
        "component": "Transport Layer Role & TCP vs UDP Fundamental Concepts",
        "marks": "1.0"
      },
      {
        "component": "TCP Characteristics, 3-Way Handshake & Segment Header Diagram",
        "marks": "2.0"
      },
      {
        "component": "UDP Characteristics, Datagram Model & 8-Byte Header Diagram",
        "marks": "1.5"
      },
      {
        "component": "Comprehensive TCP vs UDP Comparison Table (≥10 criteria)",
        "marks": "2.5"
      },
      {
        "component": "Socket Address Mathematical Definition & Concept",
        "marks": "1.0"
      },
      {
        "component": "Correct Client Socket Address (122.45.12.7:1000)",
        "marks": "1.0"
      },
      {
        "component": "Correct Server Socket Address (200.11.24.59:161)",
        "marks": "1.0"
      },
      {
        "component": "Client-Server Communication Architecture Diagram",
        "marks": "1.0"
      },
      {
        "component": "Four-Tuple Representation & Request/Reply Header Reversal",
        "marks": "1.5"
      },
      {
        "component": "Protocol Identification (SNMP over UDP Port 161) & Conclusion",
        "marks": "1.5"
      }
    ],
    "examTip": "Bhai, numerical ka direct answer hai 122.45.12.7:1000 and 200.11.24.59:161. Client ke port 1000 ko server ke port 161 se interchange mat karna. Request mein client source hota hai aur server destination; reply mein reverse."
  },
  "cn-q16": {
    "verified": "BEU 2024 · Q.9(a) / 2025 · 7 Marks",
    "intro": "The Domain Name System (DNS) is an essential, distributed hierarchical database system that provides transparent bidirectional mapping between human-readable alphanumeric hostnames (e.g., <code>www.beu-bihar.ac.in</code>) and machine-routable numerical IP addresses (32-bit IPv4 or 128-bit IPv6). Without DNS, users would be required to memorize arbitrary 32-bit binary or dotted-decimal IP addresses for every network resource.",
    "diagrams": [
      {
        "title": "DNS Hierarchical Inverted-Tree Namespace Architecture",
        "ascii": "                          . (Root Domain Server)\n                                    |\n          +-------------------------+-------------------------+\n          |                         |                         |\n    Generic TLDs              Country-Code TLDs         Infrastructure\n   (.com, .edu, .org)           (.in, .uk, .us)             (.arpa)\n          |                         |\n   +------+------+           +------+------+\n   |             |           |             |\n google.com   mit.edu      gov.in        ac.in (Second-Level Domain)\n                             |             |\n                         bihar.gov.in  beu-bihar.ac.in (Subdomain)\n                                           |\n                                      www.beu-bihar.ac.in (FQDN / Leaf Host)"
      },
      {
        "title": "Iterative Resolution vs Recursive Resolution Timing Flow",
        "ascii": "[ ITERATIVE RESOLUTION (Standard) ]           [ RECURSIVE RESOLUTION (Heavy Load) ]\nClient -> Local DNS -> External Servers        Client -> Local DNS -> Root -> TLD -> Auth\n                                                                                          \nClient      Local DNS     Root    TLD    Auth    Client      Local DNS     Root    TLD    Auth\n  |             |          |       |       |       |             |          |       |       | \n  |--1.Query--->|          |       |       |       |--1.Query--->|          |       |       | \n  |             |--2.Q---->|       |       |       |             |--2.Q---->|       |       | \n  |             |<-3.Ref---|       |       |       |             |          |--3.Q->|       | \n  |             |                  |       |       |             |          |       |--4.Q->| \n  |             |--4.Q------------>|       |       |             |          |       |<-5.Ans| \n  |             |<-5.Ref-----------|       |       |             |          |<-6.Ans|       | \n  |             |                          |       |             |<-7.Ans---|       |       | \n  |             |--6.Q-------------------->|       |<-8.Answer---|          |       |       | \n  |             |<-7.Answer----------------|       |             |          |       |       | \n  |<-8.Answer---|          |       |       |       (Root & TLD servers perform lookups)   \n  (Local DNS does all the iterative walking)"
      }
    ],
    "sections": [
      {
        "heading": "1. DNS Server Hierarchy & Components",
        "points": [
          "<b>Root DNS Servers:</b> Form the apex of the tree (13 logical root server addresses, A.ROOT-SERVERS.NET to M.ROOT-SERVERS.NET, distributed globally via IP Anycast across 1,500+ physical servers). They do not store host IP mappings; they return referrals to the responsible Top-Level Domain (TLD) servers.",
          "<b>Top-Level Domain (TLD) Servers:</b> Manage top-level domains such as generic TLDs (<code>.com</code>, <code>.org</code>, <code>.net</code>, <code>.edu</code>) and country-code TLDs (<code>.in</code>, <code>.uk</code>, <code>.jp</code>). Managed by registries like VeriSign and NIXI.",
          "<b>Authoritative DNS Servers:</b> The definitive name servers configured by an organization (e.g., college, university, or ISP) that maintain the actual DNS Resource Records for that zone.",
          "<b>Local DNS / Resolver Server:</b> Usually hosted by the local ISP or college campus. Caches previous query results; when a local client queries a domain, the resolver inspects its local cache first before traversing the global hierarchy."
        ]
      },
      {
        "heading": "2. Recursive vs Iterative Query Resolution Comparison",
        "points": [
          "<b>Recursive Query:</b> The querying system requests that the receiving server take full responsibility for returning either the final IP mapping or an authoritative error message. The client makes a recursive request to its Local DNS server.",
          "<b>Iterative Query:</b> The queried server returns the best referral it currently knows (the IP address of the next DNS server closer to the authoritative answer), forcing the querier to issue repeated queries down the tree chain.",
          "<b>Standard Internet Practice:</b> Clients send a <i>Recursive</i> query to their Local DNS resolver. The Local DNS resolver then sends <i>Iterative</i> queries to Root, TLD, and Authoritative servers. This protects Root servers from caching and memory exhaustion."
        ]
      },
      {
        "heading": "3. DNS Protocol Operation & Transport Ports",
        "points": [
          "<b>Port 53 UDP:</b> Used for standard hostname-to-IP lookup queries and responses where payload size is ≤ 512 bytes (or up to 4096 bytes using EDNS0 extensions). UDP provides minimal latency and zero connection-establishment overhead.",
          "<b>Port 53 TCP:</b> Used when response payload exceeds 512 bytes, and for DNS Zone Transfers (AXFR/IXFR) between Master and Slave DNS servers requiring guaranteed transmission integrity.",
          "<b>DNS Resource Record (RR) Structure:</b> Standard tuple <code>(Name, Value, Type, TTL)</code> where Types include:<br>• <code>A</code>: Maps hostname to 32-bit IPv4 address.<br>• <code>AAAA</code>: Maps hostname to 128-bit IPv6 address.<br>• <code>CNAME</code>: Canonical name (alias to true domain name).<br>• <code>MX</code>: Mail Exchange server priority and hostname for SMTP.<br>• <code>NS</code>: Authoritative Name Server for the zone.<br>• <code>PTR</code>: Reverse DNS lookup (IP to domain name)."
        ]
      }
    ],
    "conclusion": "The DNS architecture succeeds on a planetary scale because of its hierarchical delegation, client-side and resolver caching, and clean separation between lightweight UDP queries and reliable TCP zone transfers.",
    "markingScheme": [
      {
        "component": "DNS Definition & Motivation (Hostname to IP Mapping)",
        "marks": "1.0"
      },
      {
        "component": "Hierarchical Namespace Inverted Tree Diagram",
        "marks": "1.5"
      },
      {
        "component": "DNS Server Classes (Root, TLD, Authoritative, Resolver)",
        "marks": "1.5"
      },
      {
        "component": "Recursive vs Iterative Resolution Timing Ladder Diagrams",
        "marks": "1.5"
      },
      {
        "component": "Resource Record Types (A, AAAA, CNAME, MX, PTR) & Ports (53)",
        "marks": "1.5"
      }
    ],
    "examTip": "Examiners always look for two specific details: (1) Why DNS uses UDP for lookups and TCP for zone transfers, and (2) Clear distinction showing that Root servers are never queried recursively by public clients."
  },
  "cn-q17": {
    "verified": "BEU 2023 · Q.9 / 2025 · 7 Marks",
    "intro": "File Transfer Protocol (FTP), defined in RFC 959, is a robust client-server application layer protocol used for transferring files bidirectionally between heterogeneous computer systems over TCP/IP networks. Its distinguishing architectural characteristic is the separation of control commands from data payload via two parallel TCP connections.",
    "diagrams": [
      {
        "title": "FTP Dual Parallel Connection Architecture (Out-of-Band Signaling)",
        "ascii": "   FTP CLIENT SYSTEM                                     FTP SERVER SYSTEM\n+-----------------------+                             +-----------------------+\n|  User Interface (UI)  |                             |                       |\n+-----------------------+                             |                       |\n| Control Process (PI)  |<==== TCP Port 21 (Control)==>| Server Control (PI)   |\n| (Sends USER, PASS,    |      Continuous Dialogue    | (Replies 220, 230,    |\n|  LIST, RETR, STOR)    |      Persistent Connection  |  331, 226, 550)       |\n+-----------------------+                             +-----------------------+\n| Data Process (DTP)    |<==== TCP Port 20 (Data) ====>| Server Data (DTP)     |\n| (Transfers actual     |      Spawned Per File/List  | (Transfers File Stream|\n|  file bytes & lists)  |      Non-Persistent Lifetime|  and closes TCP FIN)  |\n+-----------------------+                             +-----------------------+"
      },
      {
        "title": "Active FTP Mode vs Passive FTP Mode Connection Setup",
        "ascii": "[ ACTIVE FTP MODE (Server Initiates Data Conn) ]\nClient (Port N, N+1)                                     Server (Port 21, 20)\n   |                                                              |\n   |---- 1. TCP Handshake to Port 21 (Control Estab.) ----------->|\n   |---- 2. Command: PORT ClientIP, N+1 ------------------------->|\n   |                                                              |\n   |<--- 3. TCP SYN from Server Port 20 TO Client Port N+1 -------| (BLOCKED BY\n   |---> 4. TCP SYN-ACK from Client Port N+1 -------------------->|  CLIENT FIREWALL!)\n   |<=== 5. Data Stream Transfer ===> Closed with FIN             |\n                                                                  \n[ PASSIVE FTP MODE (Client Initiates Both Connections) ]\nClient (Port N, N+1)                                     Server (Port 21, P)\n   |                                                              |\n   |---- 1. TCP Handshake to Port 21 (Control Estab.) ----------->|\n   |---- 2. Command: PASV (Enter Passive Mode) ------------------>|\n   |<--- 3. Reply: 227 Entering Passive Mode (IP, Port P) --------|\n   |                                                              |\n   |---- 4. TCP SYN from Client Port N+1 TO Server Port P ------->| (ALLOWED!\n   |<--- 5. TCP SYN-ACK from Server Port P -----------------------|  Client-initiated)\n   |<=== 6. Data Stream Transfer ===> Closed with FIN             |"
      }
    ],
    "table": {
      "title": "Architectural Comparison: Control Connection vs Data Connection",
      "headers": [
        "Feature / Attribute",
        "Control Connection (Port 21)",
        "Data Connection (Port 20 / P)"
      ],
      "rows": [
        [
          "TCP Port Number",
          "Port 21 on FTP Server",
          "Port 20 (Active Mode) or Port P (Passive Mode)"
        ],
        [
          "Connection Lifetime",
          "Persistent throughout entire user session",
          "Non-persistent; created & torn down per file/list"
        ],
        [
          "Data Format",
          "7-bit NVT ASCII lines ending with CRLF",
          "Raw binary 8-bit stream, ASCII text, or EBCDIC"
        ],
        [
          "Transmission Role",
          "Command transfer (USER, PASS, RETR, STOR, QUIT)",
          "Actual payload delivery of files and directory listings"
        ],
        [
          "Signaling Paradigm",
          "Out-of-band control signaling",
          "Pure in-band data payload streaming"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Why FTP Uses Two Separate Parallel Connections",
        "points": [
          "<b>Out-of-Band Control Signaling:</b> Traditional protocols like HTTP carry headers and payload over the same TCP stream (in-band). If a file transfer is slow, sending an abort command in-band would get stuck behind buffered data bytes. In FTP, the control channel remains open and responsive to <code>ABOR</code> (abort) and status commands even during massive multi-gigabyte data transfers.",
          "<b>Modular Process Separation:</b> Separates the interpreter process (PI) handling authentication and state from the data transfer process (DTP) handling byte I/O.",
          "<b>Automatic End-of-File Detection:</b> A data connection is closed with a standard TCP FIN handshake when file transmission finishes, providing unambiguous EOF indication without requiring complex payload framing."
        ]
      },
      {
        "heading": "2. Active FTP vs Passive FTP Mode in Modern Networks",
        "points": [
          "<b>Active Mode (Client PORT Command):</b> The client opens an ephemeral port N for control and tells the server via <code>PORT h1,h2,h3,h4,p1,p2</code> to connect to client port <code>p1*256 + p2</code>. The server initiates a TCP SYN from Port 20 back to the client. This fails on modern internet setups because client-side NAT/Firewalls block unsolicited inbound connection requests.",
          "<b>Passive Mode (Client PASV Command):</b> Solves the firewall problem. The client sends <code>PASV</code>. The server opens a temporary high port P (> 1024) and replies with <code>227 Entering Passive Mode</code>. The client initiates the outbound TCP connection to server port P. Since both control and data streams originate outbound from the client, client firewalls allow the traffic seamlessly."
        ]
      }
    ],
    "conclusion": "FTP pioneered out-of-band network architecture. While modern web traffic predominantly uses HTTPS and SFTP (SSH File Transfer Protocol), FTP with Passive Mode remains a benchmark example of dual-connection application layer protocol design.",
    "markingScheme": [
      {
        "component": "FTP Working Principle & Definition",
        "marks": "1.0"
      },
      {
        "component": "Dual Connection Architecture Diagram (Port 20 vs Port 21)",
        "marks": "1.5"
      },
      {
        "component": "Detailed Justification for Out-of-Band Control Connection",
        "marks": "1.5"
      },
      {
        "component": "Active vs Passive FTP Timing Ladders & Firewall Impact",
        "marks": "2.0"
      },
      {
        "component": "Control vs Data Comparison Table & Conclusion",
        "marks": "1.0"
      }
    ],
    "examTip": "To secure full 7 marks, clearly write the formula for computing port from FTP response: Port = p1 × 256 + p2. State clearly that Active FTP fails on NAT routers because the server initiates the inbound connection."
  },
  "cn-q40": {
    "verified": "BEU 2024 · Q.9(b) · 7 Marks",
    "intro": "Electronic Mail (Email) is a distributed, asynchronous store-and-forward application layer service that allows users to exchange digital messages worldwide. The email pipeline divides responsibilities between Message Submission/Transfer protocols (SMTP) and Message Retrieval/Access protocols (POP3, IMAP4).",
    "diagrams": [
      {
        "title": "End-to-End Email System Architecture & Agent Flow",
        "ascii": "   SENDER ENVIRONMENT                       INTERNET                        RECEIVER ENVIRONMENT\n+-----------------------+          +-------------------------+          +--------------------------+\n| User Agent (UA)       |          | Sender Mail Server      |          | Receiver Mail Server     |\n| (Outlook, Webmail)    |          | (MTA Client)            |          | (MTA Server)             |\n+-----------------------+          +-------------------------+          +--------------------------+\n           |                                    |                                    |\n     [SMTP PUSH]                          [SMTP PUSH]                         [Store in Mailbox]\n     Port 25/587                          Port 25                              /var/mail/recipient\n           v                                    v                                    v\n+-----------------------+          +-------------------------+          +--------------------------+\n| Sender Mail Server    |=========>| Transmission across     |=========>| Mail Delivery Agent(MDA) |\n| (MTA Server / Spool)  |          | Internet Routers & DNS  |          | (Deposits into Mailbox)  |\n+-----------------------+          +-------------------------+          +--------------------------+\n                                                                                     |\n                                                                               [POP3/IMAP PULL]\n                                                                               Port 110/143/993/995\n                                                                                     v\n                                                                        +--------------------------+\n                                                                        | Receiver User Agent (UA) |\n                                                                        | (User reads messages)    |\n                                                                        +--------------------------+"
      }
    ],
    "table": {
      "title": "Comprehensive Comparison: SMTP vs POP3 vs IMAP",
      "headers": [
        "Comparison Criterion",
        "SMTP (RFC 5321)",
        "POP3 (RFC 1939)",
        "IMAP4 (RFC 3501)"
      ],
      "rows": [
        [
          "Operational Nature",
          "Push Protocol (sender pushes message)",
          "Pull Protocol (receiver pulls message)",
          "Pull & Sync Protocol (bidirectional sync)"
        ],
        [
          "Default TCP Ports",
          "Port 25 (relay), 587 (submission), 465 (SSL)",
          "Port 110 (cleartext), 995 (SSL/TLS)",
          "Port 143 (cleartext), 993 (SSL/TLS)"
        ],
        [
          "Placement in Pipeline",
          "Between UA & Sender MTA, and between MTAs",
          "Between Receiver Mail Server and Receiver UA",
          "Between Receiver Mail Server and Receiver UA"
        ],
        [
          "Server Storage Behavior",
          "Transfers message forward to next hop",
          "Downloads and typically deletes from server",
          "Keeps messages on server; synchronizes folders"
        ],
        [
          "Multi-Device Support",
          "N/A (Transfer only)",
          "Poor; messages downloaded to one device disappear",
          "Excellent; phone, laptop, webmail stay in sync"
        ],
        [
          "Search & Header Inspection",
          "N/A",
          "Must download entire email before reading",
          "Allows downloading headers only or server search"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Core Components of Modern Email Architecture",
        "points": [
          "<b>User Agent (UA):</b> The client software program that provides the user interface for drafting, sending, reading, and filing messages (e.g., Thunderbird, MS Outlook, Apple Mail, Gmail web interface).",
          "<b>Mail Transfer Agent (MTA):</b> The background server process that routes messages across network hops using SMTP (e.g., Postfix, Sendmail, Exim). It queries DNS for <code>MX</code> (Mail Exchange) records to locate destination servers.",
          "<b>Mail Delivery Agent (MDA):</b> Software on the recipient mail server (e.g., Dovecot LDA, Procmail) that accepts the message from the MTA and writes it into the recipient’s dedicated mailbox storage spool (<code>/var/mail/username</code>).",
          "<b>Mail Access Agent (MAA):</b> The protocol daemon that allows recipient User Agents to authenticate and pull messages stored inside the mail server spool down to the local client machine."
        ]
      },
      {
        "heading": "2. In-Depth Study of Mail Access Agents (MAA)",
        "points": [
          "<b>Why an MAA is Necessary:</b> SMTP is strictly a <i>push protocol</i> designed for servers that remain permanently connected to the Internet with static IP addresses. End-user client machines (laptops, smartphones) frequently disconnect or change dynamic IP addresses. Therefore, the recipient mail server must hold incoming emails, and an MAA is needed to pull them when the client connects.",
          "<b>POP3 (Post Office Protocol v3) States:</b> Operates in three sequential states:<br>1. <i>Authorization:</i> Client sends <code>USER username</code> and <code>PASS password</code> to authenticate.<br>2. <i>Transaction:</i> Client issues commands like <code>STAT</code> (mailbox summary), <code>LIST</code> (message sizes), <code>RETR &lt;msg#&gt;</code> (fetch message), and <code>DELE &lt;msg#&gt;</code> (mark for deletion).<br>3. <i>Update:</i> Client sends <code>QUIT</code>; the server permanently purges marked messages and releases the mailbox lock.",
          "<b>IMAP4 (Internet Message Access Protocol):</b> Advanced alternative to POP3. Keeps all email hierarchies, sent folders, drafts, and read/unread flags centrally on the server. Clients can download only message headers or individual MIME attachments, saving bandwidth on mobile connections."
        ]
      }
    ],
    "conclusion": "SMTP delivers messages reliably from sender to the recipient mailbox server, while Mail Access Agents (POP3 and IMAP) enable mobile and intermittently connected clients to securely retrieve and manage their stored messages.",
    "markingScheme": [
      {
        "component": "Email Architecture Definition & 4-Agent Pipeline Diagram",
        "marks": "1.5"
      },
      {
        "component": "SMTP Working & Push Nature Analysis",
        "marks": "1.5"
      },
      {
        "component": "Detailed Comparison Table (SMTP vs POP3 vs IMAP)",
        "marks": "1.5"
      },
      {
        "component": "Mail Access Agents (MAA) Role & POP3 Protocol States",
        "marks": "1.5"
      },
      {
        "component": "Port Numbers & Exam Summary",
        "marks": "1.0"
      }
    ],
    "examTip": "Always emphasize why SMTP cannot be used to retrieve email from a server to a client PC: SMTP cannot pull messages from a remote queue; it only pushes forward to a listening daemon."
  },
  "cn-q42": {
    "verified": "BEU 2023 · Q.9(b) · 7 Marks",
    "intro": "A Network Firewall is a specialized hardware appliance, software module, or cloud security service deployed at the perimeter between networks of differing trust levels (such as a private corporate LAN and the public Internet). It inspects, filters, and controls incoming and outgoing network traffic based on predefined security access rules.",
    "diagrams": [
      {
        "title": "Perimeter Firewall & Demilitarized Zone (DMZ) Enterprise Topology",
        "ascii": "                    UNTRUSTED PUBLIC NETWORK (INTERNET)\n                                     |\n                                     v\n                        +-------------------------+\n                        |    EXTERNAL FIREWALL    |\n                        +-------------------------+\n                                     |\n             +-----------------------+-----------------------+\n             |                                               |\n             v                                               v\n+-------------------------+                     +-------------------------+\n|  DEMILITARIZED ZONE     |                     |    INTERNAL FIREWALL    |\n|  (DMZ Subnet)           |                     +-------------------------+\n|  • Public Web Server    |                                  |\n|  • Public Mail Gateway  |                                  v\n|  • External DNS Server  |                     +-------------------------+\n+-------------------------+                     |  PROTECTED PRIVATE LAN  |\n(Semi-trusted public services                   |  • Database Servers     |\n isolated from internal core)                   |  • ERP / Accounting     |\n                                                |  • Employee Workstations|\n                                                +-------------------------+"
      }
    ],
    "table": {
      "title": "Comparison of the Four Generations of Firewall Architecture",
      "headers": [
        "Firewall Classification",
        "OSI Layer Inspected",
        "Inspection Mechanism",
        "Security Strengths & Weaknesses"
      ],
      "rows": [
        [
          "Packet-Filtering (Stateless)",
          "Network / Transport (L3-L4)",
          "Inspects IP header, protocol, and port numbers against static ACLs",
          "Fastest speed; cannot detect spoofed packets or multi-packet application payload attacks"
        ],
        [
          "Stateful Inspection",
          "Network / Transport (L3-L4)",
          "Tracks dynamic TCP state machine (SYN, ACK, FIN) in an active connection state table",
          "High security for connection flows; blocks unsolicited incoming packets; moderate memory overhead"
        ],
        [
          "Application Gateway (Proxy)",
          "Application Layer (L7)",
          "Terminates connection; reconstructs full protocol payload (HTTP, FTP, DNS) before relaying",
          "Highest protocol-level inspection; completely isolates internal client IPs; highest processing latency"
        ],
        [
          "Next-Generation (NGFW)",
          "Layers 2 through 7",
          "Combines stateful filtering with DPI (Deep Packet Inspection), IPS, and TLS decryption",
          "Identifies applications regardless of port; blocks advanced malware; requires substantial hardware compute"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Enterprise Firewall Rule Base Example",
        "points": [
          "Firewalls evaluate rules sequentially from top to bottom (first matching rule wins, followed by an implicit default Deny All):",
          "<b>Rule 1 (DNS Resolution):</b> Source: Internal LAN | Dest: 8.8.8.8 | Protocol: UDP | Port: 53 | Action: <code>ALLOW</code> (Permits internal clients to resolve domain names).",
          "<b>Rule 2 (Outbound Web Browsing):</b> Source: Internal LAN | Dest: Any | Protocol: TCP | Port: 80, 443 | Action: <code>ALLOW</code> (Permits secure HTTP/HTTPS browsing).",
          "<b>Rule 3 (Public Web Traffic):</b> Source: Any Internet | Dest: DMZ Web Server (192.168.1.10) | Protocol: TCP | Port: 443 | Action: <code>ALLOW</code> (Allows world access to website).",
          "<b>Rule 4 (Block Management Access):</b> Source: Any Internet | Dest: Internal LAN | Protocol: TCP | Port: 22, 3389 | Action: <code>DENY & LOG</code> (Blocks remote SSH/RDP brute force).",
          "<b>Rule 5 (Default Implicit Deny):</b> Source: Any | Dest: Any | Protocol: Any | Port: Any | Action: <code>DENY</code> (Blocks all unmatched traffic)."
        ]
      },
      {
        "heading": "2. Role of the Demilitarized Zone (DMZ)",
        "points": [
          "A DMZ is a physical or logical subnet that isolates publicly accessible perimeter services (Web, Mail, DNS) from the internal corporate network.",
          "<b>Defense-in-Depth Advantage:</b> If an external hacker compromises the public web server in the DMZ via an unpatched web vulnerability, the attacker is still prevented from penetrating the internal private LAN because the secondary internal firewall strictly forbids DMZ-to-LAN connections."
        ]
      },
      {
        "heading": "3. Firewall vs Antivirus Comparison",
        "points": [
          "<b>Firewall:</b> Operates at the network perimeter; inspects incoming and outgoing packet headers and streams; blocks unauthorized connections and ports.",
          "<b>Antivirus / EDR:</b> Operates at the host endpoint operating system; inspects stored files, system memory, and executing processes; detects and quarantines malicious executables, viruses, and ransomware.",
          "<b>Complementary Defense:</b> Firewalls cannot inspect encrypted viruses delivered through legitimate HTTPS downloads; host antivirus is required to catch what passes through open firewall ports."
        ]
      }
    ],
    "conclusion": "Firewalls provide the foundational first line of defense for network security. Modern secure network architectures deploy hybrid NGFWs with DMZ isolation and stateful inspection to safeguard critical enterprise data.",
    "markingScheme": [
      {
        "component": "Firewall Definition & Primary Security Functions",
        "marks": "1.0"
      },
      {
        "component": "Labelled Enterprise DMZ Perimeter Architecture Diagram",
        "marks": "1.5"
      },
      {
        "component": "Detailed Analysis of 4 Firewall Types (Stateless, Stateful, Proxy, NGFW)",
        "marks": "2.0"
      },
      {
        "component": "Realistic Packet-Filtering Rule Table (≥4 rules)",
        "marks": "1.5"
      },
      {
        "component": "Firewall vs Antivirus & Inherent Limitations",
        "marks": "1.0"
      }
    ],
    "examTip": "Always include a sample Rule Base table with Rule Number, Source, Destination, Protocol, Port, and Action (Allow/Deny), ending with the mandatory Default Implicit Deny rule."
  },
  "cn-q3": {
    "verified": "BEU 2023 · Q.2(a) · 7 Marks",
    "intro": "Switching is the mechanism of forwarding data across network links. Circuit Switching and Packet Switching represent the two fundamental models of telecommunications architecture.",
    "diagrams": [
      {
        "title": "Timing Diagrams: Circuit Switching vs Packet Switching",
        "ascii": "[ CIRCUIT SWITCHING ]               [ PACKET SWITCHING ]\nSender             Receiver        Sender             Receiver\n  |                  |               |                  |\n  |-- Setup Request->|               |-- Packet 1 ------>|\n  |                  |               |-- Packet 2 ------>| (Pipelined)\n  |<- Setup Confirmed|               |-- Packet 3 ------>|\n  |==================| (Dedicated)   |                  |\n  |===== DATA =======| (Continuous)  |                  |\n  |==================|               |                  |\n  |-- Teardown ----->|               |                  |\n  v                  v               v                  v\n(High setup delay, zero transfer delay) (No setup delay, store-and-forward delay)"
      }
    ],
    "table": {
      "title": "Comparative Analysis: Circuit Switching vs Packet Switching",
      "headers": [
        "Parameter",
        "Circuit Switching",
        "Packet Switching"
      ],
      "rows": [
        [
          "Dedicated Path",
          "Yes, dedicated physical circuit",
          "No, shared physical transmission path"
        ],
        [
          "Bandwidth Utilization",
          "Low; wasted during silence/idle periods",
          "High; dynamic statistical multiplexing"
        ],
        [
          "Call Setup Phase",
          "Mandatory before any data transfer",
          "None (for datagram packet switching)"
        ],
        [
          "Store-and-Forward Delay",
          "Zero queuing delay during transmission",
          "Present at every intermediate router"
        ],
        [
          "Congestion Vulnerability",
          "Occurs at call setup (call blocked)",
          "Occurs at routers (queuing delay & packet drops)"
        ],
        [
          "Charging Scheme",
          "Billed by connection time / distance",
          "Billed by volume of data (MB/GB transferred)"
        ],
        [
          "Traffic Suitability",
          "Continuous constant bit-rate (Voice PSTN)",
          "Bursty, asynchronous computer data (Web, Email)"
        ],
        [
          "Protocol Overhead",
          "Minimal header overhead after connection",
          "Header overhead on every single packet"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Technical Highlights",
        "points": [
          "<b>Circuit Switching</b> locks physical circuits, guaranteeing zero jitter and constant bandwidth at the expense of wasted capacity during idle times.",
          "<b>Packet Switching</b> leverages statistical multiplexing: packets from multiple conversations dynamically interleave over shared links, maximizing bandwidth efficiency."
        ]
      }
    ],
    "conclusion": "Circuit switching provides guaranteed QoS for continuous voice calls, whereas packet switching dominates modern telecommunications due to superior bandwidth efficiency and scalability.",
    "markingScheme": [
      {
        "component": "Circuit Switching Architecture & Operation",
        "marks": "1.5"
      },
      {
        "component": "Packet Switching Architecture & Store-and-Forward",
        "marks": "1.5"
      },
      {
        "component": "Comparative Timing Ladder Diagrams",
        "marks": "1.5"
      },
      {
        "component": "Detailed Comparison Table (≥6 criteria)",
        "marks": "2.0"
      },
      {
        "component": "Conclusion",
        "marks": "0.5"
      }
    ],
    "examTip": "Highlight the difference between connection setup time and transmission delay. Emphasize that packet switching uses statistical multiplexing."
  },
  "cn-q5": {
    "verified": "BEU 2024 · Q.3(b) · 7 Marks",
    "intro": "Cyclic Redundancy Check (CRC) is an algebraic error-detecting code based on polynomial modulo-2 arithmetic (where addition and subtraction are identical to bitwise XOR, without carries or borrows).",
    "sections": [
      {
        "heading": "1. Given Parameters & Generator Conversion",
        "points": [
          "<b>Message:</b> <code>M = 1101011011</code> (k = 10 bits)",
          "<b>Generator Polynomial:</b> <code>G(X) = X⁴ + X + 1 = 1·X⁴ + 0·X³ + 0·X² + 1·X¹ + 1·X⁰</code>",
          "<b>Binary Divisor:</b> <code>G = 10011</code> (degree r = 4, length = 5 bits)",
          "<b>Appended Zeros:</b> Append r = 4 zeros to message: <code>Dividend = 11010110110000</code> (14 bits)"
        ]
      },
      {
        "heading": "2. Step-by-Step Modulo-2 Binary Long Division",
        "points": [
          "<b>Step 1:</b> First 5 bits: <code>11010 ⊕ 10011 = 01001</code>. Bring down next bit 1 → <code>10011</code>.",
          "<b>Step 2:</b> <code>10011 ⊕ 10011 = 00000</code>. Bring down next bit 1, 0, 1 → <code>10110</code>.",
          "<b>Step 3:</b> <code>10110 ⊕ 10011 = 00101</code>. Bring down next bit 1, 1 → <code>10100</code>.",
          "<b>Step 4:</b> <code>10100 ⊕ 10011 = 00111</code>. Bring down remaining 0 → <code>1110</code>.",
          "<b>Remainder (CRC):</b> <code>R = 1110</code> (4 bits)."
        ]
      }
    ],
    "diagrams": [
      {
        "title": "Full Modulo-2 XOR Long Division Layout",
        "ascii": "Divisor: 10011 ) 11010110110000 ( Quotient: 1100010011\n                 10011\n                 -----\n                  10011\n                  10011\n                  -----\n                   0000010110\n                        10011\n                        -----\n                         010100\n                          10011\n                          -----\n                           01110  <--- CRC Remainder R = 1110"
      },
      {
        "title": "Sender to Receiver Verification Flow",
        "ascii": "[ SENDER ]                                        [ RECEIVER ]\nMessage: 1101011011                               Codeword: 11010110111110\nAppend r=4 zeros: 11010110110000                  Divide by G = 10011\nDivide by 10011 -> Remainder R = 1110             Modulo-2 division gives:\nCodeword T = M || R = 11010110111110 -----------> Remainder = 0000 (NO ERROR!)"
      }
    ],
    "sections_extra": [
      {
        "heading": "3. Codeword Formation & Receiver Verification",
        "points": [
          "<b>Transmitted Codeword (T):</b> <code>T = Message || Remainder = 1101011011 || 1110 = 11010110111110</code> (14 bits).",
          "<b>Receiver Verification:</b> Receiver divides <code>11010110111110 ÷ 10011</code>. Since the remainder is strictly <code>0000</code>, the transmission is accepted as error-free."
        ]
      }
    ],
    "conclusion": "The CRC checksum is 1110, resulting in the transmitted frame 11010110111110. The zero remainder at the receiver mathematically verifies correctness.",
    "markingScheme": [
      {
        "component": "Polynomial to Binary Conversion (G = 10011, r = 4)",
        "marks": "1.0"
      },
      {
        "component": "Appending 4 Zeros to Message (11010110110000)",
        "marks": "0.5"
      },
      {
        "component": "Step-by-Step Modulo-2 Division Execution",
        "marks": "3.0"
      },
      {
        "component": "Correct CRC Remainder (1110) & Codeword Construction",
        "marks": "1.5"
      },
      {
        "component": "Receiver Verification (Remainder = 0000)",
        "marks": "1.0"
      }
    ],
    "examTip": "Highlight the final CRC remainder 1110 and box the transmitted frame 11010110111110 clearly in your answer sheet."
  },
  "cn-q6": {
    "verified": "BEU 2024 · Q.3(a) · 7 Marks",
    "intro": "Go-Back-N (GBN) ARQ is a sliding window protocol that enables pipelined transmission of multiple data frames before requiring an acknowledgment (ACK), significantly improving channel utilization over Stop-and-Wait.",
    "diagrams": [
      {
        "title": "Go-Back-N Sliding Window Mechanism & Retransmission Ladder",
        "ascii": "[ SENDER WINDOW: Size Ws = 2^m - 1 = 3 (m = 2 bits) ]\n[ 0  1  2 ] 3  0  1  2 ...   (Frames 0, 1, 2 sent)\n\nSENDER                                           RECEIVER\n  |                                                 |\n  |--- Frame 0 ------------------------------------>| Accepted, ACK 1 sent\n  |--- Frame 1 (LOST IN TRANSIT X)                  | (Discarded)\n  |--- Frame 2 ------------------------------------>| Out-of-order! Discarded\n  |--- Frame 3 ------------------------------------>| Out-of-order! Discarded\n  |                                                 |\n  |<-- ACK 1 ---------------------------------------| (Slide window by 1)\n  | [TIMER FOR FRAME 1 EXPIRES!]                    |\n  |                                                 |\n  |=== GO BACK TO N: Retransmit ALL from 1 ===      |\n  |--- Frame 1 ------------------------------------>| Accepted, ACK 2 sent\n  |--- Frame 2 ------------------------------------>| Accepted, ACK 3 sent\n  |--- Frame 3 ------------------------------------>| Accepted, ACK 0 sent\n  v                                                 v"
      }
    ],
    "sections": [
      {
        "heading": "1. Window Sizes and Mathematical Constraint",
        "points": [
          "<b>Sender Window Size (Ws):</b> For an m-bit sequence number, <code>Ws ≤ 2ᵐ - 1</code>.",
          "<b>Receiver Window Size (Wr):</b> Strictly <code>Wr = 1</code> (accepts only the next expected in-order frame).",
          "<b>Why Ws Cannot Be 2ᵐ:</b> If <code>Ws = 2ᵐ</code>, a lost cumulative ACK makes it impossible for the receiver to distinguish between retransmitted duplicate frames and a brand-new window of frames (Sequence Number Ambiguity)."
        ]
      },
      {
        "heading": "2. Operational Dynamics & Channel Efficiency",
        "points": [
          "<b>Cumulative ACK:</b> <code>ACK n</code> acknowledges all frames up to <code>n - 1</code>. If an intermediate frame is lost, receiver discards all subsequent frames.",
          "<b>Single Retransmission Timer:</b> Sender maintains a timer for the oldest unacknowledged frame. On timeout, sender \"goes back\" and retransmits all unacknowledged frames in the current window.",
          "<b>Channel Efficiency (η):</b> <code>η = Ws / (1 + 2a)</code>, where <code>a = Tp / Tt</code> (propagation time / transmission time)."
        ]
      }
    ],
    "conclusion": "Go-Back-N drastically improves channel utilization over noisy high-bandwidth links compared to Stop-and-Wait, but wastes link bandwidth during high error rates due to bulk retransmissions.",
    "markingScheme": [
      {
        "component": "Go-Back-N Principle & Window Constraints (Ws = 2ᵐ - 1, Wr = 1)",
        "marks": "2.0"
      },
      {
        "component": "Sequence Number Ambiguity Proof",
        "marks": "1.5"
      },
      {
        "component": "Neat Timing Ladder Diagram with Frame Loss & Recovery",
        "marks": "2.0"
      },
      {
        "component": "Channel Efficiency Equation & Performance Analysis",
        "marks": "1.5"
      }
    ],
    "examTip": "Examiners always look for the proof of why Ws = 2ᵐ - 1 (not 2ᵐ). Show the scenario where ACK is lost and the receiver cannot distinguish new frame 0 from old frame 0."
  },
  "cn-q7": {
    "verified": "BEU 2023 · Q.4(a) · 7 Marks",
    "intro": "ALOHA is the foundational random-access Medium Access Control (MAC) protocol pioneered by Norman Abramson in 1970 at the University of Hawaii. In ALOHA, multiple distributed stations share a common broadcast channel. Collisions occur whenever two or more frame transmissions overlap in time. The two fundamental variants are Pure ALOHA (unconstrained transmission timing) and Slotted ALOHA (synchronized discrete time slots).",
    "diagrams": [
      {
        "title": "Vulnerable Period Comparison: Pure ALOHA (2T) vs Slotted ALOHA (T)",
        "ascii": "[ PURE ALOHA: Vulnerable Period = 2T ]\nTime: ----------(t - T)-------------------(t)-------------------(t + T)---------->\nFrame A:          [================ Target Frame ===============]\nFrame B:   [====== Overlap ======]\nFrame C:                                             [====== Overlap ======]\nAny frame starting in interval (t - T, t + T) collides! Vulnerable Window = 2 * T.\n\n[ SLOTTED ALOHA: Vulnerable Period = T ]\nTime:      |     Slot k - 1    |        Slot k         |       Slot k + 1     |\n           |                   |                       |                      |\nStation 1: |                   |  [===== Frame 1 =====]|                      |\nStation 2: |                   |  [===== Frame 2 =====]|                      |\n                                           ^\n                                           | COLLISION!\nFrames transmit ONLY at slot boundaries. Vulnerable Window = T (halved!)."
      },
      {
        "title": "Throughput S vs Offered Traffic Load G Characteristic Curves",
        "ascii": "Throughput S (Successful Frames / Frame Time)\n0.40 +                                     Slotted ALOHA (Max S = 1/e ≈ 36.8% @ G=1)\n     |                                          .-''''-.\n0.35 +                                        .'        '.\n0.30 +                                       /            \\\n0.25 +                                      /              \\\n0.20 +              Pure ALOHA             /                \\\n     |          (Max S = 1/(2e)           /                  \\\n0.15 +           ≈ 18.4% @ G=0.5)        /                    \\\n     |                .---.             /                      \\\n0.10 +              .'     '.          /                        \\\n0.05 +             /         \\        /                          \\\n0.00 +---+----+---/-----------\\------+----+----+----+----+----+----+----> Offered Load G\n     0  0.2  0.4 0.5         1.0         1.5         2.0         2.5"
      }
    ],
    "table": {
      "title": "Comprehensive Performance Comparison: Pure ALOHA vs Slotted ALOHA",
      "headers": [
        "Performance Metric",
        "Pure ALOHA Protocol",
        "Slotted ALOHA Protocol"
      ],
      "rows": [
        [
          "Transmission Timing",
          "Continuous; stations transmit anytime at will",
          "Discrete; transmission only at beginning of synchronized slots"
        ],
        [
          "Slot Synchronization",
          "None required; completely uncoordinated",
          "Global time synchronization required (GPS / central clock)"
        ],
        [
          "Vulnerable Window",
          "2 × T (from t - T to t + T)",
          "1 × T (only within the designated slot)"
        ],
        [
          "Probability of Success",
          "P(0) = e^(-2G)",
          "P(0) = e^(-G)"
        ],
        [
          "Throughput Formula",
          "S_Pure = G × e^(-2G)",
          "S_Slotted = G × e^(-G)"
        ],
        [
          "Maximum Throughput",
          "S_max = 1 / (2e) ≈ 0.184 (18.4%)",
          "S_max = 1 / e ≈ 0.368 (36.8%)"
        ],
        [
          "Optimal Offered Load",
          "G = 0.5 attempts / frame time",
          "G = 1.0 attempt / slot"
        ],
        [
          "Expected Attempts E[N]",
          "E[N] = e^(2G)",
          "E[N] = e^G"
        ],
        [
          "Initial Delay at Low Load",
          "Zero slot-alignment waiting delay",
          "Average synchronization delay of T/2 before slot starts"
        ],
        [
          "Delay Equation (Retry B)",
          "D_Pure = T·e^(2G) + (e^(2G) - 1)·B_Pure",
          "D_Slotted = T/2 + T·e^G + (e^G - 1)·B_Slotted"
        ],
        [
          "Channel Utilization",
          "Poor (wasted by frequent partial collisions)",
          "Twice as efficient; collisions restricted to complete slots"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Mathematical Derivations of Throughput",
        "points": [
          "<b>Traffic Model:</b> Transmission attempts follow a Poisson distribution: <code>P(k) = (λ^k · e^(-λ)) / k!</code>, where G is the offered traffic per frame transmission time T.",
          "<b>Pure ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>2T</code> (a competing frame starting between t - T and t + T causes a collision).<br>• Average attempts in vulnerable period: <code>λ = 2G</code>.<br>• Probability of zero competing attempts: <code>P_success = P(0) = e^(-2G)</code>.<br>• Throughput: <code>S_Pure = G · P_success = G · e^(-2G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-2G) · (1 - 2G) = 0 ⇒ G = 0.5</code>.<br>• <code>S_max = 0.5 · e^(-1) = 1 / (2e) ≈ 0.184 (18.4%)</code>.",
          "<b>Slotted ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>T</code> (collisions occur only if two or more frames attempt transmission in the exact same time slot).<br>• Average attempts in slot: <code>λ = G</code>.<br>• Probability of successful transmission: <code>P_success = e^(-G)</code>.<br>• Throughput: <code>S_Slotted = G · e^(-G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-G) · (1 - G) = 0 ⇒ G = 1.0</code>.<br>• <code>S_max = 1.0 · e^(-1) = 1 / e ≈ 0.368 (36.8%)</code>.<br>• <b>Throughput Ratio:</b> <code>S_max(Slotted) / S_max(Pure) = (1/e) / (1/(2e)) = 2.0</code>. Slotted ALOHA doubles the maximum capacity!"
        ]
      },
      {
        "heading": "2. Average Delay Formulations",
        "points": [
          "<b>Definition:</b> Average delay is the mean time elapsed from the instant a frame is generated until it is successfully delivered and acknowledged.",
          "<b>Transmission Attempts Model:</b> Since each transmission attempt succeeds independently with probability p, the number of attempts N follows a Geometric distribution: <code>E[N] = 1 / p</code>.",
          "<b>Pure ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-2G) ⇒ E[N] = e^(2G)</code>.<br>• Expected transmission-attempt time: <code>D_trans = T · e^(2G)</code>.<br>• With mean retransmission backoff B: <code>D_Pure = T · e^(2G) + (e^(2G) - 1) · B_Pure</code>.",
          "<b>Slotted ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-G) ⇒ E[N] = e^G</code>.<br>• Initial synchronization wait: If frame arrivals are uniformly distributed within a slot, the average waiting time until the next slot boundary is <code>T / 2</code>.<br>• Total delay with backoff B: <code>D_Slotted = T/2 + T · e^G + (e^G - 1) · B_Slotted</code>."
        ]
      },
      {
        "heading": "3. Numerical Comparison Example (G = 0.2, T = 1 ms)",
        "points": [
          "<b>Given Parameters:</b> Offered load <code>G = 0.2</code>, Frame transmission time <code>T = 1.0 ms</code>.",
          "<b>Pure ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.4) = 0.2 · 0.67032 ≈ 0.1341 (13.41%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.4) ≈ 1.4918 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.4918 = 1.4918 ms</code>.",
          "<b>Slotted ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.2) = 0.2 · 0.81873 ≈ 0.1637 (16.37%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.2) ≈ 1.2214 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.2214 = 1.2214 ms</code>.<br>• Including initial slot wait: <code>0.5 ms + 1.2214 ms = 1.7214 ms</code>.<br>• <b>Key Insight:</b> At light load (G=0.2), Slotted ALOHA achieves higher throughput and fewer collisions, but its total initial latency is slightly higher due to waiting for the slot boundary."
        ]
      }
    ],
    "conclusion": "Pure ALOHA permits unrestricted transmissions resulting in a 2T vulnerable window and maximum throughput of 18.4% at G=0.5. Slotted ALOHA enforces discrete slot boundaries, reducing the vulnerable period to T and doubling maximum throughput to 36.8% at G=1.0. While Slotted ALOHA dramatically reduces collisions, its end-to-end delay includes an initial T/2 slot-synchronization wait.",
    "markingScheme": [
      {
        "component": "ALOHA Protocol Introduction & Poisson Traffic Assumptions",
        "marks": "0.5"
      },
      {
        "component": "Pure ALOHA Vulnerable Window (2T) & Diagram",
        "marks": "0.5"
      },
      {
        "component": "Pure ALOHA Throughput Derivation (S = G·e^(-2G))",
        "marks": "1.0"
      },
      {
        "component": "Slotted ALOHA Vulnerable Window (T) & Diagram",
        "marks": "0.5"
      },
      {
        "component": "Slotted ALOHA Throughput Derivation (S = G·e^(-G))",
        "marks": "1.0"
      },
      {
        "component": "Maximum Throughput Calculations (18.4% vs 36.8%) & Derivation Steps",
        "marks": "1.0"
      },
      {
        "component": "Average Delay Expressions & Geometric Retrial Model",
        "marks": "1.0"
      },
      {
        "component": "Performance Comparison Table, Numerical Example & Conclusion",
        "marks": "1.5"
      }
    ],
    "examTip": "Bhai, Q.4(a) mein sabse important results hain Pure ALOHA: G·e^(-2G), 18.4% aur Slotted ALOHA: G·e^(-G), 36.8%. Delay ke question mein retransmission assumptions explicitly likhna, kyunki throughput ke unlike delay ka ek universal formula nahi hota."
  },
  "cn-q10": {
    "verified": "BEU 2024 · Q.5(b) · 7 Marks",
    "intro": "Variable Length Subnet Masking (VLSM) and Classless Inter-Domain Routing (CIDR) allow hierarchical allocation of IP addresses according to exact organizational needs, minimizing address wastage.",
    "diagrams": [
      {
        "title": "Hierarchical CIDR Address Space Partitioning",
        "ascii": "[ TOTAL ISP BLOCK: 190.100.0.0/16 (65,536 Addresses) ]\n+------------------------------------+------------------------------------+\n|   GROUP 1: 64 /24s (16,384 Addrs)  |   GROUP 2: 128 /25s (16,384 Addrs) |\n| 190.100.0.0 to 190.100.63.255      | 190.100.64.0 to 190.100.127.255    |\n+-----------------+------------------+------------------------------------+\n| GROUP 3: 128/26s| UNUSED / UNALLOCATED ISP CAPACITY                     |\n| (8,192 Addrs)   | 24,576 Available Addresses (190.100.160.0 to .255.255)|\n| .128.0 - .159.255+------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Group 1 Allocation (64 Customers × 256 Addresses)",
        "points": [
          "Each customer requires 256 addresses: <code>2⁸ = 256 ⇒ Host bits = 8</code>.",
          "Prefix length: <code>32 - 8 = /24</code> (Mask: <code>255.255.255.0</code>).",
          "Customer 1: <code>190.100.0.0/24</code> (Range: 190.100.0.0 – 190.100.0.255)",
          "Customer 64: <code>190.100.63.0/24</code> (Range: 190.100.63.0 – 190.100.63.255)",
          "Group 1 Total: <code>64 × 256 = 16,384 addresses</code> (Range: 190.100.0.0 – 190.100.63.255)."
        ]
      },
      {
        "heading": "2. Group 2 Allocation (128 Customers × 128 Addresses)",
        "points": [
          "Each customer requires 128 addresses: <code>2⁷ = 128 ⇒ Host bits = 7</code>.",
          "Prefix length: <code>32 - 7 = /25</code> (Mask: <code>255.255.255.128</code>).",
          "Next available address starts at: <code>190.100.64.0</code>.",
          "Customer 1: <code>190.100.64.0/25</code> (Range: 190.100.64.0 – 190.100.64.127)",
          "Customer 128: <code>190.100.127.128/25</code> (Range: 190.100.127.128 – 190.100.127.255)",
          "Group 2 Total: <code>128 × 128 = 16,384 addresses</code> (Range: 190.100.64.0 – 190.100.127.255)."
        ]
      },
      {
        "heading": "3. Group 3 Allocation (128 Customers × 64 Addresses)",
        "points": [
          "Each customer requires 64 addresses: <code>2⁶ = 64 ⇒ Host bits = 6</code>.",
          "Prefix length: <code>32 - 6 = /26</code> (Mask: <code>255.255.255.192</code>).",
          "Next available address starts at: <code>190.100.128.0</code>.",
          "Customer 1: <code>190.100.128.0/26</code> (Range: 190.100.128.0 – 190.100.128.63)",
          "Customer 128: <code>190.100.159.192/26</code> (Range: 190.100.159.192 – 190.100.159.255)",
          "Group 3 Total: <code>128 × 64 = 8,192 addresses</code> (Range: 190.100.128.0 – 190.100.159.255)."
        ]
      },
      {
        "heading": "4. Total Allocated & Unused Addresses Calculation",
        "points": [
          "Total Allocated: <code>16,384 (Gr 1) + 16,384 (Gr 2) + 8,192 (Gr 3) = 40,960 addresses</code>.",
          "Total ISP Capacity: <code>2¹⁶ = 65,536 addresses</code>.",
          "<b>Remaining Unallocated:</b> <code>65,536 - 40,960 = 24,576 addresses</code>.",
          "Unused Address Range: <code>190.100.160.0</code> to <code>190.100.255.255</code> (comprising a /19 block and a /18 block)."
        ]
      }
    ],
    "table": {
      "title": "Master VLSM Customer Allocation Table",
      "headers": [
        "Customer Group",
        "Customers",
        "Addrs/Cust",
        "CIDR Mask",
        "Start Address",
        "End Address",
        "Total Allocated"
      ],
      "rows": [
        [
          "Group 1",
          "64",
          "256",
          "/24 (255.255.255.0)",
          "190.100.0.0",
          "190.100.63.255",
          "16,384"
        ],
        [
          "Group 2",
          "128",
          "128",
          "/25 (255.255.255.128)",
          "190.100.64.0",
          "190.100.127.255",
          "16,384"
        ],
        [
          "Group 3",
          "128",
          "64",
          "/26 (255.255.255.192)",
          "190.100.128.0",
          "190.100.159.255",
          "8,192"
        ],
        [
          "Unused",
          "—",
          "—",
          "/19 and /18 blocks",
          "190.100.160.0",
          "190.100.255.255",
          "24,576"
        ]
      ]
    },
    "conclusion": "The ISP successfully allocates 40,960 contiguous addresses across 320 customers while retaining 24,576 unallocated addresses for future growth.",
    "markingScheme": [
      {
        "component": "Group 1 Subnet Design & Ranges (16,384 addrs)",
        "marks": "2.0"
      },
      {
        "component": "Group 2 Subnet Design & Ranges (16,384 addrs)",
        "marks": "2.0"
      },
      {
        "component": "Group 3 Subnet Design & Ranges (8,192 addrs)",
        "marks": "1.5"
      },
      {
        "component": "Accurate Unused Address Calculation (24,576 addrs)",
        "marks": "1.5"
      }
    ],
    "examTip": "Double check the 3rd octet boundary when moving to Group 2: Group 1 ends at 190.100.63.255, so Group 2 MUST start at 190.100.64.0."
  },
  "cn-q11": {
    "verified": "BEU 2024 · Q.6(b) · 7 Marks",
    "intro": "Distance Vector Routing operates on the principle that each router shares its knowledge of the entire network with its immediate neighbors at regular intervals using the Bellman-Ford equation.",
    "diagrams": [
      {
        "title": "5-Node Network Topology with Link Costs",
        "ascii": "      (1)            (3)\n (A)--------(B)----------------(C)\n  |          |                  |\n (4)        (2)                (1)\n  |          |                  |\n (D)--------(E)-----------------+\n      (2)            (4)"
      }
    ],
    "sections": [
      {
        "heading": "1. Topology Link Cost Matrix",
        "points": [
          "Links: A–B (1), A–D (4), B–C (3), B–E (2), D–E (2), C–E (1).",
          "Non-adjacent pairs start with cost = ∞."
        ]
      },
      {
        "heading": "2. Initial Routing Vectors (Step 0 - Direct Neighbors Only)",
        "points": [
          "<b>At Node A:</b> [A:0, B:1, C:∞, D:4, E:∞]",
          "<b>At Node B:</b> [A:1, B:0, C:3, D:∞, E:2]",
          "<b>At Node C:</b> [A:∞, B:3, C:0, D:∞, E:1]",
          "<b>At Node D:</b> [A:4, B:∞, C:∞, D:0, E:2]",
          "<b>At Node E:</b> [A:∞, B:2, C:1, D:2, E:0]"
        ]
      },
      {
        "heading": "3. Iteration 1 Exchange Updates (Applying Bellman-Ford)",
        "points": [
          "<b>Node A learns from B & D:</b><br>• Distance to C: <code>min{c(A,B) + D_B(C)} = 1 + 3 = 4</code> (via B).<br>• Distance to E: <code>min{c(A,B) + D_B(E)} = 1 + 2 = 3</code> (via B).<br>• Distance to D: <code>min{c(A,D), c(A,B) + D_B(D)} = min{4, 1 + ∞} = 4</code>.<br>Updated Vector A: <code>[A:0, B:1, C:4, D:4, E:3]</code>.",
          "<b>Node D learns from A & E:</b><br>• Distance to B: <code>c(D,E) + D_E(B) = 2 + 2 = 4</code> (via E).<br>• Distance to C: <code>c(D,E) + D_E(C) = 2 + 1 = 3</code> (via E).<br>Updated Vector D: <code>[A:4, B:4, C:3, D:0, E:2]</code>."
        ]
      },
      {
        "heading": "4. Final Converged Routing Tables (All Nodes Stable)",
        "points": [
          "<b>Node A:</b> Dest B (cost 1, next B), Dest C (cost 4, next B), Dest D (cost 4, next D), Dest E (cost 3, next B).",
          "<b>Node B:</b> Dest A (cost 1, next A), Dest C (cost 3, next C or E), Dest D (cost 4, next E), Dest E (cost 2, next E).",
          "<b>Node C:</b> Dest A (cost 4, next B), Dest B (cost 3, next B or E), Dest D (cost 3, next E), Dest E (cost 1, next E)."
        ]
      }
    ],
    "conclusion": "The network converges completely in 2 exchange iterations. Every node obtains the globally shortest path using strictly local neighbor exchanges.",
    "markingScheme": [
      {
        "component": "Network Topology Diagram & Initial Step 0 Vectors",
        "marks": "2.0"
      },
      {
        "component": "Bellman-Ford Formula Application in Iteration 1",
        "marks": "2.5"
      },
      {
        "component": "Final Converged Distance Vector Tables for All Nodes",
        "marks": "2.5"
      }
    ],
    "examTip": "Show at least one intermediate vector computation in detail: DA(C) = c(A,B) + DB(C) = 1 + 3 = 4. Examiners reward clear calculation steps!"
  },
  "cn-q14": {
    "verified": "BEU 2024 · Q.8(b) · 7 Marks",
    "intro": "Congestion in computer networks occurs when the aggregate packet arrival rate exceeds the forwarding or buffering capacity of intermediate routers, causing queue overflow, packet drops, and throughput collapse.",
    "diagrams": [
      {
        "title": "TCP Congestion Window (cwnd) Evolution Curve Across Phases",
        "ascii": "cwnd (MSS)\n  ^\n16|                              [ CONGESTION AVOIDANCE (AIMD) ]\n  |                              /|\n12|                             / |\n  |                            /  | <--- 3 Duplicate ACKs (Triple Dup ACK)\n 8|            +--------------+   |\n  |           / [ssthresh = 8]    | [Fast Recovery: cwnd = ssthresh + 3]\n 4|          /                    |\\\n  |         / [SLOW START]        | \\\n 2|        /                      |  \\\n 1|---+---+                       +---+------------------------> Time (RTTs)\n      0   1   2   3   4   5   6   7   8   9  10  11  12"
      }
    ],
    "sections": [
      {
        "heading": "1. Three Fundamental Transport-Layer Policies",
        "points": [
          "<b>1. Slow Start:</b> Begins at <code>cwnd = 1 MSS</code>. For every received ACK, cwnd increases by 1 MSS (effectively doubling cwnd every RTT: 1 → 2 → 4 → 8). Exponential growth continues until cwnd reaches the slow-start threshold (<code>ssthresh</code>).",
          "<b>2. Congestion Avoidance (Additive Increase):</b> Once <code>cwnd ≥ ssthresh</code>, growth shifts to linear increase: <code>cwnd = cwnd + 1 MSS</code> per RTT. Probes for available bandwidth cautiously without overwhelming buffers.",
          "<b>3. Fast Retransmit & Fast Recovery (Multiplicative Decrease):</b><br>• <i>Fast Retransmit:</i> When sender receives 3 duplicate ACKs for the same segment, it assumes the packet was dropped and immediately retransmits it without waiting for the retransmission timer to expire.<br>• <i>Fast Recovery:</i> Instead of resetting cwnd back to 1 (which TCP Tahoe did), TCP Reno sets <code>ssthresh = cwnd / 2</code> and <code>cwnd = ssthresh + 3 MSS</code>, continuing linear increase."
        ]
      }
    ],
    "conclusion": "By combining exponential probing (Slow Start), additive increase (Avoidance), and multiplicative decrease (Fast Recovery), TCP stabilizes global Internet traffic without central coordination.",
    "markingScheme": [
      {
        "component": "Network Congestion Definition & Symptoms",
        "marks": "1.0"
      },
      {
        "component": "Slow Start Mechanism & Exponential Growth Formula",
        "marks": "1.5"
      },
      {
        "component": "Congestion Avoidance (AIMD) Mechanism",
        "marks": "1.5"
      },
      {
        "component": "Fast Retransmit & Fast Recovery (3 Duplicate ACKs)",
        "marks": "1.5"
      },
      {
        "component": "Labelled cwnd vs Time Progression Graph",
        "marks": "1.5"
      }
    ],
    "examTip": "Label ssthresh clearly on the graph where the exponential curve transitions into a straight line (linear growth)."
  },
  "cn-q18": {
    "verified": "BEU 2024 · Q.9(b) · 7 Marks",
    "intro": "Electronic Mail (Email) is a distributed, asynchronous store-and-forward application layer service that allows users to exchange digital messages worldwide. The email pipeline divides responsibilities between Message Submission/Transfer protocols (SMTP) and Message Retrieval/Access protocols (POP3, IMAP4).",
    "diagrams": [
      {
        "title": "End-to-End Email System Architecture & Agent Flow",
        "ascii": "   SENDER ENVIRONMENT                       INTERNET                        RECEIVER ENVIRONMENT\n+-----------------------+          +-------------------------+          +--------------------------+\n| User Agent (UA)       |          | Sender Mail Server      |          | Receiver Mail Server     |\n| (Outlook, Webmail)    |          | (MTA Client)            |          | (MTA Server)             |\n+-----------------------+          +-------------------------+          +--------------------------+\n           |                                    |                                    |\n     [SMTP PUSH]                          [SMTP PUSH]                         [Store in Mailbox]\n     Port 25/587                          Port 25                              /var/mail/recipient\n           v                                    v                                    v\n+-----------------------+          +-------------------------+          +--------------------------+\n| Sender Mail Server    |=========>| Transmission across     |=========>| Mail Delivery Agent(MDA) |\n| (MTA Server / Spool)  |          | Internet Routers & DNS  |          | (Deposits into Mailbox)  |\n+-----------------------+          +-------------------------+          +--------------------------+\n                                                                                     |\n                                                                               [POP3/IMAP PULL]\n                                                                               Port 110/143/993/995\n                                                                                     v\n                                                                        +--------------------------+\n                                                                        | Receiver User Agent (UA) |\n                                                                        | (User reads messages)    |\n                                                                        +--------------------------+"
      }
    ],
    "table": {
      "title": "Comprehensive Comparison: SMTP vs POP3 vs IMAP",
      "headers": [
        "Comparison Criterion",
        "SMTP (RFC 5321)",
        "POP3 (RFC 1939)",
        "IMAP4 (RFC 3501)"
      ],
      "rows": [
        [
          "Operational Nature",
          "Push Protocol (sender pushes message)",
          "Pull Protocol (receiver pulls message)",
          "Pull & Sync Protocol (bidirectional sync)"
        ],
        [
          "Default TCP Ports",
          "Port 25 (relay), 587 (submission), 465 (SSL)",
          "Port 110 (cleartext), 995 (SSL/TLS)",
          "Port 143 (cleartext), 993 (SSL/TLS)"
        ],
        [
          "Placement in Pipeline",
          "Between UA & Sender MTA, and between MTAs",
          "Between Receiver Mail Server and Receiver UA",
          "Between Receiver Mail Server and Receiver UA"
        ],
        [
          "Server Storage Behavior",
          "Transfers message forward to next hop",
          "Downloads and typically deletes from server",
          "Keeps messages on server; synchronizes folders"
        ],
        [
          "Multi-Device Support",
          "N/A (Transfer only)",
          "Poor; messages downloaded to one device disappear",
          "Excellent; phone, laptop, webmail stay in sync"
        ],
        [
          "Search & Header Inspection",
          "N/A",
          "Must download entire email before reading",
          "Allows downloading headers only or server search"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Core Components of Modern Email Architecture",
        "points": [
          "<b>User Agent (UA):</b> The client software program that provides the user interface for drafting, sending, reading, and filing messages (e.g., Thunderbird, MS Outlook, Apple Mail, Gmail web interface).",
          "<b>Mail Transfer Agent (MTA):</b> The background server process that routes messages across network hops using SMTP (e.g., Postfix, Sendmail, Exim). It queries DNS for <code>MX</code> (Mail Exchange) records to locate destination servers.",
          "<b>Mail Delivery Agent (MDA):</b> Software on the recipient mail server (e.g., Dovecot LDA, Procmail) that accepts the message from the MTA and writes it into the recipient’s dedicated mailbox storage spool (<code>/var/mail/username</code>).",
          "<b>Mail Access Agent (MAA):</b> The protocol daemon that allows recipient User Agents to authenticate and pull messages stored inside the mail server spool down to the local client machine."
        ]
      },
      {
        "heading": "2. In-Depth Study of Mail Access Agents (MAA)",
        "points": [
          "<b>Why an MAA is Necessary:</b> SMTP is strictly a <i>push protocol</i> designed for servers that remain permanently connected to the Internet with static IP addresses. End-user client machines (laptops, smartphones) frequently disconnect or change dynamic IP addresses. Therefore, the recipient mail server must hold incoming emails, and an MAA is needed to pull them when the client connects.",
          "<b>POP3 (Post Office Protocol v3) States:</b> Operates in three sequential states:<br>1. <i>Authorization:</i> Client sends <code>USER username</code> and <code>PASS password</code> to authenticate.<br>2. <i>Transaction:</i> Client issues commands like <code>STAT</code> (mailbox summary), <code>LIST</code> (message sizes), <code>RETR &lt;msg#&gt;</code> (fetch message), and <code>DELE &lt;msg#&gt;</code> (mark for deletion).<br>3. <i>Update:</i> Client sends <code>QUIT</code>; the server permanently purges marked messages and releases the mailbox lock.",
          "<b>IMAP4 (Internet Message Access Protocol):</b> Advanced alternative to POP3. Keeps all email hierarchies, sent folders, drafts, and read/unread flags centrally on the server. Clients can download only message headers or individual MIME attachments, saving bandwidth on mobile connections."
        ]
      }
    ],
    "conclusion": "SMTP delivers messages reliably from sender to the recipient mailbox server, while Mail Access Agents (POP3 and IMAP) enable mobile and intermittently connected clients to securely retrieve and manage their stored messages.",
    "markingScheme": [
      {
        "component": "Email Architecture Definition & 4-Agent Pipeline Diagram",
        "marks": "1.5"
      },
      {
        "component": "SMTP Working & Push Nature Analysis",
        "marks": "1.5"
      },
      {
        "component": "Detailed Comparison Table (SMTP vs POP3 vs IMAP)",
        "marks": "1.5"
      },
      {
        "component": "Mail Access Agents (MAA) Role & POP3 Protocol States",
        "marks": "1.5"
      },
      {
        "component": "Port Numbers & Exam Summary",
        "marks": "1.0"
      }
    ],
    "examTip": "Always emphasize why SMTP cannot be used to retrieve email from a server to a client PC: SMTP cannot pull messages from a remote queue; it only pushes forward to a listening daemon."
  }
};

export const allCnPyqs = [
  {
    "id": "cn-q1",
    "unit": 1,
    "question": "Explain the OSI 7-layer reference model with a neat architecture diagram and state the core function and protocol of each layer.",
    "years": [
      2024,
      2025,
      2026
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.2 / 2025 · 7 Marks"
  },
  {
    "id": "cn-q2",
    "unit": 1,
    "question": "Compare the OSI reference model with the TCP/IP protocol suite. Discuss the advantages, layer mappings, and practical limitations of each model.",
    "years": [
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.2 / 2025 · 7 Marks"
  },
  {
    "id": "cn-q3",
    "unit": 2,
    "question": "Explain Circuit Switching, Packet Switching (Datagram vs Virtual Circuit) and Message Switching with neat connection diagrams.",
    "years": [
      2022,
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.2(a) · 7 Marks"
  },
  {
    "id": "cn-q4",
    "unit": 2,
    "question": "State Nyquist’s bit rate theorem and Shannon’s channel capacity theorem. For a channel with 4 kHz bandwidth and SNR of 30 dB, calculate the maximum theoretical data rate.",
    "years": [
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.4 / 2025 · 7 Marks"
  },
  {
    "id": "cn-q5",
    "unit": 3,
    "question": "Explain Cyclic Redundancy Check (CRC) error detection. For data word 1101011011 and generator polynomial G(x) = x^4 + x + 1, calculate the transmitted codeword.",
    "years": [
      2023,
      2024,
      2026
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.3(b) · 7 Marks"
  },
  {
    "id": "cn-q6",
    "unit": 3,
    "question": "Differentiate between Stop-and-Wait, Go-Back-N, and Selective Repeat sliding window protocols. Explain sender and receiver window sizes.",
    "years": [
      2022,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.3(a) · 7 Marks"
  },
  {
    "id": "cn-q7",
    "unit": 3,
    "question": "Explain Pure ALOHA and Slotted ALOHA multiple access protocols. Derive maximum channel throughput equations and compare delay at low load.",
    "years": [
      2023,
      2024,
      2026
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.4(a) · 7 Marks"
  },
  {
    "id": "cn-q8",
    "unit": 3,
    "question": "Explain the working principle of CSMA/CD used in Ethernet. Derive the condition for minimum frame size (L_min = 2 * R * Tp) and explain persistence modes.",
    "years": [
      2022,
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.3(a) · 7 Marks"
  },
  {
    "id": "cn-q9",
    "unit": 4,
    "question": "Explain IPv4 packet fragmentation. For a 4000-byte datagram forwarded across an MTU = 1500 byte link, compute Total Length, Flags, and Fragment Offset for all fragments.",
    "years": [
      2022,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2022 / 2024 · 7 Marks"
  },
  {
    "id": "cn-q10",
    "unit": 4,
    "question": "An ISP is granted a block of addresses 190.100.0.0/16. Distribute these addresses to 3 groups of customers (64 x 256, 128 x 128, 128 x 64) using VLSM CIDR subnetting.",
    "years": [
      2023,
      2024,
      2026
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.5(b) · 7 Marks"
  },
  {
    "id": "cn-q11",
    "unit": 4,
    "question": "Explain Distance Vector Routing and the Count-to-Infinity problem. Trace the distance vector table updates for a 5-node network until routing convergence.",
    "years": [
      2022,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.6(b) · 7 Marks"
  },
  {
    "id": "cn-q12",
    "unit": 4,
    "question": "Explain the working of Address Resolution Protocol (ARP) and Dynamic Host Configuration Protocol (DHCP) with neat frame exchange diagrams.",
    "years": [
      2022,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2022 · Q.7 / 2024 · 7 Marks"
  },
  {
    "id": "cn-q13",
    "unit": 5,
    "question": "Explain the TCP Three-Way Handshake mechanism for connection establishment and Four-Way Teardown. Explain the significance of the 2MSL TIME-WAIT state.",
    "years": [
      2023,
      2025,
      2026
    ],
    "marks": 7,
    "verified": "BEU 2022 · Q.7(a) / 2024 · 7 Marks"
  },
  {
    "id": "cn-q14",
    "unit": 5,
    "question": "What is congestion? Explain the three Transport-Layer congestion control policies: Slow Start, Congestion Avoidance, and Fast Retransmit / Fast Recovery with cwnd graphs.",
    "years": [
      2023,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.8(b) · 7 Marks"
  },
  {
    "id": "cn-q15",
    "unit": 5,
    "question": "Compare TCP and UDP protocols based on connection state, packet header overhead, flow control, error recovery, and application suitability. Draw their segment header formats.",
    "years": [
      2022,
      2023,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.7 / 2025 · 7 Marks"
  },
  {
    "id": "cn-q16",
    "unit": 6,
    "question": "Explain the Domain Name System (DNS) architecture and hierarchical namespace. Contrast Recursive Query resolution with Iterative Query resolution using timing ladder diagrams.",
    "years": [
      2022,
      2024,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.9(a) / 2025 · 7 Marks"
  },
  {
    "id": "cn-q17",
    "unit": 6,
    "question": "Explain the working of File Transfer Protocol (FTP). Why does FTP use two separate parallel connections (Control on Port 21 and Data on Port 20)? Differentiate between Active FTP and Passive FTP modes.",
    "years": [
      2022,
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.9 / 2025 · 7 Marks"
  },
  {
    "id": "cn-q18",
    "unit": 6,
    "question": "Differentiate between SMTP and POP protocols. Explain Mail Access Agents in detail along with the complete end-to-end electronic mail transmission architecture.",
    "years": [
      2022,
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.9(b) · 7 Marks"
  },
  {
    "id": "cn-q28",
    "unit": 1,
    "question": "Draw and explain the TCP/IP model used for the networks. Also explain the critiques of TCP/IP model.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.2(a) · 7 Marks"
  },
  {
    "id": "cn-q50",
    "unit": 1,
    "question": "Write down the distinguishing differences between OSI and TCP/IP model.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.3(a) · 7 Marks"
  },
  {
    "id": "cn-q29",
    "unit": 2,
    "question": "Explain Datagram Approach and Virtual Circuit Approach with suitable diagram.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.2(b) · 7 Marks"
  },
  {
    "id": "cn-q41",
    "unit": 2,
    "question": "Differentiate between circuit switching and packet switching.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.2(a) · 7 Marks"
  },
  {
    "id": "cn-q52",
    "unit": 2,
    "question": "How do guided media differ from unguided media? Name the advantages of optical fiber over twisted-pair and coaxial cable.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.6(a) · 7 Marks"
  },
  {
    "id": "cn-q30",
    "unit": 3,
    "question": "Explain Sliding Window protocol using Go-Back-N.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.3(a) · 7 Marks"
  },
  {
    "id": "cn-q31",
    "unit": 3,
    "question": "Evaluate the CRC for a frame/message 1101011011 and generator polynomial G(X) = X⁴ + X + 1. Find the transmitted codeword and verify at receiver.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.3(b) · 7 Marks"
  },
  {
    "id": "cn-q32",
    "unit": 3,
    "question": "Explain Framing in Data Link Layer. Differentiate between Character Count, Byte Stuffing, and Bit Stuffing with clear examples.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.4(a) · 7 Marks"
  },
  {
    "id": "cn-q33",
    "unit": 3,
    "question": "Consider the delay of Pure ALOHA versus Slotted ALOHA at low load. Which one is less? Explain with throughput and timing analysis.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.4(b) · 7 Marks"
  },
  {
    "id": "cn-q46",
    "unit": 3,
    "question": "Discuss CSMA/CA with the help of a flowchart.",
    "years": [
      2023
    ],
    "marks": 4,
    "verified": "BEU 2023 · Q.8(a) · 4 Marks"
  },
  {
    "id": "cn-q47",
    "unit": 3,
    "question": "Why CSMA/CD is not implemented in WLAN?",
    "years": [
      2023
    ],
    "marks": 3,
    "verified": "BEU 2023 · Q.8(b) · 3 Marks"
  },
  {
    "id": "cn-q48",
    "unit": 3,
    "question": "Explain why Stop-and-Wait protocol requires acknowledgement numbering. Discuss IEEE 802.3 Ethernet frame format and minimum payload padding.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.8(c) & Q.8(d) · 4 + 3 = 7 Marks"
  },
  {
    "id": "cn-q20",
    "unit": 3,
    "question": "Explain Hamming Code error detection and correction. For data word 1011, construct the 7-bit Hamming code using even parity. Show error correction if bit 6 is corrupted.",
    "years": [
      2022
    ],
    "marks": 7,
    "verified": "BEU 2022 · Q.4(b) · 7 Marks"
  },
  {
    "id": "cn-q49",
    "unit": 3,
    "question": "Given a 10-bit sequence 1010011110 and a divisor 1011. Find the CRC. Check your answer.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.2(b) · 7 Marks"
  },
  {
    "id": "cn-q51",
    "unit": 3,
    "question": "Find the expressions for average delay and throughput for both pure ALOHA and slotted ALOHA. Compare their performances as well.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.4(a) · 7 Marks"
  },
  {
    "id": "cn-q53",
    "unit": 3,
    "question": "In Go-Back-N ARQ show the window size should be 2^m - 1.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.7(a) · 7 Marks"
  },
  {
    "id": "cn-q55",
    "unit": 3,
    "question": "What do you mean by the term ethernet? What are the types of cable commonly used for ethernet?",
    "years": [
      2022
    ],
    "marks": 14,
    "verified": "BEU 2022 · Q.3 · 14 Marks"
  },
  {
    "id": "cn-q34",
    "unit": 4,
    "question": "An ISP is granted a block of addresses starting with 190.100.0.0/16 (65,536 addresses). The ISP needs to distribute these addresses to three groups of customers: (1) 64 customers each needing 256 addresses, (2) 128 customers each needing 128 addresses, (3) 128 customers each needing 64 addresses. Design the subblocks, give first and last address in each group, and find unused addresses.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.5(b) · 7 Marks"
  },
  {
    "id": "cn-q35",
    "unit": 4,
    "question": "Describe the intra-AS routing protocol RIP in detail. Explain its metric, algorithm, and loop prevention mechanisms.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.6(a) · 7 Marks"
  },
  {
    "id": "cn-q36",
    "unit": 4,
    "question": "Explain the distance vector routing algorithm for a 5-node network (A, B, C, D, E). Show the initial routing tables, exchange iterations, and final converged routing tables.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.6(b) · 7 Marks"
  },
  {
    "id": "cn-q43",
    "unit": 4,
    "question": "Write a short note on Network Address Translation (NAT). Explain its types and operational mechanism.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.9(d) · 7 Marks"
  },
  {
    "id": "cn-q45",
    "unit": 4,
    "question": "An ISP is granted the block 80.70.56.0/21. The ISP needs to distribute these addresses to: (1) Two organizations each with 500 addresses, (2) Two organizations each with 250 addresses, (3) Three organizations each with 50 addresses. Design the subnets, determine address ranges and masks, and calculate total unused addresses.",
    "years": [
      2023
    ],
    "marks": 14,
    "verified": "BEU 2023 · Q.5(a) & Q.5(b) · 7 + 7 = 14 Marks"
  },
  {
    "id": "cn-q21",
    "unit": 4,
    "question": "Explain the Link State Routing protocol. Apply Dijkstra’s shortest path algorithm on a 6-node network with Source Node A. Show step-by-step permanent set updates and the resulting Shortest Path Tree.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.6(a) · 7 Marks"
  },
  {
    "id": "cn-q54",
    "unit": 4,
    "question": "We know that there are 2 types of address scheme (i.e. IP address and MAC address) in computer networks. Explain what is the need of having two types of addresses. What will happen if we use only IP address in computer networks?",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.7(b) · 7 Marks"
  },
  {
    "id": "cn-q37",
    "unit": 5,
    "question": "Explain how TCP provides a flow control service by using different variables. Discuss buffer variables at sender and receiver, Silly Window Syndrome, and Zero-Window Probing.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.7(a) · 7 Marks"
  },
  {
    "id": "cn-q38",
    "unit": 5,
    "question": "Describe the various fields of UDP segment and explain UDP checksum calculation with a numerical example using 16-bit one’s complement arithmetic.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.7(b) · 7 Marks"
  },
  {
    "id": "cn-q39",
    "unit": 5,
    "question": "What is congestion? Explain three congestion control policies in Transport Layer with suitable diagram.",
    "years": [
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.8(b) · 7 Marks"
  },
  {
    "id": "cn-q44",
    "unit": 5,
    "question": "Explain leaky bucket and token bucket algorithm. Compare their burst handling capabilities and compute maximum burst duration.",
    "years": [
      2023
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.3(b) · 7 Marks"
  },
  {
    "id": "cn-q56",
    "unit": 5,
    "question": "Differentiate between port and socket with suitable examples.",
    "years": [
      2022
    ],
    "marks": 14,
    "verified": "BEU 2022 · Q.4 · 14 Marks"
  },
  {
    "id": "cn-q57",
    "unit": 5,
    "question": "Explain the difference between TCP and UDP. A client residing on a host with IP address 122.45.12.7 sends a message to a server residing on another host with IP address 200.11.24.59. If the well-known port of the server is 161 and the ephemeral port of the client is 1000, what are the pair of socket addresses used in this communication?",
    "years": [
      2022
    ],
    "marks": 14,
    "verified": "BEU 2022 · Q.9 · 14 Marks"
  },
  {
    "id": "cn-q40",
    "unit": 6,
    "question": "Differentiate between SMTP and POP protocols. Explain Mail Access Agents in detail along with the complete end-to-end electronic mail transmission architecture.",
    "years": [
      2022,
      2024
    ],
    "marks": 7,
    "verified": "BEU 2024 · Q.9(b) · 7 Marks"
  },
  {
    "id": "cn-q42",
    "unit": 6,
    "question": "Write a comprehensive short note on Network Firewalls. Discuss the different types of firewalls, Demilitarized Zone (DMZ) architecture, and practical packet-filtering rule bases.",
    "years": [
      2022,
      2023,
      2025
    ],
    "marks": 7,
    "verified": "BEU 2023 · Q.9(b) · 7 Marks"
  }
];
