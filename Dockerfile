FROM node:alpine AS dev

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
