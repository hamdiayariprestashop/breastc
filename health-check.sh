
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
