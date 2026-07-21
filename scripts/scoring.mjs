export const weights = { cape: .30, buffett: .25, margin: .25, credit: .12, vix: .08 };

export function calculateScore(indicators) {
  return Math.round(indicators.reduce((sum, item) => sum + item.score * weights[item.id], 0));
}

export function getVerdict(score) {
  return score >= 70 ? 'YES' : score >= 45 ? 'MAYBE' : 'NO';
}

export function getSummary(verdict) {
  const summaries = {
    YES: 'Valuations and investor leverage are stretched. Credit and sentiment decide how close the signal sits to maximum alert.',
    MAYBE: 'Some warning signs are elevated, but the evidence is not broad enough for a clear bubble call.',
    NO: 'The major valuation, leverage, and credit signals are not jointly showing bubble conditions.'
  };
  return summaries[verdict];
}
