import Money from '../value-objects/Money.js';
import CartItem from '../value-objects/CartItem.js';

export default class ShoppingCart {
  private id: string;
  private items: CartItem[];

  constructor(id: string) {
    this.id = id;
    this.items = [];
  }

  getId(): string {
    return this.id;
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(nameOrItem: { name?: string; price: number | Money; quantity?: number } | string, price?: number | Money, quantity: number = 1): void {
    let item: CartItem;

    if (typeof nameOrItem === 'object' && nameOrItem !== null) {
      const itemData = nameOrItem;
      item = new CartItem(
        itemData.name || 'Item',
        itemData.price,
        itemData.quantity || 1
      );
    } else {
      item = new CartItem(nameOrItem, price as number | Money, quantity);
    }

    this.items.push(item);
  }

  private calculateSubtotal(): Money {
    const sum = this.items.reduce((acc, i) => acc + i.total.getAmount(), 0);
    return new Money(sum);
  }

  calculateTotal(discountStrategy?: { calculateDiscount(total: number): number }): number {
    const subtotal = this.calculateSubtotal().getAmount();
    const discount = discountStrategy ? discountStrategy.calculateDiscount(subtotal) : 0;
    return subtotal - discount;
  }

  calculateTotalAsMoney(discountStrategy?: { calculateDiscount(total: number): number }): Money {
    const subtotal = this.calculateSubtotal();
    if (discountStrategy) {
      const discount = discountStrategy.calculateDiscount(subtotal.getAmount());
      return new Money(subtotal.getAmount() - discount);
    }
    return subtotal;
  }

  applyDiscount(discountStrategy: { calculateDiscount(total: number): number }): Money {
    const subtotal = this.calculateSubtotal();
    const discount = discountStrategy.calculateDiscount(subtotal.getAmount());
    return subtotal.subtract(new Money(discount));
  }
}