FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/notification-service

WORKDIR /app/services/notification-service
RUN cp -r src/generated dist/services/notification-service/src/

EXPOSE 3062

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && exec pnpm start"]
