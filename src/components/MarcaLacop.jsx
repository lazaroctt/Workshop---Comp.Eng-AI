import { useState } from 'react';

/**
 * Marca do Laboratório de Comunicações Ópticas.
 *
 * ARQUIVOS, em public/assets/lacop:
 *   lacop.png          versão original, para fundo claro
 *   lacop-branco.png   versão para fundo escuro, com a tipografia em branco
 *
 * No cabeçalho a versão acompanha o tema escolhido. No rodapé, que tem fundo
 * escuro em qualquer tema, a versão clara é fixa. Sem o arquivo da versão
 * clara, a marca original aparece sobre uma placa branca, para não sumir no
 * escuro. Sem nenhum arquivo, fica um espaço tracejado no lugar.
 */

const BASE = `${import.meta.env.BASE_URL}assets/lacop/`;

export const LOGO_LACOP = `${BASE}lacop.png`;
export const LOGO_LACOP_BRANCO = `${BASE}lacop-branco.png`;

export default function MarcaLacop({ altura = 34, variante = 'auto' }) {
  // 'branco' usa a versão clara; se ela faltar, cai para a original com placa.
  const [fonte, setFonte] = useState(variante === 'branco' ? 'branco' : 'auto');
  const alt = 'Marca do Laboratório de Comunicações Ópticas';

  if (fonte === 'ausente') {
    return (
      <span
        className="marca-slot"
        style={{ height: altura, width: altura * 2.6 }}
        title="Coloque a marca do LACOP em public/assets/lacop/lacop.png"
        aria-label="Espaço reservado à marca do LACOP"
      >
        marca LACOP
      </span>
    );
  }

  // Cabeçalho: as duas versões vão para a página e o CSS mostra a do tema em uso.
  if (fonte === 'auto') {
    return (
      <>
        <img src={LOGO_LACOP} alt={alt} className="marca-lacop so-tema-claro" style={{ height: altura }} onError={() => setFonte('ausente')} />
        <img src={LOGO_LACOP_BRANCO} alt="" aria-hidden="true" className="marca-lacop so-tema-escuro" style={{ height: altura }} />
      </>
    );
  }

  const imagem = (
    <img
      src={fonte === 'branco' ? LOGO_LACOP_BRANCO : LOGO_LACOP}
      alt={alt}
      className="marca-lacop"
      style={{ height: altura }}
      onError={() => setFonte((atual) => (atual === 'branco' ? 'padrao' : 'ausente'))}
    />
  );

  return fonte === 'padrao' ? <span className="marca-lacop-placa">{imagem}</span> : imagem;
}
