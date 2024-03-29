# React NEWS Application with Docker

This guide will walk you through the process of running a React application using Docker.

## Prerequisites

- Node.js installed on your machine
- Yarn package manager
- Docker installed on your machine

## Steps

1. **Install Yarn**: If you haven't installed Yarn, you can do so by running the following command:

```bash
npm install -g yarn

    Install Dependencies: Navigate to your project directory and install the project dependencies by running:

yarn install
```

## Build the Docker Image:

Run the following command in your terminal to build the Docker image:

```
docker build . -t innos:v1.0
```

Run the Docker Container: After the image has been built, you can run it with the following command:

```
docker run -p 3000:3000 innos:v1.0
```

```
Access the App: You can now access your app by navigating to http://localhost:3000 in your web browser.


Please replace `innos:v1.0` with your preferred Docker image name, and ensure that the port number `3000` matches the one specified in the `Dockerfile` and the `docker run` command.

```

## Run without docker\*

```
yarn install && yarn dev
```
