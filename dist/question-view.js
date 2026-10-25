export function filterWrittenQuestions(items, {kind = 'original', unit = 'all', year = 'all', savedOnly = false, saved = []} = {}) {
  return items.filter(item => item.kind === kind)
    .filter(item => unit === 'all' || item.unit === Number(unit))
    .filter(item => year === 'all' || item.source?.year === Number(year))
    .filter(item => !savedOnly || saved.includes(item.id));
}

export function questionSourceLabel(item) {
  if (item.kind === 'important') return 'Important 7-Mark Question';
  return `BEU ${item.source.year} · ${item.source.paperCode} · Q.${item.source.questionNumber}`;
}

export function questionSourceLink(item) {
  const url = item.source?.url;
  if (!url) return null;
  return {
    href: url.startsWith('docs/content-sources/') ? `/${url}` : url,
    label: item.source.verification === 'cross-checked-scan' ? 'View source scan' : 'Official paper',
  };
}

export function renderQuestionFilters({kind = 'original', unit = 'all', year = 'all', units = [], years = [], savedOnly = false} = {}) {
  const isOriginal = kind === 'original';
  const unitOptions = units.map(u => `<option value="${u.id}" ${unit == u.id ? 'selected' : ''}>Unit ${u.id} · ${u.title}</option>`).join('');
  const yearOptions = years.map(y => `<option value="${y}" ${year == y ? 'selected' : ''}>${y} Paper</option>`).join('');

  return `<div class="question-kind-tabs" role="tablist" aria-label="Question Category">`
    + `<button type="button" class="chip ${isOriginal ? 'selected' : ''}" role="tab" aria-selected="${isOriginal}" data-action="pyq-kind" data-kind="original">Original PYQs</button>`
    + `<button type="button" class="chip ${!isOriginal ? 'selected' : ''}" role="tab" aria-selected="${!isOriginal}" data-action="pyq-kind" data-kind="important">Important 7-Mark Questions</button>`
    + `</div>`
    + `<div class="filter-row">`
    + `<label class="sr-only" for="pyq-unit">Filter unit</label>`
    + `<select id="pyq-unit" data-change="pyq-unit">`
    + `<option value="all">All units</option>`
    + unitOptions
    + `</select>`
    + (isOriginal && years.length ? `<label class="sr-only" for="pyq-year">Filter year</label>`
      + `<select id="pyq-year" data-change="pyq-year">`
      + `<option value="all">All years</option>`
      + yearOptions
      + `</select>` : '')
    + `<button type="button" class="button outline ${savedOnly ? 'is-active' : ''}" data-action="saved-filter">Saved</button>`
    + `</div>`;
}

export function questionEmptyState(kind, savedOnly = false) {
  if (savedOnly) {
    return 'No saved questions in this selection.';
  }
  if (kind === 'original') {
    return 'No verified original PYQ papers available for this filter yet. Switch to "Important 7-Mark Questions" for verified model solutions.';
  }
  return 'No important questions in this selection.';
}
