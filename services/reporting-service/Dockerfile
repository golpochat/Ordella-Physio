# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/reporting-service
# Image: ordella-physio-reporting-service:latest
# Build context: ./services/reporting-service  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/reporting-service/package.json
COPY prisma ./services/reporting-service/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/reporting-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/reporting-service
RUN rm -rf services/reporting-service/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/reporting-service...
RUN pnpm turbo run build --filter=@ordella/reporting-service
WORKDIR /app/services/reporting-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/reporting-service/src/

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
COPY --from=build /app/services/reporting-service ./services/reporting-service

EXPOSE 3059

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/reporting-service exec prisma db push --skip-generate && pnpm --filter @ordella/reporting-service start"]
