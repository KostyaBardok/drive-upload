# Google Drive Upload

This is the backend API for the Google Drive Upload application, built with Node.js and NestJS.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

-   [Docker](https://www.docker.com/get-started/)
-   [Git](https://git-scm.com/)
-   A terminal or command prompt

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/KostyaBardok/drive-upload.git
    ```

2. Navigate to the project directory:

    ```bash
    cd drive-upload
    ```

3. Create a `.env` file in the root directory and configure the required environment variables (see `.env.sample`).

4. Put a `credentials.json` file into the root directory for auth with Google Drive API.

5. Run the application:

    ```bash
    docker-compose up -d
    ```

6. Access the application at `http://localhost`.

## API Documentation

There are only 2 routes (see here): `src/upload/upload.controller.ts`

## PS

To save time, since the project is a test one and also quite small, the following wasn't used: `Swagger, Prettier, ESlint, Docker Swarm, DB Migrations, Tests`

**_I'll be glad to discuss successful and not so successful solutions at the meeting :)_**
