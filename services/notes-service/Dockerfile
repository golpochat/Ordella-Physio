FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

RUN pnpm turbo run build --filter=@ordella/notes-service

WORKDIR /app/services/notes-service
RUN cp -r src/generated dist/services/notes-service/src/


EXPOSE 3055

CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && exec pnpm start"]