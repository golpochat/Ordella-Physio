# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/ai-observability-service
# Image: ordella-physio-ai-observability:latest
# Build context: ./services/ai-observability  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM ordella-base:latest AS base
FROM base AS build
ENV CI=true
COPY . ./services/ai-observability
RUN rm -rf services/ai-observability/node_modules
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
RUN pnpm install --filter @ordella/ai-observability-service... --offline
RUN pnpm turbo run build --filter=@ordella/ai-observability-service
WORKDIR /app/services/ai-observability
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/ai-observability/src/


# ---------------------------------------------------------
# 2b. DEPLOY STAGE — production dependencies only (<400MB)
# ---------------------------------------------------------
FROM build AS deploy-src
RUN pnpm deploy --filter=@ordella/ai-observability-service --prod /deploy   && rm -rf /deploy/src /deploy/test /deploy/coverage /deploy/.turbo \
  && rm -f /deploy/tsconfig*.json /deploy/jest.config.ts /deploy/nest-cli.json \
  && rm -f /deploy/test-setup.ts /deploy/.eslintrc.cjs /deploy/.prettierrc \
  && rm -f /deploy/Dockerfile /deploy/.dockerignore /deploy/README.md /deploy/.env.example

FROM node:18-bookworm-slim AS deploy
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
COPY --from=deploy-src /deploy /deploy
WORKDIR /deploy
RUN mkdir -p /opt/peers && cd /opt/peers && npm init -y \
  && npm install --omit=dev \
    bcrypt@5.1.1 \
    @nestjs/microservices@10.4.22 \
    jsonwebtoken@9.0.2 \
    helmet@8.0.0 \
    cors@2.8.5 \
    prom-client@15.1.3 \
    nats@2.29.3 \
    class-validator@0.14.4 \
    class-transformer@0.5.1 \
  && cp -rf /opt/peers/node_modules/. /deploy/node_modules/
# ---------------------------------------------------------
# 3. PRODUCTION STAGE — bookworm slim (glibc native modules)
# ---------------------------------------------------------
FROM node:18-bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deploy /deploy/ ./
COPY --from=build /app/services/ai-observability/dist ./dist

EXPOSE 3083

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/services/ai-observability/src/main.js"]
