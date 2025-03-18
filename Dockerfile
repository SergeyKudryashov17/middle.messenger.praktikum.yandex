FROM node:16-alpine

WORKDIR /var/www

COPY package.json package-lock.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./src/server.js"]


