# Base Node image
FROM node:20-alpine AS base

# Create and set working directory
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Development stage (runs Vite development server)
FROM base AS development
ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Production build stage
FROM base AS build-prod
RUN npm run build

# Nginx production environment stage
FROM nginx:1.25-alpine AS production
COPY --from=build-prod /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
