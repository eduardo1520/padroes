# 🛒 Shopping Cart - Strategy Pattern + Hexagonal Architecture

Um projeto completo demonstrando a implementação do **Strategy Pattern** integrado com **Arquitetura Hexagonal**, criando um sistema de carrinho de compras flexível e extensível.

## 🎯 Visão Geral

Este projeto é uma demonstração prática de como combinar padrões de design e arquitetura de software para criar aplicações robustas, testáveis e de fácil manutenção. O sistema simula um carrinho de compras com diferentes estratégias de desconto, permitindo comparar automaticamente qual estratégia oferece o melhor preço final.

## 🏗️ Arquitetura

### Strategy Pattern
O padrão Strategy é usado para encapsular diferentes algoritmos de cálculo de desconto:

- **Contexto**: `ShoppingCart` - gerencia itens e aplica estratégias de desconto
- **Estratégias**: Diferentes tipos de desconto (Sem desconto, 10%, 20%)
- **Interface**: `DiscountStrategy` - define o contrato para estratégias

### Arquitetura Hexagonal (Ports & Adapters)

```
┌─────────────────────────────────────────────┐
│            Infraestrutura                   │
│  ┌─────────────┐       ┌─────────────┐     │
│  │   Inbound   │       │  Outbound   │     │
│  │  Adapters   │       │  Adapters   │     │
│  │             │       │             │     │
│  │    CLI      │       │  Discount   │     │
│  │             │       │ Strategies  │     │
│  └──────┬──────┘       └──────┬──────┘     │
│         │                     │             │
└─────────┼─────────────────────┼─────────────┘
          │                     │
┌─────────▼─────────────────────▼─────────────┐
│            Aplicação (Use Cases)            │
│                                             │
│  - ProcessCartCheckoutUseCase               │
│  - Orquestração de regras de negócio        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Domínio (Core Business)             │
│                                             │
│  - ShoppingCart                             │
│  - CartItem                                 │
│  - Regras de negócio puras                  │
└─────────────────────────────────────────────┘
```

**Camadas:**
- **Domínio**: Entidades e regras de negócio puras, independentes de frameworks
- **Aplicação**: Casos de uso e orquestração da lógica de negócio
- **Infraestrutura**: Adaptadores para CLI, persistência e configuração

## 📁 Estrutura do Projeto

```
shopping-cart/
├── src/
│   ├── domain/                          # Núcleo do negócio
│   │   ├── entities/
│   │   │   ├── CartItem.js             # Entidade de item do carrinho
│   │   │   └── ShoppingCart.js         # Entidade carrinho de compras
│   │   └── ports/
│   │       ├── inbound/
│   │       │   └── ProcessCartCheckout.js  # Interface do caso de uso
│   │       └── outbound/
│   │           ├── CartRepository.js    # Interface do repositório
│   │           └── DiscountStrategy.js  # Interface das estratégias
│   │
│   ├── application/                     # Casos de uso
│   │   └── usecases/
│   │       └── ProcessCartCheckoutUseCase.js  # Implementação do caso de uso
│   │
│   └── infrastructure/                  # Adaptadores
│       ├── adapters/
│       │   ├── inbound/
│       │   │   └── cli/
│       │   │       ├── CLIAdapter.js    # Interface de linha de comando
│       │   │       └── CLIParser.js     # Parser de argumentos
│       │   └── outbound/
│       │       ├── discount/
│       │       │   ├── NoDiscountAdapter.js      # Sem desconto
│       │       │   ├── TenPercentAdapter.js      # 10% desconto
│       │       │   └── TwentyPercentAdapter.js   # 20% desconto
│       │       └── persistence/
│       │           └── InMemoryCartRepository.js  # Repositório em memória
│       └── config/
│           └── DependencyInjection.js   # Container de DI
│
├── app.js                               # Ponto de entrada
├── debug-test.js                        # Testes de debug
├── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 14+ instalado

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd shopping-cart

# Instalar dependências (se houver)
npm install
```

### Execução Básica

```bash
# Executar com configurações padrão
node app.js
```

### Execução com Parâmetros

```bash
# Itens personalizados
node app.js --items 200,150,75,25

# Carrinho personalizado
node app.js --cart-id meuCarrinho --items 300,100

# Tipos de desconto específicos
node app.js --items 100,50,25 --discounts NONE,TEN_PERCENT

# Modo silencioso (menos detalhes)
node app.js --items 100,50,25 --quiet

# Ver todas as opções
node app.js --help
```

## 📋 Opções da CLI

| Opção | Descrição | Padrão | Exemplo |
|-------|-----------|--------|---------|
| `--cart-id <id>` | ID único do carrinho | `default-cart` | `--cart-id meuCarrinho` |
| `--items <preços>` | Lista de preços separados por vírgula | `100,50,75,30` | `--items 200,150,75,25` |
| `--discounts <tipos>` | Tipos de desconto a testar | Todos | `--discounts NONE,TEN_PERCENT` |
| `--quiet` | Modo silencioso (oculta detalhes) | `false` | `--quiet` |
| `--help` | Exibe mensagem de ajuda | - | `--help` |

### 🔄 Tipos de Desconto Disponíveis

- **NONE**: Sem desconto (preço integral)
- **TEN_PERCENT**: 10% de desconto sobre o total
- **TWENTY_PERCENT**: 20% de desconto sobre o total

## 📊 Exemplo de Saída

### Modo Detalhado (Padrão)
```
🛒 PROCESSANDO CARRINHO: default-cart
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 ITENS DO CARRINHO:
  • Item 1: R$ 100.00
  • Item 2: R$ 50.00
  • Item 3: R$ 75.00
  • Item 4: R$ 30.00

💰 Subtotal: R$ 255.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 TESTANDO ESTRATÉGIAS DE DESCONTO:

✓ Sem desconto
  Desconto: R$ 0.00 (0%)
  Total: R$ 255.00

✓ 10% de desconto
  Desconto: R$ 25.50 (10%)
  Total: R$ 229.50

✓ 20% de desconto
  Desconto: R$ 51.00 (20%)
  Total: R$ 204.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ MELHOR OPÇÃO:

🏆 20% de desconto
💵 Total: R$ 204.00
💎 Economia: R$ 51.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Modo Silencioso (--quiet)
```
✨ MELHOR OPÇÃO: 20% de desconto
💵 Total: R$ 204.00
💎 Economia: R$ 51.00
```

## 🧪 Testes

O projeto possui uma suíte completa de testes automatizados usando **Jasmine 4.6.0**.

### Configuração de Testes

- **Framework**: Jasmine 4.6.0
- **Tipo**: ES Modules com suporte experimental
- **Cobertura**: Testes unitários e de integração
- **Total**: 12 testes implementados

### Scripts de Teste Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (observa mudanças)
npm run test:watch

# Executar apenas testes de entidade
npm run test:entity

# Executar apenas testes de integração
npm run test:integration
```
# Com cobertura
npm run test:coverage

# Testes específicos
npm run test:unit
npm run test:integration
```

### **Cobertura Esperada:**
- **Statements**: >= 90%
- **Branches**: >= 85%
- **Functions**: >= 90%
- **Lines**: >= 90%

### Estrutura dos Testes

#### 🔧 Testes de Entidade (`ShoppingCartSpec.js`)
- ✅ Criação de carrinho com ID válido
- ✅ Adição de itens (formato antigo e novo)
- ✅ Adição de múltiplos itens
- ✅ Cálculo de total sem desconto
- ✅ Tratamento de carrinho vazio
- ✅ Integração com Value Objects

#### 🔗 Testes de Integração (`CartUseCaseSpec.js`)
- ✅ Adição de item e persistência do carrinho
- ✅ Adição de múltiplos itens no mesmo carrinho
- ✅ Cálculo de total sem desconto
- ✅ Cálculo de total com 10% de desconto
- ✅ Cálculo de total com 20% de desconto
- ✅ **Data Providers**: Testes parametrizados e validação

### **Exemplo de Data Provider**
```javascript
const discountStrategies = [
    ['No Discount', new NoDiscount(), [100, 50], 150],
    ['10% Discount', new TenPercentDiscount(), [100, 50], 135],
    ['20% Discount', new TwentyPercentDiscount(), [200], 160]
];

withDataProvider(discountStrategies, 'should apply discount', (name, strategy, items, expected) => {
    const cart = new ShoppingCart(strategy);
    items.forEach(price => cart.addItem(price));
    expect(cart.getTotal()).toBe(expected);
});
```

### Exemplo de Saída dos Testes

```bash
> npm test

Randomized with seed 04907 (jasmine --random=true --seed=04907)
Started
............

12 specs, 0 failures
Finished in 0.008 seconds
```

### Executando Testes Específicos

```bash
# Testar apenas uma spec específica
npx jasmine spec/domain/entities/ShoppingCartSpec.js

# Testar com seed específica para reproduzir resultados
npx jasmine --random=true --seed=04907
```

Os testes verificam:
- Criação e manipulação de itens do carrinho
- Cálculo correto de descontos
- Aplicação de diferentes estratégias
- Identificação da melhor opção

## 🚨 **Troubleshooting**

### **Erro de Versão NPM:**
```bash
# Se der erro de compatibilidade
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **Problemas Windows vs Ubuntu:**
```bash
# Configurar shell no Windows
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"

# Ou usar NPX diretamente
npx jasmine
```

### **Erro de Módulos:**
```bash
# Verificar se está usando ES6 modules
# package.json deve ter: "type": "module"
```

## 🔧 Tecnologias e Ferramentas

- **Node.js** - Runtime JavaScript
- **ES6 Modules** - Sistema de módulos moderno do JavaScript
- **Design Patterns**: Strategy Pattern para algoritmos intercambiáveis
- **Arquitetura**: Hexagonal Architecture (Ports & Adapters)
- **Princípios SOLID**: Código limpo e manutenível
- **Jasmine**: Framework de testes
- **c8**: Cobertura de código

## 📚 Conceitos Demonstrados

### Strategy Pattern
- **Flexibilidade**: Fácil adição de novos tipos de desconto sem modificar código existente
- **Encapsulamento**: Cada estratégia é independente e auto-contida
- **Polimorfismo**: Interface comum para todas as estratégias
- **Runtime Selection**: Seleção dinâmica da estratégia em tempo de execução

### Arquitetura Hexagonal
- **Separação de Responsabilidades**: Domínio isolado completamente da infraestrutura
- **Testabilidade**: Fácil criação de mocks e testes unitários
- **Flexibilidade**: Troca de adaptadores sem afetar o núcleo do negócio
- **Inversão de Dependência**: Domínio não depende da infraestrutura
- **Portas e Adaptadores**: Interfaces bem definidas entre camadas

### Princípios SOLID

- **SRP** (Single Responsibility): Cada classe tem uma responsabilidade única e bem definida
- **OCP** (Open/Closed): Aberto para extensão (novos descontos), fechado para modificação
- **LSP** (Liskov Substitution): Estratégias são intercambiáveis
- **ISP** (Interface Segregation): Interfaces específicas e focadas
- **DIP** (Dependency Inversion): Dependência de abstrações, não de implementações concretas

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Strategy Pattern para descontos flexíveis
- [x] Arquitetura Hexagonal completa
- [x] CLI interativo com múltiplos parâmetros
- [x] Repositório em memória para persistência
- [x] Container de injeção de dependências
- [x] Cálculo automático da melhor opção de desconto
- [x] Resumo detalhado dos resultados com formatação
- [x] Tratamento robusto de erros
- [x] Modo silencioso para integração
- [x] Sistema de ajuda completo
- [x] Formatação de valores monetários
- [x] Validação de entrada de dados
- [x] Adicionar cobertura de código

### 🔮 Possíveis Extensões
- [ ] Persistência em banco de dados
- [ ] API REST
- [ ] Interface Web
- [ ] Descontos progressivos por quantidade
- [ ] Cupons de desconto
- [ ] Histórico de compras
- [ ] Relatórios e analytics
- [ ] Integração com gateway de pagamento
- [ ] Implementar persistência em banco de dados
- [ ] Adicionar API REST
- [ ] Implementar autenticação
- [ ] Adicionar mais estratégias de desconto
- [ ] Implementar sistema de cupons
- [ ] Adicionar cobertura de código
- [ ] Implementar testes E2E
- [ ] Implementar métricas de performance

## 🚀 Extensibilidade

### Como Adicionar Novo Tipo de Desconto

1. **Criar o Adapter**
```javascript
// src/infrastructure/adapters/outbound/discount/FifteenPercentAdapter.js
export class FifteenPercentAdapter {
    getName() {
        return '15% de desconto';
    }
    
    calculate(subtotal) {
        const discount = subtotal * 0.15;
        return {
            discount,
            total: subtotal - discount,
            percentage: 15
        };
    }
}
```

2. **Registrar no DI Container**
```javascript
// src/infrastructure/config/DependencyInjection.js
import { FifteenPercentAdapter } from '../adapters/outbound/discount/FifteenPercentAdapter.js';

this.discountStrategies = {
    // ... estratégias existentes
    FIFTEEN_PERCENT: new FifteenPercentAdapter()
};
```

3. **Usar na CLI**
```bash
node app.js --items 100,50 --discounts FIFTEEN_PERCENT,TWENTY_PERCENT
```

### Como Adicionar Nova Interface (ex: API REST)

1. **Criar Adapter Inbound**
```javascript
// src/infrastructure/adapters/inbound/api/ExpressAdapter.js
export class ExpressAdapter {
    constructor(useCase) {
        this.useCase = useCase;
    }
    
    setupRoutes(app) {
        app.post('/cart/checkout', async (req, res) => {
            const result = await this.useCase.execute(req.body);
            res.json(result);
        });
    }
}
```

2. **Configurar no DI**
```javascript
// src/infrastructure/config/DependencyInjection.js
const apiAdapter = new ExpressAdapter(useCase);
```

### Como Trocar Persistência

1. **Implementar Novo Repositório**
```javascript
// src/infrastructure/adapters/outbound/persistence/MongoCartRepository.js
import { CartRepository } from '../../../../domain/ports/outbound/CartRepository.js';

export class MongoCartRepository extends CartRepository {
    async save(cart) {
        // Implementação com MongoDB
    }
    
    async findById(id) {
        // Implementação com MongoDB
    }
}
```

2. **Substituir no DI**
```javascript
// src/infrastructure/config/DependencyInjection.js
import { MongoCartRepository } from '../adapters/outbound/persistence/MongoCartRepository.js';

const cartRepository = new MongoCartRepository();
```


## 🎪 **Benefícios**

✅ **Flexibilidade**: Fácil adição de novas estratégias  
✅ **Testabilidade**: Data Providers facilitam testes  
✅ **Validação**: Value Objects garantem integridade  
✅ **Manutenibilidade**: Código bem estruturado  
✅ **Reutilização**: Componentes desacoplados  

---

## 💡 Casos de Uso

Este projeto é ideal para:

- **Aprendizado**: Estudar design patterns e arquitetura de software
- **Portfolio**: Demonstrar conhecimento em boas práticas
- **Base para Projetos**: Template para sistemas de e-commerce
- **Entrevistas**: Discussão sobre arquitetura e design
- **Workshops**: Ensinar conceitos de Clean Architecture

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 👨‍💻 Autor

Desenvolvido como demonstração prática de Design Patterns e Arquitetura Hexagonal.

**Objetivos do Projeto:**
- Demonstrar implementação prática do Strategy Pattern
- Exemplificar Arquitetura Hexagonal em Node.js
- Aplicar princípios SOLID
- Criar código limpo, testável e manutenível

## 📄 Licença

ISC License - Sinta-se livre para usar este código como base para seus projetos.

## 📚 Referências e Leituras Recomendadas

- **Design Patterns**: "Design Patterns: Elements of Reusable Object-Oriented Software" - Gang of Four
- **Clean Architecture**: "Clean Architecture" - Robert C. Martin
- **Hexagonal Architecture**: "Hexagonal Architecture" - Alistair Cockburn
- **SOLID Principles**: "Clean Code" - Robert C. Martin

## 🔗 Links Úteis

- [Node.js Documentation](https://nodejs.org/)
- [ES6 Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Strategy Pattern](https://refactoring.guru/design-patterns/strategy)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

## 📚 Referências

- [Arquitetura Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)
- [Strategy Pattern](https://refactoring.guru/design-patterns/strategy)
- [Node.js Documentation](https://nodejs.org/)
- [Jasmine Testing Framework](https://jasmine.github.io/)

---

⭐⭐Desenvolvido com ❤️ usando Arquitetura Hexagonal e Strategy Pattern**