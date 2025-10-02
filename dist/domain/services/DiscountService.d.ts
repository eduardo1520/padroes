import type { DiscountStrategy } from '../ports/outbound/DiscountStrategy.js';
export default class DiscountService {
    private strategies;
    constructor();
    registerStrategy(key: string, strategy: DiscountStrategy): void;
    getStrategy(type: string): DiscountStrategy;
}
//# sourceMappingURL=DiscountService.d.ts.map