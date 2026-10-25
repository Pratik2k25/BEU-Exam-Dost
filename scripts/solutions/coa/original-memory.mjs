// Exact-scope Original PYQ answers. Source scans remain development evidence.
// Technical checks: RISC-V privileged translation specification;
// Cambridge CompArch MESI notes; MIT 6.823 cache coherence lecture;
// UMD CMSC311 interleaved memory notes; Microchip DMA reference manuals.
// https://docs.riscv.org/reference/isa/_attachments/riscv-privileged.pdf
// https://www.cl.cam.ac.uk/teaching/0506/CompArch/parallel/mesi.html
// https://csg.csail.mit.edu/6.823F21/Lectures/L12split.pdf
// https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Memory/interleaved.html
// https://onlinedocs.microchip.com/oxy/GUID-51DDFE08-15B0-47B7-B507-52F360800F5A-en-US-3/GUID-B637B234-6FF8-422B-AD97-FA7167C1D67B.html
// https://archive.nptel.ac.in/content/storage2/courses/106103068/module06_io/lect_03_intr/slides/slide8d.htm
// https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ProductDocuments/UserGuides/51464C.pdf
const section = (heading, ...points) => ({ heading, points });
const diagram = (title, ascii) => ({ title, ascii });
const scheme = (...items) => items.map(([component, marks]) => ({ component, marks }));
const conclusions = {
  'coa-q10': 'Mapping trades placement freedom and fewer conflicts against tag-search cost and lookup complexity.',
  'coa-q11': 'DMA removes per-item CPU data movement while still requiring setup, bus arbitration and completion/error management.',
  'coa-q12': 'Paging translates the page number while preserving the offset; the TLB accelerates translation but cannot eliminate faults or permission checks.',
  'coa-original-virtual-translation-write-policies': 'The MMU determines the physical destination; the write policy determines when the cache and lower level receive a store.',
  'coa-original-asynchronous-strobe-handshake': 'Strobe relies on agreed timing, whereas a two-line handshake explicitly coordinates readiness and acceptance.',
  'coa-original-memory-interleaving': 'Independent banks can overlap accesses and improve bandwidth when the access pattern avoids bank conflicts.',
  'coa-original-locality-reference': 'Repeated and nearby references let a small fast memory serve much of a program’s active working set.',
  'coa-original-cache-replacement-algorithms': 'FIFO, LRU and random use different practical victim rules; optimal replacement is a future-aware benchmark.',
  'coa-original-coherence-protocols': 'MSI/MESI coordinate line ownership and copies, with traffic, false sharing and scaling costs.',
  'coa-original-io-interface-functions': 'The interface supplies the registers, buffering and timing logic needed to connect CPU-side transfers to a peripheral.',
  'coa-original-ram-rom-eprom-eeprom': 'Working RAM supports frequent volatile updates; ROM-family devices retain contents with different programming and erase mechanisms.',
  'coa-original-interrupt-initiated-io': 'Interrupt-driven I/O saves readiness-waiting time but still costs CPU service and requires timely, correctly synchronized handlers.',
  'coa-original-memory-hierarchy-design': 'A successful hierarchy balances latency, capacity and cost by retaining the working set near the CPU.',
  'coa-original-cache-coherence-definition': 'Coherence prevents obsolete cached values from remaining usable after ownership-changing writes.',
  'coa-original-interleaving-locality-notes': 'Interleaving exploits bank independence; caches exploit access locality. Their benefits depend on the program’s reference pattern.',
  'coa-original-semiconductor-memory-organization': 'Decoders, cell arrays, sensing and control form a memory chip; chip selection and data slicing expand depth and width.',
  'coa-original-three-io-transfer-techniques': 'Polling and interrupts differ in readiness notification; DMA additionally changes the data mover from CPU to controller.',
  'coa-original-interrupt-types': 'Event origin and handler-dispatch method are independent classifications whose precise terminology depends on the ISA.',
  'coa-original-parallel-shared-memory-coherence': 'Shared-memory parallelism requires both coherent cached copies and software synchronization for correct shared-data use.',
  'coa-original-cache-organization-complete': 'Cache performance depends jointly on line organization, placement, victim selection and store-handling policy.',
  'coa-original-sram-dram-organization': 'SRAM favors fast small stores; dense DRAM provides main-memory capacity at the cost of refresh and more complex timing.',
  'coa-original-vectored-priority-daisy-chain': 'Vectors select handlers, priorities select requests, and a daisy chain implements positional priority through acknowledgement propagation.',
  'coa-original-io-interface-programmed-interrupt': 'Both CPU-driven techniques use the same interface registers, but interrupts let the CPU do other work while awaiting service.',
  'coa-original-interleaving-cache-write-policies': 'Bank interleaving improves potential bandwidth; cache write policies trade lower-level traffic against dirty-state complexity.',
  'coa-original-coherence-method-limitations': 'Write-invalidate coherence prevents stale valid copies but adds ownership traffic and cannot eliminate false sharing or data races.'
};
const solution = (id, intro, diagrams, sections, markingScheme, examTip, table) => ({
  id, verified: 'BEU Exam Answer · 7 Marks', intro, diagrams, sections,
  ...(table ? { table } : {}), conclusion: conclusions[id], markingScheme, examTip
});
const match = (id, relation, reason) => ({ id, relation, reason });
const entry = (questionIds, answer, importantMatches, reason) => ({
  questionIds, unit: 5, ...(typeof answer === 'string' ? { solutionRef: answer } : { solution: answer }),
  importantMatches, overlapDecision: typeof answer === 'string' ? 'reuse' : 'dedicated', reason
});

const pagingDiagram = diagram('Paging and address translation', `CPU virtual address [ VPN p | offset d ]
                         |           |
                    TLB lookup       | unchanged
                  hit /     \\ miss   |
                     /    Page-table walk
                    /     /           \\
                   / present +       absent/denied
                  / permitted         -> page fault -> OS
                 v       v
             physical frame f --------+
                         |
             Physical address [ f | d ] -> memory/cache`);
const pagingSections = [
  section('Pages, frames and the page table',
    'Paging divides virtual memory into fixed-size pages and physical memory into equally sized frames. Any virtual page can occupy any free frame; consecutive virtual pages need not occupy consecutive frames.',
    'For page size P = 2^b bytes: VPN p = floor(VA/P), offset d = VA mod P, and PA = f × P + d. Only the page number is translated; the b offset bits are unchanged.',
    'A per-process page table stores frame numbers plus presence, protection, accessed and dirty information. In a simple single-level table, PTE address = PTBR + p × PTE size; multilevel tables split the VPN into indices.'),
  section('TLB lookup and page fault handling',
    'The MMU searches the TLB for a translation matching the virtual page and address-space context. On a permitted hit it obtains f; on a miss hardware or an OS handler walks the page table and may refill the TLB.',
    'A TLB miss is not a page fault: a resident, permitted page can be found in the page table without disk I/O. Permissions must be checked even on a TLB hit.',
    'For a legal but nonresident page, a page fault traps to the OS. The OS obtains a frame, writes a dirty victim if necessary, reads or initializes the required page, updates translation metadata and restarts the instruction. An illegal/protection fault may terminate the access rather than load a page.'),
  section('Illustrative translation and design effects',
    'With 4 KiB pages, VA = 0x1234 gives VPN = 1 and offset = 0x234. If its permitted PTE names frame 9, PA = 0x9000 + 0x234 = 0x9234.',
    'Paging avoids external fragmentation of physical frames but can waste space inside the last page and incurs page-table storage, translation overhead and potentially costly page faults. A TLB reduces repeated translation work; its latency and hit rate depend on the processor and workload.')
];
const writeSections = [
  section('Write-through and write-back on a cache hit',
    'Write-through updates both the cache line and the next memory level on every write. It keeps that next level current and simplifies dirty-line handling, but produces more write traffic; a write buffer can hide some latency and may become full.',
    'Write-back updates only the cache line and sets its dirty bit. A dirty line is written to the next level on eviction or a required flush/coherence action. Repeated writes can be combined, reducing traffic; dirty evictions and coherence/DMA interactions are more complex.'),
  section('Policies on a write miss',
    'Write-allocate first brings the missed block into the cache, then performs the write. It exploits subsequent locality but adds a block fetch.',
    'No-write-allocate (write-around) sends the write to the next level without installing the line. It avoids filling the cache for one-use writes but later reads may miss.',
    'Write-back with write-allocate and write-through with no-write-allocate are common pairings, not compulsory definitions. A write policy alone does not solve multiprocessor cache coherence.')
];
const interleaveDiagram = diagram('Four-bank low-order interleaving (word addresses)', `Word address A -> bank = A mod 4; row = floor(A/4)
                 address/control distributor
                      |    |    |    |
                    Bank0 Bank1 Bank2 Bank3
row 0                 0     1     2     3
row 1                 4     5     6     7
row 2                 8     9    10    11
                   independent bank operations
                           -> shared data path`);
const interleaveSections = [
  section('Meaning and bank mapping',
    'Memory interleaving spreads addresses over independently operating banks so accesses to different banks can overlap. It primarily improves sustained bandwidth, not the intrinsic latency of one memory cell.',
    'For B banks and word address A, low-order interleaving uses bank = A mod B and row = floor(A/B). For B = 4, addresses 0, 1, 2, 3 use banks 0, 1, 2, 3; address 4 returns to bank 0, row 1.',
    'High-order bank selection assigns a contiguous address range to each bank. It can suit independent accesses to different regions, but sequential addresses within a range contend for the same bank. State whether the addresses in an example count bytes or words.'),
  section('Overlap, advantage and limitations',
    'While bank 0 completes an access, the controller can start later accesses in banks 1, 2 and 3. If bank cycle time is T and one request can start every t, B independent banks can ideally sustain that rate when B × t is at least T.',
    'Sequential streams and cache-block fills benefit from low-order interleaving. Requests to the same busy bank must wait; a stride equal to B words repeatedly selects one bank.',
    'Actual speedup is limited by bank conflicts, controller scheduling, bus width/bandwidth and dependencies. Interleaving does not multiply storage capacity by itself and does not guarantee B-fold speedup.')
];
const localitySections = [
  section('Temporal locality',
    'A recently used instruction or data item is likely to be used again soon. A loop repeatedly fetches its body and repeatedly updates a running sum; keeping those lines in cache avoids repeated lower-level accesses.',
    'Temporal locality motivates retaining recently used blocks and policies such as LRU or approximations to it; it is a workload tendency, not a guarantee.'),
  section('Spatial and sequential locality',
    'An address near a recently used address is likely to be accessed soon. Traversing consecutive elements of an array and sequential instruction fetch are examples.',
    'A cache transfers a block containing neighboring bytes; one miss can make later nearby reads hit. Sequential locality is the special case of accessing consecutive locations.',
    'Example: in a row-major matrix, scanning a row normally uses adjacent elements; scanning a column with a large stride may waste most bytes fetched in each line.'),
  section('Why locality matters',
    'Small fast caches keep the active working set while large slower memory supplies misses. With hit time H, miss rate m and additional miss penalty M, AMAT = H + m × M.',
    'Larger blocks can exploit spatial locality but increase miss penalty and may evict useful blocks. If the working set is too large, accesses are random, or conflicts dominate, locality benefits decrease.')
];
const replacementSections = [
  section('When replacement is required',
    'On a cache miss, place the arriving block in an invalid eligible line if possible. Otherwise choose a victim within its set (or anywhere for fully associative mapping). Direct mapping has only one possible line, so it needs no victim-choice algorithm.',
    'Write back a dirty victim before reusing it in a write-back cache; update the tag, valid bit and replacement metadata for the new block.'),
  section('LRU, FIFO, random and optimal',
    'Least Recently Used (LRU) evicts the block whose last access is oldest. It uses recency/temporal locality but exact recency tracking is costly for high associativity; streaming or cyclic workloads can defeat it. Practical caches often use pseudo-LRU.',
    'First In First Out (FIFO) evicts the block installed earliest. A queue/pointer makes it simple; hits do not refresh its age, so a frequently used old block can be discarded.',
    'Random chooses an eligible victim without tracking access history. Its hardware is simple and it avoids some systematic patterns, but it can discard a heavily reused line.',
    'Optimal (MIN/Belady) evicts the block whose next use is farthest in the future, including a block never used again. It minimizes misses for a known trace with fixed capacity but requires future knowledge and is an offline comparison benchmark.'),
  section('Small example',
    'In a full two-way set, install A then B, then hit A. On a miss for C: FIFO evicts A because it arrived first; LRU evicts B because A was just used. Random can choose either. Optimal needs the later reference sequence.',
    'Replacement quality depends on the workload and associativity. No implementable policy is best for every reference pattern; FIFO is not equivalent to LRU.')
];
const mappingDiagram = diagram('Placement and address fields', `Assume 2^m-byte physical space, line size 2^b bytes
Direct (L = 2^r lines): [tag m-r-b | line r | offset b]
Fully associative:      [tag m-b   | offset b]
W-way, S = 2^s sets:    [tag m-s-b | set s  | offset b]

Memory block j ---> direct: line j mod L
               \\-> fully associative: any line
               \\-> set-associative: set j mod S, any of W ways
Selected line/ways -> valid bit + tag comparison -> hit/miss`);
const mappingSections = [
  section('Direct mapping',
    'For L cache lines, memory block j maps to line j mod L. Divide a byte address into tag, line index and byte offset. Read the indexed line and compare its valid tag.',
    'Merits: simple placement, one tag comparison and low area/power. Demerits: blocks with the same index conflict; alternating between them can thrash even when other lines are unused. No replacement choice exists.'),
  section('Fully associative mapping',
    'Any memory block can occupy any cache line. The address contains tag and offset only; the tag is searched among all valid lines.',
    'Merits: removes placement conflict misses and gives flexible placement. Demerits: parallel comparisons/search logic cost area, energy and possibly latency; a replacement policy is needed when full. Compulsory and capacity misses still occur.'),
  section('W-way set-associative mapping',
    'With L lines arranged as S = L/W sets, block j maps to set j mod S and may occupy any of W ways. The address has tag, set index and offset. Compare W tags in the indexed set.',
    'Merits: reduces direct-mapped conflicts with less search hardware than full associativity. Demerits: W tag comparisons, way selection and per-set replacement metadata add cost; more than W competing blocks can still conflict.',
    'The shown bit-width formulas assume power-of-two byte-addressed sizes and simple indexing. Real cache indexing/translation arrangements can vary; associativity is a design trade-off, not a universal guarantee of minimum latency.')
];
const dmaDiagram = diagram('Classical shared-bus DMA organization', ` CPU <---- Bus request / Bus grant ----> DMA controller
  |                                     [address, count,
  |                                      control/status]
  |                                            | ^
  |                                  DMA ACK   | | DMA request
  |                                            v |
  +=========== system address/data/control bus =+=== I/O interface
                           |                         |
                       Main memory               Peripheral
         DMA is bus master during granted transfers
         DMA completion/error interrupt ------------> CPU`);
const dmaSections = [
  section('Definition and initialization',
    'DMA transfers a block between a peripheral interface and main memory without the CPU executing a load/store for every transferred item. The CPU still sets up and manages the operation.',
    'The CPU programs the memory address, transfer count, direction, device/channel and mode. Address/count/control-status registers or descriptors hold this information; addresses may increment or remain fixed according to the configured endpoint.'),
  section('Peripheral-to-memory transfer sequence',
    '1. A ready peripheral/interface requests service from the DMA controller. The controller requests ownership of the shared bus from the arbiter/CPU.',
    '2. The current bus transaction completes and the arbiter grants DMA ownership. In a classical HOLD/HLDA system the CPU releases bus drivers; these signal names are not universal.',
    '3. DMA acknowledges the peripheral, supplies the memory address and appropriate I/O-read/memory-write controls. Data moves from the interface into memory without passing through CPU registers. Reverse the transfer direction and controls for memory-to-device output.',
    '4. After each transfer DMA updates the address and remaining count as configured. At completion or error it releases bus ownership and records status; if enabled, it interrupts the CPU, whose handler checks status and finishes the request.',
    'CPU execution that needs the occupied bus can stall; cached/internal work may continue on suitable systems. Shared buses still require arbitration. Software must also obey platform DMA address, ordering and cache-coherence rules.'),
  section('Burst transfer and cycle stealing',
    'Burst/block mode keeps the grant for a sequence or complete block, improving throughput but delaying competing CPU memory accesses. Burst length and preemption rules depend on the controller.',
    'Cycle stealing grants a single transfer (classically one word) before returning/arbitrating the bus, interleaving CPU and DMA accesses. It reduces long blocking intervals but increases arbitration overhead.',
    'DMA has setup cost and is most useful for sizable transfers. It does not mean the CPU is uninvolved, nor does DMA eliminate all interrupts.')
];
const interfaceDiagram = diagram('I/O interface between bus and peripheral', `CPU / memory bus                 I/O interface                 Device
Address --------------------> [address decoder / select]
Data <----------------------> [data register / buffer] <------> data
Control: read/write --------> [control register + timing] ----> commands
Status / IRQ <--------------- [status register + IRQ logic] <-- ready/error
                              [synchronization/handshake] <--> req/ack`);
const interfaceSections = [
  section('Purpose and main components',
    'An I/O interface bridges the CPU/system bus and a peripheral whose speed, word format, timing and electrical/protocol requirements differ. It exposes defined registers and translates bus operations into device actions.',
    'Address decoding selects the interface/register. A data register or FIFO buffers input/output; a status register reports ready/busy/error/completion; a control register selects mode, starts work and enables interrupts.',
    'Timing/control logic sequences transfers. Handshake and synchronization logic coordinates unrelated device and bus timing; interrupt/DMA logic requests service when supported. Serial interfaces may include shift registers and serialization/deserialization circuitry.'),
  section('Typical input and output transactions',
    'For input, the device supplies data and ready status. The interface buffers it and signals availability; a CPU read or DMA operation obtains it and the interface updates status/acknowledges according to the device protocol.',
    'For output, the CPU/DMA writes when space is available; the interface holds the data and signals it to the device. Completion/ready state is updated only as specified by the device.',
    'Memory-mapped I/O uses addresses in the processor memory map; isolated I/O uses a separate I/O address space/instructions. Device registers can have side effects, so software must follow the interface specification.'),
  section('Functions and benefits',
    'The interface performs device selection, buffering, timing coordination, command/status exchange, error reporting and optional interrupt/DMA support. It hides device-specific timing while providing a controlled transfer path.',
    'An interface is more than a connector: it contains the logic that makes bus/device communication reliable. Polling, interrupts and DMA are ways of servicing it, not replacements for it.')
];
const asyncDiagram = diagram('Strobe versus two-line handshake', `STROBE:     Source ==== data bus ====> Destination
                    ---- strobe ---->   (source initiated)
                    <--- strobe -----   (destination initiated)
              One control line; no returned acknowledgement

HANDSHAKE:  Source ==== data bus ====> Destination
                    ---- valid/req --->
                    <--- accept/ack ---
Source initiated: data stable -> req UP -> receiver latches -> ack UP
                  -> req DOWN -> ack DOWN -> next transfer
Destination initiated: ready/request UP -> source data + valid UP
                  -> receiver latches, request DOWN -> valid DOWN`);
const asyncSections = [
  section('Asynchronous data transfer',
    'Asynchronous units do not share a clock that fixes each transfer instant. Control signals coordinate when valid data is available and when it is accepted. This describes transfer timing, not necessarily serial communication.'),
  section('Strobe control: one control signal',
    'Source-initiated strobe: the source places data on the bus, waits for it to settle, asserts strobe, and the destination samples/latches data. The source then removes strobe and later removes data after the required hold time.',
    'Destination-initiated strobe: the destination asserts a strobe requesting data. The source presents data within an assumed response interval; the destination samples it, removes strobe, and data is then released according to the timing agreement.',
    'Strobe has no return acknowledgement: the source cannot directly confirm acceptance and the receiver cannot independently confirm source readiness with that one line. Correct operation requires agreed propagation/setup/hold timing.'),
  section('Handshaking: two control signals',
    'Source-initiated four-phase handshake: source places stable data and raises data-valid/request; destination captures data and raises acknowledge; source lowers request (and releases data after its required hold); destination lowers acknowledge. Both lines are now idle for the next item.',
    'Destination-initiated handshake: destination raises ready/request; source supplies stable data and raises data-valid; destination captures data then lowers ready/request; source lowers data-valid and releases data. The source must not withdraw valid data before receiver acceptance.',
    'Unlike a fixed-delay strobe, acknowledgement lets a slow participant delay completion. Extra signals and round-trip transitions add overhead; real implementations must handle clock-domain synchronization and timeouts/failure conditions. A handshake is not a universal remedy for metastability.')
];
const coherenceDiagram = diagram('Shared-memory stale-copy problem and invalidation', ` P0 -> Cache0 [X=0, S] ---- coherent interconnect ---- Cache1 [X=0, S] <- P1
                                      |
                                 Memory X=0
P0 requests write ownership -> invalidate Cache1 and wait for acknowledgement
P0 stores X=1: Cache0 [X=1, M]; Cache1 [I]; memory may still hold X=0
P1 next reads X -> coherent request obtains X=1; stale copy is not used`);
const coherenceSections = [
  section('Problem and required property',
    'Shared-memory processors may cache several copies of one memory block. If P0 writes its private cached X while P1 retains an old valid X, P1 can read stale data unless the copies are coordinated.',
    'Coherence makes writes to each location propagate and be observed in a consistent per-location order. It does not by itself define the ordering of accesses to different locations; that is memory consistency, with synchronization still required.'),
  section('Write-invalidate snooping: MSI example',
    'Each cache line has Modified (M: sole valid, dirty copy), Shared (S: clean copy, possibly replicated) or Invalid (I: unusable) state. Controllers snoop coherent transactions on the interconnect.',
    'I + local read issues BusRd and obtains S. S + local write obtains exclusive write ownership by invalidating other sharers (an upgrade when data is already present); I + local write issues a read-for-ownership/BusRdX. After other copies are invalidated, the writer enters M.',
    'M + local read/write remains M. M + another processor read supplies/flushes the latest data and becomes S in basic MSI; memory is made current. S + another processor write becomes I; M + another writer supplies/writes back the latest data and becomes I. A dirty M eviction must preserve the modified data.',
    'After P0 changes X from 0 to 1, P1 has I rather than a usable 0. Its next read obtains 1 through the coherence transaction. Protocol ordering and acknowledgements prevent two processors from writing the same block independently.'),
  section('Limitations and alternatives',
    'Snooping consumes broadcast/interconnect bandwidth and becomes costly as core count increases. A directory records sharers and directs messages, improving scaling but adding directory storage, messages and latency.',
    'False sharing occurs when processors write different variables in the same cache line: line-level invalidations cause needless misses and ownership ping-pong. Padding/alignment and data-layout changes can reduce it.',
    'Write-update protocols distribute each new value to sharers instead of invalidating them; they can help frequent shared reads but generate traffic for writes that other cores may never read. Coherence does not remove races or guarantee higher performance.')
];

const correctedMapping = solution('coa-q10',
  'Cache mapping defines the eligible cache location(s) for a main-memory block and the tag/index/offset fields used to locate it.',
  [mappingDiagram], mappingSections,
  scheme(['Purpose and address notation', 1], ['Three placement methods and diagrams/formulas', 3], ['Merits and limitations', 3]),
  'Define L, W, S and block size before deriving address widths; use the block number, not the byte address, in placement modulo formulas.');
const correctedDma = solution('coa-q11',
  'A DMA controller moves blocks between an I/O interface and memory after CPU setup, taking bus ownership for the transfers and reporting completion/status.',
  [dmaDiagram], dmaSections,
  scheme(['Definition and registers', 1.5], ['Labelled architecture', 1.5], ['Transfer sequence', 2.5], ['Burst versus cycle stealing', 1.5]),
  'Draw device request/acknowledge between device and DMA, bus request/grant between DMA and arbiter/CPU, and a separate DMA-to-CPU interrupt.');
const correctedPaging = solution('coa-q12',
  'Paging maps virtual pages to physical frames. The TLB caches translations so most repeated references can avoid a page-table walk.',
  [pagingDiagram], [...pagingSections, section('A simplified translation-time formula',
    'For a serial TLB lookup followed by memory, a one-level page table, no page faults and no other cache effects: EAT = h(tTLB + tM) + (1 − h)(tTLB + 2tM). Here h is the TLB hit fraction, tTLB lookup time and tM a memory access time.',
    'This model charges one PTE access on a miss. Multilevel walks, page-walk caches, overlap and faults change the model; neither a one-cycle TLB nor a fixed hit percentage can be assumed universally.')],
  scheme(['Paging organization and labelled diagram', 2], ['Translation/TLB and faults', 2.5], ['Numerical address trace', 1.5], ['Qualified EAT model', 1]),
  'A TLB miss need not access disk. Show the offset unchanged and distinguish a nonresident legal page from an illegal/protected access.');

export const importantCorrections = [correctedMapping, correctedDma, correctedPaging];

export const entries = [
  entry(['coa-original-2023-105401-q3b'], solution('coa-original-virtual-translation-write-policies',
    'Virtual-to-physical mapping is performed by paging/MMU translation; cache write policies independently determine how stores update cache and the next memory level.',
    [pagingDiagram], [...pagingSections.slice(0, 2), ...writeSections],
    scheme(['Address split and physical reconstruction', 2], ['TLB/page table and faults', 1.5], ['Write-through versus write-back', 2], ['Write-miss policies', 1.5]),
    'Answer both halves: translating an address is different from choosing a cache write policy.'),
    [match('coa-q12', 'partial', 'Covers paging/TLB translation but has no cache write policies.'), match('coa-q10', 'related', 'Cache placement differs from cache writing.')],
    'Dedicated multipart answer adds write-hit and write-miss policies to virtual-address translation.'),
  entry(['coa-original-2023-105401-q4b', 'coa-original-2025s-105401-q7a'], 'coa-q10',
    [match('coa-q10', 'covered', 'Corrected Important answer includes all three placements, address fields, diagrams and explicit merits/limitations.')],
    'The two original prompts have equivalent scope; the corrected Important mapping answer covers every part.'),
  entry(['coa-original-2023-105401-q6a', 'coa-original-2025s-105401-q5b'], 'coa-q11',
    [match('coa-q11', 'covered', 'Corrected Important answer defines DMA and traces peripheral transfer, bus arbitration and completion, plus modes.')],
    'Both originals are verbatim duplicates; the corrected Important DMA answer fully covers them.'),
  entry(['coa-original-2023-105401-q7a', 'coa-original-2025s-105401-q8a'], solution('coa-original-asynchronous-strobe-handshake',
    'Asynchronous transfer coordinates independently timed units with control signals rather than a shared transfer clock.',
    [asyncDiagram], asyncSections,
    scheme(['Asynchronous meaning', 1], ['Both strobe initiators and limitation', 2], ['Both handshake sequences and diagram', 3], ['Comparison', 1]),
    'Show all four handshake transitions and when data is held valid; do not describe strobe as an acknowledged transfer.'),
    [], 'The two originals differ only in spelling; one complete strobe/handshake answer serves both.'),
  entry(['coa-original-2023-105401-q9a'], 'coa-q12',
    [match('coa-q12', 'covered', 'Corrected Important answer explains fixed-size paging, frames, translation, TLB, faults and trade-offs.')],
    'The corrected Important virtual-memory answer fully covers the short-note topic Paging.'),
  entry(['coa-original-2023-105401-q9b'], solution('coa-original-memory-interleaving',
    'Interleaving distributes memory accesses across independent banks to overlap bank cycles and increase bandwidth.',
    [interleaveDiagram], interleaveSections,
    scheme(['Definition and goal', 1], ['Bank mapping and example', 2], ['Labelled organization', 1], ['Timing overlap', 1.5], ['Benefits and limits', 1.5]),
    'Use bank = word address mod B; mention bank conflicts and distinguish bandwidth from single-access latency.'),
    [], 'No Important question specifically explains memory interleaving.'),
  entry(['coa-original-2023-105401-q9d'], solution('coa-original-locality-reference',
    'Locality of reference is the tendency of programs to reuse recently accessed locations and to access nearby locations.',
    [diagram('Two locality patterns', 'Temporal: loop iteration 1 -> SUM -> iteration 2 -> SUM (same item)\nSpatial:  A[0] -> A[1] -> A[2] -> A[3] (nearby items)\nCache line fetch: [A[0] A[1] A[2] A[3]] -> later nearby hits')],
    localitySections, scheme(['Definition', 1], ['Temporal and spatial examples', 3], ['Cache/hierarchy application', 2], ['Limitations', 1]),
    'Give one repeated-address example and one neighboring-address example; they demonstrate different types of locality.'),
    [match('coa-q10', 'related', 'Mapping uses caches but does not fully explain locality.')],
    'Dedicated short note explains both locality types and their memory-system consequences.'),
  entry(['coa-original-2024-105401-q4a'], solution('coa-original-cache-replacement-algorithms',
    'A replacement algorithm selects an eligible cache victim on a miss when no invalid line is available.',
    [diagram('Victim selection within a two-way set', 'Set contents: install A, install B, then hit A\nMiss C -> FIFO victim A; LRU victim B; Random A or B\nOptimal -> victim whose next use occurs farthest in the future')],
    replacementSections, scheme(['Replacement context and dirty victim', 1], ['FIFO/LRU/random/optimal', 4], ['Worked comparison', 1], ['Limitations', 1]),
    'State that direct mapping has no victim choice; distinguish FIFO insertion age from LRU access age.'),
    [match('coa-q10', 'related', 'Mapping determines eligible lines, but is not a complete replacement-policy answer.')],
    'Dedicated answer is required for algorithms and their limitations.'),
  entry(['coa-original-2024-105401-q5b'], solution('coa-original-coherence-protocols',
    'A cache-coherence protocol coordinates cached copies of shared blocks so a processor does not use an obsolete valid copy.',
    [coherenceDiagram, diagram('Key MESI transitions (stable states)', 'I --read, no sharer--> E --local write (silent)--> M\nI --read, sharer----> S --write + invalidate----> M\nI --write + get ownership----------------------> M\nE --other read--> S     M --other read + flush--> S\nS/E/M --other writer obtains ownership--------> I\nM --eviction--> write back; then I')],
    [...coherenceSections.slice(0, 2), section('MESI and protocol alternatives',
      'MESI adds Exclusive (E), the sole clean cached copy, to MSI. A read miss with no other sharers can enter E; a local write then changes E to M silently. A read miss with sharers enters S; an S-to-M write needs ownership and invalidation.',
      'On another processor read, E becomes S; an M owner supplies/flushes current data and becomes S in basic MESI. Another writer invalidates S/E/M copies after the needed data transfer. Transient states and message acknowledgements are omitted in this stable-state teaching diagram.',
      'Snooping broadcasts requests to controllers; directory protocols track sharers and target messages. Write-invalidate invalidates other copies, whereas write-update distributes changed data. These are organization/policy choices; MSI and MESI name line-state protocols.'), coherenceSections[2]],
    scheme(['Problem and coherence property', 1], ['MSI states/actions', 2], ['MESI states/transitions', 2], ['Snooping/directory and update/invalidate', 1], ['Limitations', 1]),
    'E means exclusive AND clean; M means exclusive AND dirty. Do not confuse coherence with global memory consistency.'),
    [match('coa-q15', 'related', 'Flynn classification concerns parallel architectures, not cache-coherence protocols.')],
    'Dedicated answer covers multiple protocols, valid state transitions and scaling/false-sharing limits.'),
  entry(['coa-original-2024-105401-q9c', 'coa-original-2024s-105401-q6a'], solution('coa-original-io-interface-functions',
    'An I/O interface is the hardware logic/register boundary that connects a peripheral to the computer bus and coordinates data, commands and status.',
    [interfaceDiagram], interfaceSections,
    scheme(['Definition and role', 1], ['Labelled interface diagram', 1.5], ['Registers/components', 2], ['Input/output sequence', 1.5], ['Functions', 1]),
    'Label data, status and control registers separately; show both the system-bus side and device-handshake side.'),
    [match('coa-q11', 'related', 'DMA is one way to service an interface; it does not replace a component/functions explanation.')],
    'The general short note and explicit role/functions/components prompt are both fully answered by this interface explanation.'),
  entry(['coa-original-2024s-105401-q2b'], solution('coa-original-ram-rom-eprom-eeprom',
    'Semiconductor memories differ in whether normal operation permits rewriting, whether power is needed to retain data, and how stored contents are erased.',
    [diagram('Semiconductor memory families', 'Semiconductor memory\n  +-- Read/write working memory: RAM -> SRAM, DRAM (normally volatile)\n  +-- Nonvolatile program/data storage: ROM family\n       +-- Mask ROM / one-time PROM\n       +-- EPROM: UV erase\n       +-- EEPROM: electrical erase/rewrite')],
    [section('RAM: Random Access Memory',
      'RAM provides address-based read/write access; random access means an arbitrary location can be selected without reading all preceding locations. In ordinary working-memory terminology SRAM and DRAM are volatile and lose data when power is removed.',
      'SRAM stores a bit in a bistable cell, needs no periodic refresh while powered and is used in caches/buffers. DRAM stores charge in a capacitor, needs periodic refresh and is used for dense main memory.'),
    section('ROM and EPROM',
      'ROM is nonvolatile memory intended mainly for reads in normal operation, for example fixed boot/control code. Mask ROM is programmed during manufacture; PROM can be programmed once. The broader ROM family includes erasable programmable devices.',
      'EPROM is electrically programmed but erased by ultraviolet light through a quartz window, conventionally erasing the whole chip before reprogramming. It retains data without power and is inconvenient for frequent in-system updates.'),
    section('EEPROM and comparison',
      'EEPROM is electrically erased and programmed, often at byte or small-page granularity depending on the part, and can support in-circuit updates. It stores configuration/calibration data and has limited program/erase endurance.',
      'Writes/erases to EPROM/EEPROM are much slower than ordinary SRAM reads/writes. Flash is electrically erasable nonvolatile memory with block erase; do not claim all EEPROM or flash devices use the same erase granularity.')],
    scheme(['RAM and types', 2], ['ROM', 1], ['EPROM', 1.5], ['EEPROM', 1.5], ['Retention/erase/application comparison', 1]),
    'EPROM: electrical programming, ultraviolet erase. EEPROM: electrical programming AND electrical erase.',
    { title: 'RAM versus ROM family', headers: ['Type', 'Retention', 'Change/erase', 'Typical purpose'], rows: [
      ['SRAM/DRAM', 'Volatile', 'Ordinary electrical read/write', 'Working memory'],
      ['Mask ROM', 'Nonvolatile', 'Fixed in manufacture', 'Fixed code'],
      ['EPROM', 'Nonvolatile', 'Electrical program; UV whole-chip erase', 'Older firmware development'],
      ['EEPROM', 'Nonvolatile', 'Electrical erase/rewrite; part-dependent granularity', 'Configuration/calibration']
    ]}), [], 'No Important question covers these four memory technologies.'),
  entry(['coa-original-2024s-105401-q5b'], solution('coa-original-interrupt-initiated-io',
    'Interrupt-initiated I/O lets a device signal that it needs CPU service, allowing the CPU to execute other instructions instead of continually polling.',
    [diagram('Interrupt-driven input sequence', 'CPU configures interface -> CPU runs other work\nDevice ready -> interface IRQ -> controller/CPU accepts\nSave return state -> identify source -> ISR reads data/status\nAcknowledge/clear cause -> restore state -> return from interrupt')],
    [section('How it works',
      'The CPU configures the device operation, buffer and interrupt enable. The interface sets ready/error/completion status and asserts a request when its condition occurs.',
      'The interrupt controller masks/prioritizes requests. When allowed by the architecture, the CPU saves the required return state and branches through the appropriate vector or common entry; the handler saves any additional registers it uses.',
      'The ISR identifies the cause, transfers data through interface registers or handles completion/error, clears/acknowledges the device condition in the specified order, restores context and returns. Interrupt-controller acknowledgement alone may not clear a level-triggered device request.'),
    section('Advantages and limitations',
      'Avoids a busy-wait loop during slow device latency and can respond to unpredictable events. For ordinary interrupt-driven programmed transfers the CPU still moves data; an interrupt is not DMA.',
      'Interrupt entry, context saving and return consume time; high-rate small transfers can cause excessive overhead or interrupt storms. CPU load, masking and higher-priority service create variable response latency.',
      'Buffers can overflow if service is delayed; handlers need careful synchronization with main code and other handlers. Priority schemes can starve low-priority devices. DMA, buffering or interrupt coalescing can help large/high-rate transfers.')],
    scheme(['Definition', 1], ['Working sequence and diagram', 3], ['CPU data movement distinction', 1], ['Limitations', 2]),
    'Explain what the ISR does and why interrupt-driven I/O still incurs CPU work.'),
    [match('coa-q11', 'related', 'DMA completion may interrupt, but interrupt-driven per-item I/O and its limits are a separate topic.')],
    'Dedicated answer addresses operation and explicitly requested limitations.'),
  entry(['coa-original-2024s-105401-q8a', 'coa-original-2025-105401-q9b'], solution('coa-original-memory-hierarchy-design',
    'A memory hierarchy combines small fast expensive storage near the CPU with larger slower cheaper storage farther away, exploiting locality to approach fast-memory performance at affordable capacity.',
    [diagram('Memory hierarchy: trends, not fixed timings', '                 Registers          smallest, fastest, high cost/bit\n                L1 / L2 / L3 cache\n                 Main memory DRAM\n               SSD / HDD backing    largest, slower, low cost/bit\nDownward: capacity usually rises; latency rises; cost/bit falls\nUpward: repeatedly used blocks are retained closer to CPU')],
    [section('Levels and transfer principle',
      'Registers supply operands directly; SRAM caches retain recently used memory blocks; DRAM provides main-memory capacity; nonvolatile secondary storage holds files and backing data. Exact numbers and shared/private cache arrangements vary.',
      'Temporal locality favors retaining recently used items; spatial locality favors moving neighboring bytes in blocks. A hit is served by the current level; a miss obtains the block from a lower level, possibly replacing a resident block.'),
    section('Access time, cost and size',
      'Making all storage as fast as registers/cache would be costly and space/power intensive. Making all storage large and cheap would expose high access latency. Capacity, latency, bandwidth, area, energy and cost must be balanced.',
      'A larger cache may reduce capacity misses but increases storage/lookup cost and can lengthen hit time. A larger block exploits spatial locality but increases transfer time and pollution. Associativity reduces conflicts but adds tag/selection complexity.',
      'Choose sizes to hold the active working set; choose block size, associativity, replacement and write policies according to workload and bandwidth. A faster clock or larger capacity alone does not guarantee better memory performance.'),
    section('Performance model and limitations',
      'For hit time H, miss rate m and additional miss penalty M: AMAT = H + m × M. For example H = 2 ns, m = 0.05 and M = 60 ns gives AMAT = 5 ns under this simple serial model.',
      'Multiple levels reduce the penalty seen by higher levels, but random access, poor locality, bandwidth contention and page faults can dominate. A page transfer in virtual memory and a cache-line transfer have different sizes and costs.')],
    scheme(['Concept and labelled levels', 2], ['Locality and transfers', 1.5], ['Access time/cost/size trade-offs', 2], ['Performance model and limits', 1.5]),
    'Explain the direction of all three trends—capacity, latency and cost per bit—and use AMAT with miss penalty defined as additional time.'),
    [match('coa-q10', 'related', 'Cache mapping is one hierarchy design choice, not the whole hierarchy.'), match('coa-q12', 'related', 'Paging supports memory organization but does not cover hierarchy design trade-offs.')],
    'Both prompts are covered by one complete hierarchy answer including the explicit cost/time/size design discussion.'),
  entry(['coa-original-2024s-105401-q9a'], solution('coa-original-cache-coherence-definition',
    'Cache coherence keeps multiple cached copies of shared memory consistent with the ordered writes to each memory location.',
    [coherenceDiagram], coherenceSections,
    scheme(['Definition and shared-copy problem', 2], ['Example and diagram', 1.5], ['Coherence mechanism', 2], ['Limits/consistency distinction', 1.5]),
    'Use two caches holding X, then show one writer invalidating the other copy; memory may be stale while a line is Modified.'),
    [match('coa-q15', 'related', 'Parallel-machine classification does not explain coherence.')],
    'No Important answer covers cache coherence; a dedicated definition, example and mechanism are required.'),
  entry(['coa-original-2024s-105401-q9b'], solution('coa-original-interleaving-locality-notes',
    'Memory interleaving overlaps accesses across banks; locality describes the temporal and spatial patterns that memory systems exploit.',
    [interleaveDiagram], [section('Part (i): memory interleaving', ...interleaveSections.flatMap(s => s.points)),
      section('Part (ii): locality of reference', ...localitySections.flatMap(s => s.points))],
    scheme(['Interleaving definition and mapping', 2], ['Interleaving overlap/limitations', 1.5], ['Temporal/spatial locality with examples', 2.5], ['Hierarchy application', 1]),
    'Give separate short notes; interleaving is bank organization, while locality is a property of the access stream.'),
    [], 'Dedicated combined answer explicitly covers both requested notes.'),
  entry(['coa-original-2025-105401-q5b'], solution('coa-original-semiconductor-memory-organization',
    'A semiconductor memory chip organizes bit cells as an addressable array with decoding, sensing, data input/output and read/write control circuits.',
    [diagram('Generic 2^k-word by w-bit memory chip', `A[k-1:0] -> address buffer -> row/column decoder
                                      |
                                  select cells
                                      v
                             [2^k words x w bits]
                                      |
                             sense amps / write drivers
                                      |
D[w-1:0] <-------------------- data I/O buffers
CS, OE, WE ------------------> read/write control
DRAM additionally: multiplexed address latches + refresh logic`),
    diagram('Expanding width and depth', 'Width: same address/control -> two 1K x 4 chips -> 1K x 8\n       chip A -> D[3:0]; chip B -> D[7:4]\nDepth: A[9:0] -> both 1K x 8 chips; A10 -> chip-select decoder\n       one selected chip drives D[7:0] -> combined 2K x 8')],
    [section('Array, addresses and data paths',
      'For a 2^k × w organization, k address bits select one of 2^k words and w data lines transfer that word; total capacity is 2^k × w bits. Physical arrays commonly use row/column decoding to reduce decoder complexity.',
      'The address buffer/latches hold the address; decoders activate the selected row/columns. Sense amplifiers detect weak cell signals; write drivers force selected cells to the input data value. Data buffers connect the word to external pins.'),
    section('Read/write control and technology',
      'Chip select enables the chip. Output enable allows read data onto the bus; write enable selects a write. Active-high/active-low polarities and timing depend on the device, so name their functions rather than assuming all pins have the same polarity.',
      'During a read the address is decoded and sensed data appears after the access time. During a write, valid input data and control timing update the selected cells; unselected chips must not drive a shared bus.',
      'SRAM uses bistable cells with no periodic refresh; DRAM uses charge-storage cells, row activation/sensing/restoration and refresh. DRAM often multiplexes row/column addresses over pins, controlled by its command interface.'),
    section('Capacity expansion',
      'Width expansion connects chips to common addresses/control and different data-bit slices: two 1K × 4 chips yield 1K × 8.',
      'Depth expansion uses high address bits to select one bank while low bits select a location within it: two 1K × 8 chips yield 2K × 8 and require 11 system address bits. Decode chip selects so only the selected chip drives the bus.')],
    scheme(['Array and capacity notation', 1.5], ['Labelled internal diagram', 2], ['Read/write circuitry and operation', 1.5], ['Width/depth expansion with diagram', 2]),
    'Distinguish words from bits: 1K × 8 is 1024 bytes, not 1024 bits; label address, data and control paths.'),
    [], 'No Important question provides semiconductor-array and chip-expansion organization.'),
  entry(['coa-original-2025-105401-q6a'], solution('coa-original-three-io-transfer-techniques',
    'Programmed I/O, interrupt-driven I/O and DMA differ in how readiness is detected and which agent moves the data.',
    [diagram('Three transfer paths', 'Programmed: CPU polls status -> CPU reads/writes interface data -> memory\nInterrupt:  interface IRQ -> CPU ISR moves data through interface -> memory\nDMA:        CPU setup -> DMA transfers interface <-> memory -> completion/status')],
    [section('Program-controlled (programmed) I/O',
      'The CPU issues a command and repeatedly reads the interface status until ready. It then executes data-register reads/writes, moves data through CPU registers and repeats until finished.',
      'It is simple and can suit short/predictable waits, but busy waiting occupies CPU time and the CPU performs every data transfer.'),
    section('Interrupt-driven I/O',
      'The CPU starts/enables I/O and executes other work. On readiness/completion/error, the interface raises an interrupt. The ISR checks status, performs required data-register transfers, clears the cause and returns.',
      'It avoids continuous readiness polling but incurs interrupt/context overhead and variable service latency. Ordinary interrupt-driven data transfer still uses the CPU for data movement.'),
    section('Direct memory access', ...dmaSections[0].points,
      'The DMA controller arbitrates for bus access, transfers the configured block directly between interface and memory, updates address/count and reports completion/error, optionally by interrupt. The CPU may contend for bus/memory bandwidth.',
      'DMA suits blocks/high-rate devices; setup, arbitration and cache-management costs can outweigh benefits for tiny transfers. Interrupts and DMA can coexist: an interrupt can report DMA completion.')],
    scheme(['Programmed operation', 2], ['Interrupt operation', 2], ['DMA operation', 2], ['Comparison and selection', 1]),
    'Compare readiness detection AND data mover; do not claim interrupt-driven I/O transfers blocks without CPU data movement.',
    { title: 'I/O transfer comparison', headers: ['Property', 'Programmed', 'Interrupt-driven', 'DMA'], rows: [
      ['Ready detection', 'CPU polls', 'Device requests CPU service', 'DMA trigger/request'],
      ['Main data mover', 'CPU', 'CPU ISR', 'DMA controller'],
      ['CPU overhead', 'Wait + per item', 'ISR + per item', 'Setup + completion'],
      ['Typical use', 'Simple/short transfers', 'Infrequent asynchronous events', 'Block/high-rate transfer']
    ]}), [match('coa-q11', 'partial', 'DMA portion is covered, but the prompt also requires programmed and interrupt-driven I/O.')],
    'Dedicated comparative answer covers all three requested techniques.'),
  entry(['coa-original-2025-105401-q6b'], solution('coa-original-interrupt-types',
    'Interrupt terminology classifies both the origin of an event and how the CPU locates its service routine; these categories overlap rather than being mutually exclusive.',
    [diagram('Sources and dispatch', 'External device/timer -> IRQ/controller --+\nSoftware INT/trap instruction -----------+--> CPU saves return state\nInstruction exception (fault/trap) ------+       |\n                                             dispatch\n                              vector table OR common/fixed entry -> handler')],
    [section('Hardware and software sources',
      'A hardware interrupt is requested by external hardware such as a timer, keyboard or I/O controller, usually asynchronously to the current instruction. Maskable requests obey interrupt enables/masks; a nonmaskable class has special architecture-defined handling.',
      'A software interrupt is deliberately requested by an instruction such as INT/SVC/ECALL to enter a handler or operating-system service. It is synchronous to program execution; naming varies among ISAs.'),
    section('Vectored and non-vectored dispatch',
      'In vectored handling, an interrupt identity/type selects a vector entry or service entry address. The vector number may be supplied by a controller/device or be architecture-defined; it is not necessarily the full handler address on the data bus.',
      'In non-vectored handling, requests use a common/fixed service entry rather than a distinct supplied vector for each source. The handler may identify the cause from status/cause registers or by polling interfaces. Non-vectored does not imply that polling is the only possible identification mechanism.'),
    section('Exceptions and their relation to interrupts',
      'An exception arises synchronously from executing an instruction or its access, for example divide error, illegal opcode, page fault or protection violation. Some architectures use interrupt as an umbrella term; others reserve interrupt for asynchronous events.',
      'A fault may allow restart after repair, a trap may report after an instruction, and a severe abort may not permit reliable restart; exact definitions and saved return addresses are ISA-specific.',
      'Example: a timer can be a hardware, maskable, vectored interrupt; a software system-call instruction can also use a vector. Origin and dispatch method answer different questions.')],
    scheme(['Classification principle and diagram', 1], ['Hardware/software', 2], ['Vectored/non-vectored', 2], ['Exceptions and examples', 2]),
    'Do not list the categories as disjoint; state the ISA-dependent distinction between external interrupts and synchronous exceptions.'),
    [], 'No Important question fully addresses interrupt categories or dispatch semantics.'),
  entry(['coa-original-2025-105401-q7b'], solution('coa-original-parallel-shared-memory-coherence',
    'Parallel processors execute work concurrently. In a shared-memory multiprocessor, cores share an address space but often have private caches, creating the need for coherence.',
    [coherenceDiagram], [section('Parallel-processor organization',
      'Parallelism may use SIMD units applying an operation to many data items or MIMD cores running independent instruction streams. A shared-memory multicore/SMP connects cores, caches and memory through an interconnect; distributed-memory systems instead communicate between separate address spaces.',
      'Sharing memory simplifies communication but makes memory bandwidth, synchronization, data races and private cached copies design concerns. Shared address space does not mean every core accesses DRAM on every load.'),
      ...coherenceSections],
    scheme(['Parallel processors and shared-memory organization', 2], ['Stale-copy problem and diagram', 2], ['Coherence mechanism', 2], ['Scaling/false sharing/synchronization', 1]),
    'Describe the processors before the cache problem; distinguish shared address space from a physically shared cache.'),
    [match('coa-q15', 'partial', 'Flynn classification covers parallel styles but not shared-memory coherence.')],
    'Dedicated multipart answer adds shared-memory organization and coherence to the classification context.'),
  entry(['coa-original-2025-105401-q8a'], solution('coa-original-cache-organization-complete',
    'A cache retains memory blocks in lines containing data, tag, valid state and, for write-back, dirty state; mapping, replacement and write policies govern its operation.',
    [mappingDiagram, diagram('Cache-line lookup and miss handling', 'CPU address -> index/set selection -> valid/tag comparison\n                  hit -> select offset -> data\n                  miss -> choose eligible line/victim\n                       -> write back if dirty -> fetch block -> update tag/state')],
    [section('Cache organization and operation',
      'A line stores a block of bytes plus a tag identifying the memory block and a valid bit. Write-back caches track dirty state; associative caches also track replacement metadata. On a hit, the block offset selects the requested data.',
      'A read miss fetches a block from the next level. If all eligible lines are valid, replacement chooses a victim; a dirty victim must be preserved before reuse. The cache controller sequences lookup, refill and write handling.'),
      ...mappingSections, ...replacementSections.slice(0, 2), ...writeSections],
    scheme(['Organization and lookup diagram', 1.5], ['Three mapping methods', 2], ['Replacement algorithms', 1.5], ['Write-hit and write-miss policies', 2]),
    'This is a broad multipart question: allocate space to organization, all three mappings, replacement AND write policies.'),
    [match('coa-q10', 'partial', 'Important covers mapping but not the full replacement/write-policy requirements.')],
    'Dedicated complete answer prevents the previous mapping-only answer from omitting two explicit subparts.'),
  entry(['coa-original-2025-105401-q9a'], solution('coa-original-sram-dram-organization',
    'SRAM and DRAM are volatile semiconductor RAM technologies with different bit cells, array-control requirements, latency/density trade-offs and uses.',
    [diagram('SRAM and DRAM bit-cell/array organization', 'SRAM (typical 6-transistor cell):\n bit line BL -- access transistor -- cross-coupled latch -- access -- BLbar\n                         word line controls access\n DRAM (typical 1T1C cell):\n bit line -- access transistor -- storage capacitor\n                    word line\nBoth: row decoder -> selected row -> sense amplifiers -> column select -> data\nDRAM additionally restores sensed rows and periodically refreshes all rows')],
    [section('SRAM organization and operation',
      'A typical SRAM cell uses a cross-coupled transistor latch (commonly 6T) selected through access transistors by a word line. Bit lines connect selected cells to sensing and write circuits.',
      'It retains state while powered without periodic refresh; ordinary reads are nondestructive. The larger cell means lower density and higher cost per bit than comparable DRAM technology, making SRAM suitable for CPU caches, small buffers and register-file-like structures.'),
    section('DRAM organization and refresh',
      'A typical DRAM cell uses one access transistor and one capacitor. A row activation connects small capacitor charges to bit lines; sense amplifiers detect and restore the values. A column selector then transfers the requested data.',
      'Charge leaks, so rows must be refreshed periodically within the device-specified retention window, even when software is not reading them. Refresh activates/restores rows and consumes time/bandwidth; refresh interval and temperature requirements depend on the device.',
      'DRAM sensing disturbs the stored charge, so restoration is part of read/activation operation. Refresh is not the same as rewriting the entire memory after every CPU instruction. DRAM is denser and typically cheaper per bit, so it is used for main memory.'),
    section('Access time and applications',
      'Access time is the delay until requested data becomes available; cycle time is the minimum interval before a relevant operation can repeat. They need not be equal. SRAM generally has lower random-access latency than DRAM in comparable system roles.',
      'DRAM latency depends on row state: a row-buffer hit avoids some activation/precharge work, while a conflict needs more operations. Burst bandwidth is not the same as first-word access latency. Exact nanosecond values depend on the part and timing configuration.',
      'SRAM trades area/cost for fast access; DRAM trades refresh and more complex timing for high capacity. Both normally require power for retention; SRAM does not mean nonvolatile memory.')],
    scheme(['Cell and array diagrams', 2], ['SRAM operation/application', 1.5], ['DRAM sensing/refresh/application', 2], ['Qualified latency/cycle-time comparison', 1.5]),
    'Explicitly cover refresh, access time AND applications. Never say SRAM needs no power or that a DDR transfer rate equals its access latency.',
    { title: 'SRAM versus DRAM', headers: ['Feature', 'SRAM', 'DRAM'], rows: [
      ['Typical cell', 'Bistable latch, commonly 6T', '1 transistor + capacitor'],
      ['Periodic refresh', 'No, while powered', 'Yes, device-specified'],
      ['Density/cost per bit', 'Lower density/higher cost', 'Higher density/lower cost'],
      ['Usual role', 'Caches and small fast stores', 'Main memory'],
      ['Latency', 'Generally lower random-access latency', 'Row/timing dependent; burst rate differs from latency']
    ]}), [], 'No Important answer covers semiconductor cell organization, refresh or latency distinctions.'),
  entry(['coa-original-2025s-105401-q4a'], solution('coa-original-vectored-priority-daisy-chain',
    'Interrupt dispatch determines the handler entry, while priority arbitration chooses which eligible request is accepted when multiple sources need service.',
    [diagram('Daisy-chain priority acknowledgement', 'All device IRQ outputs -> shared request logic -> CPU IRQ\nCPU interrupt acknowledge -> D0 -> D1 -> D2 -> ...\n                            high             low priority\nFirst requesting device captures acknowledge, blocks propagation,\nand supplies its vector/identity in a vectored implementation.\nNonrequesting devices pass acknowledge to the next device.')],
    [section('Vectored and non-vectored interrupts',
      'A vectored interrupt uses a vector identity/type to select a service entry, commonly through a vector table. The identity may be supplied by hardware/controller or fixed by architecture.',
      'A non-vectored interrupt enters a common/fixed handler rather than using a distinct source vector. The handler determines the cause using status/cause information or polling. Non-vectored does not necessarily mean software must poll every device.'),
    section('Priority interrupts',
      'When requests overlap, priority logic selects the highest-priority unmasked pending source. Fixed priorities favor specified devices; rotating priorities can improve fairness. A pending lower-priority request waits rather than being treated as already serviced.',
      'A parallel priority controller can use request bits, mask bits and a priority encoder. Interrupt nesting permits a higher-priority request to preempt a handler only when the CPU/controller and software enable it; priority alone does not imply nesting.'),
    section('Daisy-chain operation and limitations',
      'The CPU broadcasts/receives a request and sends an acknowledgement down the serial chain. Each nonrequesting interface passes it onward. The first requesting interface captures it, prevents lower devices from receiving it and identifies/services its request as the design specifies.',
      'Position defines fixed priority: the nearest device wins among simultaneous pending requests. The requester clears its condition through the normal device-service protocol; a captured acknowledgement alone need not clear it.',
      'The chain uses simple wiring but cumulative propagation delays increase latency; one failing chain element can block downstream acknowledgements, and a frequently requesting high-priority device can starve lower devices. The chain is an arbitration mechanism; a vectored data path is a common implementation, not its definition.')],
    scheme(['Vectored/non-vectored semantics', 2], ['Priority/masking/nesting', 1.5], ['Labelled daisy chain and sequence', 2.5], ['Limitations', 1]),
    'Show separate shared IRQ and serial acknowledge paths. An interrupt vector is an identity/address-table selector, not always a complete address.'),
    [], 'No Important question covers interrupt dispatch, priority and daisy-chain arbitration.'),
  entry(['coa-original-2025s-105401-q5a'], solution('coa-original-io-interface-programmed-interrupt',
    'The I/O interface adapts the system bus to a peripheral. Program-controlled and interrupt-driven I/O use its registers but differ in how the CPU learns that service is needed.',
    [interfaceDiagram], [...interfaceSections.slice(0, 2), section('Program-controlled versus interrupt-driven transfer',
      'Program-controlled I/O issues a command, repeatedly polls status and reads/writes the interface data register when ready. CPU instructions move each item and the CPU may spend the wait in a busy loop.',
      'Interrupt-driven I/O issues a command/enables interrupts and lets the CPU execute other work. The interface asserts IRQ on the configured condition; an ISR checks status, moves data, acknowledges/clears the cause and returns.',
      'Both methods normally move data through CPU registers. Interrupt-driven I/O avoids continuous readiness polling but adds entry/exit and context overhead, with service latency affected by masking and priority. Programmed polling can be suitable for tiny transfers/very short predictable waits; interrupts suit infrequent asynchronous events.')],
    scheme(['Interface purpose/components', 2], ['Diagram and transaction', 1], ['Program-controlled method', 1.5], ['Interrupt-driven method', 1.5], ['Comparison', 1]),
    'Answer the interface half first, then compare waiting strategy, CPU data movement, overhead and response.',
    { title: 'CPU-controlled transfer comparison', headers: ['Aspect', 'Program-controlled', 'Interrupt-driven'], rows: [
      ['Ready detection', 'Repeated status reads', 'Device IRQ then handler status check'],
      ['Waiting CPU', 'Usually busy-waits', 'Can execute other work'],
      ['Data movement', 'CPU instructions', 'CPU handler instructions'],
      ['Cost', 'Polling overhead', 'Interrupt/context overhead'],
      ['Latency', 'Depends on polling interval', 'Depends on masks/priority/ISR scheduling']
    ]}), [match('coa-q11', 'related', 'DMA is a third transfer mode and does not cover the requested interface plus polling/interrupt comparison.')],
    'Dedicated exact multipart answer includes interface organization and both CPU-controlled methods.'),
  entry(['coa-original-2025s-105401-q7b'], solution('coa-original-interleaving-cache-write-policies',
    'Memory interleaving distributes requests across banks; write-through and write-back determine how cache stores reach the next memory level.',
    [interleaveDiagram], [...interleaveSections, ...writeSections],
    scheme(['Interleaving definition/mapping/overlap', 3], ['Write-through with merits/demerits', 2], ['Write-back with merits/demerits', 2]),
    'Separate bank interleaving from cache writing; compare write traffic, dirty bits, eviction and implementation complexity.'),
    [match('coa-q10', 'related', 'Important mapping answers cache placement, not bank interleaving or write policies.')],
    'Dedicated answer covers both named topics; neither is fully covered by Important mapping.'),
  entry(['coa-original-2025s-105401-q8b'], solution('coa-original-coherence-method-limitations',
    'The cache-coherence problem arises when a shared memory location has multiple cached copies and one processor writes without updating or invalidating the others.',
    [coherenceDiagram], coherenceSections,
    scheme(['Problem and stale-read example', 2], ['One complete snooping write-invalidate method', 3], ['Limitations: traffic/scaling/false sharing', 2]),
    'Explain one protocol through a read/write sequence, then state concrete limitations including false sharing.'),
    [match('coa-q15', 'related', 'Flynn classification does not solve the coherence problem.')],
    'Dedicated answer supplies the explicitly requested method and its limitations.')
];
