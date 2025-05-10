# ─── BUILD STAGE ──────────────────────────────────────────────────────────────
ARG NODE_VERSION=23.7
FROM node:${NODE_VERSION}-alpine AS build

# give Nuxt enough memory for large pages
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# 1) Copy only package files and install ALL deps (prod + dev)
COPY package.json package-lock.json ./
RUN npm install -g npm@11.3.0   # upgrade npm so lockfile errors match your local
RUN npm ci                     # install exactly what's in package-lock.json

# 2) Copy your code and build
COPY . .
RUN npm run build              # now `nuxi` is present under node_modules/.bin

# ─── PRODUCTION STAGE ────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# 3) Copy only the files you need at runtime
COPY package.json package-lock.json ./
RUN npm install --omit=dev     # install only production deps

# 4) Copy over the built output
COPY --from=build /app/.output ./.output

# 5) Expose and run
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]
