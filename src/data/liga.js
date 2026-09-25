/**
 * Conteúdo da Liga de IA Acadêmica e link do formulário de interesse.
 */

/* ====================================================================
 * PLACEHOLDER: link do Google Forms de interesse na Liga.
 * ====================================================================
 * Cole o endereço do formulário em FORMULARIO_CONFIGURADO abaixo, no formato
 * https://forms.gle/CODIGO ou https://docs.google.com/forms/d/e/CODIGO/viewform
 * Enquanto estiver vazio, a página mostra o aviso de que as inscrições abrem em
 * breve e o botão fica desativado. Também é possível informar o endereço sem
 * mexer no código: crie a variável VITE_FORMULARIO_LIGA no painel da Vercel e
 * publique de novo, porque a variável é lida no build.
 */
const FORMULARIO_CONFIGURADO = 'https://forms.gle/bKzgb745HYiSzfSA7';

export const FORMULARIO_LIGA = FORMULARIO_CONFIGURADO || import.meta.env.VITE_FORMULARIO_LIGA || '';

/** O que costuma acontecer em uma liga acadêmica de IA. */
export const atividadesLiga = [
  {
    titulo: 'Grupos de estudo',
    texto: 'Trilhas em que os participantes aprendem juntos, do Python básico a aprendizado de máquina, com quem está mais adiante ajudando quem está começando.',
  },
  {
    titulo: 'Projetos com dados reais',
    texto: 'Problemas concretos resolvidos em equipe, muitas vezes em parceria com laboratórios de pesquisa da própria universidade.',
  },
  {
    titulo: 'Competições',
    texto: 'Desafios de ciência de dados, hackathons e disputas técnicas que colocam o que foi estudado à prova.',
  },
  {
    titulo: 'Eventos abertos',
    texto: 'Palestras, cursos e oficinas para levar o tema a quem ainda não participa da liga.',
  },
];

/**
 * Ligas de referência no Brasil. Informações conferidas nos sites oficiais
 * em setembro de 2026.
 */
export const ligasReferencia = [
  {
    id: 'tail',
    sigla: 'TAIL',
    nome: 'Technology and Artificial Intelligence League',
    instituicao: 'UFPB · João Pessoa',
    fatos: [
      'Criada em 2020, durante a pandemia, e dirigida por estudantes.',
      'Ligada ao ARIA, laboratório de aplicações de inteligência artificial da UFPB.',
      'Primeira liga acadêmica de IA da Paraíba, aberta a estudantes de todos os cursos.',
    ],
    url: 'https://tail-tech.com/',
  },
  {
    id: 'lia',
    sigla: 'LIA',
    nome: 'Liga de Inteligência Artificial',
    instituicao: 'UFSC · Campus Araranguá',
    fatos: [
      'Criada por estudantes para ampliar os estudos em IA e levar o conhecimento a projetos de pesquisa, ensino e extensão.',
      'Organizada em grupos: PyAnalytics, para Python e análise de dados; LI(A)RA, para competições de sistemas multiagentes; e Analytics2AI, para aprendizado de máquina.',
    ],
    url: 'https://ligaia.ufsc.br/',
  },
  {
    id: 'turing',
    sigla: 'Turing USP',
    nome: 'Grupo Turing',
    instituicao: 'USP · Campus Butantã',
    fatos: [
      'Grupo de extensão fundado em 2015 por cinco amigos, hoje o maior voltado a IA na USP.',
      'Atua em ciência de dados, processamento de linguagem natural, visão computacional, aprendizado por reforço e finanças quantitativas.',
      'Desenvolve projetos, oferece cursos e conteúdos abertos e participa de eventos e competições.',
    ],
    url: 'https://www.turingusp.com/',
  },
];

/** Canastra Leagues Network, descrita a partir da newsletter oficial da Canastra Ventures. */
export const canastra = {
  nome: 'Canastra Leagues Network',
  url: 'https://canastraventures.substack.com/p/canastra-newsletter37',
  urlGestora: 'https://www.canastra.ventures/',
};
