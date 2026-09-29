/**
 * Desenha a matriz de confusão e a dispersão em um canvas, para entrarem
 * como imagem no PDF. O desenho repete as cores e a geometria da tela, mas
 * sempre no tema claro, que é o que faz sentido em uma folha impressa.
 */

import { emNumero } from './resultado.js';

const ESCALA = 2;                       // dobro da resolução, para o PDF não serrilhar
const FONTE = 'Helvetica, Arial, sans-serif';

const COR = {
  texto: '#16202e',
  suave: '#414d5e',
  fraco: '#6a7686',
  borda: '#dfe3e8',
  bordaForte: '#c4cbd4',
  cabecalho: '#f2f4f7',
  fundo: '#ffffff',
  azul: '29, 66, 118',
  vinho: '138, 61, 74',
  pontoBorda: '#16335c',
  referencia: '#8a3d4a',
};

/** Cria o canvas já na escala e devolve o contexto com o fundo branco pronto. */
function prepararCanvas(largura, altura) {
  const canvas = document.createElement('canvas');
  canvas.width = largura * ESCALA;
  canvas.height = altura * ESCALA;
  const ctx = canvas.getContext('2d');
  ctx.scale(ESCALA, ESCALA);
  ctx.fillStyle = COR.fundo;
  ctx.fillRect(0, 0, largura, altura);
  ctx.textBaseline = 'middle';
  return { canvas, ctx };
}

const finalizar = (canvas, largura, altura) => ({
  url: canvas.toDataURL('image/png'),
  largura,
  altura,
});

/** Mesma escala de cor da tela: azul para acerto, vinho para confusão. */
const corCelula = (acerto, intensidade) => {
  const base = acerto ? COR.azul : COR.vinho;
  const alfa = (acerto ? 0.1 : 0.08) + intensidade * (acerto ? 0.72 : 0.5);
  return `rgba(${base}, ${alfa.toFixed(3)})`;
};

/** Matriz de confusão com os rótulos das classes nas linhas e nas colunas. */
export function desenharMatriz({ classes, matriz }) {
  const medidor = document.createElement('canvas').getContext('2d');
  medidor.font = `600 13px ${FONTE}`;

  // O canto guarda "previsto (colunas)", que costuma ser o texto mais largo.
  medidor.font = `11px ${FONTE}`;
  const larguraCanto = medidor.measureText('previsto (colunas)').width + 24;
  medidor.font = `600 13px ${FONTE}`;
  const larguraRotulo = Math.min(
    200,
    Math.max(larguraCanto, ...classes.map((c) => medidor.measureText(c).width + 26)),
  );
  const larguraCelula = Math.max(78, ...classes.map((c) => medidor.measureText(c).width + 24));
  const alturaLinha = 38;
  const alturaCabecalho = 46;

  const largura = larguraRotulo + larguraCelula * (classes.length + 1);
  const altura = alturaCabecalho + alturaLinha * classes.length;
  const { canvas, ctx } = prepararCanvas(largura, altura);

  const maior = Math.max(...matriz.flat(), 1);
  const totais = matriz.map((linha) => linha.reduce((s, v) => s + v, 0));
  const xColuna = (j) => larguraRotulo + j * larguraCelula;

  // Faixa do cabeçalho
  ctx.fillStyle = COR.cabecalho;
  ctx.fillRect(0, 0, largura, alturaCabecalho);

  ctx.textAlign = 'left';
  ctx.fillStyle = COR.fraco;
  ctx.font = `11px ${FONTE}`;
  ctx.fillText('real (linhas)', 12, alturaCabecalho / 2 - 8);
  ctx.fillText('previsto (colunas)', 12, alturaCabecalho / 2 + 9);

  ctx.textAlign = 'center';
  ctx.font = `600 12px ${FONTE}`;
  classes.forEach((classe, j) => {
    ctx.fillStyle = COR.suave;
    ctx.fillText(classe, xColuna(j) + larguraCelula / 2, alturaCabecalho / 2);
  });
  ctx.fillStyle = COR.fraco;
  ctx.fillText('total', xColuna(classes.length) + larguraCelula / 2, alturaCabecalho / 2);

  matriz.forEach((linha, i) => {
    const y = alturaCabecalho + i * alturaLinha;

    ctx.fillStyle = COR.cabecalho;
    ctx.fillRect(0, y, larguraRotulo, alturaLinha);
    ctx.textAlign = 'left';
    ctx.font = `600 12.5px ${FONTE}`;
    ctx.fillStyle = COR.texto;
    ctx.fillText(classes[i], 12, y + alturaLinha / 2);

    linha.forEach((valor, j) => {
      const x = xColuna(j);
      const acerto = i === j;
      const intensidade = valor / maior;

      ctx.fillStyle = corCelula(acerto, intensidade);
      ctx.fillRect(x, y, larguraCelula, alturaLinha);

      ctx.textAlign = 'center';
      ctx.font = `600 13.5px ${FONTE}`;
      ctx.fillStyle = intensidade > 0.55 ? '#ffffff' : COR.texto;
      ctx.fillText(String(valor), x + larguraCelula / 2, y + alturaLinha / 2);
    });

    ctx.textAlign = 'center';
    ctx.font = `12px ${FONTE}`;
    ctx.fillStyle = COR.fraco;
    ctx.fillText(String(totais[i]), xColuna(classes.length) + larguraCelula / 2, y + alturaLinha / 2);
  });

  // Fios da grade, por cima das células
  ctx.strokeStyle = COR.borda;
  ctx.lineWidth = 1;
  for (let i = 0; i <= classes.length; i += 1) {
    const y = alturaCabecalho + i * alturaLinha;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(largura, y + 0.5);
    ctx.stroke();
  }
  for (let j = 0; j <= classes.length + 1; j += 1) {
    const x = j === 0 ? larguraRotulo : xColuna(j - 1) + larguraCelula;
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, altura);
    ctx.stroke();
  }
  ctx.strokeStyle = COR.bordaForte;
  ctx.strokeRect(0.5, 0.5, largura - 1, altura - 1);

  return finalizar(canvas, largura, altura);
}

/** Dispersão do valor real contra a previsão, com a diagonal de referência. */
export function desenharDispersao({ amostras, alvo }) {
  const largura = 640;
  const altura = 366;
  const margem = { esq: 70, dir: 24, topo: 20, base: 56 };
  const { canvas, ctx } = prepararCanvas(largura, altura);

  const valores = amostras.flatMap((a) => [a.real, a.previsto]);
  let min = Math.min(...valores);
  let max = Math.max(...valores);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const folga = (max - min) * 0.06;
  min -= folga;
  max += folga;

  const x = (v) => margem.esq + ((v - min) / (max - min)) * (largura - margem.esq - margem.dir);
  const y = (v) => altura - margem.base - ((v - min) / (max - min)) * (altura - margem.topo - margem.base);
  const marcas = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);

  ctx.strokeStyle = COR.borda;
  ctx.lineWidth = 1;
  ctx.font = `11.5px ${FONTE}`;
  marcas.forEach((valor) => {
    ctx.beginPath();
    ctx.moveTo(x(valor), margem.topo);
    ctx.lineTo(x(valor), altura - margem.base);
    ctx.moveTo(margem.esq, y(valor));
    ctx.lineTo(largura - margem.dir, y(valor));
    ctx.stroke();

    ctx.fillStyle = COR.fraco;
    ctx.textAlign = 'center';
    ctx.fillText(emNumero(valor), x(valor), altura - margem.base + 16);
    ctx.textAlign = 'right';
    ctx.fillText(emNumero(valor), margem.esq - 10, y(valor));
  });

  // Diagonal da previsão perfeita
  ctx.save();
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = COR.referencia;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x(marcas[0]), y(marcas[0]));
  ctx.lineTo(x(marcas[4]), y(marcas[4]));
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = `rgba(${COR.azul}, 0.55)`;
  ctx.strokeStyle = COR.pontoBorda;
  ctx.lineWidth = 0.8;
  amostras.forEach((a) => {
    ctx.beginPath();
    ctx.arc(x(a.real), y(a.previsto), 4.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.strokeStyle = COR.bordaForte;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(margem.esq, margem.topo);
  ctx.lineTo(margem.esq, altura - margem.base);
  ctx.lineTo(largura - margem.dir, altura - margem.base);
  ctx.stroke();

  ctx.fillStyle = COR.suave;
  ctx.font = `12.5px ${FONTE}`;
  ctx.textAlign = 'center';
  ctx.fillText(`valor real${alvo ? ` de ${alvo}` : ''}`, (largura + margem.esq) / 2, altura - 20);

  ctx.save();
  ctx.translate(20, (altura - margem.base + margem.topo) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('previsão do modelo', 0, 0);
  ctx.restore();

  return finalizar(canvas, largura, altura);
}

/** Barra de acertos e erros das amostras conferidas. */
export function desenharBarraAcertos({ acertos, total }) {
  const largura = 620;
  const altura = 34;
  const { canvas, ctx } = prepararCanvas(largura, altura);
  const taxa = total > 0 ? acertos / total : 0;

  ctx.fillStyle = `rgba(${COR.azul}, 1)`;
  ctx.fillRect(0, 0, largura * taxa, altura);
  ctx.fillStyle = `rgba(${COR.vinho}, 1)`;
  ctx.fillRect(largura * taxa, 0, largura * (1 - taxa), altura);
  ctx.strokeStyle = COR.bordaForte;
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, largura - 1, altura - 1);

  return finalizar(canvas, largura, altura);
}
