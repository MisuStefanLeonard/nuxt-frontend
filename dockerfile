ARG NODE_VERSION=23.7.0

FROM node:${NODE_VERSION}-alpine as build
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=development

FROM nginx:1.21.1-alpine as prod-stage

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx/default.conf /etc/nginx/conf.d

COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g" , "daemon off;" ]

# CMD [ "npm" , "start" ]

