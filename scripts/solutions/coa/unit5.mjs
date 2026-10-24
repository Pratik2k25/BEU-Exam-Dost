// BEU Model Solutions - COA Unit 5
export const unit5Solutions = [
  {
    "id": "coa-q10",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Cache Memory mapping dictates how main memory blocks are positioned and located within the faster, smaller cache memory. The three primary mapping techniques are Direct Mapping, Associative Mapping, and Set-Associative Mapping.",
    "table": {
      "title": "Cache Mapping Techniques Comparison",
      "headers": [
        "Mapping Technique",
        "Placement Rule",
        "Address Field Breakdown",
        "Hardware Complexity & Cost",
        "Conflict Miss Rate"
      ],
      "rows": [
        [
          "Direct Mapping",
          "Block i maps strictly to line (i mod N)",
          "[ Tag | Line/Index | Byte Offset ]",
          "Simplest & fastest; 1 comparator only",
          "Highest (conflict misses prevalent)"
        ],
        [
          "Fully Associative",
          "Block i can reside in any cache line",
          "[ Tag | Byte Offset ]",
          "Most complex; requires N simultaneous comparators",
          "Lowest (zero conflict misses)"
        ],
        [
          "K-Way Set Associative",
          "Block i maps to set (i mod S); any line in set",
          "[ Tag | Set Index | Byte Offset ]",
          "Balanced; K comparators per set",
          "Low; optimal engineering balance"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Direct Mapping Mechanism",
        "points": [
          "Cache line index is calculated as: <code>Line Index = (Block Address) mod (Total Cache Lines)</code>",
          "Logical address is partitioned into: [ Tag | Line Index | Word/Byte Offset ].",
          "Advantage: Extremely fast hit check using a single comparator.",
          "Disadvantage: Severe thrashing if two frequently accessed blocks hash to the exact same line index."
        ]
      },
      {
        "heading": "2. Fully Associative Mapping Mechanism",
        "points": [
          "A main memory block can be loaded into any available cache line.",
          "Logical address is partitioned into: [ Tag | Word/Byte Offset ].",
          "Advantage: Maximizes cache utilization and minimizes misses.",
          "Disadvantage: Requires associative CAM (Content Addressable Memory) or parallel comparators for every line, making it expensive and power-hungry for large caches."
        ]
      },
      {
        "heading": "3. K-Way Set-Associative Mapping Mechanism",
        "points": [
          "Cache is partitioned into S sets, each containing K cache lines.",
          "Block placement rule: <code>Set Index = (Block Address) mod (Total Sets S)</code>",
          "Address breakdown: [ Tag | Set Index | Word/Byte Offset ].",
          "Offers the ideal trade-off between the speed of direct mapping and the low miss rate of associative mapping. Widely adopted in modern L1, L2, and L3 caches (e.g., 4-way, 8-way, 16-way)."
        ]
      }
    ],
    "conclusion": "Set-associative cache mapping provides the optimal balance of hardware cost, access latency, and hit ratio, forming the standard cache architecture across modern microprocessors.",
    "markingScheme": [
      {
        "component": "Cache Mapping Purpose & Memory Hierarchy Principle",
        "marks": 1
      },
      {
        "component": "Direct, Associative, and Set-Associative Detailed Explanations",
        "marks": 3
      },
      {
        "component": "Address Bit Partitioning Formulas & Comparative Table",
        "marks": 2
      },
      {
        "component": "Conflict Miss Analysis & Modern Processor Best Practices",
        "marks": 1
      }
    ],
    "examTip": "Draw the address bit breakdown formats side by side ([Tag | Index | Offset] vs [Tag | Offset]). State the modulo mapping formulas explicitly."
  },
  {
    "id": "coa-q11",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Direct Memory Access (DMA) is a specialized I/O technique that permits high-speed peripheral devices (e.g., hard drives, network controllers) to transfer data blocks directly to and from main memory without continuous CPU intervention.",
    "diagrams": [
      {
        "title": "DMA Controller Architecture and Bus Handshake Mechanism",
        "ascii": "    +---------------+                    +---------------+\n    |      CPU      |                    |  MAIN MEMORY  |\n    +-------+-------+                    +-------+-------+\n            |                                    |\n   HOLD /   | HLDA (Bus Grant)                   |\n   HOLDREQ  |                                    |\n            v                                    v\n    +-------+------------------------------------+-------+\n    |                     SYSTEM BUS                     |\n    +-------+------------------------------------+-------+\n            ^                                    ^\n   DMARQ /  | DMACK                              | Address/Data\n            |                                    |\n    +-------+-------+                    +-------+-------+\n    | DMA CONTROLLER|                    |  I/O DEVICE   |\n    | - Address Reg |                    | (Disk/Network)|\n    | - Word Count  |                    +---------------+\n    | - Control/Stat|\n    +---------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Internal Organization of DMA Controller",
        "points": [
          "<b>Address Register:</b> Holds the starting memory address for data transfer, auto-incremented after each word transfer.",
          "<b>Word Count Register:</b> Initialized with the total number of words to transfer, decremented after each word; generates an interrupt when it reaches zero.",
          "<b>Control & Status Register:</b> Specifies transfer direction (read from memory vs write to memory) and transfer mode, holding device status flags."
        ]
      },
      {
        "heading": "2. DMA Operational Sequence",
        "points": [
          "1. CPU initializes DMA registers (source/destination address, word count, direction) and issues a start command.",
          "2. When the peripheral is ready, it asserts DMA Request (DMARQ) to the DMA controller.",
          "3. DMA controller asserts Bus Request (HOLD) to the CPU.",
          "4. CPU completes current bus cycle, releases control of address/data buses to high-impedance state, and asserts Bus Grant (HLDA).",
          "5. DMA controller transfers data directly between I/O device and memory at maximum bus speed.",
          "6. When Word Count reaches 0, DMA controller de-asserts HOLD and issues an interrupt to notify the CPU of transfer completion."
        ]
      },
      {
        "heading": "3. Burst Mode vs Cycle Stealing Mode",
        "points": [
          "<b>Burst (Block) Transfer Mode:</b> DMA controller gains control of the bus and transfers the entire block of data continuously without returning the bus to the CPU. Highly efficient for bulk transfers but freezes CPU memory access for the transfer duration.",
          "<b>Cycle Stealing Mode:</b> DMA controller transfers exactly one word per stolen bus cycle, returning bus control to the CPU between successive transfers. Minimizes CPU stalling during time-critical background tasks."
        ]
      }
    ],
    "conclusion": "DMA frees the CPU from byte-by-byte polling and interrupt servicing during massive I/O transfers, dramatically enhancing overall computer system throughput.",
    "markingScheme": [
      {
        "component": "DMA Definition, Motivation & Key Advantage over Programmed I/O",
        "marks": 1
      },
      {
        "component": "Complete Hardware Block Diagram & System Handshake Protocol",
        "marks": 2.5
      },
      {
        "component": "Step-by-Step Handshake Cycle Description (HOLD / HLDA)",
        "marks": 2
      },
      {
        "component": "Burst Transfer vs Cycle Stealing Mode Detailed Contrast",
        "marks": 1.5
      }
    ],
    "examTip": "Label the control lines (HOLD, HLDA, DMARQ, DMACK) clearly on your diagram and contrast Burst mode against Cycle Stealing with an emphasis on CPU latency."
  },
  {
    "id": "coa-q12",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Virtual Memory creates the illusion of a vast, contiguous memory space for each user program by dynamically mapping large logical (virtual) addresses to available physical memory frames, utilizing secondary storage (paging file/swap space) as overflow.",
    "diagrams": [
      {
        "title": "Virtual-to-Physical Address Translation with TLB & Page Table",
        "ascii": "Logical Address from CPU: [ Virtual Page Number (VPN) | Page Offset (d) ]\n                                |                            |\n                        +-------+-------+                    |\n                        | Consult TLB   |                    |\n                        +-------+-------+                    |\n                                |                            |\n                    +-----------+-----------+                |\n                    | TLB Hit?              |                |\n                    +-----+-----------+-----+                |\n                      Yes |           | No (TLB Miss)        |\n                          v           v                      |\n                    +-----------+ +-------------------+      |\n                    | Extract   | | Access Page Table |      |\n                    | Frame PPN | | in Main Memory    |      |\n                    +-----+-----+ +---------+---------+      |\n                          |                 |                |\n                          |           +-----+-----+          |\n                          |      Valid|           | Invalid  |\n                          |           v           v          |\n                          |      +---------+ +-------------+ |\n                          |      | Extract | | Page Fault! | |\n                          |      | PPN     | | OS Swap In  | |\n                          |      +----+----+ +-------------+ |\n                          |           |                      |\n                          v           v                      |\nPhysical Address:       [ Physical Frame Number (PPN) | Page Offset (d) ]\n                                      |\n                                      v\n                               [ Main Memory Access ]"
      }
    ],
    "sections": [
      {
        "heading": "1. Logical-to-Physical Address Translation Steps",
        "points": [
          "The CPU generates a Virtual (Logical) Address structured as: <code>[ Virtual Page Number (VPN) | Page Offset (d) ]</code>.",
          "<b>Step 1 (TLB Lookup):</b> The Memory Management Unit (MMU) searches the Translation Lookaside Buffer (TLB)—a fast associative cache of recent page translations. If VPN matches a valid TLB tag (TLB Hit), the Physical Page Frame Number (PPN) is extracted immediately in 1 clock cycle.",
          "<b>Step 2 (Page Table Access on TLB Miss):</b> If a TLB miss occurs, the MMU consults the Page Table in physical memory using the Page Table Base Register (PTBR): <code>PTE Address = PTBR + (VPN × PTE Size)</code>.",
          "<b>Step 3 (Validity & Page Fault Check):</b> The Page Table Entry (PTE) contains the Present/Valid bit. If Valid = 1, PPN is extracted and the TLB is updated. If Valid = 0, a hardware trap (Page Fault) is signaled to the OS kernel to fetch the page from secondary storage (disk/SSD).",
          "<b>Step 4 (Physical Address Construction):</b> The physical address is assembled by concatenating PPN with the original unmodified Page Offset: <code>Physical Address = [ PPN | Offset d ]</code>."
        ]
      },
      {
        "heading": "2. Effective Memory Access Time (EMAT) Formula",
        "points": [
          "Let h be the TLB hit ratio, t_tlb be TLB lookup time, and t_mem be main memory access time:",
          "<code>EMAT = h · (t_tlb + t_mem) + (1 - h) · (t_tlb + 2 · t_mem)</code>",
          "Because modern TLB hit ratios exceed 98%, memory address translation overhead is negligible."
        ]
      }
    ],
    "conclusion": "Paging combined with Translation Lookaside Buffers provides robust memory protection, transparent process isolation, and flexible non-contiguous physical allocation without unacceptable access penalties.",
    "markingScheme": [
      {
        "component": "Virtual Memory & Paging Foundational Concepts",
        "marks": 1
      },
      {
        "component": "Complete Labelled Address Translation Flow Diagram",
        "marks": 2.5
      },
      {
        "component": "Step-by-Step Translation Algorithm & Page Fault Handling",
        "marks": 2
      },
      {
        "component": "Effective Memory Access Time (EMAT) Mathematical Formulation",
        "marks": 1.5
      }
    ],
    "examTip": "Note that the Page Offset (d) is passed directly from logical to physical address without alteration. Show the EMAT formula with numerical variables for top marks."
  }
];
