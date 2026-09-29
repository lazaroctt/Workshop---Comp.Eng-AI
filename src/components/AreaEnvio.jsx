import { useRef, useState } from 'react';
import { Upload, FileJson } from 'lucide-react';
import { cx } from '../lib/uteis.js';

const LIMITE_MB = 5;

/**
 * Área que recebe o resultado_projeto.json por arrasto ou por seleção.
 * A leitura é feita pelo navegador, com a API de arquivos, e o conteúdo
 * segue direto para a página: nenhuma requisição sai do computador.
 */
export default function AreaEnvio({ aoLer, aoFalhar }) {
  const entrada = useRef(null);
  const [arrastando, setArrastando] = useState(false);

  const processar = async (arquivo) => {
    if (!arquivo) return;

    if (arquivo.size > LIMITE_MB * 1024 * 1024) {
      aoFalhar({
        titulo: 'O arquivo é grande demais para um resultado de projeto.',
        dicas: [
          `O limite aqui é de ${LIMITE_MB} MB, e um resultado típico não passa de alguns kilobytes.`,
          'Se o seu arquivo guarda milhares de amostras, salve apenas uma parte delas no campo "amostras".',
        ],
      });
      return;
    }

    if (!/\.json$/i.test(arquivo.name) && arquivo.type !== 'application/json') {
      aoFalhar({
        titulo: 'A página espera um arquivo .json.',
        dicas: [
          `O arquivo escolhido foi "${arquivo.name}".`,
          'No Colab, o arquivo aparece no painel de arquivos à esquerda, com o nome resultado_projeto.json.',
        ],
      });
      return;
    }

    try {
      aoLer(await arquivo.text(), arquivo.name);
    } catch {
      aoFalhar({
        titulo: 'Não foi possível ler o arquivo.',
        dicas: [
          'Baixe o arquivo de novo e tente outra vez.',
          'Arquivos dentro de pastas sincronizadas às vezes ficam indisponíveis por alguns segundos.',
        ],
      });
    }
  };

  const aoSoltar = (evento) => {
    evento.preventDefault();
    setArrastando(false);
    processar(evento.dataTransfer.files?.[0]);
  };

  const abrirSeletor = () => entrada.current?.click();

  return (
    <div
      className={cx('area-envio', arrastando && 'arrastando')}
      onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
      onDragLeave={() => setArrastando(false)}
      onDrop={aoSoltar}
      onClick={abrirSeletor}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirSeletor(); } }}
      role="button"
      tabIndex={0}
      aria-label="Enviar o arquivo resultado_projeto.json"
    >
      <span className="area-envio-icone" aria-hidden="true">
        {arrastando ? <FileJson size={26} /> : <Upload size={26} />}
      </span>
      <strong>{arrastando ? 'Solte o arquivo aqui' : 'Arraste o resultado_projeto.json'}</strong>
      <p>
        ou clique para escolher o arquivo no seu computador.
      </p>
      <span className="area-envio-nota">
        A leitura acontece no seu navegador. O arquivo não é enviado para nenhum servidor.
      </span>

      <input
        ref={entrada}
        type="file"
        accept=".json,application/json"
        className="campo-arquivo"
        onChange={(e) => { processar(e.target.files?.[0]); e.target.value = ''; }}
      />
    </div>
  );
}
