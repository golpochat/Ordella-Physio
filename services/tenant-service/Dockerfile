FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/tenant-service

WORKDIR /app/services/tenant-service
RUN cp -r src/generated dist/services/tenant-service/src/

EXPOSE 3052

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate --accept-data-loss && exec pnpm start"]