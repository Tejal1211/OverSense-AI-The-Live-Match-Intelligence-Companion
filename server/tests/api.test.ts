import { test, expect } from "vitest"; import request from "supertest"; import { app } from "../src/app.js";
test("match", async () => { const r = await request(app).get("/api/matches/demo-ind-aus"); expect(r.body.demo).toBe(true); });
test("404", async () => { expect((await request(app).get("/api/matches/x")).status).toBe(404); });
test("validation", async () => { expect((await request(app).post("/api/ai/catchup").send({ mode: "bad" })).status).toBe(400); });
test("scenario", async () => { const r = await request(app).post("/api/ai/scenario").send({ question: "India scores 45 runs in next 5 overs" }); expect(r.body.calculated.runsNeeded).toBe(23); });
