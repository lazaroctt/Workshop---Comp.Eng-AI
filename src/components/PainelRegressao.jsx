import { ChartScatter } from 'lucide-react';

import CabecalhoResultado from './CabecalhoResultado.jsx';
import ComparativoPiso from './ComparativoPiso.jsx';
import GraficoDispersao from './GraficoDispersao.jsx';
import Revelar from './Revelar.jsx';
import Aviso from './Aviso.jsx';
import { avaliarGanho, emNumero, emPorcentagem } from '../lib/resultado.js';

/** Painel de um projeto em que o modelo prevê um número. */
export default function PainelRegressao({ dados }) {
  const veredito = avaliarGanho(dados);
  const diferenca = dados.erroPiso - dados.erroModelo;
  const corte = dados.erroPiso > 0 ? diferenca / dados.erroPiso : 0;
  const unidade = dados.alvo ? ` de ${dados.alvo}` : '';

  return (
    <div className="painel-resultado">
      <Revelar><CabecalhoResultado dados={dados} /></Revelar>

      <Revelar>
        <h3 className="titulo-bloco">O modelo aprendeu mesmo?</h3>
        <p className="nota-metrica">
          Aqui o número que conta é o erro médio, a distância entre o valor previsto e o valor real.
          Ao contrário da acurácia, <strong>quanto menor, melhor</strong>.
        </p>
        <ComparativoPiso
          modelo={{
            rotulo: 'Erro médio do seu modelo',
            valor: emNumero(dados.erroModelo),
            nota: `distância média entre a previsão e o valor real${unidade}`,
          }}
          piso={{
            rotulo: 'Erro do piso',
            valor: emNumero(dados.erroPiso),
            nota: 'o que se erra prevendo sempre a média da base',
          }}
          ganho={{
            rotulo: 'Erro que o modelo cortou',
            valor: diferenca > 0 ? emPorcentagem(corte, 0) : 'nenhum',
            nota: diferenca > 0
              ? `${emNumero(diferenca)} a menos que o piso, em média`
              : 'o modelo não reduziu o erro do palpite simples',
          }}
          veredito={veredito}
        />
      </Revelar>

      <Revelar>
        <h3 className="titulo-bloco"><ChartScatter size={17} /> Previsão contra valor real</h3>
        {dados.amostras.length > 0 ? (
          <GraficoDispersao amostras={dados.amostras} alvo={dados.alvo} />
        ) : (
          <Aviso tipo="info" titulo="Sem amostras para desenhar">
            <p>
              O arquivo não trouxe o campo "amostras", então o gráfico de dispersão fica de fora.
              Para vê-lo, salve no notebook uma lista de pares com o valor real e o previsto.
            </p>
          </Aviso>
        )}
      </Revelar>
    </div>
  );
}
