const unit2Entries = [
  {
    id: 'cn-q4',
    num: 4,
    title: 'Nyquist Bit Rate vs Shannon Channel Capacity Numerical',
    unit: 2,
    verified: 'BEU 2023 · Q.4 / 2025 · 7 Marks',
    years: [2023, 2025],
    marks: 7,
    question: 'State Nyquist’s bit rate theorem and Shannon’s channel capacity theorem. For a channel with 4 kHz bandwidth and SNR of 30 dB, calculate the maximum theoretical data rate.',
    solution: {
      verified: 'BEU 2023 · Q.4 / 2025 · 7 Marks',
      intro: 'In data communication, the maximum theoretical transmission rate across a physical channel is governed by two fundamental laws: Nyquist’s Theorem for noiseless channels and Shannon’s Theorem for noisy channels subject to thermal Gaussian noise.',
      diagrams: [
        {
          title: 'Channel Capacity Limits & Signal-to-Noise Ratio',
          ascii:
`[ NOISELESS CHANNEL: NYQUIST ]      [ NOISY CHANNEL: SHANNON-HARTLEY ]
Bandwidth B, Signal Levels L        Bandwidth B, Thermal Noise N
Max Bit Rate = 2 * B * log2(L)      Capacity C = B * log2(1 + S/N)
                                                 
             +-----------------------------------------+
Signal S --->|   Physical Channel (Bandwidth B = 4 kHz)| ---> Output
             |   Thermal White Noise N (SNR = 30 dB)   |
             +-----------------------------------------+`
        }
      ],
      sections: [
        {
          heading: '1. Theoretical Formulations',
          points: [
            '<b>Nyquist Bit Rate Theorem (Noiseless Channel):</b> For an ideal noiseless channel of bandwidth B (Hz) carrying discrete signals with L signaling levels: <br><code>Bit Rate = 2 × B × log₂(L) bps</code>',
            '<b>Shannon’s Channel Capacity Theorem (Noisy Channel):</b> Establishes the absolute theoretical upper bound on error-free data transmission in the presence of Additive White Gaussian Noise (AWGN): <br><code>C = B × log₂(1 + SNR) bps</code>, where SNR is the linear signal-to-noise power ratio.'
          ]
        },
        {
          heading: '2. Step-by-Step Numerical Solution',
          points: [
            '<b>Step 1: Given Parameters:</b><br>• Bandwidth <code>B = 4 kHz = 4,000 Hz</code><br>• Signal-to-Noise Ratio <code>SNR_dB = 30 dB</code>',
            '<b>Step 2: Convert Decibels to Linear SNR:</b><br><code>SNR_dB = 10 × log₁₀(SNR)</code><br><code>30 = 10 × log₁₀(SNR) ⇒ log₁₀(SNR) = 3</code><br><code>SNR = 10³ = 1,000</code>',
            '<b>Step 3: Apply Shannon Channel Capacity Formula:</b><br><code>C = B × log₂(1 + SNR)</code><br><code>C = 4,000 × log₂(1 + 1000) = 4,000 × log₂(1001)</code>',
            '<b>Step 4: Compute Logarithm:</b><br><code>log₂(1001) = ln(1001) / ln(2) = 6.90875 / 0.69315 ≈ 9.9672</code><br><code>C = 4,000 × 9.9672 ≈ 39,869 bps ≈ 39.87 kbps</code>',
            '<b>Step 5: Determine Nyquist Signal Levels Needed:</b><br>To achieve 39.87 kbps: <code>2 × 4,000 × log₂(L) = 39,869 ⇒ 8,000 × log₂(L) = 39,869</code><br><code>log₂(L) ≈ 4.98 ⇒ L = 2⁴·⁹⁸ ≈ 32 levels</code>.'
          ]
        }
      ],
      conclusion: 'The maximum theoretical channel capacity is 39.87 kbps. Regardless of how many signal levels are engineered, thermal noise fundamentally caps transmission at this upper limit.',
      markingScheme: [
        { component: 'Nyquist Theorem Statement & Equation', marks: '1.5' },
        { component: 'Shannon-Hartley Theorem Statement & Equation', marks: '1.5' },
        { component: 'Conversion of 30 dB to Linear SNR (1000)', marks: '1.0' },
        { component: 'Step-by-Step Capacity Calculation (39.87 kbps)', marks: '2.0' },
        { component: 'Calculation of Signal Levels L & Conclusion', marks: '1.0' }
      ],
      examTip: 'Always convert 30 dB to linear scale (1,000). Never write log₂(1 + 30); that is the most common student blunder!'
    }
  },
  {
    id: 'cn-q29',
    num: 29,
    title: 'Datagram and Virtual Circuit Approaches',
    unit: 2,
    verified: 'BEU 2024 · Q.2(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Explain Datagram Approach and Virtual Circuit Approach with suitable diagram.',
    solution: {
      verified: 'BEU 2024 · Q.2(b) · 7 Marks',
      intro: 'Packet-switched networks transmit digital data in discrete, bounded blocks called packets. At the Network Layer, packets are transferred across interconnected nodes using either the connectionless Datagram Approach or the connection-oriented Virtual Circuit (VC) Approach.',
      diagrams: [
        {
          title: 'Datagram Network: Independent Hop-by-Hop Routing & Dynamic Multipath Forwarding',
          ascii:
`[ DATAGRAM APPROACH (Connectionless - e.g., IPv4 / IPv6) ]
Packets travel independently; routers evaluate routing tables per packet.

Host A ===== [Router R1] ------------ [Router R2] ===== Host B
                \\                       /
                 \\                     /
                  +---- [Router R3] --+

Transmission Trace:
• Packet 1: Host A -> R1 -> R2 -> Host B              (Fast path: 2 hops)
• Packet 2: Host A -> R1 -> R3 -> R2 -> Host B       (Alternate path taken due to link load)
• Packet 3: Host A -> R1 -> R2 -> Host B              (Arrives BEFORE Packet 2! Out-of-order)
Result: Zero connection setup delay; high fault tolerance, but packets may arrive out-of-sequence.`
        },
        {
          title: 'Virtual Circuit Network: 3-Phase Lifecycle & Hop-by-Hop VCI Translation',
          ascii:
`[ VIRTUAL CIRCUIT APPROACH (Connection-Oriented - e.g., ATM, X.25, MPLS) ]

HOST A                   SWITCH R1                 SWITCH R2                 HOST B
  |                          |                         |                        |
  |--- 1. Setup Request ---->|--- Setup Request ------>|--- Setup Request ----->| (Path chosen)
  |                          | [Table: In 5 -> Out 12] | [Table: In 12 -> Out 8]|
  |<-- 2. Setup Confirm -----|<-- Setup Confirm -------|<-- Setup Confirm ------| (VC active)
  |                          |                         |                        |
  |=== DATA (VCI: 5) =======>|=== DATA (VCI: 12) =====>|=== DATA (VCI: 8) =====>| (Ordered)
  |=== DATA (VCI: 5) =======>|=== DATA (VCI: 12) =====>|=== DATA (VCI: 8) =====>| (Guaranteed)
  |                          |                         |                        |
  |--- 3. Teardown Request ->|--- Teardown Request --->|--- Teardown Request -->| (Release VC)
  v                          v                         v                        v`
        }
      ],
      sections: [
        {
          heading: '1. Operational Mechanism of the Datagram Approach',
          points: [
            '<b>Step 1 — Segmentation & Encapsulation:</b> The transport payload is partitioned into independent datagrams. Each datagram header carries complete Source IP (32/128-bit) and Destination IP addresses.',
            '<b>Step 2 — Dynamic Next-Hop Routing:</b> Intermediate routers maintain routing tables built via dynamic routing protocols (OSPF, BGP). Each router independently inspects the destination IP and selects the best outgoing interface using longest-prefix matching.',
            '<b>Step 3 — Multipath & Variable Queuing Delay:</b> Because routing tables adapt dynamically to network congestion or link failures, successive datagrams from the same file stream may traverse different physical routes.',
            '<b>Step 4 — Out-of-Order Delivery & Loss Handling:</b> Because transmission routes and router queues vary, datagrams can arrive out-of-order, be duplicated, or be dropped during queue overflow. The destination transport layer (TCP) is responsible for re-sequencing and retransmissions.',
            '<b>Step 5 — Architectural Robustness:</b> The network core remains entirely stateless regarding user flows. If an intermediate router crashes, subsequent datagrams automatically route around the failed node with zero connection rebuild.'
          ]
        },
        {
          heading: '2. Operational Mechanism of the Virtual Circuit Approach',
          points: [
            '<b>Phase 1 — Connection Setup:</b> Before any user data can be transmitted, the sender issues a Setup Request packet. The network selects a fixed logical route, allocates buffer resources and bandwidth, and programs entry rows into the Virtual Circuit routing tables of all switches along the path.',
            '<b>Phase 2 — Pipelined Data Transfer:</b> User packets do not carry full IP addresses; instead, they carry a compact 16-bit or 24-bit Virtual Circuit Identifier (VCI). Switches perform ultra-fast table lookups, swap the incoming VCI for the outgoing VCI, and immediately forward the packet. Packets strictly follow the pre-established path, guaranteeing perfectly ordered arrival and bounded jitter.',
            '<b>Phase 3 — Connection Teardown:</b> Once the data stream completes, a Teardown packet propagates along the path, instructing each switch to purge its table entries and reclaim reserved link bandwidth for other users.'
          ]
        },
        {
          heading: '3. Hop-by-Hop VCI Translation Numerical Walkthrough',
          points: [
            'Consider a virtual circuit established from Host A through Switch 1 and Switch 2 to Host B:',
            '<b>Switch 1 Forwarding Table:</b> [Incoming Port: 1, Incoming VCI: 5] ➔ [Outgoing Port: 3, Outgoing VCI: 12]. When a packet enters port 1 with VCI 5, Switch 1 overwrites the header VCI to 12 and transmits out port 3.',
            '<b>Switch 2 Forwarding Table:</b> [Incoming Port: 2, Incoming VCI: 12] ➔ [Outgoing Port: 4, Outgoing VCI: 8]. Switch 2 receives VCI 12 on port 2, rewrites it to VCI 8, and transmits out port 4 directly to Host B.',
            '<b>VCI Localization Advantage:</b> VCI numbers have local link significance only. This prevents a global numbering bottleneck and keeps the header identifier field exceptionally small.'
          ]
        }
      ],
      table: {
        title: 'Comprehensive Technical Comparison: Datagram Approach vs Virtual Circuit Approach',
        headers: ['Evaluation Parameter', 'Datagram Approach (Connectionless)', 'Virtual Circuit Approach (Connection-Oriented)'],
        rows: [
          ['Connection State', 'Connectionless; no setup phase before transmission', 'Connection-oriented; requires explicit 3-phase lifecycle (Setup, Data, Teardown)'],
          ['Header Addressing', 'Full global Source & Destination IP addresses (32/128 bits)', 'Compact local Virtual Circuit Identifier (VCI, typically 16/24 bits)'],
          ['Packet Transmission Path', 'Dynamic; each packet is forwarded independently across available links', 'Static; all packets strictly follow the pre-established logical path'],
          ['Switch State Overhead', 'Stateless core; switches store only destination prefix routing tables', 'Stateful core; switches maintain per-connection translation tables for every active VC'],
          ['Packet Delivery Ordering', 'Packets may arrive out-of-order; requires reassembly at receiver', 'Strictly in-order delivery guaranteed by the static single path'],
          ['Link / Node Failure Impact', 'Highly resilient; packets automatically route around failed links', 'Fragile; failure of any intermediate switch severs the entire circuit'],
          ['Bandwidth & QoS Guarantee', 'Statistical multiplexing, best-effort; vulnerable to variable queuing delay', 'Can reserve dedicated bandwidth, buffer space, and deterministic QoS'],
          ['Setup Latency', 'Zero setup latency; transmission begins immediately on packet generation', 'High initial connection establishment latency before first data byte is sent'],
          ['Header Processing Overhead', 'Complex software routing lookup (Longest Prefix Match per packet)', 'Fast hardware switching table lookup (direct index VCI swap)'],
          ['Representative Protocols', 'Internet Protocol (IPv4, IPv6), UDP', 'ATM, X.25, Frame Relay, Multi-Protocol Label Switching (MPLS)']
        ]
      },
      conclusion: 'The Datagram Approach prioritizes simplicity, zero setup delay, and unmatched fault resilience (making it the architectural cornerstone of the global Internet), whereas the Virtual Circuit Approach delivers deterministic latency, guaranteed ordering, and bandwidth reservation essential for carrier-grade telecommunications and real-time ATM networks.',
      markingScheme: [
        { component: 'Architectural Definitions & Core Distinction', marks: '1.0' },
        { component: 'Neat Labelled Datagram & Virtual Circuit Diagrams', marks: '1.5' },
        { component: 'Datagram 5-Step Operational Breakdown & Routing Mechanics', marks: '1.5' },
        { component: 'Virtual Circuit 3-Phase Lifecycle & VCI Table Translation Example', marks: '1.5' },
        { component: 'Comprehensive 10-Parameter Comparison Table & Academic Conclusion', marks: '1.5' }
      ],
      examTip: 'To score full 7/7 marks, draw both diagrams clearly: show alternate paths for Datagrams (out-of-order arrival) and show the 3 distinct phases (Setup, Data, Teardown) with the VCI translation table for Virtual Circuits.'
    }
  },
  {
    id: 'cn-q41',
    num: 41,
    title: 'Circuit Switching vs Packet Switching',
    unit: 2,
    verified: 'BEU 2023 · Q.2(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Differentiate between circuit switching and packet switching.',
    solution: {
      verified: 'BEU 2023 · Q.2(a) · 7 Marks',
      intro: 'In data communication networks, switching is the method of dynamically transferring data across intermediate nodes from source to destination. Circuit Switching and Packet Switching represent the two fundamental paradigm models: Circuit Switching dedicates exclusive physical channel resources for the entire duration of a session, whereas Packet Switching breaks messages into discrete chunks (packets) that independently traverse shared, statistically multiplexed links.',
      diagrams: [
        {
          title: 'Timing Ladders: Circuit Switching vs Packet Switching',
          ascii:
`[ CIRCUIT SWITCHING (Connection-Oriented) ]      [ PACKET SWITCHING (Connectionless) ]
Sender      Switch 1    Switch 2    Receiver     Sender      Switch 1    Switch 2    Receiver
  |            |           |           |           |            |           |           |
  |--Setup---->|           |           |           |--Pkt 1---->|           |           |
  |            |--Setup--->|           |           |            |--Pkt 1--->|           | (Store & Forward)
  |            |           |--Setup--->|           |--Pkt 2---->|           |--Pkt 1--->|
  |            |           |<-Confirm--|           |            |--Pkt 2--->|           |
  |            |<-Confirm--|           |           |--Pkt 3---->|           |--Pkt 2--->|
  |<-Confirm---|           |           |           |            |--Pkt 3--->|           |
  |====================================|           |            |           |--Pkt 3--->|
  |=========== DATA TRANSFER ==========|           v            v           v           v
  |====================================|    (Zero setup delay; pipelined store-and-forward)
  |--Teardown->|           |           |
  v            v           v           v
(High setup delay; zero transfer jitter)`
        },
        {
          title: 'Physical Resource Architecture: Dedicated Line vs Statistical Multiplexing',
          ascii:
`A. CIRCUIT SWITCHING: Dedicated Physical Channels (TDM/FDM Slots)
   Host A ----[ Switch 1 ]==================[ Switch 2 ]---- Host B
             (Reserved 64 kbps Trunk Slot; Idle when silent)

B. PACKET SWITCHING: Shared Queue with Store-and-Forward
   Host A --+                                             +--> Host B
            |---> [ Input Buffer ] ===[ Shared Link ]===> |
   Host C --+     (Packets queued; statistical multiplexing) `
        }
      ],
      table: {
        title: 'Comprehensive Comparison: Circuit Switching vs Packet Switching',
        headers: ['Evaluation Parameter', 'Circuit Switching', 'Packet Switching'],
        rows: [
          ['Physical Path', 'Dedicated end-to-end physical path reserved for session', 'No dedicated path; packets share physical links dynamically'],
          ['Bandwidth Allocation', 'Fixed, pre-allocated bandwidth (e.g., 64 kbps PCM channel)', 'Dynamic bandwidth on demand via statistical multiplexing'],
          ['Bandwidth Utilization', 'Low; idle periods (silence) waste allocated capacity', 'High; idle capacity is instantly utilized by other packets'],
          ['Call Setup Phase', 'Mandatory connection setup phase before data can flow', 'No setup phase required in datagram packet switching'],
          ['Transmission Delay', 'Negligible delay and zero jitter once circuit is established', 'Variable delay due to per-node store-and-forward queuing'],
          ['Congestion Behavior', 'Congestion occurs at call setup time (call blocked/busy)', 'Congestion occurs at intermediate router buffers (packet delay/drop)'],
          ['Store-and-Forward', 'Absent; bits stream continuously through copper/optical path', 'Mandatory; each switch buffers entire packet before forwarding'],
          ['Packet Header Overhead', 'Minimal header overhead after connection setup', 'Substantial header overhead on every packet (IP, Port, Seq No)'],
          ['Node Failure Impact', 'Fatal; any switch or link failure abruptly terminates call', 'Resilient; routers dynamically reroute subsequent datagrams'],
          ['Primary Application', 'Traditional voice telephony (PSTN), legacy ISDN', 'Modern Internet, World Wide Web (HTTP), Email, Streaming']
        ]
      },
      sections: [
        {
          heading: '1. Operational Mechanism of Circuit Switching',
          points: [
            '<b>Phase 1 — Circuit Establishment:</b> Before any user data bits can be transmitted, a dedicated end-to-end physical circuit is reserved through a series of intermediate switching nodes. If any trunk on the path has exhausted its time-slots (FDM/TDM), the connection request is blocked (busy signal).',
            '<b>Phase 2 — Continuous Data Transfer:</b> Once established, the signal travels across the reserved path with minimal delay (only propagation delay). There is zero buffering, zero queuing delay, and zero packet reordering at intermediate switches.',
            '<b>Phase 3 — Circuit Teardown:</b> When communication terminates, a teardown signal propagates across the switches to release the reserved frequency or time-slots for other subscribers.'
          ]
        },
        {
          heading: '2. Operational Mechanism of Packet Switching',
          points: [
            '<b>Segmentation & Packetization:</b> Long application messages are partitioned into smaller, standardized packets (typically 64 to 1500 bytes). Each packet is prepended with a header containing Source IP, Destination IP, sequence number, and error-detection checksum.',
            '<b>Store-and-Forward Transmission:</b> A router must receive the entire packet and verify its checksum before transmitting it onto the outbound link. For a packet of length <code>L</code> bits over a link of transmission rate <code>R</code> bps across <code>N</code> hops, transmission delay is <code>N × (L / R)</code>.',
            '<b>Statistical Multiplexing:</b> Multiple hosts dynamically share common trunk links. Unlike circuit switching which leaves idle slots empty, packet switching transmits packets from whoever has data ready, maximizing network link efficiency.'
          ]
        },
        {
          heading: '3. Comparative Delay, Reliability & Engineering Trade-offs',
          points: [
            '<b>Delay Profiles:</b> Circuit switching suffers from a high initial connection setup delay ($t_{setup}$), but thereafter experiences constant, predictable delay with zero jitter, making it historically ideal for analog voice. Packet switching has zero setup delay for datagrams, but packets experience stochastic queuing delay ($d_{queue}$) and variable jitter under heavy network load.',
            '<b>Fault Resilience:</b> In circuit switching, the failure of any intermediate switch severs the active connection. In packet switching, routing protocols (OSPF, BGP) automatically compute alternate paths, and subsequent datagrams bypass failed nodes seamlessly.'
          ]
        }
      ],
      conclusion: 'Circuit switching guarantees dedicated bandwidth and constant delay for real-time voice, but suffers from wasted bandwidth during idle periods. Packet switching dominates modern telecommunications and the Internet by maximizing link utilization through statistical multiplexing and autonomous, resilient routing.',
      markingScheme: [
        { component: 'Architectural Definitions & Core Distinction', marks: '1.0' },
        { component: 'Neat Timing Ladders & Physical Channel Diagrams', marks: '1.5' },
        { component: 'Detailed 10-Parameter Comparison Table', marks: '2.0' },
        { component: 'Circuit Switching 3-Phase Working Breakdown', marks: '1.0' },
        { component: 'Packet Switching Store-and-Forward & Multiplexing Analysis', marks: '1.0' },
        { component: 'Delay Profiles, Fault Resilience & Academic Conclusion', marks: '0.5' }
      ],
      examTip: 'Examiners look for the 3 distinct phases of circuit switching (Setup, Transfer, Teardown) and the store-and-forward transmission formula (N × L/R) for packet switching. Including both timing diagrams and the 10-row comparison table guarantees full 7/7 marks.'
    }
  },
  {
    id: 'cn-q52',
    num: 52,
    title: 'Guided vs Unguided Media and Advantages of Optical Fiber',
    unit: 2,
    verified: 'BEU 2023 · Q.6(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'How do guided media differ from unguided media? Name the advantages of optical fiber over twisted-pair and coaxial cable.',
    solution: {
      verified: 'BEU 2023 · Q.6(a) · 7 Marks',
      intro: 'Transmission media provide the physical pathway across which data travels from sender to receiver in a communication network. Located at Layer 1 (Physical Layer), transmission media are broadly categorized into Guided Media (bounded physical conduits such as copper wires and glass fibers) and Unguided Media (unbounded wireless propagation of electromagnetic waves through free space).',
      diagrams: [
        {
          title: 'Transmission Media Classification: Guided (Cabled) vs Unguided (Wireless)',
          ascii:
`[ GUIDED MEDIA (Conducted / Bounded) ]
+-------------+      Physical Cable (Conductor / Waveguide)     +-------------+
| Transmitter |================================================>|  Receiver   |
+-------------+       (Twisted-Pair, Coaxial, Optical Fiber)    +-------------+
Signals travel along a constrained physical path; bounded by metallic/dielectric walls.

[ UNGUIDED MEDIA (Radiated / Unbounded) ]
+-------------+                                                 +-------------+
| Transmitter | ~ ~ ~ ~ ~ Electromagnetic Radio Waves ~ ~ ~ ~ ~>|  Receiver   |
|   Antenna   |              Through Free Space / Atmosphere    |   Antenna   |
+-------------+                                                 +-------------+
Waves radiate through air, vacuum, or seawater; requires no physical cable conduit.`
        },
        {
          title: 'Physical Cable Cross-Sections: Twisted-Pair vs Coaxial vs Optical Fiber',
          ascii:
`1. TWISTED-PAIR CABLE:
Wire A: -----\\ /-----\\ /-----\\ /-----   (Insulated copper conductors twisted
              X       X       X         to cancel out electromagnetic
Wire B: -----/ \\-----/ \\-----/ \\-----   interference and mutual crosstalk)

2. COAXIAL CABLE:
+------------------------------------+
| Plastic Protective Outer Jacket    |
| +--------------------------------+ |
| | Braided Metallic Copper Shield | |  <-- Provides EMI shielding & ground return
| | +----------------------------+ | |
| | | Solid Dielectric Insulator | | |
| | |         ● Central Copper   | | |  <-- Carries high-frequency electrical signal
| | +----------------------------+ | |
| +--------------------------------+ |
+------------------------------------+

3. OPTICAL FIBER CABLE:
+------------------------------------+
| Outer Polyethylene Jacket          |
| +--------------------------------+ |
| | Aramid / Kevlar Strength Member| |
| | +----------------------------+ | |
| | | Cladding (Lower n2 ≈ 1.46) | | |  <-- Confines light within core via
| | |   +--------------------+   | | |      Total Internal Reflection (TIR)
| | |   | Core (Higher n1≈1.48)| | |
| | |   | ~~~ LIGHT RAY ~~~> | | | |
| | |   +--------------------+   | | |
| | +----------------------------+ | |
| +--------------------------------+ |
+------------------------------------+`
        }
      ],
      table: {
        title: 'Comparative Analysis: Guided Transmission Media vs Unguided Transmission Media',
        headers: ['Evaluation Parameter', 'Guided Media (Bounded / Cabled)', 'Unguided Media (Unbounded / Wireless)'],
        rows: [
          ['Physical Pathway', 'Conducted via metallic wire or optical glass waveguide', 'Radiated through atmosphere, vacuum, or free space'],
          ['Signal Form', 'Electrical voltages / currents or optical light pulses', 'Electromagnetic radio waves, microwaves, or infrared'],
          ['Mobility Support', 'Fixed / Stationary; physical tethering required', 'Full terminal mobility supported (laptops, mobile phones)'],
          ['Installation & Civil Cost', 'High civil work: digging trenches, conduits, cable trays', 'Lower initial infrastructure: antennas, towers, transceivers'],
          ['Interference Vulnerability', 'Low to moderate; shielded by jacket/cladding', 'High; susceptible to weather, multipath fading, jamming'],
          ['Transmission Range', 'Limited by cable length, resistance, and dispersion', 'Vast line-of-sight and satellite planetary coverage'],
          ['Security & Eavesdropping', 'High physical security; tapping requires physical access', 'Lower privacy; eavesdroppers within radiation cone can intercept'],
          ['Bandwidth Potential', 'Enormous (up to multi-terabits/sec over optical fiber)', 'Constrained by international spectrum allocation (FCC/DoT)'],
          ['Attenuation Profile', 'Exponential with distance (dB/km); highly predictable', 'Inverse square law (1/R²) + atmospheric absorption losses'],
          ['Representative Examples', 'Cat 6A UTP, RG-6 Coaxial, Single-mode Fiber', 'Wi-Fi 802.11, 4G/5G Cellular, Satellite, Bluetooth']
        ]
      },
      sections: [
        {
          heading: '1. Advantages of Optical Fiber over Twisted-Pair and Coaxial Cable',
          points: [
            '<b>1. Immense Bandwidth Capacity:</b> Optical frequencies (~10¹⁴ Hz) offer orders-of-magnitude greater carrier bandwidth than copper. A single optical fiber strand can transmit tens of Terabits per second using Dense Wavelength Division Multiplexing (DWDM).',
            '<b>2. Exceptionally Low Signal Attenuation:</b> Modern silica glass fiber exhibits loss as low as <code>0.2 dB/km</code> at the 1550 nm window. Fiber links routinely span 40 to 80 km between optical amplifiers, whereas twisted pair Ethernet is limited to 100 meters.',
            '<b>3. Total Immunity to Electromagnetic Interference (EMI):</b> Because optical fiber carries non-conductive dielectric light photons rather than electrical electrons, it is 100% immune to external electromagnetic fields, radio frequency interference (RFI), lightning strikes, and cross-talk from nearby high-voltage power lines.',
            '<b>4. True Electrical Isolation:</b> Fiber provides complete galvanic isolation between endpoints. There are no common ground loops, zero spark hazards in explosive petrochemical plants, and zero risk of equipment damage from electrical ground potential differentials.',
            '<b>5. Drastically Reduced Physical Size & Weight:</b> A hair-thin fiber strand (125 µm cladding diameter) provides vastly greater throughput than thousands of heavy copper pairs, dramatically reducing cable tray congestion and duct rental costs in data centers.',
            '<b>6. Superior Data Security:</b> Optical fiber does not radiate electromagnetic energy. Non-intrusive eavesdropping is impossible without physically cutting or bending the core (which causes detectable optical power drops), unlike copper which easily radiates interceptible RF signals.'
          ]
        },
        {
          heading: '2. Attenuation Numerical Example',
          points: [
            '<b>Formula:</b> Total attenuation is given by <code>A = α × L</code> (dB), where α is the attenuation coefficient (dB/km) and L is the link distance (km).',
            '<b>Given Parameters:</b> Fiber attenuation <code>α = 0.2 dB/km</code> at 1550 nm, and fiber link distance <code>L = 40 km</code>.',
            '<b>Calculation:</b> <code>A = 0.2 dB/km × 40 km = 8.0 dB</code>.',
            '<b>Significance:</b> The optical signal experiences only 8 dB of power reduction across 40 km! A comparable copper link would require repeaters every 1 to 2 km due to massive high-frequency attenuation.'
          ]
        },
        {
          heading: '3. Limitations of Optical Fiber',
          points: [
            '<b>Higher Cost of Transceivers:</b> Optical-to-electrical converters (SFP+ laser transceivers) are more expensive than RJ-45 copper PHYs.',
            '<b>Specialized Splicing Tools:</b> Fusion splicing requires expensive precision arc splicers and highly trained technicians.',
            '<b>Physical Fragility:</b> Glass fibers are vulnerable to tight bend radiuses (macro-bending losses) and accidental mechanical shear.',
            '<b>No Power Delivery:</b> Unlike copper Power-over-Ethernet (PoE IEEE 802.3bt), standard glass fiber cannot carry electrical current to power IP cameras or access points.'
          ]
        }
      ],
      conclusion: 'Guided media channel signals through physical cables, while unguided media propagate electromagnetic waves through free space. Optical fiber represents the gold standard of guided transmission, providing virtually limitless bandwidth, negligible attenuation (8 dB over 40 km), electrical isolation, and complete immunity to EMI.',
      markingScheme: [
        { component: 'Introduction & Classification of Transmission Media', marks: '0.5' },
        { component: 'Guided Media Types & Detailed Cable Cross-Section Diagrams', marks: '1.0' },
        { component: 'Unguided Media Definition & Free-Space Propagation Diagram', marks: '0.5' },
        { component: 'Guided vs Unguided Media Comparison Table (≥8 rows)', marks: '1.5' },
        { component: 'Core Advantages of Optical Fiber (Bandwidth, Attenuation, EMI, Isolation)', marks: '2.0' },
        { component: 'Attenuation Numerical Calculation (A = αL = 8 dB) & Fiber Limitations', marks: '1.0' },
        { component: 'Conclusion & Technological Significance', marks: '0.5' }
      ],
      examTip: 'Bhai, original question ke two parts hain: pehle guided vs unguided media ka comparison table, phir optical fiber ke 7 major advantages over twisted-pair & coaxial. 8 dB attenuation numerical mention karne se examiner impress hota hai!'
    }
  }
];

const toSolution = ({id, solution}) => ({id, ...solution});
const solutionFor = (id, sourceId) => toSolution({
  id,
  solution: unit2Entries.find((entry) => entry.id === sourceId).solution,
});

export const unit2Solutions = [
  ...unit2Entries.map(toSolution),
  solutionFor('cn-q3', 'cn-q41'),
  {
    id: 'cn-original-2025-100602-q2a',
    verified: 'BEU 2025 · Q.2(a) · 7 Marks · Cross-checked scan',
    intro: 'Network topology defines the geometric and logical arrangement of nodes, links, and connecting devices within a computer communication network. The selection of physical topology (Mesh, Star, Ring, or Bus) fundamentally dictates network installation cost, cabling complexity, throughput capacity, and fault-tolerance resilience.',
    diagrams: [
      {
        title: 'Full Mesh Topology (Dedicated Point-to-Point Links)',
        ascii:
`      Node A
     /  |  \\
    /   |   \\
   /    |    \\
Node B--+---Node C
   \\    |    /
    \\   |   /
     \\  |  /
      Node D
(Total dedicated full-duplex links = n(n - 1) / 2)`
      },
      {
        title: 'Star Topology (Central Switch / Hub Architecture)',
        ascii:
`    [Host A]       [Host B]
        \\             /
         \\           /
      +-----------------+
      | CENTRAL SWITCH  |  <--- Single Point of Failure
      |   / HUB (L2)    |
      +-----------------+
         /           \\
        /             \\
    [Host C]       [Host D]
(Every transmission passes through the central switch)`
      },
      {
        title: 'Ring Topology (Unidirectional Token Passing Ring)',
        ascii:
`    [Node A] --------> [Node B]
       ^                  |
       |  TOKEN CIRCULATES|
       |  (Deterministic) v
    [Node D] <-------- [Node C]
(A break anywhere halts token circulation unless dual-ring FDDI is used)`
      }
    ],
    table: {
      title: 'Comprehensive Technical Comparison: Mesh, Star, and Ring Topologies',
      headers: ['Evaluation Parameter', 'Mesh Topology', 'Star Topology', 'Ring Topology'],
      rows: [
        ['Physical Cabling', 'Dedicated point-to-point link between every pair of nodes', 'Dedicated point-to-point link from each host to central switch', 'Closed circular loop; each node connects only to 2 adjacent neighbors'],
        ['Total Links Formula', 'n(n - 1) / 2 physical cables (e.g., 6 links for 4 nodes)', 'n physical cables (one per device)', 'n physical point-to-point links forming a closed loop'],
        ['Total I/O Ports Required', 'n - 1 I/O ports per device (total = n(n - 1) ports)', '1 port per host + n ports on central switch/hub', '2 ports per device (one Receive In, one Transmit Out)'],
        ['Fault Tolerance & Reliability', 'Highest; failure of any link leaves alternate paths active', 'Moderate; cable break affects only that host; switch failure halts entire LAN', 'Low; break in single ring halts entire network; dual-ring provides failover'],
        ['Data Traffic Contention', 'Zero traffic contention; dedicated private channel per pair', 'Moderate; central switch buffers and switches frames at line rate', 'Deterministic; media access controlled by circulating token frame'],
        ['Installation & Cabling Cost', 'Extremely expensive; bulk cabling and high port count', 'Low to moderate; standard twisted-pair (UTP) cabling to wiring closet', 'Low cabling requirement; neat physical deployment around perimeter'],
        ['Troubleshooting & Isolation', 'Easy to identify faulty link, but maintenance is complex', 'Easiest; switch port LEDs immediately pinpoint disconnected device', 'Difficult in simple ring; breaking token flow requires manual ring tracing'],
        ['Primary Modern Application', 'WAN backbones, core ISP routing, nuclear/military installations', 'Standard modern LANs (Home, University labs, Enterprise Ethernet)', 'High-speed metropolitan optical rings (SONET/SDH, Token Ring)']
      ]
    },
    sections: [
      {
        heading: '1. In-Depth Architectural Characteristics & Trade-offs',
        points: [
          '<b>Mesh Topology:</b> In a full mesh of <code>n</code> nodes, every device is connected to every other device via a dedicated physical channel. Because each channel carries only traffic between its two end nodes, there is zero data traffic congestion. Security and privacy are guaranteed because third-party nodes cannot physically eavesdrop on dedicated lines. However, the requirement for <code>n(n−1)/2</code> cables and <code>n−1</code> I/O ports per machine makes full mesh impractical for general desktop LANs.',
          '<b>Star Topology:</b> Each host node connects directly to a central multiport device (switch or hub) via point-to-point cabling (1000BASE-T RJ-45). If a cable fails, only that single connected node is isolated while the rest of the network operates normally. Addition or removal of nodes requires zero network downtime. The primary disadvantage is the central switch represents a single point of failure (SPOF): if the central unit loses power or fails, the entire network collapses.',
          '<b>Ring Topology:</b> Each device incorporates an internal repeater and connects strictly to its two immediate physical neighbors. Data flows unidirectionally around the ring bit-by-bit. Access is controlled by passing a special bit pattern called a Token; a node can transmit only when holding the token, preventing collisions completely. However, an unmanaged break in the physical medium disables communication for all stations.'
        ]
      },
      {
        heading: '2. Reliability Analysis: Why Mesh Topology is the Most Reliable',
        points: [
          '<b>Path Redundancy & Zero Single Point of Failure:</b> In Mesh topology, there is no master controller or central switch whose failure could disable the network. If node A transmits to node B and the direct link AB fails, traffic is instantaneously rerouted via transit nodes (e.g., A → C → B).',
          '<b>Mission-Critical Resilience:</b> Because mesh networks provide <code>n − 1</code> independent physical paths out of every station, catastrophic system blackout requires multiple simultaneous physical cable cuts, making it the architectural standard for nuclear power plant control systems, military networks, and Tier-1 Internet backbone backbones.'
        ]
      }
    ],
    conclusion: 'Among all physical topologies, Mesh topology provides the absolute highest reliability, privacy, and fault tolerance due to full physical path redundancy (n(n−1)/2 links), whereas Star topology dominates commercial enterprise LANs due to superior cost-efficiency, ease of installation, and centralized management.',
    markingScheme: [
      { component: 'Mesh Topology: Definition, Physical Architecture & Link Formula n(n-1)/2', marks: '1.5' },
      { component: 'Star & Ring Topologies: Central Hub Working, Token Circulation & Formulas', marks: '1.5' },
      { component: 'Architectural Diagrams (Full Mesh, Star Switch, Dual Ring)', marks: '1.5' },
      { component: 'Comprehensive Comparative Analysis Table (8 Parameters)', marks: '1.5' },
      { component: 'Reliability Justification (Why Mesh is Superior) & Academic Conclusion', marks: '1.0' }
    ],
    examTip: 'Always write both formulas: Links = n(n−1)/2 and Ports per device = n−1. In the reliability section, explicitly state that Mesh has no single point of failure (SPOF) while Star completely depends on the central hub/switch.'
  },
  {
    id: 'cn-original-2025-100602-q8a',
    verified: 'BEU 2025 · Q.8(a) · 7 Marks · Cross-checked scan',
    intro: 'Transmission media constitute the physical layer (Layer 1) transmission path that carries information in the form of electromagnetic energy from sender to receiver. Media are broadly categorized into Guided Media (bounded/wired, where electromagnetic waves are physically constrained along a solid conductor or glass waveguide) and Unguided Media (unbounded/wireless, where signals propagate through the atmosphere or free space via antennas).',
    diagrams: [
      {
        title: 'Guided Media Physical Construction Architectures',
        ascii:
`1. TWISTED PAIR CABLE (UTP / STP):
   +---[ Plastic Insulator ]---+   +---[ Plastic Insulator ]---+
   |  Copper Conductor Pair 1  | X |  Copper Conductor Pair 2  | (Twisting cancels
   +---------------------------+   +---------------------------+  electromagnetic EMI)

2. COAXIAL CABLE (Baseband / Broadband):
   [ Outer Protective Plastic Jacket ]
     [ Braided Metallic Mesh Shield (Ground / Noise Protection) ]
       [ Dielectric Insulating Layer ]
         [ Central Solid Copper Core Conductor ]

3. OPTICAL FIBER CABLE (Total Internal Reflection):
                 Light Ray
                 \\  /\\  /\\
   ===============\\/==\\/==\\/==================== [ Cladding: Lower Refractive Index n2 ]
   -------------------------------------------- [ Core (Glass): Higher Index n1, n1 > n2 ]
   ============================================ [ Cladding: Lower Refractive Index n2 ]
   [ Outer Protective Buffer Jacket ]`
      },
      {
        title: 'Unguided Wireless Transmission Propagation Modes',
        ascii:
`[ GROUND WAVE (< 2 MHz) ]      [ SKY WAVE (2 - 30 MHz) ]     [ LINE-OF-SIGHT (> 30 MHz) ]
    Follows Earth Curvature       Reflects from Ionosphere      Direct Antenna-to-Antenna
    (Submarines, AM Radio)        (Shortwave International)     (Microwave, 4G/5G, Satellite)
            Antenna                      Ionosphere                      Antenna  Antenna
             |                              /\\                            |        |
             |                            /    \\                          |=======>|
      _______|_______              ______/______\\______            _______|________|_____
      ///// Earth /////            ///// Earth /////              ///// Earth /////`
      }
    ],
    table: {
      title: 'Comprehensive Technical Comparison: Guided vs Unguided Media',
      headers: ['Evaluation Parameter', 'Guided Media (Wired / Bounded)', 'Unguided Media (Wireless / Unbounded)'],
      rows: [
        ['Signal Propagation Path', 'Signals are physically guided along a solid conduit (copper wire or silica glass fiber)', 'Electromagnetic waves broadcast freely through air, vacuum, or seawater without physical guides'],
        ['Physical Waveguide Types', 'Twisted-Pair (UTP/STP), Coaxial Cable (50Ω/75Ω), Optical Fiber (Single-mode/Multi-mode)', 'Radio waves (3 kHz–1 GHz), Microwaves (1 GHz–300 GHz), Infrared (300 GHz–400 THz)'],
        ['Transmission Directionality', 'Strictly point-to-point or point-to-multipoint bounded along installed cabling route', 'Omnidirectional (Radio broadcast) or highly directional Line-of-Sight (Microwave dish antennas)'],
        ['Bandwidth & Data Rate', 'Extremely high (Optical fiber reaches terabits per second over long hauls)', 'Limited by regulatory RF spectrum allocation and channel bandwidth limits (Shannon capacity)'],
        ['Noise & EMI Susceptibility', 'Very low; metallic shielding and optical glass provide near-total immunity to EMI/RFI', 'High; vulnerable to cosmic radiation, atmospheric rain attenuation, fading, and multipath interference'],
        ['Installation & Mobility', 'Rigid and immobile; requires physical trenching, wall conduits, and duct installation', 'High mobility; supports roaming cellular handsets, Wi-Fi laptops, and moving vehicles'],
        ['Security & Eavesdropping', 'High physical security; tapping glass fiber requires sophisticated splicing equipment', 'Low physical security; radio signals are easily intercepted; mandatory end-to-end cryptographic encryption'],
        ['Standard Applications', 'Ethernet LANs (Cat6), Cable TV (RG-6), Transoceanic intercontinental submarine fiber backbones', 'Cellular LTE/5G, Satellite communication, Wi-Fi 802.11ax, Bluetooth PAN, military radar']
      ]
    },
    sections: [
      {
        heading: '1. The Three Primary Classes of Guided Media',
        points: [
          '<b>Twisted-Pair Cable:</b> Consists of two insulated copper wires (typically 0.4 to 0.8 mm) twisted together in a helical form. Twisting ensures that external electromagnetic interference affects both wires equally, allowing differential receivers to cancel the common-mode induced noise. Standardized into Unshielded Twisted Pair (UTP Cat5e/Cat6 for 1 Gbps LANs) and Shielded Twisted Pair (STP, incorporating a braided metallic foil for industrial noise immunity).',
          '<b>Coaxial Cable:</b> Features a central solid copper core enclosed within a dielectric insulating cylinder, surrounded by a cylindrical woven metallic shield and encased in a PVC jacket. The concentric geometry provides high immunity to cross-talk, supporting both Baseband digital signaling (50Ω Manchester Ethernet 10BASE2/10BASE5) and Broadband analog multi-channel transmission (75Ω Cable Television and DOCSIS internet).',
          '<b>Optical Fiber Cable:</b> Transmits information as pulses of light guided through an ultra-pure cylindrical glass core (silica $SiO_2$). The core is surrounded by an outer glass cladding having a slightly lower refractive index ($n_1 > n_2$). Light launched into the core at an angle greater than the critical angle undergoes repeated <b>Total Internal Reflection (TIR)</b> with virtually zero light leakage.'
        ]
      },
      {
        heading: '2. Major Advantages of Optical Fiber over Twisted-Pair and Coaxial Cable',
        points: [
          '<b>Tremendous Channel Bandwidth:</b> Optical fiber provides transmission frequencies in the optical spectrum (~$10^{14}\\text{ Hz}$), yielding data carrying capacities exceeding 100 Gbps to multi-Terabits per second over single strands using Dense Wavelength Division Multiplexing (DWDM).',
          '<b>Immunity to Electromagnetic Interference (EMI):</b> Because light is used instead of electrical current, optical fiber is completely immune to electromagnetic noise, radio-frequency interference (RFI), voltage surges, high-voltage power lines, and lightning strikes.',
          '<b>Significantly Lower Attenuation & Long Repeater Spacing:</b> Signal loss in fiber is extraordinarily low (~$0.2\\text{ dB/km}$ at $1550\\text{ nm}$ wavelength), enabling signal travel of 50 to 100 kilometers without repeaters, compared to copper cables which require amplification every 1 to 2 kilometers.',
          '<b>Electrical Isolation & Lightning Safety:</b> Glass is an electrical insulator. Fiber links eliminate electrical ground loops between buildings and present zero fire or spark hazard in hazardous chemical environments.',
          '<b>Superior Security Against Tapping:</b> Optical fibers do not emit electromagnetic radiation that can be monitored with antennas. Physically cutting or tapping a glass fiber immediately drops optical power, alerting automated network intrusion monitoring tools.'
        ]
      },
      {
        heading: '3. Transmission Impairments in Communication Channels',
        points: [
          '<b>Attenuation:</b> The gradual loss of signal power and amplitude as it traverses transmission distance ($P_{loss} = 10 \\log_{10}(P_1 / P_2)\\text{ dB}$), requiring amplifiers or repeaters.',
          '<b>Distortion:</b> The alteration of signal shape that occurs because composite signals contain multiple harmonic frequencies that travel at slightly different phase velocities through the medium.',
          '<b>Noise:</b> External extraneous electrical signals that corrupt data, including Thermal Noise (Johnson noise $N = kTB$), Induced Noise from motors, Crosstalk between adjacent cable pairs, and Impulse Noise from lightning surges.'
        ]
      }
    ],
    conclusion: 'Guided media provide high-speed, bounded, and noise-immune transmission channels, with optical fiber serving as the uncontested global gold standard for long-distance and enterprise backbones due to unprecedented bandwidth, near-zero attenuation, and absolute EMI immunity.',
    markingScheme: [
      { component: 'Guided Media Architecture (Twisted Pair, Coaxial, Optical Fiber) & Cross-Section Diagrams', marks: '2.0' },
      { component: 'Unguided Media (Radio, Microwave, Infrared) & Propagation Characteristics', marks: '1.5' },
      { component: 'Comprehensive Comparison Table: Guided vs Unguided Media (8 Parameters)', marks: '1.5' },
      { component: 'Key Advantages of Optical Fiber over Copper (Bandwidth, EMI, Distance, Security)', marks: '1.5' },
      { component: 'Transmission Impairments (Attenuation, Distortion, Noise) & Conclusion', marks: '0.5' }
    ],
    examTip: 'Examiners look for the optical fiber principle formula (Total Internal Reflection with n_core > n_cladding) and at least 5 clear advantages over copper wires. Always draw the cross-sectional diagrams of all three guided cables.'
  },
];
export const unit2SupplementalSolutions = [];
