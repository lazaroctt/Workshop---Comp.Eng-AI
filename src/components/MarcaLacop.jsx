import { useState } from 'react';

/**
 * Marca do Laboratório de Comunicações Ópticas.
 *
 * ARQUIVOS
 * Ficam em public/assets/lacop:
 *   lacop.png          versão principal, usada no cabeçalho de fundo claro
 *   lacop-branco.png   versão clara para o rodapé escuro, opcional
 *
 * Sobre o rodapé: a marca tem tipografia em azul escuro, que some sobre o
 * fundo azul do rodapé. Sem um arquivo em versão clara, a plataforma exibe a
 * marca original sobre uma placa branca, preservando as cores oficiais. Se
 * você tiver uma versão clara, salve como lacop-branco.png e a placa deixa de
 * ser usada.
 *
 * Formatos aceitos: PNG com fundo transparente ou SVG.
 */

const BASE = `${import.meta.env.BASE_URL}assets/lacop/`;

export const LOGO_LACOP = `${BASE}lacop.png`;
export const LOGO_LACOP_BRANCO = `${BASE}lacop-branco.png`;

export default function MarcaLacop({ altura = 34, variante = 'padrao' }) {
  // 'branco' tenta a versão clara, 'padrao' usa a original, 'ausente' mostra o espaço vazio.
  const [fonte, setFonte] = useState(variante === 'branco' ? 'branco' : 'padrao');

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

  const imagem = (
    <img
      src={fonte === 'branco' ? LOGO_LACOP_BRANCO : LOGO_LACOP}
      alt="Marca do Laboratório de Comunicações Ópticas"
      className="marca-lacop"
      style={{ height: altura }}
      onError={() => setFonte((atual) => (atual === 'branco' ? 'padrao' : 'ausente'))}
    />
  );

  // Placa branca apenas quando a versão clara não existe e o fundo é escuro.
  const precisaPlaca = variante === 'branco' && fonte === 'padrao';
  return precisaPlaca ? <span className="marca-lacop-placa">{imagem}</span> : imagem;
}
