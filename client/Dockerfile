# Use the official Node.js image as a base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the Vue project files into the container
COPY . .

# Install dependencies
RUN npm install

RUN npm run build

# Use the official NGINX image to serve the static files
FROM nginx:latest

# Copy the build files from the previous step to NGINX's default location
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

