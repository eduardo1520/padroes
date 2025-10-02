type Currency = 'BRL' | 'USD' | 'EUR';

export default class Money {
  private amount: number;
  private currency: Currency;

  constructor(amount: number, currency: Currency = 'BRL') {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      throw new Error('Amount must be a non-negative number');
    }
    this.amount = amount;
    this.currency = currency;
  }

  toString(): string {
      const symbol = this.currency === 'BRL' ? 'R$'
          : this.currency === 'USD' ? '$'
          : '€';
      return `${symbol} ${this.amount.toFixed(2).replace('.', ',')}`;
  }

  add(other: Money): Money {
    if (!other || !(other instanceof Money)) {
      throw new Error('Cannot add different currencies');
    }
    if (other.currency !== this.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    if (typeof factor !== 'number' || isNaN(factor)) {
      throw new Error('Factor must be a number');
    }
    return new Money(this.amount * factor, this.currency);
  }

  subtract(other: Money): Money {
    if (!other || !(other instanceof Money)) {
      throw new Error('Cannot subtract different currencies');
    }
    if (other.currency !== this.currency) {
      throw new Error('Cannot subtract different currencies');
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): Currency {
    return this.currency;
  }
}