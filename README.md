# BrewHaus

An online shop for specialty coffee and brewing gear. Browse beans and equipment, open a product page with an image gallery, and create an account to sign in.

**Live:** https://brew-haus-c.vercel.app

## Stack

| Part | Tech | Hosted on |
| --- | --- | --- |
| Frontend (`client/`) | React 19, Vite, React Router, Tailwind CSS 4 | Vercel |
| API (`server/`) | Node.js, Express 5 | Railway |
| Database | PostgreSQL (Neon) with Drizzle ORM | Neon |
| Auth | better-auth (email + password) | runs inside the API |

The browser only ever talks to the Vercel domain. Vercel forwards every `/api/*` request to the Railway API ([client/vercel.json](client/vercel.json)), so auth cookies belong to the frontend's domain and no CORS setup is needed in the browser. In development, the Vite dev server does the same forwarding to `localhost:3000`.

## Project layout

```
client/
  src/
    components/     page sections, product card/detail, login form
    lib/            auth client, price formatting
  public/images/    product photos
  vercel.json       /api proxy to Railway + SPA fallback
server/
  src/
    index.js        Express app and routes
    auth.js         better-auth config
    routes/         /api/products
    db/             Drizzle schema, connection, seed data
  railway.json      Railway deploy config
```

## Running locally

You need Node.js 20+ and a PostgreSQL database (a free [Neon](https://neon.tech) project works).

**1. API**

```bash
cd server
npm install
cp .env.example .env      # then fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run db:push           # create the tables
npm run db:seed           # add the products
npm run dev               # http://localhost:3000
```

**2. Frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev               # http://localhost:5173
```

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/products` | All products |
| GET | `/api/products/:slug` | One product with its images |
| GET | `/api/health` | Health check |
| * | `/api/auth/*` | better-auth endpoints (sign up, sign in, session, sign out) |

## Environment variables (server)

| Name | Local | Production (Railway) |
| --- | --- | --- |
| `DATABASE_URL` | your Postgres URL | your Postgres URL |
| `BETTER_AUTH_SECRET` | any long random string | a long random string |
| `BETTER_AUTH_URL` | `http://localhost:3000` | `https://brew-haus-c.vercel.app` |
| `CLIENT_URL` | `http://localhost:5173` | `https://brew-haus-c.vercel.app` |
| `PORT` | `3000` | set by Railway |
| `NODE_ENV` | — | `production` |

`BETTER_AUTH_URL` and `CLIENT_URL` must be full URLs including `https://`, with no trailing slash. Without the scheme, better-auth fails at startup with `Invalid base URL`.

## Deploying

- **Frontend:** Vercel project with root directory `client`. Pushing to `main` redeploys it.
- **API:** Railway service with root directory `server`. It runs `npm start` and redeploys on push to `main`.
- After changing the database schema, run `npm run db:push` against the production `DATABASE_URL`.

## Scripts

| Where | Command | What it does |
| --- | --- | --- |
| client | `npm run dev` | Dev server with hot reload |
| client | `npm run build` | Production build into `dist/` |
| client | `npm run lint` | ESLint |
| server | `npm run dev` | API with auto-restart |
| server | `npm run db:push` | Sync the schema to the database |
| server | `npm run db:seed` | Insert products (skips ones that exist) |
| server | `npm run db:studio` | Browse the database in Drizzle Studio |
