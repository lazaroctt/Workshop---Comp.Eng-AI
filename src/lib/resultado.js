/**
 * Leitura do arquivo resultado_projeto.json, gerado pelo aluno no Colab.
 *
 * Todo o trabalho acontece no navegador: o arquivo é lido pela API de
 * arquivos do próprio navegador e nada é enviado para servidor algum.
 * As funções daqui devolvem sempre um objeto com ok verdadeiro ou falso,
 * para que a página mostre uma explicação em vez de quebrar.
 */

const ehTexto = (v) => typeof v === 'string' && v.trim() !== '';
const ehNumero = (v) => typeof v === 'number' && Number.isFinite(v);

/** Aceita rótulos em texto ou em número, como acontece quando as classes são 0 e 1. */
const comoRotulo = (v) => {
  if (ehTexto(v)) return v.trim();
  if (ehNumero(v)) return String(v);
  return null;
};

const falha = (titulo, dicas = []) => ({ ok: false, titulo, dicas });

/** Tira acentos e caixa alta para aceitar "Classificação" e "classificacao". */
const simplificar = (v) =>
  ehTexto(v) ? v.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase() : '';

/**
 * A acurácia costuma vir entre 0 e 1, que é o padrão do scikit-learn, mas
 * há quem multiplique por cem antes de salvar. Os dois casos são aceitos.
 */
const comoTaxa = (v) => (v > 1 ? v / 100 : v);

const listaDeTextos = (v) => (Array.isArray(v) ? v.map(comoRotulo).filter(Boolean) : []);

/** Campos que aparecem no cabeçalho dos dois tipos de projeto. */
function lerComuns(bruto) {
  return {
    base: ehTexto(bruto.base) ? bruto.base.trim() : null,
    alvo: ehTexto(bruto.alvo) ? bruto.alvo.trim() : null,
    entradas: listaDeTextos(bruto.entradas),
  };
}

/** Pares real e previsto de um projeto de classificação. */
function amostrasDeClasse(v) {
  if (!Array.isArray(v)) return [];
  return v
    .map((a) => {
      if (!a || typeof a !== 'object') return null;
      const real = comoRotulo(a.real);
      const previsto = comoRotulo(a.previsto);
      return real && previsto ? { real, previsto } : null;
    })
    .filter(Boolean);
}

/** Pares real e previsto de um projeto de regressão, ambos numéricos. */
function amostrasNumericas(v) {
  if (!Array.isArray(v)) return [];
  return v
    .map((a) => (a && typeof a === 'object' && ehNumero(a.real) && ehNumero(a.previsto)
      ? { real: a.real, previsto: a.previsto }
      : null))
    .filter(Boolean);
}

function lerClassificacao(bruto) {
  const problemas = [];

  if (!ehNumero(bruto.acuracia)) problemas.push('O campo "acuracia" precisa ser um número, como 0.91.');
  if (!ehNumero(bruto.piso)) problemas.push('O campo "piso" precisa ser um número, como 0.46.');

  const classes = listaDeTextos(bruto.classes);
  if (classes.length < 2) {
    problemas.push('O campo "classes" precisa trazer a lista de rótulos, com pelo menos dois itens.');
  }

  const bruta = bruto.matriz_confusao;
  let matriz = null;
  if (!Array.isArray(bruta) || bruta.length === 0) {
    problemas.push('O campo "matriz_confusao" precisa ser uma lista de listas com os números de cada célula.');
  } else if (classes.length >= 2) {
    const quadrada = bruta.length === classes.length
      && bruta.every((linha) => Array.isArray(linha) && linha.length === classes.length && linha.every(ehNumero));
    if (!quadrada) {
      problemas.push(
        `A matriz de confusão precisa ter ${classes.length} linhas e ${classes.length} colunas, `
        + 'o mesmo número de itens do campo "classes", e só números dentro.',
      );
    } else {
      matriz = bruta;
    }
  }

  if (problemas.length > 0) {
    return falha('O arquivo é de classificação, mas algumas informações faltam ou estão fora do formato.', problemas);
  }

  return {
    ok: true,
    dados: {
      ...lerComuns(bruto),
      tipo: 'classificacao',
      acuracia: comoTaxa(bruto.acuracia),
      piso: comoTaxa(bruto.piso),
      classes,
      matriz,
      amostras: amostrasDeClasse(bruto.amostras),
    },
  };
}

function lerRegressao(bruto) {
  const problemas = [];

  if (!ehNumero(bruto.erro_medio_modelo)) {
    problemas.push('O campo "erro_medio_modelo" precisa ser um número, como 3.2.');
  }
  if (!ehNumero(bruto.erro_medio_piso)) {
    problemas.push('O campo "erro_medio_piso" precisa ser um número, como 8.7.');
  }
  if (ehNumero(bruto.erro_medio_modelo) && bruto.erro_medio_modelo < 0) {
    problemas.push('O erro médio do modelo não pode ser negativo.');
  }
  if (ehNumero(bruto.erro_medio_piso) && bruto.erro_medio_piso < 0) {
    problemas.push('O erro médio do piso não pode ser negativo.');
  }

  if (problemas.length > 0) {
    return falha('O arquivo é de regressão, mas algumas informações faltam ou estão fora do formato.', problemas);
  }

  return {
    ok: true,
    dados: {
      ...lerComuns(bruto),
      tipo: 'regressao',
      erroModelo: bruto.erro_medio_modelo,
      erroPiso: bruto.erro_medio_piso,
      amostras: amostrasNumericas(bruto.amostras),
    },
  };
}

/** Converte o texto do arquivo no resultado que a página desenha. */
export function interpretarResultado(texto) {
  let bruto;
  try {
    bruto = JSON.parse(texto);
  } catch {
    return falha('O arquivo não é um JSON válido.', [
      'Abra o arquivo em um editor de texto e confira se ele começa com uma chave e termina com outra.',
      'Se você copiou o conteúdo da tela do Colab, prefira baixar o arquivo pelo painel de arquivos, porque a cópia costuma vir cortada.',
      'Vírgula sobrando depois do último campo também invalida o arquivo.',
    ]);
  }

  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) {
    return falha('O arquivo foi lido, mas não tem o formato esperado.', [
      'O conteúdo precisa ser um único objeto, com os campos do projeto dentro dele.',
      'Se você salvou uma lista de resultados, envie apenas um deles por vez.',
    ]);
  }

  const tipo = simplificar(bruto.tipo);

  if (tipo === 'classificacao') return lerClassificacao(bruto);
  if (tipo === 'regressao') return lerRegressao(bruto);

  return falha('O campo "tipo" está ausente ou com um valor que a página não reconhece.', [
    'Use "tipo": "classificacao" quando o modelo prevê categorias, como confortável ou quente.',
    'Use "tipo": "regressao" quando o modelo prevê um número, como o consumo em kWh.',
    ehTexto(bruto.tipo) ? `O arquivo enviado trouxe "tipo": "${bruto.tipo}".` : 'O arquivo enviado não trouxe o campo "tipo".',
  ]);
}

/**
 * Compara o modelo com o piso e devolve a leitura pedagógica do resultado.
 * Na classificação o ganho é medido em pontos percentuais de acerto; na
 * regressão, na parte do erro que o modelo conseguiu cortar.
 */
export function avaliarGanho(dados) {
  if (dados.tipo === 'classificacao') {
    const ganho = dados.acuracia - dados.piso;

    if (ganho < 0) {
      return {
        tom: 'atencao',
        ganho,
        titulo: 'O modelo ficou abaixo do palpite simples',
        texto: 'Chutar sempre a classe mais comum acertaria mais do que o modelo treinado. Revise as colunas de entrada, a divisão entre treino e teste e a limpeza da base.',
      };
    }
    if (ganho < 0.05) {
      return {
        tom: 'atencao',
        ganho,
        titulo: 'O modelo mal superou o palpite simples',
        texto: 'A diferença para o piso é pequena demais para sustentar uma conclusão. Provavelmente as entradas escolhidas têm pouca relação com o alvo, ou a base tem poucos exemplos de alguma classe.',
      };
    }
    if (ganho < 0.1) {
      return {
        tom: 'info',
        ganho,
        titulo: 'O modelo superou o piso por pouco',
        texto: 'Há sinal de aprendizado, mas a margem ainda é estreita. Testar outras colunas de entrada ou reunir mais exemplos tende a ajudar.',
      };
    }
    return {
      tom: 'ok',
      ganho,
      titulo: 'O modelo aprendeu com os dados',
      texto: 'A distância para o palpite simples é confortável, sinal de que as colunas de entrada carregam informação sobre o alvo.',
    };
  }

  const corte = dados.erroPiso > 0 ? (dados.erroPiso - dados.erroModelo) / dados.erroPiso : 0;

  if (dados.erroModelo >= dados.erroPiso) {
    return {
      tom: 'atencao',
      corte,
      titulo: 'O modelo erra tanto quanto o palpite simples',
      texto: 'Prever sempre a média sairia igual ou melhor. Vale rever as colunas de entrada, checar valores fora de escala e confirmar se o alvo tem mesmo relação com o que foi medido.',
    };
  }
  if (corte < 0.1) {
    return {
      tom: 'atencao',
      corte,
      titulo: 'O ganho sobre o palpite simples é pequeno',
      texto: 'O erro caiu pouco em relação a prever sempre a média. Na prática, o modelo ainda não traz vantagem clara.',
    };
  }
  if (corte < 0.25) {
    return {
      tom: 'info',
      corte,
      titulo: 'O modelo erra menos que o palpite simples',
      texto: 'A redução do erro já aparece, mas ainda é modesta. Mais exemplos ou outras colunas de entrada podem melhorar a previsão.',
    };
  }
  return {
    tom: 'ok',
    corte,
    titulo: 'O modelo erra bem menos que o palpite simples',
    texto: 'A queda no erro médio mostra que as entradas ajudam a prever o alvo, e não apenas a repetir a média da base.',
  };
}

/** Acertos e erros contados a partir do campo amostras da classificação. */
export function contarAmostras(amostras) {
  const acertos = amostras.filter((a) => a.real === a.previsto).length;
  return { acertos, erros: amostras.length - acertos, total: amostras.length };
}

/** Porcentagem com uma casa decimal, no formato brasileiro. */
export const emPorcentagem = (v, casas = 1) =>
  `${(v * 100).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`;

/** Número comum, com no máximo duas casas decimais. */
export const emNumero = (v) =>
  v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
