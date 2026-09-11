import { useRevelar, cx } from '../lib/uteis.js';

/**
 * Envolve qualquer bloco e aplica a animação de entrada quando ele
 * aparece na tela. O atraso permite escalonar itens de uma grade.
 */
export default function Revelar({ children, atraso = 0, className = '', style, como: Tag = 'div' }) {
  const { alvo, visivel } = useRevelar();

  return (
    <Tag
      ref={alvo}
      className={cx('revelar', visivel && 'visivel', className)}
      style={{ ...style, transitionDelay: `${atraso}ms` }}
    >
      {children}
    </Tag>
  );
}
