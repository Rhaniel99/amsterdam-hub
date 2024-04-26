FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# Mude temporariamente para o usuário root

# Execute o npm install com permissões de root
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 6060

CMD ["npm", "start"]