// BEU Model Solutions - DBMS Unit 5
export const unit5Solutions = [
  {
    "id": "dbms-q13",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "Database Access Control encompasses the security models and authorization policies enforced by a DBMS to prevent unauthorized access, modification, or exposure of sensitive enterprise data.",
    "table": {
      "title": "Database Access Control Models Comparison",
      "headers": [
        "Security Model",
        "Governing Mechanism",
        "Policy Administration",
        "Typical Application Environment"
      ],
      "rows": [
        [
          "Discretionary Access Control (DAC)",
          "SQL GRANT and REVOKE commands on specific objects",
          "Discretionary: owner of data grants privileges to users",
          "Commercial databases, relational SQL platforms"
        ],
        [
          "Mandatory Access Control (MAC)",
          "Security clearance levels (Top Secret, Secret, Public)",
          "Central authority; Bell-LaPadula multilevel security",
          "Military, national defense, intelligence systems"
        ],
        [
          "Role-Based Access Control (RBAC)",
          "Privileges assigned to Roles; Roles assigned to Users",
          "Enterprise administrative policy; principle of least privilege",
          "Corporate enterprise systems, banking, healthcare ERP"
        ]
      ]
    },
    "sections": [
      {
        "heading": "1. Discretionary Access Control (DAC) & SQL Syntax",
        "points": [
          "Enforces authorization based on user identities and explicit privilege grants.",
          "• <code>GRANT SELECT, INSERT ON Student TO user_rahul WITH GRANT OPTION;</code>",
          "• <code>REVOKE INSERT ON Student FROM user_rahul CASCADE;</code>",
          "• <b>Cascade vs Restrict:</b> CASCADE revokes privileges recursively from users who received grants from the target user; RESTRICT aborts revocation if dependent grants exist."
        ]
      },
      {
        "heading": "2. Role-Based Access Control (RBAC) Mechanics",
        "points": [
          "Solves the administrative nightmare of assigning privileges to thousands of individual user accounts.",
          "• <code>CREATE ROLE Teacher; GRANT SELECT, UPDATE(Grade) ON Student_Grades TO Teacher;</code>",
          "• <code>GRANT Teacher TO user_prof_kumar;</code>",
          "Users can be hired, reassigned, or terminated by simply modifying role memberships without altering underlying table permissions."
        ]
      }
    ],
    "conclusion": "Modern enterprise DBMS architectures combine DAC (for granular table privileges) with RBAC (for scalable corporate role governance) to enforce robust defense-in-depth data security.",
    "markingScheme": [
      {
        "component": "Database Security Concepts & Access Control Objectives",
        "marks": 1
      },
      {
        "component": "DAC Details with SQL GRANT/REVOKE Syntax & CASCADE Semantics",
        "marks": 2.5
      },
      {
        "component": "MAC Multilevel Security Model & Bell-LaPadula Rules",
        "marks": 1.5
      },
      {
        "component": "RBAC Architecture, Role Assignment & Comparative Table",
        "marks": 2
      }
    ],
    "examTip": "Provide the exact SQL syntax for GRANT and REVOKE with WITH GRANT OPTION and CASCADE. Compare DAC, MAC, and RBAC in a structured table."
  },
  {
    "id": "dbms-q14",
    "verified": "BEU Verified Model Answer · 7 Marks",
    "intro": "SQL Injection (SQLi) is a critical web application vulnerability where an attacker manipulates untrusted user inputs to alter the syntactic structure of backend database SQL queries, executing unauthorized database commands.",
    "sections": [
      {
        "heading": "1. Vulnerable Web Query Architecture & Attack Mechanics",
        "points": [
          "Consider an insecure web login handler using string concatenation:",
          "<code>String query = \"SELECT * FROM Users WHERE username='\" + user + \"' AND password='\" + pass + \"'\";</code>",
          "<b>Attacker Input:</b> Username: <code>admin' OR '1'='1</code>, Password: <code>anything</code>.",
          "<b>Resulting Executed Query:</b>",
          "<code>SELECT * FROM Users WHERE username='admin' OR '1'='1' AND password='anything';</code>",
          "Because <code>'1'='1'</code> evaluates to TRUE for every row, the authentication check is completely bypassed, granting the attacker full administrative access."
        ]
      },
      {
        "heading": "2. Severe Impacts of SQL Injection",
        "points": [
          "• Complete confidential data theft (reading passwords, financial records via UNION-based injection).",
          "• Database modification or deletion (executing <code>DROP TABLE Students;</code> via stacked queries).",
          "• Remote operating system command execution (via administrative procedures like xp_cmdshell in MS SQL)."
        ]
      },
      {
        "heading": "3. Robust Counter-Measures & Parameterized Queries",
        "points": [
          "<b>1. Prepared Statements (Parameterized Queries):</b> The database pre-compiles the SQL query structure before inserting parameter values. User input is treated strictly as literal data, never executable SQL syntax.",
          "<i>Secure Java Example:</i>",
          "<code>PreparedStatement pstmt = conn.prepareStatement(\"SELECT * FROM Users WHERE username = ? AND password = ?\");</code>",
          "<code>pstmt.setString(1, user); pstmt.setString(2, pass); ResultSet rs = pstmt.executeQuery();</code>",
          "<b>2. Stored Procedures:</b> Encapsulate database logic and parameterize inputs.",
          "<b>3. Input Validation & Whitelisting:</b> Reject inputs containing unexpected characters.",
          "<b>4. Principle of Least Privilege:</b> Ensure database connection accounts hold minimal necessary permissions."
        ]
      }
    ],
    "conclusion": "Parameterized prepared statements provide foolproof structural defense against SQL injection by enforcing a strict separation between code execution structure and user-supplied data values.",
    "markingScheme": [
      {
        "component": "SQL Injection Definition, Threat Level & Architectural Cause",
        "marks": 1.5
      },
      {
        "component": "Concrete Vulnerable String Concatenation Query Example",
        "marks": 2
      },
      {
        "component": "Authentication Bypass Demonstration with Tautology ('1'='1')",
        "marks": 1.5
      },
      {
        "component": "Parameterized Prepared Statements Solution & Code Implementation",
        "marks": 2
      }
    ],
    "examTip": "Show the vulnerable string concatenation snippet side by side with the secure PreparedStatement code using ? placeholders. Explain why the database treats ? strictly as data."
  }
];
