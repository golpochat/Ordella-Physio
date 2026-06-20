# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/frontend-web
# Image: ordella-physio-frontend-web:latest
# Build context: ./apps/frontend-web  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM ordella-base:latest AS base
FROM base AS build
ENV CI=true
COPY . ./apps/frontend-web
RUN rm -rf apps/frontend-web/node_modules
# Force Linux-only binaries + disable strict SSL
RUN echo "strict-ssl=false" >> /root/.npmrc \
  && echo "registry=https://registry.npmjs.org/" >> /root/.npmrc \
  && echo "engine-strict=false" >> /root/.npmrc \
  && echo "prefer-offline=true" >> /root/.npmrc \
  && echo "fetch-retries=5" >> /root/.npmrc \
  && echo "fetch-retry-factor=2" >> /root/.npmrc \
  && echo "fetch-retry-mintimeout=1000" >> /root/.npmrc \
  && echo "fetch-retry-maxtimeout=60000" >> /root/.npmrc \
  && echo "shamefully-hoist=true" >> /root/.npmrc

RUN pnpm config set strict-ssl false \
  && pnpm config set registry https://registry.npmjs.org/ \
  && pnpm config set prefer-offline true \
  && pnpm config set fetch-retries 5 \
  && pnpm config set fetch-retry-factor 2 \
  && pnpm config set fetch-retry-mintimeout 1000 \
  && pnpm config set fetch-retry-maxtimeout 60000
RUN pnpm install --filter=@ordella/frontend-web --offline
WORKDIR /app/apps/frontend-web
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:3049
ARG NEXT_PUBLIC_DEFAULT_TENANT_ID=demo-tenant
ARG DEFAULT_TENANT_ID=demo-tenant
ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL
ENV NEXT_PUBLIC_DEFAULT_TENANT_ID=$NEXT_PUBLIC_DEFAULT_TENANT_ID
ENV DEFAULT_TENANT_ID=$DEFAULT_TENANT_ID
RUN pnpm turbo run build --filter=@ordella/frontend-web
RUN rm -rf .next/standalone/apps/frontend-web/.next/static && \
    cp -r .next/static .next/standalone/apps/frontend-web/.next/static
RUN rm -rf .next/standalone/apps/frontend-web/public && \
    if [ -d public ]; then cp -r public .next/standalone/apps/frontend-web/public; fi

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3010
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/frontend-web/.next/standalone ./
COPY --from=build /app/apps/frontend-web/.next/static ./apps/frontend-web/.next/static
COPY --from=build /app/apps/frontend-web/public ./apps/frontend-web/public

EXPOSE 3010

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["node", "apps/frontend-web/server.js"]
