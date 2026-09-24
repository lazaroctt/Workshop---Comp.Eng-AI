import MarcaUFF from './MarcaUFF.jsx';

/**
 * Identidade institucional do cabeçalho, alinhada à esquerda: símbolo da UFF
 * e a assinatura em texto do workshop. A marca do laboratório fica no extremo
 * direito do cabeçalho, em Cabecalho.jsx.
 *
 * Os arquivos de imagem ficam em public/assets/uff. Veja MarcaUFF.jsx.
 */
export default function Marca({ aoClicar }) {
  return (
    <button type="button" className="marca" onClick={aoClicar} aria-label="Ir para a página inicial">
      <span className="marca-logos">
        <MarcaUFF altura={40} />
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
