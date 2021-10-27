FROM node:15.13-alpine

COPY . /cab432-Assignment01

WORKDIR /cab432-Assignment01/client

RUN npm install

RUN npm run build

WORKDIR /cab432-Assignment01/server
RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]




