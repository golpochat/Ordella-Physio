#!/bin/sh
set -e

cd /app/apps/frontend-web

# Optional dev fallback when platform integrations DB is empty.
# Production: Super Admin → Settings → Integrations (stored in auth-service DB).
if [ -n "${ADDRESS_LOOKUP_API_KEY:-}" ]; then
  cat > .env.local <<EOF
ADDRESS_LOOKUP_PROVIDER=${ADDRESS_LOOKUP_PROVIDER:-none}
ADDRESS_LOOKUP_API_KEY=${ADDRESS_LOOKUP_API_KEY}
EOF
fi

cd /app
exec node apps/frontend-web/server.js
