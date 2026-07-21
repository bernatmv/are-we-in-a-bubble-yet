import { readFile } from 'node:fs/promises';
import { calculateScore, getSummary, getVerdict } from './scoring.mjs';

const data = JSON.parse(await readFile('src/data/indicators.json', 'utf8'));
const score = calculateScore(data.indicators);
const verdict = getVerdict(score);

if (data.score !== score) throw new Error(`Stored score ${data.score} does not match calculated score ${score}`);
if (data.verdict !== verdict) throw new Error(`Stored verdict ${data.verdict} does not match score band ${verdict}`);
if (data.summary !== getSummary(verdict)) throw new Error('Verdict description does not match the current score band');

for (const indicator of data.indicators) {
  const start = Number(indicator.history[0]?.[0]);
  const end = Number(indicator.history.at(-1)?.[0]);
  if (start > 2000 || end < 2020) throw new Error(`${indicator.id} history does not span the reference crises`);
}

console.log(`Data model valid: ${data.verdict}, ${data.score}/100; every series spans 2000–2020.`);
