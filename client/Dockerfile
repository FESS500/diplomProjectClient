# Указываем базовый образ для сборки клиентской части (React)
FROM node:14 as build

# Создаем и переходим в рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Второй этап: создаем образ nginx для раздачи статических файлов React
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80 для веб-сервера nginx
EXPOSE 80

# Команда для запуска nginx в режиме демона
CMD ["nginx", "-g", "daemon off;"]
