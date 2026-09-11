import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Marca from './Marca.jsx';

/**
 * Cabeçalho fixo com a identidade institucional, a navegação em abas
 * e o seletor de tema. Em telas estreitas as abas viram um menu vertical.
 */
export default function Cabecalho({ abas, abaAtiva, aoNavegar, tema, alternarTema }) {
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu ao trocar de aba, evitando que ele fique aberto na navegação.
  useEffect(() => setMenuAberto(false), [abaAtiva]);

  const irPara = (id) => {
    aoNavegar(id);
    setMenuAberto(false);
  };

  return (
    <header className="cabecalho">
      <div className="container">
        <div className="cabecalho-interno">
          <Marca aoClicar={() => irPara('inicio')} />

          <nav className="nav-abas" aria-label="Navegação principal">
            {abas.map(({ id, rotulo, rotuloCurto, icone: Icone }) => (
              <button
                key={id}
                type="button"
                className={`aba ${abaAtiva === id ? 'ativa' : ''}`}
                onClick={() => irPara(id)}
                aria-current={abaAtiva === id ? 'page' : undefined}
                title={rotuloCurto ? rotulo : undefined}
              >
                <Icone size={16} />
                {rotuloCurto ?? rotulo}
              </button>
            ))}
          </nav>

          <div className="acoes-cabecalho">
            <button
              type="button"
              className="btn-icone"
              onClick={alternarTema}
              aria-label={tema === 'escuro' ? 'Usar tema claro' : 'Usar tema escuro'}
              title={tema === 'escuro' ? 'Tema claro' : 'Tema escuro'}
            >
              {tema === 'escuro' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="btn-icone botao-menu"
              onClick={() => setMenuAberto((v) => !v)}
              aria-expanded={menuAberto}
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuAberto ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <nav className={`menu-mobile ${menuAberto ? 'aberto' : ''}`} aria-label="Navegação em telas pequenas">
          {abas.map(({ id, rotulo, icone: Icone }) => (
            <button
              key={id}
              type="button"
              className={`aba ${abaAtiva === id ? 'ativa' : ''}`}
              onClick={() => irPara(id)}
            >
              <Icone size={18} />
              {rotulo}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
