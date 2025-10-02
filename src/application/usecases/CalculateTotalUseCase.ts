import ShoppingCart from '../../domain/entities/ShoppingCart.js';
import Money from '../../domain/value-objects/Money.js';
import type { CartRepository } from '../../domain/ports/outbound/CartRepository.js';
import DiscountService from '../../domain/services/DiscountService.js';
import type { DiscountStrategy } from '../../domain/ports/outbound/DiscountStrategy.js';
import type { CartUseCase } from '../../domain/ports/inbound/CartUseCase.js';

export default class CalculateTotalUseCase implements CartUseCase {
  private cartRepository: CartRepository;
  private discountService: DiscountService;

  constructor(cartRepository: CartRepository, discountService: DiscountService) {
    this.cartRepository = cartRepository;
    this.discountService = discountService;
  }

  async addItemToCart(
    cartId: string,
    item: { name?: string; price: number | Money; quantity?: number }
  ): Promise<ShoppingCart> {
    let cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      cart = new ShoppingCart(cartId);
    }

    cart.addItem(item);
    await this.cartRepository.save(cart);
    return cart;
  }

  async calculateTotal(cartId: string, discountType: string = 'NONE'): Promise<number> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const strategy: DiscountStrategy = this.discountService.getStrategy(discountType);
    return cart.calculateTotal(strategy);
  }
}