export const weights = { cape: .25, buffett: .20, margin: .25, allocation: .10, credit: .12, vix: .08 };
export const verdicts = ['NO', 'NOT_YET', 'MAYBE', 'PROBABLY', 'YES'];

export function calculateScore(indicators) {
  return Math.round(indicators.reduce((sum, item) => sum + item.score * weights[item.id], 0));
}

export function getVerdict(score) {
  if (score >= 75) return 'YES';
  if (score >= 60) return 'PROBABLY';
  if (score >= 45) return 'MAYBE';
  if (score >= 30) return 'NOT_YET';
  return 'NO';
}

export function getSummary(verdict) {
  const summaries = {
    YES: 'The evidence is broad and unusually stretched. This looks like bubble territory, even if no gauge can call the top.',
    PROBABLY: 'Several independent warning signs are flashing. The market looks more bubbly than merely expensive.',
    MAYBE: 'The evidence is genuinely mixed. Some gauges are hot, while others have not joined the party.',
    NOT_YET: 'A few ingredients are warming up, but the full bubble recipe is not in the oven yet.',
    NO: 'Valuation, leverage, positioning and risk appetite are not jointly showing bubble conditions.'
  };
  return summaries[verdict];
}

export function calculateConfidence(indicators, score = calculateScore(indicators)) {
  const scores = indicators.map((item) => item.score);
  const mean = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  const deviation = Math.sqrt(scores.reduce((sum, value) => sum + (value - mean) ** 2, 0) / scores.length);
  const agreement = Math.max(0, 100 - deviation * 1.5);
  const nearestBoundary = Math.min(...[30, 45, 60, 75].map((boundary) => Math.abs(score - boundary)));
  const boundaryClarity = Math.min(100, nearestBoundary / 15 * 100);
  return Math.round(agreement * .7 + boundaryClarity * .3);
}
