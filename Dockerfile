FROM node:20

WORKDIR /root/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "prod" ]