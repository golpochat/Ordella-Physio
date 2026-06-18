# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/pharmacy-service

FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./services/pharmacy-service/package.json
COPY prisma ./services/pharmacy-service/prisma
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
RUN pnpm install --frozen-lockfile --filter @ordella/pharmacy-service...

FROM base AS build
COPY . ./services/pharmacy-service
RUN rm -rf services/pharmacy-service/node_modules
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
RUN pnpm install --frozen-lockfile --filter @ordella/pharmacy-service...
RUN pnpm turbo run build --filter=@ordella/pharmacy-service
WORKDIR /app/services/pharmacy-service
RUN find dist -type f -name '*.js' -exec sed -i \
    -e 's|require("\.\./\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' \
    -e 's|require("\.\./\.\./packages/\([^/]*\)/src/index\.ts")|require("@ordella/\1")|g' {} +
RUN cp -r src/generated dist/services/pharmacy-service/src/

FROM node:18-alpine AS production
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/shared ./shared
COPY --from=build /app/services/pharmacy-service ./services/pharmacy-service

EXPOSE 3085

CMD ["sh", "-c", "pnpm --filter @ordella/pharmacy-service exec prisma migrate deploy && pnpm --filter @ordella/pharmacy-service start"]
