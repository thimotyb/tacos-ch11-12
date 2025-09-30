# Taco Cloud Reactive Console

A small Vite + React application that uses RxJS to interact with the Taco Cloud
API exposed by the Spring Boot 3 project.

## Prerequisites

- Node.js 18+
- The backend (`tacocloud-api-mongo`) running locally on port 8080

## Run Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with a proxy that forwards `/api`
requests to the backend.

For production builds, set `VITE_API_BASE_URL` to the backend endpoint (defaults
to `/api`). The root `docker-compose-total.yml` handles this automatically when
building the container image.

## Features

- Live ingredient list with the ability to add new ingredients
- Taco designer that groups ingredients by type and streams recent taco designs
- Order board that builds orders from the latest tacos
- RxJS-powered data store (`src/store.ts`) keeping the UI reactive end-to-end

## Build for Production

```bash
npm run build
```

The optimized static assets will live in `dist/`.
