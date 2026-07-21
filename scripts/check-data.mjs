import { readFile } from 'node:fs/promises';
import { calculateConfidence, calculateScore, getSummary, getVerdict, verdicts, weights } from './scoring.mjs';

const data = JSON.parse(await readFile('src/data/indicators.json', 'utf8'));
const score = calculateScore(data.indicators);
const verdict = getVerdict(score);

if (data.score !== score) throw new Error(`Stored score ${data.score} does not match calculated score ${score}`);
if (data.verdict !== verdict) throw new Error(`Stored verdict ${data.verdict} does not match score band ${verdict}`);
if (data.summary !== getSummary(verdict)) throw new Error('Verdict description does not match the current score band');
if (data.confidence !== calculateConfidence(data.indicators, score)) throw new Error('Stored confidence does not match signal agreement');
if (Math.abs(Object.values(weights).reduce((sum, weight) => sum + weight, 0) - 1) > Number.EPSILON) throw new Error('Indicator weights must total 100%');
if (data.indicators.some((indicator) => !(indicator.id in weights))) throw new Error('An indicator is missing from the composite weights');
if (verdicts.some((state) => !getSummary(state))) throw new Error('A verdict is missing its description');

for (const [testScore, expected] of [[0, 'NO'], [29, 'NO'], [30, 'NOT_YET'], [44, 'NOT_YET'], [45, 'MAYBE'], [59, 'MAYBE'], [60, 'PROBABLY'], [74, 'PROBABLY'], [75, 'YES'], [100, 'YES']]) {
  if (getVerdict(testScore) !== expected) throw new Error(`${testScore} should produce ${expected}`);
}
if (data.confidence < 0 || data.confidence > 100) throw new Error('Confidence must stay between 0 and 100');

for (const indicator of data.indicators) {
  const start = Number(indicator.history[0]?.[0]);
  const end = Number(indicator.history.at(-1)?.[0]);
  if (start > 2000 || end < 2022) throw new Error(`${indicator.id} history does not span the reference crises`);
  if (indicator.history.length < 30) throw new Error(`${indicator.id} needs at least 30 historical chart points`);
}

console.log(`Data model valid: ${data.verdict}, ${data.score}/100, ${data.confidence}% confidence; every series spans 2000–2022.`);
