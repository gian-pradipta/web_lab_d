FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
# Rebuild sqlite3 for the container's platform
RUN npm rebuild sqlite3

COPY . .

# Build TypeScript → ini dijalankan saat `docker-compose build`, bukan saat `docker-compose up`
RUN npm run build

# Jalankan migrasi & aplikasi
CMD npx knex migrate:latest --knexfile ./dist/database/knexfile.js --env pg && node ./dist/app.js

EXPOSE 8080
