import CalculateTotalUseCase from '../../application/usecases/CalculateTotalUseCase.js';
import DiscountService from '../../domain/services/DiscountService.js';
import InMemoryCartRepository from '../adapters/outbound/persistence/InMemoryCartRepository.js';
import NoDiscountAdapter from '../adapters/NoDiscountAdapter.js';
import TenPercentDiscountAdapter from '../adapters/TenPercentDiscountAdapter.js';
import TwentyPercentDiscountAdapter from '../adapters/TwentyPercentDiscountAdapter.js';
import CartCLI from '../adapters/inbound/cli/CartCLI.js';

export default class DependencyInjection {
    static configure() {
        // Repositórios
        const cartRepository = new InMemoryCartRepository();
        
        // Serviços de domínio
        const discountService = new DiscountService();
        
        // Registrar estratégias
        discountService.registerStrategy('NONE', new NoDiscountAdapter());
        discountService.registerStrategy('TEN_PERCENT', new TenPercentDiscountAdapter());
        discountService.registerStrategy('TWENTY_PERCENT', new TwentyPercentDiscountAdapter());
        
        // Casos de uso
        const cartUseCase = new CalculateTotalUseCase(cartRepository, discountService);
        
        // Adaptadores de entrada
        const cartCLI = new CartCLI(cartUseCase);
        
        return {
            cartUseCase,
            cartCLI,
            cartRepository
        };
    }
}