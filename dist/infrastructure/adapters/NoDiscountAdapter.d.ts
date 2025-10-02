import type { DiscountStrategy } from '../../domain/ports/outbound/DiscountStrategy.js';
export default class NoDiscountAdapter implements DiscountStrategy {
    calculateDiscount(total: number): number;
}
//# sourceMappingURL=NoDiscountAdapter.d.ts.map