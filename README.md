# Tipid - Budget Tracker

A clean, modern full-stack budget tracker built with React, Express, and MongoDB.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)

## Features

-  **User Authentication** - Register and login with JWT-based authentication
-  **Protected API Routes** - Transactions and categories require valid auth tokens
-  **Transaction Management** - Add, edit, delete, and clear transactions
-  **Category Management** - Add, edit, and delete custom categories
-  **Smart Defaults** - New users get default categories automatically
-  **Visual Insights** - Monthly overview and expense category charts
-  **Time Filtering** - Filter by week, month, last30days, year, or all

##  Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Recharts
- Axios
- Radix UI primitives

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs

##  Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- MongoDB (local or Atlas)

### Installation

From the root folder:

```bash
npm install
cd client
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000
```

##  Run the App (Development)

Run backend (from root):

```bash
npm run dev
```

Run frontend (from `client/`):

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

##  Available Scripts

### Root (`package.json`)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend with node

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  API Endpoints

Base URL: `/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Transactions (protected)

- `GET /transactions?period=week|month|last30days|year|all`
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`
- `DELETE /transactions`

### Categories (protected)

- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

##  Auth Header

Protected routes require a bearer token:

```http
Authorization: Bearer <token>
```

##  Notes

- CORS allows `CLIENT_URL` from `.env` and `http://localhost:5173`
- Registration creates default categories (`Food`, `Transportation`, `Miscellaneous`)
- Client falls back to `http://localhost:5000` if `VITE_API_URL` is not set

##  Future Improvements

-  Add automated tests (backend + frontend)
-  Add refresh-token/session strategy
-  Add CI lint/build checks
-  Add Docker setup
