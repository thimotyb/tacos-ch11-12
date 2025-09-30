package tacos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tacos")
public class Taco {

  @Id
  private String id;

  @NotNull
  @Size(min = 5, message = "Name must be at least 5 characters long")
  private String name;

  private Date createdAt = new Date();

  @Size(min = 1, message = "You must choose at least 1 ingredient")
  private List<Ingredient> ingredients = new ArrayList<>();

  public Taco() {
  }

  public Taco(String id, String name, Date createdAt, List<Ingredient> ingredients) {
    this.id = id;
    this.name = name;
    if (createdAt != null) {
      this.createdAt = createdAt;
    }
    if (ingredients != null) {
      this.ingredients = new ArrayList<>(ingredients);
    }
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

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public List<Ingredient> getIngredients() {
    return ingredients;
  }

  public void setIngredients(List<Ingredient> ingredients) {
    this.ingredients = ingredients != null ? new ArrayList<>(ingredients) : new ArrayList<>();
  }

  public void addIngredient(Ingredient ingredient) {
    if (ingredient != null) {
      ingredients.add(ingredient);
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Taco)) {
      return false;
    }
    Taco taco = (Taco) o;
    return Objects.equals(id, taco.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "Taco{" +
        "id='" + id + '\'' +
        ", name='" + name + '\'' +
        ", createdAt=" + createdAt +
        ", ingredients=" + ingredients +
        '}';
  }
}
