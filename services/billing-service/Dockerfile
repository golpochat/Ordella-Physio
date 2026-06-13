# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/billing-service
# Image: ordella-physio-billing-service:latest
# Build context: ./services/billing-service  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/billing-service/package.json
COPY prisma ./services/billing-service/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/billing-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/billing-service
RUN rm -rf services/billing-service/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/billing-service...
RUN pnpm turbo run build --filter=@ordella/billing-service
WORKDIR /app/services/billing-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/billing-service/src/

# ---------------------------------------------------------
# 3. PRODUCTION STAGE — Smallest possible runtime image
# ---------------------------------------------------------
FROM node:18-alpine AS production
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/shared ./shared
COPY --from=build /app/services/billing-service ./services/billing-service

EXPOSE 3056

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/billing-service exec prisma migrate deploy && pnpm --filter @ordella/billing-service start"]
