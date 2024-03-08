# Step 1: Specify the base image. Here, we're using the latest LTS version of Node.js
FROM node:lts-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Step 4: Install the dependencies in the package.json file
RUN npm install

# Step 5: Copy the rest of your application code into the working directory
COPY . .

# Step 6: Expose the port that your app runs on
EXPOSE 4000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
