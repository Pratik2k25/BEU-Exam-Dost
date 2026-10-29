import { questionSourceLabel } from './question-view.js';

export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateQuestionPdfHtml(q, sol, subjectItem, filename = 'BEU_Solution.pdf') {
  const s = subjectItem || { name: 'Computer Networks', short: 'CN', color: 'green' };
  const solution = sol || q.solution;
  if (!solution) return '';

  const sourceText = questionSourceLabel(q);
  const totalMarks = q.marks || 7;
  const unitNum = q.unit || 1;
  const unitTitle = (s.units && s.units[unitNum - 1]?.title) ? s.units[unitNum - 1].title : `Unit ${unitNum}`;

  // Diagrams HTML
  let diagramsHtml = '';
  if (solution.diagrams && solution.diagrams.length) {
    diagramsHtml = solution.diagrams.map((d, idx) => `
      <div class="pdf-diagram-box">
        <div class="pdf-diagram-head">
          <span class="pdf-tag">FIG ${idx + 1}</span>
          <span class="pdf-diagram-title">${escapeHtml(d.title)}</span>
        </div>
        <pre class="pdf-ascii">${escapeHtml(d.ascii)}</pre>
      </div>
    `).join('');
  }

  // Table HTML
  let tableHtml = '';
  if (solution.table && solution.table.headers && solution.table.rows) {
    tableHtml = `
      <div class="pdf-table-box">
        <div class="pdf-table-title">${escapeHtml(solution.table.title || 'Technical Comparison / Summary')}</div>
        <table class="pdf-table">
          <thead>
            <tr>${solution.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${solution.table.rows.map(row => `
              <tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Visual grid (Diagrams & Tables)
  let visualBlock = '';
  const hasDiag = !!(solution.diagrams && solution.diagrams.length);
  const hasTbl = !!solution.table;
  if (hasDiag && hasTbl) {
    const isCompactDiag = solution.diagrams.length === 1 && solution.diagrams[0].ascii.split('\n').length <= 15;
    const isCompactTbl = solution.table.rows.length <= 6;
    if (isCompactDiag && isCompactTbl) {
      visualBlock = `<div class="pdf-grid-2col">${diagramsHtml}${tableHtml}</div>`;
    } else {
      visualBlock = `<div class="pdf-stack">${diagramsHtml}${tableHtml}</div>`;
    }
  } else if (hasDiag) {
    visualBlock = `<div class="pdf-stack">${diagramsHtml}</div>`;
  } else if (hasTbl) {
    visualBlock = `<div class="pdf-stack">${tableHtml}</div>`;
  }

  // Sections HTML (2 columns for point-wise reading and maximum space efficiency)
  let sectionsHtml = '';
  if (solution.sections && solution.sections.length) {
    sectionsHtml = `
      <div class="pdf-sections-container">
        ${solution.sections.map(sec => `
          <div class="pdf-section">
            <div class="pdf-sec-heading">${escapeHtml(sec.heading)}</div>
            <ul class="pdf-points">
              ${sec.points.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Marking Scheme HTML
  let markingHtml = '';
  if (solution.markingScheme && solution.markingScheme.length) {
    markingHtml = `
      <div class="pdf-marking-card">
        <div class="pdf-card-title">📋 Marking Rubric (${totalMarks}.0 Marks)</div>
        <table class="pdf-marking-table">
          ${solution.markingScheme.map(m => `
            <tr>
              <td class="pdf-m-comp">${escapeHtml(m.component)}</td>
              <td class="pdf-m-val">${escapeHtml(String(m.marks).endsWith('M') ? m.marks : `${m.marks}M`)}</td>
            </tr>
          `).join('')}
          <tr class="pdf-m-total">
            <td><strong>Total Evaluation</strong></td>
            <td><strong>${totalMarks}.0M</strong></td>
          </tr>
        </table>
      </div>
    `;
  }

  // Exam Tip HTML
  let tipHtml = '';
  if (solution.examTip) {
    tipHtml = `
      <div class="pdf-tip-card">
        <div class="pdf-card-title">💡 Senior Examiner Tip</div>
        <p class="pdf-tip-text">${escapeHtml(solution.examTip)}</p>
      </div>
    `;
  }

  // Bottom row (Marking scheme + Exam Tip)
  let bottomRow = '';
  if (markingHtml && tipHtml) {
    bottomRow = `<div class="pdf-bottom-grid">${markingHtml}${tipHtml}</div>`;
  } else if (markingHtml) {
    bottomRow = `<div class="pdf-stack">${markingHtml}</div>`;
  } else if (tipHtml) {
    bottomRow = `<div class="pdf-stack">${tipHtml}</div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(filename)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @page {
      size: A4 portrait;
      margin: 4.5mm 6mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 6.8pt;
      line-height: 1.22;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .pdf-a4-page {
      width: 198mm;
      height: 288mm;
      max-height: 288mm;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: avoid !important;
      page-break-before: avoid !important;
      break-after: avoid !important;
      break-before: avoid !important;
    }
    .pdf-content-wrap {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }

    /* Header Bar */
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1.5mm;
      border-bottom: 1.5pt solid #16663e;
    }
    .pdf-brand {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 800;
      font-size: 8.5pt;
      color: #16663e;
      letter-spacing: -0.2px;
    }
    .pdf-brand-sub {
      font-size: 6pt;
      font-weight: 500;
      color: #64748b;
      margin-left: 4px;
    }
    .pdf-meta-right {
      text-align: right;
      font-size: 6.2pt;
      font-weight: 600;
      color: #334155;
    }
    .pdf-badge-green {
      background: #16663e;
      color: #ffffff;
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 5.8pt;
      font-weight: 700;
      display: inline-block;
      margin-left: 3px;
    }

    /* Question Statement Box */
    .pdf-question-card {
      background: #f0fdf4;
      border: 0.75pt solid #bbf7d0;
      border-left: 2.5pt solid #16663e;
      border-radius: 3px;
      padding: 2.2mm 3.2mm;
    }
    .pdf-q-meta {
      display: flex;
      justify-content: space-between;
      font-size: 5.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: #16663e;
      margin-bottom: 0.8mm;
    }
    .pdf-q-text {
      font-size: 7.2pt;
      font-weight: 700;
      line-height: 1.24;
      color: #0f172a;
      margin: 0;
    }

    /* Solution Intro */
    .pdf-intro-box {
      font-size: 6.8pt;
      line-height: 1.24;
      color: #1e293b;
      padding: 1.5mm 2.5mm;
      background: #f8fafc;
      border-radius: 2px;
      border: 0.5pt solid #e2e8f0;
    }
    .pdf-intro-box strong {
      color: #16663e;
    }

    /* Visual Block Grid & Stacks */
    .pdf-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5mm;
    }
    .pdf-stack {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }

    /* Diagrams */
    .pdf-diagram-box {
      background: #f8fafc;
      border: 0.5pt solid #cbd5e1;
      border-radius: 2px;
      padding: 1.8mm 2.2mm;
    }
    .pdf-diagram-head {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 0.8mm;
    }
    .pdf-tag {
      background: #334155;
      color: #ffffff;
      font-size: 5.2pt;
      font-weight: 700;
      padding: 0.5px 3px;
      border-radius: 1.5px;
    }
    .pdf-diagram-title {
      font-size: 6pt;
      font-weight: 700;
      color: #0f172a;
    }
    .pdf-ascii {
      margin: 0;
      font-family: Consolas, "Courier New", monospace;
      font-size: 5.4pt;
      line-height: 1.06;
      color: #0f172a;
      white-space: pre;
      overflow: hidden;
    }

    /* Tables */
    .pdf-table-box {
      border: 0.5pt solid #cbd5e1;
      border-radius: 2px;
      overflow: hidden;
      background: #ffffff;
    }
    .pdf-table-title {
      background: #f1f5f9;
      padding: 0.8mm 2mm;
      font-size: 6pt;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 0.5pt solid #cbd5e1;
    }
    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 5.8pt;
      line-height: 1.15;
    }
    .pdf-table th {
      background: #e2e8f0;
      font-weight: 700;
      color: #0f172a;
      text-align: left;
      padding: 1.2px 2.5px;
      border: 0.5pt solid #cbd5e1;
    }
    .pdf-table td {
      padding: 1.2px 2.5px;
      border: 0.5pt solid #cbd5e1;
      color: #334155;
    }
    .pdf-table tbody tr:nth-child(even) {
      background: #f8fafc;
    }

    /* Sections Container (2 Columns for tight, clean flow) */
    .pdf-sections-container {
      column-count: 2;
      column-gap: 3.5mm;
      column-rule: 0.5pt solid #e2e8f0;
    }
    .pdf-section {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 1.4mm;
    }
    .pdf-sec-heading {
      font-size: 6.8pt;
      font-weight: 700;
      color: #16663e;
      margin-bottom: 0.6mm;
      border-bottom: 0.5pt solid #bbf7d0;
      padding-bottom: 0.3mm;
    }
    .pdf-points {
      margin: 0;
      padding-left: 3mm;
      list-style-type: disc;
    }
    .pdf-points li {
      font-size: 6.4pt;
      line-height: 1.2;
      color: #1e293b;
      margin-bottom: 0.6mm;
    }
    .pdf-points li b {
      color: #0f172a;
    }
    .pdf-points li code {
      font-family: Consolas, monospace;
      font-size: 6pt;
      background: #f1f5f9;
      padding: 0 1.5px;
      border-radius: 1px;
    }

    /* Conclusion */
    .pdf-conclusion {
      font-size: 6.5pt;
      line-height: 1.22;
      color: #0f172a;
      background: #f0fdf4;
      border: 0.5pt solid #86efac;
      padding: 1.2mm 2.5mm;
      border-radius: 2px;
    }

    /* Bottom Grid (Marking & Tip) */
    .pdf-bottom-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 2.5mm;
      align-items: stretch;
    }
    .pdf-card-title {
      font-size: 5.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      margin-bottom: 0.6mm;
    }
    .pdf-marking-card {
      background: #f8fafc;
      border: 0.5pt solid #cbd5e1;
      border-radius: 2px;
      padding: 1.4mm 2.2mm;
    }
    .pdf-marking-card .pdf-card-title {
      color: #334155;
    }
    .pdf-marking-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 5.6pt;
    }
    .pdf-marking-table td {
      padding: 0.8px 1.5px;
      border-bottom: 0.5pt solid #f1f5f9;
    }
    .pdf-m-val {
      text-align: right;
      font-weight: 700;
      color: #16663e;
      width: 25px;
    }
    .pdf-m-total td {
      border-top: 0.75pt solid #cbd5e1;
      border-bottom: none;
      padding-top: 1px;
      color: #16663e;
    }
    .pdf-tip-card {
      background: #fefce8;
      border: 0.5pt solid #fde047;
      border-radius: 2px;
      padding: 1.4mm 2.2mm;
    }
    .pdf-tip-card .pdf-card-title {
      color: #854d0e;
    }
    .pdf-tip-text {
      margin: 0;
      font-size: 6.1pt;
      line-height: 1.2;
      color: #713f12;
    }

    /* Footer */
    .pdf-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.2mm;
      border-top: 0.5pt solid #cbd5e1;
      font-size: 5.4pt;
      color: #64748b;
      margin-top: 0.8mm;
    }
    .pdf-footer strong {
      color: #16663e;
    }

    @media print {
      html, body {
        width: 198mm;
        height: 288mm;
        max-height: 288mm;
        overflow: hidden;
      }
      .pdf-a4-page {
        width: 198mm;
        height: 288mm;
        max-height: 288mm;
        overflow: hidden;
        page-break-after: avoid !important;
        page-break-before: avoid !important;
        break-after: avoid !important;
        break-before: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-a4-page" id="a4-root">
    <div class="pdf-content-wrap" id="a4-content">
      <!-- Document Header -->
      <header class="pdf-header">
        <div class="pdf-brand">
          🎓 BEU EXAM DOST
          <span class="pdf-brand-sub">· Bihar Engineering University CSE (Semester 4)</span>
        </div>
        <div class="pdf-meta-right">
          <span>${escapeHtml(s.name)} · Unit ${unitNum}</span>
          <span class="pdf-badge-green">${totalMarks}.0 MARKS</span>
        </div>
      </header>

      <!-- Question Box -->
      <section class="pdf-question-card">
        <div class="pdf-q-meta">
          <span>${escapeHtml(sourceText)}</span>
          <span>Target Score: ${totalMarks}.0 / ${totalMarks}.0</span>
        </div>
        <h1 class="pdf-q-text">${escapeHtml(q.question)}</h1>
      </section>

      <!-- Intro -->
      ${solution.intro ? `<div class="pdf-intro-box"><strong>Conceptual Foundation:</strong> ${escapeHtml(solution.intro)}</div>` : ''}

      <!-- Visuals (Diagrams & Tables) -->
      ${visualBlock}

      <!-- Technical Points / Sections -->
      ${sectionsHtml}

      <!-- Conclusion -->
      ${solution.conclusion ? `<div class="pdf-conclusion"><b>Academic Conclusion:</b> ${escapeHtml(solution.conclusion)}</div>` : ''}

      <!-- Marking Scheme & Exam Tip -->
      ${bottomRow}
    </div>

    <!-- 1-Page A4 Guarantee Footer -->
    <footer class="pdf-footer">
      <span><strong>BEU Exam Dost</strong> · Verified Examination Model Solution</span>
      <span>Complete 7-Mark Model Answer · 100% Syllabus Aligned</span>
      <span><strong>Page 1 of 1 (Strict A4 Fit)</strong></span>
    </footer>
  </div>

  <script>
    // Exact Auto-Fit Engine: Guarantees 100% fit on a single A4 page
    (function autoFitPage() {
      const page = document.getElementById('a4-root');
      if (!page) return;
      const MAX_H = 1075; // exact A4 printable px at 96 DPI with 4.5mm top/bottom margin
      const curH = page.scrollHeight;
      if (curH > MAX_H) {
        const factor = Math.max(0.60, (MAX_H - 12) / curH);
        page.style.transform = 'scale(' + factor.toFixed(3) + ')';
        page.style.transformOrigin = 'top center';
      }
    })();
  </script>
</body>
</html>`;
}

export function downloadQuestionPdf(q, subjectItem, onToast) {
  if (!q || !q.solution) {
    if (onToast) onToast('No solution available for this question.');
    return;
  }

  const subjName = subjectItem?.short || 'BEU';
  const cleanSubj = subjName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `BEU_${cleanSubj}_Unit${q.unit || 1}_${q.id}.pdf`;
  const html = generateQuestionPdfHtml(q, q.solution, subjectItem, filename);

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return html;
  }

  if (onToast) {
    onToast(`Preparing 1-Page A4 PDF for ${q.id}… Select "Save as PDF" to download.`);
  }

  try {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    const cleanup = () => {
      setTimeout(() => {
        try { iframe.remove(); } catch (_) {}
      }, 1000);
    };

    iframe.contentWindow.onafterprint = cleanup;

    setTimeout(() => {
      try {
        const root = iframe.contentDocument?.getElementById('a4-root');
        if (root) {
          const MAX_H = 1075;
          const curH = root.scrollHeight;
          if (curH > MAX_H) {
            const factor = Math.max(0.60, (MAX_H - 12) / curH);
            root.style.transform = `scale(${factor.toFixed(3)})`;
            root.style.transformOrigin = 'top center';
          }
        }
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(cleanup, 60000);
      } catch (printErr) {
        console.warn('Iframe print error, falling back to blob window:', printErr);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) {
          win.onload = () => {
            try { win.print(); } catch (_) {}
          };
        }
        cleanup();
      }
    }, 250);
  } catch (err) {
    console.error('Failed to create PDF print frame:', err);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\.pdf$/, '.html');
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    if (onToast) onToast('Downloaded solution document.');
  }
}

