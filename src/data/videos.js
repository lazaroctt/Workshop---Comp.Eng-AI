/**
 * Vídeos da aba Dicas e vídeos, organizados em grupos.
 *
 * Vídeos escolhidos e conferidos em setembro de 2026: todos existem, estão
 * públicos e permitem incorporação. As descrições resumem o que cada vídeo
 * de fato apresenta, segundo a página no YouTube.
 *
 * Para trocar um vídeo, cole outro link no campo embedUrl. Qualquer formato
 * do YouTube funciona:
 *   https://www.youtube.com/watch?v=ID_DO_VIDEO
 *   https://youtu.be/ID_DO_VIDEO
 *   https://www.youtube.com/embed/ID_DO_VIDEO
 *   https://www.youtube.com/playlist?list=ID_DA_PLAYLIST
 * Com o campo vazio, o cartão mostra o aviso "Vídeo em breve".
 */

export const gruposVideos = [
  { id: 'conceitos', titulo: 'Conceitos' },
  { id: 'pratica', titulo: 'Ferramentas e prática' },
  { id: 'etica', titulo: 'Ética em IA' },
];

export const videos = [
  /* Conceitos ---------------------------------------------------------- */
  {
    id: 'quando-o-if-nao-basta',
    grupo: 'conceitos',
    titulo: 'Quando o if já não resolve',
    descricao:
      'A virada de paradigma em poucos minutos: em vez de programar regras explícitas, treinar um sistema com dados para que ele descubra as regras sozinho.',
    fonte: 'TensorFlow, canal do Google · série ML de Zero a 100',
    tema: 'Conceitos',
    embedUrl: 'https://www.youtube.com/watch?v=t5z5lyrb-7s',
  },
  {
    id: 'introducao-ml',
    grupo: 'conceitos',
    titulo: 'Introdução a machine learning',
    descricao:
      'Aula sobre os conceitos básicos de aprendizado de máquina, os diferentes tipos de aprendizado e suas aplicações.',
    fonte: 'UNIVESP · Prof. José Avelino Placca',
    tema: 'Conceitos',
    embedUrl: 'https://www.youtube.com/watch?v=sLZeBzFPi10',
  },
  {
    id: 'ciencia-de-dados',
    grupo: 'conceitos',
    titulo: 'O que é ciência de dados',
    descricao:
      'Primeira aula da disciplina de ciência de dados da UNIVESP, com uma visão geral do cenário da área para quem está chegando.',
    fonte: 'UNIVESP · Prof. José Eduardo Santarem Segundo',
    tema: 'Ciência de dados',
    embedUrl: 'https://www.youtube.com/watch?v=z6jbqkmshig',
  },

  /* Ferramentas e prática ---------------------------------------------- */
  {
    id: 'google-colab',
    grupo: 'pratica',
    titulo: 'Usando o Google Colab',
    descricao:
      'O que é o Colab e como usá-lo para rodar Python no navegador, com notebooks que reúnem código, texto e gráficos.',
    fonte: 'Locaweb',
    tema: 'Ferramentas',
    embedUrl: 'https://www.youtube.com/watch?v=nlnL14_4jO0',
  },
  {
    id: 'scikit-learn',
    grupo: 'pratica',
    titulo: 'Primeiros passos com scikit-learn',
    descricao:
      'As primeiras linhas de código com a biblioteca: como carregar conjuntos de dados e a notação que ela usa para entradas e alvo.',
    fonte: 'Programação Dinâmica · série Machine Learning',
    tema: 'Ferramentas',
    embedUrl: 'https://www.youtube.com/watch?v=39HBlzFV9vk',
  },
  {
    id: 'primeiro-classificador',
    grupo: 'pratica',
    titulo: 'Seu primeiro modelo de classificação',
    descricao:
      'A construção de uma árvore de decisão a partir de um conjunto de dados simples, com Python e scikit-learn, passo a passo.',
    fonte: 'Insight Lab, UFC · Prof. Regis Pires',
    tema: 'Prática',
    embedUrl: 'https://www.youtube.com/watch?v=j8Ow8haJUZ0',
  },

  /* Ética em IA -------------------------------------------------------- */
  {
    id: 'etica-implicacoes',
    grupo: 'etica',
    titulo: 'Implicações éticas e sociais da inteligência artificial',
    descricao:
      'O que muda quando delegamos decisões a máquinas e algoritmos, e quais questões éticas precisam entrar no desenvolvimento dessas tecnologias.',
    fonte: 'Canal USP · USP Talks com Marcelo Finger',
    tema: 'Ética',
    embedUrl: 'https://www.youtube.com/watch?v=CjiOJDdahl4',
  },
  {
    id: 'etica-privacidade',
    grupo: 'etica',
    titulo: 'Ética e privacidade em machine learning',
    descricao:
      'Aula que passa por algoritmos de aprendizado, pelo equilíbrio entre viés e variância e pelas questões de ética e privacidade dos dados.',
    fonte: 'UNIVESP · Prof. José Eduardo Santarem Segundo',
    tema: 'Ética',
    embedUrl: 'https://www.youtube.com/watch?v=LkaAk5z12fU',
  },
];
