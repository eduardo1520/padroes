import DependencyInjection from '../../dist/infrastructure/config/DependencyInjection.js';

    describe('Cart Use Case Integration', () => {
    let cartUseCase, cartRepository;

    beforeEach(() => {
        const dependencies = DependencyInjection.configure();
        cartUseCase = dependencies.cartUseCase;
        cartRepository = dependencies.cartRepository;
    });

    describe('Add Item to Cart', () => {
        it('should add item and persist cart', async () => {
            await cartUseCase.addItemToCart('integration-test-1', { price: 100 });
            
            const cart = await cartRepository.findById('integration-test-1');
            expect(cart).toBeDefined();
            expect(cart.getItems().length).toBe(1);
            
            // Corrigir: acessar o valor numérico do preço
            const firstItem = cart.getItems()[0];
            expect(firstItem.price.amount).toBe(100);
        });

        it('should add multiple items to same cart', async () => {
            await cartUseCase.addItemToCart('integration-test-2', { price: 100 });
            await cartUseCase.addItemToCart('integration-test-2', { price: 50 });
            
            const cart = await cartRepository.findById('integration-test-2');
            expect(cart.getItems().length).toBe(2);
        });
    });

    describe('Calculate Total', () => {
        beforeEach(async () => {
            await cartUseCase.addItemToCart('calc-test', { price: 100 });
            await cartUseCase.addItemToCart('calc-test', { price: 50 });
        });

        it('should calculate total without discount', async () => {
            const total = await cartUseCase.calculateTotal('calc-test', 'NONE');
            expect(total).toBe(150);
        });

        it('should calculate total with 10% discount', async () => {
            const total = await cartUseCase.calculateTotal('calc-test', 'TEN_PERCENT');
            expect(total).toBe(135); // 150 - 15
        });

        it('should calculate total with 20% discount', async () => {
            const total = await cartUseCase.calculateTotal('calc-test', 'TWENTY_PERCENT');
            expect(total).toBe(120); // 150 - 30
        });
    });
});