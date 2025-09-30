# Taco Cloud API (Mongo + Spring Boot 3)

This module exposes the Taco Cloud REST API using Spring Boot 3 / Spring Framework 6
and reactive MongoDB repositories.

## Prerequisites

- Java 17+
- Maven 3.9+
- Docker (for the bundled MongoDB compose setup)

## Getting Started

1. **Start MongoDB**

   ```bash
   cd tacocloud-api-mongo
   docker compose up -d
   ```

   The container exposes MongoDB on `localhost:27017` and creates the
   `tacocloud` database with a persistent volume.

2. **Run the API**

   ```bash
   mvn spring-boot:run
   ```

   The application listens on `http://localhost:8080`.

3. **Test Endpoints**

   - List ingredients: `GET http://localhost:8080/api/ingredients`
   - Create a taco design: `POST http://localhost:8080/api/design`
   - Manage orders: `GET/POST http://localhost:8080/api/orders`

## Project Layout

- `pom.xml`: standalone Spring Boot 3 build.
- `src/main/java/tacos`: Mongo domain model without Lombok.
- `src/main/java/tacos/data`: Reactive repositories.
- `src/main/java/tacos/api/controller`: WebFlux REST controllers.
- `docker-compose.yml`: Local MongoDB runtime.
- `REFACTOR.md`: Notes about the extraction from the legacy codebase.

## Stopping Services

```bash
docker compose down
```

Add tests or additional endpoints as needed once the core upgrade is verified.
