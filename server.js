const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 8080;
const API_BASE_URL = process.env.API_BASE_URL;
const BASE_URL = 'https://js-sliders-game.vercel.app';

// Set GAME_SECRET in your environment for production. Without it a random
// secret is generated at startup, making all tokens expire on server restart.
const GAME_SECRET =
  process.env.GAME_SECRET || require('crypto').randomBytes(32).toString('hex');
const SCORE_FACTOR = 150;

function createGameToken(size) {
  return jwt.sign({ size }, GAME_SECRET, { expiresIn: '2h' });
}

function verifyGameToken(token) {
  try {
    return jwt.verify(token, GAME_SECRET); // throws if invalid or expired
  } catch {
    return null;
  }
}

// Parse JSON bodies for POST requests
app.use(express.json());

// Allowed origins for this local dev proxy.
const ALLOWED_ORIGINS = new Set(['http://localhost:8080', BASE_URL]);

// Issues a signed token encoding the grid size so the server can later verify
// that the submitted score is within the range possible for that game.
app.post('/game/start', (req, res) => {
  const size = parseInt(req.body?.size, 10);
  if (!Number.isInteger(size) || size < 2 || size > 6) {
    return res.status(400).json({ error: 'Invalid size' });
  }
  res.json({ gameToken: createGameToken(size) });
});

// Proxy all /api requests to the upstream Vercel API.
// The upstream API only allows Origin: https://js-sliders-game.vercel.app,
// so we forward requests server-side with that Origin header, bypassing CORS.
app.use('/api', async (req, res) => {
  // Restrict CORS to known origins instead of reflecting whatever Origin is sent.
  const requestOrigin = req.headers.origin;
  if (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)) {
    res.set('Access-Control-Allow-Origin', requestOrigin);
  }
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  // Server-side input validation for score submissions.
  if (req.method === 'POST' && req.originalUrl.startsWith('/api/sliders/add')) {
    const { user_name, score, gameToken } = req.body || {};
    const validName =
      typeof user_name === 'string' && /^[a-zA-Z0-9@ ]{3,20}$/.test(user_name);
    if (!validName) {
      return res.status(400).json({ error: 'Invalid name' });
    }
    // Verify the signed token issued by /game/start. This proves a real game
    // was started via this server and caps the score at what is possible for
    // the grid size — without requiring any changes to game logic.
    if (typeof gameToken !== 'string') {
      return res.status(403).json({ error: 'Game token required' });
    }
    const session = verifyGameToken(gameToken);
    if (!session) {
      return res.status(403).json({ error: 'Invalid or expired game token' });
    }
    const parsedScore = parseInt(score, 10);
    const maxScore = SCORE_FACTOR * session.size;
    const validScore =
      Number.isInteger(parsedScore) &&
      parsedScore >= 0 &&
      parsedScore <= maxScore;
    if (!validScore) {
      return res.status(400).json({ error: 'Invalid score' });
    }
  }

  const url = `${API_BASE_URL}${req.originalUrl}`;

  try {
    let response;
    if (req.method === 'POST') {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
          Origin: BASE_URL
        },
        body: JSON.stringify(req.body)
      });
    } else {
      response = await fetch(url, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          Origin: BASE_URL
        }
      });
    }
    const data = await response.text();
    if (!response.ok) {
      console.error(
        `Upstream error ${response.status} for ${req.originalUrl}:`,
        data
      );
    }
    res.status(response.status);
    const ct = response.headers.get('content-type');
    if (ct) res.set('Content-Type', ct);
    res.send(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'Proxy error' });
  }
});

// Serve static files — no-cache so browsers always load the latest JS/CSS
app.use(
  express.static(path.join(__dirname), {
    setHeaders(res) {
      res.set('Cache-Control', 'no-store');
    }
  })
);

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
