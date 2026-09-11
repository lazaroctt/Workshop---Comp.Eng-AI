import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ENDPOINT_INTERESSE, periodos } from '../data/liga.js';

const VAZIO = { nome: '', curso: '', periodo: '', email: '', experiencia: '', site: '' };
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Confere os campos e devolve as mensagens de erro de cada um. */
function validar(dados) {
  const erros = {};
  if (dados.nome.trim().length < 3) erros.nome = 'Informe seu nome.';
  if (dados.curso.trim().length < 2) erros.curso = 'Informe seu curso.';
  if (!dados.periodo) erros.periodo = 'Escolha o período.';
  if (!EMAIL_VALIDO.test(dados.email.trim())) erros.email = 'Informe um e-mail válido.';
  if (!dados.experiencia) erros.experiencia = 'Escolha sim ou não.';
  return erros;
}

/**
 * Envia as respostas para o endereço configurado em src/data/liga.js.
 * O Apps Script do Google não devolve cabeçalhos de CORS, então nesse caso o
 * envio segue em modo no-cors, sem leitura da resposta.
 */
async function enviar(dados) {
  const destino = ENDPOINT_INTERESSE.trim();
  const corpo = JSON.stringify({
    nome: dados.nome.trim(),
    curso: dados.curso.trim(),
    periodo: dados.periodo,
    email: dados.email.trim(),
    experiencia_ia_ou_dados: dados.experiencia,
    origem: 'Plataforma Workshop IA e Sensores',
    enviado_em: new Date().toISOString(),
  });

  if (destino.includes('script.google.com')) {
    await fetch(destino, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: corpo,
    });
    return;
  }

  const resposta = await fetch(destino, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: corpo,
  });
  if (!resposta.ok) throw new Error(`Falha no envio: ${resposta.status}`);
}

/** Formulário de interesse na Liga de IA e Ciência de Dados do LACOP. */
export default function FormularioInteresse() {
  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [estado, setEstado] = useState('pronto'); // pronto, enviando, enviado, falhou
  const configurado = ENDPOINT_INTERESSE.trim() !== '';

  const alterar = (campo) => (e) => {
    setDados((atual) => ({ ...atual, [campo]: e.target.value }));
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const aoEnviar = async (e) => {
    e.preventDefault();
    // Campo invisível para pessoas; se vier preenchido, é robô de spam.
    if (dados.site) {
      setEstado('enviado');
      return;
    }
    const encontrados = validar(dados);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setEstado('enviando');
    try {
      await enviar(dados);
      setEstado('enviado');
      setDados(VAZIO);
    } catch {
      setEstado('falhou');
    }
  };

  if (estado === 'enviado') {
    return (
      <div className="formulario formulario-concluido" role="status">
        <CheckCircle2 size={28} />
        <h3>Interesse registrado</h3>
        <p>Obrigado! Vamos entrar em contato pelo e-mail informado quando as atividades da Liga começarem.</p>
        <button type="button" className="btn btn-secundario btn-pequeno" onClick={() => setEstado('pronto')}>
          Enviar outra resposta
        </button>
      </div>
    );
  }

  const campo = (id, rotulo, controle) => (
    <div className="campo">
      <label htmlFor={`interesse-${id}`}>{rotulo}</label>
      {controle}
      {erros[id] && <span className="campo-erro" id={`erro-${id}`}>{erros[id]}</span>}
    </div>
  );

  const atributos = (id) => ({
    id: `interesse-${id}`,
    name: id,
    value: dados[id],
    onChange: alterar(id),
    'aria-invalid': erros[id] ? true : undefined,
    'aria-describedby': erros[id] ? `erro-${id}` : undefined,
    className: 'entrada',
  });

  return (
    <form className="formulario" onSubmit={aoEnviar} noValidate>
      <h3>Tenho interesse na Liga</h3>

      {campo('nome', 'Nome', <input type="text" autoComplete="name" {...atributos('nome')} />)}

      <div className="campo-duplo">
        {campo('curso', 'Curso', (
          <input type="text" placeholder="Ex.: Engenharia Elétrica" {...atributos('curso')} />
        ))}
        {campo('periodo', 'Período', (
          <select {...atributos('periodo')}>
            <option value="">Selecione</option>
            {periodos.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        ))}
      </div>

      {campo('email', 'E-mail', <input type="email" autoComplete="email" {...atributos('email')} />)}

      {campo('experiencia', 'Já tem conhecimento prático com IA ou Ciência de Dados?', (
        <select {...atributos('experiencia')}>
          <option value="">Selecione</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      ))}

      {/* Armadilha para robôs: fica fora da tela e fora da navegação por teclado. */}
      <div className="campo-oculto" aria-hidden="true">
        <label htmlFor="interesse-site">Deixe este campo vazio</label>
        <input id="interesse-site" type="text" tabIndex={-1} autoComplete="off" value={dados.site} onChange={alterar('site')} />
      </div>

      {estado === 'falhou' && (
        <p className="form-mensagem erro" role="alert">
          <AlertCircle size={16} /> Não foi possível enviar agora. Confira a conexão e tente de novo.
        </p>
      )}

      {!configurado && (
        <p className="form-mensagem">
          As inscrições abrem em breve.
          {import.meta.env.DEV && (
            <> Placeholder: preencha <code>ENDPOINT_INTERESSE</code> em <code>src/data/liga.js</code>.</>
          )}
        </p>
      )}

      <button type="submit" className="btn btn-primario btn-bloco" disabled={!configurado || estado === 'enviando'}>
        {estado === 'enviando' ? <Loader2 size={17} className="girando" /> : <Send size={17} />}
        {estado === 'enviando' ? 'Enviando' : 'Enviar interesse'}
      </button>

      <p className="form-nota">Os dados servem apenas para o contato sobre a Liga de IA do LACOP.</p>
    </form>
  );
}
