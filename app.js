import DependencyInjection from './src/infrastructure/config/DependencyInjection.js';
import ShoppingCart from './src/domain/entities/ShoppingCart.js';

async function main() {
    const { cartCLI, cartRepository } = DependencyInjection.configure();
    
    // Criar carrinho inicial
    const cart = new ShoppingCart('cart1');
    await cartRepository.save(cart);
    
    // Executar aplicação
    await cartCLI.run();
}

main().catch(console.error);