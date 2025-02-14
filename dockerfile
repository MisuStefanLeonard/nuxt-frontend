ARG NODE_VERSION=23.7.0

FROM node:${NODE_VERSION}-alpine as build
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --omit=dev

COPY . /app

RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=development

FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app
COPY --from=build /app /app
RUN npm install --production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
