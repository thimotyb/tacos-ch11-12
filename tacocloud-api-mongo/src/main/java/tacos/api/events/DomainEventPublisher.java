package tacos.api.events;

import org.springframework.stereotype.Component;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import tacos.Ingredient;
import tacos.Order;
import tacos.Taco;

@Component
public class DomainEventPublisher {

  private final Sinks.Many<Ingredient> ingredientSink = Sinks.many().multicast().onBackpressureBuffer();
  private final Sinks.Many<Taco> tacoSink = Sinks.many().multicast().onBackpressureBuffer();
  private final Sinks.Many<Order> orderSink = Sinks.many().multicast().onBackpressureBuffer();

  public void publishIngredient(Ingredient ingredient) {
    ingredientSink.tryEmitNext(ingredient);
  }

  public void publishTaco(Taco taco) {
    tacoSink.tryEmitNext(taco);
  }

  public void publishOrder(Order order) {
    orderSink.tryEmitNext(order);
  }

  public Flux<Ingredient> ingredientStream() {
    return ingredientSink.asFlux();
  }

  public Flux<Taco> tacoStream() {
    return tacoSink.asFlux();
  }

  public Flux<Order> orderStream() {
    return orderSink.asFlux();
  }
}
