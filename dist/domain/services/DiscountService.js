export default class DiscountService {
    strategies;
    constructor() {
        this.strategies = new Map();
    }
    registerStrategy(key, strategy) {
        this.strategies.set(key, strategy);
    }
    getStrategy(type) {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            return { calculateDiscount: (total) => 0 };
        }
        return strategy;
    }
}
//# sourceMappingURL=DiscountService.js.map