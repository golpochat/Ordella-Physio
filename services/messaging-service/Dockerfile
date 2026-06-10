FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/messaging-service

WORKDIR /app/services/messaging-service
RUN cp -r src/generated dist/services/messaging-service/src/

EXPOSE 3061

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && exec pnpm start"]
