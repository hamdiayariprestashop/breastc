# Vercel Blob Storage Setup Guide

## ✅ What's Done
- ✅ `@vercel/blob` package installed
- ✅ API files updated to use Blob storage
- ✅ Fallback to local files if Blob not configured

## 🚀 How to Enable Blob Storage (2 Minutes)

### Option 1: Enable via Vercel Dashboard (Easiest)

1. **Go to your Vercel project dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Enable Blob Storage**
   - Go to **Storage** tab
   - Click **Create Database**
   - Select **Blob**
   - Click **Create**

3. **Connect to your project**
   - Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to your environment variables
   - Done! ✅

### Option 2: Enable via Vercel CLI

```bash
# Make sure you're logged in
vercel login

# Link your project (if not already linked)
vercel link

# Create blob store
vercel storage create blob

# Deploy
vercel --prod
```

## 🎯 What Happens Now

### ✅ Content Management
- **GET** `/api/content` - Reads from Blob storage (or falls back to `public/content.json`)
- **POST** `/api/content` - Saves to Blob storage
- Admin panel can now save changes! 🎉

### ✅ File Uploads
- **POST** `/api/upload` - Uploads files to Blob storage
- Returns a public URL for the uploaded file
- No more file system errors! 🎉

## 📝 Testing Locally (Optional)

To test with Blob storage locally:

1. Get your token from Vercel:
   ```bash
   vercel env pull .env
   ```

2. This creates a `.env` file with your `BLOB_READ_WRITE_TOKEN`

3. Run your dev server:
   ```bash
   npm run dev
   ```

## 🔍 Troubleshooting

**If you see "Blob storage not configured":**
- Make sure you created the Blob store in Vercel dashboard
- Redeploy your app: `vercel --prod`
- The environment variable is automatically added

**If uploads fail:**
- Check that your Blob store is connected
- Check Vercel logs: `vercel logs`

## 💰 Pricing

- **Free tier**: 500GB storage, 5M reads/month
- More than enough for most projects!
- See: https://vercel.com/docs/storage/vercel-blob/usage-and-pricing

## 📚 Resources

- Vercel Blob Docs: https://vercel.com/docs/storage/vercel-blob
- Pricing: https://vercel.com/docs/storage/vercel-blob/usage-and-pricing

