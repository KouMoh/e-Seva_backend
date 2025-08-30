# Backend (E-Suvidha)

This is the Express + Mongoose backend. For Vercel production, you can deploy this as an external server (e.g., on Render, Heroku, or a VM) or convert it to serverless API routes.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `ALLOWED_ORIGINS`.
2. Install dependencies: `npm install`.
3. Run locally: `npm run dev`.

Notes for Vercel

- If deploying the backend separately, set `ALLOWED_ORIGINS` to your frontend's URL(s).
- If deploying frontend + backend together on Vercel, prefer using Next.js API routes in the frontend project and removing the Express backend.
