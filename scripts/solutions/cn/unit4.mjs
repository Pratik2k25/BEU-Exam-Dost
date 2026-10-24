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
      intro: 'Routing Information Protocol (RIP) is an Interior Gateway Protocol (IGP) based on the Distance Vector algorithm, widely deployed in small-to-medium autonomous systems.',
      diagrams: [
        {
          title: 'RIP Routing Architecture & Periodic Advertisement Flow',
          ascii:
`[ Autonomous System (AS) - RIP Domain ]
Router A <---(1 Hop)---> Router B <---(1 Hop)---> Router C <---(1 Hop)---> Dest D
Cost: 0                  Cost: 1                  Cost: 2                  Cost: 3

• Every 30 seconds: Routers broadcast RIP response packets over UDP Port 520.
• Hop Count Metric: 1 to 15 (16 Hops = Metric of Infinity / Unreachable).`
        }
      ],
      sections: [
        {
          heading: '1. Protocol Specifications & Bellman-Ford Equation',
          points: [
            '<b>Metric:</b> Pure hop count (number of intermediate subnets/routers). Bandwidth, latency, and reliability are ignored.',
            '<b>Infinity Threshold:</b> Maximum allowed hop count is 15. A hop count of 16 indicates an unreachable destination, bounding convergence time.',
            '<b>Bellman-Ford Formulation:</b> Distance from router x to destination y: <br><code>Dx(y) = min_v { c(x, v) + Dv(y) }</code>, where v iterates over all direct neighbors of x.'
          ]
        },
        {
          heading: '2. Timers and Loop-Prevention Mechanisms',
          points: [
            '<b>Periodic Timer (30s):</b> Routers exchange complete routing tables with immediate neighbors every 30 seconds.',
            '<b>Route Timeout (180s):</b> If no update is received for a route within 180s, its hop count is marked as 16 (unreachable).',
            '<b>Split Horizon:</b> A router never advertises a route back out of the interface through which it was learned.',
            '<b>Poison Reverse:</b> The router advertises the route back to the source, but with an explicit hop count of 16 (infinity), actively killing looping updates.'
          ]
        }
      ],
      conclusion: 'RIP is simple and computationally lightweight, but its 15-hop limit and slow convergence make it unsuitable for large modern enterprise networks.',
      markingScheme: [
        { component: 'RIP Overview & Distance Vector Foundation', marks: '1.0' },
        { component: 'Hop Count Metric & 16-Hop Infinity Rule', marks: '1.5' },
        { component: 'Bellman-Ford Formula & Periodic Timers', marks: '2.0' },
        { component: 'Loop Prevention (Split Horizon & Poison Reverse)', marks: '2.0' },
        { component: 'Conclusion & Practical Scope', marks: '0.5' }
      ],
      examTip: 'Highlight the difference between Split Horizon (do not advertise back) and Poison Reverse (advertise back with metric 16).'
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
      intro: 'Network Address Translation (NAT), defined in RFC 3022, enables an entire private local network to share one or a small pool of globally unique public IPv4 addresses, mitigating IPv4 address exhaustion.',
      diagrams: [
        {
          title: 'NAT Operation & Translation Table Mapping',
          ascii:
`[ PRIVATE NETWORK: 192.168.1.0/24 ]          [ PUBLIC INTERNET ]
Host A: 192.168.1.10:5001 ----+
                              |
Host B: 192.168.1.20:5002 ----+---> [ NAT ROUTER ] =======> Web Server
                                    Public IP: 203.0.113.1  142.250.190.46:80
+----------------------------------------------------------------------------+
| NAT TRANSLATION TABLE                                                      |
| Inside Local IP:Port  | Inside Global IP:Port | Outside Global IP:Port     |
| 192.168.1.10 : 5001   | 203.0.113.1 : 40001   | 142.250.190.46 : 80        |
| 192.168.1.20 : 5002   | 203.0.113.1 : 40002   | 142.250.190.46 : 80        |
+----------------------------------------------------------------------------+`
        }
      ],
      sections: [
        {
          heading: '1. Three Major Flavors of NAT',
          points: [
            '<b>1. Static NAT:</b> Maps a single private IP address to a single public IP address permanently on a 1-to-1 basis. Used for hosting internal web/mail servers.',
            '<b>2. Dynamic NAT:</b> Maps an unregistered private IP address to an available public IP from a pre-configured pool of registered public IPs on a first-come, first-served basis.',
            '<b>3. Port Address Translation (PAT / NAT Overload):</b> Maps thousands of private host sockets to a single public IP address by tracking unique Layer 4 ephemeral port numbers (up to ~65,000 concurrent sessions).'
          ]
        },
        {
          heading: '2. Advantages and Limitations',
          points: [
            '<b>Advantages:</b> Drastically conserves global IPv4 address space; enhances internal network security by hiding private topologies.',
            '<b>Limitations:</b> Breaks end-to-end IP principle; complicates peer-to-peer applications (VoIP, BitTorrent) requiring STUN/TURN traversal servers.'
          ]
        }
      ],
      conclusion: 'NAT remains a cornerstone of enterprise networking, allowing millions of private devices to access the Internet simultaneously using a single public IPv4 address.',
      markingScheme: [
        { component: 'NAT Definition & IPv4 Conservation Motivation', marks: '1.5' },
        { component: 'Architectural Flow Diagram with Translation Table', marks: '2.0' },
        { component: 'Types of NAT (Static, Dynamic, PAT/Overload)', marks: '2.5' },
        { component: 'Advantages and Limitations Analysis', marks: '1.0' }
      ],
      examTip: 'Draw the NAT translation table showing Inside Local, Inside Global, and Outside Global addresses. Emphasize that PAT uses port numbers.'
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
];
export const unit4SupplementalSolutions = unit4Entries
  .filter(({marks}) => marks !== 7)
  .map(toSolution);
