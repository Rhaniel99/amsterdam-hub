FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install && npm install -g nodemon
COPY . .
EXPOSE 6060
CMD ["npm", "start"]