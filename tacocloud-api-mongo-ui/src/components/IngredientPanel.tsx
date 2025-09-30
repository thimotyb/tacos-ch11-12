import { FormEvent, useEffect, useState } from 'react';
import { Ingredient } from '../apiClient';
import { addIngredient, ingredients$, refreshIngredients } from '../store';
import { useObservable } from '../hooks';

const ingredientTypes: Ingredient['type'][] = ['WRAP', 'PROTEIN', 'VEGGIES', 'CHEESE', 'SAUCE'];

export const IngredientPanel = () => {
  const ingredients = useObservable(ingredients$, []);
  const [name, setName] = useState('');
  const [type, setType] = useState<Ingredient['type']>('WRAP');

  useEffect(() => {
    refreshIngredients();
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }
    addIngredient({ name: name.trim(), type });
    setName('');
  };

  return (
    <section>
      <h2>Ingredients</h2>
      <form onSubmit={onSubmit} className="panel">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Flour Tortilla" />
        </label>
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value as Ingredient['type'])}>
            {ingredientTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Ingredient</button>
      </form>
      <ul className="list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id ?? `${ingredient.name}-${ingredient.type}`}>
            <span>{ingredient.name}</span>
            <small>{ingredient.type}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};
