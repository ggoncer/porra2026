export default async function handler(req, res) {
  const API_KEY = '5a8a941df35941d0a142a6968e536916';
  const BASE = 'https://api.football-data.org/v4';
  const headers = { 'X-Auth-Token': API_KEY };

  try {
    // Fetch finished matches
    const matchRes = await fetch(`${BASE}/competitions/WC/matches?status=FINISHED`, { headers });
    const matchData = await matchRes.json();

    // Fetch standings
    const standRes = await fetch(`${BASE}/competitions/WC/standings`, { headers });
    const standData = await standRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      matches: matchData.matches || [],
      standings: standData.standings || [],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
