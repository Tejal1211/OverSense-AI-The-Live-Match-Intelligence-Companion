import { match, timeline } from "./data.js";
import { runRate, requiredRate } from "./calc.js";
export type Prefs = { level?: string; language?: string; team?: string; player?: string };
async function gemini(prompt: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY; if (!key) return null;
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-2.0-flash"}:generateContent?key=${key}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }) });
    if (!r.ok) return null;
    const j: any = await r.json(); return j.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch { return null; }
}
const GUARD = "Use ONLY the supplied match data. Never invent events or stats. Say 'not available' when data is missing. Separate facts from interpretation. Reply as JSON.";
async function ask<T>(task: string, data: unknown, p: Prefs, fallback: T): Promise<T & { source: string }> {
  const out = await gemini(`${GUARD}\nTask: ${task}\nReader level: ${p.level || "Regular"}; language: ${p.language || "English"}.\nData: ${JSON.stringify(data)}`);
  if (out) { try { return { ...JSON.parse(out), source: "gemini" }; } catch { /* fall through */ } }
  return { ...fallback, source: "demo-fallback (rule-based, no AI call)" };
}
export function catchup(mode: string, p: Prefs) {
  const last = match.overRuns.slice(-5), runs = last.reduce((a, b) => a + b, 0), wk = match.overWickets.slice(-5).reduce((a, b) => a + b, 0);
  const rr = runRate(match.runs, match.balls), rrr = requiredRate(match.target, match.runs, match.balls);
  const moments = timeline.slice(-3).map(e => `Over ${e.over}: ${e.text}`);
  const base = `India scored ${runs} runs and lost ${wk} wicket in the last 5 overs (${match.runs}/${match.wickets} after 13 overs, chasing ${match.target}).`;
  const fb = { summary: mode === "30s" ? base : mode === "beginner" ? `${base} "Run rate" means runs per over. India score ${rr} per over but need ${rrr}, so they must speed up.` : `${base} Current rate ${rr} vs required ${rrr}. Partnership: ${match.partnership.runs} off ${match.partnership.balls}.`,
    moments, whyChanged: `Required rate (${rrr}) is above current rate (${rr}) after the loss of a wicket.`, topPlayer: "A. Verma (41* off 29, from supplied data)", watchNext: "Whether the Verma-Rao partnership accelerates against spin.", missing: ["Bowling figures for all bowlers"] };
  return ask(`Catch-up capsule, mode=${mode}`, { match, timeline }, p, fb);
}
export function explain(id: string, p: Prefs) {
  const e = timeline.find(t => t.id === id); if (!e) return null;
  return ask(`Explain why this event mattered`, { event: e, match }, p, { what: e.text, why: `A ${e.type} at over ${e.over} changes momentum in a T20 chase.`, effect: `Match state now: ${match.runs}/${match.wickets}, need ${match.target - match.runs} from ${120 - match.balls} balls.`, players: e.players });
}
const RULES: Record<string, string> = {
  drs: "DRS (Decision Review System) lets a team challenge an umpire's call using ball-tracking and replays. 'Umpire's call' means the original decision stands if the ball is only clipping the stumps.",
  powerplay: "In T20, the first 6 overs are the powerplay: only two fielders may be outside the 30-yard circle, so scoring is easier.",
  dls: "DLS adjusts targets after rain using runs, overs and wickets in hand as 'resources'. New target = opponent score x (chasing resources / opponent resources) + 1.",
  "required run rate": "Required run rate = runs still needed / overs left.",
  "no-ball": "A no-ball is an illegal delivery (e.g. front-foot overstep). It gives a run and a free hit in T20.",
};
export function rule(q: string, p: Prefs) {
  const l = q.toLowerCase(), k = Object.keys(RULES).find(k => l.includes(k) || l.includes(k.replace("-", " ")) || (k === "required run rate" && l.includes("rrr")));
  const fb = { answer: k ? RULES[k] : "I don't have a stored answer for that; try DRS, powerplay, DLS, no-ball or required run rate.", context: `Right now India need ${match.target - match.runs} from ${120 - match.balls} balls.` };
  return ask(`Explain cricket rule: ${q}`, { match }, p, fb);
}
export async function interpret(calc: unknown, p: Prefs) {
  return ask("Interpret this calculated scenario. Label any prediction as uncertain.", { calc, match }, p, { interpretation: "Calculated figures are exact; what they mean for the result depends on conditions and is uncertain.", uncertain: "Any win likelihood is an estimate, not a guarantee." });
}
