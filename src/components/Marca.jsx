/**
 * Identidade institucional exibida no cabeçalho e no rodapé.
 *
 * IMPORTANTE: os arquivos public/logo-uff.svg e public/logo-lacop.svg são
 * placeholders. Substitua pelos arquivos oficiais mantendo os mesmos nomes,
 * ou ajuste os caminhos abaixo.
 */
export default function Marca({ aoClicar }) {
  return (
    <button type="button" className="marca" onClick={aoClicar} aria-label="Ir para a página inicial">
      <img src={`${import.meta.env.BASE_URL}logo-uff.svg`} alt="Brasão da UFF" className="marca-uff" />
      <span className="marca-texto">
        <strong>Workshop IA e Sensores</strong>
        <span>LACOP · Universidade Federal Fluminense</span>
      </span>
    </button>
  );
}
