/**
 * Gerador das bases sintéticas do workshop (LACOP / UFF).
 *
 * Roda apenas com Node, sem dependencia externa:
 *     npm run datasets
 *
 * Cada base sai em public/datasets/*.csv e fica pronta para download direto
 * pela plataforma. O gerador usa semente fixa, entao rodar de novo produz
 * exatamente os mesmos arquivos.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DESTINO = join(RAIZ, 'public', 'datasets');
mkdirSync(DESTINO, { recursive: true });

/* ------------------------------------------------------------------ */
/* Utilidades numericas                                                */
/* ------------------------------------------------------------------ */

/** Gerador pseudoaleatorio com semente (mulberry32). */
function criarRandom(semente) {
  let a = semente >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ruido gaussiano pelo metodo de Box-Muller. */
function gauss(rnd, media = 0, desvio = 1) {
  const u = Math.max(rnd(), 1e-9);
  const v = Math.max(rnd(), 1e-9);
  return media + desvio * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor));
const arred = (valor, casas = 2) => Number(valor.toFixed(casas));
const sorteio = (rnd, lista) => lista[Math.floor(rnd() * lista.length)];

/** Data inicial comum a todas as bases, para os cenarios conversarem entre si. */
function carimbo(inicio, minutosDepois) {
  const d = new Date(inicio.getTime() + minutosDepois * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

const DIAS = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

/** Escreve o CSV e devolve um resumo para o log. */
function salvar(nomeArquivo, colunas, linhas) {
  const conteudo = [colunas.join(','), ...linhas.map((l) => l.join(','))].join('\n') + '\n';
  writeFileSync(join(DESTINO, nomeArquivo), conteudo, 'utf8');
  return { nomeArquivo, linhas: linhas.length, colunas: colunas.length, bytes: conteudo.length };
}

const resumos = [];

/* ------------------------------------------------------------------ */
/* 1. Temperatura e umidade de ambiente                                */
/* ------------------------------------------------------------------ */

function baseAmbiente() {
  const rnd = criarRandom(101);
  const inicio = new Date(2025, 2, 3, 0, 0, 0); // segunda-feira
  const colunas = [
    'timestamp', 'sala', 'temperatura_c', 'umidade_pct', 'luminosidade_lux',
    'ar_condicionado', 'pessoas_estimadas', 'conforto',
  ];
  const linhas = [];
  const salas = ['lab_optica', 'sala_aula_302'];

  salas.forEach((sala, indiceSala) => {
    for (let passo = 0; passo < 288; passo++) {
      const minutos = passo * 15;
      const hora = (Math.floor(minutos / 60)) % 24;
      const dia = Math.floor(minutos / 1440);
      const diaSemana = (inicio.getDay() + dia) % 7;
      const fimDeSemana = diaSemana === 0 || diaSemana === 6;

      // Ciclo diario: minimo de madrugada, pico no meio da tarde.
      const ciclo = Math.sin(((hora - 6) / 24) * 2 * Math.PI);
      const expediente = !fimDeSemana && hora >= 8 && hora <= 18;
      const pessoas = expediente ? Math.max(0, Math.round(gauss(rnd, indiceSala ? 12 : 5, 3))) : 0;

      const arLigado = expediente && ciclo > 0.05 ? 1 : 0;
      let temperatura = 24.6 + 5.4 * ciclo + pessoas * 0.14 - arLigado * 2.1 + gauss(rnd, 0, 0.45);
      temperatura = limitar(temperatura, 17, 35);

      let umidade = 68 - 1.15 * (temperatura - 23.5) + (arLigado ? -6 : 0) + gauss(rnd, 0, 2.2);
      umidade = limitar(umidade, 28, 92);

      const luzNatural = hora >= 6 && hora <= 18 ? 380 * Math.max(0, Math.sin(((hora - 6) / 12) * Math.PI)) : 0;
      const luzArtificial = expediente ? 240 : 0;
      const lux = Math.round(limitar(luzNatural + luzArtificial + gauss(rnd, 0, 25), 0, 900));

      // A sensacao termica leva a umidade em conta, entao o rotulo nao sai
      // direto de uma unica coluna.
      const percebida = temperatura + 0.045 * (umidade - 55) + gauss(rnd, 0, 0.6);
      let conforto = 'confortavel';
      if (percebida < 20.8) conforto = 'frio';
      else if (percebida > 26.4) conforto = 'quente';

      linhas.push([
        carimbo(inicio, minutos), sala, arred(temperatura, 2), arred(umidade, 1),
        lux, arLigado, pessoas, conforto,
      ]);
    }
  });

  resumos.push(salvar('ambiente_temperatura_umidade.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 2. Vibracao e corrente de motor (manutencao preditiva)              */
/* ------------------------------------------------------------------ */

function baseMotor() {
  const rnd = criarRandom(202);
  const inicio = new Date(2025, 2, 3, 6, 0, 0);
  const colunas = [
    'timestamp', 'id_motor', 'rotacao_rpm', 'vibracao_rms_mm_s', 'vibracao_pico_mm_s',
    'corrente_a', 'tensao_v', 'temperatura_mancal_c', 'horas_operacao', 'falha_em_24h',
  ];
  const linhas = [];
  const motores = ['M-01', 'M-02', 'M-03', 'M-04'];

  motores.forEach((id, i) => {
    // Cada motor tem um instante proprio em que a degradacao acelera.
    const degrada = i < 3;
    const inicioDegradacao = 90 + Math.floor(rnd() * 40);
    let horas = 3200 + i * 850;

    for (let leitura = 0; leitura < 150; leitura++) {
      horas += 1;
      const avanco = degrada && leitura >= inicioDegradacao
        ? (leitura - inicioDegradacao) / (150 - inicioDegradacao)
        : 0;
      const severidade = Math.pow(avanco, 1.6);

      const rpm = Math.round(limitar(1760 - severidade * 55 + gauss(rnd, 0, 6), 1650, 1800));
      const rms = limitar(1.35 + severidade * 5.4 + gauss(rnd, 0, 0.18), 0.6, 9);
      const pico = limitar(rms * (2.6 + rnd() * 0.7) + gauss(rnd, 0, 0.3), 1, 26);
      const corrente = limitar(11.4 + severidade * 4.1 + gauss(rnd, 0, 0.25), 8, 22);
      const tensao = arred(limitar(gauss(rnd, 380, 3.4), 360, 400), 1);
      const mancal = limitar(52 + severidade * 26 + gauss(rnd, 0, 1.4), 40, 96);

      // Rotulo: falha registrada nas ultimas 24 leituras antes do fim do ciclo.
      const falha = degrada && leitura >= 150 - 24 && avanco > 0.55 ? 1 : 0;

      linhas.push([
        carimbo(inicio, leitura * 60 + i * 5), id, rpm, arred(rms, 3), arred(pico, 3),
        arred(corrente, 2), tensao, arred(mancal, 1), horas, falha,
      ]);
    }
  });

  resumos.push(salvar('motor_vibracao_corrente.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 3. Consumo de energia por hora                                      */
/* ------------------------------------------------------------------ */

function baseEnergia() {
  const rnd = criarRandom(303);
  const inicio = new Date(2025, 2, 1, 0, 0, 0);
  const colunas = [
    'timestamp', 'hora', 'dia_semana', 'fim_de_semana', 'feriado',
    'temperatura_externa_c', 'umidade_externa_pct', 'ocupacao_predio', 'tarifa_ponta', 'consumo_kwh',
  ];
  const linhas = [];
  const feriados = new Set([18, 19]); // dois dias de recesso no meio do mes

  for (let h = 0; h < 720; h++) {
    const dia = Math.floor(h / 24);
    const hora = h % 24;
    const diaSemana = (inicio.getDay() + dia) % 7;
    const fimDeSemana = diaSemana === 0 || diaSemana === 6 ? 1 : 0;
    const feriado = feriados.has(dia) ? 1 : 0;
    const util = !fimDeSemana && !feriado;

    const tempExterna = limitar(
      26 + 5.5 * Math.sin(((hora - 9) / 24) * 2 * Math.PI) + Math.sin(dia / 4) * 1.8 + gauss(rnd, 0, 0.8),
      16, 39,
    );

    let ocupacao = 0;
    if (util && hora >= 7 && hora <= 20) {
      ocupacao = Math.round(limitar(90 * Math.sin(((hora - 6) / 15) * Math.PI) + gauss(rnd, 0, 7), 0, 130));
    } else if (!util && hora >= 9 && hora <= 15) {
      ocupacao = Math.round(limitar(18 + gauss(rnd, 0, 5), 0, 40));
    }

    const umidadeExterna = limitar(74 - (tempExterna - 26) * 2.4 + gauss(rnd, 0, 4), 34, 96);
    const tarifaPonta = hora >= 18 && hora <= 20 && !fimDeSemana ? 1 : 0;

    const base = 14;                                   // cargas que nunca desligam
    const clima = Math.max(0, tempExterna - 24) * 1.9; // refrigeracao
    const carga = ocupacao * 0.42;                     // iluminacao, bancadas, computadores
    const consumo = limitar(base + clima + carga + gauss(rnd, 0, 2.1), 8, 150);

    linhas.push([
      carimbo(inicio, h * 60), hora, DIAS[diaSemana], fimDeSemana, feriado,
      arred(tempExterna, 1), arred(umidadeExterna, 1), ocupacao, tarifaPonta, arred(consumo, 2),
    ]);
  }

  resumos.push(salvar('consumo_energia_horario.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 4. Qualidade do ar em ambiente fechado                              */
/* ------------------------------------------------------------------ */

function baseQualidadeAr() {
  const rnd = criarRandom(404);
  const inicio = new Date(2025, 2, 3, 0, 0, 0);
  const colunas = [
    'timestamp', 'ambiente', 'co2_ppm', 'pm2_5_ugm3', 'pm10_ugm3', 'cov_ppb',
    'temperatura_c', 'umidade_pct', 'janela_aberta', 'ventilacao_ligada', 'classe_qualidade',
  ];
  const linhas = [];
  const ambientes = ['sala_aula', 'laboratorio', 'auditorio'];

  ambientes.forEach((ambiente, idx) => {
    let co2 = 430;
    for (let passo = 0; passo < 200; passo++) {
      const minutos = passo * 20;
      const hora = (Math.floor(minutos / 60)) % 24;
      const cheio = hora >= 8 && hora <= 12 || hora >= 14 && hora <= 18;
      const janela = cheio && rnd() > 0.62 ? 1 : 0;
      const ventilacao = cheio && co2 > 1500 ? 1 : 0;

      const entrada = cheio ? 55 + idx * 22 : 5;
      const saida = (janela ? 58 : 12) + (ventilacao ? 42 : 0);
      co2 = limitar(co2 + entrada - saida * ((co2 - 415) / 600) + gauss(rnd, 0, 14), 400, 2400);

      const pm25 = limitar(
        8 + (cheio ? 13 : 2) + (janela ? 9 : 0) + (idx === 1 ? 7 : 0) + gauss(rnd, 0, 3.4), 2, 90,
      );
      const pm10 = limitar(pm25 * (1.7 + rnd() * 0.5) + gauss(rnd, 0, 3), 3, 160);
      const cov = Math.round(limitar(130 + (idx === 1 ? 250 : 0) + (cheio ? 140 : 0) + gauss(rnd, 0, 55), 40, 900));
      const temperatura = limitar(23 + (cheio ? 2.1 : 0) + gauss(rnd, 0, 0.7), 18, 31);
      const umidade = limitar(62 + (janela ? 5 : -3) + gauss(rnd, 0, 3), 30, 88);

      // Indice combinado das tres frentes de poluicao, com uma incerteza de
      // medicao somada para que o rotulo nao seja uma regra exata sobre uma coluna.
      const indice = Math.max((co2 - 400) / 1100, pm25 / 26, cov / 540) + gauss(rnd, 0, 0.08);
      let classe = 'boa';
      if (indice > 1.1) classe = 'ruim';
      else if (indice > 0.82) classe = 'moderada';

      linhas.push([
        carimbo(inicio, minutos), ambiente, Math.round(co2), arred(pm25, 1), arred(pm10, 1),
        cov, arred(temperatura, 1), arred(umidade, 1), janela, ventilacao, classe,
      ]);
    }
  });

  resumos.push(salvar('qualidade_ar_interna.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 5. Reservatorio de agua com vazao                                   */
/* ------------------------------------------------------------------ */

function baseReservatorio() {
  const rnd = criarRandom(505);
  const inicio = new Date(2025, 2, 3, 0, 0, 0);
  const colunas = [
    'timestamp', 'nivel_pct', 'volume_m3', 'vazao_entrada_l_min', 'vazao_saida_l_min',
    'pressao_bar', 'bomba_ligada', 'temperatura_agua_c', 'vazamento_suspeito',
  ];
  const linhas = [];
  const capacidade = 50; // m3
  let nivel = 72;
  let bomba = 0;

  // Duas janelas com perda de agua fora do padrao.
  const janelasVazamento = [[160, 205], [430, 468]];
  const emVazamento = (i) => janelasVazamento.some(([a, b]) => i >= a && i <= b);

  for (let passo = 0; passo < 576; passo++) {
    const minutos = passo * 10;
    const hora = (Math.floor(minutos / 60)) % 24;

    // Demanda maior no comeco da manha e no fim da tarde.
    const perfil = 0.35 + 0.9 * Math.exp(-Math.pow(hora - 8, 2) / 8) + 0.8 * Math.exp(-Math.pow(hora - 18, 2) / 10);
    let saida = limitar(perfil * 42 + gauss(rnd, 0, 3.5), 2, 110);
    const vazamento = emVazamento(passo) ? 1 : 0;
    if (vazamento) saida += 21 + gauss(rnd, 0, 2.5);

    if (nivel < 45) bomba = 1;
    if (nivel > 88) bomba = 0;
    const entrada = bomba ? limitar(gauss(rnd, 95, 4), 70, 115) : limitar(gauss(rnd, 1.2, 0.6), 0, 4);

    const deltaLitros = (entrada - saida) * 10;
    nivel = limitar(nivel + (deltaLitros / 1000) / capacidade * 100, 5, 99);

    const pressao = arred(limitar(0.55 + nivel * 0.021 + (bomba ? 0.35 : 0) + gauss(rnd, 0, 0.03), 0.3, 3.2), 3);
    const tempAgua = arred(limitar(24 + 2.4 * Math.sin(((hora - 10) / 24) * 2 * Math.PI) + gauss(rnd, 0, 0.4), 18, 32), 1);

    linhas.push([
      carimbo(inicio, minutos), arred(nivel, 2), arred((nivel / 100) * capacidade, 3),
      arred(entrada, 2), arred(saida, 2), pressao, bomba, tempAgua, vazamento,
    ]);
  }

  resumos.push(salvar('reservatorio_nivel_vazao.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 6. Ocupacao de sala por sensor de presenca                          */
/* ------------------------------------------------------------------ */

function baseOcupacao() {
  const rnd = criarRandom(606);
  const inicio = new Date(2025, 2, 3, 0, 0, 0);
  const colunas = [
    'timestamp', 'dia_semana', 'hora', 'eventos_pir', 'co2_ppm', 'ruido_db',
    'luminosidade_lux', 'temperatura_c', 'porta_aberta', 'pessoas', 'sala_ocupada',
  ];
  const linhas = [];
  let co2 = 440;

  for (let passo = 0; passo < 672; passo++) {
    const minutos = passo * 15;
    const dia = Math.floor(minutos / 1440);
    const hora = (Math.floor(minutos / 60)) % 24;
    const diaSemana = (inicio.getDay() + dia) % 7;
    const fimDeSemana = diaSemana === 0 || diaSemana === 6;

    // Aulas concentradas em blocos, com intervalos vazios.
    const bloco = (hora >= 8 && hora < 12) || (hora >= 14 && hora < 18) || (hora >= 19 && hora < 21);
    const aula = !fimDeSemana && bloco && rnd() > 0.18;
    const pessoas = aula ? Math.max(1, Math.round(gauss(rnd, 17, 6))) : (rnd() > 0.94 ? 1 : 0);
    const ocupada = pessoas > 0 ? 1 : 0;

    // Gente estudando em silencio dispara pouco o PIR: em parte das janelas
    // ocupadas a contagem de eventos cai para perto de zero.
    const quieto = ocupada && rnd() > 0.85;
    const eventos = ocupada && !quieto
      ? Math.round(limitar(gauss(rnd, 6 + pessoas * 1.5, 4), 1, 90))
      : Math.round(limitar(gauss(rnd, ocupada ? 1.2 : 0.4, 0.9), 0, 4));

    co2 = limitar(co2 + (pessoas * 14) - (co2 - 430) * 0.16 + gauss(rnd, 0, 9), 400, 1900);
    const ruido = limitar(
      34 + (ocupada && !quieto ? 16 + pessoas * 0.35 : 0) + (rnd() > 0.93 ? 9 : 0) + gauss(rnd, 0, 3.2),
      28, 78,
    );
    // A luz nem sempre acompanha a presenca: as vezes fica acesa em sala vazia,
    // as vezes a turma trabalha so com luz natural.
    const luzAcesa = ocupada ? rnd() > 0.12 : rnd() > 0.88;
    const lux = Math.round(limitar(
      (luzAcesa ? 320 : 0) + (hora >= 7 && hora <= 17 ? 120 : 0) + gauss(rnd, 0, 26), 0, 620,
    ));
    const temperatura = arred(limitar(22.4 + pessoas * 0.09 + gauss(rnd, 0, 0.4), 19, 30), 2);
    const porta = ocupada && rnd() > 0.75 ? 1 : 0;

    linhas.push([
      carimbo(inicio, minutos), DIAS[diaSemana], hora, eventos, Math.round(co2),
      arred(ruido, 1), lux, temperatura, porta, pessoas, ocupada,
    ]);
  }

  resumos.push(salvar('ocupacao_sala_presenca.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 7. Sensor ultrassonico de distancia                                 */
/* ------------------------------------------------------------------ */

function baseUltrassonico() {
  const rnd = criarRandom(707);
  const colunas = [
    'id_janela', 'distancia_media_cm', 'distancia_min_cm', 'distancia_max_cm',
    'desvio_padrao_cm', 'variacao_cm_por_s', 'leituras_validas', 'eco_perdido_pct', 'situacao',
  ];
  const linhas = [];
  const situacoes = ['livre', 'objeto_parado', 'aproximando', 'afastando'];

  for (let janela = 1; janela <= 600; janela++) {
    const situacao = sorteio(rnd, situacoes);
    let media; let desvio; let variacao;

    if (situacao === 'livre') {
      media = limitar(gauss(rnd, 178, 14), 120, 220);
      desvio = limitar(Math.abs(gauss(rnd, 1.6, 0.7)), 0.2, 5);
      variacao = gauss(rnd, 0, 0.9);
    } else if (situacao === 'objeto_parado') {
      media = limitar(gauss(rnd, 48, 18), 8, 110);
      desvio = limitar(Math.abs(gauss(rnd, 1.1, 0.5)), 0.1, 4);
      variacao = gauss(rnd, 0, 0.8);
    } else if (situacao === 'aproximando') {
      // Parte das aproximacoes acontece devagar e fica parecida com objeto parado.
      const lento = rnd() > 0.74;
      media = limitar(gauss(rnd, 72, 22), 12, 150);
      desvio = limitar(Math.abs(gauss(rnd, lento ? 3.2 : 9.5, lento ? 1.2 : 2.6)), 0.6, 20);
      variacao = -Math.abs(gauss(rnd, lento ? 4.5 : 21, lento ? 2.2 : 6));
    } else {
      const lento = rnd() > 0.74;
      media = limitar(gauss(rnd, 84, 25), 15, 165);
      desvio = limitar(Math.abs(gauss(rnd, lento ? 3 : 9.1, lento ? 1.1 : 2.4)), 0.6, 20);
      variacao = Math.abs(gauss(rnd, lento ? 4.2 : 19, lento ? 2 : 5.5));
    }

    const min = limitar(media - desvio * 1.9 - Math.abs(gauss(rnd, 1.5, 1)), 2, 400);
    const max = limitar(media + desvio * 1.9 + Math.abs(gauss(rnd, 1.5, 1)), min + 0.5, 420);
    const validas = Math.round(limitar(gauss(rnd, 19, 1.4), 12, 20));
    const perdido = arred(limitar((20 - validas) / 20 * 100 + Math.abs(gauss(rnd, 1.5, 1.2)), 0, 45), 1);

    linhas.push([
      janela, arred(media, 2), arred(min, 2), arred(max, 2), arred(desvio, 3),
      arred(variacao, 2), validas, perdido, situacao,
    ]);
  }

  resumos.push(salvar('ultrassonico_obstaculos.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */
/* 8. Acelerometro MPU-6050: postura e queda                           */
/* ------------------------------------------------------------------ */

function baseAcelerometro() {
  const rnd = criarRandom(808);
  const colunas = [
    'id_janela', 'acel_x_g', 'acel_y_g', 'acel_z_g', 'magnitude_media_g', 'magnitude_desvio_g',
    'giro_x_dps', 'giro_y_dps', 'giro_z_dps', 'giro_rms_dps', 'jerk_max_g_s', 'postura',
  ];
  const linhas = [];
  const posturas = ['em_pe', 'sentado', 'deitado', 'caminhando', 'queda'];
  const pesos = [0.22, 0.22, 0.2, 0.24, 0.12];

  const escolherPostura = () => {
    const p = rnd();
    let soma = 0;
    for (let i = 0; i < posturas.length; i++) {
      soma += pesos[i];
      if (p <= soma) return posturas[i];
    }
    return posturas[posturas.length - 1];
  };

  for (let janela = 1; janela <= 540; janela++) {
    const postura = escolherPostura();
    let ax; let ay; let az; let desvio; let giroRms; let jerk;

    if (postura === 'em_pe') {
      ax = gauss(rnd, 0.02, 0.05); ay = gauss(rnd, 0.98, 0.04); az = gauss(rnd, 0.03, 0.05);
      desvio = Math.abs(gauss(rnd, 0.03, 0.012)); giroRms = Math.abs(gauss(rnd, 3.4, 1.4)); jerk = Math.abs(gauss(rnd, 0.5, 0.2));
    } else if (postura === 'sentado') {
      ax = gauss(rnd, 0.31, 0.07); ay = gauss(rnd, 0.9, 0.06); az = gauss(rnd, 0.05, 0.06);
      desvio = Math.abs(gauss(rnd, 0.028, 0.01)); giroRms = Math.abs(gauss(rnd, 2.6, 1.1)); jerk = Math.abs(gauss(rnd, 0.4, 0.18));
    } else if (postura === 'deitado') {
      ax = gauss(rnd, 0.05, 0.06); ay = gauss(rnd, 0.06, 0.06); az = gauss(rnd, 0.97, 0.05);
      desvio = Math.abs(gauss(rnd, 0.021, 0.009)); giroRms = Math.abs(gauss(rnd, 1.8, 0.9)); jerk = Math.abs(gauss(rnd, 0.3, 0.15));
    } else if (postura === 'caminhando') {
      ax = gauss(rnd, 0.09, 0.16); ay = gauss(rnd, 1.02, 0.19); az = gauss(rnd, 0.12, 0.17);
      desvio = Math.abs(gauss(rnd, 0.24, 0.06)); giroRms = Math.abs(gauss(rnd, 44, 12)); jerk = Math.abs(gauss(rnd, 6.2, 1.8));
    } else {
      // Uma parte das quedas e branda, com impacto fraco, e se confunde com
      // caminhada agitada. E justamente onde um detector real erra.
      const leve = rnd() > 0.7;
      ax = gauss(rnd, 0.4, 0.4); ay = gauss(rnd, 0.35, 0.45); az = gauss(rnd, 0.5, 0.45);
      desvio = Math.abs(gauss(rnd, leve ? 0.36 : 0.85, leve ? 0.12 : 0.25));
      giroRms = Math.abs(gauss(rnd, leve ? 78 : 210, leve ? 26 : 55));
      jerk = Math.abs(gauss(rnd, leve ? 9.5 : 27, leve ? 3 : 7));
    }

    const magnitude = Math.sqrt(ax * ax + ay * ay + az * az);
    const gx = gauss(rnd, 0, giroRms * 0.6);
    const gy = gauss(rnd, 0, giroRms * 0.6);
    const gz = gauss(rnd, 0, giroRms * 0.6);

    linhas.push([
      janela, arred(ax, 4), arred(ay, 4), arred(az, 4), arred(magnitude, 4), arred(desvio, 4),
      arred(gx, 2), arred(gy, 2), arred(gz, 2), arred(giroRms, 2), arred(jerk, 3), postura,
    ]);
  }

  resumos.push(salvar('acelerometro_postura.csv', colunas, linhas));
}

/* ------------------------------------------------------------------ */

baseAmbiente();
baseMotor();
baseEnergia();
baseQualidadeAr();
baseReservatorio();
baseOcupacao();
baseUltrassonico();
baseAcelerometro();

console.log('Bases geradas em public/datasets:\n');
for (const r of resumos) {
  console.log(
    `  ${r.nomeArquivo.padEnd(38)} ${String(r.linhas).padStart(4)} linhas` +
    `  ${String(r.colunas).padStart(2)} colunas  ${(r.bytes / 1024).toFixed(1)} KB`,
  );
}
console.log(`\nTotal: ${resumos.length} arquivos.`);
