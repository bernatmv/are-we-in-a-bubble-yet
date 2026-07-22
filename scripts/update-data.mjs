import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { calculateConfidence, calculateScore, getSummary, getVerdict } from './scoring.mjs';

const dataPath = resolve('src/data/indicators.json');
const dashboard = JSON.parse(await readFile(dataPath, 'utf8'));

const clamp = (value, min = 0, max = 100) => Math.round(Math.max(min, Math.min(max, value)));
const indicator = (id) => dashboard.indicators.find((item) => item.id === id);
const monthYear = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));

async function fetchBuffer(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'www.areweinabubbleyet.com data updater' } });
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
  const text = await fetchText(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}&cosd=1990-01-01`);
  return text.trim().split(/\r?\n/).slice(1).map((line) => {
    const [date, raw] = line.split(',');
    return { date, value: Number(raw) };
  }).filter((point) => Number.isFinite(point.value));
}

function chartHistory(points, transform = (value) => value) {
  const quarters = new Map();
  for (const point of points) {
    const date = new Date(`${point.date}T00:00:00Z`);
    const year = date.getUTCFullYear();
    const quarter = Math.floor(date.getUTCMonth() / 3);
    const time = Number((year + quarter / 4).toFixed(2));
    quarters.set(`${year}-${quarter}`, [time, transform(point.value)]);
  }
  return [...quarters.values()].filter(([time]) => time >= 1997).slice(-120);
}

async function updateFastSignals() {
  const [vixPoints, creditPoints, allocationPoints] = await Promise.all([
    fred('VIXCLS'), fred('BAA10Y'), fred('BOGZ1FL153064486Q')
  ]);
  const vixLast = vixPoints.at(-1);
  const creditLast = creditPoints.at(-1);
  const allocationLast = allocationPoints.at(-1);

  Object.assign(indicator('vix'), {
    value: Number(vixLast.value.toFixed(1)), displayValue: vixLast.value.toFixed(1),
    change: vixLast.value < 14 ? 'Exceptionally quiet' : vixLast.value < 20 ? 'Quiet, but not euphoric' : 'Risk awareness is elevated',
    score: clamp((30 - vixLast.value) / 20 * 100), status: vixLast.value < 14 ? 'Complacent' : 'Neutral',
    asOf: monthYear(vixLast.date), history: chartHistory(vixPoints, (v) => Number(v.toFixed(1)))
  });
  Object.assign(indicator('credit'), {
    name: 'Corporate credit spread', eyebrow: 'CREDIT · 12% WEIGHT',
    description: 'The extra yield paid by Baa-rated US companies over 10-year Treasuries. Very tight spreads suggest lenders see little risk and can signal late-cycle complacency.',
    threshold: 'Complacency below 1.80%', source: "Moody's via FRED", sourceUrl: 'https://fred.stlouisfed.org/series/BAA10Y',
    value: Number(creditLast.value.toFixed(2)), displayValue: `${creditLast.value.toFixed(1)}%`,
    change: creditLast.value < 1.8 ? 'Lenders are pricing in little risk' : 'Credit risk is being priced in',
    score: clamp((4.5 - creditLast.value) / 3 * 100), status: creditLast.value < 1.8 ? 'Complacent' : 'Neutral',
    asOf: monthYear(creditLast.date), history: chartHistory(creditPoints, (v) => Number(v.toFixed(2)))
  });
  Object.assign(indicator('allocation'), {
    value: Number(allocationLast.value.toFixed(2)), displayValue: `${allocationLast.value.toFixed(1)}%`,
    change: 'Latest quarterly reading', score: clamp((allocationLast.value - 25) / 25 * 100),
    status: allocationLast.value >= 45 ? 'Extreme' : allocationLast.value >= 40 ? 'Elevated' : 'Neutral',
    asOf: `Q${Math.floor(new Date(allocationLast.date).getUTCMonth() / 3) + 1} ${allocationLast.date.slice(0, 4)}`,
    history: chartHistory(allocationPoints, (value) => Number(value.toFixed(1)))
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
    history: chartHistory(ratios, (v) => Number(v.toFixed(0)))
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
    history: chartHistory(points, (v) => Number(v.toFixed(1)))
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
  const detailedHistory = chartHistory(points, (value) => Math.round(value));
  const detailedStart = detailedHistory[0]?.[0] ?? Infinity;
  const history = [...indicator('margin').history.filter(([time]) => time < detailedStart), ...detailedHistory].slice(-120);
  Object.assign(indicator('margin'), {
    value: Math.round(last.value), displayValue: `$${(last.value / 1_000_000).toFixed(2)}T`, change: `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}% year over year`,
    score: clamp((growth + 10) / 50 * 100), status: growth >= 25 ? 'Extreme' : growth >= 12 ? 'Elevated' : 'Neutral', asOf: monthYear(last.date),
    history
  });
}

const updates = await Promise.allSettled([updateFastSignals(), updateBuffettIndicator(), updateCape(), updateMarginDebt()]);
for (const result of updates) if (result.status === 'rejected') console.warn(result.reason.message);
if (updates.every((result) => result.status === 'rejected')) throw new Error('Every data source failed; dashboard was not changed');

dashboard.score = calculateScore(dashboard.indicators);
dashboard.verdict = getVerdict(dashboard.score);
dashboard.summary = getSummary(dashboard.verdict);
dashboard.confidence = calculateConfidence(dashboard.indicators, dashboard.score);
dashboard.updatedAt = new Date().toISOString();
await writeFile(dataPath, `${JSON.stringify(dashboard, null, 2)}\n`);
console.log(`Updated dashboard: ${dashboard.verdict}, ${dashboard.score}/100`);
