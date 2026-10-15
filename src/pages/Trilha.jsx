import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, FileText, Flag, Paperclip, Plus, RotateCcw, Undo2,
} from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import Aviso from '../components/Aviso.jsx';
import VideoQuadro from '../components/VideoQuadro.jsx';
import MedidorTrilha from '../components/MedidorTrilha.jsx';
import {
  modulos, obrigatorios, extras, acharModulo, numeroModulo, rotuloModulo, porExtenso,
} from '../data/modulos.js';
import { useProgresso, situacao, ROTULO_SITUACAO } from '../lib/progresso.js';
import { cx } from '../lib/uteis.js';

const linkModulo = (slug) => `#/trilha/${slug}`;
const TOTAL = String(obrigatorios.length).padStart(2, '0');
const QUANTOS = porExtenso(obrigatorios.length);

/** Texto do convite em cada cartão, conforme a situação do módulo. */
const CONVITE = {
  concluido: 'Rever o módulo',
  proximo: 'Começar agora',
  pendente: 'Abrir o módulo',
  extra: 'Abrir o módulo extra',
};

/** Conteúdo do ponto na trilha: check, número ou sinal de extra. */
function Marcador({ modulo, estado, tamanho }) {
  if (estado === 'concluido') return <Check size={tamanho} strokeWidth={2.4} />;
  if (modulo.extra) return <Plus size={tamanho} strokeWidth={2.2} />;
  return numeroModulo(modulo);
}

/* Trilha completa ---------------------------------------------------------- */

/** Um módulo na trilha: o ponto no caminho e o cartão que leva à página. */
function PontoTrilha({ modulo, progresso }) {
  const estado = situacao(modulo.slug, progresso);
  return (
    <Revelar
      como="li"
      className={cx('jornada-item', `estado-${estado}`, progresso.feito(modulo.slug) && 'trecho-feito')}
    >
      <span className="jornada-no" aria-hidden="true">
        <Marcador modulo={modulo} estado={estado} tamanho={20} />
      </span>
      <a href={linkModulo(modulo.slug)} className="cartao jornada-cartao">
        <span className="jornada-rotulo">
          <span>{rotuloModulo(modulo)}</span>
          <span className="jornada-estado">{ROTULO_SITUACAO[estado]}</span>
        </span>
        <h3>{modulo.titulo}</h3>
        <p>{modulo.resumo}</p>
        <span className="artigo-ler">
          {CONVITE[estado]} <ArrowRight size={14} />
        </span>
      </a>
    </Revelar>
  );
}

function Roteiro({ navegar }) {
  const progresso = useProgresso();
  const { concluidos, feitos, proximo, total, zerar } = progresso;
  const moduloProximo = acharModulo(proximo);
  const terminou = feitos === total;

  const pedirZerar = () => {
    if (window.confirm('Apagar o progresso salvo neste navegador e recomeçar a trilha?')) zerar();
  };

  return (
    <section className="secao">
      <div className="container">
        <div className="trilha-topo">
          <Revelar className="cabecalho-secao">
            <span className="olho">Trilha do workshop</span>
            <h2>{QUANTOS[0].toUpperCase() + QUANTOS.slice(1)} módulos, um caminho</h2>
            <p>
              Percorra os módulos na ordem, do primeiro contato com as ferramentas até a leitura
              crítica do seu próprio projeto. Ao terminar cada um, marque como concluído para
              acompanhar seu avanço. Depois do fim da trilha, há um módulo extra, opcional, para
              quem quiser se aprofundar.
            </p>
          </Revelar>

          <Revelar className="painel-progresso" atraso={100}>
            <MedidorTrilha progresso={progresso} />
            {terminou ? (
              <p className="painel-progresso-fim">
                <CheckCircle2 size={18} /> Trilha concluída. Parabéns pelo percurso.
              </p>
            ) : (
              <button
                type="button"
                className="btn btn-primario btn-bloco"
                onClick={() => navegar('trilha', proximo)}
              >
                {feitos ? 'Continuar' : 'Começar'} no módulo {numeroModulo(moduloProximo)}
                <ArrowRight size={17} />
              </button>
            )}
            <p className="painel-progresso-nota">
              O progresso fica salvo só neste navegador, sem cadastro.
              {concluidos.length > 0 && (
                <>
                  {' '}
                  <button type="button" className="link-discreto" onClick={pedirZerar}>
                    <RotateCcw size={13} /> Recomeçar
                  </button>
                </>
              )}
            </p>
          </Revelar>
        </div>

        <ol className="jornada" aria-label="Módulos da trilha">
          {obrigatorios.map((m) => (
            <PontoTrilha key={m.slug} modulo={m} progresso={progresso} />
          ))}

          <Revelar
            como="li"
            className={cx('jornada-item', 'jornada-fim', terminou && 'estado-concluido', extras.length && 'com-extra')}
          >
            <span className="jornada-no" aria-hidden="true"><Flag size={18} /></span>
            <div className="jornada-fim-texto">
              <strong>{terminou ? 'Trilha concluída' : 'Fim da trilha'}</strong>
              <span>
                {terminou
                  ? `Você percorreu os ${QUANTOS} módulos. Continue praticando com as bases de dados.`
                  : `Ao concluir os ${QUANTOS} módulos, você terá feito e avaliado seu próprio projeto de IA.`}
              </span>
            </div>
          </Revelar>

          {extras.map((m) => (
            <PontoTrilha key={m.slug} modulo={m} progresso={progresso} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Página de um módulo ------------------------------------------------------- */

/** Mini trilha no topo da página do módulo, para saber onde se está. */
function PassosModulo({ atual, progresso }) {
  return (
    <nav aria-label="Módulos da trilha">
      <ol className="modulo-passos">
        {modulos.map((m, i) => {
          const estado = situacao(m.slug, progresso);
          return (
            <li key={m.slug} className={cx(estado === 'concluido' && 'trecho-feito')}>
              <a
                href={linkModulo(m.slug)}
                className={cx('passo-mini', `estado-${estado}`, i === atual && 'atual')}
                aria-current={i === atual ? 'page' : undefined}
                aria-label={`${rotuloModulo(m)}: ${m.titulo} (${ROTULO_SITUACAO[estado]})`}
                title={m.titulo}
              >
                {estado === 'concluido' || m.extra ? <Marcador modulo={m} estado={estado} tamanho={14} /> : i + 1}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Texto com marcações simples: **negrito** e [link](https://endereço).
 * Links para fora da plataforma abrem em nova aba.
 */
function TextoMarcado({ texto }) {
  const partes = [];
  const padrao = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let ultimo = 0;
  for (const m of texto.matchAll(padrao)) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    if (m[1] !== undefined) {
      partes.push(<strong key={m.index}>{m[1]}</strong>);
    } else {
      const externo = /^https?:/.test(m[3]);
      partes.push(
        <a
          key={m.index}
          href={m[3]}
          target={externo ? '_blank' : undefined}
          rel={externo ? 'noopener noreferrer' : undefined}
        >
          {m[2]}
        </a>,
      );
    }
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

const ICONE_MATERIAL = { interno: ArrowRight, externo: ArrowUpRight, arquivo: FileText };

function Material({ item }) {
  const Icone = ICONE_MATERIAL[item.tipo] ?? ArrowRight;
  const externo = /^https?:/.test(item.url);
  return (
    <li>
      <a
        className="material"
        href={item.url}
        target={externo ? '_blank' : undefined}
        rel={externo ? 'noopener noreferrer' : undefined}
        download={item.tipo === 'arquivo' && !externo ? '' : undefined}
      >
        <span className="material-icone"><Icone size={17} /></span>
        <span>
          <strong>{item.titulo}</strong>
          {item.descricao && <span>{item.descricao}</span>}
        </span>
      </a>
    </li>
  );
}

function PaginaModulo({ modulo, indice, navegar }) {
  const progresso = useProgresso();
  const concluido = progresso.feito(modulo.slug);
  const anterior = modulos[indice - 1];
  const seguinte = modulos[indice + 1];
  const rotulo = rotuloModulo(modulo);
  const fimDaTrilha = !modulo.extra && (!seguinte || seguinte.extra);

  return (
    <section className="secao">
      <div className="container">
        <article className="artigo modulo">
          <a href="#/trilha" className="voltar-trilha">
            <ArrowLeft size={15} /> Trilha do workshop
          </a>

          <PassosModulo atual={indice} progresso={progresso} />

          <span className="olho">
            {modulo.extra ? 'Módulo extra, opcional' : `Módulo ${numeroModulo(modulo)} de ${TOTAL}`}
          </span>
          <h1>{modulo.titulo}</h1>
          <p className="artigo-lide"><TextoMarcado texto={modulo.lide} /></p>

          {modulo.rascunho && (
            <Aviso tipo="atencao" titulo="Conteúdo em preparação">
              <p>
                O texto abaixo é um roteiro provisório. Os vídeos e materiais completos deste
                módulo serão publicados em breve.
              </p>
              {import.meta.env.DEV && (
                <p style={{ fontSize: '0.85rem' }}>
                  Edite o módulo <code>{modulo.slug}</code> em <code>src/data/modulos.js</code> e
                  troque <code>rascunho</code> para <code>false</code>.
                </p>
              )}
            </Aviso>
          )}

          {modulo.secoes.map((secao, i) => (
            <div key={secao.titulo ?? i}>
              {secao.titulo && <h2>{secao.titulo}</h2>}
              {(secao.paragrafos ?? []).map((p) => <p key={p}><TextoMarcado texto={p} /></p>)}
              {secao.lista && (
                <ul>
                  {secao.lista.map((item) => <li key={item}><TextoMarcado texto={item} /></li>)}
                </ul>
              )}
            </div>
          ))}

          {modulo.videos.length > 0 && (
            <>
              <h2>Vídeos</h2>
              <div className="grade modulo-videos">
                {modulo.videos.map((v) => (
                  <VideoQuadro
                    key={v.id}
                    video={{ descricao: '', ...v, tema: rotulo }}
                    arquivo="src/data/modulos.js"
                  />
                ))}
              </div>
            </>
          )}

          <h2>Materiais</h2>
          {modulo.materiais.length > 0 ? (
            <ul className="materiais">
              {modulo.materiais.map((item) => <Material key={item.titulo} item={item} />)}
            </ul>
          ) : (
            <div className="materiais-vazio">
              <Paperclip size={20} />
              <span>Os anexos e links deste módulo entram aqui.</span>
            </div>
          )}

          <div className={cx('modulo-conclusao', concluido && 'feito')} aria-live="polite">
            {concluido ? (
              <>
                <div className="modulo-conclusao-texto">
                  <strong><CheckCircle2 size={19} /> Módulo concluído</strong>
                  <p>
                    {modulo.extra && 'Você foi além da trilha. Parabéns pela dedicação.'}
                    {!modulo.extra && !fimDaTrilha && `Seu próximo passo é o ${rotuloModulo(seguinte).toLowerCase()}: ${seguinte.titulo}.`}
                    {fimDaTrilha && 'Você chegou ao fim da trilha. Parabéns pelo percurso.'}
                    {fimDaTrilha && seguinte && ' Se quiser ir além, há um módulo extra, opcional.'}
                  </p>
                </div>
                <div className="modulo-conclusao-acoes">
                  <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => (seguinte ? navegar('trilha', seguinte.slug) : navegar('trilha'))}
                  >
                    {seguinte ? `Ir para o ${rotuloModulo(seguinte).toLowerCase()}` : 'Ver a trilha completa'}
                    <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-fantasma"
                    onClick={() => progresso.marcar(modulo.slug, false)}
                  >
                    <Undo2 size={15} /> Desmarcar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modulo-conclusao-texto">
                  <strong>Terminou este módulo?</strong>
                  <p>Marque como concluído para registrar seu avanço na trilha.</p>
                </div>
                <div className="modulo-conclusao-acoes">
                  <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => progresso.marcar(modulo.slug, true)}
                  >
                    <CheckCircle2 size={17} /> Marcar como concluído
                  </button>
                </div>
              </>
            )}
          </div>

          <nav className="navegacao-artigos" aria-label="Outros módulos">
            {anterior ? (
              <a href={linkModulo(anterior.slug)} className="cartao">
                <span><ArrowLeft size={14} /> {rotuloModulo(anterior)}</span>
                <strong>{anterior.titulo}</strong>
              </a>
            ) : (
              <a href="#/trilha" className="cartao">
                <span><ArrowLeft size={14} /> Voltar</span>
                <strong>Trilha do workshop</strong>
              </a>
            )}
            {seguinte ? (
              <a href={linkModulo(seguinte.slug)} className="cartao proximo">
                <span>{rotuloModulo(seguinte)} <ArrowRight size={14} /></span>
                <strong>{seguinte.titulo}</strong>
              </a>
            ) : (
              <a href="#/trilha" className="cartao proximo">
                <span>Fim da trilha <ArrowRight size={14} /></span>
                <strong>Ver o seu progresso</strong>
              </a>
            )}
          </nav>
        </article>
      </div>
    </section>
  );
}

/**
 * Aba Trilha. Sem parâmetro, mostra o caminho completo; com o slug de um
 * módulo, como #/trilha/leitura-critica, abre a página daquele módulo.
 * Um slug desconhecido cai de volta na trilha completa.
 */
export default function Trilha({ navegar, slug }) {
  const modulo = acharModulo(slug);
  if (!modulo) return <Roteiro navegar={navegar} />;
  const indice = modulos.indexOf(modulo);
  return <PaginaModulo modulo={modulo} indice={indice} navegar={navegar} />;
}
