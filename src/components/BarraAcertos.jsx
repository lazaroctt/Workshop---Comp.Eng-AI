import { emPorcentagem } from '../lib/resultado.js';

/**
 * Contagem de acertos e erros das amostras que vieram no arquivo,
 * desenhada como uma barra única para dar a proporção de imediato.
 */
export default function BarraAcertos({ acertos, erros, total }) {
  const taxa = total > 0 ? acertos / total : 0;

  return (
    <div className="barra-acertos">
      <div className="barra-trilho" role="img" aria-label={`${acertos} acertos e ${erros} erros em ${total} amostras`}>
        <span className="barra-parte parte-acerto" style={{ width: `${taxa * 100}%` }} />
        <span className="barra-parte parte-erro" style={{ width: `${(1 - taxa) * 100}%` }} />
      </div>

      <div className="barra-legenda">
        <span><i className="ponto ponto-acerto" aria-hidden="true" />{acertos} acertos</span>
        <span><i className="ponto ponto-erro" aria-hidden="true" />{erros} erros</span>
        <span className="barra-total">{total} amostras no arquivo, {emPorcentagem(taxa)} corretas</span>
      </div>
    </div>
  );
}
