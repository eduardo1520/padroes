import Money from './Money.js';
export default class CartItem {
    name;
    price;
    quantity;
    total;
    constructor(name, price, quantity = 1) {
        this.name = this.validateAndConvertName(name);
        this.price = this.validateAndConvertPrice(price);
        this.quantity = this.validateQuantity(quantity);
        this.total = this.price.multiply(this.quantity);
    }
    validateAndConvertName(name) {
        if (name === null || name === undefined || name === '') {
            return 'Item';
        }
        return String(name).trim() || 'Item';
    }
    validateAndConvertPrice(price) {
        if (price instanceof Money) {
            return price;
        }
        if (typeof price === 'number' && price >= 0) {
            return new Money(price);
        }
        throw new Error('Price must be a non-negative number or Money object');
    }
    validateQuantity(quantity) {
        if (typeof quantity !== 'number' || quantity < 0 || isNaN(quantity)) {
            throw new Error('Quantity must be a non-negative number');
        }
        return quantity;
    }
}
//# sourceMappingURL=CartItem.js.map