package tacos.api.controller;

import java.net.URI;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tacos.Order;
import tacos.data.OrderRepository;

@RestController
@RequestMapping(path = "/api/orders")
@CrossOrigin(origins = "*")
public class OrderApiController {

  private final OrderRepository orderRepository;

  public OrderApiController(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @GetMapping
  public Flux<Order> allOrders() {
    return orderRepository.findAll();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Mono<ResponseEntity<Order>> createOrder(@RequestBody Mono<Order> orderMono) {
    return orderMono
        .map(order -> {
          order.setPlacedAt(new Date());
          return order;
        })
        .flatMap(orderRepository::save)
        .map(saved -> ResponseEntity
            .created(URI.create("/api/orders/" + saved.getId()))
            .body(saved));
  }

  @GetMapping("/{orderId}")
  public Mono<ResponseEntity<Order>> orderById(@PathVariable String orderId) {
    return orderRepository.findById(orderId)
        .map(ResponseEntity::ok)
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PutMapping("/{orderId}")
  public Mono<ResponseEntity<Order>> putOrder(@PathVariable String orderId,
      @RequestBody Mono<Order> orderMono) {
    return ensureOrderExists(orderId)
        .then(orderMono)
        .map(order -> {
          order.setId(orderId);
          if (order.getPlacedAt() == null) {
            order.setPlacedAt(new Date());
          }
          return order;
        })
        .flatMap(orderRepository::save)
        .map(ResponseEntity::ok);
  }

  @PatchMapping("/{orderId}")
  public Mono<ResponseEntity<Order>> patchOrder(@PathVariable String orderId,
      @RequestBody Mono<Order> patchMono) {
    return orderRepository.findById(orderId)
        .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
        .flatMap(existing -> patchMono.map(patch -> applyPatch(existing, patch)))
        .flatMap(orderRepository::save)
        .map(ResponseEntity::ok);
  }

  @DeleteMapping("/{orderId}")
  public Mono<ResponseEntity<Void>> deleteOrder(@PathVariable String orderId) {
    return orderRepository.existsById(orderId)
        .flatMap(exists -> exists
            ? orderRepository.deleteById(orderId).thenReturn(ResponseEntity.noContent().<Void>build())
            : Mono.just(ResponseEntity.notFound().build()));
  }

  private Mono<Order> ensureOrderExists(String orderId) {
    return orderRepository.findById(orderId)
        .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
  }

  private Order applyPatch(Order existing, Order patch) {
    if (patch.getDeliveryName() != null) {
      existing.setDeliveryName(patch.getDeliveryName());
    }
    if (patch.getDeliveryStreet() != null) {
      existing.setDeliveryStreet(patch.getDeliveryStreet());
    }
    if (patch.getDeliveryCity() != null) {
      existing.setDeliveryCity(patch.getDeliveryCity());
    }
    if (patch.getDeliveryState() != null) {
      existing.setDeliveryState(patch.getDeliveryState());
    }
    if (patch.getDeliveryZip() != null) {
      existing.setDeliveryZip(patch.getDeliveryZip());
    }
    if (patch.getCcNumber() != null) {
      existing.setCcNumber(patch.getCcNumber());
    }
    if (patch.getCcExpiration() != null) {
      existing.setCcExpiration(patch.getCcExpiration());
    }
    if (patch.getCcCVV() != null) {
      existing.setCcCVV(patch.getCcCVV());
    }
    if (patch.getTacos() != null && !patch.getTacos().isEmpty()) {
      existing.setTacos(patch.getTacos());
    }
    return existing;
  }
}
