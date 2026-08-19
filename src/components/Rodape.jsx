import { MapPin, Mail, GraduationCap, ArrowUpRight } from 'lucide-react';
import Brasao from './Brasao.jsx';

/**
 * Rodapé institucional. Mantém a menção ao LACOP e à UFF visível em
 * todas as páginas, junto com atalhos para as seções principais.
 */
export default function Rodape({ abas, aoNavegar }) {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-grade">
          <div>
            <div className="rodape-marca">
              {/* O arquivo oficial vai em public/assets/brasao-uff.png. */}
              <Brasao altura={62} className="" />
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontFamily: 'var(--fonte-titulo)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  LACOP
                </strong>
                <span style={{ fontSize: '0.86rem', color: '#a8b3c2' }}>
                  Laboratório de Comunicações Ópticas
                </span>
              </div>
            </div>
            <p>
              Material produzido para o workshop de inteligência artificial aplicada a dados de
              sensores, com foco em previsibilidade e eficiência em projetos de engenharia.
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <GraduationCap size={16} /> Universidade Federal Fluminense
            </p>
          </div>

          <div>
            <h4>Navegação</h4>
            <ul>
              {abas.map(({ id, rotulo }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => aoNavegar(id)}
                    style={{
                      background: 'none',
                      border: 0,
                      padding: 0,
                      color: 'inherit',
                      cursor: 'pointer',
                      font: 'inherit',
                    }}
                  >
                    {rotulo}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contato</h4>
            <ul>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span>Escola de Engenharia, Niterói, Rio de Janeiro</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <Mail size={16} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                {/* Substitua pelo endereço oficial do laboratório. */}
                <span>contato@lacop.uff.br</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <ArrowUpRight size={16} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <a href="https://www.uff.br" target="_blank" rel="noreferrer">
                  uff.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape-base">
          <span>LACOP · UFF · {ano}. Conteúdo aberto para uso em sala de aula.</span>
          <span>Bases de dados sintéticas, geradas para fins didáticos.</span>
        </div>
      </div>
    </footer>
  );
}
