@echo off
REM Test Build Script for Vercel Deployment (Windows)
REM This script tests your build locally before deploying to Vercel

echo 🔨 Testing Vercel Build Locally...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
)

REM Clean previous build
if exist "dist\" (
    echo 🧹 Cleaning previous build...
    rmdir /s /q dist
)

REM Run the build
echo 🏗️ Running production build...
call npm run build

REM Check if build succeeded
if exist "dist\" (
    echo.
    echo ✅ Build successful!
    echo 📁 Build output: dist/
    echo.
    echo Build contents:
    dir dist\
    echo.
    echo 🎉 Your project is ready for Vercel deployment!
    echo.
    echo Next steps:
    echo   1. Run 'vercel' to deploy to preview
    echo   2. Run 'vercel --prod' to deploy to production
) else (
    echo.
    echo ❌ Build failed!
    echo Please check the error messages above.
    exit /b 1
)

