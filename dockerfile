FROM node:latest

WORKDIR /home/jf/Docker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

EXPOSE 8080

CMD npm run dev