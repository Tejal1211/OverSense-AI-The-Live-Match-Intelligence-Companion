export const runRate = (runs: number, balls: number) => balls ? +(runs / (balls / 6)).toFixed(2) : 0;
export const requiredRate = (target: number, runs: number, balls: number, total = 120) =>
  total - balls > 0 ? +(((target - runs) / ((total - balls) / 6))).toFixed(2) : 0;
export interface State { target: number; runs: number; wickets: number; balls: number }
export interface Scenario { runs?: number; overs?: number; wickets?: number }
/** Deterministic outcome of "scores X runs / loses W wickets in the next N overs". */
export function scenario(s: State, q: Scenario) {
  const balls = s.balls + Math.round((q.overs ?? 0) * 6), runs = s.runs + (q.runs ?? 0), wickets = Math.min(10, s.wickets + (q.wickets ?? 0));
  return { runs, wickets, balls, runsNeeded: Math.max(0, s.target - runs), ballsLeft: Math.max(0, 120 - balls),
    requiredRate: requiredRate(s.target, runs, balls), currentRate: runRate(runs, balls), wicketsInHand: 10 - wickets, won: runs >= s.target };
}
/** Parses simple questions like "scores 45 runs in next 5 overs" or "loses 2 wickets". */
export function parseQuestion(t: string): Scenario | null {
  const runs = t.match(/(\d+)\s*runs/i), overs = t.match(/(\d+(?:\.\d)?)\s*overs?/i);
  const wk = /two wickets/i.test(t) ? 2 : /(\d+)\s*wickets?/i.test(t) ? +t.match(/(\d+)\s*wickets?/i)![1] : /out|wicket/i.test(t) ? 1 : 0;
  if (!runs && !wk) return null;
  return { runs: runs ? +runs[1] : 0, overs: overs ? +overs[1] : runs ? 0 : 1, wickets: wk };
}
