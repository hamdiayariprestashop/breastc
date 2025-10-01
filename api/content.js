const fs = require('fs');
const path = require('path');

// For Vercel, we'll use environment variables or serverless storage
// This is a simplified version that works with Vercel's filesystem
const CONTENT_FILE = path.join(process.cwd(), 'src/data/content.json');

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

  try {
    if (req.method === 'GET') {
      // GET content
      if (fs.existsSync(CONTENT_FILE)) {
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        res.status(200).json(content);
      } else {
        res.status(404).json({ error: 'Content file not found' });
      }
    } else if (req.method === 'POST') {
      // SAVE content
      const dataDir = path.dirname(CONTENT_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
      res.status(200).json({ success: true, message: 'Content saved successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling content:', error);
    res.status(500).json({ error: 'Failed to handle content request', details: error.message });
  }
};

