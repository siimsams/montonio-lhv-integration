FROM node:18.2-alpine3.14 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --only=production

COPY . .

RUN yarn run build

FROM nginx:1.21.6-alpine as runtime

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/lhv-integration-frontend .
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 4200:80