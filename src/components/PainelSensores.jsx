import { useEffect, useState } from 'react';
import { Thermometer, Vibrate, Wind, Zap } from 'lucide-react';

/**
 * Painel decorativo do topo da página inicial.
 * As leituras são simuladas no navegador apenas para dar movimento ao
 * bloco. Nenhum dado real de sensor trafega aqui.
 */
const SENSORES = [
  { rotulo: 'Temperatura da sala', unidade: '°C', base: 24.3, faixa: 1.6, casas: 1, icone: Thermometer },
  { rotulo: 'Vibração do motor', unidade: 'mm/s', base: 2.4, faixa: 0.9, casas: 2, icone: Vibrate },
  { rotulo: 'CO2 no laboratório', unidade: 'ppm', base: 780, faixa: 90, casas: 0, icone: Wind },
  { rotulo: 'Consumo instantâneo', unidade: 'kW', base: 41.5, faixa: 6, casas: 1, icone: Zap },
];

const sortear = (base, faixa) => base + (Math.random() - 0.5) * faixa;

export default function PainelSensores() {
  const [valores, setValores] = useState(() => SENSORES.map((s) => sortear(s.base, s.faixa)));
  const [barras, setBarras] = useState(() => Array.from({ length: 22 }, () => 20 + Math.random() * 80));

  useEffect(() => {
    const relogio = setInterval(() => {
      setValores(SENSORES.map((s) => sortear(s.base, s.faixa)));
      setBarras((antigas) => [...antigas.slice(1), 20 + Math.random() * 80]);
    }, 2200);
    return () => clearInterval(relogio);
  }, []);

  return (
    <div className="painel-sensores flutua" aria-hidden="true">
      <div className="painel-topo">
        <span>Leituras do laboratório</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          <i className="led" /> ao vivo
        </span>
      </div>

      {SENSORES.map((sensor, i) => {
        const Icone = sensor.icone;
        return (
          <div className="linha-sensor" key={sensor.rotulo}>
            <span className="icone-sensor"><Icone size={17} /></span>
            <span className="rotulo">{sensor.rotulo}</span>
            <span className="valor">
              {valores[i].toFixed(sensor.casas)} {sensor.unidade}
            </span>
          </div>
        );
      })}

      <div style={{ marginTop: '1.1rem', position: 'relative', zIndex: 1 }}>
        <div className="mini-grafico">
          {barras.map((altura, i) => (
            <i key={i} style={{ height: `${altura}%` }} />
          ))}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#7fa7d6', marginTop: '0.5rem', letterSpacing: '0.06em' }}>
          JANELA DE AMOSTRAGEM · 22 LEITURAS
        </div>
      </div>
    </div>
  );
}
