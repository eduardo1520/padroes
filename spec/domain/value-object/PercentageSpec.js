class Percentage {
    constructor(value) {
        // ✅ Primeiro verifica se é um número válido
        if (typeof value !== 'number' || value < 0 || value > 100 || value == null || isNaN(value)) {
            throw new Error('Percentage must be between 0 and 100');
        }
        this.value = value;
    }
    
    // ... existing code ...
}