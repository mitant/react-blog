FROM node:8.1.0

COPY package.json .
RUN npm install

COPY client ./client
COPY server ./server
COPY common ./common
RUN rm server/middleware.development.json

EXPOSE 3000

CMD npm start