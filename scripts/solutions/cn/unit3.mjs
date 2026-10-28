const unit3Entries = [
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
      intro: 'Go-Back-N (GBN) ARQ is a sliding window protocol that enables pipelined transmission of multiple data frames before requiring an acknowledgment (ACK). By utilizing channel bandwidth during propagation delay, it overcomes the severe idle-time inefficiency of Stop-and-Wait.',
      diagrams: [
        {
          title: 'Go-Back-N Sliding Window Retransmission Ladder (Lost Frame & Timeout)',
          ascii:
`[ SENDER SLIDING WINDOW: Capacity Ws = 2^m - 1 = 3 (m = 2 bits) ]
Frames in flight: [ 0  1  2 ]  Next to send: 3

SENDER                                                RECEIVER (Wr = 1)
  |                                                      |
  |--- Frame 0 ----------------------------------------->| Accepted; sends ACK 1
  |--- Frame 1 (LOST IN TRANSIT X)                       | (Never arrives!)
  |--- Frame 2 ----------------------------------------->| Out of order! Discarded
  |--- Frame 3 ----------------------------------------->| Out of order! Discarded
  |                                                      |
  |<-- Cumulative ACK 1 ---------------------------------| Slides window: [ 1  2  3 ]
  |                                                      |
  | [TIMER FOR FRAME 1 EXPIRES!]                         |
  |                                                      |
  |=== GO BACK TO N: Retransmit ALL Unacked from 1 ===   |
  |--- Frame 1 (Retransmitted) ------------------------->| Accepted; sends ACK 2
  |--- Frame 2 (Retransmitted) ------------------------->| Accepted; sends ACK 3
  |--- Frame 3 (Retransmitted) ------------------------->| Accepted; sends ACK 0
  v                                                      v`
        },
        {
          title: 'Mathematical Proof: Sequence Ambiguity if Ws = 2^m',
          ascii:
`SCENARIO SHOWING WHY SENDER WINDOW Ws MUST BE STRICTLY <= 2^m - 1:
Assume m = 2 bits (Sequences: 0, 1, 2, 3). Suppose Ws = 2^m = 4 (Incorrect!).

SENDER (Window 0,1,2,3)                               RECEIVER (Expects 0)
  |--- Frames 0, 1, 2, 3 sent -------------------------->| Receives 0,1,2,3 in order
  |                                                      | Window slides to NEW 0,1,2,3
  |<-- Cumulative ACK 0 (LOST IN NETWORK X) -------------|
  |                                                      |
  | [Timer expires for Frame 0; Sender Retransmits 0]    |
  |--- Frame 0 (OLD Retransmitted Frame) --------------->| Receives Frame 0!
  |                                                      | ERROR: Receiver thinks this
  |                                                      | is NEW Frame 0 of window 2!
  v                                                      v Accepts duplicate as new!
CONCLUSION: Restricting Ws <= 2^m - 1 prevents overlapping sequence ambiguity.`
        }
      ],
      sections: [
        {
          heading: '1. Sliding Window Pointers & Mathematical Constraints',
          points: [
            '<b>Sender Pointers:</b> The sender maintains three tracking boundaries: <code>Sf</code> (sequence number of first unacknowledged frame), <code>Sn</code> (sequence number of next frame to be sent), and window capacity <code>Ws</code>.',
            '<b>Window Sizing Rule:</b> For an <code>m</code>-bit sequence number space, the sender window size must satisfy <code>Ws ≤ 2ᵐ - 1</code>. The receiver window size is fixed at <code>Wr = 1</code>.',
            '<b>Receiver Window (Wr = 1):</b> The receiver maintains only one pointer <code>Rn</code> (expected sequence number). It accepts only the frame where <code>Seq == Rn</code>. Any out-of-order frame is silently discarded, eliminating the need for receiver buffering.'
          ]
        },
        {
          heading: '2. Operational Dynamics, Retransmissions & Channel Efficiency',
          points: [
            '<b>Cumulative Acknowledgment:</b> The receiver sends cumulative ACKs where <code>ACK n</code> validates that all frames through <code>n - 1</code> have been received successfully, and that the receiver now expects frame <code>n</code>.',
            '<b>Single Retransmission Timer:</b> The sender maintains a single hardware or logical timer associated only with the oldest unacknowledged frame (<code>Sf</code>). When this timer expires, the sender assumes all in-flight frames were lost and retransmits the entire window starting from <code>Sf</code> up to <code>Sn - 1</code> (hence the name Go-Back-N).',
            '<b>Channel Efficiency (η):</b> Let <code>Tt</code> be transmission time and <code>Tp</code> be one-way propagation time. Define <code>a = Tp / Tt</code>. Maximum theoretical efficiency is: <br><code>η = Ws / (1 + 2a)</code> (bounded by 100% when <code>Ws ≥ 1 + 2a</code>).'
          ]
        }
      ],
      table: {
        title: 'Comparative Analysis: Stop-and-Wait vs Go-Back-N vs Selective Repeat',
        headers: ['Evaluation Parameter', 'Stop-and-Wait ARQ', 'Go-Back-N (GBN) ARQ', 'Selective Repeat (SR) ARQ'],
        rows: [
          ['Sender Window Size (Ws)', '1', '2ᵐ - 1', '2ᵐ⁻¹'],
          ['Receiver Window Size (Wr)', '1', '1', '2ᵐ⁻¹ (Equal to Ws)'],
          ['Acknowledgment Type', 'Individual ACK per frame', 'Cumulative ACK (ACK n confirms up to n-1)', 'Individual / Selective ACK (SACK)'],
          ['Receiver Buffer Requirement', '1 buffer (Current frame only)', '1 buffer (Discards out-of-order frames)', 'Ws buffers (Stores out-of-order frames)'],
          ['Retransmission Behavior', 'Retransmits only the single timed-out frame', 'Retransmits ALL unacknowledged frames in window', 'Retransmits ONLY the damaged or lost frame'],
          ['Timer Architecture', 'Single timer', 'Single timer (for oldest unacked frame)', 'Independent timer per transmitted frame'],
          ['Channel Efficiency (η)', '1 / (1 + 2a)', 'Ws / (1 + 2a)', 'Ws / (1 + 2a)'],
          ['Complexity & Cost', 'Simplest; minimum memory', 'Moderate; efficient sender, simple receiver', 'Highest; complex buffer tracking and logic']
        ]
      },
      conclusion: 'Go-Back-N provides high channel utilization over long-delay links with minimal receiver buffer memory, making it an excellent balance between implementation simplicity and transmission throughput.',
      markingScheme: [
        { component: 'Go-Back-N Principle & Window Constraints (Ws = 2ᵐ - 1, Wr = 1)', marks: '1.5' },
        { component: 'Sequence Number Ambiguity Proof with Diagram', marks: '1.5' },
        { component: 'Neat Timing Ladder Diagram with Frame Loss & Go-Back Recovery', marks: '1.5' },
        { component: 'Channel Efficiency Equation & Performance Analysis', marks: '1.0' },
        { component: 'Comprehensive 8-Parameter Comparison Table (S&W vs GBN vs SR)', marks: '1.5' }
      ],
      examTip: 'Examiners always look for the mathematical proof of why Ws = 2ᵐ - 1 (not 2ᵐ). Show the scenario where ACK is lost and the receiver cannot distinguish new frame 0 from old frame 0.'
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
      table: {
        title: 'Technical Comparison: Pure ALOHA vs Slotted ALOHA',
        headers: ['Evaluation Parameter', 'Pure ALOHA', 'Slotted ALOHA'],
        rows: [
          ['Time Synchronization', 'Continuous; no global clock synchronization required', 'Discrete; channel divided into synchronized time slots of duration Tfr'],
          ['Transmission Rule', 'Station transmits immediately whenever a frame is ready', 'Station must wait and transmit strictly at the beginning of the next slot'],
          ['Vulnerable Period', '2 × Tfr ([-Tfr, +Tfr] around transmission start)', '1 × Tfr (Only during the current time slot)'],
          ['Throughput Formula', 'S = G × e^(-2G)', 'S = G × e^(-G)'],
          ['Maximum Channel Throughput (S_max)', '1 / (2e) ≈ 18.4% (at offered load G = 0.5)', '1 / e ≈ 36.8% (at offered load G = 1.0)'],
          ['Transmission Delay at Low Load (G → 0)', 'Tfr (Lowest possible delay; immediate transmission)', '1.5 × Tfr (Includes average slot alignment wait of Tfr / 2)'],
          ['Implementation Complexity', 'Extremely simple; uncoordinated random access', 'Requires global master clock / synchronization overhead']
        ]
      },
      sections: [
        {
          heading: '1. Mathematical Throughput Equations & Derivation',
          points: [
            '<b>Pure ALOHA Vulnerable Period:</b> If station A starts transmitting at time <code>t0</code>, any other frame transmitted in the interval <code>[t0 - Tfr, t0 + Tfr]</code> will collide with A. Total vulnerable window = <code>2 × Tfr</code>.',
            '<b>Pure ALOHA Throughput (S):</b> Assuming Poisson arrival of frames with offered load <code>G</code> frames per transmission time: <code>S = G × e⁻²ᴳ</code>. Differentiating with respect to G: <code>dS/dG = e⁻²ᴳ(1 - 2G) = 0 ⇒ G = 0.5</code>. Maximum throughput = <code>S_max = 0.5 × e⁻¹ = 1/(2e) ≈ 18.4%</code>.',
            '<b>Slotted ALOHA Vulnerable Period:</b> Stations transmit only at slot boundaries. A collision occurs only if two stations generate frames in the same preceding slot. Vulnerable window = <code>1 × Tfr</code>.',
            '<b>Slotted ALOHA Throughput (S):</b> Probability of zero other frames in slot is <code>e⁻ᴳ</code>: <code>S = G × e⁻ᴳ</code>. Maximized at <code>G = 1.0</code>, giving <code>S_max = 1 × e⁻¹ = 1/e ≈ 36.8%</code> (exactly twice Pure ALOHA).'
          ]
        },
        {
          heading: '2. Rigorous Delay Analysis at Low Load (G → 0)',
          points: [
            'At very low traffic load (<code>G → 0</code>), collision probability is virtually zero (<code>P_coll ≈ 0</code>). Stations successfully transmit on their very first attempt without incurring exponential backoff or retransmissions.',
            '<b>Pure ALOHA Delay Calculation:</b> When a packet arrives at time <code>t0</code>, it is transmitted over the channel immediately. Total initial delay is simply the frame transmission time: <br><code>Delay_Pure = Tfr</code>.',
            '<b>Slotted ALOHA Delay Calculation:</b> A packet generated at time <code>t0</code> cannot transmit immediately; it must wait until the next slot boundary. Assuming Poisson/uniform packet arrivals within a slot of length <code>Tfr</code>, the average waiting time is <code>Tfr / 2</code>. Once the slot begins, transmission takes <code>Tfr</code>. Total delay is: <br><code>Delay_Slotted = (Tfr / 2) + Tfr = 1.5 × Tfr</code>.',
            '<b>Definitive Conclusion:</b> <b>Pure ALOHA has LESS delay than Slotted ALOHA at low load</b> (<code>1.0 × Tfr</code> vs <code>1.5 × Tfr</code>, representing 33.3% less delay). Although Slotted ALOHA achieves double the capacity under heavy traffic, under light traffic Pure ALOHA provides superior latency because stations never wait for slot boundaries.'
          ]
        }
      ],
      conclusion: 'At low network load (G → 0), Pure ALOHA achieves 33.3% lower latency than Slotted ALOHA (1.0 Tfr vs 1.5 Tfr) because stations transmit instantly upon frame generation without waiting for slot boundaries.',
      markingScheme: [
        { component: 'Pure vs Slotted ALOHA Definitions & Vulnerable Times', marks: '1.5' },
        { component: 'Throughput Formulas (S = G·e⁻²ᴳ and S = G·e⁻ᴳ) & Maxima', marks: '1.5' },
        { component: 'Mathematical Delay Derivation at G → 0 (1.0 Tfr vs 1.5 Tfr)', marks: '1.5' },
        { component: 'Comparative Timing Diagram (Immediate vs Slot Alignment)', marks: '1.0' },
        { component: '7-Parameter Comparison Table & Final Verdict', marks: '1.5' }
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
            '<b>Final Verification Remainder:</b> <code>000</code>. This is consistent with a valid codeword and means this CRC check detected no error; some error patterns can still be undetected, so a zero remainder is not proof that no corruption occurred.'
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

const toSolution = ({id, solution}) => ({id, ...solution});
const solutionFor = (id, sourceId) => toSolution({
  id,
  solution: unit3Entries.find((entry) => entry.id === sourceId).solution,
});

const cnAlohaOriginalSolution = {
  id: 'cn-original-2025-100602-q3b',
  verified: 'BEU 2025 · Q.3(b) · 7 Marks · Cross-checked scan',
  intro: 'Pure ALOHA lets a station transmit whenever it has a frame. Slotted ALOHA divides time into equal slots of one frame-transmission time and allows transmission only at slot boundaries. This synchronization reduces collisions and raises the maximum channel throughput.',
  diagrams: [
    {
      title: 'Vulnerable Period Comparison: Pure ALOHA (2T) vs Slotted ALOHA (T)',
      ascii:
`[ PURE ALOHA: Vulnerable Window = 2 * T ]
Time: ----------(t - T)-------------------(t)-------------------(t + T)---------->
Frame A:          [================ Target Frame ===============]
Frame B:   [====== Overlap ======]
Frame C:                                             [====== Overlap ======]
Any frame beginning in interval (t - T, t + T) causes collision! Vulnerable time = 2T.

[ SLOTTED ALOHA: Vulnerable Window = T ]
Time:      |     Slot k - 1    |        Slot k         |       Slot k + 1     |
           |                   |                       |                      |
Station 1: |                   |  [===== Frame 1 =====]|                      |
Station 2: |                   |  [===== Frame 2 =====]|                      |
                                           ^
                                           | COLLISION!
Frames transmit ONLY at slot boundaries. Vulnerable time = T (Collisions halved!).`
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
    title: 'Pure ALOHA and Slotted ALOHA comparison',
    headers: ['Feature', 'Pure ALOHA', 'Slotted ALOHA'],
    rows: [
      ['Transmission time', 'A station transmits at any time.', 'A station transmits only at the start of a time slot.'],
      ['Synchronization', 'No slot synchronization is required.', 'Stations must share synchronized slot boundaries.'],
      ['Vulnerable period', '2T; a frame can collide with another that starts within one frame time before or after it.', 'T; a frame can collide only with another transmission in the same slot.'],
      ['Throughput', 'S = G e^(−2G)', 'S = G e^(−G)'],
      ['Maximum throughput', '1/(2e) ≈ 0.184, or 18.4%, at G = 0.5.', '1/e ≈ 0.368, or 36.8%, at G = 1.'],
    ],
  },
  sections: [
    {
      heading: '1. Why the vulnerable period is shorter',
      points: [
        'Let <code>T</code> be the time to transmit one frame. In Pure ALOHA, a frame beginning at time <code>t</code> can be corrupted by another frame that starts during <code>(t − T, t + T)</code>. Its vulnerable period is therefore <code>2T</code>.',
        'In Slotted ALOHA, a frame begins only on a slot boundary. A collision occurs only when two or more stations transmit in the same slot, so the vulnerable period is one slot, or <code>T</code>. Halving this period reduces the chance of collision.',
      ],
    },
    {
      heading: '2. Throughput and maximum efficiency',
      points: [
        'Let <code>G</code> be the average number of transmission attempts per frame time. With Poisson attempts, a Pure ALOHA frame succeeds when no competing attempt occurs during its <code>2T</code> vulnerable period: <code>S<sub>Pure</sub> = G e<sup>−2G</sup></code>. Differentiating gives <code>dS/dG = e<sup>−2G</sup>(1 − 2G)</code>; the maximum occurs at <code>G = 0.5</code>, giving <code>S<sub>max</sub> = 1/(2e) ≈ 0.184</code>.',
        'For Slotted ALOHA, the vulnerable period is <code>T</code>, so the success probability is <code>e<sup>−G</sup></code> and throughput is <code>S<sub>Slotted</sub> = G e<sup>−G</sup></code>. Here <code>dS/dG = e<sup>−G</sup>(1 − G)</code>; the maximum occurs at <code>G = 1</code>, giving <code>S<sub>max</sub> = 1/e ≈ 0.368</code>.',
        'Thus Slotted ALOHA doubles the maximum throughput: <code>(1/e) ÷ (1/(2e)) = 2</code>. This factor compares the two protocols at their respective maximum-throughput loads; it does not mean Slotted ALOHA is exactly twice as efficient at every offered load.',
      ],
    },
    {
      heading: '3. Delay Characteristics at Low Load vs High Load',
      points: [
        'At light network load (G → 0), collisions are rare. Pure ALOHA transmits instantly upon packet generation (delay = T). Slotted ALOHA stations must wait for the next slot boundary, incurring an average synchronization delay of T / 2 (total delay = 1.5 T). Thus, Pure ALOHA has lower latency at low traffic!',
        'At high network load (G > 0.5), Pure ALOHA collapses rapidly into collision saturation, causing exponential retransmissions. Slotted ALOHA sustains twice the load before throughput drops.'
      ]
    }
  ],
  conclusion: 'Slotted ALOHA requires time synchronization, but it halves the vulnerable period from 2T to T and raises maximum throughput from about 18.4% to 36.8%.',
  markingScheme: [
    { component: 'Operating principle and synchronization comparison', marks: '1.5' },
    { component: 'Vulnerable-period explanation (2T versus T)', marks: '1.5' },
    { component: 'Correct throughput equations', marks: '1.5' },
    { component: 'Maximum-throughput derivation and values', marks: '1.5' },
    { component: 'Explain the twofold maximum-efficiency improvement and conclude', marks: '1.0' },
  ],
  examTip: 'Define T and G before writing the equations. Say that the maximum throughput doubles; avoid claiming a twofold gain at every offered load.',
};

const cnCrcOriginalSolution = {
  id: 'cn-original-2025-100602-q3a',
  verified: 'BEU 2025 · Q.3(a) · 7 Marks · Cross-checked scan',
  intro: 'Cyclic Redundancy Check (CRC) appends check bits to a message so the receiver can test for transmission errors. Here the data word is <code>11001001</code>, and the generator polynomial is <code>G(x) = x³ + 1</code>.',
  diagrams: [
    {
      title: 'Full Modulo-2 XOR Long Division Trace (Sender Codeword Generation)',
      ascii:
`Divisor: 1001 ) 1 1 0 0 1 0 0 1 0 0 0 ( Quotient: 1 1 0 1 1 0 1 1
                1 0 0 1
                -------
                0 1 0 1 1
                  1 0 0 1
                  -------
                  0 0 1 0 0 0
                      1 0 0 1
                      -------
                      0 0 0 1 1 0 0
                            1 0 0 1
                            -------
                            0 1 0 1 0
                              1 0 0 1
                              -------
                              0 0 1 1 0
                                1 0 0 1
                                -------
                                0 1 1 1 0
                                  1 0 0 1
                                  -------
                                  0 0 1 1  ===> Remainder R = 011 (3 bits)`
    },
    {
      title: 'Sender Generation and Receiver Error Verification Architecture',
      ascii:
`[ SENDER ]                                        [ RECEIVER ]
Dataword: 11001001 (k = 8 bits)                    Received: 11001001011 (n = 11 bits)
Append r=3 zeros: 11001001000                     Divide by G = 1001
Modulo-2 Divide by G = 1001                       Modulo-2 division yields:
Remainder R = 011                                 Remainder = 000 (ZERO!)
Codeword T = D || R = 11001001011 ---------------> [ ACCEPTED: NO BIT ERRORS DETECTED ]`
    }
  ],
  table: {
    title: 'Modulo-2 long-division XOR steps',
    headers: ['Step', 'Four-bit window', 'XOR operation', 'Result'],
    rows: [
      ['1', '1100', '1100 ⊕ 1001', '0101'],
      ['2', '1011', '1011 ⊕ 1001', '0010'],
      ['3', '1000', '1000 ⊕ 1001', '0001'],
      ['4', '1100', '1100 ⊕ 1001', '0101'],
      ['5', '1010', '1010 ⊕ 1001', '0011'],
    ],
  },
  sections: [
    {
      heading: '1. Convert the generator polynomial to binary',
      points: [
        'Write coefficients from <code>x³</code> through <code>x⁰</code>. The polynomial <code>x³ + 1</code> has coefficients 1, 0, 0, 1, so the generator bit pattern is <code>1001</code>. Its degree is 3 and its length is 4 bits.',
      ],
    },
    {
      heading: '2. Append zeros to the data word',
      points: [
        'Append as many zero bits as the degree of the generator (3): <code>11001001 → 11001001000</code>. This is the dividend for modulo-2 division.',
      ],
    },
    {
      heading: '3. Divide using modulo-2 XOR',
      points: [
        'Modulo-2 subtraction is XOR: equal bits produce 0 and different bits produce 1. At each step, align <code>1001</code> with the leftmost 1, XOR the four-bit window, then bring down the next dividend bit. Leading zeroes are omitted before the next alignment.',
      ],
    },
    {
      heading: '4. Append the CRC remainder',
      points: [
        'The final three bits of the division result are the remainder: <code>R = 011</code>. Append these to the original data word (not to the zero-extended dividend): <code>11001001 | 011 = 11001001011</code>.',
      ],
    },
    {
      heading: '5. Verify the transmitted codeword',
      points: [
        'Dividing <code>11001001011</code> by <code>1001</code> gives remainder <code>000</code>, as expected for a correctly formed CRC codeword. CRC detects many common error patterns, but a zero remainder cannot prove that every possible transmission error is absent.',
      ],
    },
  ],
  conclusion: 'The CRC remainder is <code>011</code>, so the transmitted message is <code>11001001011</code>.',
  markingScheme: [
    { component: 'CRC purpose and identification of the given data and generator', marks: '1.0' },
    { component: 'Correct binary generator (1001) and three appended zeroes', marks: '1.0' },
    { component: 'Modulo-2 XOR division with correct intermediate working', marks: '3.0' },
    { component: 'Remainder 011 and correct transmitted codeword', marks: '1.0' },
    { component: 'Receiver check and clear final statement', marks: '1.0' },
  ],
  examTip: 'Show the divisor, each XOR step and the three-bit remainder. Keep the zero-extended dividend separate from the original data word when appending the remainder.',
};

export const unit3Solutions = [
  ...unit3Entries.filter(({marks}) => marks === 7).map(toSolution),
  cnAlohaOriginalSolution,
  cnCrcOriginalSolution,
  {
    id: 'cn-original-2023-100602-q4b',
    verified: 'BEU 2023 · Q.4(b) · 7 Marks · Cross-checked scan',
    intro: 'In computer networks where multiple nodes share a single broadcast transmission medium, Medium Access Control (MAC) protocols are essential to allocate bandwidth, regulate transmissions, prevent packet collisions, and resolve channel contention efficiently.',
    diagrams: [
      {
        title: 'Taxonomy of Medium Access Control (MAC) Techniques',
        ascii:
`                    MEDIUM ACCESS CONTROL (MAC) PROTOCOLS
                                      |
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
  RANDOM ACCESS               CONTROLLED ACCESS              CHANNELIZATION
  (Contention-Based)          (Collision-Free)               (Static Multiplexing)
  • Pure ALOHA                • Reservation Systems          • FDMA (Frequency)
  • Slotted ALOHA             • Polling (Primary/Secondary)  • TDMA (Time Slots)
  • CSMA (1-P, Non-P, p-P)    • Token Passing (Token Ring)   • CDMA (Orthogonal Codes)
  • CSMA/CD (Ethernet)
  • CSMA/CA (Wi-Fi 802.11)`
      }
    ],
    table: {
      title: 'Comparative Analysis of the Three Popular MAC Categories',
      headers: ['Evaluation Parameter', 'Random Access (Contention)', 'Controlled Access (Token Passing)', 'Channelization (FDMA/TDMA/CDMA)'],
      rows: [
        ['Channel Access Rule', 'Stations compete; transmit when ready; resolve collisions', 'Stations take turns; transmit only with explicit permission/token', 'Dedicated slice of frequency, time, or code allocated'],
        ['Collision Possibility', 'Collisions possible; requires backoff recovery', 'Completely collision-free under normal operation', 'Zero collisions (channels completely isolated)'],
        ['Efficiency at Light Load', 'Very high; zero waiting delay', 'Lower; token rotation overhead even with no data', 'Low; allocated bandwidth wasted if station is idle'],
        ['Efficiency at Heavy Load', 'Collapses due to frequent collisions', 'Very high; orderly, bounded access delay', 'High and predictable; constant throughput'],
        ['Typical Applications', 'Ethernet (CSMA/CD), Wi-Fi (CSMA/CA)', 'Token Ring (802.5), FDDI, industrial fieldbuses', 'Cellular networks (2G GSM, 3G CDMA, 4G LTE)']
      ]
    },
    sections: [
      {
        heading: '1. Random Access Techniques (Contention-Based)',
        points: [
          'No station is superior. Stations contend for the channel; if multiple transmit simultaneously, collision occurs.',
          '<b>ALOHA:</b> Simplest scheme; stations transmit at will (Pure) or at slot starts (Slotted). Collisions trigger random exponential backoff.',
          '<b>CSMA (Carrier Sense Multiple Access):</b> Stations "listen before talking". If medium is busy, station defers according to persistence algorithms (1-persistent, non-persistent, p-persistent).',
          '<b>CSMA/CD (Wired Ethernet):</b> Stations "listen while talking". On detecting collision, transmission aborts immediately and jam signal is broadcast.',
          '<b>CSMA/CA (Wireless 802.11):</b> Collisions cannot be detected over radio; uses DIFS sensing, exponential backoff, and optional RTS/CTS handshakes.'
        ]
      },
      {
        heading: '2. Controlled Access & Channelization Techniques',
        points: [
          '<b>Reservation:</b> Stations divide time into intervals; stations reserve transmission slots in advance via a reservation frame.',
          '<b>Polling:</b> Central primary controller polls secondary stations in round-robin order (Poll/Select).',
          '<b>Token Passing:</b> A small special frame (token) circulates among stations in a logical ring. Only the token-holder can transmit, providing deterministic bounded delay.',
          '<b>Channelization:</b> Divides total channel capacity into dedicated sub-channels: FDMA divides bandwidth, TDMA divides time into synchronous slots, and CDMA uses unique orthogonal Walsh-Hadamard codes.'
        ]
      }
    ],
    conclusion: 'MAC protocols govern shared medium usage: contention-based random access provides lowest latency at light load, controlled token passing provides deterministic fairness at high load, and channelization delivers guaranteed QoS in telecommunications.',
    markingScheme: [
      { component: 'Need for MAC Coordination on Shared Broadcast Media', marks: '1.5' },
      { component: 'Taxonomy Diagram Categorizing Random, Controlled & Channelization', marks: '1.5' },
      { component: 'Random Access Protocols (ALOHA, CSMA, CSMA/CD, CSMA/CA)', marks: '1.5' },
      { component: 'Controlled Access (Token Passing, Polling, Reservation)', marks: '1.0' },
      { component: 'Channelization (FDMA/TDMA/CDMA) & Comparison Table', marks: '1.5' }
    ],
    examTip: 'Draw the 3-branch classification tree first (Random Access, Controlled Access, Channelization) and write one real-world protocol example for each.'
  },
  {
    id: 'cn-original-2023-100602-q9c',
    verified: 'BEU 2023 · Q.9(c) · 7 Marks · Cross-checked scan',
    intro: 'A Virtual Local Area Network (VLAN) is a logical Layer 2 broadcast domain configured within one or more physical switches, grouping network endpoints based on organizational department, function, or security policy regardless of physical location.',
    diagrams: [
      {
        title: 'Physical Switch Segmented into Logical VLANs with 802.1Q Trunk Link',
        ascii:
`                    ROUTER / LAYER 3 SWITCH (Inter-VLAN Routing)
                                        |
                            Trunk Link  | (Carries IEEE 802.1Q tagged frames)
                                        v
                    +---------------------------------------+
                    |        LAYER 2 ETHERNET SWITCH        |
                    +---------------------------------------+
                     /          \\                 /         \\
           Access   /            \\ Access Access /           \\ Access
           Port 1  /       Port 2 \\        Port 3/      Port 4\\
                  v                v            v              v
            [ Host A ]        [ Host B ]   [ Host C ]     [ Host D ]
            VLAN 10           VLAN 10      VLAN 20        VLAN 20
            (Engineering)     (Engineering)(Accounts)     (Accounts)
            192.168.10.2      192.168.10.3 192.168.20.2   192.168.20.3
            <-- Broadcast Domain 10 --->   <-- Broadcast Domain 20 --->`
      },
      {
        title: 'IEEE 802.1Q 4-Byte Frame Tag Architecture',
        ascii:
`+------------+-----+----------+----------+--------------------+--------+------+-----+
| Preamble   | SFD | Dest MAC | Src MAC  | 802.1Q Tag (4 B)   | Length | Data | FCS |
| 7 Bytes    | 1 B | 6 Bytes  | 6 Bytes  | TPID (2B) | TCI(2B)| 2 Bytes| Payld| 4 B |
+------------+-----+----------+----------+--------------------+--------+------+-----+
                                               |
              +--------------------------------+-------------------------------+
              | TPID = 0x8100 (16 bits) | Priority (3b) | CFI (1b) | VID (12 bits) |
              +-------------------------+---------------+----------+---------------+
              • Tag Protocol Identifier (TPID): 0x8100 identifies 802.1Q tagged frame.
              • Priority Code Point (PCP): 3 bits for 802.1p Quality of Service (QoS).
              • VLAN Identifier (VID): 12 bits supporting 4,096 distinct VLANs (0 to 4095).`
      }
    ],
    table: {
      title: 'Comparison: Traditional Physical LAN vs Virtual LAN (VLAN)',
      headers: ['Comparison Feature', 'Traditional Physical LAN', 'Virtual LAN (VLAN)'],
      rows: [
        ['Broadcast Domain Boundary', 'Defined strictly by physical switch/router ports', 'Defined logically by switch software configuration'],
        ['Relocation & Moves', 'Requires physical rewiring and recabling', 'Simple software port reassignment on switch console'],
        ['Broadcast Containment', 'Entire switch is flooded by single broadcast', 'Broadcasts confined strictly within member VLAN ports'],
        ['Security Isolation', 'All connected hosts can sniff shared broadcast traffic', 'Traffic between distinct VLANs strictly blocked at L2'],
        ['Hardware Requirement', 'Separate physical switch required per department', 'Single physical switch hosts multiple virtual departments'],
        ['Cost & Scalability', 'High hardware cost and poor cable utilization', 'High port density, low hardware and operational cost']
      ]
    },
    sections: [
      {
        heading: '1. Core Switch Port Classifications',
        points: [
          '<b>Access Ports:</b> Connected to ordinary end-user devices (PCs, printers, IP phones). Traffic on access ports is standard untagged Ethernet frames. The switch injects the VLAN tag internally upon ingress and strips the tag upon egress.',
          '<b>Trunk Ports:</b> High-capacity inter-switch or switch-to-router links that multiplex traffic for multiple VLANs simultaneously. Each frame is stamped with an IEEE 802.1Q tag containing the 12-bit VLAN ID (VID).'
        ]
      },
      {
        heading: '2. Inter-VLAN Routing & Enterprise Advantages',
        points: [
          '<b>Inter-VLAN Communication:</b> Layer 2 switches strictly prevent traffic from leaking across VLAN boundaries. Communication between VLAN 10 and VLAN 20 requires Layer 3 routing via a Router-on-a-Stick (sub-interfaces with 802.1Q encapsulation) or a Layer 3 Multilayer Switch (Switch Virtual Interfaces - SVIs).',
          '<b>1. Broadcast Containment:</b> Limits ARP and DHCP broadcast floods to local workgroups, saving bandwidth across the enterprise.',
          '<b>2. Enhanced Security:</b> Sensitive financial or HR traffic is logically isolated from general student/guest networks.',
          '<b>3. Cost Efficiency:</b> Eliminates the need to purchase dedicated physical switches for small departments.'
        ]
      }
    ],
    conclusion: 'VLANs divide physical network infrastructure into flexible, secure, and isolated logical broadcast domains using IEEE 802.1Q frame tagging, reducing operational costs while improving network security and broadcast efficiency.',
    markingScheme: [
      { component: 'VLAN Definition & Layer 2 Broadcast Domain Architecture Diagram', marks: '1.5' },
      { component: 'IEEE 802.1Q Tag Architecture Diagram & Field Breakdown (VID 12-bit)', marks: '1.5' },
      { component: 'Access Ports vs Trunk Ports Working Mechanisms', marks: '1.5' },
      { component: 'Inter-VLAN Routing (Router-on-a-Stick / Multilayer Switch)', marks: '1.0' },
      { component: 'Key Advantages (Security, Containment) & Comparison Table', marks: '1.5' }
    ],
    examTip: 'Always draw the 802.1Q frame format showing the 12-bit VLAN ID field (which explains why switches support up to 4096 VLANs = 2^12) and explain the difference between an access port (untagged) and a trunk port (tagged).'
  },
  {
    id: 'cn-original-2024-100602-q3b',
    verified: 'BEU 2024 · Q.3(b) · 7 Marks · Cross-checked scan',
    intro: 'Cyclic Redundancy Check (CRC) is an algebraic polynomial error-detecting code based on GF(2) modulo-2 arithmetic. For message M = 1101011011 and generator polynomial G(x) = x⁴ + x + 1, we determine the transmitted codeword and verify receiver validation.',
    diagrams: [
      {
        title: 'Full Modulo-2 XOR Long Division Trace',
        ascii:
`Divisor: 10011 ) 1 1 0 1 0 1 1 0 1 1 0 0 0 0 ( Quotient: 1 1 0 0 0 1 0 0 1 1
                 1 0 0 1 1
                 ---------
                 0 1 0 0 1 1
                   1 0 0 1 1
                   ---------
                   0 0 0 0 0 1 0 1 1 0
                             1 0 0 1 1
                             ---------
                             0 0 1 0 1 0 0
                                 1 0 0 1 1
                                 ---------
                                 0 0 1 1 1 0  ===> Remainder R = 1110 (4 bits)`
      },
      {
        title: 'Sender Codeword Transmission & Receiver Zero-Remainder Verification',
        ascii:
`[ SENDER ]                                        [ RECEIVER ]
Message: 1101011011 (k = 10 bits)                 Received: 11010110111110 (n = 14 bits)
Append r=4 zeros: 11010110110000                  Divide by G = 10011
Divide by 10011 -> Remainder R = 1110             Modulo-2 division gives:
Codeword T = M || R = 11010110111110 -----------> Remainder = 0000 (NO ERROR DETECTED!)`
      }
    ],
    sections: [
      {
        heading: '1. Parameters & Modulo-2 Arithmetic Formulation',
        points: [
          '<b>Given Message (M):</b> <code>1101011011</code> (Length <code>k = 10 bits</code>).',
          '<b>Generator Polynomial:</b> <code>G(x) = x⁴ + x + 1 = 1·x⁴ + 0·x³ + 0·x² + 1·x¹ + 1·x⁰</code>.',
          '<b>Binary Divisor (G):</b> <code>10011</code> (Length = 5 bits, degree <code>r = 4</code>).',
          '<b>Appended Zeros:</b> Append <code>r = 4</code> zeros to message: <code>Dividend = 1101011011 0000</code> (14 bits).'
        ]
      },
      {
        heading: '2. Codeword Formation & Receiver Verification Check',
        points: [
          '<b>Remainder (CRC Checksum):</b> <code>R = 1110</code> (4 bits).',
          '<b>Transmitted Codeword (T):</b> <code>T = Message || Remainder = 1101011011 || 1110 = 11010110111110</code> (14 bits).',
          '<b>Receiver Verification:</b> Receiver divides <code>11010110111110 ÷ 10011</code>. Since the remainder is strictly <code>0000</code>, the transmission is verified error-free.'
        ]
      }
    ],
    conclusion: 'The 4-bit CRC remainder is 1110, yielding transmitted codeword 11010110111110. A zero remainder at the receiver confirms error-free transmission.',
    markingScheme: [
      { component: 'Polynomial to Binary Conversion (G(x) = x⁴+x+1 → 10011, r = 4)', marks: '1.0' },
      { component: 'Appending 4 Zeros to Message (11010110110000)', marks: '1.0' },
      { component: 'Full Modulo-2 Long Division Steps & Trace Diagram', marks: '2.5' },
      { component: 'Codeword Construction (11010110111110)', marks: '1.0' },
      { component: 'Receiver Verification (Remainder = 0000) & Conclusion', marks: '1.5' }
    ],
    examTip: 'Box the final remainder R = 1110 and show the receiver verification step explicitly to claim all 7 marks.'
  },
  {
    id: 'cn-original-2024-100602-q4a',
    verified: 'BEU 2024 · Q.4(a) · 7 Marks · Cross-checked scan',
    intro: 'Framing is the primary function of the Data Link Layer (Layer 2) that packages the continuous raw physical bitstream into discrete, recognizable transmission units called frames with clearly demarcated beginnings and ends.',
    diagrams: [
      {
        title: 'Three Classical Framing Techniques Compared',
        ascii:
`1. CHARACTER COUNT:
[ Header Count: 5 | A | B | C | D ]  [ Header Count: 3 | E | F ]
(Count includes itself. Catastrophic flaw: 1 corrupted count bit de-syncs ALL following frames!)

2. BYTE STUFFING (Character-Oriented):
[ FLAG | Payload: Data | ESC | FLAG | ESC | ESC | More Data | FLAG ]
(Sender inserts ESC byte before accidental FLAG or ESC bytes in payload; receiver strips ESC)

3. BIT STUFFING (Bit-Oriented, HDLC):
Flag (01111110) [ 011011111(0)1011111(0)00 ] Flag (01111110)
(Sender injects '0' after five consecutive '1's; receiver strips '0' automatically in hardware)`
      }
    ],
    table: {
      title: 'Transmitted Frame Bit Sequences for Payload: A B ESC FLAG',
      headers: ['Framing Technique', 'Transmitted Byte / Bit Stream Representation'],
      rows: [
        ['Character Count', '00000101 01000111 11100011 11100000 01111110 (5 bytes total: 1 count + 4 payload)'],
        ['Byte Stuffing', '01111110 01000111 11100011 11100000 11100000 11100000 01111110 01111110'],
        ['Bit Stuffing', '01111110 | 01000111110100011111000000011111010 | 01111110']
      ]
    },
    sections: [
      {
        heading: '1. Character Count Framing & Fatal Desynchronization',
        points: [
          'Uses a field in the frame header to declare total bytes in the frame (including the count byte).',
          'For 4 payload bytes (A, B, ESC, FLAG), count byte is <code>5</code> (<code>00000101</code>).',
          '<b>Fatal Flaw:</b> If a single bit in the count field is corrupted during transmission (e.g., 5 becomes 7), the receiver reads past the frame boundary and all subsequent frame synchronization is permanently lost.'
        ]
      },
      {
        heading: '2. Byte Stuffing (Character-Oriented Framing)',
        points: [
          'Delineates frames using dedicated flag bytes: <code>FLAG = 01111110</code> (0x7E).',
          'Whenever a byte equal to FLAG or ESC appears inside payload, sender prefixes it with an Escape byte: <code>ESC = 11100000</code>.',
          'Payload <code>A B ESC FLAG</code> transforms to: <code>FLAG A B (ESC ESC) (ESC FLAG) FLAG</code> (total 8 bytes).'
        ]
      },
      {
        heading: '3. Bit Stuffing (Bit-Oriented Framing, HDLC Standard)',
        points: [
          'Framed between standard flag patterns: <code>01111110</code>.',
          '<b>Rule:</b> Whenever the sender encounters five consecutive <code>1</code> bits in payload, it automatically injects a <code>0</code> bit.',
          'When receiver sees five 1s followed by a 0, it removes (destuffs) the 0. If followed by 10, it recognizes the true end-of-frame FLAG delimiter.',
          'Operates transparently at the hardware layer regardless of character encoding.'
        ]
      }
    ],
    conclusion: 'While Character Count is vulnerable to framing collapse and Byte Stuffing is tied to 8-bit character boundaries, Bit Stuffing is the universal industry standard in modern HDLC and PPP protocols due to its full hardware transparency.',
    markingScheme: [
      { component: 'Framing Definition & Frame Delineation Purpose', marks: '1.0' },
      { component: 'Character Count Explanation, Sequence & Framing Collapse Flaw', marks: '1.5' },
      { component: 'Byte Stuffing Explanation, ESC Insertion & Worked Sequence', marks: '1.5' },
      { component: 'Bit Stuffing Rule (5 ones → stuff 0) & Transmitted Bitstream', marks: '1.5' },
      { component: 'Comparison Table & Industry Standard Conclusion', marks: '1.5' }
    ],
    examTip: 'For bit stuffing, emphasize that the stuffed 0 is inserted only into the data payload and never into the opening or closing 01111110 flag bytes.'
  },
  {
    id: 'cn-original-2025-100602-q9b',
    verified: 'BEU 2025 · Q.9(b) · 7 Marks · Cross-checked scan',
    intro: 'Token Ring is a deterministic, controlled-access Local Area Network (LAN) technology standardized under IEEE 802.5 (originally developed by IBM). Stations are logically connected in a closed ring topology, and channel access is regulated by a small circulating control frame called the Token.',
    diagrams: [
      {
        title: 'IEEE 802.5 Token Ring Topology & Frame Circulation Architecture',
        ascii:
`                    +-----> [ STATION A ] ---->+
                    |       (Transmitter)      |
                    |                          v
              [ STATION D ]              [ STATION B ]
              (Passes frame)             (Destination: Copies data,
                    ^                     sets A & C bits to 1)
                    |                          |
                    +-----< [ STATION C ] <----+
                            (Passes frame)`
      },
      {
        title: 'Token Frame (3 Bytes) vs Data Frame Architecture',
        ascii:
`1. TOKEN FRAME (3 Bytes):
+-----------------------+-----------------------+-----------------------+
| Starting Delimiter SD | Access Control (AC)   | Ending Delimiter (ED) |
| 1 Byte (0b10000000)   | PPP T RRR (1 Byte)    | 1 Byte (0b10000000)   |
+-----------------------+-----------------------+-----------------------+

2. DATA / COMMAND FRAME:
+----+----+----+----------+----------+----------------+-----+----+----+
| SD | AC | FC | Dest MAC | Src MAC  | Data Payload   | FCS | ED | FS |
| 1B | 1B | 1B | 6 Bytes  | 6 Bytes  | Up to 4500 B   | 4 B | 1B | 1B |
+----+----+----+----------+----------+----------------+-----+----+----+`
      }
    ],
    table: {
      title: 'Comparative Analysis: Token Ring (IEEE 802.5) vs Ethernet (IEEE 802.3)',
      headers: ['Evaluation Parameter', 'Token Ring (IEEE 802.5)', 'Ethernet (IEEE 802.3)'],
      rows: [
        ['Media Access Strategy', 'Controlled access (token passing)', 'Random access (CSMA/CD / Switched full-duplex)'],
        ['Collision Possibility', 'Completely collision-free', 'Collisions occur in shared bus (none in full-duplex switch)'],
        ['Throughput Under Heavy Load', 'Stable, deterministic, bounded delay', 'Degrades under heavy load in shared media'],
        ['Priority Support', 'Built-in 3-bit priority levels (8 classes)', 'Requires 802.1p VLAN priority tags'],
        ['Cable Topology', 'Logical ring (wired as physical Star via MAU)', 'Bus (legacy) / Star (switched twisted pair)'],
        ['Cost & Market Dominance', 'High cost, complex NICs; now legacy', 'Extremely cheap, ubiquitous global standard']
      ]
    },
    sections: [
      {
        heading: '1. Complete Operational Life Cycle',
        points: [
          '<b>1. Token Circulation:</b> When the ring is idle, a 3-byte "Free Token" (with Token bit <code>T = 0</code> in the AC field) circulates continuously from station to station.',
          '<b>2. Token Capture & Frame Transmission:</b> A station wishing to transmit captures the token as it passes through its buffer, changes the Token bit from 0 to 1 (transforming it into a Start-of-Frame delimiter), appends destination address, source address, payload, and FCS, and transmits the data frame onto the ring.',
          '<b>3. Destination Reception & Verification:</b> Intermediate stations regenerate the frame. When destination Station B recognizes its MAC address, it copies the data and modifies the Frame Status (FS) byte at the tail: setting <code>Address Recognized (A = 1)</code> and <code>Frame Copied (C = 1)</code>.',
          '<b>4. Frame Stripping & Token Release:</b> The frame circulates back to transmitting Station A. Station A verifies the A and C bits, strips the frame from the ring (preventing infinite circulation), and issues a fresh Free Token (<code>T = 0</code>) for the next station.'
        ]
      },
      {
        heading: '2. Priority & Fault Tolerance Mechanisms',
        points: [
          '<b>Priority Reservation:</b> The Access Control (AC) byte contains 3 Priority bits (PPP) and 3 Reservation bits (RRR), supporting 8 priority levels (0 to 7) to prioritize voice/video traffic over background data.',
          '<b>Active Monitor & Beaconing:</b> An Active Monitor station detects lost tokens or continuously circulating orphan frames and issues replacement tokens. If a ring cable breaks, beacon frames trigger MAU (Multistation Access Unit) bypass relays.'
        ]
      }
    ],
    conclusion: 'Token Ring provides guaranteed, deterministic, collision-free channel access with built-in hardware prioritization, though modern high-speed switched Ethernet has superseded it due to lower cost and simpler administration.',
    markingScheme: [
      { component: 'Token Ring Definition, Topology & IEEE 802.5 Standards', marks: '1.5' },
      { component: 'Neat Ring Architecture & Frame Circulation Diagram', marks: '1.5' },
      { component: 'Token & Data Frame Format Layouts (SD, AC, FC, FS)', marks: '1.5' },
      { component: 'Four-Step Operational Cycle (Capture, Copy, Strip, Release)', marks: '1.5' },
      { component: 'Comparison Table (Token Ring vs Ethernet) & Conclusion', marks: '1.0' }
    ],
    examTip: 'Make sure to mention the Frame Status (FS) byte and the A (Address recognized) and C (Frame copied) bits; this proves to the examiner that you understand how the sender knows the transmission succeeded.'
  },
  {
    id: 'cn-original-2025-100602-q9d',
    verified: 'BEU 2025 · Q.9(d) · 7 Marks · Cross-checked scan',
    intro: 'Multiplexing is the physical-layer technique that combines multiple independent analog or digital signals onto a single shared transmission medium simultaneously, maximizing physical link utilization and minimizing infrastructure cabling costs.',
    diagrams: [
      {
        title: 'Multiplexing Techniques Architecture: FDM, TDM, and WDM',
        ascii:
`[ 1. FREQUENCY DIVISION MULTIPLEXING (FDM) ]
Frequency ^
          |  [ Channel 1 ] (f1)
          |  --- Guard Band ---
          |  [ Channel 2 ] (f2)   All signals transmitted SIMULTANEOUSLY
          |  --- Guard Band ---   over separate frequency bands!
          |  [ Channel 3 ] (f3)
          +-----------------------------------> Time

[ 2. TIME DIVISION MULTIPLEXING (TDM) ]
Time:     | Slot 1 | Slot 2 | Slot 3 | Slot 1 | Slot 2 | Slot 3 |
          | Host A | Host B | Host C | Host A | Host B | Host C |
          Each user gets the ENTIRE frequency bandwidth for a discrete time slice!

[ 3. WAVELENGTH DIVISION MULTIPLEXING (WDM) ]
λ1 (1550 nm) ---\\                                  /---> λ1 (Optical Receiver 1)
λ2 (1310 nm) ----+===[ Optical Fiber Multiplex ]===+---> λ2 (Optical Receiver 2)
λ3 (850 nm)  ---/    (Prism Combiner)              \\---> λ3 (Optical Receiver 3)`
      }
    ],
    table: {
      title: 'Comprehensive Engineering Comparison: Multiplexing Techniques',
      headers: ['Technique', 'Domain Divided', 'Signal Nature', 'Key Medium', 'Primary Commercial Application'],
      rows: [
        ['FDM', 'Frequency Spectrum', 'Analog (Continuous)', 'Coaxial cable, Radio broadcast, AM/FM', 'Radio/TV broadcast, cable television, DSL'],
        ['TDM', 'Time Duration', 'Digital (Discrete)', 'Copper twisted pair, digital backbones', 'T1/E1 telephony carriers, SONET/SDH digital trunks'],
        ['WDM / DWDM', 'Optical Wavelength (λ)', 'Optical (Light Pulses)', 'Single-mode optical fiber', 'Trans-oceanic fiber backbones, metro core networks'],
        ['CDM / CDMA', 'Orthogonal Chip Codes', 'Digital (Spread Spectrum)', 'Wireless radio channels', '3G Mobile communications (IS-95, CDMA2000), GPS']
      ]
    },
    sections: [
      {
        heading: '1. In-Depth Operational Principles',
        points: [
          '<b>Frequency Division Multiplexing (FDM):</b> Divides total channel bandwidth into distinct non-overlapping frequency bands. Each baseband signal modulates a separate high-frequency carrier. <i>Guard Bands</i> (unused frequency intervals) are placed between adjacent channels to eliminate cross-channel crosstalk.',
          '<b>Time Division Multiplexing (TDM):</b> Entire channel bandwidth is allocated to one signal at a time for a brief time slot. <i>Synchronous TDM</i> pre-assigns fixed slots to stations (wasted if station is idle); <i>Statistical TDM (Asynchronous)</i> dynamically allocates slots on demand, vastly improving bandwidth utilization.',
          '<b>Wavelength Division Multiplexing (WDM):</b> Optical equivalent of FDM applied to fiber optics. Multiple laser beams of distinct optical wavelengths (e.g., 1310 nm, 1550 nm) are combined onto a single fiber strand using optical prisms or diffraction gratings. Dense WDM (DWDM) multiplexes up to 160+ wavelengths per strand, achieving terabit throughput.'
        ]
      }
    ],
    conclusion: 'Multiplexing enables cost-effective data sharing across media: FDM separates signals across frequencies, TDM across time slots, WDM across optical light wavelengths, and CDM across mathematical codes.',
    markingScheme: [
      { component: 'Multiplexing Definition & Physical Layer MUX/DEMUX Principles', marks: '1.5' },
      { component: 'Neat Architectural Diagrams of FDM, TDM, and WDM', marks: '1.5' },
      { component: 'Detailed Technical Analysis of FDM (Guard Bands) & TDM', marks: '1.5' },
      { component: 'Wavelength Division Multiplexing (WDM/DWDM) in Optical Fiber', marks: '1.0' },
      { component: 'Comprehensive Comparison Table & Commercial Applications', marks: '1.5' }
    ],
    examTip: 'Clearly state what prevents signal overlap in each technique: Guard Bands in FDM, Inter-frame Synchronization in TDM, and Prism Wavelength Separation in WDM.'
  },
  {
    id: 'cn-original-2023-100602-q6b',
    verified: 'BEU 2023 · Q.6(b) · 7 Marks · Cross-checked scan',
    intro: 'Sliding Window protocols are foundational Data Link and Transport layer flow and error control mechanisms that allow a sender to transmit multiple data frames continuously before pausing for acknowledgements, maximizing channel utilization on high-latency links.',
    diagrams: [
      {
        title: 'Sliding Window Dynamic Advancement Ladder with Acknowledgment',
        ascii:
`[ SENDER WINDOW: Size Ws = 4 frames (Sequence Space: 0 to 7) ]
Before ACK:    [ 0   1   2   3 ]  4   5   6   7   (Frames 0, 1, 2, 3 in transit)
ACK 0 Arrives:   0 [ 1   2   3   4 ]  5   6   7   (Window slides forward by 1; Frame 4 sent)
ACK 1, 2 Arrive: 0   1   2 [ 3   4   5   6 ]  7   (Window slides forward by 2; Frames 5, 6 sent)

SENDER                                           RECEIVER
  |--- Frame 0 ------------------------------------>| Accept 0
  |--- Frame 1 ------------------------------------>| Accept 1
  |--- Frame 2 (LOST IN TRANSIT X)                  |
  |--- Frame 3 ------------------------------------>| Out of order! Discarded (in GBN)
  |<-- ACK 2 (Cumulative ACK for 0 & 1) ------------|
  | [TIMER FOR FRAME 2 EXPIRES!]                    |
  |=== Retransmit Frame 2 and Frame 3 =============>| Accept 2, 3`
      }
    ],
    table: {
      title: 'Comprehensive Comparison: Stop-and-Wait vs Go-Back-N vs Selective Repeat',
      headers: ['Evaluation Parameter', 'Stop-and-Wait ARQ', 'Go-Back-N (GBN) ARQ', 'Selective Repeat (SR) ARQ'],
      rows: [
        ['Sender Window Size (Ws)', 'Ws = 1 frame', 'Ws = 2^m - 1 frames', 'Ws = 2^(m - 1) frames'],
        ['Receiver Window Size (Wr)', 'Wr = 1 frame', 'Wr = 1 frame', 'Wr = Ws = 2^(m - 1) frames'],
        ['Out-of-Order Frames', 'Impossible (only 1 frame sent)', 'Silently discarded', 'Buffered in receiver buffer'],
        ['Acknowledgment Type', 'Individual ACK', 'Cumulative ACK', 'Individual / Selective ACK (SACK)'],
        ['Retransmission Scope', 'Only the single timed-out frame', 'All unacknowledged frames in window', 'Strictly the lost frame only'],
        ['Receiver Buffer Cost', 'Minimal (1 frame buffer)', 'Minimal (1 frame buffer)', 'Substantial (requires sorting buffer)'],
        ['Link Bandwidth Efficiency', 'Very low (η = 1 / (1 + 2a))', 'High; collapses under noisy links', 'Highest efficiency under noisy links'],
        ['Typical Applications', 'Legacy protocols, TFTP', 'HDLC, legacy satellite links', 'TCP SACK, modern high-speed networks']
      ]
    },
    sections: [
      {
        heading: '1. Mathematical Efficiency & Sequence Space Bounds',
        points: [
          '<b>Propagation Parameter (a):</b> <code>a = T_prop / T_tx</code> (ratio of propagation delay to transmission delay).',
          '<b>Channel Efficiency Equation:</b> Maximum channel efficiency is given by: <code>η = W_s / (1 + 2a)</code>. When <code>W_s ≥ 1 + 2a</code>, channel efficiency reaches 100%!',
          '<b>Sequence Number Constraints:</b> For an m-bit sequence number:<br>• <i>Go-Back-N:</i> <code>W_s ≤ 2^m - 1</code> and <code>W_r = 1</code>.<br>• <i>Selective Repeat:</i> <code>W_s + W_r ≤ 2^m ⇒ W_s = W_r ≤ 2^(m - 1)</code>.<br>If window sizes exceed these mathematical limits, lost ACKs cause sequence number wraparound ambiguity, corrupting data by accepting duplicates.'
        ]
      }
    ],
    conclusion: 'Sliding window protocols pipeline frame transmissions to overcome propagation delays. Go-Back-N achieves high throughput with minimal receiver complexity, whereas Selective Repeat maximizes channel efficiency over noisy links by retransmitting only damaged frames.',
    markingScheme: [
      { component: 'Sliding Window Concept & Pipelining Principles', marks: '1.5' },
      { component: 'Neat Window Sliding Timing Ladder Diagram', marks: '1.5' },
      { component: 'Mathematical Efficiency Derivation [η = Ws / (1 + 2a)]', marks: '1.0' },
      { component: 'Window Size Limits Proof (Ws ≤ 2^m - 1 vs 2^(m-1))', marks: '1.5' },
      { component: 'Comprehensive 8-Parameter Comparison Table & Conclusion', marks: '1.5' }
    ],
    examTip: 'Examiners reward writing out the channel efficiency formula η = Ws / (1 + 2a) and clearly explaining why Selective Repeat requires Ws = 2^(m-1) to prevent duplicate acceptance.'
  },
  {
    id: 'cn-original-2025-100602-q9c',
    verified: 'BEU 2025 · Q.9(c) · 7 Marks · Cross-checked scan',
    intro: 'A sliding window protocol is an bidirectional flow- and error-control mechanism operating at Layer 2 and Layer 4. By maintaining sequential send and receive windows, it decouples frame transmission from instantaneous acknowledgement arrival, transforming inefficient stop-and-wait channels into continuous pipelines.',
    diagrams: [
      {
        title: 'Bidirectional Sliding Window Mechanism & Dynamic Buffer Windows',
        ascii:
`[ SENDER WINDOW: Outstanding Frames Allowed ]
+---+---+---+---+---+---+---+---+
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |   (Sequence Space: Modulo 8, m = 3 bits)
+---+---+---+---+---+---+---+---+
      [ Window: 2, 3, 4, 5 ] ===> Frames in flight; awaiting ACK
        ^                 ^
        LastByteAcked     LastByteSent

[ RECEIVER WINDOW: Acceptable Sequence Range ]
+---+---+---+---+---+---+---+---+
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
+---+---+---+---+---+---+---+---+
      [ Window: 2, 3, 4, 5 ] ===> Acceptable incoming frames`
      }
    ],
    table: {
      title: 'Architectural Comparison: Go-Back-N vs Selective Repeat Protocols',
      headers: ['Feature', 'Go-Back-N ARQ', 'Selective Repeat ARQ'],
      rows: [
        ['Receiver Window Size', 'Wr = 1 (strictly in-order reception)', 'Wr = Ws = 2^(m-1) (buffers out-of-order)'],
        ['Sender Window Size', 'Ws = 2^m - 1', 'Ws = 2^(m-1)'],
        ['Bandwidth Waste on Loss', 'High (discards subsequent good frames)', 'Minimal (only lost frame retransmitted)'],
        ['Implementation Complexity', 'Very simple; no sorting logic', 'Complex; requires resequencing buffers'],
        ['ACK Mechanism', 'Cumulative ACK (ACK n acknowledges all < n)', 'Negative ACK (NAK) or Selective ACK (SACK)']
      ]
    },
    sections: [
      {
        heading: '1. Fundamental Window State Invariants',
        points: [
          '<b>Sender State Variables:</b> <code>S_f</code> (sequence number of first unacknowledged frame), <code>S_n</code> (sequence number of next frame to send), and <code>S_size</code> (maximum window size). Constraint: <code>S_n - S_f < S_size</code>.',
          '<b>Receiver State Variables:</b> <code>R_n</code> (sequence number of next expected frame). In Go-Back-N, any incoming frame with sequence number <code>≠ R_n</code> is immediately dropped, and a cumulative ACK for the last in-order frame is re-sent.',
          '<b>Window Sliding Action:</b> When a valid ACK arrives acknowledging frames up to k, <code>S_f</code> advances to <code>k + 1</code>. This shifts the window forward, allowing the sender to transmit fresh packets.'
        ]
      },
      {
        heading: '2. Sequence Number Wraparound Ambiguity Proof',
        points: [
          'If the sender window size were allowed to equal the sequence space (<code>W_s = 2^m</code>), then if all ACKs are lost, the sender retransmits the old window.',
          'Meanwhile, the receiver window has wrapped around modulo <code>2^m</code> and is expecting the new window with the identical sequence numbers!',
          'The receiver would mistake old retransmitted frames for brand new data, corrupting the application payload. Restricting <code>W_s + W_r ≤ 2^m</code> eliminates this ambiguity completely.'
        ]
      }
    ],
    conclusion: 'Sliding window protocols achieve continuous, high-speed data flow over long-distance links. By enforcing Ws + Wr ≤ 2^m, they guarantee zero duplicate packet acceptance even amidst total acknowledgement loss.',
    markingScheme: [
      { component: 'Sliding Window Operational Principles & Pipelining Benefits', marks: '1.5' },
      { component: 'Sender & Receiver Dynamic Window State Diagram', marks: '1.5' },
      { component: 'Go-Back-N vs Selective Repeat Comparative Table', marks: '1.5' },
      { component: 'Mathematical Proof for Preventing Sequence Wraparound Ambiguity', marks: '1.5' },
      { component: 'Conclusion & Practical Protocol Applications (TCP / HDLC)', marks: '1.0' }
    ],
    examTip: 'Explain the state variables Sf, Sn, and Rn. Examiners appreciate seeing these exact standard textbook notations.'
  },
  solutionFor('cn-q5', 'cn-q31'),
  solutionFor('cn-q6', 'cn-q30'),
  solutionFor('cn-q7', 'cn-q51'),
];
export const unit3SupplementalSolutions = unit3Entries
  .filter(({marks}) => marks !== 7)
  .map(toSolution);
