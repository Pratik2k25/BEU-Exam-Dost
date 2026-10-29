import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateQuestionPdfHtml, downloadQuestionPdf, escapeHtml } from '../dist/pdf-generator.js';
import { writtenQuestionsBySubject } from '../dist/solutions/index.js';

test('escapeHtml properly escapes special characters', () => {
  assert.equal(escapeHtml('<script>alert("xss & \'fun\'")</script>'), '&lt;script&gt;alert(&quot;xss &amp; &#39;fun&#39;&quot;)&lt;/script&gt;');
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
  assert.equal(escapeHtml(123), '123');
});

test('generateQuestionPdfHtml generates valid A4 document with 1-page fit constraints', () => {
  const sampleQ = {
    id: 'cn-sample-1',
    kind: 'important',
    unit: 2,
    marks: 7,
    question: 'Explain the OSI Reference Model layers and functions in detail.',
    solution: {
      verified: 'BEU Verified Model Answer · 7 Marks',
      intro: 'The OSI (Open Systems Interconnection) reference model is a conceptual framework.',
      diagrams: [{
        title: '7-Layer OSI Protocol Stack',
        ascii: '+-----------------------+\n| Application Layer (L7)|\n+-----------------------+\n| Presentation Layer(L6)|\n+-----------------------+',
      }],
      table: {
        title: 'Layer Responsibility Matrix',
        headers: ['Layer', 'PDU', 'Key Protocols'],
        rows: [
          ['Application', 'Data', 'HTTP, DNS'],
          ['Transport', 'Segment', 'TCP, UDP'],
        ],
      },
      sections: [
        {
          heading: '1. Lower Layers Overview',
          points: [
            '<b>Physical Layer:</b> Transmits raw bitstream.',
            '<b>Data Link Layer:</b> Node-to-node frame delivery with CRC check.',
          ],
        },
        {
          heading: '2. Upper Layers Overview',
          points: [
            '<b>Transport Layer:</b> End-to-end reliability and flow control.',
            '<b>Application Layer:</b> Interface for user network processes.',
          ],
        },
      ],
      conclusion: 'The OSI model remains the benchmark theoretical architecture for modern networking.',
      markingScheme: [
        { component: 'Architectural Hierarchy & Diagram', marks: '2.0' },
        { component: 'Layer-wise Functional Detail', marks: '3.5' },
        { component: 'Protocol Mapping & Conclusion', marks: '1.5' },
      ],
      examTip: 'Always draw the 7-layer stack vertically with exact layer numbering for maximum marks.',
    },
  };

  const html = generateQuestionPdfHtml(sampleQ, sampleQ.solution, { name: 'Computer Networks', short: 'CN', color: 'green' }, 'sample.pdf');

  // Verify structure
  assert.match(html, /<!DOCTYPE html>/);
  assert.match(html, /<title>sample\.pdf<\/title>/);
  assert.match(html, /@page\s*\{\s*size:\s*A4\s*portrait;\s*margin:\s*4\.5mm\s*6mm;\s*\}/);
  assert.match(html, /-webkit-print-color-adjust:\s*exact/);
  assert.match(html, /column-count:\s*2/);
  assert.match(html, /autoFitPage\(\)/);
  assert.match(html, /MAX_H\s*=\s*1075/);

  // Verify question & solution content completeness
  assert.match(html, /Explain the OSI Reference Model layers and functions in detail\./);
  assert.match(html, /The OSI \(Open Systems Interconnection\) reference model/);
  assert.match(html, /7-Layer OSI Protocol Stack/);
  assert.match(html, /Application Layer \(L7\)/);
  assert.match(html, /Layer Responsibility Matrix/);
  assert.match(html, /HTTP, DNS/);
  assert.match(html, /1\. Lower Layers Overview/);
  assert.match(html, /Transmits raw bitstream/);
  assert.match(html, /The OSI model remains the benchmark theoretical architecture/);
  assert.match(html, /Marking Rubric \(7\.0 Marks\)/);
  assert.match(html, /Architectural Hierarchy &amp; Diagram/);
  assert.match(html, /2\.0M/);
  assert.match(html, /Always draw the 7-layer stack vertically/);
  assert.match(html, /Page 1 of 1 \(Strict A4 Fit\)/);
});

test('generateQuestionPdfHtml handles compact diagram and table in 2-column visual grid', () => {
  const compactQ = {
    id: 'test-compact',
    kind: 'original',
    unit: 1,
    source: { year: 2024, paperCode: '100602', questionNumber: '2(a)' },
    question: 'Compare TCP and UDP protocols.',
    solution: {
      diagrams: [{
        title: 'TCP Handshake',
        ascii: 'A -> SYN -> B\nA <- SYN-ACK <- B\nA -> ACK -> B',
      }],
      table: {
        title: 'TCP vs UDP',
        headers: ['Metric', 'TCP', 'UDP'],
        rows: [
          ['Connection', 'Connection-oriented', 'Connectionless'],
          ['Reliability', 'High', 'Best-effort'],
        ],
      },
      sections: [{ heading: 'Key Points', points: ['Point 1', 'Point 2'] }],
    },
  };

  const html = generateQuestionPdfHtml(compactQ, compactQ.solution, { name: 'Computer Networks', short: 'CN' });
  assert.match(html, /pdf-grid-2col/);
  assert.match(html, /BEU 2024 · 100602 · Q\.2\(a\)/);
});

test('downloadQuestionPdf returns HTML string when executed outside browser', () => {
  const sampleQ = {
    id: 'cn-q1',
    unit: 1,
    marks: 7,
    kind: 'important',
    question: 'What is Computer Networks?',
    solution: {
      sections: [{ heading: 'Overview', points: ['Defines computer networking.'] }],
    },
  };

  const html = downloadQuestionPdf(sampleQ, { name: 'Computer Networks', short: 'CN' });
  assert.match(html, /<!DOCTYPE html>/);
  assert.match(html, /BEU_CN_Unit1_cn-q1\.pdf/);
});

test('downloadQuestionPdf handles missing solutions gracefully', () => {
  let toastMsg = '';
  const result = downloadQuestionPdf({ id: 'no-sol' }, null, msg => { toastMsg = msg; });
  assert.equal(result, undefined);
  assert.match(toastMsg, /No solution available/);
});

test('all 270 questions across all subjects generate complete 1-page A4 HTML without truncation', () => {
  let auditedCount = 0;
  for (const [subjectKey, questions] of Object.entries(writtenQuestionsBySubject)) {
    for (const q of questions) {
      if (!q.solution) continue;
      auditedCount++;
      const html = generateQuestionPdfHtml(q, q.solution, { name: subjectKey.toUpperCase(), short: subjectKey.toUpperCase() });
      assert.ok(html.length > 500, `HTML for ${q.id} should have substantial length`);
      assert.match(html, /@page\s*\{\s*size:\s*A4\s*portrait;\s*margin:\s*4\.5mm\s*6mm;\s*\}/);
      assert.match(html, /autoFitPage\(\)/);
      assert.match(html, /Page 1 of 1 \(Strict A4 Fit\)/);

      // Verify question text appears in HTML
      assert.ok(html.includes(escapeHtml(q.question)), `Question text must be in HTML for ${q.id}`);

      // Verify sections and points are present
      if (q.solution.sections) {
        for (const sec of q.solution.sections) {
          assert.ok(html.includes(escapeHtml(sec.heading)), `Section heading "${sec.heading}" must be in ${q.id}`);
          for (const pt of sec.points) {
            assert.ok(html.includes(pt), `Point content must be in ${q.id}`);
          }
        }
      }

      // Verify diagrams if present
      if (q.solution.diagrams) {
        for (const diag of q.solution.diagrams) {
          assert.ok(html.includes(escapeHtml(diag.title)), `Diagram title must be in ${q.id}`);
        }
      }

      // Verify table if present
      if (q.solution.table) {
        for (const header of q.solution.table.headers) {
          assert.ok(html.includes(escapeHtml(header)), `Table header must be in ${q.id}`);
        }
      }

      // Verify marking scheme if present
      if (q.solution.markingScheme) {
        for (const item of q.solution.markingScheme) {
          assert.ok(html.includes(escapeHtml(item.component)), `Marking item must be in ${q.id}`);
        }
      }

      // Verify exam tip if present
      if (q.solution.examTip) {
        assert.ok(html.includes(escapeHtml(q.solution.examTip)), `Exam tip must be in ${q.id}`);
      }
    }
  }
  assert.equal(auditedCount, 270, 'All 270 solutions should be audited');
});

test('dist/app.js integrates download-pdf button on question cards and in solution view', () => {
  const appCode = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
  assert.match(appCode, /downloadQuestionPdf/);
  assert.match(appCode, /'download-pdf'/);
  assert.match(appCode, /case'download-pdf':/);
  assert.match(appCode, /outline-pdf/);
  assert.match(appCode, /download-solution-btn/);
});

test('dist/style.css defines .outline-pdf and .download-solution-btn classes', () => {
  const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
  assert.match(css, /\.outline-pdf\s*\{/);
  assert.match(css, /\.download-solution-btn\s*\{/);
  assert.match(css, /\[data-theme=dark\]\s*\.outline-pdf/);
});
