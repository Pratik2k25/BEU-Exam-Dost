const importantRecords = [
  ['coa-q1', 1, 'Explain the basic Instruction Cycle with a detailed flowchart illustrating Fetch, Decode, Read Effective Address, and Execute phases.', 'instruction cycle and phases'],
  ['coa-q2', 1, 'Explain different Addressing Modes (Immediate, Direct, Indirect, Register Indirect, Relative, Indexed) with diagrams and effective address equations.', 'addressing modes'],
  ['coa-q3', 2, 'Design a 4-bit Carry Look-Ahead Adder (CLA). Derive Boolean expressions for carry generation (Gi) and carry propagation (Pi) and prove its speed advantage over ripple carry adders.', 'carry look-ahead adder'],
  ['coa-q4', 2, 'Explain the IEEE 754 standard for single-precision (32-bit) and double-precision (64-bit) floating-point numbers with normalized mantissa and excess bias.', 'ieee 754 floating point standard'],
  ['coa-q5', 3, 'Explain Booth’s Multiplication Algorithm for signed 2’s complement numbers with a hardware datapath diagram and flowchart. Multiply (-5) by (+3) showing all register transitions.', 'booth multiplication algorithm'],
  ['coa-q6', 3, 'Explain Restoring and Non-Restoring Division algorithms with hardware architecture, step-by-step register updates, and comparative analysis.', 'division algorithms'],
  ['coa-q7', 4, 'Differentiate between Hardwired Control Unit and Microprogrammed Control Unit on the basis of speed, flexibility, control memory, and design complexity.', 'control unit design'],
  ['coa-q8', 4, 'Explain the internal organization of a Microprogrammed Control Unit with Microinstruction Address Sequencer, Control Address Register (CAR), and Control Store.', 'microprogrammed control unit'],
  ['coa-q9', 4, 'Compare RISC and CISC processor architectures with respect to instruction formats, addressing modes, register files, and execution cycles.', 'risc vs cisc architecture'],
  ['coa-q10', 5, 'Explain Cache Memory mapping techniques: Direct Mapping, Fully Associative Mapping, and Set-Associative Mapping with address breakdown formulas and diagrams.', 'cache memory mapping'],
  ['coa-q11', 5, 'Explain the working of Direct Memory Access (DMA) controller with a neat block diagram. Differentiate between Burst Transfer and Cycle Stealing modes.', 'direct memory access'],
  ['coa-q12', 5, 'Explain Virtual Memory organization using Paging and Translation Lookaside Buffer (TLB). Trace the step-by-step translation of a logical address to a physical address.', 'virtual memory and tlb'],
  ['coa-q13', 6, 'Explain a 4-stage or 5-stage instruction pipeline. Derive formulas for Speedup, Efficiency, and Throughput of a k-stage pipeline executing n instructions.', 'instruction pipelining'],
  ['coa-q14', 6, 'Explain the three major pipeline hazards: Structural hazards, Data hazards (RAW, WAR, WAW), and Control/Branch hazards. Discuss hardware forwarding and delayed branching.', 'pipelining hazards'],
  ['coa-q15', 6, 'Explain Flynn’s classification of computer architectures (SISD, SIMD, MISD, MIMD) with structural schematics and real-world processor examples.', 'flynn classification']
];

export const coaImportantQuestions = importantRecords.map(([id, unit, question, topic]) => ({
  id,
  canonicalId: id,
  kind: 'important',
  subject: 'coa',
  unit,
  question,
  marks: 7,
  topics: [topic],
  solutionRef: id
}));
