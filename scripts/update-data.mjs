import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dataPath = resolve('src/data/indicators.json');
const dashboard = JSON.parse(await readFile(dataPath, 'utf8'));

const clamp = (value, min = 0, max = 100) => Math.round(Math.max(min, Math.min(max, value)));
const indicator = (id) => dashboard.indicators.find((item) => item.id === id);
const monthYear = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));

async function fetchBuffer(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'areweinabubleyet.com data updater' } });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function fetchText(url) {
  return (await fetchBuffer(url)).toString('utf8');
}

function visibleText(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;|&#(?:x[\da-f]+|\d+);/gi, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
}

async function fred(seriesId) {
  const text = await fetchText(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`);
  return text.trim().split(/\r?\n/).slice(1).map((line) => {
    const [date, raw] = line.split(',');
    return { date, value: Number(raw) };
  }).filter((point) => Number.isFinite(point.value));
}

function annualHistory(points, transform = (value) => value) {
  const years = new Map();
  for (const point of points) years.set(Number(point.date.slice(0, 4)), [Number(point.date.slice(0, 4)), transform(point.value)]);
  return [...years.values()].filter(([year]) => year >= 1997).slice(-30);
}

async function updateFastSignals() {
  const [vixPoints, creditPoints] = await Promise.all([fred('VIXCLS'), fred('BAMLH0A0HYM2')]);
  const vixLast = vixPoints.at(-1);
  const creditLast = creditPoints.at(-1);

  Object.assign(indicator('vix'), {
    value: Number(vixLast.value.toFixed(1)), displayValue: vixLast.value.toFixed(1),
    change: vixLast.value < 14 ? 'Exceptionally quiet' : vixLast.value < 20 ? 'Quiet, but not euphoric' : 'Risk awareness is elevated',
    score: clamp((30 - vixLast.value) / 20 * 100), status: vixLast.value < 14 ? 'Complacent' : 'Neutral',
    asOf: monthYear(vixLast.date), history: annualHistory(vixPoints, (v) => Number(v.toFixed(1)))
  });
  Object.assign(indicator('credit'), {
    value: Number(creditLast.value.toFixed(2)), displayValue: `${creditLast.value.toFixed(1)}%`,
    change: creditLast.value < 3.25 ? 'Lenders are pricing in little risk' : 'Credit risk is being priced in',
    score: clamp((6.5 - creditLast.value) / 4 * 100), status: creditLast.value < 3.25 ? 'Complacent' : 'Neutral',
    asOf: monthYear(creditLast.date), history: annualHistory(creditPoints, (v) => Number(v.toFixed(2)))
  });
}

async function updateBuffettIndicator() {
  const [equity, gdp] = await Promise.all([fred('NCBEILQ027S'), fred('GDP')]);
  const gdpByQuarter = new Map(gdp.map((point) => [point.date, point.value]));
  const ratios = equity.flatMap((point) => {
    const output = gdpByQuarter.get(point.date);
    return output ? [{ date: point.date, value: point.value / (output * 1000) * 100 }] : [];
  });
  const last = ratios.at(-1);
  const value = Number(last.value.toFixed(0));
  Object.assign(indicator('buffett'), {
    value, displayValue: `${value}%`, change: 'Latest quarterly reading', score: clamp((value - 80) / 160 * 100),
    status: value >= 180 ? 'Extreme' : value >= 140 ? 'Elevated' : 'Neutral', asOf: `Q${Math.floor(new Date(last.date).getUTCMonth() / 3) + 1} ${last.date.slice(0, 4)}`,
    history: annualHistory(ratios, (v) => Number(v.toFixed(0)))
  });
}

async function updateCape() {
  const text = visibleText(await fetchText('https://www.multpl.com/shiller-pe/table/by-month'));
  const monthNumber = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const points = [...text.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+(\d{4})\s+(\d+(?:\.\d+)?)/g)]
    .map((match) => ({ date: `${match[2]}-${monthNumber[match[1]]}-01`, value: Number(match[3]) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!points.length) throw new Error('CAPE values not found in table');
  const last = points.at(-1);
  const value = Number(last.value.toFixed(1));
  Object.assign(indicator('cape'), {
    value, displayValue: `${value.toFixed(1)}×`, change: 'Latest monthly reading', score: clamp((value - 18) / 24 * 100),
    status: value >= 30 ? 'Extreme' : value >= 24 ? 'Elevated' : 'Neutral', asOf: monthYear(last.date),
    history: annualHistory(points, (v) => Number(v.toFixed(1)))
  });
}

async function updateMarginDebt() {
  const text = visibleText(await fetchText('https://www.finra.org/rules-guidance/key-topics/margin-accounts/margin-statistics'));
  const monthNumber = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const recent = [...text.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2,4})\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)/g)]
    .map((match) => ({ date: `${match[2].length === 2 ? `20${match[2]}` : match[2]}-${monthNumber[match[1]]}-01`, value: Number(match[3].replaceAll(',', '')) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!recent.length) throw new Error('Margin debt values not found in FINRA table');
  const points = recent;
  const last = points.at(-1);
  const prior = points.findLast((point) => point.date <= `${Number(last.date.slice(0, 4)) - 1}-${last.date.slice(5)}`);
  const growth = prior ? (last.value / prior.value - 1) * 100 : 0;
  Object.assign(indicator('margin'), {
    value: Math.round(last.value), displayValue: `$${(last.value / 1_000_000).toFixed(2)}T`, change: `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}% year over year`,
    score: clamp((growth + 10) / 50 * 100), status: growth >= 25 ? 'Extreme' : growth >= 12 ? 'Elevated' : 'Neutral', asOf: monthYear(last.date),
    history: [...indicator('margin').history.filter(([year]) => year < Number(last.date.slice(0, 4))), [Number(last.date.slice(0, 4)), Math.round(last.value)]].slice(-30)
  });
}

const updates = await Promise.allSettled([updateFastSignals(), updateBuffettIndicator(), updateCape(), updateMarginDebt()]);
for (const result of updates) if (result.status === 'rejected') console.warn(result.reason.message);
if (updates.every((result) => result.status === 'rejected')) throw new Error('Every data source failed; dashboard was not changed');

const weights = { cape: .30, buffett: .25, margin: .25, credit: .12, vix: .08 };
dashboard.score = Math.round(dashboard.indicators.reduce((sum, item) => sum + item.score * weights[item.id], 0));
dashboard.verdict = dashboard.score >= 70 ? 'YES' : dashboard.score >= 45 ? 'MAYBE' : 'NO';
dashboard.summary = dashboard.score >= 70
  ? 'Valuations and investor leverage are stretched. Credit and sentiment decide how close the signal sits to maximum alert.'
  : dashboard.score >= 45 ? 'Some warning signs are elevated, but the evidence is not broad enough for a clear bubble call.'
  : 'The major valuation, leverage, and credit signals are not jointly showing bubble conditions.';
dashboard.updatedAt = new Date().toISOString();
await writeFile(dataPath, `${JSON.stringify(dashboard, null, 2)}\n`);
console.log(`Updated dashboard: ${dashboard.verdict}, ${dashboard.score}/100`);
