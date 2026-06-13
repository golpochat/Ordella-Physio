# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/event-bus-service
# Image: ordella-physio-event-bus-service:latest
# Build context: ./services/event-bus-service  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/event-bus-service/package.json
COPY prisma ./services/event-bus-service/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/event-bus-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/event-bus-service
RUN rm -rf services/event-bus-service/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/event-bus-service...
RUN pnpm turbo run build --filter=@ordella/event-bus-service
WORKDIR /app/services/event-bus-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +

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
COPY --from=build /app/services/event-bus-service ./services/event-bus-service

EXPOSE 3060

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/event-bus-service start"]
