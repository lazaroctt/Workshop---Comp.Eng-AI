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
 * As bases do workshop não têm vírgula dentro de campo, então a divisão
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

/** Junta classes ignorando valores vazios. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');
