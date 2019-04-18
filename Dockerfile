FROM node:11.14-alpine

WORKDIR /app    

COPY . .

RUN yarn

EXPOSE 5000

CMD [ "yarn", "start"]