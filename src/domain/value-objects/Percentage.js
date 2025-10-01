export default class Percentage {
    constructor(value) {
        if (typeof value !== 'number' || value < 0 || value > 100) {
            throw new Error('Percentage must be between 0 and 100');
        }
        this.value = value;
    }

    applyTo(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Amount must be a number');
        }
        return amount * (this.value / 100);
    }

    toString() {
        return `${this.value}%`;
    }
}