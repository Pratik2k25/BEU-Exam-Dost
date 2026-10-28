const unit4Entries = [
  {
    id: 'cn-q34',
    num: 34,
    title: 'ISP Address Allocation Using VLSM (190.100.0.0/16)',
    unit: 4,
    verified: 'BEU 2024 · Q.5(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'An ISP is granted a block of addresses starting with 190.100.0.0/16 (65,536 addresses). The ISP needs to distribute these addresses to three groups of customers: (1) 64 customers each needing 256 addresses, (2) 128 customers each needing 128 addresses, (3) 128 customers each needing 64 addresses. Design the subblocks, give first and last address in each group, and find unused addresses.',
    solution: {
      verified: 'BEU 2024 · Q.5(b) · 7 Marks',
      intro: 'Variable Length Subnet Masking (VLSM) and Classless Inter-Domain Routing (CIDR) allow hierarchical allocation of IP addresses according to exact organizational needs, minimizing address wastage.',
      diagrams: [
        {
          title: 'Hierarchical CIDR Address Space Partitioning',
          ascii:
`[ TOTAL ISP BLOCK: 190.100.0.0/16 (65,536 Addresses) ]
+------------------------------------+------------------------------------+
|   GROUP 1: 64 /24s (16,384 Addrs)  |   GROUP 2: 128 /25s (16,384 Addrs) |
| 190.100.0.0 to 190.100.63.255      | 190.100.64.0 to 190.100.127.255    |
+-----------------+------------------+------------------------------------+
| GROUP 3: 128/26s| UNUSED / UNALLOCATED ISP CAPACITY                     |
| (8,192 Addrs)   | 24,576 Available Addresses (190.100.160.0 to .255.255)|
| .128.0 - .159.255+------------------------------------------------------+`
        }
      ],
      sections: [
        {
          heading: '1. Group 1 Allocation (64 Customers × 256 Addresses)',
          points: [
            'Each customer requires 256 addresses: <code>2⁸ = 256 ⇒ Host bits = 8</code>.',
            'Prefix length: <code>32 - 8 = /24</code> (Mask: <code>255.255.255.0</code>).',
            'Customer 1: <code>190.100.0.0/24</code> (Range: 190.100.0.0 – 190.100.0.255)',
            'Customer 64: <code>190.100.63.0/24</code> (Range: 190.100.63.0 – 190.100.63.255)',
            'Group 1 Total: <code>64 × 256 = 16,384 addresses</code> (Range: 190.100.0.0 – 190.100.63.255).'
          ]
        },
        {
          heading: '2. Group 2 Allocation (128 Customers × 128 Addresses)',
          points: [
            'Each customer requires 128 addresses: <code>2⁷ = 128 ⇒ Host bits = 7</code>.',
            'Prefix length: <code>32 - 7 = /25</code> (Mask: <code>255.255.255.128</code>).',
            'Next available address starts at: <code>190.100.64.0</code>.',
            'Customer 1: <code>190.100.64.0/25</code> (Range: 190.100.64.0 – 190.100.64.127)',
            'Customer 128: <code>190.100.127.128/25</code> (Range: 190.100.127.128 – 190.100.127.255)',
            'Group 2 Total: <code>128 × 128 = 16,384 addresses</code> (Range: 190.100.64.0 – 190.100.127.255).'
          ]
        },
        {
          heading: '3. Group 3 Allocation (128 Customers × 64 Addresses)',
          points: [
            'Each customer requires 64 addresses: <code>2⁶ = 64 ⇒ Host bits = 6</code>.',
            'Prefix length: <code>32 - 6 = /26</code> (Mask: <code>255.255.255.192</code>).',
            'Next available address starts at: <code>190.100.128.0</code>.',
            'Customer 1: <code>190.100.128.0/26</code> (Range: 190.100.128.0 – 190.100.128.63)',
            'Customer 128: <code>190.100.159.192/26</code> (Range: 190.100.159.192 – 190.100.159.255)',
            'Group 3 Total: <code>128 × 64 = 8,192 addresses</code> (Range: 190.100.128.0 – 190.100.159.255).'
          ]
        },
        {
          heading: '4. Total Allocated & Unused Addresses Calculation',
          points: [
            'Total Allocated: <code>16,384 (Gr 1) + 16,384 (Gr 2) + 8,192 (Gr 3) = 40,960 addresses</code>.',
            'Total ISP Capacity: <code>2¹⁶ = 65,536 addresses</code>.',
            '<b>Remaining Unallocated:</b> <code>65,536 - 40,960 = 24,576 addresses</code>.',
            'Unused Address Range: <code>190.100.160.0</code> to <code>190.100.255.255</code> (comprising a /19 block and a /18 block).'
          ]
        }
      ],
      table: {
        title: 'Master VLSM Customer Allocation Table',
        headers: ['Customer Group', 'Customers', 'Addrs/Cust', 'CIDR Mask', 'Start Address', 'End Address', 'Total Allocated'],
        rows: [
          ['Group 1', '64', '256', '/24 (255.255.255.0)', '190.100.0.0', '190.100.63.255', '16,384'],
          ['Group 2', '128', '128', '/25 (255.255.255.128)', '190.100.64.0', '190.100.127.255', '16,384'],
          ['Group 3', '128', '64', '/26 (255.255.255.192)', '190.100.128.0', '190.100.159.255', '8,192'],
          ['Unused', '—', '—', '/19 and /18 blocks', '190.100.160.0', '190.100.255.255', '24,576']
        ]
      },
      conclusion: 'The ISP successfully allocates 40,960 contiguous addresses across 320 customers while retaining 24,576 unallocated addresses for future growth.',
      markingScheme: [
        { component: 'Group 1 Subnet Design & Ranges (16,384 addrs)', marks: '2.0' },
        { component: 'Group 2 Subnet Design & Ranges (16,384 addrs)', marks: '2.0' },
        { component: 'Group 3 Subnet Design & Ranges (8,192 addrs)', marks: '1.5' },
        { component: 'Accurate Unused Address Calculation (24,576 addrs)', marks: '1.5' }
      ],
      examTip: 'Double check the 3rd octet boundary when moving to Group 2: Group 1 ends at 190.100.63.255, so Group 2 MUST start at 190.100.64.0.'
    }
  },
  {
    id: 'cn-q35',
    num: 35,
    title: 'RIP Intra-AS Routing Protocol & Bellman-Ford',
    unit: 4,
    verified: 'BEU 2024 · Q.6(a) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Describe the intra-AS routing protocol RIP in detail. Explain its metric, algorithm, and loop prevention mechanisms.',
    solution: {
      verified: 'BEU 2024 · Q.6(a) · 7 Marks',
      intro: 'Routing Information Protocol (RIP, RFC 1058 / RFC 2453) is a classical Interior Gateway Protocol (IGP) based on the Bellman-Ford Distance Vector algorithm. Widely deployed in small-to-medium autonomous systems, it manages route discovery by periodically sharing routing tables with immediate neighbors.',
      diagrams: [
        {
          title: 'RIP Network Architecture & Periodic Hop-Count Vector Exchange',
          ascii:
`[ RIP ROUTING DOMAIN (Autonomous System) ]
  Network N1              Network N2              Network N3              Network N4
      |                       |                       |                       |
   [ R1 ] <==== 1 Hop ====> [ R2 ] <==== 1 Hop ====> [ R3 ] <==== 1 Hop ====> [ R4 ]
   Port 520                Port 520                Port 520                Port 520

• Periodic Updates: Every 30 seconds, routers broadcast/multicast their entire routing table.
• Distance Metric: Hop Count (1 to 15). Hop Count = 16 signifies INFINITY (Network Unreachable).
• Route from R1 to Network N4: R1 -> R2 -> R3 -> R4 (Total Hop Count = 3).`
        },
        {
          title: 'Count-to-Infinity Failure & Loop Prevention via Poison Reverse',
          ascii:
`[ COUNT-TO-INFINITY PROBLEM ]
  (R1) ---------------- (R2) ---------------- (Link to Dest X FAILS X)
Initial: R2 reaches X (1 hop); R1 reaches X via R2 (2 hops).
Link fails: R2 loses route to X. But R1 advertises "I can reach X with cost 2".
R2 updates: "I can reach X via R1 with cost 3!" Then R1 updates cost to 4, then 5...
Loop continues until metric hits 16 (Infinity), taking minutes of network blackout!

[ POISON REVERSE / SPLIT HORIZON FIX ]
• Split Horizon: R1 NEVER advertises route X back to R2 (the interface it learned it from).
• Poison Reverse: R1 advertises route X back to R2 with metric = 16 (actively poisoning the loop).`
        }
      ],
      sections: [
        {
          heading: '1. Protocol Specifications & Bellman-Ford Equation',
          points: [
            '<b>Hop Count Metric:</b> RIP measures route cost purely by hop count (number of intermediate routers). It treats high-speed 10 Gbps fiber and slow 64 kbps dial-up links identically if both are 1 hop.',
            '<b>Maximum Metric & Infinity (16):</b> Valid hop counts range from 1 to 15. A metric of 16 represents infinity (unreachable destination), bounding the time required to detect network partitions.',
            '<b>Bellman-Ford Algorithmic Principle:</b> Let <code>Dx(y)</code> be the shortest distance from router <code>x</code> to destination <code>y</code>. When router <code>x</code> receives vector advertisements from neighbor <code>v</code> with cost <code>c(x, v)</code>: <br><code>Dx(y) = min_v { c(x, v) + Dv(y) }</code>.'
          ]
        },
        {
          heading: '2. Operational Timers in RIP',
          points: [
            '<b>Periodic Update Timer (30 seconds):</b> Every router transmits an unsolicited RIP Response message containing its complete routing table every 30 seconds (with random jitter of 0–5s to avoid synchronization collisions).',
            '<b>Invalid / Route Timeout Timer (180 seconds):</b> If a router fails to hear an update for an active route within 180 seconds, the route is marked invalid and its metric is set to 16.',
            '<b>Flush / Garbage Collection Timer (120 seconds):</b> Once marked invalid, the route is advertised as unreachable for 120 additional seconds so neighbors learn of the failure, after which it is purged permanently from the routing table.'
          ]
        },
        {
          heading: '3. Routing Loops & 5 Loop-Prevention Mechanisms',
          points: [
            '<b>1. Split Horizon:</b> A router never advertises a route back out of the physical interface through which it was originally learned.',
            '<b>2. Poison Reverse:</b> A stronger variant where the router advertises the learned route back to the source, but with an explicit metric of 16 (infinity), actively killing any potential loop.',
            '<b>3. Route Poisoning:</b> As soon as a local link fails, the detecting router immediately advertises the route with metric 16 rather than waiting for timer expiration.',
            '<b>4. Triggered Updates:</b> When a metric changes, an update is dispatched immediately instead of waiting for the 30-second periodic timer.',
            '<b>5. Hold-Down Timers:</b> When an entry moves to metric 16, the router ignores any new route to that destination for a hold-down period (typically 180s) to allow network-wide convergence.'
          ]
        }
      ],
      table: {
        title: 'Comparative Evolution: RIPv1 vs RIPv2 vs RIPng',
        headers: ['Feature Parameter', 'RIP Version 1 (RFC 1058)', 'RIP Version 2 (RFC 2453)', 'RIPng (RFC 2080)'],
        rows: [
          ['IP Version Support', 'IPv4 only', 'IPv4 only', 'IPv6 only'],
          ['Routing Architecture', 'Classful only (No subnet mask transmitted)', 'Classless (CIDR & VLSM supported)', 'Classless (Prefix length included)'],
          ['Transmission Mechanism', 'IPv4 Broadcast (255.255.255.255)', 'IPv4 Multicast (224.0.0.9)', 'IPv6 Multicast (FF02::9)'],
          ['Route Authentication', 'None (Vulnerable to spoofing)', 'Plain text & MD5 cryptographic authentication', 'Uses IPv6 IPSec AH/ESP'],
          ['Transport Layer Port', 'UDP Port 520', 'UDP Port 520', 'UDP Port 521'],
          ['Maximum Network Diameter', '15 Hops (16 = Infinity)', '15 Hops (16 = Infinity)', '15 Hops (16 = Infinity)']
        ]
      },
      conclusion: 'RIP is lightweight, robust, and easy to deploy in small branch offices, but its 15-hop boundary, slow convergence, and ignorance of link bandwidth make link-state protocols like OSPF the standard for enterprise backbones.',
      markingScheme: [
        { component: 'RIP Overview & Distance Vector Foundations', marks: '1.0' },
        { component: 'Hop Count Metric & 16-Hop Infinity Rule', marks: '1.0' },
        { component: 'Bellman-Ford Formula & 3 Operational Timers', marks: '1.5' },
        { component: 'Count-to-Infinity Diagram & 5 Loop Prevention Techniques', marks: '2.0' },
        { component: 'Comparison Table (RIPv1 vs RIPv2 vs RIPng) & Conclusion', marks: '1.5' }
      ],
      examTip: 'Examiners award full marks when you draw the count-to-infinity loop scenario and explicitly state both the 3 RIP timers (30s, 180s, 120s) and the difference between Split Horizon and Poison Reverse.'
    }
  },
  {
    id: 'cn-q36',
    num: 36,
    title: 'Distance Vector Routing Numerical (5-Node Network)',
    unit: 4,
    verified: 'BEU 2024 · Q.6(b) · 7 Marks',
    years: [2024],
    marks: 7,
    question: 'Explain the distance vector routing algorithm for a 5-node network (A, B, C, D, E). Show the initial routing tables, exchange iterations, and final converged routing tables.',
    solution: {
      verified: 'BEU 2024 · Q.6(b) · 7 Marks',
      intro: 'Distance Vector Routing operates on the principle that each router shares its knowledge of the entire network with its immediate neighbors at regular intervals using the Bellman-Ford equation.',
      diagrams: [
        {
          title: '5-Node Network Topology with Link Costs',
          ascii:
`      (1)            (3)
 (A)--------(B)----------------(C)
  |          |                  |
 (4)        (2)                (1)
  |          |                  |
 (D)--------(E)-----------------+
      (2)            (4)`
        }
      ],
      sections: [
        {
          heading: '1. Topology Link Cost Matrix',
          points: [
            'Links: A–B (1), A–D (4), B–C (3), B–E (2), D–E (2), C–E (1).',
            'Non-adjacent pairs start with cost = ∞.'
          ]
        },
        {
          heading: '2. Initial Routing Vectors (Step 0 - Direct Neighbors Only)',
          points: [
            '<b>At Node A:</b> [A:0, B:1, C:∞, D:4, E:∞]',
            '<b>At Node B:</b> [A:1, B:0, C:3, D:∞, E:2]',
            '<b>At Node C:</b> [A:∞, B:3, C:0, D:∞, E:1]',
            '<b>At Node D:</b> [A:4, B:∞, C:∞, D:0, E:2]',
            '<b>At Node E:</b> [A:∞, B:2, C:1, D:2, E:0]'
          ]
        },
        {
          heading: '3. Iteration 1 Exchange Updates (Applying Bellman-Ford)',
          points: [
            '<b>Node A learns from B & D:</b><br>• Distance to C: <code>min{c(A,B) + D_B(C)} = 1 + 3 = 4</code> (via B).<br>• Distance to E: <code>min{c(A,B) + D_B(E)} = 1 + 2 = 3</code> (via B).<br>• Distance to D: <code>min{c(A,D), c(A,B) + D_B(D)} = min{4, 1 + ∞} = 4</code>.<br>Updated Vector A: <code>[A:0, B:1, C:4, D:4, E:3]</code>.',
            '<b>Node D learns from A & E:</b><br>• Distance to B: <code>c(D,E) + D_E(B) = 2 + 2 = 4</code> (via E).<br>• Distance to C: <code>c(D,E) + D_E(C) = 2 + 1 = 3</code> (via E).<br>Updated Vector D: <code>[A:4, B:4, C:3, D:0, E:2]</code>.'
          ]
        },
        {
          heading: '4. Final Converged Routing Tables (All Nodes Stable)',
          points: [
            '<b>Node A:</b> Dest B (cost 1, next B), Dest C (cost 4, next B), Dest D (cost 4, next D), Dest E (cost 3, next B).',
            '<b>Node B:</b> Dest A (cost 1, next A), Dest C (cost 3, next C or E), Dest D (cost 4, next E), Dest E (cost 2, next E).',
            '<b>Node C:</b> Dest A (cost 4, next B), Dest B (cost 3, next B or E), Dest D (cost 3, next E), Dest E (cost 1, next E).'
          ]
        }
      ],
      conclusion: 'The network converges completely in 2 exchange iterations. Every node obtains the globally shortest path using strictly local neighbor exchanges.',
      markingScheme: [
        { component: 'Network Topology Diagram & Initial Step 0 Vectors', marks: '2.0' },
        { component: 'Bellman-Ford Formula Application in Iteration 1', marks: '2.5' },
        { component: 'Final Converged Distance Vector Tables for All Nodes', marks: '2.5' }
      ],
      examTip: 'Show at least one intermediate vector computation in detail: DA(C) = c(A,B) + DB(C) = 1 + 3 = 4. Examiners reward clear calculation steps!'
    }
  },
  {
    id: 'cn-q43',
    num: 43,
    title: 'Network Address Translation (NAT)',
    unit: 4,
    verified: 'BEU 2023 · Q.9(d) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Write a short note on Network Address Translation (NAT). Explain its types and operational mechanism.',
    solution: {
      verified: 'BEU 2023 · Q.9(d) · 7 Marks',
      intro: 'Network Address Translation (NAT, RFC 3022) is an Internet engineering technique deployed at perimeter routers and firewalls that dynamically translates private (non-routable) IP addresses into globally unique public IP addresses. Designed as an interim solution to slow down IPv4 address depletion, it remains a ubiquitous cornerstone of modern residential and enterprise networks.',
      diagrams: [
        {
          title: 'Network Address Translation (NAT / PAT) Topology & Translation Table',
          ascii:
`[ PRIVATE LOCAL AREA NETWORK ]                     [ NAT ROUTER / GATEWAY ]             [ PUBLIC INTERNET ]
Host A: 192.168.1.10:5001 -----+                     WAN Interface: 203.0.113.1            Web Server:
                               |                     LAN Interface: 192.168.1.1            142.250.190.46:80
Host B: 192.168.1.20:5002 -----+---> [ NAT ENGINE ] ====================================>  (Google Web Server)
                                            |
+----------------------------------------------------------------------------------------------------------+
| NAT / PAT DYNAMIC TRANSLATION TABLE                                                                      |
| Inside Local (Private Socket)   | Inside Global (Public Socket)   | Outside Global (Target Destination)  |
| 192.168.1.10 : 5001             | 203.0.113.1 : 40001             | 142.250.190.46 : 80                  |
| 192.168.1.20 : 5002             | 203.0.113.1 : 40002             | 142.250.190.46 : 80                  |
+----------------------------------------------------------------------------------------------------------+`
        }
      ],
      table: {
        title: 'RFC 1918 Private IPv4 Address Space Allocation',
        headers: ['Address Class', 'CIDR Prefix Block', 'IPv4 Address Range', 'Total Usable IP Addresses', 'Intended Deployment Scope'],
        rows: [
          ['Class A Block', '10.0.0.0 /8', '10.0.0.0 – 10.255.255.255', '16,777,216 hosts', 'Large enterprise networks, cloud datacenters, and ISPs'],
          ['Class B Block', '172.16.0.0 /12', '172.16.0.0 – 172.31.255.255', '1,048,576 hosts', 'Medium-sized organizations, campus networks, and regional subnets'],
          ['Class C Block', '192.168.0.0 /16', '192.168.0.0 – 192.168.255.255', '65,536 hosts', 'Small office / home office (SOHO) and residential Wi-Fi routers']
        ]
      },
      sections: [
        {
          heading: '1. Three Fundamental Flavors of NAT',
          points: [
            '<b>1. Static NAT:</b> Configures a permanent, fixed one-to-one mapping between a private IP address and a registered public IP address. It is strictly bidirectional, allowing external Internet hosts to initiate inbound connections to internal application servers (e.g., private corporate web or mail servers).',
            '<b>2. Dynamic NAT:</b> Maps an unregistered private IP address to an available public IP selected dynamically from a pool of registered public IP addresses on a first-come, first-served basis. When the session terminates, the public IP returns to the shared pool. It saves addresses over static mapping, but simultaneous external connections are strictly limited by pool size.',
            '<b>3. Port Address Translation (PAT / NAT Overload):</b> The most widespread implementation where thousands of private hosts share a <i>single</i> public IPv4 address. The NAT router differentiates concurrent connections by translating both the IP address and the Layer 4 transport-layer port numbers (TCP/UDP). Because a 16-bit port space offers over 60,000 ephemeral ports, an entire corporate office can browse the Internet using one public IP.'
          ]
        },
        {
          heading: '2. Step-by-Step Translation Walkthrough',
          points: [
            '<b>Outbound Packet Translation:</b> Host A (192.168.1.10:5001) transmits an HTTP request to web server (142.250.190.46:80). The NAT gateway intercepts the packet, substitutes Source IP with <code>203.0.113.1</code> and Source Port with <code>40001</code>, logs the mapping in its state table, recalculates IP and TCP checksums, and forwards the packet onto the public Internet.',
            '<b>Inbound Response Translation:</b> The web server replies with Destination IP <code>203.0.113.1:40001</code>. The NAT gateway performs a reverse lookup in its translation table, identifies matching private socket <code>192.168.1.10:5001</code>, restores original headers, recalculates checksums, and delivers the packet onto the LAN.'
          ]
        },
        {
          heading: '3. Architectural Advantages & Engineering Limitations',
          points: [
            '<b>Advantages:</b> Drastically curtails IPv4 exhaustion; enhances internal network security by cloaking private host addressing; eliminates public re-addressing costs when changing ISPs.',
            '<b>Limitations:</b> Violates the end-to-end transparency model of the Internet; breaks protocols that embed IP addresses inside user payloads (e.g., FTP active mode <code>PORT</code> commands require Application Layer Gateways); complicates peer-to-peer VoIP (SIP/RTP) requiring STUN/TURN/ICE traversal servers; incompatible with cryptographic IPSec Authentication Headers (AH) that sign the IP header.'
          ]
        }
      ],
      conclusion: 'NAT extended the operational lifetime of IPv4 by several decades through port multiplexing and topology hiding, bridging global connectivity while transitioning to native IPv6.',
      markingScheme: [
        { component: 'NAT Definition & RFC 1918 Private Address Allocation Table', marks: '1.5' },
        { component: 'Neat Labelled Network Topology & Translation Table Diagram', marks: '1.5' },
        { component: 'Three Types of NAT (Static, Dynamic, PAT/Overload)', marks: '2.0' },
        { component: 'Step-by-Step Inbound/Outbound Packet Translation Flow', marks: '1.0' },
        { component: 'Architectural Advantages & Critical Engineering Limitations', marks: '1.0' }
      ],
      examTip: 'To secure full marks, include the RFC 1918 table (10.0.0.0, 172.16.0.0, 192.168.0.0) and explain why PAT is called NAT Overload (multiplexing multiple private IPs onto one public IP using 16-bit port numbers).'
    }
  },
  {
    id: 'cn-q45',
    num: 45,
    title: 'ISP Address Allocation Using VLSM (80.70.56.0/21)',
    unit: 4,
    verified: 'BEU 2023 · Q.5(a) & Q.5(b) · 7 + 7 = 14 Marks',
    years: [2023],
    marks: 14,
    question: 'An ISP is granted the block 80.70.56.0/21. The ISP needs to distribute these addresses to: (1) Two organizations each with 500 addresses, (2) Two organizations each with 250 addresses, (3) Three organizations each with 50 addresses. Design the subnets, determine address ranges and masks, and calculate total unused addresses.',
    solution: {
      verified: 'BEU 2023 · Q.5(a) & Q.5(b) · 14 Marks',
      intro: 'This comprehensive 14-mark question requires designing a multi-tier Classless Inter-Domain Routing (CIDR) block plan for 7 organizations using Variable Length Subnet Masking (VLSM).',
      diagrams: [
        {
          title: 'Hierarchical CIDR Allocation Tree (Total Block: 2048 Addresses)',
          ascii:
`[ ISP BLOCK: 80.70.56.0/21 (Total Capacity: 2^11 = 2048 Addresses) ]
Range: 80.70.56.0 to 80.70.63.255

Group 1 (2 Orgs x 512 Addrs):
• Org 1: 80.70.56.0/23 [80.70.56.0 - 80.70.57.255] (512 addrs)
• Org 2: 80.70.58.0/23 [80.70.58.0 - 80.70.59.255] (512 addrs)

Group 2 (2 Orgs x 256 Addrs):
• Org 3: 80.70.60.0/24 [80.70.60.0 - 80.70.60.255] (256 addrs)
• Org 4: 80.70.61.0/24 [80.70.61.0 - 80.70.61.255] (256 addrs)

Group 3 (3 Orgs x 64 Addrs):
• Org 5: 80.70.62.0/26   [80.70.62.0   - 80.70.62.63]   (64 addrs)
• Org 6: 80.70.62.64/26  [80.70.62.64  - 80.70.62.127]  (64 addrs)
• Org 7: 80.70.62.128/26 [80.70.62.128 - 80.70.62.191]  (64 addrs)

UNUSED CAPACITY (320 Available Addresses):
• Subnet A: 80.70.62.192/26 (64 addresses: .62.192 - .62.255)
• Subnet B: 80.70.63.0/24   (256 addresses: .63.0   - .63.255)`
        }
      ],
      sections: [
        {
          heading: '1. Group 1 Allocation (Org 1 & Org 2: 500 Addresses Each)',
          points: [
            'Needs 500 addresses ⇒ Smallest power of 2 is <code>2⁹ = 512</code>.',
            'Prefix: <code>32 - 9 = /23</code> (Subnet Mask: <code>255.255.254.0</code>).',
            '<b>Org 1:</b> <code>80.70.56.0/23</code> (Range: 80.70.56.0 – 80.70.57.255, 512 addresses).',
            '<b>Org 2:</b> <code>80.70.58.0/23</code> (Range: 80.70.58.0 – 80.70.59.255, 512 addresses).',
            'Group 1 Total: 1,024 addresses.'
          ]
        },
        {
          heading: '2. Group 2 Allocation (Org 3 & Org 4: 250 Addresses Each)',
          points: [
            'Needs 250 addresses ⇒ Smallest power of 2 is <code>2⁸ = 256</code>.',
            'Prefix: <code>32 - 8 = /24</code> (Subnet Mask: <code>255.255.255.0</code>).',
            '<b>Org 3:</b> <code>80.70.60.0/24</code> (Range: 80.70.60.0 – 80.70.60.255, 256 addresses).',
            '<b>Org 4:</b> <code>80.70.61.0/24</code> (Range: 80.70.61.0 – 80.70.61.255, 256 addresses).',
            'Group 2 Total: 512 addresses.'
          ]
        },
        {
          heading: '3. Group 3 Allocation (Org 5, Org 6, Org 7: 50 Addresses Each)',
          points: [
            'Needs 50 addresses ⇒ Smallest power of 2 is <code>2⁶ = 64</code>.',
            'Prefix: <code>32 - 6 = /26</code> (Subnet Mask: <code>255.255.255.192</code>).',
            '<b>Org 5:</b> <code>80.70.62.0/26</code> (Range: 80.70.62.0 – 80.70.62.63, 64 addresses).',
            '<b>Org 6:</b> <code>80.70.62.64/26</code> (Range: 80.70.62.64 – 80.70.62.127, 64 addresses).',
            '<b>Org 7:</b> <code>80.70.62.128/26</code> (Range: 80.70.62.128 – 80.70.62.191, 64 addresses).',
            'Group 3 Total: 192 addresses.'
          ]
        },
        {
          heading: '4. Mathematical Audit of Total Unused Addresses',
          points: [
            'Total ISP Capacity: <code>2³²⁻²¹ = 2¹¹ = 2,048 addresses</code>.',
            'Total Allocated: <code>1024 (Gr 1) + 512 (Gr 2) + 192 (Gr 3) = 1,728 addresses</code>.',
            '<b>Remaining Unallocated:</b> <code>2,048 - 1,728 = 320 addresses</code>.',
            'Unallocated Subnet 1: <code>80.70.62.192/26</code> (64 addresses: 80.70.62.192 to 80.70.62.255).',
            'Unallocated Subnet 2: <code>80.70.63.0/24</code> (256 addresses: 80.70.63.0 to 80.70.63.255).',
            'Total Unused Check: <code>64 + 256 = 320 addresses</code> (Exact match!).'
          ]
        }
      ],
      table: {
        title: 'Master Allocation Table for All 7 Organizations',
        headers: ['Organization', 'Required', 'Allocated Subnet', 'Subnet Mask', 'Usable / Total Range', 'Addresses'],
        rows: [
          ['Org 1', '500', '80.70.56.0/23', '255.255.254.0', '80.70.56.0 – 80.70.57.255', '512'],
          ['Org 2', '500', '80.70.58.0/23', '255.255.254.0', '80.70.58.0 – 80.70.59.255', '512'],
          ['Org 3', '250', '80.70.60.0/24', '255.255.255.0', '80.70.60.0 – 80.70.60.255', '256'],
          ['Org 4', '250', '80.70.61.0/24', '255.255.255.0', '80.70.61.0 – 80.70.61.255', '256'],
          ['Org 5', '50', '80.70.62.0/26', '255.255.255.192', '80.70.62.0 – 80.70.62.63', '64'],
          ['Org 6', '50', '80.70.62.64/26', '255.255.255.192', '80.70.62.64 – 80.70.62.127', '64'],
          ['Org 7', '50', '80.70.62.128/26', '255.255.255.192', '80.70.62.128 – 80.70.62.191', '64'],
          ['Unused Block 1', '—', '80.70.62.192/26', '255.255.255.192', '80.70.62.192 – 80.70.62.255', '64'],
          ['Unused Block 2', '—', '80.70.63.0/24', '255.255.255.0', '80.70.63.0 – 80.70.63.255', '256']
        ]
      },
      conclusion: 'The ISP successfully provisions all 7 organizations with contiguous power-of-two CIDR subnets, leaving 320 unassigned addresses cleanly summarized in two standard subnets.',
      markingScheme: [
        { component: 'Total Capacity & Initial Boundary Analysis (2048 addrs)', marks: '2.0' },
        { component: 'Group 1 Subnet Design & Ranges (Org 1, Org 2)', marks: '3.0' },
        { component: 'Group 2 Subnet Design & Ranges (Org 3, Org 4)', marks: '3.0' },
        { component: 'Group 3 Subnet Design & Ranges (Org 5, Org 6, Org 7)', marks: '3.0' },
        { component: 'Master Allocation Table & Unused Address Proof (320 addrs)', marks: '3.0' }
      ],
      examTip: 'This was a full 14-mark question in BEU 2023! Allocate enough space to show the 320 unused addresses split into 80.70.62.192/26 (64) and 80.70.63.0/24 (256).'
    }
  },
  {
    id: 'cn-q9',
    num: 9,
    title: 'IPv4 Packet Fragmentation & Offset Numerical',
    unit: 4,
    verified: 'BEU 2022 / 2024 · 7 Marks',
    years: [2022, 2024],
    marks: 7,
    question: 'An IPv4 packet arrives at a router with Total Length = 4000 bytes and Header Length = 20 bytes. It must be forwarded over an outgoing link with MTU = 1500 bytes. Determine the number of fragments, and for each fragment specify Total Length, Data Length, MF flag, and Fragment Offset.',
    solution: {
      verified: 'BEU 2022 / 2024 · 7 Marks',
      intro: 'When an IP datagram encounters a link with a Maximum Transmission Unit (MTU) smaller than the datagram length, the network layer must fragment the packet into smaller units that can safely traverse the physical link.',
      diagrams: [
        {
          title: 'IPv4 Datagram Fragmentation Mechanism (MTU = 1500 Bytes)',
          ascii:
`[ ORIGINAL PACKET: 4000 Bytes ] (Header: 20 Bytes, Payload: 3980 Bytes)
                      |
                      v  Link MTU = 1500 Bytes (Max Data/Frag = 1480 Bytes)
+-------------------------------------------------------------------------+
| Frag 1: [Header: 20B][Payload: 1480B] -> Total: 1500B, MF=1, Offset=0   |
| Frag 2: [Header: 20B][Payload: 1480B] -> Total: 1500B, MF=1, Offset=185 |
| Frag 3: [Header: 20B][Payload: 1020B] -> Total: 1040B, MF=0, Offset=370 |
+-------------------------------------------------------------------------+`
        }
      ],
      sections: [
        {
          heading: '1. Given Parameters & Mathematical Constraints',
          points: [
            'Original Total Length = 4000 bytes; Header Length = 20 bytes.',
            'Original Data Payload = <code>4000 - 20 = 3980 bytes</code>.',
            'Outgoing Link MTU = 1500 bytes.',
            '<b>Crucial 8-Byte Rule:</b> Each fragment payload must be a multiple of 8 bytes (because Fragment Offset is measured in 8-byte units).',
            'Max payload per fragment: <code>1500 - 20 = 1480 bytes</code>. (Check: <code>1480 / 8 = 185</code> — perfectly divisible!).'
          ]
        },
        {
          heading: '2. Fragment Generation Calculations',
          points: [
            '<b>Fragment 1:</b><br>• Data Payload: Bytes 0 to 1479 (1480 bytes).<br>• Total Length: <code>1480 + 20 = 1500 bytes</code>.<br>• More Fragments (MF) Flag: <code>1</code> (more fragments follow).<br>• Fragment Offset: <code>0 / 8 = 0</code>.',
            '<b>Fragment 2:</b><br>• Data Payload: Bytes 1480 to 2959 (1480 bytes).<br>• Total Length: <code>1480 + 20 = 1500 bytes</code>.<br>• More Fragments (MF) Flag: <code>1</code>.<br>• Fragment Offset: <code>1480 / 8 = 185</code>.',
            '<b>Fragment 3 (Last Fragment):</b><br>• Remaining Payload: <code>3980 - 2960 = 1020 bytes</code> (Bytes 2960 to 3979).<br>• Total Length: <code>1020 + 20 = 1040 bytes</code>.<br>• More Fragments (MF) Flag: <code>0</code> (indicates end of original datagram).<br>• Fragment Offset: <code>2960 / 8 = 370</code>.'
          ]
        }
      ],
      table: {
        title: 'Complete Fragmentation Parameter Summary Table',
        headers: ['Fragment #', 'Byte Range', 'Data Length', 'Header Length', 'Total Length', 'MF Flag', 'Fragment Offset'],
        rows: [
          ['Fragment 1', '0 – 1479', '1480 Bytes', '20 Bytes', '1500 Bytes', '1', '0'],
          ['Fragment 2', '1480 – 2959', '1480 Bytes', '20 Bytes', '1500 Bytes', '1', '185'],
          ['Fragment 3', '2960 – 3979', '1020 Bytes', '20 Bytes', '1040 Bytes', '0', '370'],
          ['Total Check', '0 – 3979', '3980 Bytes', '—', '—', '—', '—']
        ]
      },
      conclusion: 'The original 4000-byte datagram is fragmented into three packets. Total payload reassembles to 1480 + 1480 + 1020 = 3980 bytes, matching the original datagram.',
      markingScheme: [
        { component: 'Max Payload Calculation with 8-Byte Divisibility Rule', marks: '1.5' },
        { component: 'Fragment 1 Parameters (Len 1500, MF=1, Offset=0)', marks: '1.5' },
        { component: 'Fragment 2 Parameters (Len 1500, MF=1, Offset=185)', marks: '1.5' },
        { component: 'Fragment 3 Parameters (Len 1040, MF=0, Offset=370)', marks: '1.5' },
        { component: 'Summary Table & Reassembly Verification', marks: '1.0' }
      ],
      examTip: 'Always explain why 1480 is divided by 8 to get Offset 185. The Fragment Offset field in the IPv4 header is only 13 bits wide, so it counts units of 8 octets.'
    }
  },
  {
    id: 'cn-q21',
    num: 21,
    title: 'Link State Routing & Dijkstra’s Algorithm Numerical',
    unit: 4,
    verified: 'BEU 2023 · Q.6(a) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'Explain the Link State Routing protocol. Apply Dijkstra’s shortest path algorithm on a 6-node network with Source Node A. Show step-by-step permanent set updates and the resulting Shortest Path Tree.',
    solution: {
      verified: 'BEU 2023 · Q.6(a) · 7 Marks',
      intro: 'Link State Routing (e.g., OSPF) relies on each node acquiring a complete, identical map of the network topology via Link State Advertisements (LSA) flooding, followed by local execution of Dijkstra’s Shortest Path First (SPF) algorithm.',
      diagrams: [
        {
          title: '6-Node Weighted Network Topology Graph',
          ascii:
`         (2)           (3)
    (A)-------(B)------------(D)
     |       /   \\            |
    (4)    (1)    (2)        (1)
     |     /        \\         |
    (C)---/          +-------(E)
     |                        |
    (5)                      (2)
     |                        |
     +-----------------------(F)`
        }
      ],
      sections: [
        {
          heading: '1. Five Phases of Link State Routing',
          points: [
            '<b>1. Discover Neighbors:</b> Send HELLO packets on each interface.',
            '<b>2. Measure Link Cost:</b> Measure round-trip delay or assign link cost based on inverse bandwidth.',
            '<b>3. Construct LSA:</b> Build Link State Packet containing list of direct neighbors and link costs.',
            '<b>4. Reliable Flooding:</b> Flood LSA to all routers in the autonomous system.',
            '<b>5. Compute Shortest Path:</b> Run Dijkstra’s algorithm locally to construct Shortest Path Tree (SPT).'
          ]
        },
        {
          heading: '2. Dijkstra’s Algorithm Step-by-Step Trace (Source Node A)',
          points: [
            '<b>Step 0:</b> Permanent set <code>N\' = {A}</code>. Direct costs: D(B)=2, D(C)=4. All others = ∞. Minimum is B (2). Add B to N\'.',
            '<b>Step 1:</b> <code>N\' = {A, B}</code>. Update neighbors of B: D(C) = min(4, 2+1) = 3 (via B), D(D) = 2+3 = 5 (via B), D(E) = 2+2 = 4 (via B). Minimum is C (3). Add C to N\'.',
            '<b>Step 2:</b> <code>N\' = {A, B, C}</code>. Update from C: D(F) = 3+5 = 8 (via C). Current candidate costs: D(E)=4, D(D)=5, D(F)=8. Minimum is E (4). Add E to N\'.',
            '<b>Step 3:</b> <code>N\' = {A, B, C, E}</code>. Update from E: D(D) = min(5, 4+1) = 5, D(F) = min(8, 4+2) = 6 (via E). Minimum is D (5). Add D to N\'.',
            '<b>Step 4:</b> <code>N\' = {A, B, C, D, E}</code>. Candidate D(F) = 6. Add F to N\'.',
            '<b>Step 5:</b> <code>N\' = {A, B, C, D, E, F}</code>. All 6 nodes are permanent!'
          ]
        }
      ],
      table: {
        title: 'Complete Dijkstra Iteration Execution Table',
        headers: ['Step', 'Permanent Set N\'', 'D(B), p(B)', 'D(C), p(C)', 'D(D), p(D)', 'D(E), p(E)', 'D(F), p(F)'],
        rows: [
          ['0', '{A}', '2, A', '4, A', '∞', '∞', '∞'],
          ['1', '{A, B}', '—', '3, B', '5, B', '4, B', '∞'],
          ['2', '{A, B, C}', '—', '—', '5, B', '4, B', '8, C'],
          ['3', '{A, B, C, E}', '—', '—', '5, B', '—', '6, E'],
          ['4', '{A, B, C, D, E}', '—', '—', '—', '—', '6, E'],
          ['5', '{A, B, C, D, E, F}', '—', '—', '—', '—', '—']
        ]
      },
      conclusion: 'The shortest paths from Source Node A are: B (cost 2, next B), C (cost 3, next B), E (cost 4, next B), D (cost 5, next B), F (cost 6, next B). All traffic routes initially through B.',
      markingScheme: [
        { component: 'Link State 5-Step Operational Overview', marks: '1.5' },
        { component: 'Network Graph Diagram & Initialization', marks: '1.5' },
        { component: 'Step-by-Step Dijkstra Trace Table (Steps 0 to 5)', marks: '2.5' },
        { component: 'Final Routing Table & Shortest Path Tree', marks: '1.5' }
      ],
      examTip: 'Always write both the cost and parent node in the table (e.g. "3, B" meaning cost 3 via parent B). It prevents path reconstruction errors.'
    }
  },
  {
    id: 'cn-q12',
    num: 12,
    title: 'ARP (Address Resolution Protocol) & DHCP (Dynamic Host Configuration Protocol)',
    unit: 4,
    verified: 'BEU 2022 · Q.7 / 2024 · 7 Marks',
    years: [2022, 2024, 2025],
    marks: 7,
    question: 'Explain the working of Address Resolution Protocol (ARP) and Dynamic Host Configuration Protocol (DHCP). Show their frame exchange ladders and packet structures.',
    solution: {
      verified: 'BEU 2022 · Q.7 / 2024 · 7 Marks',
      intro: 'In local area networks, successful packet forwarding requires two distinct levels of addressing: logical 32-bit IP addresses for end-to-end routing, and physical 48-bit MAC addresses for node-to-node frame delivery. Address Resolution Protocol (ARP) maps known IP addresses to physical MAC addresses, while Dynamic Host Configuration Protocol (DHCP) automates IP, gateway, and DNS configuration for joining hosts.',
      diagrams: [
        {
          title: 'ARP Request (Broadcast) vs ARP Reply (Unicast) Frame Flow',
          ascii:
`HOST A (Sender)                                            HOST B (Target)
IP: 192.168.1.10                                           IP: 192.168.1.20
MAC: AA:AA:AA:AA:AA:AA                                     MAC: BB:BB:BB:BB:BB:BB
       |                                                             |
       |===== 1. ARP REQUEST (BROADCAST) ===========================>|
       |      "Who has 192.168.1.20? Tell 192.168.1.10"              |
       |      Dest MAC: FF:FF:FF:FF:FF:FF (Flooded to all LAN nodes) |
       |                                                             | (Host B checks target IP;
       |                                                             |  matches! Updates its ARP
       |                                                             |  cache with A\'s IP & MAC)
       |                                                             |
       |<==== 2. ARP REPLY (UNICAST) ================================|
       |      "192.168.1.20 is at BB:BB:BB:BB:BB:BB"                 |
       |      Dest MAC: AA:AA:AA:AA:AA:AA (Direct unicast to Host A) |
       v                                                             v`
        },
        {
          title: 'DHCP 4-Step DORA Message Exchange Protocol Ladder',
          ascii:
`CLIENT (New Node, Port 68)                             DHCP SERVER (Port 67)
  |                                                              |
  |--- 1. DHCP DISCOVER (Broadcast: 255.255.255.255) ----------->|
  |       "Looking for an available IP address"                  |
  |                                                              |
  |<-- 2. DHCP OFFER (Unicast / Broadcast) ----------------------|
  |       "Here is an offered IP: 192.168.1.50, Mask: /24,       |
  |        Gateway: 192.168.1.1, DNS: 8.8.8.8, Lease: 86400s"   |
  |                                                              |
  |--- 3. DHCP REQUEST (Broadcast) ----------------------------->|
  |       "Accepting IP 192.168.1.50 from Server"                |
  |                                                              |
  |<-- 4. DHCP ACK (Acknowledgment) -----------------------------|
  |       "Lease confirmed! IP 192.168.1.50 is officially yours" |
  v                                                              v`
        }
      ],
      sections: [
        {
          heading: '1. Working of Address Resolution Protocol (ARP)',
          points: [
            '<b>ARP Need:</b> When a host has an outgoing IP datagram for a local destination whose MAC is unknown, it cannot build the Ethernet Frame. It must query the LAN for the physical address.',
            '<b>ARP Request (Broadcast):</b> Encapsulated in an Ethernet frame with Destination MAC <code>FF:FF:FF:FF:FF:FF</code>. Every interface on the LAN receives and processes the request.',
            '<b>ARP Reply (Unicast):</b> Only the target node matching the queried IP address replies, filling its own hardware address and sending the response directly back to the requester.',
            '<b>ARP Cache Table:</b> Both nodes cache the mapping for a timeout period (typically 20 minutes) to eliminate repetitive network broadcasts for subsequent packets.'
          ]
        },
        {
          heading: '2. Working of Dynamic Host Configuration Protocol (DHCP)',
          points: [
            '<b>Application Layer Architecture:</b> DHCP runs over UDP using Server Port 67 and Client Port 68.',
            '<b>The Four-Step DORA Sequence:</b><br>• <i>Discover:</i> Unconfigured host broadcasts <code>0.0.0.0:68 → 255.255.255.255:67</code>.<br>• <i>Offer:</i> DHCP server reserves an IP from its pool and sends candidate configuration.<br>• <i>Request:</i> Client accepts the offer, broadcasting so other competing DHCP servers can retract their offers.<br>• <i>Acknowledgment (ACK):</i> Server formalizes lease duration (T1 renewal at 50%, T2 rebind at 87.5%).'
          ]
        }
      ],
      table: {
        title: 'Comparison: ARP vs DHCP',
        headers: ['Feature', 'Address Resolution Protocol (ARP)', 'Dynamic Host Configuration Protocol (DHCP)'],
        rows: [
          ['Layer in Stack', 'Data Link / Network Interface (Layer 2.5)', 'Application Layer (Layer 7) over UDP'],
          ['Primary Role', 'Resolves known IP to unknown MAC', 'Dynamically allocates IP, mask, gateway, and DNS'],
          ['Scope', 'Local single broadcast domain only', 'Can cross subnets using DHCP Relay Agents'],
          ['Ports Used', 'Raw Ethernet type 0x0806 (no port numbers)', 'UDP Port 67 (Server) and Port 68 (Client)'],
          ['Lifetime of Data', 'ARP Cache timeout (10–20 mins)', 'Configurable Lease Time (hours to days)']
        ]
      },
      conclusion: 'ARP provides the essential hardware-binding glue for local packet delivery, while DHCP automates host network configuration, eliminating manual IP allocation errors across enterprise and campus networks.',
      markingScheme: [
        { component: 'ARP Definition, Broadcast/Unicast Workflow & Frame Diagram', marks: '2.0' },
        { component: 'ARP Cache Table Management & Timeout', marks: '1.0' },
        { component: 'DHCP Role & Transport Layer Ports (UDP 67/68)', marks: '1.0' },
        { component: 'DHCP DORA 4-Step Message Ladder & Lease Timing', marks: '2.0' },
        { component: 'ARP vs DHCP Summary Comparison Table', marks: '1.0' }
      ],
      examTip: 'Remember: ARP Request is ALWAYS Broadcast (FF:FF:FF:FF:FF:FF), but ARP Reply is ALWAYS Unicast! Stating this explicitly is worth an entire mark.'
    }
  }
,
  {
    id: 'cn-q54',
    num: 54,
    title: 'Need for 128-Bit IPv6 and MAC Addressing & Analysis of IP-Only Networks',
    unit: 4,
    verified: 'BEU 2023 · Q.7(b) · 7 Marks',
    years: [2023],
    marks: 7,
    question: 'We know that there are 2 types of address scheme (i.e. IP address and MAC address) in computer networks. Explain what is the need of having two types of addresses. What will happen if we use only IP address in computer networks?',
    solution: {
      verified: 'BEU 2023 · Q.7(b) · 7 Marks',
      intro: 'Modern computer network architectures employ a strict division of responsibilities across protocol layers. To accomplish end-to-end communication across interconnected networks, two fundamentally different addressing schemes are essential: Logical IP Addresses at Layer 3 (Network Layer) and Physical MAC Addresses at Layer 2 (Data Link Layer). Each addressing scheme operates at a different scope, fulfills distinct topological requirements, and is optimized for different forwarding hardware.',
      diagrams: [
        {
          title: 'End-to-End Hop-by-Hop Packet Forwarding: IP Invariance vs MAC Mutability',
          ascii:
`HOST A (Source LAN)                                                 HOST B (Destination LAN)
IP: 10.0.1.10                                                       IP: 10.0.2.20
MAC: AA:AA:AA:AA:AA:01                                              MAC: BB:BB:BB:BB:BB:02
       |                                                                   ^
       | [Hop 1: Source LAN]                                               | [Hop 2: Dest LAN]
       | Src IP:  10.0.1.10 (INVARIANT)                                    | Src IP:  10.0.1.10
       | Dest IP: 10.0.2.20 (INVARIANT)                                    | Dest IP: 10.0.2.20
       | Src MAC:  AA:AA:AA:AA:AA:01                                       | Src MAC:  R2:22:22:22:22:02
       | Dest MAC: R1:11:11:11:11:01                                       | Dest MAC: BB:BB:BB:BB:BB:02
       v                                                                   |
+---------------------+          WAN / Backbone Link          +---------------------+
| ROUTER R1 (Gateway) |======================================>| ROUTER R2 (Gateway) |
| LAN MAC: R1:11...01 |                                       | LAN MAC: R2:22...02 |
+---------------------+                                       +---------------------+
Key Law: IP addresses identify end-to-end source and destination across the globe.
         MAC addresses identify immediate next-hop hardware on the local physical link!`
        },
        {
          title: 'Address Architectural Structure: IPv6 (128-Bit) vs MAC (48-Bit)',
          ascii:
`1. IPv6 LOGICAL ADDRESS (128 Bits / 16 Octets / Hexadecimal Colon Notation):
+------------------------------------------+------------------------------------------+
|      ROUTING PREFIX / SUBNET ID          |           INTERFACE IDENTIFIER           |
|                64 Bits                   |                 64 Bits                  |
+------------------------------------------+------------------------------------------+
Example: 2001 : 0db8 : 85a3 : 0000 : 0000 : 8a2e : 0370 : 7334
Compressed: 2001:db8:85a3::8a2e:370:7334

2. ETHERNET MAC ADDRESS (48 Bits / 6 Octets / Hexadecimal Dash/Colon Notation):
+------------------------------------------+------------------------------------------+
|  ORGANIZATIONALLY UNIQUE IDENTIFIER(OUI) |     NETWORK INTERFACE CONTROLLER (NIC)   |
|         24 Bits (Vendor ID)              |             24 Bits (Serial)             |
+------------------------------------------+------------------------------------------+
Example: 02 : 1A : 2B : 3C : 4D : 5E`
        }
      ],
      table: {
        title: 'Fundamental Differences: Network Layer IP Address vs Data Link Layer MAC Address',
        headers: ['Comparison Criterion', 'IP Address (IPv4 / IPv6)', 'MAC Address (IEEE 802 Ethernet/Wi-Fi)'],
        rows: [
          ['OSI Protocol Layer', 'Layer 3 (Network Layer)', 'Layer 2 (Data Link Layer)'],
          ['Address Length', 'IPv4: 32 bits (4B); IPv6: 128 bits (16B)', 'Standard Ethernet: 48 bits (6B / 6 octets)'],
          ['Address Hierarchy', 'Hierarchical (Network ID + Subnet ID + Host ID)', 'Flat (24-bit Vendor OUI + 24-bit Serial Number)'],
          ['Primary Function', 'Global logical addressing & end-to-end packet routing', 'Hop-by-hop local frame delivery within a single subnet'],
          ['Mobility & Reassignment', 'Dynamic; changes when moving to another network (DHCP)', 'Permanently burned into NIC hardware (ROM/EEPROM)'],
          ['Mutability in Transit', 'Source and Destination IP remain INVARIANT end-to-end', 'Source and Destination MAC change at EVERY router hop'],
          ['Forwarding Device', 'Routers & Layer 3 switches (Routing Table lookup)', 'Layer 2 Ethernet switches (CAM / MAC Address Table)'],
          ['Address Resolution', 'Resolved to MAC via ARP (IPv4) or ND (IPv6)', 'Used directly by NIC physical layer frame filter'],
          ['Address Space Size', 'IPv4: 4.3×10⁹ addrs; IPv6: 3.4×10³⁸ addresses', '2⁴⁸ ≈ 2.81 × 10¹⁴ total unique hardware devices'],
          ['Representation Format', 'Dotted-decimal (IPv4) or Hex-colon (IPv6)', 'Six hyphenated or colon-separated hex bytes']
        ]
      },
      sections: [
        {
          heading: '1. Why Networks Strictly Require Both Address Types',
          points: [
            '<b>A. Hierarchical Routing vs Flat Addressing:</b> Global internet routers cannot store flat MAC addresses. If routers had to track 48-bit flat MACs for billions of global devices, routing tables would require trillions of unaggregatable entries, crashing the Internet backbone. IP addresses are hierarchical (like country → state → pin code), allowing routers to summarize millions of hosts into a single CIDR prefix (e.g. /16).',
            '<b>B. Decoupling Hardware from Network Topology:</b> If your device’s network identity were tied strictly to its MAC address, changing physical network interfaces (or switching from Ethernet to Wi-Fi) would break all running connections. IP abstracts the underlying hardware technology, allowing seamless communication across Ethernet, Wi-Fi, satellite, and fiber.',
            '<b>C. Local Link Multicasting & Frame Demultiplexing:</b> Within an Ethernet switch, hardware ASIC chips inspect 48-bit MAC addresses at line rate (nanosecond latency) to forward frames to specific physical switch ports without needing expensive Layer 3 IP route table lookups.'
          ]
        },
        {
          heading: '2. What Would Happen If Only IP Addresses Were Used in Computer Networks?',
          points: [
            '<b>1. Total Breakdown of Existing Layer 2 Ethernet Infrastructure:</b> Standard Ethernet frames (IEEE 802.3) require 6-byte source and destination MAC address fields. Eliminating MAC addresses would invalidate billions of existing Ethernet switches, Wi-Fi access points, and network interface cards (NICs).',
            '<b>2. Enormous Switch Hardware Costs:</b> Ethernet switches forward frames at multi-gigabit speeds using cheap Content Addressable Memory (CAM) tables indexing 48-bit MACs. Without MACs, every basic home switch would need expensive Layer 3 routing engines capable of longest-prefix-match IP lookups.',
            '<b>3. Obsoleting Address Resolution Protocols:</b> ARP (in IPv4) and Neighbor Discovery (in IPv6) exist solely to bind Layer 3 logical IPs to Layer 2 physical MACs. In an IP-only network, ARP/ND would be eliminated, but hosts would require a completely new mechanism to identify which specific physical station on a shared cable or wireless frequency should process incoming bits.',
            '<b>4. Loss of Technology Independence:</b> Different physical link technologies (Ethernet, ATM, PPP, Frame Relay) use different physical addressing formats. Point-to-point links (like HDLC/PPP) already operate without MAC addresses because there is only one possible receiver at the other end of the wire. However, on multi-access broadcast media (Ethernet, Wi-Fi 802.11), physical identifiers are indispensable.',
            '<b>5. NIC Hardware Filtering Disabled:</b> NICs filter out unwanted LAN traffic in hardware by matching the destination MAC. If only IP were used, every single broadcasted packet on a Wi-Fi or Ethernet bus would interrupt the CPU to parse IP headers, causing severe CPU performance degradation.'
          ]
        },
        {
          heading: '3. Why IPv6 Uses 128 Bits',
          points: [
            '<b>Address Space Expansion:</b> IPv4 uses 32 bits (<code>2³² ≈ 4.29 × 10⁹</code> addresses), which was exhausted by mobile phones, IoT, and cloud services. IPv6 provides 128 bits, yielding <code>2¹²⁸ ≈ 3.4 × 10³⁸</code> addresses (over <code>6.67 × 10²³</code> addresses per square meter of Earth).',
            '<b>Ratio of Address Spaces:</b> <code>2¹²⁸ / 2³² = 2⁹⁶ ≈ 7.92 × 10²⁸</code> times larger than IPv4!',
            '<b>Hierarchical Efficiency:</b> The 128-bit space allows structured 64-bit network routing prefixes (Global Routing Prefix + Subnet ID) and 64-bit Interface Identifiers (SLAAC auto-configuration), eliminating the need for NAT while preserving scalable global route aggregation.'
          ]
        }
      ],
      conclusion: 'IP addresses and MAC addresses are complementary, not redundant. IP addresses provide logical, hierarchical addressing enabling scalable global routing across heterogeneous networks. MAC addresses provide physical, flat addressing enabling high-speed local frame delivery across immediate physical links. While point-to-point links can operate without MAC addresses, multi-access LANs (Ethernet and Wi-Fi) strictly require both.',
      markingScheme: [
        { component: 'Introduction & Clear Definitions of IP (Layer 3) and MAC (Layer 2)', marks: '1.0' },
        { component: 'Architectural Address Formats (128-Bit IPv6 vs 48-Bit MAC) & Diagram', marks: '1.0' },
        { component: 'Core Necessity: End-to-End Routing vs Local Hop-by-Hop Frame Delivery', marks: '1.5' },
        { component: 'Hop-by-Hop Communication Diagram Showing IP Invariance vs MAC Rewriting', marks: '1.0' },
        { component: 'Exhaustive Analysis of IP-Only Network Consequences (5 Technical Points)', marks: '1.5' },
        { component: 'IPv6 128-Bit Address Space Comparison (2^96 Ratio) & Conclusion', marks: '1.0' }
      ],
      examTip: 'Bhai, is question mein sirf IPv6 = 128 bits, MAC = 48 bits likhna enough nahi. Examiner ko explain karna hai ki IP address routing ke liye hai aur MAC address local frame delivery ke liye. Router ke through packet forwarding wala diagram is answer ka strongest part hai.'
    }
  }

];

const toSolution = ({id, solution}) => ({id, ...solution});
const solutionFor = (id, sourceId) => toSolution({
  id,
  solution: unit4Entries.find((entry) => entry.id === sourceId).solution,
});

export const unit4Solutions = [
  ...unit4Entries.filter(({marks}) => marks === 7).map(toSolution),
  solutionFor('cn-q10', 'cn-q34'),
  solutionFor('cn-q11', 'cn-q36'),
  {
    id: 'cn-original-2024-100602-q5a',
    verified: 'BEU 2024 · Q.5(a) · 7 Marks · Cross-checked scan',
    intro: 'The Internet Protocol version 4 (IPv4, RFC 791) datagram header encapsulates transport layer segments and provides logical addressing, routing, packet lifetime limitation, and fragmentation control. The standard header has a minimum length of 20 bytes (up to 60 bytes with optional fields) and is structured in 32-bit (4-byte) horizontal words.',
    diagrams: [
      {
        title: 'IPv4 Datagram Header Architecture (32-Bit Grid Layout)',
        ascii:
` 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         | (Word 0)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|     Fragment Offset     | (Word 1)
|                               |R|D|M|                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |        Header Checksum        | (Word 2)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       | (Word 3)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     | (Word 4)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 Bytes)    |    Padding    | (Word 5)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
      },
      {
        title: 'IPv4 Packet Fragmentation & Reassembly Mechanism',
        ascii:
`ORIGINAL DATAGRAM (Total Length = 4000 Bytes: 20B Header + 3980B Payload, MTU = 1500B)
[ Identification = 10042, Flags: DF=0, MF=0, Fragment Offset = 0 ]
                           |
            (Router encounters MTU = 1500B limit)
                           v
FRAGMENT 1: Length = 1500 Bytes (20B Header + 1480B Data)
[ Id = 10042, Flags: DF=0, MF=1, Offset = 0 (Byte 0 to 1479) ]

FRAGMENT 2: Length = 1500 Bytes (20B Header + 1480B Data)
[ Id = 10042, Flags: DF=0, MF=1, Offset = 185 (1480 / 8, Bytes 1480 to 2959) ]

FRAGMENT 3: Length = 1040 Bytes (20B Header + 1020B Data)
[ Id = 10042, Flags: DF=0, MF=0, Offset = 370 (2960 / 8, Bytes 2960 to 3979) ]
                           |
             (Reassembled at Final Destination Host)`
      }
    ],
    table: {
      title: 'Exhaustive Field Breakdown of IPv4 Datagram Header',
      headers: ['Header Field', 'Bit Size', 'Standard Default Values', 'Functional Description & Role'],
      rows: [
        ['Version', '4 bits', '4 (Binary: 0100)', 'Defines the IP version; ensures router parses layout using IPv4 syntax.'],
        ['IHL (Header Length)', '4 bits', '5 (5 × 4 = 20 Bytes minimum)', 'Specifies total header length in 32-bit words; maximum value 15 (60 bytes).'],
        ['Type of Service / DSCP', '8 bits', '0x00 (Best Effort)', 'Specifies Quality of Service (QoS), packet priority, delay, throughput, and ECN.'],
        ['Total Length', '16 bits', 'Variable (up to 65,535 Bytes)', 'Entire IP datagram length (Header + Data payload) in bytes.'],
        ['Identification', '16 bits', 'Unique counter per packet', 'Uniquely identifies datagram; all fragments share this identical ID for grouping.'],
        ['Flags', '3 bits', 'Bit 0: Res, Bit 1: DF, Bit 2: MF', 'DF (Don\'t Fragment): 1=Drop if > MTU. MF (More Fragments): 1=More follow, 0=Last fragment.'],
        ['Fragment Offset', '13 bits', 'Measured in 8-byte blocks', 'Specifies position of fragment data relative to original datagram payload start.'],
        ['Time to Live (TTL)', '8 bits', '64 (Linux), 128 (Windows), 255', 'Hop limit; decremented by 1 at every router. Discarded when TTL=0 to prevent infinite loops.'],
        ['Protocol', '8 bits', '1 (ICMP), 6 (TCP), 17 (UDP)', 'Identifies the higher transport-layer protocol payload to which data must be delivered.'],
        ['Header Checksum', '16 bits', 'One\'s complement checksum', 'Error detection covering ONLY the 20–60 byte IP header (recomputed at every hop).'],
        ['Source IP Address', '32 bits', 'Dotted-decimal (e.g. 192.168.1.10)', '32-bit IPv4 address of the original sending host interface.'],
        ['Destination IP Address', '32 bits', 'Dotted-decimal (e.g. 172.16.0.1)', '32-bit IPv4 address of the final destination receiving host interface.'],
        ['Options & Padding', '0–40 bytes', 'Variable length (0 to 40 bytes)', 'Optional testing/security fields (Record Route, Timestamp). Padded with 0s to 32-bit boundary.']
      ]
    },
    sections: [
      {
        heading: '1. In-Depth Operational Breakdown of Key Header Fields',
        points: [
          '<b>Time to Live (TTL) & Loop Prevention:</b> Prevents misconfigured routing loops from circulating packets indefinitely. Each router decrements the TTL field by 1. When TTL drops to 0, the router discards the packet and transmits an ICMP Time Exceeded (Type 11) message back to the sender (basis of the <code>traceroute</code> diagnostic utility).',
          '<b>Protocol Demultiplexing:</b> Tells the destination network layer software which transport engine owns the packet (Value <code>6</code> maps to TCP, Value <code>17</code> maps to UDP, Value <code>1</code> maps to ICMP, Value <code>2</code> maps to IGMP).',
          '<b>Header Checksum Recomputation:</b> Because the TTL field changes at every intermediate router, the 16-bit One\'s complement header checksum must be recomputed and verified at every intermediate hop across the entire routing path.'
        ]
      },
      {
        heading: '2. Detailed Mechanism of IPv4 Packet Fragmentation & Reassembly',
        points: [
          '<b>Fragmentation Trigger:</b> Each physical link has a Maximum Transmission Unit (MTU), representing the largest frame payload it can carry (e.g., Ethernet MTU = 1500 bytes). If an incoming datagram exceeds the outbound MTU and DF = 0, the router fragments the packet into multiple smaller datagrams.',
          '<b>Identification Field:</b> Assigned by the sending host. Every fragment created from the same original packet retains the identical 16-bit Identification number, allowing the destination host to group related fragments.',
          '<b>Flags Handling:</b> The <b>DF (Don\'t Fragment)</b> flag indicates whether fragmentation is allowed (1 = do not fragment; drop and send ICMP error if MTU exceeded). The <b>MF (More Fragments)</b> flag is set to <code>1</code> for all fragments except the last fragment, which has <code>MF = 0</code>.',
          '<b>Fragment Offset in 8-Byte Units:</b> Because the offset field is only 13 bits while total length is 16 bits, Fragment Offset is scaled: <code>Offset Value = Byte Position / 8</code>. Thus, every fragment data payload (except the last) MUST be an exact multiple of 8 bytes.',
          '<b>Reassembly at Destination:</b> Intermediate routers forward fragments independently without reassembling them. Reassembly occurs exclusively at the final receiving host using an internal timer; if any fragment is lost, the entire original datagram is discarded.'
        ]
      }
    ],
    conclusion: 'The IPv4 header provides a compact, robust 20-byte base architecture for global internetworking, combining 32-bit hierarchical addressing, loop-killing TTL counters, and robust fragmentation fields (Identification, MF/DF flags, and 8-byte scaled Offsets) to bridge heterogeneous physical network MTUs.',
    markingScheme: [
      { component: 'Neat Labelled IPv4 Header Format Diagram (32-Bit Grid Layout)', marks: '1.5' },
      { component: 'Exhaustive Field Breakdown Table with Standard Default Values', marks: '2.0' },
      { component: 'TTL Loop Prevention, Protocol Demultiplexing & Checksum Mechanics', marks: '1.5' },
      { component: 'Fragmentation Mechanism: MTU, Identification, MF/DF Flags & 8-Byte Offset Scale', marks: '1.5' },
      { component: 'Worked Fragmentation Numerical Example & Conclusion', marks: '0.5' }
    ],
    examTip: 'Examiners award full marks when you draw the complete 5-row header diagram and emphasize that Fragment Offset is divided by 8 (8-byte units) and reassembly is done strictly at the destination, never at intermediate routers.'
  },
  {
    id: 'cn-original-2024-100602-q6b',
    verified: 'BEU 2024 · Q.6(b) · 7 Marks · Cross-checked scan',
    intro: 'Distance Vector Routing is a distributed, dynamic routing algorithm based on the Bellman-Ford algorithm. In this protocol, each router maintains a routing table containing the shortest known distance to every network destination and periodically advertises its distance vector to all immediate direct physical neighbors.',
    diagrams: [
      {
        title: 'Given Network Topology Graph with Link Weights (BEU 2024 Exam)',
        ascii:
`                    (5)
         [A] ----------------- [B]
          |  \\               /  |
          |   \\ (2)     (4) /   |
          |    \\           /    |
      (3) |     \\         /     | (3)
          |      \\  [C]  /      |
          |     /         \\     |
          |    / (4)   (4) \\    |
          |   /             \\   |
         [D] ----------------- [E]
                    (7)`
      }
    ],
    table: {
      title: 'Converged Distance Vector Routing Table at Router A',
      headers: ['Destination Node', 'Shortest Cost from A', 'Optimal Path Route', 'Next Hop Interface'],
      rows: [
        ['A', '0', 'Local (A)', '—'],
        ['B', '5', 'A -> B (Direct Link)', 'B'],
        ['C', '2', 'A -> C (Direct Link)', 'C'],
        ['D', '3', 'A -> D (Direct Link)', 'D'],
        ['E', '6', 'A -> C -> E (2 + 4 = 6)', 'C']
      ]
    },
    sections: [
      {
        heading: '1. Bellman-Ford Algorithm Equation & Distance Vector Principle',
        points: [
          '<b>Bellman-Ford Formula:</b> Let <code>D_x(y)</code> be the cost of the least-cost path from node <code>x</code> to node <code>y</code>. The distance vector update relation is: <br><code>D_x(y) = min_v { c(x, v) + D_v(y) }</code>, where the minimum is taken over all direct neighbors <code>v</code> of node <code>x</code>.',
          '<b>Direct Link Costs from A:</b><br>• Link $(A, B) = 5$<br>• Link $(A, C) = 2$<br>• Link $(A, D) = 3$<br>• Direct links to $E$ do not exist ($c(A, E) = \\infty$).'
        ]
      },
      {
        heading: '2. Step-by-Step Iterative Calculation of Least-Cost Paths from Node A',
        points: [
          '<b>Initial Knowledge at Router A:</b> Distances are initialized as $D_A(A) = 0$, $D_A(B) = 5$, $D_A(C) = 2$, $D_A(D) = 3$, and $D_A(E) = \\infty$.',
          '<b>Evaluation of Path to Destination E:</b> Router A receives distance vector advertisements from its neighbors B, C, and D:<br>• <i>Via Neighbor B:</i> Cost = $c(A, B) + D_B(E) = 5 + 3 = 8$ (Path: $A \\to B \\to E$)<br>• <i>Via Neighbor C:</i> Cost = $c(A, C) + D_C(E) = 2 + 4 = 6$ (Path: $A \\to C \\to E$)<br>• <i>Via Neighbor D:</i> Cost = $c(A, D) + D_D(E) = 3 + 7 = 10$ (Path: $A \\to D \\to E$)',
          '<b>Optimal Choice for Destination E:</b> <code>min{8, 6, 10} = 6</code> via Neighbor C. Router A records cost <code>6</code> and sets Next Hop to <code>C</code>.',
          '<b>Evaluation of Path to Destination B:</b><br>• Direct link: $c(A, B) = 5$<br>• Via C: $c(A, C) + c(C, B) = 2 + 4 = 6$<br>• Minimum cost is <code>5</code> via Next Hop <code>B</code>.'
        ]
      },
      {
        heading: '3. Full Network Convergence Table for All Nodes',
        points: [
          '<b>Node B Vector:</b> To A: 5 (via A), To C: 4 (via C), To D: 8 (via A/C), To E: 3 (via E).',
          '<b>Node C Vector:</b> To A: 2 (via A), To B: 4 (via B), To D: 5 (via A), To E: 4 (via E).',
          '<b>Node D Vector:</b> To A: 3 (via A), To B: 8 (via A), To C: 5 (via A), To E: 9 (via A-C-E).',
          '<b>Node E Vector:</b> To A: 6 (via C), To B: 3 (via B), To C: 4 (via C), To D: 7 (via D).'
        ]
      }
    ],
    conclusion: 'Applying the Bellman-Ford equation iteratively across the graph yields the optimal path from A to E as A → C → E with minimum cost 6, selecting C as the next hop. The protocol successfully converges once no neighbor advertises a lower total cost.',
    markingScheme: [
      { component: 'Distance Vector Concept, Properties & Bellman-Ford Equation', marks: '1.5' },
      { component: 'Network Graph Diagram with Initial Link Costs', marks: '1.5' },
      { component: 'Step-by-Step Path Calculation from A to all Nodes (Showing A to E derivation)', marks: '1.5' },
      { component: 'Converged Distance Vector Routing Table at Router A', marks: '1.5' },
      { component: 'All Nodes Convergence Vectors & Conclusion', marks: '1.0' }
    ],
    examTip: 'Explicitly write out the comparison for reaching node E: Via B is 5+3=8, Via C is 2+4=6, Via D is 3+7=10. Picking 6 via C shows complete mathematical rigor.'
  },
  {
    id: 'cn-original-2025-100602-q4b',
    verified: 'BEU 2025 · Q.4(b) · 7 Marks · Cross-checked scan',
    intro: 'The Internet Protocol version 6 (IPv6, RFC 8200) was engineered by the IETF to succeed IPv4. While IPv4 served as the foundation of the early Internet, the unprecedented explosion of web-connected smartphones, IoT devices, cloud virtualization, and global mobile networks resulted in the complete exhaustion of IPv4\'s 32-bit address pool, necessitating a next-generation protocol with vast addressing capacity and streamlined architectural features.',
    diagrams: [
      {
        title: 'Address Space Comparison: IPv4 (32-Bit) vs IPv6 (128-Bit)',
        ascii:
`[ IPv4 ADDRESS SPACE: 32 BITS = 4.29 BILLION ADDRESSES ]
+--------------------------------------------------------+
| 32 Bits: 2^32 = 4,294,967,296 Addresses                |
| (Exhausted globally by IANA / RIRs between 2011-2015)  |
+--------------------------------------------------------+

[ IPv6 ADDRESS SPACE: 128 BITS = 3.4 x 10^38 ADDRESSES ]
+-------------------------------------------------------------------------------+
| 128 Bits: 2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456 Addrs   |
| (~3.4 x 10^38 addresses = ~5 x 10^28 addresses for every human on Earth!)     |
+-------------------------------------------------------------------------------+`
      },
      {
        title: 'Header Architecture Simplification: IPv4 Variable vs IPv6 Fixed 40 Bytes',
        ascii:
`[ IPv4 HEADER: VARIABLE 20 TO 60 BYTES (Complex Router Processing) ]
Version | IHL | ToS | Total Length | Identification | Flags | Offset | TTL | Proto | Checksum ...

[ IPv6 HEADER: STREAMLINED FIXED 40 BYTES (Fast Hardware Forwarding) ]
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |                 Flow Label            | (32 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   | (32 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                   Source IP Address (128 Bits)                | (128 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                Destination IP Address (128 Bits)              | (128 bits)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
      }
    ],
    table: {
      title: 'Comprehensive Architectural Comparison: IPv4 vs IPv6',
      headers: ['Evaluation Parameter', 'IPv4 (Internet Protocol v4)', 'IPv6 (Internet Protocol v6)'],
      rows: [
        ['Address Length', '32 bits (4 bytes)', '128 bits (16 bytes)'],
        ['Total Address Space', '2^32 ≈ 4.29 × 10^9 addresses', '2^128 ≈ 3.4 × 10^38 addresses (virtually inexhaustible)'],
        ['Address Notation', 'Dotted-Decimal notation (e.g., 192.168.1.1)', 'Hexadecimal Colon notation (e.g., 2001:0db8::1)'],
        ['Base Header Size', 'Variable: 20 to 60 bytes (requires IHL field)', 'Fixed: Exactly 40 bytes (streamlines router ASIC processing)'],
        ['Header Checksum', 'Present; recomputed at every intermediate router hop', 'Removed; relies on Layer 2 and Layer 4 checksums to accelerate routing'],
        ['Packet Fragmentation', 'Performed by intermediate routers and sender host', 'Performed ONLY by source host (Path MTU Discovery mandatory)'],
        ['Address Configuration', 'Manual configuration or stateful DHCPv4', 'Stateless Address Autoconfiguration (SLAAC) or DHCPv6'],
        ['Broadcast Capability', 'Uses Broadcast (e.g., 255.255.255.255, ARP)', 'No broadcast; replaced with Multicast and Anycast'],
        ['Security Standard (IPsec)', 'Optional add-on; security rarely standardized', 'Engineered natively into protocol specification with IPsec extension headers'],
        ['NAT Dependency', 'Heavily reliant on NAT/PAT to conserve public IPs', 'Restores true end-to-end communication; eliminates need for NAT']
      ]
    },
    sections: [
      {
        heading: '1. Root Causes for the Necessity of IPv6',
        points: [
          '<b>Global IPv4 Address Depletion:</b> The 32-bit address space provides only 4.29 billion total addresses. With global proliferation of smartphones, home Wi-Fi routers, smart TVs, and industrial IoT sensors, all available IPv4 address blocks were exhausted by IANA in 2011.',
          '<b>Limitations of NAT (Network Address Translation):</b> Although NAT extended IPv4\'s lifespan by mapping private IP ranges (192.168.x.x, 10.x.x.x) to a single public IP, NAT breaks the fundamental end-to-end architectural principle of the Internet. NAT causes severe complications for peer-to-peer applications, VoIP (SIP), WebRTC, and end-to-end cryptographic authentication.',
          '<b>Massive Routing Table Growth:</b> Classful and piecemeal CIDR allocation caused global Internet core routing tables to balloon beyond 900,000 routes, straining router memory and processing capacity.'
        ]
      },
      {
        heading: '2. Major Technical Enhancements in IPv6 Architecture',
        points: [
          '<b>Streamlined Fixed 40-Byte Header:</b> IPv6 eliminated redundant fields (IHL, Identification, Flags, Fragment Offset, Checksum). A fixed 40-byte header enables high-speed hardware pipeline processing in modern router silicon.',
          '<b>Next Header Daisy-Chaining:</b> Optional functionality (Hop-by-Hop options, Routing, Fragmentation, Encapsulating Security Payload) is implemented through chained extension headers, keeping base forwarding extremely fast.',
          '<b>Stateless Address Autoconfiguration (SLAAC):</b> Devices joining an IPv6 network automatically generate their own globally unique address by combining the local router\'s advertised 64-bit network prefix with their 64-bit interface MAC identifier (EUI-64), enabling true plug-and-play networking without manual DHCP servers.'
        ]
      }
    ],
    conclusion: 'IPv6 was introduced because IPv4\'s 32-bit address space was fundamentally incapable of sustaining global digital growth. IPv6 solves address exhaustion with 128-bit addresses (3.4 × 10^38), eliminates NAT, accelerates routing via a streamlined 40-byte fixed header, and natively integrates SLAAC autoconfiguration and IPsec security.',
    markingScheme: [
      { component: 'IPv4 Depletion Context & Introduction of IPv6', marks: '1.5' },
      { component: 'Address Space Comparison (2^32 vs 2^128) & Mathematical Scale', marks: '1.5' },
      { component: 'Fixed 40-Byte Header Architecture Diagram & Streamlining', marks: '1.5' },
      { component: 'Comprehensive Comparative Analysis Table (10 Parameters)', marks: '1.5' },
      { component: 'SLAAC Autoconfiguration, Elimination of NAT & Conclusion', marks: '1.0' }
    ],
    examTip: 'Examiners award high marks for highlighting that IPv6 headers are FIXED at 40 bytes, the checksum was deliberately REMOVED to speed up routers, and broadcast addresses are completely ELIMINATED in favor of multicast.'
  },
  {
    id: 'cn-original-2025-100602-q5a',
    verified: 'BEU 2025 · Q.5(a) · 7 Marks · Cross-checked scan',
    intro: 'Dynamic interior routing protocols calculate optimal packet forwarding paths across autonomous systems. They fall into two fundamentally distinct architectural paradigms: Distance Vector Routing (Bellman-Ford based, where routers share distance vectors with immediate neighbors) and Link State Routing (Dijkstra based, where routers flood link state advertisements to build a complete topological map of the entire network).',
    diagrams: [
      {
        title: 'Distance Vector (Local Neighbor Sharing) vs Link State (Global Topology Flooding)',
        ascii:
`[ DISTANCE VECTOR: ROUTING BY RUMOR ]          [ LINK STATE: FULL TOPOLOGY AWARENESS ]
Each router shares its routing vector ONLY      Each router floods Link State Packets (LSP)
with immediate physical neighbors.              to ALL routers in the entire network area.

   [Router A] <==== Vector ====> [Router B]            [LSP Flooded to All Routers]
       ^                             |                            /\\        /\\
       |===== Vector ====> [Router C]|                           /  \\      /  \\
                                                          [Node A]--[Node B]--[Node C]
(Router A knows only neighbor costs, not topology)    (Every router computes Dijkstra locally)`
      }
    ],
    table: {
      title: 'Comprehensive Technical Comparison: Distance Vector vs Link State Routing',
      headers: ['Evaluation Parameter', 'Distance Vector Routing', 'Link State Routing'],
      rows: [
        ['Mathematical Algorithm', 'Bellman-Ford Algorithm (Distributed computation)', 'Dijkstra\'s Shortest Path First (SPF) Algorithm'],
        ['Network Knowledge Scope', 'Local knowledge only; router knows distance and next-hop ("Routing by rumor")', 'Global topological knowledge; every router maintains full identical network topology map'],
        ['Information Shared', 'Complete routing table (distances to all known destinations)', 'Status and costs of directly connected physical links only (LSPs)'],
        ['Update Transmission Mode', 'Periodic broadcasts/multicasts to immediate physical neighbors only', 'Triggered event-driven Flooding of LSPs to every router in the area'],
        ['Convergence Speed', 'Slow convergence; updates propagate hop-by-hop sequentially', 'Extremely fast convergence; flooding updates the entire area simultaneously'],
        ['Loop Susceptibility', 'Vulnerable to routing loops and the "Count-to-Infinity" problem', 'Immune to routing loops; Dijkstra guarantees loop-free shortest path tree'],
        ['Mitigation Mechanisms', 'Requires Split Horizon, Poison Reverse, and Hold-down Timers', 'Inherent SPF calculation freshness tracked via LSP Sequence Numbers and Aging timers'],
        ['Hardware Resource Demand', 'Low memory and CPU consumption; suitable for small/legacy networks', 'High memory (Link State Database) and intensive CPU processing for Dijkstra SPF calculation'],
        ['Network Scalability', 'Limited scalability (e.g. RIP hop count maximum is 15)', 'Highly scalable; supports hierarchical OSPF Areas and Autonomous Systems'],
        ['Standard Protocols', 'RIP (Routing Information Protocol), IGRP', 'OSPF (Open Shortest Path First), IS-IS (Intermediate System to Intermediate System)']
      ]
    },
    sections: [
      {
        heading: '1. Operational Working of Distance Vector Routing',
        points: [
          '<b>Bellman-Ford Iteration:</b> Each router maintains a vector of pairs <code>(Destination, Cost, Next-Hop)</code>. Periodically (e.g., every 30 seconds in RIP), each router broadcasts its vector to direct neighbors. A router updates its table using: <code>D_x(y) = min_v { c(x, v) + D_v(y) }</code>.',
          '<b>Count-to-Infinity Vulnerability:</b> When a link fails, neighbors continue advertising old stored path information to each other, gradually incrementing costs by 1 until reaching infinity (16 in RIP). Mitigated using Split Horizon (never advertise a route back over the interface from which it was learned) and Poison Reverse.'
        ]
      },
      {
        heading: '2. Operational Working of Link State Routing',
        points: [
          '<b>Step 1 — Neighbor Discovery:</b> Routers transmit lightweight HELLO packets on all interfaces to identify adjacent live neighbors and assign link costs.',
          '<b>Step 2 — Link State Packet (LSP) Generation:</b> Each router builds an LSP containing: its Router ID, list of directly connected active neighbors, current link costs, a Sequence Number, and an Age timer.',
          '<b>Step 3 — Reliable Flooding:</b> LSPs are flooded out all interfaces. Routers acknowledge LSPs and forward them to all other interfaces, synchronizing an identical Link State Database (LSDB) across the network.',
          '<b>Step 4 — Dijkstra SPF Tree:</b> Each router independently executes Dijkstra\'s algorithm using itself as the root to compute the shortest-path tree and construct its forwarding routing table.'
        ]
      }
    ],
    conclusion: 'Distance Vector routing is simple and computationally lightweight but suffers from slow convergence and loops (suitable for small networks via RIP), whereas Link State routing provides instantaneous loop-free convergence and global topological visibility at the cost of higher memory and CPU utilization (standardized globally via OSPF).',
    markingScheme: [
      { component: 'Architectural Definitions & Core Paradigms', marks: '1.5' },
      { component: 'Comparative ASCII Network Routing Diagrams', marks: '1.5' },
      { component: 'Exhaustive Comparison Table (10 Parameters: Algorithm, Scope, Convergence, Loops)', marks: '1.5' },
      { component: 'Distance Vector Mechanics, Bellman-Ford & Count-to-Infinity', marks: '1.5' },
      { component: 'Link State 4-Step Process (Hello, LSP, Flooding, Dijkstra) & Conclusion', marks: '1.0' }
    ],
    examTip: 'Always summarize the difference in one key line: "Distance Vector shares entire routing tables with direct neighbors; Link State shares direct link states with all routers."'
  },
  {
    id: 'cn-original-2025-100602-q6b',
    verified: 'BEU 2025 · Q.6(b) · 7 Marks · Cross-checked scan',
    intro: 'Classless Inter-Domain Routing (CIDR) eliminates rigid legacy address classes (Class A, B, C) by using variable-length subnet masking. A CIDR prefix notation <code>/n</code> indicates that the first <code>n</code> bits represent the network prefix, while the remaining <code>(32 − n)</code> bits identify individual host interfaces.',
    diagrams: [
      {
        title: 'CIDR Subnet Decomposition: Address 205.16.37.39/28',
        ascii:
`IP Address: 205.16.37.39 / 28
Octet 1: 205 = 11001101
Octet 2:  16 = 00010000
Octet 3:  37 = 00100101
Octet 4:  39 = 0 0 1 0   0 1 1 1
               |---|---| |---|---|
               Prefix    Host Bits (4 Bits)
               (28 Bits) (2^4 = 16 Addrs)

Subnet Mask:   255.255.255.240 (/28 = 28 consecutive 1s)
Subnet Range:  205.16.37.32 to 205.16.37.47 (Block size = 16)`
      }
    ],
    sections: [
      {
        heading: '1. Step-by-Step Mathematical Analysis',
        points: [
          '<b>Step 1 — Identify Host Bits:</b><br>Total IPv4 bits = <code>32</code>.<br>Prefix bits $n = 28$.<br>Number of host bits $h = 32 - 28 = 4\\text{ bits}$.',
          '<b>Step 2 — Determine Total Number of Addresses in the Block:</b><br>$$\\text{Total Addresses} = 2^h = 2^4 = 16\\text{ addresses}$$',
          '<b>Step 3 — Find the Subnet Block Multiplier:</b><br>The subnet mask for <code>/28</code> is: <code>11111111.11111111.11111111.11110000 = 255.255.255.240</code>.<br>Block step size in fourth octet = $256 - 240 = 16$.<br>Subnet boundaries in the fourth octet occur at multiples of 16: $0, 16, 32, 48, 64, \\dots$',
          '<b>Step 4 — Locate the Specific Given Address:</b><br>The fourth octet of the given address <code>205.16.37.39</code> is <code>39</code>.<br>Since $32 \\le 39 < 48$, this address belongs to the subnet block starting at <b>32</b>.',
          '<b>Step 5 — Calculate Network and Broadcast Addresses:</b><br>• <b>First Address (Network Identifier):</b> <code>205.16.37.32</code> (all 4 host bits set to 0).<br>• <b>Last Address (Directed Broadcast Address):</b> <code>205.16.37.47</code> ($32 + 16 - 1 = 47$, all 4 host bits set to 1).'
        ]
      },
      {
        heading: '2. Usable Host Addresses Allocation Breakdown',
        points: [
          '<b>Usable Host Range:</b> The assignable host interfaces extend from <code>205.16.37.33</code> to <code>205.16.37.46</code>.',
          '<b>Total Usable Hosts Count:</b> $2^4 - 2 = 16 - 2 = 14\\text{ usable host interfaces}$ (excluding .32 network and .47 broadcast addresses).'
        ]
      }
    ],
    table: {
      title: 'Summary of Subnet Parameters for 205.16.37.39/28',
      headers: ['Subnet Parameter', 'Calculated Value', 'Binary Representation in 4th Octet'],
      rows: [
        ['CIDR Prefix Length', '/28', '28 bits network, 4 bits host'],
        ['Subnet Mask', '255.255.255.240', '11110000'],
        ['Total Block Addresses', '16 addresses', '2^4 = 16'],
        ['First Address (Network ID)', '205.16.37.32', '00100000'],
        ['First Usable Host IP', '205.16.37.33', '00100001'],
        ['Given IP Address', '205.16.37.39', '00100111'],
        ['Last Usable Host IP', '205.16.37.46', '00101110'],
        ['Last Address (Broadcast ID)', '205.16.37.47', '00101111']
      ]
    },
    conclusion: 'The block of addresses granted to the organization is 205.16.37.32/28. The total number of addresses is 16 (14 assignable host addresses), spanning from the first address 205.16.37.32 to the last address 205.16.37.47.',
    markingScheme: [
      { component: 'CIDR Prefix Interpretation & Host Bits Calculation (h = 4)', marks: '2.0' },
      { component: 'Total Address Count Calculation (2^4 = 16 addresses)', marks: '1.5' },
      { component: 'Determination of Subnet Boundaries (Multiples of 16 in 4th Octet)', marks: '1.5' },
      { component: 'Identification of First Address (205.16.37.32) and Last Address (205.16.37.47)', marks: '1.5' },
      { component: 'Usable Host Range Clarification (.33 to .46) & Summary Table', marks: '0.5' }
    ],
    examTip: 'University evaluators check two exact numbers: First address = 205.16.37.32 and Last address = 205.16.37.47. Showing the binary representation of the 4th octet guarantees maximum marks.'
  },
  {
    id: 'cn-original-2025-100602-q7b',
    verified: 'BEU 2025 · Q.7(b) · 7 Marks · Cross-checked scan',
    intro: 'Quality of Service (QoS) refers to the capability of a computer communication network to provide differentiated service guarantees to specific types of network traffic. Modern networks carry heterogeneous data streams ranging from delay-intolerant real-time voice (VoIP) and interactive video conferencing to loss-intolerant, delay-tolerant bulk file transfers (FTP). Meeting Service Level Agreements (SLAs) requires active traffic control mechanisms.',
    diagrams: [
      {
        title: 'Traffic Shaping Architectures: Leaky Bucket vs Token Bucket',
        ascii:
`[ LEAKY BUCKET: REGULATES PEAK RATE ]           [ TOKEN BUCKET: ALLOWS CONTROLLED BURSTS ]
   Bursty Packet Arrivals                           Tokens generated at constant rate r
          |   |  |                                                 |
          v   v  v                                                 v
   +-----------------+                              +-----------------+
   |  Queue Buffer   |                              |  Token Bucket   | (Capacity = b tokens)
   |  (Capacity = C) |                              |  (Holds Tokens) |
   +-----------------+                              +-----------------+
          | (Smooths all bursts)                           | (Token matched to packet)
          v                                                v
   Constant Leak Rate R                           Packets depart at full burst speed
   (Uniform output rate)                          up to available tokens!`
      }
    ],
    table: {
      title: 'Four Fundamental Performance Metrics Governing Quality of Service (QoS)',
      headers: ['QoS Performance Metric', 'Technical Definition', 'Typical Target Threshold', 'Engineering Impact on Applications'],
      rows: [
        ['Bandwidth (Throughput)', 'Maximum rate of data transfer across a network path in bps', '≥ 100 Mbps for HD video', 'Insufficient bandwidth causes queuing buffer overflows and severe packet drops.'],
        ['Delay (Latency)', 'Total time required for a packet to traverse from source to destination', '< 150 ms (One-way VoIP)', 'Includes nodal processing, queuing, transmission, and propagation delays.'],
        ['Jitter (Delay Variation)', 'Statistical variance in packet arrival delay over time', '< 30 ms for real-time voice', 'Causes audio stuttering and choppy video; mitigated using de-jitter playout buffers.'],
        ['Packet Loss Ratio', 'Percentage of transmitted packets discarded due to buffer overflow', '< 1% for VoIP; 0% for TCP data', 'Real-time media conceals minor loss; TCP retransmits lost packets, causing latency spikes.']
      ]
    },
    sections: [
      {
        heading: '1. Core Traffic Management & Policing Techniques',
        points: [
          '<b>Traffic Shaping (Leaky Bucket):</b> Buffers incoming bursty traffic in a finite queue and transmits packets at an unyielding, constant rate <code>R</code>. Eliminates network jitter and prevents buffer overflow at downstream routers.',
          '<b>Traffic Shaping (Token Bucket):</b> Tokens accumulate in a bucket of capacity <code>b</code> at a fixed rate <code>r</code> tokens/sec. When a packet arrives, it consumes an equivalent token and is transmitted immediately. If tokens are full, a burst of up to <code>b</code> bytes can transmit at line rate, combining bandwidth enforcement with support for legitimate bursty traffic.',
          '<b>Traffic Policing:</b> Unlike shaping which buffers packets, policing measures incoming traffic against a configured threshold. Packets conforming to the SLA are passed; non-conforming excess packets are immediately discarded or marked with higher drop precedence (e.g. DSCP Drop Precedence).'
        ]
      },
      {
        heading: '2. Packet Scheduling Disciplines at Router Interfaces',
        points: [
          '<b>First-In, First-Out (FIFO):</b> Simple queue where packets depart in arrival order. Lacks service differentiation; large bulk downloads starve interactive VoIP packets.',
          '<b>Priority Queuing (PQ):</b> High-priority queues (e.g., VoIP on Queue 1) are strictly serviced until completely empty before lower-priority queues (Web browsing on Queue 2) receive any service. Can cause starvation of low-priority traffic.',
          '<b>Weighted Fair Queuing (WFQ):</b> Allocates a mathematically guaranteed fraction of total channel bandwidth to each traffic class dynamically according to assigned weights: <br>$$\\text{Bandwidth}_i = \\frac{w_i}{\\sum w_k} \\times C$$'
        ]
      }
    ],
    conclusion: 'Achieving end-to-end Quality of Service requires an integrated architecture combining packet classification, traffic shaping (Leaky Bucket for smooth output, Token Bucket for bursty traffic), traffic policing, and advanced queue scheduling (WFQ) to guarantee bandwidth, minimize latency, and eliminate jitter for mission-critical applications.',
    markingScheme: [
      { component: 'QoS Definition, Core Objectives & SLA Context', marks: '1.0' },
      { component: 'Four Fundamental QoS Metrics Table (Bandwidth, Delay, Jitter, Loss)', marks: '1.5' },
      { component: 'Traffic Shaping Architectures: Leaky Bucket vs Token Bucket ASCII Diagrams', marks: '2.0' },
      { component: 'Traffic Policing vs Traffic Shaping Detailed Comparison', marks: '1.0' },
      { component: 'Packet Scheduling Disciplines (FIFO, Priority Queuing, WFQ) & Conclusion', marks: '1.5' }
    ],
    examTip: 'Clearly distinguish Traffic Shaping from Traffic Policing: Shaping BUFFERS excess packets to smooth the rate, whereas Policing DISCARDS or remarks packets that exceed the committed rate.'
  },
  {
    id: 'cn-original-2025-100602-q8b',
    verified: 'BEU 2025 · Q.8(b) · 7 Marks · Cross-checked scan',
    intro: 'In computer network architectures, packet forwarding paradigms are defined by the number and scope of intended destinations. The three fundamental transmission modes are Unicasting (one-to-one point-to-point delivery), Broadcasting (one-to-all delivery within a local broadcast domain), and Multicasting (one-to-many delivery to a subscribed group of interested hosts).',
    diagrams: [
      {
        title: 'Comparison of Data Transmission Modes',
        ascii:
`[ UNICASTING: ONE-TO-ONE ]          [ BROADCASTING: ONE-TO-ALL ]        [ MULTICASTING: ONE-TO-GROUP ]
       [Sender]                            [Sender]                            [Sender]
          |                                   |                                   |
          v (Single Path)                     v (Flooded to ALL)                  v (Replicated at Branch)
       [Switch]                            [Switch]                            [Router]
       /   |   \\                           /   |   \\                           /   |   \\
      v    |    |                         v    v    v                         v    |    v
    [H1]  [H2] [H3]                     [H1]  [H2] [H3]                     [H1]  [H2] [H3]
   (Data sent ONLY                     (EVERY connected host               (Sent ONLY to subscribed
    to Host 1)                          receives the packet)                group members: H1 & H3)`
      }
    ],
    table: {
      title: 'Comprehensive Technical Comparison: Unicasting, Broadcasting, and Multicasting',
      headers: ['Evaluation Parameter', 'Unicasting (1-to-1)', 'Broadcasting (1-to-All)', 'Multicasting (1-to-Many)'],
      rows: [
        ['Communication Model', 'Point-to-Point (Single sender to single destination)', 'Point-to-Multipoint (Single sender to every node in domain)', 'Multipoint Group (Single sender to specific subscribed nodes)'],
        ['Addressing Scheme', 'Specific unicast IP (Class A, B, C; e.g. 192.168.1.15)', 'Limited Broadcast: 255.255.255.255; Directed: NetID.255', 'Class D IP Range: 224.0.0.0 to 239.255.255.255 (RFC 1112)'],
        ['Destination MAC Address', 'Specific 48-bit hardware MAC of target interface', 'All 1s: FF:FF:FF:FF:FF:FF (processed by all NIC cards)', 'Mapped MAC: 01:00:5E:00:00:00 to 01:00:5E:7F:FF:FF'],
        ['Bandwidth Efficiency', 'Inefficient for multiple recipients (sends N duplicate copies)', 'Wasteful; consumes CPU cycles on uninterested hosts', 'Highly efficient; router replicates packet ONLY where paths branch'],
        ['Router Forwarding Rule', 'Forwarded across routers hop-by-hop according to routing tables', 'Confined strictly to local broadcast domain; routers drop 255.255.255.255', 'Forwarded across subnets using Multicast Routing Protocols (PIM, DVMRP)'],
        ['Group Management Protocol', 'None required', 'None required', 'Internet Group Management Protocol (IGMP) between host and router'],
        ['Presence in IPv6', 'Yes; globally routable unicast and link-local unicast', 'ELIMINATED in IPv6 (Replaced entirely by Multicast & Anycast)', 'Yes; standardized IPv6 multicast address range (ff00::/8)'],
        ['Standard Applications', 'HTTP/HTTPS web browsing, SSH terminal, FTP file transfer', 'ARP requests, DHCP Discover broadcasts', 'Live IPTV video streaming, video conferencing (Zoom), stock ticker feeds']
      ]
    },
    sections: [
      {
        heading: '1. In-Depth Architectural Characteristics',
        points: [
          '<b>Unicasting:</b> Represents the dominant mode of Internet traffic. A single packet is transmitted from one source interface to one destination interface. When an application needs to send identical data to 1,000 users via unicast, the server must inject 1,000 separate duplicate packets, linearly scaling server bandwidth demand.',
          '<b>Broadcasting:</b> A single transmission is addressed to <code>255.255.255.255</code> (Limited Broadcast) with MAC <code>FF:FF:FF:FF:FF:FF</code>. Every Network Interface Card (NIC) on the physical local area network captures the frame and interrupts its operating system CPU. Because broadcasting creates "broadcast storms" and high CPU overhead, network routers strictly drop broadcast packets, blocking them from crossing subnet boundaries.',
          '<b>Multicasting:</b> Solves the scalability dilemma of media streaming. The sender transmits a single packet addressed to a Class D multicast IP (e.g. <code>239.1.1.1</code>). Intermediate multicast-enabled routers track subscribed group memberships via IGMP and dynamically replicate the packet ONLY at physical path bifurcation points, saving tremendous backbone bandwidth.'
        ]
      },
      {
        heading: '2. Multicast Addressing & MAC Hardware Mapping',
        points: [
          '<b>Class D IPv4 Range:</b> <code>224.0.0.0</code> to <code>239.255.255.255</code> (First 4 bits are <code>1110</code>).',
          '<b>Ethernet MAC Hardware Mapping:</b> IANA allocated the 24-bit OUI prefix <code>01:00:5E</code> for multicast. The lower 23 bits of the 28-bit multicast IP address are directly mapped into the lower 23 bits of the Ethernet MAC address: <br><code>IP: 224.0.0.1 ⇒ MAC: 01:00:5E:00:00:01</code>.'
        ]
      }
    ],
    conclusion: 'Unicasting provides targeted point-to-point delivery for private transactions, Broadcasting enables discovery protocols within local LAN boundaries (eliminated in IPv6), and Multicasting delivers optimal bandwidth efficiency for one-to-many real-time multimedia streaming through intelligent router replication.',
    markingScheme: [
      { component: 'Clear Definitions & Conceptual Models of the Three Transmission Modes', marks: '1.5' },
      { component: 'Comparative Transmission Flow Architecture Diagrams', marks: '1.5' },
      { component: 'Comprehensive Comparison Table (8 Technical Criteria)', marks: '1.5' },
      { component: 'Addressing Schemes (Class D, Broadcast MAC, IPv6 Multicast Mapping)', marks: '1.5' },
      { component: 'Bandwidth Scaling Analysis, Practical Applications & Conclusion', marks: '1.0' }
    ],
    examTip: 'Emphasize that IPv6 completely REMOVED broadcast in favor of multicast, and show the Class D multicast range (224.0.0.0 to 239.255.255.255) and its Ethernet MAC prefix 01:00:5E.'
  },
];
export const unit4SupplementalSolutions = unit4Entries
  .filter(({marks}) => marks !== 7)
  .map(toSolution);
