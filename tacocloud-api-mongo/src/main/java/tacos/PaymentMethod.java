package tacos;

import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "paymentMethods")
public class PaymentMethod {

  @Id
  private String id;
  private User user;
  private String ccNumber;
  private String ccCVV;
  private String ccExpiration;

  public PaymentMethod() {
  }

  public PaymentMethod(User user, String ccNumber, String ccCVV, String ccExpiration) {
    this.user = user;
    this.ccNumber = ccNumber;
    this.ccCVV = ccCVV;
    this.ccExpiration = ccExpiration;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getCcNumber() {
    return ccNumber;
  }

  public void setCcNumber(String ccNumber) {
    this.ccNumber = ccNumber;
  }

  public String getCcCVV() {
    return ccCVV;
  }

  public void setCcCVV(String ccCVV) {
    this.ccCVV = ccCVV;
  }

  public String getCcExpiration() {
    return ccExpiration;
  }

  public void setCcExpiration(String ccExpiration) {
    this.ccExpiration = ccExpiration;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof PaymentMethod)) {
      return false;
    }
    PaymentMethod that = (PaymentMethod) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
