FROM node:latest

WORKDIR /home/jf/Docker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

EXPOSE 8080

EXPOSE 5430

CMD npm run dev