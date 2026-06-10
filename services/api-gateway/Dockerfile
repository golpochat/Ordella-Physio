FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/api-gateway

WORKDIR /app/services/api-gateway

EXPOSE 3049

CMD ["pnpm", "start"]