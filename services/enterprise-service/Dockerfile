# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/enterprise-service
# Image: ordella-physio-enterprise-service:latest
# Build context: ./services/enterprise-service  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/enterprise-service/package.json
COPY prisma ./services/enterprise-service/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/enterprise-service...

# ---------------------------------------------------------
# 2. BUILD STAGE — Build TypeScript
# ---------------------------------------------------------
FROM base AS build
COPY . ./services/enterprise-service
RUN rm -rf services/enterprise-service/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/enterprise-service...
RUN pnpm turbo run build --filter=@ordella/enterprise-service
WORKDIR /app/services/enterprise-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/enterprise-service/src/

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
COPY --from=build /app/services/enterprise-service ./services/enterprise-service

EXPOSE 3065

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/enterprise-service exec prisma db push --skip-generate && pnpm --filter @ordella/enterprise-service start"]
