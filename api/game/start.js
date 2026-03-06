const jwt = require('jsonwebtoken');

const GAME_SECRET = process.env.GAME_SECRET;
const SCORE_FACTOR = 150;

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (!GAME_SECRET) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }
  const size = parseInt(req.body?.size, 10);
  if (!Number.isInteger(size) || size < 2 || size > 6) {
    return res.status(400).json({ error: 'Invalid size' });
  }
  const gameToken = jwt.sign({ size }, GAME_SECRET, { expiresIn: '2h' });
  res.json({ gameToken });
};
