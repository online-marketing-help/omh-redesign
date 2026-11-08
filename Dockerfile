# ponytail: two stages, no base-image layer gymnastics. Alpine both sides so the
# musl sharp binary npm installs at build time still works at runtime.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Next inlines NEXT_PUBLIC_* at build time. Both are public values (see
# .env.example), so they default here and no build args are needed.
ARG NEXT_PUBLIC_SANITY_PROJECT_ID=qr5jqq87
ARG NEXT_PUBLIC_SANITY_DATASET=production
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
    NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
# The server's .env, mounted for the build only (never copied into a layer), so pages pre-rendered here see the same
# settings as the running site: without it the home page baked in the Instagram snapshot until its hourly refresh.
RUN --mount=type=secret,id=env,target=/app/.env npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
# .next/static is a volume (docker-compose.yml) that keeps every build's CSS and JS, so a page a phone saved before
# a deploy (a restored tab, the back button) still finds its files. Each start adds the new build's files to it.
# ponytail: the volume grows by a few MB a deploy; clear it now and then with docker volume rm when stopped.
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build /app/.next/static ./static-build
COPY --from=build /app/public ./public
USER node
EXPOSE 3000
CMD ["sh", "-c", "cp -r static-build/. .next/static/ && exec node server.js"]
