import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Lista expansível com um item aberto por vez.
 * Cada item recebe { pergunta, resposta } para texto simples, ou
 * { pergunta, conteudo } quando o corpo é um componente, como um prompt.
 */
export default function Acordeao({ itens }) {
  const [aberto, setAberto] = useState(null);

  return (
    <div className="grade" style={{ gap: '0.6rem' }}>
      {itens.map((item, i) => {
        const ativo = aberto === i;
        return (
          <div className="cartao" key={item.pergunta} style={{ padding: 0 }}>
            <button
              type="button"
              className="passo-cabecalho"
              onClick={() => setAberto(ativo ? null : i)}
              aria-expanded={ativo}
            >
              <ChevronRight size={18} className={`chevron ${ativo ? 'aberto' : ''}`} />
              <h3 style={{ fontSize: '1rem' }}>{item.pergunta}</h3>
            </button>
            {ativo && (
              <div className="passo-corpo" style={{ paddingTop: 0 }}>
                {item.conteudo ?? <p style={{ marginBottom: 0 }}>{item.resposta}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
