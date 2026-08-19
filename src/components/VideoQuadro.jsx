import { Play, Clock, Video } from 'lucide-react';

/**
 * Espaço reservado para vídeo.
 * Preencha o campo youtubeId em src/data/videos.js para trocar o
 * placeholder pelo player embutido do YouTube.
 */
export default function VideoQuadro({ video }) {
  const { titulo, descricao, duracao, categoria, youtubeId } = video;

  return (
    <article className="cartao">
      <div className="video-quadro">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-vazio">
            <span className="play"><Play size={26} /></span>
            <strong style={{ color: 'var(--texto-suave)' }}>Vídeo ainda não publicado</strong>
            <span style={{ fontSize: '0.85rem', maxWidth: '34ch' }}>
              Informe o identificador do YouTube em <code>src/data/videos.js</code> para exibir o
              player neste espaço.
            </span>
            <code>youtubeId: '{video.id}'</code>
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
          <span className="pill"><Video size={13} /> {categoria}</span>
          <span className="pill"><Clock size={13} /> {duracao}</span>
        </div>
        <h3>{titulo}</h3>
        <p style={{ marginBottom: 0 }}>{descricao}</p>
      </div>
    </article>
  );
}
