import { withDataProvider, withValidationProvider } from '../../helpers/DataProviders.js';

// Como Money não existe ainda, vamos criar um teste básico
class Money {
    constructor(amount, currency) {
        if (amount < 0 || amount == null || isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        this.amount = amount;
        this.currency = currency;
    }
    
    getAmount() { return this.amount; }
    getCurrency() { return this.currency; }
    toString() { 
        const symbol = this.currency === 'BRL' ? 'R$' : this.currency === 'USD' ? '$' : '€';
        return `${symbol} ${this.amount.toFixed(2).replace('.', ',')}`;
    }
}

describe('Money Value Object', () => {
    
    describe('Constructor', () => {
        // Data Provider para construção válida
        const validConstructorData = [
            [100, 'BRL'],
            [50.5, 'USD'],
            [0, 'EUR'],
            [999.99, 'BRL']
        ];

        withDataProvider(validConstructorData, 'should create Money with valid inputs', (amount, currency) => {
            const money = new Money(amount, currency);
            expect(money.getAmount()).toBe(amount);
            expect(money.getCurrency()).toBe(currency);
        });

        // Data Provider para validação
        const invalidAmounts = [null, undefined, -10, NaN];
        
        withValidationProvider(invalidAmounts, 'Constructor validation', (invalidAmount) => {
            new Money(invalidAmount, 'BRL');
        });
    });

    describe('String Representation', () => {
        const formatData = [
            [100, 'BRL', 'R$ 100,00'],
            [50.5, 'USD', '$ 50,50'],
            [25.75, 'EUR', '€ 25,75']
        ];

        withDataProvider(formatData, 'should format correctly', (amount, currency, expected) => {
            const money = new Money(amount, currency);
            expect(money.toString()).toBe(expected);
        });
    });
});