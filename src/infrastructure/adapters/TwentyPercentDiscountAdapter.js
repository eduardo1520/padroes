import DiscountStrategy from '../../domain/ports/DiscountStrategy.js';

export default class TwentyPercentDiscountAdapter extends DiscountStrategy {
  calculateDiscount(orderTotal) {
    return orderTotal * 0.2;
  }
}
