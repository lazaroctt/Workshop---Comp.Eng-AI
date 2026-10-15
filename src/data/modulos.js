/**
 * Módulos da trilha do workshop, na ordem em que são percorridos.
 *
 * Cada módulo vira um ponto na aba Trilha e uma página própria em
 * #/trilha/<slug>. Para completar o material de um módulo, edite os campos
 * abaixo; nenhum outro arquivo precisa mudar.
 *
 *   resumo     Uma linha, exibida no ponto da trilha.
 *   lide       Parágrafo de abertura da página do módulo.
 *   secoes     Corpo do texto: cada seção tem título (opcional), parágrafos
 *              e, se quiser, uma lista com marcadores logo depois deles.
 *              Para negrito, envolva o trecho em asteriscos duplos: **assim**.
 *              Para link, use [texto do link](https://endereço). As duas
 *              marcações também valem no lide.
 *   videos     Vídeos incorporados. Cole o link do YouTube em embedUrl;
 *              com o campo vazio, o quadro mostra "Vídeo em breve".
 *   materiais  Anexos e links. O tipo define o ícone e o comportamento:
 *                interno   página desta plataforma, como '#/bases'
 *                externo   site de terceiros, abre em nova aba
 *                arquivo   arquivo para baixar. Coloque o arquivo em
 *                          public/materiais/ e use '/materiais/nome.pdf'
 *   extra      Com true, o módulo é opcional: aparece depois do fim da
 *              trilha, com o rótulo Módulo extra, e não conta no progresso.
 *   rascunho   Enquanto for true, a página mostra o aviso de conteúdo em
 *              preparação. Troque para false quando o material estiver pronto.
 *
 * Regra de escrita: nada de travessões no texto. Use vírgula, ponto,
 * parênteses ou dois pontos.
 */

export const modulos = [
  {
    slug: 'apresentacao',
    titulo: 'Apresentação e conhecendo as ferramentas',
    resumo: 'Quem somos, como o workshop funciona e as ferramentas que vamos usar.',
    lide:
      'O ponto de partida: quem conduz o workshop, o que você vai construir ao longo dos módulos e o conjunto de ferramentas que acompanha todo o percurso, do navegador ao agente de IA.',
    rascunho: false,
    secoes: [
      {
        titulo: 'Neste módulo',
        paragrafos: [
          'Apresentação do LACOP, da proposta do workshop e do formato dos encontros.',
          'Tour pelas ferramentas: Google Colab para rodar código no navegador, um agente de IA gratuito (Claude ou ChatGPT) e as bases de dados de sensores desta plataforma.',
        ],
      },
      {
        titulo: 'Antes de seguir',
        paragrafos: [
          'Confira se você consegue abrir o Google Colab com a sua conta Google e iniciar uma conversa no agente de IA de sua preferência. Isso é tudo o que precisa estar pronto para o próximo módulo.',
        ],
      },
    ],
    videos: [
      {
        id: 'modulo-1-parte-1',
        titulo: 'Boas-vindas ao workshop (parte 1)',
        embedUrl: 'https://www.youtube.com/watch?v=0wwskEfipYM',
      },
      {
        id: 'modulo-1-parte-2',
        titulo: 'Boas-vindas ao workshop (parte 2)',
        embedUrl: 'https://www.youtube.com/watch?v=zxaRm4oUsoo',
      },
    ],
    materiais: [
      {
        titulo: 'O que ter em mãos antes de começar',
        descricao: 'Lista curta com o necessário para acompanhar o workshop.',
        tipo: 'interno',
        url: '#/dicas',
      },
    ],
  },
  {
    slug: 'o-que-e-ia',
    titulo: 'O que é inteligência artificial e por que aprender agora',
    resumo: 'O que a IA é de fato, onde ela já está e por que vale aprender agora.',
    lide:
      'Antes de usar a ferramenta, vale entender o que ela é. Este módulo separa o que a inteligência artificial realmente faz do que se fala sobre ela, e mostra por que dados de sensores são um ótimo lugar para começar.',
    rascunho: false,
    secoes: [
      {
        paragrafos: [
          'Pessoal, antes de eu postar o vídeo do módulo, vocês já podem ir assistindo a essas três recomendações.',
        ],
        lista: [
          'Comecem por **"O vídeo para entender a Inteligência Artificial de verdade"**, que explora a história e a filosofia da área desde o Teste de Turing, detalhando a evolução técnica dos modelos de linguagem até a arquitetura Transformer, além de debater o que realmente significa o entendimento e a consciência das máquinas. É um vídeo/documentário bem legal, vale muito a pena assistir, e para quem gostar do modelo de vídeo, recomendo **"A ideia que tornou a Inteligência Artificial possível"**.',
          'Em seguida, assistam a **"Large Language Models explained briefly"**, uma animação que ilustra como esses grandes modelos operam como funções matemáticas, ajustando bilhões de parâmetros para prever palavras através de treinamentos com vastos dados da internet e refinamento por reforço humano. O vídeo é em inglês mas é possível adicionar legenda e alterar o áudio para Português-BR.',
          'Por fim, confiram **"O que eu faria se começasse a estudar IA HOJE?"**, que oferece guias práticos de estudos e divide o mercado de trabalho em diferentes camadas de atuação, destacando a importância da base matemática e de linguagens de programação, como Python, para quem deseja desenvolver ou integrar ferramentas de inteligência artificial em projetos reais.',
        ],
      },
    ],
    // Na ordem recomendada no texto acima.
    videos: [
      {
        id: 'modulo-2-entender-ia',
        titulo: 'O vídeo para entender a Inteligência Artificial de verdade',
        fonte: 'Infinitamente',
        embedUrl: 'https://www.youtube.com/watch?v=V2POyQVQuzA',
      },
      {
        id: 'modulo-2-ideia-ia',
        titulo: 'A ideia que tornou a Inteligência Artificial possível',
        fonte: 'Infinitamente',
        embedUrl: 'https://www.youtube.com/watch?v=mBqfY_TX_8o',
      },
      {
        id: 'modulo-2-llm',
        titulo: 'Large Language Models explained briefly',
        fonte: '3Blue1Brown · em inglês, com legenda e áudio em português disponíveis',
        embedUrl: 'https://www.youtube.com/watch?v=LPZh9BOjkQs',
      },
      {
        id: 'modulo-2-estudar-ia-hoje',
        titulo: 'O que eu faria se começasse a estudar IA HOJE?',
        fonte: 'Asimov Academy',
        embedUrl: 'https://www.youtube.com/watch?v=qzvjmHMwCl4',
      },
    ],
    materiais: [
      {
        titulo: 'Artigos da plataforma',
        descricao: 'Textos em ordem de leitura, a partir do conceito de aprendizado de máquina.',
        tipo: 'interno',
        url: '#/artigos',
      },
    ],
  },
  {
    slug: 'vocabulario-e-prompt',
    titulo: 'O vocabulário essencial e a engenharia de prompt',
    resumo: 'Os termos que aparecem em toda conversa sobre IA e como escrever bons prompts.',
    lide:
      'Antes de colocar a mão na massa, vale conhecer as ideias e as palavras que vão aparecer o tempo todo no workshop. São poucas e simples, e entendê-las agora evita que você trave mais adiante. Este módulo reúne dois pilares que caminham juntos: o vocabulário essencial do aprendizado de máquina e a engenharia de prompt, que é a arte de conversar com a inteligência artificial para obter o que você precisa.',
    rascunho: false,
    secoes: [
      {
        titulo: 'Para acompanhar e consultar depois, preparei os materiais abaixo',
        paragrafos: [
          'Vale a leitura antes de avançar para a parte prática.',
          'O **Glossário do Workshop** reúne, em poucas páginas, todos os termos importantes com definições curtas e diretas. Guarde por perto e volte a ele sempre que encontrar uma palavra nova durante o projeto. Funciona como um dicionário de bolso do workshop.',
          'O **documento de Engenharia de Prompt** mostra, com exemplos ligados ao nosso próprio projeto, o que separa um pedido fraco de um pedido bom. Como no workshop é a inteligência artificial que escreve o código, saber pedir com clareza é a habilidade que mais faz diferença no seu resultado. Recomendo fortemente a leitura, pois ela vai poupar seu tempo e melhorar tudo que você produzir daqui em diante.',
          'Por fim, incluí um vídeo complementar, Engenharia de Prompt, o Guia Definitivo, para quem quiser se aprofundar além do necessário. Ele é mais longo e detalhado, então encare como um convite opcional, voltado a quem deseja dominar o assunto de verdade. A ideia central do workshop é justamente essa, ir além do básico e ajudar você a compreender a riqueza que existe por trás de conversar com uma inteligência artificial.',
          'Comece pelo vídeo do módulo, depois explore os materiais no seu ritmo. Qualquer dúvida, é só chamar.',
        ],
      },
    ],
    videos: [
      {
        id: 'modulo-3-guia-prompt',
        titulo: 'Engenharia de prompt: o guia definitivo',
        fonte: 'Bruno Picinini',
        embedUrl: 'https://www.youtube.com/watch?v=1VDcke66TRE',
      },
    ],
    materiais: [
      {
        titulo: 'Glossário do workshop (PDF)',
        descricao: 'Definições curtas dos termos que aparecem durante o projeto. Guarde por perto.',
        tipo: 'arquivo',
        url: '/materiais/glossario-do-workshop.pdf',
      },
      {
        titulo: 'Engenharia de prompt (PDF)',
        descricao: 'Os quatro pilares de um bom prompt, com exemplos de pedidos fracos e bons.',
        tipo: 'arquivo',
        url: '/materiais/engenharia-de-prompt.pdf',
      },
      {
        titulo: 'Biblioteca de prompts',
        descricao: 'Prompts prontos para copiar e adaptar à sua base.',
        tipo: 'interno',
        url: '#/dicas',
      },
    ],
  },
  {
    slug: 'realizando-um-projeto',
    titulo: 'Realizando um projeto',
    resumo: 'Da base de dados ao modelo treinado, com o agente de IA ao lado.',
    lide:
      'Chegou a parte mais importante do workshop: construir o seu próprio projeto de inteligência artificial, do início ao fim.',
    rascunho: false,
    secoes: [
      {
        paragrafos: [
          'Para te guiar, preparei um material completo em PDF com o passo a passo detalhado, tela por tela, de tudo que você precisa fazer. Ele cobre todo o caminho: acessar a plataforma do workshop, escolher e baixar uma base de dados, abrir o Google Colab, subir o arquivo, usar a inteligência artificial para gerar o código, executar e treinar o modelo, gerar o arquivo de resultado, visualizar o desempenho na plataforma e, por fim, emitir o PDF do seu projeto para entregar.',
          'Siga o material com calma, no seu ritmo. Cada passo está numerado e acompanhado de uma imagem, então você sempre saberá onde clicar. Não precisa decorar nada, deixe o guia aberto ao lado enquanto trabalha e vá acompanhando.',
          'Um ponto de atenção que vale destacar: a etapa que mais costuma gerar dúvida é a de rever o código gerado pela inteligência artificial. Dependendo do que você pedir, o código pode não combinar com a sua base de dados e dar erro. Isso é normal e faz parte do aprendizado. Se acontecer, não se preocupe, basta pedir à IA para ajustar, e no material há orientações sobre isso.',
          'Ao final, você terá treinado o seu primeiro modelo de machine learning, visto o resultado de forma visual e gerado um documento em PDF do seu projeto, pronto para anexar na atividade de entrega.',
          '**ATENÇÃO: Em caso de algum erro na realização de alguma etapa, entre em contato comigo para que eu possa ajudar na solução.**',
        ],
      },
    ],
    videos: [{ id: 'modulo-4-video', titulo: 'Passo a passo do projeto', embedUrl: '' }],
    materiais: [
      {
        titulo: 'Realizando um projeto: passo a passo (PDF)',
        descricao: 'O guia completo, tela por tela, da escolha da base ao PDF do projeto para entregar.',
        tipo: 'arquivo',
        url: '/materiais/realizando-um-projeto.pdf',
      },
      {
        titulo: 'Bases de dados',
        descricao: 'Bases de sensores prontas para baixar e bases públicas com dados reais.',
        tipo: 'interno',
        url: '#/bases',
      },
      {
        titulo: 'Meu Projeto',
        descricao: 'O prompt que gera o arquivo de resultado do seu modelo.',
        tipo: 'interno',
        url: '#/meu-projeto',
      },
    ],
  },
  {
    slug: 'leitura-critica',
    titulo: 'Lendo o resultado com senso crítico',
    resumo: 'Como interpretar métricas, comparar com uma referência e desconfiar do óbvio.',
    lide:
      'Um número alto não garante um bom modelo. Este módulo ensina a ler o resultado do seu projeto, comparar com uma referência simples e reconhecer os sinais de que algo deu errado.',
    rascunho: false,
    secoes: [
      {
        titulo: 'Neste módulo',
        paragrafos: [
          'Acurácia, erro médio e matriz de confusão, explicados com o seu próprio resultado.',
          'Vazamento de informação, nota perfeita e outras armadilhas comuns.',
        ],
      },
    ],
    videos: [{ id: 'modulo-5-video', titulo: 'Como ler o resultado de um modelo', embedUrl: '' }],
    materiais: [
      {
        titulo: 'Leitura do resultado na aba Meu Projeto',
        descricao: 'Envie o arquivo gerado no módulo anterior e veja o painel de leitura.',
        tipo: 'interno',
        url: '#/meu-projeto',
      },
    ],
  },
  {
    slug: 'etica-dos-dados',
    titulo: 'Ética sobre os dados na nova era da inteligência artificial',
    resumo: 'Privacidade, consentimento e vieses: o cuidado com os dados que alimentam a IA.',
    lide:
      'Um modelo é tão bom, e tão justo, quanto os dados que recebe. Por isso, todo projeto de inteligência artificial exige cuidado com os dados em três momentos: **de onde eles vêm, como são tratados e para onde vão.**',
    rascunho: false,
    secoes: [
      {
        paragrafos: ['O primeiro cuidado é com a origem dos dados:'],
        lista: [
          'De onde eles vieram? Foram coletados com permissão? Representam bem a realidade que o modelo vai enfrentar, ou deixam grupos de fora? Lembre-se de quando perguntamos, no seu projeto, de onde vinham os rótulos da sua base. Essa pergunta não é um detalhe, é o ponto de partida de qualquer trabalho responsável. Dados coletados de forma descuidada ou pouco representativa comprometem tudo o que vem depois.',
        ],
      },
      {
        paragrafos: ['O segundo cuidado é com o tratamento dos dados:'],
        lista: [
          'Antes de um modelo aprender, os dados passam por decisões humanas: o que incluir, o que descartar, como rotular cada exemplo. Cada uma dessas escolhas deixa uma marca no resultado. Rótulos mal feitos ensinam o modelo a errar, e informações que vazam para onde não deviam produzem resultados enganosos, aquilo que chamamos de vazamento de informação, um erro ao mesmo tempo técnico e ético.',
        ],
      },
      {
        paragrafos: ['O terceiro cuidado é com o destino dos dados:'],
        lista: [
          'Para onde eles vão depois de coletados? Quem tem acesso? Quando sensores captam informações de pessoas, surgem questões sérias de privacidade e de responsabilidade sobre o uso dessas informações. Saber onde os dados vão parar é tão importante quanto saber de onde vieram.',
        ],
      },
      {
        paragrafos: [
          'E quando os dados carregam preconceitos, por terem sido coletados de forma enviesada, tratados sem critério ou aplicados em contextos onde não representam todos? O modelo não apenas repete esses preconceitos, ele os amplifica em grande escala. Casos reais mostram isso, como sistemas de recrutamento que aprenderam a preferir homens e ferramentas de reconhecimento facial que erram mais com pessoas negras, sempre porque os dados por trás deles eram falhos. É a prova concreta de que descuidar dos dados tem consequências humanas reais.',
          'Reflita sobre esses três cuidados ao olhar para o seu próprio projeto. Eles mudam a forma como você interpreta qualquer resultado, e fazem de você um profissional mais consciente.',
          'Para aprofundar, leia o verbete [Discriminação algorítmica](https://pt.wikipedia.org/wiki/Discrimina%C3%A7%C3%A3o_algor%C3%ADtmica), que reúne os principais conceitos e casos reais de forma clara e acessível.',
          'Trouxe outros vídeos para auxiliar nesse módulo que envolvem outras visões éticas sobre os grandes agentes de inteligência artificial.',
        ],
      },
    ],
    videos: [
      {
        id: 'modulo-6-problema-ia',
        titulo: 'O verdadeiro problema de inteligências artificiais',
        fonte: 'Ciência Todo Dia',
        embedUrl: 'https://www.youtube.com/watch?v=IH-wBijX53M',
      },
      {
        id: 'modulo-6-karnal',
        titulo: 'A IA lançaria a bomba atômica? Karnal debate ética com a máquina',
        fonte: 'Prazer, Karnal',
        embedUrl: 'https://www.youtube.com/watch?v=sGYlQ2sHaZM',
      },
      {
        id: 'modulo-6-yampolskiy',
        titulo: 'AI ethics and the future of safety',
        fonte: 'Roman Yampolskiy, TEDxMiami · em inglês',
        embedUrl: 'https://www.youtube.com/watch?v=VQzK3cPWYTQ',
      },
    ],
    materiais: [
      {
        titulo: 'Discriminação algorítmica',
        descricao: 'Verbete da Wikipédia com os principais conceitos e casos reais.',
        tipo: 'externo',
        url: 'https://pt.wikipedia.org/wiki/Discrimina%C3%A7%C3%A3o_algor%C3%ADtmica',
      },
      {
        titulo: 'LGPD e inteligência artificial: o que programadores precisam saber',
        descricao: 'Artigo da Asimov Academy sobre proteção de dados pessoais em projetos de IA.',
        tipo: 'externo',
        url: 'https://hub.asimov.academy/blog/lgpd-ia/',
      },
    ],
  },
  {
    // Módulo extra: opcional, fica depois do fim da trilha e não conta no progresso.
    slug: 'extra-machine-learning-impa',
    extra: true,
    titulo: 'Machine Learning: Curso de Mestrado com Aprofundamento em Matemática (IMPA)',
    resumo: 'Videoaulas gratuitas do Instituto de Matemática Pura e Aplicada, para quem quer ir além do workshop.',
    lide:
      'Pessoal, quero compartilhar com vocês um dos melhores materiais de inteligência artificial disponíveis em português. O IMPA, o Instituto de Matemática Pura e Aplicada, uma das instituições de matemática mais respeitadas do mundo, disponibilizou gratuitamente as videoaulas de um curso completo de Machine Learning.',
    rascunho: false,
    secoes: [
      {
        paragrafos: [
          'Enquanto o nosso workshop foca em construir projeto mais simples, sem exigir matemática, este curso é o passo seguinte para quem quer entender a fundo o que acontece por dentro dos modelos. E aqui vai uma verdade honesta: não tem como fugir da matemática em Machine Learning. Ela é o que separa quem apenas usa as ferramentas de quem realmente domina a área. Ter essa base forte é, hoje, um dos maiores diferenciais que um profissional pode ter.',
        ],
      },
      {
        titulo: 'Pré-requisitos, leia com atenção',
        paragrafos: [
          'Este é um curso robusto e exigente. Ele é fortemente indicado para quem já tem, ou está disposto a construir, uma base sólida em:',
        ],
        lista: [
          '**Álgebra linear**, que é a linguagem com que os modelos representam e transformam os dados.',
          '**Estatística e probabilidade**, o alicerce de como os modelos aprendem a partir de dados.',
          '**Cálculo com otimização**, a parte matemática por trás do treinamento dos modelos.',
        ],
      },
      {
        paragrafos: [
          'Além disso, o curso usa **programação** para estruturar os códigos de treinamento, então alguma familiaridade com código ajuda bastante. Se você ainda não domina esses temas, tudo bem, encare o curso como uma meta e um mapa do que estudar.',
        ],
      },
      {
        titulo: 'O que o curso aborda',
        paragrafos: [
          'O conteúdo é amplo e segue o respeitado livro Introduction to Statistical Learning. Entre os temas, estão:',
        ],
        lista: [
          'Fundamentos do aprendizado e regressão linear.',
          'Classificação e métodos de reamostragem.',
          'Seleção de modelos e regularização.',
          'Máquinas de vetores de suporte, as SVMs.',
          'Métodos baseados em árvores.',
          'Aprendizado profundo, o deep learning.',
          'Aprendizado não supervisionado.',
        ],
      },
      {
        paragrafos: ['Ou seja, do básico ao avançado, cobrindo o que há de mais importante na área.'],
      },
      {
        titulo: 'Uma observação',
        paragrafos: [
          'As aulas são longas e densas, no formato de um curso universitário de verdade. Reserve tempo, assista com calma, pause para entender e, se possível, acompanhe com papel e caneta. O esforço vale cada minuto.',
          'Acesse o curso completo aqui: [https://w3.impa.br/~pauloo/teaching/ml/](https://w3.impa.br/~pauloo/teaching/ml/)',
          'Fica a recomendação para quem quer levar o conhecimento em inteligência artificial a um nível profundo. Qualquer dúvida, é só chamar.',
          '**Lembro a vocês que essa é uma recomendação. Não impacta de fato nosso workshop.**',
        ],
      },
    ],
    videos: [
      {
        id: 'extra-impa-aula-01',
        titulo: 'Mestrado em Machine Learning, aula 01 (05/01/2026)',
        fonte: 'Paulo Orenstein, IMPA',
        embedUrl: 'https://www.youtube.com/watch?v=dLLw6QjADjo',
      },
    ],
    materiais: [
      {
        titulo: 'Página do curso no IMPA',
        descricao: 'Todas as aulas, slides e informações do curso de Machine Learning.',
        tipo: 'externo',
        url: 'https://w3.impa.br/~pauloo/teaching/ml/',
      },
      {
        titulo: 'Aula 0: revisão de álgebra linear, probabilidade, estatística e otimização (PDF)',
        descricao: 'Slides de Paulo Orenstein, publicados na página do curso.',
        tipo: 'arquivo',
        url: 'https://w3.impa.br/~pauloo/teaching/ml/slides/aula_0.pdf',
      },
    ],
  },
];

export const SLUGS = modulos.map((m) => m.slug);

/** Módulos que contam para o progresso; os extras são opcionais. */
export const obrigatorios = modulos.filter((m) => !m.extra);
export const extras = modulos.filter((m) => m.extra);

export const acharModulo = (slug) => modulos.find((m) => m.slug === slug) ?? null;

/** Número do módulo obrigatório com dois dígitos, como 03. */
export const numeroModulo = (m) => String(obrigatorios.indexOf(m) + 1).padStart(2, '0');

/** Rótulo curto do módulo: "Módulo 03" ou "Módulo extra". */
export const rotuloModulo = (m) => (m.extra ? 'Módulo extra' : `Módulo ${numeroModulo(m)}`);

const EXTENSO = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'];

/** Quantidade por extenso, para textos como "seis módulos". */
export const porExtenso = (n) => EXTENSO[n] ?? String(n);
