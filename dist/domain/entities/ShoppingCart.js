import Money from '../value-objects/Money.js';
import CartItem from '../value-objects/CartItem.js';
export default class ShoppingCart {
    id;
    items;
    constructor(id) {
        this.id = id;
        this.items = [];
    }
    getId() {
        return this.id;
    }
    getItems() {
        return this.items;
    }
    addItem(nameOrItem, price, quantity = 1) {
        let item;
        if (typeof nameOrItem === 'object' && nameOrItem !== null) {
            const itemData = nameOrItem;
            item = new CartItem(itemData.name || 'Item', itemData.price, itemData.quantity || 1);
        }
        else {
            item = new CartItem(nameOrItem, price, quantity);
        }
        this.items.push(item);
    }
    calculateSubtotal() {
        const sum = this.items.reduce((acc, i) => acc + i.total.getAmount(), 0);
        return new Money(sum);
    }
    calculateTotal(discountStrategy) {
        const subtotal = this.calculateSubtotal().getAmount();
        const discount = discountStrategy ? discountStrategy.calculateDiscount(subtotal) : 0;
        return subtotal - discount;
    }
    calculateTotalAsMoney(discountStrategy) {
        const subtotal = this.calculateSubtotal();
        if (discountStrategy) {
            const discount = discountStrategy.calculateDiscount(subtotal.getAmount());
            return new Money(subtotal.getAmount() - discount);
        }
        return subtotal;
    }
    applyDiscount(discountStrategy) {
        const subtotal = this.calculateSubtotal();
        const discount = discountStrategy.calculateDiscount(subtotal.getAmount());
        return subtotal.subtract(new Money(discount));
    }
}
//# sourceMappingURL=ShoppingCart.js.map