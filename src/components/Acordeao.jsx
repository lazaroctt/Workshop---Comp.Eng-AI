import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Lista de perguntas e respostas com abertura em um item por vez.
 * Recebe itens no formato { pergunta, resposta }.
 */
export default function Acordeao({ itens }) {
  const [aberto, setAberto] = useState(null);

  return (
    <div className="grade" style={{ gap: '0.7rem' }}>
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
                <p style={{ marginBottom: 0 }}>{item.resposta}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
