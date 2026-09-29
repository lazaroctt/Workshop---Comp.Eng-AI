import { useState } from 'react';
import { FileDown, LoaderCircle } from 'lucide-react';

import Aviso from './Aviso.jsx';

/**
 * Campos de identificação e botão que monta o PDF do resultado.
 * O nome e o título são digitados pelo aluno, porque não vêm no JSON.
 */
export default function ExportarPdf({ dados }) {
  const [aluno, setAluno] = useState('');
  const [titulo, setTitulo] = useState('');
  const [gerando, setGerando] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [faltando, setFaltando] = useState([]);

  const enviar = async (evento) => {
    evento.preventDefault();

    const vazios = [];
    if (!aluno.trim()) vazios.push('aluno');
    if (!titulo.trim()) vazios.push('titulo');
    setFaltando(vazios);

    if (vazios.length > 0) {
      setAviso({
        tom: 'atencao',
        titulo: 'Falta preencher antes de gerar',
        texto: vazios.length === 2
          ? 'Escreva seu nome e o título do projeto. Os dois aparecem no alto do documento.'
          : vazios[0] === 'aluno'
            ? 'Escreva seu nome, que aparece logo abaixo do título no documento.'
            : 'Escreva o título do projeto, que aparece em destaque no alto do documento.',
      });
      return;
    }

    setGerando(true);
    setAviso(null);

    try {
      // O módulo do PDF e a biblioteca que ele usa só são baixados aqui,
      // no clique, para não pesar o carregamento das outras abas.
      const { gerarPdfResultado } = await import('../lib/pdf.js');
      const arquivo = await gerarPdfResultado({ dados, aluno, titulo });
      setAviso({
        tom: 'ok',
        titulo: 'PDF gerado',
        texto: `O arquivo ${arquivo} foi salvo na pasta de downloads do seu navegador.`,
      });
    } catch {
      setAviso({
        tom: 'atencao',
        titulo: 'Não foi possível gerar o PDF agora',
        texto: 'Tente de novo. Se o problema continuar, recarregue a página, envie o arquivo outra vez e repita a geração.',
      });
    } finally {
      setGerando(false);
    }
  };

  return (
    <form className="formulario exportar-pdf" onSubmit={enviar} noValidate>
      <h3>Leve este resultado com você</h3>
      <p className="exportar-texto">
        Preencha os dois campos e baixe um PDF com o painel acima, pronto para guardar, anexar a um
        portfólio ou entregar ao professor.
      </p>

      <div className="campos-pdf">
        <label className="campo">
          <span>Seu nome</span>
          <input
            className="entrada"
            type="text"
            value={aluno}
            maxLength={80}
            placeholder="Nome completo"
            aria-invalid={faltando.includes('aluno')}
            onChange={(e) => setAluno(e.target.value)}
          />
        </label>

        <label className="campo">
          <span>Título do projeto</span>
          <input
            className="entrada"
            type="text"
            value={titulo}
            maxLength={90}
            placeholder="Previsão de conforto térmico na sala"
            aria-invalid={faltando.includes('titulo')}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primario" disabled={gerando}>
        {gerando
          ? <><LoaderCircle size={16} className="girando" /> Montando o arquivo</>
          : <><FileDown size={16} /> Gerar PDF do meu projeto</>}
      </button>

      {aviso && (
        <div className="exportar-aviso">
          <Aviso tipo={aviso.tom} titulo={aviso.titulo}>
            <p>{aviso.texto}</p>
          </Aviso>
        </div>
      )}

      <p className="form-nota">
        O documento é montado no seu navegador, com os dados que você digitou aqui. Nada é enviado
        para fora do computador.
      </p>
    </form>
  );
}
