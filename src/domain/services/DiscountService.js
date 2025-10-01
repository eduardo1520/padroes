export default class DiscountService {
    constructor() {
        this.strategies = new Map();
    }

    registerStrategy(type, strategy) {
        this.strategies.set(type, strategy);
    }

    getStrategy(type) {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            // Retorna uma estratégia padrão se não encontrar
            return this.strategies.get('NONE') || { calculateDiscount: (total) => total };
        }
        return strategy;
    }
}