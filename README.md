# Blog Application Backend

## Project Overview

**Project Name:** Blog Application Backend

**Description:**  
This repository contains the backend code for a full-stack blog posting and subscription platform. The backend is built using Node.js, Express, and TypeScript, with Prisma for database interactions and Supabase for authentication and real-time features.

## Technologies

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma**
- **Supabase**
- **dotenv**

## Features

- **Blog Management:**
  - Add, update, view, and delete blog posts.
  - Search for blogs.
  
- **User Management:**
  - Add new admins and manage user roles.
  
- **Subscription Management:**
  - View and manage subscribers.
  
- **Email Notifications:**
  - Send email notifications for subscriptions and new blog posts.

## Folder Structure

- `src/`: Source files
  - `controllers/`: Handles incoming requests and responses
  - `models/`: Defines Prisma models for database interactions
  - `api/`: Defines Express routes for handling different endpoints
  - `services/`: Contains business logic and service functions
  - `config/`: Configuration files for Prisma and Supabase
  - `utils/`: Utility functions for various tasks
  - `types/`: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-application-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- To build the project:
  ```bash
  npm run build
  ```

- To start the application:
  ```bash
  npm start
  ```

- To run the application in development mode:
  ```bash
  npm run dev
  ```

### Scripts

- `build`: Compile the TypeScript code.
- `start`: Run the application from the compiled JavaScript code.
- `dev`: Run the application in development mode using Nodemon.

### License

This project is licensed under the ISC License.
