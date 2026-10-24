export const unit2Solutions = [
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
      intro: 'Packet switching networks transmit data in discrete units called packets. Communication is achieved through either the connectionless Datagram Approach or the connection-oriented Virtual Circuit Approach.',
      diagrams: [
        {
          title: 'Datagram (Independent Routing) vs Virtual Circuit (Pre-set Path)',
          ascii:
`[ DATAGRAM APPROACH (Connectionless) ]
Packets travel independently; may arrive out-of-order.

Host A --- [Router 1] ===== [Router 2] --- Host B
              \               /
               \=== [R3] ====/
Packet 1: A -> R1 -> R2 -> B
Packet 2: A -> R1 -> R3 -> R2 -> B  (Alternate path taken)

[ VIRTUAL CIRCUIT APPROACH (Connection-Oriented) ]
Call Setup Phase establishes fixed logical path; packets share VC ID.

Host A ---(VC 12)--- [R1] ---(VC 5)--- [R2] ---(VC 8)--- Host B
(Setup Request -> Setup ACK -> Data Transmission -> Teardown)`
        }
      ],
      sections: [
        {
          heading: '1. Datagram Approach (Connectionless)',
          points: [
            'Each packet contains full source and destination IP addresses in its header.',
            'Routers evaluate routing tables dynamically; consecutive packets between the same host pair may take completely different paths.',
            'Packets may arrive out-of-order, requiring reordering at the transport layer (TCP).',
            'High robustness: If an intermediate router fails, subsequent datagrams are dynamically rerouted.'
          ]
        },
        {
          heading: '2. Virtual Circuit Approach (Connection-Oriented)',
          points: [
            'Operates in three phases: (1) Setup Phase, (2) Data Transfer Phase, and (3) Teardown Phase.',
            'Intermediate switches maintain Virtual Circuit Tables mapping incoming (port, VCI) to outgoing (port, VCI).',
            'Packets carry only a short Virtual Circuit Identifier (VCI), reducing header overhead.',
            'Guarantees in-order delivery and predictable latency, but switch failure terminates the virtual circuit.'
          ]
        }
      ],
      table: {
        title: 'Comparison: Datagram vs Virtual Circuit',
        headers: ['Feature', 'Datagram Approach', 'Virtual Circuit Approach'],
        rows: [
          ['Connection State', 'Connectionless (No setup phase)', 'Connection-Oriented (Setup, Data, Teardown)'],
          ['Addressing in Header', 'Full Source & Destination IP (32/128 bits)', 'Short Virtual Circuit Identifier (VCI, 16 bits)'],
          ['Packet Path', 'Dynamic (Each packet routed independently)', 'Static (All packets follow pre-established path)'],
          ['Switch State Info', 'Switches store destination routing tables', 'Switches store per-connection state tables (VCI)'],
          ['Packet Ordering', 'Packets may arrive out of order', 'Packets strictly arrive in order'],
          ['Failure Vulnerability', 'Highly resilient; packets rerouted around dead nodes', 'Vulnerable; switch failure terminates entire VC'],
          ['Bandwidth Allocation', 'Statistical multiplexing, best-effort', 'Can reserve dedicated bandwidth and buffers (QoS)'],
          ['Real-world Example', 'Internet IPv4 / IPv6 network layer', 'ATM, X.25, Frame Relay, MPLS']
        ]
      },
      conclusion: 'Datagram networks maximize flexibility and fault tolerance (ideal for general internet traffic), while Virtual Circuits provide deterministic QoS and bandwidth reservation (ideal for carrier telecommunications).',
      markingScheme: [
        { component: 'Datagram Working Principle & Characteristics', marks: '1.5' },
        { component: 'Virtual Circuit Working Principle & 3 Phases', marks: '1.5' },
        { component: 'Clear Architectural Diagrams for Both Approaches', marks: '2.0' },
        { component: 'Comparison Table (≥6 technical parameters)', marks: '1.5' },
        { component: 'Conclusion & Practical Use Cases', marks: '0.5' }
      ],
      examTip: 'Draw both diagrams side-by-side. For Virtual Circuit, explicitly label the 3 phases: Setup (Call Request/Accept), Data Transfer, and Teardown (Clear Request).'
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
      intro: 'Switching is the mechanism of forwarding data across network links. Circuit Switching and Packet Switching represent the two fundamental models of telecommunications architecture.',
      diagrams: [
        {
          title: 'Timing Diagrams: Circuit Switching vs Packet Switching',
          ascii:
`[ CIRCUIT SWITCHING ]               [ PACKET SWITCHING ]
Sender             Receiver        Sender             Receiver
  |                  |               |                  |
  |-- Setup Request->|               |-- Packet 1 ------>|
  |                  |               |-- Packet 2 ------>| (Pipelined)
  |<- Setup Confirmed|               |-- Packet 3 ------>|
  |==================| (Dedicated)   |                  |
  |===== DATA =======| (Continuous)  |                  |
  |==================|               |                  |
  |-- Teardown ----->|               |                  |
  v                  v               v                  v
(High setup delay, zero transfer delay) (No setup delay, store-and-forward delay)`
        }
      ],
      table: {
        title: 'Comparative Analysis: Circuit Switching vs Packet Switching',
        headers: ['Parameter', 'Circuit Switching', 'Packet Switching'],
        rows: [
          ['Dedicated Path', 'Yes, dedicated physical circuit', 'No, shared physical transmission path'],
          ['Bandwidth Utilization', 'Low; wasted during silence/idle periods', 'High; dynamic statistical multiplexing'],
          ['Call Setup Phase', 'Mandatory before any data transfer', 'None (for datagram packet switching)'],
          ['Store-and-Forward Delay', 'Zero queuing delay during transmission', 'Present at every intermediate router'],
          ['Congestion Vulnerability', 'Occurs at call setup (call blocked)', 'Occurs at routers (queuing delay & packet drops)'],
          ['Charging Scheme', 'Billed by connection time / distance', 'Billed by volume of data (MB/GB transferred)'],
          ['Traffic Suitability', 'Continuous constant bit-rate (Voice PSTN)', 'Bursty, asynchronous computer data (Web, Email)'],
          ['Protocol Overhead', 'Minimal header overhead after connection', 'Header overhead on every single packet']
        ]
      },
      sections: [
        {
          heading: '1. Technical Highlights',
          points: [
            '<b>Circuit Switching</b> locks physical circuits, guaranteeing zero jitter and constant bandwidth at the expense of wasted capacity during idle times.',
            '<b>Packet Switching</b> leverages statistical multiplexing: packets from multiple conversations dynamically interleave over shared links, maximizing bandwidth efficiency.'
          ]
        }
      ],
      conclusion: 'Circuit switching provides guaranteed QoS for continuous voice calls, whereas packet switching dominates modern telecommunications due to superior bandwidth efficiency and scalability.',
      markingScheme: [
        { component: 'Circuit Switching Architecture & Operation', marks: '1.5' },
        { component: 'Packet Switching Architecture & Store-and-Forward', marks: '1.5' },
        { component: 'Comparative Timing Ladder Diagrams', marks: '1.5' },
        { component: 'Detailed Comparison Table (≥6 criteria)', marks: '2.0' },
        { component: 'Conclusion', marks: '0.5' }
      ],
      examTip: 'Highlight the difference between connection setup time and transmission delay. Emphasize that packet switching uses statistical multiplexing.'
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
