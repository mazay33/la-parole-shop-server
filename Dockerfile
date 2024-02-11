# Use a Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/

# Install app dependencies
RUN npm install -g nodemon
RUN npm install
RUN npx prisma generate

# Copy the rest of the application code to the working directory
COPY . /app

COPY private.key .
COPY certificate.crt .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
