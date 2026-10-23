import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import MarcaUFF from './MarcaUFF.jsx';
import MarcaLacop from './MarcaLacop.jsx';
import { cx } from '../lib/uteis.js';

/** Duração da saída, igual à animação abertura-recolhe em global.css. */
const DURACAO_SAIDA = 680;

/**
 * Traço do osciloscópio: uma onda que cresce até um pulso no centro e
 * volta a se acalmar, como um sinal captado pelo instrumento.
 */
function tracoSinal(largura = 600, altura = 80) {
  const meio = altura / 2;
  const pontos = [];
  for (let x = 0; x <= largura; x += 4) {
    const t = x / largura;
    const envelope = Math.exp(-(((t - 0.5) / 0.16) ** 2));
    const onda = Math.sin(x / 9) * (3 + 24 * envelope);
    const ruido = Math.sin(x / 2.3) * 1.2 * (1 - envelope);
    pontos.push(`${x},${(meio - onda - ruido).toFixed(1)}`);
  }
  return `M${pontos.join(' L')}`;
}

const TRACO = tracoSinal();

/**
 * Tela de entrada, exibida quando a pessoa chega ao site. O botão dispara
 * a saída: a tela se recolhe numa linha, como um tubo de raios catódicos
 * desligando, e revela o conteúdo. Quem prefere menos movimento entra sem
 * animação.
 */
export default function Abertura({ aoEntrar }) {
  const [saindo, setSaindo] = useState(false);
  const botao = useRef(null);

  // Leva o foco ao botão, para entrar também pelo teclado.
  useEffect(() => {
    botao.current?.focus({ preventScroll: true });
  }, []);

  const entrar = () => {
    if (saindo) return;
    let semMovimento = false;
    try {
      semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      /* Sem suporte a matchMedia, segue com a animação padrão. */
    }
    setSaindo(true);
    setTimeout(aoEntrar, semMovimento ? 0 : DURACAO_SAIDA);
  };

  return (
    <div
      className={cx('abertura', saindo && 'saindo')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="abertura-titulo"
    >
      <div className="abertura-conteudo">
        <div className="abertura-marcas">
          <MarcaUFF altura={62} variante="azul" />
          <span className="abertura-divisor" aria-hidden="true" />
          <MarcaLacop altura={62} />
        </div>

        <p className="abertura-olho">Universidade Federal Fluminense · LACOP</p>
        <h1 id="abertura-titulo">Da Eletrônica à Inteligência Artificial</h1>
        <p className="abertura-sub">Laboratório de Comunicações Ópticas</p>

        <svg className="abertura-sinal" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
          <line className="eixo" x1="0" y1="40" x2="600" y2="40" />
          <path className="pulso" d={TRACO} pathLength="1" />
          <path className="traco" d={TRACO} pathLength="1" />
        </svg>

        <button ref={botao} type="button" className="btn btn-primario btn-abertura" onClick={entrar}>
          Começar o Workshop <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
