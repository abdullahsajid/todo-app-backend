# Todo App Backend

The backend service for the Todo App, built using **NestJS** and TypeScript, offering robust and scalable APIs for task management and user authentication.

## Getting Started

Follow these steps to set up and run the application locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/abdullahsajid/todo-app-backend.git
   cd todo-app-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=<Your Database URL>
   JWT_SECRET=<Your JWT Secret>
   PORT=<Server Port, e.g., 3000>
   ```

4. **Run the Application:**
   - Development mode:
     ```bash
     npm run start
     ```
   - Production mode:
     ```bash
     npm run start
     ```

5. **Access the Application:**
   The server will run on `http://localhost:<PORT>`, where `<PORT>` is defined in the `.env` file.

## Deployment on Railway

To deploy the backend on Railway, follow these steps:

1. **Create a Railway Project:**
   - Log in to your Railway account.
   - Create a new project and link it to your GitHub repository.

2. **Set Environment Variables:**
   - In the Railway dashboard, go to the "Environment" tab.
   - Add the following variables:
     ```env
     DATABASE_URL=<Your Database URL>
     JWT_SECRET=<Your JWT Secret>
     PORT=<Server Port, e.g., 3000>
     ```

3. **Deploy the Application:**
   - Railway will automatically detect the `start` script in your `package.json`.
   - Click "Deploy" to start the deployment process.

4. **Access the Application:**
   - Once deployed, Railway will provide a public URL for your backend service.

## API Documentation

The backend provides a REST API for managing tasks and user authentication. Below are the key endpoints:

### Authentication
- **Sign Up**: `POST /auth/signup`
  ```json
  {
    "name": "abdullah",
    "email": "abdullah@gmail.com",
    "password": "xyz123"
  }
  ```

- **Login**: `POST /auth/login`
  ```json
  {
    "email": "abdullah@gmail.com",
    "password": "xyz123"
  }
  ```

### Todos
- **Get All Todos**: `GET /todos`
  - Requires `Authorization: Bearer <token>` header.
- **Create Todo**: `POST /todos`
  ```json
  {
    "title": "New Task",
    "description": "new description",
    "isCompleted": false
  }
  ```
- **Update Todo**: `PUT /todos/:id`
  ```json
  {
    "title": "Updated Task",
    "isCompleted": true
  }
  ```
- **Delete Todo**: `DELETE /todos/:id`

## Features

- **Authentication**: Secure user authentication using JWT.
- **Task Management**: Add, update, and delete tasks.
- **Error Handling**: Comprehensive error responses for all endpoints.
- **Environment Configurations**: Easily configurable environment variables.
