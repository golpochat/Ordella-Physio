FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/file-storage-service

WORKDIR /app/services/file-storage
RUN cp -r src/generated dist/services/file-storage/src/

EXPOSE 3071

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
