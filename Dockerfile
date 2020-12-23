FROM node:15.4.0-alpine3.10

WORKDIR /app    

COPY . .

RUN yarn

EXPOSE 5000

CMD [ "yarn", "start"]