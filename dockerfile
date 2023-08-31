FROM node:18-alpine
WORKDIR /srv/app

COPY ./package.json /srv/app
COPY ./package-lock.json /srv/app
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]