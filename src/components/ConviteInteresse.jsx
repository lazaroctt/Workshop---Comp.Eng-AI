import { ArrowUpRight, ClipboardList, Info } from 'lucide-react';
import { FORMULARIO_LIGA } from '../data/liga.js';

/**
 * Convite para o formulário de interesse na Liga, que fica hospedado no Google
 * Forms. Enquanto o endereço não é informado em src/data/liga.js, o cartão
 * avisa que as inscrições abrem em breve e o botão fica desativado.
 */
export default function ConviteInteresse() {
  const link = FORMULARIO_LIGA.trim();
  const pronto = /^https?:\/\//.test(link);

  return (
    <div className="formulario convite-interesse">
      <span className="convite-icone" aria-hidden="true"><ClipboardList size={18} /></span>
      <h3>Deixe seu contato</h3>
      <p>A inscrição fica em um formulário do Google e leva cerca de dois minutos.</p>

      {pronto ? (
        <a className="btn btn-primario btn-largo" href={link} target="_blank" rel="noopener noreferrer">
          Abrir o formulário <ArrowUpRight size={18} />
        </a>
      ) : (
        <>
          <p className="form-mensagem">
            <Info size={15} />
            As inscrições abrem em breve. O link do formulário aparece aqui assim que ele for publicado.
          </p>
          <button type="button" className="btn btn-primario btn-largo" disabled>
            Abrir o formulário <ArrowUpRight size={18} />
          </button>
        </>
      )}

      <p className="form-nota">
        Os dados servem apenas para o contato sobre a Liga de IA do LACOP.
      </p>
    </div>
  );
}
