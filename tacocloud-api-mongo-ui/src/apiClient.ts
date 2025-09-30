import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
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
