import { Download, Table2, Rows3, Columns3, CalendarClock, HelpCircle, Cpu } from 'lucide-react';
import { caminhoDataset } from '../lib/uteis.js';

/** Cores de destaque por tema da base, reaproveitando as pílulas do CSS. */
const CLASSE_COR = {
  ciano: 'pill-ciano',
  ambar: 'pill-ambar',
  verde: 'pill-verde',
  roxo: 'pill-roxo',
};

/**
 * Cartão de uma base de dados: resumo, metadados e as duas ações
 * principais, baixar o CSV e abrir os detalhes completos.
 */
export default function CartaoDataset({ dataset, aoAbrirDetalhes }) {
  const Icone = dataset.icone;

  return (
    <article className="cartao cartao-dataset">
      <div className="dataset-topo">
        <span className="cartao-icone" style={{ marginBottom: 0 }}>
          <Icone size={24} />
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '0.35rem' }}>{dataset.titulo}</h3>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`pill ${CLASSE_COR[dataset.cor] ?? ''}`}>{dataset.tarefa}</span>
            <span className="pill">{dataset.nivel}</span>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 0 }}>{dataset.resumo}</p>

      <div className="dataset-meta">
        <span><Rows3 size={14} /> {dataset.linhas} linhas</span>
        <span><Columns3 size={14} /> {dataset.colunas} colunas</span>
        <span><Cpu size={14} /> {dataset.sensores}</span>
        <span style={{ width: '100%' }}><CalendarClock size={14} /> {dataset.periodo}</span>
      </div>

      <div className="caixa-pergunta">
        <HelpCircle size={15} style={{ verticalAlign: '-2px', marginRight: '0.35rem' }} />
        <strong>Pergunta de ML: </strong>
        {dataset.pergunta}
      </div>

      <div className="dataset-acoes">
        <a
          className="btn btn-primario btn-pequeno"
          href={caminhoDataset(dataset.arquivo)}
          download={dataset.arquivo}
        >
          <Download size={15} /> Baixar CSV
        </a>
        <button type="button" className="btn btn-secundario btn-pequeno" onClick={() => aoAbrirDetalhes(dataset)}>
          <Table2 size={15} /> Dicionário e prévia
        </button>
      </div>
    </article>
  );
}
