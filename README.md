# Taco Cloud Mongo API Feature Branch

This branch extracts the Taco Cloud REST API into a standalone Spring Boot 3
service and complements it with a lightweight reactive web console.

## What Changed

- **tacocloud-api-mongo/** – Spring Boot 3 project that serves the Taco Cloud
  REST endpoints backed by reactive MongoDB repositories. Includes a Docker
  Compose setup with MongoDB and Mongo Express plus documentation describing how
  to run the service.
- **tacocloud-api-mongo-ui/** – Vite + React + RxJS console that interacts with
  the API. It exposes ingredient management, taco design, and order creation via
  reactive streams.
- **Legacy modules removed** – Original multi-module Maven projects, messaging,
  UI, and other components were deleted so this branch focuses solely on the
  Mongo-backed API and its new front-end.

## How to Run

1. Start everything with Docker (MongoDB, API, UI):
   ```bash
   docker compose -f docker-compose-total.yml up -d --build
   ```

   Access points:
   - API: `http://localhost:8080`
   - Mongo Express: `http://localhost:8081`
   - React UI: `http://localhost:5173`

   For iterative development you can run services separately:
   ```bash
   cd tacocloud-api-mongo
   docker compose up -d
   mvn spring-boot:run
   ```

2. Launch the reactive UI manually (only needed when the UI is not started via
   Docker):
   ```bash
   cd tacocloud-api-mongo-ui
   npm install
   npm run dev
   ```

3. Interact with the app at `http://localhost:5173` or use Mongo Express at
   `http://localhost:8081` to explore database changes.

This README serves as a quick tour of the branch for reviewers and teammates.
