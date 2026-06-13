# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/ai-monitoring-service
# Image: ordella-physio-ai-monitoring:latest
# Build context: ./services/ai-monitoring  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/ai-monitoring/package.json
COPY prisma ./services/ai-monitoring/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/ai-monitoring-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/ai-monitoring
RUN rm -rf services/ai-monitoring/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/ai-monitoring-service...
RUN pnpm turbo run build --filter=@ordella/ai-monitoring-service
WORKDIR /app/services/ai-monitoring
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/ai-monitoring/src/

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
COPY --from=build /app/services/ai-monitoring ./services/ai-monitoring

EXPOSE 3077

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/ai-monitoring-service exec prisma migrate deploy && pnpm --filter @ordella/ai-monitoring-service start"]
