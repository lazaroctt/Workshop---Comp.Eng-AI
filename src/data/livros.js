/**
 * Livros recomendados na aba Dicas e vídeos.
 *
 * Edições conferidas em setembro de 2026 nas páginas das editoras e em
 * catálogos de livrarias. O link aparece só quando a página da editora foi
 * verificada; os demais livros são identificados por autor, editora e ano.
 */

export const gruposLivros = [
  {
    id: 'comecar',
    titulo: 'Para começar',
    texto: 'Leituras sem pré-requisito, boas para entender o que é aprendizado de máquina e o que ele não é.',
  },
  {
    id: 'aprofundar',
    titulo: 'Para aprofundar',
    texto: 'Livros técnicos para quem já treinou o primeiro modelo e quer entender o que acontece por dentro e em produção.',
  },
  {
    id: 'etica',
    titulo: 'Ética e sociedade',
    texto: 'O que acontece quando algoritmos passam a decidir sobre crédito, emprego, justiça e visibilidade nas redes.',
  },
];

export const livros = [
  /* Para começar ------------------------------------------------------- */
  {
    grupo: 'comecar',
    titulo: 'Você parece uma coisa e eu te amo',
    subtitulo: 'Como a inteligência artificial funciona e por que está fazendo do mundo um lugar mais estranho',
    autores: 'Janelle Shane',
    editora: 'Alta Books',
    ano: 2022,
    descricao: 'Com humor, a autora mostra sistemas de IA que ela mesma treinou para inventar nomes de cores e receitas. Os erros engraçados explicam melhor do que qualquer fórmula como esses sistemas aprendem.',
    url: 'https://altabooks.com.br/produto/voce-parece-uma-coisa-e-eu-te-amo/',
  },
  {
    grupo: 'comecar',
    titulo: 'O algoritmo mestre',
    subtitulo: 'Como a busca pelo algoritmo de machine learning definitivo recriará nosso mundo',
    autores: 'Pedro Domingos',
    editora: 'Novatec',
    ano: 2017,
    descricao: 'Um passeio pelas grandes escolas do aprendizado de máquina, escrito pelo mesmo pesquisador da Universidade de Washington citado nos artigos desta plataforma.',
  },
  {
    grupo: 'comecar',
    titulo: 'Desmistificando a inteligência artificial',
    autores: 'Dora Kaufman',
    editora: 'Autêntica',
    ano: 2022,
    descricao: 'Textos curtos de uma pesquisadora da PUC-SP sobre o que é IA, seus efeitos no trabalho e na economia, as questões éticas e a regulação.',
    url: 'https://www.grupoautentica.com.br/produto/desmistificando-a-inteligencia-artificial-367',
  },

  /* Para aprofundar ---------------------------------------------------- */
  {
    grupo: 'aprofundar',
    titulo: 'Projetando sistemas de machine learning',
    subtitulo: 'Processo interativo para aplicações prontas para produção',
    autores: 'Chip Huyen',
    editora: 'Alta Books',
    ano: 2024,
    descricao: 'O que acontece depois do notebook: dados de treino, avaliação, implantação e monitoramento de modelos que precisam funcionar todos os dias.',
    url: 'https://altabooks.com.br/produto/projetando-sistemas-de-machine-learning/',
  },
  {
    grupo: 'aprofundar',
    titulo: 'Mãos à obra: aprendizado de máquina com Scikit-Learn, Keras & TensorFlow',
    autores: 'Aurélien Géron',
    editora: 'Alta Books',
    ano: 2021,
    descricao: 'Guia prático com exemplos concretos e pouca teoria, do scikit-learn às redes neurais com TensorFlow. Bom para ter ao lado enquanto se programa.',
  },
  {
    grupo: 'aprofundar',
    titulo: 'Data science do zero',
    subtitulo: 'Noções fundamentais com Python',
    autores: 'Joel Grus',
    editora: 'Alta Books',
    edicao: '2ª edição',
    ano: 2021,
    descricao: 'Constrói do zero, em Python, as bases da ciência de dados: álgebra linear, estatística, probabilidade e os principais modelos de aprendizado.',
    url: 'https://altabooks.com.br/produto/data-science-do-zero-2/',
  },
  {
    grupo: 'aprofundar',
    titulo: 'Python para análise de dados',
    subtitulo: 'Tratamento de dados com pandas, NumPy & Jupyter',
    autores: 'Wes McKinney',
    editora: 'Novatec',
    edicao: '3ª edição',
    ano: 2023,
    descricao: 'Escrito pelo criador do pandas. Ensina a carregar, limpar e transformar dados, o trabalho que vem antes de qualquer modelo.',
    url: 'https://novatec.com.br/livros/python-para-analise-de-dados-3ed/',
  },
  {
    grupo: 'aprofundar',
    titulo: 'Inteligência artificial: uma abordagem de aprendizado de máquina',
    autores: 'Katti Faceli, Ana Carolina Lorena, João Gama, Tiago A. de Almeida e André C. P. L. F. de Carvalho',
    editora: 'LTC',
    edicao: '2ª edição',
    ano: 2021,
    descricao: 'Referência brasileira escrita por pesquisadores da USP e da UFSCar, entre outros, com exemplos em Python. A primeira edição recebeu o Prêmio Jabuti.',
    url: 'https://www.grupogen.com.br/livro-inteligencia-artificial-uma-abordagem-de-aprendizado-de-maquina-katti-faceli-ana-carolina-lorena-joao-gama-tiago-a-de-almeida-e-andre-c-p-l-f-de-carvalho-editora-ltc-9788521639206',
  },
  {
    grupo: 'aprofundar',
    titulo: 'Inteligência artificial: uma abordagem moderna',
    autores: 'Stuart Russell e Peter Norvig',
    editora: 'GEN LTC',
    edicao: '4ª edição',
    ano: 2022,
    descricao: 'O livro-texto de referência da área. A quarta edição dá mais espaço ao aprendizado de máquina e ao aprendizado profundo.',
    url: 'https://www.grupogen.com.br/livro-inteligencia-artificial-uma-abordagem-moderna-stuart-russell-e-peter-norvig-9788595158870',
  },
  {
    grupo: 'aprofundar',
    titulo: 'TinyML',
    subtitulo: 'Machine learning with TensorFlow Lite on Arduino and ultra-low-power microcontrollers',
    autores: 'Pete Warden e Daniel Situnayake',
    editora: "O'Reilly",
    ano: 2019,
    idioma: 'Em inglês',
    descricao: 'Para levar modelos a microcontroladores, com projetos passo a passo: reconhecimento de voz, detecção de pessoas por câmera e gestos com acelerômetro.',
  },

  /* Ética e sociedade -------------------------------------------------- */
  {
    grupo: 'etica',
    titulo: 'Algoritmos de destruição em massa',
    subtitulo: 'Como o big data aumenta a desigualdade e ameaça a democracia',
    autores: "Cathy O'Neil",
    editora: 'Rua do Sabão',
    ano: 2021,
    descricao: 'Uma matemática mostra como modelos usados para decidir sobre crédito, emprego e justiça podem reforçar a discriminação que prometiam eliminar.',
    url: 'https://www.editoraruadosabao.com.br/rua-do-sabao/algoritmos-de-destruicao-em-massa',
  },
  {
    grupo: 'etica',
    titulo: 'Racismo algorítmico',
    subtitulo: 'Inteligência artificial e discriminação nas redes digitais',
    autores: 'Tarcízio Silva',
    editora: 'Edições Sesc São Paulo',
    ano: 2022,
    descricao: 'Pesquisa brasileira sobre como buscadores, redes sociais, visão computacional e reconhecimento facial podem reproduzir e reforçar o racismo.',
    url: 'https://portal.sescsp.org.br/online/edicoes-sesc/1076_RACISMO+ALGORITMICO+INTELIGENCIA+ARTIFICIAL+E+DISCRIMINACAO+NAS+REDES+DIGITAIS',
  },
];
