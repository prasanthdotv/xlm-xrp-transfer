FROM node:17-alpine3.14 as builder
WORKDIR /usr/app
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]