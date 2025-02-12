ARG NODE_VERSION=23.5.0

FROM node:${NODE_VERSION}-slim as build

WORKDIR /

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=development

CMD [ "npm" , "run" ,"dev" ]

