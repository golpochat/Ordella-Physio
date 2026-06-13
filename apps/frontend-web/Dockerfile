# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/frontend-web
# Image: ordella-physio-frontend-web:latest
# Build context: ./apps/frontend-web  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages/config ./packages/config
COPY --from=workspace packages/shared ./packages/shared
COPY --from=workspace packages/ui ./packages/ui
COPY --from=workspace packages/utils ./packages/utils
COPY --from=workspace packages/errors ./packages/errors
COPY --from=workspace packages/security ./packages/security
COPY --from=workspace packages/validation ./packages/validation
COPY package.json ./apps/frontend-web/package.json
COPY --from=workspace shared ./shared
RUN pnpm install --frozen-lockfile --filter @ordella/frontend-web...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
COPY . ./apps/frontend-web
RUN rm -rf apps/frontend-web/node_modules
RUN pnpm install --frozen-lockfile --filter=@ordella/frontend-web
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
