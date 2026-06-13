# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/marketing-site
# Image: ordella-physio-marketing-site:latest
# Build context: ./apps/marketing-site  |  workspace: repo root

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
COPY package.json ./apps/marketing-site/package.json
COPY --from=workspace shared ./shared
RUN pnpm install --frozen-lockfile --filter @ordella/marketing-site...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
COPY . ./apps/marketing-site
RUN rm -rf apps/marketing-site/node_modules
RUN pnpm install --frozen-lockfile --filter=@ordella/marketing-site
WORKDIR /app/apps/marketing-site
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo run build --filter=@ordella/marketing-site

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/marketing-site/.next/standalone ./
COPY --from=build /app/apps/marketing-site/.next/static ./apps/marketing-site/.next/static
COPY --from=build /app/apps/marketing-site/public ./apps/marketing-site/public

EXPOSE 3001

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["node", "apps/marketing-site/server.js"]
