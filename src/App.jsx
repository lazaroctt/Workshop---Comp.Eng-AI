import { useCallback, useEffect, useState } from 'react';
import { House, Route, BookOpen, Database, FlaskConical, Lightbulb, Users } from 'lucide-react';

import Abertura from './components/Abertura.jsx';
import Cabecalho from './components/Cabecalho.jsx';
import Rodape from './components/Rodape.jsx';
import Inicio from './pages/Inicio.jsx';
import Trilha from './pages/Trilha.jsx';
import Artigos from './pages/Artigos.jsx';
import BasesDeDados from './pages/BasesDeDados.jsx';
import MeuProjeto from './pages/MeuProjeto.jsx';
import Dicas from './pages/Dicas.jsx';
import LigaIA from './pages/LigaIA.jsx';

/** Abas da navegação principal, na ordem em que aparecem no cabeçalho. */
const ABAS = [
  { id: 'inicio', rotulo: 'Início', icone: House },
  { id: 'trilha', rotulo: 'Trilha', icone: Route },
  { id: 'artigos', rotulo: 'Artigos', icone: BookOpen },
  { id: 'bases', rotulo: 'Bases de dados', rotuloCurto: 'Bases', icone: Database },
  { id: 'meu-projeto', rotulo: 'Meu Projeto', icone: FlaskConical },
  { id: 'dicas', rotulo: 'Dicas e vídeos', rotuloCurto: 'Dicas', icone: Lightbulb },
  // O rótulo curto aparece só na barra do desktop, onde o espaço é disputado.
  { id: 'liga', rotulo: 'Liga de IA Acadêmica', rotuloCurto: 'Liga de IA', icone: Users },
];

const IDS = ABAS.map((a) => a.id);

/**
 * Endereços da versão anterior da plataforma, redirecionados para o conteúdo
 * equivalente para que links já compartilhados continuem funcionando.
 * A chave projeto era a antiga aba de roteiro, e não a aba Meu Projeto,
 * que responde em #/meu-projeto.
 */
const ROTAS_ANTIGAS = {
  sobre: ['inicio', null],
  blog: ['artigos', null],
  projeto: ['artigos', 'seu-primeiro-modelo'],
  dados: ['bases', null],
  videos: ['dicas', null],
};

/**
 * Lê o endereço atual no formato #/aba/parametro.
 * Nos artigos, o parâmetro abre um texto específico; na trilha, abre a
 * página de um módulo, como #/trilha/leitura-critica; no Início, rola até
 * uma seção da página, como #/inicio/interesse.
 */
function lerRota() {
  const bruto = window.location.hash.replace(/^#\/?/, '');
  let [aba, parametro] = bruto.split('/');

  if (ROTAS_ANTIGAS[aba]) {
    const [novaAba, padrao] = ROTAS_ANTIGAS[aba];
    parametro = parametro || padrao;
    aba = novaAba;
  }

  return { aba: IDS.includes(aba) ? aba : 'inicio', parametro: parametro || null };
}

/**
 * A tela de entrada aparece uma vez por visita: depois do clique, a sessão
 * do navegador lembra que a pessoa já entrou e a navegação entre abas segue
 * direto. Sem armazenamento, a tela aparece e o botão continua liberando o
 * site normalmente.
 */
const CHAVE_ENTRADA = 'workshop-entrou';

function jaEntrou() {
  try {
    return sessionStorage.getItem(CHAVE_ENTRADA) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [entrou, setEntrou] = useState(jaEntrou);

  // Mantém o estado sincronizado com o botão de voltar do navegador e
  // leva a leitura para o topo sempre que o endereço muda.
  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, []);

  // Troca um endereço antigo pelo novo na barra do navegador, sem recarregar.
  useEffect(() => {
    const canonico = `#/${rota.aba}${rota.parametro ? `/${rota.parametro}` : ''}`;
    const atual = window.location.hash;
    if (atual && atual !== canonico && ROTAS_ANTIGAS[atual.replace(/^#\/?/, '').split('/')[0]]) {
      window.history.replaceState(null, '', canonico);
    }
  }, [rota]);

  // Enquanto a tela de entrada está aberta, a página de trás não rola.
  useEffect(() => {
    if (entrou) return undefined;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [entrou]);

  const entrar = useCallback(() => {
    try {
      sessionStorage.setItem(CHAVE_ENTRADA, '1');
    } catch {
      /* Sem armazenamento, a tela volta a aparecer na próxima visita. */
    }
    setEntrou(true);
  }, []);

  const navegar = useCallback((aba, parametro) => {
    window.location.hash = parametro ? `/${aba}/${parametro}` : `/${aba}`;
  }, []);

  const paginas = {
    inicio: <Inicio navegar={navegar} secao={rota.parametro} />,
    trilha: <Trilha navegar={navegar} slug={rota.parametro} />,
    artigos: <Artigos navegar={navegar} slug={rota.parametro} />,
    bases: <BasesDeDados navegar={navegar} />,
    'meu-projeto': <MeuProjeto />,
    dicas: <Dicas />,
    liga: <LigaIA navegar={navegar} />,
  };

  return (
    <>
      {!entrou && <Abertura aoEntrar={entrar} />}

      {/* O site já fica montado por trás da entrada, mas fora do alcance do teclado. */}
      <div inert={!entrou} aria-hidden={!entrou || undefined}>
        <Cabecalho abas={ABAS} abaAtiva={rota.aba} aoNavegar={navegar} />

        <main key={rota.aba + (rota.parametro ?? '')} style={{ animation: 'aparecer 400ms ease' }}>
          {paginas[rota.aba]}
        </main>

        <Rodape abas={ABAS} aoNavegar={navegar} />
      </div>
    </>
  );
}
