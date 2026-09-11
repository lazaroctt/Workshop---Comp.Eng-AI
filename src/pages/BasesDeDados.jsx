import { useMemo, useState } from 'react';
import { DownloadCloud, ArrowRight } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import CartaoDataset from '../components/CartaoDataset.jsx';
import CartaoBasePublica from '../components/CartaoBasePublica.jsx';
import ModalDataset from '../components/ModalDataset.jsx';
import Aviso from '../components/Aviso.jsx';
import { datasets, basesPublicas, filtrosTarefa, aplicarFiltro } from '../data/datasets.js';
import { caminhoDataset } from '../lib/uteis.js';

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

export default function BasesDeDados({ navegar }) {
  const [filtro, setFiltro] = useState('todos');
  const [detalhe, setDetalhe] = useState(null);

  const lista = useMemo(() => aplicarFiltro(datasets, filtro), [filtro]);
  const publicas = useMemo(() => aplicarFiltro(basesPublicas, filtro), [filtro]);

  return (
    <>
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Bases de dados</span>
            <h2>Bases prontas para baixar</h2>
            <p>
              Oito conjuntos de dados de sensores em CSV, com vírgula como separador e cabeçalho na
              primeira linha. Cada um traz o cenário, o dicionário das colunas e uma pergunta que
              um modelo simples consegue responder.
            </p>
          </Revelar>

          <Revelar>
            <div className="barra-filtros">
              <div className="filtros" style={{ marginBottom: 0 }}>
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
              </div>
              <button type="button" className="btn btn-secundario btn-pequeno" onClick={baixarTudo}>
                <DownloadCloud size={16} /> Baixar as {datasets.length} bases
              </button>
            </div>
          </Revelar>

          <div className="grade grade-2">
            {lista.map((dataset, i) => (
              <Revelar key={dataset.id} atraso={(i % 3) * 80}>
                <CartaoDataset dataset={dataset} aoAbrirDetalhes={setDetalhe} />
              </Revelar>
            ))}
          </div>

          <Revelar>
            <div style={{ marginTop: '2rem' }}>
              <Aviso tipo="atencao" titulo="Dados sintéticos">
                <p>
                  Estas oito bases foram geradas por um script que reproduz comportamentos físicos
                  conhecidos, com ruído e rótulos definidos. Servem para aprender o método. Para
                  tirar conclusões sobre um equipamento real, refaça o processo com leituras do
                  próprio sistema ou com as bases públicas abaixo.
                </p>
              </Aviso>
            </div>
          </Revelar>
        </div>
      </section>

      <section className="secao secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Bases públicas</span>
            <h2>Dados reais para ir além</h2>
            <p>
              Depois do primeiro modelo, vale repetir o fluxo com dados coletados de verdade. Estas
              bases são gratuitas, adequadas a quem está começando e ficam no UCI Machine Learning
              Repository, sob licença CC BY 4.0.
            </p>
          </Revelar>

          <div className="grade grade-2">
            {publicas.map((base, i) => (
              <Revelar key={base.id} atraso={(i % 3) * 80}>
                <CartaoBasePublica base={base} />
              </Revelar>
            ))}
          </div>

          {publicas.length === 0 && (
            <Aviso tipo="info" titulo="Nenhuma base pública neste filtro">
              <p>Volte para Todas as bases para ver a lista completa.</p>
            </Aviso>
          )}
        </div>
      </section>

      <section className="secao-compacta">
        <div className="container">
          <Revelar>
            <div className="chamada" style={{ margin: 0 }}>
              <p>Escolheu uma base? O artigo Seu primeiro modelo mostra o caminho completo, do CSV à métrica.</p>
              <button
                type="button"
                className="btn btn-primario btn-pequeno"
                onClick={() => navegar('artigos', 'seu-primeiro-modelo')}
              >
                Ler o passo a passo <ArrowRight size={15} />
              </button>
            </div>
          </Revelar>
        </div>
      </section>

      {detalhe && <ModalDataset dataset={detalhe} aoFechar={() => setDetalhe(null)} />}
    </>
  );
}
