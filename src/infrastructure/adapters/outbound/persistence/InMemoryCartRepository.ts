import ShoppingCart from '../../../../domain/entities/ShoppingCart.js';
import type { CartRepository } from '../../../../domain/ports/outbound/CartRepository.js';

export default class InMemoryCartRepository implements CartRepository {
  private carts = new Map<string, ShoppingCart>();

  async save(cart: ShoppingCart): Promise<ShoppingCart> {
    this.carts.set(cart.getId(), cart);
    return cart;
  }

  async findById(id: string): Promise<ShoppingCart | null> {
    return this.carts.get(id) || null;
  }
}