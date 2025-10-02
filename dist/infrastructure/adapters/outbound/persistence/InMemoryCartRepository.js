export default class InMemoryCartRepository {
    carts = new Map();
    async save(cart) {
        this.carts.set(cart.getId(), cart);
        return cart;
    }
    async findById(id) {
        return this.carts.get(id) || null;
    }
}
//# sourceMappingURL=InMemoryCartRepository.js.map