import Money from '../value-objects/Money.js';
import CartItem from '../value-objects/CartItem.js';
export default class ShoppingCart {
    private id;
    private items;
    constructor(id: string);
    getId(): string;
    getItems(): CartItem[];
    addItem(nameOrItem: {
        name?: string;
        price: number | Money;
        quantity?: number;
    } | string, price?: number | Money, quantity?: number): void;
    private calculateSubtotal;
    calculateTotal(discountStrategy?: {
        calculateDiscount(total: number): number;
    }): number;
    calculateTotalAsMoney(discountStrategy?: {
        calculateDiscount(total: number): number;
    }): Money;
    applyDiscount(discountStrategy: {
        calculateDiscount(total: number): number;
    }): Money;
}
//# sourceMappingURL=ShoppingCart.d.ts.map