// BEU Model Solutions - COA Unit 3
export const unit3Solutions = [
  {
    "id": "coa-q5",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Booth’s Multiplication Algorithm is an efficient hardware multiplication technique for signed binary integers represented in 2’s complement form. It treats multi-bit strings of consecutive 1s as a single subtraction and addition (e.g., 0111_2 = +7 = 2^3 - 2^0), substantially reducing arithmetic operations.",
    "diagrams": [
      {
        "title": "Booth Algorithm Hardware Datapath & Register Architecture",
        "ascii": "      +-------------------------------------------+\n      |               Multiplicand (M)            |\n      +---------------------+---------------------+\n                            |\n                            v\n+------------------+------------------+----------+\n| Accumulator (A)  |  Multiplier (Q)  | Q(-1)    |\n| [Initially 0000] |  [e.g., 0011]    | [Init 0] |\n+--------+---------+--------+---------+----+-----+\n         |                  |              |\n         +-------------+----+--------------+\n                       |\n                       v\n         +-----------------------------+\n         | Control Logic examines:     |\n         | (Q0, Q-1) bit pair          |\n         |  00 -> Arithmetic Shift Rt  |\n         |  01 -> A <- A + M, then ASR |\n         |  10 -> A <- A - M, then ASR |\n         |  11 -> Arithmetic Shift Rt  |\n         +-----------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Booth Algorithm Rules and Decision Logic",
        "points": [
          "Registers: A (Accumulator, initialized to 0), M (Multiplicand), Q (Multiplier), Q(-1) (extra 1-bit flip-flop, initialized to 0), Count (number of bits n).",
          "In each cycle, inspect the least significant bit of Q (Q0) and Q(-1):",
          "• <b>Q0 Q(-1) = 10:</b> Subtract M from A (A <- A - M = A + 2's complement of M), then Arithmetic Shift Right (ASR) [A, Q, Q(-1)].",
          "• <b>Q0 Q(-1) = 01:</b> Add M to A (A <- A + M), then Arithmetic Shift Right (ASR) [A, Q, Q(-1)].",
          "• <b>Q0 Q(-1) = 00 or 11:</b> No arithmetic operation; perform Arithmetic Shift Right (ASR) [A, Q, Q(-1)] only.",
          "Decrement Count. Repeat until Count = 0."
        ]
      },
      {
        "heading": "2. Numerical Trace: Multiply (-5) by (+3) in 5-bit 2’s Complement",
        "points": [
          "Multiplicand M = -5 = 11011_2; -M = +5 = 00101_2.",
          "Multiplier Q = +3 = 00011_2. Count = 5. Initial A = 00000, Q(-1) = 0.",
          "<b>Step 1 (Q0=1, Q-1=0 -> A = A - M):</b> A = 00000 + 00101 = 00101. ASR [A, Q, Q-1] -> A = 00010, Q = 10001, Q(-1) = 1. Count = 4.",
          "<b>Step 2 (Q0=1, Q-1=1 -> No Op):</b> ASR -> A = 00001, Q = 01000, Q(-1) = 1. Count = 3.",
          "<b>Step 3 (Q0=0, Q-1=1 -> A = A + M):</b> A = 00001 + 11011 = 11100. ASR -> A = 11110, Q = 00100, Q(-1) = 0. Count = 2.",
          "<b>Step 4 (Q0=0, Q-1=0 -> No Op):</b> ASR -> A = 11111, Q = 00010, Q(-1) = 0. Count = 1.",
          "<b>Step 5 (Q0=0, Q-1=0 -> No Op):</b> ASR -> A = 11111, Q = 10001, Q(-1) = 0. Count = 0.",
          "Combined Result [A, Q] = 1111110001_2.",
          "Verification: 1111110001_2 in 10-bit 2's complement has sign bit 1. Value = -(2's complement of 1111110001) = -(0000001111_2) = -15_10. Correct (-5 × +3 = -15)."
        ]
      }
    ],
    "conclusion": "Booth’s algorithm natively handles signed multiplicands and multipliers without prior sign-magnitude conversion, making it the industry standard for fast arithmetic units.",
    "markingScheme": [
      {
        "component": "Booth Algorithm Principle & Mathematical Basis",
        "marks": 1
      },
      {
        "component": "Hardware Datapath Architecture & Decision Table",
        "marks": 2
      },
      {
        "component": "Step-by-Step Execution Table for (-5) × (+3)",
        "marks": 3
      },
      {
        "component": "Binary Verification & Sign Handling Conclusion",
        "marks": 1
      }
    ],
    "examTip": "Carefully maintain the sign bit during Arithmetic Shift Right (ASR): the leftmost bit of A replicates itself. Show the final 2’s complement verification to confirm -15."
  },
  {
    "id": "coa-q6",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Binary division in computer arithmetic is performed using iterative shift-and-subtract hardware algorithms. The two primary classical approaches are Restoring Division and Non-Restoring Division.",
    "table": {
      "title": "Restoring vs Non-Restoring Division Comparison",
      "headers": [
        "Comparison Metric",
        "Restoring Division",
        "Non-Restoring Division"
      ],
      "rows": [
        [
          "Negative Remainder Action",
          "Requires restoring A <- A + M",
          "No restore; adds M in the next cycle"
        ],
        [
          "Arithmetic Operations per Cycle",
          "1 subtraction + conditional 1 addition",
          "Exactly 1 addition or subtraction per cycle"
        ],
        [
          "Hardware Speed",
          "Slower due to variable restoring step",
          "Faster, constant execution time per bit"
        ],
        [
          "Control Complexity",
          "Simpler state machine",
          "Slightly more complex control logic"
        ],
        [
          "Final Remainder Correction",
          "Not needed (already restored)",
          "Conditional restore needed if final A < 0"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Restoring Division Algorithm",
        "points": [
          "Registers: A (initialized to 0), M (Divisor), Q (Dividend), Count (n bits).",
          "<b>Cycle Steps:</b>",
          "1. Shift left [A, Q] by 1 bit position.",
          "2. Subtract Divisor: A <- A - M.",
          "3. Check sign of A (most significant bit A_n):",
          "   • If A >= 0 (A_n = 0): Set Q0 = 1 (subtraction successful).",
          "   • If A < 0 (A_n = 1): Set Q0 = 0, and RESTORE: A <- A + M.",
          "4. Decrement count. Repeat until Count = 0. Final quotient is in Q, remainder in A."
        ]
      },
      {
        "heading": "2. Non-Restoring Division Algorithm",
        "points": [
          "Eliminates the performance-degrading restore addition by carrying the negative remainder state into the subsequent shift cycle.",
          "<b>Cycle Steps:</b>",
          "1. If A >= 0: Shift left [A, Q], then A <- A - M.",
          "   If A < 0: Shift left [A, Q], then A <- A + M.",
          "2. Evaluate new sign of A:",
          "   • If A >= 0: Set Q0 = 1.",
          "   • If A < 0: Set Q0 = 0.",
          "3. Decrement count. Repeat until Count = 0.",
          "4. <b>Final Correction:</b> If final A < 0, perform A <- A + M to leave the remainder positive."
        ]
      }
    ],
    "conclusion": "Non-restoring division optimizes hardware throughput by avoiding backtracking additions, reducing average clock cycles per bit in high-performance arithmetic processors.",
    "markingScheme": [
      {
        "component": "Division Algorithm Concepts & Register Roles (A, M, Q)",
        "marks": 1
      },
      {
        "component": "Detailed Step-by-Step Restoring Division Flow & Algorithm",
        "marks": 2
      },
      {
        "component": "Detailed Step-by-Step Non-Restoring Division Flow & Algorithm",
        "marks": 2
      },
      {
        "component": "Comprehensive Comparison Table & Final Correction Analysis",
        "marks": 2
      }
    ],
    "examTip": "Remember that in Non-Restoring division, if A is negative after the last step, one final addition (A <- A + M) is mandatory. Mention this edge case to score full marks."
  }
];
