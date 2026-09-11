import { Laptop, Bot, FileSpreadsheet, Lightbulb, BookOpen, ArrowUpRight } from 'lucide-react';

import Revelar from '../components/Revelar.jsx';
import VideoQuadro from '../components/VideoQuadro.jsx';
import Acordeao from '../components/Acordeao.jsx';
import CaixaPrompt from '../components/CaixaPrompt.jsx';
import { videos, gruposVideos } from '../data/videos.js';
import { livros, gruposLivros } from '../data/livros.js';
import { listaPrompts, gruposPrompt } from '../data/prompts.js';

const ANTES = [
  {
    icone: Laptop,
    titulo: 'Navegador e Google Colab',
    texto: 'Nada é instalado no computador. O Colab abre direto no navegador, usa sua conta Google e já traz as bibliotecas de machine learning.',
  },
  {
    icone: Bot,
    titulo: 'Um agente de IA gratuito',
    texto: 'Claude ou ChatGPT, na versão sem custo, dão conta de gerar e corrigir o código de todos os artigos.',
  },
  {
    icone: FileSpreadsheet,
    titulo: 'Uma base de dados',
    texto: 'Baixe um dos CSV da aba Bases de dados. Não é preciso coletar nada com sensor para começar.',
  },
];

const DICAS = [
  {
    titulo: 'Comece por um padrão visível',
    texto: 'Consumo de energia e ocupação de sala mostram o padrão a olho nu, o que ajuda a confiar no primeiro resultado.',
  },
  {
    titulo: 'Procure colunas que entregam a resposta',
    texto: 'Na base de ocupação, a contagem de pessoas revela se a sala está ocupada. Ela precisa ficar fora do treino.',
  },
  {
    titulo: 'Olhe o gráfico antes de treinar',
    texto: 'Um padrão visível quase sempre vira um bom modelo. Se nada aparece no gráfico, desconfie de uma nota alta.',
  },
  {
    titulo: 'Peça um modelo simples',
    texto: 'Árvore de decisão treina em segundos, erra de forma compreensível e cabe em um microcontrolador depois.',
  },
  {
    titulo: 'Desconfie da nota perfeita',
    texto: 'Acurácia de 100% quase sempre indica vazamento de informação. Investigue antes de comemorar.',
  },
  {
    titulo: 'Respeite a ordem do tempo',
    texto: 'Em séries temporais, treine com o começo do período e teste com o fim. Embaralhar leituras vizinhas dá uma nota bonita e enganosa.',
  },
  {
    titulo: 'Compare com a regra manual',
    texto: 'Às vezes o limiar escrito na mão vence, e isso também é um resultado legítimo. O ganho está em ter um número para decidir.',
  },
  {
    titulo: 'Guarde tudo no mesmo lugar',
    texto: 'Mantenha o notebook do Colab e o CSV na mesma pasta do Google Drive. Fica fácil retomar o trabalho depois.',
  },
];

const PERGUNTAS = [
  {
    pergunta: 'Preciso saber programar em Python?',
    resposta: 'Não. Ajuda ter familiaridade com lógica de programação, que quem mexe com eletrônica já costuma trazer. O código é gerado com apoio do agente de IA, e os prompts pedem comentários em português linha por linha.',
  },
  {
    pergunta: 'Preciso instalar alguma coisa no computador?',
    resposta: 'Nada. Tudo acontece no Google Colab, que já vem com pandas, scikit-learn e matplotlib. Basta uma conta Google e conexão estável.',
  },
  {
    pergunta: 'A versão gratuita do Claude ou do ChatGPT dá conta?',
    resposta: 'Dá. Os prompts foram escritos pensando nos limites do plano sem custo. Se as mensagens do dia acabarem, é possível continuar mais tarde ou seguir em outro agente, colando o código que você já tem.',
  },
  {
    pergunta: 'Os dados são reais?',
    resposta: 'As oito bases prontas para baixar são sintéticas, geradas por um script que reproduz padrões físicos conhecidos: ciclo diário de temperatura, desgaste de rolamento, curva de carga elétrica. A aba Bases de dados também lista cinco bases públicas com dados reais.',
  },
  {
    pergunta: 'Posso usar uma base que não está na lista?',
    resposta: 'Pode. O caminho é o mesmo para qualquer CSV que tenha uma coluna com a resposta que você quer prever. O artigo Anatomia de uma base de sensores ajuda a organizar o arquivo antes do treino.',
  },
  {
    pergunta: 'O código deu erro. E agora?',
    resposta: 'Copie a mensagem de erro inteira, incluindo o traceback, e cole no agente junto com o código que falhou. O prompt Corrigir um erro de execução, na biblioteca desta página, já vem pronto para isso.',
  },
];

const SECOES = [
  { id: 'antes', rotulo: 'Antes de começar' },
  { id: 'videos', rotulo: 'Vídeos' },
  { id: 'livros', rotulo: 'Livros' },
  { id: 'dicas-rapidas', rotulo: 'Dicas rápidas' },
  { id: 'prompts', rotulo: 'Prompts' },
  { id: 'perguntas', rotulo: 'Perguntas frequentes' },
];

/** Rola até uma seção sem alterar o endereço, que é usado pela navegação em abas. */
const irPara = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Dicas() {
  return (
    <>
      <section className="secao" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Revelar className="cabecalho-secao" style={{ marginBottom: '1.4rem' }}>
            <span className="olho">Dicas e vídeos</span>
            <h2>Atalhos para quem está praticando</h2>
            <p>
              O que ter em mãos, vídeos de apoio, livros recomendados, dicas curtas e todos os
              prompts da plataforma reunidos em um só lugar para copiar.
            </p>
          </Revelar>

          <nav className="subnav" aria-label="Seções desta página">
            {SECOES.map((s) => (
              <button key={s.id} type="button" className="chip" onClick={() => irPara(s.id)}>
                {s.rotulo}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="secao-compacta" id="antes">
        <div className="container">
          <h3 className="titulo-bloco">Antes de começar</h3>
          <div className="grade grade-3">
            {ANTES.map((item, i) => {
              const Icone = item.icone;
              return (
                <Revelar key={item.titulo} atraso={i * 80}>
                  <article className="cartao">
                    <span className="cartao-icone"><Icone size={20} strokeWidth={1.6} /></span>
                    <h3 style={{ fontSize: '1.05rem' }}>{item.titulo}</h3>
                    <p>{item.texto}</p>
                  </article>
                </Revelar>
              );
            })}
          </div>
        </div>
      </section>

      <section className="secao secao-alt" id="videos">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Vídeos</span>
            <h2>Para ver antes ou durante a prática</h2>
            <p>
              Explicações em vídeo sobre os conceitos e as ferramentas usadas nos artigos. Assista
              no seu ritmo e volte quantas vezes precisar.
            </p>
          </Revelar>
          {gruposVideos.map((grupo) => (
            <div key={grupo.id} className="grupo-videos">
              <h3 className="titulo-bloco">{grupo.titulo}</h3>
              <div className="grade grade-videos">
                {videos.filter((v) => v.grupo === grupo.id).map((video, i) => (
                  <Revelar key={video.id} atraso={(i % 2) * 100}>
                    <VideoQuadro video={video} />
                  </Revelar>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="secao" id="livros">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Livros</span>
            <h2>Para ler com calma</h2>
            <p>
              Uma estante curta, da leitura leve aos livros técnicos. Os que têm edição brasileira
              estão indicados pela editora nacional.
            </p>
          </Revelar>

          {gruposLivros.map((grupo) => (
            <div key={grupo.id} className="grupo-livros">
              <div className="grupo-livros-cabecalho">
                <h3 className="titulo-bloco">{grupo.titulo}</h3>
                <p>{grupo.texto}</p>
              </div>
              <div className="grade grade-3">
                {livros.filter((l) => l.grupo === grupo.id).map((livro, i) => (
                  <Revelar key={livro.titulo} atraso={(i % 3) * 80}>
                    <article className={`cartao cartao-livro livro-${grupo.id}`}>
                      <BookOpen size={17} strokeWidth={1.6} className="livro-icone" />
                      <h4>{livro.titulo}</h4>
                      {livro.subtitulo && <p className="livro-subtitulo">{livro.subtitulo}</p>}
                      <p className="livro-autor">{livro.autores}</p>
                      <p className="livro-edicao">
                        {[livro.editora, livro.edicao, livro.ano].filter(Boolean).join(' · ')}
                        {livro.idioma && <span className="pill">{livro.idioma}</span>}
                      </p>
                      <p className="livro-descricao">{livro.descricao}</p>
                      {livro.url && (
                        <a className="livro-link" href={livro.url} target="_blank" rel="noopener noreferrer">
                          Página da editora <ArrowUpRight size={14} />
                        </a>
                      )}
                    </article>
                  </Revelar>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="secao secao-alt" id="dicas-rapidas">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Dicas rápidas</span>
            <h2>Hábitos que evitam os erros mais comuns</h2>
          </Revelar>
          <div className="grade grade-4">
            {DICAS.map((dica, i) => (
              <Revelar key={dica.titulo} atraso={(i % 4) * 70}>
                <article className="cartao cartao-dica">
                  <Lightbulb size={17} strokeWidth={1.6} />
                  <h3>{dica.titulo}</h3>
                  <p>{dica.texto}</p>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="secao" id="prompts">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Prompts</span>
            <h2>Biblioteca de prompts</h2>
            <p>
              Abra o prompt, copie e cole no agente de IA. Troque o que está entre colchetes pelas
              informações da sua base antes de enviar.
            </p>
          </Revelar>

          {gruposPrompt.map((grupo) => {
            const doGrupo = listaPrompts.filter((p) => p.grupo === grupo);
            return (
              <Revelar key={grupo} className="grupo-prompts">
                <h3 className="titulo-bloco">{grupo}</h3>
                <Acordeao
                  itens={doGrupo.map((p) => ({
                    pergunta: p.titulo,
                    conteudo: <CaixaPrompt titulo={p.titulo} texto={p.texto} />,
                  }))}
                />
              </Revelar>
            );
          })}
        </div>
      </section>

      <section className="secao secao-alt" id="perguntas">
        <div className="container">
          <Revelar className="cabecalho-secao">
            <span className="olho">Perguntas frequentes</span>
            <h2>Dúvidas de quem está começando</h2>
          </Revelar>
          <Revelar>
            <Acordeao itens={PERGUNTAS} />
          </Revelar>
        </div>
      </section>
    </>
  );
}
