# Билдер
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate || true

RUN npm run build

# Облегченный контейнер
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package*.json ./

CMD ["node", "dist/src/main.js"]
