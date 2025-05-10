# ─── BUILD STAGE ──────────────────────────────────────────────────────────────
ARG NODE_VERSION=23.7
FROM node:${NODE_VERSION}-alpine AS build

# Give Nuxt enough memory for large builds
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# 1) Copy only package.json (don’t bring in package-lock.json)
COPY package.json ./

# 2) Upgrade npm and install ALL deps (dev+prod) so `nuxi` is present
RUN npm install -g npm@11.3.0 \
 && npm install

# 3) Now copy the rest of your source and build
COPY . .
RUN npm run build      # uses the locally‐installed nuxi

# ─── PRODUCTION STAGE ────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# 4) Copy package.json and install only production deps
COPY package.json ./
RUN npm install --omit=dev

# 5) Copy over the built output
COPY --from=build /app/.output ./.output

# 6) Expose & run
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]
