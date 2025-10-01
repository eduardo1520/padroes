import DiscountStrategy from '../../domain/ports/DiscountStrategy.js';

export default class NoDiscountAdapter extends DiscountStrategy {
  calculateDiscount(orderTotal) {
    return 0;
  }
}
