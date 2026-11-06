import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, Brain, FlaskConical, MessageCircle, Users } from "lucide-react";
import LandingPage from "./LandingPage";
const Fans = lazy(() => import("./Fans"));
const MID = "demo-ind-aus";
const api = async (p: string, body?: unknown) => {
  const r = await fetch(p, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const j = await r.json(); if (!r.ok || j.error) throw new Error(j.error || "Request failed"); return j;
};
const Card = ({ children }: any) => <div className="rounded-xl border border-white/10 bg-white/5 p-4">{children}</div>;
const Btn = ({ c = "", ...p }: any) => <button {...p} className={"rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-50 " + c} />;
const Demo = () => <span className="rounded bg-amber-400/20 px-2 py-0.5 text-xs text-amber-300">DEMO MODE · simulated data</span>;
function useAsync() {
  const [s, set] = useState<{ loading: boolean; data: any; error: string }>({ loading: false, data: null, error: "" });
  const run = (f: () => Promise<any>) => { set({ loading: true, data: null, error: "" }); f().then(d => set({ loading: false, data: d, error: "" })).catch(e => set({ loading: false, data: null, error: e.message })); };
  return [s, run] as const;
}
const Status = ({ s }: any) => s.loading ? <p className="text-slate-400">Loading…</p> : s.error ? <p className="text-red-400">{s.error}</p> : null;
const Src = ({ d }: any) => d?.source ? <p className="mt-2 text-xs text-slate-400">Source: {d.source}</p> : null;

interface Preferences {
  team: string;
  player: string;
  language: string;
  level: string;
}

function Onboarding({ done }: { done: (prefs: Preferences) => void }) {
  const [f, setF] = useState({ team: "India", player: "A. Verma", language: "English", level: "Regular" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const sel = (k: keyof Preferences, opts: string[]) => <select className="w-full rounded bg-slate-800 p-2" value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  const save = async () => {
    setSaving(true);
    setError("");
    try { await api("/api/user/preferences", f); done(f); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save your profile."); }
    finally { setSaving(false); }
  };
  return <div className="mx-auto max-w-md space-y-3"><h2 className="text-xl font-semibold">Your fan profile</h2>
    <label>Favorite team{sel("team", ["India", "Australia"])}</label><label>Favorite player{sel("player", ["A. Verma", "K. Rao", "J. Hart"])}</label>
    <label>Language{sel("language", ["English", "Hindi", "Marathi"])}</label><label>Cricket knowledge{sel("level", ["Beginner", "Regular", "Expert"])}</label>
    {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
    <Btn disabled={saving} onClick={save}>{saving ? "Saving profile…" : "Start following the match"}</Btn></div>;
}
function Dashboard({ m }: any) {
  const rr = (m.runs / (m.balls / 6)).toFixed(2), rrr = ((m.target - m.runs) / ((120 - m.balls) / 6)).toFixed(2);
  return <div className="grid gap-4 md:grid-cols-2"><Card><Demo /><h2 className="mt-2 text-3xl font-bold">{m.battingTeam} {m.runs}/{m.wickets}</h2>
    <p className="text-slate-300">{Math.floor(m.balls / 6)}.{m.balls % 6} ov · Target {m.target} · {m.status}</p>
    <p className="mt-2">Run rate {rr} · Required {rrr}</p><p>Batters: {m.batters.join(", ")}</p><p>Bowler: {m.bowler}</p>
    <p>Partnership: {m.partnership.runs} ({m.partnership.balls} balls)</p></Card>
    <Card><h3 className="mb-2 font-semibold">Ball-by-ball</h3><ul className="space-y-1 text-sm text-slate-300">{m.commentary.map((c: string) => <li key={c}>{c}</li>)}</ul></Card></div>;
}
function Intel({ prefs, tl }: any) {
  const [cu, runCu] = useAsync(), [ev, runEv] = useAsync();
  const d = cu.data;
  return <div className="space-y-4"><Card><h3 className="font-semibold">Catch-Up Capsule</h3>
    <div className="my-2 flex flex-wrap gap-2">{[["30s", "30-second"], ["detailed", "Detailed"], ["beginner", "Beginner"]].map(([k, l]) => <Btn key={k} onClick={() => runCu(() => api("/api/ai/catchup", { mode: k, prefs }))}>{l}</Btn>)}</div>
    <Status s={cu} />{d && <div className="space-y-1 text-sm"><p>{d.summary}</p><ul className="list-disc pl-5">{d.moments?.map((x: string) => <li key={x}>{x}</li>)}</ul>
      <p><b>Why it changed:</b> {d.whyChanged}</p><p><b>Top player:</b> {d.topPlayer}</p><p><b>Watch next:</b> {d.watchNext}</p>
      {d.missing?.length > 0 && <p className="text-amber-300">Missing data: {d.missing.join("; ")}</p>}<Src d={d} /></div>}</Card>
    <Card><h3 className="mb-2 font-semibold">Why did this moment matter?</h3>
      <div className="grid gap-2 sm:grid-cols-2">{tl.map((e: any) => <button key={e.id} onClick={() => runEv(() => api("/api/ai/explain-event", { eventId: e.id, prefs }))} className="rounded-lg border border-white/10 p-2 text-left text-sm hover:border-indigo-400"><b>{e.type}</b> · over {e.over}<br />{e.text}</button>)}</div>
      <Status s={ev} />{ev.data && <div className="mt-3 space-y-1 text-sm"><p><b>What:</b> {ev.data.what}</p><p><b>Why:</b> {ev.data.why}</p><p><b>Effect:</b> {ev.data.effect}</p><p><b>Players:</b> {ev.data.players?.join(", ")}</p><Src d={ev.data} /></div>}</Card></div>;
}
function Sim({ prefs }: any) {
  const [q, setQ] = useState(""), [s, run] = useAsync();
  const ex = ["India scores 45 runs in next 5 overs", "India loses 2 wickets in next 3 overs", "next batter gets out"];
  return <Card><h3 className="font-semibold">What happens if…?</h3><div className="my-2 flex flex-wrap gap-2">{ex.map(e => <Btn key={e} c="!bg-slate-700" onClick={() => setQ(e)}>{e}</Btn>)}</div>
    <div className="flex gap-2"><input className="flex-1 rounded bg-slate-800 p-2" value={q} onChange={e => setQ(e.target.value)} placeholder="Ask a scenario" /><Btn disabled={q.length < 3} onClick={() => run(() => api("/api/ai/scenario", { question: q, prefs }))}>Calculate</Btn></div>
    <Status s={s} />{s.data && <div className="mt-3 space-y-2 text-sm"><div className="rounded bg-emerald-500/10 p-2"><b>Calculated (exact):</b> {s.data.calculated.runs}/{s.data.calculated.wickets}, need {s.data.calculated.runsNeeded} from {s.data.calculated.ballsLeft} balls, required rate {s.data.calculated.requiredRate}.</div>
      <div className="rounded bg-indigo-500/10 p-2"><b>Interpretation:</b> {s.data.interpretation}</div><div className="rounded bg-amber-500/10 p-2"><b>Uncertain:</b> {s.data.uncertain}</div><Src d={s.data} /></div>}</Card>;
}
function Chat({ prefs }: any) {
  const [q, setQ] = useState(""), [log, setLog] = useState<{ q: string; a: string }[]>([]), [err, setErr] = useState("");
  const send = (t: string) => { setErr(""); api("/api/ai/rule-decoder", { question: t, prefs }).then(d => setLog(l => [...l, { q: t, a: `${d.answer} ${d.context || ""}` }])).catch(e => setErr(e.message)); setQ(""); };
  return <Card><h3 className="font-semibold">Cricket Rule Decoder</h3><div className="my-2 flex flex-wrap gap-2">{["What is DRS?", "What is a powerplay?", "How does DLS work?", "What is required run rate?"].map(x => <Btn key={x} c="!bg-slate-700" onClick={() => send(x)}>{x}</Btn>)}</div>
    <div className="space-y-2 text-sm">{log.map((l, i) => <div key={i}><p className="text-indigo-300">{l.q}</p><p>{l.a}</p></div>)}{log.length === 0 && <p className="text-slate-400">Ask a question to begin.</p>}{err && <p className="text-red-400">{err}</p>}</div>
    <div className="mt-3 flex gap-2"><input className="flex-1 rounded bg-slate-800 p-2" value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && q && send(q)} /><Btn disabled={!q} onClick={() => send(q)}>Ask</Btn></div></Card>;
}
const tabs = [["Live", Activity], ["Intelligence", Brain], ["Simulator", FlaskConical], ["Assistant", MessageCircle], ["Fan Insights", Users]] as const;
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#/");
  const [prefs, setPrefs] = useState<any>({}), [tab, setTab] = useState("Live");
  const [m, setM] = useState<any>(null), [t, setT] = useState<any>(null), [err, setErr] = useState("");
  const path = route.split("?")[0].replace(/^#\/?/, "");
  const screen = path === "start" ? "start" : path === "match" ? "match" : "landing";
  const requestedTab = new URLSearchParams(route.split("?")[1] || "").get("tab");
  const navigate = (next: string) => {
    const hash = `/${next.replace(/^\/+/, "")}`;
    if (window.location.hash === `#${hash}`) setRoute(`#${hash}`);
    else window.location.hash = hash;
  };

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (requestedTab && tabs.some(([name]) => name === requestedTab)) setTab(requestedTab);
  }, [requestedTab]);

  useEffect(() => {
    if (screen !== "match") return;
    window.scrollTo(0, 0);
    let active = true;
    setErr("");
    Promise.all([api(`/api/matches/${MID}`), api(`/api/matches/${MID}/timeline`)])
      .then(([matchData, timelineData]) => {
        if (active) { setM(matchData); setT(timelineData); }
      })
      .catch((error: Error) => { if (active) setErr(error.message); });
    return () => { active = false; };
  }, [screen]);

  if (screen === "landing") {
    return <LandingPage navigate={navigate} showSignIn={path === "signin"} closeSignIn={() => navigate("/")} />;
  }
  if (screen === "start") return <div className="onboarding-page"><button className="onboarding-back" onClick={() => navigate("/")}><ArrowLeft size={16} /> Back to home</button><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="onboarding-card"><span className="onboarding-eyebrow">YOUR MATCH, YOUR WAY</span><h1>Set your point of view.</h1><p>Tell us what you follow. We’ll shape the match around you.</p><Onboarding done={(p: any) => { setPrefs(p); navigate("/match?tab=Live"); }} /></motion.div></div>;

  return <div className="match-app-shell"><div className="match-app-top"><button className="match-back" onClick={() => navigate("/")}><ArrowLeft size={16} /> OverSense AI</button><span className="demo-pill">SIMULATED MATCH</span></div><div className="mx-auto max-w-5xl p-4"><nav className="mb-4 flex flex-wrap gap-2" aria-label="Match dashboard">{tabs.map(([n, I]) => <button key={n} onClick={() => navigate(`/match?tab=${encodeURIComponent(n)}`)} aria-current={tab === n ? "page" : undefined} className={"flex items-center gap-1 rounded-lg px-3 py-2 text-sm " + (tab === n ? "bg-indigo-500" : "bg-white/5")}><I size={14} />{n}</button>)}</nav>
    {err && <p className="text-red-400">{err}</p>}{!m || !t ? !err && <p className="text-slate-400">Loading match…</p> : <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {tab === "Live" && <Dashboard m={m} />}{tab === "Intelligence" && <Intel prefs={prefs} tl={t.timeline} />}{tab === "Simulator" && <Sim prefs={prefs} />}{tab === "Assistant" && <Chat prefs={prefs} />}{tab === "Fan Insights" && <Suspense fallback={<p className="text-slate-400">Loading fan insights…</p>}><Fans em={t.emotions} m={m} /></Suspense>}</motion.div>}</div></div>;
}
