# Шаг сборки
FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Шаг запуска
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]