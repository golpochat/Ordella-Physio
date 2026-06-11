FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/auth-service

WORKDIR /app/services/auth-service
RUN cp -r src/email/templates dist/services/auth-service/src/email/

EXPOSE 3051

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]