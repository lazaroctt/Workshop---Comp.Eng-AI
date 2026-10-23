import { Copy, Check, Sparkles, Code2 } from 'lucide-react';
import { useCopiar } from '../lib/uteis.js';

/**
 * Bloco de prompt pronto para colar em um agente de IA.
 * O botão copia o texto completo, inclusive as marcações entre colchetes
 * que o aluno precisa substituir. Com tipo="codigo", o mesmo bloco exibe
 * um trecho de código, preservando a indentação.
 */
export default function CaixaPrompt({ titulo, texto, tipo = 'prompt' }) {
  const { copiado, copiar } = useCopiar();
  const Icone = tipo === 'codigo' ? Code2 : Sparkles;

  return (
    <div className={tipo === 'codigo' ? 'prompt prompt-codigo' : 'prompt'}>
      <div className="prompt-topo">
        <strong>
          <Icone size={15} style={{ verticalAlign: '-2px', marginRight: '0.4rem', color: 'var(--destaque)' }} />
          {titulo}
        </strong>
        <button
          type="button"
          className={`btn-copiar ${copiado ? 'copiado' : ''}`}
          onClick={() => copiar(texto)}
          aria-label={`Copiar ${tipo === 'codigo' ? 'o código' : 'o prompt'} ${titulo}`}
        >
          {copiado ? <Check size={14} /> : <Copy size={14} />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre>{texto}</pre>
    </div>
  );
}
