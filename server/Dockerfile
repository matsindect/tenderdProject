# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8082

# Run the Node.js server
CMD ["npm", "concurrently -k \"tsc -p ./src/analyticsServer/ -w\" \"nodemon ./dist/analyticsServer/server.js\""]