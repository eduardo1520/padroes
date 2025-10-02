import ShoppingCart from '../../../../domain/entities/ShoppingCart.js';
import type { CartRepository } from '../../../../domain/ports/outbound/CartRepository.js';
export default class InMemoryCartRepository implements CartRepository {
    private carts;
    save(cart: ShoppingCart): Promise<ShoppingCart>;
    findById(id: string): Promise<ShoppingCart | null>;
}
//# sourceMappingURL=InMemoryCartRepository.d.ts.map