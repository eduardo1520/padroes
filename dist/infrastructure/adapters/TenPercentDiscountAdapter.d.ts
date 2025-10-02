import type { DiscountStrategy } from '../../domain/ports/outbound/DiscountStrategy.js';
export default class TenPercentDiscountAdapter implements DiscountStrategy {
    calculateDiscount(total: number): number;
}
//# sourceMappingURL=TenPercentDiscountAdapter.d.ts.map