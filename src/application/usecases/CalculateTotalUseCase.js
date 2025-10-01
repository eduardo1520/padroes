import ShoppingCart from '../../domain/entities/ShoppingCart.js';

export default class CalculateTotalUseCase {
    constructor(cartRepository, discountService) {
        this.cartRepository = cartRepository;
        this.discountService = discountService;
    }

    async addItemToCart(cartId, item) {
        // Buscar cart existente
        let cart = await this.cartRepository.findById(cartId);
        
        // Se não existir, criar um novo
        if (!cart) {
            cart = new ShoppingCart(cartId);
        }
        
        // Adicionar item
        cart.addItem(item);
        
        // Salvar no repositório
        await this.cartRepository.save(cart);
        
        return cart;
    }

    async calculateTotal(cartId, discountType = 'noDiscount') {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const strategy = this.discountService.getStrategy(discountType);
        return cart.calculateTotal(strategy);
    }
}