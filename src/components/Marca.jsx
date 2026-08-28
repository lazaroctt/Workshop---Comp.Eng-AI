import MarcaUFF from './MarcaUFF.jsx';
import MarcaLacop from './MarcaLacop.jsx';

/**
 * Identidade institucional do cabeçalho, alinhada à esquerda: símbolo da UFF,
 * marca do laboratório e a assinatura em texto do workshop.
 *
 * Os arquivos de imagem ficam em public/assets/uff e public/assets/lacop.
 * Veja MarcaUFF.jsx e MarcaLacop.jsx para os nomes esperados.
 */
export default function Marca({ aoClicar }) {
  return (
    <button type="button" className="marca" onClick={aoClicar} aria-label="Ir para a página inicial">
      <span className="marca-logos">
        <MarcaUFF altura={40} />
        <span className="marca-lacop-slot">
          <MarcaLacop altura={44} />
        </span>
      </span>

      <span className="marca-divisor" aria-hidden="true" />

      <span className="marca-texto">
        <span className="marca-instituicao">Universidade Federal Fluminense</span>
        <strong>Workshop IA e Sensores</strong>
        <span>Laboratório de Comunicações Ópticas</span>
      </span>
    </button>
  );
}
