FROM node:8.1.0

COPY package.json .
RUN npm install -g serve
RUN npm install

COPY public ./public
COPY src ./src
COPY server.js .

RUN npm run build
CMD node server.js