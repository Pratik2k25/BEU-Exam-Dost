// Original occurrence/source records are retained in the question bank.
// Primary technical checks (development provenance): Intel SDM Volumes 1 and 2A;
// https://cdrdv2-public.intel.com/874241/253665-090-sdm-vol-1.pdf
// https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-software-developer-vol-2a-manual.pdf
// SPARC V8 architecture manual: https://www.cs.utexas.edu/~novak/sparcv8.pdf
// RV32E register count: https://docs.riscv.org/reference/isa/unpriv/rv32e.html

const original = suffix => `coa-original-${suffix}`;
const section = (heading, ...points) => ({ heading, points });
const diagram = (title, ascii) => ({ title, ascii });
const conclusions = {
  'coa-q2': 'Choosing a mode balances operand-access cost, encoding range and the needs of constants, pointers, arrays and relocatable code.',
  'coa-q7': 'The controller must generate consistent datapath signals in the right state; hardwired logic and microcode provide different ways to organize that control.',
  'coa-q9': 'RISC/CISC identifies broad ISA trade-offs; measured performance depends on instruction count, CPI and clock period together.',
  'coa-pyq-list-and-briefly-define-the-main-structural-componen': 'CPU, memory and I/O cooperate through the interconnection to implement stored-program computation.',
  'coa-pyq-discuss-the-design-and-logic-of-a-microprogram-seque': 'The sequencer selects incremented, branch, mapped or return addresses so micro-operations follow the required instruction behavior.',
  'coa-pyq-list-and-briefly-explain-five-important-instruction-': 'The five choices must be designed together because encoding space, register pressure and execution cost interact.',
  'coa-pyq-briefly-explain-the-two-basic-approaches-used-to-min': 'Register windows exploit procedure-call locality, while compiler allocation exploits live ranges; both reduce avoidable memory transfers.',
  'coa-pyq-a-computer-has-16-registers-an-alu-with-32-operation': 'Under the declared datapath, the 20-bit word selects R5 and R6, ADD, no shift and destination R4; operation-code bits depend on the chosen table.',
  'coa-pyq-what-is-addressing-mode-why-do-computers-use-address': 'Implied and zero-address stack arithmetic locate operands through fixed architectural conventions rather than explicit address fields.',
  'coa-pyq-what-are-the-different-types-of-instruction-formats': 'Explicit operand count determines which sources and destinations must be encoded and which are supplied implicitly by the accumulator or stack.',
  'coa-pyq-privileged-and-non-privileged-instructions': 'Privilege checks protect system state while controlled OS entry lets applications request services without arbitrary supervisor access.',
  'coa-pyq-describe-the-instruction-execution-cycle-in-a-cpu-ex': 'The execution cycle is common to CPUs, while x86 defines the particular encodings, architectural state and addressing behavior that each implementation must honor.',
  'coa-pyq-what-are-the-different-types-of-registers-with-the-d': 'Source multiplexers and destination load controls coordinate common-bus transfers, while the separate ALU path performs accumulator operations.',
  'coa-pyq-instruction-set-architecture': 'The ISA preserves a stable software-visible contract across different compatible hardware implementations.',
  'coa-pyq-explain-two-address-and-three-address-instruction-fo': 'Both sequences compute the same expression, with two-address code using extra moves to preserve inputs while overwriting an operand.',
  'coa-pyq-explain-the-architecture-of-x86-processors-discuss-i': 'x86 combines mode-dependent register state, flexible address generation and variable-length encoding under a compatible architectural interface.',
  'coa-pyq-describe-the-design-of-a-simple-hypothetical-cpu-inc': 'A consistent instruction format, datapath and control-state sequence together implement the chosen accumulator ISA.'
};
const solution = (id, intro, diagrams, sections, marking, examTip) => ({
  id, verified: 'BEU Exam Answer · 7 Marks', intro, diagrams, sections,
  conclusion: conclusions[id],
  markingScheme: marking.map(([component, marks]) => ({ component, marks })), examTip
});
const match = (id, relation, reason) => ({ id, relation, reason });
const dedicated = (questionIds, unit, answer, importantMatches = [], reason = 'No Important Question covers the requested scope.') => ({
  questionIds: questionIds.map(original), unit, solution: answer, importantMatches, overlapDecision: 'dedicated', reason
});
const reuse = (questionIds, unit, solutionRef, reason) => ({
  questionIds: questionIds.map(original), unit, solutionRef,
  importantMatches: [match(solutionRef, 'equivalent', reason)], overlapDecision: 'reuse', reason
});

const addressing = solution('coa-q2',
  'Addressing modes specify where an operand is found or how its effective address (EA) is computed. Let A be an instruction field, R be register contents, M[x] be memory at x, and PCnext be the address following the instruction. Modes support constants, variables, pointers, arrays and relocatable branches.',
  [diagram('Operand and effective-address paths', `Immediate: instruction constant -----------------> operand
Direct:    A ------------------------------> M[A] --> operand
Indirect:  A --> M[A] = EA -----------------> M[EA] -> operand
Reg-ind.:  R = EA --------------------------> M[EA] -> operand
Indexed:   A + XR --------------------------> M[EA] -> operand
Relative:  PCnext + signed displacement ----> branch target`)],
  [section('1. Immediate and direct addressing',
    '<b>Immediate:</b> operand = constant encoded in the instruction; there is no memory EA for that operand. Example: MOV R1,#25 places 25 in R1. No operand-data read is needed after instruction fetch. It is useful for constants, but its range is limited by the immediate field.',
    '<b>Direct:</b> EA=A and operand=M[A]. Example: LOAD R1,[500], with M[500]=42, loads 42. One operand-memory read is needed. Simple access to a fixed location is convenient, but the address-field width limits directly representable addresses.'),
  section('2. Memory-indirect and register-indirect addressing',
    '<b>Memory indirect:</b> EA=M[A] and operand=M[EA]. Example: LOAD R1,@[500]; M[500]=900 and M[900]=42 give EA=900 and R1=42. Two data-memory reads are needed in a simple uncached model: a pointer read followed by an operand read. It supports pointers with extra access cost.',
    '<b>Register indirect:</b> EA=R2 and operand=M[R2]. Example: LOAD R1,[R2]; R2=900 and M[900]=42 give R1=42. One data-memory read is needed. A pointer can be advanced in R2 during array/list traversal, and the instruction uses a short register selector.'),
  section('3. Relative and indexed addressing',
    '<b>PC-relative:</b> EA or branch target = PCnext + sign-extended displacement d, using the PC convention defined by the ISA. Example: a branch with PCnext=1000 and d=20 targets 1020. This supports compact relocatable control transfers; a subsequent instruction fetch is not an operand-data read.',
    '<b>Indexed:</b> EA=A+XR. Example: LOAD R1,100[R2]; R2=12 gives EA=112 and operand=M[112]. The index is an offset in the machine address units. It is useful for arrays and normally needs one operand-data read plus address addition.',
    '<b>Base/displacement variant:</b> EA=BR+d. For LOAD R1,8[BR] with BR=1000, EA=1008. The arithmetic resembles indexed addressing, but BR conventionally holds a base and d a field/stack offset.'),
  section('4. Comparison and additional modes',
    'Immediate and register operands need zero operand-memory reads; direct, register-indirect and indexed operands normally need one; memory-indirect needs two. Counts exclude instruction fetch, cache effects and page-table walks. Relative modes improve relocation; indexed/base modes support structured data with address-generation work.',
    '<b>Register mode:</b> ADD R1,R2 takes its operand directly from R2, with no memory EA. <b>Implied mode:</b> CMA complements an implicit accumulator. <b>Stack mode:</b> zero-address ADD consumes the top two values located through SP. These latter arithmetic instructions contain no explicit operand address field.')],
  [['Definition, notation and diagram', 1.5], ['Six modes with equations and numerical/examples', 4], ['Comparison and additional operand modes', 1.5]],
  'Write an EA equation and example per memory mode. Immediate data is a value, not an address; state the PC convention for relative addressing.');

const hardwired = solution('coa-q7',
  'Hardwired control generates signals with fixed sequential and combinational circuits; microprogrammed control reads control words from a control store. A hardwired CU is a finite-state controller whose outputs depend on instruction bits, timing state and condition inputs.',
  [diagram('Hardwired control organization', `IR opcode --> [Instruction decoder] ------+
Clock --> [Sequence/state register]        |
                 |                       v
          [Timing decoder T0...Tn] --> [Control / next-state logic]
Flags, interrupt, memory-ready ------> |           |
                                      |           +--> bus select, ALU op,
                                      |                register LD/INC/CLR,
                                      |                memory RD/WR
                                      +--> advance/hold/clear state`)],
  [section('1. Hardwired components and their functions',
    '<b>IR and opcode decoder:</b> IR keeps instruction fields stable; the decoder activates the selected instruction line D_i. Addressing-mode and operand bits may also enter control logic.',
    '<b>Clock and sequence/state register:</b> store the current execution step. A sequence counter advances through steps; a general state machine follows encoded states. Clear returns to fetch; hold supports waiting for a memory-ready input.',
    '<b>Timing decoder:</b> converts the step/state code into timing signals T0,T1,... . Combining these with D_i makes a control signal active for the required instruction and phase.',
    '<b>Condition inputs:</b> flags (Z,C,N,V), interrupt and ready select conditional actions. <b>Combinational output/next-state logic:</b> gates or PLAs implement Boolean functions for datapath controls and the next state.'),
  section('2. Example of control logic',
    'Choose fetch states T0: MAR ← PC; T1: MDR ← M[MAR]; T2: IR ← MDR, PC ← PC+1. Memory RD is asserted in T1. If ADD reads its operand at T4, an illustrative equation is RD = T1 OR (D_ADD AND T4). This equation applies to this timing design, not every CPU.',
    'For PC → MAR, the controller selects PC as bus source and asserts MAR load together. Next-state logic holds a memory state until ready, and returns to fetch after the instruction completes.'),
  section('3. Comparison with microprogrammed control',
    '<b>Implementation:</b> hardwired uses gates, decoders and state registers. Microprogrammed uses a control-address register, microinstruction register, sequencer and control memory; decoded microinstruction fields generate the signals.',
    '<b>Speed:</b> hardwired avoids a control-store lookup and is often faster for a comparable simple controller. Microprogrammed timing includes control-store access and possible field decoding; actual speed is implementation-dependent.',
    '<b>Flexibility:</b> hardwired changes generally require logic redesign. Microcode can be changed if its store is writable or patchable; a mask ROM cannot simply be rewritten.',
    '<b>Complexity and storage:</b> hardwired control can become difficult for many multi-step operations. Microprogramming organizes them as routines but needs control memory and sequencing hardware. There is no universal exponential-versus-linear chip-area growth rule.',
    '<b>Use:</b> simple RISC operations often suit hardwired control, while complex instruction sequences can use microcode. Modern processors may combine both; RISC/CISC does not mandate one control technology.')],
  [['Definitions and diagram', 2], ['Hardwired component functions', 2], ['Control-signal example', 1], ['Speed, flexibility, memory and complexity comparison', 2]],
  'Answer both parts: include the hardwired components and a comparison. Qualify microcode updates by whether the control store can be changed.');

const risc = solution('coa-q9',
  'RISC emphasizes regular instructions and load/store organization; CISC offers richer encodings and more complex operations. These are architectural tendencies, not universal rules about all modern processors.',
  [diagram('Typical computation of X=A+B', `RISC: LOAD R1,[A]; LOAD R2,[B]; ADD R3,R1,R2; STORE [X],R3
CISC: MOV EAX,[A]; ADD EAX,[B]; MOV [X],EAX
Both compute the same value. Instruction count alone does not determine speed.`)],
  [section('1. Instruction formats and addressing',
    '<b>RISC:</b> typically a few regular formats, often fixed-width base instructions; compressed extensions can add shorter encodings. <b>CISC:</b> commonly variable-length instructions and more forms; x86 instructions can occupy 1–15 bytes.',
    '<b>RISC:</b> usually separates memory loads/stores from register arithmetic and uses simple addressing. <b>CISC:</b> can combine arithmetic with a memory operand and offers richer addressing such as base+index×scale+displacement. Not every CISC instruction supports two memory operands.'),
  section('2. Register files, cycles and control',
    '<b>Registers:</b> many RISC ISAs have substantial register files (RV32I: 32 integer registers), but this is not a definition (RV32E: 16). CISC counts vary: IA-32 exposes eight general registers; conventional x86-64 exposes sixteen.',
    '<b>Execution:</b> regular RISC instructions simplify decode and pipeline control, but multiplication, division, cache misses and dependencies can take multiple cycles. One completed instruction per cycle is throughput, not necessarily one-cycle latency. CISC instruction complexity varies; simple operations can execute efficiently.',
    '<b>Control:</b> simple operations suit hardwired logic and complex sequences may use microcode. Both classes can combine hardwired control, microcode and pipelining; neither mandates a particular controller.'),
  section('3. Code density and performance',
    'RISC relies strongly on compiler register allocation and scheduling. CISC can express some operations with fewer instructions and compact code. Actual instruction count and code density depend on the ISA, extensions and compiler.',
    'CPU time = instruction count × average CPI × clock period. No single factor proves one class always faster or more efficient. ARM, MIPS and RISC-V are RISC families; x86 and VAX are CISC families.',
    'Modern x86 cores often translate architectural instructions into internal micro-operations, preserving the CISC binary interface while enabling internal scheduling and parallel execution.')],
  [['Definitions and operation example', 1], ['Formats, addressing modes and register comparison', 2.5], ['Cycles, control, compiler and code density', 2], ['Performance equation and modern qualification', 1.5]],
  'Compare formats, modes, registers and execution explicitly. Avoid “all RISC instructions take one cycle” and universal register-count claims.');

export const importantCorrections = [addressing, hardwired, risc];

export const entries = [
  dedicated(['2022-105401-106401-q2a', '2024s-105401-q2a', '2025-105401-q2a'], 1,
    solution('coa-pyq-list-and-briefly-define-the-main-structural-componen',
      'A digital computer consists of a CPU, main memory, input/output subsystems and a system interconnection. These structural blocks accept data, execute stored instructions and deliver results.',
      [diagram('Functional and structural blocks', `Input devices --> [I/O controller] <==== SYSTEM BUS ====> [Main memory]
Output devices <--[data/status/control]      ||          instructions + data
                                            ||
                     +----------------------||---------------------+
                     | CPU                  ||                     |
                     | [Control unit] --> timed control signals   |
                     |      |                                     |
                     | [Registers] <----> [ALU]                   |
                     +--------------------------------------------+
System bus = address lines + data lines + control lines`)],
      [section('1. CPU: processing and control',
        'The <b>ALU</b> performs arithmetic (addition, subtraction), logic (AND, OR, XOR), comparisons and shifts. Results and condition flags return to CPU state.',
        'The <b>control unit</b> fetches/decodes instructions, sequences execution and issues register-load, ALU-function, memory-read/write and I/O signals.',
        '<b>Registers</b> are fast internal storage: PC identifies the next instruction; IR holds the current instruction; general registers/accumulator hold operands/results; flags record result conditions.'),
      section('2. Main memory and I/O subsystem',
        '<b>Main memory</b> stores both active program instructions and data at addressable locations. A read supplies a selected word; a write replaces it. RAM is working storage and ROM commonly holds initial firmware. Secondary storage retains files and supplies data/programs through I/O.',
        '<b>Input</b> converts external information into machine-readable data (keyboard, sensor). <b>Output</b> presents processed results (display, printer). An I/O controller provides data, status and control registers and adapts device timing/formats to the computer.'),
      section('3. Interconnection and working example',
        'The <b>address bus</b> identifies a memory location or I/O register; the <b>data bus</b> transports instructions/data; the <b>control bus</b> carries commands, ready and interrupt signals. A bus or another interconnect links the subsystems.',
        'For an addition program, input data enters memory, the CPU fetches an ADD instruction, obtains operands, the ALU adds them, and the controller stores the result or sends it to an output controller. Memory holds the program; the control unit coordinates its execution.')],
      [['Labelled CPU/memory/I/O diagram', 2], ['CPU blocks and roles', 2], ['Memory and I/O roles', 2], ['Interconnect and example', 1]],
      'Place ALU, control unit and registers inside CPU; label address, data and control communication.')),

  dedicated(['2022-105401-106401-q2b'], 4,
    solution('coa-pyq-discuss-the-design-and-logic-of-a-microprogram-seque',
      'A microprogram sequencer selects the next control-memory address after each microinstruction. Its logic supports sequential execution, conditional branching, opcode dispatch and optionally microprogram subroutine call/return.',
      [diagram('Next-microaddress logic', `IR opcode --> [Mapping logic] ----------------------+
CAR -------> [+1 incrementer] -----------------------|
MIR address field ----------------------------------|--> [MUX] --> CAR
SBR saved return address ---------------------------+      ^
                                                          | select
Flags --> [Condition MUX] --> [Branch/sequence logic] ------+
                 ^                    ^
       MIR condition field      MIR branch field
CAR --> [Control store] --> MIR --> datapath control signals`)],
      [section('1. State and control fields',
        '<b>CAR</b> holds the control-memory address; the control store supplies a microinstruction to <b>MIR/CBR</b>. Its operation fields drive datapath controls, and its condition, branch-type and target-address fields determine sequencing.',
        'A control store of 2^k words needs a k-bit CAR and a k-bit full target address. The condition field selects, for example, unconditional true, zero, carry or an instruction bit. Codes and field widths beyond these requirements depend on the design.'),
      section('2. Next-address alternatives',
        '<b>Sequential:</b> CAR(next)=CAR+1. <b>Conditional:</b> select target A if the selected condition is true, otherwise CAR+1. <b>Unconditional branch:</b> always select A.',
        '<b>Dispatch:</b> mapping logic translates the machine opcode to its execute-microprogram start. At the end, the routine jumps to the shared fetch microprogram.',
        '<b>Optional micro-subroutine:</b> CALL saves CAR+1 in SBR and loads A; RETURN loads CAR from SBR. One SBR supports only one outstanding return address; nested calls require a stack or explicit saving.'),
      section('3. Logic and example',
        'One possible MUX encoding is 00=increment, 01=target, 10=mapping, 11=SBR. For a conditional branch, condition C chooses 01 when C=1 and 00 when C=0. These codes are illustrative assignments, not a universal table.',
        'At microaddress 40, a branch-if-zero with target 56 loads CAR=56 for Z=1 and CAR=41 for Z=0. A RETURN instead selects the saved address.',
        'Combinational sequencing logic combines decoded branch type with the selected flag, then the clock latches the chosen address. Control signals and flags must settle before the next-address decision is captured.')],
      [['Purpose and fields', 1], ['Feedback/selection diagram', 2], ['Next-address alternatives', 2], ['Conditional logic and worked example', 2]],
      'Show the incrementer, MUX, mapping, condition selector and feedback; an organization diagram alone does not explain sequencer logic.'),
    [match('coa-q8', 'partial', 'Current answer describes organization but omits explicit next-address MUX logic, conditional example and call/return mechanism.')],
    'Dedicated answer supplies the requested sequencing design and logic beyond Important q8.'),

  dedicated(['2022-105401-106401-q5b'], 1,
    solution('coa-pyq-list-and-briefly-explain-five-important-instruction-',
      'Five important instruction-set design issues are the operation repertoire, supported data types, instruction format, register organization and addressing techniques. Together they define the machine-language interface and its implementation trade-offs.',
      [diagram('Five ISA choices', `ISA design
 +-- Operations: what can an instruction do?
 +-- Data types: what values can it process?
 +-- Formats: how are bits and operands encoded?
 +-- Registers: where are fast operands kept?
 +-- Addressing: how are operands located?`)],
      [section('1. Operation repertoire and data types',
        '<b>Operation repertoire:</b> choose arithmetic, logic, shifts, data transfer, control transfer and system/I/O operations. A multiply instruction can shorten code but adds hardware/control cost; a simpler ISA may synthesize it from several instructions.',
        '<b>Data types and widths:</b> decide signed/unsigned integers, bytes/words, floating-point, character or vector support. Widths, overflow behavior, alignment and byte order must be defined consistently for software.'),
      section('2. Instruction format and registers',
        '<b>Instruction format:</b> choose fixed/variable length, opcode width, operand count, immediate width and field layout. More address bits increase range but consume space. Three-address ADD R1,R2,R3 preserves both sources at the cost of another operand field.',
        '<b>Register organization:</b> choose register count, width and roles, including general registers, PC, stack pointer and flags. More registers reduce spills but need more selector bits and register-file hardware. Sixteen selectable registers require four bits per register field.'),
      section('3. Addressing techniques and combined trade-off',
        '<b>Addressing:</b> choose immediate, register, direct, register-indirect, indexed/base and PC-relative modes. Constants suit immediate; arrays suit indexed; pointers suit indirect; relocatable branches suit relative addressing. Rich modes can reduce instructions while complicating address generation.',
        'Choices interact: a short fixed instruction limits opcode space, register count or immediate range. Evaluate compiler support, code density and CPU time = instruction count × CPI × clock period, rather than instruction count alone.')],
      [['Five issues identified', 2], ['Explanation and examples/trade-offs', 4], ['Combined evaluation', 1]],
      'Number exactly five issues and give one concrete example or trade-off for each.'),
    [match('coa-q9', 'related', 'RISC/CISC illustrates trade-offs but does not enumerate all five ISA design issues.')]),

  dedicated(['2022-105401-106401-q8a'], 1,
    solution('coa-pyq-briefly-explain-the-two-basic-approaches-used-to-min',
      'The two classic approaches to reducing register-memory operations on RISC machines are hardware-supported overlapping register windows and compiler-directed register allocation. Both keep frequently used values in registers, reducing explicit loads and stores.',
      [diagram('Overlapping register windows', `Caller: [ inputs | locals | outputs ]
                            || same physical registers
Callee:                    [ inputs | locals | outputs ]
SAVE selects callee window; RESTORE selects caller window.
Globals stay visible. Overflow spills older windows; underflow reloads them.`)],
      [section('1. Hardware approach: register windows',
        'A large physical register file is divided into overlapping windows. Window-management instructions select a new set of local registers at procedure entry, preserving caller values in its window. The current-window pointer maps visible register names to physical registers.',
        'Caller outputs overlap callee inputs, passing arguments without store/load pairs. In classic SPARC, 8 globals plus 8 inputs, 8 locals and 8 outputs are visible at one time. Locals belong to the active procedure; globals are shared.',
        'For example, an argument in caller %o0 becomes callee %i0 after SAVE because the names refer to the same physical register. Hardware windows are finite: overflow/underflow handling spills/reloads windows, so memory traffic is reduced rather than eliminated.'),
      section('2. Software approach: compiler register allocation',
        'The compiler analyzes variable liveness and keeps frequently used variables/intermediate results in registers. Simultaneously live values require distinct registers; non-overlapping lifetimes may share one.',
        'In graph-coloring allocation, vertices represent live ranges, edges mean interference, and colors represent registers. If registers are insufficient, selected values spill to memory. Estimated spill cost and frequency inside loops help choose spill candidates.',
        'Example: keep a loop index, bound and running sum in registers throughout the loop rather than reloading/storing them every iteration. Calling conventions determine which registers must be preserved across calls.'),
      section('3. Comparison',
        'Windows use extra hardware and exploit procedure-call locality; compiler allocation uses program analysis and works with a flat register file. They can be combined. Neither removes the load/store discipline: memory access still uses explicit transfers.')],
      [['Two approaches and objective', 1], ['Windows with diagram and example', 3], ['Compiler allocation and spills', 2], ['Comparison and limitation', 1]],
      'Name both register windows and compiler register allocation; “more registers and cache” does not identify the classic pair.'),
    [match('coa-q9', 'related', 'RISC/CISC mentions register files, not overlapping windows or compiler allocation.')]),

  dedicated(['2022-105401-106401-q8b'], 4,
    solution('coa-pyq-a-computer-has-16-registers-an-alu-with-32-operation',
      'Assume the conventional two-source register-file datapath feeding an ALU and shifter, with one common result bus returning to a selected destination. Field widths follow from the number of alternatives, while the operation-code assignments must be explicitly chosen.',
      [diagram('Datapath and control-word fields', `16 registers --SELA(4)--> A --+
                            [ALU:32 operations] --> [Shifter:8 operations]
16 registers --SELB(4)--> B --+     OPR(5)                  SH(3)
                                                             |
                                                   common result bus
                                                             |
                                               destination SELD(4)
| SELA 4 | SELB 4 | SELD 4 | OPR 5 | SH 3 | = 20 bits`)],
      [section('1. Field widths',
        'R0–R15 require log2(16)=4 bits for each source selector and 4 bits for the destination selector. The ALU field needs log2(32)=5 bits; the shifter field needs log2(8)=3 bits.',
        'Total minimum encoded word in this convention = 4+4+4+5+3 = <b>20 bits</b>. Destination loading is assumed enabled for this micro-operation. A separate write-enable/no-write option or extra memory/status controls would enlarge the complete control word.'),
      section('2. Encoding R4 ← R5 + R6',
        'Natural binary register numbering gives SELA=0101 (R5), SELB=0110 (R6), SELD=0100 (R4). The shifter must pass the result without shifting.',
        'Counts alone do not specify the ALU/shifter code table. Choose ADD=00001 and PASS/no shift=000. With the displayed field order the word is <b>0101 | 0110 | 0100 | 00001 | 000</b>. Other explicitly declared ADD/PASS codes are equally valid.',
        'On the enabled clock edge, R4 receives the unshifted sum of the old R5 and R6 values. Arithmetic wraps at register width; carry/overflow may be recorded separately.'),
      section('3. Bus assumption',
        'A literal single-source bus cannot deliver two different register values simultaneously to an ALU without operand latches. Such a CPU needs successive transfers to latch R5, present R6, and write the result. The 20-bit formulation assumes the standard two-source datapath with a common result bus, as drawn; the phrase “common bus” alone does not uniquely determine all control bits.')],
      [['Datapath assumption and field layout', 2], ['Widths and 20-bit total', 2], ['Declared encodings and control word', 2], ['Bus/loading qualification', 1]],
      'State your ADD and PASS encodings; do not claim a unique binary opcode when no operation table is given.')),

  dedicated(['2023-105401-q2b'], 1,
    solution('coa-pyq-what-is-addressing-mode-why-do-computers-use-address',
      'An addressing mode states how an instruction identifies an operand or computes its effective address. Modes support constants, variables, pointers, arrays and compact code. Two modes needing no explicit operand address field are implied (inherent) addressing and stack addressing.',
      [diagram('Address-free arithmetic instructions', `Implied: | opcode CMA | --> fixed accumulator AC --> complement
Stack:   | opcode ADD | --> top two operands located through SP
Before ADD: ... | 4 | 7 (TOS)
After ADD:  ... | 11 (TOS)
Neither arithmetic instruction encodes an operand address.`)],
      [section('1. Meaning and need',
        'For memory operands, EA is the address used for the operand access: direct mode uses EA=A; register indirect uses EA=R. Immediate and implied operands have no memory EA.',
        'Multiple modes make constants convenient, reduce instruction length/count, support pointer and array traversal, and permit relocatable branches. The mode determines how the encoded information is interpreted.'),
      section('2. Implied or inherent addressing',
        'The opcode itself fixes the operand location. In an accumulator machine, <b>CMA</b> performs AC ← NOT AC with no address field. If the 8-bit AC is 00110100, CMA produces 11001011.',
        'An opcode-defined clear-carry operation similarly acts on a fixed flag. Immediate ADD #5 is not the desired example: it includes an explicit operand constant field.'),
      section('3. Stack addressing',
        'In a zero-address stack machine, operands are implicitly the top and next-to-top values located through SP. <b>ADD</b> pops b and a and pushes a+b, so [...,4,7] becomes [...,11].',
        'For SUB, operand order matters: conventionally [...,a,b] becomes [...,a−b]. PUSH A and POP X can themselves contain addresses; the arithmetic ADD/SUB instructions are the zero-address examples.',
        'Both modes shorten arithmetic instructions but restrict explicit operand choice. Implied mode uses an opcode-defined register/flag; stack mode uses SP-defined positions.')],
      [['Definition and reasons for modes', 2], ['Implied mode with example', 2], ['Stack mode with example', 2], ['Comparison and field distinction', 1]],
      'Use CMA and zero-address stack ADD. Immediate and direct modes do not satisfy the requested two address-free modes.'),
    [match('coa-q2', 'partial', 'Even the corrected general answer only briefly names implied/stack; this question needs reasons and detailed examples of both.')],
    'Dedicated answer explains the exact requested no-address-field modes.'),

  dedicated(['2023-105401-q4a', '2025s-105401-q4b'], 1,
    solution('coa-pyq-what-are-the-different-types-of-instruction-formats',
      'An instruction format is the bit layout of an instruction: opcode, operand specifiers and any mode, displacement or immediate fields. A common classification counts explicit operand addresses: three, two, one and zero.',
      [diagram('Address-count formats', `3-address: | OP | destination | source 1 | source 2 |
2-address: | OP | destination/source 1 | source 2 |
1-address: | OP | address |   accumulator implicit
0-address: | OP |             stack operands implicit
Additional possible fields: mode, register selectors, displacement, immediate.`)],
      [section('1. Three-address and two-address formats',
        '<b>Three-address:</b> ADD R1,R2,R3 means R1 ← R2+R3, preserving both sources. For X=(A+B)*(C+D), an abstract sequence is ADD T1,A,B; ADD T2,C,D; MUL X,T1,T2. Named operands are permitted in this illustrative ISA; real load/store ISAs also need loads/stores.',
        '<b>Two-address:</b> ADD R1,R2 means R1 ← R1+R2, overwriting one source. For the expression: MOV T1,A; ADD T1,B; MOV T2,C; ADD T2,D; MUL T1,T2; MOV X,T1. Fewer fields may shorten encoding but require copies.'),
      section('2. One-address and zero-address formats',
        '<b>One-address:</b> AC is the implicit arithmetic source/destination. LOAD A; ADD B; STORE T; LOAD C; ADD D; MUL T; STORE X computes the expression while preserving the first sum in temporary T.',
        '<b>Zero-address:</b> stack arithmetic uses implicit top operands. PUSH A; PUSH B; ADD; PUSH C; PUSH D; ADD; MUL; POP X computes the expression. ADD/MUL have no operand fields, while PUSH/POP may explicitly name data locations.',
        'The zero-address stack first contains [A+B], then [A+B,C+D], then [(A+B)*(C+D)]. Binary arithmetic pops two operands and pushes one result.'),
      section('3. Encoding trade-offs',
        'Fixed-length formats simplify alignment and decoding; variable-length formats can improve compactness for different operand needs. An “address” field can select a register rather than contain a full memory address.',
        'More explicit operands preserve sources and may reduce instruction count but use more encoding bits. Instruction length, data access and cycle cost matter alongside instruction count.')],
      [['Definition and layouts', 1.5], ['Three/two-address examples', 2], ['One/zero-address examples', 2.5], ['Encoding trade-offs', 1]],
      'State destination-first notation and explain implicit AC/stack operands; zero-address arithmetic does not make PUSH/POP address-free.')),

  reuse(['2023-105401-q6b', '2025s-105401-q3b'], 4, 'coa-q7',
    'Reuse the corrected Important q7 exported here: it includes every hardwired component, a labelled diagram and the complete comparison, correcting the original ROM/area claims.'),

  dedicated(['2023-105401-q9c'], 1,
    solution('coa-pyq-privileged-and-non-privileged-instructions',
      'Privileged instructions change protected machine state and require a sufficient processor privilege level. Non-privileged instructions are normally available to applications, subject to ordinary operand-access checks and memory protection.',
      [diagram('Privilege enforcement', `Instruction --> [Decode + privilege check]
                          |
                 +--------+---------+
              permitted       insufficient privilege
                 |                   |
            execute normally   protection exception
                                     |
                              OS exception handler`)],
      [section('1. Privileged instructions',
        'The OS controls shared resources such as page tables, interrupt state, devices and protection configuration. Restricting sensitive instructions prevents applications from disabling the system or bypassing isolation.',
        'Examples under x86 protected execution include MOV to control registers such as CR3 (page-table root), LGDT (descriptor-table setup) and HLT. Ordinary ring-3 applications cannot execute these successfully; insufficient privilege produces a protection exception.'),
      section('2. Non-privileged instructions',
        'ADD, SUB, AND, normal register/data MOV, comparisons and ordinary branches are generally non-privileged. They let an application compute and control its own program without changing protected system configuration.',
        'Non-privileged does not mean unrestricted: MOV from a protected or unmapped page can fault. Some instructions, including x86 I/O and interrupt-flag operations, have additional privilege/permission rules rather than a simple universal classification.'),
      section('3. Comparison and system-call path',
        '<b>Allowed execution:</b> privileged operations require supervisor authority; ordinary arithmetic is usable in user mode. <b>Effects:</b> privileged instructions can modify protected system state; ordinary instructions act on permitted program state.',
        'An application requests protected services through a system call. A designated trap/syscall instruction enters an OS handler through a controlled path; it does not grant arbitrary privileged access. The OS validates the request and returns to user execution.',
        'Privilege rules are architecture-specific. Name the processor/mode for concrete examples and distinguish instruction privilege from operand memory permissions.')],
      [['Definition and protection rationale', 2], ['Privileged examples and trap behavior', 2], ['Non-privileged examples and limits', 1.5], ['Comparison and system call', 1.5]],
      'Give examples of both classes and explain the exception caused by insufficient privilege.')),

  dedicated(['2024-105401-q2a'], 1,
    solution('coa-pyq-describe-the-instruction-execution-cycle-in-a-cpu-ex',
      'A CPU repeatedly fetches, decodes and executes instructions, writes their results and selects the next instruction. x86 is a backward-compatible instruction-set family with variable-length encodings, rich addressing and protected execution modes.',
      [diagram('Instruction execution cycle', `PC/IP --> Fetch --> Decode opcode and operands
                         |
                  Compute effective address
                         |
                  Read required operands
                         |
                  Execute ALU/branch/transfer
                         |
                  Write result and flags
                         |
             Check interrupts --> next fetch
Exceptions may transfer control to a handler during a phase.`)],
      [section('1. Instruction-execution phases',
        '<b>Fetch:</b> PC supplies the instruction address to memory/cache and the instruction is fetched. PC advances by instruction length unless a control transfer subsequently changes it.',
        '<b>Decode and operand access:</b> identify opcode, registers and addressing mode. Calculate EA for memory operands and obtain data. In a generic indirect-address CPU, an extra memory read may fetch the actual operand address.',
        '<b>Execute:</b> ALU calculates a result, a memory operation transfers data, or a branch tests a condition and selects its target. <b>Write-back:</b> save results and update the architecturally defined flags. At an appropriate instruction boundary an enabled interrupt transfers control to a handler after preserving required return state.'),
      section('2. Key x86 architectural features',
        '<b>Encoding:</b> instructions have variable length, at most 15 bytes, with optional prefixes, opcode, ModR/M, SIB, displacement and immediate fields. Most ordinary two-operand integer instructions allow at most one explicit memory operand.',
        '<b>Registers/addressing:</b> IA-32 has eight 32-bit general registers; conventional x86-64 widens registers and adds R8–R15. EIP/RIP identifies instructions, EFLAGS/RFLAGS records conditions, and memory addressing can use base+index×scale+displacement.',
        '<b>System modes:</b> real mode supports legacy behavior, protected mode provides privilege/protection, and long mode includes 64-bit execution. Segmentation/paging support translation; in 64-bit mode most segmentation is flattened while FS/GS bases remain useful.',
        'Modern implementations may decode instructions into internal micro-operations, pipeline them and execute out of order while preserving architectural results. These internals vary among CPUs.')],
      [['Execution-cycle diagram', 1.5], ['Cycle phases and control/interrupt handling', 2.5], ['x86 features', 3]],
      'Give both halves of the answer: the execution cycle and specific x86 features.'),
    [match('coa-q1', 'partial', 'Instruction-cycle explanation overlaps but does not cover x86 architecture.')],
    'Dedicated combined answer adds x86-specific content to the execution cycle.'),

  reuse(['2024-105401-q2b', '2025-105401-q2b', '2025s-105401-q9d'], 1, 'coa-q2',
    'Reuse corrected Important q2 exported here: six core modes have EA formulas, concrete examples and a diagram, plus explicit comparison of access counts, range and uses.'),

  dedicated(['2024-105401-q4b'], 1,
    solution('coa-pyq-what-are-the-different-types-of-registers-with-the-d',
      'Registers are small fast CPU storage for addresses, instructions, data and control state. In the standard 16-bit basic computer, multiplexers connect registers and memory to a 16-bit common bus.',
      [diagram('Basic-computer register/bus organization', `AR(12) --zero-extend--+
PC(12) --zero-extend--|
DR(16) --------------|
AC(16) --------------|--> [16 parallel source MUXes] --> 16-bit BUS
IR(16) --------------|             S2 S1 S0                 |
TR(16) --------------|                                      +--> AR,PC (low 12)
Memory data(16) -----+                                      +--> DR,AC,IR,TR
                                                           +--> memory write data
AR --> memory address                 separate LD for each destination
DR ------> [ALU] <------ AC; ALU result --> AC, carry/link --> E(1)
INPR(8) --> AC low-byte input; AC low byte --> OUTR(8)
Control unit supplies LD/INC/CLR, bus selection and RD/WR.`)],
      [section('1. Types and roles',
        '<b>Data/general registers</b> hold operands/results; <b>address/base/index/stack registers</b> support addressing; <b>control/status registers</b> hold instruction sequencing and condition state.',
        'In the basic computer, AR is a 12-bit memory-address register and PC a 12-bit next-instruction address register (4096 word addresses). DR holds a 16-bit memory operand, AC a 16-bit accumulator, IR a 16-bit instruction and TR a 16-bit temporary word.',
        'INPR/OUTR are 8-bit I/O registers. E is the one-bit carry/link associated with AC arithmetic/shifts. SC is the sequence counter for control timing, not an ordinary data-bus source.'),
      section('2. Common-bus selection',
        'Each bus bit has a source multiplexer; three shared lines choose one of eight input positions. A conventional table is 000=zero/no selected data, 001=AR, 010=PC, 011=DR, 100=AC, 101=IR, 110=TR, 111=memory.',
        'AR/PC are zero-extended when driving the 16-bit bus and accept its low 12 bits on loading. The selected source appears to every connected destination, but only registers with load enabled capture it. AR drives the memory address, and RD/WR control memory.'),
      section('3. Transfers and ALU path',
        'For AR ← PC, select PC (010) and enable LD(AR). For instruction fetch, load AR from PC, read memory, select memory (111), load IR and increment PC through its increment control.',
        'For AC ← AC+DR, the ALU receives AC and DR and returns the result to AC, with carry going to E. This dedicated ALU path is different from selecting one common-bus source. Only one source can drive a bus transfer step.')],
      [['Register categories, widths and roles', 2.5], ['Labelled bus/ALU diagram', 2], ['Selection and load controls', 1.5], ['Transfer examples', 1]],
      'Keep basic-computer widths consistent: AR/PC 12-bit; AC/DR/IR/TR 16-bit; INPR/OUTR 8-bit.')),

  reuse(['2024-105401-q9a', '2024s-105401-q5a'], 1, 'coa-q9',
    'Reuse corrected Important q9 exported here: exact comparison scope, with qualified register counts, variable formats and execution-latency/throughput claims.'),

  dedicated(['2024-105401-q9d'], 1,
    solution('coa-pyq-instruction-set-architecture',
      'Instruction Set Architecture (ISA) is the programmer-visible processor specification: the machine-language interface used by compilers, assemblers, operating systems and binary programs.',
      [diagram('Hardware-software contract', `High-level program --> compiler/assembler --> machine instructions
                                            |
                        ISA: operations, registers, encoding,
                        addressing, memory and exceptions
                                            |
                        Microarchitecture: datapath, control,
                        caches, pipeline and execution units`)],
      [section('1. What the ISA defines',
        '<b>Operations and semantics:</b> arithmetic, logic, transfers, branches and system operations, including operand effects and exceptions. ADD Rd,Rs1,Rs2 specifies the destination result from the two sources.',
        '<b>Visible state and data:</b> register names/widths, PC, flags where present, and integer, floating-point or vector types supported by the architecture.',
        '<b>Representation and addressing:</b> opcode/operand fields, lengths/formats, immediates, register encodings and rules for calculating effective addresses.',
        '<b>Memory/system behavior:</b> address-space model, endianness, alignment, memory ordering and, within privileged architecture, protection, interrupts, exceptions and control state.'),
      section('2. ISA versus microarchitecture',
        'ISA specifies what an instruction does; microarchitecture specifies how hardware performs it. Pipeline depth, caches, issue width, internal buses and microcode are generally implementation choices.',
        'Compatible processors can execute the same supported binary while differing in internal design and speed. Required extensions and execution environment must still be available; an ISA-family name alone does not guarantee every optional feature.'),
      section('3. Example and significance',
        'A load/store ISA may define LOAD R1,[R2+8]; ADD R3,R1,R4; STORE [R2+12],R3. Software observes register/memory effects while hardware can use a multi-cycle datapath or a pipeline.',
        'ISA choices balance code density, compiler generation, register pressure and hardware complexity. RISC/CISC describe broad ISA approaches, not a particular cache or pipeline implementation.')],
      [['Definition and interface diagram', 1.5], ['ISA features', 3], ['Microarchitecture and compatibility', 1.5], ['Example and trade-offs', 1]],
      'Define ISA as the software/hardware contract and distinguish architectural behavior from pipeline/cache design.'),
    [match('coa-q9', 'related', 'RISC/CISC compares ISA families but does not explain the full ISA contract.')]),

  reuse(['2024s-105401-q3a'], 1, 'coa-q1',
    'Inspected current Important q1: its basic-computer flowchart, direct/indirect decision, phase descriptions and RTL fully cover the requested instruction-cycle phases.'),

  dedicated(['2024s-105401-q3b'], 1,
    solution('coa-pyq-explain-two-address-and-three-address-instruction-fo',
      'To evaluate X=(A+B)*(C+D), form the two sums before multiplying. The following abstract ISA uses destination-first notation and temporary operands T1,T2; its named operands may denote registers or memory locations supported by that illustrative machine.',
      [diagram('Expression tree and layouts', `           MUL --> X
          /   \\
        ADD   ADD
       /  \\ /  \\
      A   B C   D
3-address: | opcode | destination | source1 | source2 |
2-address: | opcode | destination/source1 | source2 |`)],
      [section('1. Three-address instruction sequence',
        'A three-address arithmetic instruction has an explicit destination and two explicit sources: ADD T1,A,B means T1 ← A+B and preserves A,B.',
        '<b>Step 1:</b> ADD T1,A,B → T1=A+B. <b>Step 2:</b> ADD T2,C,D → T2=C+D. <b>Step 3:</b> MUL X,T1,T2 → X=(A+B)*(C+D).',
        'This is three abstract arithmetic instructions. A real load/store ISA additionally needs source loads and a final store; address-count classification does not override its operand rules.'),
      section('2. Two-address instruction sequence',
        'ADD T1,B means T1 ← T1+B, overwriting its first source. MOV destination,source copies data.',
        '<b>1.</b> MOV T1,A → T1=A. <b>2.</b> ADD T1,B → T1=A+B. <b>3.</b> MOV T2,C → T2=C. <b>4.</b> ADD T2,D → T2=C+D. <b>5.</b> MUL T1,T2 → T1=(A+B)*(C+D). <b>6.</b> MOV X,T1 → X=T1.',
        'Temporary destinations preserve A,B,C,D. Two operand fields use less instruction space but source preservation can require extra moves.'),
      section('3. Check and trade-off',
        'With A=1,B=2,C=3,D=4, both sequences compute 3 and 7, then X=21. Multiplication occurs only after the two parenthesized additions.',
        'Three versus six abstract instructions is an instruction-count comparison, not a universal timing result: actual encoding widths, operand restrictions and access costs matter.')],
      [['Format layouts and expression tree', 1.5], ['Three-address sequence', 2], ['Two-address sequence and source preservation', 2.5], ['Check and comparison', 1]],
      'Specify operand order. ADD X,A,B is three-address; two-address ADD D,S overwrites D.')),

  dedicated(['2025-105401-q4b'], 1,
    solution('coa-pyq-explain-the-architecture-of-x86-processors-discuss-i',
      'x86 is a CISC ISA family with backward-compatible 16/32-bit modes and 64-bit extensions. Architectural state includes registers, flags and protected memory; implementations fetch/decode instructions and execute them through integer and numeric datapaths.',
      [diagram('Architectural blocks and common legacy encoding', `Instruction bytes --> [Fetch/decode + control] --> [Integer/FPU/SIMD]
                               |                           |
                      [GPRs, IP, FLAGS] <-------------------+
                               |
                       [Address generation]
                               |
                    [Segmentation/paging] --> cache/memory
[prefixes] | opcode | [ModR/M] | [SIB] | [displacement] | [immediate]
ModR/M = mod(2), reg/opcode(3), r/m(3)
SIB = scale(2), index(3), base(3); bracketed fields are optional.`)],
      [section('1. Register organization',
        '<b>IA-32:</b> eight 32-bit GPRs EAX,EBX,ECX,EDX,ESI,EDI,EBP,ESP. They have 16-bit forms AX etc.; EAX–EDX also have traditional low/high byte parts AL/AH etc. ESP is the stack pointer; EBP commonly supports stack frames.',
        '<b>Conventional 64-bit mode:</b> RAX,RBX,RCX,RDX,RSI,RDI,RBP,RSP are 64-bit and R8–R15 add eight GPRs. EIP/RIP tracks instructions and EFLAGS/RFLAGS contains condition/control flags. Segment registers are CS,DS,SS,ES,FS,GS. Control/system registers support paging/protection.',
        '<b>Numeric state:</b> x87 uses ST(0)–ST(7); SIMD uses vector-register families such as XMM with wider YMM/ZMM views if supported. Availability and counts depend on processor mode and extensions.'),
      section('2. Addressing modes with examples',
        'Intel destination-first syntax: <b>immediate</b> MOV EAX,5; <b>register</b> MOV EAX,EBX; <b>register indirect</b> MOV EAX,[EBX]; <b>base/displacement</b> MOV EAX,[EBP+8].',
        '<b>Scaled index:</b> MOV EAX,[EBX+ECX*4+8], where EA=base+index×scale+displacement and scale is 1,2,4 or 8. With EBX=1000 and ECX=3, EA=1020. In 64-bit mode, RIP-relative memory addressing uses next-instruction RIP plus signed displacement; branches also have relative forms.',
        'Segmentation forms a linear address and paging translates it to physical memory. In 64-bit mode normal CS/DS/ES/SS bases are effectively zero; FS/GS bases retain roles. Permitted addressing forms depend on mode/address size.'),
      section('3. Instruction formats',
        'Instructions are variable length, at most 15 bytes. Prefixes alter/extend operation or size. The opcode defines the operation. ModR/M selects register/memory form and a register or opcode extension; SIB supports scaled indexing; displacement and immediate fields appear as needed.',
        'Not every field is present: NOP can be 90h; MOV EAX,imm32 can use B8h plus four immediate bytes. ADD EAX,EBX can be 01 D8h: D8h splits into mod=11 (register), reg=011 (EBX), r/m=000 (EAX).',
        'The diagram is a common legacy layout; REX in 64-bit mode and VEX/EVEX for vector instructions extend encoding forms. Ordinary integer instructions commonly have two explicit operands and at most one memory operand. Internal execution may use micro-operations while preserving ISA behavior.')],
      [['Architecture and format diagram', 1], ['Register families and modes', 2], ['Addressing formulas/examples', 2], ['Encoding fields and byte example', 2]],
      'Cover registers, addressing and formats. Separate 32-bit E-register examples from the 64-bit RIP-relative form.'),
    [match('coa-q2', 'related', 'Generic addressing overlaps but not x86 register/encoding details.'), match('coa-q9', 'related', 'Names x86 as CISC but does not explain its architecture.')],
    'No Important answer covers the required x86 registers, modes and formats together.'),

  dedicated(['2025-105401-q5a'], 1,
    solution('coa-pyq-describe-the-design-of-a-simple-hypothetical-cpu-inc',
      'Consider a 16-bit accumulator CPU with 4096 word-addressed memory locations and a hardwired multi-cycle controller. This example explicitly defines an ISA, datapath and control sequence; its opcode assignments are chosen for illustration.',
      [diagram('Datapath and chosen instruction format', `Instruction: | opcode 4 bits | address A 12 bits |
PC(12) --> MAR(12) --> [Memory 4096 x 16] <--> MDR(16)
  ^                              |                  |
  | jump target                  +---------------> IR(16)
  |                                                  | opcode/A
  +---------------- [Control FSM] <------------------+
                         | LD/select/RD/WR/ALU signals
MDR(16) ---> [ALU] <--- AC(16)
               |         ^
               +---------+   result; zero flag Z from result`)],
      [section('1. Chosen instruction set and state',
        'Use opcode(4)+A(12): 0h=LOAD A (AC←M[A]); 1h=STORE A (M[A]←AC); 2h=ADD A (AC←AC+M[A]); 3h=SUB A (AC←AC−M[A]); 4h=JMP A (PC←A); 5h=JZ A (if Z=1, PC←A); Fh=HALT. These codes are explicit design choices; unused codes trap.',
        'Arithmetic wraps modulo 2^16 and updates Z. LOAD also updates Z in this chosen design. PC increments modulo 2^12. Direct addresses cover all 4096 memory words.'),
      section('2. Datapath and fetch',
        'PC holds the next instruction address, MAR drives memory, MDR buffers read/write data, IR stores opcode/address, AC supplies an ALU operand/result, and the ALU supports pass/add/subtract. Input multiplexers and load enables select each transfer.',
        'Fetch: T0 MAR←PC; T1 initiate read and latch MDR←M[MAR] when ready, then PC←PC+1; T2 IR←MDR; T3 decode. Separate memory read and IR loading avoids using an MDR value before it is captured.'),
      section('3. Control design and execution',
        'LOAD: T4 MAR←IR.address; T5 MDR←M[MAR] on ready; T6 AC←MDR, update Z, return to T0. ADD/SUB use the same operand fetch and then T6 AC←AC±MDR, update Z, return to fetch.',
        'STORE: T4 MAR←IR.address, MDR←AC; T5 assert WR, complete M[MAR]←MDR when ready and return to fetch. JMP loads PC from IR.address; JZ does so only if Z=1. HALT enters a stopped state until defined restart/reset.',
        'The FSM combines current state, opcode, Z and memory-ready to generate register loads, PC increment/load, ALU function and RD/WR. Memory states hold until ready; execution-complete states return to fetch.',
        'Program example: LOAD A; ADD B; STORE X; HALT computes X=A+B. This links ISA behavior to operand movement and timed control signals.')],
      [['Consistent format, memory and ISA', 2], ['Datapath/register roles', 2], ['Fetch/execute control', 2], ['Timing, branches and example', 1]],
      'Pick a concrete small CPU and keep its instruction width, address capacity, registers and timing consistent.'))
];
