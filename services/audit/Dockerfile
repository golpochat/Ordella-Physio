FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/audit-service

WORKDIR /app/services/audit
RUN cp -r src/generated dist/services/audit/src/

EXPOSE 3070

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
