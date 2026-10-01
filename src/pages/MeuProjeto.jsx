import { useState } from 'react';
import { FileJson, RefreshCw, Download } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import Aviso from '../components/Aviso.jsx';
import AreaEnvio from '../components/AreaEnvio.jsx';
import CaixaPrompt from '../components/CaixaPrompt.jsx';
import PainelClassificacao from '../components/PainelClassificacao.jsx';
import PainelRegressao from '../components/PainelRegressao.jsx';
import ExportarPdf from '../components/ExportarPdf.jsx';
import { interpretarResultado } from '../lib/resultado.js';
import { prompts } from '../data/prompts.js';

/** Endereço dos arquivos de exemplo, servidos pela pasta public. */
const caminhoExemplo = (arquivo) => `${import.meta.env.BASE_URL}exemplos/${arquivo}`;

/** Prompt que faz o agente do Colab gerar o arquivo no formato desta página. */
const PROMPT = prompts['gerar-resultado-json'];

const EXEMPLOS = [
  { arquivo: 'resultado_projeto_classificacao.json', rotulo: 'exemplo de classificação' },
  { arquivo: 'resultado_projeto_regressao.json', rotulo: 'exemplo de regressão' },
];

const FORMATO_CLASSIFICACAO = `{
  "base": "ambiente_temperatura_umidade.csv",
  "alvo": "conforto",
  "tipo": "classificacao",
  "entradas": ["temperatura_c", "umidade_pct", "luminosidade_lux"],
  "acuracia": 0.91,
  "piso": 0.46,
  "classes": ["frio", "confortavel", "quente"],
  "matriz_confusao": [[50, 1, 5], [4, 20, 0], [1, 0, 35]],
  "amostras": [{"real": "quente", "previsto": "quente"}]
}`;

const FORMATO_REGRESSAO = `{
  "base": "consumo_energia.csv",
  "alvo": "consumo_kwh",
  "tipo": "regressao",
  "entradas": ["hora", "temperatura", "dia_semana"],
  "erro_medio_modelo": 3.2,
  "erro_medio_piso": 8.7,
  "amostras": [{"real": 24.5, "previsto": 23.9}]
}`;

export default function MeuProjeto() {
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  const [arquivo, setArquivo] = useState(null);

  const aoLer = (texto, nome) => {
    const saida = interpretarResultado(texto);
    setArquivo(nome);

    if (saida.ok) {
      setResultado(saida.dados);
      setErro(null);
    } else {
      setResultado(null);
      setErro({ titulo: saida.titulo, dicas: saida.dicas });
    }
  };

  const aoFalhar = (problema) => {
    setResultado(null);
    setErro(problema);
  };

  const recomecar = () => {
    setResultado(null);
    setErro(null);
    setArquivo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Os exemplos vêm da própria pasta public, para quem quer ver o painel
  // funcionando antes de ter o resultado do próprio modelo.
  const abrirExemplo = async (nome) => {
    try {
      const resposta = await fetch(caminhoExemplo(nome));
      if (!resposta.ok) throw new Error('arquivo indisponível');
      aoLer(await resposta.text(), nome);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      aoFalhar({
        titulo: 'O exemplo não pôde ser carregado agora.',
        dicas: ['Confira a conexão e tente de novo, ou baixe o arquivo e envie pela área de leitura.'],
      });
    }
  };

  return (
    <>
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Meu projeto</span>
            <h2>Veja o resultado do seu modelo</h2>
            <p>
              Em dois passos, sem escrever código: peça o arquivo do resultado à inteligência
              artificial do Colab e envie esse arquivo aqui. A página monta o painel com a
              comparação entre o seu modelo e o palpite mais simples possível, que é o teste que
              revela se houve aprendizado de verdade.
            </p>
          </Revelar>

          {!resultado && (
            <div className="etapas">
              <Revelar className="etapa">
                <span className="etapa-numero" aria-hidden="true">1</span>
                <h3>Passo 1: gere o arquivo do seu projeto</h3>
                <p>
                  Com o modelo já treinado e avaliado, copie o prompt abaixo e cole na inteligência
                  artificial do seu notebook no Colab. Ela monta a célula que cria o
                  resultado_projeto.json e baixa o arquivo para o seu computador.
                </p>
                <CaixaPrompt titulo={PROMPT.titulo} texto={PROMPT.texto} />
              </Revelar>

              <Revelar className="etapa" atraso={80}>
                <span className="etapa-numero" aria-hidden="true">2</span>
                <h3>Passo 2: envie o arquivo gerado</h3>
                <p>
                  Com o resultado_projeto.json na máquina, traga o arquivo para cá. A leitura é
                  imediata e acontece no seu navegador.
                </p>
                <AreaEnvio aoLer={aoLer} aoFalhar={aoFalhar} />
              </Revelar>
            </div>
          )}

          {erro && (
            <Revelar>
              <div style={{ marginTop: '1.4rem' }}>
                <Aviso tipo="atencao" titulo={erro.titulo}>
                  {arquivo && <p className="erro-arquivo">Arquivo enviado: {arquivo}</p>}
                  <ul className="lista-marcada">
                    {erro.dicas.map((dica) => <li key={dica}>{dica}</li>)}
                  </ul>
                </Aviso>
              </div>
            </Revelar>
          )}

          {resultado && (
            <>
              <Revelar>
                <div className="resultado-topo">
                  <span className="resultado-arquivo">
                    <FileJson size={16} />
                    {arquivo}
                  </span>
                  <button type="button" className="btn btn-secundario btn-pequeno" onClick={recomecar}>
                    <RefreshCw size={15} /> Enviar outro arquivo
                  </button>
                </div>
              </Revelar>

              {resultado.tipo === 'classificacao'
                ? <PainelClassificacao dados={resultado} />
                : <PainelRegressao dados={resultado} />}

              <Revelar>
                <div className="bloco-exportar">
                  <ExportarPdf dados={resultado} />
                </div>
              </Revelar>
            </>
          )}
        </div>
      </section>

      <section className="secao secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Formato do arquivo</span>
            <h2>Como o resultado precisa estar escrito</h2>
            <p>
              O arquivo muda conforme a pergunta do projeto. Se o modelo escolhe entre categorias,
              use o formato de classificação. Se ele prevê um número, use o de regressão. O campo
              "tipo" é o que a página lê primeiro.
            </p>
          </Revelar>

          <div className="grade grade-2">
            <Revelar>
              <h3 className="titulo-bloco">Classificação</h3>
              <div className="prompt"><pre>{FORMATO_CLASSIFICACAO}</pre></div>
            </Revelar>

            <Revelar atraso={80}>
              <h3 className="titulo-bloco">Regressão</h3>
              <div className="prompt"><pre>{FORMATO_REGRESSAO}</pre></div>
            </Revelar>
          </div>

          <Revelar>
            <div className="exemplos-acoes">
              <p>
                Quer ver o painel antes de treinar o seu modelo? Abra um dos exemplos, ou baixe o
                arquivo para usar de modelo no notebook.
              </p>
              <div className="exemplos-botoes">
                {EXEMPLOS.map(({ arquivo: nome, rotulo }) => (
                  <span key={nome} className="exemplo-par">
                    <button type="button" className="btn btn-secundario btn-pequeno" onClick={() => abrirExemplo(nome)}>
                      Abrir {rotulo}
                    </button>
                    <a className="btn btn-fantasma btn-pequeno" href={caminhoExemplo(nome)} download={nome}>
                      <Download size={15} /> Baixar
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </Revelar>

          <Revelar>
            <div style={{ marginTop: '1.6rem' }}>
              <Aviso tipo="ok" titulo="Seus dados continuam no seu computador">
                <p>
                  A página não tem servidor por trás. O arquivo é aberto pelo navegador, os números
                  são calculados na própria máquina e nada é guardado ou transmitido. Ao recarregar
                  a página, o painel volta a ficar vazio.
                </p>
              </Aviso>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
