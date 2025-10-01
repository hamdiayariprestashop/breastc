#!/bin/bash

# Test Build Script for Vercel Deployment
# This script tests your build locally before deploying to Vercel

echo "🔨 Testing Vercel Build Locally..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous build
if [ -d "dist" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf dist
fi

# Run the build
echo "🏗️ Running production build..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ] && [ -d "dist" ]; then
    echo ""
    echo "✅ Build successful!"
    echo "📁 Build output: dist/"
    echo ""
    echo "Build contents:"
    ls -lah dist/
    echo ""
    echo "🎉 Your project is ready for Vercel deployment!"
    echo ""
    echo "Next steps:"
    echo "  1. Run 'vercel' to deploy to preview"
    echo "  2. Run 'vercel --prod' to deploy to production"
else
    echo ""
    echo "❌ Build failed!"
    echo "Please check the error messages above."
    exit 1
fi

