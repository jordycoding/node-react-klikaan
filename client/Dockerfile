FROM node:15.4.0-alpine3.10 as builder

WORKDIR /app/
COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.15
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build/ /var/www/

EXPOSE 80
