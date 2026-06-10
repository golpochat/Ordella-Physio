FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/marketplace-service

WORKDIR /app/services/marketplace-service
RUN cp -r src/generated dist/services/marketplace-service/src/

EXPOSE 3064

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && exec pnpm start"]
