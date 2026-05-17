# Leave Management System

A practical, robust, and modern Leave Management System (HRMS) built using the MERN stack (MongoDB, Express, React, Node.js). 

This project aims to simplify human resources workflows by providing a consumer-grade experience for employees to apply for and track leave requests, and an enterprise-ready dashboard for admins/managers to approve, reject, and monitor team availability.

## Architecture & Project Structure

The project is structured into three main directories:

- **`frontend/`**: The employee-facing React application. Built with React (Vite), Tailwind CSS, and React Hook Form for an optimized and responsive user interface.
- **`admin-panel/`**: The admin/manager-facing React application. Designed for HR to approve/reject leaves, view organization-wide trends, and manage employees.
- **`backend/`**: The Node.js/Express REST API serving both frontend applications. It connects to a MongoDB database to persist users, leaves, and analytics.

## Key Features

### For Employees (Frontend)
- **Dashboard**: Quick view of leave balances, upcoming holidays, and recent requests.
- **Apply for Leave**: Simple form with date validation, auto-calculated duration, and dynamic balance warnings.
- **Leave History**: Filterable table to track past requests, view statuses, and copy request IDs.

### For Admins (Admin Panel)
- **Analytics Dashboard**: Organization-wide leave trends, pending request counts, and department distributions.
- **Leave Management**: Quickly approve or reject leave requests with optional admin comments.
- **Employee Directory**: Manage employee accounts, roles, and leave balances.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Hook Form
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Authentication**: JWT (JSON Web Tokens)

---

## Setup & Run Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Local instance or MongoDB Atlas cluster)

### 2. Environment Variables

**Backend (`backend/.env`)**
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Frontend & Admin Panel (`frontend/.env` & `admin-panel/.env`)**
If using custom API URLs, configure Vite env variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Installation

Run the following command in all three directories (`backend`, `frontend`, `admin-panel`) to install dependencies:
```bash
npm install
```

### 4. Running the Application locally

You will need three terminal windows:

**Terminal 1: Backend**
```bash
cd backend
npm run dev
```

**Terminal 2: Frontend (Employee App)**
```bash
cd frontend
npm run dev
```

**Terminal 3: Admin Panel**
```bash
cd admin-panel
npm run dev
```

### 5. Seeding the Database (Optional)
To populate the database with initial dummy data (admin accounts, dummy employees, and mock leave requests), run the seed script:
```bash
cd backend
npm run seed
```

---

## API Overview

The backend exposes several RESTful endpoints organized by routes:

- **Auth Routes (`/api/auth`)**
  - `POST /register`: Register a new employee.
  - `POST /login`: Authenticate and receive a JWT.
  - `GET /me`: Get the current authenticated user's profile.

- **Leave Routes (`/api/leaves`)**
  - `POST /`: Submit a new leave request (Employee).
  - `GET /my-leaves`: Retrieve all leaves for the logged-in user (Employee).
  - `GET /`: Retrieve all company leave requests (Admin).
  - `GET /:id`: Retrieve a specific leave request by ID.
  - `PUT /:id/status`: Approve or reject a leave request (Admin).
  - `GET /analytics/dashboard`: Retrieve company-wide leave analytics (Admin).

- **User Routes (`/api/users`)**
  - `GET /`: Get a list of all employees (Admin).
  - `GET /:id`: Get specific employee details (Admin).

## Maintenance & Code Quality
This project follows strict separation of concerns:
- **Controllers** remain concise, focusing only on HTTP request/response parsing.
- **Services** encapsulate core business logic, including complex validations (e.g., overlapping dates, negative balances).
- **React Components** follow PascalCase, with custom hooks to manage state seamlessly across views.
