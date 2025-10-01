const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();

const PORT = 3001;
const CONTENT_FILE = path.join(__dirname, '../src/data/content.json');
const UPLOAD_DIR = path.join(__dirname, '../public/uploads');

app.use(cors());
app.use(express.json());

// Ensure data and upload directories exist
if (!fs.existsSync(path.dirname(CONTENT_FILE))) fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Serve uploaded files
app.use('/uploads', express.static(UPLOAD_DIR));

// GET content
app.get('/api/content', (req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
      res.json(content);
    } else {
      res.status(404).json({ error: 'Content file not found' });
    }
  } catch (error) {
    console.error('Error reading content file:', error);
    res.status(500).json({ error: 'Failed to read content file' });
  }
});

// SAVE content
app.post('/api/content', (req, res) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.bin';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const stamp = Date.now();
    cb(null, `${base}_${stamp}${ext}`);
  }
});

const upload = multer({
  storage,
  // Allow up to 100MB to accommodate video files
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^(image|video)\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image or video uploads are allowed'));
  }
});

// Image upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // Return a path that the front-end can use. Since we write to public/uploads,
    // vite will serve it at /uploads/... in dev and in build.
    const urlPath = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: urlPath });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// GET articles endpoint (optional - for future use)
app.get('/api/articles', (req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
      res.json(content.articles || []);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Failed to read articles' });
  }
});

// GET analytics endpoint
app.get('/api/analytics', (req, res) => {
  try {
    // In a real application, you would fetch this from a database
    // For now, we'll return some sample data
    const analytics = {
      totalVisits: Math.floor(Math.random() * 1000) + 2000,
      totalUsers: Math.floor(Math.random() * 500) + 1000,
      totalArticles: 6,
      totalMediaFiles: Math.floor(Math.random() * 50) + 200,
      visitsChange: Math.round((Math.random() * 20 + 5) * 10) / 10,
      usersChange: Math.round((Math.random() * 15 + 3) * 10) / 10,
      articlesChange: 6,
      mediaChange: Math.floor(Math.random() * 20 + 5),
      topPages: [
        { path: '/home', views: Math.floor(Math.random() * 500) + 800 },
        { path: '/services', views: Math.floor(Math.random() * 300) + 500 },
        { path: '/about', views: Math.floor(Math.random() * 200) + 300 },
        { path: '/contact', views: Math.floor(Math.random() * 150) + 200 },
        { path: '/doctors', views: Math.floor(Math.random() * 100) + 50 }
      ],
      recentActivity: [
        {
          id: '1',
          action: 'New contact form submission from John Doe',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          type: 'form',
          timeAgo: '2 minutes ago'
        },
        {
          id: '2',
          action: 'Article viewed: "L\'Intelligence Artificielle en Mammographie"',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          type: 'article',
          timeAgo: '15 minutes ago'
        },
        {
          id: '3',
          action: 'New media uploaded: mammographe_3d.webp',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: 'media',
          timeAgo: '2 hours ago'
        }
      ]
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});