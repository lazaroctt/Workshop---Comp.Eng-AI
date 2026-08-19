import { useEffect, useState } from 'react';
import { X, Download, Table2, Loader2, Lightbulb, FileText } from 'lucide-react';
import { caminhoDataset, lerCSV } from '../lib/uteis.js';
import CaixaPrompt from './CaixaPrompt.jsx';

/**
 * Janela com o detalhamento completo de uma base: cenário, dicionário de
 * dados, prévia das primeiras linhas lidas direto do CSV e um prompt já
 * preparado com o nome real do arquivo e das colunas.
 */
export default function ModalDataset({ dataset, aoFechar }) {
  const [previa, setPrevia] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  // Fecha com a tecla Esc e trava a rolagem do fundo enquanto está aberta.
  useEffect(() => {
    const tecla = (e) => e.key === 'Escape' && aoFechar();
    document.addEventListener('keydown', tecla);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', tecla);
      document.body.style.overflow = anterior;
    };
  }, [aoFechar]);

  // Busca o arquivo servido pela pasta public para montar a prévia.
  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(false);

    fetch(caminhoDataset(dataset.arquivo))
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('falha ao carregar'))))
      .then((texto) => {
        if (ativo) {
          setPrevia(lerCSV(texto, 8));
          setCarregando(false);
        }
      })
      .catch(() => {
        if (ativo) {
          setErro(true);
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [dataset.arquivo]);

  const colunas = dataset.dicionario.map((d) => d.coluna).join(', ');
  const promptPronto =
    `Estou no Google Colab com o arquivo ${dataset.arquivo}, que tem ${dataset.linhas} linhas de dados de sensores.\n\n` +
    `Colunas: ${colunas}\n\n` +
    `Contexto: ${dataset.cenario}\n\n` +
    `Quero responder: ${dataset.pergunta}\n` +
    `Coluna alvo: ${dataset.alvo}\n\n` +
    'Gere um código Python completo, em uma única célula, que carregue o CSV, prepare os dados, ' +
    'divida treino e teste com random_state=42, treine um modelo simples do scikit-learn e imprima ' +
    'as métricas adequadas ao tipo de problema. Comente cada etapa em português e explique o ' +
    'resultado em um parágrafo curto no fim.';

  return (
    <div className="modal-fundo" onClick={aoFechar} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes da base ${dataset.titulo}`}
      >
        <div className="modal-topo">
          <div>
            <h3>{dataset.titulo}</h3>
            <span style={{ fontFamily: 'var(--fonte-mono)', fontSize: '0.82rem', color: 'var(--texto-fraco)' }}>
              {dataset.arquivo}
            </span>
          </div>
          <button type="button" className="btn-icone" onClick={aoFechar} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div className="modal-corpo">
          <h4><FileText size={16} style={{ verticalAlign: '-3px', marginRight: '0.4rem' }} />Cenário</h4>
          <p>{dataset.cenario}</p>

          <h4 style={{ marginTop: '1.6rem' }}>
            <Table2 size={16} style={{ verticalAlign: '-3px', marginRight: '0.4rem' }} />
            Dicionário de dados
          </h4>
          <div className="tabela-wrap" style={{ marginBottom: '1.6rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Coluna</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {dataset.dicionario.map((item) => (
                  <tr key={item.coluna}>
                    <td className="coluna-nome">{item.coluna}</td>
                    <td>{item.tipo}</td>
                    <td style={{ whiteSpace: 'normal', minWidth: '260px' }}>{item.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4>Primeiras linhas do arquivo</h4>
          {carregando && (
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={16} className="flutua" /> Carregando a prévia
            </p>
          )}
          {erro && <p>Não foi possível ler o arquivo agora. O download continua funcionando normalmente.</p>}
          {previa && (
            <>
              <div className="tabela-wrap">
                <table>
                  <thead>
                    <tr>
                      {previa.cabecalho.map((coluna) => (
                        <th key={coluna}>{coluna}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previa.corpo.map((linha, i) => (
                      <tr key={i}>
                        {linha.map((celula, j) => (
                          <td key={j}>{celula}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '0.82rem', marginTop: '0.6rem' }}>
                Mostrando 8 de {previa.total} linhas do arquivo completo.
              </p>
            </>
          )}

          <h4 style={{ marginTop: '1.6rem' }}>
            <Lightbulb size={16} style={{ verticalAlign: '-3px', marginRight: '0.4rem' }} />
            Sugestões para esta base
          </h4>
          <ul>
            {dataset.dicas.map((dica) => (
              <li key={dica}>{dica}</li>
            ))}
          </ul>

          <h4 style={{ marginTop: '1.6rem' }}>Prompt pronto para esta base</h4>
          <CaixaPrompt titulo={`Treinar modelo com ${dataset.arquivo}`} texto={promptPronto} />
        </div>

        <div className="modal-rodape">
          <button type="button" className="btn btn-secundario" onClick={aoFechar}>
            Fechar
          </button>
          <a className="btn btn-primario" href={caminhoDataset(dataset.arquivo)} download={dataset.arquivo}>
            <Download size={16} /> Baixar {dataset.arquivo}
          </a>
        </div>
      </div>
    </div>
  );
}
