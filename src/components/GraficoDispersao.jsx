import { useMemo } from 'react';
import { emNumero } from '../lib/resultado.js';

const L = 560;
const A = 420;
const MARGEM = { esq: 66, dir: 22, topo: 22, base: 58 };
const LIMITE_PONTOS = 800;

/** Guarda a leitura leve mesmo quando o arquivo traz milhares de amostras. */
function amostrar(lista) {
  if (lista.length <= LIMITE_PONTOS) return lista;
  const passo = lista.length / LIMITE_PONTOS;
  return Array.from({ length: LIMITE_PONTOS }, (_, i) => lista[Math.floor(i * passo)]);
}

/**
 * Dispersão entre o valor real, no eixo horizontal, e a previsão do modelo,
 * no vertical. A diagonal marca onde cairiam as previsões perfeitas, então
 * quanto mais perto dela estiver a nuvem de pontos, melhor o modelo.
 */
export default function GraficoDispersao({ amostras, alvo }) {
  const { pontos, ticks, escalaX, escalaY, mostrados } = useMemo(() => {
    const visiveis = amostrar(amostras);
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

    const x = (v) => MARGEM.esq + ((v - min) / (max - min)) * (L - MARGEM.esq - MARGEM.dir);
    const y = (v) => A - MARGEM.base - ((v - min) / (max - min)) * (A - MARGEM.topo - MARGEM.base);

    return {
      pontos: visiveis.map((a) => ({ cx: x(a.real), cy: y(a.previsto) })),
      ticks: Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4),
      escalaX: x,
      escalaY: y,
      mostrados: visiveis.length,
    };
  }, [amostras]);

  return (
    <figure className="dispersao">
      <svg
        viewBox={`0 0 ${L} ${A}`}
        role="img"
        aria-label={`Dispersão com ${mostrados} amostras, valor real no eixo horizontal e previsão no vertical`}
      >
        {ticks.map((valor) => (
          <g key={`grade-${valor}`}>
            <line className="dispersao-grade" x1={escalaX(valor)} y1={MARGEM.topo} x2={escalaX(valor)} y2={A - MARGEM.base} />
            <line className="dispersao-grade" x1={MARGEM.esq} y1={escalaY(valor)} x2={L - MARGEM.dir} y2={escalaY(valor)} />
            <text className="dispersao-rotulo" x={escalaX(valor)} y={A - MARGEM.base + 20} textAnchor="middle">
              {emNumero(valor)}
            </text>
            <text className="dispersao-rotulo" x={MARGEM.esq - 10} y={escalaY(valor) + 4} textAnchor="end">
              {emNumero(valor)}
            </text>
          </g>
        ))}

        <line
          className="dispersao-referencia"
          x1={escalaX(ticks[0])}
          y1={escalaY(ticks[0])}
          x2={escalaX(ticks[4])}
          y2={escalaY(ticks[4])}
        />

        {pontos.map((p, i) => (
          // Duas amostras podem cair no mesmo ponto, então a posição na lista identifica o círculo.
          <circle key={i} className="dispersao-ponto" cx={p.cx} cy={p.cy} r={4.5} />
        ))}

        <line className="dispersao-eixo" x1={MARGEM.esq} y1={MARGEM.topo} x2={MARGEM.esq} y2={A - MARGEM.base} />
        <line className="dispersao-eixo" x1={MARGEM.esq} y1={A - MARGEM.base} x2={L - MARGEM.dir} y2={A - MARGEM.base} />

        <text className="dispersao-eixo-titulo" x={(L + MARGEM.esq) / 2} y={A - 12} textAnchor="middle">
          valor real{alvo ? ` de ${alvo}` : ''}
        </text>
        <text
          className="dispersao-eixo-titulo"
          x={18}
          y={(A - MARGEM.base + MARGEM.topo) / 2}
          textAnchor="middle"
          transform={`rotate(-90 18 ${(A - MARGEM.base + MARGEM.topo) / 2})`}
        >
          previsão do modelo
        </text>
      </svg>

      <figcaption className="legenda">
        A linha tracejada marca a previsão perfeita, em que o valor previsto é igual ao real.
        Pontos acima dela são previsões altas demais, e pontos abaixo, baixas demais.
        {mostrados < amostras.length && ` Para manter o desenho leve, aparecem ${mostrados} das ${amostras.length} amostras do arquivo.`}
      </figcaption>
    </figure>
  );
}
