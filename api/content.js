const { put, head } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const BLOB_PATH = 'content.json';

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
      // Try to get from Vercel Blob first
      try {
        const blobUrl = `${process.env.BLOB_READ_WRITE_TOKEN ? 'https://' + process.env.BLOB_READ_WRITE_TOKEN.split('_')[1] : ''}/content.json`;
        const response = await fetch(blobUrl);
        if (response.ok) {
          const content = await response.json();
          return res.status(200).json(content);
        }
      } catch (blobError) {
        console.log('Blob not found, falling back to local file');
      }

      // Fallback to public/content.json
      const localFile = path.join(process.cwd(), 'public/content.json');
      if (fs.existsSync(localFile)) {
        const content = JSON.parse(fs.readFileSync(localFile, 'utf8'));
        return res.status(200).json(content);
      }

      return res.status(404).json({ error: 'Content not found' });
    } 
    
    else if (req.method === 'POST') {
      // Save to Vercel Blob
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(500).json({ 
          error: 'Blob storage not configured',
          message: 'Please add BLOB_READ_WRITE_TOKEN to your Vercel environment variables'
        });
      }

      const blob = await put(BLOB_PATH, JSON.stringify(req.body, null, 2), {
        access: 'public',
        contentType: 'application/json',
      });

      res.status(200).json({ success: true, message: 'Content saved successfully', url: blob.url });
    } 
    
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling content:', error);
    res.status(500).json({ error: 'Failed to handle content request', details: error.message });
  }
};

