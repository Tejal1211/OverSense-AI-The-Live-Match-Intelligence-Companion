import express from "express"; import cors from "cors"; import { z } from "zod";
import { match, timeline, emotions } from "./data.js"; import * as ai from "./ai.js"; import { scenario, parseQuestion } from "./calc.js";
const prefs = z.object({ level: z.string().optional(), language: z.string().optional(), team: z.string().optional(), player: z.string().optional() }).default({});
const wrap = (schema: z.ZodTypeAny, fn: (b: any) => any) => async (req: express.Request, res: express.Response) => {
  const v = schema.safeParse(req.body); if (!v.success) return res.status(400).json({ error: "Invalid input", details: v.error.issues });
  try { const out = await fn(v.data); out ? res.json(out) : res.status(404).json({ error: "Not found" }); } catch (e) { res.status(500).json({ error: "Server error" }); }
};
export const app = express(); app.use(cors(), express.json());
const m = (req: express.Request, res: express.Response, next: express.NextFunction) => req.params.id === match.id ? next() : res.status(404).json({ error: "Match not found" });
app.get("/api/matches", (_q, r) => r.json([{ id: match.id, title: "India vs Australia", demo: true }]));
app.get("/api/matches/:id", m, (_q, r) => r.json(match));
app.get("/api/matches/:id/commentary", m, (_q, r) => r.json(match.commentary));
app.get("/api/matches/:id/timeline", m, (_q, r) => r.json({ timeline, emotions, emotionsSimulated: true }));
app.post("/api/ai/catchup", wrap(z.object({ mode: z.enum(["30s", "detailed", "beginner"]), prefs }), b => ai.catchup(b.mode, b.prefs)));
app.post("/api/ai/explain-event", wrap(z.object({ eventId: z.string(), prefs }), b => ai.explain(b.eventId, b.prefs)));
app.post("/api/ai/rule-decoder", wrap(z.object({ question: z.string().min(2).max(300), prefs }), b => ai.rule(b.question, b.prefs)));
app.post("/api/ai/scenario", wrap(z.object({ question: z.string().min(3).max(300), prefs }), async b => {
  const q = parseQuestion(b.question);
  if (!q) return { error: "Could not parse. Try: 'India scores 45 runs in next 5 overs' or 'loses 2 wickets'." };
  const calculated = scenario(match, q); return { calculated, ...(await ai.interpret(calculated, b.prefs)) };
}));
app.post("/api/user/preferences", wrap(z.object({ team: z.string(), player: z.string().optional(), language: z.enum(["English", "Hindi", "Marathi"]), level: z.enum(["Beginner", "Regular", "Expert"]) }), b => ({ saved: true, prefs: b })));
