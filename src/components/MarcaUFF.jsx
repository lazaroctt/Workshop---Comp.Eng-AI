/**
 * Símbolo institucional da Universidade Federal Fluminense.
 *
 * ARQUIVOS
 * Ficam em public/assets/uff, extraídos do pacote oficial de identidade
 * visual publicado pela Superintendência de Comunicação Social da UFF:
 *   simbolo-uff-azul.png     versão azul, para fundo claro
 *   simbolo-uff-branco.png   versão branca, para fundo escuro
 *
 * A mesma pasta guarda a assinatura completa, com o nome da universidade
 * por extenso, para uso em slides e material impresso.
 *
 * Para atualizar, basta substituir os arquivos mantendo os nomes. A altura
 * de exibição vem da propriedade altura e a largura acompanha a proporção.
 */

const BASE = `${import.meta.env.BASE_URL}assets/uff/`;

export const SIMBOLO_UFF_AZUL = `${BASE}simbolo-uff-azul.png`;
export const SIMBOLO_UFF_BRANCO = `${BASE}simbolo-uff-branco.png`;

export default function MarcaUFF({ altura = 40, variante = 'auto' }) {
  const alt = 'Símbolo da Universidade Federal Fluminense';

  // No rodapé o fundo é sempre escuro, então a versão branca é fixa.
  if (variante === 'branco' || variante === 'azul') {
    return (
      <img
        src={variante === 'branco' ? SIMBOLO_UFF_BRANCO : SIMBOLO_UFF_AZUL}
        alt={alt}
        className="marca-uff"
        style={{ height: altura }}
      />
    );
  }

  // No cabeçalho a versão acompanha o tema escolhido pela pessoa.
  return (
    <>
      <img src={SIMBOLO_UFF_AZUL} alt={alt} className="marca-uff so-tema-claro" style={{ height: altura }} />
      <img src={SIMBOLO_UFF_BRANCO} alt="" aria-hidden="true" className="marca-uff so-tema-escuro" style={{ height: altura }} />
    </>
  );
}
