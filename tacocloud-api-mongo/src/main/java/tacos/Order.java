package tacos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  private String id;
  private Date placedAt = new Date();
  private User user;

  private String deliveryName;
  private String deliveryStreet;
  private String deliveryCity;
  private String deliveryState;
  private String deliveryZip;

  private String ccNumber;
  private String ccExpiration;
  private String ccCVV;

  private List<Taco> tacos = new ArrayList<>();

  public Order() {
  }

  public Order(String id) {
    this.id = id;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Date getPlacedAt() {
    return placedAt;
  }

  public void setPlacedAt(Date placedAt) {
    this.placedAt = placedAt != null ? placedAt : new Date();
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getDeliveryName() {
    return deliveryName;
  }

  public void setDeliveryName(String deliveryName) {
    this.deliveryName = deliveryName;
  }

  public String getDeliveryStreet() {
    return deliveryStreet;
  }

  public void setDeliveryStreet(String deliveryStreet) {
    this.deliveryStreet = deliveryStreet;
  }

  public String getDeliveryCity() {
    return deliveryCity;
  }

  public void setDeliveryCity(String deliveryCity) {
    this.deliveryCity = deliveryCity;
  }

  public String getDeliveryState() {
    return deliveryState;
  }

  public void setDeliveryState(String deliveryState) {
    this.deliveryState = deliveryState;
  }

  public String getDeliveryZip() {
    return deliveryZip;
  }

  public void setDeliveryZip(String deliveryZip) {
    this.deliveryZip = deliveryZip;
  }

  public String getCcNumber() {
    return ccNumber;
  }

  public void setCcNumber(String ccNumber) {
    this.ccNumber = ccNumber;
  }

  public String getCcExpiration() {
    return ccExpiration;
  }

  public void setCcExpiration(String ccExpiration) {
    this.ccExpiration = ccExpiration;
  }

  public String getCcCVV() {
    return ccCVV;
  }

  public void setCcCVV(String ccCVV) {
    this.ccCVV = ccCVV;
  }

  public List<Taco> getTacos() {
    return tacos;
  }

  public void setTacos(List<Taco> tacos) {
    this.tacos = tacos != null ? new ArrayList<>(tacos) : new ArrayList<>();
  }

  public void addDesign(Taco design) {
    if (design != null) {
      tacos.add(design);
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Order)) {
      return false;
    }
    Order order = (Order) o;
    return Objects.equals(id, order.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Order{" +
        "id='" + id + '\'' +
        ", placedAt=" + placedAt +
        ", user=" + (user != null ? user.getUsername() : "null") +
        ", tacos=" + tacos.size() +
        '}';
  }
}
