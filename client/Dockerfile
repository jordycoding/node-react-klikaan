FROM node:11.14-alpine as builder

WORKDIR /app/
COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.15
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build/ /var/www/react_app/

EXPOSE 80
