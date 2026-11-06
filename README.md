# OverSense AI

**Every ball has a story. Understand it.**

OverSense AI is an AI-powered cricket companion that helps fans understand the
story behind a match—not just follow the score. Explore match summaries,
turning-point explanations, cricket rules, and hypothetical match scenarios
through a responsive, interactive web experience.

> **Prototype notice:** Match scores, commentary, players, events, and crowd
> emotion data in this project are simulated examples. They are not live match
> information.

## Features

- **Premium landing experience:** Responsive, cinematic introduction with
  interactive feature cards, mobile navigation, and reduced-motion support.
- **Match dashboard:** Browse the sample score, commentary, timeline, and match
  insights.
- **Match catch-up:** Request quick, detailed, or beginner-friendly summaries.
- **Moment intelligence:** Ask for context about selected events in the match
  timeline.
- **What-if simulator:** Calculate simple hypothetical run and wicket
  scenarios, with interpretation clearly separated from the calculation.
- **Cricket rule decoder:** Ask about supported rules, including DRS,
  powerplays, DLS, no-balls, and required run rate.
- **Personal fan mode:** Choose a team, player, language, and cricket
  knowledge level.
- **Crowd emotion radar:** View clearly labelled simulated audience and
  momentum charts.

AI features use the Gemini API when configured and return a labelled
rule-based fallback when it is unavailable or not configured. Match data is
currently a fixed local sample; live data integration and persistent user
preferences are not implemented.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Styling and animation | Tailwind CSS, custom CSS, Framer Motion |
| Charts and icons | Recharts, Lucide React |
| Backend | Node.js, Express, TypeScript |
| Validation and tests | Zod, Vitest, Supertest |
| Optional AI | Google Gemini API |

## Requirements

- Node.js 20 or newer
- npm
- A Gemini API key is optional; without one, the API uses its labelled fallback

## Run locally

Clone the repository and install dependencies in each application:

```bash
git clone https://github.com/Tejal1211/OverSense-AI-The-Live-Match-Intelligence-Companion.git
cd OverSense-AI-The-Live-Match-Intelligence-Companion

cd server
npm install

cd ../client
npm install
```

### Configure the optional Gemini API

Create `server/.env` (or copy the root `.env.example` to that location):

```env
PORT=4000
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
```

Set `GEMINI_API_KEY` to enable Gemini responses. Keep real credentials out of
version control; `.env` files are ignored by Git.

### Start the backend and frontend

In the first terminal:

```bash
cd server
npm run dev
```

The API starts at `http://localhost:4000`.

In a second terminal:

```bash
cd client
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`. Vite proxies `/api`
requests to the backend at `http://localhost:4000`.

## Routes

The landing page links into the working demo and onboarding:

- `/` — landing page
- `/#/start` — fan profile onboarding
- `/#/signin` — sign-in prototype
- `/#/match?tab=Live` — match dashboard
- `/#/match?tab=Intelligence` — match catch-up and event explanations
- `/#/match?tab=Simulator` — scenario simulator
- `/#/match?tab=Assistant` — cricket rule decoder
- `/#/match?tab=Fan%20Insights` — simulated emotion and momentum charts

Sign-in is a UI prototype only; accounts and authentication are not
implemented.

## API

All match-specific endpoints use the sample match ID `demo-ind-aus`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/matches` | List the sample match |
| `GET` | `/api/matches/:id` | Get match details |
| `GET` | `/api/matches/:id/commentary` | Get sample commentary |
| `GET` | `/api/matches/:id/timeline` | Get match events and simulated audience data |
| `POST` | `/api/ai/catchup` | Generate a catch-up summary |
| `POST` | `/api/ai/explain-event` | Explain a timeline event |
| `POST` | `/api/ai/scenario` | Calculate and interpret a hypothetical scenario |
| `POST` | `/api/ai/rule-decoder` | Explain a cricket rule |
| `POST` | `/api/user/preferences` | Validate and echo fan preferences |

AI request bodies may include a `prefs` object with optional `team`, `player`,
`language`, and `level` values. The catch-up endpoint expects a `mode` of
`30s`, `detailed`, or `beginner`; the explain-event endpoint expects an
`eventId`; the scenario and rule-decoder endpoints expect a `question`.
Preferences are validated and echoed, not persisted.

## Tests and production build

Run the API test suite:

```bash
cd server
npm test
```

Type-check and build the frontend:

```bash
cd client
npm run build
```

## Project structure

```text
.
├── .env.example
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── Fans.tsx
│       ├── LandingPage.tsx
│       ├── landingData.ts
│       ├── index.css
│       └── main.tsx
└── server/
    ├── src/
    │   ├── ai.ts
    │   ├── app.ts
    │   ├── calc.ts
    │   ├── data.ts
    │   └── index.ts
    └── tests/
        ├── api.test.ts
        └── calc.test.ts
```

## Limitations and disclaimer

OverSense AI is an independent prototype and is not affiliated with or
endorsed by any cricket board, team, league, broadcaster, or data provider.
No live cricket feed, database, saved user account, or authentication system
is included. Use authorized data sources and follow their terms when adding
live match data.

No license has been specified for this repository.
