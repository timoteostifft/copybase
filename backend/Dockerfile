FROM node:19.9.0

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]