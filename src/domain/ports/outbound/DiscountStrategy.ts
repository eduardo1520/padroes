export interface DiscountStrategy {
  calculateDiscount(total: number): number;
}