export default class Money {
    constructor(amount, currency = 'BRL') {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Amount must be a non-negative number');
        }
        this.amount = amount;
        this.currency = currency;
    }

    toString() {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }

    add(other) {
        // Validação mais robusta
        if (!other || !(other instanceof Money)) {
            throw new Error('Cannot add different currencies');
        }
        if (other.currency !== this.currency) {
            throw new Error('Cannot add different currencies');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    multiply(factor) {
        if (typeof factor !== 'number') {
            throw new Error('Factor must be a number');
        }
        return new Money(this.amount * factor, this.currency);
    }

    subtract(other) {
        // Validação mais robusta
        if (!other || !(other instanceof Money)) {
            throw new Error('Cannot subtract different currencies');
        }
        if (other.currency !== this.currency) {
            throw new Error('Cannot subtract different currencies');
        }
        return new Money(this.amount - other.amount, this.currency);
    }
}