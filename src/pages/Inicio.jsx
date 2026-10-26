import { useEffect } from 'react';
import {
  ArrowRight, ArrowUpRight, BookOpen, Database, Lightbulb, Users, FlaskConical, Cpu, FileDown,
} from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import FotoProjeto from '../components/FotoProjeto.jsx';
import IlustracaoIA from '../components/IlustracaoIA.jsx';
import ConviteInteresse from '../components/ConviteInteresse.jsx';
import ResumoTrilha from '../components/ResumoTrilha.jsx';
import { projetos, frentesPesquisa } from '../data/projetos.js';
import { posts } from '../data/posts.js';
import { datasets, basesPublicas } from '../data/datasets.js';

/** Atalhos para as demais abas, com números apurados direto do conteúdo. */
const CONTEUDO = [
  {
    aba: 'artigos',
    icone: BookOpen,
    titulo: 'Artigos',
    texto: `${posts.length} textos em ordem de leitura, do conceito de aprendizado de máquina ao modelo rodando no ESP32.`,
  },
  {
    aba: 'bases',
    icone: Database,
    titulo: 'Bases de dados',
    texto: `${datasets.length} bases de sensores prontas para baixar e ${basesPublicas.length} bases públicas com dados reais.`,
  },
  {
    aba: 'dicas',
    icone: Lightbulb,
    titulo: 'Dicas e vídeos',
    texto: 'Vídeos de apoio, livros recomendados, dicas rápidas e uma biblioteca de prompts para agentes de IA.',
  },
  {
    aba: 'liga',
    icone: Users,
    titulo: 'Liga de IA Acadêmica',
    texto: 'O grupo de estudos e projetos em IA e ciência de dados que o LACOP está formando.',
  },
];

export default function Inicio({ navegar, secao }) {
  // Links como #/inicio/interesse levam direto à seção indicada.
  useEffect(() => {
    if (!secao) return undefined;
    const t = setTimeout(() => {
      document.getElementById(secao)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(t);
  }, [secao]);

  return (
    <>
      {/* Abertura ------------------------------------------------------- */}
      <section className="hero">
        <div className="container hero-grade">
          <div>
            <span className="olho">LACOP · Universidade Federal Fluminense</span>
            <h1>
              Dados de sensores viram <em>previsão</em> quando a IA entra no projeto
            </h1>
            <p className="hero-sub">
              O Workshop IA e Sensores mostra como aproveitar os dados que um sensor já produz para
              trazer eficiência e previsibilidade a projetos de engenharia. Em vez de programar cada
              decisão na mão, você aprende a treinar modelos de aprendizado de máquina com
              bibliotecas prontas e com a ajuda de agentes de IA.
            </p>
            <div className="hero-acoes">
              <button type="button" className="btn btn-primario" onClick={() => navegar('trilha')}>
                Começar pela trilha <ArrowRight size={17} />
              </button>
              <button type="button" className="btn btn-secundario" onClick={() => navegar('bases')}>
                <Database size={17} /> Ver as bases de dados
              </button>
            </div>
          </div>
          <IlustracaoIA />
        </div>
      </section>

      {/* Slides do dia do workshop ------------------------------------ */}
      <section className="secao-compacta">
        <div className="container apresentacoes">
          <Revelar className="apresentacao">
            <div className="apresentacao-texto">
              <span className="olho">SEMENDE 26 · Apresentação</span>
              <h2>Da Eletrônica à Inteligência Artificial</h2>
              <p>
                Baixe os slides para acompanhar a apresentação: os fundamentos de IA, a engenharia
                de prompt, o passo a passo do projeto no Colab, ética e o projeto FisioSense do LACOP.
              </p>
              <span className="apresentacao-nota">Arquivo PDF, 2,9 MB</span>
            </div>
            <a
              className="btn btn-primario"
              href={`${import.meta.env.BASE_URL}materiais/apresentacao-semende-26.pdf`}
              download="Da Eletronica a Inteligencia Artificial - SEMENDE 26.pdf"
            >
              <FileDown size={17} /> Baixar os slides
            </a>
          </Revelar>

          {/* Projeto real do laboratório */}
          <Revelar className="apresentacao apresentacao-projeto" atraso={100}>
            <div className="apresentacao-texto">
              <span className="olho">Projeto real · Pesquisa LACOP</span>
              <h3>FisioSense</h3>
              <p>
                Um dispositivo vestível que mede a amplitude de movimento de braços e pernas na
                fisioterapia, com um sensor MPU-6050 e uma
                plataforma que registra cada sessão. É um caso real dos conceitos do workshop, com
                sensor, dados, modelo e a avaliação do resultado, aplicados fora da sala de aula.
              </p>
            </div>
            <a
              className="btn btn-secundario"
              href="https://fisiosense.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o FisioSense <ArrowUpRight size={17} />
            </a>
          </Revelar>

          {/* Ferramenta usada na parte prática */}
          <Revelar className="apresentacao apresentacao-projeto" atraso={200}>
            <div className="apresentacao-texto">
              <span className="olho">Ferramenta da prática</span>
              <h3>Google Colab</h3>
              <p>
                Ambiente gratuito do Google para escrever e rodar código Python direto no navegador,
                sem instalar nada. É onde você vai treinar o seu modelo, com a ajuda do Gemini.
                Entre com uma Conta Google; o ideal é usar o e-mail institucional do idUFF
                (@id.uff.br).
              </p>
            </div>
            <a
              className="btn btn-secundario"
              href="https://colab.research.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir o Google Colab <ArrowUpRight size={17} />
            </a>
          </Revelar>
        </div>
      </section>

      {/* Trilha e progresso do aluno ------------------------------------ */}
      <ResumoTrilha navegar={navegar} />

      {/* O que tem na plataforma ----------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Na plataforma</span>
            <h2>O que você encontra aqui</h2>
            <p>
              Tudo roda no navegador e está organizado para ser percorrido no seu ritmo: primeiro os
              conceitos, depois a prática com dados, e por fim o caminho até o hardware.
            </p>
          </Revelar>

          <div className="grade grade-4">
            {CONTEUDO.map((item, i) => {
              const Icone = item.icone;
              return (
                <Revelar key={item.aba} atraso={i * 80}>
                  <a href={`#/${item.aba}`} className="cartao cartao-atalho cartao-conteudo">
                    <span className="cartao-icone"><Icone size={20} strokeWidth={1.6} /></span>
                    <h3>{item.titulo}</h3>
                    <p>{item.texto}</p>
                    <span className="artigo-ler">Acessar <ArrowRight size={14} /></span>
                  </a>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* O laboratório -------------------------------------------------- */}
      <section className="secao secao-alt">
        <div className="container">
          <div className="grade grade-2" style={{ gap: 'clamp(1.6rem, 4vw, 3.2rem)', alignItems: 'center' }}>
            <Revelar>
              <span className="olho">O laboratório</span>
              <h2>LACOP e a pesquisa em inteligência artificial</h2>
              <p>
                O Laboratório de Comunicações Ópticas da Universidade Federal Fluminense vem
                direcionando parte da sua pesquisa para a inteligência artificial. O interesse é
                prático: usar modelos de aprendizado para resolver problemas reais de engenharia, de
                saúde e de meio ambiente.
              </p>
              <p style={{ marginBottom: 0 }}>
                Este workshop faz parte desse movimento. A ideia é aproximar das ferramentas de IA
                quem trabalha com eletrônica e sensores, e formar uma comunidade de estudantes
                interessados no tema.
              </p>
            </Revelar>

            <Revelar atraso={120}>
              <div className="cartao">
                <span className="cartao-icone"><FlaskConical size={20} strokeWidth={1.6} /></span>
                <h3 style={{ fontSize: '1.08rem' }}>Frentes de pesquisa em IA</h3>
                <ul className="lista-marcada" style={{ marginTop: '0.8rem' }}>
                  {frentesPesquisa.map((frente) => (
                    <li key={frente}>
                      <Cpu size={16} />
                      <span>{frente}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* Projetos ------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Projetos</span>
            <h2>O que já saiu do laboratório</h2>
            <p>
              Três projetos que mostram a inteligência artificial aplicada fora do papel, cada um com
              uma técnica diferente e um público diferente.
            </p>
          </Revelar>

          <div className="projetos">
            {projetos.map((projeto) => {
              const Icone = projeto.icone;
              return (
                <Revelar key={projeto.id} className="projeto">
                  <div className="projeto-texto">
                    <div className="selos">
                      {projeto.selos.map((selo) => (
                        <span key={selo} className="pill">{selo}</span>
                      ))}
                    </div>
                    <h3>
                      <Icone size={22} strokeWidth={1.6} />
                      {projeto.nome}
                    </h3>
                    <p>{projeto.descricao}</p>
                    <p className="projeto-tecnica">
                      <strong>Técnica:</strong> {projeto.tecnica}
                    </p>
                    <div className="projeto-acoes">
                      <a
                        className="btn btn-secundario btn-pequeno"
                        href={projeto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visitar o projeto <ArrowUpRight size={15} />
                      </a>
                      {projeto.observacao && <span className="projeto-obs">{projeto.observacao}</span>}
                    </div>
                  </div>
                  <FotoProjeto projeto={projeto} />
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* Liga ----------------------------------------------------------- */}
      <section className="secao secao-alt" id="interesse">
        <div className="container">
          <div className="grade grade-2" style={{ gap: 'clamp(1.6rem, 4vw, 3.2rem)', alignItems: 'start' }}>
            <Revelar>
              <span className="olho">Liga de IA e Ciência de Dados</span>
              <h2>Estamos formando uma Liga dentro do laboratório</h2>
              <p>
                O LACOP está construindo uma liga acadêmica voltada para inteligência artificial e
                ciência de dados. A proposta é reunir estudantes que queiram estudar em grupo,
                participar de projetos como os desta página e se aproximar da pesquisa.
              </p>
              <p style={{ marginBottom: 0 }}>
                Com ou sem experiência prévia, se o tema te interessa, preencha o formulário de
                interesse. Avisaremos você quando as atividades começarem.
              </p>
            </Revelar>

            <Revelar atraso={120}>
              <ConviteInteresse />
            </Revelar>
          </div>

          <Revelar>
            <div className="chamada" style={{ marginBottom: 0, background: 'var(--superficie)' }}>
              <p>Quer saber como funciona uma liga acadêmica e conhecer exemplos de outras universidades?</p>
              <button type="button" className="btn btn-primario btn-pequeno" onClick={() => navegar('liga')}>
                Conheça a Liga de IA Acadêmica <ArrowRight size={15} />
              </button>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
