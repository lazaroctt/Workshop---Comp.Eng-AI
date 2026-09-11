/**
 * Projetos do LACOP divulgados na página Início.
 *
 * MÍDIA: cada projeto mostra uma imagem à direita do texto, com arquivos em
 * public/assets/projetos.
 *   foto        nome do arquivo de imagem
 *   animacao    alternativa à foto, para um trecho de vídeo em loop:
 *               { webp, gif, quadro } com a animação em WebP (usada pelos
 *               navegadores atuais), o GIF de reserva e um quadro parado para
 *               quem pede menos movimento nas configurações do sistema
 *   proporcao   formato do quadro na página, em CSS (padrão 4 / 3)
 *   posicao     parte da imagem que fica visível quando ela é recortada
 * Sem arquivo, a página mostra um quadro neutro no lugar.
 *
 * Descrições conferidas nas páginas de cada projeto em setembro de 2026.
 */

import { Satellite, Accessibility, Recycle } from 'lucide-react';

export const projetos = [
  {
    id: 'city-science',
    nome: 'City Science',
    icone: Satellite,
    selos: ['Premiado pela NASA', 'Apresentado na SBPC', 'Levado à COP-30'],
    tecnica: 'Perceptrons e aprendizado de máquina',
    descricao:
      'Plataforma de dados para planejamento urbano sustentável. Reúne dados de observação da Terra da NASA e de fontes governamentais e os transforma em boletins sobre temperatura, qualidade do ar, risco geotécnico e áreas verdes, pensados para gestores, engenheiros e arquitetos. Por trás das análises estão perceptrons, a unidade básica das redes neurais.',
    url: 'https://cityscience.vercel.app/',
    foto: 'city science.jpeg',
    proporcao: '5 / 4',
    posicao: 'center 42%',
    legendaFoto: 'Apresentação do pôster na SBPC',
  },
  {
    id: 'como-estou',
    nome: 'Como Estou',
    icone: Accessibility,
    selos: ['Saúde e acessibilidade'],
    tecnica: 'Visão computacional',
    descricao:
      'Aplicativo de comunicação aumentativa e alternativa pensado para pessoas com paralisia cerebral. Usa visão computacional para apoiar a comunicação no dia a dia, aproximando a tecnologia de quem mais depende dela para se expressar.',
    url: 'https://como-estou-main.vercel.app/',
    observacao: 'O acesso ao aplicativo é feito com login.',
    // Animação feita a partir do vídeo "como estou.mov", que fica na mesma pasta.
    animacao: { webp: 'como-estou.webp', gif: 'como-estou.gif', quadro: 'como-estou-quadro.jpg' },
    proporcao: '720 / 458',
    legendaFoto: 'Exercício dos dedos: o aplicativo acompanha a mão ao vivo pela câmera',
  },
  {
    id: 'semende',
    nome: 'SEMENDE Sustentável',
    icone: Recycle,
    selos: ['Educação ambiental'],
    tecnica: 'Visão computacional',
    descricao:
      'Projeto de educação ambiental sobre coleta seletiva e reciclagem no Brasil. Apresenta os números do descarte no país e traz um jogo em que a pessoa usa a mão diante da câmera para pegar cada resíduo e levá-lo à lixeira da cor certa, com o movimento reconhecido por visão computacional.',
    url: 'https://projeto-semende-ieee.vercel.app/',
    foto: 'semende.jpeg',
    proporcao: '1600 / 1041',
    legendaFoto: 'Página do projeto, com o selo do IEEE SIGHT do ramo estudantil da UFF',
  },
];

/** Frentes de pesquisa em IA que aparecem nos projetos do laboratório. */
export const frentesPesquisa = [
  'Aprendizado de máquina com dados de sensores e de observação da Terra',
  'Visão computacional aplicada à acessibilidade e à educação',
  'Ciência de dados para decisões em engenharia e planejamento urbano',
];
