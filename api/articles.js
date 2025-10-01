const fs = require('fs');
const path = require('path');

// Read from public folder (read-only on Vercel)
const CONTENT_FILE = path.join(process.cwd(), 'public/content.json');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
      res.status(200).json(content.articles || []);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Failed to read articles', details: error.message });
  }
};

