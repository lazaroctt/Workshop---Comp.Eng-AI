import { useMemo, useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, Tag } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import { posts, acharPost, categoriasPost } from '../data/posts.js';

/**
 * Cor do ícone de cada artigo. Serve só para diferenciar as categorias,
 * sempre em tom fechado, sem preenchimento chapado nem degradê.
 */
const CORES = {
  ciano: 'var(--azul-700)',
  ambar: 'var(--ambar-500)',
  verde: 'var(--verde-500)',
  roxo: 'var(--roxo-500)',
};

/** Renderiza um bloco de conteúdo do artigo. */
function Bloco({ bloco }) {
  if (bloco.tipo === 'h2') return <h2>{bloco.texto}</h2>;
  if (bloco.tipo === 'citacao') return <blockquote>{bloco.texto}</blockquote>;
  if (bloco.tipo === 'codigo') {
    return (
      <div className="prompt">
        <pre>{bloco.texto}</pre>
      </div>
    );
  }
  if (bloco.tipo === 'lista') {
    return (
      <ul>
        {bloco.itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{bloco.texto}</p>;
}

/** Página de leitura de um artigo. */
function Artigo({ post, navegar }) {
  const indice = posts.findIndex((p) => p.slug === post.slug);
  const proximo = posts[(indice + 1) % posts.length];
  const Icone = post.icone;

  return (
    <section className="secao">
      <div className="container">
        <button
          type="button"
          className="btn btn-fantasma"
          onClick={() => navegar('blog')}
          style={{ marginBottom: '1.4rem' }}
        >
          <ArrowLeft size={16} /> Voltar para o blog
        </button>

        <article className="artigo">
          <div className="post-capa" style={{ height: 120, color: CORES[post.cor] }}>
            <Icone size={38} strokeWidth={1.4} />
          </div>

          <span className="pill" style={{ marginBottom: '0.9rem' }}>
            <Tag size={12} /> {post.categoria}
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>{post.titulo}</h1>

          <div className="meta-post">
            <span><Calendar size={14} /> {post.data}</span>
            <span><Clock size={14} /> Leitura de {post.leitura}</span>
            <span><BookOpen size={14} /> LACOP · UFF</span>
          </div>

          <p style={{ fontSize: '1.12rem', color: 'var(--texto)', fontWeight: 500 }}>{post.resumo}</p>

          {post.conteudo.map((bloco, i) => (
            <Bloco bloco={bloco} key={i} />
          ))}

          <div
            className="cartao"
            style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-fraco)' }}>Próximo artigo</span>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{proximo.titulo}</h3>
            </div>
            <button type="button" className="btn btn-primario btn-pequeno" onClick={() => navegar('blog', proximo.slug)}>
              Ler agora <ArrowRight size={15} />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

/** Lista de artigos com filtro por categoria. */
export default function Blog({ navegar, slug }) {
  const [categoria, setCategoria] = useState('Todos');
  const post = slug ? acharPost(slug) : null;

  const lista = useMemo(
    () => (categoria === 'Todos' ? posts : posts.filter((p) => p.categoria === categoria)),
    [categoria],
  );

  if (post) return <Artigo post={post} navegar={navegar} />;

  return (
    <section className="secao">
      <div className="container">
        <Revelar className="cabecalho-secao">
          <span className="olho">Blog do workshop</span>
          <h2>Textos curtos para ler antes, durante ou depois</h2>
          <p>
            Cada artigo cabe em poucos minutos e responde uma dúvida que costuma aparecer no
            encontro. Servem tanto de preparação quanto de consulta rápida no meio da prática.
          </p>
        </Revelar>

        <Revelar>
          <div className="filtros">
            {categoriasPost.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${categoria === cat ? 'ativo' : ''}`}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Revelar>

        <div className="grade grade-3">
          {lista.map((p, i) => {
            const Icone = p.icone;
            return (
              <Revelar key={p.slug} atraso={(i % 3) * 90}>
                <article
                  className="cartao"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => navegar('blog', p.slug)}
                >
                  <div className="post-capa" style={{ color: CORES[p.cor] }}>
                    <Icone size={30} strokeWidth={1.4} />
                  </div>
                  <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '0.7rem' }}>
                    {p.categoria}
                  </span>
                  <h3 style={{ fontSize: '1.12rem' }}>{p.titulo}</h3>
                  <p style={{ fontSize: '0.94rem' }}>{p.resumo}</p>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.8rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem',
                      color: 'var(--texto-fraco)',
                    }}
                  >
                    <span><Clock size={13} style={{ verticalAlign: '-2px' }} /> {p.leitura}</span>
                    <span style={{ color: 'var(--azul-700)', fontWeight: 600 }}>
                      Ler <ArrowRight size={14} style={{ verticalAlign: '-2px' }} />
                    </span>
                  </div>
                </article>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}
