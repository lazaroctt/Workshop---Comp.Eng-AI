import { Database, Target, Columns3 } from 'lucide-react';

/** Ficha do projeto: base usada, coluna prevista e colunas de entrada. */
export default function CabecalhoResultado({ dados }) {
  const tarefa = dados.tipo === 'classificacao'
    ? 'classificação, o modelo escolhe entre categorias'
    : 'regressão, o modelo prevê um número';

  return (
    <div className="ficha-projeto">
      <div className="ficha-item">
        <span className="ficha-rotulo"><Database size={14} /> Base de dados</span>
        <strong>{dados.base ?? 'não informada no arquivo'}</strong>
      </div>

      <div className="ficha-item">
        <span className="ficha-rotulo"><Target size={14} /> Coluna prevista</span>
        <strong>{dados.alvo ?? 'não informada no arquivo'}</strong>
        <span className="ficha-nota">{tarefa}</span>
      </div>

      <div className="ficha-item">
        <span className="ficha-rotulo"><Columns3 size={14} /> Colunas de entrada</span>
        {dados.entradas.length > 0 ? (
          <span className="ficha-pills">
            {dados.entradas.map((entrada) => <span key={entrada} className="pill">{entrada}</span>)}
          </span>
        ) : (
          <strong>não informadas no arquivo</strong>
        )}
      </div>
    </div>
  );
}
