/**
 * Monta o PDF do resultado do projeto. A folha é desenhada campo a campo,
 * e não capturada da tela, para o texto sair selecionável e a quebra de
 * página cair sempre entre blocos. A biblioteca entra por importação
 * dinâmica, então só é baixada por quem clica no botão.
 *
 * Como tudo acontece no navegador, nenhum dado do aluno sai da máquina.
 */

import { avaliarGanho, contarAmostras, emNumero, emPorcentagem } from './resultado.js';
import { desenharMatriz, desenharDispersao, desenharBarraAcertos } from './graficosPdf.js';

const PAGINA = { largura: 210, altura: 297 };
const MARGEM = { esq: 18, dir: 18, topo: 16, base: 18 };
const CONTEUDO = PAGINA.largura - MARGEM.esq - MARGEM.dir;
const PT_MM = 0.352778;

const COR = {
  azul: [22, 51, 92],
  azulClaro: [29, 66, 118],
  texto: [22, 32, 46],
  suave: [65, 77, 94],
  fraco: [106, 118, 134],
  borda: [223, 227, 232],
  verde: [61, 122, 94],
  vinho: [138, 61, 74],
};

const TOM = { ok: COR.verde, info: COR.azulClaro, atencao: COR.vinho };

const MARCAS = {
  uff: 'assets/uff/logotipo-uff-horizontal-azul.png',
  lacop: 'assets/lacop/lacop.png',
};

/** Carrega um PNG da pasta public e devolve o conteúdo e as proporções. */
async function carregarMarca(caminho) {
  try {
    const resposta = await fetch(`${import.meta.env.BASE_URL}${caminho}`);
    if (!resposta.ok) return null;

    const blob = await resposta.blob();
    const url = await new Promise((ok, erro) => {
      const leitor = new FileReader();
      leitor.onload = () => ok(leitor.result);
      leitor.onerror = erro;
      leitor.readAsDataURL(blob);
    });

    const imagem = new Image();
    imagem.src = url;
    await imagem.decode();
    return { url, largura: imagem.naturalWidth, altura: imagem.naturalHeight };
  } catch {
    // Sem a marca, o cabeçalho fica apenas tipográfico.
    return null;
  }
}

const dataDeHoje = () => new Date().toLocaleDateString('pt-BR');

/** Transforma o título em um nome de arquivo curto e sem acento. */
function comoNomeDeArquivo(titulo) {
  const limpo = titulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  return `resultado-${limpo || 'projeto'}.pdf`;
}

/** Ferramentas de escrita sobre o documento, com controle de posição. */
function criarFolha(doc) {
  let y = MARGEM.topo;

  const corDoTexto = (cor) => doc.setTextColor(cor[0], cor[1], cor[2]);

  const alturaTexto = (linhas, tamanho) => linhas.length * tamanho * PT_MM * 1.15;

  /** Abre outra página quando o bloco não cabe no que restou da folha. */
  const espacoPara = (altura) => {
    if (y + altura <= PAGINA.altura - MARGEM.base - 8) return;
    doc.addPage();
    y = MARGEM.topo + 4;
  };

  const paragrafo = (texto, { tamanho = 10, fonte = 'helvetica', estilo = 'normal', cor = COR.suave, largura = CONTEUDO, x = MARGEM.esq, depois = 2 } = {}) => {
    doc.setFont(fonte, estilo);
    doc.setFontSize(tamanho);
    corDoTexto(cor);
    const linhas = doc.splitTextToSize(texto, largura);
    const altura = alturaTexto(linhas, tamanho);
    espacoPara(altura);
    doc.text(linhas, x, y + tamanho * PT_MM * 0.9);
    y += altura + depois;
    return y;
  };

  /**
   * O segundo argumento é a altura do que vem logo abaixo, para o título
   * nunca ficar sozinho no pé de uma página.
   */
  const tituloDeSecao = (texto, alturaDoBloco = 0) => {
    espacoPara(14 + alturaDoBloco);
    y += 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    corDoTexto(COR.fraco);
    doc.text(texto.toUpperCase(), MARGEM.esq, y, { charSpace: 0.45 });
    doc.setDrawColor(...COR.borda);
    doc.setLineWidth(0.2);
    doc.line(MARGEM.esq, y + 2.2, MARGEM.esq + CONTEUDO, y + 2.2);
    y += 7.5;
  };

  /** Converte o desenho em pixels para milímetros, sem passar da largura útil. */
  const medir = ({ largura, altura }) => {
    const escala = Math.min(CONTEUDO / (largura * 0.26), 1);
    return { l: largura * 0.26 * escala, a: altura * 0.26 * escala };
  };

  const limiteY = () => PAGINA.altura - MARGEM.base - 8;

  /**
   * Título e imagem no mesmo bloco. Quando falta pouco para o desenho caber
   * no resto da folha, ele é reduzido até o limite do legível; quando falta
   * muito, o bloco inteiro desce para a página seguinte, sem deixar título
   * órfão nem meia página em branco.
   */
  const imagemComTitulo = (titulo, desenho, legenda) => {
    const reservaTitulo = 20.5;
    const reservaLegenda = legenda ? 12 : 4;
    let { l, a } = medir(desenho);

    const disponivel = limiteY() - y - reservaTitulo - reservaLegenda;
    if (a > disponivel) {
      const fator = disponivel / a;
      if (fator >= 0.64) {
        l *= fator;
        a = disponivel;
      } else {
        doc.addPage();
        y = MARGEM.topo + 4;
      }
    }

    tituloDeSecao(titulo);
    doc.addImage(desenho.url, 'PNG', MARGEM.esq, y, l, a);
    y += a + 3;
    if (legenda) paragrafo(legenda, { tamanho: 8.5, cor: COR.fraco, depois: 1 });
  };

  return {
    get y() { return y; },
    set y(valor) { y = valor; },
    doc,
    corDoTexto,
    espacoPara,
    paragrafo,
    tituloDeSecao,
    medir,
    imagemComTitulo,
  };
}

/** Faixa de identificação no alto da primeira página. */
async function desenharCabecalho(folha) {
  const { doc } = folha;
  const [uff, lacop] = await Promise.all([carregarMarca(MARCAS.uff), carregarMarca(MARCAS.lacop)]);
  let base = MARGEM.topo;

  if (uff) {
    const altura = 5.4;
    doc.addImage(uff.url, 'PNG', MARGEM.esq, base, (uff.largura / uff.altura) * altura, altura);
  }
  if (lacop) {
    const altura = 11;
    const largura = (lacop.largura / lacop.altura) * altura;
    doc.addImage(lacop.url, 'PNG', PAGINA.largura - MARGEM.dir - largura, base - 2.6, largura, altura);
  }

  base += uff || lacop ? 13 : 0;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  folha.corDoTexto(COR.azul);
  doc.text('Workshop de Inteligência Artificial e Sensores', MARGEM.esq, base + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  folha.corDoTexto(COR.fraco);
  doc.text('LACOP, Universidade Federal Fluminense', MARGEM.esq, base + 9.2);

  doc.setDrawColor(...COR.azul);
  doc.setLineWidth(0.6);
  doc.line(MARGEM.esq, base + 13.4, MARGEM.esq + CONTEUDO, base + 13.4);

  folha.y = base + 18.5;
}

/** Título do projeto, autoria e data de emissão. */
function desenharIdentificacao(folha, { titulo, aluno }) {
  folha.paragrafo(titulo, { fonte: 'times', estilo: 'bold', tamanho: 19.5, cor: COR.texto, depois: 3 });
  folha.paragrafo(aluno, { tamanho: 11.5, cor: COR.suave, depois: 1 });
  folha.paragrafo(`Emitido em ${dataDeHoje()}`, { tamanho: 9, cor: COR.fraco, depois: 1.5 });
}

/** Base, coluna prevista e colunas de entrada. */
function desenharFicha(folha, dados) {
  folha.tituloDeSecao('Dados do projeto');

  const tarefa = dados.tipo === 'classificacao'
    ? 'classificação, o modelo escolhe entre categorias'
    : 'regressão, o modelo prevê um número';

  const itens = [
    ['Base de dados', dados.base ?? 'não informada no arquivo'],
    ['Coluna prevista', `${dados.alvo ?? 'não informada no arquivo'} (${tarefa})`],
    ['Colunas de entrada', dados.entradas.length > 0 ? dados.entradas.join(', ') : 'não informadas no arquivo'],
  ];

  itens.forEach(([rotulo, valor]) => {
    const { doc } = folha;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    folha.corDoTexto(COR.texto);
    const larguraRotulo = 38;
    folha.espacoPara(8);
    doc.text(`${rotulo}:`, MARGEM.esq, folha.y + 3);

    doc.setFont('helvetica', 'normal');
    folha.corDoTexto(COR.suave);
    const linhas = doc.splitTextToSize(valor, CONTEUDO - larguraRotulo);
    doc.text(linhas, MARGEM.esq + larguraRotulo, folha.y + 3);
    folha.y += Math.max(5.8, linhas.length * 9.5 * PT_MM * 1.15 + 1.4);
  });
}

/** Os três números do desempenho, lado a lado, e a leitura do resultado. */
function desenharDesempenho(folha, blocos, veredito) {
  const { doc } = folha;
  folha.tituloDeSecao('Desempenho do modelo', 36);

  const vao = 4;
  const largura = (CONTEUDO - vao * 2) / 3;
  const altura = 27;
  folha.espacoPara(altura + 4);
  const topo = folha.y;

  blocos.forEach((bloco, i) => {
    const x = MARGEM.esq + i * (largura + vao);

    doc.setDrawColor(...COR.borda);
    doc.setLineWidth(0.25);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, topo, largura, altura, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    folha.corDoTexto(COR.fraco);
    doc.text(bloco.rotulo.toUpperCase(), x + 4, topo + 6, { charSpace: 0.35, maxWidth: largura - 8 });

    doc.setFont('times', 'bold');
    doc.setFontSize(19);
    folha.corDoTexto(bloco.cor ?? COR.texto);
    doc.text(bloco.valor, x + 4, topo + 14.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    folha.corDoTexto(COR.suave);
    doc.text(doc.splitTextToSize(bloco.nota, largura - 8), x + 4, topo + 19);
  });

  folha.y = topo + altura + 5;

  // Leitura do resultado, com um filete no tom do veredito.
  const cor = TOM[veredito.tom] ?? COR.azulClaro;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  const linhasTitulo = doc.splitTextToSize(veredito.titulo, CONTEUDO - 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const linhasTexto = doc.splitTextToSize(veredito.texto, CONTEUDO - 10);
  const alturaBloco = linhasTitulo.length * 10.5 * PT_MM * 1.15 + linhasTexto.length * 9.5 * PT_MM * 1.15 + 5;

  folha.espacoPara(alturaBloco + 2);
  const inicio = folha.y;

  doc.setFillColor(cor[0], cor[1], cor[2]);
  doc.rect(MARGEM.esq, inicio, 1, alturaBloco, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  folha.corDoTexto(cor);
  doc.text(linhasTitulo, MARGEM.esq + 5, inicio + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  folha.corDoTexto(COR.suave);
  doc.text(linhasTexto, MARGEM.esq + 5, inicio + 4 + linhasTitulo.length * 10.5 * PT_MM * 1.15 + 1.6);

  folha.y = inicio + alturaBloco + 4;
}

function desenharClassificacao(folha, dados) {
  const veredito = avaliarGanho(dados);
  const pontos = (dados.acuracia - dados.piso) * 100;

  desenharDesempenho(folha, [
    {
      rotulo: 'Acerto do modelo',
      valor: emPorcentagem(dados.acuracia),
      nota: 'parte das previsões que bateu com o valor verdadeiro',
      cor: COR.azul,
    },
    {
      rotulo: 'Piso, o palpite simples',
      valor: emPorcentagem(dados.piso),
      nota: 'o que se acerta chutando sempre a classe mais comum',
    },
    {
      rotulo: 'Diferença',
      valor: `${pontos > 0 ? '+' : ''}${pontos.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} pontos`,
      nota: 'quanto o treino rendeu acima do palpite',
      cor: TOM[veredito.tom],
    },
  ], veredito);

  folha.imagemComTitulo(
    'Matriz de confusão',
    desenharMatriz(dados),
    'Leia por linha: dos exemplos que eram de uma classe, quantos o modelo colocou em cada coluna. '
    + 'Os números na diagonal são os acertos, e o que está fora dela mostra com qual classe o modelo se confundiu.',
  );

  const contagem = contarAmostras(dados.amostras);
  if (contagem.total > 0) {
    folha.imagemComTitulo('Amostras conferidas uma a uma', desenharBarraAcertos(contagem));
    folha.paragrafo(
      `${contagem.acertos} acertos e ${contagem.erros} erros nas ${contagem.total} amostras do arquivo, `
      + `${emPorcentagem(contagem.acertos / contagem.total)} corretas. A parte azul da barra marca os acertos.`,
      { tamanho: 8.5, cor: COR.fraco },
    );
  }
}

function desenharRegressao(folha, dados) {
  const veredito = avaliarGanho(dados);
  const diferenca = dados.erroPiso - dados.erroModelo;
  const corte = dados.erroPiso > 0 ? diferenca / dados.erroPiso : 0;
  const unidade = dados.alvo ? ` de ${dados.alvo}` : '';

  folha.paragrafo(
    'Nos projetos de regressão o número que conta é o erro médio, a distância entre o valor previsto e o real. '
    + 'Ao contrário da acurácia, quanto menor, melhor.',
    { tamanho: 9.5, cor: COR.suave, depois: 0 },
  );

  desenharDesempenho(folha, [
    {
      rotulo: 'Erro médio do modelo',
      valor: emNumero(dados.erroModelo),
      nota: `distância média entre a previsão e o valor real${unidade}`,
      cor: COR.azul,
    },
    {
      rotulo: 'Erro do piso',
      valor: emNumero(dados.erroPiso),
      nota: 'o que se erra prevendo sempre a média da base',
    },
    {
      rotulo: 'Erro que o modelo cortou',
      valor: diferenca > 0 ? emPorcentagem(corte, 0) : 'nenhum',
      nota: diferenca > 0 ? `${emNumero(diferenca)} a menos que o piso, em média` : 'o modelo não reduziu o erro do palpite',
      cor: TOM[veredito.tom],
    },
  ], veredito);

  if (dados.amostras.length > 0) {
    folha.imagemComTitulo(
      'Previsão contra valor real',
      desenharDispersao(dados),
      'A linha tracejada marca a previsão perfeita, em que o valor previsto é igual ao real. '
      + 'Pontos acima dela são previsões altas demais, e pontos abaixo, baixas demais.',
    );
  } else {
    folha.tituloDeSecao('Previsão contra valor real', 12);
    folha.paragrafo(
      'O arquivo não trouxe o campo de amostras, então o gráfico de dispersão ficou de fora deste documento.',
      { tamanho: 9.5 },
    );
  }
}

/** Linha de identificação repetida no pé de todas as páginas. */
function desenharRodape(doc, endereco) {
  const total = doc.getNumberOfPages();

  for (let pagina = 1; pagina <= total; pagina += 1) {
    doc.setPage(pagina);
    const base = PAGINA.altura - MARGEM.base + 4;

    doc.setDrawColor(...COR.borda);
    doc.setLineWidth(0.2);
    doc.line(MARGEM.esq, base - 4, MARGEM.esq + CONTEUDO, base - 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COR.fraco);
    doc.text('Documento gerado pela plataforma do Workshop IA e Sensores, LACOP UFF', MARGEM.esq, base);

    const direita = total > 1 ? `${endereco}  |  página ${pagina} de ${total}` : endereco;
    doc.text(direita, MARGEM.esq + CONTEUDO, base, { align: 'right' });
  }
}

/**
 * Gera e baixa o PDF do resultado. Devolve o nome do arquivo salvo.
 * Lança erro quando algo falha, para a aba mostrar o aviso na tela.
 */
export async function gerarPdfResultado({ dados, aluno, titulo }) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });

  const folha = criarFolha(doc);
  await desenharCabecalho(folha);
  desenharIdentificacao(folha, { titulo: titulo.trim(), aluno: aluno.trim() });
  desenharFicha(folha, dados);

  if (dados.tipo === 'classificacao') desenharClassificacao(folha, dados);
  else desenharRegressao(folha, dados);

  // Em desenvolvimento o host é localhost, que não diz nada a quem recebe o
  // documento, então nesse caso o rodapé traz o endereço público.
  const host = typeof window !== 'undefined' ? (window.location?.hostname ?? '') : '';
  const local = host === 'localhost' || host === '127.0.0.1' || host === '';
  const endereco = local ? 'workshop-comp-eng-ai.vercel.app' : window.location.host;
  desenharRodape(doc, endereco);

  doc.setProperties({
    title: titulo.trim(),
    author: aluno.trim(),
    subject: 'Resultado de projeto do Workshop IA e Sensores',
    creator: 'Plataforma do Workshop IA e Sensores, LACOP UFF',
  });

  const arquivo = comoNomeDeArquivo(titulo);
  doc.save(arquivo);
  return arquivo;
}
