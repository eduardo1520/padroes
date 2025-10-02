import Money from '../../value-objects/Money.js';
import ShoppingCart from '../../entities/ShoppingCart.js';

export interface CartUseCase {
  addItemToCart(
    cartId: string,
    item: { name?: string; price: number | Money; quantity?: number }
  ): Promise<ShoppingCart>;

  calculateTotal(cartId: string, discountType: string): Promise<number>;
}