import Money from './Money.js';

export default class CartItem {
    constructor(name, price, quantity = 1) {
        // Validação e conversão mais robusta do nome
        this.name = this._validateAndConvertName(name);
        
        // Validação e conversão do preço
        this.price = this._validateAndConvertPrice(price);
        
        // Validação da quantidade
        this.quantity = this._validateQuantity(quantity);
        
        // Cálculo do total
        this.total = this.price.multiply(this.quantity);
    }

    _validateAndConvertName(name) {
        if (name === null || name === undefined || name === '') {
            return 'Item';
        }
        return String(name).trim() || 'Item';
    }

    _validateAndConvertPrice(price) {
        if (price instanceof Money) {
            return price;
        }
        
        if (typeof price === 'number' && price >= 0) {
            return new Money(price);
        }
        
        throw new Error('Price must be a non-negative number or Money object');
    }

    _validateQuantity(quantity) {
        if (typeof quantity !== 'number' || quantity < 0) {
            throw new Error('Quantity must be a non-negative number');
        }
        return quantity;
    }
}