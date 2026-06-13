# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/ai-observability-service
# Image: ordella-physio-ai-observability:latest
# Build context: ./services/ai-observability  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/ai-observability/package.json
COPY prisma ./services/ai-observability/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/ai-observability-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/ai-observability
RUN rm -rf services/ai-observability/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/ai-observability-service...
RUN pnpm turbo run build --filter=@ordella/ai-observability-service
WORKDIR /app/services/ai-observability
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/ai-observability/src/

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
COPY --from=build /app/services/ai-observability ./services/ai-observability

EXPOSE 3083

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/ai-observability-service exec prisma migrate deploy && pnpm --filter @ordella/ai-observability-service start"]
