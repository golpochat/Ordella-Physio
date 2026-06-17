# syntax=docker/dockerfile:1.4
# ordella-physio — @ordella/clinic-backend
# Build context: ./backend  |  workspace: repo root

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY --from=workspace packages ./packages
COPY --from=workspace shared ./shared
COPY package.json ./backend/package.json
COPY prisma ./backend/prisma
RUN pnpm install --frozen-lockfile --filter @ordella/clinic-backend...

FROM base AS build
COPY . ./backend
RUN rm -rf backend/node_modules
RUN pnpm install --frozen-lockfile --filter @ordella/clinic-backend...
WORKDIR /app/backend
RUN pnpm exec prisma generate
RUN pnpm run build

FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=workspace package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/shared ./shared
COPY --from=build /app/backend ./backend

EXPOSE 4000

CMD ["sh", "-c", "pnpm --filter @ordella/clinic-backend exec prisma migrate deploy && pnpm --filter @ordella/clinic-backend start"]
