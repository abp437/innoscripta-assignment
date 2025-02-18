# Use official node image as the base image
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (Vite in production mode)
RUN npm run build

# Final stage: Serve the app using a lightweight server
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
