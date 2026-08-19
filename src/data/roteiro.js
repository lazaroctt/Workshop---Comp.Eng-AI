/**
 * Conteúdo da aba "Como Realizar o Projeto".
 *
 * O roteiro é dividido em etapas curtas, cada uma com objetivo, tarefas e
 * prompts prontos para colar em um agente de IA. Os textos foram escritos
 * para caber em um encontro de um dia, com folga para dividir em dois.
 */

import {
  Database, HelpCircle, Cloud, Bot, Bug, BarChart3, Scale, Presentation,
} from 'lucide-react';

/** Pré-requisitos que a turma precisa ter em mãos antes da primeira etapa. */
export const preparacao = [
  {
    titulo: 'Um notebook com navegador',
    detalhe: 'Nada é instalado na máquina. Todo o código roda no Google Colab, que abre direto no navegador e já vem com as bibliotecas de machine learning.',
  },
  {
    titulo: 'Conta gratuita em um agente de IA',
    detalhe: 'Claude ou ChatGPT nas versões sem custo dão conta do recado. O plano gratuito basta para gerar e corrigir o código deste case.',
  },
  {
    titulo: 'Uma base CSV baixada',
    detalhe: 'Escolha na aba Fontes de Dados e deixe o arquivo salvo na pasta de downloads. Não é preciso coletar nada com sensor durante o workshop.',
  },
  {
    titulo: 'Dupla ou trio formado',
    detalhe: 'Uma pessoa conduz o agente, a outra acompanha o resultado e anota o que chamou atenção. Trocar de papel no meio do caminho funciona bem.',
  },
];

/** Etapas do case, na ordem em que acontecem no encontro. */
export const etapas = [
  {
    numero: 1,
    id: 'escolher-base',
    titulo: 'Escolher a base de dados',
    duracao: '15 minutos',
    icone: Database,
    objetivo:
      'Sair desta etapa com um arquivo CSV baixado e a certeza de que a turma entendeu o que cada coluna representa.',
    tarefas: [
      'Abra a aba Fontes de Dados e leia o cenário de duas ou três bases antes de decidir.',
      'Use o botão de prévia para ver as primeiras linhas sem precisar abrir nada fora do navegador.',
      'Baixe o CSV escolhido e confira o dicionário de dados, coluna por coluna.',
      'Anote em uma frase o que aquele conjunto mede e por que alguém se importaria com isso.',
    ],
    prompts: [],
    dica:
      'Quem nunca treinou um modelo costuma render mais começando por consumo de energia ou ocupação de sala. Os padrões são visíveis a olho nu, o que ajuda a confiar no resultado depois.',
  },
  {
    numero: 2,
    id: 'formular-pergunta',
    titulo: 'Formular a pergunta',
    duracao: '15 minutos',
    icone: HelpCircle,
    objetivo:
      'Transformar curiosidade em um problema com alvo definido, que um modelo consiga responder e um engenheiro consiga avaliar.',
    tarefas: [
      'Escreva a pergunta em linguagem comum, do jeito que você explicaria para um colega de outra área.',
      'Aponte qual coluna guarda a resposta. Ela vira o alvo do modelo.',
      'Classifique o problema: se a resposta é um número, é regressão; se é uma categoria, é classificação.',
      'Defina o que seria um resultado aceitável antes de treinar qualquer coisa, para não aceitar qualquer número depois.',
    ],
    prompts: [
      {
        titulo: 'Refinar a pergunta com o agente',
        texto:
          'Sou estudante de engenharia e estou começando em machine learning.\n\nTenho um CSV de sensores IoT com estas colunas:\n[cole aqui o cabeçalho do arquivo, a primeira linha do CSV]\n\nQuero responder a seguinte pergunta: [escreva sua pergunta em linguagem comum].\n\nMe ajude a transformar isso em um problema de machine learning bem definido:\n1. Diga se é classificação ou regressão e por quê.\n2. Indique qual coluna deve ser o alvo e quais colunas fazem sentido como entrada.\n3. Aponte se alguma coluna entrega a resposta de forma indevida e deveria ficar de fora.\n4. Sugira qual métrica de avaliação combina com esse problema e o que seria um valor razoável.\n\nResponda de forma direta, sem código por enquanto.',
      },
    ],
    dica:
      'Vale a pena perguntar ao agente se alguma coluna "entrega o jogo". Na base de ocupação, por exemplo, a contagem de pessoas revela a resposta e precisa ficar fora do treino.',
  },
  {
    numero: 3,
    id: 'ambiente',
    titulo: 'Abrir o ambiente e carregar o arquivo',
    duracao: '20 minutos',
    icone: Cloud,
    objetivo:
      'Ter o CSV carregado em um notebook do Colab, com as primeiras linhas na tela e nenhuma instalação pendente.',
    tarefas: [
      'Acesse colab.research.google.com e crie um notebook novo.',
      'Envie o CSV pelo painel de arquivos, no ícone de pasta à esquerda.',
      'Peça ao agente o trecho que carrega o arquivo e mostra as primeiras linhas.',
      'Confirme o total de linhas e colunas. Se o número não bater com o esperado, o separador do arquivo pode estar errado.',
    ],
    prompts: [
      {
        titulo: 'Carregar e conhecer os dados',
        texto:
          'Estou no Google Colab e acabei de subir um arquivo chamado [nome_do_arquivo].csv.\n\nGere um código Python, em uma única célula, que:\n1. Carregue o CSV com pandas.\n2. Mostre as cinco primeiras linhas.\n3. Imprima o total de linhas e colunas.\n4. Liste o tipo de cada coluna e a quantidade de valores ausentes.\n5. Mostre estatísticas básicas das colunas numéricas.\n6. Se houver uma coluna de categoria chamada [nome_da_coluna_alvo], conte quantos exemplos existem de cada valor.\n\nComente cada bloco em português e não use bibliotecas além de pandas.',
      },
      {
        titulo: 'Visualizar antes de modelar',
        texto:
          'Com o mesmo DataFrame carregado, gere um código que crie três gráficos simples com matplotlib:\n1. A evolução de [coluna_principal] ao longo do tempo, se existir coluna de data.\n2. Um histograma da coluna alvo [nome_da_coluna_alvo].\n3. Um gráfico de dispersão entre [coluna_a] e [coluna_b], colorido pela coluna alvo.\n\nUse um gráfico por figura, com título e nome dos eixos em português. Depois do código, escreva em três frases o que eu devo observar em cada figura.',
      },
    ],
    dica:
      'Olhar os gráficos antes de treinar evita perder tempo. Um padrão que salta aos olhos no gráfico quase sempre vira um modelo bom, e a ausência de padrão também é uma informação valiosa.',
  },
  {
    numero: 4,
    id: 'treinar',
    titulo: 'Pedir o código de treino ao agente',
    duracao: '30 minutos',
    icone: Bot,
    objetivo:
      'Obter um script curto que separe treino e teste, ajuste um modelo simples e imprima as métricas escolhidas na etapa 2.',
    tarefas: [
      'Descreva ao agente o arquivo, as colunas e a pergunta definida antes.',
      'Peça explicitamente um modelo simples. Árvore de decisão e regressão logística são suficientes aqui.',
      'Exija que o código imprima as métricas e explique cada linha em português.',
      'Rode a célula e guarde o número obtido. Ele será o ponto de comparação do resto do dia.',
    ],
    prompts: [
      {
        titulo: 'Treinar um classificador',
        texto:
          'Sou estudante de engenharia, tenho pouca experiência com Python e quero treinar meu primeiro modelo de classificação.\n\nArquivo: [nome_do_arquivo].csv, já carregado no Colab.\nColunas: [cole o cabeçalho do CSV]\nColuna alvo: [nome_da_coluna_alvo]\nColunas que devem ficar de fora: [liste as colunas que entregam a resposta, se houver]\n\nGere um código completo, em uma célula só, que:\n1. Separe as variáveis de entrada e a coluna alvo.\n2. Converta colunas de texto em números com codificação apropriada.\n3. Divida os dados em treino e teste com 80% e 20%, usando random_state=42.\n4. Treine uma árvore de decisão com profundidade máxima 5 usando scikit-learn.\n5. Imprima acurácia, precisão, recall e a matriz de confusão no conjunto de teste.\n6. Mostre a importância de cada variável, em ordem decrescente.\n\nUse apenas pandas, scikit-learn e matplotlib. Comente o código em português, linha por linha, como se explicasse para alguém que nunca usou scikit-learn.',
      },
      {
        titulo: 'Treinar um regressor',
        texto:
          'Quero prever um valor numérico a partir de dados de sensores.\n\nArquivo: [nome_do_arquivo].csv, já carregado no Colab.\nColunas: [cole o cabeçalho do CSV]\nColuna alvo: [nome_da_coluna_alvo]\n\nGere um código Python completo que:\n1. Prepare os dados, tratando colunas de texto e removendo o que não deve entrar no modelo.\n2. Divida treino e teste em 80% e 20% com random_state=42.\n3. Treine dois modelos para comparar: uma regressão linear e uma floresta aleatória com 100 árvores.\n4. Imprima erro absoluto médio, raiz do erro quadrático médio e R² dos dois modelos, lado a lado.\n5. Faça um gráfico com valor real no eixo X e valor previsto no eixo Y, com a linha de acerto perfeito para referência.\n\nExplique em português o que cada métrica significa em unidades do problema. Se a coluna de tempo importar, avise se eu deveria dividir treino e teste respeitando a ordem cronológica.',
      },
    ],
    dica:
      'Quando o agente sugere um modelo pesado logo de cara, peça algo mais simples. Modelo simples treina em segundos, erra de forma compreensível e cabe em um microcontrolador depois.',
  },
  {
    numero: 5,
    id: 'rodar',
    titulo: 'Rodar, quebrar e consertar',
    duracao: '30 minutos',
    icone: Bug,
    objetivo:
      'Fazer o script rodar de ponta a ponta e aprender a devolver erros ao agente de um jeito que gera correção rápida.',
    tarefas: [
      'Execute a célula e leia a mensagem de erro até o fim antes de reagir.',
      'Copie o traceback completo para o agente, junto com o trecho de código que falhou.',
      'Aplique a correção, rode de novo e repita até a saída aparecer limpa.',
      'Anote quantas idas e vindas foram necessárias. Esse número costuma surpreender quem esperava acertar de primeira.',
    ],
    prompts: [
      {
        titulo: 'Corrigir um erro de execução',
        texto:
          'Rodei o código que você gerou no Google Colab e apareceu este erro:\n\n[cole aqui a mensagem de erro completa, incluindo o traceback]\n\nO código executado foi:\n\n[cole aqui o código que falhou]\n\nMe explique em uma frase simples o que causou o erro, depois entregue a versão corrigida da célula inteira. Não mude a lógica do que eu pedi, corrija apenas o necessário.',
      },
      {
        titulo: 'Resultado bom demais para ser verdade',
        texto:
          'Meu modelo atingiu [valor da métrica] no conjunto de teste, o que me pareceu alto demais para um problema real.\n\nColunas usadas como entrada: [liste as colunas]\nColuna alvo: [nome_da_coluna_alvo]\n\nVerifique se existe vazamento de informação, ou seja, alguma variável de entrada que contenha a resposta de forma direta ou indireta. Liste as colunas suspeitas, explique o motivo de cada suspeita e mostre o código corrigido sem elas.',
      },
    ],
    dica:
      'Acurácia de 100% quase sempre significa que uma coluna entregou a resposta. Desconfiar de resultado perfeito é um dos hábitos mais úteis que se leva deste workshop.',
  },
  {
    numero: 6,
    id: 'interpretar',
    titulo: 'Interpretar o que o modelo aprendeu',
    duracao: '30 minutos',
    icone: BarChart3,
    objetivo:
      'Sair do número solto e chegar a uma leitura de engenharia: onde o modelo erra, quais variáveis pesam e o que isso significa na prática.',
    tarefas: [
      'Leia a matriz de confusão e identifique qual tipo de erro aparece mais.',
      'Ordene a importância das variáveis e compare com a sua intuição sobre o sistema físico.',
      'Pergunte se o erro observado é aceitável para a aplicação que você imagina.',
      'Registre uma frase de conclusão que qualquer pessoa da turma entenda sem ver o código.',
    ],
    prompts: [
      {
        titulo: 'Traduzir métricas para linguagem de engenharia',
        texto:
          'Meu modelo de [classificação ou regressão] sobre dados de sensores produziu estes resultados:\n\n[cole aqui a saída com as métricas e a matriz de confusão]\n\nA aplicação real seria: [descreva em uma frase, por exemplo avisar a manutenção antes de o motor parar].\n\nMe ajude a interpretar:\n1. O que cada número significa na prática, em unidades do meu problema.\n2. Qual tipo de erro o modelo comete mais e qual seria a consequência no campo.\n3. Se esse desempenho é suficiente para uso real ou apenas para demonstração.\n4. Duas mudanças concretas que melhorariam o resultado, da mais simples para a mais trabalhosa.\n\nEvite jargão. Escreva para uma banca de engenharia eletrônica que não trabalha com machine learning.',
      },
      {
        titulo: 'Entender as variáveis que mais pesam',
        texto:
          'A importância das variáveis do meu modelo ficou assim:\n\n[cole aqui a lista de variáveis e seus pesos]\n\nO sistema medido é [descreva o cenário físico em uma frase].\n\nExplique se essa ordem faz sentido do ponto de vista físico, aponte qualquer resultado que pareça estranho e sugira uma variável nova que eu poderia calcular a partir das colunas que já tenho, explicando o motivo.',
      },
    ],
    dica:
      'A pergunta que fecha esta etapa é sempre a mesma: eu confiaria neste modelo para acionar um alarme às três da manhã? A resposta honesta orienta o próximo passo.',
  },
  {
    numero: 7,
    id: 'comparar',
    titulo: 'Comparar com a lógica programada na mão',
    duracao: '25 minutos',
    icone: Scale,
    objetivo:
      'Colocar lado a lado o limiar escrito manualmente e o modelo treinado, que é o ponto central do workshop.',
    tarefas: [
      'Escreva a regra que você programaria por instinto, do tipo se a vibração passar de tal valor, alertar.',
      'Implemente essa regra em poucas linhas e meça o desempenho dela na mesma divisão de teste.',
      'Compare os dois resultados na mesma tabela e discuta as diferenças em grupo.',
      'Avalie o custo de manter cada abordagem quando o sensor muda de lugar ou o equipamento é trocado.',
    ],
    prompts: [
      {
        titulo: 'Modelo contra limiar manual',
        texto:
          'Quero comparar meu modelo de machine learning com a lógica tradicional de limiar que um engenheiro eletrônico escreveria na mão.\n\nDados: [nome_do_arquivo].csv\nAlvo: [nome_da_coluna_alvo]\nRegra manual que eu usaria: [descreva a regra, por exemplo alertar sempre que vibracao_rms_mm_s for maior que 4.5]\n\nGere um código que:\n1. Implemente essa regra como uma função simples.\n2. Avalie a regra no mesmo conjunto de teste usado pelo modelo.\n3. Monte uma tabela comparando acurácia, precisão e recall das duas abordagens.\n4. Mostre um exemplo concreto de caso em que o modelo acerta e a regra erra, e outro no sentido contrário.\n\nDepois do código, escreva um parágrafo curto sobre quando vale a pena usar cada abordagem em um produto embarcado.',
      },
    ],
    dica:
      'Às vezes o limiar manual vence, e isso também é um resultado legítimo. O ganho está em ter uma medida para decidir, em vez de escolher por hábito.',
  },
  {
    numero: 8,
    id: 'apresentar',
    titulo: 'Fechar e apresentar',
    duracao: '30 minutos',
    icone: Presentation,
    objetivo:
      'Contar em cinco minutos o que foi feito, o que o modelo entregou e qual seria o próximo passo com hardware real.',
    tarefas: [
      'Monte três slides: a pergunta, o resultado com a métrica e a comparação com a regra manual.',
      'Traga um número de eficiência, como tempo de desenvolvimento ou quantidade de linhas de código.',
      'Diga o que faltaria para levar isso ao ESP32 na bancada.',
      'Compartilhe uma dificuldade encontrada com o agente. Esse relato ajuda a turma inteira.',
    ],
    prompts: [
      {
        titulo: 'Roteiro da apresentação',
        texto:
          'Preciso apresentar em cinco minutos o projeto que fiz em um workshop de IA aplicada a sensores.\n\nO que eu fiz: [descreva em três frases]\nBase usada: [nome do arquivo]\nPergunta respondida: [sua pergunta]\nResultado: [métricas principais]\nComparação com regra manual: [resultado da etapa anterior]\n\nMonte um roteiro de apresentação com três slides, indicando o título de cada um, os pontos que devo falar e a frase de encerramento. Sugira também uma pergunta que a plateia provavelmente vai fazer e como responder.',
      },
      {
        titulo: 'Levar o modelo para o microcontrolador',
        texto:
          'Treinei uma árvore de decisão com scikit-learn usando dados de sensores e quero rodar essa decisão dentro de um ESP32, sem Python.\n\nMe explique o caminho mais simples:\n1. Como exportar as regras da árvore para código C.\n2. Como calcular no firmware as mesmas variáveis que usei no treino.\n3. Quanta memória essa solução ocupa, em ordem de grandeza.\n4. Quais cuidados tomar para que o resultado no ESP32 bata com o resultado do notebook.\n\nSe existir uma biblioteca que já faça essa conversão, cite o nome e mostre um exemplo curto.',
      },
    ],
    dica:
      'Guarde o notebook do Colab e o CSV na mesma pasta compartilhada. Esse material vira o ponto de partida natural de um projeto de disciplina ou de iniciação científica.',
  },
];

/** Extensões para quem terminar cedo ou para o segundo dia. */
export const extensoes = [
  {
    titulo: 'Coletar dados próprios com ESP32',
    detalhe:
      'Monte o circuito com DHT22 ou MPU-6050, grave um firmware que imprima leituras separadas por vírgula e capture o monitor serial em arquivo. Depois refaça o treino com dados que a própria turma gerou.',
  },
  {
    titulo: 'Embarcar a árvore no microcontrolador',
    detalhe:
      'Uma árvore rasa vira uma sequência de comparações em C. O modelo passa a rodar offline, sem nuvem e sem latência de rede.',
  },
  {
    titulo: 'Testar em outra base',
    detalhe:
      'Repita o mesmo fluxo com um conjunto diferente. Na segunda vez o roteiro leva menos de uma hora, o que evidencia o ganho de produtividade.',
  },
  {
    titulo: 'Discutir o que o modelo não vê',
    detalhe:
      'Liste as situações ausentes dos dados, como falha nova ou sensor descalibrado. Reconhecer esses limites é parte do trabalho de engenharia.',
  },
];

/** Itens de entrega, usados como checklist final. */
export const entregaveis = [
  'Notebook do Colab com o código rodando do início ao fim',
  'Uma métrica de desempenho medida em dados de teste',
  'Comparação numérica entre o modelo e a regra manual',
  'Três slides ou uma página resumindo a conclusão',
  'Registro de um prompt que funcionou bem e de outro que precisou ser refeito',
];
