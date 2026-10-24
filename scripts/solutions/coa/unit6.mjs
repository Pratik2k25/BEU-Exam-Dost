// BEU Model Solutions - COA Unit 6
export const unit6Solutions = [
  {
    "id": "coa-q13",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Instruction Pipelining is an architectural implementation technique where multiple instructions are overlapped in execution across dedicated sub-hardware stages, analogous to an industrial assembly line.",
    "diagrams": [
      {
        "title": "5-Stage Classic RISC Instruction Pipeline Space-Time Diagram",
        "ascii": "Clock Cycles --->   1    2    3    4    5    6    7    8    9\nInstruction 1:    [IF] [ID] [EX] [MEM][WB]\nInstruction 2:         [IF] [ID] [EX] [MEM][WB]\nInstruction 3:              [IF] [ID] [EX] [MEM][WB]\nInstruction 4:                   [IF] [ID] [EX] [MEM][WB]\nInstruction 5:                        [IF] [ID] [EX] [MEM][WB]\n\nStages:\nIF : Instruction Fetch      ID : Instruction Decode & Register Read\nEX : Execute / ALU Calc     MEM: Memory Access      WB : Write Back"
      }
    ],
    "sections": [
      {
        "heading": "1. Standard 5-Stage RISC Pipeline Architecture",
        "points": [
          "<b>1. Instruction Fetch (IF):</b> Fetch instruction from instruction cache/memory into IR; increment PC.",
          "<b>2. Instruction Decode (ID):</b> Decode opcode, read source operands from register file, sign-extend immediate fields.",
          "<b>3. Execute (EX):</b> Perform ALU computation, compute effective memory addresses, evaluate branch target conditions.",
          "<b>4. Memory Access (MEM):</b> Perform load or store operation to data cache/memory if required.",
          "<b>5. Write Back (WB):</b> Write execution or memory read result back into destination register in register file."
        ]
      },
      {
        "heading": "2. Derivation of Pipeline Performance Metrics",
        "points": [
          "Consider a k-stage pipeline executing n independent instructions with clock period tau:",
          "<b>Non-Pipelined Execution Time:</b> <code>T_non_pipe = n · k · tau</code>",
          "<b>Pipelined Execution Time:</b> The first instruction requires k cycles; each subsequent instruction finishes in 1 additional cycle: <code>T_pipe = [k + (n - 1)] · tau</code>",
          "<b>Speedup (S):</b> <code>S = T_non_pipe / T_pipe = (n · k · tau) / ([k + n - 1] · tau) = (n · k) / (k + n - 1)</code>. As n -> infinity, <code>Speedup -> k</code> (ideal speedup equals pipeline depth).",
          "<b>Efficiency (E):</b> <code>E = S / k = n / (k + n - 1)</code>. As n -> infinity, <code>Efficiency -> 1 (100%)</code>.",
          "<b>Throughput (TP):</b> Number of instructions completed per unit time: <code>TP = n / T_pipe = n / ([k + n - 1] · tau)</code>. As n -> infinity, <code>TP -> 1 / tau</code> instructions per second."
        ]
      }
    ],
    "conclusion": "Instruction pipelining improves processor performance not by decreasing single-instruction latency, but by multiplying instruction execution throughput toward an ideal rate of 1 instruction per clock cycle.",
    "markingScheme": [
      {
        "component": "Pipelining Concept & Assembly Line Analogy",
        "marks": 1
      },
      {
        "component": "5-Stage Architecture Description & Space-Time Timing Diagram",
        "marks": 2
      },
      {
        "component": "Complete Mathematical Derivation of Speedup (S)",
        "marks": 2
      },
      {
        "component": "Derivations for Efficiency (E) and Throughput (TP)",
        "marks": 2
      }
    ],
    "examTip": "State the limits as n approaches infinity for Speedup (S -> k), Efficiency (E -> 1), and Throughput (TP -> 1/tau). This formal proof is mandatory in BEU examinations."
  },
  {
    "id": "coa-q14",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Pipeline Hazards are situations in hardware execution that prevent the next instruction in the stream from executing in its designated clock cycle, inducing pipeline stalls (bubbles) that degrade performance below ideal speedup.",
    "sections": [
      {
        "heading": "1. Classification of Pipeline Hazards",
        "points": [
          "<b>1. Structural Hazards (Resource Conflicts):</b> Occurs when hardware resources are insufficient to support all concurrent pipeline stage requests. For example, a single-ported memory accessed simultaneously for instruction fetch (IF) and data access (MEM). <i>Remedy:</i> Separate Harvard architecture caches (Instruction Cache and Data Cache).",
          "<b>2. Data Hazards (Data Dependencies):</b> Occurs when an instruction depends on the result of an earlier instruction that is still in flight within the pipeline. Classified into three types:",
          "   • <b>Read After Write (RAW) [True Dependency]:</b> Instruction j attempts to read a register before instruction i writes it. (Most common hazard in pipelines).",
          "   • <b>Write After Read (WAR) [Anti-Dependency]:</b> Instruction j attempts to write before instruction i reads. (Occurs in out-of-order execution).",
          "   • <b>Write After Write (WAW) [Output Dependency]:</b> Instruction j attempts to write before instruction i writes, risking out-of-order register state.",
          "<b>3. Control Hazards (Branch Hazards):</b> Occurs when the pipeline fetches instructions following a conditional branch before the branch condition and target address are resolved."
        ]
      },
      {
        "heading": "2. Hardware Hazard Mitigation Techniques",
        "points": [
          "<b>Operand Forwarding (Bypassing):</b> Directly routes the ALU output from the EX/MEM or MEM/WB pipeline register back to the ALU input of the subsequent stage without waiting for the WB stage to write to the register file, eliminating most RAW stalls.",
          "<b>Branch Prediction:</b> Static prediction (predict branch taken/untaken) or dynamic prediction using Branch Target Buffers (BTB) and 2-bit saturating counters to anticipate branch paths.",
          "<b>Delayed Branching:</b> The compiler inserts independent instructions (branch delay slots) after the branch instruction that execute regardless of whether the branch is taken or untaken."
        ]
      }
    ],
    "conclusion": "Effective hazard resolution combining internal hardware forwarding paths, dual-cache Harvard architectures, and dynamic branch prediction enables modern processors to sustain execution near peak theoretical throughput.",
    "markingScheme": [
      {
        "component": "Pipeline Hazard Concept & Impact on CPI",
        "marks": 1
      },
      {
        "component": "Detailed Analysis of Structural, Data (RAW, WAR, WAW), and Control Hazards",
        "marks": 3.5
      },
      {
        "component": "Hardware Forwarding (Bypassing) Mechanism & Forwarding Paths",
        "marks": 1.5
      },
      {
        "component": "Branch Hazard Remedies (Delayed Branch, Branch Prediction)",
        "marks": 1
      }
    ],
    "examTip": "Define all three data hazard variants (RAW, WAR, WAW) clearly. Explain why operand forwarding resolves RAW hazards without inserting idle bubble cycles."
  },
  {
    "id": "coa-q15",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Introduced by Michael J. Flynn in 1966, Flynn’s Taxonomy is the universally accepted classification system for computer architectures based on the multiplicity of concurrent Instruction Streams and Data Streams processed by the hardware.",
    "table": {
      "title": "Flynn’s Taxonomy of Computer Architectures",
      "headers": [
        "Architecture Class",
        "Instruction Stream",
        "Data Stream",
        "Structural Hardware Architecture",
        "Real-World Examples"
      ],
      "rows": [
        [
          "SISD (Single Instruction, Single Data)",
          "Single (1)",
          "Single (1)",
          "Uniprocessor executing one instruction on one data element per cycle",
          "Traditional Intel 8086, older single-core CPUs"
        ],
        [
          "SIMD (Single Instruction, Multiple Data)",
          "Single (1)",
          "Multiple (M)",
          "Single control unit broadcasting identical instruction to vector ALU array",
          "NVIDIA GPUs, Intel AVX/SSE vector units, Vector supercomputers"
        ],
        [
          "MISD (Multiple Instruction, Single Data)",
          "Multiple (N)",
          "Single (1)",
          "Multiple independent processors executing different code on the same data stream",
          "Fault-tolerant aerospace computers (Space Shuttle flight controls)"
        ],
        [
          "MIMD (Multiple Instruction, Multiple Data)",
          "Multiple (N)",
          "Multiple (M)",
          "Multiple autonomous processing cores executing independent programs on separate data",
          "Multi-core CPUs (Intel Core i9, AMD Ryzen), Supercomputer clusters"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. In-Depth Structural Characteristics",
        "points": [
          "<b>SISD:</b> Classical von Neumann architecture with a single control unit and single ALU. Parallelism is limited to instruction-level pipelining.",
          "<b>SIMD:</b> Exploits data-level parallelism (DLP). One instruction decoder broadcasts an identical instruction (e.g., parallel vector multiply) across dozens or thousands of processing elements simultaneously. Dominates graphics rendering, machine learning tensor operations, and scientific matrix computing.",
          "<b>MISD:</b> Theoretical architecture where identical data passes through a cascade of different processors. Rarely implemented in commercial general-purpose computing; primarily used for high-reliability redundancy checking.",
          "<b>MIMD:</b> Exploits thread-level (TLP) and process-level parallelism. Divided into Shared Memory systems (SMP/NUMA where all cores share a unified address space) and Distributed Memory systems (clusters where nodes communicate via message passing over high-speed interconnects)."
        ]
      }
    ],
    "conclusion": "Flynn’s taxonomy remains the primary taxonomy for parallel computing, categorizing systems from legacy uniprocessors (SISD) to modern multi-core workstations (MIMD) and massively parallel AI accelerators (SIMD).",
    "markingScheme": [
      {
        "component": "Flynn’s Taxonomy Basis & 2×2 Classification Matrix",
        "marks": 1.5
      },
      {
        "component": "Detailed Descriptions of SISD, SIMD, MISD, MIMD Architectures",
        "marks": 3.5
      },
      {
        "component": "Comparative Structural Table & Modern Industry Examples",
        "marks": 2
      }
    ],
    "examTip": "Draw a 2×2 matrix of Single/Multiple Instruction vs Single/Multiple Data. For SIMD, give modern examples like GPUs and AVX; for MIMD, mention modern multi-core processors."
  }
];
