ARG NODE_VERSION=23.5

FROM node:${NODE_VERSION}-alpine as build
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY ./package*.json /app/

RUN npm install -g npm@11.3.0

COPY . /app

RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app

COPY --from=build /app/ /app/

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
