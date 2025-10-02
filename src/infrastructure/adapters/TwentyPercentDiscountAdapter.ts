import type { DiscountStrategy } from '../../domain/ports/outbound/DiscountStrategy.js';

export default class TwentyPercentDiscountAdapter implements DiscountStrategy {
  calculateDiscount(total: number): number {
    return total * 0.2;
  }
}