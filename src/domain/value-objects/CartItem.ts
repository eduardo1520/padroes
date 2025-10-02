import Money from './Money.js';

export default class CartItem {
  name: string;
  price: Money;
  quantity: number;
  total: Money;

  constructor(name: string, price: number | Money, quantity: number = 1) {
    this.name = this.validateAndConvertName(name);
    this.price = this.validateAndConvertPrice(price);
    this.quantity = this.validateQuantity(quantity);
    this.total = this.price.multiply(this.quantity);
  }

  private validateAndConvertName(name: string): string {
    if (name === null || name === undefined || name === '') {
      return 'Item';
    }
    return String(name).trim() || 'Item';
  }

  private validateAndConvertPrice(price: number | Money): Money {
    if (price instanceof Money) {
      return price;
    }
    if (typeof price === 'number' && price >= 0) {
      return new Money(price);
    }
    throw new Error('Price must be a non-negative number or Money object');
  }

  private validateQuantity(quantity: number): number {
    if (typeof quantity !== 'number' || quantity < 0 || isNaN(quantity)) {
      throw new Error('Quantity must be a non-negative number');
    }
    return quantity;
  }
}