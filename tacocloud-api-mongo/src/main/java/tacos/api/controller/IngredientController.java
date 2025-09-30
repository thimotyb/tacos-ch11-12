package tacos.api.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tacos.Ingredient;
import tacos.data.IngredientRepository;

@RestController
@RequestMapping(path = "/api/ingredients")
@CrossOrigin(origins = "*")
public class IngredientController {

  private final IngredientRepository ingredientRepository;

  public IngredientController(IngredientRepository ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  @GetMapping
  public Flux<Ingredient> allIngredients() {
    return ingredientRepository.findAll();
  }

  @GetMapping("/{id}")
  public Mono<ResponseEntity<Ingredient>> ingredientById(@PathVariable String id) {
    return ingredientRepository.findById(id)
        .map(ResponseEntity::ok)
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Mono<ResponseEntity<Ingredient>> createIngredient(@RequestBody Mono<Ingredient> ingredientMono) {
    return ingredientMono
        .flatMap(ingredientRepository::save)
        .map(saved -> ResponseEntity
            .created(URI.create("/api/ingredients/" + saved.getId()))
            .body(saved));
  }

  @PutMapping("/{id}")
  public Mono<ResponseEntity<Ingredient>> updateIngredient(@PathVariable String id,
      @RequestBody Mono<Ingredient> ingredientMono) {
    return ingredientRepository.findById(id)
        .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
        .flatMap(existing -> ingredientMono)
        .map(incoming -> {
          incoming.setId(id);
          return incoming;
        })
        .flatMap(ingredientRepository::save)
        .map(ResponseEntity::ok);
  }

  @DeleteMapping("/{id}")
  public Mono<ResponseEntity<Void>> deleteIngredient(@PathVariable String id) {
    return ingredientRepository.existsById(id)
        .flatMap(exists -> exists
            ? ingredientRepository.deleteById(id).thenReturn(ResponseEntity.noContent().<Void>build())
            : Mono.just(ResponseEntity.notFound().build()));
  }
}
