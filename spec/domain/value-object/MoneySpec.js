import { withDataProvider, withValidationProvider } from '../../helpers/DataProviders.js';

/**
 * Representa um valor monetário.
 * @class
 * @typedef {'BRL'|'USD'|'EUR'|undefined} Currency
 */
class Money {
    /**
     * @param {number} amount - O valor monetário.
     * @param {Currency} [currency='BRL'] - A moeda do valor monetário.
     */
    constructor(amount, currency = 'BRL') {
        if (amount < 0 || amount == null || isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        this.amount = amount;
        this.currency = currency;
    }
    
    /**
     * Retorna o valor monetário.
     * @returns {number} - O valor monetário.
     */
    getAmount() { return this.amount; }
    
    /**
     * Retorna a moeda do valor monetário.
     * @returns {Currency} - A moeda do valor monetário.
     */
    getCurrency() { return this.currency; }

    /**
     * Retorna uma representação em string do valor monetário.
     * @returns {string} - A representação em string do valor monetário.
     */
    toString() { 
        const symbol = this.currency === 'BRL' ? 'R$' : this.currency === 'USD' ? '$' : '€';
        return `${symbol} ${this.amount.toFixed(2).replace('.', ',')}`;
    }
}

describe('Money Value Object', () => {
    describe('Constructor', () => {
        // ✅ Inclui o valor esperado da string formatada
        const validConstructorData = [
            [100, 'BRL', 'R$ 100,00'],
            [50.5, 'USD', '$ 50,50'],
            [0, 'EUR', '€ 0,00'],
            [999.99, 'BRL', 'R$ 999,99']
        ];

        withDataProvider(validConstructorData, 'should create Money with valid inputs', 
            /**
             * Testa a criação de um objeto Money com entradas válidas.
             * @param {number} amount - O valor monetário.
             * @param {Currency} currency - A moeda do valor monetário.
             * @param {string} expected — A representação em string esperada.
             */
            (amount, currency, expected) => {
            const money = new Money(amount, currency);
            expect(money.getAmount()).toBe(amount);
            expect(money.getCurrency()).toBe(currency);
            // ✅ Garante que a representação em string está correta
            expect(money.toString()).toBe(expected);
        });
    });

    // Data Provider para validação
    const invalidAmounts = [null, undefined, -10, NaN];
    withValidationProvider(invalidAmounts, 'Constructor validation', 
        /**
         * Testa a validação do construtor Money com entradas inválidas.
         * @param {*} invalidAmount - O valor monetário inválido.
         */
        (invalidAmount) => {
        new Money(invalidAmount, 'BRL');
        });
    });

    describe('String Representation', () => {
        const formatData = [
            [100, 'BRL', 'R$ 100,00'],
            [50.5, 'USD', '$ 50,50'],
            [25.75, 'EUR', '€ 25,75']
        ];
        withDataProvider(formatData, 'should format correctly', 
            /**
                 * Testa a criação de um objeto Money com entradas válidas.
                 * @param {number} amount - O valor monetário.
                 * @param {Currency} currency - A moeda do valor monetário.
                 * @param {string} expected — A representação em string esperada.
                 */
            (amount, currency, expected) => {
            const money = new Money(amount, currency);
            expect(money.toString()).toBe(expected);
    });
});