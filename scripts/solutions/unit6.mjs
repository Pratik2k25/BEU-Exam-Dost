export const unit6Solutions = [
  {
    id: 'cn-q16',
    num: 16,
    title: 'DNS Hierarchical Namespace, Server Architecture & Query Resolution',
    unit: 6,
    verified: 'BEU 2024 · Q.9(a) / 2025 · 7 Marks',
    years: [2022, 2024, 2025],
    marks: 7,
    question: 'Explain the Domain Name System (DNS) architecture and hierarchical namespace. Contrast Recursive Query resolution with Iterative Query resolution using timing ladder diagrams.',
    solution: {
      verified: 'BEU 2024 · Q.9(a) / 2025 · 7 Marks',
      intro: 'The Domain Name System (DNS) is an essential, distributed hierarchical database system that provides transparent bidirectional mapping between human-readable alphanumeric hostnames (e.g., <code>www.beu-bihar.ac.in</code>) and machine-routable numerical IP addresses (32-bit IPv4 or 128-bit IPv6). Without DNS, users would be required to memorize arbitrary 32-bit binary or dotted-decimal IP addresses for every network resource.',
      diagrams: [
        {
          title: 'DNS Hierarchical Inverted-Tree Namespace Architecture',
          ascii:
`                          . (Root Domain Server)
                                    |
          +-------------------------+-------------------------+
          |                         |                         |
    Generic TLDs              Country-Code TLDs         Infrastructure
   (.com, .edu, .org)           (.in, .uk, .us)             (.arpa)
          |                         |
   +------+------+           +------+------+
   |             |           |             |
 google.com   mit.edu      gov.in        ac.in (Second-Level Domain)
                             |             |
                         bihar.gov.in  beu-bihar.ac.in (Subdomain)
                                           |
                                      www.beu-bihar.ac.in (FQDN / Leaf Host)`
        },
        {
          title: 'Iterative Resolution vs Recursive Resolution Timing Flow',
          ascii:
`[ ITERATIVE RESOLUTION (Standard) ]           [ RECURSIVE RESOLUTION (Heavy Load) ]
Client -> Local DNS -> External Servers        Client -> Local DNS -> Root -> TLD -> Auth
                                                                                          
Client      Local DNS     Root    TLD    Auth    Client      Local DNS     Root    TLD    Auth
  |             |          |       |       |       |             |          |       |       | 
  |--1.Query--->|          |       |       |       |--1.Query--->|          |       |       | 
  |             |--2.Q---->|       |       |       |             |--2.Q---->|       |       | 
  |             |<-3.Ref---|       |       |       |             |          |--3.Q->|       | 
  |             |                  |       |       |             |          |       |--4.Q->| 
  |             |--4.Q------------>|       |       |             |          |       |<-5.Ans| 
  |             |<-5.Ref-----------|       |       |             |          |<-6.Ans|       | 
  |             |                          |       |             |<-7.Ans---|       |       | 
  |             |--6.Q-------------------->|       |<-8.Answer---|          |       |       | 
  |             |<-7.Answer----------------|       |             |          |       |       | 
  |<-8.Answer---|          |       |       |       (Root & TLD servers perform lookups)   
  (Local DNS does all the iterative walking)`
        }
      ],
      sections: [
        {
          heading: '1. DNS Server Hierarchy & Components',
          points: [
            '<b>Root DNS Servers:</b> Form the apex of the tree (13 logical root server addresses, A.ROOT-SERVERS.NET to M.ROOT-SERVERS.NET, distributed globally via IP Anycast across 1,500+ physical servers). They do not store host IP mappings; they return referrals to the responsible Top-Level Domain (TLD) servers.',
            '<b>Top-Level Domain (TLD) Servers:</b> Manage top-level domains such as generic TLDs (<code>.com</code>, <code>.org</code>, <code>.net</code>, <code>.edu</code>) and country-code TLDs (<code>.in</code>, <code>.uk</code>, <code>.jp</code>). Managed by registries like VeriSign and NIXI.',
            '<b>Authoritative DNS Servers:</b> The definitive name servers configured by an organization (e.g., college, university, or ISP) that maintain the actual DNS Resource Records for that zone.',
            '<b>Local DNS / Resolver Server:</b> Usually hosted by the local ISP or college campus. Caches previous query results; when a local client queries a domain, the resolver inspects its local cache first before traversing the global hierarchy.'
          ]
        },
        {
          heading: '2. Recursive vs Iterative Query Resolution Comparison',
          points: [
            '<b>Recursive Query:</b> The querying system requests that the receiving server take full responsibility for returning either the final IP mapping or an authoritative error message. The client makes a recursive request to its Local DNS server.',
            '<b>Iterative Query:</b> The queried server returns the best referral it currently knows (the IP address of the next DNS server closer to the authoritative answer), forcing the querier to issue repeated queries down the tree chain.',
            '<b>Standard Internet Practice:</b> Clients send a <i>Recursive</i> query to their Local DNS resolver. The Local DNS resolver then sends <i>Iterative</i> queries to Root, TLD, and Authoritative servers. This protects Root servers from caching and memory exhaustion.'
          ]
        },
        {
          heading: '3. DNS Protocol Operation & Transport Ports',
          points: [
            '<b>Port 53 UDP:</b> Used for standard hostname-to-IP lookup queries and responses where payload size is ≤ 512 bytes (or up to 4096 bytes using EDNS0 extensions). UDP provides minimal latency and zero connection-establishment overhead.',
            '<b>Port 53 TCP:</b> Used when response payload exceeds 512 bytes, and for DNS Zone Transfers (AXFR/IXFR) between Master and Slave DNS servers requiring guaranteed transmission integrity.',
            '<b>DNS Resource Record (RR) Structure:</b> Standard tuple <code>(Name, Value, Type, TTL)</code> where Types include:<br>• <code>A</code>: Maps hostname to 32-bit IPv4 address.<br>• <code>AAAA</code>: Maps hostname to 128-bit IPv6 address.<br>• <code>CNAME</code>: Canonical name (alias to true domain name).<br>• <code>MX</code>: Mail Exchange server priority and hostname for SMTP.<br>• <code>NS</code>: Authoritative Name Server for the zone.<br>• <code>PTR</code>: Reverse DNS lookup (IP to domain name).'
          ]
        }
      ],
      conclusion: 'The DNS architecture succeeds on a planetary scale because of its hierarchical delegation, client-side and resolver caching, and clean separation between lightweight UDP queries and reliable TCP zone transfers.',
      markingScheme: [
        { component: 'DNS Definition & Motivation (Hostname to IP Mapping)', marks: '1.0' },
        { component: 'Hierarchical Namespace Inverted Tree Diagram', marks: '1.5' },
        { component: 'DNS Server Classes (Root, TLD, Authoritative, Resolver)', marks: '1.5' },
        { component: 'Recursive vs Iterative Resolution Timing Ladder Diagrams', marks: '1.5' },
        { component: 'Resource Record Types (A, AAAA, CNAME, MX, PTR) & Ports (53)', marks: '1.5' }
      ],
      examTip: 'Examiners always look for two specific details: (1) Why DNS uses UDP for lookups and TCP for zone transfers, and (2) Clear distinction showing that Root servers are never queried recursively by public clients.'
    }
  },
  {
    id: 'cn-q17',
    num: 17,
    title: 'FTP Dual-Connection Architecture & Active vs Passive Modes',
    unit: 6,
    verified: 'BEU 2023 · Q.9 / 2025 · 7 Marks',
    years: [2022, 2023, 2025],
    marks: 7,
    question: 'Explain the working of File Transfer Protocol (FTP). Why does FTP use two separate parallel connections (Control on Port 21 and Data on Port 20)? Differentiate between Active FTP and Passive FTP modes.',
    solution: {
      verified: 'BEU 2023 · Q.9 / 2025 · 7 Marks',
      intro: 'File Transfer Protocol (FTP), defined in RFC 959, is a robust client-server application layer protocol used for transferring files bidirectionally between heterogeneous computer systems over TCP/IP networks. Its distinguishing architectural characteristic is the separation of control commands from data payload via two parallel TCP connections.',
      diagrams: [
        {
          title: 'FTP Dual Parallel Connection Architecture (Out-of-Band Signaling)',
          ascii:
`   FTP CLIENT SYSTEM                                     FTP SERVER SYSTEM
+-----------------------+                             +-----------------------+
|  User Interface (UI)  |                             |                       |
+-----------------------+                             |                       |
| Control Process (PI)  |<==== TCP Port 21 (Control)==>| Server Control (PI)   |
| (Sends USER, PASS,    |      Continuous Dialogue    | (Replies 220, 230,    |
|  LIST, RETR, STOR)    |      Persistent Connection  |  331, 226, 550)       |
+-----------------------+                             +-----------------------+
| Data Process (DTP)    |<==== TCP Port 20 (Data) ====>| Server Data (DTP)     |
| (Transfers actual     |      Spawned Per File/List  | (Transfers File Stream|
|  file bytes & lists)  |      Non-Persistent Lifetime|  and closes TCP FIN)  |
+-----------------------+                             +-----------------------+`
        },
        {
          title: 'Active FTP Mode vs Passive FTP Mode Connection Setup',
          ascii:
`[ ACTIVE FTP MODE (Server Initiates Data Conn) ]
Client (Port N, N+1)                                     Server (Port 21, 20)
   |                                                              |
   |---- 1. TCP Handshake to Port 21 (Control Estab.) ----------->|
   |---- 2. Command: PORT ClientIP, N+1 ------------------------->|
   |                                                              |
   |<--- 3. TCP SYN from Server Port 20 TO Client Port N+1 -------| (BLOCKED BY
   |---> 4. TCP SYN-ACK from Client Port N+1 -------------------->|  CLIENT FIREWALL!)
   |<=== 5. Data Stream Transfer ===> Closed with FIN             |
                                                                  
[ PASSIVE FTP MODE (Client Initiates Both Connections) ]
Client (Port N, N+1)                                     Server (Port 21, P)
   |                                                              |
   |---- 1. TCP Handshake to Port 21 (Control Estab.) ----------->|
   |---- 2. Command: PASV (Enter Passive Mode) ------------------>|
   |<--- 3. Reply: 227 Entering Passive Mode (IP, Port P) --------|
   |                                                              |
   |---- 4. TCP SYN from Client Port N+1 TO Server Port P ------->| (ALLOWED!
   |<--- 5. TCP SYN-ACK from Server Port P -----------------------|  Client-initiated)
   |<=== 6. Data Stream Transfer ===> Closed with FIN             |`
        }
      ],
      table: {
        title: 'Architectural Comparison: Control Connection vs Data Connection',
        headers: ['Feature / Attribute', 'Control Connection (Port 21)', 'Data Connection (Port 20 / P)'],
        rows: [
          ['TCP Port Number', 'Port 21 on FTP Server', 'Port 20 (Active Mode) or Port P (Passive Mode)'],
          ['Connection Lifetime', 'Persistent throughout entire user session', 'Non-persistent; created & torn down per file/list'],
          ['Data Format', '7-bit NVT ASCII lines ending with CRLF', 'Raw binary 8-bit stream, ASCII text, or EBCDIC'],
          ['Transmission Role', 'Command transfer (USER, PASS, RETR, STOR, QUIT)', 'Actual payload delivery of files and directory listings'],
          ['Signaling Paradigm', 'Out-of-band control signaling', 'Pure in-band data payload streaming']
        ]
      },
      sections: [
        {
          heading: '1. Why FTP Uses Two Separate Parallel Connections',
          points: [
            '<b>Out-of-Band Control Signaling:</b> Traditional protocols like HTTP carry headers and payload over the same TCP stream (in-band). If a file transfer is slow, sending an abort command in-band would get stuck behind buffered data bytes. In FTP, the control channel remains open and responsive to <code>ABOR</code> (abort) and status commands even during massive multi-gigabyte data transfers.',
            '<b>Modular Process Separation:</b> Separates the interpreter process (PI) handling authentication and state from the data transfer process (DTP) handling byte I/O.',
            '<b>Automatic End-of-File Detection:</b> A data connection is closed with a standard TCP FIN handshake when file transmission finishes, providing unambiguous EOF indication without requiring complex payload framing.'
          ]
        },
        {
          heading: '2. Active FTP vs Passive FTP Mode in Modern Networks',
          points: [
            '<b>Active Mode (Client PORT Command):</b> The client opens an ephemeral port N for control and tells the server via <code>PORT h1,h2,h3,h4,p1,p2</code> to connect to client port <code>p1*256 + p2</code>. The server initiates a TCP SYN from Port 20 back to the client. This fails on modern internet setups because client-side NAT/Firewalls block unsolicited inbound connection requests.',
            '<b>Passive Mode (Client PASV Command):</b> Solves the firewall problem. The client sends <code>PASV</code>. The server opens a temporary high port P (> 1024) and replies with <code>227 Entering Passive Mode</code>. The client initiates the outbound TCP connection to server port P. Since both control and data streams originate outbound from the client, client firewalls allow the traffic seamlessly.'
          ]
        }
      ],
      conclusion: 'FTP pioneered out-of-band network architecture. While modern web traffic predominantly uses HTTPS and SFTP (SSH File Transfer Protocol), FTP with Passive Mode remains a benchmark example of dual-connection application layer protocol design.',
      markingScheme: [
        { component: 'FTP Working Principle & Definition', marks: '1.0' },
        { component: 'Dual Connection Architecture Diagram (Port 20 vs Port 21)', marks: '1.5' },
        { component: 'Detailed Justification for Out-of-Band Control Connection', marks: '1.5' },
        { component: 'Active vs Passive FTP Timing Ladders & Firewall Impact', marks: '2.0' },
        { component: 'Control vs Data Comparison Table & Conclusion', marks: '1.0' }
      ],
      examTip: 'To secure full 7 marks, clearly write the formula for computing port from FTP response: Port = p1 × 256 + p2. State clearly that Active FTP fails on NAT routers because the server initiates the inbound connection.'
    }
  },
  {
    id: 'cn-q40',
    num: 40,
    title: 'Electronic Mail Architecture, SMTP vs POP3/IMAP & Mail Access Agents',
    unit: 6,
    verified: 'BEU 2024 · Q.9(b) · 7 Marks',
    years: [2022, 2024],
    marks: 7,
    question: 'Differentiate between SMTP and POP protocols. Explain Mail Access Agents in detail along with the complete end-to-end electronic mail transmission architecture.',
    solution: {
      verified: 'BEU 2024 · Q.9(b) · 7 Marks',
      intro: 'Electronic Mail (Email) is a distributed, asynchronous store-and-forward application layer service that allows users to exchange digital messages worldwide. The email pipeline divides responsibilities between Message Submission/Transfer protocols (SMTP) and Message Retrieval/Access protocols (POP3, IMAP4).',
      diagrams: [
        {
          title: 'End-to-End Email System Architecture & Agent Flow',
          ascii:
`   SENDER ENVIRONMENT                       INTERNET                        RECEIVER ENVIRONMENT
+-----------------------+          +-------------------------+          +--------------------------+
| User Agent (UA)       |          | Sender Mail Server      |          | Receiver Mail Server     |
| (Outlook, Webmail)    |          | (MTA Client)            |          | (MTA Server)             |
+-----------------------+          +-------------------------+          +--------------------------+
           |                                    |                                    |
     [SMTP PUSH]                          [SMTP PUSH]                         [Store in Mailbox]
     Port 25/587                          Port 25                              /var/mail/recipient
           v                                    v                                    v
+-----------------------+          +-------------------------+          +--------------------------+
| Sender Mail Server    |=========>| Transmission across     |=========>| Mail Delivery Agent(MDA) |
| (MTA Server / Spool)  |          | Internet Routers & DNS  |          | (Deposits into Mailbox)  |
+-----------------------+          +-------------------------+          +--------------------------+
                                                                                     |
                                                                               [POP3/IMAP PULL]
                                                                               Port 110/143/993/995
                                                                                     v
                                                                        +--------------------------+
                                                                        | Receiver User Agent (UA) |
                                                                        | (User reads messages)    |
                                                                        +--------------------------+`
        }
      ],
      table: {
        title: 'Comprehensive Comparison: SMTP vs POP3 vs IMAP',
        headers: ['Comparison Criterion', 'SMTP (RFC 5321)', 'POP3 (RFC 1939)', 'IMAP4 (RFC 3501)'],
        rows: [
          ['Operational Nature', 'Push Protocol (sender pushes message)', 'Pull Protocol (receiver pulls message)', 'Pull & Sync Protocol (bidirectional sync)'],
          ['Default TCP Ports', 'Port 25 (relay), 587 (submission), 465 (SSL)', 'Port 110 (cleartext), 995 (SSL/TLS)', 'Port 143 (cleartext), 993 (SSL/TLS)'],
          ['Placement in Pipeline', 'Between UA & Sender MTA, and between MTAs', 'Between Receiver Mail Server and Receiver UA', 'Between Receiver Mail Server and Receiver UA'],
          ['Server Storage Behavior', 'Transfers message forward to next hop', 'Downloads and typically deletes from server', 'Keeps messages on server; synchronizes folders'],
          ['Multi-Device Support', 'N/A (Transfer only)', 'Poor; messages downloaded to one device disappear', 'Excellent; phone, laptop, webmail stay in sync'],
          ['Search & Header Inspection', 'N/A', 'Must download entire email before reading', 'Allows downloading headers only or server search']
        ]
      },
      sections: [
        {
          heading: '1. Core Components of Modern Email Architecture',
          points: [
            '<b>User Agent (UA):</b> The client software program that provides the user interface for drafting, sending, reading, and filing messages (e.g., Thunderbird, MS Outlook, Apple Mail, Gmail web interface).',
            '<b>Mail Transfer Agent (MTA):</b> The background server process that routes messages across network hops using SMTP (e.g., Postfix, Sendmail, Exim). It queries DNS for <code>MX</code> (Mail Exchange) records to locate destination servers.',
            '<b>Mail Delivery Agent (MDA):</b> Software on the recipient mail server (e.g., Dovecot LDA, Procmail) that accepts the message from the MTA and writes it into the recipient’s dedicated mailbox storage spool (<code>/var/mail/username</code>).',
            '<b>Mail Access Agent (MAA):</b> The protocol daemon that allows recipient User Agents to authenticate and pull messages stored inside the mail server spool down to the local client machine.'
          ]
        },
        {
          heading: '2. In-Depth Study of Mail Access Agents (MAA)',
          points: [
            '<b>Why an MAA is Necessary:</b> SMTP is strictly a <i>push protocol</i> designed for servers that remain permanently connected to the Internet with static IP addresses. End-user client machines (laptops, smartphones) frequently disconnect or change dynamic IP addresses. Therefore, the recipient mail server must hold incoming emails, and an MAA is needed to pull them when the client connects.',
            '<b>POP3 (Post Office Protocol v3) States:</b> Operates in three sequential states:<br>1. <i>Authorization:</i> Client sends <code>USER username</code> and <code>PASS password</code> to authenticate.<br>2. <i>Transaction:</i> Client issues commands like <code>STAT</code> (mailbox summary), <code>LIST</code> (message sizes), <code>RETR &lt;msg#&gt;</code> (fetch message), and <code>DELE &lt;msg#&gt;</code> (mark for deletion).<br>3. <i>Update:</i> Client sends <code>QUIT</code>; the server permanently purges marked messages and releases the mailbox lock.',
            '<b>IMAP4 (Internet Message Access Protocol):</b> Advanced alternative to POP3. Keeps all email hierarchies, sent folders, drafts, and read/unread flags centrally on the server. Clients can download only message headers or individual MIME attachments, saving bandwidth on mobile connections.'
          ]
        }
      ],
      conclusion: 'SMTP delivers messages reliably from sender to the recipient mailbox server, while Mail Access Agents (POP3 and IMAP) enable mobile and intermittently connected clients to securely retrieve and manage their stored messages.',
      markingScheme: [
        { component: 'Email Architecture Definition & 4-Agent Pipeline Diagram', marks: '1.5' },
        { component: 'SMTP Working & Push Nature Analysis', marks: '1.5' },
        { component: 'Detailed Comparison Table (SMTP vs POP3 vs IMAP)', marks: '1.5' },
        { component: 'Mail Access Agents (MAA) Role & POP3 Protocol States', marks: '1.5' },
        { component: 'Port Numbers & Exam Summary', marks: '1.0' }
      ],
      examTip: 'Always emphasize why SMTP cannot be used to retrieve email from a server to a client PC: SMTP cannot pull messages from a remote queue; it only pushes forward to a listening daemon.'
    }
  },
  {
    id: 'cn-q42',
    num: 42,
    title: 'Network Firewall Architecture, Types & DMZ Network Security',
    unit: 6,
    verified: 'BEU 2023 · Q.9(b) · 7 Marks',
    years: [2022, 2023, 2025],
    marks: 7,
    question: 'Write a comprehensive short note on Network Firewalls. Discuss the different types of firewalls, Demilitarized Zone (DMZ) architecture, and practical packet-filtering rule bases.',
    solution: {
      verified: 'BEU 2023 · Q.9(b) · 7 Marks',
      intro: 'A Network Firewall is a specialized hardware appliance, software module, or cloud security service deployed at the perimeter between networks of differing trust levels (such as a private corporate LAN and the public Internet). It inspects, filters, and controls incoming and outgoing network traffic based on predefined security access rules.',
      diagrams: [
        {
          title: 'Perimeter Firewall & Demilitarized Zone (DMZ) Enterprise Topology',
          ascii:
`                    UNTRUSTED PUBLIC NETWORK (INTERNET)
                                     |
                                     v
                        +-------------------------+
                        |    EXTERNAL FIREWALL    |
                        +-------------------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+-------------------------+                     +-------------------------+
|  DEMILITARIZED ZONE     |                     |    INTERNAL FIREWALL    |
|  (DMZ Subnet)           |                     +-------------------------+
|  • Public Web Server    |                                  |
|  • Public Mail Gateway  |                                  v
|  • External DNS Server  |                     +-------------------------+
+-------------------------+                     |  PROTECTED PRIVATE LAN  |
(Semi-trusted public services                   |  • Database Servers     |
 isolated from internal core)                   |  • ERP / Accounting     |
                                                |  • Employee Workstations|
                                                +-------------------------+`
        }
      ],
      table: {
        title: 'Comparison of the Four Generations of Firewall Architecture',
        headers: ['Firewall Classification', 'OSI Layer Inspected', 'Inspection Mechanism', 'Security Strengths & Weaknesses'],
        rows: [
          ['Packet-Filtering (Stateless)', 'Network / Transport (L3-L4)', 'Inspects IP header, protocol, and port numbers against static ACLs', 'Fastest speed; cannot detect spoofed packets or multi-packet application payload attacks'],
          ['Stateful Inspection', 'Network / Transport (L3-L4)', 'Tracks dynamic TCP state machine (SYN, ACK, FIN) in an active connection state table', 'High security for connection flows; blocks unsolicited incoming packets; moderate memory overhead'],
          ['Application Gateway (Proxy)', 'Application Layer (L7)', 'Terminates connection; reconstructs full protocol payload (HTTP, FTP, DNS) before relaying', 'Highest protocol-level inspection; completely isolates internal client IPs; highest processing latency'],
          ['Next-Generation (NGFW)', 'Layers 2 through 7', 'Combines stateful filtering with DPI (Deep Packet Inspection), IPS, and TLS decryption', 'Identifies applications regardless of port; blocks advanced malware; requires substantial hardware compute']
        ]
      },
      sections: [
        {
          heading: '1. Enterprise Firewall Rule Base Example',
          points: [
            'Firewalls evaluate rules sequentially from top to bottom (first matching rule wins, followed by an implicit default Deny All):',
            '<b>Rule 1 (DNS Resolution):</b> Source: Internal LAN | Dest: 8.8.8.8 | Protocol: UDP | Port: 53 | Action: <code>ALLOW</code> (Permits internal clients to resolve domain names).',
            '<b>Rule 2 (Outbound Web Browsing):</b> Source: Internal LAN | Dest: Any | Protocol: TCP | Port: 80, 443 | Action: <code>ALLOW</code> (Permits secure HTTP/HTTPS browsing).',
            '<b>Rule 3 (Public Web Traffic):</b> Source: Any Internet | Dest: DMZ Web Server (192.168.1.10) | Protocol: TCP | Port: 443 | Action: <code>ALLOW</code> (Allows world access to website).',
            '<b>Rule 4 (Block Management Access):</b> Source: Any Internet | Dest: Internal LAN | Protocol: TCP | Port: 22, 3389 | Action: <code>DENY & LOG</code> (Blocks remote SSH/RDP brute force).',
            '<b>Rule 5 (Default Implicit Deny):</b> Source: Any | Dest: Any | Protocol: Any | Port: Any | Action: <code>DENY</code> (Blocks all unmatched traffic).'
          ]
        },
        {
          heading: '2. Role of the Demilitarized Zone (DMZ)',
          points: [
            'A DMZ is a physical or logical subnet that isolates publicly accessible perimeter services (Web, Mail, DNS) from the internal corporate network.',
            '<b>Defense-in-Depth Advantage:</b> If an external hacker compromises the public web server in the DMZ via an unpatched web vulnerability, the attacker is still prevented from penetrating the internal private LAN because the secondary internal firewall strictly forbids DMZ-to-LAN connections.'
          ]
        },
        {
          heading: '3. Firewall vs Antivirus Comparison',
          points: [
            '<b>Firewall:</b> Operates at the network perimeter; inspects incoming and outgoing packet headers and streams; blocks unauthorized connections and ports.',
            '<b>Antivirus / EDR:</b> Operates at the host endpoint operating system; inspects stored files, system memory, and executing processes; detects and quarantines malicious executables, viruses, and ransomware.',
            '<b>Complementary Defense:</b> Firewalls cannot inspect encrypted viruses delivered through legitimate HTTPS downloads; host antivirus is required to catch what passes through open firewall ports.'
          ]
        }
      ],
      conclusion: 'Firewalls provide the foundational first line of defense for network security. Modern secure network architectures deploy hybrid NGFWs with DMZ isolation and stateful inspection to safeguard critical enterprise data.',
      markingScheme: [
        { component: 'Firewall Definition & Primary Security Functions', marks: '1.0' },
        { component: 'Labelled Enterprise DMZ Perimeter Architecture Diagram', marks: '1.5' },
        { component: 'Detailed Analysis of 4 Firewall Types (Stateless, Stateful, Proxy, NGFW)', marks: '2.0' },
        { component: 'Realistic Packet-Filtering Rule Table (≥4 rules)', marks: '1.5' },
        { component: 'Firewall vs Antivirus & Inherent Limitations', marks: '1.0' }
      ],
      examTip: 'Always include a sample Rule Base table with Rule Number, Source, Destination, Protocol, Port, and Action (Allow/Deny), ending with the mandatory Default Implicit Deny rule.'
    }
  }
];
