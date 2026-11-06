// SAMPLE DATA ONLY: simulated match, fictional players. Not live.
export const match = {
  id: "demo-ind-aus", demo: true, format: "T20", status: "Live (simulated)",
  battingTeam: "India", bowlingTeam: "Australia", target: 172, runs: 104, wickets: 3, balls: 78,
  batters: ["A. Verma 41* (29)", "K. Rao 22* (14)"], bowler: "J. Hart 2-0-19-0",
  partnership: { runs: 38, balls: 21 },
  overRuns: [7,9,11,6,8,5,10,7,9,6,12,8,6],
  overWickets: [0,0,0,1,0,0,0,1,0,0,1,0,0],
  commentary: ["12.6 Rao nudges a single, run rate holds","12.5 dot ball, good yorker","12.4 Verma drives for FOUR","12.3 two runs to deep cover","12.2 single","12.1 dot"],
};
export const timeline = [
  { id: "e1", over: 4.2, type: "Wicket", text: "Opener S. Kapoor c Hart b Zane for 18", players: ["S. Kapoor","M. Zane"] },
  { id: "e2", over: 6.5, type: "Six", text: "A. Verma hits a six over long-on", players: ["A. Verma"] },
  { id: "e3", over: 8.3, type: "DRS", text: "LBW decision reviewed; umpire's call, batter given out", players: ["P. Nair"] },
  { id: "e4", over: 9.1, type: "Bowling change", text: "Australia bring on spinner J. Hart", players: ["J. Hart"] },
  { id: "e5", over: 11.4, type: "Wicket", text: "S. Yadav caught at deep midwicket for 27", players: ["S. Yadav"] },
  { id: "e6", over: 12.4, type: "Milestone", text: "A. Verma passes 40", players: ["A. Verma"] },
];
export const emotions = match.overRuns.map((_, i) => ({ over: i + 1,
  excitement: 40 + ((i * 17) % 45), tension: 30 + ((i * 23) % 50), surprise: 10 + ((i * 29) % 40), disappointment: 5 + ((i * 31) % 35) }));
