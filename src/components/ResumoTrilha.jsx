import { ArrowRight } from 'lucide-react';

import Revelar from './Revelar.jsx';
import MedidorTrilha from './MedidorTrilha.jsx';
import { acharModulo, numeroModulo, porExtenso } from '../data/modulos.js';
import { useProgresso } from '../lib/progresso.js';

/**
 * Chamada da página inicial para a trilha. Quem ainda não começou vê o
 * convite; quem já avançou vê o progresso e o atalho para o próximo módulo.
 */
export default function ResumoTrilha({ navegar }) {
  const progresso = useProgresso();
  const { feitos, total, proximo } = progresso;
  const modulo = acharModulo(proximo);
  const quantos = porExtenso(total);

  let titulo = `${quantos[0].toUpperCase()}${quantos.slice(1)} módulos, um caminho do primeiro contato ao projeto pronto`;
  let botao = 'Começar a trilha';
  let destino = () => navegar('trilha');

  if (feitos > 0 && modulo) {
    titulo = `Seu próximo passo: ${modulo.titulo}`;
    botao = `Continuar no módulo ${numeroModulo(modulo)}`;
    destino = () => navegar('trilha', modulo.slug);
  } else if (!modulo) {
    titulo = `Você concluiu os ${quantos} módulos da trilha`;
    botao = 'Rever a trilha';
  }

  return (
    <section className="secao-compacta secao-alt">
      <div className="container">
        <Revelar className="resumo-trilha">
          <div className="resumo-trilha-texto">
            <span className="olho">Trilha do workshop</span>
            <h2>{titulo}</h2>
          </div>
          <div className="resumo-trilha-acoes">
            <MedidorTrilha progresso={progresso} compacto />
            <button type="button" className="btn btn-primario" onClick={destino}>
              {botao} <ArrowRight size={17} />
            </button>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
