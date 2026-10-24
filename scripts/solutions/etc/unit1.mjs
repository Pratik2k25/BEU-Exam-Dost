// BEU Model Solutions - ETC Unit 1
export const unit1Solutions = [
  {
    "id": "etc-q1",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Information Development Life Cycle (IDLC) is a structured, phase-oriented engineering methodology used by technical communicators and documentation teams to create, deliver, and maintain accurate user assistance, technical documentation, and product manuals.",
    "diagrams": [
      {
        "title": "Information Development Life Cycle (IDLC) Sequential Phases",
        "ascii": "    +-------------------------------------------------------+\n    | 1. Requirement Analysis & Audience Profiling          |\n    |    - Target user personas, skill level, technical goal|\n    +---------------------------+---------------------------+\n                                |\n                                v\n    +-------------------------------------------------------+\n    | 2. Information Architecture & Content Planning        |\n    |    - Document outline, style guide, topic maps (DITA) |\n    +---------------------------+---------------------------+\n                                |\n                                v\n    +-------------------------------------------------------+\n    | 3. Content Drafting & Authoring                       |\n    |    - Procedural tasks, conceptual overviews, visuals  |\n    +---------------------------+---------------------------+\n                                |\n                                v\n    +-------------------------------------------------------+\n    | 4. Technical Review & Editorial Validation (SME)      |\n    |    - Subject Matter Expert sign-off, peer review      |\n    +---------------------------+---------------------------+\n                                |\n                                v\n    +-------------------------------------------------------+\n    | 5. Usability Testing & Proofreading                   |\n    |    - Task walkthroughs, dead link checks, formatting  |\n    +---------------------------+---------------------------+\n                                |\n                                v\n    +-------------------------------------------------------+\n    | 6. Publishing, Deployment & Maintenance               |\n    |    - Multi-channel export (PDF, HTML5, WebHelp), vNext|\n    +-------------------------------------------------------+"
      }
    ],
    "sections": [
      {
        "heading": "1. Phase-by-Phase Breakdown of IDLC",
        "points": [
          "<b>Phase 1: Need Analysis & Audience Profiling:</b> Determine who the readers are (novice, intermediate, system administrator), what task they must accomplish, and the operating environment. Define reading level, prerequisites, and localization requirements.",
          "<b>Phase 2: Content Strategy & Information Architecture:</b> Create the Table of Contents (ToC), choose documentation format (Markdown, DITA XML, reStructuredText), establish writing conventions (Microsoft/Google Style Guides), and assign milestone schedules.",
          "<b>Phase 3: Content Authoring:</b> Draft task-oriented workflows, reference specifications, syntax blocks, and labelled architectural diagrams. Follow active voice, direct second-person address (\"you\"), and concise bullet points.",
          "<b>Phase 4: SME Review & Editorial Audit:</b> Subject Matter Experts (developers, test engineers) verify algorithmic and factual accuracy. Technical editors verify grammar, clarity, conciseness, and terminology adherence.",
          "<b>Phase 5: Usability Testing:</b> Observe representative users trying to perform actions using solely the documentation. Resolve ambiguities, missing prerequisites, or friction points.",
          "<b>Phase 6: Multi-Channel Publishing & Maintenance:</b> Generate output deliverables (API docs via Swagger/Redoc, PDF manuals, GitBook). Maintain documentation in sync with software version updates and patch releases."
        ]
      },
      {
        "heading": "2. Role of IDLC in Modern Agile/DevOps Workflows",
        "points": [
          "In modern \"Docs-as-Code\" paradigms, documentation lives in Git repositories alongside application source code, undergoing automated CI/CD linting (Vale, markdownlint) and continuous delivery with every release sprint."
        ]
      }
    ],
    "conclusion": "The IDLC ensures that technical documentation is not an afterthought, but a reliable, tested, and maintainable software engineering deliverable that enhances product adoption and reduces customer support costs.",
    "markingScheme": [
      {
        "component": "IDLC Definition and Purpose in Software Engineering",
        "marks": 1.5
      },
      {
        "component": "Six Sequential Phases with Activities & Deliverables",
        "marks": 3.5
      },
      {
        "component": "Flowchart Diagram & Modern Docs-as-Code Integration",
        "marks": 2
      }
    ],
    "examTip": "Always draw the 6-stage sequential flowchart. Emphasize audience profiling in stage 1 and SME review in stage 4—examiners award top marks for mentioning SME validation."
  },
  {
    "id": "etc-q2",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Technical information design differs significantly between traditional print media (hardcopy manuals, datasheets, textbooks) and online digital media (web documentation, API portals, interactive guides) due to differing reading mechanics, medium constraints, and user search behaviors.",
    "table": {
      "title": "Comparison of Information Design in Print vs Online Digital Media",
      "headers": [
        "Design Dimension",
        "Print Media (Hardcopy)",
        "Online Digital Media (Web/App)"
      ],
      "rows": [
        [
          "Reading Behavior",
          "Linear, continuous, in-depth reading from front to back",
          "Non-linear, scanning, keyword searching, F-pattern scanning"
        ],
        [
          "Layout & Grid",
          "Fixed page dimensions (A4, Letter), static pagination",
          "Responsive, fluid layouts adjusting to mobile, tablet, and desktop"
        ],
        [
          "Typography",
          "Serif fonts (Times New Roman, Garamond) for extended reading",
          "Sans-serif fonts (Inter, Roboto, Open Sans) for screen crispness"
        ],
        [
          "Navigation Model",
          "Table of Contents, index, page numbers, header running heads",
          "Hyperlinks, breadcrumbs, search bars, side navigation drawers"
        ],
        [
          "Media Capabilities",
          "Static text, black-and-white or high-DPI static line art",
          "Interactive code playgrounds, animated GIFs, embedded video, tabs"
        ],
        [
          "Update & Maintenance",
          "Costly reprinting cycle; errata sheets required for updates",
          "Instant continuous deployment; real-time updates via version control"
        ],
        [
          "Space Constraints",
          "Strict page count budgets due to printing and binding costs",
          "Virtually limitless depth; organized via progressive disclosure"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Human Factors and Scanning Dynamics",
        "points": [
          "<b>F-Pattern Reading:</b> Web eye-tracking studies (Nielsen Norman Group) demonstrate online readers scan headings and bullet points in an \"F\" pattern, requiring bottom-line-up-front (BLUF) formatting.",
          "<b>Progressive Disclosure:</b> Digital technical documentation hides advanced details behind collapsible accordions and expandable tabs, preventing cognitive overload.",
          "<b>Searchability:</b> Online documentation relies heavily on Algolia/Elasticsearch indexing and SEO keywords, whereas print relies on back-of-the-book analytical indexes."
        ]
      },
      {
        "heading": "2. Accessibility and Usability Standards",
        "points": [
          "Digital technical writing must adhere to WCAG 2.1 AA accessibility guidelines (contrast ratios, screen reader alt-text, keyboard navigation), which are irrelevant to physical paper media."
        ]
      }
    ],
    "conclusion": "While print media emphasizes typographic craftsmanship and linear permanence, digital information design prioritizes modularity, instant searchability, responsiveness, and interactive user engagement.",
    "markingScheme": [
      {
        "component": "Fundamental Conceptual Comparison & Reading Behaviors",
        "marks": 1.5
      },
      {
        "component": "Comprehensive Comparative Table (7 Key Parameters)",
        "marks": 3.5
      },
      {
        "component": "F-Pattern Scanning, Accessibility, and Progressive Disclosure Analysis",
        "marks": 2
      }
    ],
    "examTip": "Present this comparison in a structured table with at least 6 criteria (Navigation, Typography, Reading Pattern, Interactivity, Maintenance, Layout). Mention Nielsen Norman F-pattern scanning."
  }
];
