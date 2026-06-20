# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/ai-deploy-service
# Image: ordella-physio-ai-deploy:latest
# Build context: ./services/ai-deploy  |  workspace: repo root

# ---------------------------------------------------------
# 1. BASE STAGE — Install dependencies only once
# ---------------------------------------------------------
FROM ordella-base:latest AS base
FROM base AS build
ENV CI=true
COPY . ./services/ai-deploy
RUN rm -rf services/ai-deploy/node_modules
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
RUN pnpm install --filter @ordella/ai-deploy-service... --offline
RUN pnpm turbo run build --filter=@ordella/ai-deploy-service
WORKDIR /app/services/ai-deploy
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/ai-deploy/src/

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
COPY --from=build /app/services/ai-deploy ./services/ai-deploy

EXPOSE 3078

# ---------------------------------------------------------
# 4. START COMMAND
# ---------------------------------------------------------
CMD ["sh", "-c", "pnpm --filter @ordella/ai-deploy-service exec prisma migrate deploy && pnpm --filter @ordella/ai-deploy-service start"]
