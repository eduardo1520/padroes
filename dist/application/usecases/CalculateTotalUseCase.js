import ShoppingCart from '../../domain/entities/ShoppingCart.js';
export default class CalculateTotalUseCase {
    cartRepository;
    discountService;
    constructor(cartRepository, discountService) {
        this.cartRepository = cartRepository;
        this.discountService = discountService;
    }
    async addItemToCart(cartId, item) {
        let cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            cart = new ShoppingCart(cartId);
        }
        cart.addItem(item);
        await this.cartRepository.save(cart);
        return cart;
    }
    async calculateTotal(cartId, discountType = 'NONE') {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const strategy = this.discountService.getStrategy(discountType);
        return cart.calculateTotal(strategy);
    }
}
//# sourceMappingURL=CalculateTotalUseCase.js.map