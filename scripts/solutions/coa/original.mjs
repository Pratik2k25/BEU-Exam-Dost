import {entries as entries0, importantCorrections as corrections0} from './original-architecture.mjs';
import {entries as entries1, importantCorrections as corrections1} from './original-arithmetic.mjs';
import {entries as entries2, importantCorrections as corrections2} from './original-memory.mjs';
import {entries as entries3, importantCorrections as corrections3} from './original-pipeline.mjs';

// Explicit reviewed mappings: topic similarity alone never authorizes answer reuse.
export const coaReviewedEntries = [...entries0, ...entries1, ...entries2, ...entries3];
export const coaImportantCorrections = [...corrections0, ...corrections1, ...corrections2, ...corrections3];
export const coaImportantCorrectionsById = Object.fromEntries(coaImportantCorrections.map(answer=>[answer.id,answer]));
export const coaOriginalSolutionsByUnit = Object.fromEntries(Array.from({length:6},(_,i)=>[i+1,coaReviewedEntries.filter(entry=>entry.solution&&entry.unit===i+1).map(entry=>entry.solution)]));
