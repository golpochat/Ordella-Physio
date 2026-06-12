FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/subscription-billing-service

WORKDIR /app/services/subscription-billing
RUN cp -r src/generated dist/services/subscription-billing/src/

EXPOSE 3074

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
