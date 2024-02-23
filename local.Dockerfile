FROM node:20.10.0

WORKDIR /usr/src/app

RUN npm install -g nodemon

RUN npm install -g typescript

EXPOSE 4040 5550 8000 8080