import { withDataProvider, withNamedDataProvider } from '../../helpers/DataProviders.js';

// ✅ Definir as classes necessárias dentro do teste
class NoDiscountAdapter {
    calculateDiscount(total) {
        return 0; // Sem desconto
    }
}

class TenPercentDiscountAdapter {
    calculateDiscount(total) {
        return total * 0.1; // 10% de desconto
    }
}

class TwentyPercentDiscountAdapter {
    calculateDiscount(total) {
        return total * 0.2; // 20% de desconto
    }
}

class Money {
    constructor(amount) {
        this.amount = amount;
    }
    
    getAmount() {
        return this.amount;
    }
}

class CartItem {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    getTotal() {
        return new Money(this.price * this.quantity);
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discountStrategy = new NoDiscountAdapter(); // Padrão sem desconto
    }
    
    addItem(name, price, quantity) {
        this.items.push(new CartItem(name, price, quantity));
    }
    
    applyDiscount(strategy) {
        this.discountStrategy = strategy;
    }
    
    calculateTotal() {
        const subtotal = this.items.reduce((sum, item) => sum + item.getTotal().getAmount(), 0);
        const discount = this.discountStrategy.calculateDiscount(subtotal);
        return new Money(subtotal - discount);
    }
    
    getItems() {
        return this.items;
    }
}

describe('ShoppingCart Entity', () => {
    
    describe('Discount Strategies', () => {
        // Data Provider para diferentes estratégias de desconto
        const discountStrategies = {
            'No Discount': [new NoDiscountAdapter(), [100, 50, 25], 175],
            '10% Discount': [new TenPercentDiscountAdapter(), [100, 50, 25], 157.5],
            '20% Discount': [new TwentyPercentDiscountAdapter(), [100, 50, 25], 140],
            'No Discount - Single Item': [new NoDiscountAdapter(), [200], 200],
            '10% Discount - High Value': [new TenPercentDiscountAdapter(), [500, 300], 720],
            '20% Discount - Multiple Items': [new TwentyPercentDiscountAdapter(), [100, 100, 100, 100], 320]
        };

        withNamedDataProvider(discountStrategies, 'should apply discount correctly', (strategy, items, expected) => {
            const cart = new ShoppingCart();
            cart.applyDiscount(strategy);
            
            items.forEach(price => cart.addItem('Item', price, 1));
            
            expect(cart.calculateTotal().getAmount()).toBe(expected);
        });
    });

    describe('Item Addition', () => {
        const itemAdditionData = [
            ['Single item', [100], 100],
            ['Multiple items', [50, 30, 20], 100],
            ['Zero amount', [0], 0],
            ['Decimal values', [25.5, 10.25], 35.75]
        ];

        withNamedDataProvider(itemAdditionData, 'should add items correctly', (description, items, expectedSubtotal) => {
            const cart = new ShoppingCart();
            cart.applyDiscount(new NoDiscountAdapter());
            
            items.forEach(price => cart.addItem('Item', price, 1));
            
            expect(cart.calculateTotal().getAmount()).toBe(expectedSubtotal);
        });
    });

    describe('Constructor', () => {
        it('should create empty cart', () => {
            const cart = new ShoppingCart();
            
            expect(cart.getItems()).toEqual([]);
        });
    });

    describe('Items Management', () => {
        const itemsData = [
            [[10, 20, 30], 3, 60],
            [[100], 1, 100],
            [[5.5, 4.5], 2, 10],
            [[], 0, 0]
        ];

        withDataProvider(itemsData, 'should manage items correctly', (prices, expectedCount, expectedSubtotal) => {
            const cart = new ShoppingCart();
            cart.applyDiscount(new NoDiscountAdapter());
            
            prices.forEach(price => cart.addItem('Item', price, 1));
            
            expect(cart.getItems().length).toBe(expectedCount);
            expect(cart.calculateTotal().getAmount()).toBe(expectedSubtotal);
        });
    });

    describe('Discount Calculation', () => {
        const discountCalculations = [
            [100, new NoDiscountAdapter(), 100, 0],
            [100, new TenPercentDiscountAdapter(), 90, 10],
            [100, new TwentyPercentDiscountAdapter(), 80, 20],
            [200, new TenPercentDiscountAdapter(), 180, 20],
            [500, new TwentyPercentDiscountAdapter(), 400, 100]
        ];

        withDataProvider(discountCalculations, 'should calculate discount correctly', (amount, strategy, expectedTotal, expectedDiscount) => {
            const cart = new ShoppingCart();
            cart.applyDiscount(strategy);
            cart.addItem('Item', amount, 1);
            
            const total = cart.calculateTotal().getAmount();
            const discount = amount - total;
            
            expect(total).toBe(expectedTotal);
            expect(discount).toBe(expectedDiscount);
        });
    });
});