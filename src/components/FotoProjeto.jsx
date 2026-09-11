import { useState } from 'react';
import { Camera, Film } from 'lucide-react';

/**
 * Mídia de um projeto, exibida à direita do texto na página Início.
 *
 * Pode ser uma foto ou uma animação em loop. A animação usa o elemento
 * picture: navegadores atuais recebem o WebP animado, que é bem mais leve; os
 * muito antigos recebem o GIF; e quem ativou a redução de movimento no sistema
 * vê só um quadro parado. Os arquivos ficam em public/assets/projetos.
 */
const BASE = `${import.meta.env.BASE_URL}assets/projetos/`;
const caminho = (arquivo) => encodeURI(BASE + arquivo);

export default function FotoProjeto({ projeto }) {
  const [ausente, setAusente] = useState(false);
  const { animacao, foto, proporcao = '4 / 3', posicao = 'center', legendaFoto, nome } = projeto;
  const Icone = projeto.icone;
  const estilo = { aspectRatio: proporcao, objectPosition: posicao };
  const alt = `${legendaFoto}. Projeto ${nome}.`;
  const semArquivo = ausente || (!animacao && !foto);

  return (
    <figure className="projeto-foto">
      {semArquivo ? (
        <div className="foto-reservada" style={{ aspectRatio: proporcao }}>
          <Icone size={30} strokeWidth={1.3} />
          <span>Imagem do projeto em breve</span>
          {import.meta.env.DEV && <code>public/assets/projetos/</code>}
        </div>
      ) : animacao ? (
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={caminho(animacao.quadro)} />
          <source type="image/webp" srcSet={caminho(animacao.webp)} />
          <img src={caminho(animacao.gif)} alt={alt} style={estilo} loading="lazy" decoding="async" onError={() => setAusente(true)} />
        </picture>
      ) : (
        <img src={caminho(foto)} alt={alt} style={estilo} loading="lazy" decoding="async" onError={() => setAusente(true)} />
      )}
      {!semArquivo && (
        <figcaption>
          {animacao ? <Film size={13} /> : <Camera size={13} />} {legendaFoto}
        </figcaption>
      )}
    </figure>
  );
}
