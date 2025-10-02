import CalculateTotalUseCase from '../../application/usecases/CalculateTotalUseCase.js';
import InMemoryCartRepository from '../adapters/outbound/persistence/InMemoryCartRepository.js';
import CartCLI from '../adapters/inbound/cli/CartCLI.js';
export default class DependencyInjection {
    static configure(): {
        cartUseCase: CalculateTotalUseCase;
        cartCLI: CartCLI;
        cartRepository: InMemoryCartRepository;
    };
}
//# sourceMappingURL=DependencyInjection.d.ts.map