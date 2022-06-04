FROM node:18.2-alpine3.14 as builder
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build --production
FROM nginx:1.21.6-alpine as runtime
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/lhv-integration-frontend .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 4200:80