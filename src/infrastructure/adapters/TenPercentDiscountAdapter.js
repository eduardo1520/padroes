import DiscountStrategy from "../../domain/ports/DiscountStrategy.js";

export default class TenPercentDiscountAdapter extends DiscountStrategy {
    calculateDiscount(subtotal, cart) {
        return subtotal * 0.10;
    }
}