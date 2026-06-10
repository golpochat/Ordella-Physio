FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/event-bus-service

WORKDIR /app/services/event-bus-service

EXPOSE 3060

CMD ["pnpm", "start"]