import { withDataProvider, withValidationProvider } from '../../helpers/DataProviders.js';

// Classe CartItem simples para demonstrar Data Providers
/**
 * Representa um item no carrinho de compras.
 * @class
 */
class CartItem {
    /**
     * @param {string} name - O nome do item.
     * @param {number} price - O preço unitário do item.
     * @param {number} [quantity=1] - A quantidade do item.
     */
    constructor(name, price, quantity = 1) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid name');
        }
        // ✅ Correção: Adicionar validação de tipo para price
        if (typeof price !== 'number' || price < 0 || price == null || isNaN(price)) {
            throw new Error('Invalid price');
        }
        if (typeof quantity !== 'number' || quantity < 0 || isNaN(quantity)) {
            throw new Error('Invalid quantity');
        }
        
        this.name = name.trim();
        this.price = price;
        this.quantity = quantity;
    }
    
    getName() { return this.name; }
    getPrice() { return this.price; }
    getQuantity() { return this.quantity; }
    getTotal() { return this.price * this.quantity; }
}

describe('CartItem Value Object', () => {
    describe('Constructor', () => {
        // ✅ Converter para array simples em vez de objeto nomeado
        const constructorData = [
            ['Product A', 100, 2],
            ['Product B', 50.5, 1], 
            ['  Product C  ', 75, 3],
            ['Product D', 25, undefined], // quantity = 1
            ['Product E', 10, 0] // ✅ quantity deve ser 0
        ];

        withDataProvider(constructorData, 'should create CartItem', 
            /**
             * Testa a criação de um objeto CartItem com entradas válidas.
             * @param {string} name - O nome do item.
             * @param {number} price - O preço unitário do item.
             * @param {number} [quantity=1] - A quantidade do item.
             */
            (name, price, quantity) => {
            const item = new CartItem(name, price, quantity);
            expect(item.getName()).toBe(name.trim ? name.trim() : name);
            expect(item.getPrice()).toBe(price);
            // ✅ Correção: Ajustar expectativa para quantity
            expect(item.getQuantity()).toBe(quantity === undefined ? 1 : quantity);
        });

    });
    
});