import { useCallback, useEffect, useState } from 'react';
import { Compass, Database, ListChecks, BookOpen, PlayCircle } from 'lucide-react';

import Cabecalho from './components/Cabecalho.jsx';
import Rodape from './components/Rodape.jsx';
import Sobre from './pages/Sobre.jsx';
import FontesDeDados from './pages/FontesDeDados.jsx';
import ComoRealizar from './pages/ComoRealizar.jsx';
import Blog from './pages/Blog.jsx';
import Videos from './pages/Videos.jsx';

/** Abas da navegação principal, na ordem em que aparecem no cabeçalho. */
const ABAS = [
  { id: 'sobre', rotulo: 'Sobre', icone: Compass },
  { id: 'dados', rotulo: 'Fontes de Dados', icone: Database },
  { id: 'projeto', rotulo: 'Como Realizar o Projeto', icone: ListChecks },
  { id: 'blog', rotulo: 'Blog', icone: BookOpen },
  { id: 'videos', rotulo: 'Vídeos', icone: PlayCircle },
];

const IDS = ABAS.map((a) => a.id);

/**
 * Lê o endereço atual no formato #/aba/parametro.
 * O parâmetro é usado apenas pelo blog, para abrir um artigo específico.
 */
function lerRota() {
  const bruto = window.location.hash.replace(/^#\/?/, '');
  const [aba, parametro] = bruto.split('/');
  return { aba: IDS.includes(aba) ? aba : 'sobre', parametro: parametro || null };
}

/**
 * Define o tema inicial. O padrão da plataforma é o tema claro, que é a
 * identidade principal. O modo escuro existe como alternativa e só entra
 * quando a pessoa escolhe pelo botão do cabeçalho.
 */
function temaInicial() {
  const salvo = localStorage.getItem('tema-workshop');
  return salvo === 'escuro' ? 'escuro' : 'claro';
}

export default function App() {
  const [rota, setRota] = useState(lerRota);
  const [tema, setTema] = useState(temaInicial);

  // Mantém o estado sincronizado com o botão de voltar do navegador.
  useEffect(() => {
    const aoMudar = () => setRota(lerRota());
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem('tema-workshop', tema);
  }, [tema]);

  const navegar = useCallback((aba, parametro) => {
    window.location.hash = parametro ? `/${aba}/${parametro}` : `/${aba}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const alternarTema = () => setTema((t) => (t === 'escuro' ? 'claro' : 'escuro'));

  const paginas = {
    sobre: <Sobre navegar={navegar} />,
    dados: <FontesDeDados navegar={navegar} />,
    projeto: <ComoRealizar navegar={navegar} />,
    blog: <Blog navegar={navegar} slug={rota.parametro} />,
    videos: <Videos navegar={navegar} />,
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
