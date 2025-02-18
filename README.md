# News Aggregator

## Project Description

The **News Aggregator App** fetches news from three prominent sources:
- **NewsAPI**
- **New York Times**
- **The Guardian**

This application provides users with an easy-to-use platform to view the latest news from a variety of trusted sources.

## Tech Stack

The project is built with the following technologies:
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A strongly-typed programming language for JavaScript.
- **Vite**: A next-generation, fast build tool.
- **Redux Toolkit**: State management for React applications.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js 20.x**: [Install Node.js](https://nodejs.org/)

## Setup Steps

### Docker Setup (Runs in Production Mode)

1. Create a `.env.production.local` file in the root directory.
2. Copy the contents from the `.env.example` file into `.env.production.local`.
3. Replace the API keys in `.env.production.local` with the appropriate values (provided privately).
4. Run the following command to give execute permissions to the `start.sh` script:
    ```bash
    chmod 777 start.sh
    ```
5. To run the project using Docker in **production mode**, execute the following command:
    ```bash
    ./start.sh
    ```
6. In the browser, open up `http://localhost:3000/` to view the project.

### Manual Setup

#### Development Mode

1. Create a `.env.development.local` file in the root directory.
2. Copy the contents from the `.env.example` file into `.env.development.local`.
3. Replace the API keys in `.env.development.local` with the appropriate values (provided privately).
4. Install the necessary dependencies:
    ```bash
    npm install
    ```
5. To run the project in development mode, execute the following command:
    ```bash
    npm run dev
    ```
6. In the browser, open up `http://localhost:5173/` to view the project.

#### Production Mode

1. Create a `.env.production.local` file in the root directory.
2. Copy the contents from the `.env.example` file into `.env.production.local`.
3. Replace the API keys in `.env.production.local` with the appropriate values (provided privately).
4. Install the necessary dependencies:
    ```bash
    npm install
    ```
5. Build the project:
    ```bash
    npm run build
    ```
6. To run the project in production mode, execute the following command:
    ```bash
    npm run preview
    ```
7. In the browser, open up `http://localhost:4173/` to view the project.

## Additional Notes

- **For Docker setup**, make sure Docker is running before executing the `start.sh` script. This setup runs the application in **production mode**.
- **For the manual setup**, ensure that Node.js 20.x is installed and running.
