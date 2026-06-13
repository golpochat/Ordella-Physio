# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/communication-service
# Image: ordella-physio-communication-service:latest
# Build context: ./services/communication-service  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/communication-service/package.json
COPY prisma ./services/communication-service/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/communication-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/communication-service
RUN rm -rf services/communication-service/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/communication-service...
RUN pnpm turbo run build --filter=@ordella/communication-service
WORKDIR /app/services/communication-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/communication-service/src/
RUN cp -r src/templates/templates dist/services/communication-service/src/templates/

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
COPY --from=build /app/services/communication-service ./services/communication-service

EXPOSE 3058

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/communication-service exec prisma db push --skip-generate && pnpm --filter @ordella/communication-service start"]
