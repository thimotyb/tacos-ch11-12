package tacos.api.controller;

import java.net.URI;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tacos.Taco;
import tacos.data.TacoRepository;

@RestController
@RequestMapping(path = "/api/design")
@CrossOrigin(origins = "*")
public class DesignTacoController {

  private final TacoRepository tacoRepository;

  public DesignTacoController(TacoRepository tacoRepository) {
    this.tacoRepository = tacoRepository;
  }

  @GetMapping("/recent")
  public Flux<Taco> recentTacos() {
    return tacoRepository.findAll().take(12);
  }

  @GetMapping("/{id}")
  public Mono<ResponseEntity<Taco>> tacoById(@PathVariable String id) {
    return tacoRepository.findById(id)
        .map(ResponseEntity::ok)
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Mono<ResponseEntity<Taco>> createTaco(@RequestBody Mono<Taco> tacoMono) {
    return tacoMono
        .map(taco -> {
          taco.setCreatedAt(new Date());
          return taco;
        })
        .flatMap(tacoRepository::save)
        .map(saved -> ResponseEntity
            .created(URI.create("/api/design/" + saved.getId()))
            .body(saved));
  }
}
