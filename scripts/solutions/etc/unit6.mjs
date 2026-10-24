// BEU Model Solutions - ETC Unit 6
export const unit6Solutions = [
  {
    "id": "etc-q16",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Engineering Ethics comprises the moral principles, professional values, and formal behavioral codes governing engineering practitioners to ensure technological solutions safeguard public health, safety, and welfare above commercial interests.",
    "diagrams": [
      {
        "title": "The Hierarchy of Professional Engineering Obligations",
        "ascii": "                      +-----------------------------+\n                      |   1. PUBLIC SAFETY & HEALTH  |\n                      |   (Absolute First Priority) |\n                      +--------------+--------------+\n                                     |\n                                     v\n                      +-----------------------------+\n                      |   2. CLIENT & EMPLOYER      |\n                      |   (Fiduciary Duty, IP, NDA) |\n                      +--------------+--------------+\n                                     |\n                                     v\n                      +-----------------------------+\n                      |   3. THE PROFESSION & PEERS |\n                      |   (Integrity, Fair Credit)  |\n                      +-----------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Fundamental Canons of the IEEE Code of Ethics",
        "points": [
          "<b>Public Safety and Environmental Protection:</b> Hold paramount the safety, health, and welfare of the public, and strive to comply with ethical design and sustainable practices.",
          "<b>Avoiding Conflicts of Interest:</b> Promptly disclose real or perceived conflicts of interest to affected parties, avoiding decisions compromised by personal gain.",
          "<b>Honesty and Realism in Technical Claims:</b> Be honest and realistic in stating claims or estimates based on available data, avoiding false or misleading specifications.",
          "<b>Rejecting Bribery and Corruption:</b> Refuse bribery, kickbacks, and corrupt incentives in all engineering contracting and product evaluations.",
          "<b>Promoting Fair Treatment & Professional Growth:</b> Treat all persons fairly and respectfully, avoid unlawful discrimination, and assist colleagues in professional development."
        ]
      },
      {
        "heading": "2. ACM Code of Ethics and Professional Conduct",
        "points": [
          "<b>Contribute to Society and Human Well-Being:</b> Acknowledge that all people are stakeholders in computing systems.",
          "<b>Avoid Harm:</b> Mitigate unintended negative consequences of software systems, such as automated algorithmic bias or cyber vulnerabilities.",
          "<b>Respect Privacy:</b> Only collect necessary personal data and protect user confidentiality vigorously.",
          "<b>Honor Property Rights:</b> Strictly avoid software piracy, reverse-engineering protected IP without authorization, or violating open-source software licenses."
        ]
      }
    ],
    "conclusion": "Adhering to IEEE and ACM ethical canons ensures that engineers maintain public trust and use technological power to build safe, equitable, and honest systems.",
    "markingScheme": [
      {
        "component": "Engineering Ethics Definition & Paramount Canon (Public Safety)",
        "marks": 1.5
      },
      {
        "component": "Key IEEE Canons (Safety, Conflict of Interest, Honesty, Bribery)",
        "marks": 2.5
      },
      {
        "component": "ACM Computing Canons (Societal Well-Being, Harm Avoidance, Privacy)",
        "marks": 2
      },
      {
        "component": "Hierarchy of Obligations Diagram",
        "marks": 1
      }
    ],
    "examTip": "Cite the exact phrase: \"Hold paramount the safety, health, and welfare of the public.\" Name both the IEEE and ACM codes and detail at least 4 specific canons."
  },
  {
    "id": "etc-q17",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Software engineers bear profound ethical responsibilities because modern digital systems manage critical life-support, financial infrastructure, and private citizen data. Three paramount ethical dimensions are User Data Privacy, Software Safety/Reliability, and Intellectual Property Rights.",
    "table": {
      "title": "Core Ethical Responsibilities in Software Engineering Practice",
      "headers": [
        "Ethical Dimension",
        "Core Moral Obligation",
        "Engineering Safeguards & Standards"
      ],
      "rows": [
        [
          "1. User Data Privacy",
          "Protect personal identifiable information (PII) from unauthorized harvesting, surveillance, or leakage",
          "Implement Privacy-by-Design, end-to-end encryption (AES-256), GDPR compliance, and data minimization."
        ],
        [
          "2. Software Safety & Reliability",
          "Ensure mission-critical systems do not cause injury, loss of life, or economic devastation due to bugs",
          "Rigorous TDD/BDD testing, formal verification, static security audits, and failsafe graceful degradation."
        ],
        [
          "3. Intellectual Property (IP)",
          "Respect software patents, proprietary copyrights, and open-source license terms (GPL, MIT, Apache)",
          "Strict dependency license auditing, avoiding unauthorized code copying, and giving proper attribution."
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. In-Depth Analysis: The Therac-25 & Boeing 737 MAX Lessons",
        "points": [
          "<b>Software Safety Case Studies:</b> The Therac-25 radiation therapy disasters demonstrated that software race conditions without hardware interlocks can inflict fatal radiation overdoses. Similarly, the Boeing 737 MAX MCAS failure demonstrated how relying on a single angle-of-attack sensor without redundant sensor fusion and thorough pilot documentation leads to catastrophe.",
          "<b>Whistleblowing Obligations:</b> When an engineer discovers an unresolved safety defect that management refuses to fix, professional codes mandate escalating the concern through engineering channels, ethics committees, and if necessary, external safety regulatory agencies."
        ]
      },
      {
        "heading": "2. Privacy and Algorithmic Bias",
        "points": [
          "Engineers must audit machine learning models to prevent discriminatory demographic bias in facial recognition, hiring algorithms, and automated credit scoring systems."
        ]
      }
    ],
    "conclusion": "Software engineering is a public trust; engineers must champion data privacy, rigorous safety verification, and legal IP compliance to protect society from technological harm.",
    "markingScheme": [
      {
        "component": "Introduction & The 3 Ethical Dimensions Identified",
        "marks": 1.5
      },
      {
        "component": "Detailed Examination of Data Privacy, Safety & IP Rights",
        "marks": 3.5
      },
      {
        "component": "Historical Case Studies (Therac-25/Boeing) & Whistleblowing Duty",
        "marks": 2
      }
    ],
    "examTip": "Mention the Therac-25 or Boeing 737 MAX as real-world examples of safety failures. Provide concrete engineering remedies for privacy (GDPR, Privacy by Design, AES-256)."
  },
  {
    "id": "etc-q18",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Professional email etiquette in corporate environments governs digital correspondence to project competence, respect recipient time, ensure legal accountability, and maintain seamless workplace collaboration.",
    "diagrams": [
      {
        "title": "Anatomy of a Professional Corporate Email",
        "ascii": "    +-----------------------------------------------------------------+\n    | Subject: [Action Required] Q4 Cloud Migration Review - Oct 28   |\n    +-----------------------------------------------------------------+\n    | Salutation: Dear Mr. Saxena / Hello Team,                       |\n    |                                                                 |\n    | Opening (Context & Intent):                                     |\n    | I am writing to provide the final review schedule for our Q4    |\n    | AWS migration.                                                  |\n    |                                                                 |\n    | Body (Structured Key Points & Data):                            |\n    | - Database cutover window: Saturday, Oct 28, 02:00-04:00 AM UTC |\n    | - Expected downtime: Maximum 15 minutes                         |\n    | - Rollback strategy: Automated snapshot restore verified        |\n    |                                                                 |\n    | Call-to-Action (Explicit Next Steps):                           |\n    | Please review the attached playbook and submit sign-off by 5 PM.|\n    |                                                                 |\n    | Professional Sign-off:                                          |\n    | Best regards,                                                   |\n    | Rahul Sharma | Lead DevOps Engineer | CloudOps Ltd.             |\n    +-----------------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Eight Essential Email Etiquette DOs",
        "points": [
          "1. <b>Write Descriptive Subject Lines:</b> Include urgency tag, topic, and deadline (e.g., \"[Urgent] API Gateway Outage RCA - Nov 12\").",
          "2. <b>Bottom-Line-Up-Front (BLUF):</b> State the core question, request, or action item in the very first sentence.",
          "3. <b>Use Bullet Points for Readability:</b> Avoid dense multi-paragraph blocks; format instructions into numbered lists.",
          "4. <b>Proofread for Tone and Typos:</b> Verify recipient spelling, company names, and numerical data before sending.",
          "5. <b>Maintain Professional Signatures:</b> Include full name, job title, department, and contact phone numbers.",
          "6. <b>Respect \"Reply-All\":</b> Only use \"Reply-All\" when every person on the thread genuinely requires the information.",
          "7. <b>Use CC and BCC Strategically:</b> CC for visibility only; BCC for large recipient distribution lists to protect privacy.",
          "8. <b>Reply Promptly:</b> Acknowledge incoming business emails within 24 business hours, even with a brief holding reply."
        ]
      },
      {
        "heading": "2. Eight Critical Email Etiquette DON’Ts",
        "points": [
          "1. <b>DON’T Use ALL CAPS:</b> Writing in all capitals conveys aggressive shouting and unprofessionalism.",
          "2. <b>DON’T Email While Angry:</b> Never send emotional responses; practice a 24-hour cooling-off period.",
          "3. <b>DON’T Leave the Subject Line Blank:</b> Blank subjects often get flagged as spam or ignored.",
          "4. <b>DON’T Use Unprofessional Slang or Emojis:</b> Avoid informal abbreviations (\"thx\", \"u\", \"asap\") in formal client correspondence.",
          "5. <b>DON’T Attach Massive Files Blindly:</b> Upload files >10MB to shared cloud storage (Google Drive, OneDrive) and share secure links.",
          "6. <b>DON’T Discuss Highly Sensitive Legal/HR Matters:</b> Sensitive disputes must be addressed verbally in person or via video call.",
          "7. <b>DON’T Forward Confidential Threads Without Permission:</b> Protect proprietary IP and personal data.",
          "8. <b>DON’T Mark Non-Critical Emails as \"High Priority\":</b> Overusing urgency flags dilutes credibility."
        ]
      }
    ],
    "conclusion": "Mastering professional email etiquette builds career credibility, prevents costly organizational misunderstandings, and reflects executive communication competence.",
    "markingScheme": [
      {
        "component": "Corporate Email Significance & Professional Email Anatomy Diagram",
        "marks": 1.5
      },
      {
        "component": "Eight Comprehensive DOs with Practical Corporate Examples",
        "marks": 2.5
      },
      {
        "component": "Eight Critical DON’Ts with Explanations of Business Impact",
        "marks": 2.5
      },
      {
        "component": "Strategic Use of CC, BCC, and Subject Lines",
        "marks": 0.5
      }
    ],
    "examTip": "Structure your answer clearly with an Email Anatomy diagram followed by parallel lists of 8 DOs and 8 DON’Ts. Mention BLUF (Bottom-Line-Up-Front)."
  }
];
