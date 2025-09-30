package tacos;

import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ingredients")
public class Ingredient {

  public enum Type {
    WRAP, PROTEIN, VEGGIES, CHEESE, SAUCE
  }

  @Id
  private String id;
  private String name;
  private Type type;

  public Ingredient() {
  }

  public Ingredient(String id, String name, Type type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Ingredient)) {
      return false;
    }
    Ingredient that = (Ingredient) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Ingredient{" +
        "id='" + id + '\'' +
        ", name='" + name + '\'' +
        ", type=" + type +
        '}';
  }
}
