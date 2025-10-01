const { put } = require('@vercel/blob');

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({ 
        error: 'Blob storage not configured',
        message: 'Please add BLOB_READ_WRITE_TOKEN to your Vercel environment variables'
      });
    }

    // Parse multipart form data
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
    }

    // Read the file from request body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Extract filename from the multipart data (simplified)
    const boundary = contentType.split('boundary=')[1];
    const parts = buffer.toString('binary').split(`--${boundary}`);
    
    let filename = 'upload_' + Date.now();
    let fileBuffer = buffer;

    // Try to extract filename and file content
    for (const part of parts) {
      if (part.includes('Content-Disposition')) {
        const nameMatch = part.match(/filename="([^"]+)"/);
        if (nameMatch) {
          const originalName = nameMatch[1];
          const ext = originalName.substring(originalName.lastIndexOf('.'));
          filename = originalName.replace(/[^a-zA-Z0-9.-]/g, '_').replace(ext, '') + '_' + Date.now() + ext;
          
          // Extract file content (after headers)
          const fileStart = part.indexOf('\r\n\r\n') + 4;
          const fileEnd = part.lastIndexOf('\r\n');
          if (fileStart > 3 && fileEnd > fileStart) {
            fileBuffer = Buffer.from(part.substring(fileStart, fileEnd), 'binary');
          }
        }
      }
    }

    // Upload to Vercel Blob
    const blob = await put(filename, fileBuffer, {
      access: 'public',
    });

    res.status(200).json({ 
      success: true, 
      url: blob.url,
      filename: filename 
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

