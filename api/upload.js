const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

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
    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const form = formidable({
      uploadDir: UPLOAD_DIR,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB
      filename: (name, ext, part, form) => {
        const base = path.basename(part.originalFilename, path.extname(part.originalFilename))
          .replace(/[^a-zA-Z0-9-_]/g, '_');
        const stamp = Date.now();
        const extension = path.extname(part.originalFilename) || '.bin';
        return `${base}_${stamp}${extension}`;
      }
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ error: 'Upload failed', details: err.message });
      }

      const file = files.file;
      if (!file || (Array.isArray(file) && file.length === 0)) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const uploadedFile = Array.isArray(file) ? file[0] : file;
      const filename = path.basename(uploadedFile.filepath);
      const urlPath = `/uploads/${filename}`;

      res.status(200).json({ success: true, url: urlPath });
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

