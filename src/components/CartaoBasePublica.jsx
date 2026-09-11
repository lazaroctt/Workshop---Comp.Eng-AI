import { ExternalLink, Rows3, HardDrive, ShieldCheck, Lightbulb, AlertTriangle } from 'lucide-react';

const CLASSE_COR = {
  ciano: 'pill-ciano',
  ambar: 'pill-ambar',
  verde: 'pill-verde',
  roxo: 'pill-roxo',
};

/**
 * Cartão de uma base pública externa. Segue o mesmo desenho do cartão das
 * bases sintéticas, trocando o download direto pelo link da página oficial.
 */
export default function CartaoBasePublica({ base }) {
  const Icone = base.icone;

  return (
    <article className="cartao cartao-dataset">
      <div className="dataset-topo">
        <span className="cartao-icone" style={{ marginBottom: 0 }}>
          <Icone size={20} strokeWidth={1.6} />
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: base.nomeCompleto ? '0.1rem' : '0.35rem' }}>{base.titulo}</h3>
          {base.nomeCompleto && <span className="dataset-subtitulo">{base.nomeCompleto}</span>}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`pill ${CLASSE_COR[base.cor] ?? ''}`}>{base.tarefa}</span>
            <span className="pill">Pública · UCI</span>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 0 }}>{base.descricao}</p>

      <div className="dataset-meta">
        <span><Rows3 size={14} /> {base.instancias} instâncias</span>
        {base.tamanho && <span><HardDrive size={14} /> {base.tamanho}</span>}
        <span><ShieldCheck size={14} /> Licença CC BY 4.0</span>
      </div>

      {base.aviso && (
        <div className="caixa-pergunta caixa-aviso">
          <AlertTriangle size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
          {base.aviso}
        </div>
      )}

      <div className="caixa-pergunta">
        <Lightbulb size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
        <strong>Dica: </strong>
        {base.dica}
      </div>

      <div className="dataset-acoes">
        <a
          className={`btn btn-pequeno ${base.aviso ? 'btn-secundario' : 'btn-primario'}`}
          href={base.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={15} /> Abrir na UCI
        </a>
      </div>
    </article>
  );
}
