import { coaOriginalSolutionsByUnit, coaImportantCorrectionsById } from './original.mjs';
// BEU Model Solutions - COA Unit 2
export const unit2Solutions = [...coaOriginalSolutionsByUnit[2], {
    "id": "coa-q3",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Carry Look-Ahead Adder (CLA) is a high-speed parallel binary adder designed to eliminate the sequential carry-propagation delay inherent in conventional Ripple Carry Adders (RCA). It computes all stage carries simultaneously in parallel using Carry Generate (Gi) and Carry Propagate (Pi) Boolean logic.",
    "sections": [
      {
        "heading": "1. Mathematical Derivation of Gi and Pi Terms",
        "points": [
          "For two n-bit binary inputs A = (A3, A2, A1, A0) and B = (B3, B2, B1, B0):",
          "<b>Carry Generate (Gi):</b> A stage generates an output carry independently of input carry if both input bits are 1: <code>Gi = Ai · Bi</code>",
          "<b>Carry Propagate (Pi):</b> A stage propagates an incoming carry to the next stage if at least one input bit is 1: <code>Pi = Ai ⊕ Bi</code> (or <code>Pi = Ai + Bi</code>)",
          "The sum and carry outputs at stage i are given by: <code>Si = Pi ⊕ Ci</code> and <code>C(i+1) = Gi + Pi · Ci</code>"
        ]
      },
      {
        "heading": "2. Unrolled Boolean Expressions for 4-Bit CLA Carries",
        "points": [
          "Substituting recursively to express all carries in terms of base carry C0 and inputs:",
          "<code>C1 = G0 + P0 · C0</code>",
          "<code>C2 = G1 + P1 · C1 = G1 + P1 · G0 + P1 · P0 · C0</code>",
          "<code>C3 = G2 + P2 · C2 = G2 + P2 · G1 + P2 · P1 · G0 + P2 · P1 · P0 · C0</code>",
          "<code>C4 = G3 + P3 · C3 = G3 + P3 · G2 + P3 · P2 · G1 + P3 · P2 · P1 · G0 + P3 · P2 · P1 · P0 · C0</code>",
          "Each carry Ci is expressed as a two-level AND-OR Boolean function, allowing all carries C1, C2, C3, C4 to be generated simultaneously after only two gate delays."
        ]
      },
      {
        "heading": "3. Speed Advantage over Ripple Carry Adder",
        "points": [
          "<b>Ripple Carry Adder Delay:</b> Total propagation delay for an n-bit RCA is <code>T_RCA = 2n · t_gate</code> (where t_gate is single gate delay). For 4 bits, delay = 8 gate delays; for 32 bits, delay = 64 gate delays.",
          "<b>Carry Look-Ahead Adder Delay:</b> Pi and Gi generation takes 1 gate delay. Look-ahead carry logic takes 2 gate delays (one AND level, one OR level). Final sum Si takes 1 gate delay. Total delay <code>T_CLA = 4 · t_gate</code>, which is constant O(1) regardless of word length (bounded by gate fan-in limits)."
        ]
      }
    ],
    "conclusion": "Carry Look-Ahead Adders achieve dramatic speedup in modern arithmetic logic units by decoupling carry propagation from stage-by-stage sequential ripple, reducing addition delay from linear O(n) to constant/hierarchical time.",
    "markingScheme": [
      {
        "component": "CLA Concept & Limitation of Ripple Carry Adder",
        "marks": 1
      },
      {
        "component": "Derivation of Gi and Pi Expressions",
        "marks": 1.5
      },
      {
        "component": "Complete Expansion of C1, C2, C3, C4 Equations",
        "marks": 2.5
      },
      {
        "component": "Delay Calculation & Proof of Speed Advantage over RCA",
        "marks": 2
      }
    ],
    "examTip": "Write out the full expanded equations for C1 to C4 without skipping steps. Highlight that C4 depends directly on C0, G0-G3, and P0-P3, proving constant two-level gate delay."
  },
  {
    "id": "coa-q4",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The IEEE 754 standard defines the universal binary interchange formats and rounding rules for floating-point arithmetic in modern computers, establishing uniform representations for real numbers across different hardware architectures.",
    "table": {
      "title": "IEEE 754 Floating-Point Format Comparison",
      "headers": [
        "Format Specification",
        "Single-Precision (32-bit Binary32)",
        "Double-Precision (64-bit Binary64)"
      ],
      "rows": [
        [
          "Sign Bit (S)",
          "1 bit (Bit 31: 0 for +, 1 for -)",
          "1 bit (Bit 63: 0 for +, 1 for -)"
        ],
        [
          "Biased Exponent (E)",
          "8 bits (Bits 30-23)",
          "11 bits (Bits 62-52)"
        ],
        [
          "Fraction / Mantissa (F)",
          "23 bits (Bits 22-0)",
          "52 bits (Bits 51-0)"
        ],
        [
          "Bias Value",
          "127 (2^(8-1) - 1)",
          "1023 (2^(11-1) - 1)"
        ],
        [
          "True Exponent Range",
          "-126 to +127",
          "-1022 to +1023"
        ],
        [
          "Value Formula",
          "For normal finite values: (-1)^S × (1.F) × 2^(E - 127)",
          "For normal finite values: (-1)^S × (1.F) × 2^(E - 1023)"
        ],
        [
          "Special Values",
          "E=0, F=0: ±0; E=0, F≠0: subnormal, (-1)^S × (0.F) × 2^-126; E=255, F=0: ±∞; E=255, F≠0: NaN",
          "E=0, F=0: ±0; E=0, F≠0: subnormal, (-1)^S × (0.F) × 2^-1022; E=2047, F=0: ±∞; E=2047, F≠0: NaN"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Architectural Breakdown of Fields",
        "points": [
          "<b>Sign Bit (S):</b> Single bit indicating the sign of the real number: S = 0 represents positive, S = 1 represents negative.",
          "<b>Biased Exponent (E):</b> Stored as an unsigned biased integer to simplify hardware comparisons without signed sign-magnitude arithmetic. Bias is added to the actual exponent e: E = e + Bias.",
          "<b>Normalized Mantissa (1.F):</b> In normalized form, the significand is shifted so that exactly one non-zero binary digit precedes the binary point (1.b1b2b3...). Because this leading 1 is always present for normalized numbers, it is omitted from storage (hidden/implicit bit), effectively providing 24 bits of precision in 32-bit format and 53 bits in 64-bit format. When E = 0 and F ≠ 0, the value is subnormal: it uses 0.F and has no hidden leading 1."
        ]
      },
      {
        "heading": "2. Step-by-Step Conversion Example",
        "points": [
          "Convert real number -13.625 to IEEE 754 Single-Precision format:",
          "1. Sign: Number is negative -> S = 1.",
          "2. Binary conversion: 13 = 1101_2; 0.625 × 2 = 1.25 (1), 0.25 × 2 = 0.5 (0), 0.5 × 2 = 1.0 (1) -> 0.625 = .101_2. Total = -1101.101_2.",
          "3. Normalization: 1101.101 = 1.101101 × 2^3 -> true exponent e = 3.",
          "4. Biased Exponent: E = 3 + 127 = 130 = 10000010_2.",
          "5. Mantissa F: 10110100000000000000000 (pad to 23 bits).",
          "6. Final 32-bit Hex representation: [1][10000010][10110100000000000000000] = 0xC15A0000."
        ]
      }
    ],
    "conclusion": "The IEEE 754 standard ensures maximum numerical precision and dynamic range through implicit normalization, excess bias notation, and dedicated bit patterns for infinity and NaN conditions.",
    "markingScheme": [
      {
        "component": "IEEE 754 Purpose & Architecture Overview",
        "marks": 1
      },
      {
        "component": "Detailed Field Breakdown (Sign, Exponent, Mantissa, Hidden Bit)",
        "marks": 2
      },
      {
        "component": "Comprehensive Comparison Table (Single vs Double Precision)",
        "marks": 2
      },
      {
        "component": "Step-by-Step Numerical Worked Example with Hex Output",
        "marks": 2
      }
    ],
    "examTip": "Show both the theoretical bit-field layout and a concrete numerical conversion (like -13.625). Always mention the implicit leading 1 of the normalized mantissa."
  }
].map(answer => coaImportantCorrectionsById[answer.id] || answer);
