// 🎯 Imports corretos da arquitetura hexagonal (src/)
import ShoppingCart from './domain/entities/ShoppingCart.js';
import CartItem from './domain/value-objects/CartItem.js';
import Money from './domain/value-objects/Money.js';
import DependencyInjection from './infrastructure/config/DependencyInjection.js';
import CartCLI from './infrastructure/adapters/inbound/cli/CartCLI.js';

// 🎯 Implementação correta dos adapters de desconto
class NoDiscountAdapter {
    calculateDiscount(total: number) {
        return 0; // Sem desconto
    }
}

class TenPercentDiscountAdapter {
    calculateDiscount(total: number) {
        return total * 0.10; // 10% do total
    }
}

class TwentyPercentDiscountAdapter {
    calculateDiscount(total: number) {
        return total * 0.20; // 20% do total
    }
}

// 🎯 Capturar argumentos da linha de comando
const args = process.argv.slice(2);

// 📋 Função para processar argumentos
function parseArguments(args: string[]) {
    const config = {
        items: [] as number[],
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

// 🚡 Função para criar estratégia de desconto
function createDiscountStrategy(discountType: string) {
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
    const cart = new ShoppingCart(`cart-${Date.now()}`); // Adding a dynamic ID
    
    // Adicionar itens
    console.log('➕ Adicionando itens:');
    let subtotal = 0;
    config.items.forEach((price, index) => {
        // Criar CartItem com Money object
        const money = new Money(price, 'BRL');
        const item = new CartItem(`Item ${index + 1}`, money, 1);
        cart.addItem(item);
        subtotal += price;
        console.log(`   ${item.name}: R$ ${price.toFixed(2)}`);
    });
    
    // Calcular desconto manualmente para mostrar detalhes
    const discountAmount = discountStrategy.calculateDiscount(subtotal);
    const total = subtotal - discountAmount;
    
    console.log(`\n📊 Cálculo detalhado:`);
    console.log(`   Subtotal: R$ ${subtotal.toFixed(2)}`);
    console.log(`   Desconto (${config.discount}): -R$ ${discountAmount.toFixed(2)}`);
    console.log(`\n🎯 Desconto aplicado: ${config.discount}`);
    console.log(`✅ Total Final: R$ ${total.toFixed(2)}`);
}

// 📚 Exemplos padrão (quando não há parâmetros)
function runDefaultExamples() {
    console.log('🧮 Teste de Cálculos de Desconto:\n');
    
    // Exemplo específico: 150 com 20% desconto
    console.log('🎯 Exemplo: R$ 150 com 20% desconto');
    const discountStrategy20 = new TwentyPercentDiscountAdapter();
    const discount20 = discountStrategy20.calculateDiscount(150);
    const total20 = 150 - discount20;
    console.log(`   Subtotal: R$ 150.00`);
    console.log(`   Desconto (20%): -R$ ${discount20.toFixed(2)}`);
    console.log(`   Total: R$ ${total20.toFixed(2)}`);
    
    // Exemplo 1: 10% de desconto
    console.log('\n🎯 Exemplo 1 - Desconto 10%:');
    const cart1 = new ShoppingCart('cart-1');
    const item1 = new CartItem("Produto A", new Money(100, 'BRL'), 1);
    const item2 = new CartItem("Produto B", new Money(50, 'BRL'), 1);
    cart1.addItem(item1);
    cart1.addItem(item2);
    
    const subtotal1 = 150;
    const discount1 = new TenPercentDiscountAdapter().calculateDiscount(subtotal1);
    console.log(`   ${item1.name}: R$ 100, ${item2.name}: R$ 50`);
    console.log(`   Subtotal: R$ ${subtotal1.toFixed(2)}`);
    console.log(`   Desconto (10%): -R$ ${discount1.toFixed(2)}`);
    console.log(`   Total: R$ ${(subtotal1 - discount1).toFixed(2)}`);
    
    // Exemplo 2: 20% de desconto
    console.log('\n🎯 Exemplo 2 - Desconto 20%:');
    const cart2 = new ShoppingCart('cart-2');
    const item3 = new CartItem("Produto C", new Money(200, 'BRL'), 1);
    cart2.addItem(item3);
    
    const subtotal2 = 200;
    const discount2 = new TwentyPercentDiscountAdapter().calculateDiscount(subtotal2);
    console.log(`   ${item3.name}: R$ 200`);
    console.log(`   Subtotal: R$ ${subtotal2.toFixed(2)}`);
    console.log(`   Desconto (20%): -R$ ${discount2.toFixed(2)}`);
    console.log(`   Total: R$ ${(subtotal2 - discount2).toFixed(2)}`);
    
    console.log('\n📋 Para usar com parâmetros:');
    showUsage();
}

// 📋 Mostrar instruções de uso
function showUsage() {
    console.log(`
🎮 Uso:
  node dist/main.js --items 150 --discount 20
  node dist/main.js --items 200,150,75,25 --discount 10
  node dist/main.js --item 100 --item 50 --discount 20
  node dist/main.js --items 80,120 --discount none

🎯 Parâmetros:
  --items <lista>    Lista de preços separados por vírgula
  --item <preço>     Adicionar item individual (pode repetir)
  --discount <tipo>  Tipo de desconto: none, 10, 20

💡 Exemplos de cálculo:
  R$ 150 - 20% = R$ 120 (150 - 30)
  R$ 100 - 10% = R$ 90  (100 - 10)
    `);
}

// Executar aplicação
main();