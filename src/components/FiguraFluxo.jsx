import { Cpu, Table2, GitBranch, TrendingUp, ArrowDown } from 'lucide-react';

/**
 * Diagrama do percurso de um projeto com aprendizado de máquina, da grandeza
 * física medida pelo sensor até a decisão tomada com antecedência.
 * Usado no artigo O que é aprendizado de máquina.
 */
const ETAPAS = [
  {
    icone: Cpu,
    titulo: 'Sensor',
    texto: 'Uma grandeza física vira sinal elétrico: temperatura, vibração, corrente, distância.',
  },
  {
    icone: Table2,
    titulo: 'Dado organizado',
    texto: 'As leituras viram tabela, com uma linha por instante e uma coluna por medida.',
  },
  {
    icone: GitBranch,
    titulo: 'Modelo treinado',
    texto: 'O algoritmo observa exemplos rotulados e encontra a fronteira que separa os casos.',
  },
  {
    icone: TrendingUp,
    titulo: 'Previsão',
    texto: 'A decisão passa a vir antes do evento, com margem de erro conhecida e medida.',
  },
];

export default function FiguraFluxo() {
  return (
    <figure className="figura" style={{ margin: 0 }}>
      <div className="figura-titulo">Figura · Do sensor à previsão</div>

      <div className="fluxo">
        {ETAPAS.map((etapa, i) => {
          const Icone = etapa.icone;
          return (
            <div key={etapa.titulo}>
              <div className="fluxo-etapa">
                <Icone size={19} />
                <div>
                  <strong>{etapa.titulo}</strong>
                  <span>{etapa.texto}</span>
                </div>
              </div>
              {i < ETAPAS.length - 1 && (
                <div className="fluxo-seta" aria-hidden="true">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <figcaption className="figura-legenda">
        Cada etapa depende da anterior: sem dado organizado não há treino, e sem teste não há
        como saber se a previsão merece confiança.
      </figcaption>
    </figure>
  );
}
