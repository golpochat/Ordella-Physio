# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/ai-gateway-service
# Image: ordella-physio-ai-gateway:latest
# Build context: ./services/ai-gateway  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/ai-gateway/package.json
COPY prisma ./services/ai-gateway/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/ai-gateway-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/ai-gateway
RUN rm -rf services/ai-gateway/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/ai-gateway-service...
RUN pnpm turbo run build --filter=@ordella/ai-gateway-service
WORKDIR /app/services/ai-gateway
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/ai-gateway/src/

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
COPY --from=build /app/services/ai-gateway ./services/ai-gateway

EXPOSE 3080

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/ai-gateway-service exec prisma migrate deploy && pnpm --filter @ordella/ai-gateway-service start"]
