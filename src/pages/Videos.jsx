import { MonitorPlay, Info, ArrowRight } from 'lucide-react';
import Revelar from '../components/Revelar.jsx';
import VideoQuadro from '../components/VideoQuadro.jsx';
import Aviso from '../components/Aviso.jsx';
import { videos } from '../data/videos.js';

export default function Videos({ navegar }) {
  const [destaque, ...demais] = videos;

  return (
    <section className="secao">
      <div className="container">
        <Revelar className="cabecalho-secao">
          <span className="olho">Vídeos</span>
          <h2>Gravações de apoio ao encontro</h2>
          <p>
            Os vídeos acompanham as etapas do roteiro e permitem rever qualquer trecho no próprio
            ritmo. Quem não pôde comparecer consegue seguir o percurso completo por aqui.
          </p>
        </Revelar>

        <Revelar>
          <Aviso tipo="info" titulo="Espaços reservados">
            <p style={{ marginBottom: 0 }}>
              As gravações ainda não foram publicadas. Para exibir um vídeo, abra
              <code style={{ margin: '0 0.35rem' }}>src/data/videos.js</code>
              e preencha o campo <code>youtubeId</code> com o identificador que aparece na URL do
              YouTube, aquele trecho depois de <code>watch?v=</code>.
            </p>
          </Aviso>
        </Revelar>

        <Revelar>
          <div style={{ margin: '2.4rem 0 1rem' }}>
            <h3>
              <MonitorPlay size={20} style={{ verticalAlign: '-4px', marginRight: '0.5rem', color: 'var(--destaque)' }} />
              Comece por aqui
            </h3>
          </div>
          <div style={{ maxWidth: 880 }}>
            <VideoQuadro video={destaque} />
          </div>
        </Revelar>

        <Revelar>
          <h3 style={{ margin: '3rem 0 1.2rem' }}>Demais gravações</h3>
        </Revelar>

        <div className="grade grade-2">
          {demais.map((video, i) => (
            <Revelar key={video.id} atraso={(i % 2) * 100}>
              <VideoQuadro video={video} />
            </Revelar>
          ))}
        </div>

        <Revelar>
          <div className="cartao" style={{ marginTop: '2.4rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span className="cartao-icone" style={{ marginBottom: 0 }}><Info size={20} strokeWidth={1.6} /></span>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h3>Prefere acompanhar pelo texto?</h3>
              <p>
                O roteiro escrito cobre exatamente o mesmo conteúdo, com os prompts prontos para
                copiar. Muita gente prefere ler enquanto executa, e funciona igualmente bem.
              </p>
              <button type="button" className="btn btn-primario btn-pequeno" onClick={() => navegar('projeto')}>
                Abrir o passo a passo <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
