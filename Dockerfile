FROM node:20-alpine AS development
WORKDIR /app

COPY ./package.json ./
RUN npm i

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]

