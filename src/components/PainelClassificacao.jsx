import { Grid2x2Check, ListChecks } from 'lucide-react';

import CabecalhoResultado from './CabecalhoResultado.jsx';
import ComparativoPiso from './ComparativoPiso.jsx';
import MatrizConfusao from './MatrizConfusao.jsx';
import BarraAcertos from './BarraAcertos.jsx';
import Revelar from './Revelar.jsx';
import { avaliarGanho, contarAmostras, emPorcentagem } from '../lib/resultado.js';

/** Painel de um projeto em que o modelo escolhe entre categorias. */
export default function PainelClassificacao({ dados }) {
  const veredito = avaliarGanho(dados);
  const contagem = contarAmostras(dados.amostras);
  const pontos = (dados.acuracia - dados.piso) * 100;

  return (
    <div className="painel-resultado">
      <Revelar><CabecalhoResultado dados={dados} /></Revelar>

      <Revelar>
        <h3 className="titulo-bloco">O modelo aprendeu mesmo?</h3>
        <ComparativoPiso
          modelo={{
            rotulo: 'Acerto do seu modelo',
            valor: emPorcentagem(dados.acuracia),
            nota: 'parte das previsões que bateu com o valor verdadeiro',
          }}
          piso={{
            rotulo: 'Piso, o palpite simples',
            valor: emPorcentagem(dados.piso),
            nota: 'o que se acerta chutando sempre a classe mais comum',
          }}
          ganho={{
            rotulo: 'Diferença',
            valor: `${pontos > 0 ? '+' : ''}${pontos.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} pontos`,
            nota: 'quanto o treino rendeu acima do palpite',
          }}
          veredito={veredito}
        />
      </Revelar>

      <Revelar>
        <h3 className="titulo-bloco"><Grid2x2Check size={17} /> Onde o modelo se confundiu</h3>
        <MatrizConfusao classes={dados.classes} matriz={dados.matriz} />
      </Revelar>

      {contagem.total > 0 && (
        <Revelar>
          <h3 className="titulo-bloco"><ListChecks size={17} /> Amostras conferidas uma a uma</h3>
          <BarraAcertos acertos={contagem.acertos} erros={contagem.erros} total={contagem.total} />
        </Revelar>
      )}
    </div>
  );
}
