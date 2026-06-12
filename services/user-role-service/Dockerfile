FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/user-role-service

WORKDIR /app/services/user-role-service
RUN cp -r src/generated dist/services/user-role-service/src/

EXPOSE 3068

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
