import { get } from './methods';

export function getAllProducts() {
  return get('/product');
}
