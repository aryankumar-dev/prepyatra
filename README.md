# PrepYatra

PrepYatra is a full-stack platform for exam/placement preparation — course resources, prep logs, a recruiter network, tuition requests, and an AI chatbot assistant. It's built as a Next.js (App Router) client backed by an Express + MongoDB API.

## Tech Stack

**Client** — Next.js 16 (App Router), React 19, Tailwind CSS 4, Radix UI / shadcn, Axios

**Server** — Node.js, Express 5, MongoDB (Mongoose), JWT auth (access + refresh tokens), Nodemailer, Google Gemini (`@google/genai`) for the chatbot

## Project Structure

```
prepyatra-main/
├── client/          # Next.js frontend (App Router)
│   └── src/
│       ├── app/           # Route segments (page.js per route) + root layout/providers
│       ├── components/   # Auth, Navbar, Footer, Pages, Sections, ui
│       ├── context/       # AuthContext
│       ├── services/      # API client (Axios)
│       └── lib/            # utils, form-errors, events
└── server/          # Express backend
    ├── config/         # DB connection
    ├── controllers/    # Route handlers
    ├── middlewares/     # Auth/admin checks, validation
    ├── models/          # Mongoose schemas
    ├── routes/          # API routes
    ├── services/         # Gemini chatbot service
    ├── utils/            # Error/response helpers, mailer, constants
    └── validators/       # Request validation
```

### Routes

| Path            | Renders                       | Access    |
| ---------------- | ------------------------------ | --------- |
| `/`               | Home / landing page             | public    |
| `/registration`   | Sign up                         | public    |
| `/login`          | Log in                          | public    |
| `/chat`           | AI interview chatbot            | public    |
| `/dashboard`      | User dashboard                  | logged in |
| `/admin`          | Admin dashboard                 | admin     |

Protected routes (`/dashboard`, `/admin`) are gated client-side by `PrivateRoute` (`client/src/components/Auth/PrivateRoute.jsx`), which redirects to `/login` if there's no authenticated user.

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd prepyatra-main

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Create a `.env` file in `server/`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
API_KEY=your_gemini_api_key

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

NODE_ENV=development
CLIENT_URL=http://localhost:3001

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM_NAME=PrepYatra
EMAIL_FROM_ADDRESS=no-reply@example.com
ADMIN_EMAIL=admin@example.com
```

Create a `.env.local` file in `client/`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run the app

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

The client runs on `http://localhost:3001` and the server on `http://localhost:3000` by default (the client's dev/start scripts pin port 3001 so they don't collide with the backend's default port 3000).

## API Overview

All backend routes are mounted under `/api/v1`:

| Route                       | Purpose                          |
| ---------------------------- | --------------------------------- |
| `/auth`                      | Registration, login, tokens       |
| `/courses`                   | Course listing/management         |
| `/preplogs`                  | Prep log tracking                 |
| `/recruiternetwork`          | Recruiter network features        |
| `/resources`                 | Study resources                   |
| `/tuition-requests`          | Tuition request workflow          |
| `/admin`                     | Admin dashboard operations        |
| `/unblock-requests`          | Unblock request workflow          |
| `/api` (chat)                | AI chatbot (Gemini)               |

## Scripts

**Server** (`server/`)
- `npm run dev` — start with nodemon
- `npm start` — start in production mode

**Client** (`client/`)
- `npm run dev` — start Next.js dev server (port 3001)
- `npm run build` — production build
- `npm start` — start production server (port 3001)
- `npm run lint` — run ESLint

## License

ISC
