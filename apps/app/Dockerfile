# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/app
# Image: ordella-physio-app:latest
# Build context: ./apps/app  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY package.json ./apps/app/package.json
COPY --from=workspace shared ./shared
RUN pnpm install --frozen-lockfile --filter @ordella/app...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
COPY . ./apps/app
RUN rm -rf apps/app/node_modules
RUN pnpm install --frozen-lockfile --filter=@ordella/app
WORKDIR /app/apps/app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL
RUN pnpm turbo run build --filter=@ordella/app

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/app/.next/standalone ./
COPY --from=build /app/apps/app/.next/static ./apps/app/.next/static
COPY --from=build /app/apps/app/public ./apps/app/public

EXPOSE 3001

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["node", "apps/app/server.js"]
