FROM node:slim

WORKDIR /app

COPY package*.json ./
COPY index.js .
COPY helpers.js .
COPY constants.js .
COPY README.md .
RUN mkdir commands
COPY ./commands/*.js commands/

RUN npm ci

ENTRYPOINT ["npm", "start"]