FROM node:20-alpine

WORKDIR /.

COPY ./package.json ./
COPY . .

RUN npm i

CMD ["npm", "run", "dev"]

