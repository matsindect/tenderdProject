# Use the official Node.js 14 image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, including concurrently, tsc, and nodemon
RUN npm install -g concurrently && \
    npm install -g typescript && \
    npm install -g nodemon && \
    npm install

# Copy the rest of the application code
COPY . .

# Command to run the concurrent processes
CMD concurrently -k "tsc -p ./src/analyticsServer/ -w" "nodemon ./dist/analyticsServer/server.js"