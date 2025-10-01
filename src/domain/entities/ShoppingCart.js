import Money from '../value-objects/Money.js';
import CartItem from '../value-objects/CartItem.js';

export default class ShoppingCart {
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
            // Formato antigo: { price: 100 }
            const itemData = nameOrItem;
            item = new CartItem(
                itemData.name || 'Item',
                itemData.price,
                itemData.quantity || 1
            );
        } else {
            // Formato novo: ('Nome', 100, 2)
            item = new CartItem(nameOrItem, price, quantity);
        }
        
        this.items.push(item);
    }

    calculateSubtotal() {
        return this.items.reduce((total, item) => {
            return total.add(item.total);
        }, new Money(0));
    }

    // Retorna número para compatibilidade com testes
    calculateTotal(discountStrategy = null) {
        const subtotal = this.calculateSubtotal();
        
        if (discountStrategy) {
            const discount = discountStrategy.calculateDiscount(subtotal.amount);
            return subtotal.amount - discount;
        }
        
        return subtotal.amount;
    }

    // Retorna Money object para uso avançado
    calculateTotalAsMoney(discountStrategy = null) {
        const subtotal = this.calculateSubtotal();
        
        if (discountStrategy) {
            const discount = discountStrategy.calculateDiscount(subtotal.amount);
            return new Money(subtotal.amount - discount);
        }
        
        return subtotal;
    }

    applyDiscount(discountStrategy) {
        const subtotal = this.calculateSubtotal();
        const discount = discountStrategy.calculateDiscount(subtotal.amount);
        return subtotal.subtract(new Money(discount));
    }
}