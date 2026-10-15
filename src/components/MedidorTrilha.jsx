import { obrigatorios, rotuloModulo, numeroModulo } from '../data/modulos.js';
import { situacao, ROTULO_SITUACAO } from '../lib/progresso.js';
import { cx } from '../lib/uteis.js';

/**
 * Indicador geral de progresso: um segmento por módulo obrigatório, preenchido quando o
 * módulo está concluído e contornado em dourado quando é o próximo a fazer.
 * Cada segmento é um atalho para a página do módulo.
 */
export default function MedidorTrilha({ progresso, compacto = false }) {
  const { feitos, total } = progresso;

  return (
    <div className={cx('medidor', compacto && 'medidor-compacto')}>
      <p className="medidor-contagem">
        <strong>{feitos}</strong> de {total} módulos concluídos
      </p>
      <ol className="medidor-segmentos">
        {obrigatorios.map((m) => {
          const estado = situacao(m.slug, progresso);
          return (
            <li key={m.slug}>
              <a
                href={`#/trilha/${m.slug}`}
                className={cx('medidor-segmento', `estado-${estado}`)}
                aria-label={`${rotuloModulo(m)}: ${m.titulo} (${ROTULO_SITUACAO[estado]})`}
                title={`${numeroModulo(m)}. ${m.titulo}`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
