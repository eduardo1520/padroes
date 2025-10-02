type Currency = 'BRL' | 'USD' | 'EUR';
export default class Money {
    private amount;
    private currency;
    constructor(amount: number, currency?: Currency);
    toString(): string;
    add(other: Money): Money;
    multiply(factor: number): Money;
    subtract(other: Money): Money;
    getAmount(): number;
    getCurrency(): Currency;
}
export {};
//# sourceMappingURL=Money.d.ts.map