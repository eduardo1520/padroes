import type { CartUseCase } from '../../../../domain/ports/inbound/CartUseCase.js';

export default class CartCLI {
  private cartUseCase: CartUseCase;

  constructor(cartUseCase: CartUseCase) {
    this.cartUseCase = cartUseCase;
  }

  async run(options: {
    cartId?: string;
    items?: Array<{ name?: string; price: number; quantity?: number }>;
    discountTypes?: string[];
    showDetails?: boolean;
  } = {}) {
    const {
      cartId = 'cart1',
      items = [{ price: 100 }, { price: 50 }],
      discountTypes = ['NONE', 'TEN_PERCENT', 'TWENTY_PERCENT'],
      showDetails = true
    } = options;

    console.log('🛒 Iniciando Shopping Cart CLI...');
    console.log(`📋 Cart ID: ${cartId}`);

    try {
      if (showDetails) console.log('📦 Adicionando itens ao carrinho...');

      for (let i = 0; i < items.length; i++) {
        await this.cartUseCase.addItemToCart(cartId, items[i]);
        if (showDetails) console.log(`✅ Item ${i + 1} adicionado: R$ ${items[i].price}`);
      }

      if (showDetails) console.log('\n💰 Calculando totais...');

      const results: Record<string, number> = {};

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
    } catch (error: any) {
      console.log('❌ Erro no CartCLI:', error.message);
      throw error;
    }
  }

  private getDiscountName(type: string): string {
    switch (type) {
      case 'NONE': return 'Sem Desconto';
      case 'TEN_PERCENT': return '10% Desconto';
      case 'TWENTY_PERCENT': return '20% Desconto';
      default: return type;
    }
  }

  private generateSummary(results: Record<string, number>) {
    const entries = Object.entries(results);
    const best = entries.reduce((acc, cur) => cur[1] < acc[1] ? cur : acc);
    return {
      bestDiscountType: best[0],
      bestTotal: best[1]
    };
  }
}