import { BehaviorSubject, Subject, merge, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import {
  Ingredient,
  Taco,
  Order,
  getIngredients,
  createIngredient,
  getRecentTacos,
  createTaco,
  getOrders,
  createOrder,
  streamIngredients,
  streamTacos,
  streamOrders
} from './apiClient';

const ingredientRefresh$ = new Subject<void>();
const tacoRefresh$ = new Subject<void>();
const orderRefresh$ = new Subject<void>();

export const ingredients$ = new BehaviorSubject<Ingredient[]>([]);
export const tacos$ = new BehaviorSubject<Taco[]>([]);
export const orders$ = new BehaviorSubject<Order[]>([]);
export const errors$ = new BehaviorSubject<string | null>(null);

const resetError = () => errors$.next(null);

const upsertById = <T extends { id?: string }>(collection: T[], item: T): T[] => {
  if (!item.id) {
    return collection;
  }
  const idx = collection.findIndex(existing => existing.id === item.id);
  if (idx >= 0) {
    const copy = collection.slice();
    copy[idx] = item;
    return copy;
  }
  return [item, ...collection];
};

merge(of(void 0), ingredientRefresh$)
  .pipe(
    tap(() => resetError()),
    switchMap(() =>
      getIngredients().pipe(
        catchError(err => {
          errors$.next(err.message ?? 'Failed to load ingredients');
          return of([] as Ingredient[]);
        })
      )
    )
  )
  .subscribe(ingredients$);

merge(of(void 0), tacoRefresh$)
  .pipe(
    tap(() => resetError()),
    switchMap(() =>
      getRecentTacos().pipe(
        catchError(err => {
          errors$.next(err.message ?? 'Failed to load tacos');
          return of([] as Taco[]);
        })
      )
    )
  )
  .subscribe(tacos$);

merge(of(void 0), orderRefresh$)
  .pipe(
    tap(() => resetError()),
    switchMap(() =>
      getOrders().pipe(
        catchError(err => {
          errors$.next(err.message ?? 'Failed to load orders');
          return of([] as Order[]);
        })
      )
    )
  )
  .subscribe(orders$);

export const refreshIngredients = () => ingredientRefresh$.next();
export const refreshTacos = () => tacoRefresh$.next();
export const refreshOrders = () => orderRefresh$.next();

export const addIngredient = (ingredient: Ingredient) =>
  createIngredient(ingredient)
    .pipe(
      tap({
        error: () => errors$.next('Failed to create ingredient')
      })
    )
    .subscribe();

export const addTaco = (taco: Taco) =>
  createTaco(taco)
    .pipe(
      tap({
        error: () => errors$.next('Failed to create taco')
      })
    )
    .subscribe();

export const addOrder = (order: Order) =>
  createOrder(order)
    .pipe(
      tap({
        error: () => errors$.next('Failed to create order')
      })
    )
    .subscribe();

const connectIngredientStream = () => {
  streamIngredients().subscribe({
    next: ingredient => {
      resetError();
      const updated = upsertById(ingredients$.getValue(), ingredient);
      ingredients$.next(updated);
    },
    error: () => {
      errors$.next('Ingredient stream disconnected');
      setTimeout(connectIngredientStream, 5000);
    }
  });
};

const connectTacoStream = () => {
  streamTacos().subscribe({
    next: taco => {
      resetError();
      const updated = upsertById(tacos$.getValue(), taco);
      tacos$.next(updated);
    },
    error: () => {
      errors$.next('Taco stream disconnected');
      setTimeout(connectTacoStream, 5000);
    }
  });
};

const connectOrderStream = () => {
  streamOrders().subscribe({
    next: order => {
      resetError();
      const updated = upsertById(orders$.getValue(), order);
      orders$.next(updated);
    },
    error: () => {
      errors$.next('Order stream disconnected');
      setTimeout(connectOrderStream, 5000);
    }
  });
};

connectIngredientStream();
connectTacoStream();
connectOrderStream();
