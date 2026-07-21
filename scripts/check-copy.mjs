import { readFile } from 'node:fs/promises';
import data from '../src/data/indicators.json' with { type: 'json' };
import { verdicts } from './scoring.mjs';

const source = await readFile('src/i18n.ts', 'utf8');
const locales = ['en', 'es', 'ca', 'de', 'fr', 'it', 'ja'];
const copyBlock = source.slice(source.indexOf('export const copy'), source.indexOf('export const indicatorCopy'));
const indicatorBlock = source.slice(source.indexOf('export const indicatorCopy'), source.indexOf('export const statusCopy'));

for (const [index, locale] of locales.entries()) {
  const start = copyBlock.indexOf(`  ${locale}:`);
  const end = index === locales.length - 1 ? copyBlock.length : copyBlock.indexOf(`  ${locales[index + 1]}:`, start);
  const block = copyBlock.slice(start, end);
  for (const verdict of verdicts) {
    const occurrences = block.match(new RegExp(`\\b${verdict}:`, 'g'))?.length ?? 0;
    if (occurrences < 3) throw new Error(`${locale}: ${verdict} needs a label, hero summary and explainer description`);
  }
  for (const tier of ['high', 'medium', 'low']) {
    if (!block.includes(`${tier}:`)) throw new Error(`${locale}: missing ${tier} confidence description`);
  }
}

for (const indicator of data.indicators) {
  const occurrences = indicatorBlock.match(new RegExp(`\\b${indicator.id}:\\s*\\{`, 'g'))?.length ?? 0;
  if (occurrences !== locales.length - 1) throw new Error(`${indicator.id} needs translations in all non-English locales`);
}

console.log(`${verdicts.length * 3} verdict/breadth combinations, 3 confidence tiers and 6 signals have complete copy in ${locales.length} languages.`);
