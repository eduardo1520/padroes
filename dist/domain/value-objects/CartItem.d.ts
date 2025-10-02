import Money from './Money.js';
export default class CartItem {
    name: string;
    price: Money;
    quantity: number;
    total: Money;
    constructor(name: string, price: number | Money, quantity?: number);
    private validateAndConvertName;
    private validateAndConvertPrice;
    private validateQuantity;
}
//# sourceMappingURL=CartItem.d.ts.map