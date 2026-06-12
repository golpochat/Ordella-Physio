FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/staff-service

WORKDIR /app/services/staff-service
RUN cp -r src/generated dist/services/staff-service/src/

EXPOSE 3069

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec pnpm start"]
