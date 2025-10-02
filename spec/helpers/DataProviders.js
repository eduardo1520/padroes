/**
 * Data Providers Helper para Jasmine
 * Simula o comportamento do PHPUnit @dataProvider
 */

/**
 * Executa testes com múltiplos conjuntos de dados
 * @param {Array<any>} dataProvider - Array de dados para teste
 * @param {string} description - Descrição do teste
 * @param {Function} testFunction - Função de teste a ser executada
 */
export function withDataProvider(dataProvider, description, testFunction) {
    dataProvider.forEach((data, index) => {
        const testDescription = Array.isArray(data) 
            ? `${description} - Case ${index + 1}: [${data.join(', ')}]`
            : `${description} - Case ${index + 1}: ${JSON.stringify(data)}`;
            
        it(testDescription, () => {
            if (Array.isArray(data)) {
                testFunction(...data);
            } else {
                testFunction(data);
            }
        });
    });
}

/**
 * Cria um data provider com nomes personalizados
 * @param {Object} namedData - Objeto com chave sendo o nome e valor sendo os dados
 * @param {string} description - Descrição base do teste
 * @param {Function} testFunction - Função de teste
 */
export function withNamedDataProvider(namedData, description, testFunction) {
    Object.entries(namedData).forEach(([name, data]) => {
        it(`${description} - ${name}`, () => {
            if (Array.isArray(data)) {
                testFunction(...data);
            } else {
                testFunction(data);
            }
        });
    });
}

/**
 * Data provider para testes de validação
 * @param {Array<any>} invalidInputs - Array de inputs inválidos    
 * @param {string} description - Descrição do teste
 * @param {Function} testFunction - Função que deve lançar erro
 */
export function withValidationProvider(invalidInputs, description, testFunction) {
    invalidInputs.forEach((input, index) => {
        const inputDescription = input === null ? 'null' 
            : input === undefined ? 'undefined'
            : typeof input === 'string' && input === '' ? 'empty string'
            : `${typeof input}: ${JSON.stringify(input)}`;
            
        it(`${description} - should reject ${inputDescription}`, () => {
            expect(() => testFunction(input)).toThrow();
        });
    });
}