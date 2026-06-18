# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/admin-dashboard
# Image: ordella-physio-admin-dashboard:latest
# Build context: ./apps/admin-dashboard  |  workspace: repo root

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
COPY package.json ./apps/admin-dashboard/package.json
COPY --from=workspace shared ./shared
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
RUN pnpm install --frozen-lockfile --filter @ordella/admin-dashboard...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
COPY . ./apps/admin-dashboard
RUN rm -rf apps/admin-dashboard/node_modules
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
RUN pnpm install --frozen-lockfile --filter=@ordella/admin-dashboard
WORKDIR /app/apps/admin-dashboard
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo run build --filter=@ordella/admin-dashboard

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/admin-dashboard/.next/standalone ./
COPY --from=build /app/apps/admin-dashboard/.next/static ./apps/admin-dashboard/.next/static
COPY --from=build /app/apps/admin-dashboard/public ./apps/admin-dashboard/public

EXPOSE 3000

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["node", "apps/admin-dashboard/server.js"]
