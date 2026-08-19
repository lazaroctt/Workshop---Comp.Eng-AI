/**
 * Artigos curtos de apoio ao workshop.
 *
 * O conteúdo fica em blocos simples para o componente de leitura montar a
 * página sem depender de nenhum interpretador de markdown:
 *   p       parágrafo
 *   h2      subtítulo
 *   lista   itens em sequência
 *   citacao destaque em bloco
 *   codigo  trecho de código com fonte monoespaçada
 */

import { Cpu, Split, MessageSquare, Gauge, CircuitBoard, AlertTriangle } from 'lucide-react';

export const posts = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'eletronica-e-aprendizado',
    titulo: 'Por que a eletrônica chegou ao aprendizado de máquina',
    resumo:
      'Durante anos, a resposta para qualquer leitura de sensor foi um limiar escrito na mão. Existe agora um caminho mais barato e mais honesto com a realidade do sinal.',
    categoria: 'Fundamentos',
    leitura: '5 minutos',
    data: 'Março de 2025',
    icone: Cpu,
    cor: 'ciano',
    conteudo: [
      { tipo: 'p', texto: 'Quem monta circuitos aprende cedo a resolver problema com condicional. Se a temperatura passar de trinta graus, liga o ventilador. Se a vibração cruzar certo valor, acende o alerta. A lógica é clara, cabe em três linhas de firmware e funciona bem enquanto o mundo se comporta como no dia do teste.' },
      { tipo: 'p', texto: 'O problema aparece quando o sinal real chega. O sensor envelhece, a temperatura ambiente muda, o motor recebe outra carga e aquele valor mágico escolhido na bancada começa a errar. A resposta usual é criar mais uma condicional, depois outra, até o código virar uma teia que ninguém quer manter.' },
      { tipo: 'h2', texto: 'O que muda com um modelo' },
      { tipo: 'p', texto: 'Um modelo de aprendizado de máquina não recebe o limiar pronto. Ele observa exemplos rotulados e descobre sozinho onde traçar a fronteira, levando em conta várias grandezas ao mesmo tempo. Onde o engenheiro escreveria uma regra sobre vibração, o modelo combina vibração, corrente, temperatura do mancal e horas de operação para chegar a uma decisão mais estável.' },
      { tipo: 'citacao', texto: 'A pergunta deixa de ser qual valor eu escolho e passa a ser quais exemplos eu tenho.' },
      { tipo: 'p', texto: 'Essa mudança de perspectiva tem consequência prática. Quando o equipamento muda, não é preciso reescrever a lógica: basta coletar dados novos e treinar de novo. O esforço sai da adivinhação de constantes e vai para a qualidade dos dados, que é um terreno bem mais firme.' },
      { tipo: 'h2', texto: 'Por que agora ficou acessível' },
      { tipo: 'lista', itens: [
        'As bibliotecas amadureceram. Treinar uma árvore de decisão hoje ocupa cinco linhas de Python.',
        'O ambiente roda no navegador. Google Colab entrega máquina configurada sem instalar nada.',
        'Os agentes de IA escrevem a primeira versão do código e explicam o que cada parte faz.',
        'Modelos simples cabem em microcontrolador. Uma árvore rasa vira um punhado de comparações em C.',
      ] },
      { tipo: 'p', texto: 'A barreira que restava era a distância entre a linguagem da eletrônica e a linguagem da ciência de dados. É exatamente essa ponte que o workshop pretende atravessar em um dia, usando dados de sensores que já vêm prontos e um agente de IA como parceiro de programação.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'classificacao-ou-regressao',
    titulo: 'Classificação ou regressão: decida em dois minutos',
    resumo:
      'A escolha entre prever uma categoria e prever um número define o modelo, a métrica e a forma de apresentar o resultado. É a primeira decisão do projeto.',
    categoria: 'Fundamentos',
    leitura: '4 minutos',
    data: 'Março de 2025',
    icone: Split,
    cor: 'roxo',
    conteudo: [
      { tipo: 'p', texto: 'Olhe para a resposta que você quer obter e pergunte que forma ela tem. Se for um rótulo dentro de um conjunto fechado, o problema é de classificação. Se for uma quantidade que varia de forma contínua, é regressão. Toda a escolha começa aí.' },
      { tipo: 'h2', texto: 'Exemplos com as bases do workshop' },
      { tipo: 'lista', itens: [
        'O motor vai falhar nas próximas 24 horas? Sim ou não, portanto classificação binária.',
        'Quanto o prédio vai consumir na próxima hora? Um valor em quilowatt-hora, portanto regressão.',
        'O ar está bom, moderado ou ruim? Três rótulos possíveis, classificação em múltiplas classes.',
        'Qual será a temperatura da sala daqui a uma hora? Um número em graus, regressão.',
      ] },
      { tipo: 'p', texto: 'Repare que a mesma tabela costuma servir para os dois caminhos. A base de ambiente permite prever a temperatura e também classificar o conforto térmico. Não existe resposta única: existe a pergunta que interessa ao projeto.' },
      { tipo: 'h2', texto: 'Cada caminho pede uma métrica' },
      { tipo: 'p', texto: 'Em classificação, acurácia sozinha engana quando as classes são desiguais. Se apenas 10% dos casos são falha, um modelo que diz sempre que está tudo bem acerta 90% e não serve para nada. Por isso entram precisão e recall, que separam o alarme falso do alarme perdido.' },
      { tipo: 'p', texto: 'Em regressão, o erro absoluto médio é o número mais fácil de comunicar, porque sai na unidade do problema. Dizer que o modelo erra em média 3 kWh conversa direto com a conta de luz. O R² ajuda a comparar modelos entre si, mas explica pouco para quem vai usar o resultado.' },
      { tipo: 'citacao', texto: 'Escolha a métrica antes de treinar. Depois do resultado, é tentador escolher aquela que ficou mais bonita.' },
      { tipo: 'p', texto: 'Na dúvida, escreva a pergunta em uma frase e mostre para alguém de fora do projeto. Se a pessoa entender qual resposta espera receber, o tipo de problema fica evidente e o resto do caminho segue mais leve.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'prompts-que-funcionam',
    titulo: 'Como pedir código a um agente e receber algo que roda',
    resumo:
      'A diferença entre um prompt vago e um prompt bem montado costuma ser de meia hora de trabalho. Sete hábitos que economizam tempo.',
    categoria: 'Prática',
    leitura: '6 minutos',
    data: 'Março de 2025',
    icone: MessageSquare,
    cor: 'ambar',
    conteudo: [
      { tipo: 'p', texto: 'Um agente de IA responde ao que recebe. Pedidos genéricos produzem código genérico, que quase roda e quase resolve. Alguns cuidados simples elevam bastante a qualidade da primeira resposta.' },
      { tipo: 'h2', texto: '1. Diga quem você é' },
      { tipo: 'p', texto: 'Informar que você é estudante de engenharia com pouca prática em Python muda o tom e o nível de detalhe da explicação. O modelo passa a comentar o código e a evitar atalhos que só fazem sentido para quem já domina a biblioteca.' },
      { tipo: 'h2', texto: '2. Cole o cabeçalho real do arquivo' },
      { tipo: 'p', texto: 'Nomes de coluna inventados geram código que quebra na primeira execução. Copiar a primeira linha do CSV resolve o problema antes de ele existir. Se puder, cole também duas linhas de exemplo.' },
      { tipo: 'h2', texto: '3. Peça um modelo simples' },
      { tipo: 'p', texto: 'Sem essa instrução, o agente às vezes sugere arquiteturas grandes que demoram para treinar e não cabem no tempo do encontro. Árvore de decisão, regressão logística e floresta aleatória atendem à maioria dos casos com dados de sensores.' },
      { tipo: 'h2', texto: '4. Defina o formato da saída' },
      { tipo: 'lista', itens: [
        'Uma célula única, para colar direto no Colab.',
        'Comentários em português.',
        'Métricas impressas no fim.',
        'Apenas pandas, scikit-learn e matplotlib.',
      ] },
      { tipo: 'h2', texto: '5. Devolva o erro inteiro' },
      { tipo: 'p', texto: 'Ao aparecer uma exceção, cole a mensagem completa com o traceback, não apenas a última linha. O agente localiza a origem muito mais rápido quando enxerga a pilha de chamadas.' },
      { tipo: 'h2', texto: '6. Duvide do resultado perfeito' },
      { tipo: 'p', texto: 'Acurácia altíssima merece uma pergunta de checagem. Peça ao agente para procurar vazamento de informação entre as variáveis de entrada. Vale a pena tornar isso rotina.' },
      { tipo: 'h2', texto: '7. Peça a explicação junto com o código' },
      { tipo: 'p', texto: 'Código sem entendimento vira dependência. Solicitar um parágrafo em linguagem comum sobre o que o modelo fez transforma a ferramenta em material de estudo, e é isso que sobra depois do workshop.' },
      { tipo: 'citacao', texto: 'O agente escreve rápido. A responsabilidade de conferir continua sua.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'metricas-sem-misterio',
    titulo: 'Métricas sem mistério para quem vem da eletrônica',
    resumo:
      'Acurácia, precisão, recall e erro médio explicados com exemplos de motor, reservatório e consumo de energia.',
    categoria: 'Fundamentos',
    leitura: '5 minutos',
    data: 'Março de 2025',
    icone: Gauge,
    cor: 'verde',
    conteudo: [
      { tipo: 'p', texto: 'Toda métrica responde a uma pergunta específica. Saber qual pergunta cada número responde evita discussões longas sobre resultados que ninguém interpretou direito.' },
      { tipo: 'h2', texto: 'Acurácia' },
      { tipo: 'p', texto: 'É a fração de acertos sobre o total. Funciona bem quando as classes têm tamanhos parecidos. Na base de motores, com 10% de alertas, um classificador preguiçoso alcança 90% dizendo sempre que está tudo normal. O número parece ótimo e a manutenção continua sendo pega de surpresa.' },
      { tipo: 'h2', texto: 'Precisão e recall' },
      { tipo: 'p', texto: 'Precisão responde: entre os alarmes que disparei, quantos eram reais? Recall responde: entre as falhas que aconteceram, quantas eu avisei? A primeira mede o incômodo do alarme falso, a segunda mede o risco de deixar passar.' },
      { tipo: 'lista', itens: [
        'Precisão baixa: a equipe para a máquina à toa e passa a ignorar o sistema.',
        'Recall baixo: a máquina quebra sem aviso e o prejuízo é grande.',
        'Elevar uma costuma derrubar a outra, e o equilíbrio depende do custo de cada erro.',
      ] },
      { tipo: 'h2', texto: 'Matriz de confusão' },
      { tipo: 'p', texto: 'É a tabela que mostra acertos e erros separados por classe. Vale mais que qualquer número isolado, porque revela onde o modelo se confunde. Na base de ultrassônico, por exemplo, é comum errar entre aproximando e afastando, o que sugere que a taxa de variação precisa de mais atenção.' },
      { tipo: 'h2', texto: 'Erro absoluto médio' },
      { tipo: 'p', texto: 'Em regressão, esse é o número mais claro para comunicar. Ele diz, em média, quantas unidades o modelo erra. Prever consumo com erro de 3 kWh em uma faixa que vai de 8 a 78 kWh é um resultado defensável. O mesmo erro em uma faixa de 5 a 10 kWh seria péssimo, e só o contexto revela isso.' },
      { tipo: 'citacao', texto: 'Compare sempre com um palpite ingênuo. Se repetir o valor da hora anterior erra menos que o modelo, o modelo não está pronto.' },
      { tipo: 'p', texto: 'Essa comparação com uma referência simples é a prática que mais separa um projeto sério de uma demonstração bonita. Ela custa cinco minutos e evita conclusões precipitadas.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'do-colab-para-o-esp32',
    titulo: 'Do notebook para o ESP32: o que muda quando o modelo embarca',
    resumo:
      'Treinar na nuvem é a parte confortável. Rodar a decisão dentro de um microcontrolador impõe restrições que mudam escolhas anteriores.',
    categoria: 'Hardware',
    leitura: '6 minutos',
    data: 'Março de 2025',
    icone: CircuitBoard,
    cor: 'ciano',
    conteudo: [
      { tipo: 'p', texto: 'O modelo treinado no Colab vive em um ambiente generoso: memória de sobra, ponto flutuante rápido e todas as bibliotecas disponíveis. O ESP32 trabalha com poucas centenas de kilobytes de RAM e precisa responder em milissegundos, muitas vezes alimentado por bateria.' },
      { tipo: 'h2', texto: 'A árvore é a ponte mais curta' },
      { tipo: 'p', texto: 'Uma árvore de decisão treinada é apenas uma sequência de comparações. Exportá-la para C significa transformar cada nó em um if aninhado. Não há multiplicação de matriz, não há biblioteca externa, e o resultado ocupa alguns kilobytes.' },
      { tipo: 'codigo', texto: 'if (desvio_padrao_cm <= 4.8) {\n  if (variacao_cm_por_s <= 1.2) return LIVRE;\n  return OBJETO_PARADO;\n} else {\n  if (variacao_cm_por_s <= -8.0) return APROXIMANDO;\n  return AFASTANDO;\n}' },
      { tipo: 'p', texto: 'Esse trecho é a saída típica de uma árvore rasa treinada com a base de ultrassônico. Ele roda em qualquer microcontrolador de oito bits e ainda pode ser lido e discutido por um humano, o que ajuda na hora de justificar o comportamento do sistema.' },
      { tipo: 'h2', texto: 'O ponto delicado são as features' },
      { tipo: 'p', texto: 'Se o treino usou desvio padrão de uma janela de vinte leituras, o firmware precisa calcular exatamente a mesma coisa, com a mesma janela e a mesma taxa de amostragem. Divergências aqui são a causa mais comum de um modelo que funcionava no notebook e falha na bancada.' },
      { tipo: 'lista', itens: [
        'Anote a taxa de amostragem usada na coleta e mantenha no firmware.',
        'Repita o mesmo tamanho de janela e a mesma ordem das operações.',
        'Cuidado com unidades. Trocar g por metros por segundo ao quadrado quebra tudo em silêncio.',
        'Teste com um conjunto de leituras conhecidas e compare a saída dos dois lados.',
      ] },
      { tipo: 'h2', texto: 'Quando faz sentido ir além' },
      { tipo: 'p', texto: 'Redes neurais pequenas cabem em ESP32 com ferramentas próprias para isso, e valem a pena em áudio ou imagem. Para sinais de sensor com poucas grandezas, a árvore costuma entregar desempenho equivalente com uma fração do esforço. Comece pelo simples e suba a complexidade apenas quando o resultado exigir.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'armadilhas-com-dados-de-sensores',
    titulo: 'Cinco armadilhas comuns com dados de sensores',
    resumo:
      'Erros que aparecem em quase todo primeiro projeto e custam caro quando passam despercebidos até a apresentação.',
    categoria: 'Prática',
    leitura: '5 minutos',
    data: 'Março de 2025',
    icone: AlertTriangle,
    cor: 'ambar',
    conteudo: [
      { tipo: 'h2', texto: '1. Vazamento de informação' },
      { tipo: 'p', texto: 'Acontece quando uma coluna de entrada carrega a resposta. Na base de ocupação, a contagem de pessoas revela diretamente se a sala está ocupada. O modelo acerta tudo, a turma comemora e o resultado não tem valor algum. Ao ver acurácia perto de 100%, procure primeiro por vazamento.' },
      { tipo: 'h2', texto: '2. Embaralhar uma série temporal' },
      { tipo: 'p', texto: 'A divisão aleatória de treino e teste espalha instantes vizinhos entre os dois conjuntos. Como leituras próximas no tempo são muito parecidas, o modelo praticamente memoriza a resposta. Em séries temporais, separe por corte cronológico: treine com o começo do período e teste com o fim.' },
      { tipo: 'h2', texto: '3. Ignorar o desequilíbrio das classes' },
      { tipo: 'p', texto: 'Eventos interessantes costumam ser raros. Falha de motor, vazamento e queda aparecem em uma fração pequena das amostras, e é justamente essa fração que importa. Acompanhe recall, ajuste o peso das classes ou o limiar de decisão conforme o custo do erro.' },
      { tipo: 'h2', texto: '4. Esquecer as unidades e a calibração' },
      { tipo: 'p', texto: 'Sensores do mesmo modelo têm dispersão de fábrica. Um modelo treinado com um MQ-135 específico pode errar feio com outro exemplar. Sempre que possível, registre qual dispositivo gerou cada leitura e verifique se o modelo continua bom ao trocar de unidade.' },
      { tipo: 'h2', texto: '5. Achar que mais dados resolvem tudo' },
      { tipo: 'p', texto: 'Mil leituras de uma sala vazia não ensinam nada sobre sala cheia. O que importa é a variedade de situações representadas, não o volume bruto. Vale mais uma tarde coletando cenários diferentes do que uma semana registrando sempre a mesma condição.' },
      { tipo: 'citacao', texto: 'Todo dado tem uma história de como foi coletado. Quem conhece essa história interpreta melhor o modelo.' },
    ],
  },
];

export const acharPost = (slug) => posts.find((p) => p.slug === slug);

export const categoriasPost = ['Todos', ...Array.from(new Set(posts.map((p) => p.categoria)))];
