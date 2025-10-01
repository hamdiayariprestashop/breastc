# Vercel Deployment Guide

This project is configured for seamless deployment on Vercel with both frontend and backend working together.

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the project**:
   ```bash
   vercel
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

## 📋 What's Configured

### Frontend
- ✅ React + Vite build optimized for production
- ✅ SPA routing handled correctly (no 404 errors)
- ✅ Static assets served from `/public`
- ✅ All routes redirect to `index.html` for client-side routing

### Backend (Serverless Functions)
- ✅ `/api/content` - GET/POST content data
- ✅ `/api/upload` - POST file uploads
- ✅ `/api/articles` - GET articles
- ✅ `/api/analytics` - GET analytics data
- ✅ CORS enabled for all API routes
- ✅ File uploads stored in `/public/uploads`

### Build Process
The `vercel-build` script runs:
1. Frontend build with Vite (`npm run build`)
2. Outputs to `dist/` directory
3. API functions are automatically deployed from `/api` folder

## 🔧 Project Structure for Vercel

```
projet/
├── api/                    # Serverless functions (backend)
│   ├── analytics.js       # GET /api/analytics
│   ├── articles.js        # GET /api/articles
│   ├── content.js         # GET/POST /api/content
│   ├── upload.js          # POST /api/upload
│   └── package.json       # API dependencies
├── dist/                   # Build output (auto-generated)
├── public/                 # Static assets
│   └── uploads/           # Uploaded files
├── src/                    # Frontend source code
├── server/                 # Local dev server (not used in Vercel)
├── vercel.json            # Vercel configuration
├── .vercelignore          # Files to ignore in deployment
└── package.json           # Frontend dependencies

```

## ⚙️ Configuration Details

### vercel.json
- **Framework**: Vite detected automatically
- **Output Directory**: `dist/`
- **Rewrites**: Configured for SPA routing
  - `/api/*` → API serverless functions
  - `/uploads/*` → Static file serving
  - All other routes → `index.html`
- **Headers**: CORS enabled for API routes
- **Functions**: Max duration 10s per API call

### Build Commands
- **Build Command**: `npm run build` (Vite production build)
- **Output Directory**: `dist`
- **Install Command**: `npm install` (automatic)

## 🔐 Environment Variables (if needed)

If you need to add environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add your variables:
   - `VITE_API_URL` - API base URL (usually auto-configured)
   - Any other custom variables

## 📝 Notes

### File Uploads
- Uploaded files are stored in `/public/uploads/`
- **Important**: Vercel's filesystem is read-only except for `/tmp`
- For production with many uploads, consider using:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary
  - Any other cloud storage service

### Content Persistence
- The `content.json` file is read from the deployed version
- **Changes made via the admin panel won't persist** across deployments
- For production, integrate a database:
  - Vercel Postgres
  - MongoDB Atlas
  - Supabase
  - Firebase

### Admin Authentication
- Current setup uses in-memory authentication
- For production, implement proper authentication:
  - NextAuth.js
  - Auth0
  - Firebase Auth
  - Supabase Auth

## 🐛 Troubleshooting

### Issue: 404 on page refresh
**Solution**: Already configured! The `vercel.json` rewrites all routes to `index.html`

### Issue: API routes not working
**Solution**: 
1. Check that API functions are in `/api` folder
2. Verify CORS headers in API responses
3. Check Vercel function logs in dashboard

### Issue: File uploads failing
**Solution**: 
1. Ensure `/public/uploads` exists in repository
2. Add `.gitkeep` file to keep the directory
3. Consider using cloud storage for production

### Issue: Content changes not saving
**Solution**: This is expected. Vercel's filesystem is read-only. Integrate a database for persistence.

## 📊 Monitoring

View your deployment:
1. Function logs: Vercel Dashboard → Your Project → Functions
2. Analytics: Vercel Dashboard → Your Project → Analytics
3. Build logs: Vercel Dashboard → Deployments → [Your Deployment]

## 🔄 CI/CD

Vercel automatically:
- Deploys on every push to `main`/`master` branch
- Creates preview deployments for PRs
- Runs build checks
- Provides deployment URLs

## 🎯 Performance

Your site includes:
- ✅ Automatic CDN distribution
- ✅ Edge network caching
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 support
- ✅ Automatic HTTPS

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)

