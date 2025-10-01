# BIC Medical Center - Production

## Quick Start

```bash
# Deploy with PM2 (recommended)
./deploy.sh production

# Or deploy with Docker
./deploy-docker.sh production
```

## Health Check

```bash
./health-check.sh
```

## Monitoring

```bash
# View logs
pm2 logs bic-prod

# Check status
pm2 status

# Restart if needed
pm2 restart bic-prod
```

## Backup

```bash
# Manual backup
cp src/data/content.json backups/content-$(date +%Y%m%d).json
```

For detailed instructions, see `production-setup.md`
