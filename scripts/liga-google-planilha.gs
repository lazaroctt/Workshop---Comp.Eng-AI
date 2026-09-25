/**
 * FORA DE USO. A plataforma passou a usar um formulário do Google Forms, então
 * o site não envia mais nada para este script. O arquivo fica aqui apenas como
 * registro da versão anterior e pode ser apagado, junto com a implantação feita
 * no Apps Script.
 */

/**
 * Recebe as inscrições do formulário "Tenho interesse na Liga", da plataforma
 * Workshop IA e Sensores (LACOP/UFF). Cada inscrição vira uma linha nesta
 * planilha e gera um aviso por e-mail.
 *
 * Como instalar (passo a passo completo no README do projeto):
 *   1. Crie uma planilha no Google Planilhas.
 *   2. Abra Extensões > Apps Script, apague o conteúdo e cole este arquivo.
 *   3. Salve, escolha a função testar e clique em Executar. Autorize o acesso.
 *   4. Implantar > Nova implantação > App da Web. Executar como: você.
 *      Quem pode acessar: Qualquer pessoa. Copie a URL terminada em /exec.
 *   5. Coloque essa URL em ENDPOINT_CONFIGURADO, em src/data/liga.js.
 */

/* Configuração ------------------------------------------------------------ */

const EMAIL_DESTINO = 'malazaro@id.uff.br';
const NOME_ABA = 'Inscrições';
const CABECALHO = [
  'Data e hora', 'Nome', 'Curso', 'Período', 'E-mail',
  'Conhecimento prático com IA ou Ciência de Dados', 'Origem',
];
const PERIODOS = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º', 'Acima do 10º', 'Pós-graduação'];

/* Entradas do app da Web ------------------------------------------------- */

/** Recebe o envio do site. O corpo chega como texto com um JSON dentro. */
function doPost(e) {
  try {
    const dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const inscricao = validar(dados);
    const total = gravar(inscricao);
    avisar(inscricao, total);
    return resposta({ ok: true });
  } catch (erro) {
    console.error(erro);
    return resposta({ ok: false, erro: String((erro && erro.message) || erro) });
  }
}

/** Abrir a URL no navegador mostra esta mensagem: serve para conferir a instalação. */
function doGet() {
  return ContentService.createTextOutput('Formulário da Liga de IA do LACOP: endereço ativo.');
}

/** Simula uma inscrição. Execute pelo editor para autorizar e testar tudo. */
function testar() {
  const envio = {
    postData: {
      contents: JSON.stringify({
        nome: 'Teste da instalação',
        curso: 'Engenharia de Telecomunicações',
        periodo: '5º',
        email: EMAIL_DESTINO,
        experiencia_ia_ou_dados: 'Não',
        origem: 'Teste pelo editor do Apps Script',
      }),
    },
  };
  Logger.log(doPost(envio).getContent());
}

/* Regras ------------------------------------------------------------------ */

/** Confere os campos e limita o tamanho de cada um. */
function validar(d) {
  const texto = (valor, limite) => String(valor == null ? '' : valor).trim().slice(0, limite);
  const inscricao = {
    nome: texto(d.nome, 120),
    curso: texto(d.curso, 120),
    periodo: texto(d.periodo, 20),
    email: texto(d.email, 160).toLowerCase(),
    experiencia: texto(d.experiencia_ia_ou_dados, 3),
    origem: texto(d.origem, 80) || 'Plataforma Workshop IA e Sensores',
  };
  if (inscricao.nome.length < 3) throw new Error('Nome inválido.');
  if (inscricao.curso.length < 2) throw new Error('Curso inválido.');
  if (PERIODOS.indexOf(inscricao.periodo) === -1) throw new Error('Período inválido.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inscricao.email)) throw new Error('E-mail inválido.');
  if (['Sim', 'Não'].indexOf(inscricao.experiencia) === -1) throw new Error('Resposta sobre experiência inválida.');
  return inscricao;
}

/**
 * Impede que um texto começado por =, +, - ou @ seja lido como fórmula pela
 * planilha, o que abriria espaço para abuso.
 */
function comoTexto(valor) {
  return /^[=+\-@]/.test(valor) ? "'" + valor : valor;
}

/** Grava a linha. A trava evita que dois envios simultâneos se atropelem. */
function gravar(i) {
  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheetByName(NOME_ABA) || planilha.insertSheet(NOME_ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHO);
      aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
      aba.setFrozenRows(1);
    }
    aba.appendRow([
      new Date(), comoTexto(i.nome), comoTexto(i.curso), i.periodo, i.email, i.experiencia, comoTexto(i.origem),
    ]);
    return aba.getLastRow() - 1;
  } finally {
    trava.releaseLock();
  }
}

/** Envia o aviso. Responder o e-mail já abre uma resposta para a pessoa inscrita. */
function avisar(i, total) {
  const corpo = [
    'Nova inscrição de interesse na Liga de IA e Ciência de Dados do LACOP.',
    '',
    'Nome: ' + i.nome,
    'Curso: ' + i.curso,
    'Período: ' + i.periodo,
    'E-mail: ' + i.email,
    'Conhecimento prático com IA ou Ciência de Dados: ' + i.experiencia,
    '',
    'Total de inscrições na planilha: ' + total,
    'Planilha: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].join('\n');

  MailApp.sendEmail({
    to: EMAIL_DESTINO,
    subject: 'Liga de IA: nova inscrição de ' + i.nome,
    body: corpo,
    replyTo: i.email,
    name: 'Liga de IA do LACOP',
  });
}

function resposta(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}
