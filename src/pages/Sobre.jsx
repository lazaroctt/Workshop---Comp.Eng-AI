import {
  Sparkles, ArrowRight, Download, Target, Users, Clock, Layers, Brain, Wrench,
  GraduationCap, CircuitBoard, Bot, LineChart, ShieldCheck, Rocket, BookOpen,
} from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import PainelSensores from '../components/PainelSensores.jsx';
import Acordeao from '../components/Acordeao.jsx';
import Aviso from '../components/Aviso.jsx';
import { datasets } from '../data/datasets.js';
import { etapas } from '../data/roteiro.js';
import { posts } from '../data/posts.js';

/* Números apurados direto do conteúdo, para não desatualizarem. */
const totalLinhas = datasets.reduce((soma, d) => soma + d.linhas, 0);
const totalPrompts = etapas.reduce((soma, e) => soma + e.prompts.length, 0);

const PILARES = [
  {
    icone: CircuitBoard,
    titulo: 'Sai do limiar fixo',
    texto:
      'Quem trabalha com eletrônica resolve quase tudo com condicional e valor de corte. Aqui a decisão passa a vir de exemplos, e o modelo encontra a fronteira sozinho.',
  },
  {
    icone: Bot,
    titulo: 'Agente de IA como par',
    texto:
      'Claude e ChatGPT nas versões gratuitas escrevem o código de treino, explicam cada etapa e ajudam a corrigir erros. Programar deixa de ser barreira de entrada.',
  },
  {
    icone: LineChart,
    titulo: 'Resultado medido',
    texto:
      'Toda conclusão vem acompanhada de número. Métrica em dados de teste, comparação com a regra manual e uma leitura honesta do que o modelo entrega.',
  },
  {
    icone: Rocket,
    titulo: 'Caminho para o hardware',
    texto:
      'O que foi treinado no navegador tem endereço final claro: uma árvore rasa vira comparações em C e roda dentro do ESP32 sem depender de nuvem.',
  },
];

const OBJETIVOS = [
  'Reconhecer quando um problema de sensor pede aprendizado de máquina e quando a regra simples basta',
  'Diferenciar classificação de regressão a partir da pergunta do projeto',
  'Preparar uma base de sensores e treinar um modelo do scikit-learn em poucos minutos',
  'Conduzir um agente de IA com prompts que produzem código executável',
  'Ler métricas e matriz de confusão com olhar de engenharia',
  'Justificar com números a escolha entre modelo treinado e limiar programado na mão',
];

const AGENDA_DIA1 = [
  { hora: '09:00', titulo: 'Abertura e panorama', detalhe: 'Por que a eletrônica chegou ao aprendizado de máquina, com exemplos do laboratório.' },
  { hora: '09:40', titulo: 'Anatomia de uma base de sensores', detalhe: 'Escolha do conjunto, leitura do dicionário de dados e primeira olhada nos gráficos.' },
  { hora: '10:30', titulo: 'Primeiro modelo com apoio do agente', detalhe: 'Do prompt inicial ao código rodando no Colab, com as métricas na tela.' },
  { hora: '13:30', titulo: 'Erros, correções e interpretação', detalhe: 'Traceback, vazamento de informação e leitura da matriz de confusão.' },
  { hora: '15:00', titulo: 'Modelo contra limiar manual', detalhe: 'Comparação numérica entre as duas abordagens na mesma divisão de teste.' },
  { hora: '16:20', titulo: 'Apresentações e fechamento', detalhe: 'Cinco minutos por grupo, com discussão sobre próximos passos.' },
];

const AGENDA_DIA2 = [
  { hora: '09:00', titulo: 'Retomada dos resultados', detalhe: 'Revisão do que cada grupo alcançou e ajuste de rumo.' },
  { hora: '09:45', titulo: 'Coleta com hardware real', detalhe: 'Montagem do circuito com ESP32 e captura de leituras pelo monitor serial.' },
  { hora: '11:00', titulo: 'Treino com dados próprios', detalhe: 'Mesmo fluxo do dia anterior, agora sobre os dados que a turma gerou.' },
  { hora: '14:00', titulo: 'Embarcando o modelo', detalhe: 'Exportação da árvore para C e verificação de coerência com o notebook.' },
  { hora: '15:30', titulo: 'Demonstração na bancada', detalhe: 'Cada grupo mostra o sistema completo funcionando, do sensor ao alerta.' },
];

const PERGUNTAS = [
  {
    pergunta: 'Preciso saber programar em Python?',
    resposta:
      'Não. Ajuda ter familiaridade com lógica de programação, o que a maioria já traz da eletrônica. O código é gerado com apoio do agente de IA e todas as etapas são comentadas em português.',
  },
  {
    pergunta: 'Preciso instalar alguma coisa no computador?',
    resposta:
      'Nada. Tudo acontece no navegador, pelo Google Colab, que já vem com pandas, scikit-learn e matplotlib prontos para uso. Basta uma conta Google e conexão estável.',
  },
  {
    pergunta: 'A versão gratuita do Claude ou do ChatGPT dá conta?',
    resposta:
      'Dá. Os prompts do roteiro foram escritos e testados pensando nos limites do plano sem custo. Se o limite de mensagens acabar, a dupla pode alternar entre contas.',
  },
  {
    pergunta: 'Por que não coletar dados com sensores durante o workshop?',
    resposta:
      'Porque coleta consome quase todo o tempo disponível e concentra a atenção na montagem do circuito. As bases sintéticas já vêm com cenário definido e rótulos, o que deixa o dia inteiro livre para a parte de modelagem. Quem tiver interesse leva o kit para casa e repete o fluxo com dados próprios.',
  },
  {
    pergunta: 'Os dados são reais?',
    resposta:
      'São sintéticos, gerados por um script que reproduz padrões físicos conhecidos: ciclo diário de temperatura, degradação de rolamento, curva de carga elétrica e assim por diante. O script fica no repositório, em scripts/gerar-datasets.mjs, e pode ser lido e modificado.',
  },
  {
    pergunta: 'Qual é o tamanho ideal da turma?',
    resposta:
      'Entre 15 e 30 pessoas, organizadas em duplas ou trios. Acima disso vale ter um monitor extra para atender as dúvidas de execução sem travar o ritmo.',
  },
];

export default function Sobre({ navegar }) {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <section className="hero">
        <div className="container hero-grade">
          <div>
            <span className="olho">
              <Sparkles size={14} /> LACOP · Universidade Federal Fluminense
            </span>
            <h1>
              Dados de sensores viram <span>previsão</span> quando a IA entra no projeto
            </h1>
            <p className="hero-sub">
              Um workshop prático para quem monta circuitos e quer ir além do valor de corte
              escrito na mão. Você escolhe uma base pronta, conduz um agente de IA para gerar o
              modelo e sai com um resultado medido, não com uma impressão.
            </p>

            <div className="hero-acoes">
              <button type="button" className="btn btn-primario" onClick={() => navegar('projeto')}>
                Começar o passo a passo <ArrowRight size={17} />
              </button>
              <button type="button" className="btn btn-secundario" onClick={() => navegar('dados')}>
                <Download size={17} /> Baixar as bases
              </button>
            </div>

            <div className="hero-numeros">
              <div>
                <strong>{datasets.length}</strong>
                <span>bases prontas em CSV</span>
              </div>
              <div>
                <strong>{totalLinhas.toLocaleString('pt-BR')}</strong>
                <span>linhas de leitura</span>
              </div>
              <div>
                <strong>{etapas.length}</strong>
                <span>etapas no roteiro</span>
              </div>
              <div>
                <strong>{totalPrompts}</strong>
                <span>prompts para copiar</span>
              </div>
            </div>
          </div>

          <PainelSensores />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao centro">
            <span className="olho"><Target size={14} /> A proposta</span>
            <h2>Aprendizado de máquina aplicado ao que já está na bancada</h2>
            <p>
              A ideia central é simples: sinal de sensor é dado, e dado bem usado antecipa
              comportamento. O encontro mostra como fazer essa passagem sem virar cientista de
              dados no processo.
            </p>
          </Revelar>

          <div className="grade grade-4">
            {PILARES.map((pilar, i) => {
              const Icone = pilar.icone;
              return (
                <Revelar key={pilar.titulo} atraso={i * 90}>
                  <article className="cartao" style={{ height: '100%' }}>
                    <span className="cartao-icone"><Icone size={24} /></span>
                    <h3>{pilar.titulo}</h3>
                    <p style={{ marginBottom: 0 }}>{pilar.texto}</p>
                  </article>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao secao-alt">
        <div className="container">
          <div className="grade grade-2" style={{ gap: '2.6rem', alignItems: 'start' }}>
            <Revelar>
              <span className="olho"><Brain size={14} /> Objetivos</span>
              <h2>O que você leva no fim do dia</h2>
              <p>
                Nenhum objetivo aqui depende de matemática avançada. A meta é destravar o uso de
                bibliotecas de aprendizado e criar o hábito de medir antes de concluir.
              </p>
              <ul className="lista-marcada" style={{ marginTop: '1.4rem' }}>
                {OBJETIVOS.map((objetivo) => (
                  <li key={objetivo}>
                    <ShieldCheck size={17} />
                    <span>{objetivo}</span>
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar atraso={120}>
              <span className="olho"><Users size={14} /> Público</span>
              <h2>Para quem foi pensado</h2>
              <div className="grade" style={{ gap: '0.9rem' }}>
                <article className="cartao">
                  <h3 style={{ fontSize: '1.05rem' }}>
                    <GraduationCap size={18} style={{ verticalAlign: '-3px', marginRight: '0.5rem', color: 'var(--destaque)' }} />
                    Estudantes de engenharia
                  </h3>
                  <p style={{ marginBottom: 0 }}>
                    Elétrica, eletrônica, computação, telecomunicações e controle. Serve tanto para
                    quem está no meio do curso quanto para quem já faz iniciação científica.
                  </p>
                </article>
                <article className="cartao">
                  <h3 style={{ fontSize: '1.05rem' }}>
                    <Wrench size={18} style={{ verticalAlign: '-3px', marginRight: '0.5rem', color: 'var(--destaque)' }} />
                    Quem já mexe com microcontrolador
                  </h3>
                  <p style={{ marginBottom: 0 }}>
                    Se você já leu um sensor com Arduino ou ESP32 e programou uma decisão na mão,
                    o conteúdo encaixa direto na sua experiência.
                  </p>
                </article>
                <article className="cartao">
                  <h3 style={{ fontSize: '1.05rem' }}>
                    <Layers size={18} style={{ verticalAlign: '-3px', marginRight: '0.5rem', color: 'var(--destaque)' }} />
                    Professores e técnicos
                  </h3>
                  <p style={{ marginBottom: 0 }}>
                    O material pode ser reaproveitado em disciplinas de instrumentação, sistemas
                    embarcados e projeto integrador.
                  </p>
                </article>
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao centro">
            <span className="olho"><Clock size={14} /> Formato</span>
            <h2>Um dia intenso, com opção de segundo encontro</h2>
            <p>
              O primeiro dia fecha um ciclo completo, da pergunta ao resultado apresentado. O
              segundo existe para quem quiser levar o modelo até o hardware.
            </p>
          </Revelar>

          <div className="grade grade-2" style={{ gap: '1.6rem' }}>
            <Revelar>
              <article className="cartao" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                  <span className="pill pill-ciano">Dia 1</span>
                  <span className="pill">Obrigatório · 7 horas</span>
                </div>
                <h3>Do dado ao modelo</h3>
                <p>
                  Todo o percurso com bases prontas, agente de IA e Google Colab. Ninguém precisa
                  levar hardware.
                </p>
                <div style={{ marginTop: '1.2rem' }}>
                  {AGENDA_DIA1.map((item) => (
                    <div key={item.hora} style={{ display: 'flex', gap: '1rem', marginBottom: '0.9rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--fonte-mono)',
                          fontSize: '0.82rem',
                          color: 'var(--destaque)',
                          minWidth: '48px',
                          paddingTop: '0.15rem',
                        }}
                      >
                        {item.hora}
                      </span>
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{item.titulo}</strong>
                        <p style={{ margin: 0, fontSize: '0.88rem' }}>{item.detalhe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Revelar>

            <Revelar atraso={120}>
              <article className="cartao" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                  <span className="pill pill-ambar">Dia 2</span>
                  <span className="pill">Opcional · 6 horas</span>
                </div>
                <h3>Do modelo ao hardware</h3>
                <p>
                  Para turmas com mais tempo. Aqui entram o ESP32, a coleta própria e a
                  verificação na bancada.
                </p>
                <div style={{ marginTop: '1.2rem' }}>
                  {AGENDA_DIA2.map((item) => (
                    <div key={item.hora} style={{ display: 'flex', gap: '1rem', marginBottom: '0.9rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--fonte-mono)',
                          fontSize: '0.82rem',
                          color: 'var(--ambar-500)',
                          minWidth: '48px',
                          paddingTop: '0.15rem',
                        }}
                      >
                        {item.hora}
                      </span>
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{item.titulo}</strong>
                        <p style={{ margin: 0, fontSize: '0.88rem' }}>{item.detalhe}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Aviso tipo="info">
                  <p>
                    Kit sugerido para o segundo dia: ESP32 DevKit, protoboard, jumpers e um sensor
                    entre MPU-6050, DHT22 ou HC-SR04. Um kit para cada dupla já resolve.
                  </p>
                </Aviso>
              </article>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao secao-alt">
        <div className="container">
          <div className="grade grade-2" style={{ gap: '2.6rem', alignItems: 'center' }}>
            <Revelar>
              <span className="olho"><BookOpen size={14} /> Proposta pedagógica</span>
              <h2>Aprender fazendo, com resultado na tela</h2>
              <p>
                A condução é curta na exposição e longa na prática. Cada bloco teórico dura poucos
                minutos e termina com uma tarefa concreta, porque a compreensão aparece quando o
                código roda e o número surge.
              </p>
              <p>
                O agente de IA entra como ferramenta de trabalho, não como oráculo. A turma pede o
                código, executa, encontra erro, devolve o erro e itera. Esse ciclo é o mesmo de
                qualquer projeto profissional, apenas comprimido em um dia.
              </p>
              <p>
                O fechamento sempre compara o modelo treinado com a lógica que o próprio grupo
                escreveria na mão. É essa comparação que dá sentido a tudo e evita a impressão de
                que aprendizado de máquina é modismo.
              </p>
            </Revelar>

            <Revelar atraso={120}>
              <div className="grade" style={{ gap: '0.9rem' }}>
                {[
                  { n: '20%', t: 'Exposição', d: 'Conceitos apresentados em blocos curtos, sempre ligados a um exemplo de sensor.' },
                  { n: '60%', t: 'Mão na massa', d: 'Turma trabalhando em duplas, com o agente de IA aberto e o Colab rodando.' },
                  { n: '20%', t: 'Discussão', d: 'Comparação de resultados entre grupos e leitura crítica do que cada modelo aprendeu.' },
                ].map((bloco) => (
                  <article className="cartao" key={bloco.t} style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                    <strong
                      style={{
                        fontFamily: 'var(--fonte-titulo)',
                        fontSize: '1.6rem',
                        color: 'var(--destaque)',
                        minWidth: '62px',
                      }}
                    >
                      {bloco.n}
                    </strong>
                    <div>
                      <h3 style={{ fontSize: '1.02rem', marginBottom: '0.2rem' }}>{bloco.t}</h3>
                      <p style={{ marginBottom: 0, fontSize: '0.92rem' }}>{bloco.d}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao">
        <div className="container">
          <Revelar className="cabecalho-secao centro">
            <span className="olho">Dúvidas frequentes</span>
            <h2>O que costumam perguntar antes de se inscrever</h2>
          </Revelar>
          <Revelar>
            <Acordeao itens={PERGUNTAS} />
          </Revelar>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="secao-compacta">
        <div className="container">
          <Revelar>
            <div
              className="cartao"
              style={{
                textAlign: 'center',
                padding: 'clamp(2rem, 5vw, 3.4rem)',
                background:
                  'linear-gradient(135deg, var(--azul-800), var(--azul-950))',
                borderColor: 'transparent',
              }}
            >
              <h2 style={{ color: '#fff' }}>Pronto para escolher sua base?</h2>
              <p style={{ color: '#b9cde8', maxWidth: '58ch', margin: '0 auto 1.6rem' }}>
                São {datasets.length} conjuntos de dados de sensores prontos para download, cada um
                com cenário descrito, dicionário de colunas e uma pergunta de aprendizado de
                máquina para responder. O roteiro completo espera na aba seguinte, e há {posts.length} artigos
                de apoio no blog.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primario" onClick={() => navegar('dados')}>
                  <Download size={17} /> Ver as bases de dados
                </button>
                <button type="button" className="btn btn-secundario" onClick={() => navegar('projeto')}>
                  Ler o passo a passo <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
