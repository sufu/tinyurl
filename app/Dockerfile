FROM node:6.3.1

RUN npm install nodemon -g

RUN mkdir -p /tiny

WORKDIR /tiny

ADD . /tiny

RUN cd /tiny && npm install

EXPOSE 3000

CMD ["nodemon", "/tiny/server.js"]