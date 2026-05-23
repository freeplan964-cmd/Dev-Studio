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

# Development stage (runs nodemon for live-reload)
FROM base AS development
ENV NODE_ENV=development
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Production stage (runs with production environment settings)
FROM base AS production
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "run", "start"]
