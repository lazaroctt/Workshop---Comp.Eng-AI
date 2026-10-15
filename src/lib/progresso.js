/**
 * Progresso do aluno na trilha, salvo apenas neste navegador.
 *
 * Não há login nem servidor: a lista de módulos concluídos fica no
 * localStorage. Toda leitura e escrita passa por try/catch, então a trilha
 * funciona normalmente, sem progresso salvo, quando o armazenamento está
 * bloqueado (janela anônima, cookies desativados, cota cheia).
 */

import { useCallback, useSyncExternalStore } from 'react';
import { SLUGS, obrigatorios, extras } from '../data/modulos.js';

const CHAVE = 'trilha-progresso';
const OBRIGATORIOS = obrigatorios.map((m) => m.slug);
const EXTRAS = extras.map((m) => m.slug);

/** Lê a lista salva, descartando valores estranhos ou módulos que não existem mais. */
function ler() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? '[]');
    return Array.isArray(salvo) ? SLUGS.filter((s) => salvo.includes(s)) : [];
  } catch {
    return [];
  }
}

// Cópia em memória compartilhada por todos os componentes. Ela também
// guarda o progresso da visita quando o navegador recusa a gravação.
let concluidos = ler();
const ouvintes = new Set();

function gravar(lista) {
  concluidos = SLUGS.filter((s) => lista.includes(s));
  try {
    localStorage.setItem(CHAVE, JSON.stringify(concluidos));
  } catch {
    /* Sem armazenamento disponível, o progresso vale só para esta visita. */
  }
  ouvintes.forEach((avisar) => avisar());
}

function assinar(avisar) {
  ouvintes.add(avisar);
  // Mantém abas abertas ao mesmo tempo em sincronia.
  const aoMudarEmOutraAba = (e) => {
    if (e.key === CHAVE || e.key === null) {
      concluidos = ler();
      avisar();
    }
  };
  window.addEventListener('storage', aoMudarEmOutraAba);
  return () => {
    ouvintes.delete(avisar);
    window.removeEventListener('storage', aoMudarEmOutraAba);
  };
}

const instantaneo = () => concluidos;

/**
 * Estado da trilha para os componentes: módulos concluídos, o próximo a
 * fazer (o primeiro obrigatório ainda não concluído, na ordem) e as ações
 * de marcar. Total e contagem de feitos consideram só os obrigatórios.
 */
export function useProgresso() {
  const lista = useSyncExternalStore(assinar, instantaneo, instantaneo);

  const feito = useCallback((slug) => lista.includes(slug), [lista]);

  const marcar = useCallback((slug, valor) => {
    const atual = concluidos.filter((s) => s !== slug);
    gravar(valor ? [...atual, slug] : atual);
  }, []);

  const zerar = useCallback(() => gravar([]), []);

  return {
    concluidos: lista,
    feitos: lista.filter((s) => OBRIGATORIOS.includes(s)).length,
    total: OBRIGATORIOS.length,
    proximo: OBRIGATORIOS.find((s) => !lista.includes(s)) ?? null,
    feito,
    marcar,
    zerar,
  };
}

/** Situação de um módulo, usada nas classes e nos rótulos da trilha. */
export function situacao(slug, { feito, proximo }) {
  if (feito(slug)) return 'concluido';
  if (EXTRAS.includes(slug)) return 'extra';
  if (slug === proximo) return 'proximo';
  return 'pendente';
}

export const ROTULO_SITUACAO = {
  concluido: 'Concluído',
  proximo: 'Próximo passo',
  pendente: 'Não iniciado',
  extra: 'Opcional',
};
