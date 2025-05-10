# Build stage
ARG NODE_VERSION=23.7
FROM node:${NODE_VERSION}-alpine AS build

# Give Nuxt enough memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# 1) Copy manifest files and install all dependencies (including devDeps)
COPY package.json package-lock.json* ./
RUN npm ci

# 2) Copy the rest of your source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# 3) Copy only package manifests and install production deps
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# 4) Copy over the built output
COPY --from=build /app/.output ./.output

# 5) Expose & run
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]
