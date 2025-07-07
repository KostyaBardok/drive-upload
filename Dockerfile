FROM node:20-alpine

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/main"]