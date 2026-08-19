import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { cx } from '../lib/uteis.js';

const ICONES = { atencao: AlertTriangle, info: Info, ok: CheckCircle2 };
const CLASSES = { atencao: '', info: 'aviso-info', ok: 'aviso-ok' };

/** Caixa de destaque usada para observações ao longo do conteúdo. */
export default function Aviso({ tipo = 'info', titulo, children }) {
  const Icone = ICONES[tipo] ?? Info;

  return (
    <div className={cx('aviso', CLASSES[tipo])}>
      <Icone size={20} />
      <div>
        {titulo && <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{titulo}</strong>}
        {children}
      </div>
    </div>
  );
}
