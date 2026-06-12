FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/search-index-service

WORKDIR /app/services/search-index
RUN cp -r src/generated dist/services/search-index/src/

EXPOSE 3073

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
