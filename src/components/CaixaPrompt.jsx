import { Copy, Check, Sparkles } from 'lucide-react';
import { useCopiar } from '../lib/uteis.js';

/**
 * Bloco de prompt pronto para colar em um agente de IA.
 * O botão copia o texto completo, inclusive as marcações entre colchetes
 * que o aluno precisa substituir.
 */
export default function CaixaPrompt({ titulo, texto }) {
  const { copiado, copiar } = useCopiar();

  return (
    <div className="prompt">
      <div className="prompt-topo">
        <strong>
          <Sparkles size={15} style={{ verticalAlign: '-2px', marginRight: '0.4rem', color: 'var(--destaque)' }} />
          {titulo}
        </strong>
        <button
          type="button"
          className={`btn-copiar ${copiado ? 'copiado' : ''}`}
          onClick={() => copiar(texto)}
          aria-label={`Copiar o prompt ${titulo}`}
        >
          {copiado ? <Check size={14} /> : <Copy size={14} />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre>{texto}</pre>
    </div>
  );
}
