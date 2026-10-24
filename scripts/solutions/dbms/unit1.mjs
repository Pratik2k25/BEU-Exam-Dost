// BEU Model Solutions - DBMS Unit 1
export const unit1Solutions = [
  {
    "id": "dbms-q1",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "The Three-Schema Architecture (ANSI/SPARC Architecture) defines three distinct levels of database abstraction to achieve data independence and decouple end-user applications from physical storage media.",
    "diagrams": [
      {
        "title": "ANSI/SPARC Three-Schema Architecture & Data Independence",
        "ascii": "    +-------------------------------------------------------+\n    |  External Level: View 1    View 2    ...    View n    |\n    +---------------------------+---------------------------+\n                                | Logical Data Independence\n                                v\n    +-------------------------------------------------------+\n    |  Conceptual Level: Community Unified Schema           |\n    |  (Entities, Attributes, Relationships, Integrity)     |\n    +---------------------------+---------------------------+\n                                | Physical Data Independence\n                                v\n    +-------------------------------------------------------+\n    |  Internal Level: Physical Storage Schema              |\n    |  (File organization, B+ Trees, Hashing, Record Layout)|\n    +---------------------------+---------------------------+\n                                |\n                                v\n                       [ Physical Database on Disk ]"
      }
    ],
    "sections": [
      {
        "heading": "1. The Three Levels of Abstraction",
        "points": [
          "<b>1. External (View) Level:</b> The highest level of abstraction, defining customized user views tailored to specific groups (e.g., student portal view vs finance accounting view). Hides irrelevant data and enforces access security.",
          "<b>2. Conceptual (Logical) Level:</b> Defines the entire logical structure of the database for the whole enterprise. Describes entities, data types, relationships, constraints, and business rules without exposing physical storage.",
          "<b>3. Internal (Physical) Level:</b> The lowest level, describing physical storage structures, access paths (indexes, B+ trees), file allocation, record clustering, and compression algorithms on physical media."
        ]
      },
      {
        "heading": "2. Logical vs Physical Data Independence",
        "points": [
          "<b>Logical Data Independence:</b> The capacity to modify the conceptual schema without altering external schemas or application programs. <i>Example:</i> Adding an entity (e.g., Course_Feedback) or expanding an attribute does not impact existing queries selecting Student_Name.",
          "<b>Physical Data Independence:</b> The capacity to modify the internal physical schema without altering the conceptual schema or application programs. <i>Example:</i> Switching from sequential file organization to B+ Tree indexing, migrating to SSDs, or reorganizing disk partitions requires zero changes to SQL queries or logical relational tables."
        ]
      }
    ],
    "conclusion": "The three-schema architecture shields enterprise applications from physical hardware disruptions, establishing modularity that preserves software stability across decades of database growth.",
    "markingScheme": [
      {
        "component": "ANSI/SPARC Architecture Purpose & 3 Levels Overview",
        "marks": 1.5
      },
      {
        "component": "Labelled Architecture Diagram with Mappings",
        "marks": 2
      },
      {
        "component": "Detailed In-Depth Description of External, Conceptual & Internal Levels",
        "marks": 2
      },
      {
        "component": "Logical vs Physical Data Independence Contrast with Examples",
        "marks": 1.5
      }
    ],
    "examTip": "Draw the two mapping arrows clearly: External-to-Conceptual Mapping (Logical Data Independence) and Conceptual-to-Internal Mapping (Physical Data Independence)."
  },
  {
    "id": "dbms-q2",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "An Entity-Relationship (ER) model is a high-level conceptual data model that visually represents enterprise data as real-world entities, their descriptive attributes, and the associations (relationships) that connect them.",
    "sections": [
      {
        "heading": "1. System Requirements & Entity Identification",
        "points": [
          "For a University Management System, four primary strong entities and one associative entity are modeled:",
          "• <b>STUDENT:</b> Attributes: <u>StudentID</u> (Primary Key), Name, Email, DOB, CGPA.",
          "• <b>DEPARTMENT:</b> Attributes: <u>DeptCode</u> (Primary Key), DeptName, OfficeBuilding, Budget.",
          "• <b>COURSE:</b> Attributes: <u>CourseID</u> (Primary Key), Title, Credits, Syllabus.",
          "• <b>PROFESSOR:</b> Attributes: <u>EmpID</u> (Primary Key), Name, Designation, Specialization, Salary.",
          "• <b>SECTION / ENROLLMENT:</b> Associative entity tracking semester, grade, and academic year."
        ]
      },
      {
        "heading": "2. Relationships & Structural Cardinality Ratios",
        "points": [
          "• <b>BELONGS_TO (STUDENT - DEPARTMENT):</b> Many-to-One (N:1). Total participation on Student; every student must belong to exactly one department.",
          "• <b>OFFERS (DEPARTMENT - COURSE):</b> One-to-Many (1:N). A department offers multiple courses; each course is owned by one department.",
          "• <b>TEACHES (PROFESSOR - COURSE):</b> One-to-Many (1:N) or Many-to-Many (M:N). A professor teaches up to 3 courses per semester.",
          "• <b>ENROLLS_IN (STUDENT - COURSE):</b> Many-to-Many (M:N). A student enrolls in multiple courses; a course contains multiple students. Descriptive attributes: Grade, AttendancePercentage."
        ]
      },
      {
        "heading": "3. Conversion to Relational Schema Tables",
        "points": [
          "<b>Student:</b> (<u>StudentID</u>, Name, Email, DOB, CGPA, DeptCode_FK)",
          "<b>Department:</b> (<u>DeptCode</u>, DeptName, Building)",
          "<b>Course:</b> (<u>CourseID</u>, Title, Credits, DeptCode_FK)",
          "<b>Professor:</b> (<u>EmpID</u>, Name, Designation, Salary, DeptCode_FK)",
          "<b>Enrollment:</b> (<u>StudentID_FK</u>, <u>CourseID_FK</u>, <u>Semester</u>, Grade)"
        ]
      }
    ],
    "conclusion": "The comprehensive ER design captures all university business rules cleanly, enforcing entity integrity, foreign key referential integrity, and cardinality constraints.",
    "markingScheme": [
      {
        "component": "Entity Identification & Primary Key Selection",
        "marks": 1.5
      },
      {
        "component": "Complete ER Diagram Representation (Entities, Diamonds, Attributes)",
        "marks": 2.5
      },
      {
        "component": "Cardinality Ratios (1:1, 1:N, M:N) & Participation Constraints",
        "marks": 1.5
      },
      {
        "component": "Relational Schema Mapping (Foreign Key Derivations)",
        "marks": 1.5
      }
    ],
    "examTip": "Underline primary keys (e.g., StudentID). Use double rectangles for weak entities if applicable, and double lines for total participation constraints."
  }
];
