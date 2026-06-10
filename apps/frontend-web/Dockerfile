FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app
COPY . .

RUN pnpm install --prefer-offline --no-frozen-lockfile

ARG NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:3049
ARG NEXT_PUBLIC_DEFAULT_TENANT_ID=demo-tenant
ARG DEFAULT_TENANT_ID=demo-tenant
ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL
ENV NEXT_PUBLIC_DEFAULT_TENANT_ID=$NEXT_PUBLIC_DEFAULT_TENANT_ID
ENV DEFAULT_TENANT_ID=$DEFAULT_TENANT_ID

RUN pnpm turbo run build --filter=@ordella/frontend-web

WORKDIR /app/apps/frontend-web
RUN cp -r .next/static .next/standalone/apps/frontend-web/.next/static
RUN if [ -d public ]; then cp -r public .next/standalone/apps/frontend-web/public; fi

WORKDIR /app/apps/frontend-web/.next/standalone

EXPOSE 3010
ENV PORT=3010
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

CMD ["node", "apps/frontend-web/server.js"]
