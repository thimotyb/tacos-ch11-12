# Taco Cloud API Mongo Refactor

This module was extracted to provide a clean Spring Boot 3 / Spring Framework 6
runtime for the Taco Cloud REST APIs that target MongoDB.

## Summary of Changes

- Created a standalone Maven project (`tacocloud-api-mongo/pom.xml`) that inherits
  from `spring-boot-starter-parent` 3.2.4 and targets Java 17. Only the reactive
  WebFlux and MongoDB starters plus validation and testing dependencies are
  included.
- Re-implemented the Mongo domain model (`tacos` package) without Lombok,
  providing explicit constructors, accessors, and equality overrides required by
  Spring Data.
- Ported the reactive repository interfaces into this module (`tacos.data`
  package) so the REST layer is self-contained.
- Recreated the REST controllers (`tacos.api.controller` package) with updated
  WebFlux idioms, removing dependencies on messaging, email ingestion, or other
  modules that are not part of the new project.
- Added a minimal `application.yml` stub to configure the Mongo database name and
  server port, and a `.gitignore` to exclude Maven build artifacts.

## Follow-Up

- Point `spring.data.mongodb` properties at the desired MongoDB instance and add
  any environment-specific configuration.
- Introduce security, validation, or additional endpoints once the core upgrade
  is verified.
- Add automated tests (WebTestClient, repository tests) tailored to the new
  module.
