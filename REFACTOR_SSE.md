# SSE Refactor Notes

This document summarizes the changes introduced on the `feature/sse-updates`
branch to support real-time updates via Server-Sent Events (SSE).

## Backend (Spring Boot)

- Introduced `tacos.api.events.DomainEventPublisher`, a singleton component that
  holds Reactor `Sinks.Many<T>` for ingredients, tacos, and orders.
- `IngredientController`, `DesignTacoController`, and `OrderApiController` now:
  - Inject the `DomainEventPublisher`.
  - Call `publish*` helpers after every successful save/update to push new
    domain objects into the corresponding sink.
  - Expose `GET /stream` endpoints with `TEXT_EVENT_STREAM` content type, each
    returning `Flux.concat(initialData, sinkFlux)` so subscribers receive the
    current snapshot followed by live updates.

## Frontend (Vite + React + RxJS)

- Added an `EventSource` helper in `src/apiClient.ts` and exposed
  `streamIngredients`, `streamTacos`, and `streamOrders` observables. The helper
  respects `VITE_API_BASE_URL` and shares the connection among subscribers.
- `src/store.ts` now subscribes to all three streams on load, upserting incoming
  entities into the existing `BehaviorSubject` lists using an `upsertById`
  utility. On stream errors, it sets an error message and automatically retries
  after 5 seconds.
- Removed manual list refresh triggers after create operations—the SSE streams
  keep lists synchronized even when data is added outside the UI.

With these changes, the UI updates instantly whenever new ingredients, tacos, or
orders are created through any API client.
