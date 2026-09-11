/**
 * Ilustração da página Início: leituras de quatro sensores entram em uma rede
 * neural, que devolve uma previsão com faixa de incerteza.
 *
 * Desenho original em SVG, sem imagem externa. As cores vêm das variáveis do
 * tema, então a ilustração acompanha os modos claro e escuro.
 */

const L = 600; // largura do desenho
const A = 430; // altura do desenho

/* Pequeno gerador com semente fixa, para o ruído ser sempre o mesmo. */
function aleatorio(semente) {
  let s = semente;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647 - 0.5;
  };
}

/** Converte uma função de forma em um caminho SVG entre x0 e x1. */
function onda(cy, forma, x0 = 30, x1 = 118, pontos = 44) {
  let d = '';
  for (let i = 0; i <= pontos; i++) {
    const t = i / pontos;
    const x = x0 + (x1 - x0) * t;
    const y = cy + forma(t);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

const ruido = aleatorio(7);
const CANAIS = [
  { nome: 'temperatura', y: 118, forma: (t) => -9 * Math.sin(t * Math.PI * 2.2) },
  { nome: 'vibração', y: 186, forma: (t) => 6 * Math.sin(t * Math.PI * 11) + ruido() * 7 },
  { nome: 'corrente', y: 254, forma: (t) => (t < 0.35 ? 7 : t < 0.7 ? -5 : 3) + Math.sin(t * 40) * 0.8 },
  { nome: 'CO2', y: 322, forma: (t) => 9 - 18 * t + Math.sin(t * 18) * 2 },
];

/* Camadas da rede: posição horizontal e altura de cada neurônio. */
const CAMADAS = [
  { x: 148, ys: [118, 186, 254, 322] },
  { x: 236, ys: [104, 162, 220, 278, 336] },
  { x: 324, ys: [133, 191, 249, 307] },
  { x: 412, ys: [190, 250] },
];

/* Caminho em destaque: a leitura de vibração atravessando a rede até a saída. */
const DESTAQUE = [1, 2, 1, 0];

/* Gráfico de previsão à direita. */
const G = { x0: 452, x1: 574, y0: 128, y1: 292, corte: 516 };
const serie = (x) => 222 - (x - G.x0) * 0.5 - Math.sin((x - G.x0) / 9) * 6;
const passado = Array.from({ length: 17 }, (_, i) => G.x0 + 4 + i * 3.75);
const futuro = Array.from({ length: 14 }, (_, i) => G.corte + i * 4.3);
const caminho = (xs) => xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${serie(x).toFixed(1)}`).join(' ');
const faixa = [
  ...futuro.map((x) => `${x.toFixed(1)},${(serie(x) - 2 - (x - G.corte) * 0.3).toFixed(1)}`),
  ...[...futuro].reverse().map((x) => `${x.toFixed(1)},${(serie(x) + 2 + (x - G.corte) * 0.3).toFixed(1)}`),
].join(' ');

export default function IlustracaoIA() {
  const arestas = [];
  CAMADAS.slice(0, -1).forEach((camada, c) => {
    const proxima = CAMADAS[c + 1];
    camada.ys.forEach((ya, i) => {
      proxima.ys.forEach((yb, j) => {
        const ativa = DESTAQUE[c] === i && DESTAQUE[c + 1] === j;
        arestas.push({ x1: camada.x, y1: ya, x2: proxima.x, y2: yb, ativa, chave: `${c}-${i}-${j}` });
      });
    });
  });

  const saida = { x: CAMADAS[3].x, y: CAMADAS[3].ys[0] };

  return (
    <svg
      className="ilustracao-ia"
      viewBox={`0 0 ${L} ${A}`}
      role="img"
      aria-label="Ilustração: leituras de quatro sensores entram em uma rede neural, que produz uma previsão com faixa de incerteza."
    >
      <defs>
        <pattern id="quadriculado" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" stroke="var(--borda)" strokeWidth="0.7" />
        </pattern>
      </defs>

      {/* Prancha com fundo de papel quadriculado */}
      <rect x="0.5" y="0.5" width={L - 1} height={A - 1} rx="6" fill="var(--fundo-alt)" stroke="var(--borda)" />
      <rect x="1" y="1" width={L - 2} height={A - 2} rx="6" fill="url(#quadriculado)" opacity="0.7" />

      {/* Leituras dos sensores */}
      {CANAIS.map((canal, i) => (
        <g key={canal.nome}>
          <path
            d={onda(canal.y, canal.forma)}
            fill="none"
            stroke={i === 1 ? 'var(--destaque)' : 'var(--texto-fraco)'}
            strokeWidth={i === 1 ? 1.7 : 1.2}
            strokeLinejoin="round"
          />
          <line x1="122" y1={canal.y} x2={CAMADAS[0].x - 11} y2={canal.y} stroke="var(--borda-forte)" strokeWidth="1" strokeDasharray="2 3" />
          <text x="30" y={canal.y - 17} className="ilustracao-rotulo-canal">{canal.nome}</text>
        </g>
      ))}

      {/* Conexões da rede */}
      {arestas.filter((a) => !a.ativa).map((a) => (
        <line key={a.chave} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="var(--borda-forte)" strokeWidth="0.8" opacity="0.75" />
      ))}
      {arestas.filter((a) => a.ativa).map((a) => (
        <line key={a.chave} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="var(--destaque)" strokeWidth="1.9" />
      ))}

      {/* Neurônios */}
      {CAMADAS.map((camada, c) =>
        camada.ys.map((y, i) => {
          const ativo = DESTAQUE[c] === i;
          const final = c === CAMADAS.length - 1 && i === 0;
          return (
            <circle
              key={`${c}-${i}`}
              cx={camada.x}
              cy={y}
              r="9"
              fill={final ? 'var(--ambar-400)' : ativo ? 'var(--destaque)' : 'var(--superficie)'}
              stroke={final ? 'var(--ambar-400)' : 'var(--destaque)'}
              strokeWidth="1.5"
            />
          );
        }),
      )}

      {/* Da saída da rede para o gráfico de previsão */}
      <line x1={saida.x + 11} y1={saida.y} x2={G.x0 - 6} y2={saida.y} stroke="var(--ambar-400)" strokeWidth="1.4" />
      <path d={`M${G.x0 - 12} ${saida.y - 4} L${G.x0 - 5} ${saida.y} L${G.x0 - 12} ${saida.y + 4}`} fill="none" stroke="var(--ambar-400)" strokeWidth="1.4" />

      {/* Gráfico: histórico, previsão e faixa de incerteza */}
      <line x1={G.x0} y1={G.y0} x2={G.x0} y2={G.y1} stroke="var(--borda-forte)" strokeWidth="1" />
      <line x1={G.x0} y1={G.y1} x2={G.x1} y2={G.y1} stroke="var(--borda-forte)" strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={G.x0 + 30 * (i + 1)} y1={G.y1} x2={G.x0 + 30 * (i + 1)} y2={G.y1 + 4} stroke="var(--borda-forte)" strokeWidth="1" />
      ))}
      <polygon points={faixa} fill="var(--ambar-400)" opacity="0.16" />
      <line x1={G.corte} y1={G.y0 + 4} x2={G.corte} y2={G.y1} stroke="var(--borda-forte)" strokeWidth="0.8" strokeDasharray="2 3" />
      <path d={caminho(passado)} fill="none" stroke="var(--destaque)" strokeWidth="1.7" strokeLinejoin="round" />
      <path d={caminho([G.corte, ...futuro])} fill="none" stroke="var(--ambar-400)" strokeWidth="1.8" strokeDasharray="5 4" />
      <circle cx={G.corte} cy={serie(G.corte)} r="2.6" fill="var(--destaque)" />

      {/* Legendas das três etapas */}
      <text x="74" y="396" className="ilustracao-rotulo">leituras</text>
      <text x="280" y="396" className="ilustracao-rotulo">modelo</text>
      <text x={(G.x0 + G.x1) / 2} y="396" className="ilustracao-rotulo">previsão</text>
    </svg>
  );
}
