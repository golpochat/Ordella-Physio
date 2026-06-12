FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/notification-provider-service

WORKDIR /app/services/notification-provider
RUN cp -r src/generated dist/services/notification-provider/src/

EXPOSE 3072

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
