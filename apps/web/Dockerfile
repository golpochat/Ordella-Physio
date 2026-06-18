# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/web
# Image: ordella-physio-web:latest
# Build context: ./apps/web  |  workspace: repo root

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
COPY package.json ./apps/web/package.json
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
RUN pnpm install --frozen-lockfile --filter @ordella/web...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build frontend assets
# ---------------------------------------------------------
FROM base AS build
COPY . ./apps/web
RUN rm -rf apps/web/node_modules
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
RUN pnpm install --frozen-lockfile --filter=@ordella/web
WORKDIR /app/apps/web
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:4000
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN pnpm turbo run build --filter=@ordella/web

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

EXPOSE 3000

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["node", "apps/web/server.js"]
