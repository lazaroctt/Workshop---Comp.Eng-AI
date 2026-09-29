import Aviso from './Aviso.jsx';
import { cx } from '../lib/uteis.js';

/**
 * Bloco principal do painel: o número do modelo ao lado do número do piso,
 * com a diferença em destaque e a leitura do que aquilo significa.
 * O piso é o palpite ingênuo, o resultado que se obtém sem treinar nada.
 */
export default function ComparativoPiso({ modelo, piso, ganho, veredito }) {
  return (
    <div className="comparativo">
      <div className="comparativo-numeros">
        <div className="numero-bloco numero-modelo">
          <span className="numero-rotulo">{modelo.rotulo}</span>
          <strong>{modelo.valor}</strong>
          <span className="numero-nota">{modelo.nota}</span>
        </div>

        <div className="numero-bloco">
          <span className="numero-rotulo">{piso.rotulo}</span>
          <strong>{piso.valor}</strong>
          <span className="numero-nota">{piso.nota}</span>
        </div>

        <div className={cx('numero-bloco', 'numero-ganho', `tom-${veredito.tom}`)}>
          <span className="numero-rotulo">{ganho.rotulo}</span>
          <strong>{ganho.valor}</strong>
          <span className="numero-nota">{ganho.nota}</span>
        </div>
      </div>

      <Aviso tipo={veredito.tom} titulo={veredito.titulo}>
        <p>{veredito.texto}</p>
      </Aviso>
    </div>
  );
}
