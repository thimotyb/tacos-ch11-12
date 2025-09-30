# Taco Cloud API (Mongo + Spring Boot 3)

This module exposes the Taco Cloud REST API using Spring Boot 3 / Spring Framework 6
and reactive MongoDB repositories.

## Prerequisites

- Java 17+
- Maven 3.9+
- Docker (for the bundled MongoDB and Mongo Express services)

## Getting Started

1. **Start everything via the root docker compose (MongoDB, API, UI)**

   ```bash
   cd ..
   docker compose -f docker-compose-total.yml up -d --build
   ```

   This launches the database, the API, Mongo Express at `http://localhost:8081`,
   and the React UI at `http://localhost:5173`.

2. **Start MongoDB and Mongo Express only (module scope)**

   ```bash
   cd tacocloud-api-mongo
   docker compose up -d
   ```

   This launches:
   - MongoDB at `mongodb://localhost:27017/tacocloud`
   - Mongo Express (web UI) at `http://localhost:8081`

   Authenticate to Mongo Express with `admin / admin`, then browse collections,
   create documents, or run ad-hoc queries visually.

3. **Run the API**

   ```bash
   mvn spring-boot:run
   ```

   The application listens on `http://localhost:8080`.

4. **Optional: Run the Reactive React UI**

   A lightweight Vite + React console lives in `../tacocloud-api-mongo-ui` and
   consumes the same APIs through RxJS observables.

   ```bash
   cd ../tacocloud-api-mongo-ui
   npm install
   npm run dev
   ```

   The development server starts on `http://localhost:5173` and proxies `/api`
   calls to the Spring Boot backend. The UI lets you:

   - Create and list ingredients
   - Design tacos from existing ingredients
   - Compose orders from recent taco designs

5. **Test Endpoints Directly**

   - List ingredients: `GET http://localhost:8080/api/ingredients`
   - Create a taco design: `POST http://localhost:8080/api/design`
   - Manage orders: `GET/POST http://localhost:8080/api/orders`

## Project Layout

- `pom.xml`: standalone Spring Boot 3 build.
- `src/main/java/tacos`: Mongo domain model without Lombok.
- `src/main/java/tacos/data`: Reactive repositories.
- `src/main/java/tacos/api/controller`: WebFlux REST controllers.
- `docker-compose.yml`: Local MongoDB + Mongo Express services.
- `REFACTOR.md`: Notes about the extraction from the legacy codebase.

## Stopping Services

```bash
docker compose down
```

Add tests or additional endpoints as needed once the core upgrade is verified.
