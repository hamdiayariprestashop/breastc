#!/usr/bin/env node

/**
 * Production Optimization Script
 * This script optimizes the application for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production optimization...');

// 1. Create necessary directories
const directories = [
  'logs',
  'backups',
  'public/uploads',
  'ssl'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// 2. Set proper file permissions (Unix-like systems)
if (process.platform !== 'win32') {
  const filesToMakeExecutable = [
    'deploy.sh',
    'deploy-docker.sh'
  ];

  filesToMakeExecutable.forEach(file => {
    if (fs.existsSync(file)) {
      fs.chmodSync(file, '755');
      console.log(`✅ Made executable: ${file}`);
    }
  });
}

// 3. Create .gitignore if it doesn't exist
const gitignoreContent = `
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# PM2
.pm2/

# Docker
.docker/

# SSL certificates
ssl/*.pem
ssl/*.key
ssl/*.crt

# Backups
backups/*.json
backups/*.tar.gz
`;

if (!fs.existsSync('.gitignore')) {
  fs.writeFileSync('.gitignore', gitignoreContent);
  console.log('✅ Created .gitignore file');
}

// 4. Create health check endpoint test
const healthCheckScript = `
#!/bin/bash
# Health check script for production monitoring

HEALTH_URL="http://localhost:3001/api/content"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
    echo "✅ Application is healthy"
    exit 0
else
    echo "❌ Application health check failed (HTTP $RESPONSE)"
    exit 1
fi
`;

if (!fs.existsSync('health-check.sh')) {
  fs.writeFileSync('health-check.sh', healthCheckScript);
  if (process.platform !== 'win32') {
    fs.chmodSync('health-check.sh', '755');
  }
  console.log('✅ Created health-check.sh script');
}

// 5. Create production README
const productionReadme = `# BIC Medical Center - Production

## Quick Start

\`\`\`bash
# Deploy with PM2 (recommended)
./deploy.sh production

# Or deploy with Docker
./deploy-docker.sh production
\`\`\`

## Health Check

\`\`\`bash
./health-check.sh
\`\`\`

## Monitoring

\`\`\`bash
# View logs
pm2 logs bic-prod

# Check status
pm2 status

# Restart if needed
pm2 restart bic-prod
\`\`\`

## Backup

\`\`\`bash
# Manual backup
cp src/data/content.json backups/content-$(date +%Y%m%d).json
\`\`\`

For detailed instructions, see \`production-setup.md\`
`;

if (!fs.existsSync('README-PRODUCTION.md')) {
  fs.writeFileSync('README-PRODUCTION.md', productionReadme);
  console.log('✅ Created README-PRODUCTION.md');
}

console.log('🎉 Production optimization completed!');
console.log('');
console.log('Next steps:');
console.log('1. Update .env file with your production settings');
console.log('2. Update nginx.conf with your domain name');
console.log('3. Run ./deploy.sh production');
console.log('');
console.log('For detailed instructions, see production-setup.md');
