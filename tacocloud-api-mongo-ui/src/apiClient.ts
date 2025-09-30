import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  ajax.getJSON<Ingredient[]>('/api/ingredients');

export const createIngredient = (ingredient: Ingredient): Observable<Ingredient> =>
  ajax.post('/api/ingredients', ingredient, headers).pipe(map(resp => resp.response as Ingredient));

export const getRecentTacos = (): Observable<Taco[]> =>
  ajax.getJSON<Taco[]>('/api/design/recent');

export const createTaco = (taco: Taco): Observable<Taco> =>
  ajax.post('/api/design', taco, headers).pipe(map(resp => resp.response as Taco));

export const getOrders = (): Observable<Order[]> =>
  ajax.getJSON<Order[]>('/api/orders');

export const createOrder = (order: Order): Observable<Order> =>
  ajax.post('/api/orders', order, headers).pipe(map(resp => resp.response as Order));
