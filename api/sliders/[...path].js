const {
  validateScoreSubmission,
  proxyToUpstream
} = require('../../src/proxy-utils');

const API_BASE_URL = process.env.API_BASE_URL;

module.exports = async (req, res) => {
  const { path = [] } = req.query;
  const subPath = Array.isArray(path) ? path.join('/') : path;
  const queryString = new URL(req.url, 'https://placeholder').search;
  const upstreamUrl = `${API_BASE_URL}/api/sliders/${subPath}${queryString}`;

  if (req.method === 'POST' && subPath === 'add') {
    const err = validateScoreSubmission(req.body);
    if (err) return res.status(err.status).json(err.body);
  }

  try {
    const response = await proxyToUpstream(upstreamUrl, req.method, req.body);
    const data = await response.text();
    if (!response.ok) {
      console.error(
        `Upstream error ${response.status} for /api/sliders/${subPath}:`,
        data
      );
    }
    res.status(response.status);
    const ct = response.headers.get('content-type');
    if (ct) res.setHeader('Content-Type', ct);
    res.send(data);
  } catch (err) {
    console.error('Proxy error:', err.message, '| URL:', upstreamUrl);
    res.status(502).json({ error: 'Proxy error', detail: err.message });
  }
};
