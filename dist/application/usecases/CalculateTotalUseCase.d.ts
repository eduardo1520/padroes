import ShoppingCart from '../../domain/entities/ShoppingCart.js';
import Money from '../../domain/value-objects/Money.js';
import type { CartRepository } from '../../domain/ports/outbound/CartRepository.js';
import DiscountService from '../../domain/services/DiscountService.js';
import type { CartUseCase } from '../../domain/ports/inbound/CartUseCase.js';
export default class CalculateTotalUseCase implements CartUseCase {
    private cartRepository;
    private discountService;
    constructor(cartRepository: CartRepository, discountService: DiscountService);
    addItemToCart(cartId: string, item: {
        name?: string;
        price: number | Money;
        quantity?: number;
    }): Promise<ShoppingCart>;
    calculateTotal(cartId: string, discountType?: string): Promise<number>;
}
//# sourceMappingURL=CalculateTotalUseCase.d.ts.map