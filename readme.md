# 📌 Task Manager — Fullstack приложение
**Stack:** NestJS • Prisma • PostgreSQL • React • Vite • Ant Design • Docker • NGINX Reverse Proxy

Этот проект — полноценное CRUD-приложение для управления задачами.
Реализована регистрация, авторизация (JWT), создание, редактирование и удаление задач.

Фронтенд работает через **NGINX Reverse Proxy**, который проксирует запросы `/api/` в контейнер backend.

---

# 🛠 Используемые технологии

## **Backend**
- **NestJS** — структура, модули, контроллеры, DI
- **Prisma ORM** — работа с PostgreSQL
- **PostgreSQL** — база данных
- **JWT Auth** — авторизация пользователей
- **Docker** — контейнеризация backend
- **ConfigModule** — поддержка `.env.development` и `.env.production`

## **Frontend**
- **React + Vite** — современная сборка фронтенда
- **Ant Design** — UI-кит, таблицы, модалки, формы
- **Axios** — HTTP клиент
- **React Router** — маршрутизация
- **Context API (Auth)** — авторизация на фронте
- **NGINX** — отдача статики + reverse proxy на backend

## **DevOps**
- **Docker Compose** — запуск всех сервисов
- **Nginx Reverse Proxy** — перенаправление `/api/` → backend
- **Multi-stage Docker builds** фронта и бэка
- **Environment-based конфигурация**

# 🚀 Запуск проекта

## 1️⃣ Заполнить `.env.development` и `.env.production` из env.*.example во фронте и бэке

## 2️⃣ Запуск в Docker

```bash
docker-compose up --build
```

---

# 🔄 Reverse Proxy схема

```
Browser → frontend (nginx) → /api/* → backend:3000
Frontend static files → nginx → dist/index.html
```

---

# 🎨 UI Функционал (AntD)

✔ Авторизация
✔ Регистрация
✔ Список задач
✔ Создание
✔ Редактирование
✔ Удаление
✔ Таблица

---

# 🗄 Backend функционал

✔ Регистрация пользователей
✔ Авторизация (JWT)
✔ CRUD задач
✔ Prisma миграции
✔ Prisma Client
✔ Валидация DTO через class-validator

---

# 🧩 Docker Compose включает

| Сервис | Описание |
|--------|----------|
| **frontend** | React + NGINX Reverse Proxy |
| **backend** | NestJS + Prisma |
| **db** | PostgreSQL |

---

# 🛠 Backend команды

```
npm run start:dev
npm run build
npx prisma migrate dev
npx prisma migrate deploy
```

---

# 📦 Пример nginx.conf

```
server {
    listen 80;

    location /api/ {
        proxy_pass http://backend:3000/;
    }

    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }
}
```
