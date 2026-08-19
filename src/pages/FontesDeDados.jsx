import { useMemo, useState } from 'react';
import {
  Database, Search, DownloadCloud, Terminal, FileSpreadsheet, Info, ArrowRight,
} from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import CartaoDataset from '../components/CartaoDataset.jsx';
import ModalDataset from '../components/ModalDataset.jsx';
import Aviso from '../components/Aviso.jsx';
import { datasets, filtrosTarefa, aplicarFiltro } from '../data/datasets.js';
import { caminhoDataset } from '../lib/uteis.js';

const totalLinhas = datasets.reduce((soma, d) => soma + d.linhas, 0);

/**
 * Dispara o download de todos os arquivos em sequência.
 * O intervalo entre os cliques evita que o navegador descarte as
 * requisições seguintes por excesso de downloads simultâneos.
 */
function baixarTudo() {
  datasets.forEach((dataset, i) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = caminhoDataset(dataset.arquivo);
      link.download = dataset.arquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, i * 700);
  });
}

export default function FontesDeDados({ navegar }) {
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [detalhe, setDetalhe] = useState(null);

  const lista = useMemo(() => {
    const porFiltro = aplicarFiltro(datasets, filtro);
    const termo = busca.trim().toLowerCase();
    if (!termo) return porFiltro;

    return porFiltro.filter((d) =>
      [d.titulo, d.resumo, d.sensores, d.arquivo, d.tarefa]
        .join(' ')
        .toLowerCase()
        .includes(termo),
    );
  }, [filtro, busca]);

  return (
    <>
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho"><Database size={14} /> Fontes de dados</span>
            <h2>Bases de sensores prontas para baixar</h2>
            <p>
              Todos os arquivos estão em CSV com separador vírgula e cabeçalho na primeira linha.
              Cada base descreve um cenário de instrumentação, traz o dicionário completo das
              colunas e sugere uma pergunta que um modelo simples consegue responder.
            </p>
          </Revelar>

          <Revelar>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.6rem',
              }}
            >
              <div className="busca">
                <Search size={17} />
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por tema, sensor ou arquivo"
                  aria-label="Buscar base de dados"
                />
              </div>

              <button type="button" className="btn btn-secundario btn-pequeno" onClick={baixarTudo}>
                <DownloadCloud size={16} /> Baixar as {datasets.length} bases
              </button>
            </div>

            <div className="filtros">
              {filtrosTarefa.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`chip ${filtro === f.id ? 'ativo' : ''}`}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.rotulo}
                </button>
              ))}
              <span style={{ alignSelf: 'center', fontSize: '0.85rem', color: 'var(--texto-fraco)' }}>
                {lista.length} de {datasets.length} bases · {totalLinhas.toLocaleString('pt-BR')} linhas no total
              </span>
            </div>
          </Revelar>

          <div className="grade grade-2">
            {lista.map((dataset, i) => (
              <Revelar key={dataset.id} atraso={(i % 3) * 80}>
                <CartaoDataset dataset={dataset} aoAbrirDetalhes={setDetalhe} />
              </Revelar>
            ))}
          </div>

          {lista.length === 0 && (
            <Aviso tipo="info" titulo="Nenhuma base corresponde à busca">
              <p>Tente outro termo ou volte para o filtro de todas as bases.</p>
            </Aviso>
          )}
        </div>
      </section>

      {/* Resumo geral em tabela, útil para projetar durante a aula. */}
      <section className="secao secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho"><FileSpreadsheet size={14} /> Visão geral</span>
            <h2>Comparativo rápido das bases</h2>
            <p>
              Use esta tabela para decidir em grupo. A coluna de alvo indica o que o modelo deve
              prever em cada conjunto.
            </p>
          </Revelar>

          <Revelar>
            <div className="tabela-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Arquivo</th>
                    <th>Tema</th>
                    <th>Tipo de tarefa</th>
                    <th>Alvo</th>
                    <th>Linhas</th>
                    <th>Nível</th>
                  </tr>
                </thead>
                <tbody>
                  {datasets.map((d) => (
                    <tr key={d.id}>
                      <td className="coluna-nome">{d.arquivo}</td>
                      <td>{d.titulo}</td>
                      <td>{d.tarefa}</td>
                      <td style={{ fontFamily: 'var(--fonte-mono)', fontSize: '0.8rem' }}>{d.alvo}</td>
                      <td>{d.linhas}</td>
                      <td>{d.nivel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Revelar>
        </div>
      </section>

      {/* Explicação sobre a origem dos arquivos. */}
      <section className="secao">
        <div className="container">
          <div className="grade grade-2" style={{ gap: '2rem', alignItems: 'start' }}>
            <Revelar>
              <span className="olho"><Info size={14} /> Como os dados nasceram</span>
              <h2>Sintéticos, com física por trás</h2>
              <p>
                Nenhum arquivo veio de coleta real. Todos saíram de um gerador que reproduz
                comportamentos conhecidos de instrumentação: ciclo térmico ao longo do dia,
                acúmulo de gás carbônico em ambiente fechado, desgaste progressivo de rolamento,
                dente de serra de reservatório com bomba automática.
              </p>
              <p>
                Cada série recebe ruído gaussiano e uma semente fixa, o que garante que rodar o
                script de novo produza exatamente os mesmos arquivos. Isso é útil quando a turma
                inteira precisa chegar ao mesmo resultado.
              </p>
              <Aviso tipo="atencao" titulo="Uso didático">
                <p>
                  Dados sintéticos servem para ensinar o método. Antes de aplicar qualquer conclusão
                  a um equipamento real, refaça o processo com leituras do próprio sistema.
                </p>
              </Aviso>
            </Revelar>

            <Revelar atraso={120}>
              <article className="cartao">
                <span className="cartao-icone"><Terminal size={24} /></span>
                <h3>Gerar novamente ou modificar</h3>
                <p>
                  O gerador é um script Node sem dependências. Para recriar os arquivos ou ajustar
                  parâmetros, rode na raiz do projeto:
                </p>
                <div className="prompt">
                  <pre style={{ padding: '0.9rem 1rem' }}>npm run datasets</pre>
                </div>
                <p style={{ marginBottom: 0 }}>
                  O código fica em <code>scripts/gerar-datasets.mjs</code>, com uma função por base.
                  Alterar o número de linhas, a intensidade do ruído ou a regra de rotulagem exige
                  mudar poucas linhas, o que rende um bom exercício extra para a turma.
                </p>
              </article>

              <button
                type="button"
                className="btn btn-primario btn-bloco"
                style={{ marginTop: '1.2rem' }}
                onClick={() => navegar('projeto')}
              >
                Escolhi minha base, e agora? <ArrowRight size={17} />
              </button>
            </Revelar>
          </div>
        </div>
      </section>

      {detalhe && <ModalDataset dataset={detalhe} aoFechar={() => setDetalhe(null)} />}
    </>
  );
}
