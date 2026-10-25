// Operand-specific original PYQ answers. No source scans are exposed by this module.
// Primary verification: https://www.ece.rice.edu/Courses/422/1996/supafly/adder.html
// https://docs.oracle.com/cd/E19957-01/806-3568/ncg_math.html
const section = (heading, ...points) => ({ heading, points });
const diagram = (title, ascii) => ({ title, ascii });
const table = (title, headers, rows) => ({ title, headers, rows });
const marking = (...components) => components.map(([component, marks]) => ({ component, marks }));
const answer = (id, intro, sections, diagrams, extra = {}) => ({
  id, verified: 'BEU Exam Answer · 7 Marks', intro, sections, diagrams,
  conclusion: sections.at(-1).points.at(-1),
  markingScheme: marking(['Principle and definitions', 1], ['Method and working', 4], ['Result and interpretation', 2]),
  examTip: 'Show the intermediate working, state the representation and units, and box the final result.', ...extra
});
const original = (suffix) => `coa-original-${suffix}`;
const match = (id, relation, reason) => ({ id, relation, reason });
const entry = (suffixes, unit, solution, importantMatches = [], reason = 'The exact original prompt requires this dedicated calculation or coverage.') => ({
  questionIds: suffixes.map(original), unit, solution, importantMatches, overlapDecision: 'dedicated', reason
});
const reuse = (suffixes, unit, solutionRef, reason) => ({
  questionIds: suffixes.map(original), unit, solutionRef,
  importantMatches: [match(solutionRef, 'covered', reason)], overlapDecision: 'reuse', reason
});

const cla = answer('coa-q3',
  'A carry look-ahead adder computes carries directly from the operand bits and the input carry. It removes the need to wait for a carry to ripple through every full adder.', [
    section('Generate, propagate and sum',
      'For i = 0, 1, 2, 3, define Gi = Ai · Bi and Pi = Ai ⊕ Bi. Gi generates a carry when both input bits are 1; Pi propagates an incoming carry when exactly one input bit is 1.',
      'Si = Pi ⊕ Ci; C(i+1) = Gi + Pi · Ci. Here + means Boolean OR, · means AND, and ⊕ means XOR. C0 is the input carry.',
      'An OR-based propagate Ai + Bi can also be used for carry equations, but the sum must still use Ai ⊕ Bi ⊕ Ci. Do not substitute OR into the sum equation.'),
    section('Expanded four-bit carry equations',
      'C1 = G0 + P0C0.',
      'C2 = G1 + P1G0 + P1P0C0.',
      'C3 = G2 + P2G1 + P2P1G0 + P2P1P0C0.',
      'C4 = G3 + P3G2 + P3P2G1 + P3P2P1G0 + P3P2P1P0C0.',
      'Implement each product using AND gates and combine the products using OR gates. Four XOR gates combine P0–P3 with C0–C3 to produce S0–S3.'),
    section('Worked example: 1011 + 0110',
      'A3…A0 = 1011, B3…B0 = 0110, C0 = 0. Hence P3…P0 = 1101 and G3…G0 = 0010.',
      'C1 = 0; C2 = 1; C3 = 1; C4 = 1. S0 = 1, S1 = 0, S2 = 0, S3 = 0.',
      'C4 S3 S2 S1 S0 = 10001₂ = 17, which equals 11 + 6. This is an unsigned example; carry-out and signed overflow are different flags.'),
    section('Speed and implementation limits',
      'For a ripple adder, the worst carry traverses n carry stages, so carry delay grows linearly with n. In a small CLA, after P/G generation, expanded carries use parallel AND–OR paths.',
      'With ideal multi-input gates, four-bit look-ahead takes two carry-logic levels after P/G generation, followed by the sum XOR. Real delay depends on gate type, fan-in and wiring. Arbitrarily wide CLA logic is not constant-delay: practical hierarchical look-ahead uses groups and logarithmic-depth carry trees.')
  ], [diagram('Four-bit CLA circuit blocks',
    'A[3:0], B[3:0] --> XOR/AND bank --> P[3:0], G[3:0]\n                                      |\nC0 --------------------> [Expanded carry AND-OR network]\n                                      | C1,C2,C3,C4\nP[3:0], C[3:0] --------> [four XOR gates] --> S[3:0]\n                                                   C4 = carry out')], {
    markingScheme: marking(['CLA principle and P/G definitions', 1.5], ['Four expanded carry equations', 2.5], ['Circuit and worked example', 2], ['Speed with fan-in qualification', 1]),
    examTip: 'Use XOR propagation consistently, expand C1–C4, and show P, G, carries and sum for the example.'
  });
export const importantCorrections = [cla];

const boothFlow = diagram('Booth multiplication flowchart',
  'START: A=0, Q=multiplier, M=multiplicand, Q-1=0, count=n\n                         |\n                   Inspect Q0,Q-1\n          01: A=A+M | 10: A=A-M | 00/11: unchanged\n                         |\n          Arithmetic right shift the combined [A,Q,Q-1]\n          Copy old A sign into new A MSB; count=count-1\n                         |\n              count > 0? --Yes--> inspect pair again\n                         No\n                  Product = [A,Q]; STOP');
const boothAnswer = (id, m, q, rows, product) => answer(id,
  `Booth’s algorithm multiplies signed two’s-complement operands using conditional addition/subtraction and arithmetic right shifts. For ${m} × (${q}), use six bits for each operand, giving a twelve-bit product.`, [
    section('Initialization and rules',
      `M = ${m.toString(2).padStart(6, '0')} (+${m}); −M = ${(64-m).toString(2)}; Q = ${(64+q).toString(2)} (${q}); A = 000000; Q−1 = 0; count = 6.`,
      'Inspect (Q0,Q−1) before each shift: 10 → A = A − M; 01 → A = A + M; 00 or 11 → no arithmetic. Perform arithmetic on the six-bit A register, then shift the complete [A,Q,Q−1] right once.',
      'An arithmetic right shift preserves A’s sign bit, transfers old A0 into Q5, and transfers old Q0 into Q−1. Repeat exactly six times.'),
    section('Product verification',
      `Final [A,Q] = ${product}; interpreted as twelve-bit two’s complement, its value is ${parseInt(product,2)} − 4096 = ${m*q}.`,
      `${m} × (${q}) = ${m*q}, so the binary register result agrees with decimal multiplication.`)
  ], [boothFlow], { table: table('Complete register trace (A after operation, then all registers after ASR)', ['Cycle','Q0 Q−1','Operation','A before ASR','A after ASR','Q after ASR','Q−1'], rows.map(r => r.map(String))) });

const ieeeSpecific = answer('coa-original-ieee754-binary32-negative-460-point-125',
  'IEEE 754 represents a binary floating-point number using a sign, a biased exponent and a fraction field. The requested number −460.125 is exactly representable in binary32.', [
    section('IEEE formats and value rules',
      'Binary32: 1 sign bit, 8 exponent bits, 23 stored fraction bits; bias = 127, giving 24 significant bits for normal values. Binary64: 1 sign, 11 exponent, 52 fraction bits; bias = 1023, giving 53 significant bits.',
      'For binary32 with 1 ≤ E ≤ 254, value = (−1)^S × (1 + F/2^23) × 2^(E−127). The leading 1 is implicit.',
      'E = 0, F = 0 encodes signed zero. E = 0 with F nonzero encodes subnormals: (−1)^S × (F/2^23) × 2^(−126). E = 255 with F = 0 means infinity; with F nonzero it means NaN.'),
    section('Convert −460.125',
      '460 = 256 + 128 + 64 + 8 + 4 = 111001100₂. The fraction 0.125 = 1/8 = 0.001₂.',
      'Thus −460.125 = −111001100.001₂ = −1.11001100001₂ × 2^8.',
      'Sign S = 1. Biased exponent E = 8 + 127 = 135 = 10000111₂.',
      'Remove the implicit leading 1 and pad the fraction to 23 bits: F = 11001100001000000000000.',
      'Final word: 1 | 10000111 | 11001100001000000000000 = 11000011111001100001000000000000₂ = 0xC3E61000.',
      'No rounding is needed: the normalized fraction has only eleven fractional binary places. Decoding the fields reconstructs −(1.11001100001₂) × 256 = −460.125.')
  ], [diagram('Single-precision fields', '31       30                  23 22                         0\nSign(1) | Exponent(8), bias 127 | Fraction(23), hidden 1\n   1    |       10000111        | 11001100001000000000000')]);

export const entries = [
  entry(['2022-105401-106401-q4a'], 5, answer('coa-original-cache-2022-mixed-word-width-geometry',
    'The statement mixes 16-bit cache words with “64K 32 bits” main memory. A consistent byte-addressed interpretation treats memory as 64K words of 32 bits each, and cache capacity as 4096 words of 16 bits each.', [
      section('Literal capacities and cache organization',
        'Use K = 1024 and byte addressing. Main memory = 65536 × 4 bytes = 262144 bytes = 256 KiB, requiring 18 address bits.',
        'Cache data capacity = 4096 × 2 bytes = 8192 bytes = 8 KiB. Block size = 4 × 2 = 8 bytes. Thus there are 8192/8 = 1024 lines.',
        'Two-way associativity means two lines per set, so sets = 1024/2 = 512 = 2^9. The block holds four 16-bit cache words, or equivalently two 32-bit main-memory words.'),
      section('Address fields and access',
        'Byte offset = log2(8) = 3 bits, split into a 2-bit 16-bit-word offset and a 1-bit byte offset. Set index = 9 bits. Tag = 18 − 9 − 3 = 6 bits.',
        'Address = [tag 6 | set 9 | 16-bit word 2 | byte 1]. If the CPU supplies a 32-bit-word address rather than a byte address, its 16-bit address is [tag 6 | set 9 | 32-bit-word offset 1].',
        'The set selects both ways. Compare the address tag against the valid tag of each way in parallel; a matching way supplies the selected word/byte. On a miss fetch the aligned eight-byte block and replace a line in that set.'),
      section('Alternative intended uniform-word interpretation',
        'If “16-bit” is a misprint and all 4096 cache words and four-word blocks are 32 bits, cache = 16 KiB and blocks = 16 bytes; lines remain 1024 and sets remain 512.',
        'With 256 KiB byte-addressed main memory, address = [tag 5 | set 9 | word 2 | byte 2]. In a 16-bit word-addressed convention it is [tag 5 | set 9 | word 2]. State this assumption rather than silently combining incompatible word sizes.')
    ], [diagram('Literal 16-bit cache-word organization', '18-bit byte address: [ Tag 6 | Set 9 | Word 2 | Byte 1 ]\n                                  |\n                          select 1 of 512 sets\n                   +--------------+--------------+\n                   | way 0        | way 1        |\n                   | valid/tag/8B | valid/tag/8B |\n                   +--------------+--------------+\n                   two tag comparators --> hit way --> data')]), [match('coa-q10','partial','Mapping theory is shared, but this mixed-width numerical geometry and address interpretation are absent.')]),

  entry(['2022-105401-106401-q5a'], 2, answer('coa-original-decimal-tens-complement-72530-minus-13250',
    'Use five decimal digits. Ten’s-complement subtraction replaces A − B by A plus the five-digit ten’s complement of B.', [
      section('Complement and addition',
        'For five digits, the modulus is 10^5 = 100000. The nine’s complement of 13250 is 86749; add 1 to obtain its ten’s complement 86750.',
        'Equivalently, C10(13250) = 100000 − 13250 = 86750.',
        'Add: 72530 + 86750 = 159280. A carry leaves the five-digit field; discard the leading 1 to obtain 59280.'),
      section('Interpretation and check',
        'This is modular complement arithmetic: 72530 + (100000 − 13250) = 100000 + (72530 − 13250). Removing the modulus leaves the positive difference.',
        'If no carry occurred in an unsigned subtraction, take the ten’s complement of the retained result and prefix a minus sign. This case has a carry and a nonnegative result.',
        'Therefore (72530 − 13250) = 59280. Check: 59280 + 13250 = 72530.',
        'The operands here are unsigned decimal magnitudes. If one instead imposed signed five-digit ten’s-complement encoding, 72530 would encode a negative value; that is not the requested subtraction of the displayed positive operands.')
    ], [diagram('Five-digit arithmetic', '  72530\n+ 86750   (ten\'s complement of 13250)\n-------\n 159280\n discard leading carry 1 --> 59280')])),

  entry(['2023-105401-q3a'], 5, answer('coa-original-cache-four-way-16kib-eight-32bit-words',
    'Assume byte-addressed memory and binary capacities: 4 GB means 4 GiB = 2^32 bytes, while 16 KB means 16 KiB.', [
      section('Determine blocks and sets',
        'Word size = 32 bits = 4 bytes. Each block contains 8 words, so block size = 8 × 4 = 32 bytes = 2^5 bytes.',
        'Cache lines = 16384/32 = 512 = 2^9. Four lines per set give 512/4 = 128 = 2^7 sets.'),
      section('Address partition',
        'The physical address has 32 bits. SET = 7 bits. WORD within block = log2(8) = 3 bits. BYTE within a 32-bit word = log2(4) = 2 bits.',
        'TAG = 32 − 7 − 3 − 2 = 20 bits. Full partition = [TAG 20 | SET 7 | WORD 3 | BYTE 2].',
        'If “WORD field” is used loosely for the complete block offset, report it as 5 bits = 3 word bits + 2 byte bits. The word-select field alone is 3 bits.',
        'For a word-addressed CPU there are 2^30 addressable 32-bit words; its 30-bit word address is [TAG 20 | SET 7 | WORD 3]. The tag stays 20 bits under either consistent convention.')
    ], [diagram('Byte-address fields and lookup', '[31........12 | 11.....5 | 4...2 | 1..0]\n    TAG 20       SET 7    WORD 3  BYTE 2\n                   |\n           one of 128 sets\n         [way0][way1][way2][way3]\n           four parallel tag checks')]), [match('coa-q10','partial','Set-associative explanation applies but the exact cache capacities and byte/word offsets require calculation.')]),

  reuse(['2023-105401-q5a','2025s-105401-q6a','2024s-105401-q4b'], 2, 'coa-q3', 'The corrected Important answer supplies the four-bit circuit, full P/G carry derivation, speed explanation and an explicit worked example; it also covers the shorter conceptual prompt.'),

  entry(['2023-105401-q5b'], 5, answer('coa-original-direct-cache-eight-lines-twenty-requests',
    'In an eight-line direct-mapped cache, main-memory block b can reside only in line b mod 8. Start with all lines invalid and replace the selected line on every miss.', [
      section('Trace all twenty requests',
        'For each request calculate b mod 8; a hit occurs only if that exact block is already in the selected line. The request numbers are memory block numbers, so do not divide them by a block size.',
        'The table shows each selected line and the block that it contains after the access. Repeated references can be misses if a conflicting block replaced the old content.'),
      section('Final cache state',
        'Lines 0 through 7 contain, respectively: [24, 17, 82, 3, 20, 5, 30, 63]. All eight lines are valid.',
        'Only accesses 16 (63), 17 (5), and 20 (24) are hits: 3 hits and 17 misses. Line 2 ends with 82 because 82 mod 8 = 2, replacing block 2 at access 18.')
    ], [diagram('Direct mapping', 'Memory block b --> line (b mod 8)\nFinal line:   0   1   2   3   4   5   6   7\nBlock:       24  17  82   3  20   5  30  63')], {table: table('Every request and selected line after access',['Access','Block','Line','Hit/Miss'],[[1,3,3,'M'],[2,5,5,'M'],[3,2,2,'M'],[4,8,0,'M'],[5,0,0,'M'],[6,63,7,'M'],[7,9,1,'M'],[8,16,0,'M'],[9,20,4,'M'],[10,17,1,'M'],[11,25,1,'M'],[12,18,2,'M'],[13,30,6,'M'],[14,24,0,'M'],[15,2,2,'M'],[16,63,7,'H'],[17,5,5,'H'],[18,82,2,'M'],[19,17,1,'M'],[20,24,0,'H']].map(r=>r.map(String)))}), [match('coa-q10','partial','Direct-mapping placement is shared, but this 20-request trace and final state are not answered there.')]),

  entry(['2023-105401-q7b'], 3, boothAnswer('coa-original-booth-six-bit-20-times-negative-19',20,-19,
    [[1,'10','A−M','101100','110110','010110',1],[2,'01','A+M','001010','000101','001011',0],[3,'10','A−M','110001','111000','100101',1],[4,'11','No op','111000','111100','010010',1],[5,'01','A+M','010000','001000','001001',0],[6,'10','A−M','110100','111010','000100',1]],'111010000100'),
    [match('coa-q5','partial','Booth rules are the same, but the Important example is −5 × 3, not 20 × −19.')]),

  entry(['2023-105401-q8a'], 6, answer('coa-original-pipeline-stage-split-throughput-800-to-600ps',
    'For an ideal pipeline, steady-state throughput is the reciprocal of the clock period, which is set by the slowest stage. Assume no stalls and no pipeline-register overhead, since none is specified.', [
      section('Original and redesigned periods',
        'Old stage delays: 800, 500, 400, 300 ps. Clock period T_old = max = 800 ps. Throughput_old = 1/(800 × 10^−12) = 1.25 × 10^9 tasks/s.',
        'Replacing the 800 ps stage with 600 ps and 350 ps gives five stages: 600, 350, 500, 400, 300 ps. T_new = 600 ps and throughput_new = 1.6667 × 10^9 tasks/s.'),
      section('Percentage increase and latency',
        'Throughput increase = [(TP_new − TP_old)/TP_old] × 100 = [(800/600) − 1] × 100 = 33⅓%.',
        'The clock period falls by 25%, but throughput rises by 33⅓%; these percentages have different denominators.',
        'The new pipeline has five stages instead of four. Ignoring register overhead, clocked first-task latency changes from 4 × 800 = 3200 ps to 5 × 600 = 3000 ps. The question asks steady-state throughput, so do not compare sums of logic delays.',
        'With a specified uniform register overhead r ps per stage, periods would be 800+r and 600+r; the increase would be 200/(600+r) × 100%.')
    ], [diagram('Bottleneck comparison', 'Old: [800] [500] [400] [300]       clock 800 ps\nNew: [600] [350] [500] [400] [300] clock 600 ps\nSteady state: one completed task per clock')]), [match('coa-q13','partial','Throughput formulas apply, but unequal stage delays and this split are not worked there.')]),

  reuse(['2023-105401-q8b'], 2, 'coa-q4', 'The existing answer explains binary32/binary64 fields, bias, normalized significands and the exact −13.625 conversion requested by this unrestricted example prompt.'),

  entry(['2024-105401-q3a'], 2, answer('coa-original-twos-complement-add-subtract-flowchart',
    'The question does not specify the signed encoding. Use fixed-width n-bit two’s-complement operands, with a common binary-point position for fixed-point values. The same adder performs addition and subtraction.', [
      section('Addition/subtraction algorithm',
        'Let control K = 0 for A+B and K = 1 for A−B. Form B′ = B XOR an n-bit mask of K, and set carry-in C0 = K.',
        'Compute the n-bit result R = A + B′ + K. For K = 0 this is A+B; for K = 1 it is A + complement(B) + 1 = A−B modulo 2^n.',
        'Discard carry-out from the stored signed result. Signed overflow V = carry into sign position XOR carry out of sign position.',
        'For addition, overflow occurs when operands have the same sign and the result has the opposite sign. For subtraction, overflow occurs when A and B have different signs and the result sign differs from A.'),
      section('Worked examples (eight bits)',
        '5 + (−3): A = 00000101, B = 11111101, K = 0. Sum = 1 00000010; store 00000010 = +2; V = 0.',
        '5 − 3: A = 00000101, B = 00000011, K = 1. B′ = 11111100; adding A+B′+1 gives 1 00000010 = +2; V = 0.',
        'Overflow example: 01111111 (+127) + 00000001 (+1) = 10000000 (−128). Equal positive input signs and a negative result imply V = 1.',
        'For a fixed-point binary scale 2^−f, the bit operations are unchanged; interpret the stored signed integer result divided by 2^f. Align binary points before arithmetic. One’s-complement and sign-magnitude encodings require their own rules.')
    ], [diagram('Combined addition/subtraction flowchart', 'START --> read A,B,n and operation\n             |\n      K=0 for ADD; K=1 for SUBTRACT\n             |\n      Bprime=B XOR {n copies of K}; C0=K\n             |\n      R=(A+Bprime+C0) modulo 2^n\n             |\n      V=C(n-1) XOR Cn\n             |\n      V=1? --> report signed overflow\n        No --> interpret R with common scale\n             |\n            STOP')])),

  entry(['2024-105401-q3b'], 2, answer('coa-original-eight-bit-cla-two-four-bit-groups',
    'A fast carry look-ahead adder calculates carries from generate/propagate signals instead of waiting for bit-by-bit ripple. An eight-bit design can be built from two four-bit CLA modules and group carry logic.', [
      section('Four-bit block equations',
        'Use Pi = Ai ⊕ Bi, Gi = AiBi and Si = Pi ⊕ Ci. Each four-bit block expands its internal carry equations; for example C1 = G0+P0C0 and C2 = G1+P1G0+P1P0C0.',
        'For the low block (bits 0–3): PL=P3P2P1P0; GL=G3+P3G2+P3P2G1+P3P2P1G0. Thus C4 = GL+PLC0.',
        'For the high block (bits 4–7): PH=P7P6P5P4; GH=G7+P7G6+P7P6G5+P7P6P5G4. Thus C8=GH+PHC4=GH+PHGL+PHPLC0.'),
      section('Connection and operation',
        'Feed A3…A0, B3…B0 and C0 to the low CLA; feed A7…A4, B7…B4 and group carry C4 to the high CLA. Their outputs concatenate as S7…S0 with carry-out C8.',
        'Inside the high module, C5=G4+P4C4; C6=G5+P5G4+P5P4C4; C7=G6+P6G5+P6P5G4+P6P5P4C4. Generate C4 directly from low P/G signals, rather than rippling through four low full adders.',
        'Example: 00101111 + 00000001 = 00110000. The low four-bit addition 1111+0001 yields S3…S0=0000 and C4=1; the high block adds 0010+0000+C4=0011.',
        'A simple cascade of two CLA blocks has a block-to-block carry dependency; the group look-ahead equation for C8 removes that output dependency. Additional hierarchy costs gates but avoids linear bitwise carry delay.')
    ], [diagram('Eight-bit circuit using two four-bit CLA modules', 'A[3:0],B[3:0] --> [4-bit CLA LOW] --> S[3:0]\nC0 --------------------^   | PL,GL\n                          v\n                [GROUP CARRY LOGIC] --> C8\n                   C4=GL+PL*C0\n                          |\nA[7:4],B[7:4] --> [4-bit CLA HIGH] --> S[7:4]\n                          | PH,GH --> group logic\nGroup C8=GH+PH*GL+PH*PL*C0')]), [match('coa-q3','partial','Four-bit CLA is covered, but the requested two-module eight-bit circuit and group carry equations need an extension.')]),

  entry(['2024-105401-q6a'], 6, answer('coa-original-pipeline-six-stages-100-tasks-speedup',
    'Compare the explicitly supplied 50 ns non-pipeline task time with the six-stage pipeline’s 10 ns clock. Include pipeline filling: the first task takes six clocks and each later task one clock.', [
      section('Execution times',
        'Number of tasks n = 100; stages k = 6; pipeline period τ = 10 ns. Assume independent tasks, no stalls, and that the stated period already includes any register overhead.',
        'Non-pipeline time T_non = 100 × 50 ns = 5000 ns.',
        'Pipeline clocks = k+n−1 = 6+100−1 = 105. Pipeline time T_pipe = 105 × 10 ns = 1050 ns.'),
      section('Speedup and interpretation',
        'Speedup = T_non/T_pipe = 5000/1050 = 100/21 ≈ 4.762.',
        'The first-task latency is 6×10=60 ns, although the non-pipeline latency is 50 ns. Overlap improves total completion time despite this extra per-task latency.',
        'Five extra clocks beyond n clocks account for pipeline filling and draining. As n grows, speedup approaches 50/10=5, rather than six.',
        'Do not apply nk/(n+k−1) with k=6 here: that ideal formula assumes the non-pipeline task time is kτ=60 ns; the question explicitly supplies 50 ns instead.')
    ], [diagram('Fill and overlap', 'Task 1: cycles   1 2 3 4 5 6\nTask 2: cycles     2 3 4 5 6 7\n...\nTask 100: cycles                 100 101 102 103 104 105\nLast completion: 105 clocks = 1050 ns')]), [match('coa-q13','partial','General pipeline timing is covered, but this baseline is 50 ns rather than kτ and requires its own numerical result.')]),

  entry(['2024-105401-q9b'], 2, answer('coa-original-fixed-point-versus-floating-point-representations',
    'Fixed point assigns a permanent binary-point position; floating point stores a significand and exponent so the point can effectively move. They trade numerical range, precision and hardware cost.', [
      section('Fixed-point representation',
        'For an n-bit two’s-complement stored integer I with f fractional bits, value x = I × 2^−f. The binary point is implied, not stored.',
        'Resolution is 2^−f, and range is −2^(n−f−1) through 2^(n−f−1)−2^−f. With n=8, f=4, range is −8 to 7.9375 and step is 0.0625.',
        'Example: 01011000 represents stored integer 88, so its value is 88/16=5.5, written 0101.1000. Negative −5.5 stores −88 as 10101000. The sign is interpreted by two’s complement.'),
      section('Floating-point representation',
        'For normal IEEE binary32, x=(−1)^S × (1.F) × 2^(E−127); fields have widths 1, 8 and 23. The leading 1 is implicit for normal numbers.',
        'Example: 5.5 = 101.1₂ = 1.011₂ × 2^2, so binary32 S=0, E=129=10000001 and F=01100000000000000000000; word=0x40B00000.',
        'Exponent scaling provides much greater range, while finite significand width causes rounding and unequal absolute spacing. Special encodings represent zeros, subnormals, infinities and NaNs.')
    ], [diagram('Implied versus exponent-controlled point', 'Fixed n=8,f=4: [signed integer bits 01011000] / 16 = 5.5\nFloating: [S 0 | E 10000001 | F 01100000000000000000000]\n                    1.011 x 2^2 = 5.5')], {table:table('Comparison',['Property','Fixed point','Floating point'],[['Scale','Fixed binary point','Stored exponent'],['Spacing','Uniform absolute step','Roughly uniform relative precision for normals'],['Range','Restricted for a chosen scale','Wide dynamic range'],['Arithmetic','Integer-like; explicit scale management','Alignment, normalization and rounding'],['Use','Embedded control and DSP with known scales','Scientific and general real-number calculations']])}), [match('coa-q4','partial','IEEE floating point is covered but fixed-point scaling, range and comparison are absent.')]),

  entry(['2024s-105401-q4a'], 3, answer('coa-original-restoring-division-eleven-by-three',
    'Restoring division repeatedly shifts the partial remainder/dividend pair, tries subtracting the divisor, and restores a negative trial remainder. For unsigned 11 ÷ 3, use a four-bit Q and five-bit A and M.', [
      section('Initialization and algorithm',
        'Dividend Q=1011₂ (11), divisor M=00011₂ (3), remainder A=00000, count=4. Reject divisor zero before starting.',
        'Each iteration: shift [A,Q] left one position; form trial A−M. If it is negative, set Q0=0 and restore A by adding M. Otherwise retain the trial and set Q0=1.',
        'Decrement count and repeat four times. The five-bit A allows negative trial values to be tested in two’s complement while Q remains four bits.'),
      section('Read the final result',
        'At termination Q=0011₂=3 and A=00010₂=2. Hence quotient=3, remainder=2.',
        'Check the division identity: 11 = 3×3+2 with 0 ≤ 2 &lt; 3. The trial −2 in cycle 1 must be restored; omitting restoration corrupts the next shift.')
    ], [diagram('Restoring division flowchart', 'START --> divisor=0? --Yes--> division error; STOP\n              No\n       A=0,Q=dividend,M=divisor,count=4\n              |\n         left shift [A,Q]\n         A=A-M\n              |\n        A negative?\n       Yes: Q0=0,A=A+M   No: Q0=1\n              |\n        count=count-1\n        count>0? --Yes--> left shift again\n              No\n        quotient Q, remainder A; STOP')], {table: table('All four restoring iterations',['Cycle','A,Q after shift','Trial A−M','Decision','Final A','Final Q'],[['1','00001,0110','11110 (−2)','Restore; Q0=0','00001','0110'],['2','00010,1100','11111 (−1)','Restore; Q0=0','00010','1100'],['3','00101,1000','00010 (+2)','Keep; Q0=1','00010','1001'],['4','00101,0010','00010 (+2)','Keep; Q0=1','00010','0011']])}), [match('coa-q6','partial','Restoring rules are shared, but 11÷3 register updates and a flowchart are needed for this exact prompt.')]),

  entry(['2024s-105401-q8b'], 5, answer('coa-original-direct-cache-16kib-256byte-tag-directory',
    'Use byte-addressed main memory, with KB interpreted as KiB. A direct-mapped cache stores one tag per cache line; data capacity and tag-directory capacity are distinct.', [
      section('Address-field calculation',
        'Main memory = 128 KiB = 2^17 bytes, requiring 17 address bits. Cache data capacity = 16 KiB = 2^14 bytes.',
        'Block size = 256 bytes = 2^8 bytes. Cache lines = 2^14/2^8 = 2^6 = 64. Therefore offset=8 bits, index=6 bits.',
        'Tag bits = 17−6−8 = 3. Address = [tag 3 | line 6 | byte offset 8]. Main memory contains 512 blocks, with 8 competing memory blocks for each cache line.'),
      section('Tag directory size',
        'Tag bits alone: 64 lines × 3 bits = 192 bits = 24 bytes.',
        'If the directory includes one valid bit per line, its size is 64×(3+1)=256 bits=32 bytes. State this common metadata convention explicitly.',
        'For a write-back cache that also stores one dirty bit per line, tag+valid+dirty=64×5=320 bits=40 bytes. No dirty bit is specified, and direct mapping requires no replacement-choice bits.',
        'Thus the requested answers are tag=3 bits and tag-only directory=192 bits; report 256 bits if valid status is included in the term “tag directory”.')
    ], [diagram('Address partition', '17-bit byte address\n[ tag 3 | line index 6 | byte offset 8 ]\n             |\n      64 cache lines\nEach: valid + 3-bit tag + 256-byte data')]), [match('coa-q10','partial','Direct mapping applies, but the numerical tag and directory sizes are absent.')]),

  entry(['2025-105401-q3a'], 2, answer('coa-original-number-representations-integers-fixed-floating-characters',
    'A bit pattern has meaning only after its encoding is specified. Computers represent signed integers, scaled fractions, floating-point values and text using different agreed interpretations.', [
      section('Signed integer encodings',
        'In sign-magnitude, the high bit is the sign and the remaining bits are magnitude. Eight-bit +5=00000101 and −5=10000101; range −127…127 with two zero patterns.',
        'In one’s complement, negate by complementing every bit: −5=11111010; range −127…127, again with +0 and −0. Addition uses end-around carry.',
        'In two’s complement, negate by complementing then adding one: −5=11111011; range −128…127, one zero, and the ordinary binary adder supports signed addition/subtraction.'),
      section('Fixed and floating point',
        'Fixed point: interpret a signed integer I with f fractional bits as I/2^f. With n=8,f=4, 01011000 means 88/16=5.5; step=1/16 and range −8…7.9375.',
        'Floating point: x=(−1)^S × significand × 2^e. IEEE binary32 uses sign/exponent/fraction widths 1/8/23 and bias127; binary64 uses 1/11/52 and bias1023.',
        'For example 5.5=1.011₂×2^2. Floating point gives wide dynamic range but most real numbers require rounding. Fixed point gives uniform absolute spacing and simpler arithmetic at a chosen scale.'),
      section('Character codes',
        'ASCII is a 7-bit character code (128 codes). For example uppercase A is decimal65 = 1000001₂; its usual eight-bit stored form is 01000001. Decimal digit character “5” is ASCII53 (00110101), not the integer5.',
        'Unicode assigns code points across writing systems; U+0041 identifies A. UTF-8 encodes a code point using one to four bytes and preserves ASCII byte values for ASCII characters.',
        'BCD stores each decimal digit separately in four bits: decimal59 is 0101 1001 in BCD, whereas the binary integer59 is 00111011. Character codes encode symbols rather than arithmetic magnitudes.')
    ], [diagram('One byte, multiple interpretations', '01000001\n  unsigned integer --> 65\n  ASCII/UTF-8      --> A\n  fixed point f=4 --> 65/16 = 4.0625\nThe encoding and scale determine the value.')]), [match('coa-q4','partial','IEEE details cover only the floating-point part, not signed integers, fixed point or character codes.')]),

  entry(['2025-105401-q3b'], 2, answer('coa-original-floating-arithmetic-normalization-rounding-exceptions',
    'Floating-point arithmetic operates on signed significands and exponents, then normalizes and rounds to the destination precision. Finite exponent and fraction fields limit both range and accuracy.', [
      section('Addition/subtraction and multiplication/division',
        'For addition/subtraction: unpack signs, exponents and significands; align exponents by right-shifting the smaller significand; add/subtract according to signs; normalize; round; check exceptions and pack.',
        'Example: 1.101₂×2^3 + 1.010₂×2^1 = (1.101 + 0.01010)₂×2^3 = 1.11110₂×2^3 = 15.5. The exponent difference is two, so the second significand shifts right twice.',
        'For multiplication, XOR operand signs, multiply significands, add true exponents, normalize and round. For division, XOR signs, divide significands and subtract true exponents. When working directly on biased exponents, subtract one bias for multiplication and add one bias for division.'),
      section('Normalization and rounding',
        'Normal binary values have significand 1.F. If an addition produces 10.x, shift right once and increment the exponent. After cancellation, shift left and reduce the exponent until the leading bit is 1, unless the result is zero or subnormal.',
        'Example: 1.1₂×2^2 + 1.1₂×2^2 = 11₂×2^2 = 1.1₂×2^3. Normalization preserves the value while changing significand and exponent.',
        'Finite precision discards trailing bits. Guard, round and sticky information lets hardware decide whether to increment the retained significand. Round-to-nearest, ties-to-even picks the closest value and, on an exact tie, the one with an even least-significant retained bit.',
        'At four significant bits, 1.0101₂ is halfway between 1.010₂ and 1.011₂, so ties-to-even gives 1.010₂; 1.0111₂ rounds to 1.100₂. Other rounding directions are toward zero, +infinity and −infinity.'),
      section('Overflow and underflow',
        'Overflow occurs when the rounded finite magnitude exceeds the largest representable finite value; for binary32 the largest finite value is (2−2^−23)×2^127. Depending on sign and rounding mode, the delivered value is an infinity or the largest finite value.',
        'Binary32 normal exponents range −126…127. Results below the smallest normal magnitude 2^−126 can use subnormals with reduced precision down to 2^−149; still smaller magnitudes can round to zero.',
        'A tiny exact subnormal does not automatically signal IEEE underflow: the default underflow condition combines tininess and inexactness. Subnormal encodings allow gradual underflow instead of an immediate jump from the smallest normal number to zero.')
    ], [diagram('Floating-point addition datapath', 'unpack --> compare exponents --> align smaller operand\n      --> signed significand add/subtract\n      --> normalize --> round (guard/round/sticky)\n      --> range/exception checks --> pack result')]), [match('coa-q4','partial','The format and bias are shared; arithmetic operations, rounding and range exceptions require this dedicated explanation.')]),

  entry(['2025-105401-q4a'], 3, answer('coa-original-shift-add-and-booth-multiplication-examples',
    'Unsigned shift-and-add multiplication accumulates shifted multiplicands for multiplier bits equal to one. Booth multiplication handles signed two’s-complement operands by recoding transitions between consecutive multiplier bits.', [
      section('Unsigned shift-and-add algorithm and example',
        'Initialize a 2n-bit product P=0, a zero-extended shifted multiplicand X=M, an n-bit multiplier Q and count=n. If Q0=1 add X to P. Shift X left, shift Q right logically and decrement count; repeat n times.',
        'Example 5×3 using n=4: M=0101 and Q=0011. Cycle1: Q0=1, P=00000101, then X=00001010,Q=0001. Cycle2: Q0=1, P=00001111, then X=00010100,Q=0000.',
        'Cycles3–4 add nothing because the remaining multiplier bits are0. Final P=00001111₂=15. The two selected partial products are 5 and 10. This simple version assumes unsigned inputs.'),
      section('Signed Booth algorithm and example',
        'Use n-bit A=0, signed M and Q, plus Q−1=0. Pair Q0Q−1=01 means A=A+M; 10 means A=A−M; 00 or11 means no addition. Arithmetic-right-shift [A,Q,Q−1] every cycle, preserving A’s sign; repeat n times.',
        'Example (−5)×3 in four bits: M=1011, −M=0101; initially A=0000,Q=0011,Q−1=0. The complete four-cycle trace is shown below.',
        'Final [A,Q]=11110001₂ = 241−256 = −15. Runs of multiplier1s are represented by subtraction at one boundary and addition at the other, reducing additions for some multiplier patterns.',
        'Booth does not always use fewer operations for every bit pattern. For a multiplicand equal to the most-negative n-bit value, use an extra sign bit to avoid the unrepresentable n-bit negation.')
    ], [boothFlow], {table:table('Four-bit Booth trace for −5×3',['Cycle','Pair','Operation','A before shift','A after shift','Q after shift','Q−1'],[['1','10','A−M','0101','0010','1001','1'],['2','11','None','0010','0001','0100','1'],['3','01','A+M','1100','1110','0010','0'],['4','00','None','1110','1111','0001','0']])}), [match('coa-q5','partial','The Important answer gives Booth with −5×3 but does not explain unsigned shift-and-add and its example.')]),

  entry(['2025-105401-q8b'], 2, answer('coa-original-sign-magnitude-ones-twos-complement-comparison',
    'Signed encodings specify how a bit string represents positive and negative integers. Sign-magnitude, one’s complement and two’s complement agree for nonnegative values but encode negatives differently.', [
      section('Definitions and examples',
        'For n bits, sign-magnitude uses one sign bit (0 positive,1 negative) and n−1 magnitude bits. Eight-bit +5=00000101 and −5=10000101.',
        'One’s complement negates by inverting all n bits: +5=00000101 and −5=11111010. Its all-zero word is +0 and its all-one word is −0.',
        'Two’s complement negates by inverting all bits and adding1 modulo2^n: −5=11111011. Numerically an n-bit word has value −b(n−1)2^(n−1)+Σ b(i)2^i for i=0…n−2.'),
      section('Arithmetic, advantages and limits',
        'Sign-magnitude makes sign extraction and negation simple, but signed addition must compare signs and sometimes subtract magnitudes. It has two zero encodings.',
        'One’s complement also permits simple bitwise negation but needs end-around carry after addition, and its two zeros complicate comparisons and zero detection.',
        'Two’s complement uses ordinary modulo binary addition, has one zero, and supports A−B=A+complement(B)+1. Its range is asymmetric: the most-negative value has no positive counterpart in the same width.',
        'For eight bits, −128=10000000 in two’s complement, but +128 is unrepresentable. Carry-out alone does not detect signed overflow; adding same-sign values with an opposite-sign result indicates overflow.')
    ], [diagram('Negating +5 in eight bits', '+5                  00000101\nsign-magnitude -5   10000101\none\'s complement   11111010  (invert)\ntwo\'s complement   11111011  (invert + 1)')], {table:table('n-bit signed integer encodings',['Feature','Sign-magnitude','One’s complement','Two’s complement'],[['Range','−(2^(n−1)−1)…+(2^(n−1)−1)','−(2^(n−1)−1)…+(2^(n−1)−1)','−2^(n−1)…2^(n−1)−1'],['Zeros','Two','Two','One'],['Negation','Flip sign bit','Invert all bits','Invert all bits, add1'],['Advantage','Easy sign/magnitude separation','Simple inversion negation','Simple arithmetic and unique zero'],['Disadvantage','Separate sign/magnitude arithmetic','End-around carry and dual zero','Asymmetric range; minimum negation overflow']])})),

  entry(['2025s-105401-q2a'], 2, answer('coa-original-ones-complement-fixed-point-addition-flowchart',
    'In signed one’s-complement fixed point, negative values are the bitwise complements of positive values. Operands must have the same n-bit width and binary-point scale. Addition requires end-around carry.', [
      section('Addition algorithm',
        'Read encoded A and B with common scale2^−f. Save their sign bits sA and sB. Add the complete n-bit words as unsigned patterns, retaining n low bits R and carry-out C.',
        'If C=1, add1 to the least-significant position of R (end-around carry). Fold any further carry similarly. If C=0 retain R.',
        'Check zero first: both 000…0 (+0) and 111…1 (−0) represent zero. Canonicalize either zero to 000…0. Zero is never reported as a sign-overflow result.',
        'For a nonzero corrected result, signed overflow occurs if sA=sB and sign(R) differs from sA. Opposite-sign operands cannot overflow. Flag overflow before interpreting an invalid wrapped result.'),
      section('Worked examples in eight bits',
        '+5 + (−3): 00000101 + 11111100 = 1 00000001. Fold carry: 00000001+1 = 00000010 = +2. A normal discarded carry would give the wrong answer +1.',
        '+3 + (−5): 00000011 + 11111010 = 11111101; no carry. Complementing the negative result gives magnitude00000010, so it represents−2.',
        '+5 + (−5): 00000101 + 11111010 = 11111111 = −0; canonicalize to+0.',
        'Overflow: +100 + +40 gives 01100100+00101000=10001100. Inputs are positive and the corrected nonzero result is negative; the true sum140 exceeds the eight-bit one’s-complement maximum127.',
        'With f fractional bits, divide the signed integer interpretation by2^f. End-around carry is still added at the least significant stored bit, whose weight is2^−f.')
    ], [diagram('Signed one’s-complement addition flowchart', 'START --> read A,B; align common binary point\n              |\n        save sA,sB; unsigned add A+B\n              |\n        R=low n bits, C=carry out\n              |\n        C=1? --Yes--> R=R+1; fold any new carry\n              |\n        R all-zero or all-one?\n          Yes --> R=+0, overflow=0 --> output\n          No\n              |\n        sA=sB AND sign(R) differs from sA?\n          Yes --> report signed overflow --> STOP\n          No  --> interpret R with common scale --> STOP')])),

  entry(['2025s-105401-q2b'], 3, boothAnswer('coa-original-booth-six-bit-30-times-negative-11',30,-11,
    [[1,'10','A−M','100010','110001','011010',1],[2,'01','A+M','001111','000111','101101',0],[3,'10','A−M','101001','110100','110110',1],[4,'01','A+M','010010','001001','011011',0],[5,'10','A−M','101011','110101','101101',1],[6,'11','No op','110101','111010','110110',1]],'111010110110'),
    [match('coa-q5','partial','The algorithm matches, but the Important answer computes −5×3, not the requested 30×−11.')]),

  entry(['2025s-105401-q3a'], 2, ieeeSpecific, [match('coa-q4','partial','The IEEE format explanation matches, but its numerical example is −13.625 instead of the required −460.125.')]),

  entry(['2025s-105401-q6b'], 5, answer('coa-original-page-replacement-three-frames-lru-optimal-twenty-refs',
    'Optimal replacement minimizes page faults for a known reference string by evicting the resident page whose next reference is farthest in the future, or which is never referenced again. LRU instead evicts the page used least recently in the past.', [
      section('Rules and assumptions',
        'Use three initially empty frames. The reference string has20 references: 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1. A miss into an empty frame counts as a page fault.',
        'On a hit, LRU updates recency; on a miss with full frames it evicts the oldest last-use page. OPT looks ahead after the current reference and evicts the page with the most distant next use.',
        'OPT is an offline lower bound used to evaluate practical replacement policies; future references are generally unavailable to an online operating system. If multiple pages are never used again, either may be evicted.'),
      section('Fault rates',
        'LRU faults at accesses1,2,3,4,6,8,9,10,11,14,16,18: 12 faults and8 hits. Fault rate=12/20=0.60=60%.',
        'OPT faults at accesses1,2,3,4,6,8,11,14,18: 9 faults and11 hits. Fault rate=9/20=0.45=45%.',
        'OPT saves3 faults for this string, a15 percentage-point lower fault rate. At access8 (page4), OPT evicts0 because its next use is access11, later than2 at9 and3 at10.',
        'The table lists frame slots in fixed order after each request. The displayed slot order is not LRU ordering; H means hit and F means page fault.')
    ], [diagram('Victim selection', 'LRU: past references --> least recent resident --> evict\nOPT: future references --> farthest next use --> evict\nBoth: use an empty frame before evicting a resident page')], {table:table('Complete three-frame replacement trace',['Access','Page','LRU frames','LRU','OPT frames','OPT'],[
      [1,7,'7,–,–','F','7,–,–','F'],[2,0,'7,0,–','F','7,0,–','F'],[3,1,'7,0,1','F','7,0,1','F'],[4,2,'2,0,1','F','2,0,1','F'],[5,0,'2,0,1','H','2,0,1','H'],[6,3,'2,0,3','F','2,0,3','F'],[7,0,'2,0,3','H','2,0,3','H'],[8,4,'4,0,3','F','2,4,3','F'],[9,2,'4,0,2','F','2,4,3','H'],[10,3,'4,3,2','F','2,4,3','H'],[11,0,'0,3,2','F','2,0,3','F'],[12,3,'0,3,2','H','2,0,3','H'],[13,2,'0,3,2','H','2,0,3','H'],[14,1,'1,3,2','F','2,0,1','F'],[15,2,'1,3,2','H','2,0,1','H'],[16,0,'1,0,2','F','2,0,1','H'],[17,1,'1,0,2','H','2,0,1','H'],[18,7,'1,0,7','F','7,0,1','F'],[19,0,'1,0,7','H','7,0,1','H'],[20,1,'1,0,7','H','7,0,1','H']
    ].map(r=>r.map(String)))}), [match('coa-q12','related','Virtual-memory paging is related, but LRU/OPT replacement policy and the requested reference-string calculation are not covered.')])
];

const boothHardware = diagram('Booth hardware datapath',
  '                  +-------------------------+\n                  | M: multiplicand register|\n                  +------------+------------+\n                               |\nA feedback ----------------> [ADD / SUB] <--- control\n                               |\n                               v\n                    [ A (n) | Q (n) | Q-1 ]\n                         combined arithmetic shift\n                               | Q0,Q-1\n                               v\n                [pair decoder + n-cycle counter]\n                 load A / shift / decrement / done');
const boothImportant = answer('coa-q5',
  'Booth multiplication computes a signed two’s-complement product with an adder/subtractor, registers and arithmetic shifts. It recodes the boundaries of runs of multiplier ones rather than adding a partial product for each one bit.', [
    section('Principle, hardware and control',
      'A run of ones can be expressed as a difference of powers of two: 001110₂ = 2^4−2^1. Its multiplication contribution can therefore be formed by one subtraction and one addition at the run boundaries.',
      'The datapath contains n-bit multiplicand M, n-bit accumulator A, n-bit multiplier Q, one-bit Q−1, an adder/subtractor, a shared arithmetic-right-shift path and a counter initialized to n.',
      'Initially A=0,Q−1=0. Inspect Q0Q−1: 01 → A=A+M; 10 → A=A−M; 00 or11 → no arithmetic. Then arithmetic-right-shift [A,Q,Q−1], decrement count and repeat until zero.',
      'The shift copies old A’s sign into the new sign position, moves A0 into the top of Q, and moves Q0 into Q−1. The final 2n-bit product is [A,Q].'),
    section('Multiply (−5) by (+3), with all four register transitions',
      'Choose n=4: M=1011 (−5), −M=0101 (+5), Q=0011 (+3), A=0000,Q−1=0. The table records A immediately after the chosen arithmetic and all registers after the shift.',
      'Cycle1 pair10: A=0000−1011=0101 modulo16; shift produces A=0010,Q=1001,Q−1=1.',
      'Cycle2 pair11: no operation; shift produces A=0001,Q=0100,Q−1=1.',
      'Cycle3 pair01: A=0001+1011=1100; sign-preserving shift produces A=1110,Q=0010,Q−1=0.',
      'Cycle4 pair00: no operation; shift produces A=1111,Q=0001,Q−1=0.',
      'Product [A,Q]=11110001₂; its signed value is241−256=−15, agreeing with (−5)×3. The extra Q−1 bit is not part of the product.'),
    section('Representation limits',
      'Use enough bits for both operands. If the multiplicand is the most-negative n-bit number, its negation does not fit n bits: sign-extend operands and the arithmetic register to an adequate larger width before applying the basic algorithm.',
      'Booth reduces additions for long runs of ones, but does not guarantee fewer arithmetic operations for every multiplier. It still executes n shift cycles for this radix-2 algorithm.')
  ], [boothHardware,boothFlow], {
    table: table('Booth register trace for −5×3',['Cycle','Pair','Operation','A before shift','A after shift','Q after shift','Q−1'],[['1','10','A−M','0101','0010','1001','1'],['2','11','None','0010','0001','0100','1'],['3','01','A+M','1100','1110','0010','0'],['4','00','None','1110','1111','0001','0']]),
    markingScheme:marking(['Booth principle and pair rules',1.5],['Hardware datapath and loop flowchart',2],['Complete −5×3 register transitions',2.5],['Signed product verification and limits',1]),
    examTip:'Draw both hardware and control flow. Inspect the bit pair before arithmetic, then shift the whole register chain while preserving A’s sign.'
  });

const divisionImportant = answer('coa-q6',
  'Restoring and non-restoring division generate one quotient bit per iteration using shifts and trial addition/subtraction. Restoring immediately undoes a negative subtraction; non-restoring carries the negative partial remainder into the next iteration.', [
    section('Shared hardware and initialization',
      'For an n-bit unsigned dividend, use Q (n bits) for dividend/quotient, A (n+1 bits) for a signed partial remainder, M (n+1 bits) for the zero-extended divisor, an adder/subtractor, a combined left-shift path, a sign detector and an n-cycle counter.',
      'Check divisor zero first. Initialize A=0,Q=dividend,M=divisor,count=n. The wider A supports negative trial remainders without confusing the operand width.'),
    section('Restoring division algorithm and worked updates',
      'Repeat n times: left-shift [A,Q], subtract M from A. If A is negative, restore A=A+M and set Q0=0; otherwise retain A and set Q0=1. Decrement count.',
      'Example11÷3: n=4,Q=1011,M=00011,A=00000. Cycle1: shift gives A=00001,Q=0110; subtract gives11110 (−2); restore to00001, Q=0110.',
      'Cycle2: shift A=00010,Q=1100; trial11111 (−1); restore A=00010,Q=1100.',
      'Cycle3: shift A=00101,Q=1000; trial00010 (+2); keep and set Q0=1, yielding A=00010,Q=1001.',
      'Cycle4: shift A=00101,Q=0010; trial00010 (+2); keep and set Q0=1, yielding A=00010,Q=0011.'),
    section('Non-restoring division algorithm and worked updates',
      'Save the sign of A before the shift. If old A is nonnegative, left-shift [A,Q] and subtract M; if old A is negative, left-shift [A,Q] and add M. Set Q0=1 if the new A is nonnegative, otherwise0. Decrement count and repeat n times.',
      'After all n cycles, if A remains negative, perform the final correction A=A+M. This correction leaves the quotient unchanged.',
      'For11÷3 with the same initial registers: cycle1 old A≥0, shift gives00001,0110; subtract3 gives A=11110 (−2),Q=0110.',
      'Cycle2 old A&lt;0, signed shift gives A=11100 (−4),Q=1100; add3 gives A=11111 (−1),Q=1100.',
      'Cycle3 old A&lt;0, signed shift gives A=11111 (−1),Q=1000; add3 gives A=00010 (+2),set Q0=1,Q=1001.',
      'Cycle4 old A≥0, shift gives A=00101 (+5),Q=0010; subtract3 gives A=00010 (+2),set Q0=1,Q=0011. No final correction is required in this example.',
      'Both algorithms return quotient0011=3 and remainder00010=2. Check11=3×3+2 and0≤2&lt;3.')
  ], [diagram('Shared division hardware',
    '[ M divisor register, n+1 bits ]\n                |\n                v\nA feedback --> [ADD/SUB] --> A register\n                             |\n                         [ A | Q ] <--- combined LEFT shift\n                             |\n                       sign detector\n                             |\n              [control + n-cycle counter] --> Q0, add/sub, shift\nQ initially dividend; finally quotient. A finally remainder.'),
    diagram('Restoring control flowchart',
      'START --> reject M=0 --> initialize A=0,Q,M,count=n\n                            |\n                     left shift [A,Q]\n                     A=A-M\n                            |\n                   A negative?\n          Yes: A=A+M,Q0=0 | No: Q0=1\n                            |\n                     count=count-1\n               count>0? --Yes--> left shift again\n                            No\n                  return Q quotient,A remainder'),
    diagram('Non-restoring control flowchart',
      'START --> reject M=0 --> initialize A=0,Q,M,count=n\n                            |\n                      save old sign(A)\n                      left shift [A,Q]\n                            |\n         old A>=0: A=A-M | old A<0: A=A+M\n                            |\n                new A>=0? Q0=1 : Q0=0\n                count=count-1\n                count>0? --Yes--> save old sign again\n                            No\n                A<0? --Yes--> A=A+M (final correction)\n                            |\n                  return Q quotient,A remainder')], {
    table:table('Comparison',['Property','Restoring','Non-restoring'],[['Negative trial','Restore immediately by adding M','Retain negative partial remainder'],['Core arithmetic per cycle','One subtraction plus conditional restoration','One addition or subtraction'],['Final remainder fix','Already nonnegative','Conditional addition of M'],['Control','Sign check and conditional restore','Prior-sign selection and final correction'],['Hardware/performance','Extra restore operation on failed trial','Avoids immediate restores; actual speed depends on implementation']]),
    markingScheme:marking(['Shared hardware and initialization',1.5],['Restoring algorithm, flowchart and updates',2],['Non-restoring algorithm, flowchart and updates',2.5],['Comparison and result check',1]),
    examTip:'In non-restoring division, use the sign before shifting to choose add/subtract, and the sign after arithmetic to choose Q0. Include the final correction test.'
  });
importantCorrections.push(boothImportant,divisionImportant);
