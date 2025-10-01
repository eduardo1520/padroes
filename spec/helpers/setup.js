// Helper para suportar ES modules no Jasmine
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Configurações globais para os testes
global.testConfig = {
    timeout: 5000
};
