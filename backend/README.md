# Leave Management System - Backend

A professional, service-oriented backend for the Leave Management System built with the MERN stack (Node.js, Express, MongoDB).

## Architecture

This backend follows a clean, modular structure:
- **Controllers**: Handle HTTP requests, responses, and invoke services.
- **Services**: Contain all core business logic (leave calculations, balance validation).
- **Middleware**: Authentication, Admin authorization, and centralized error handling.
- **Validators**: `express-validator` chains for request payload validation.
- **Models**: Mongoose schemas with password hashing hooks and virtual fields.

## Tech Stack
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Tokens)** via HTTP-Only Cookies
- **bcryptjs** for password hashing
- **express-validator**

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and configure your MongoDB URI and JWT Secret:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/leave-management-system
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database
To populate the database with an Admin, 4 Employees, and sample leave requests:
```bash
npm run seed
```

*Admin Login*: `admin@company.com` / `admin@123`
*Employee Login*: `john@company.com` / `password123`

### 4. Run Development Server
```bash
npm run dev
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new employee
- `POST /login` - Authenticate user and get cookie/token
- `GET /me` - Get current user profile (Protected)

### Leaves (`/api/leaves`)
- `POST /` - Apply for leave (Protected)
- `GET /` - Get all leaves (Protected, Admin only)
- `GET /my` - Get logged-in user's leaves (Protected)
- `GET /:id` - Get specific leave (Protected, Owner or Admin)
- `PATCH /:id/status` - Approve or reject leave (Protected, Admin only)
