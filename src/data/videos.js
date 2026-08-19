/**
 * Vídeos de apoio.
 *
 * Para publicar um vídeo, basta preencher o campo youtubeId com o
 * identificador que aparece na URL do YouTube. Exemplo:
 *   https://www.youtube.com/watch?v=AbCdEf12345  ->  youtubeId: 'AbCdEf12345'
 *
 * Enquanto o campo estiver vazio, a plataforma exibe um espaço reservado
 * indicando onde o vídeo entra.
 */

export const videos = [
  {
    id: 'abertura',
    titulo: 'Abertura do workshop',
    descricao:
      'Apresentação do LACOP, do formato do encontro e do que a turma leva no fim do dia. Bom ponto de partida para quem chegou atrasado ou assiste em casa.',
    duracao: '8 minutos',
    categoria: 'Introdução',
    youtubeId: '',
  },
  {
    id: 'panorama',
    titulo: 'Sensores, dados e modelos: o panorama',
    descricao:
      'Por que a lógica de limiar chega ao limite e como um modelo treinado muda a forma de resolver o problema. Conceito puro, sem código.',
    duracao: '12 minutos',
    categoria: 'Conceito',
    youtubeId: '',
  },
  {
    id: 'colab',
    titulo: 'Primeiros passos no Google Colab',
    descricao:
      'Criar o notebook, enviar o CSV, executar a primeira célula e reconhecer os erros mais comuns de quem está começando.',
    duracao: '10 minutos',
    categoria: 'Prática',
    youtubeId: '',
  },
  {
    id: 'prompt',
    titulo: 'Conversando com o agente na prática',
    descricao:
      'Gravação de tela do fluxo completo: descrever o problema, receber o código, rodar, corrigir o erro e chegar ao resultado.',
    duracao: '15 minutos',
    categoria: 'Prática',
    youtubeId: '',
  },
  {
    id: 'resultados',
    titulo: 'Lendo os resultados sem se enganar',
    descricao:
      'Matriz de confusão, importância das variáveis e a comparação com o limiar manual, usando a base de motores como exemplo.',
    duracao: '14 minutos',
    categoria: 'Análise',
    youtubeId: '',
  },
  {
    id: 'embarcar',
    titulo: 'Levando o modelo para o ESP32',
    descricao:
      'Exportação da árvore para C, cálculo das mesmas features no firmware e teste comparativo entre notebook e placa.',
    duracao: '18 minutos',
    categoria: 'Hardware',
    youtubeId: '',
  },
];

/** Vídeo destacado no topo da aba, quando houver. */
export const videoDestaque = videos[0];
