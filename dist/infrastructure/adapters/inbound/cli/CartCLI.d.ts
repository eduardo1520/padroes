import type { CartUseCase } from '../../../../domain/ports/inbound/CartUseCase.js';
export default class CartCLI {
    private cartUseCase;
    constructor(cartUseCase: CartUseCase);
    run(options?: {
        cartId?: string;
        items?: Array<{
            name?: string;
            price: number;
            quantity?: number;
        }>;
        discountTypes?: string[];
        showDetails?: boolean;
    }): Promise<{
        cartId: string;
        items: {
            name?: string;
            price: number;
            quantity?: number;
        }[];
        totals: Record<string, number>;
        itemCount: number;
        summary: {
            bestDiscountType: string;
            bestTotal: number;
        };
    }>;
    private getDiscountName;
    private generateSummary;
}
//# sourceMappingURL=CartCLI.d.ts.map