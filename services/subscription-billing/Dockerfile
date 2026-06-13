# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/subscription-billing-service
# Image: ordella-physio-subscription-billing:latest
# Build context: ./services/subscription-billing  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/subscription-billing/package.json
COPY prisma ./services/subscription-billing/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/subscription-billing-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/subscription-billing
RUN rm -rf services/subscription-billing/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/subscription-billing-service...
RUN pnpm turbo run build --filter=@ordella/subscription-billing-service
WORKDIR /app/services/subscription-billing
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/subscription-billing/src/

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
COPY --from=build /app/services/subscription-billing ./services/subscription-billing

EXPOSE 3074

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/subscription-billing-service exec prisma migrate deploy && pnpm --filter @ordella/subscription-billing-service start"]
