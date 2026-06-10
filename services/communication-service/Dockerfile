FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/communication-service

WORKDIR /app/services/communication-service
RUN cp -r src/generated dist/services/communication-service/src/
RUN cp -r src/templates/templates dist/services/communication-service/src/templates/

EXPOSE 3058

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && exec pnpm start"]