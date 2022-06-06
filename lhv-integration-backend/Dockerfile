FROM node:18.2-alpine3.14 AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=development

COPY . .

RUN yarn run build

FROM node:18.2-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]