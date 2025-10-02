import type { DiscountStrategy } from '../ports/outbound/DiscountStrategy.js';

export default class DiscountService {
  private strategies: Map<string, DiscountStrategy>;

  constructor() {
    this.strategies = new Map();
  }

  registerStrategy(key: string, strategy: DiscountStrategy): void {
    this.strategies.set(key, strategy);
  }

  getStrategy(type: string) {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      return { calculateDiscount: (total: number) => 0 };
    }
    
    return strategy;
  }
}