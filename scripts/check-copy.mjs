import { readFile } from 'node:fs/promises';
import data from '../src/data/indicators.json' with { type: 'json' };
import { verdicts } from './scoring.mjs';

const source = await readFile('src/i18n.ts', 'utf8');
const en = source.slice(source.indexOf('  en:'), source.indexOf('  es:'));
const es = source.slice(source.indexOf('  es:'), source.indexOf('export const indicatorCopy'));
const indicatorBlock = source.slice(source.indexOf('export const indicatorCopy'), source.indexOf('export const statusCopy'));

for (const [locale, block] of Object.entries({ en, es })) {
  for (const verdict of verdicts) {
    const occurrences = block.match(new RegExp(`\\b${verdict}:`, 'g'))?.length ?? 0;
    if (occurrences < 3) throw new Error(`${locale}: ${verdict} needs a label, hero summary and explainer description`);
  }
  for (const tier of ['high', 'medium', 'low']) {
    if (!block.includes(`${tier}:`)) throw new Error(`${locale}: missing ${tier} confidence description`);
  }
}

for (const indicator of data.indicators) {
  if (!new RegExp(`\\b${indicator.id}:\\s*\\{`).test(indicatorBlock)) throw new Error(`Spanish copy missing for ${indicator.id}`);
}

console.log(`${verdicts.length * 3} verdict/breadth combinations and 3 confidence tiers have complete EN/ES copy.`);
