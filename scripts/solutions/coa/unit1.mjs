import { coaOriginalSolutionsByUnit, coaImportantCorrectionsById } from './original.mjs';
// BEU Model Solutions - COA Unit 1
export const unit1Solutions = [...coaOriginalSolutionsByUnit[1], {
    "id": "coa-q1",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Instruction Cycle is the foundational operational sequence executed by a central processing unit (CPU) to process each machine language instruction. It comprises four major sequential phases: Fetch, Decode, Read Effective Address (for indirect addressing), and Execute.",
    "diagrams": [
      {
        "title": "Instruction Cycle State Flowchart",
        "ascii": "    +---------------------------+\n    |       START / RESET       |\n    +-------------+-------------+\n                  |\n                  v\n    +---------------------------+\n    |        FETCH PHASE        |\n    |  AR <- PC                 |\n    |  IR <- M[AR], PC <- PC + 1|\n    +-------------+-------------+\n                  |\n                  v\n    +---------------------------+\n    |       DECODE PHASE        |\n    |  Decode Opcode in IR      |\n    |  AR <- IR(0-11), I <- IR15|\n    +-------------+-------------+\n                  |\n        +---------+---------+\n        | Is I == 1 & Mem?  |\n        +----+---------+----+\n         Yes |         | No\n             v         v\n    +------------+ +------------+\n    | READ EFF.  | | DIRECT /   |\n    | ADDRESS    | | REGISTER / |\n    | AR <- M[AR]| | I/O OP     |\n    +----+-------+ +----+-------+\n         |              |\n         +-------+------+\n                 |\n                 v\n    +---------------------------+\n    |       EXECUTE PHASE       |\n    |  ALU Operation / Memory   |\n    |  Sequence Counter SC <- 0 |\n    +-------------+-------------+\n                  |\n                  +---> (Repeat for next instruction)"
      }
    ],
    "sections": [
      {
        "heading": "1. Detailed Analysis of Instruction Cycle Phases",
        "points": [
          "<b>Fetch Phase:</b> The Program Counter (PC) holds the address of the next instruction. The address is transferred to the Address Register (AR <- PC). The instruction code is fetched from memory into the Instruction Register (IR <- M[AR]), and the PC is incremented (PC <- PC + 1) to point to the next instruction.",
          "<b>Decode Phase:</b> The control unit decodes the operation code (opcode) bits of the IR. In basic computer architecture, bits 12-14 define the operation, bit 15 (I) specifies direct (I=0) or indirect (I=1) addressing, and bits 0-11 designate the memory address or register/IO operation.",
          "<b>Read Effective Address Phase:</b> If the instruction is a memory-reference instruction and I = 1 (indirect addressing), the control unit performs an extra memory read cycle: AR <- M[AR]. This replaces the address currently in AR with the effective address where the actual operand resides.",
          "<b>Execute Phase:</b> The decoded control signals activate the required datapath and arithmetic logic unit (ALU) functional units. For memory-reference instructions (e.g., ADD, LDA, STA), the operand is read and processed. At the end of execution, the Sequence Counter (SC) is cleared to 0 (SC <- 0) to commence the next instruction cycle."
        ]
      },
      {
        "heading": "2. Register Transfer Notation (RTL) Summary",
        "points": [
          "<b>T0:</b> AR <- PC",
          "<b>T1:</b> IR <- M[AR], PC <- PC + 1",
          "<b>T2:</b> D0...D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)",
          "<b>T3 (Memory Reference, Indirect):</b> AR <- M[AR]",
          "<b>T4-T6 (Execute):</b> Perform specific ALU operation, SC <- 0"
        ]
      }
    ],
    "conclusion": "The instruction cycle guarantees deterministic, synchronised program execution by converting software binary instructions into timed micro-operations across CPU registers and system buses.",
    "markingScheme": [
      {
        "component": "Definition & Purpose of Instruction Cycle",
        "marks": 1
      },
      {
        "component": "Complete Labelled Flowchart (Fetch, Decode, EA, Execute)",
        "marks": 2.5
      },
      {
        "component": "Detailed Explanation of 4 Phases with RTL Micro-operations",
        "marks": 2.5
      },
      {
        "component": "Conclusion & Sequence Counter Reset Role",
        "marks": 1
      }
    ],
    "examTip": "Always draw the flowchart showing the decision box for bit I (direct vs indirect). Mention specific micro-operations (T0 to T3) using standard Morris Mano notation for full 7 marks."
  },
  {
    "id": "coa-q2",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Addressing Modes specify the rule or mathematical formula by which the control unit interprets the address field of an instruction to locate the actual operand (Effective Address, EA) in registers or main memory.",
    "table": {
      "title": "Summary of Primary Addressing Modes",
      "headers": [
        "Addressing Mode",
        "Effective Address (EA) Equation",
        "Operand Location",
        "Primary Application"
      ],
      "rows": [
        [
          "Immediate Mode",
          "Operand = Address Field (IR)",
          "Inside Instruction",
          "Initializing constants (e.g., MOV R1, #25)"
        ],
        [
          "Direct (Absolute) Mode",
          "EA = Address Field (A)",
          "Memory at M[A]",
          "Accessing global variables and fixed memory locations"
        ],
        [
          "Indirect Mode",
          "EA = M[Address Field (A)]",
          "Memory at M[M[A]]",
          "Pointers, pass-by-reference parameters"
        ],
        [
          "Register Indirect Mode",
          "EA = [Register R]",
          "Memory at M[R]",
          "Loop pointers, array element traversal"
        ],
        [
          "Relative (PC-Relative) Mode",
          "EA = PC + Address Offset (A)",
          "Memory at M[PC + A]",
          "Branch and jump instructions in relocatable code"
        ],
        [
          "Indexed Addressing Mode",
          "EA = Index Reg (XR) + A",
          "Memory at M[XR + A]",
          "Array indexing where XR holds the index offset"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. In-Depth Operational Description of Addressing Modes",
        "points": [
          "<b>Immediate Addressing Mode:</b> The operand is explicitly specified within the instruction itself instead of an address. No memory reference is required after instruction fetch. <i>Example:</i> ADD R1, #10.",
          "<b>Direct (Absolute) Addressing Mode:</b> The instruction contains the exact physical or logical memory address where the operand is stored: EA = A. It requires one memory access to fetch the operand.",
          "<b>Indirect Addressing Mode:</b> The address field specifies the address of a memory word that contains the true effective address of the operand: EA = M[A]. It requires two memory accesses, making it flexible for pointer dereferencing but slower in execution.",
          "<b>Register Indirect Addressing Mode:</b> The instruction references a CPU register that contains the memory address of the operand: EA = [R]. This enables high-speed pointer manipulation in tight loops.",
          "<b>Relative Addressing Mode:</b> The effective address is formed by adding the sign-extended address offset to the Program Counter: EA = PC + Offset. Commonly used for conditional jump and branch instructions, facilitating position-independent code.",
          "<b>Indexed Addressing Mode:</b> The effective address is obtained by adding the contents of an Index Register (XR) to the base address field: EA = XR + Base Address. Crucial for accessing linear data structures such as vectors and arrays in memory."
        ]
      },
      {
        "heading": "2. Comparative Trade-offs",
        "points": [
          "Addressing modes balance instruction word length, address space range, and operand access speed.",
          "Immediate and Register modes are fastest (zero memory references for operand), while Indirect mode requires maximum memory cycles."
        ]
      }
    ],
    "conclusion": "Modern processor instruction sets incorporate versatile addressing modes to support high-level language constructs such as pointers, arrays, structures, and relocatable program segments efficiently.",
    "markingScheme": [
      {
        "component": "Definition & Role of Addressing Modes & Effective Address (EA)",
        "marks": 1
      },
      {
        "component": "Explanation of 6 Modes with EA Mathematical Formulas",
        "marks": 3
      },
      {
        "component": "Comparison Table & Practical Programming Use Cases",
        "marks": 2
      },
      {
        "component": "Conclusion & Hardware Performance Trade-offs",
        "marks": 1
      }
    ],
    "examTip": "Include the EA equation for every mode (e.g., EA = PC + Offset for Relative). A structured comparison table guarantees full marks under strict university evaluation."
  }
].map(answer => coaImportantCorrectionsById[answer.id] || answer);
