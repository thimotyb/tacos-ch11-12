import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Ingredient, Taco } from '../apiClient';
import { addTaco, ingredients$, refreshIngredients, refreshTacos, tacos$ } from '../store';
import { useObservable } from '../hooks';

interface TacoDraft {
  name: string;
  ingredientIds: string[];
}

export const TacoDesigner = () => {
  const ingredients = useObservable(ingredients$, []);
  const tacos = useObservable(tacos$, []);
  const [draft, setDraft] = useState<TacoDraft>({ name: '', ingredientIds: [] });

  useEffect(() => {
    refreshIngredients();
    refreshTacos();
  }, []);

  const ingredientsByType = useMemo(() =>
    ingredients.reduce<Record<Ingredient['type'], Ingredient[]>>(
      (grouped, ingredient) => {
        (grouped[ingredient.type] ??= []).push(ingredient);
        return grouped;
      },
      { WRAP: [], PROTEIN: [], VEGGIES: [], CHEESE: [], SAUCE: [] }
    ),
  [ingredients]);

  const toggleIngredient = (id: string) => {
    setDraft((current) => {
      const exists = current.ingredientIds.includes(id);
      return {
        ...current,
        ingredientIds: exists
          ? current.ingredientIds.filter((ing) => ing !== id)
          : [...current.ingredientIds, id]
      };
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.name || draft.ingredientIds.length === 0) {
      return;
    }
    const selectedIngredients = draft.ingredientIds
      .map((id) => ingredients.find((ingredient) => ingredient.id === id))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient));

    const taco: Taco = { name: draft.name, ingredients: selectedIngredients };
    addTaco(taco);
    setDraft({ name: '', ingredientIds: [] });
  };

  return (
    <section>
      <h2>Create Taco</h2>
      <form onSubmit={onSubmit} className="panel">
        <label>
          Name
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        </label>
        <fieldset>
          <legend>Ingredients</legend>
          {Object.entries(ingredientsByType).map(([type, group]) => (
            <div key={type} className="ingredient-group">
              <strong>{type}</strong>
              {group.length === 0 ? <em>—</em> : null}
              {group.map((ingredient) => (
                <label key={ingredient.id} className="checkbox">
                  <input
                    type="checkbox"
                    checked={draft.ingredientIds.includes(ingredient.id ?? '')}
                    onChange={() => ingredient.id && toggleIngredient(ingredient.id)}
                    disabled={!ingredient.id}
                  />
                  {ingredient.name}
                </label>
              ))}
            </div>
          ))}
        </fieldset>
        <button type="submit">Save Taco</button>
      </form>

      <h3>Recent Tacos</h3>
      <ul className="list">
        {tacos.map((taco) => (
          <li key={taco.id ?? taco.name}>
            <span>{taco.name}</span>
            <small>{taco.ingredients.map((ingredient) => ingredient.name).join(', ')}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};
