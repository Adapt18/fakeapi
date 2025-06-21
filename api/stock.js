export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.gamersberg.com/api/grow-a-garden/stock', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                      '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.gamersberg.com/',
        'Origin': 'https://www.gamersberg.com',
        'Connection': 'keep-alive',
      },
    });

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', message: error.message });
  }
}
