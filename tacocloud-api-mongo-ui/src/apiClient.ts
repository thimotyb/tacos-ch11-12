import { ajax } from 'rxjs/ajax';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

const withBase = (path: string) => `${API_BASE_URL}${path}`;

export interface Ingredient {
  id?: string;
  name: string;
  type: 'WRAP' | 'PROTEIN' | 'VEGGIES' | 'CHEESE' | 'SAUCE';
}

export interface Taco {
  id?: string;
  name: string;
  ingredients: Ingredient[];
  createdAt?: string;
}

export interface Order {
  id?: string;
  deliveryName?: string;
  deliveryStreet?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryZip?: string;
  ccNumber?: string;
  ccExpiration?: string;
  ccCVV?: string;
  tacos: Taco[];
  placedAt?: string;
}

const headers = { 'Content-Type': 'application/json' };

const eventSource$ = <T>(path: string): Observable<T> =>
  new Observable<T>(subscriber => {
    const source = new EventSource(path);

    source.onmessage = event => {
      try {
        subscriber.next(JSON.parse(event.data) as T);
      } catch (error) {
        subscriber.error(error);
      }
    };

    source.onerror = error => {
      subscriber.error(error);
      source.close();
    };

    return () => source.close();
  }).pipe(share({ resetOnRefCountZero: true }));

export const getIngredients = (): Observable<Ingredient[]> =>
  ajax.getJSON<Ingredient[]>(withBase('/ingredients'));

export const createIngredient = (ingredient: Ingredient): Observable<Ingredient> =>
  ajax.post(withBase('/ingredients'), ingredient, headers).pipe(map(resp => resp.response as Ingredient));

export const getRecentTacos = (): Observable<Taco[]> =>
  ajax.getJSON<Taco[]>(withBase('/design/recent'));

export const createTaco = (taco: Taco): Observable<Taco> =>
  ajax.post(withBase('/design'), taco, headers).pipe(map(resp => resp.response as Taco));

export const getOrders = (): Observable<Order[]> =>
  ajax.getJSON<Order[]>(withBase('/orders'));

export const createOrder = (order: Order): Observable<Order> =>
  ajax.post(withBase('/orders'), order, headers).pipe(map(resp => resp.response as Order));

export const streamIngredients = (): Observable<Ingredient> =>
  eventSource$<Ingredient>(withBase('/ingredients/stream'));

export const streamTacos = (): Observable<Taco> =>
  eventSource$<Taco>(withBase('/design/stream'));

export const streamOrders = (): Observable<Order> =>
  eventSource$<Order>(withBase('/orders/stream'));
