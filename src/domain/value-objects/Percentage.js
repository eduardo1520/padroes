
/**
 * Item de carrinho com validações e total calculado.
 * @class
 */
export default class Percentage {
    /**
     * @param {number} value - O valor da porcentagem.
     */
    constructor(value) {
        if (typeof value !== 'number' || value < 0 || value > 100) {
            throw new Error('Percentage must be between 0 and 100');
        }
        this.value = value;
    }

    /**
     * Aplica a porcentagem ao valor fornecido.
     * @param {number} amount - O valor ao qual a porcentagem será aplicada.
     * @returns {number} - O valor resultante após a aplicação da porcentagem.
     */
    applyTo(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Amount must be a number');
        }
        return amount * (this.value / 100);
    }

    /**
     * Retorna uma representação em string da porcentagem.
     * @returns {string} - A representação em string da porcentagem.
     */
    toString() {
        return `${this.value}%`;
    }
}