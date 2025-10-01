// 🎯 Imports corretos da arquitetura hexagonal (src/)
import ShoppingCart from './src/domain/entities/ShoppingCart.js';
import CartItem from './src/domain/value-objects/CartItem.js';
import Money from './src/domain/value-objects/Money.js';
import NoDiscountAdapter from './src/infrastructure/adapters/NoDiscountAdapter.js';
import TenPercentDiscountAdapter from './src/infrastructure/adapters/TenPercentDiscountAdapter.js';
import TwentyPercentDiscountAdapter from './src/infrastructure/adapters/TwentyPercentDiscountAdapter.js';

// 🎯 Capturar argumentos da linha de comando
const args = process.argv.slice(2);

// 📋 Função para processar argumentos
function parseArguments(args) {
    const config = {
        items: [],
        discount: 'none'
    };
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        // Suporte para --items 200,150,75,25
        if (arg === '--items' && args[i + 1]) {
            const itemsString = args[i + 1];
            const prices = itemsString.split(',').map(price => parseFloat(price.trim()));
            config.items = prices.filter(price => !isNaN(price) && price > 0);
            i++; // Pular próximo argumento
        }
        
        // Suporte para --item 100 (individual)
        if (arg === '--item' && args[i + 1]) {
            const price = parseFloat(args[i + 1]);
            if (!isNaN(price) && price > 0) {
                config.items.push(price);
            }
            i++;
        }
        
        // Suporte para --discount 10
        if (arg === '--discount' && args[i + 1]) {
            config.discount = args[i + 1];
            i++;
        }
    }
    
    return config;
}

// 🎪 Função para criar estratégia de desconto
function createDiscountStrategy(discountType) {
    switch (discountType.toLowerCase()) {
        case '10':
        case 'ten':
            return new TenPercentDiscountAdapter();
        case '20':
        case 'twenty':
            return new TwentyPercentDiscountAdapter();
        case 'none':
        case 'no':
        default:
            return new NoDiscountAdapter();
    }
}

// 🚀 Função principal
function main() {
    console.log('🎪 Shopping Cart - Hexagonal Architecture Demo\n');
    
    // Se não há argumentos, mostrar exemplos padrão
    if (args.length === 0) {
        console.log('📋 Executando exemplos padrão...\n');
        runDefaultExamples();
        return;
    }
    
    // Processar argumentos
    const config = parseArguments(args);
    
    if (config.items.length === 0) {
        console.log('❌ Nenhum item válido fornecido!');
        showUsage();
        return;
    }
    
    // Criar carrinho com estratégia
    const discountStrategy = createDiscountStrategy(config.discount);
    const cart = new ShoppingCart(discountStrategy);
    
    // Adicionar itens (CORRIGIDO: criar CartItem objects)
    console.log('➕ Adicionando itens:');
    config.items.forEach((price, index) => {
        // Criar CartItem com Money object
        const money = new Money(price, 'BRL');
        const item = new CartItem(`Item ${index + 1}`, money, 1);
        cart.addItem(item);
        // 🔧 CORREÇÃO: usar item.name em vez de item.getName()
        console.log(`   ${item.name}: R$ ${price.toFixed(2)}`);
    });
    
    // Mostrar resultado
    const total = cart.calculateTotal();
    
    console.log(`\n🎯 Desconto aplicado: ${config.discount}`);
    // 🔧 CORREÇÃO FINAL: calculateTotal() retorna número, não objeto Money
    console.log(`✅ Total Final: R$ ${total.toFixed(2)}`);
}

// 📚 Exemplos padrão (quando não há parâmetros)
function runDefaultExamples() {
    // Exemplo 1: 10% de desconto
    const cart1 = new ShoppingCart(new TenPercentDiscountAdapter());
    const item1 = new CartItem("Produto A", new Money(100, 'BRL'), 1);
    const item2 = new CartItem("Produto B", new Money(50, 'BRL'), 1);
    cart1.addItem(item1);
    cart1.addItem(item2);
    
    console.log('🎯 Exemplo 1 - Desconto 10%:');
    console.log(`   ${item1.name}: R$ 100, ${item2.name}: R$ 50`);
    // 🔧 CORREÇÃO: calculateTotal() retorna número direto
    console.log('   Total: R$', cart1.calculateTotal().toFixed(2));
    
    // Exemplo 2: 20% de desconto
    const cart2 = new ShoppingCart(new TwentyPercentDiscountAdapter());
    const item3 = new CartItem("Produto C", new Money(200, 'BRL'), 1);
    cart2.addItem(item3);
    
    console.log('\n🎯 Exemplo 2 - Desconto 20%:');
    console.log(`   ${item3.name}: R$ 200`);
    // 🔧 CORREÇÃO: calculateTotal() retorna número direto
    console.log('   Total: R$', cart2.calculateTotal().toFixed(2));
    
    // Exemplo 3: Sem desconto
    const cart3 = new ShoppingCart(new NoDiscountAdapter());
    const item4 = new CartItem("Produto D", new Money(80, 'BRL'), 1);
    cart3.addItem(item4);
    
    console.log('\n🎯 Exemplo 3 - Sem desconto:');
    console.log(`   ${item4.name}: R$ 80`);
    // 🔧 CORREÇÃO: calculateTotal() retorna número direto
    console.log('   Total: R$', cart3.calculateTotal().toFixed(2));
    
    console.log('\n📋 Para usar com parâmetros:');
    showUsage();
}

// 📋 Mostrar instruções de uso
function showUsage() {
    console.log(`
🎮 Uso:
  node app.js --items 200,150,75,25 --discount 10
  node app.js --item 100 --item 50 --discount 20
  node app.js --items 80,120 --discount none

🎯 Parâmetros:
  --items <lista>    Lista de preços separados por vírgula
  --item <preço>     Adicionar item individual (pode repetir)
  --discount <tipo>  Tipo de desconto: none, 10, 20
    `);
}

// Executar aplicação
main();