import { Cpu, Table2, GitBranch, TrendingUp, ArrowDown } from 'lucide-react';

/**
 * Figura de abertura da página inicial.
 * Diagrama sóbrio do percurso que a turma faz no encontro, da grandeza
 * física medida pelo sensor até a decisão tomada com antecedência.
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
      <div className="figura-titulo">Figura 1 · Percurso do workshop</div>

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
        O mesmo caminho vale para as oito bases disponíveis. Muda a grandeza medida e a pergunta,
        não o método.
      </figcaption>
    </figure>
  );
}
