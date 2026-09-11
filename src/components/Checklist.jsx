import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

/**
 * Lista marcável. O progresso fica salvo neste navegador, então dá para
 * fechar a página e continuar depois de onde parou.
 */
export default function Checklist({ id, itens }) {
  const chave = `checklist-${id}`;
  const [feitos, setFeitos] = useState([]);

  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(chave) ?? '[]');
      if (Array.isArray(salvo)) setFeitos(salvo);
    } catch {
      setFeitos([]);
    }
  }, [chave]);

  const alternar = (item) => {
    setFeitos((atuais) => {
      const novos = atuais.includes(item) ? atuais.filter((i) => i !== item) : [...atuais, item];
      try {
        localStorage.setItem(chave, JSON.stringify(novos));
      } catch {
        /* Sem armazenamento disponível, a marcação vale só para esta visita. */
      }
      return novos;
    });
  };

  return (
    <div className="checklist">
      {itens.map((item) => {
        const feito = feitos.includes(item);
        return (
          <button
            key={item}
            type="button"
            className={`checklist-item ${feito ? 'feito' : ''}`}
            onClick={() => alternar(item)}
            aria-pressed={feito}
          >
            {feito ? <CheckCircle2 size={19} /> : <Circle size={19} />}
            <span>{item}</span>
          </button>
        );
      })}
      <p className="checklist-total">
        {feitos.filter((f) => itens.includes(f)).length} de {itens.length} itens concluídos
      </p>
    </div>
  );
}
