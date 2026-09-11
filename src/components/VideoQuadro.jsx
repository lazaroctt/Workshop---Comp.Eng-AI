import { Play, Video } from 'lucide-react';
import { paraEmbedYouTube } from '../lib/uteis.js';

/**
 * Cartão de vídeo com player do YouTube.
 *
 * O link vem do campo embedUrl em src/data/videos.js. Com o campo
 * preenchido, o player aparece; vazio, o cartão mostra "Vídeo em breve".
 * No servidor de desenvolvimento, uma linha extra indica o arquivo a editar,
 * para facilitar a manutenção sem expor esse detalhe na versão publicada.
 */
export default function VideoQuadro({ video }) {
  const { titulo, descricao, tema, fonte, embedUrl } = video;
  const embed = paraEmbedYouTube(embedUrl);
  const linkInvalido = Boolean(embedUrl && embedUrl.trim()) && !embed;

  return (
    <article className="cartao">
      <div className="video-quadro">
        {embed ? (
          <iframe
            src={embed}
            title={titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-vazio">
            <span className="play"><Play size={22} /></span>
            <strong style={{ color: 'var(--texto-suave)' }}>Vídeo em breve</strong>
            {import.meta.env.DEV && (
              <span style={{ fontSize: '0.8rem', maxWidth: '36ch' }}>
                {linkInvalido ? 'Link não reconhecido como YouTube. ' : 'Placeholder: '}
                preencha <code>embedUrl</code> do vídeo <code>{video.id}</code> em{' '}
                <code>src/data/videos.js</code>
              </span>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.05rem' }}>
        <span className="pill" style={{ marginBottom: '0.6rem' }}>
          <Video size={13} /> {tema}
        </span>
        <h3>{titulo}</h3>
        <p style={{ marginBottom: fonte ? '0.6rem' : 0 }}>{descricao}</p>
        {fonte && <p className="video-fonte">{fonte}</p>}
      </div>
    </article>
  );
}
