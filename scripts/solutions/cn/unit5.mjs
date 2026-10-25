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
      intro: 'Congestion in computer networks occurs when the aggregate packet arrival rate exceeds the forwarding or buffering capacity of intermediate routers, causing queue overflow, packet drops, and throughput collapse.',
      diagrams: [
        {
          title: 'TCP Congestion Window (cwnd) Evolution Curve Across Phases',
          ascii:
`cwnd (MSS)
  ^
16|                              [ CONGESTION AVOIDANCE (AIMD) ]
  |                              /|
12|                             / |
  |                            /  | <--- 3 Duplicate ACKs (Triple Dup ACK)
 8|            +--------------+   |
  |           / [ssthresh = 8]    | [Fast Recovery: cwnd = ssthresh + 3]
 4|          /                    |\\
  |         / [SLOW START]        | \\
 2|        /                      |  \\
 1|---+---+                       +---+------------------------> Time (RTTs)
      0   1   2   3   4   5   6   7   8   9  10  11  12`
        }
      ],
      sections: [
        {
          heading: '1. Three Fundamental Transport-Layer Policies',
          points: [
            '<b>1. Slow Start:</b> Begins at <code>cwnd = 1 MSS</code>. For every received ACK, cwnd increases by 1 MSS (effectively doubling cwnd every RTT: 1 → 2 → 4 → 8). Exponential growth continues until cwnd reaches the slow-start threshold (<code>ssthresh</code>).',
            '<b>2. Congestion Avoidance (Additive Increase):</b> Once <code>cwnd ≥ ssthresh</code>, growth shifts to linear increase: <code>cwnd = cwnd + 1 MSS</code> per RTT. Probes for available bandwidth cautiously without overwhelming buffers.',
            '<b>3. Fast Retransmit & Fast Recovery (Multiplicative Decrease):</b><br>• <i>Fast Retransmit:</i> When sender receives 3 duplicate ACKs for the same segment, it assumes the packet was dropped and immediately retransmits it without waiting for the retransmission timer to expire.<br>• <i>Fast Recovery:</i> Instead of resetting cwnd back to 1 (which TCP Tahoe did), TCP Reno sets <code>ssthresh = cwnd / 2</code> and <code>cwnd = ssthresh + 3 MSS</code>, continuing linear increase.'
          ]
        }
      ],
      conclusion: 'By combining exponential probing (Slow Start), additive increase (Avoidance), and multiplicative decrease (Fast Recovery), TCP stabilizes global Internet traffic without central coordination.',
      markingScheme: [
        { component: 'Network Congestion Definition & Symptoms', marks: '1.0' },
        { component: 'Slow Start Mechanism & Exponential Growth Formula', marks: '1.5' },
        { component: 'Congestion Avoidance (AIMD) Mechanism', marks: '1.5' },
        { component: 'Fast Retransmit & Fast Recovery (3 Duplicate ACKs)', marks: '1.5' },
        { component: 'Labelled cwnd vs Time Progression Graph', marks: '1.5' }
      ],
      examTip: 'Label ssthresh clearly on the graph where the exponential curve transitions into a straight line (linear growth).'
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
      intro: 'Traffic shaping controls the volume and rate of traffic sent into a network to ensure QoS. Leaky Bucket and Token Bucket are the two primary traffic shaping algorithms used in packet networks.',
      diagrams: [
        {
          title: 'Leaky Bucket (Rigid Uniform Rate) vs Token Bucket (Bursts Allowed)',
          ascii:
`[ LEAKY BUCKET ]                                [ TOKEN BUCKET ]
Bursty Packet Inflow                            Tokens generated at rate r
       |                                                |
       v                                                v
+--------------+                                +--------------+
| Packet Queue | (Fixed capacity C)             | Token Bucket | (Capacity b)
+--------------+                                +--------------+
       |                                                |
       | Water leaks at CONSTANT rate                   v (Packet grabs token)
       v                                         +--------------+
Strictly Constant Output Stream                  | Output Gate  | ===> Burst Out
(Bursts completely eliminated)                   +--------------+      at Peak M`
        }
      ],
      sections: [
        {
          heading: '1. Leaky Bucket Algorithm',
          points: [
            'Buffers incoming bursty packets in a finite queue of capacity C.',
            'Discharges packets at a strictly uniform, constant rate (r), regardless of inflow rate.',
            'If packet inflow exceeds bucket capacity, subsequent packets overflow and are dropped.',
            'Cannot transmit bursts even if the network link is completely idle.'
          ]
        },
        {
          heading: '2. Token Bucket Algorithm & Maximum Burst Equation',
          points: [
            'Tokens are deposited into a token bucket of capacity b at a constant rate r tokens/sec.',
            'To transmit a packet of size m bytes, m tokens are removed from the bucket. If not enough tokens, packet waits.',
            'When the bucket is full (b tokens accumulated during idle periods), the sender can transmit a short burst at maximum link speed M.',
            '<b>Maximum Burst Duration Formula:</b> Let burst duration be S seconds. Total bytes transmitted during burst = <code>b + r × S</code>.<br>At peak rate M: <code>M × S = b + r × S ⇒ S = b / (M - r) seconds</code>.'
          ]
        }
      ],
      table: {
        title: 'Comparison: Leaky Bucket vs Token Bucket',
        headers: ['Feature', 'Leaky Bucket Algorithm', 'Token Bucket Algorithm'],
        rows: [
          ['Output Rate', 'Strictly constant, uniform rate', 'Average rate r, but allows bursts up to peak rate M'],
          ['Burst Handling', 'Smooths bursts; bursts never transmitted', 'Allows controlled, bounded bursts'],
          ['Discard Behavior', 'Discards packets when queue fills', 'Discards tokens when token bucket fills (never drops packets)'],
          ['Resource Saved', 'Buffers packets', 'Accumulates tokens (virtual permissions)'],
          ['Token Dependency', 'No tokens used', 'Packet must capture token to transmit']
        ]
      },
      conclusion: 'Token Bucket provides superior flexibility for computer data because it accommodates natural bursts while enforcing long-term average bandwidth limits.',
      markingScheme: [
        { component: 'Leaky Bucket Working Principle & Constant Leak Rate', marks: '1.5' },
        { component: 'Token Bucket Working Principle & Token Accumulation', marks: '1.5' },
        { component: 'Neat Architectural Diagrams for Both Algorithms', marks: '1.5' },
        { component: 'Maximum Burst Duration Derivation [S = b / (M - r)]', marks: '1.5' },
        { component: 'Comparison Table & Conclusion', marks: '1.0' }
      ],
      examTip: 'Always write down the burst formula S = b / (M - r). Examiners look specifically for this mathematical expression.'
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
      intro: 'Transmission Control Protocol (TCP) establishes an end-to-end full-duplex byte-stream connection using a Three-Way Handshake and terminates it using a Four-Way Handshake with symmetric half-closes.',
      diagrams: [
        {
          title: 'TCP 3-Way Handshake & 4-Way Teardown Timing Ladder',
          ascii:
`CLIENT (Active Open)                                SERVER (Passive Open)
  |                                                    | (LISTEN)
  |---- SYN, Seq=x ----------------------------------->| (SYN_RCVD)
  |<--- SYN-ACK, Seq=y, Ack=x+1 -----------------------|
  |---- ACK, Seq=x+1, Ack=y+1 ------------------------>| (ESTABLISHED)
  |                                                    |
  |================ CONNECTION ESTABLISHED ============|
  |                                                    |
  |---- FIN, Seq=u ----------------------------------->| (CLOSE_WAIT)
  |<--- ACK, Ack=u+1 ----------------------------------|
  |                                                    | (Server finishes data)
  |<--- FIN, Seq=v ------------------------------------| (LAST_ACK)
  |---- ACK, Ack=v+1 --------------------------------->| (CLOSED)
  | [TIME_WAIT State: Wait 2MSL = 120s]                |
  v (CLOSED)                                           v`
        }
      ],
      sections: [
        {
          heading: '1. Three-Way Handshake (Connection Establishment)',
          points: [
            '<b>Step 1 (SYN):</b> Client selects random Initial Sequence Number (ISN) x and transmits <code>SYN = 1, Seq = x</code>.',
            '<b>Step 2 (SYN-ACK):</b> Server allocates buffers and responds with <code>SYN = 1, ACK = 1, Seq = y, Ack = x + 1</code>.',
            '<b>Step 3 (ACK):</b> Client acknowledges server’s sequence number: <code>ACK = 1, Seq = x + 1, Ack = y + 1</code>. May carry user payload.'
          ]
        },
        {
          heading: '2. Four-Way Handshake & Why 2MSL TIME-WAIT is Mandatory',
          points: [
            '<b>Four-Way Teardown:</b> Because TCP is full-duplex, each direction closes independently (FIN from client, ACK from server; then FIN from server, ACK from client).',
            '<b>Why 2MSL TIME-WAIT (2 × Maximum Segment Lifetime ≈ 120s):</b><br>• <i>Reason 1: Reliable Final ACK Delivery:</i> If client’s final ACK is lost, server retransmits FIN. The client must stay alive in TIME-WAIT to re-send the ACK, preventing server from hanging in LAST_ACK.<br>• <i>Reason 2: Clearing Phantom Duplicate Segments:</i> Ensures all delayed duplicate segments from the old connection dissipate in the network before the same socket pair (IP:Port) can be reused.'
          ]
        }
      ],
      conclusion: 'TCP connection management guarantees synchronized sequence numbers before data transfer and prevents duplicate cross-connection data corruption via the 2MSL TIME-WAIT state.',
      markingScheme: [
        { component: 'Three-Way Handshake Sequence Number Flow', marks: '2.0' },
        { component: 'Neat Handshake & Teardown Timing Diagrams', marks: '2.0' },
        { component: 'Four-Way Teardown Half-Close Explanation', marks: '1.5' },
        { component: 'Justification of 2MSL TIME-WAIT State (2 reasons)', marks: '1.5' }
      ],
      examTip: 'Draw separate labelled sequence diagrams for SYN → SYN-ACK → ACK setup and FIN/ACK teardown; state that TIME-WAIT lasts 2MSL so delayed duplicates expire and the final ACK can be retransmitted.'
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
        title: 'Comprehensive Comparison: TCP vs UDP',
        headers: ['Feature Parameter', 'Transmission Control Protocol (TCP)', 'User Datagram Protocol (UDP)'],
        rows: [
          ['Connection Model', 'Connection-oriented (requires 3-way handshake)', 'Connectionless (no handshake, sends directly)'],
          ['Delivery Reliability', 'Guaranteed (uses ACKs, retransmissions, timeouts)', 'Unreliable / Best-effort (packets can be lost/duplicated)'],
          ['Byte Ordering', 'Strictly ordered byte stream (in-sequence delivery)', 'No sequencing; datagrams can arrive out of order'],
          ['Header Overhead', '20 bytes base (up to 60 bytes with options)', 'Fixed 8 bytes only (minimal protocol tax)'],
          ['Flow Control', 'Yes (Sliding Window based on receiver window rwnd)', 'No flow control mechanism'],
          ['Congestion Control', 'Yes (Slow Start, Congestion Avoidance, Fast Recovery)', 'No built-in congestion control'],
          ['Transmission Mode', 'Unicast only (point-to-point connection)', 'Supports Unicast, Multicast, and Broadcast'],
          ['Data Framing Boundary', 'Stream-oriented (continuous byte stream, no boundaries)', 'Message-oriented (preserves application packet boundaries)'],
          ['Speed & Latency', 'Higher latency due to handshakes and ACKs', 'Ultra-fast, lowest latency (ideal for real-time traffic)']
        ]
      },
      sections: [
        {
          heading: '1. Engineering Trade-offs & Application Mapping',
          points: [
            '<b>When to use TCP:</b> When absolute data integrity is required and losing a single byte would corrupt the transaction (e.g., HTTP/HTTPS web browsing, FTP file transfer, SSH remote terminals, SMTP/IMAP email, database transactions).',
            '<b>When to use UDP:</b> When speed, timely delivery, and low overhead outweigh packet loss tolerance (e.g., DNS name queries, VoIP audio calls, live video streaming, DHCP address configuration, SNMP network telemetry, online gaming).'
          ]
        }
      ],
      conclusion: 'TCP prioritizes absolute reliability, flow control, and data ordering at the expense of higher latency, whereas UDP prioritizes minimal delay and low protocol overhead for real-time and query-based network applications.',
      markingScheme: [
        { component: 'Architectural Overview & Connection Philosophy', marks: '1.0' },
        { component: 'Neat Labelled Header Format Diagrams (TCP & UDP)', marks: '2.0' },
        { component: 'Comparison Table (≥7 parameters)', marks: '2.0' },
        { component: 'Flow Control & Congestion Control Comparison', marks: '1.0' },
        { component: 'Application Protocol Mapping & Use Cases', marks: '1.0' }
      ],
      examTip: 'Examiners award top marks for drawing the 8-byte UDP header precisely (Port, Port, Length, Checksum) and explaining why real-time voice (VoIP) prefers UDP over TCP (retransmitting old audio packets is useless in live talk).'
    }
  }
,
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
    intro: 'TCP establishes a reliable, full-duplex connection using a three-way handshake that synchronizes initial sequence numbers and confirms both endpoints can send and receive.',
    sections: [
      {heading: '1. Three-way handshake', points: [
        '<b>Step 1 — SYN:</b> The client sends a SYN segment with initial sequence number <code>x</code> and enters SYN-SENT.',
        '<b>Step 2 — SYN + ACK:</b> The server replies with SYN and ACK, its initial sequence number <code>y</code>, and acknowledgement <code>x+1</code>. It enters SYN-RECEIVED.',
        '<b>Step 3 — ACK:</b> The client sends acknowledgement <code>y+1</code>. Both sides have now acknowledged the peer’s SYN; the connection can carry data.',
      ]},
      {heading: '2. Why three messages are needed', points: [
        'Each SYN consumes one sequence number. The final ACK confirms that the client received the server’s sequence number and response, while the server has already confirmed receipt of the client’s SYN.',
        'The handshake establishes connection state and initial sequence-number synchronization; it does not itself guarantee that the application has accepted or processed data.',
      ]},
    ],
    diagrams: [{
      title: 'TCP Three-way Connection Establishment',
      ascii: 'Client                                      Server\n  | ---- SYN, seq=x --------------------------> |\n  | <--- SYN+ACK, seq=y, ack=x+1 ------------- |\n  | ---- ACK, ack=y+1 ------------------------> |\n  |         Connection established             |',
    }],
    conclusion: 'TCP establishes a connection through SYN, SYN+ACK, and ACK, synchronizing the initial sequence numbers in both directions.',
    markingScheme: [
      {component: 'Purpose of connection establishment', marks: '1'},
      {component: 'Client SYN and sequence number', marks: '1'},
      {component: 'Server SYN+ACK and acknowledgement', marks: '2'},
      {component: 'Final ACK and connection states', marks: '1.5'},
      {component: 'Sequence-number synchronization and conclusion', marks: '1.5'},
    ],
    examTip: 'Write the acknowledgement values explicitly: the server acknowledges <code>x+1</code> and the client acknowledges <code>y+1</code>.',
  },
  {
    id: 'cn-original-2025-100602-q5b',
    verified: 'BEU 2025 · Q.5(b) · 7 Marks · Cross-checked scan',
    intro: 'The Leaky Bucket algorithm shapes or rate-limits traffic by releasing queued packets at a controlled, approximately constant rate.',
    diagrams: [{
      title: 'Leaky Bucket Traffic Shaping',
      ascii: 'Bursty input packets\n        ↓\n  +-------------+       fixed-rate output\n  | finite queue| -----------------------> network\n  +-------------+\n        ↓\n packets arriving when the queue is full are discarded',
    }],
    sections: [
      {heading: '1. Operation', points: [
        'Incoming packets enter a finite buffer (the bucket). The scheduler transmits queued packets at a configured rate, smoothing bursts into a steadier output stream.',
        'If packets arrive faster than the service rate for long enough to fill the buffer, additional packets are dropped or marked according to the implementation. A packet-based bucket drains by transmitting packets; a byte-based bucket can enforce a bit rate.',
      ]},
      {heading: '2. Traffic shaping and rate limiting', points: [
        'For shaping, the queue delays excess packets until capacity is available, subject to buffer size and delay limits. For policing, an implementation may discard or remark traffic that exceeds the configured rate instead of buffering it.',
        'The algorithm bounds output burstiness and protects downstream links, but it may increase delay and lose packets when the queue is full. Unlike a token bucket, a strict leaky-bucket shaper does not preserve idle capacity as a large future burst allowance.',
      ]},
    ],
    conclusion: 'A finite queue and fixed drain rate smooth traffic and enforce a rate; excess traffic waits when shaping is possible and is discarded or marked when the bucket is full.',
    markingScheme: [
      {component: 'Definition and purpose', marks: '1'},
      {component: 'Finite bucket/queue and fixed output rate', marks: '2'},
      {component: 'Traffic-shaping behavior', marks: '1.5'},
      {component: 'Rate-limiting/policing and overflow behavior', marks: '1.5'},
      {component: 'Benefits, delay/loss limitation, conclusion', marks: '1'},
    ],
    examTip: 'State both the fixed drain rate and what happens when the finite bucket is full.',
  },
];
export const unit5SupplementalSolutions = unit5Entries
  .filter(({marks}) => marks !== 7)
  .map(toSolution);
