export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.gamersberg.com/api/grow-a-garden/stock', {
      headers: {
        // Cần thiết nếu server gốc yêu cầu User-Agent hoặc tránh nghi ngờ bot
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60'); // Cache 60 giây cho CDN
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proxy stock data' });
  }
}
