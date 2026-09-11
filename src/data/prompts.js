/**
 * Prompts prontos para colar em um agente de IA (Claude, ChatGPT ou similar).
 *
 * Cada prompt é escrito uma vez aqui e reaproveitado em dois lugares: dentro
 * dos artigos, no ponto em que ele é útil, e na biblioteca da aba Dicas.
 * Os trechos entre colchetes devem ser trocados pelas informações da base.
 */

export const prompts = {
  'refinar-pergunta': {
    titulo: 'Transformar a pergunta em problema de ML',
    grupo: 'Planejar',
    texto:
      'Sou estudante de engenharia e estou começando em machine learning.\n\nTenho um CSV de sensores IoT com estas colunas:\n[cole aqui o cabeçalho do arquivo, a primeira linha do CSV]\n\nQuero responder a seguinte pergunta: [escreva sua pergunta em linguagem comum].\n\nMe ajude a transformar isso em um problema de machine learning bem definido:\n1. Diga se é classificação ou regressão e por quê.\n2. Indique qual coluna deve ser o alvo e quais colunas fazem sentido como entrada.\n3. Aponte se alguma coluna entrega a resposta de forma indevida e deveria ficar de fora.\n4. Sugira qual métrica de avaliação combina com esse problema e o que seria um valor razoável.\n\nResponda de forma direta, sem código por enquanto.',
  },

  'carregar-dados': {
    titulo: 'Carregar e conhecer os dados',
    grupo: 'Explorar',
    texto:
      'Estou no Google Colab e acabei de subir um arquivo chamado [nome_do_arquivo].csv.\n\nGere um código Python, em uma única célula, que:\n1. Carregue o CSV com pandas.\n2. Mostre as cinco primeiras linhas.\n3. Imprima o total de linhas e colunas.\n4. Liste o tipo de cada coluna e a quantidade de valores ausentes.\n5. Mostre estatísticas básicas das colunas numéricas.\n6. Se houver uma coluna de categoria chamada [nome_da_coluna_alvo], conte quantos exemplos existem de cada valor.\n\nComente cada bloco em português e não use bibliotecas além de pandas.',
  },

  visualizar: {
    titulo: 'Visualizar antes de modelar',
    grupo: 'Explorar',
    texto:
      'Com o mesmo DataFrame carregado, gere um código que crie três gráficos simples com matplotlib:\n1. A evolução de [coluna_principal] ao longo do tempo, se existir coluna de data.\n2. Um histograma da coluna alvo [nome_da_coluna_alvo].\n3. Um gráfico de dispersão entre [coluna_a] e [coluna_b], colorido pela coluna alvo.\n\nUse um gráfico por figura, com título e nome dos eixos em português. Depois do código, escreva em três frases o que eu devo observar em cada figura.',
  },

  'treinar-classificador': {
    titulo: 'Treinar um classificador',
    grupo: 'Treinar',
    texto:
      'Sou estudante de engenharia, tenho pouca experiência com Python e quero treinar meu primeiro modelo de classificação.\n\nArquivo: [nome_do_arquivo].csv, já carregado no Colab.\nColunas: [cole o cabeçalho do CSV]\nColuna alvo: [nome_da_coluna_alvo]\nColunas que devem ficar de fora: [liste as colunas que entregam a resposta, se houver]\n\nGere um código completo, em uma célula só, que:\n1. Separe as variáveis de entrada e a coluna alvo.\n2. Converta colunas de texto em números com codificação apropriada.\n3. Divida os dados em treino e teste com 80% e 20%, usando random_state=42.\n4. Treine uma árvore de decisão com profundidade máxima 5 usando scikit-learn.\n5. Imprima acurácia, precisão, recall e a matriz de confusão no conjunto de teste.\n6. Mostre a importância de cada variável, em ordem decrescente.\n\nUse apenas pandas, scikit-learn e matplotlib. Comente o código em português, linha por linha, como se explicasse para alguém que nunca usou scikit-learn.',
  },

  'treinar-regressor': {
    titulo: 'Treinar um regressor',
    grupo: 'Treinar',
    texto:
      'Quero prever um valor numérico a partir de dados de sensores.\n\nArquivo: [nome_do_arquivo].csv, já carregado no Colab.\nColunas: [cole o cabeçalho do CSV]\nColuna alvo: [nome_da_coluna_alvo]\n\nGere um código Python completo que:\n1. Prepare os dados, tratando colunas de texto e removendo o que não deve entrar no modelo.\n2. Divida treino e teste em 80% e 20% com random_state=42.\n3. Treine dois modelos para comparar: uma regressão linear e uma floresta aleatória com 100 árvores.\n4. Imprima erro absoluto médio, raiz do erro quadrático médio e R² dos dois modelos, lado a lado.\n5. Faça um gráfico com valor real no eixo X e valor previsto no eixo Y, com a linha de acerto perfeito para referência.\n\nExplique em português o que cada métrica significa em unidades do problema. Se a coluna de tempo importar, avise se eu deveria dividir treino e teste respeitando a ordem cronológica.',
  },

  'corrigir-erro': {
    titulo: 'Corrigir um erro de execução',
    grupo: 'Corrigir',
    texto:
      'Rodei o código que você gerou no Google Colab e apareceu este erro:\n\n[cole aqui a mensagem de erro completa, incluindo o traceback]\n\nO código executado foi:\n\n[cole aqui o código que falhou]\n\nMe explique em uma frase simples o que causou o erro, depois entregue a versão corrigida da célula inteira. Não mude a lógica do que eu pedi, corrija apenas o necessário.',
  },

  'bom-demais': {
    titulo: 'Resultado bom demais para ser verdade',
    grupo: 'Corrigir',
    texto:
      'Meu modelo atingiu [valor da métrica] no conjunto de teste, o que me pareceu alto demais para um problema real.\n\nColunas usadas como entrada: [liste as colunas]\nColuna alvo: [nome_da_coluna_alvo]\n\nVerifique se existe vazamento de informação, ou seja, alguma variável de entrada que contenha a resposta de forma direta ou indireta. Liste as colunas suspeitas, explique o motivo de cada suspeita e mostre o código corrigido sem elas.',
  },

  'traduzir-metricas': {
    titulo: 'Traduzir métricas para linguagem de engenharia',
    grupo: 'Interpretar',
    texto:
      'Meu modelo de [classificação ou regressão] sobre dados de sensores produziu estes resultados:\n\n[cole aqui a saída com as métricas e a matriz de confusão]\n\nA aplicação real seria: [descreva em uma frase, por exemplo avisar a manutenção antes de o motor parar].\n\nMe ajude a interpretar:\n1. O que cada número significa na prática, em unidades do meu problema.\n2. Qual tipo de erro o modelo comete mais e qual seria a consequência no campo.\n3. Se esse desempenho é suficiente para uso real ou apenas para demonstração.\n4. Duas mudanças concretas que melhorariam o resultado, da mais simples para a mais trabalhosa.\n\nEvite jargão. Escreva para alguém de engenharia eletrônica que não trabalha com machine learning.',
  },

  'variaveis-importantes': {
    titulo: 'Entender as variáveis que mais pesam',
    grupo: 'Interpretar',
    texto:
      'A importância das variáveis do meu modelo ficou assim:\n\n[cole aqui a lista de variáveis e seus pesos]\n\nO sistema medido é [descreva o cenário físico em uma frase].\n\nExplique se essa ordem faz sentido do ponto de vista físico, aponte qualquer resultado que pareça estranho e sugira uma variável nova que eu poderia calcular a partir das colunas que já tenho, explicando o motivo.',
  },

  'modelo-vs-limiar': {
    titulo: 'Comparar o modelo com um limiar manual',
    grupo: 'Interpretar',
    texto:
      'Quero comparar meu modelo de machine learning com a lógica tradicional de limiar que um engenheiro eletrônico escreveria na mão.\n\nDados: [nome_do_arquivo].csv\nAlvo: [nome_da_coluna_alvo]\nRegra manual que eu usaria: [descreva a regra, por exemplo alertar sempre que vibracao_rms_mm_s for maior que 4.5]\n\nGere um código que:\n1. Implemente essa regra como uma função simples.\n2. Avalie a regra no mesmo conjunto de teste usado pelo modelo.\n3. Monte uma tabela comparando acurácia, precisão e recall das duas abordagens.\n4. Mostre um exemplo concreto de caso em que o modelo acerta e a regra erra, e outro no sentido contrário.\n\nDepois do código, escreva um parágrafo curto sobre quando vale a pena usar cada abordagem em um produto embarcado.',
  },

  'levar-ao-esp32': {
    titulo: 'Levar o modelo para o microcontrolador',
    grupo: 'Hardware',
    texto:
      'Treinei uma árvore de decisão com scikit-learn usando dados de sensores e quero rodar essa decisão dentro de um ESP32, sem Python.\n\nMe explique o caminho mais simples:\n1. Como exportar as regras da árvore para código C.\n2. Como calcular no firmware as mesmas variáveis que usei no treino.\n3. Quanta memória essa solução ocupa, em ordem de grandeza.\n4. Quais cuidados tomar para que o resultado no ESP32 bata com o resultado do notebook.\n\nSe existir uma biblioteca que já faça essa conversão, cite o nome e mostre um exemplo curto.',
  },
};

/** Ordem em que os grupos aparecem na biblioteca da aba Dicas. */
export const gruposPrompt = ['Planejar', 'Explorar', 'Treinar', 'Corrigir', 'Interpretar', 'Hardware'];

export const listaPrompts = Object.entries(prompts).map(([id, p]) => ({ id, ...p }));
