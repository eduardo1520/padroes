import type { DiscountStrategy } from '../../domain/ports/outbound/DiscountStrategy.js';

export default class TenPercentDiscountAdapter implements DiscountStrategy {
  calculateDiscount(total: number): number {
    return total * 0.1;
  }
}