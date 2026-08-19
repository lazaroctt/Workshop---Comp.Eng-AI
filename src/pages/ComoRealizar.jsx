import { useEffect, useState } from 'react';
import {
  ListChecks, ChevronRight, Clock, Target, CheckCircle2, Circle, Rocket,
  Backpack, Sparkles, ArrowRight, Lightbulb, Database,
} from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import CaixaPrompt from '../components/CaixaPrompt.jsx';
import Aviso from '../components/Aviso.jsx';
import { preparacao, etapas, extensoes, entregaveis } from '../data/roteiro.js';

const CHAVE_ARMAZENAMENTO = 'checklist-workshop';

export default function ComoRealizar({ navegar }) {
  // Começa com a primeira etapa aberta, que é o comportamento mais útil.
  const [abertas, setAbertas] = useState(() => new Set([etapas[0].id]));
  const [concluidos, setConcluidos] = useState([]);

  // O progresso do checklist sobrevive ao recarregar a página.
  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO) ?? '[]');
      if (Array.isArray(salvo)) setConcluidos(salvo);
    } catch {
      setConcluidos([]);
    }
  }, []);

  const alternarItem = (item) => {
    setConcluidos((atuais) => {
      const novos = atuais.includes(item) ? atuais.filter((i) => i !== item) : [...atuais, item];
      localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(novos));
      return novos;
    });
  };

  const alternarEtapa = (id) => {
    setAbertas((atuais) => {
      const novas = new Set(atuais);
      if (novas.has(id)) novas.delete(id);
      else novas.add(id);
      return novas;
    });
  };

  const todasAbertas = abertas.size === etapas.length;
  const alternarTodas = () =>
    setAbertas(todasAbertas ? new Set() : new Set(etapas.map((e) => e.id)));

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho"><ListChecks size={14} /> Como realizar o projeto</span>
            <h2>Do arquivo CSV ao modelo apresentado, em oito etapas</h2>
            <p>
              O case foi desenhado para caber em um encontro. Cada etapa tem objetivo próprio,
              tarefas curtas e prompts prontos para colar no agente de IA. Se o grupo precisar de
              mais fôlego, a divisão natural acontece entre a quinta e a sexta etapa.
            </p>
          </Revelar>

          <Revelar>
            <Aviso tipo="ok" titulo="O que este projeto quer provar">
              <p style={{ marginBottom: 0 }}>
                Que dá para substituir um valor de corte escolhido no olho por um modelo treinado
                com exemplos, em um dia, sem instalar nada e sem escrever código do zero. No fim
                você terá dois números lado a lado para sustentar essa afirmação.
              </p>
            </Aviso>
          </Revelar>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao-compacta secao-alt">
        <div className="container">
          <Revelar className="cabecalho-secao" style={{ marginBottom: '1.6rem' }}>
            <span className="olho"><Backpack size={14} /> Antes de começar</span>
            <h2>O que ter em mãos</h2>
          </Revelar>

          <div className="grade grade-4">
            {preparacao.map((item, i) => (
              <Revelar key={item.titulo} atraso={i * 80}>
                <article className="cartao" style={{ height: '100%' }}>
                  <h3 style={{ fontSize: '1.02rem' }}>{item.titulo}</h3>
                  <p style={{ marginBottom: 0, fontSize: '0.93rem' }}>{item.detalhe}</p>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.8rem',
            }}
          >
            <div>
              <span className="olho"><Target size={14} /> Roteiro</span>
              <h2 style={{ marginBottom: 0 }}>As oito etapas do case</h2>
            </div>
            <button type="button" className="btn btn-secundario btn-pequeno" onClick={alternarTodas}>
              {todasAbertas ? 'Recolher todas' : 'Expandir todas'}
            </button>
          </div>

          <div className="trilha">
            {etapas.map((etapa) => {
              const aberta = abertas.has(etapa.id);
              const Icone = etapa.icone;

              return (
                <Revelar key={etapa.id} className="passo">
                  <span className="passo-numero">{etapa.numero}</span>
                  <div className="cartao" style={{ padding: 0 }}>
                    <button
                      type="button"
                      className="passo-cabecalho"
                      onClick={() => alternarEtapa(etapa.id)}
                      aria-expanded={aberta}
                    >
                      <ChevronRight size={18} className={`chevron ${aberta ? 'aberto' : ''}`} />
                      <span className="cartao-icone" style={{ width: 40, height: 40, marginBottom: 0, borderRadius: 12 }}>
                        <Icone size={19} />
                      </span>
                      <span style={{ flex: 1 }}>
                        <h3>{etapa.titulo}</h3>
                        <span className="duracao">
                          <Clock size={12} style={{ verticalAlign: '-1px', marginRight: '0.3rem' }} />
                          {etapa.duracao}
                        </span>
                      </span>
                    </button>

                    {aberta && (
                      <div className="passo-corpo">
                        <p style={{ fontWeight: 500, color: 'var(--texto)' }}>{etapa.objetivo}</p>

                        <h4 style={{ marginTop: '1.2rem' }}>Tarefas</h4>
                        <ol>
                          {etapa.tarefas.map((tarefa) => (
                            <li key={tarefa}>{tarefa}</li>
                          ))}
                        </ol>

                        {etapa.prompts.length > 0 && (
                          <>
                            <h4 style={{ marginTop: '1.4rem' }}>
                              <Sparkles size={16} style={{ verticalAlign: '-3px', marginRight: '0.4rem', color: 'var(--destaque)' }} />
                              Prompts para copiar
                            </h4>
                            <p style={{ fontSize: '0.9rem' }}>
                              Substitua o que está entre colchetes pelas informações da sua base
                              antes de enviar ao agente.
                            </p>
                            {etapa.prompts.map((prompt) => (
                              <CaixaPrompt key={prompt.titulo} titulo={prompt.titulo} texto={prompt.texto} />
                            ))}
                          </>
                        )}

                        <div style={{ marginTop: '1.2rem' }}>
                          <Aviso tipo="info" titulo="Dica de quem já conduziu">
                            <p style={{ marginBottom: 0 }}>{etapa.dica}</p>
                          </Aviso>
                        </div>
                      </div>
                    )}
                  </div>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao secao-alt">
        <div className="container">
          <div className="grade grade-2" style={{ gap: '2.4rem', alignItems: 'start' }}>
            <Revelar>
              <span className="olho"><CheckCircle2 size={14} /> Entrega</span>
              <h2>Checklist final</h2>
              <p>
                Marque conforme avançar. O estado fica salvo neste navegador, então dá para fechar
                a página e voltar depois.
              </p>

              <div className="grade" style={{ gap: '0.6rem', marginTop: '1.2rem' }}>
                {entregaveis.map((item) => {
                  const feito = concluidos.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => alternarItem(item)}
                      className="cartao"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '0.9rem 1.1rem',
                        borderColor: feito ? 'var(--verde-500)' : undefined,
                      }}
                    >
                      {feito ? (
                        <CheckCircle2 size={20} style={{ color: 'var(--verde-500)', flexShrink: 0 }} />
                      ) : (
                        <Circle size={20} style={{ color: 'var(--texto-fraco)', flexShrink: 0 }} />
                      )}
                      <span
                        style={{
                          color: feito ? 'var(--texto-fraco)' : 'var(--texto)',
                          textDecoration: feito ? 'line-through' : 'none',
                          fontSize: '0.95rem',
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p style={{ marginTop: '1rem', fontSize: '0.88rem' }}>
                {concluidos.length} de {entregaveis.length} itens concluídos.
              </p>
            </Revelar>

            <Revelar atraso={120}>
              <span className="olho"><Rocket size={14} /> Para ir além</span>
              <h2>Se sobrar tempo ou houver segundo dia</h2>
              <div className="grade" style={{ gap: '0.9rem', marginTop: '1.2rem' }}>
                {extensoes.map((ext) => (
                  <article className="cartao" key={ext.titulo}>
                    <h3 style={{ fontSize: '1.02rem' }}>
                      <Lightbulb size={17} style={{ verticalAlign: '-3px', marginRight: '0.5rem', color: 'var(--ambar-500)' }} />
                      {ext.titulo}
                    </h3>
                    <p style={{ marginBottom: 0, fontSize: '0.93rem' }}>{ext.detalhe}</p>
                  </article>
                ))}
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao-compacta">
        <div className="container">
          <Revelar>
            <div className="grade grade-2" style={{ gap: '1.2rem' }}>
              <button
                type="button"
                className="cartao"
                onClick={() => navegar('dados')}
                style={{ textAlign: 'left', cursor: 'pointer' }}
              >
                <span className="cartao-icone"><Database size={22} /></span>
                <h3>Ainda não escolheu a base?</h3>
                <p style={{ marginBottom: 0 }}>
                  Volte para as fontes de dados, leia os cenários e baixe o CSV que combina com a
                  pergunta do seu grupo. <ArrowRight size={15} style={{ verticalAlign: '-2px' }} />
                </p>
              </button>

              <button
                type="button"
                className="cartao"
                onClick={() => navegar('blog')}
                style={{ textAlign: 'left', cursor: 'pointer' }}
              >
                <span className="cartao-icone"><Lightbulb size={22} /></span>
                <h3>Quer entender melhor antes?</h3>
                <p style={{ marginBottom: 0 }}>
                  Os artigos do blog explicam métricas, escolha do tipo de problema e as armadilhas
                  mais comuns com dados de sensores. <ArrowRight size={15} style={{ verticalAlign: '-2px' }} />
                </p>
              </button>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
