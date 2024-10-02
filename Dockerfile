FROM node:18-alpine

WORKDIR /home/node/app
ENV MONGODB_HOST mongodb

COPY . /home/node/app
COPY ./db/run.sh /docker-entrypoint-initdb.d/

RUN npm install

# Install MongoDB
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk upgrade --update && \ 
    apk add mongodb

# Install MongoDB tools
RUN apk add --no-cache mongodb-tools


EXPOSE 3000

CMD [ "npm", "run", "start"]