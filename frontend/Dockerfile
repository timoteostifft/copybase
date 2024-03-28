FROM node:19.9.0

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]