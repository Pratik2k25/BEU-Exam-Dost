const unit5Entries = [
  {
    id: 'cn-q37',
    num: 37,
    title: 'TCP Flow Control Using Different Variables',
    unit: 5,
    verified: 'BEU 2024 · Q.7(a) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Explain how TCP provides a flow control service by using different variables. Discuss buffer variables at sender and receiver, Silly Window Syndrome, and Zero-Window Probing.',
    solution: {
      verified: 'BEU 2024 · Q.7(a) · 7 Marks',
      intro: 'TCP provides an end-to-end flow control service to match the sender’s transmission rate with the receiver’s application consumption rate, preventing the sender from overflowing the receiver’s buffer.',
      diagrams: [
        {
          title: 'TCP Receiver Buffer & Receive Window (rwnd) Relationship',
          ascii:
`[ RECEIVER BUFFER: Total Capacity = RcvBuffer ]
+-------------------------+-------------------------+--------------------+
| Bytes read by App       | Buffered, Unread Data   | Free Space (rwnd)  |
+-------------------------+-------------------------+--------------------+
0                   LastByteRead              LastByteRcvd         Buffer End
                          |<--- In Buffer Data ---->|<---- rwnd -------->|

rwnd = RcvBuffer - [ LastByteRcvd - LastByteRead ]`
        }
      ],
      sections: [
        {
          heading: '1. Mathematical Variables at Receiver & Sender',
          points: [
            '<b>Receiver Variables:</b><br>• <code>LastByteRead</code>: Number of the last byte read by the application.<br>• <code>LastByteRcvd</code>: Number of the last byte arrived and buffered.<br>• Receiver Buffer Constraint: <code>LastByteRcvd - LastByteRead ≤ RcvBuffer</code>.<br>• Advertised Window: <code>rwnd = RcvBuffer - [LastByteRcvd - LastByteRead]</code>.<br>Receiver conveys <code>rwnd</code> inside every TCP header window field.',
            '<b>Sender Variables & Invariant:</b><br>• <code>LastByteSent</code>: Number of the last byte transmitted.<br>• <code>LastByteAcked</code>: Number of the last byte acknowledged by receiver.<br>• Unacknowledged Data: <code>LastByteSent - LastByteAcked ≤ rwnd</code>.<br>By strictly maintaining this inequality, TCP guarantees that unacknowledged in-flight data never exceeds the receiver’s free buffer space.'
          ]
        },
        {
          heading: '2. Edge Cases: Zero-Window Probing & Silly Window Syndrome',
          points: [
            '<b>Zero-Window Probing:</b> When <code>rwnd = 0</code>, sender stops transmitting. When receiver app reads data, a window update ACK could be lost, deadlocking both sides. TCP solves this using a <i>Persist Timer</i>: upon expiration, sender transmits a 1-byte probe segment, forcing receiver to re-advertise its current <code>rwnd</code>.',
            '<b>Silly Window Syndrome (SWS):</b> Occurs when sender transmits tiny chunks (e.g., 1 byte payload inside a 40-byte TCP/IP header = 2.5% efficiency). Solutions: <br>• <i>Clark’s Solution (Receiver-side):</i> Receiver advertises rwnd = 0 until it can open by at least MSS or half RcvBuffer.<br>• <i>Nagle’s Algorithm (Sender-side):</i> Sender buffers small data and only transmits if a full MSS is accumulated or all previous packets are acknowledged.'
          ]
        }
      ],
      conclusion: 'TCP dynamically throttles transmission using rwnd feedback, and prevents deadlocks and micro-packet inefficiencies using persist timers and Nagle/Clark algorithms.',
      markingScheme: [
        { component: 'Flow Control Definition & Receiver Buffer Diagram', marks: '2.0' },
        { component: 'Receiver & Sender Variables Formulation (rwnd inequality)', marks: '2.0' },
        { component: 'Zero-Window Deadlock & Persist Timer Probe', marks: '1.5' },
        { component: 'Silly Window Syndrome & Solutions (Nagle and Clark)', marks: '1.5' }
      ],
      examTip: 'Write out the core inequality clearly: LastByteSent - LastByteAcked ≤ rwnd. Examiners award 2 marks directly for this mathematical statement.'
    }
  },
  {
    id: 'cn-q38',
    num: 38,
    title: 'UDP Header and UDP Checksum with Numerical Example',
    unit: 5,
    verified: 'BEU 2024 · Q.7(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Describe the various fields of UDP segment and explain UDP checksum calculation with a numerical example using 16-bit one’s complement arithmetic.',
    solution: {
      verified: 'BEU 2024 · Q.7(b) · 7 Marks',
      intro: 'User Datagram Protocol (UDP) is a minimal, connectionless transport-layer protocol (RFC 768) that provides process-to-process multiplexing and optional error checking with minimal overhead.',
      diagrams: [
        {
          title: 'UDP 8-Byte Header Architecture & Pseudo-Header',
          ascii:
` 0                   15 16                  31  Bits
+----------------------+----------------------+
|   Source Port (16)   | Destination Port (16)|  4 Bytes
+----------------------+----------------------+
|      Length (16)     |     Checksum (16)    |  4 Bytes
+----------------------+----------------------+
|                 Data Payload ...            |  Variable
+---------------------------------------------+

[ UDP PSEUDO-HEADER (For Checksum Calculation Only) ]
+-----------------------------------------------------+
|              32-bit Source IP Address               |
+-----------------------------------------------------+
|           32-bit Destination IP Address             |
+----------------------+----------------------+-------+
|     All Zeros (8)    | Protocol 17=UDP (8)  |Length |
+----------------------+----------------------+-------+`
        }
      ],
      sections: [
        {
          heading: '1. Detailed Analysis of the Four Header Fields',
          points: [
            '<b>Source Port (16 bits):</b> Port number of sending process; optional (set to 0 if client requires no reply).',
            '<b>Destination Port (16 bits):</b> Port number of receiving process on target host (e.g., DNS port 53, DHCP port 67).',
            '<b>Length (16 bits):</b> Total length of UDP segment in bytes (Header + Payload). Minimum value is 8 bytes.',
            '<b>Checksum (16 bits):</b> 16-bit one’s complement sum covering pseudo-header, UDP header, and payload. Set to all zeros if checksum is disabled.'
          ]
        },
        {
          heading: '2. Numerical Checksum Calculation (16-Bit One’s Complement)',
          points: [
            'Suppose we calculate the checksum for three 16-bit binary words:<br>• Word 1: <code>1001 0101 0101 0010</code> (Hex: <code>0x9552</code>)<br>• Word 2: <code>1000 1100 1010 0101</code> (Hex: <code>0x8CA5</code>)<br>• Word 3: <code>0100 0000 0000 0001</code> (Hex: <code>0x4001</code>)',
            '<b>Step 1: Add Word 1 and Word 2:</b><br><code>  0x9552</code><br><code>+ 0x8CA5</code><br><code>-------</code><br><code> 0x121F7</code> (17-bit sum with carry bit 1).',
            '<b>Step 2: Add End-Around Carry:</b><br><code>  0x21F7 + 1 = 0x21F8</code>.',
            '<b>Step 3: Add Word 3:</b><br><code>  0x21F8 + 0x4001 = 0x61F9</code> (<code>0110 0001 1111 1001₂</code>).',
            '<b>Step 4: Take One’s Complement Inversion:</b><br>Invert all bits: <code>~0x61F9 = 0x9E06</code> (<code>1001 1110 0000 0110₂</code>).',
            '<b>Transmitted Checksum:</b> <code>0x9E06</code>.',
            '<b>Step 5: Receiver Verification:</b><br>Receiver adds all words PLUS the checksum: <code>0x61F9 + 0x9E06 = 0xFFFF</code> (all 1s). Since the sum is all 1s (one’s complement zero), NO error is detected!'
          ]
        }
      ],
      conclusion: 'The UDP header is fixed at 8 bytes. The 16-bit one’s complement checksum detects bit errors across both transport and network layer pseudo-header fields.',
      markingScheme: [
        { component: 'UDP Segment 8-Byte Layout Diagram', marks: '1.5' },
        { component: 'Detailed Field Function Descriptions (Ports, Length, Checksum)', marks: '2.0' },
        { component: 'Pseudo-Header Concept Explanation', marks: '1.0' },
        { component: 'Step-by-Step Numerical Checksum Calculation with Carry', marks: '1.5' },
        { component: 'Receiver Verification (Sum = 0xFFFF)', marks: '1.0' }
      ],
      examTip: 'Always mention the "End-Around Carry" wrap-around step and prove that the receiver gets 0xFFFF (all ones) for full 7 marks.'
    }
  },
  {
    id: 'cn-q39',
    num: 39,
    title: 'Congestion & Three Transport-Layer Policies',
    unit: 5,
    verified: 'BEU 2024 · Q.8(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'What is congestion? Explain three congestion control policies in Transport Layer with suitable diagram.',
    solution: {
      verified: 'BEU 2024 · Q.8(b) · 7 Marks',
      intro: 'Congestion in computer networks occurs when the aggregate volume of packets injected into the subnet exceeds the packet-handling capacity of intermediate routers and transmission links. If unmanaged, queuing delays soar, buffer queues overflow, dropped packets trigger retransmission storms, and network throughput drops precipitously to near zero (Congestion Collapse).',
      diagrams: [
        {
          title: 'TCP Congestion Window (cwnd) Dynamics Across Transmission Phases',
          ascii:
`cwnd (MSS)
  ^
16|                                  [ CONGESTION AVOIDANCE (AIMD) ]
  |                                  /|
12|                                 / |
  |                                /  | <--- 3 Duplicate ACKs (Triple Dup ACK)
 8|            +------------------+   |
  |           / [ssthresh = 8]        | [Fast Recovery: cwnd = ssthresh + 3 MSS]
 4|          /                        |\\
  |         / [SLOW START]            | \\
 2|        /                          |  \\
 1|---+---+                           +---+----------------------------> Time (RTTs)
      0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15`
        },
        {
          title: 'Offered Traffic Load vs Network Throughput & Congestion Collapse',
          ascii:
`Throughput
  ^
  |        Ideal Linear Throughput (45° line)
  |        . . . . . . . . . . . . . . . . . . .
  |       /          * [KNEE: Delay starts rising]
  |      /         *   *
  |     /        *       *
  |    /       *           * [CLIFF: Buffer Overflow]
  |   /      *               *
  |  /     *                   *
  | /    *                       * * * * * [CONGESTION COLLAPSE: Near zero useful work]
  +----------------------------------------------------> Offered Load`
        }
      ],
      sections: [
        {
          heading: '1. Three Fundamental Transport-Layer Policies',
          points: [
            '<b>1. Slow Start (Exponential Probing):</b> The connection begins with <code>cwnd = 1 MSS</code>. For every individual non-duplicate ACK received, the sender increments cwnd by 1 MSS. Over one round-trip time (RTT), cwnd doubles exponentially (<code>1 → 2 → 4 → 8 MSS</code>). Exponential growth continues until <code>cwnd</code> reaches the slow-start threshold (<code>ssthresh</code>) or a packet loss occurs.',
            '<b>2. Congestion Avoidance (Additive Increase):</b> When <code>cwnd ≥ ssthresh</code>, exponential growth ceases and shifts to linear, conservative probing: for each RTT where all packets are successfully acknowledged, cwnd increases by exactly <code>1 MSS</code>: <br><code>cwnd = cwnd + MSS × (MSS / cwnd)</code> per received ACK. This probes for extra bandwidth without abruptly inducing bufferbloat.',
            '<b>3. Fast Retransmit & Fast Recovery (Multiplicative Decrease):</b><br>• <i>Fast Retransmit:</i> When an intermediate packet is lost while subsequent packets arrive, the receiver generates duplicate ACKs. Upon receiving 3 duplicate ACKs (4 identical ACKs total), the sender infers packet loss immediately and retransmits the missing segment without waiting for the slow Retransmission Timeout (RTO) timer.<br>• <i>Fast Recovery (TCP Reno):</i> Rather than resetting cwnd to 1 MSS (as primitive TCP Tahoe did), TCP Reno cuts threshold to half: <code>ssthresh = max(FlightSize / 2, 2 MSS)</code>, sets <code>cwnd = ssthresh + 3 MSS</code> (accounting for buffered packets that triggered duplicate ACKs), and continues linear additive increase once the missing frame is acknowledged.'
          ]
        },
        {
          heading: '2. Open-Loop vs Closed-Loop Congestion Control Taxonomies',
          points: [
            '<b>Open-Loop (Prevention):</b> Protocols design policies prior to data flow to prevent congestion from arising (e.g., traffic policing, Leaky Bucket shaping, admission control, packet discard policies).',
            '<b>Closed-Loop (Detection & Recovery):</b> Operates dynamically during active data transfer based on feedback loops (e.g., Explicit Congestion Notification [ECN] bits in IP headers, choke packets, and TCP AIMD window adjustments).'
          ]
        }
      ],
      table: {
        title: 'Comparison of TCP Congestion Control Mechanisms',
        headers: ['Mechanism Phase', 'Trigger Condition', 'Window Adjustment Algorithm', 'Growth Trajectory', 'Primary Objective'],
        rows: [
          ['Slow Start', 'Connection initiation or after RTO timeout', 'cwnd = cwnd + 1 MSS per ACK', 'Exponential (2^n per RTT)', 'Rapidly probe initial channel bandwidth capacity'],
          ['Congestion Avoidance', 'cwnd reaches or exceeds ssthresh', 'cwnd = cwnd + 1 MSS per RTT', 'Linear (Additive Increase: +1 per RTT)', 'Cautiously consume extra bandwidth near link capacity'],
          ['Fast Retransmit', 'Arrival of 3 duplicate ACKs', 'Immediate retransmission of lost segment', 'Instantaneous event trigger', 'Avoid waiting for catastrophic RTO timer expiry'],
          ['Fast Recovery', 'Immediately follows Fast Retransmit', 'ssthresh = cwnd / 2; cwnd = ssthresh + 3', 'Linear resumption without Slow Start', 'Maintain high network pipeline throughput after isolated drops'],
          ['Timeout Fallback', 'Retransmission Timer (RTO) expires', 'ssthresh = cwnd / 2; cwnd resets to 1 MSS', 'Drops to base 1 MSS; enters Slow Start', 'Aggressive safety backoff during catastrophic link failure']
        ]
      },
      conclusion: 'TCP achieves decentralized network stability across billions of endpoints by coupling exponential bandwidth probing (Slow Start) with Additive Increase Multiplicative Decrease (AIMD) feedback control.',
      markingScheme: [
        { component: 'Network Congestion Definition, Symptoms & Knee/Cliff Diagram', marks: '1.5' },
        { component: 'Slow Start Mechanism & Exponential Growth Formula', marks: '1.5' },
        { component: 'Congestion Avoidance (AIMD) Linear Formula', marks: '1.5' },
        { component: 'Fast Retransmit & Fast Recovery (3 Duplicate ACKs Rule)', marks: '1.5' },
        { component: 'Comprehensive 5-Phase Comparison Table & Conclusion', marks: '1.0' }
      ],
      examTip: 'Examiners expect two labelled diagrams: the cwnd vs time curve (showing Slow Start, ssthresh knee, and AIMD sawtooth) and the Offered Load vs Throughput curve showing the congestion collapse cliff.'
    }
  },
  {
    id: 'cn-q44',
    num: 44,
    title: 'Leaky Bucket and Token Bucket Algorithms',
    unit: 5,
    verified: 'BEU 2023 · Q.3(b) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Explain leaky bucket and token bucket algorithm. Compare their burst handling capabilities and compute maximum burst duration.',
    solution: {
      verified: 'BEU 2023 · Q.3(b) · 7 Marks',
      intro: 'Traffic shaping is an open-loop mechanism that regulates the rate and volume of packet transmissions entering a network, smoothing bursty application traffic into predictable, compliant streams to prevent router buffer overflow and enforce Quality of Service (QoS). The two canonical traffic-shaping paradigms are the Leaky Bucket Algorithm and the Token Bucket Algorithm.',
      diagrams: [
        {
          title: 'Architectural Comparison: Leaky Bucket (Rigid Constant Rate) vs Token Bucket (Controlled Bursts)',
          ascii:
`[ 1. LEAKY BUCKET ALGORITHM ]                     [ 2. TOKEN BUCKET ALGORITHM ]
Bursty Packet Inflow (Irregular arrival)          Tokens generated at constant rate r tokens/sec
       |                                                 |
       v                                                 v
+--------------+                                  +--------------+
| Packet Queue | (Fixed capacity C bytes)         | Token Bucket | (Capacity b tokens)
+--------------+                                  +--------------+
       |                                                 |
       | Water leaks at STRICT CONSTANT RATE             v (Packet captures tokens)
       v                                          +--------------+
Strictly Constant Output Stream                   | Output Gate  | ===> Transmission at Peak Rate M
(Bursts completely eliminated; delay added)       +--------------+      (Allows short controlled bursts)`
        }
      ],
      sections: [
        {
          heading: '1. Leaky Bucket Operational Mechanics',
          points: [
            '<b>Concept:</b> Analogous to a bucket with a small orifice at the base. Water may pour into the bucket in violent, irregular bursts, but it drains out at an invariant, smooth rate as long as water remains in the bucket.',
            '<b>Queue Buffer:</b> In networking, incoming packets are queued in a finite FIFO buffer of capacity <code>C</code> bytes. Packets are dequeued and transmitted onto the transmission medium at a strictly constant rate <code>ρ</code> (bytes/second).',
            '<b>Packet Discard:</b> If a sudden packet burst arrives when the buffer queue is full, the excess packets overflow the bucket and are immediately dropped.',
            '<b>Key Characteristic:</b> The output rate is completely rigid. It suppresses all bursts and cannot send above rate <code>ρ</code> even if downstream network links are completely idle.'
          ]
        },
        {
          heading: '2. Token Bucket Operational Mechanics & Burst Derivation',
          points: [
            '<b>Concept:</b> A token generator deposits virtual tokens into a bucket of capacity <code>b</code> bytes at a sustained constant rate <code>r</code> tokens/second. When the bucket fills to <code>b</code>, incoming tokens overflow and are discarded (never packets!).',
            '<b>Transmission Condition:</b> To transmit a packet of size <code>m</code> bytes, exactly <code>m</code> tokens must be removed from the bucket. If fewer than <code>m</code> tokens are available, the packet must wait or be marked non-compliant.',
            '<b>Burst Capacity:</b> When a sender has been idle, the bucket fills to capacity <code>b</code>. If a sudden burst arrives, the sender can transmit at the maximum physical link rate <code>M</code> (where <code>M > r</code>) until accumulated tokens are depleted.',
            '<b>Mathematical Derivation of Maximum Burst Duration:</b><br>Let <code>S</code> be the maximum burst duration in seconds.<br>During time <code>S</code>, the total bytes transmitted at peak rate <code>M</code> is <code>M × S</code>.<br>The total tokens available during time <code>S</code> is initial tokens <code>b</code> plus freshly generated tokens <code>r × S</code>.<br>Equating available tokens with transmitted bytes: <br><code>M × S = b + r × S ⇒ S × (M - r) = b ⇒ S = b / (M - r) seconds</code>.<br>Maximum burst volume transmitted is <code>V_burst = M × S = M × b / (M - r) bytes</code>.'
          ]
        },
        {
          heading: '3. Worked Numerical Problem',
          points: [
            '<b>Given Parameters:</b> Token bucket capacity <code>b = 2 Megabytes (MB)</code>, token generation rate <code>r = 2 MB/sec</code>, maximum physical link transmission rate <code>M = 10 MB/sec</code>.',
            '<b>Calculation 1 — Maximum Burst Duration (S):</b> <br><code>S = b / (M - r) = 2 MB / (10 MB/s - 2 MB/s) = 2 / 8 = 0.25 seconds</code>.',
            '<b>Calculation 2 — Total Burst Volume (V):</b> <br><code>V = M × S = 10 MB/s × 0.25 s = 2.5 Megabytes</code>. (Consists of 2.0 MB initial bucket capacity + 0.5 MB tokens generated during the 0.25s burst).'
          ]
        }
      ],
      table: {
        title: 'Comprehensive Technical Comparison: Leaky Bucket vs Token Bucket',
        headers: ['Evaluation Parameter', 'Leaky Bucket Algorithm', 'Token Bucket Algorithm'],
        rows: [
          ['Output Stream Profile', 'Strictly constant, uniform transmission rate', 'Average rate r over long term, but permits bursts up to peak rate M'],
          ['Burst Tolerance', 'Zero burst tolerance; completely flattens all bursts', 'Allows controlled, bounded bursts proportional to bucket depth b'],
          ['Discard Behavior', 'Discards packets when the queue buffer overflows', 'Discards tokens when bucket fills; packets are never dropped due to token overflow'],
          ['Internal Storage', 'Buffers actual data packets in a physical memory queue', 'Accumulates virtual tokens (integer counters)'],
          ['Token Dependency', 'No tokens; purely timer-based dequeue', 'Packet transmission is strictly gated by token availability'],
          ['Delay Profile', 'Introduces variable queuing delay for bursty traffic', 'Zero extra delay during bursts as long as tokens are available'],
          ['Bandwidth Utilization', 'May waste bandwidth if link is idle and packets are queued', 'Maximizes link utilization by dumping bursts when capacity allows'],
          ['Representative Protocols', 'ATM Constant Bit Rate (CBR) traffic policing', 'IPv4/IPv6 RSVP, DiffServ, and token-bucket traffic policers']
        ]
      },
      conclusion: 'While the Leaky Bucket algorithm provides a rigid, predictable output stream ideal for constant-bit-rate voice, the Token Bucket algorithm offers superior flexibility for bursty computer data by permitting short, bounded bursts while guaranteeing long-term average bandwidth compliance.',
      markingScheme: [
        { component: 'Traffic Shaping Definitions & Motivation', marks: '1.0' },
        { component: 'Neat Architectural Comparison Diagram', marks: '1.5' },
        { component: 'Leaky Bucket Mechanics & Queue Discard Breakdown', marks: '1.0' },
        { component: 'Token Bucket Mechanics & Derivation of Burst Formula [S = b / (M - r)]', marks: '1.5' },
        { component: 'Worked Numerical Calculation (Duration S & Volume V)', marks: '1.0' },
        { component: '8-Parameter Comparison Table & Academic Conclusion', marks: '1.0' }
      ],
      examTip: 'Examiners award full 7 marks when you derive the burst duration equation S = b / (M - r) step-by-step and provide a numerical example with realistic numbers.'
    }
  },
  {
    id: 'cn-q13',
    num: 13,
    title: 'TCP Connection Management: 3-Way Handshake & Teardown',
    unit: 5,
    verified: 'BEU 2022 · Q.7(a) / 2024 · 7 Marks',
    years: [2022, 2024, 2026],
    marks: 7,
    question: 'Explain the TCP Three-Way Handshake mechanism for connection establishment and connection termination with sequence numbers and timing diagrams. Why is the 2MSL TIME-WAIT state necessary?',
    solution: {
      verified: 'BEU 2022 · Q.7(a) / 2024 · 7 Marks',
      intro: 'Transmission Control Protocol (TCP, RFC 793) is a connection-oriented transport-layer protocol providing full-duplex, reliable byte-stream communication. Connection establishment is governed by a robust Three-Way Handshake that synchronizes Initial Sequence Numbers (ISNs), while termination uses a Four-Way Handshake that gracefully closes each simplex direction with a mandatory 2MSL TIME-WAIT state.',
      diagrams: [
        {
          title: 'TCP Connection Management: 3-Way Handshake & 4-Way Teardown Timing Ladder',
          ascii:
`CLIENT (Active Open: IP:Port C)                      SERVER (Passive Open: IP:Port S)
  |                                                    | State: LISTEN
  |==== [ THREE-WAY HANDSHAKE ESTABLISHMENT ] ========|
  |                                                    |
  |--- 1. SYN, Seq = x ------------------------------->| State: SYN_RCVD (Allocates buffers)
  |    (Controls: SYN=1, ACK=0)                        |
  |<-- 2. SYN-ACK, Seq = y, Ack = x + 1 ---------------| State: SYN_RCVD
  |    (Controls: SYN=1, ACK=1)                        |
  |--- 3. ACK, Seq = x + 1, Ack = y + 1 -------------->| State: ESTABLISHED
  |    (Controls: SYN=0, ACK=1; may carry data)        |
  | State: ESTABLISHED                                 | State: ESTABLISHED
  |                                                    |
  |================ FULL-DUPLEX DATA TRANSFER =========|
  |                                                    |
  |==== [ FOUR-WAY HANDSHAKE TERMINATION ] ===========|
  |                                                    |
  |--- 1. FIN, Seq = u ------------------------------->| State: CLOSE_WAIT (Client closes write)
  | State: FIN_WAIT_1                                  |
  |<-- 2. ACK, Ack = u + 1 ----------------------------| (Server acknowledges client close)
  | State: FIN_WAIT_2                                  | (Server may continue sending data)
  |                                                    |
  |<-- 3. FIN, Seq = v --------------------------------| State: LAST_ACK (Server closes write)
  |--- 4. ACK, Ack = v + 1 --------------------------->| State: CLOSED
  | State: TIME_WAIT (Wait 2MSL = 120s timer)          |
  v State: CLOSED (Timer expires; socket released)     v`
        }
      ],
      table: {
        title: 'TCP Connection State Transition Matrix',
        headers: ['Connection State', 'Operating Endpoint', 'Triggering Event / Action', 'Next State Transition'],
        rows: [
          ['LISTEN', 'Server', 'Application binds port and waits for incoming client SYN', 'SYN_RCVD (on receiving SYN)'],
          ['SYN_SENT', 'Client', 'Application initiates active open; sends SYN segment with ISN x', 'ESTABLISHED (on receiving SYN-ACK)'],
          ['SYN_RCVD', 'Server', 'Server received SYN, allocated TCB buffers, sent SYN-ACK', 'ESTABLISHED (on receiving ACK)'],
          ['ESTABLISHED', 'Client & Server', 'Handshake completed; bidirectional data transfer active', 'FIN_WAIT_1 (Client close) / CLOSE_WAIT (Server close)'],
          ['FIN_WAIT_1', 'Client', 'Application closes; sent FIN segment to server', 'FIN_WAIT_2 (on receiving ACK)'],
          ['CLOSE_WAIT', 'Server', 'Received client FIN, sent ACK; waiting for local app close', 'LAST_ACK (when server sends its FIN)'],
          ['FIN_WAIT_2', 'Client', 'Received ACK for own FIN; waiting for server FIN', 'TIME_WAIT (on receiving server FIN)'],
          ['LAST_ACK', 'Server', 'Sent FIN to client; waiting for final ACK', 'CLOSED (on receiving final ACK)'],
          ['TIME_WAIT', 'Active Closer (Client)', 'Sent final ACK; waiting 2MSL (120s) to absorb delayed packets', 'CLOSED (after 2MSL timeout)']
        ]
      },
      sections: [
        {
          heading: '1. Three-Way Handshake & Why Two-Way Handshake Fails',
          points: [
            '<b>Step 1 (Client SYN):</b> Client selects a random 32-bit Initial Sequence Number (ISN) <code>x</code> and sends <code>SYN = 1, ACK = 0, Seq = x</code>. Random ISN generation protects against cross-connection sequence hijacking.',
            '<b>Step 2 (Server SYN-ACK):</b> Server allocates Transmission Control Block (TCB) buffers, chooses its own ISN <code>y</code>, and sends <code>SYN = 1, ACK = 1, Seq = y, Ack = x + 1</code>.',
            '<b>Step 3 (Client ACK):</b> Client validates the server response and replies with <code>SYN = 0, ACK = 1, Seq = x + 1, Ack = y + 1</code>. This third segment may carry initial application data.',
            '<b>Why a Two-Way Handshake is Fatal:</b> If only 2 messages were used, a delayed duplicate SYN from an old terminated session could arrive at the server. The server would believe a new connection was requested, allocate memory and send SYN-ACK, immediately entering ESTABLISHED state! The client, having never initiated the connection, ignores the SYN-ACK. The server remains permanently trapped in a half-open ghost connection, causing catastrophic server memory leaks.'
          ]
        },
        {
          heading: '2. Four-Way Teardown & Symmetric Half-Close',
          points: [
            'Because TCP connections are full-duplex (two independent simplex streams), each direction must be terminated separately.',
            'When the client application issues <code>close()</code>, it sends a <code>FIN</code> segment. The server acknowledges with <code>ACK</code>. At this stage, the client-to-server direction is closed, but the server may continue transmitting pending data to the client (Half-Close state).',
            'Once the server finishes sending all remaining data, it sends its own <code>FIN</code> segment. The client sends the final <code>ACK</code>, entering <code>TIME_WAIT</code>.'
          ]
        },
        {
          heading: '3. Why the 2MSL TIME-WAIT State is Mandatory (Two Strict Proofs)',
          points: [
            '<b>Reason 1 — Graceful Recovery from Lost Final ACK:</b> If the client’s final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client were in CLOSED state, it would respond with an error <code>RST</code> segment, causing the server to terminate abnormally with a connection reset error. By remaining in TIME_WAIT for <code>2MSL</code>, the client can retransmit the final ACK smoothly.',
            '<b>Reason 2 — Draining Lingering Phantom Segments:</b> Packets can be delayed in Internet router queues for up to Maximum Segment Lifetime (<code>MSL ≈ 60–120s</code>). Waiting <code>2MSL</code> (120–240 seconds) guarantees that all obsolete duplicate segments from the old connection evaporate from the network before the same socket pair (IP:Port) can be legally reused by a new connection.'
          ]
        }
      ],
      conclusion: 'TCP connection management balances synchronization robustness with leak protection: the 3-Way Handshake prevents half-open ghost connections, while the 2MSL TIME-WAIT state guarantees clean teardown and prevents stale packet corruption.',
      markingScheme: [
        { component: 'Three-Way Handshake Step-by-Step Flow & Sequence Numbers', marks: '1.5' },
        { component: 'Neat Handshake & 4-Way Teardown Timing Diagrams', marks: '1.5' },
        { component: 'TCP State Transition Matrix & Why 2-Way Handshake Fails', marks: '1.5' },
        { component: 'Four-Way Teardown Half-Close Explanation', marks: '1.0' },
        { component: 'Justification of 2MSL TIME-WAIT State (Both Proofs)', marks: '1.5' }
      ],
      examTip: 'Examiners award full marks when you draw both sequence ladders (setup & teardown) and state both reasons for 2MSL (retransmitting lost final ACK and letting delayed old duplicates expire).'
    }
  },
  {
    id: 'cn-q15',
    num: 15,
    title: 'TCP vs UDP Protocol Architecture, Header Formats & Performance Comparison',
    unit: 5,
    verified: 'BEU 2023 · Q.7 / 2025 · 7 Marks',
    years: [2022, 2023, 2024, 2025],
    marks: 7,
    question: 'Compare TCP and UDP protocols based on connection state, packet header overhead, flow control, error recovery, and application suitability. Draw their segment header formats.',
    solution: {
      verified: 'BEU 2023 · Q.7 / 2025 · 7 Marks',
      intro: 'The Internet Transport Layer provides two primary end-to-end communication protocols offering fundamentally different service guarantees: Transmission Control Protocol (TCP, RFC 793) providing reliable, connection-oriented, ordered byte-stream delivery; and User Datagram Protocol (UDP, RFC 768) providing lightweight, connectionless, best-effort datagram transport with minimum transmission delay.',
      diagrams: [
        {
          title: 'Header Structure Comparison: TCP (20–60 Bytes) vs UDP (Fixed 8 Bytes)',
          ascii:
`[ TCP SEGMENT HEADER: 20 TO 60 BYTES ]
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data | Res |U|A|P|R|S|F|     |                               |
| Offset| erv |R|C|S|S|Y|I|     |         Window Size           |
|       |     |G|K|H|T|N|N|     |                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |        Urgent Pointer         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 Bytes)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

[ UDP DATAGRAM HEADER: FIXED 8 BYTES ]
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
        }
      ],
      table: {
        title: 'Comprehensive Technical Comparison: TCP vs UDP',
        headers: ['Feature Parameter', 'Transmission Control Protocol (TCP)', 'User Datagram Protocol (UDP)'],
        rows: [
          ['Connection Model', 'Connection-oriented (requires 3-way handshake before transfer)', 'Connectionless (no handshake; sends directly to destination socket)'],
          ['Delivery Reliability', 'Guaranteed delivery (uses sequence numbers, ACKs, retransmission timers)', 'Unreliable / Best-effort (packets may be lost, duplicated, or dropped)'],
          ['Byte Ordering', 'Strictly ordered byte stream (guarantees in-sequence delivery)', 'No sequencing; datagrams can arrive out of order without reordering'],
          ['Header Overhead', '20 bytes base (up to 60 bytes with optional fields)', 'Fixed 8 bytes only (minimal protocol tax and low serialization delay)'],
          ['Flow Control', 'Yes (Dynamic Sliding Window based on receiver window rwnd)', 'No flow control mechanism (receiver buffer can be overrun)'],
          ['Congestion Control', 'Yes (Slow Start, Congestion Avoidance AIMD, Fast Recovery cwnd)', 'No built-in congestion control (injects traffic at application rate)'],
          ['Transmission Mode', 'Unicast only (strict point-to-point connection)', 'Supports Unicast, Multicast, and Broadcast'],
          ['Data Framing Boundary', 'Stream-oriented (continuous byte stream without message delimiters)', 'Message-oriented (preserves exact application packet boundaries)'],
          ['Speed & Latency', 'Higher latency due to handshakes, ACKs, and retransmissions', 'Ultra-fast, lowest possible latency (ideal for real-time traffic)']
        ]
      },
      sections: [
        {
          heading: '1. Architectural Deep Dive: How TCP Establishes Reliability Over Unreliable IP',
          points: [
            '<b>Byte-Stream Sequencing:</b> TCP treats application data as an unstructured stream of bytes, numbering each individual byte with a 32-bit sequence number. This allows the receiver to detect duplicate segments, reorder packets arriving via different routes, and detect missing gaps.',
            '<b>Cumulative Acknowledgments & RTO:</b> The receiver issues cumulative ACKs acknowledging the next byte expected. The sender dynamically tracks Round Trip Time (RTT) using Jacobson’s algorithm to calculate the Retransmission Timeout (<code>RTO = SRTT + 4 × RTTVAR</code>). If an ACK is not received before RTO expires, the segment is automatically retransmitted.',
            '<b>Dual Window Rate Regulation:</b> Transmission rate is strictly bounded by <code>Effective_Window = min(rwnd, cwnd)</code>. The receive window (<code>rwnd</code>) prevents buffer overflow at the receiver host (Flow Control), while the congestion window (<code>cwnd</code>) prevents bottleneck router queue collapse inside the network fabric (Congestion Control).'
          ]
        },
        {
          heading: '2. Architectural Deep Dive: Why UDP Excels at Low-Latency Real-Time Transport',
          points: [
            '<b>Minimalist Header Design:</b> UDP requires only 4 fields (16-bit Source Port, 16-bit Destination Port, 16-bit Length, and 16-bit Checksum), totaling just 8 bytes compared to TCP’s 20–60 bytes. This reduces header processing overhead and serialization delay on bandwidth-constrained links.',
            '<b>Preservation of Message Boundaries:</b> Unlike TCP which merges or segments application writes into arbitrary chunks, UDP sends each application block as an independent, discrete datagram. A single <code>read()</code> at the receiver retrieves exactly one <code>write()</code> from the sender.',
            '<b>Checksum Over Pseudo-Header:</b> UDP calculates a 16-bit One’s Complement checksum over the UDP segment prepended with a 12-byte IP Pseudo-Header (Source IP, Dest IP, protocol=17, UDP length), verifying that misrouted packets are detected and discarded.'
          ]
        },
        {
          heading: '3. Engineering Decision Matrix & Real-World Application Mapping',
          points: [
            '<b>When to choose TCP:</b> Mission-critical applications where losing even a single byte would corrupt data integrity (e.g., HTTP/HTTPS web documents, FTP binary file downloads, SSH remote administration, SMTP/IMAP email transmission, financial database transactions).',
            '<b>When to choose UDP:</b> Latency-sensitive applications where timeliness is vastly more important than 100% packet delivery (e.g., VoIP voice calls where retransmitting audio after 200ms is jarring, live video streaming, multiplayer gaming, DNS hostname resolution, DHCP network boot).'
          ]
        }
      ],
      conclusion: 'TCP prioritizes absolute reliability, guaranteed ordering, and network stability at the cost of connection latency and transmission jitter, whereas UDP delivers lightweight, lowest-latency transport for real-time and query-based network applications.',
      markingScheme: [
        { component: 'Architectural Overview & Connection Philosophy', marks: '1.0' },
        { component: 'Neat Labelled Header Format Diagrams (TCP 20-60B & UDP 8B)', marks: '2.0' },
        { component: 'Comprehensive 9-Parameter Comparison Table', marks: '2.0' },
        { component: 'TCP Reliability Architecture (Sequencing, RTO, Dual Windows)', marks: '1.0' },
        { component: 'UDP Lightweight Mechanics & Application Decision Matrix', marks: '1.0' }
      ],
      examTip: 'Examiners award top marks for drawing the 8-byte UDP header precisely (Port, Port, Length, Checksum) and explaining why real-time voice (VoIP) prefers UDP over TCP (retransmitting old audio packets is useless in live talk).'
    }
  },
  {
    id: 'cn-q56',
    num: 56,
    title: 'Difference Between Port and Socket with Application Examples',
    unit: 5,
    verified: 'BEU 2022 · Q.4 · 14 Marks',
    years: [2022],
    marks: 14,
    question: 'Differentiate between port and socket with suitable examples.',
    solution: {
      verified: 'BEU 2022 · Q.4 · 14 Marks',
      intro: 'In multi-tasking networked operating systems, multiple network applications (e.g., Web browser, email client, SSH shell, database service) run concurrently on the same host sharing a single physical network interface. The operating system must demultiplex incoming transport segments to the exact application process. To achieve this, networking architectures utilize two distinct abstractions: Ports (16-bit transport-layer numerical identifiers) and Sockets (operating-system-managed communication endpoints bound to an IP address and port).',
      diagrams: [
        {
          title: 'Host Transport Multiplexing: Single IP Address Serving Multiple Application Ports',
          ascii:
`                             HOST MACHINE (IP: 192.0.2.10)
 +-----------------------------------------------------------------------------------+
 | APPLICATION LAYER PROCESSES                                                       |
 |   +-------------------+   +-------------------+   +---------------------------+   |
 |   | HTTP Web Server   |   | HTTPS Secure Web  |   | SSH Remote Administration |   |
 |   | Process (PID 1420)|   | Process (PID 1421)|   | Process (PID 890)         |   |
 |   +-------------------+   +-------------------+   +---------------------------+   |
 |             |                       |                           |                 |
 |             v                       v                           v                 |
 |    TCP Port 80             TCP Port 443                TCP Port 22                |
 +-------------+-----------------------+---------------------------+-----------------+
 | TRANSPORT LAYER (TCP / UDP Demultiplexing via 16-Bit Port Numbers)                |
 +-------------------------------------+---------------------------------------------+
                                       |
                                       v
 +-----------------------------------------------------------------------------------+
 | NETWORK LAYER (Single Logical Host IP Address: 192.0.2.10)                        |
 +-----------------------------------------------------------------------------------+`
        },
        {
          title: 'TCP Socket Client-Server Lifecycle & Four-Tuple Connection State',
          ascii:
`CLIENT HOST (IP: 192.0.2.20)                               SERVER HOST (IP: 198.51.100.10)
  +----------------------+                                    +----------------------+
  | socket()             |                                    | socket()             |
  | (Create descriptor)  |                                    | (Create master socket|
  +----------------------+                                    +----------------------+
             |                                                           |
             |                                                           v
             |                                                +----------------------+
             |                                                | bind(198.51.100.10:443|
             |                                                +----------------------+
             |                                                           |
             |                                                           v
             |                                                +----------------------+
             |                                                | listen()             |
             |                                                | (Queue incoming SYN) |
             |                                                +----------------------+
             |                                                           |
             |                                                           v
  +----------------------+   1. SYN (Seq=x, Port 51000->443)  +----------------------+
  | connect()            |===================================>| accept()             |
  | (Ephemeral Port 51000|   2. SYN+ACK (Seq=y, Ack=x+1)      | (Blocks until conn;  |
  |  bound automatically)|<===================================|  spawns new socket)  |
  |                      |   3. ACK (Ack=y+1)                 +----------------------+
  |                      |===================================>           |
  +----------------------+                                               v
  Client Socket Address:                                      Server Socket Address:
  192.0.2.20:51000                                            198.51.100.10:443
             \\                                                         /
              +-------------------------------------------------------+
              | TCP CONNECTION FOUR-TUPLE:                            |
              | (Src IP: 192.0.2.20, Src Port: 51000,                 |
              |  Dest IP: 198.51.100.10, Dest Port: 443)             |
              +-------------------------------------------------------+`
        }
      ],
      table: {
        title: 'Comprehensive Engineering Comparison: Port vs Socket',
        headers: ['Evaluation Parameter', 'Port (Transport Layer Identifier)', 'Socket (OS Communication Endpoint)'],
        rows: [
          ['Basic Definition', 'A 16-bit integer identifying an application service', 'An OS-managed communication endpoint data structure'],
          ['Architectural Layer', 'Layer 4 (Transport Layer field in TCP/UDP header)', 'OS Application Programming Interface (API) layer'],
          ['Representation', 'Integer value ranging from 0 to 65535', 'File descriptor / handle associated with (IP, Port, Protocol)'],
          ['Information Stored', 'Contains only the numerical port number', 'Stores local IP, local port, remote IP, remote port, buffers'],
          ['Operating System Entity', 'Passive numerical address in protocol demultiplexing', 'Active kernel resource with send/receive socket buffers'],
          ['Data Transfer Role', 'Cannot independently transmit or buffer data', 'Provides read(), write(), send(), and recv() operations'],
          ['Connection State', 'Has no concept of connection state', 'Maintains finite state machine (ESTABLISHED, TIME_WAIT)'],
          ['Creation Mechanism', 'Assigned by IANA or selected by operating system', 'Instantiated via socket() system call in software'],
          ['Notation Format', 'Single integer, e.g., 443 or 80', 'Socket Address: IP:Port, e.g., 198.51.100.10:443'],
          ['Multiplexing Role', 'Identifies target service on the host', 'Identifies a unique connection instance via 4-tuple'],
          ['Multiplicity', 'One port can be associated with multiple open sockets', 'Each active connection requires a distinct socket descriptor'],
          ['Standard Analogy', 'Apartment door number inside an apartment building', 'The physical telephone instrument plugged into that door']
        ]
      },
      sections: [
        {
          heading: '1. Port Numbers & IANA Range Classification',
          points: [
            '<b>Definition:</b> A port is a 16-bit unsigned integer (<code>0 to 65535 = 2¹⁶ total</code>) embedded in transport layer headers (TCP/UDP) to deliver segments to the correct application process.',
            '<b>Well-Known Ports (0 to 1023):</b> Reserved by IANA for standardized system services. Examples: HTTP (80), HTTPS (443), DNS (53), SSH (22), SMTP (25), FTP Control (21), SNMP (161). Require administrator/root privileges to bind.',
            '<b>Registered Ports (1024 to 49151):</b> Registered for specific user applications and database services. Examples: MySQL (3306), PostgreSQL (5432), Oracle DB (1521), Microsoft RDP (3389).',
            '<b>Dynamic / Private / Ephemeral Ports (49152 to 65535):</b> Temporarily allocated by the client operating system kernel when initiating an outbound connection. Automatically released upon connection termination.'
          ]
        },
        {
          heading: '2. Socket Architecture & Four-Tuple Identification',
          points: [
            '<b>Definition:</b> A socket is an abstract operating system resource created via the Berkeley Socket API (POSIX) that acts as the bidirectional software endpoint for network I/O.',
            '<b>Socket Address Structure:</b> In IPv4, a socket address is the combination: <code>Socket Address = (IP Address, Port Number)</code>, written as <code>192.0.2.10:8080</code>.',
            '<b>TCP Connection Four-Tuple:</b> An established TCP connection is uniquely identified by the 4-tuple: <code>(Source IP, Source Port, Destination IP, Destination Port)</code>.',
            '<b>Demultiplexing Proof:</b> Why can thousands of clients connect to a single web server on Port 443 simultaneously? Because each client connection has a unique 4-tuple! <br>• Connection 1: <code>(ClientA_IP, 50000, Server_IP, 443)</code><br>• Connection 2: <code>(ClientB_IP, 50001, Server_IP, 443)</code><br>The server operating system demultiplexes incoming packets to the exact socket matching the 4-tuple!'
          ]
        },
        {
          heading: '3. Berkeley Sockets System Call Sequence',
          points: [
            '<b>TCP Server Sequence:</b> <code>socket()</code> (creates endpoint) → <code>bind()</code> (binds IP:Port) → <code>listen()</code> (marks as passive listening) → <code>accept()</code> (blocks until client arrives; returns NEW connected socket descriptor) → <code>recv() / send()</code> → <code>close()</code>.',
            '<b>TCP Client Sequence:</b> <code>socket()</code> → <code>connect()</code> (initiates 3-way handshake; kernel automatically binds ephemeral port) → <code>send() / recv()</code> → <code>close()</code>.',
            '<b>UDP Sockets:</b> Because UDP is connectionless, it does not use <code>listen()</code> or <code>accept()</code>. Applications use <code>sendto()</code> and <code>recvfrom()</code> passing destination address structures with each datagram.'
          ]
        },
        {
          heading: '4. Numerical Example',
          points: [
            '<b>Given Parameters:</b> Client IP = <code>203.0.113.25</code>, Client Ephemeral Port = <code>50000</code>. Server IP = <code>198.51.100.40</code>, Server Well-Known Port = <code>443</code> (HTTPS).',
            '<b>Client Socket Address:</b> <code>203.0.113.25:50000</code>.',
            '<b>Server Socket Address:</b> <code>198.51.100.40:443</code>.',
            '<b>Established TCP Connection Four-Tuple:</b> <code>(203.0.113.25, 50000, 198.51.100.40, 443)</code>.'
          ]
        }
      ],
      conclusion: 'A port is a 16-bit transport layer numerical address used for process demultiplexing, whereas a socket is an active operating-system-managed endpoint data structure that combines an IP address, a port number, and connection state. A port number is merely an address component; the socket is the actual software engine that enables applications to transmit and receive data.',
      markingScheme: [
        { component: 'Introduction & Clear Definitions of Port and Socket', marks: '1.5' },
        { component: 'Port Classification (Well-Known, Registered, Ephemeral) & Standard Port Table', marks: '1.5' },
        { component: 'Socket Architecture, Socket Address (IP:Port) & Four-Tuple Identification', marks: '2.0' },
        { component: 'Exhaustive Port vs Socket Comparison Table (≥10 criteria)', marks: '3.0' },
        { component: 'TCP Socket Lifecycle System Calls (socket, bind, listen, accept) & Diagram', marks: '2.0' },
        { component: 'UDP Datagram Socket Working & Contrast with TCP Sockets', marks: '1.0' },
        { component: 'Numerical Example (Four-Tuple Calculation) & Multi-Client Demultiplexing Proof', marks: '2.0' },
        { component: 'Conclusion & Summary', marks: '1.0' }
      ],
      examTip: 'Bhai, port aur socket ka difference likhte waqt sabse common mistake hai socket = IP + port bolkar ruk jaana. Technically IP + port ek socket address hai; actual socket operating system ka communication endpoint hota hai. Ye distinction likhne se answer precise banega.'
    }
  },
  {
    id: 'cn-q57',
    num: 57,
    title: 'TCP vs UDP Comparison & Client-Server Socket Address Numerical',
    unit: 5,
    verified: 'BEU 2022 · Q.9 · 14 Marks',
    years: [2022],
    marks: 14,
    question: 'Explain the difference between TCP and UDP. A client residing on a host with IP address 122.45.12.7 sends a message to a server residing on another host with IP address 200.11.24.59. If the well-known port of the server is 161 and the ephemeral port of the client is 1000, what are the pair of socket addresses used in this communication?',
    solution: {
      verified: 'BEU 2022 · Q.9 · 14 Marks',
      intro: 'The Transport Layer (Layer 4) provides logical, end-to-end process-to-process communication between distributed application programs. In the Internet Protocol suite, transport services are delivered primarily by two contrasting protocols: Transmission Control Protocol (TCP), which offers a connection-oriented, highly reliable byte-stream service, and User Datagram Protocol (UDP), which provides a lightweight, connectionless best-effort datagram service with minimal protocol overhead.',
      diagrams: [
        {
          title: 'TCP Three-Way Handshake Connection vs UDP Connectionless Datagram Flow',
          ascii:
`[ TCP: CONNECTION-ORIENTED (Three-Way Handshake + Reliable Byte Stream) ]
TCP CLIENT (122.45.12.7:1000)                                TCP SERVER (200.11.24.59:161)
       |                                                                   |
       |===== 1. SYN (Seq=100) ===========================================>| [State: SYN_RCVD]
       |<==== 2. SYN+ACK (Seq=300, Ack=101) ===============================|
       |===== 3. ACK (Seq=101, Ack=301) ==================================>| [State: ESTABLISHED]
       |                                                                   |
       |===== 4. DATA SEGMENT (Seq=101, 500 Bytes) =======================>|
       |<==== 5. ACKNOWLEDGEMENT (Ack=601) ================================|
Reliable, sequenced, flow-controlled, congestion-controlled byte stream.

[ UDP: CONNECTIONLESS (Zero Handshake, Standalone Datagrams) ]
UDP CLIENT (122.45.12.7:1000)                                UDP SERVER (200.11.24.59:161)
       |                                                                   |
       |===== DATAGRAM 1 (No connection setup; 8-Byte UDP Header) ========>|
       |<==== DATAGRAM 2 (Independent reply; no ACK required) =============|
Unreliable, unsequenced, no flow control, minimal latency overhead.`
        },
        {
          title: 'Segment Header Architecture: TCP (20 to 60 Bytes) vs UDP (8 Bytes Fixed)',
          ascii:
`1. TCP SEGMENT HEADER (Variable Length: 20 to 60 Bytes):
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        | (16 bits each)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        | (32 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgement Number                     | (32 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Data |Reserved |U|A|P|R|S|F|           Window Size             | (16 bits)
|Offst|         |R|C|S|S|Y|I|                                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |        Urgent Pointer         | (16 bits each)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 Bytes)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

2. UDP SEGMENT HEADER (Fixed Length: Exactly 8 Bytes):
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        | (16 bits each)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            | (16 bits each)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
        }
      ],
      table: {
        title: 'Comprehensive Technical Comparison: TCP vs UDP Transport Protocols',
        headers: ['Technical Feature', 'Transmission Control Protocol (TCP)', 'User Datagram Protocol (UDP)'],
        rows: [
          ['Connection Requirement', 'Connection-Oriented (Requires 3-way handshake)', 'Connectionless (Sends datagrams immediately)'],
          ['Delivery Reliability', 'Guaranteed reliable delivery; lost segments retransmitted', 'Best-effort; no retransmission or delivery guarantee'],
          ['Data Ordering', 'Strictly ordered byte stream (reorders via Sequence Nos)', 'No ordering guarantee (datagrams may arrive out-of-order)'],
          ['Flow Control Mechanism', 'Sliding Window protocol matching receiver window size', 'None; application must handle buffer overflow'],
          ['Congestion Control', 'Yes (Slow Start, Congestion Avoidance, Fast Recovery)', 'None; transmits at full application line rate'],
          ['Header Overhead', '20 to 60 bytes (variable; options supported)', '8 bytes fixed (minimal overhead)'],
          ['Message Boundaries', 'Continuous byte stream (does not preserve frame boundaries)', 'Preserves distinct datagram message boundaries'],
          ['Error Detection', 'Mandatory 16-bit 1’s complement checksum', 'Optional in IPv4; mandatory in IPv6'],
          ['Handshake Overhead', 'Round-trip delay for SYN/SYN-ACK before any data transfer', 'Zero connection establishment latency'],
          ['Communication Mode', 'Strictly Unicast (point-to-point only)', 'Unicast, Broadcast, and Multicast supported'],
          ['State Overhead on Host', 'High (stores sequence numbers, buffers, timers)', 'Stateless; minimal memory consumption on host'],
          ['Typical Applications', 'HTTP/HTTPS, SSH, FTP, SMTP, MySQL, BGP', 'DNS, SNMP (Port 161), DHCP, VoIP, Online Gaming, NTP']
        ]
      },
      sections: [
        {
          heading: '1. Part B — Step-by-Step Socket Address Numerical Solution',
          points: [
            '<b>Given Parameters:</b><br>• Client Host IP Address: <code>122.45.12.7</code><br>• Server Host IP Address: <code>200.11.24.59</code><br>• Server Well-Known Port: <code>161</code><br>• Client Ephemeral Port: <code>1000</code>',
            '<b>Definition of a Socket Address:</b> In computer networking, a socket address identifies a specific transport endpoint on a network host: <br><code>Socket Address = (IP Address, Port Number)</code>, commonly formatted as <code>IP:Port</code>.',
            '<b>1. Client Socket Address:</b><br>Client IP = <code>122.45.12.7</code>, Client Port = <code>1000</code>.<br><code>Client Socket Address = (122.45.12.7, 1000)</code> or <code>122.45.12.7:1000</code>.',
            '<b>2. Server Socket Address:</b><br>Server IP = <code>200.11.24.59</code>, Server Port = <code>161</code>.<br><code>Server Socket Address = (200.11.24.59, 161)</code> or <code>200.11.24.59:161</code>.',
            '<b>3. Required Pair of Socket Addresses:</b><br><code>(122.45.12.7:1000, 200.11.24.59:161)</code>.',
            '<b>4. Connection Four-Tuple:</b><br>For the client-to-server request message: <br><code>(Source IP: 122.45.12.7, Source Port: 1000, Destination IP: 200.11.24.59, Destination Port: 161)</code>.'
          ]
        },
        {
          heading: '2. Directional Message Header Fields (Request vs Reply)',
          points: [
            '<b>Client-to-Server Request Message:</b><br>• Source IP: <code>122.45.12.7</code><br>• Destination IP: <code>200.11.24.59</code><br>• Source Port: <code>1000</code><br>• Destination Port: <code>161</code>',
            '<b>Server-to-Client Reply Message:</b><br>• Source IP: <code>200.11.24.59</code><br>• Destination IP: <code>122.45.12.7</code><br>• Source Port: <code>161</code><br>• Destination Port: <code>1000</code><br><i>Notice that the source and destination addresses are completely swapped in the response!</i>'
          ]
        },
        {
          heading: '3. Protocol Context & Application Insight (Senior Solver Note)',
          points: [
            '<b>Identified Protocol:</b> Well-known port <code>161</code> is the official IANA port assigned to <b>SNMP (Simple Network Management Protocol)</b>.',
            '<b>Transport Protocol:</b> SNMP operates over <b>UDP (User Datagram Protocol)</b> on Port 161 for SNMP queries and agent monitoring.',
            '<b>Ephemeral Port Clarification:</b> Modern IANA ephemeral ports range from 49152 to 65535. Although port <code>1000</code> falls below this modern range, historical implementations and university exam questions explicitly specify custom client ports. We faithfully use the exact value <code>1000</code> as specified in the university paper.'
          ]
        }
      ],
      conclusion: 'TCP provides connection-oriented, reliable, sequenced byte-stream delivery with flow and congestion control at the cost of 20-byte header overhead and connection latency. UDP provides lightweight, connectionless datagram delivery with an 8-byte header and zero handshake delay. For the given BEU numerical, the client socket address is 122.45.12.7:1000 and the server socket address is 200.11.24.59:161, forming the communication pair (122.45.12.7:1000, 200.11.24.59:161).',
      markingScheme: [
        { component: 'Transport Layer Role & TCP vs UDP Fundamental Concepts', marks: '1.0' },
        { component: 'TCP Characteristics, 3-Way Handshake & Segment Header Diagram', marks: '2.0' },
        { component: 'UDP Characteristics, Datagram Model & 8-Byte Header Diagram', marks: '1.5' },
        { component: 'Comprehensive TCP vs UDP Comparison Table (≥10 criteria)', marks: '2.5' },
        { component: 'Socket Address Mathematical Definition & Concept', marks: '1.0' },
        { component: 'Correct Client Socket Address (122.45.12.7:1000)', marks: '1.0' },
        { component: 'Correct Server Socket Address (200.11.24.59:161)', marks: '1.0' },
        { component: 'Client-Server Communication Architecture Diagram', marks: '1.0' },
        { component: 'Four-Tuple Representation & Request/Reply Header Reversal', marks: '1.5' },
        { component: 'Protocol Identification (SNMP over UDP Port 161) & Conclusion', marks: '1.5' }
      ],
      examTip: 'Bhai, numerical ka direct answer hai 122.45.12.7:1000 and 200.11.24.59:161. Client ke port 1000 ko server ke port 161 se interchange mat karna. Request mein client source hota hai aur server destination; reply mein reverse.'
    }
  }

];

const toSolution = ({id, solution}) => ({id, ...solution});
const solutionFor = (id, sourceId) => toSolution({
  id,
  solution: unit5Entries.find((entry) => entry.id === sourceId).solution,
});

export const unit5Solutions = [
  ...unit5Entries.filter(({marks}) => marks === 7).map(toSolution),
  solutionFor('cn-q14', 'cn-q39'),
  {
    id: 'cn-original-2025-100602-q4a',
    verified: 'BEU 2025 · Q.4(a) · 7 Marks · Cross-checked scan',
    intro: 'Transmission Control Protocol (TCP, RFC 793) is a connection-oriented transport layer protocol that provides reliable, in-sequence, full-duplex byte-stream delivery. Before any application data can be exchanged, TCP must establish an end-to-end logical association between sender and receiver sockets using a Three-Way Handshake. This mechanism synchronizes Initial Sequence Numbers (ISNs), allocates receive buffers, and guarantees that delayed duplicate connection requests cannot corrupt active sessions.',
    diagrams: [
      {
        title: 'TCP Three-Way Handshake Timing Ladder with Sequence Numbers & State Transitions',
        ascii:
`TCP CLIENT (Active Open)                                 TCP SERVER (Passive Open)
Socket: 192.168.1.10:52000                               Socket: 203.0.113.80:80
[State: CLOSED]                                          [State: LISTEN]
      |                                                        |
      |==== 1. SYN Segment (Seq = x, ACK = 0, CTL = SYN) =====>| [State: SYN_RCVD]
      |     (Client selects random ISN x; allocates buffers)   | (Server allocates buffers
[State: SYN_SENT]                                              |  and transmission control block)
      |                                                        |
      |<=== 2. SYN + ACK (Seq = y, Ack = x + 1, CTL = SYN,ACK)=|
      |     (Server selects ISN y; acknowledges client x)      |
      |                                                        |
[State: ESTABLISHED]                                           |
      |                                                        |
      |==== 3. ACK Segment (Seq = x + 1, Ack = y + 1, CTL=ACK)=|====> [State: ESTABLISHED]
      |     (Client acknowledges server ISN y; may carry data) |
      v                                                        v
      |================ FULL-DUPLEX DATA TRANSFER OPEN ========|
      |---> PSH/ACK Data Segment (Seq = x + 1, Ack = y + 1) -->|
      |<--- ACK Segment (Seq = y + 1, Ack = x + 1 + length) ---|`
      },
      {
        title: 'Why a Two-Way Handshake Fails: The Delayed Duplicate SYN Hazard',
        ascii:
`CLIENT                                                     SERVER
  |                                                          |
  |--- Old Delayed SYN (Seq = x) from dead connection ------>| Server accepts!
  |<-- SYN-ACK (Seq = y, Ack = x + 1) -----------------------| Server enters ESTABLISHED!
  |                                                          | (Server allocates buffers,
  |??? Client receives unexpected SYN-ACK for unknown conn   |  wasting RAM and state)
  |--- RST (Reset) Segment --------------------------------->| Connection aborted!
With only a 2-way handshake, the server would remain locked in a half-open state indefinitely!`
      }
    ],
    table: {
      title: 'TCP Connection State Transition Matrix (Client vs Server)',
      headers: ['TCP State', 'Participating Host', 'Triggering Event / API Call', 'Transmitted Segment', 'Next State'],
      rows: [
        ['CLOSED', 'Server', 'Passive Open: listen() system call', 'None', 'LISTEN'],
        ['CLOSED', 'Client', 'Active Open: connect() system call', 'SYN (Seq = x)', 'SYN_SENT'],
        ['LISTEN', 'Server', 'Receives SYN from Client', 'SYN + ACK (Seq = y, Ack = x + 1)', 'SYN_RCVD'],
        ['SYN_SENT', 'Client', 'Receives SYN + ACK from Server', 'ACK (Seq = x + 1, Ack = y + 1)', 'ESTABLISHED'],
        ['SYN_RCVD', 'Server', 'Receives ACK from Client', 'None (Connection Ready)', 'ESTABLISHED'],
        ['ESTABLISHED', 'Both', 'Bidirectional full-duplex data stream', 'Data segments (PSH, ACK)', 'ESTABLISHED']
      ]
    },
    sections: [
      {
        heading: '1. Step-by-Step Three-Way Handshake Procedure',
        points: [
          '<b>Step 1 — SYN (Client to Server):</b><br>• The client process executes <code>connect()</code>, sending a TCP segment with the control bit <code>SYN = 1</code> and <code>ACK = 0</code>.<br>• Client picks a pseudo-random 32-bit Initial Sequence Number (ISN) <code>x</code> (clock-driven to avoid collisions with old sessions).<br>• SYN consumes exactly one sequence number. Client transitions from <code>CLOSED</code> to <code>SYN_SENT</code>.',
          '<b>Step 2 — SYN + ACK (Server to Client):</b><br>• The server, operating in <code>LISTEN</code> mode, receives the SYN segment, allocates a Transmission Control Block (TCB) and socket buffers, and enters <code>SYN_RCVD</code>.<br>• Server responds with both <code>SYN = 1</code> and <code>ACK = 1</code>.<br>• It declares its own independent ISN <code>y</code> and acknowledges client sequence number: <code>Acknowledgment Number = x + 1</code>.',
          '<b>Step 3 — ACK (Client to Server):</b><br>• The client receives the SYN+ACK, transitions into <code>ESTABLISHED</code> state, and sends the final confirmation segment with <code>ACK = 1, SYN = 0</code>.<br>• Sequence number is <code>x + 1</code>, and <code>Acknowledgment Number = y + 1</code>.<br>• This segment may piggyback the first byte of application data. Upon receipt, the server enters <code>ESTABLISHED</code>. Both endpoints are now synchronized and ready for full-duplex data exchange.'
        ]
      },
      {
        heading: '2. Why Three Messages Are Mathematically Necessary',
        points: [
          '<b>1. Independent Sequence Number Synchronization:</b> TCP is full-duplex (two independent simplex streams). Each direction requires one message to announce its sequence number and one message to confirm receipt. By piggybacking the server’s acknowledgment with its own SYN (Step 2), four steps are optimized into three.',
          '<b>2. Preventing Half-Open Connections (Delayed Duplicate SYN):</b> Suppose an old SYN segment was delayed in intermediate routers and arrives at the server after the client has closed the old session. Under a two-way handshake, the server would open a connection and allocate resources. In a three-way handshake, the client receives an unexpected SYN+ACK, notices an obsolete acknowledgment number, and replies with a <code>RST</code> (Reset) segment, protecting the server from memory exhaustion.'
        ]
      }
    ],
    conclusion: 'The TCP Three-Way Handshake guarantees mutual synchronization of sequence numbers and protects both endpoints against phantom duplicate requests, providing a solid foundation for reliable, full-duplex Internet communications.',
    markingScheme: [
      { component: 'Purpose of Connection Establishment & Full-Duplex Synchronization', marks: '1.5' },
      { component: 'Complete Labelled Three-Way Handshake Timing Ladder & State Diagram', marks: '2.0' },
      { component: 'Detailed Step-by-Step Message Analysis (SYN, SYN-ACK, ACK Arithmetic)', marks: '1.5' },
      { component: 'Mathematical Proof: Why a Two-Way Handshake Fails (Delayed Duplicate SYN)', marks: '1.0' },
      { component: 'TCP Connection State Transition Table & Conclusion', marks: '1.0' }
    ],
    examTip: 'Examiners check for explicit acknowledgment numbers: Step 2 must show Ack = x + 1, and Step 3 must show Ack = y + 1. Always state that SYN consumes 1 sequence number even though it carries 0 bytes of payload.'
  },
  {
    id: 'cn-original-2025-100602-q5b',
    verified: 'BEU 2025 · Q.5(b) · 7 Marks · Cross-checked scan',
    intro: 'Traffic shaping is a proactive congestion-management mechanism operating at the Transport and Network layers that regulates the rate and volume of traffic transmitted into a network. The Leaky Bucket algorithm, proposed by Jonathan Turner in 1986, is the classical traffic shaping and rate-limiting algorithm that converts bursty, unpredictable packet arrivals into a smooth, strictly constant-rate output stream.',
    diagrams: [
      {
        title: 'Leaky Bucket Traffic Shaping Architecture & Finite Buffer Mechanics',
        ascii:
`            BURSTY PACKET ARRIVALS (Unpredictable peaks)
                         |
                         |  (Variable rate: e.g., 10 Mbps burst)
                         v
            +-------------------------+
            |      LEAKY BUCKET       |
            |     (Finite Queue C)    |  <--- If buffer overflows (Queue > C),
            | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ |       excess incoming packets are DROPPED!
            | Buffered Packet Packets |
            +-------------------------+
                         |
                         | Water leaks through hole at strictly CONSTANT rate
                         v
            [ REGULATED OUTPUT STREAM ] ====> Transmitted to network at
            (Smoothed, uniform rate: r)       constant rate (e.g., 2 Mbps)`
      },
      {
        title: 'Traffic Waveform: Bursty Inflow vs Constant Leaky Bucket Outflow',
        ascii:
`Traffic Rate (Mbps)
10 |      +---+               +---+
 8 |      |   | (Burst)       |   | (Burst)
 6 |      |   |               |   |
 4 |      |   |               |   |
 2 |------+---+---------------+---+------------------> Time
   |
   |==== TRANSFORMS THROUGH LEAKY BUCKET TO: ====>
   |
 2 |-------------------------------------------------> Time (Constant Rate r = 2 Mbps)`
      }
    ],
    table: {
      title: 'Comprehensive Engineering Comparison: Leaky Bucket vs Token Bucket',
      headers: ['Evaluation Parameter', 'Leaky Bucket Algorithm', 'Token Bucket Algorithm'],
      rows: [
        ['Primary Objective', 'Traffic smoothing (eliminates all bursts)', 'Traffic shaping & policing (allows bounded bursts)'],
        ['Output Transmission Rate', 'Strictly uniform, constant rate (no bursts allowed)', 'Average rate r, but allows short bursts at peak line speed M'],
        ['Bucket Contents', 'Holds actual data packets in a FIFO buffer queue', 'Holds virtual tokens (permissions) generated at rate r'],
        ['Action on Idle Link', 'Idle capacity is lost; cannot save transmission credits', 'Accumulates tokens up to maximum bucket capacity b'],
        ['Packet Discard Condition', 'Packets are discarded when packet queue C overflows', 'Tokens are discarded when token bucket b overflows (packets wait)'],
        ['Hardware Implementation', 'Single FIFO queue drained by a timer interrupt', 'Token generator counter and packet transmission gate'],
        ['Application Suitability', 'ATM networks, fixed-rate audio/video streaming', 'Burst-tolerant IP networks, cloud API rate limiting']
      ]
    },
    sections: [
      {
        heading: '1. Operational Principles of the Leaky Bucket',
        points: [
          '<b>The Physical Metaphor:</b> Imagine a water bucket with a small hole drilled at the bottom. Water can be poured in bursts, but it leaks out at a constant, steady rate. If water is poured in faster than it leaks and the bucket fills to its brim (capacity <code>C</code>), overflow water spills over the edge and is lost.',
          '<b>Data Network Implementation:</b><br>• The bucket is implemented as a finite First-In First-Out (FIFO) queue of capacity <code>C</code> bytes (or packets).<br>• Irregular, bursty packet streams from the host are enqueued into the FIFO buffer.<br>• At fixed periodic clock ticks, the queue interface transmits packets at a strictly regulated constant rate <code>r</code> bytes/second.<br>• <b>Buffer Overflow Handling:</b> If the buffer is completely full when a new packet arrives, the packet is immediately dropped (packet loss). This enforces strict adherence to Service Level Agreements (SLAs).'
        ]
      },
      {
        heading: '2. Worked Numerical Example of Traffic Shaping',
        points: [
          '<b>Given Parameters:</b> Bucket capacity <code>C = 12 MB</code>, Constant leak output rate <code>r = 2 MB/s</code>. The network experiences an initial burst of data arriving at <code>10 MB/s</code> for <code>2 seconds</code>.',
          '<b>Step 1 — Total Arrived Data in 2 seconds:</b><br><code>Data_in = 10 MB/s × 2 s = 20 MB</code>.',
          '<b>Step 2 — Data Discharged During Burst:</b><br><code>Data_out = 2 MB/s × 2 s = 4 MB</code>.',
          '<b>Step 3 — Net Data Accumulated in Buffer:</b><br><code>Accumulated = Data_in - Data_out = 20 MB - 4 MB = 16 MB</code>.',
          '<b>Step 4 — Packet Drop & Buffer Status:</b><br>Since bucket capacity is <code>C = 12 MB</code>, excess data is dropped: <br><code>Dropped Data = 16 MB - 12 MB = 4 MB</code>.<br>The bucket is now completely full (12 MB).',
          '<b>Step 5 — Time to Empty Remaining Buffer:</b><br><code>T_empty = 12 MB / 2 MB/s = 6 seconds</code>.<br>Total transmission time = <code>2 s (during burst) + 6 s (draining) = 8 seconds</code>.'
        ]
      }
    ],
    conclusion: 'The Leaky Bucket algorithm provides deterministic rate limiting and traffic smoothing by forcing bursty network traffic into a constant-rate stream, protecting downstream routers from buffer bloat and congestion collapse.',
    markingScheme: [
      { component: 'Traffic Shaping Definition & Leaky Bucket Metaphor', marks: '1.5' },
      { component: 'Neat Architectural Diagrams (Bucket Structure & Waveform Smoothing)', marks: '2.0' },
      { component: 'Rate-Limiting & Traffic Policing Mechanisms (Buffer vs Drop)', marks: '1.5' },
      { component: 'Worked Numerical Example with Step-by-Step Drop Calculations', marks: '1.0' },
      { component: 'Leaky Bucket vs Token Bucket Comparison Table & Conclusion', marks: '1.0' }
    ],
    examTip: 'Include the numerical example showing arrived data, transmitted data, accumulated buffer, and dropped bytes. This demonstrates practical mastery of traffic shaping to university examiners.'
  },
];
export const unit5SupplementalSolutions = unit5Entries
  .filter(({marks}) => marks !== 7)
  .map(toSolution);
