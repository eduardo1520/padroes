export default class InMemoryCartRepository {
    constructor() {
        this.carts = new Map();
    }

    async save(cart) {
        this.carts.set(cart.getId(), cart);  // ✅ Usar cart.getId()
        return cart;
    }

    async findById(id) {
        return this.carts.get(id) || null;
    }
}