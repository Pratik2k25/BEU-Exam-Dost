// Technical cross-checks: UCSD superscalar/superpipeline lecture;
// Berkeley CS61C pipeline hazards; LLNL and UCAR stream taxonomy notes.
// https://cseweb.ucsd.edu/classes/su05/cse141/su05_10.pdf
// https://notes.cs61c.org/content/pipeline-hazards/data-hazards/
// https://hpc.llnl.gov/documentation/tutorials/introduction-parallel-computing-tutorial
// https://www.cisl.ucar.edu/sites/default/files/2022-02/Introduction%20to%20Parallel%20Programming%20-%20Shiquan%20Su%2C%20GPU%20Training%2020220203.pdf
const solution=(id,intro,sections,markingScheme,extra={})=>({id,verified:'BEU Exam Answer · 7 Marks',intro,sections,markingScheme,...extra});
const rubric=(...items)=>items.map(([component,marks])=>({component,marks}));
const section=(heading,...points)=>({heading,points});

const pipelining=solution('coa-q13',
 'Instruction pipelining divides instruction execution into stages separated by pipeline registers. Different instructions occupy different stages simultaneously, increasing the rate at which instructions finish.',[
 section('Five-stage instruction pipeline',
  '<b>IF:</b> Fetch the instruction and compute the next sequential PC. <b>ID:</b> Decode it and read the register operands. <b>EX:</b> Perform the ALU operation or calculate an effective address. <b>MEM:</b> Access data memory when required. <b>WB:</b> Write the result to the destination register.',
  'For example, while instruction I1 is in EX, I2 can be in ID and I3 in IF. Pipeline registers retain each instruction’s data and control signals between stages.'),
 section('Derive speedup, efficiency and throughput',
  'Assume n independent instructions, k equal-duration stages, stage time τ, no stalls, and negligible pipeline-register overhead. Sequential execution takes Tseq = nkτ.',
  'The first instruction takes k cycles to emerge. The remaining n−1 instructions finish one per cycle: Tpipe = (k+n−1)τ.',
  'Speedup S = nk/(k+n−1); efficiency E = S/k = n/(k+n−1); average throughput = n/[(k+n−1)τ]. For a long stream, S approaches k and throughput approaches 1/τ.',
  'Example: k=5, n=10 and τ=10 ns give Tseq=500 ns, Tpipe=140 ns and S≈3.57. The first result still takes 50 ns; the improvement comes from overlapping instructions.'),
 section('Practical limits',
  'Unequal stage delays, pipeline-register overhead, memory stalls and hazards reduce the ideal gain. With stage delays t1…tk and register overhead d, the clock period must be at least max(ti)+d.')
 ],rubric(['Concept and overlapping execution',1],['Stage roles and timing diagram',2],['Performance derivation and example',3],['Assumptions and practical limits',1]),{
 diagrams:[{title:'Five-stage timing diagram without stalls',ascii:'Cycle       1   2   3   4   5   6   7\nI1         IF  ID  EX MEM  WB\nI2             IF  ID  EX MEM  WB\nI3                 IF  ID  EX MEM  WB\n\nIF -> [reg] -> ID -> [reg] -> EX -> [reg] -> MEM -> [reg] -> WB'}],
 conclusion:'Overlapping instruction stages improves throughput; the slowest stage and hazard penalties determine the realized gain.',
 examTip:'State the balanced-stage, independent-instruction assumptions before using the ideal speedup formula.'});

const hazards=solution('coa-q14',
 'A pipeline hazard prevents an instruction from advancing in its intended cycle. The processor must preserve program results even when that requires a stall, forwarding or cancellation of speculative instructions.',[
 section('Structural hazards: a resource conflict',
  'A single-ported memory cannot serve an instruction fetch and an older instruction’s data access in the same cycle. Stall one access, provide separate instruction/data caches, or add sufficient ports.'),
 section('Data hazards: dependencies and register names',
  '<b>RAW (read after write):</b> ADD R1,R2,R3 followed by SUB R4,R1,R5 needs the new R1. Forward the computed value when it is ready; otherwise stall.',
  '<b>WAR (write after read):</b> an older instruction must read R1 before a younger instruction overwrites R1. <b>WAW (write after write):</b> two writes to R1 must leave the value from the later instruction. These name hazards arise in machines that permit suitable out-of-order reads or completion; register renaming removes false name dependencies.',
  'A classic in-order five-stage pipeline with register reads in ID and writes in WB normally has RAW hazards, but not WAR or WAW. An immediately used load result may require one stall even with forwarding, because its value becomes available only after MEM.'),
 section('Control hazards and remedies',
  'After a conditional branch, the next PC may be unknown until the branch resolves. Stalling is simple but loses cycles. Early branch resolution or prediction allows more progress; a misprediction requires flushing incorrect-path work.',
  'Where the ISA defines a branch delay slot, the compiler can place a safe independent instruction in that slot. A delay slot is an architectural convention, not a feature of every modern processor.')
 ],rubric(['Hazard definition',1],['Structural example and remedy',1.5],['RAW/WAR/WAW examples and pipeline assumptions',2],['Forwarding and load-use limitation',1],['Control hazards and remedies',1.5]),{
 diagrams:[{title:'Load-use hazard with one bubble and forwarding',ascii:'Cycle                 1   2   3    4    5   6   7\nLOAD R1,[R2]         IF  ID  EX   MEM   WB\nADD R3,R1,R4             IF  ID  STALL  EX MEM  WB\n                              MEM result -> EX\nSTALL holds the dependent instruction until data is ready.'}],
 conclusion:'Resource allocation, dependency handling and branch recovery must preserve correct execution while limiting lost cycles.',
 examTip:'Give one concrete example of each hazard. Forwarding cannot supply a result before it has been produced.'});

const flynn=solution('coa-q15',
 'Flynn’s taxonomy classifies architectures by the number of instruction streams and data streams processed concurrently. Single or multiple on each axis gives four classes.',[
 section('Four architecture classes',
  '<b>SISD:</b> One instruction stream operates on one data stream, as in a conventional scalar program on one processor.',
  '<b>SIMD:</b> One instruction controls several processing lanes operating on different elements. Vector instructions such as a four-lane vector add are examples; regular array work benefits most.',
  '<b>MISD:</b> Different instruction streams process the same input stream. It is uncommon; independently coded filters operating on a common sensor stream are a conceptual example. There is no need to label an ordinary instruction pipeline as MISD.',
  '<b>MIMD:</b> Independent processors execute different instruction streams on different data. Examples include multicore shared-memory systems and distributed-memory clusters.'),
 section('Comparing organization and use',
  'SIMD shares instruction control across lanes, while MIMD permits independent control flow and synchronization between workers. A modern system can combine MIMD cores with SIMD vector units; the classification depends on the level being described.')
 ],rubric(['Instruction-stream/data-stream basis',1],['Four correct classes',3],['Structural schematics and examples',2],['Comparison and mixed-system qualification',1]),{
 diagrams:[{title:'Stream structure of the four classes',ascii:'SISD: CU -> PE <- D\nSIMD:       CU --broadcast--+-------+\n                           v       v\n                         PE0     PE1\n                          ^       ^\n                         D0      D1\nMISD: CU0 -> PE0 <- common D -> PE1 <- CU1\nMIMD: CU0 -> PE0 <- D0    CU1 -> PE1 <- D1\n\nCU = control unit; PE = processing element; D = data stream'}],
 table:{title:'Flynn classification matrix',headers:['Instruction streams','One data stream','Multiple data streams'],rows:[['One','SISD','SIMD'],['Multiple','MISD','MIMD']]},
 conclusion:'Instruction streams and data streams define the four classes; a practical machine may combine several classes at different levels.',
 examTip:'Classify the streams rather than merely counting cores. Use a conceptual MISD example instead of asserting a disputed commercial example.'});

export const importantCorrections=[pipelining,hazards,flynn];

const multiplePipelines=solution('coa-pyq-superscalar-and-superpipelining',
 'Two complementary ways to increase instruction-level parallelism are widening execution with superscalar issue and deepening execution with superpipelining.',[
 section('Superscalar execution: widen the processor',
  'Fetch/decode and issue several independent instructions per clock to multiple functional pipelines, such as an integer ALU, floating-point unit and load/store unit. A two-issue machine can ideally start two independent operations each cycle.',
  'Dependency checks, register renaming and dynamic scheduling identify operations that may run together. Results must be committed in a way that preserves the architectural program order. Resource conflicts, dependencies and branch mistakes reduce the ideal issue rate.'),
 section('Superpipelining: shorten the stages',
  'Split a long pipeline stage into shorter stages and shorten the clock period. More instructions can then overlap in different stages. Each original execution pipeline can be made deeper; merely deepening it does not create another issue lane.',
  'If a stage is divided into two equal halves with negligible extra overhead, its limiting stage delay can be halved. In practice pipeline-register delay, dependencies and the larger branch-recovery penalty limit the gain.'),
 section('Combined use and trade-offs',
  'Superscalar issue targets more work per clock; superpipelining targets a shorter clock. They can be combined, but neither guarantees proportional speedup. As a static multi-issue alternative, VLIW places compiler-selected independent operations in one instruction bundle.')
 ],rubric(['Superscalar organization and issue',2],['Superscalar example and limitations',1],['Superpipeline organization and clock effect',2],['Comparison, diagram and limits',2]),{
 diagrams:[{title:'Wider versus deeper execution',ascii:'Superscalar:  Decode/issue -> ALU pipeline ----+\n                           -> Load/store ----+-> Commit\nSuperpipeline: [long EX] -> [EX-a] -> [EX-b]\n                           shorter clock period'}],
 conclusion:'Wider issue and shorter stages exploit different dimensions of instruction-level parallelism, each limited by overhead and dependencies.',
 examTip:'Distinguish the number of instructions issued per cycle from the number of stages in each pipeline.'});

const concurrentMemory=solution('coa-pyq-concurrent-shared-memory-challenges',
 'Parallel processors may read and write a shared address space at overlapping times. Correctness requires coordination of shared data; performance also depends on available memory bandwidth and locality.',[
 section('Data races and atomicity',
  'Suppose x=0 and two processors execute x=x+1. Both can read 0 and then write 1, losing an increment. Use an atomic read-modify-write operation or protect the critical section with a lock. Separate loads and stores do not make the complete increment atomic.'),
 section('Coherence and consistency',
  'Private caches can hold stale copies of the same block. A coherence protocol tracks ownership and invalidates or updates other copies on a write.',
  'Memory consistency concerns the permitted ordering of accesses, including accesses to different locations. Correct synchronization and, where needed, memory-ordering operations ensure that data written before a flag is observed in the intended order. Cache coherence alone is not a complete synchronization rule.'),
 section('Contention, false sharing and locality',
  'Many requests can compete for memory banks, interconnect links or a memory controller, limiting bandwidth. Distribute data, combine transfers and exploit locality.',
  'False sharing occurs when processors update different variables in the same cache line; ownership repeatedly moves despite no logical sharing. Suitable layout or padding can reduce this traffic.',
  'In NUMA systems a remote-memory access can be slower than a local one. Place data near the threads that use it. Locks and barriers also introduce waiting, so avoid unnecessary synchronization.')
 ],rubric(['Shared-memory problem and lost-update example',2],['Coherence versus consistency',2],['Contention, false sharing and NUMA',2],['Remedies and organization diagram',1]),{
 diagrams:[{title:'Concurrent processors with private caches and shared memory',ascii:'CPU 0 <-> Cache 0 --+\n                    +-- Coherent interconnect -- Memory controller -- DRAM\nCPU 1 <-> Cache 1 --+\n        Same address may be cached in both private caches.'}],
 conclusion:'Correct parallel memory access needs suitable atomic operations, ordering and coherence, while scalable performance needs locality and sufficient bandwidth.',
 examTip:'Use the lost-update example to distinguish atomicity from the separate problems of cache coherence and memory ordering.'});

const sisdSimd=solution('coa-pyq-sisd-and-simd-short-notes',
 'SISD and SIMD differ in how an instruction stream is applied to data. SISD describes scalar processing; SIMD applies one instruction to several independent data elements.',[
 section('SISD: one instruction stream and one data stream',
  'A control unit fetches and decodes a scalar program and an execution unit operates on its operands. For example, scalar additions can compute C[0], then C[1], then C[2]. Pipelining can overlap parts of instructions without changing the single-stream classification.',
  'SISD is easy to program for irregular control flow, but offers no data-parallel lanes at this level of classification.'),
 section('SIMD: one instruction stream and multiple data streams',
  'One control unit broadcasts an operation to several lanes. For example, a four-lane vector ADD simultaneously computes C[i]=A[i]+B[i] for i=0,1,2,3.',
  'Vector processors and SIMD instruction sets are examples. Regular image and numerical-array operations are suitable; conditional paths, inactive masked lanes and memory bandwidth can reduce lane utilization.'),
 section('Comparison',
  'SISD processes one scalar operation at this abstraction level. SIMD exploits data-level parallelism through the same operation on many elements. A multicore computer may contain both independently controlled cores and SIMD units inside each core.')
 ],rubric(['SISD organization and example',2],['SIMD organization and vector example',2],['Diagrams and comparison',2],['Applications and limitations',1]),{
 diagrams:[{title:'SISD and four-lane SIMD organization',ascii:'SISD: instruction -> CU -> scalar PE <- one data stream\n\nSIMD: instruction -> CU -> ADD0  ADD1  ADD2  ADD3\n                           ^     ^     ^     ^\n                         A0,B0 A1,B1 A2,B2 A3,B3\n                           |     |     |     |\n                           C0    C1    C2    C3'}],
 conclusion:'SIMD accelerates regular data-parallel operations by sharing instruction control across lanes; SISD retains a single scalar stream.',
 examTip:'Show which part is shared control and which part consists of separate data lanes.'});

const dataHazards=solution('coa-pyq-data-hazards-with-load-use-example',
 'A data hazard occurs when overlapped instructions could use an operand too early or access the same register name in an order that changes the program result.',[
 section('Three dependency relationships',
  '<b>RAW:</b> ADD R1,R2,R3; SUB R4,R1,R5. The second instruction must consume the first instruction’s new value of R1. Forwarding or a stall enforces this true dependency.',
  '<b>WAR:</b> SUB R4,R1,R5; ADD R1,R2,R3. A younger write must not overtake the older read of R1.',
  '<b>WAW:</b> MUL R1,R2,R3; ADD R1,R4,R5. Reordered completions must not leave the older result in R1. Register renaming removes WAR/WAW name conflicts, but not the need to obtain a true producer’s result.'),
 section('Forwarding and the load-use case',
  'A bypass sends a ready ALU result from a pipeline register to a dependent execution stage, avoiding a wait for register write-back.',
  'In the five-stage IF–ID–EX–MEM–WB model, LOAD R1,[R2] followed immediately by ADD R3,R1,R4 commonly needs one bubble: the load produces data at the end of MEM, later than the dependent ADD’s original EX input time. Forward the value after inserting that bubble.'),
 section('Scope and remedies',
  'The classic fixed-latency in-order pipeline reads registers in ID and writes in WB, so its usual register data hazard is RAW; WAR/WAW become concerns in more flexible execution organizations.',
  'Hardware interlocks detect unavailable operands and hold the consumer. A compiler may move a genuinely independent instruction into the delay instead; it must preserve program semantics.')
 ],rubric(['Definition and RAW example',2],['WAR/WAW and assumptions',2],['Forwarding and correct load-use diagram',2],['Stalls or safe scheduling',1]),{
 diagrams:hazards.diagrams,
 conclusion:'A consumer must wait for its true input value; renaming handles false name conflicts but cannot remove that requirement.',
 examTip:'A RAW dependency can remain even after forwarding hardware is added. State when the producer’s result becomes ready.'});

const combined=solution('coa-pyq-pipeline-performance-and-hazards',
 'Pipelining overlaps different instructions in successive execution stages. It improves instruction throughput when sufficient independent work and hardware resources are available.',[
 section('Stages and timing',
  'A common instruction pipeline has IF (fetch), ID (decode/read), EX (execute/address), MEM (data access) and WB (register write-back). Pipeline registers isolate the stages.',
  'For n independent instructions and k balanced stages of duration τ, with no stalls or register overhead: Tseq=nkτ and Tpipe=(k+n−1)τ. Thus speedup=nk/(k+n−1), and average throughput=n/[(k+n−1)τ]. The long-stream limits are k and 1/τ respectively.'),
 section('Hazards and their remedies',
  '<b>Structural:</b> simultaneous demands for a single memory port conflict; add resources or stall.',
  '<b>Data:</b> ADD R1,R2,R3 followed by SUB R4,R1,R5 creates RAW dependence. Forward a ready result or stall; an immediate load-use can still require a bubble. WAR/WAW name hazards can arise in out-of-order organizations and are handled with renaming and ordering.',
  '<b>Control:</b> a branch can make subsequent fetched instructions incorrect. Resolve early, predict and recover by flushing when required, or stall.'),
 section('Illustration and limits',
  'For k=5 and n=10, the ideal speedup is 50/14≈3.57. A single instruction still needs all five stages. Unequal stages, latch delay and hazard penalties reduce the ideal throughput.')
 ],rubric(['Pipeline concept and stage diagram',2],['Speedup/throughput derivation and example',2],['Three hazards and remedies',2],['Assumptions and limits',1]),{
 diagrams:pipelining.diagrams,
 conclusion:'Pipeline performance follows the fill-and-overlap timing model, with stalls and flushes accounting for departures from the ideal.',
 examTip:'Answer both halves: give the performance formulas and then explain why hazards prevent the ideal throughput.'});

const reuse=(questionIds,solutionRef,reason)=>({questionIds,unit:6,solutionRef,importantMatches:[{id:solutionRef,relation:'covered',reason}],overlapDecision:'reuse',reason});
const dedicated=(questionIds,value,importantMatches,reason)=>({questionIds,unit:6,solution:value,importantMatches,overlapDecision:'dedicated',reason});
export const entries=[
 dedicated(['coa-original-2022-105401-106401-q4b'],multiplePipelines,[{id:'coa-q13',relation:'related',reason:'Basic pipeline timing alone does not answer wider/deeper execution techniques.'}],'Specific performance-enhancement techniques require their own organization and trade-off discussion.'),
 reuse(['coa-original-2023-105401-q2a','coa-original-2024-105401-q6b','coa-original-2025s-105401-q9c'],'coa-q14','Corrected Important answer covers all three hazard classes, examples, remedies and load-use qualifications.'),
 dedicated(['coa-original-2024-105401-q5a'],concurrentMemory,[],'Concurrent memory atomicity, ordering and bandwidth are broader than the Important pipeline-hazard prompt.'),
 dedicated(['coa-original-2024s-105401-q6b'],sisdSimd,[{id:'coa-q15',relation:'partial',reason:'Taxonomy provides the definitions but the two-class question needs more focused organization and examples.'}],'Dedicated SISD/SIMD notes give sufficient depth for the specific two-class question.'),
 dedicated(['coa-original-2024s-105401-q7a'],dataHazards,[{id:'coa-q14',relation:'partial',reason:'The complete hazards answer divides its detail among three classes; this prompt requires data-hazard depth.'}],'Includes register dependencies, a load-use timing diagram and in-order/out-of-order distinctions.'),
 reuse(['coa-original-2024s-105401-q7b','coa-original-2025s-105401-q9b'],'coa-q13','Corrected Important instruction-pipeline answer includes stage roles, timing, sequential comparison and performance.'),
 dedicated(['coa-original-2025-105401-q7a'],combined,[{id:'coa-q13',relation:'partial',reason:'Provides performance derivations but not full hazard discussion.'},{id:'coa-q14',relation:'partial',reason:'Provides hazards but not complete pipeline-performance derivations.'}],'One answer combines both requested parts without pretending either Important prompt alone is equivalent.'),
 reuse(['coa-original-2025s-105401-q9a'],'coa-q15','Corrected Important taxonomy answer covers the four stream classes, organization matrix and sound examples.')
];
