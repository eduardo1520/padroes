export default class CartCLI {
    constructor(cartUseCase) {
        this.cartUseCase = cartUseCase;
    }

    async run(options = {}) {
        const {
            cartId = 'cart1',
            items = [{ price: 100 }, { price: 50 }],
            discountTypes = ['NONE', 'TEN_PERCENT', 'TWENTY_PERCENT'],
            showDetails = true
        } = options;

        console.log('🛒 Iniciando Shopping Cart CLI...');
        console.log(`📋 Cart ID: ${cartId}`);
        
        try {
            // Adicionar itens ao carrinho
            if (showDetails) console.log('📦 Adicionando itens ao carrinho...');
            
            for (let i = 0; i < items.length; i++) {
                await this.cartUseCase.addItemToCart(cartId, items[i]);
                if (showDetails) console.log(`✅ Item ${i + 1} adicionado: R$ ${items[i].price}`);
            }
            
            // Calcular totais com diferentes descontos
            if (showDetails) console.log('\n💰 Calculando totais...');
            
            const results = {};
            
            for (const discountType of discountTypes) {
                const total = await this.cartUseCase.calculateTotal(cartId, discountType);
                results[discountType] = total;
                
                const discountName = this.getDiscountName(discountType);
                if (showDetails) console.log(`🔸 Total ${discountName}: R$ ${total}`);
            }
            
            if (showDetails) console.log('\n🎉 Shopping Cart CLI executado com sucesso!');
            
            return {
                cartId,
                items,
                totals: results,
                itemCount: items.length,
                summary: this.generateSummary(results)
            };
            
        } catch (error) {
            console.log('❌ Erro no CartCLI:', error.message);
            throw error;
        }
    }

    getDiscountName(type) {
        const names = {
            'NONE': 'sem desconto',
            'TEN_PERCENT': 'com 10% desconto',
            'TWENTY_PERCENT': 'com 20% desconto'
        };
        return names[type] || type;
    }

    generateSummary(results) {
        const entries = Object.entries(results);
        const best = entries.reduce((min, current) => 
            current[1] < min[1] ? current : min
        );
        
        return {
            melhorOpcao: {
                tipo: best[0],
                valor: best[1],
                nome: this.getDiscountName(best[0])
            },
            economia: results['NONE'] - best[1]
        };
    }
}