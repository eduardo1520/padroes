import ShoppingCart from '../../entities/ShoppingCart.js';

export interface CartRepository {
  save(cart: ShoppingCart): Promise<ShoppingCart>;
  findById(id: string): Promise<ShoppingCart | null>;
}