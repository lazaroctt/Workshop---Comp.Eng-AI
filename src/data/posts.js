/**
 * Artigos da plataforma, na ordem sugerida de leitura.
 *
 * O conteúdo de cada artigo é uma lista de blocos, montada pelo componente
 * de leitura em src/pages/Artigos.jsx. Tipos aceitos:
 *   p          parágrafo
 *   h2         subtítulo
 *   lista      itens sem ordem
 *   passos     itens numerados
 *   citacao    frase em destaque
 *   codigo     trecho com fonte monoespaçada
 *   prompt     prompt copiável, referenciado pelo id em src/data/prompts.js
 *   dica       caixa de destaque com título e texto
 *   figura     diagrama do percurso do sensor à previsão
 *   tabela     { cabecalho, linhas, legenda }
 *   checklist  lista marcável, salva no navegador ({ id, itens })
 *   chamada    botão para outra aba ou artigo ({ texto, rotulo, destino })
 *
 * Fontes: cada artigo lista em fontes as chaves das obras de
 * src/data/referencias.js. Um bloco pode indicar ref: ['chave'] para exibir a
 * marca de citação ao fim do texto. A numeração segue a ordem da primeira
 * citação no artigo; obras listadas sem citação no texto entram no fim.
 */

import {
  Cpu, Table2, Split, MessageSquare, FlaskConical, Grid3x3, AlertTriangle, Scale, CircuitBoard,
} from 'lucide-react';

export const posts = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'o-que-e-aprendizado-de-maquina',
    titulo: 'O que é aprendizado de máquina',
    resumo:
      'Antes de treinar qualquer coisa, vale entender o que muda quando a decisão deixa de ser um valor fixo no código e passa a ser aprendida a partir de exemplos.',
    categoria: 'Fundamentos',
    icone: Cpu,
    cor: 'ciano',
    conteudo: [
      { tipo: 'p', texto: 'Quem monta circuitos aprende cedo a resolver problema com condicional. Se a temperatura passar de trinta graus, liga o ventilador. Se a vibração cruzar certo valor, acende o alerta. A lógica é clara, cabe em três linhas de firmware e funciona bem enquanto o mundo se comporta como no dia do teste.' },
      { tipo: 'p', texto: 'O problema aparece quando o sinal real chega. O sensor envelhece, a temperatura ambiente muda, o motor recebe outra carga e aquele valor escolhido na bancada começa a errar. A saída mais comum é criar mais uma condicional, depois outra, até o código virar uma teia difícil de manter.' },
      { tipo: 'h2', texto: 'A ideia central' },
      { tipo: 'p', texto: 'Aprendizado de máquina é um jeito de obter a regra a partir de exemplos, em vez de escrevê-la à mão. Você entrega ao algoritmo uma tabela com muitas situações já observadas e a resposta correta de cada uma. Ele procura o padrão que liga as leituras à resposta e devolve um modelo, que nada mais é do que essa regra aprendida.' },
      { tipo: 'p', texto: 'Tom Mitchell, da Carnegie Mellon, define o campo como o estudo de algoritmos que melhoram automaticamente com a experiência. A ideia é antiga: em 1959, Arthur Samuel, da IBM, publicou um programa que aprendia a jogar damas e acabava jogando melhor do que o próprio autor.', ref: ['mitchell1997', 'samuel1959'] },
      { tipo: 'figura' },
      { tipo: 'p', texto: 'O percurso da figura vale para qualquer projeto desta plataforma. Muda a grandeza medida e a pergunta; o método continua igual.' },
      { tipo: 'h2', texto: 'Quatro palavras que você vai encontrar sempre' },
      { tipo: 'lista', itens: [
        'Exemplo: uma linha da tabela, com as leituras de um instante e, quando existe, a resposta correta.',
        'Alvo: a coluna que o modelo deve aprender a prever, como falha_em_24h ou consumo_kwh.',
        'Treino: a parte dos exemplos usada para o modelo encontrar o padrão.',
        'Teste: exemplos separados antes do treino, que o modelo nunca viu. É neles que se mede se ele realmente aprendeu.',
      ], ref: ['ngCs229', 'abuMostafa2012'] },
      { tipo: 'h2', texto: 'O que muda em relação ao limiar' },
      { tipo: 'p', texto: 'Onde o engenheiro escreveria uma regra sobre vibração, o modelo combina vibração, corrente, temperatura do mancal e horas de operação para chegar a uma decisão mais estável. E ele informa o quanto erra, porque é avaliado em dados que não participaram do treino.', ref: ['abuMostafa2012', 'domingos2012'] },
      { tipo: 'citacao', texto: 'A pergunta deixa de ser qual valor escolher e passa a ser quais exemplos você tem.' },
      { tipo: 'p', texto: 'Quando o equipamento muda, não é preciso reescrever a lógica: basta coletar dados novos e treinar de novo. O esforço sai da adivinhação de constantes e vai para a qualidade dos dados, que é um terreno bem mais firme.', ref: ['domingos2012'] },
      { tipo: 'h2', texto: 'Por que ficou acessível' },
      { tipo: 'lista', itens: [
        'As bibliotecas amadureceram. Treinar uma árvore de decisão hoje ocupa cinco linhas de Python.',
        'O ambiente roda no navegador. O Google Colab entrega uma máquina configurada sem instalar nada.',
        'Os agentes de IA escrevem a primeira versão do código e explicam o que cada parte faz.',
        'Modelos simples cabem em microcontrolador. Uma árvore rasa vira um punhado de comparações em C.',
      ], ref: ['pedregosa2011', 'reddi2022'] },
      { tipo: 'p', texto: 'Os próximos artigos seguem esse caminho na ordem: entender a tabela de dados, escolher o tipo de problema, pedir o código ao agente e treinar o primeiro modelo.' },
    ],
    fontes: ['mitchell1997', 'samuel1959', 'ngCs229', 'abuMostafa2012', 'domingos2012', 'pedregosa2011', 'reddi2022', 'faceli2021'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'anatomia-de-uma-base-de-sensores',
    titulo: 'Anatomia de uma base de sensores',
    resumo:
      'Um arquivo CSV de sensores parece só uma planilha comprida. Saber ler as colunas, identificar o alvo e desconfiar de certas variáveis evita a maior parte dos erros do primeiro modelo.',
    categoria: 'Fundamentos',
    icone: Table2,
    cor: 'verde',
    conteudo: [
      { tipo: 'h2', texto: 'Uma linha por instante, uma coluna por grandeza' },
      { tipo: 'p', texto: 'Todas as bases desta plataforma seguem a mesma lógica. Cada linha registra um momento, ou uma janela curta de tempo, e cada coluna guarda uma medida: temperatura, corrente, distância, concentração de gás. A primeira linha do arquivo é o cabeçalho, com o nome de cada coluna.' },
      { tipo: 'p', texto: 'O estatístico Hadley Wickham chamou esse arranjo de dados organizados, ou tidy data: cada variável ocupa uma coluna e cada observação ocupa uma linha. Quase todas as bibliotecas de análise partem desse formato.', ref: ['wickham2014'] },
      { tipo: 'codigo', texto: 'timestamp,id_motor,rotacao_rpm,vibracao_rms_mm_s,vibracao_pico_mm_s,corrente_a,tensao_v,temperatura_mancal_c,horas_operacao,falha_em_24h\n2025-03-03 06:00:00,M-01,1760,1.21,3.165,11.71,377,51.5,3201,0\n2025-03-03 07:00:00,M-01,1750,1.699,4.899,10.87,379.2,54.3,3202,0\n2025-03-03 08:00:00,M-01,1758,1.399,4.651,11.23,384.6,51.4,3203,0' },
      { tipo: 'p', texto: 'O trecho acima é o começo da base de motores. Cada linha corresponde a uma hora de funcionamento de uma máquina, e a última coluna diz se ela falhou nas 24 horas seguintes.' },
      { tipo: 'h2', texto: 'O dicionário de dados' },
      { tipo: 'p', texto: 'O nome da coluna ajuda, mas não basta. vibracao_rms_mm_s indica o que é medido e em qual unidade; só o dicionário explica que se trata do valor eficaz da velocidade de vibração, o indicador usual de severidade. Toda base da aba Bases de dados traz esse dicionário no botão Dicionário e prévia.' },
      { tipo: 'p', texto: 'Pesquisadores da Microsoft Research defendem que toda base de dados venha com uma ficha técnica que explique a motivação, a composição e a forma de coleta. O dicionário de dados é a parte mais básica dessa ficha.', ref: ['gebru2021'] },
      { tipo: 'lista', itens: [
        'Numérico: um valor contínuo, como temperatura em graus Celsius.',
        'Categórico: um rótulo dentro de um conjunto fechado, como o nome da sala.',
        'Binário: 0 ou 1, como bomba desligada ou ligada.',
        'Data e hora: o carimbo de tempo da leitura, de onde saem a hora do dia e o dia da semana.',
      ] },
      { tipo: 'h2', texto: 'Entradas e alvo' },
      { tipo: 'p', texto: 'Antes de treinar, separe as colunas em dois grupos. O alvo é aquilo que você quer prever. As entradas, também chamadas de atributos ou features, são as leituras que o modelo pode usar para chegar à resposta. Na base de motores, o alvo é falha_em_24h e as entradas são vibração, corrente, temperatura, rotação e horas de operação.', ref: ['jamesIslr2021'] },
      { tipo: 'h2', texto: 'Colunas que entregam a resposta' },
      { tipo: 'p', texto: 'Algumas colunas parecem úteis, mas carregam a própria resposta. Na base de ocupação, a coluna pessoas conta quantas pessoas havia na sala. Se ela entrar no treino para prever sala_ocupada, o modelo acerta tudo sem aprender nada sobre os sensores. Esse problema tem nome: vazamento de informação.', ref: ['kaufman2012'] },
      { tipo: 'dica', titulo: 'Regra prática', texto: 'Pergunte se a coluna estaria disponível no momento da previsão, vinda de um sensor. Se ela só existe porque alguém anotou a resposta, fica fora do treino.' },
      { tipo: 'h2', texto: 'Leituras cruas ou janelas resumidas' },
      { tipo: 'p', texto: 'Nem toda base guarda leitura por leitura. Na base de ultrassônico, cada linha resume vinte medições do HC-SR04 em média, mínimo, máximo, desvio padrão e taxa de variação. Esse resumo é o tipo de cálculo que cabe dentro de um microcontrolador, e costuma deixar o problema bem mais fácil para o modelo.' },
      { tipo: 'p', texto: 'A técnica de dividir o sinal em janelas e extrair estatísticas de cada uma é o procedimento padrão em reconhecimento de atividades com sensores inerciais. É assim que foi montada, por exemplo, a base pública UCI HAR, com acelerômetro e giroscópio de smartphone.', ref: ['bulling2014', 'anguita2013'] },
      { tipo: 'h2', texto: 'A primeira olhada no Colab' },
      { tipo: 'p', texto: 'Antes de pensar em modelo, carregue o arquivo e confira se ele chegou inteiro: número de linhas, tipo de cada coluna, valores ausentes e quantidade de exemplos por classe. O prompt abaixo pede tudo isso de uma vez.' },
      { tipo: 'prompt', id: 'carregar-dados' },
      { tipo: 'p', texto: 'Em seguida, olhe os dados. Um padrão que salta aos olhos no gráfico quase sempre vira um modelo bom, e a ausência de padrão também é uma informação valiosa. Essa análise exploratória vem antes de qualquer método de aprendizado.', ref: ['morettin2025'] },
      { tipo: 'prompt', id: 'visualizar' },
      { tipo: 'chamada', texto: 'Escolha uma base e abra o dicionário completo antes de seguir.', rotulo: 'Ver as bases de dados', destino: { aba: 'bases' } },
    ],
    fontes: ['wickham2014', 'gebru2021', 'jamesIslr2021', 'kaufman2012', 'bulling2014', 'anguita2013', 'morettin2025'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'classificacao-ou-regressao',
    titulo: 'Classificação ou regressão: como decidir',
    resumo:
      'A escolha entre prever uma categoria e prever um número define o modelo, a métrica e a forma de apresentar o resultado. É a primeira decisão de qualquer projeto.',
    categoria: 'Fundamentos',
    icone: Split,
    cor: 'roxo',
    conteudo: [
      { tipo: 'p', texto: 'Olhe para a resposta que você quer obter e pergunte que forma ela tem. Se for um rótulo dentro de um conjunto fechado, o problema é de classificação. Se for uma quantidade que varia de forma contínua, é regressão. Toda a escolha começa aí.', ref: ['jamesIslr2021', 'izbicki2020'] },
      { tipo: 'h2', texto: 'Exemplos com as bases da plataforma' },
      { tipo: 'lista', itens: [
        'O motor vai falhar nas próximas 24 horas? Sim ou não, portanto classificação binária.',
        'Quanto o prédio vai consumir na próxima hora? Um valor em quilowatt-hora, portanto regressão.',
        'O ar está bom, moderado ou ruim? Três rótulos possíveis, classificação em múltiplas classes.',
        'Qual será a temperatura da sala daqui a uma hora? Um número em graus, regressão.',
      ] },
      { tipo: 'p', texto: 'Repare que a mesma tabela costuma servir para os dois caminhos. A base de ambiente permite prever a temperatura e também classificar o conforto térmico. Não existe resposta única: existe a pergunta que interessa ao seu projeto.' },
      { tipo: 'h2', texto: 'Cada caminho pede uma métrica' },
      { tipo: 'p', texto: 'Em classificação, acurácia sozinha engana quando as classes são desiguais. Se apenas 10% dos casos são falha, um modelo que diz sempre que está tudo bem acerta 90% e não serve para nada. Por isso entram precisão e recall, que separam o alarme falso do alarme perdido.', ref: ['saito2015', 'he2009'] },
      { tipo: 'p', texto: 'Em regressão, o erro absoluto médio é o número mais fácil de comunicar, porque sai na unidade do problema. Dizer que o modelo erra em média 3 kWh conversa direto com a conta de luz. O R² ajuda a comparar modelos entre si, mas explica pouco para quem vai usar o resultado.', ref: ['hyndman2021'] },
      { tipo: 'citacao', texto: 'Escolha a métrica antes de treinar. Depois do resultado, é tentador escolher aquela que ficou mais bonita.' },
      { tipo: 'p', texto: 'Na dúvida, escreva a pergunta em uma frase e mostre para alguém de fora do projeto. Se a pessoa entender qual resposta espera receber, o tipo de problema fica evidente. Se ainda restar dúvida, peça ao agente de IA para enquadrar o problema:' },
      { tipo: 'prompt', id: 'refinar-pergunta' },
    ],
    fontes: ['jamesIslr2021', 'izbicki2020', 'saito2015', 'he2009', 'hyndman2021', 'souzaFilhoCpe775'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'prompts-que-funcionam',
    titulo: 'Como pedir código a um agente de IA e receber algo que roda',
    resumo:
      'A diferença entre um pedido vago e um prompt bem montado aparece logo na primeira resposta. Sete hábitos que evitam retrabalho e deixam o código mais fácil de entender.',
    categoria: 'Prática',
    icone: MessageSquare,
    cor: 'ambar',
    conteudo: [
      { tipo: 'p', texto: 'Um agente de IA responde ao que recebe. Pedidos genéricos produzem código genérico, que quase roda e quase resolve. Alguns cuidados simples elevam bastante a qualidade da primeira resposta, e vários deles aparecem no guia de prompts do MIT: dar contexto, ser específico e construir a resposta ao longo da conversa.', ref: ['mitSloanPrompts'] },
      { tipo: 'h2', texto: '1. Diga quem você é' },
      { tipo: 'p', texto: 'Informar que você é estudante de engenharia com pouca prática em Python muda o tom e o nível de detalhe da explicação. O agente passa a comentar o código e a evitar atalhos que só fazem sentido para quem já domina a biblioteca.' },
      { tipo: 'h2', texto: '2. Cole o cabeçalho real do arquivo' },
      { tipo: 'p', texto: 'Nomes de coluna inventados geram código que quebra na primeira execução. Copiar a primeira linha do CSV resolve o problema antes de ele existir. Se puder, cole também duas linhas de exemplo.' },
      { tipo: 'h2', texto: '3. Peça um modelo simples' },
      { tipo: 'p', texto: 'Sem essa instrução, o agente às vezes sugere arquiteturas grandes, que demoram para treinar e complicam a interpretação sem necessidade. Árvore de decisão, regressão logística e floresta aleatória atendem à maioria dos casos com dados de sensores.', ref: ['holte1993'] },
      { tipo: 'h2', texto: '4. Defina o formato da saída' },
      { tipo: 'lista', itens: [
        'Uma célula única, para colar direto no Colab.',
        'Comentários em português.',
        'Métricas impressas no fim.',
        'Apenas pandas, scikit-learn e matplotlib.',
      ] },
      { tipo: 'h2', texto: '5. Devolva o erro inteiro' },
      { tipo: 'p', texto: 'Quando aparecer uma exceção, cole a mensagem completa com o traceback, não apenas a última linha. O agente localiza a origem muito mais rápido quando enxerga a pilha de chamadas.' },
      { tipo: 'prompt', id: 'corrigir-erro' },
      { tipo: 'h2', texto: '6. Duvide do resultado perfeito' },
      { tipo: 'p', texto: 'Acurácia altíssima merece uma pergunta de checagem. Peça ao agente para procurar vazamento de informação entre as variáveis de entrada, e transforme isso em hábito.', ref: ['kaufman2012'] },
      { tipo: 'prompt', id: 'bom-demais' },
      { tipo: 'h2', texto: '7. Peça a explicação junto com o código' },
      { tipo: 'p', texto: 'Código sem entendimento vira dependência. Pedir um parágrafo em linguagem comum sobre o que o modelo fez transforma a ferramenta em material de estudo, e é isso que fica depois que o código roda.' },
      { tipo: 'p', texto: 'A cautela tem base experimental. Pesquisadores da Universidade de Illinois mostraram, na conferência NeurIPS de 2023, que ao submeter o código gerado por modelos de linguagem a testes mais rigorosos a taxa de acerto aparente cai em até 28,9%.', ref: ['liu2023'] },
      { tipo: 'citacao', texto: 'O agente escreve rápido. A responsabilidade de conferir continua sua.' },
      { tipo: 'chamada', texto: 'Todos os prompts da plataforma estão reunidos em um só lugar, prontos para copiar.', rotulo: 'Abrir a biblioteca de prompts', destino: { aba: 'dicas' } },
    ],
    fontes: ['mitSloanPrompts', 'holte1993', 'kaufman2012', 'liu2023'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'seu-primeiro-modelo',
    titulo: 'Seu primeiro modelo, passo a passo',
    resumo:
      'Do arquivo CSV ao modelo treinado e avaliado, no navegador e com um agente de IA escrevendo o código. Siga as seis etapas na ordem e marque o checklist no fim.',
    categoria: 'Prática',
    icone: FlaskConical,
    cor: 'ciano',
    conteudo: [
      { tipo: 'h2', texto: 'Do que você precisa' },
      { tipo: 'lista', itens: [
        'Um navegador. O código roda no Google Colab, que abre direto na web e já traz pandas, scikit-learn e matplotlib instalados.',
        'Uma conta Google, para usar o Colab.',
        'Uma conta gratuita em um agente de IA, como Claude ou ChatGPT. O plano sem custo dá conta de tudo o que aparece aqui.',
        'Uma base CSV baixada da aba Bases de dados.',
      ], ref: ['pedregosa2011'] },
      { tipo: 'h2', texto: '1. Escolha a base' },
      { tipo: 'p', texto: 'Leia o cenário de duas ou três bases antes de decidir e use o botão de prévia para ver as primeiras linhas. Baixe o CSV escolhido e confira o dicionário, coluna por coluna. Anote em uma frase o que aquele conjunto mede e por que alguém se importaria com isso.' },
      { tipo: 'dica', titulo: 'Para começar', texto: 'Consumo de energia e ocupação de sala têm padrões visíveis a olho nu, o que ajuda a confiar no resultado depois.' },
      { tipo: 'chamada', texto: 'Oito bases sintéticas prontas para baixar, cada uma com cenário e dicionário.', rotulo: 'Escolher uma base', destino: { aba: 'bases' } },
      { tipo: 'h2', texto: '2. Escreva a pergunta' },
      { tipo: 'p', texto: 'Escreva o que você quer descobrir em linguagem comum e aponte qual coluna guarda a resposta. Se a resposta é um número, o problema é de regressão; se é uma categoria, é de classificação. Defina também o que seria um resultado aceitável antes de treinar, para não aceitar qualquer número depois.', ref: ['jamesIslr2021'] },
      { tipo: 'prompt', id: 'refinar-pergunta' },
      { tipo: 'h2', texto: '3. Abra o Colab e carregue o arquivo' },
      { tipo: 'passos', itens: [
        'Acesse colab.research.google.com e crie um notebook novo.',
        'Envie o CSV pelo painel de arquivos, no ícone de pasta à esquerda.',
        'Peça ao agente o código que carrega o arquivo e mostra as primeiras linhas.',
        'Confira o total de linhas e colunas. Se o número não bater com o dicionário, o separador do arquivo pode estar errado.',
      ] },
      { tipo: 'prompt', id: 'carregar-dados' },
      { tipo: 'h2', texto: '4. Peça o código de treino' },
      { tipo: 'p', texto: 'Descreva ao agente o arquivo, as colunas e a pergunta. Peça um modelo simples: árvore de decisão para classificação, regressão linear ou floresta aleatória para regressão. Exija que o código imprima as métricas e explique cada linha. Use o prompt que corresponde ao seu tipo de problema.', ref: ['breiman2017', 'yuCs50Ai'] },
      { tipo: 'p', texto: 'A separação entre treino e teste, que os prompts pedem em 80% e 20%, é o que permite medir o desempenho em dados que o modelo nunca viu. Sem ela, a nota mede apenas a capacidade de decorar.', ref: ['jamesIslr2021'] },
      { tipo: 'prompt', id: 'treinar-classificador' },
      { tipo: 'prompt', id: 'treinar-regressor' },
      { tipo: 'h2', texto: '5. Rode, leia o erro e corrija' },
      { tipo: 'p', texto: 'Execute a célula. Se aparecer um erro, leia a mensagem até o fim e cole o traceback completo no agente, junto com o código que falhou. Aplique a correção e rode de novo. É normal precisar de algumas idas e vindas até a saída aparecer limpa.' },
      { tipo: 'prompt', id: 'corrigir-erro' },
      { tipo: 'dica', titulo: 'Desconfie da nota perfeita', texto: 'Acurácia de 100% quase sempre significa que uma coluna entregou a resposta. Use o prompt abaixo para investigar antes de comemorar.', ref: ['kaufman2012'] },
      { tipo: 'prompt', id: 'bom-demais' },
      { tipo: 'h2', texto: '6. Anote o resultado' },
      { tipo: 'p', texto: 'Guarde a métrica obtida no conjunto de teste. Ela é o ponto de partida dos próximos artigos: entender onde o modelo erra e comparar com a regra que você escreveria na mão.' },
      { tipo: 'checklist', id: 'primeiro-modelo', itens: [
        'Notebook do Colab rodando do início ao fim',
        'Métrica de desempenho medida nos dados de teste',
        'Colunas que entregam a resposta identificadas e removidas',
        'Uma frase de conclusão que alguém de fora entenderia',
        'Um prompt que funcionou bem guardado para a próxima vez',
      ] },
    ],
    fontes: ['pedregosa2011', 'jamesIslr2021', 'breiman2017', 'yuCs50Ai', 'kaufman2012', 'faceli2021'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'lendo-a-matriz-de-confusao',
    titulo: 'Lendo a matriz de confusão e as outras métricas',
    resumo:
      'Acurácia, precisão, recall e erro médio explicados com exemplos de motor e de consumo de energia. No centro de tudo está uma tabela simples: a matriz de confusão.',
    categoria: 'Análise',
    icone: Grid3x3,
    cor: 'verde',
    conteudo: [
      { tipo: 'p', texto: 'Toda métrica responde a uma pergunta específica. Saber qual pergunta cada número responde evita conclusões apressadas sobre um resultado que ninguém interpretou direito.' },
      { tipo: 'h2', texto: 'A matriz de confusão' },
      { tipo: 'p', texto: 'É a tabela que cruza o que aconteceu de verdade com o que o modelo previu. Veja um exemplo com 120 horas de teste da base de motores, das quais 12 antecederam uma falha:', ref: ['fawcett2006', 'jamesIslr2021'] },
      { tipo: 'tabela', cabecalho: ['', 'Previsto: normal', 'Previsto: falha'], linhas: [
        ['Real: normal', '103 acertos', '5 alarmes falsos'],
        ['Real: falha', '3 falhas perdidas', '9 alertas corretos'],
      ], legenda: 'Exemplo ilustrativo. Os números do seu modelo vão ser diferentes.' },
      { tipo: 'p', texto: 'A diagonal guarda os acertos. Fora dela ficam os dois tipos de erro, e eles têm custos bem diferentes: o alarme falso para a máquina à toa, a falha perdida deixa o motor quebrar sem aviso.' },
      { tipo: 'h2', texto: 'Acurácia' },
      { tipo: 'p', texto: 'É a fração de acertos sobre o total. No exemplo, (103 + 9) / 120 dá 93%. Parece ótimo, mas atenção: como só 10% dos casos são falha, um modelo que dissesse sempre que está tudo normal chegaria a 90% sem avisar uma única quebra.', ref: ['saito2015'] },
      { tipo: 'h2', texto: 'Precisão e recall' },
      { tipo: 'p', texto: 'Precisão responde: entre os alarmes disparados, quantos eram reais? No exemplo, 9 de 14, cerca de 64%. Recall responde: entre as falhas que aconteceram, quantas foram avisadas? Aqui, 9 de 12, ou 75%.', ref: ['fawcett2006', 'saito2015'] },
      { tipo: 'lista', itens: [
        'Precisão baixa: a equipe para a máquina sem motivo e passa a ignorar o sistema.',
        'Recall baixo: a máquina quebra sem aviso e o prejuízo é grande.',
        'Elevar uma costuma derrubar a outra, e o equilíbrio depende do custo de cada erro.',
      ] },
      { tipo: 'h2', texto: 'Onde o modelo se confunde' },
      { tipo: 'p', texto: 'Com mais de duas classes, a matriz cresce, mas a leitura é a mesma. Na base de ultrassônico é comum o modelo errar entre aproximando e afastando, sinal de que a taxa de variação merece mais atenção.' },
      { tipo: 'h2', texto: 'Erro absoluto médio' },
      { tipo: 'p', texto: 'Em regressão não há matriz de confusão. O número mais claro é o erro absoluto médio, que diz quantas unidades o modelo erra em média. Prever consumo com erro de 3 kWh em uma faixa que vai de 8 a 78 kWh é defensável. O mesmo erro em uma faixa de 5 a 10 kWh seria péssimo, e só o contexto revela isso.', ref: ['hyndman2021'] },
      { tipo: 'citacao', texto: 'Compare sempre com um palpite ingênuo. Se repetir o valor da hora anterior erra menos que o modelo, o modelo não está pronto.' },
      { tipo: 'p', texto: 'Essa comparação é prática recomendada em previsão de séries temporais. Rob Hyndman e George Athanasopoulos, da Monash University, usam métodos ingênuos, como repetir a última observação, como referência mínima para avaliar qualquer modelo.', ref: ['hyndman2021'] },
      { tipo: 'h2', texto: 'Peça ajuda para interpretar' },
      { tipo: 'p', texto: 'Cole a saída do seu modelo no agente e peça uma leitura em linguagem de engenharia. O segundo prompt ajuda a conferir se as variáveis mais importantes fazem sentido do ponto de vista físico.' },
      { tipo: 'prompt', id: 'traduzir-metricas' },
      { tipo: 'prompt', id: 'variaveis-importantes' },
      { tipo: 'dica', titulo: 'Uma pergunta para fechar', texto: 'Você confiaria neste modelo para disparar um alarme às três da manhã? A resposta honesta indica o próximo passo.' },
    ],
    fontes: ['fawcett2006', 'jamesIslr2021', 'saito2015', 'hyndman2021', 'souzaFilhoCpe775'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'armadilhas-com-dados-de-sensores',
    titulo: 'Cinco armadilhas comuns com dados de sensores',
    resumo:
      'Erros que aparecem em quase todo primeiro projeto e custam caro quando só são percebidos no resultado final.',
    categoria: 'Análise',
    icone: AlertTriangle,
    cor: 'ambar',
    conteudo: [
      { tipo: 'h2', texto: '1. Vazamento de informação' },
      { tipo: 'p', texto: 'Acontece quando uma coluna de entrada carrega a resposta. Na base de ocupação, a contagem de pessoas revela diretamente se a sala está ocupada. O modelo acerta tudo, o número impressiona e o resultado não tem valor algum. Ao ver acurácia perto de 100%, procure primeiro por vazamento.', ref: ['kaufman2012'] },
      { tipo: 'p', texto: 'O problema não é só de iniciante. Um levantamento da Universidade de Princeton encontrou vazamento em trabalhos de 17 áreas da ciência que usam aprendizado de máquina, com centenas de artigos afetados e, em alguns casos, conclusões otimistas demais.', ref: ['kapoor2023'] },
      { tipo: 'h2', texto: '2. Embaralhar uma série temporal' },
      { tipo: 'p', texto: 'A divisão aleatória de treino e teste espalha instantes vizinhos entre os dois conjuntos. Como leituras próximas no tempo são muito parecidas, o modelo praticamente memoriza a resposta. Em séries temporais, separe por corte cronológico: treine com o começo do período e teste com o fim.', ref: ['hyndman2021'] },
      { tipo: 'h2', texto: '3. Ignorar o desequilíbrio das classes' },
      { tipo: 'p', texto: 'Eventos interessantes costumam ser raros. Falha de motor, vazamento e queda aparecem em uma fração pequena das amostras, e é justamente essa fração que importa. Acompanhe o recall e ajuste o peso das classes ou o limiar de decisão conforme o custo do erro.', ref: ['he2009', 'saito2015'] },
      { tipo: 'h2', texto: '4. Esquecer as unidades e a calibração' },
      { tipo: 'p', texto: 'Sensores do mesmo modelo têm dispersão de fábrica. Um modelo treinado com um MQ-135 específico pode errar feio com outro exemplar. Sempre que possível, registre qual dispositivo gerou cada leitura e verifique se o modelo continua bom ao trocar de unidade.' },
      { tipo: 'p', texto: 'O tempo também pesa. Sensores químicos derivam: numa base pública da Universidade da Califórnia em San Diego, com 16 sensores de gás acompanhados por 36 meses, o desafio central é justamente compensar essa deriva para que o modelo continue acertando.', ref: ['vergara2012'] },
      { tipo: 'h2', texto: '5. Achar que mais dados resolvem tudo' },
      { tipo: 'p', texto: 'Mil leituras de uma sala vazia não ensinam nada sobre sala cheia. O que importa é a variedade de situações representadas, não o volume bruto. Vale mais uma tarde coletando cenários diferentes do que uma semana registrando sempre a mesma condição.', ref: ['domingos2012'] },
      { tipo: 'citacao', texto: 'Todo dado tem uma história de como foi coletado. Quem conhece essa história interpreta melhor o modelo.' },
    ],
    fontes: ['kaufman2012', 'kapoor2023', 'hyndman2021', 'he2009', 'saito2015', 'vergara2012', 'domingos2012'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'modelo-contra-limiar',
    titulo: 'Seu modelo contra a regra escrita na mão',
    resumo:
      'O teste que dá sentido a todo o resto: colocar lado a lado o limiar que você programaria por instinto e o modelo treinado, medidos nos mesmos dados.',
    categoria: 'Análise',
    icone: Scale,
    cor: 'roxo',
    conteudo: [
      { tipo: 'p', texto: 'Treinar um modelo só vale a pena se ele fizer melhor do que a solução tradicional. Por isso a comparação com o limiar manual não é um detalhe: é a pergunta principal.', ref: ['hyndman2021'] },
      { tipo: 'h2', texto: 'Escreva a regra que você usaria' },
      { tipo: 'p', texto: 'Pense em como resolveria o problema sem aprendizado de máquina. Na base de motores, algo como: se vibracao_rms_mm_s passar de 4,5, alertar. Na de reservatório: se a saída ficar muito acima da entrada durante a madrugada, suspeitar de vazamento. A regra não precisa ser perfeita, precisa ser aquela que você realmente escreveria.' },
      { tipo: 'h2', texto: 'Meça a regra nos mesmos dados' },
      { tipo: 'p', texto: 'A comparação só é justa se as duas abordagens forem avaliadas no mesmo conjunto de teste, com as mesmas métricas. Implemente a regra como uma função de poucas linhas e calcule acurácia, precisão e recall do mesmo jeito que fez com o modelo.' },
      { tipo: 'prompt', id: 'modelo-vs-limiar' },
      { tipo: 'h2', texto: 'Leia a comparação com calma' },
      { tipo: 'lista', itens: [
        'Se o modelo vence com folga, a combinação de várias leituras está capturando algo que um único limiar não enxerga.',
        'Se os dois empatam, a regra manual provavelmente é a melhor escolha: é mais simples, mais fácil de explicar e cabe em qualquer firmware.',
        'Se a regra vence, o modelo precisa de mais dados, de variáveis melhores, ou simplesmente não é necessário. Isso também é um resultado legítimo.',
      ] },
      { tipo: 'p', texto: 'O terceiro caso é mais comum do que parece. Em um estudo clássico, Robert Holte, da Universidade de Ottawa, mostrou que regras baseadas em um único atributo, na prática um limiar, foram tão precisas quanto as da maioria dos sistemas de aprendizado de máquina na maior parte das bases analisadas.', ref: ['holte1993'] },
      { tipo: 'h2', texto: 'O custo de manter cada solução' },
      { tipo: 'p', texto: 'Métricas não contam tudo. Pense no que acontece quando o sensor muda de lugar, quando o motor é trocado por outro modelo ou quando a estação do ano muda. A regra manual exige alguém para reajustar o limiar; o modelo exige dados novos e um novo treino. Qual caminho sai mais barato depende do projeto.' },
      { tipo: 'p', texto: 'Engenheiros do Google descreveram esse custo como a dívida técnica dos sistemas de aprendizado de máquina: o modelo em si é uma parte pequena, e o que cresce com o tempo é o trabalho de manter dados, dependências e monitoramento em ordem.', ref: ['sculley2015'] },
      { tipo: 'citacao', texto: 'O ganho está em ter uma medida para decidir, em vez de escolher por hábito.' },
    ],
    fontes: ['hyndman2021', 'holte1993', 'sculley2015', 'domingos2012'],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'do-modelo-ao-esp32',
    titulo: 'Do modelo ao hardware com ESP32',
    resumo:
      'Treinar no navegador é a parte confortável. Rodar a decisão dentro de um microcontrolador impõe restrições que mudam escolhas anteriores, e abre caminho para coletar seus próprios dados.',
    categoria: 'Hardware',
    icone: CircuitBoard,
    cor: 'ciano',
    conteudo: [
      { tipo: 'p', texto: 'O modelo treinado no Colab vive em um ambiente generoso: memória de sobra, ponto flutuante rápido e todas as bibliotecas disponíveis. O ESP32 tem 520 KB de SRAM, divididos entre memória de dados e de instruções, e precisa responder em milissegundos, muitas vezes alimentado por bateria.', ref: ['espressifMemoria'] },
      { tipo: 'h2', texto: 'A árvore é a ponte mais curta' },
      { tipo: 'p', texto: 'Uma árvore de decisão treinada é apenas uma sequência de comparações. Exportá-la para C significa transformar cada nó em um if aninhado. Não há multiplicação de matriz, não há biblioteca externa, e o resultado ocupa alguns kilobytes.', ref: ['breiman2017'] },
      { tipo: 'codigo', texto: 'if (desvio_padrao_cm <= 4.8) {\n  if (variacao_cm_por_s <= 1.2) return LIVRE;\n  return OBJETO_PARADO;\n} else {\n  if (variacao_cm_por_s <= -8.0) return APROXIMANDO;\n  return AFASTANDO;\n}' },
      { tipo: 'p', texto: 'Esse trecho ilustra a saída típica de uma árvore rasa treinada com a base de ultrassônico. Ele roda em qualquer microcontrolador de oito bits e ainda pode ser lido por uma pessoa, o que ajuda na hora de justificar o comportamento do sistema.' },
      { tipo: 'prompt', id: 'levar-ao-esp32' },
      { tipo: 'h2', texto: 'O ponto delicado são as features' },
      { tipo: 'p', texto: 'Se o treino usou o desvio padrão de uma janela de vinte leituras, o firmware precisa calcular exatamente a mesma coisa, com a mesma janela e a mesma taxa de amostragem. Divergências aqui são a causa mais comum de um modelo que funcionava no notebook e falha na bancada.', ref: ['bulling2014'] },
      { tipo: 'lista', itens: [
        'Anote a taxa de amostragem usada na coleta e mantenha a mesma no firmware.',
        'Repita o mesmo tamanho de janela e a mesma ordem das operações.',
        'Cuidado com unidades. Trocar g por metros por segundo ao quadrado quebra tudo em silêncio.',
        'Teste com um conjunto de leituras conhecidas e compare a saída dos dois lados.',
      ] },
      { tipo: 'h2', texto: 'Sensores que combinam com as bases' },
      { tipo: 'p', texto: 'As bases da plataforma simulam sensores baratos e fáceis de encontrar. Se quiser reproduzir um cenário na bancada, esta tabela aponta o ponto de partida.' },
      { tipo: 'tabela', cabecalho: ['Sensor', 'O que mede', 'Base relacionada'], linhas: [
        ['MPU-6050', 'aceleração e rotação em três eixos', 'Acelerômetro e postura; vibração de motor'],
        ['DHT22', 'temperatura e umidade', 'Temperatura e umidade de ambiente'],
        ['HC-SR04', 'distância por ultrassom', 'Ultrassônico e obstáculos'],
        ['MH-Z19 e MQ-135', 'gás carbônico e gases diversos', 'Qualidade do ar'],
        ['PIR HC-SR501', 'presença por infravermelho', 'Ocupação de sala'],
        ['PZEM-004T', 'tensão, corrente e energia', 'Consumo de energia'],
        ['YF-S201', 'vazão de água', 'Nível de reservatório'],
      ], legenda: 'Todos funcionam com ESP32 ou Arduino, uma protoboard e poucos jumpers.' },
      { tipo: 'dica', titulo: 'Sensores de gás da linha MQ', texto: 'Eles aquecem e só estabilizam depois de alguns minutos ligados. Descarte as primeiras leituras antes de gravar qualquer dado.' },
      { tipo: 'h2', texto: 'Coletando seus próprios dados' },
      { tipo: 'passos', itens: [
        'Monte o circuito com o sensor escolhido e o ESP32.',
        'Grave um firmware que imprima cada leitura em uma linha, com os valores separados por vírgula e um cabeçalho na primeira linha.',
        'Capture a saída do monitor serial em um arquivo .csv.',
        'Registre o rótulo de cada trecho, como parado ou em movimento, anotando o momento em que a situação muda.',
        'Refaça o fluxo do artigo Seu primeiro modelo com esse arquivo.',
      ] },
      { tipo: 'p', texto: 'Trabalhos de conclusão de curso da UFF já seguiram esse caminho, como uma central de monitoramento ambiental com sistema embarcado e um medidor de energia elétrica conectado à internet.', ref: ['domingues2022', 'guedes2018'] },
      { tipo: 'h2', texto: 'Quando faz sentido ir além' },
      { tipo: 'p', texto: 'Redes neurais pequenas cabem em ESP32 com ferramentas próprias para isso, e valem a pena em áudio ou imagem. Para sinais de sensor com poucas grandezas, a árvore costuma entregar desempenho equivalente com uma fração do esforço. Comece pelo simples e aumente a complexidade apenas quando o resultado exigir.', ref: ['warden2019'] },
      { tipo: 'p', texto: 'Esse campo tem nome, TinyML, e referências acadêmicas sólidas. Na Universidade Harvard, o grupo de Vijay Janapa Reddi mantém cursos abertos sobre o tema e um livro gratuito sobre sistemas de aprendizado de máquina.', ref: ['reddi2022', 'reddiMlsys'] },
    ],
    fontes: ['espressifMemoria', 'breiman2017', 'bulling2014', 'domingues2022', 'guedes2018', 'warden2019', 'reddi2022', 'reddiMlsys'],
  },
];

/** Endereços antigos de artigos, mantidos para não quebrar links já compartilhados. */
const SLUGS_ANTIGOS = {
  'eletronica-e-aprendizado': 'o-que-e-aprendizado-de-maquina',
  'metricas-sem-misterio': 'lendo-a-matriz-de-confusao',
  'do-colab-para-o-esp32': 'do-modelo-ao-esp32',
};

export const acharPost = (slug) => posts.find((p) => p.slug === (SLUGS_ANTIGOS[slug] ?? slug));
