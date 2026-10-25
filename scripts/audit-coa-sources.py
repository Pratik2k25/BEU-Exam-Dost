"""Compare COA occurrences and reviewed answer reuse with the supplied CSVs.

Source CSVs are read-only. The resulting JSON is a development audit, not app UI.
"""
import csv
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / 'Downloads'
OUTPUT = ROOT / 'docs/content-audits/coa-pyq-important-audit.json'
SOURCE_FILES = [
    'COA_2024_2025_verified_questions.csv',
    'COA_2023_2024S_verified_questions.csv',
    'COA_2022_2025S_verified_questions.csv',
]


def read_csv(filename):
    with (SOURCE_DIR / filename).open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle))


def normalize(text):
    text = text.replace('’', "'").replace('‘', "'").replace('−', '-').replace('–', '-')
    return re.sub(r'\s+', ' ', text).strip()


def question_key(year, number):
    return re.sub(r'\W', '', str(year)).lower(), re.sub(r'\W', '', number).lower()


node_script = """
import {coaOriginalQuestions as questions} from './scripts/questions/coa/original.mjs';
import {coaImportantQuestions as important} from './scripts/questions/coa/important.mjs';
import {coaReviewedEntries as entries} from './scripts/solutions/coa/original.mjs';
console.log(JSON.stringify({questions,important,entries}));
"""
result = subprocess.run(['node', '--input-type=module', '-e', node_script], cwd=ROOT,
                        check=True, capture_output=True, text=True, encoding='utf-8')
content = json.loads(result.stdout)
master = [row for row in read_csv('BEU_Exam_Dost_PYQ_master_344_occurrences.csv')
          if row['subject'] == 'COA' and row['marks'] == '7']
verified = [dict(row, csv_file=filename) for filename in SOURCE_FILES for row in read_csv(filename)
            if row['subject'] == 'COA' and row['marks'] == '7']
prior = [row for row in read_csv('BEU_344_PYQ_vs_132_Important_FULL_COMPARISON.csv')
         if row['subject'] == 'COA' and row['marks'] == '7']
candidate_rows = [row for row in read_csv('PYQ_vs_Important_115_review_candidates.csv')
                  if row['subject'] == 'COA']

def index_by_key(rows, year_field, number_field, label):
    indexed = {}
    for row in rows:
        key = question_key(row[year_field], row[number_field])
        if key in indexed:
            raise ValueError(f'duplicate {label} source key: {key}')
        indexed[key] = row
    return indexed


verified_by_key = index_by_key(verified, 'year', 'question_no', 'verified CSV')
master_by_key = index_by_key(master, 'year', 'question_number', 'master CSV')
candidate_by_id = {row['record_id']: row for row in candidate_rows}
entry_by_question = {qid: entry for entry in content['entries'] for qid in entry['questionIds']}
errors, rows = [], []
for question in content['questions']:
    year = str(question['source']['year'])
    if question['source'].get('session') == 'supplementary':
        year += ' (S)'
    key = question_key(year, question['source']['questionNumber'])
    source = verified_by_key.get(key)
    raw = master_by_key.get(key)
    entry = entry_by_question[question['id']]
    if source is None or raw is None:
        errors.append({'questionId': question['id'], 'error': 'missing verified/master source'})
        continue
    wording_matches = normalize(question['question']) == normalize(source['question'])
    master_matches = normalize(question['question']) == normalize(raw['question_text'])
    if not wording_matches or not master_matches:
        errors.append({'questionId': question['id'], 'error': 'question wording mismatch'})
    source_page = int(source['source_page'])
    asset_matches = question['source']['url'].endswith(f'-page-{source_page}.png')
    if not asset_matches:
        errors.append({'questionId': question['id'], 'error': 'source-page mismatch'})
    prior_row = next((row for row in prior if row['pyq_id'] == raw['record_id']), {})
    candidate = candidate_by_id.get(raw['record_id'], {})
    repeats = [other['id'] for other in content['questions']
               if other['id'] != question['id'] and normalize(other['question']) == normalize(question['question'])]
    rows.append({
        'questionId': question['id'], 'sourceRecordId': raw['record_id'], 'year': year,
        'questionNumber': question['source']['questionNumber'], 'marks': question['marks'],
        'question': question['question'], 'sourceCsv': source['csv_file'],
        'sourceFile': source['source_file'], 'sourcePage': source_page,
        'wordingMatchesVerifiedCsv': wording_matches, 'wordingMatchesMaster': master_matches,
        'sourcePageMatches': asset_matches, 'solutionRef': question['solutionRef'],
        'decision': entry['overlapDecision'], 'decisionReason': entry['reason'],
        'importantMatches': entry['importantMatches'],
        'priorSuggestedImportantId': prior_row.get('closest_important_id') or None,
        'priorSuggestionStatus': prior_row.get('final_duplicate_status') or None,
        'priorReviewCandidates': candidate.get('important_question_candidates') or None,
        'exactTextOtherOccurrences': repeats,
    })

if len(rows) != len(master) or len(rows) != len(verified) or len(rows) != 90:
    errors.append({'error': 'source/compiled occurrence counts must all equal 90',
                   'compiled': len(rows), 'master': len(master), 'verified': len(verified)})
reuse_rows = [row for row in rows if row['decision'] == 'reuse']
report = {
    'subject': 'coa',
    'method': 'Compare original wording, session, numbering, marks and source page with verified CSVs and master; inspect full Important answers before deciding reuse. Prior similarity suggestions are unverified candidates, never proof of equivalence. Preserve every original occurrence and all Important questions.',
    'summary': {
        'originalOccurrences': len(rows), 'importantQuestionsPreserved': len(content['important']),
        'occurrencesReusingImportantAnswer': len(reuse_rows),
        'occurrencesUsingDedicatedAnswer': len(rows) - len(reuse_rows),
        'distinctReusedImportantAnswers': len({row['solutionRef'] for row in reuse_rows}),
        'distinctDedicatedAnswers': len({row['solutionRef'] for row in rows if row['decision'] == 'dedicated'}),
        'sourceErrors': len(errors),
    },
    'inputFiles': SOURCE_FILES + ['BEU_Exam_Dost_PYQ_master_344_occurrences.csv',
                                 'BEU_344_PYQ_vs_132_Important_FULL_COMPARISON.csv',
                                 'PYQ_vs_Important_115_review_candidates.csv'],
    'rows': rows, 'errors': errors,
}
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report['summary']))
if errors:
    print(json.dumps(errors, ensure_ascii=False))
    sys.exit(1)
