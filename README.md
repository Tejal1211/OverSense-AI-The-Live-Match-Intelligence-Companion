# OverSense AI (prototype)
Demo-mode cricket companion. All match, player and audience-emotion data is SIMULATED (fictional players).

## Run
```
cd server && npm install && cp ../.env.example .env && npm run dev     # API :4000
cd client && npm install && npm run dev                                # UI :5173
cd server && npm test                                                  # unit + API tests
```
Add `GEMINI_API_KEY` to `server/.env` for Gemini; without it, responses use a labelled rule-based fallback.

## Structure
`server/src/data.ts` sample data · `calc.ts` run-rate and scenario maths · `ai.ts` Gemini + fallback · `app.ts` routes/validation.
Live-data adapter: replace `data.ts` with a provider-backed module. Firestore/Postgres persistence is not implemented (preferences are validated and echoed).
