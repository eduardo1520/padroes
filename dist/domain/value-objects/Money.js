export default class Money {
    amount;
    currency;
    constructor(amount, currency = 'BRL') {
        if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
            throw new Error('Amount must be a non-negative number');
        }
        this.amount = amount;
        this.currency = currency;
    }
    toString() {
        const symbol = this.currency === 'BRL' ? 'R$'
            : this.currency === 'USD' ? '$'
                : '€';
        return `${symbol} ${this.amount.toFixed(2).replace('.', ',')}`;
    }
    add(other) {
        if (!other || !(other instanceof Money)) {
            throw new Error('Cannot add different currencies');
        }
        if (other.currency !== this.currency) {
            throw new Error('Cannot add different currencies');
        }
        return new Money(this.amount + other.amount, this.currency);
    }
    multiply(factor) {
        if (typeof factor !== 'number' || isNaN(factor)) {
            throw new Error('Factor must be a number');
        }
        return new Money(this.amount * factor, this.currency);
    }
    subtract(other) {
        if (!other || !(other instanceof Money)) {
            throw new Error('Cannot subtract different currencies');
        }
        if (other.currency !== this.currency) {
            throw new Error('Cannot subtract different currencies');
        }
        return new Money(this.amount - other.amount, this.currency);
    }
    getAmount() {
        return this.amount;
    }
    getCurrency() {
        return this.currency;
    }
}
//# sourceMappingURL=Money.js.map