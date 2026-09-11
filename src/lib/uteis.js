/** Funções e ganchos compartilhados entre as páginas. */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copia um texto para a área de transferência e devolve o estado de sucesso
 * por dois segundos, tempo suficiente para trocar o ícone do botão.
 * O caminho alternativo cobre navegadores que bloqueiam a API moderna
 * quando a página não está em contexto seguro.
 */
export function useCopiar(tempo = 2000) {
  const [copiado, setCopiado] = useState(false);

  const copiar = useCallback(
    async (texto) => {
      try {
        await navigator.clipboard.writeText(texto);
      } catch {
        const area = document.createElement('textarea');
        area.value = texto;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopiado(true);
    },
    [],
  );

  useEffect(() => {
    if (!copiado) return undefined;
    const t = setTimeout(() => setCopiado(false), tempo);
    return () => clearTimeout(t);
  }, [copiado, tempo]);

  return { copiado, copiar };
}

/** Observa a entrada do elemento na tela para disparar a animação de revelação. */
export function useRevelar(margem = '0px 0px -60px 0px') {
  const alvo = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return undefined;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setVisivel(true);
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: margem, threshold: 0.08 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [margem]);

  return { alvo, visivel };
}

/**
 * Converte o texto bruto de um CSV em cabeçalho e linhas.
 * As bases da plataforma não têm vírgula dentro de campo, então a divisão
 * simples por vírgula dá conta sem precisar de biblioteca.
 */
export function lerCSV(texto, limite = 12) {
  const linhas = texto.trim().split('\n');
  const cabecalho = linhas[0].split(',');
  const corpo = linhas.slice(1, limite + 1).map((linha) => linha.split(','));
  return { cabecalho, corpo, total: linhas.length - 1 };
}

/** Endereço público do CSV, servido pela pasta public. */
export const caminhoDataset = (arquivo) => `${import.meta.env.BASE_URL}datasets/${arquivo}`;

/**
 * Converte um link do YouTube no endereço de incorporação usado pelo player.
 * Aceita watch?v=, youtu.be, embed, shorts, live e playlist. Devolve null
 * quando o campo está vazio ou o link não é do YouTube.
 */
export function paraEmbedYouTube(link) {
  if (!link || !link.trim()) return null;

  let url;
  try {
    url = new URL(link.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, '');
  const partes = url.pathname.split('/').filter(Boolean);
  let id = null;

  if (host === 'youtu.be') {
    id = partes[0];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (partes[0] === 'watch') id = url.searchParams.get('v');
    else if (['embed', 'shorts', 'live'].includes(partes[0])) id = partes[1];
    else if (partes[0] === 'playlist' && url.searchParams.get('list')) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(url.searchParams.get('list'))}`;
    }
  }

  if (!id || !/^[\w-]{6,}$/.test(id)) return null;
  // Domínio de privacidade aprimorada: cookies só depois que o vídeo é iniciado.
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

/** Junta classes ignorando valores vazios. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');
