import { useCallback, useEffect, useState } from 'react';
import { House, BookOpen, Database, Lightbulb, Users } from 'lucide-react';

import Cabecalho from './components/Cabecalho.jsx';
import Rodape from './components/Rodape.jsx';
import Inicio from './pages/Inicio.jsx';
import Artigos from './pages/Artigos.jsx';
import BasesDeDados from './pages/BasesDeDados.jsx';
import Dicas from './pages/Dicas.jsx';
import LigaIA from './pages/LigaIA.jsx';

/** Abas da navegação principal, na ordem em que aparecem no cabeçalho. */
const ABAS = [
  { id: 'inicio', rotulo: 'Início', icone: House },
  { id: 'artigos', rotulo: 'Artigos', icone: BookOpen },
  { id: 'bases', rotulo: 'Bases de dados', icone: Database },
  { id: 'dicas', rotulo: 'Dicas e vídeos', icone: Lightbulb },
  // O rótulo curto aparece só na barra do desktop, onde o espaço é disputado.
  { id: 'liga', rotulo: 'Liga de IA Acadêmica', rotuloCurto: 'Liga de IA', icone: Users },
];

const IDS = ABAS.map((a) => a.id);

/**
 * Endereços da versão anterior da plataforma, redirecionados para o conteúdo
 * equivalente para que links já compartilhados continuem funcionando.
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
 * Nos artigos, o parâmetro abre um texto específico; no Início, rola até
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
 * Define o tema inicial. O padrão da plataforma é o tema claro, que é a
 * identidade principal. O modo escuro existe como alternativa e só entra
 * quando a pessoa escolhe pelo botão do cabeçalho.
 */
function temaInicial() {
  try {
    return localStorage.getItem('tema-workshop') === 'escuro' ? 'escuro' : 'claro';
  } catch {
    return 'claro';
  }
}

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [tema, setTema] = useState(temaInicial);

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

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try {
      localStorage.setItem('tema-workshop', tema);
    } catch {
      /* Sem armazenamento, o tema vale apenas para esta visita. */
    }
  }, [tema]);

  const navegar = useCallback((aba, parametro) => {
    window.location.hash = parametro ? `/${aba}/${parametro}` : `/${aba}`;
  }, []);

  const alternarTema = () => setTema((t) => (t === 'escuro' ? 'claro' : 'escuro'));

  const paginas = {
    inicio: <Inicio navegar={navegar} secao={rota.parametro} />,
    artigos: <Artigos navegar={navegar} slug={rota.parametro} />,
    bases: <BasesDeDados navegar={navegar} />,
    dicas: <Dicas />,
    liga: <LigaIA navegar={navegar} />,
  };

  return (
    <>
      <Cabecalho
        abas={ABAS}
        abaAtiva={rota.aba}
        aoNavegar={navegar}
        tema={tema}
        alternarTema={alternarTema}
      />

      <main key={rota.aba + (rota.parametro ?? '')} style={{ animation: 'aparecer 400ms ease' }}>
        {paginas[rota.aba]}
      </main>

      <Rodape abas={ABAS} aoNavegar={navegar} />
    </>
  );
}
