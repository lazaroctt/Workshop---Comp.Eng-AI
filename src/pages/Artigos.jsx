import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, Database, Lightbulb, Library } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import FiguraFluxo from '../components/FiguraFluxo.jsx';
import CaixaPrompt from '../components/CaixaPrompt.jsx';
import Aviso from '../components/Aviso.jsx';
import Checklist from '../components/Checklist.jsx';
import { posts, acharPost } from '../data/posts.js';
import { prompts } from '../data/prompts.js';
import { referencias, ACESSO } from '../data/referencias.js';

/** Cor do ícone de cada artigo, só para diferenciar as categorias. */
const CORES = {
  ciano: 'var(--azul-700)',
  ambar: 'var(--ambar-500)',
  verde: 'var(--verde-500)',
  roxo: 'var(--roxo-500)',
};

const numero = (i) => String(i + 1).padStart(2, '0');
const linkArtigo = (slug) => `#/artigos/${slug}`;

/**
 * Ordem das referências de um artigo: primeiro as obras na sequência em que
 * aparecem citadas no texto, depois as demais da lista de fontes.
 */
function ordenarFontes(post) {
  const ordem = [];
  post.conteudo.forEach((bloco) => (bloco.ref ?? []).forEach((k) => !ordem.includes(k) && ordem.push(k)));
  (post.fontes ?? []).forEach((k) => !ordem.includes(k) && ordem.push(k));
  return ordem;
}

/** Leva a leitura até a referência e a destaca por um instante. */
function irParaReferencia(slug, numero) {
  const item = document.getElementById(`ref-${slug}-${numero}`);
  if (!item) return;
  item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  item.classList.add('destacada');
  item.focus({ preventScroll: true });
  setTimeout(() => item.classList.remove('destacada'), 1800);
}

/** Marca de citação numérica, como [1, 3], ao fim de um trecho. */
function Marcas({ chaves, contexto }) {
  if (!chaves?.length || !contexto) return null;
  const numeros = [...new Set(chaves.map((k) => contexto.mapa[k]).filter(Boolean))].sort((a, b) => a - b);
  return (
    <sup className="citacao">
      [
      {numeros.map((n, i) => (
        <Fragment key={n}>
          {i > 0 && ', '}
          <button type="button" onClick={() => irParaReferencia(contexto.slug, n)} aria-label={`Ver referência ${n}`}>
            {n}
          </button>
        </Fragment>
      ))}
      ]
    </sup>
  );
}

/** Uma referência formatada segundo a ABNT, com a etiqueta da instituição. */
function Referencia({ chave, numero, slug }) {
  const r = referencias[chave];
  if (!r) return null;
  const separador = r.autores.endsWith('.') ? ' ' : '. ';
  const link = (href, texto) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{texto}</a>
  );

  return (
    <li id={`ref-${slug}-${numero}`} tabIndex={-1}>
      <span className="ref-numero">{numero}</span>
      <div>
        <p className="ref-texto">
          {r.autores}{separador}
          {r.titulo && `${r.titulo}. `}
          <strong>{r.obra}</strong>
          {r.detalhes}
          {r.doi && <> DOI: {link(`https://doi.org/${r.doi}`, r.doi)}.</>}
          {!r.doi && r.url && <> Disponível em: {link(r.url, r.url)}. {ACESSO}</>}
        </p>
        <span className="pill ref-selo">{r.instituicao}</span>
      </div>
    </li>
  );
}

/** Monta um bloco de conteúdo do artigo conforme o tipo. */
function Bloco({ bloco, navegar, contexto }) {
  const marcas = <Marcas chaves={bloco.ref} contexto={contexto} />;
  const itens = (lista) =>
    lista.map((item, i) => (
      <li key={item}>
        {item}
        {i === lista.length - 1 && marcas}
      </li>
    ));

  switch (bloco.tipo) {
    case 'h2':
      return <h2>{bloco.texto}</h2>;
    case 'citacao':
      return <blockquote>{bloco.texto}</blockquote>;
    case 'codigo':
      return (
        <div className="prompt">
          <pre>{bloco.texto}</pre>
        </div>
      );
    case 'lista':
      return <ul>{itens(bloco.itens)}</ul>;
    case 'passos':
      return <ol>{itens(bloco.itens)}</ol>;
    case 'prompt': {
      const p = prompts[bloco.id];
      return p ? <CaixaPrompt titulo={p.titulo} texto={p.texto} /> : null;
    }
    case 'dica':
      return (
        <div className="artigo-bloco">
          <Aviso tipo="info" titulo={bloco.titulo}>
            <p>{bloco.texto}{marcas}</p>
          </Aviso>
        </div>
      );
    case 'figura':
      return (
        <div className="artigo-bloco">
          <FiguraFluxo />
        </div>
      );
    case 'tabela':
      return (
        <div className="artigo-bloco">
          <div className="tabela-wrap">
            <table>
              <thead>
                <tr>{bloco.cabecalho.map((c, i) => <th key={i}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {bloco.linhas.map((linha, i) => (
                  <tr key={i}>
                    {linha.map((celula, j) => (
                      <td key={j} className={j === 0 ? 'celula-rotulo' : undefined}>{celula}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bloco.legenda && <p className="legenda">{bloco.legenda}{marcas}</p>}
        </div>
      );
    case 'checklist':
      return (
        <div className="artigo-bloco">
          <Checklist id={bloco.id} itens={bloco.itens} />
        </div>
      );
    case 'chamada':
      return (
        <div className="chamada">
          <p>{bloco.texto}</p>
          <button
            type="button"
            className="btn btn-secundario btn-pequeno"
            onClick={() => navegar(bloco.destino.aba, bloco.destino.slug)}
          >
            {bloco.rotulo} <ArrowRight size={15} />
          </button>
        </div>
      );
    default:
      return <p>{bloco.texto}{marcas}</p>;
  }
}

/** Página de leitura de um artigo, com navegação para o anterior e o próximo. */
function Artigo({ post, navegar }) {
  const indice = posts.findIndex((p) => p.slug === post.slug);
  const anterior = posts[indice - 1];
  const proximo = posts[indice + 1];
  const ordem = ordenarFontes(post);
  const contexto = { slug: post.slug, mapa: Object.fromEntries(ordem.map((k, i) => [k, i + 1])) };

  return (
    <section className="secao">
      <div className="container">
        <article className="artigo">
          <div style={{ marginBottom: '1.4rem' }}>
            <a href="#/artigos" className="btn btn-fantasma" style={{ marginLeft: '-0.75rem' }}>
              <ArrowLeft size={16} /> Todos os artigos
            </a>
          </div>

          <span className="olho">
            Artigo {indice + 1} de {posts.length} · {post.categoria}
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{post.titulo}</h1>
          <p className="artigo-lide">{post.resumo}</p>

          {post.conteudo.map((bloco, i) => (
            <Bloco bloco={bloco} key={i} navegar={navegar} contexto={contexto} />
          ))}

          {ordem.length > 0 && (
            <section className="referencias" aria-labelledby={`titulo-ref-${post.slug}`}>
              <h2 id={`titulo-ref-${post.slug}`}>Referências</h2>
              <p className="referencias-nota">
                Obras conferidas em setembro de 2026. Os números entre colchetes no texto levam à
                obra correspondente.
              </p>
              <ol>
                {ordem.map((chave, i) => (
                  <Referencia key={chave} chave={chave} numero={i + 1} slug={post.slug} />
                ))}
              </ol>
            </section>
          )}

          <nav className="navegacao-artigos" aria-label="Outros artigos">
            {anterior ? (
              <a href={linkArtigo(anterior.slug)} className="cartao">
                <span><ArrowLeft size={14} /> Anterior</span>
                <strong>{anterior.titulo}</strong>
              </a>
            ) : <span />}
            {proximo ? (
              <a href={linkArtigo(proximo.slug)} className="cartao proximo">
                <span>Próximo <ArrowRight size={14} /></span>
                <strong>{proximo.titulo}</strong>
              </a>
            ) : (
              <a href="#/bases" className="cartao proximo">
                <span>Para praticar <ArrowRight size={14} /></span>
                <strong>Escolha uma base de dados e treine seu modelo</strong>
              </a>
            )}
          </nav>
        </article>
      </div>
    </section>
  );
}

/** Lista de artigos em ordem de leitura. */
function Indice({ navegar }) {
  return (
    <>
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Artigos</span>
            <h2>Leia na ordem ou vá direto ao que precisa</h2>
            <p>
              Os primeiros artigos explicam os conceitos, os do meio levam ao primeiro modelo
              treinado e os últimos ajudam a avaliar o resultado e chegar ao hardware.
            </p>
            <button
              type="button"
              className="btn btn-primario btn-pequeno"
              style={{ marginTop: '0.4rem' }}
              onClick={() => navegar('artigos', posts[0].slug)}
            >
              Começar pelo primeiro artigo <ArrowRight size={15} />
            </button>
          </Revelar>

          <div className="grade grade-3">
            {posts.map((p, i) => {
              const Icone = p.icone;
              return (
                <Revelar key={p.slug} atraso={(i % 3) * 80}>
                  <a href={linkArtigo(p.slug)} className="cartao cartao-artigo">
                    <div className="artigo-topo">
                      <span className="artigo-numero">{numero(i)}</span>
                      <span className="pill">{p.categoria}</span>
                      <Icone size={20} strokeWidth={1.5} style={{ marginLeft: 'auto', color: CORES[p.cor] }} />
                    </div>
                    <h3>{p.titulo}</h3>
                    <p>{p.resumo}</p>
                    <div className="artigo-rodape">
                      <span className="artigo-ler">
                        Ler artigo <ArrowRight size={14} />
                      </span>
                      <span className="artigo-fontes">
                        <Library size={13} /> {p.fontes?.length ?? 0} referências
                      </span>
                    </div>
                  </a>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      <section className="secao-compacta secao-alt">
        <div className="container">
          <div className="grade grade-2">
            <Revelar>
              <a href="#/bases" className="cartao cartao-atalho">
                <span className="cartao-icone"><Database size={20} strokeWidth={1.6} /></span>
                <h3>Bases de dados</h3>
                <p>
                  Oito bases sintéticas para baixar, com dicionário de colunas, e cinco bases
                  públicas com dados reais para ir além.
                </p>
              </a>
            </Revelar>
            <Revelar atraso={100}>
              <a href="#/dicas" className="cartao cartao-atalho">
                <span className="cartao-icone"><Lightbulb size={20} strokeWidth={1.6} /></span>
                <h3>Dicas e vídeos</h3>
                <p>
                  O que ter em mãos antes de começar, vídeos de apoio, dicas rápidas e todos os
                  prompts reunidos para copiar.
                </p>
              </a>
            </Revelar>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Artigos({ navegar, slug }) {
  const post = slug ? acharPost(slug) : null;
  return post ? <Artigo post={post} navegar={navegar} /> : <Indice navegar={navegar} />;
}
