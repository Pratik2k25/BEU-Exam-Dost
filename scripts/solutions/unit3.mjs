export const unit3Solutions = [
  {
    id: 'cn-q30',
    num: 30,
    title: 'Go-Back-N Sliding Window Protocol',
    unit: 3,
    verified: 'BEU 2024 · Q.3(a) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Explain Sliding Window protocol using Go-Back-N.',
    solution: {
      verified: 'BEU 2024 · Q.3(a) · 7 Marks',
      intro: 'Go-Back-N (GBN) ARQ is a sliding window protocol that enables pipelined transmission of multiple data frames before requiring an acknowledgment (ACK), significantly improving channel utilization over Stop-and-Wait.',
      diagrams: [
        {
          title: 'Go-Back-N Sliding Window Mechanism & Retransmission Ladder',
          ascii:
`[ SENDER WINDOW: Size Ws = 2^m - 1 = 3 (m = 2 bits) ]
[ 0  1  2 ] 3  0  1  2 ...   (Frames 0, 1, 2 sent)

SENDER                                           RECEIVER
  |                                                 |
  |--- Frame 0 ------------------------------------>| Accepted, ACK 1 sent
  |--- Frame 1 (LOST IN TRANSIT X)                  | (Discarded)
  |--- Frame 2 ------------------------------------>| Out-of-order! Discarded
  |--- Frame 3 ------------------------------------>| Out-of-order! Discarded
  |                                                 |
  |<-- ACK 1 ---------------------------------------| (Slide window by 1)
  | [TIMER FOR FRAME 1 EXPIRES!]                    |
  |                                                 |
  |=== GO BACK TO N: Retransmit ALL from 1 ===      |
  |--- Frame 1 ------------------------------------>| Accepted, ACK 2 sent
  |--- Frame 2 ------------------------------------>| Accepted, ACK 3 sent
  |--- Frame 3 ------------------------------------>| Accepted, ACK 0 sent
  v                                                 v`
        }
      ],
      sections: [
        {
          heading: '1. Window Sizes and Mathematical Constraint',
          points: [
            '<b>Sender Window Size (Ws):</b> For an m-bit sequence number, <code>Ws ≤ 2ᵐ - 1</code>.',
            '<b>Receiver Window Size (Wr):</b> Strictly <code>Wr = 1</code> (accepts only the next expected in-order frame).',
            '<b>Why Ws Cannot Be 2ᵐ:</b> If <code>Ws = 2ᵐ</code>, a lost cumulative ACK makes it impossible for the receiver to distinguish between retransmitted duplicate frames and a brand-new window of frames (Sequence Number Ambiguity).'
          ]
        },
        {
          heading: '2. Operational Dynamics & Channel Efficiency',
          points: [
            '<b>Cumulative ACK:</b> <code>ACK n</code> acknowledges all frames up to <code>n - 1</code>. If an intermediate frame is lost, receiver discards all subsequent frames.',
            '<b>Single Retransmission Timer:</b> Sender maintains a timer for the oldest unacknowledged frame. On timeout, sender "goes back" and retransmits all unacknowledged frames in the current window.',
            '<b>Channel Efficiency (η):</b> <code>η = Ws / (1 + 2a)</code>, where <code>a = Tp / Tt</code> (propagation time / transmission time).'
          ]
        }
      ],
      conclusion: 'Go-Back-N drastically improves channel utilization over noisy high-bandwidth links compared to Stop-and-Wait, but wastes link bandwidth during high error rates due to bulk retransmissions.',
      markingScheme: [
        { component: 'Go-Back-N Principle & Window Constraints (Ws = 2ᵐ - 1, Wr = 1)', marks: '2.0' },
        { component: 'Sequence Number Ambiguity Proof', marks: '1.5' },
        { component: 'Neat Timing Ladder Diagram with Frame Loss & Recovery', marks: '2.0' },
        { component: 'Channel Efficiency Equation & Performance Analysis', marks: '1.5' }
      ],
      examTip: 'Examiners always look for the proof of why Ws = 2ᵐ - 1 (not 2ᵐ). Show the scenario where ACK is lost and the receiver cannot distinguish new frame 0 from old frame 0.'
    }
  },
  {
    id: 'cn-q31',
    num: 31,
    title: 'CRC Modulo-2 Division Numerical',
    unit: 3,
    verified: 'BEU 2024 · Q.3(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Evaluate the CRC for a frame/message 1101011011 and generator polynomial G(X) = X⁴ + X + 1. Find the transmitted codeword and verify at receiver.',
    solution: {
      verified: 'BEU 2024 · Q.3(b) · 7 Marks',
      intro: 'Cyclic Redundancy Check (CRC) is an algebraic error-detecting code based on polynomial modulo-2 arithmetic (where addition and subtraction are identical to bitwise XOR, without carries or borrows).',
      sections: [
        {
          heading: '1. Given Parameters & Generator Conversion',
          points: [
            '<b>Message:</b> <code>M = 1101011011</code> (k = 10 bits)',
            '<b>Generator Polynomial:</b> <code>G(X) = X⁴ + X + 1 = 1·X⁴ + 0·X³ + 0·X² + 1·X¹ + 1·X⁰</code>',
            '<b>Binary Divisor:</b> <code>G = 10011</code> (degree r = 4, length = 5 bits)',
            '<b>Appended Zeros:</b> Append r = 4 zeros to message: <code>Dividend = 11010110110000</code> (14 bits)'
          ]
        },
        {
          heading: '2. Step-by-Step Modulo-2 Binary Long Division',
          points: [
            '<b>Step 1:</b> First 5 bits: <code>11010 ⊕ 10011 = 01001</code>. Bring down next bit 1 → <code>10011</code>.',
            '<b>Step 2:</b> <code>10011 ⊕ 10011 = 00000</code>. Bring down next bit 1, 0, 1 → <code>10110</code>.',
            '<b>Step 3:</b> <code>10110 ⊕ 10011 = 00101</code>. Bring down next bit 1, 1 → <code>10100</code>.',
            '<b>Step 4:</b> <code>10100 ⊕ 10011 = 00111</code>. Bring down remaining 0 → <code>1110</code>.',
            '<b>Remainder (CRC):</b> <code>R = 1110</code> (4 bits).'
          ]
        }
      ],
      diagrams: [
        {
          title: 'Full Modulo-2 XOR Long Division Layout',
          ascii:
`Divisor: 10011 ) 11010110110000 ( Quotient: 1100010011
                 10011
                 -----
                  10011
                  10011
                  -----
                   0000010110
                        10011
                        -----
                         010100
                          10011
                          -----
                           01110  <--- CRC Remainder R = 1110`
        },
        {
          title: 'Sender to Receiver Verification Flow',
          ascii:
`[ SENDER ]                                        [ RECEIVER ]
Message: 1101011011                               Codeword: 11010110111110
Append r=4 zeros: 11010110110000                  Divide by G = 10011
Divide by 10011 -> Remainder R = 1110             Modulo-2 division gives:
Codeword T = M || R = 11010110111110 -----------> Remainder = 0000 (NO ERROR!)`
        }
      ],
      sections_extra: [
        {
          heading: '3. Codeword Formation & Receiver Verification',
          points: [
            '<b>Transmitted Codeword (T):</b> <code>T = Message || Remainder = 1101011011 || 1110 = 11010110111110</code> (14 bits).',
            '<b>Receiver Verification:</b> Receiver divides <code>11010110111110 ÷ 10011</code>. Since the remainder is strictly <code>0000</code>, the transmission is accepted as error-free.'
          ]
        }
      ],
      conclusion: 'The CRC checksum is 1110, resulting in the transmitted frame 11010110111110. The zero remainder at the receiver mathematically verifies correctness.',
      markingScheme: [
        { component: 'Polynomial to Binary Conversion (G = 10011, r = 4)', marks: '1.0' },
        { component: 'Appending 4 Zeros to Message (11010110110000)', marks: '0.5' },
        { component: 'Step-by-Step Modulo-2 Division Execution', marks: '3.0' },
        { component: 'Correct CRC Remainder (1110) & Codeword Construction', marks: '1.5' },
        { component: 'Receiver Verification (Remainder = 0000)', marks: '1.0' }
      ],
      examTip: 'Highlight the final CRC remainder 1110 and box the transmitted frame 11010110111110 clearly in your answer sheet.'
    }
  },
  {
    id: 'cn-q32',
    num: 32,
    title: 'Framing: Character Count, Byte Stuffing and Bit Stuffing',
    unit: 3,
    verified: 'BEU 2024 · Q.4(a) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Explain Framing in Data Link Layer. Differentiate between Character Count, Byte Stuffing, and Bit Stuffing with clear examples.',
    solution: {
      verified: 'BEU 2024 · Q.4(a) · 7 Marks',
      intro: 'Framing is the Data Link Layer process of encapsulating physical layer bit streams into distinct, recognizable units called frames by marking boundaries between consecutive frames.',
      diagrams: [
        {
          title: 'Framing Techniques Comparison',
          ascii:
`1. CHARACTER COUNT: [ 5 | A | B | C | D ] [ 3 | E | F ] (Count includes itself)
   (Flaw: If count '5' corrupts to '7', framing synchronization is lost permanently!)

2. BYTE STUFFING:   [ FLAG | Payload: D | ESC | FLAG | ESC | ESC | E | FLAG ]
   (ESC inserted before any accidental FLAG or ESC byte in payload)

3. BIT STUFFING:    01111110 [ 011011111(0)1011111(0)00 ] 01111110
   (Sender inserts '0' after five consecutive '1's; receiver removes it)`
        }
      ],
      sections: [
        {
          heading: '1. Detailed Framing Methods',
          points: [
            '<b>Character Count:</b> Uses a field in the frame header to specify the total number of characters in the frame. Fatal weakness: A single-bit transmission error in the count field de-synchronizes all subsequent frames.',
            '<b>Byte Stuffing (Character-Oriented):</b> Uses dedicated delimiter flag bytes (e.g., DLE STX / DLE ETX or 0x7E). Whenever a flag byte appears naturally in user data, sender prefixes it with an Escape character (ESC). Receiver strips ESC.',
            '<b>Bit Stuffing (Bit-Oriented, HDLC):</b> Delineates frames with unique flag sequence <code>01111110</code> (0x7E). Sender hardware automatically injects a "0" bit after every sequence of five consecutive "1"s in the payload. Receiver detects five 1s followed by 0 and destuffs the 0.'
          ]
        },
        {
          heading: '2. Worked Bit Stuffing Numerical Example',
          points: [
            'Input Data Stream: <code>01101111111010111110</code>',
            'Sender Process: After first five 1s, inject 0: <code>011011111(0)1101011111(0)0</code>',
            'Transmitted Frame: <code>01111110 0110111110110101111100 01111110</code>',
            'Receiver Process: Detects 111110 and removes stuffed 0, restoring exact original bit stream.'
          ]
        }
      ],
      conclusion: 'Bit stuffing is universally preferred in modern synchronous protocols (HDLC, PPP) because it is independent of character codes and operates efficiently at the hardware layer.',
      markingScheme: [
        { component: 'Framing Definition & Synchronization Role', marks: '1.0' },
        { component: 'Character Count Explanation & Synchronization Vulnerability', marks: '1.5' },
        { component: 'Byte Stuffing Explanation with ESC Mechanism', marks: '2.0' },
        { component: 'Bit Stuffing Rule (5 ones -> stuff 0) & Worked Example', marks: '2.0' },
        { component: 'Comparison & Conclusion', marks: '0.5' }
      ],
      examTip: 'Demonstrate bit stuffing with a clear binary string containing six 1s (01111110). Show how the inserted 0 prevents false flag detection.'
    }
  },
  {
    id: 'cn-q33',
    num: 33,
    title: 'Delay of Pure ALOHA vs Slotted ALOHA at Low Load',
    unit: 3,
    verified: 'BEU 2024 · Q.4(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Consider the delay of Pure ALOHA versus Slotted ALOHA at low load. Which one is less? Explain with throughput and timing analysis.',
    solution: {
      verified: 'BEU 2024 · Q.4(b) · 7 Marks',
      intro: 'In Random Access Medium Access Control (MAC) protocols, ALOHA allows multiple stations to share a single channel. While Slotted ALOHA doubles maximum throughput, its delay characteristics at light network load differ counter-intuitively.',
      diagrams: [
        {
          title: 'Low-Load Transmission Delay: Pure ALOHA vs Slotted ALOHA',
          ascii:
`[ PURE ALOHA: Immediate Transmission ]
Packet arrives at t0 --------> [ Frame Transmitted Immediately ]
Initial Delay = Tfr (Transmission Time only!)

[ SLOTTED ALOHA: Must Synchronize to Slot Boundary ]
Slot boundary                  Slot boundary                  Slot boundary
      |                              |                              |
      |     Packet arrives at t0     |                              |
      |     [ Wait for boundary ]    |=== Frame Transmitted =======>|
      |<---------- wait ----------->|<----------- Tfr ------------->|
Initial Delay = Average (Tfr / 2) + Tfr = 1.5 * Tfr!`
        }
      ],
      sections: [
        {
          heading: '1. Mathematical Throughput Equations',
          points: [
            '<b>Pure ALOHA:</b> Vulnerable period = <code>2 × Tfr</code>. Throughput: <code>S = G × e⁻²ᴳ</code>. Maximum throughput = <code>18.4%</code> at G = 0.5.',
            '<b>Slotted ALOHA:</b> Vulnerable period = <code>1 × Tfr</code>. Throughput: <code>S = G × e⁻ᴳ</code>. Maximum throughput = <code>36.8%</code> at G = 1.0.'
          ]
        },
        {
          heading: '2. Rigorous Delay Analysis at Low Load (G → 0)',
          points: [
            'At very low traffic load (G → 0), collision probability is virtually zero (<code>P_coll ≈ 0</code>). Almost every packet transmits successfully on its first attempt without retransmissions.',
            '<b>Pure ALOHA Delay:</b> Transmits instantly when generated. Delay = <code>Tfr</code>.',
            '<b>Slotted ALOHA Delay:</b> Must wait for the beginning of the next synchronized slot. Uniform arrival distribution gives average slot wait of <code>Tfr / 2</code>. Total Delay = <code>Tfr / 2 + Tfr = 1.5 × Tfr</code>.',
            '<b>Conclusion:</b> Pure ALOHA has LESS delay at low load (1.0 Tfr vs 1.5 Tfr).'
          ]
        }
      ],
      conclusion: 'At low network load, Pure ALOHA experiences 33% less delay than Slotted ALOHA because it transmits immediately without waiting for slot boundaries.',
      markingScheme: [
        { component: 'Pure vs Slotted ALOHA Definitions & Vulnerable Times', marks: '1.5' },
        { component: 'Throughput Formulas (S = G·e⁻²ᴳ and S = G·e⁻ᴳ)', marks: '1.5' },
        { component: 'Mathematical Delay Derivation at G → 0', marks: '2.0' },
        { component: 'Comparative Timing Diagram (Immediate vs Slot Alignment)', marks: '1.5' },
        { component: 'Final Definitive Answer (Pure ALOHA has less delay)', marks: '0.5' }
      ],
      examTip: 'Many students wrongly answer Slotted ALOHA because its maximum throughput is higher. Be precise: the question specifically asks about DELAY at LOW LOAD, where Pure ALOHA wins!'
    }
  },
  {
    id: 'cn-q46',
    num: 46,
    title: 'CSMA/CA Protocol with Flowchart',
    unit: 3,
    verified: 'BEU 2023 · Q.8(a) · 4 Marks',
    years: [2023],
    marks: 4,
    question: 'Discuss CSMA/CA with the help of a flowchart.',
    solution: {
      verified: 'BEU 2023 · Q.8(a) · 4 Marks',
      intro: 'Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) is the primary channel access protocol for wireless IEEE 802.11 networks. It actively avoids collisions because wireless transceivers cannot detect collisions while transmitting.',
      diagrams: [
        {
          title: 'CSMA/CA Complete Execution Flowchart',
          ascii:
`       [ Start: Frame to Send ]
                  |
                  v
       < Sense Channel Idle? > <-----------+
            /           \\                   |
          Yes            No                 |
          /               \\                 |
         v                 v                |
  [ Wait DIFS time ]   [ Wait until idle ]  |
         |                     |            |
  < Still Idle? >              v            |
      /     \\           [ Wait DIFS ]       |
    Yes      No                |            |
    /         \\                v            |
   v           v        [ Set Random ]      |
[ Send Frame ]  +-----> [ Backoff Timer]    |
       |                       |            |
  < ACK Received? >     [ Count down timer ]|
       /     \\          [ while channel idle|
     Yes      No               |            |
     /         \\               v            |
    v           v       < Timer == 0? >     |
[ Success ]  < Exceeded Max? > /            |
                 /         \\  Yes           |
               Yes          No              |
               /             \\              |
              v               +-------------+
        [ Abort / Fail ]`
        }
      ],
      sections: [
        {
          heading: '1. Core Inter-Frame Spacings & Protocol Steps',
          points: [
            '<b>DIFS (Distributed Inter-Frame Space):</b> Mandatory idle period before initiating contention.',
            '<b>Binary Exponential Backoff:</b> Selects random slot in contention window <code>[0, 2ⁿ - 1]</code> to stagger competing stations.',
            '<b>RTS/CTS Handshake:</b> Sender sends Request to Send (RTS); Access Point responds with Clear to Send (CTS), announcing NAV duration to all nearby stations.',
            '<b>SIFS (Short Inter-Frame Space):</b> Ultra-short delay between DATA and immediate ACK response.'
          ]
        }
      ],
      conclusion: 'CSMA/CA minimizes wireless collisions through proactive avoidance, carrier sensing, random backoff timers, and explicit link-layer acknowledgments.',
      markingScheme: [
        { component: 'CSMA/CA Principle & Wireless Need', marks: '1.0' },
        { component: 'Complete Labelled Flowchart (DIFS, Backoff, ACK)', marks: '2.0' },
        { component: 'Inter-Frame Spacings Explanation (DIFS, SIFS, Backoff)', marks: '1.0' }
      ],
      examTip: 'Draw the decision diamond for DIFS sensing and include the exponential backoff decrement loop for full marks.'
    }
  },
  {
    id: 'cn-q47',
    num: 47,
    title: 'Why CSMA/CD Is Not Implemented in WLAN',
    unit: 3,
    verified: 'BEU 2023 · Q.8(b) · 3 Marks',
    years: [2023],
    marks: 3,
    question: 'Why CSMA/CD is not implemented in WLAN?',
    solution: {
      verified: 'BEU 2023 · Q.8(b) · 3 Marks',
      intro: 'CSMA/CD (Carrier Sense Multiple Access with Collision Detection), while highly effective in wired Ethernet, cannot be implemented in IEEE 802.11 Wireless Local Area Networks due to fundamental physical and hardware limitations.',
      diagrams: [
        {
          title: 'Hidden Terminal Problem & Severe Wireless Signal Attenuation',
          ascii:
`[ 1. SIGNAL ATTENUATION DROWNS OUT COLLISION ]
Local Tx Power = +20 dBm (100 mW) ======> Local Receiver Antenna
Incoming Collision Signal = -80 dBm (0.00001 mW) (Drowned out by Tx signal!)

[ 2. HIDDEN TERMINAL PROBLEM ]
Station A <--- Range A ---> Station B <--- Range C ---> Station C
  (Transmitting)              (Collision!)                (Transmitting)
• A cannot sense C transmitting because C is outside A's radio range!
• Carrier sensing at A reports channel IDLE, causing collision at B!`
        }
      ],
      sections: [
        {
          heading: '1. The Three Primary Technical Reasons',
          points: [
            '<b>1. Huge Dynamic Range (Severe Signal Attenuation):</b> A transmitting antenna emits high power (e.g., 100 mW). The received signal from another transmitting node has attenuated by <code>10⁵ to 10⁸</code> times (inverse-square law). Transmit energy overwhelms receive hardware, masking any collision.',
            '<b>2. Hidden Terminal Problem:</b> Two wireless stations out of radio range of each other (hidden) both sense the medium as idle and transmit simultaneously to a mutual intermediate station, causing a collision that neither sender can detect.',
            '<b>3. Half-Duplex Hardware Cost:</b> Full-duplex wireless hardware requires expensive circulators and echo-cancellation circuits that are commercially impractical for low-cost consumer Wi-Fi.'
          ]
        }
      ],
      conclusion: 'Because wireless stations cannot detect collisions during active transmission, 802.11 WLANs discard Collision Detection (CSMA/CD) in favor of Collision Avoidance (CSMA/CA).',
      markingScheme: [
        { component: 'Signal Attenuation / Power Discrepancy Reason', marks: '1.0' },
        { component: 'Hidden Terminal Problem with Diagram', marks: '1.0' },
        { component: 'Half-Duplex Hardware Constraint & Conclusion', marks: '1.0' }
      ],
      examTip: 'Mention both the Signal Attenuation factor (Tx power >> Rx power) and the Hidden Terminal Problem to get all 3 marks.'
    }
  },
  {
    id: 'cn-q48',
    num: 48,
    title: 'Stop-and-Wait ACK Numbering & IEEE 802.3 Padding',
    unit: 3,
    verified: 'BEU 2023 · Q.8(c) & Q.8(d) · 4 + 3 = 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Explain why Stop-and-Wait protocol requires acknowledgement numbering. Discuss IEEE 802.3 Ethernet frame format and minimum payload padding.',
    solution: {
      verified: 'BEU 2023 · Q.8(c) & Q.8(d) · 4 + 3 = 7 Marks',
      intro: 'This answer addresses two core Data Link Layer concepts: the mathematical necessity of sequence numbers in Stop-and-Wait ARQ and the architectural structure of IEEE 802.3 Ethernet frames.',
      diagrams: [
        {
          title: 'Duplicate Frame Ambiguity When ACKs Lack Numbering',
          ascii:
`SENDER                                                 RECEIVER
  |--- Frame 0 ----------------------------------------->| (Delivered)
  |<-- ACK (Unnumbered ACK LOST in network!) ----------X |
  | [Timer Expires!]                                     |
  |--- Frame 0 (Retransmission) ------------------------>| (Duplicate!)
  |                                                      | Without sequence numbers,
  |                                                      | receiver cannot know if
  |                                                      | this is new frame or duplicate!`
        },
        {
          title: 'IEEE 802.3 Ethernet Frame Format (Minimum 64 Bytes)',
          ascii:
`+----------+-----+----------+----------+--------+----------------+-------+
| Preamble | SFD | Dest MAC | Src MAC  | Length | Data Payload   |  FCS  |
|  7 Bytes | 1 B | 6 Bytes  | 6 Bytes  | 2 Bytes| 46 - 1500 B    |  4 B  |
+----------+-----+----------+----------+--------+----------------+-------+
<----------------- MAC Frame (64 to 1518 Bytes) ------------------------->`
        }
      ],
      sections: [
        {
          heading: '1. Why Stop-and-Wait Requires ACK Numbering (Q.8c · 4 Marks)',
          points: [
            'If an ACK is delayed or lost, sender times out and retransmits the frame.',
            'Without 1-bit sequence numbers (0 and 1), the receiver cannot determine whether the incoming frame is a duplicate or the next sequential frame.',
            '1-bit sequence numbering (modulo-2: 0, 1) is both necessary and sufficient to prevent undetected duplicates.'
          ]
        },
        {
          heading: '2. IEEE 802.3 Ethernet Header & Padding (Q.8d · 3 Marks)',
          points: [
            '<b>Header Fields:</b> Preamble (7B), Start of Frame Delimiter (1B), Destination MAC (6B), Source MAC (6B), Length/Type (2B), FCS/CRC-32 (4B). Total overhead = 18 bytes.',
            '<b>Minimum Frame Size:</b> Ethernet requires minimum 64-byte frame size for CSMA/CD collision detection: <code>64 - 18 = 46 bytes</code> minimum payload.',
            '<b>Padding Rule:</b> If user payload is less than 46 bytes, padding bytes (zeros) must be added: <code>Padding = 46 - Payload</code>. Example: A 20-byte payload requires <code>46 - 20 = 26 bytes</code> of padding.'
          ]
        }
      ],
      conclusion: 'Stop-and-Wait requires 1-bit sequence numbering to prevent duplicate deliveries, and Ethernet mandates 46-byte minimum payload padding to guarantee reliable CSMA/CD collision detection.',
      markingScheme: [
        { component: 'Lost ACK Duplicate Ambiguity Proof (Q.8c)', marks: '2.0' },
        { component: '1-Bit Numbering Sufficiency Derivation (Q.8c)', marks: '2.0' },
        { component: 'IEEE 802.3 Header Structure & Fields (Q.8d)', marks: '1.5' },
        { component: 'Minimum Frame Size (64B) & Padding Calculation (Q.8d)', marks: '1.5' }
      ],
      examTip: 'State the padding formula clearly: Padding = 46 - Payload Length. For a 20-byte payload, state: 26 bytes of padding are added.'
    }
  },
  {
    id: 'cn-q20',
    num: 20,
    title: 'Hamming Code Error Detection & Correction Numerical',
    unit: 3,
    verified: 'BEU 2022 · Q.4(b) · 7 Marks',
    years: [2022],
    marks: 7,
    question: 'Explain Hamming Code error detection and correction. For data word 1011, construct the 7-bit Hamming code using even parity. Show error correction if bit 6 is corrupted.',
    solution: {
      verified: 'BEU 2022 · Q.4(b) · 7 Marks',
      intro: 'Hamming Code, developed by Richard Hamming, is a linear block error-correcting code that detects and corrects single-bit transmission errors by calculating redundant parity bits located at powers-of-two bit positions (1, 2, 4, 8...).',
      diagrams: [
        {
          title: '7-Bit Hamming Code Position Grid (Powers of 2 = Parity)',
          ascii:
`Bit Position:   7     6     5     4     3     2     1
Bit Type:      D7    D6    D5    P4    D3    P2    P1
Given Data:     1     0     1     ?     1     ?     ?
Binary Pos:   111   110   101   100   011   010   001
Parity P1:     *           *           *           *  (LSB = 1: bits 1,3,5,7)
Parity P2:     *     *                 *     *        (2nd bit = 1: bits 2,3,6,7)
Parity P4:     *     *     *     *                    (3rd bit = 1: bits 4,5,6,7)`
        }
      ],
      sections: [
        {
          heading: '1. Step-by-Step Codeword Construction',
          points: [
            '<b>Data Word:</b> <code>D = 1011</code> (4 bits: D7=1, D6=0, D5=1, D3=1).',
            '<b>Parity Bit P1:</b> Checks bit positions with LSB 1 (1, 3, 5, 7):<br><code>P1 ⊕ D3 ⊕ D5 ⊕ D7 = 0 ⇒ P1 ⊕ 1 ⊕ 1 ⊕ 1 = 0 ⇒ P1 ⊕ 1 = 0 ⇒ P1 = 1</code>.',
            '<b>Parity Bit P2:</b> Checks bit positions with 2nd bit 1 (2, 3, 6, 7):<br><code>P2 ⊕ D3 ⊕ D6 ⊕ D7 = 0 ⇒ P2 ⊕ 1 ⊕ 0 ⊕ 1 = 0 ⇒ P2 ⊕ 0 = 0 ⇒ P2 = 0</code>.',
            '<b>Parity Bit P4:</b> Checks bit positions with 3rd bit 1 (4, 5, 6, 7):<br><code>P4 ⊕ D5 ⊕ D6 ⊕ D7 = 0 ⇒ P4 ⊕ 1 ⊕ 0 ⊕ 1 = 0 ⇒ P4 ⊕ 0 = 0 ⇒ P4 = 0</code>.',
            '<b>Transmitted 7-Bit Codeword:</b> <code>[D7 D6 D5 P4 D3 P2 P1] = [1 0 1 0 1 0 1]</code>.'
          ]
        },
        {
          heading: '2. Error Detection & Correction Demonstration',
          points: [
            '<b>Transmission Error:</b> Suppose bit position 6 flips from 0 to 1 during transit.<br>Received Codeword: <code>[1 1 1 0 1 0 1]</code>.',
            '<b>Syndrome Bit S1:</b> <code>b1 ⊕ b3 ⊕ b5 ⊕ b7 = 1 ⊕ 1 ⊕ 1 ⊕ 1 = 0</code>.',
            '<b>Syndrome Bit S2:</b> <code>b2 ⊕ b3 ⊕ b6 ⊕ b7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1</code>.',
            '<b>Syndrome Bit S4:</b> <code>b4 ⊕ b5 ⊕ b6 ⊕ b7 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1</code>.',
            '<b>Syndrome Word:</b> <code>S = S4 S2 S1 = 110₂ = 6₁₀</code>!',
            '<b>Correction:</b> Syndrome 6 explicitly identifies bit 6 as the corrupted bit. Inverting bit 6 restores original codeword <code>1010101</code>.'
          ]
        }
      ],
      conclusion: 'The 7-bit Hamming code for 1011 is 1010101. When bit 6 is corrupted, syndrome S = 110 (decimal 6) accurately pinpoints and corrects the faulty bit.',
      markingScheme: [
        { component: 'Hamming Code Redundancy Equation (2ʳ ≥ m + r + 1)', marks: '1.0' },
        { component: 'Parity Bit Position Grid & Assignment', marks: '1.5' },
        { component: 'Parity Bit Calculations (P1=1, P2=0, P4=0)', marks: '2.0' },
        { component: 'Codeword Formation (1010101)', marks: '0.5' },
        { component: 'Syndrome Calculation (S = 110 = 6) & Correction Proof', marks: '2.0' }
      ],
      examTip: 'Write out the binary positions (1=001, 2=010, 3=011, 4=100, 5=101, 6=110, 7=111). It shows the examiner you understand the parity grouping instantly.'
    }
  },
  {
    id: 'cn-q8',
    num: 8,
    title: 'CSMA/CD Protocol & Minimum Frame Size Derivation',
    unit: 3,
    verified: 'BEU 2023 · Q.3(a) · 7 Marks',
    years: [2023, 2026],
    marks: 7,
    question: 'Explain the CSMA/CD protocol. Derive the condition for the minimum frame size required for collision detection.',
    solution: {
      verified: 'BEU 2023 · Q.3(a) · 7 Marks',
      intro: 'CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is the media access control mechanism used in traditional shared Ethernet. Stations listen before transmitting and listen while transmitting to abort corrupted transmissions immediately.',
      diagrams: [
        {
          title: 'Worst-Case Collision Scenario Timing Ladder (Round Trip Time = 2 * Tp)',
          ascii:
`Station A (Left end)                           Station B (Right end)
   |                                              |
t=0|=== Transmits Frame =========================>|
   |                                              | t = Tp - ε (B senses idle,
   |                                              |<-- B transmits, COLLISION!)
   |                                              |=== Collision Jam signal ===>
t=2*Tp-ε|<== Collision signal arrives at A =======|
   v                                              v
Station A MUST still be transmitting at t = 2*Tp to detect this collision!`
        }
      ],
      sections: [
        {
          heading: '1. Mathematical Derivation of Minimum Frame Size',
          points: [
            'Let distance between farthest stations be d, propagation speed be v.',
            'Propagation Delay: <code>Tp = d / v</code>.',
            'Transmission Delay of frame of length L bits at data rate R bps: <code>Tt = L / R</code>.',
            '<b>Worst-Case Scenario:</b> Station A transmits at t = 0. Just before the frame reaches Station B at <code>t = Tp - ε</code>, Station B senses medium idle and transmits. A collision occurs near B.',
            'The collision signal propagates back to Station A, arriving at <code>t = 2 × Tp</code>.',
            'To detect the collision, Station A must still be actively transmitting when the collision fragment returns: <br><code>Tt ≥ 2 × Tp</code>',
            'Substitute <code>Tt = L_min / R</code>:<br><code>L_min / R ≥ 2 × Tp  ⇒  L_min ≥ 2 × R × Tp</code>.'
          ]
        },
        {
          heading: '2. Numerical Application to Standard 10 Mbps Ethernet',
          points: [
            'For classical Ethernet: <code>R = 10 Mbps</code>, <code>2 × Tp = 51.2 μs</code> (Slot Time).',
            '<code>L_min = 10 × 10⁶ bps × 51.2 × 10⁻⁶ s = 512 bits = 64 Bytes</code>.',
            'This is the origin of Ethernet’s fundamental 64-byte minimum frame size!'
          ]
        }
      ],
      conclusion: 'The condition L_min ≥ 2·R·Tp guarantees that a transmitting station detects collisions before completing transmission, establishing the classic 64-byte Ethernet standard.',
      markingScheme: [
        { component: 'CSMA/CD Operating Principle (Listen before & during Tx)', marks: '1.5' },
        { component: 'Worst-Case Collision Scenario Timing Diagram', marks: '2.0' },
        { component: 'Mathematical Derivation of L_min ≥ 2·R·Tp', marks: '2.5' },
        { component: 'Application to 10 Mbps Ethernet (64 Bytes)', marks: '1.0' }
      ],
      examTip: 'Show both steps: t = Tp - ε for collision near B, and t = 2·Tp for collision echo reaching A. Never skip the substitution of Tt = L/R.'
    }
  }
,
  {
    id: 'cn-q49',
    num: 49,
    title: 'CRC Modulo-2 Division (Bit Sequence 1010011110, Divisor 1011)',
    unit: 3,
    verified: 'BEU 2023 · Q.2(b) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Given a 10-bit sequence 1010011110 and a divisor 1011. Find the CRC. Check your answer.',
    solution: {
      verified: 'BEU 2023 · Q.2(b) · 7 Marks',
      intro: 'Cyclic Redundancy Check (CRC) is an error-detection technique operating at the Data Link Layer. Binary datawords are treated as algebraic polynomials over Galois Field GF(2). Error detection is achieved through modulo-2 polynomial long division using a predefined generator polynomial. The sender computes a remainder and appends it to the dataword; the receiver performs identical modulo-2 division, where a zero remainder confirms error-free transmission.',
      diagrams: [
        {
          title: 'Complete CRC Transmission Architecture: Sender Generation & Receiver Verification',
          ascii:
`                    SENDER GENERATION PROCESS
                               |
                               v
                     Original 10-Bit Dataword
                         D = 1010011110
                               |
                               v
               Append r = 3 Zeros (Augmented Dividend)
                         1010011110 000
                               |
                               v
              Modulo-2 Division by Divisor G = 1011
                               |
                               v
                     3-Bit Remainder R = 001
                               |
                               v
                 Transmitted Codeword T = D || R
                         1010011110 001
                               |
                               v
                     COMMUNICATION CHANNEL
                               |
                               v
                   RECEIVER VERIFICATION PROCESS
                               |
                               v
                     Received 13-Bit Codeword
                         1010011110 001
                               |
                               v
              Modulo-2 Division by Same Divisor G = 1011
                               |
                               v
                     Remainder = 000 (ZERO)
                               |
                               v
             [ VERIFICATION SUCCESS: NO ERROR DETECTED ]`
        },
        {
          title: 'Sender Modulo-2 Division Trace (Bit-by-Bit XOR Alignment)',
          ascii:
`Dividend:   1 0 1 0 0 1 1 1 1 0 0 0 0    (10-bit data + 3 appended zeros)
Divisor:    1 0 1 1
-----------------------------------------
Step 1:     1 0 1 0 0 1 1 1 1 0 0 0 0
XOR @ 0:    1 0 1 1
            -------
            0 0 0 1 0 1 1 1 1 0 0 0 0
Step 2:           1 0 1 1
                  -------
            0 0 0 0 0 0 0 1 1 0 0 0 0
Step 3:                   1 0 1 1
                          -------
            0 0 0 0 0 0 0 0 1 1 1 0 0
Step 4:                     1 0 1 1
                            -------
            0 0 0 0 0 0 0 0 0 1 0 1 0
Step 5:                       1 0 1 1
                              -------
Remainder:  0 0 0 0 0 0 0 0 0 0 0 0 1  ==> Remainder R = 001`
        }
      ],
      sections: [
        {
          heading: '1. Given Parameters & Generator Degree Analysis',
          points: [
            '<b>Dataword (D):</b> <code>1010011110</code> (Length <code>k = 10 bits</code>).',
            '<b>Divisor / Generator (G):</b> <code>1011</code> (Length = 4 bits).',
            '<b>Polynomial Form:</b> <code>G(x) = 1·x³ + 0·x² + 1·x¹ + 1·x⁰ = x³ + x + 1</code>.',
            '<b>Generator Degree (r):</b> <code>r = 4 - 1 = 3 bits</code>.',
            '<b>Number of Appended Zeros:</b> Append exactly <code>r = 3</code> zeros to the dataword.',
            '<b>Augmented Dividend:</b> <code>1010011110 000</code> (Length = 13 bits).'
          ]
        },
        {
          heading: '2. Modulo-2 Arithmetic Rules',
          points: [
            'Modulo-2 arithmetic uses pure bitwise XOR (exclusive OR) operations without carrying or borrowing.',
            '<code>0 ⊕ 0 = 0</code>, <code>0 ⊕ 1 = 1</code>, <code>1 ⊕ 0 = 1</code>, <code>1 ⊕ 1 = 0</code>.',
            'Whenever the leftmost bit of the current working block is <code>1</code>, we perform XOR with <code>1011</code>; if the leftmost bit is <code>0</code>, we shift right until encountering a leading <code>1</code>.'
          ]
        },
        {
          heading: '3. Step-by-Step Modulo-2 Division Execution',
          points: [
            '<b>Initial Dividend:</b> <code>1010011110000</code>.',
            '<b>XOR 1 (at index 0):</b> <code>1010 ⊕ 1011 = 0001</code>. Bring down next bits to get <code>0001011</code>.',
            '<b>XOR 2 (at index 3):</b> Leading bit is at index 3. <code>1011 ⊕ 1011 = 0000</code>. Bring down next bits to get <code>00000001100</code>.',
            '<b>XOR 3 (at index 7):</b> Working group is <code>1100</code>. <code>1100 ⊕ 1011 = 0111</code>. Bring down next bit 0 to get <code>1110</code>.',
            '<b>XOR 4 (at index 8):</b> <code>1110 ⊕ 1011 = 0101</code>. Bring down next bit 0 to get <code>1010</code>.',
            '<b>XOR 5 (at index 9):</b> <code>1010 ⊕ 1011 = 0001</code>.',
            '<b>Final 3-Bit Remainder:</b> <code>R = 001</code>.'
          ]
        },
        {
          heading: '4. Codeword Construction & Verification (Check Your Answer)',
          points: [
            '<b>Transmitted Codeword (T):</b> Replace the 3 appended zeros with the 3-bit remainder: <code>T = D || R = 1010011110 001</code>.',
            '<b>Verification by Receiver Division:</b> Divide the received codeword <code>1010011110001</code> by generator <code>1011</code>:',
            '• XOR at index 0: <code>1010 ⊕ 1011 = 0001</code>',
            '• XOR at index 3: <code>1011 ⊕ 1011 = 0000</code>',
            '• XOR at index 7: <code>1100 ⊕ 1011 = 0111</code>',
            '• XOR at index 8: <code>1110 ⊕ 1011 = 0101</code>',
            '• XOR at index 9: <code>1011 ⊕ 1011 = 0000</code>',
            '<b>Final Verification Remainder:</b> <code>000</code> (Zero). Since remainder is zero, the received codeword is completely valid and free of detectable errors!'
          ]
        }
      ],
      table: {
        title: 'Step-by-Step XOR Division Trace Summary Table',
        headers: ['Division Step', 'Working Bit Position', 'Current Working Bits', 'Divisor XOR', 'Resulting Remainder Group'],
        rows: [
          ['Step 1', 'Bit 0 – 3', '1010', '1011', '0001 (Shift right by 3)'],
          ['Step 2', 'Bit 3 – 6', '1011', '1011', '0000 (Shift right by 4)'],
          ['Step 3', 'Bit 7 – 10', '1100', '1011', '0111 (Shift right by 1)'],
          ['Step 4', 'Bit 8 – 11', '1110', '1011', '0101 (Shift right by 1)'],
          ['Step 5', 'Bit 9 – 12', '1010', '1011', '0001 (Final 3-bit CRC)'],
          ['Result', 'Final Remainder', '—', '—', 'CRC = 001']
        ]
      },
      conclusion: 'For dataword D = 1010011110 and divisor G = 1011, the calculated CRC remainder is 001. The transmitted codeword is T = 1010011110001. Modulo-2 division of the transmitted codeword by divisor 1011 yields remainder 000, confirming complete mathematical correctness.',
      markingScheme: [
        { component: 'CRC Definition & Mathematical Foundation (GF(2) Modulo-2)', marks: '0.5' },
        { component: 'Generator Degree r = 3 & Augmented Dividend (1010011110000)', marks: '0.5' },
        { component: 'Appending 3 Zeros & Modulo-2 XOR Division Rules', marks: '1.0' },
        { component: 'Complete Modulo-2 Long Division Steps (Steps 1 to 5)', marks: '2.5' },
        { component: 'Correct CRC Remainder (R = 001)', marks: '0.5' },
        { component: 'Correct Transmitted Codeword (T = 1010011110001)', marks: '0.5' },
        { component: 'Receiver Verification by Long Division (Remainder = 000)', marks: '1.0' },
        { component: 'Conclusion & Summary', marks: '0.5' }
      ],
      examTip: 'Bhai, numerical mein CRC = 001 aur transmitted codeword = 1010011110001 dono likhna. Question mein "Check your answer" bhi diya hai, toh final remainder 000 dikhaye bina answer complete nahi maana jayega.'
    }
  },
  {
    id: 'cn-q51',
    num: 51,
    title: 'Pure ALOHA vs Slotted ALOHA: Average Delay, Throughput & Performance',
    unit: 3,
    verified: 'BEU 2023 · Q.4(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Find the expressions for average delay and throughput for both pure ALOHA and slotted ALOHA. Compare their performances as well.',
    solution: {
      verified: 'BEU 2023 · Q.4(a) · 7 Marks',
      intro: 'ALOHA is the foundational random-access Medium Access Control (MAC) protocol pioneered by Norman Abramson in 1970 at the University of Hawaii. In ALOHA, multiple distributed stations share a common broadcast channel. Collisions occur whenever two or more frame transmissions overlap in time. The two fundamental variants are Pure ALOHA (unconstrained transmission timing) and Slotted ALOHA (synchronized discrete time slots).',
      diagrams: [
        {
          title: 'Vulnerable Period Comparison: Pure ALOHA (2T) vs Slotted ALOHA (T)',
          ascii:
`[ PURE ALOHA: Vulnerable Period = 2T ]
Time: ----------(t - T)-------------------(t)-------------------(t + T)---------->
Frame A:          [================ Target Frame ===============]
Frame B:   [====== Overlap ======]
Frame C:                                             [====== Overlap ======]
Any frame starting in interval (t - T, t + T) collides! Vulnerable Window = 2 * T.

[ SLOTTED ALOHA: Vulnerable Period = T ]
Time:      |     Slot k - 1    |        Slot k         |       Slot k + 1     |
           |                   |                       |                      |
Station 1: |                   |  [===== Frame 1 =====]|                      |
Station 2: |                   |  [===== Frame 2 =====]|                      |
                                           ^
                                           | COLLISION!
Frames transmit ONLY at slot boundaries. Vulnerable Window = T (halved!).`
        },
        {
          title: 'Throughput S vs Offered Traffic Load G Characteristic Curves',
          ascii:
`Throughput S (Successful Frames / Frame Time)
0.40 +                                     Slotted ALOHA (Max S = 1/e ≈ 36.8% @ G=1)
     |                                          .-''''-.
0.35 +                                        .'        '.
0.30 +                                       /            \\
0.25 +                                      /              \\
0.20 +              Pure ALOHA             /                \\
     |          (Max S = 1/(2e)           /                  \\
0.15 +           ≈ 18.4% @ G=0.5)        /                    \\
     |                .---.             /                      \\
0.10 +              .'     '.          /                        \\
0.05 +             /         \\        /                          \\
0.00 +---+----+---/-----------\\------+----+----+----+----+----+----+----> Offered Load G
     0  0.2  0.4 0.5         1.0         1.5         2.0         2.5`
        }
      ],
      table: {
        title: 'Comprehensive Performance Comparison: Pure ALOHA vs Slotted ALOHA',
        headers: ['Performance Metric', 'Pure ALOHA Protocol', 'Slotted ALOHA Protocol'],
        rows: [
          ['Transmission Timing', 'Continuous; stations transmit anytime at will', 'Discrete; transmission only at beginning of synchronized slots'],
          ['Slot Synchronization', 'None required; completely uncoordinated', 'Global time synchronization required (GPS / central clock)'],
          ['Vulnerable Window', '2 × T (from t - T to t + T)', '1 × T (only within the designated slot)'],
          ['Probability of Success', 'P(0) = e^(-2G)', 'P(0) = e^(-G)'],
          ['Throughput Formula', 'S_Pure = G × e^(-2G)', 'S_Slotted = G × e^(-G)'],
          ['Maximum Throughput', 'S_max = 1 / (2e) ≈ 0.184 (18.4%)', 'S_max = 1 / e ≈ 0.368 (36.8%)'],
          ['Optimal Offered Load', 'G = 0.5 attempts / frame time', 'G = 1.0 attempt / slot'],
          ['Expected Attempts E[N]', 'E[N] = e^(2G)', 'E[N] = e^G'],
          ['Initial Delay at Low Load', 'Zero slot-alignment waiting delay', 'Average synchronization delay of T/2 before slot starts'],
          ['Delay Equation (Retry B)', 'D_Pure = T·e^(2G) + (e^(2G) - 1)·B_Pure', 'D_Slotted = T/2 + T·e^G + (e^G - 1)·B_Slotted'],
          ['Channel Utilization', 'Poor (wasted by frequent partial collisions)', 'Twice as efficient; collisions restricted to complete slots']
        ]
      },
      sections: [
        {
          heading: '1. Mathematical Derivations of Throughput',
          points: [
            '<b>Traffic Model:</b> Transmission attempts follow a Poisson distribution: <code>P(k) = (λ^k · e^(-λ)) / k!</code>, where G is the offered traffic per frame transmission time T.',
            '<b>Pure ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>2T</code> (a competing frame starting between t - T and t + T causes a collision).<br>• Average attempts in vulnerable period: <code>λ = 2G</code>.<br>• Probability of zero competing attempts: <code>P_success = P(0) = e^(-2G)</code>.<br>• Throughput: <code>S_Pure = G · P_success = G · e^(-2G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-2G) · (1 - 2G) = 0 ⇒ G = 0.5</code>.<br>• <code>S_max = 0.5 · e^(-1) = 1 / (2e) ≈ 0.184 (18.4%)</code>.',
            '<b>Slotted ALOHA Throughput Derivation:</b><br>• Vulnerable period is <code>T</code> (collisions occur only if two or more frames attempt transmission in the exact same time slot).<br>• Average attempts in slot: <code>λ = G</code>.<br>• Probability of successful transmission: <code>P_success = e^(-G)</code>.<br>• Throughput: <code>S_Slotted = G · e^(-G)</code>.<br>• Maximum Throughput: <code>dS/dG = e^(-G) · (1 - G) = 0 ⇒ G = 1.0</code>.<br>• <code>S_max = 1.0 · e^(-1) = 1 / e ≈ 0.368 (36.8%)</code>.<br>• <b>Throughput Ratio:</b> <code>S_max(Slotted) / S_max(Pure) = (1/e) / (1/(2e)) = 2.0</code>. Slotted ALOHA doubles the maximum capacity!'
          ]
        },
        {
          heading: '2. Average Delay Formulations',
          points: [
            '<b>Definition:</b> Average delay is the mean time elapsed from the instant a frame is generated until it is successfully delivered and acknowledged.',
            '<b>Transmission Attempts Model:</b> Since each transmission attempt succeeds independently with probability p, the number of attempts N follows a Geometric distribution: <code>E[N] = 1 / p</code>.',
            '<b>Pure ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-2G) ⇒ E[N] = e^(2G)</code>.<br>• Expected transmission-attempt time: <code>D_trans = T · e^(2G)</code>.<br>• With mean retransmission backoff B: <code>D_Pure = T · e^(2G) + (e^(2G) - 1) · B_Pure</code>.',
            '<b>Slotted ALOHA Attempts & Delay:</b><br>• Success probability <code>p = e^(-G) ⇒ E[N] = e^G</code>.<br>• Initial synchronization wait: If frame arrivals are uniformly distributed within a slot, the average waiting time until the next slot boundary is <code>T / 2</code>.<br>• Total delay with backoff B: <code>D_Slotted = T/2 + T · e^G + (e^G - 1) · B_Slotted</code>.'
          ]
        },
        {
          heading: '3. Numerical Comparison Example (G = 0.2, T = 1 ms)',
          points: [
            '<b>Given Parameters:</b> Offered load <code>G = 0.2</code>, Frame transmission time <code>T = 1.0 ms</code>.',
            '<b>Pure ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.4) = 0.2 · 0.67032 ≈ 0.1341 (13.41%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.4) ≈ 1.4918 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.4918 = 1.4918 ms</code>.',
            '<b>Slotted ALOHA:</b><br>• Throughput: <code>S = 0.2 · e^(-0.2) = 0.2 · 0.81873 ≈ 0.1637 (16.37%)</code>.<br>• Expected attempts: <code>E[N] = e^(0.2) ≈ 1.2214 attempts</code>.<br>• Transmission-attempt time: <code>1.0 ms × 1.2214 = 1.2214 ms</code>.<br>• Including initial slot wait: <code>0.5 ms + 1.2214 ms = 1.7214 ms</code>.<br>• <b>Key Insight:</b> At light load (G=0.2), Slotted ALOHA achieves higher throughput and fewer collisions, but its total initial latency is slightly higher due to waiting for the slot boundary.'
          ]
        }
      ],
      conclusion: 'Pure ALOHA permits unrestricted transmissions resulting in a 2T vulnerable window and maximum throughput of 18.4% at G=0.5. Slotted ALOHA enforces discrete slot boundaries, reducing the vulnerable period to T and doubling maximum throughput to 36.8% at G=1.0. While Slotted ALOHA dramatically reduces collisions, its end-to-end delay includes an initial T/2 slot-synchronization wait.',
      markingScheme: [
        { component: 'ALOHA Protocol Introduction & Poisson Traffic Assumptions', marks: '0.5' },
        { component: 'Pure ALOHA Vulnerable Window (2T) & Diagram', marks: '0.5' },
        { component: 'Pure ALOHA Throughput Derivation (S = G·e^(-2G))', marks: '1.0' },
        { component: 'Slotted ALOHA Vulnerable Window (T) & Diagram', marks: '0.5' },
        { component: 'Slotted ALOHA Throughput Derivation (S = G·e^(-G))', marks: '1.0' },
        { component: 'Maximum Throughput Calculations (18.4% vs 36.8%) & Derivation Steps', marks: '1.0' },
        { component: 'Average Delay Expressions & Geometric Retrial Model', marks: '1.0' },
        { component: 'Performance Comparison Table, Numerical Example & Conclusion', marks: '1.5' }
      ],
      examTip: 'Bhai, Q.4(a) mein sabse important results hain Pure ALOHA: G·e^(-2G), 18.4% aur Slotted ALOHA: G·e^(-G), 36.8%. Delay ke question mein retransmission assumptions explicitly likhna, kyunki throughput ke unlike delay ka ek universal formula nahi hota.'
    }
  },
  {
    id: 'cn-q53',
    num: 53,
    title: 'Proof of Maximum Window Size in Go-Back-N ARQ (2^m - 1)',
    unit: 3,
    verified: 'BEU 2023 · Q.7(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'In Go-Back-N ARQ show the window size should be 2^m - 1.',
    solution: {
      verified: 'BEU 2023 · Q.7(a) · 7 Marks',
      intro: 'Go-Back-N (GBN) Automatic Repeat reQuest is a sliding window flow and error control protocol operating at the Data Link and Transport layers. It allows the sender to transmit multiple outstanding frames before pausing for acknowledgements. Because sequence numbers are encoded in an m-bit header field, the total available sequence number space is finite and repeats cyclically modulo 2^m. To prevent catastrophic frame ambiguity and duplicate data acceptance after acknowledgement loss, the sender window size W_s must strictly satisfy W_s ≤ 2^m - 1.',
      diagrams: [
        {
          title: 'Unsafe Case (Ws = 2^m = 4 for m = 2): Catastrophic Duplicate Frame Delivery',
          ascii:
`SENDER (Window Ws = 4)                                   RECEIVER (Window Wr = 1)
Sequence Space: {0, 1, 2, 3}                             Expects Frame 0
   |                                                            |
   |========== Frame 0 ========================================>| Accept Frame 0 (Expects 1)
   |========== Frame 1 ========================================>| Accept Frame 1 (Expects 2)
   |========== Frame 2 ========================================>| Accept Frame 2 (Expects 3)
   |========== Frame 3 ========================================>| Accept Frame 3 (Expects 0!)
   |                                                            |   [Window WRAPS AROUND]
   |   <---- ACK 0, ACK 1, ACK 2, ACK 3 (ALL LOST!) ----- X     |
   |                                                            |
   | [TIMER EXPIRES for Frame 0]                                |
   |                                                            |
   |========== Frame 0 (RETRANSMISSION) =======================>|
   |                                                            | Receiver expects Frame 0!
   |                                                            | WRONGLY ACCEPTS old Frame 0
   |                                                            | as NEW Frame 0!
   v                                                            v
   [ FATAL AMBIGUITY: DUPLICATE DATA DELIVERED TO HIGHER LAYER ]`
        },
        {
          title: 'Safe Case (Ws = 2^m - 1 = 3 for m = 2): Correct Error Recovery',
          ascii:
`SENDER (Window Ws = 3)                                   RECEIVER (Window Wr = 1)
Sequence Space: {0, 1, 2, 3}                             Expects Frame 0
   |                                                            |
   |========== Frame 0 ========================================>| Accept Frame 0 (Expects 1)
   |========== Frame 1 ========================================>| Accept Frame 1 (Expects 2)
   |========== Frame 2 ========================================>| Accept Frame 2 (Expects 3!)
   |   [Sender window exhausted; cannot send Frame 3]           |
   |                                                            |
   |   <---- ACK 0, ACK 1, ACK 2 (ALL LOST!) ------------ X     |
   |                                                            |
   | [TIMER EXPIRES for Frame 0]                                |
   |                                                            |
   |========== Frame 0 (RETRANSMISSION) =======================>|
   |                                                            | Receiver expects Frame 3!
   |                                                            | Sees Frame 0 != 3.
   |                                                            | DISCARDS old Frame 0!
   |   <---- Re-sends Cumulative ACK 2 =========================| Re-sends ACK 2.
   v                                                            v
   [ COMPLETE PROTOCOL INTEGRITY PRESERVED: ZERO DUPLICATES ]`
        }
      ],
      table: {
        title: 'Sequence Number Space vs Maximum Sender Window Size in Sliding Window Protocols',
        headers: ['Sequence Bits (m)', 'Sequence Number Space (N = 2^m)', 'Max Go-Back-N Window (Ws = 2^m - 1)', 'Max Selective Repeat Window (Ws = 2^(m-1))'],
        rows: [
          ['m = 1 bit', '2  (0, 1)', '1  (Stop-and-Wait ARQ)', '1  (Stop-and-Wait)'],
          ['m = 2 bits', '4  (0, 1, 2, 3)', '3 frames', '2 frames'],
          ['m = 3 bits', '8  (0, 1, 2 ... 7)', '7 frames', '4 frames'],
          ['m = 4 bits', '16 (0, 1, 2 ... 15)', '15 frames', '8 frames'],
          ['m = 7 bits', '128 (HDLC / SDLC)', '127 frames', '64 frames'],
          ['m = 16 bits', '65,536 (TCP)', '65,535 bytes', '32,768 bytes']
        ]
      },
      sections: [
        {
          heading: '1. Mathematical Derivation of Sender Window Upper Bound',
          points: [
            '<b>Sequence Number Space:</b> An m-bit sequence number field provides <code>N = 2^m</code> distinct sequence identifiers: <code>{0, 1, 2, ..., 2^m - 1}</code>, which repeat cyclically modulo <code>2^m</code>.',
            '<b>Receiver Characteristics in Go-Back-N:</b> The receiver window size is strictly <code>W_r = 1</code>. The receiver accepts only the next sequentially expected frame with sequence number <code>R_next</code>. Out-of-order frames are silently discarded.',
            '<b>Condition for Unambiguous Decoding:</b> To avoid ambiguity between an initial transmission of a new frame and a retransmission of an old frame following sequence wraparound, the sum of sender and receiver window sizes must not exceed the total sequence number space: <br><code>W_s + W_r ≤ 2^m</code>.',
            '<b>Substituting Receiver Window W_r = 1:</b><br><code>W_s + 1 ≤ 2^m</code><br><code>W_s ≤ 2^m - 1</code>.',
            '<b>Conclusion:</b> Therefore, the maximum allowable sender window size in Go-Back-N ARQ is strictly: <br><code>W_(s, max) = 2^m - 1</code>.'
          ]
        },
        {
          heading: '2. Exhaustive Step-by-Step Proof by Counterexample (m = 2)',
          points: [
            'Let <code>m = 2</code> bits. The available sequence numbers are <code>{0, 1, 2, 3}</code> (total <code>N = 2² = 4</code>).',
            '<b>Case A: Suppose W_s = 2^m = 4 (Flawed Design):</b><br>1. Sender transmits frames 0, 1, 2, and 3.<br>2. Receiver receives all 4 frames in perfect order. Its internal expected variable advances: <code>0 → 1 → 2 → 3 → 0</code> (due to modulo 4 wraparound).<br>3. Receiver generates cumulative ACKs for all frames, but all ACKs are lost in transit.<br>4. Sender’s retransmission timer expires for Frame 0.<br>5. Sender retransmits the original Frame 0.<br>6. Receiver checks the arriving frame: it is expecting Frame 0! It cannot distinguish whether this Frame 0 is a new frame from the next generation or an old retransmitted frame.<br>7. Receiver wrongly accepts the duplicate frame and delivers duplicate data to the application layer. This breaks protocol correctness!',
            '<b>Case B: Suppose W_s = 2^m - 1 = 3 (Correct Design):</b><br>1. Sender transmits frames 0, 1, and 2. It is barred from sending Frame 3.<br>2. Receiver successfully receives frames 0, 1, and 2. Its expected sequence number advances to <code>3</code>.<br>3. All ACKs are lost; sender times out and retransmits Frame 0.<br>4. Receiver inspects the arriving frame: it is expecting Frame 3, but receives Frame 0.<br>5. Receiver immediately detects that Frame 0 is an old, already-accepted duplicate. It drops Frame 0 and retransmits ACK 2.<br>6. Sender receives ACK 2 and advances its window. No duplicate data is accepted!'
          ]
        },
        {
          heading: '3. Comparison with Selective Repeat ARQ Window Size',
          points: [
            'In Selective Repeat ARQ, both sender and receiver maintain sliding windows: <code>W_s = W_r</code>.',
            'Applying the general correctness theorem: <code>W_s + W_r ≤ 2^m ⇒ 2 · W_s ≤ 2^m ⇒ W_s ≤ 2^(m - 1)</code>.',
            'Thus, for <code>m = 2</code>: Go-Back-N allows <code>W_s = 3</code>, whereas Selective Repeat allows only <code>W_s = 2</code>.'
          ]
        }
      ],
      conclusion: 'In Go-Back-N ARQ, the maximum sender window size must be restricted to W_s = 2^m - 1. If W_s were equal to 2^m, an entire cycle of sequence numbers could be outstanding simultaneously; if all ACKs are lost, retransmitted old frames would coincide with the wrapped-around expected sequence number, causing fatal duplicate data delivery.',
      markingScheme: [
        { component: 'Introduction to Go-Back-N ARQ & Sliding Window Concept', marks: '0.5' },
        { component: 'Sequence Number Space Derivation (N = 2^m, Modulo Arithmetic)', marks: '1.0' },
        { component: 'Receiver Window Characteristics (Wr = 1, In-Order Acceptance)', marks: '0.5' },
        { component: 'Mathematical Derivation (Ws + Wr ≤ 2^m ⇒ Ws ≤ 2^m - 1)', marks: '1.5' },
        { component: 'Detailed Failure Trace for Ws = 2^m (m=2) with Duplicate Acceptance', marks: '1.5' },
        { component: 'Safe Operational Trace for Ws = 2^m - 1 (m=2) with Correct Discarding', marks: '1.0' },
        { component: 'Conclusion & Comparison with Selective Repeat (Ws = 2^(m-1))', marks: '1.0' }
      ],
      examTip: 'Bhai, ye proof-based question hai. Sirf formula 2^m - 1 likhna enough nahi. ACK lost + sequence wraparound + duplicate frame accepted wala case diagram ke saath explain karna. Yehi actual reason hai window size ko restrict karne ka.'
    }
  },
  {
    id: 'cn-q55',
    num: 55,
    title: 'Ethernet Standards (IEEE 802.3) and Cable Types (UTP, Coaxial, Optical Fiber)',
    unit: 3,
    verified: 'BEU 2022 · Q.3 · 14 Marks',
    years: [2022],
    marks: 14,
    question: 'What do you mean by the term ethernet? What are the types of cable commonly used for ethernet?',
    solution: {
      verified: 'BEU 2022 · Q.3 · 14 Marks',
      intro: 'Ethernet is the predominant wired local area network (LAN) technology globally, standardized under the IEEE 802.3 working group. First developed at Xerox PARC by Robert Metcalfe in 1973, Ethernet defines physical layer cabling, signaling specifications, data link layer framing, and medium access control. Modern Ethernet has evolved from shared coaxial bus networks running at 10 Mbps to dedicated, full-duplex switched networks operating at 1 Gbps, 10 Gbps, 100 Gbps, and beyond over copper and optical fiber.',
      diagrams: [
        {
          title: 'Modern Switched Ethernet Architecture vs Legacy Shared Coaxial Bus',
          ascii:
`[ MODERN SWITCHED ETHERNET: STAR TOPOLOGY (Full Duplex, Point-to-Point) ]
                   +---------------------------+
                   |   LAYER 2 ETHERNET SWITCH |
                   +---------------------------+
                    /            |            \\
       1 Gbps UTP  /   10 Gbps   |   1 Gbps    \\  10 Gbps Fiber
                  /     Fiber    |      UTP     \\
             +------+         +------+         +------+
             | Host |         | Server|        | Host |
             |  A   |         | Farm |         |  C   |
             +------+         +------+         +------+
Each port has dedicated bandwidth; collision domains isolated; simultaneous Tx/Rx.

[ LEGACY SHARED ETHERNET: BUS TOPOLOGY (Half Duplex, CSMA/CD) ]
50Ω Terminator                                                   50Ω Terminator
      |                                                                 |
      +==========[10BASE5 Thicknet / 10BASE2 Thinnet Coaxial]===========+
                 |                           |
             Vampire Tap                BNC T-Connector
                 |                           |
              [Host A]                    [Host B]`
        },
        {
          title: 'Standard IEEE 802.3 Ethernet MAC Frame Structure (64 to 1518 Bytes)',
          ascii:
`+------------+--------+------------+------------+-----------+---------------+----------+
|  PREAMBLE  |  SFD   |  DEST MAC  | SOURCE MAC |TYPE/LENGTH| DATA PAYLOAD  |   FCS    |
|  7 Bytes   | 1 Byte |  6 Bytes   |  6 Bytes   |  2 Bytes  | 46-1500 Bytes | 4 Bytes  |
+------------+--------+------------+------------+-----------+---------------+----------+
|<-- Physical Sync -->|<----------------- MAC Frame (64 to 1518 Bytes) ------------------>|
• Preamble (7B): Alternating 10101010 pattern for clock synchronization.
• Start Frame Delimiter (1B): 10101011 pattern indicating payload arrival.
• MAC Addresses (6B each): 48-bit hardware identifiers (e.g., 00:1A:2B:3C:4D:5E).
• Type/Length (2B): Values ≥ 1536 indicate EtherType (0x0800 for IPv4, 0x86DD for IPv6).
• Data Payload: 46 to 1500 bytes (padded with zeros if payload < 46 bytes).
• Frame Check Sequence (4B): CRC-32 cyclic redundancy check for error detection.`
        }
      ],
      table: {
        title: 'Comprehensive Engineering Comparison: Ethernet Transmission Media',
        headers: ['Specification Parameter', 'Twisted-Pair Copper (UTP/STP)', 'Coaxial Cable (Legacy)', 'Optical Fiber (Single/Multimode)'],
        rows: [
          ['Physical Medium', 'Twisted insulated copper pairs (Cat 5e/6/6A/8)', 'Solid central copper wire with braided outer shield', 'Silica glass core & cladding (9 µm / 50 µm)'],
          ['Signal Carried', 'Differential electrical voltages', 'Single-ended radio frequency electrical signal', 'Optical light pulses (LED / Laser diodes)'],
          ['Common Standards', '100BASE-TX, 1000BASE-T, 10GBASE-T', '10BASE5 (Thicknet), 10BASE2 (Thinnet)', '1000BASE-SX/LX, 10GBASE-SR/LR, 100GBASE-SR4'],
          ['Maximum Segment Distance', '100 meters (channel limit)', '500 m (10BASE5), 185 m (10BASE2)', '550 m (Multimode), 10 km to 80 km (Single-mode)'],
          ['Data Rate Capability', '10 Mbps up to 10 Gbps (Cat 6A) / 40 Gbps (Cat 8)', '10 Mbps (historic maximum on baseband coax)', '1 Gbps to 400 Gbps+ (terabit DWDM backbones)'],
          ['EMI / Crosstalk Immunity', 'Moderate; twists cancel noise; shielding (STP) helps', 'High shielding against external interference', '100% immune to electromagnetic fields and lightning'],
          ['Connector Type', 'RJ-45 modular plug (8P8C)', 'BNC connector, BNC T-piece, 50Ω terminators', 'LC, SC, ST, MPO/MTP multi-fiber connectors'],
          ['Installation & Flexibility', 'High flexibility; inexpensive, easy field termination', 'Stiff, bulky; difficult to bend around tight corners', 'Fragile glass; requires precision splicing tools'],
          ['Cost & Power Delivery', 'Very low cost; supports Power-over-Ethernet (PoE)', 'Obsolete in enterprise LANs; moderate cost', 'Higher transceiver cost; cannot conduct DC power'],
          ['Typical LAN Deployment', 'Horizontal desktop cabling, patch panels, APs', 'Historical legacy; vintage lab networks', 'Campus backbones, data center inter-switch links']
        ]
      },
      sections: [
        {
          heading: '1. Types of Cables Commonly Used for Ethernet',
          points: [
            '<b>A. Twisted-Pair Copper Cables (Most Pervasive):</b><br>• Composed of 4 pairs (8 conductors) of color-coded insulated copper wires twisted together at varying twist rates (twists/inch) to cancel out electromagnetic interference and alien crosstalk.<br>• <b>Unshielded Twisted Pair (UTP):</b> Standard for commercial offices; lightweight, inexpensive, flexible.<br>• <b>Shielded Twisted Pair (STP / S/FTP):</b> Encased in metallic foil or braided screening; used in industrial factory floors with heavy electrical motors.<br>• <b>Categories:</b> <i>Cat 5e</i> (100 MHz, 1 Gbps up to 100m); <i>Cat 6</i> (250 MHz, 1 Gbps @ 100m, 10 Gbps up to 55m); <i>Cat 6A</i> (500 MHz, full 10 Gbps @ 100m); <i>Cat 8</i> (2000 MHz, 25/40 Gbps data center links up to 30m).<br>• <b>Termination:</b> Uses 8P8C modular connectors (commonly called RJ-45) following T568A or T568B pinout standards. Modern switches use Auto MDI/MDI-X to automatically detect and correct pin configurations.',
            '<b>B. Coaxial Cables (Historical Foundation):</b><br>• Consists of a central copper conductor insulated by dielectric polyethylene, surrounded by a continuous braided metallic shield and protective jacket.<br>• <b>10BASE5 ("Thicknet"):</b> Thick 0.5-inch coaxial cable operating at 10 Mbps over shared bus segments up to 500 meters. Transceivers attached via mechanical "vampire taps" piercing the shield.<br>• <b>10BASE2 ("Thinnet" / "Cheapernet"):</b> Thinner, flexible RG-58 cable operating at 10 Mbps over segments up to 185 meters. Used BNC T-connectors directly at NICs and 50Ω terminators at bus ends.<br>• Today, coaxial Ethernet is completely replaced by twisted pair and optical fiber in structured cabling.',
            '<b>C. Optical Fiber Cables (High-Speed & Backbone):</b><br>• Transmits digital bits as modulated light pulses through ultra-pure silica glass waveguides via Total Internal Reflection (TIR).<br>• <b>Multimode Fiber (MMF - OM1 to OM5):</b> Larger core (50 µm or 62.5 µm); light rays bounce across multiple propagation paths (modal dispersion). Cost-effective VCSEL 850 nm light sources. Ideal for inter-rack server and building backbones up to 550 meters (10GBASE-SR).<br>• <b>Single-Mode Fiber (SMF - OS1/OS2):</b> Ultra-narrow core (8–9 µm); allows only a single spatial light mode, eliminating modal dispersion. Uses 1310 nm / 1550 nm infrared lasers. Spans campus backbones and metropolitan links from 10 km (10GBASE-LR) up to 80 km without repeaters.'
          ]
        },
        {
          heading: '2. Serialization Transmission Time Numerical Example',
          points: [
            '<b>Problem Formulation:</b> Calculate the serialization transmission time for a standard maximum-size Ethernet payload of 1500 bytes over: (a) 100 Mbps Fast Ethernet, and (b) 1 Gbps Gigabit Ethernet.',
            '<b>Data Conversion:</b> <code>1500 bytes = 1500 × 8 bits = 12,000 bits</code>.',
            '<b>Case (a) at 100 Mbps:</b><br><code>T_tx = Number of Bits / Transmission Rate = 12,000 / (100 × 10⁶) = 0.00012 seconds = 120 µs</code>.',
            '<b>Case (b) at 1 Gbps:</b><br><code>T_tx = 12,000 / (10⁹) = 0.000012 seconds = 12 µs</code>.',
            '<b>Conclusion:</b> Upgrading from Fast Ethernet to Gigabit Ethernet reduces frame serialization latency by a factor of 10 (from 120 µs down to 12 µs), massively increasing network responsiveness.'
          ]
        },
        {
          heading: '3. Architectural Advantages of Modern Ethernet',
          points: [
            '<b>Ubiquitous Interoperability:</b> Globally standardized under IEEE 802.3, ensuring seamless compatibility across multi-vendor equipment.',
            '<b>Seamless Speed Scalability:</b> Preserves the exact same MAC frame format from 10 Mbps to 400 Gbps, enabling seamless protocol continuity across network generations.',
            '<b>Power Delivery Integration:</b> Copper UTP delivers both data and DC power (PoE / PoE+ / PoE++ up to 90W) to VoIP phones, surveillance cameras, and Wi-Fi access points.',
            '<b>Full-Duplex Switching:</b> Micro-segmentation eliminates collisions, provides dedicated bandwidth per link, and removes distance limits previously imposed by CSMA/CD round-trip timing.'
          ]
        }
      ],
      conclusion: 'Ethernet is the foundational wired networking technology standardized by IEEE 802.3. While legacy Ethernet relied on coaxial bus cables (10BASE5/10BASE2), modern deployments exclusively use twisted-pair copper (Cat 5e/6/6A) for horizontal desktop runs up to 100 meters, and optical fiber (Single-mode/Multimode) for high-speed campus and data center backbones spanning up to 80 km.',
      markingScheme: [
        { component: 'Ethernet Definition, IEEE 802.3 Scope & Evolutionary History', marks: '1.5' },
        { component: 'Ethernet MAC Frame Format Diagram & Detailed Field Breakdown', marks: '1.5' },
        { component: 'Twisted-Pair Cabling (UTP/STP, Cat 5e/6/6A/8, RJ-45, T568A/B)', marks: '2.5' },
        { component: 'Coaxial Cable Standards (10BASE5 Thicknet vs 10BASE2 Thinnet)', marks: '2.0' },
        { component: 'Optical Fiber Types (Single-mode vs Multimode, Standards 10GBASE-SR/LR)', marks: '2.5' },
        { component: 'Comprehensive Cable Comparison Table (≥8 technical rows)', marks: '2.0' },
        { component: 'Frame Transmission Time Numerical (120 µs @ 100M vs 12 µs @ 1G) & Advantages', marks: '2.0' }
      ],
      examTip: 'Bhai, is 14-mark question mein Ethernet definition + three cable types + diagrams + comparison table zaroor dena. 10BASE5 aur 10BASE2 historical standards mention karna answer ko stronger banata hai.'
    }
  }

];
