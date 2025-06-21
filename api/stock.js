const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
];

export default async function handler(req, res) {
  // Chỉ cho phép GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // timeout 7s

    const response = await fetch('https://www.gamersberg.com/api/grow-a-garden/stock', {
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.gamersberg.com/',
        'Origin': 'https://www.gamersberg.com',
        'Connection': 'keep-alive',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream API error' });
    }

    const data = await response.json();

    // Cache trên Vercel CDN 60s và có thể dùng dữ liệu cũ nếu đang reload (revalidate)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', message: error.message });
  }
}
