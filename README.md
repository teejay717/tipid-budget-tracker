# Tipid - Budget Tracker

Tipid is a full-stack personal budget tracker for logging income/expenses, organizing categories, and viewing spending trends.

## Tech Stack

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

## Features

- User authentication (register/login) with JWT
- Protected transaction and category routes
- Add, edit, delete, and clear transactions
- Add, edit, and delete custom categories
- Auto-created default categories on account registration
- Dashboard charts for monthly overview and expense distribution
- Time-based filtering (week, month, last30days, year, all)

## Project Structure

```text
budget-tracker/
  server.js
  package.json
  config/
  controllers/
  middleware/
  models/
  routes/
  client/
    src/
    package.json
```

## Environment Variables

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

## Installation

From the root folder:

```bash
npm install
cd client
npm install
```

## Running the App (Development)

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

## Available Scripts

### Root (`package.json`)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend with node

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

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

## Auth Header

Protected routes require a bearer token:

```http
Authorization: Bearer <token>
```

## Notes

- CORS allows `CLIENT_URL` from `.env` and `http://localhost:5173`.
- Registration creates default categories (`Food`, `Transportation`, `Miscellaneous`).
- Client falls back to `http://localhost:5000` if `VITE_API_URL` is not set.

## Future Improvements

- Add automated tests (backend + frontend)
- Add refresh-token/session strategy
- Add CI lint/build checks
- Add Docker setup
