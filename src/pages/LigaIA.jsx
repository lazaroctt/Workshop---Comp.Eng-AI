import { ArrowRight, ArrowUpRight, BookOpen, FlaskConical, Trophy, Presentation, Network, Users } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import { atividadesLiga, ligasReferencia, canastra } from '../data/liga.js';

const ICONES_ATIVIDADE = [BookOpen, FlaskConical, Trophy, Presentation];

const PILARES_LACOP = [
  {
    titulo: 'Estudar',
    texto: 'Trilhas de estudo em aprendizado de máquina e ciência de dados, partindo do que esta plataforma já oferece.',
  },
  {
    titulo: 'Construir',
    texto: 'Projetos com dados de sensores, visão computacional e dados ambientais, na linha dos trabalhos que já saíram do laboratório.',
  },
  {
    titulo: 'Pesquisar',
    texto: 'Contato direto com a pesquisa do LACOP, para quem quiser seguir para iniciação científica ou pós-graduação.',
  },
];

export default function LigaIA({ navegar }) {
  return (
    <>
      {/* Abertura ------------------------------------------------------- */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <span className="olho">Liga de IA Acadêmica</span>
            <h1>
              Um espaço para <em>estudar, construir e pesquisar</em> inteligência artificial
            </h1>
            <p className="hero-sub">
              Uma liga acadêmica é uma organização de estudantes, com apoio de professores, que se
              reúne para aprofundar um tema além da grade do curso. Nas ligas de IA, isso significa
              estudar em grupo, desenvolver projetos, participar de competições e levar o assunto
              para o resto da universidade.
            </p>
          </div>
        </div>
      </section>

      {/* O que uma liga faz --------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Como funciona</span>
            <h2>O que acontece em uma liga de IA</h2>
            <p>
              Cada liga tem seu formato, mas quatro atividades aparecem em quase todas. Quem
              conduz é o próprio grupo de estudantes, o que faz da liga também uma escola de
              organização e trabalho em equipe.
            </p>
          </Revelar>

          <div className="grade grade-4">
            {atividadesLiga.map((atividade, i) => {
              const Icone = ICONES_ATIVIDADE[i];
              return (
                <Revelar key={atividade.titulo} atraso={i * 80}>
                  <article className="cartao">
                    <span className="cartao-icone"><Icone size={20} strokeWidth={1.6} /></span>
                    <h3 style={{ fontSize: '1.05rem' }}>{atividade.titulo}</h3>
                    <p>{atividade.texto}</p>
                  </article>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* Referências ---------------------------------------------------- */}
      <section className="secao secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Referências no Brasil</span>
            <h2>Ligas que servem de inspiração</h2>
            <p>
              Várias universidades brasileiras já têm ligas e grupos de IA consolidados. Três deles
              ajudam a entender o que uma liga pode se tornar.
            </p>
          </Revelar>

          <div className="grade grade-3">
            {ligasReferencia.map((liga, i) => (
              <Revelar key={liga.id} atraso={i * 90}>
                <article className="cartao cartao-liga">
                  <span className="liga-instituicao">{liga.instituicao}</span>
                  <h3>{liga.sigla}</h3>
                  <span className="liga-nome">{liga.nome}</span>
                  <ul>
                    {liga.fatos.map((fato) => <li key={fato}>{fato}</li>)}
                  </ul>
                  <a className="btn btn-secundario btn-pequeno" href={liga.url} target="_blank" rel="noopener noreferrer">
                    Visitar o site <ArrowUpRight size={15} />
                  </a>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* Canastra Leagues Network --------------------------------------- */}
      <section className="secao">
        <div className="container">
          <div className="grade grade-2" style={{ gap: 'clamp(1.6rem, 4vw, 3.2rem)', alignItems: 'center' }}>
            <Revelar>
              <span className="olho">Rede de ligas</span>
              <h2>{canastra.nome}</h2>
              <p>
                As ligas também começaram a se conectar entre si. A Canastra Leagues Network foi
                criada pela Canastra Ventures, gestora que investe em startups brasileiras de
                inteligência artificial, para reunir ligas universitárias de empreendedorismo,
                tecnologia e IA de todo o país.
              </p>
              <p>
                A aposta da rede é que muitos dos próximos fundadores de startups já estão dentro das
                universidades, e que as ligas são o lugar onde eles começam a construir e testar
                ideias.
              </p>
            </Revelar>

            <Revelar atraso={120}>
              <div className="cartao">
                <span className="cartao-icone"><Network size={20} strokeWidth={1.6} /></span>
                <h3 style={{ fontSize: '1.05rem' }}>O que a rede oferece às ligas parceiras</h3>
                <ul className="lista-marcada" style={{ marginTop: '0.8rem' }}>
                  <li><ArrowRight size={16} /><span>Acesso a uma comunidade de fundadores, mentores e investidores</span></li>
                  <li><ArrowRight size={16} /><span>Palestras exclusivas e oportunidades nas startups do portfólio</span></li>
                  <li><ArrowRight size={16} /><span>Caminho facilitado para o programa AI Residency</span></li>
                  <li><ArrowRight size={16} /><span>O Canastra On Campus, que leva esse ecossistema para dentro das universidades</span></li>
                </ul>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <a className="btn btn-secundario btn-pequeno" href={canastra.url} target="_blank" rel="noopener noreferrer">
                    Ler o anúncio da rede <ArrowUpRight size={15} />
                  </a>
                  <a className="btn btn-fantasma btn-pequeno" href={canastra.urlGestora} target="_blank" rel="noopener noreferrer">
                    Canastra Ventures <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* A liga do LACOP ------------------------------------------------ */}
      <section className="secao secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">No LACOP</span>
            <h2>A Liga de IA e Ciência de Dados do laboratório</h2>
            <p>
              O LACOP está formando a sua própria liga, voltada a estudantes interessados no tema,
              com ou sem experiência prévia. A proposta se apoia em três frentes.
            </p>
          </Revelar>

          <div className="grade grade-3">
            {PILARES_LACOP.map((pilar, i) => (
              <Revelar key={pilar.titulo} atraso={i * 90}>
                <article className="cartao cartao-pilar">
                  <span className="artigo-numero">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{pilar.titulo}</h3>
                  <p>{pilar.texto}</p>
                </article>
              </Revelar>
            ))}
          </div>

          <Revelar>
            <div className="chamada" style={{ marginBottom: 0, background: 'var(--superficie)' }}>
              <p>
                <Users size={17} style={{ verticalAlign: '-3px', marginRight: '0.45rem', color: 'var(--azul-700)' }} />
                Quer participar desde o começo? Deixe seu contato no formulário de interesse.
              </p>
              <button type="button" className="btn btn-primario btn-pequeno" onClick={() => navegar('inicio', 'interesse')}>
                Demonstrar interesse <ArrowRight size={15} />
              </button>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
