import Brasao from './Brasao.jsx';

/**
 * Identidade institucional do cabeçalho: brasão da UFF, filete de separação
 * e a assinatura do laboratório com o nome do workshop.
 *
 * O arquivo do brasão fica em public/assets/brasao-uff.png. Detalhes em
 * src/components/Brasao.jsx.
 */
export default function Marca({ aoClicar }) {
  return (
    <button type="button" className="marca" onClick={aoClicar} aria-label="Ir para a página inicial">
      <Brasao altura={54} />
      <span className="marca-divisor" aria-hidden="true" />
      <span className="marca-texto">
        <span className="marca-instituicao">Universidade Federal Fluminense</span>
        <strong>Workshop IA e Sensores</strong>
        <span>Laboratório de Comunicações Ópticas</span>
      </span>
    </button>
  );
}
