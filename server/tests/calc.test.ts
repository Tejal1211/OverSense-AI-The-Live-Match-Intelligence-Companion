import { test, expect } from "vitest"; import { runRate, requiredRate, scenario, parseQuestion } from "../src/calc.js";
test("rates", () => { expect(runRate(104, 78)).toBe(8); expect(requiredRate(172, 104, 78)).toBe(9.71); });
test("scenario", () => { const r = scenario({ target: 172, runs: 104, wickets: 3, balls: 78 }, { runs: 45, overs: 5, wickets: 0 }); expect(r.runsNeeded).toBe(23); expect(r.ballsLeft).toBe(12); expect(r.requiredRate).toBe(11.5); });
test("parse", () => { expect(parseQuestion("scores 45 runs in next 5 overs")).toEqual({ runs: 45, overs: 5, wickets: 0 }); });
