// BEU Model Solutions - ETC Unit 5
export const unit5Solutions = [
  {
    "id": "etc-q12",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Formal Technical Report is an exhaustive, professionally structured engineering document communicating research findings, system designs, experimentation results, and technical recommendations to stakeholders, academic committees, or clients.",
    "diagrams": [
      {
        "title": "Structural Architecture of a Formal Technical Report",
        "ascii": "    FRONT MATTER\n    |-- Title Page (Document title, author, institution, submission date)\n    |-- Abstract / Executive Summary (Self-contained 250-word overview)\n    |-- Table of Contents (ToC) & List of Figures / Tables\n    |-- Acknowledgements & Declaration\n    \n    BODY OF THE REPORT\n    |-- 1. Introduction (Background, problem statement, scope, objectives)\n    |-- 2. Literature Review / Prior Art Survey\n    |-- 3. System Architecture & Methodology (Hardware/software design)\n    |-- 4. Implementation Details (Algorithms, schema, code structure)\n    |-- 5. Results, Testing & Performance Evaluation (Graphs, benchmarks)\n    |-- 6. Discussion & Limitations\n    |-- 7. Conclusion & Future Scope\n    \n    BACK MATTER\n    |-- References / Bibliography (IEEE citation style)\n    |-- Appendices (Raw data sheets, full source code listings, schematics)"
      }
    ],
    "sections": [
      {
        "heading": "1. In-Depth Breakdown of Standard Sections",
        "points": [
          "<b>Title Page & Front Matter:</b> Includes standardized project title, course code, student roll numbers, supervisor designation, institutional logo, and submission date.",
          "<b>Executive Summary / Abstract:</b> The most critical section. Summarizes the problem statement, technical methodology, key quantitative results, and primary conclusion in under 300 words. Must stand alone independently of the full report.",
          "<b>Body - Methodology & System Design:</b> Detailed system schematics, architectural block diagrams, mathematical models, database schemas, and pseudo-code routines enabling reproducibility.",
          "<b>Results & Empirical Evaluation:</b> Visual presentation of benchmarks via labeled line charts, bar plots, and error margin tables with accompanying critical commentary.",
          "<b>References (IEEE Style):</b> Standardized bibliographic citations (e.g., [1] J. K. Author, \"Title of paper,\" <i>IEEE Trans. Software Eng.</i>, vol. 45, no. 3, pp. 200–215, 2023)."
        ]
      },
      {
        "heading": "2. Professional Formatting & Style Guidelines",
        "points": [
          "Follow 1-inch (2.54 cm) margins throughout, 1.5 line spacing, standard 12 pt typography (Times New Roman or Arial), consistent decimal heading hierarchy (1.0, 1.1, 1.1.1), and sequential figure/table captioning (e.g., \"Figure 3.2: Architecture Diagram\")."
        ]
      }
    ],
    "conclusion": "Adhering to formal report architecture ensures complex engineering projects are documented with scientific rigor, complete reproducibility, and professional polish.",
    "markingScheme": [
      {
        "component": "Front Matter Breakdown (Title, Abstract, ToC)",
        "marks": 1.5
      },
      {
        "component": "Body Section Outline (Introduction to Conclusion)",
        "marks": 2.5
      },
      {
        "component": "Back Matter (IEEE References, Appendices) & Formatting Rules",
        "marks": 1.5
      },
      {
        "component": "Structural Hierarchy Diagram",
        "marks": 1.5
      }
    ],
    "examTip": "Divide the report outline into three clear parts: Front Matter, Body, and Back Matter. Include IEEE citation format in the Back Matter section."
  },
  {
    "id": "etc-q13",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "A Project Proposal is a persuasive technical and financial bid submitted to institutional authorities or funding agencies to justify the viability, resource allocation, and implementation roadmap of an engineering solution.",
    "sections": [
      {
        "heading": "1. Complete Draft of an Engineering Project Proposal",
        "points": [
          "<b>Project Title:</b> Automated Campus Waste Segregation and Monitoring System using IoT and Computer Vision.",
          "<b>Executive Summary:</b> This proposal outlines the development of a smart waste management network across the university campus. The system utilizes edge-AI microcontrollers equipped with cameras and ultrasonic sensors to classify recyclable, biodegradable, and hazardous waste automatically, reducing campus recycling contamination by an estimated 70%.",
          "<b>Problem Statement:</b> Manual waste segregation on university grounds is inconsistent, leading to overflow, health hazards, and municipal non-compliance penalties.",
          "<b>Project Objectives:</b> 1) Build 10 solar-powered sensorized smart bins; 2) Train an edge MobileNetV2 CNN classifier achieving >= 90% sorting accuracy; 3) Provide a real-time LoRaWAN telemetry dashboard for campus sanitation staff.",
          "<b>Technical Methodology:</b> Hardware: Raspberry Pi 4, ESP32 LoRa nodes, ultrasonic bin-fill sensors, servo actuator flap gates. Software: TensorFlow Lite for image classification, MQTT telemetry pipeline, Node.js/PostgreSQL web dashboard."
        ]
      },
      {
        "heading": "2. Budget Allocation and Financial Justification",
        "points": [
          "<b>Detailed Budget:</b>",
          "• Edge Computing Modules (10 × Raspberry Pi 4 4GB): ₹65,000",
          "• Sensors, Cameras & Mechanical Actuators: ₹35,000",
          "• Solar Panels, Inverters & Battery Enclosures: ₹25,000",
          "• Cloud Hosting & Database Server (1-Year Tier): ₹15,000",
          "• Contingency & Fabrication Materials: ₹10,000",
          "<b>Total Financial Grant Requested:</b> ₹1,50,000"
        ]
      },
      {
        "heading": "3. Project Timeline (Gantt Milestones)",
        "points": [
          "• Months 1–2: Hardware procurement, circuit design, dataset collection (5,000 images).",
          "• Months 3–4: Model training, quantization, firmware development, edge bench testing.",
          "• Months 5–6: On-campus pilot deployment, telemetry integration, final report submission."
        ]
      }
    ],
    "conclusion": "This proposal demonstrates clear technical feasibility, measurable environmental impact, and disciplined financial planning, making it an ideal candidate for institutional grant approval.",
    "markingScheme": [
      {
        "component": "Proposal Title, Abstract & Clear Problem Statement",
        "marks": 1.5
      },
      {
        "component": "Technical Objectives & Detailed Methodology",
        "marks": 2
      },
      {
        "component": "Itemized Budget Table with Accurate Financial Estimates",
        "marks": 2
      },
      {
        "component": "Project Milestones, Deliverables & Timeline Roadmap",
        "marks": 1.5
      }
    ],
    "examTip": "Format the proposal with realistic sections: Title, Problem Statement, Objectives, Technical Stack, Itemized Budget (with realistic rupee figures), and 6-month Timeline."
  },
  {
    "id": "etc-q14",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Minutes of a Meeting (MoM) constitute the official written record of discussions, decisions, and actionable commitments agreed upon during a formal meeting, ensuring institutional memory and accountability.",
    "sections": [
      {
        "heading": "1. Importance and Purpose of MoM in Engineering Teams",
        "points": [
          "<b>Legal and Procedural Record:</b> Serves as documented evidence of committee resolutions and regulatory compliance.",
          "<b>Action Item Accountability:</b> Pinpoints exactly who is responsible for each deliverable, with explicit completion deadlines.",
          "<b>Prevents Misunderstandings:</b> Eliminates ambiguity regarding agreed budgets, feature scopes, and engineering deadlines."
        ]
      },
      {
        "heading": "2. Sample Draft: Minutes of the Technical Symposium Planning Committee",
        "points": [
          "<b>Meeting Details:</b> Date: October 24, 2026 | Time: 3:00 PM – 4:30 PM | Venue: Seminar Hall B | Chair: Dr. R. K. Sharma (Head of CSE) | Minute-taker: Aman Verma (Student Convener).",
          "<b>Attendees Present:</b> Prof. S. Sinha, Dr. M. Mishra, Aman Verma, Priya Patel, Rohit Kumar. Absent: Sneha Roy (excused).",
          "<b>Agenda Items Discussed:</b>",
          "1. Approval of previous meeting minutes (Passed unanimously).",
          "2. Finalization of keynote speakers for National TechFest 2026.",
          "3. Budget allocation for hackathon prize pool and cloud server infrastructure.",
          "4. Sponsorship outreach status.",
          "<b>Key Decisions Taken:</b>",
          "• Approved a prize pool of ₹1,00,000 for the 36-hour Hackathon.",
          "• Selected AWS Educate as the official cloud sponsorship platform.",
          "<b>Action Items Matrix:</b>",
          "• Action 1: Send formal invitation letters to external judges | Owner: Priya Patel | Deadline: Oct 30, 2026.",
          "• Action 2: Deploy hackathon registration portal on Vercel | Owner: Rohit Kumar | Deadline: Nov 05, 2026.",
          "• Action 3: Finalize brochure printing contract | Owner: Aman Verma | Deadline: Nov 08, 2026.",
          "<b>Adjournment:</b> Meeting adjourned at 4:30 PM. Next meeting scheduled for November 10, 2026 at 3:00 PM."
        ]
      }
    ],
    "conclusion": "Well-structured Minutes of a Meeting bridge conversation into tangible engineering execution, preventing missed deadlines and fostering organizational discipline.",
    "markingScheme": [
      {
        "component": "Importance & Objectives of MoM in Organizations",
        "marks": 1.5
      },
      {
        "component": "Meeting Header Data (Date, Attendees, Agenda, Chair)",
        "marks": 1.5
      },
      {
        "component": "Record of Decisions Taken & Discussions",
        "marks": 2
      },
      {
        "component": "Action Items Table (Task, Assignee/Owner, Target Deadline)",
        "marks": 2
      }
    ],
    "examTip": "Always draft the MoM with standard elements: Header (Date, Chair, Attendees), Agenda, Decisions, and most importantly, an Action Items Table with Assignee and Deadline."
  },
  {
    "id": "etc-q15",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Business Letters, Office Memorandums (Memos), and Emails represent the three foundational genres of professional correspondence, each tailored for distinct organizational audiences, scopes, and degrees of formality.",
    "table": {
      "title": "Comparative Analysis of Business Letters, Office Memorandums, and Emails",
      "headers": [
        "Feature Dimension",
        "Business Letter",
        "Office Memorandum (Memo)",
        "Email Correspondence"
      ],
      "rows": [
        [
          "Primary Audience",
          "External parties (clients, vendors, government authorities, partner firms)",
          "Internal employees within the same organization",
          "Both internal colleagues and external stakeholders"
        ],
        [
          "Degree of Formality",
          "Highest formality; written on official company letterhead",
          "Moderate formality; informal to semi-formal internal communication",
          "Flexible; ranges from highly formal to semi-formal depending on recipient"
        ],
        [
          "Physical Medium",
          "Printed physical paper, signed in ink, delivered via post/courier",
          "Printed physical paper or posted on company internal bulletin",
          "Digital electronic transmission over internet/intranet protocols"
        ],
        [
          "Salutation & Sign-off",
          "Formal salutation (\"Dear Sir/Madam\") and complimentary close (\"Sincerely\")",
          "No formal salutation or complimentary close; uses standard \"To/From/Date/Subject\" header",
          "Short salutation (\"Hi Team\", \"Dear Dr. Roy\") and standard sign-off (\"Regards\")"
        ],
        [
          "Signature Requirement",
          "Mandatory handwritten signature above printed name and title",
          "Initials of the sender next to the \"From\" line; no full signature block",
          "Digital email signature containing title, contact numbers, and company banner"
        ],
        [
          "Typical Purpose",
          "Legal contracts, formal bids, job offer letters, official complaints",
          "Policy updates, internal procedural shifts, company-wide announcements",
          "Quick status updates, project coordination, file sharing, meeting scheduling"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Structural Formats Compared",
        "points": [
          "<b>Business Letter Structure:</b> Sender Letterhead -> Date -> Inside Address -> Reference -> Salutation -> Body (3 paragraphs) -> Complimentary Close -> Signature Block -> Enclosures.",
          "<b>Memo Structure:</b> Standardized TO / FROM / DATE / SUBJECT header block followed immediately by the problem/policy body and recommended actions.",
          "<b>Email Structure:</b> Subject line -> Salutation -> Purpose statement -> Concise body with bullet points -> Call-to-Action (CTA) -> Professional sign-off."
        ]
      }
    ],
    "conclusion": "Selecting the appropriate correspondence genre demonstrates professional maturity, ensuring messages match organizational protocol, legal accountability, and audience expectations.",
    "markingScheme": [
      {
        "component": "Introduction & Scope of Business Letters, Memos, and Emails",
        "marks": 1.5
      },
      {
        "component": "Comparative Structural Table (6 Distinct Criteria)",
        "marks": 3.5
      },
      {
        "component": "Structural Format Templates for Each Genre",
        "marks": 2
      }
    ],
    "examTip": "Draw a comparative table comparing Audience, Formality, Medium, Salutation/Sign-off, and Signature. Clearly note that Memos are internal while Letters are external."
  }
];
