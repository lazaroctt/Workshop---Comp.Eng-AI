/**
 * Catálogo de bases de dados da plataforma.
 *
 * datasets       bases sintéticas, servidas em public/datasets para download
 *                direto. Cada item traz cenário, dicionário de dados coluna a
 *                coluna e uma pergunta de machine learning para responder.
 *                Os CSV são gerados por scripts/gerar-datasets.mjs.
 *
 * basesPublicas  bases reais e gratuitas do UCI Machine Learning Repository,
 *                com link para a página oficial de cada uma. Links conferidos
 *                em setembro de 2026.
 */

import {
  Thermometer, Vibrate, Zap, Wind, Droplets, Users, Ruler, Move3d,
  Smartphone, Footprints, PlugZap, TestTubes,
} from 'lucide-react';

export const datasets = [
  /* ---------------------------------------------------------------- */
  {
    id: 'ambiente',
    arquivo: 'ambiente_temperatura_umidade.csv',
    titulo: 'Temperatura e umidade de ambiente',
    icone: Thermometer,
    cor: 'ciano',
    tarefa: 'Regressão ou classificação',
    nivel: 'Iniciante',
    linhas: 576,
    colunas: 8,
    periodo: 'Três dias, uma leitura a cada 15 minutos, em duas salas',
    sensores: 'DHT22, LDR',
    resumo:
      'Registro contínuo de duas salas do prédio, com o ciclo natural do dia somado ao efeito do ar condicionado e da presença de pessoas.',
    cenario:
      'Um nó ESP32 com sensor de temperatura e umidade ficou instalado no laboratório de óptica e em uma sala de aula. A cada quinze minutos ele enviou as leituras para um servidor local. O comportamento térmico acompanha o sol, sobe quando a sala enche e cai quando o ar condicionado entra em operação. É a base mais direta para quem nunca treinou um modelo antes.',
    pergunta:
      'Qual será a temperatura da sala daqui a uma hora? E como a mesma tabela pode indicar se o ambiente está confortável para quem está nele?',
    alvo: 'temperatura_c (regressão) ou conforto (classificação)',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Momento exato da leitura, no formato AAAA-MM-DD HH:MM:SS.' },
      { coluna: 'sala', tipo: 'categórico', descricao: 'Identificação do ambiente monitorado: lab_optica ou sala_aula_302.' },
      { coluna: 'temperatura_c', tipo: 'numérico', descricao: 'Temperatura do ar em graus Celsius.' },
      { coluna: 'umidade_pct', tipo: 'numérico', descricao: 'Umidade relativa do ar em porcentagem.' },
      { coluna: 'luminosidade_lux', tipo: 'numérico', descricao: 'Luminosidade lida pelo LDR, em lux. Ajuda a separar dia de noite.' },
      { coluna: 'ar_condicionado', tipo: 'binário', descricao: 'Vale 1 quando o aparelho estava ligado no instante da leitura.' },
      { coluna: 'pessoas_estimadas', tipo: 'numérico', descricao: 'Quantidade aproximada de ocupantes da sala.' },
      { coluna: 'conforto', tipo: 'categórico', descricao: 'Rótulo de conforto térmico: frio, confortavel ou quente. Considera temperatura e umidade juntas.' },
    ],
    dicas: [
      'Para a versão de regressão, crie uma coluna com a temperatura deslocada em quatro linhas, que corresponde a uma hora à frente.',
      'A hora do dia extraída do timestamp costuma ser a variável mais informativa da tabela.',
      'Treine e teste respeitando a ordem do tempo. Embaralhar séries temporais dá uma nota bonita e enganosa.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'motor',
    arquivo: 'motor_vibracao_corrente.csv',
    titulo: 'Vibração e corrente de motor',
    icone: Vibrate,
    cor: 'ambar',
    tarefa: 'Classificação binária',
    nivel: 'Intermediário',
    linhas: 600,
    colunas: 10,
    periodo: 'Quatro motores acompanhados por 150 horas cada um',
    sensores: 'MPU-6050, sensor de corrente SCT-013, termopar',
    resumo:
      'Manutenção preditiva clássica: três motores caminham para a falha e um permanece saudável até o fim do registro.',
    cenario:
      'Quatro motores de indução do laboratório receberam um acelerômetro no mancal, um sensor de corrente na alimentação e um termopar na carcaça. A leitura é horária. Três máquinas apresentam desgaste progressivo, com aumento de vibração, corrente e temperatura antes da parada. A quarta trabalha em regime normal e serve de referência para o modelo aprender o que é normalidade.',
    pergunta:
      'Este motor vai falhar nas próximas 24 horas? O modelo precisa avisar antes da quebra, não depois.',
    alvo: 'falha_em_24h',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Instante da coleta horária.' },
      { coluna: 'id_motor', tipo: 'categórico', descricao: 'Identificador da máquina: M-01 até M-04.' },
      { coluna: 'rotacao_rpm', tipo: 'numérico', descricao: 'Rotação medida no eixo, em rotações por minuto.' },
      { coluna: 'vibracao_rms_mm_s', tipo: 'numérico', descricao: 'Valor eficaz da velocidade de vibração em mm/s. Indicador padrão de severidade.' },
      { coluna: 'vibracao_pico_mm_s', tipo: 'numérico', descricao: 'Maior amplitude registrada na janela, em mm/s.' },
      { coluna: 'corrente_a', tipo: 'numérico', descricao: 'Corrente eficaz consumida pelo motor, em ampères.' },
      { coluna: 'tensao_v', tipo: 'numérico', descricao: 'Tensão de alimentação em volts.' },
      { coluna: 'temperatura_mancal_c', tipo: 'numérico', descricao: 'Temperatura do mancal em graus Celsius.' },
      { coluna: 'horas_operacao', tipo: 'numérico', descricao: 'Horas acumuladas de funcionamento desde a última revisão.' },
      { coluna: 'falha_em_24h', tipo: 'binário', descricao: 'Alvo do modelo. Vale 1 quando houve falha registrada dentro das 24 horas seguintes.' },
    ],
    dicas: [
      'As classes são desequilibradas, com cerca de 10% de alertas. Olhe precisão e recall, não apenas acurácia.',
      'A razão entre vibração de pico e valor eficaz separa bem máquina sadia de máquina em desgaste.',
      'Vale testar a divisão por motor: treinar com três máquinas e validar na quarta mostra se o modelo generaliza.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'energia',
    arquivo: 'consumo_energia_horario.csv',
    titulo: 'Consumo de energia por hora',
    icone: Zap,
    cor: 'roxo',
    tarefa: 'Regressão',
    nivel: 'Iniciante',
    linhas: 720,
    colunas: 10,
    periodo: 'Trinta dias corridos, uma linha por hora',
    sensores: 'Medidor PZEM-004T',
    resumo:
      'Curva de carga de um prédio universitário, com rotina de expediente, recesso no meio do mês e forte influência do clima.',
    cenario:
      'O medidor instalado no quadro geral registra o consumo hora a hora. O padrão semanal fica evidente: dias úteis carregados, finais de semana leves e dois dias de recesso quase parados. Quando a temperatura externa sobe, a refrigeração puxa o consumo junto. Esse conjunto é o caminho mais curto para entender regressão na prática.',
    pergunta:
      'Quanto o prédio vai consumir na próxima hora, considerando calendário, clima e ocupação?',
    alvo: 'consumo_kwh',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Início da hora medida.' },
      { coluna: 'hora', tipo: 'numérico', descricao: 'Hora do dia, de 0 a 23, já separada para facilitar o uso direto.' },
      { coluna: 'dia_semana', tipo: 'categórico', descricao: 'Nome do dia da semana, de domingo a sabado.' },
      { coluna: 'fim_de_semana', tipo: 'binário', descricao: 'Vale 1 aos sábados e domingos.' },
      { coluna: 'feriado', tipo: 'binário', descricao: 'Marca os dois dias de recesso acadêmico do período.' },
      { coluna: 'temperatura_externa_c', tipo: 'numérico', descricao: 'Temperatura externa em graus Celsius no mesmo intervalo.' },
      { coluna: 'umidade_externa_pct', tipo: 'numérico', descricao: 'Umidade relativa externa em porcentagem.' },
      { coluna: 'ocupacao_predio', tipo: 'numérico', descricao: 'Estimativa de pessoas presentes no prédio naquela hora.' },
      { coluna: 'tarifa_ponta', tipo: 'binário', descricao: 'Vale 1 no horário de ponta dos dias úteis, entre 18h e 20h.' },
      { coluna: 'consumo_kwh', tipo: 'numérico', descricao: 'Alvo do modelo. Energia consumida na hora, em quilowatt-hora.' },
    ],
    dicas: [
      'Compare o modelo com um palpite ingênuo, como repetir o consumo da mesma hora do dia anterior. Se o modelo não vencer isso, algo está errado.',
      'Codifique o dia da semana com one-hot antes de entregar ao regressor.',
      'O erro médio absoluto em kWh comunica melhor com o pessoal de engenharia do que o R².',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'ar',
    arquivo: 'qualidade_ar_interna.csv',
    titulo: 'Qualidade do ar em ambiente fechado',
    icone: Wind,
    cor: 'verde',
    tarefa: 'Classificação em três classes',
    nivel: 'Intermediário',
    linhas: 600,
    colunas: 11,
    periodo: 'Quase três dias em três ambientes, leitura a cada 20 minutos',
    sensores: 'MH-Z19 (CO2), SDS011 (particulados), MQ-135',
    resumo:
      'CO2, material particulado e compostos voláteis acompanhados em sala de aula, laboratório e auditório.',
    cenario:
      'O ar de um ambiente fechado conta a história de quem está dentro dele. O gás carbônico acumula com a respiração e cai quando alguém abre a janela ou a ventilação entra. O laboratório tem uma assinatura própria por causa dos solventes, que aparece nos compostos orgânicos voláteis. O rótulo de qualidade combina as três frentes de poluição com uma pequena incerteza de medição, então não existe regra perfeita escondida em uma coluna só.',
    pergunta:
      'O ar deste ambiente está bom, moderado ou ruim neste momento, e quais leituras mais pesam nessa decisão?',
    alvo: 'classe_qualidade',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Momento da amostragem.' },
      { coluna: 'ambiente', tipo: 'categórico', descricao: 'Local monitorado: sala_aula, laboratorio ou auditorio.' },
      { coluna: 'co2_ppm', tipo: 'numérico', descricao: 'Concentração de dióxido de carbono em partes por milhão.' },
      { coluna: 'pm2_5_ugm3', tipo: 'numérico', descricao: 'Material particulado fino em microgramas por metro cúbico.' },
      { coluna: 'pm10_ugm3', tipo: 'numérico', descricao: 'Material particulado grosso em microgramas por metro cúbico.' },
      { coluna: 'cov_ppb', tipo: 'numérico', descricao: 'Compostos orgânicos voláteis em partes por bilhão.' },
      { coluna: 'temperatura_c', tipo: 'numérico', descricao: 'Temperatura do ambiente em graus Celsius.' },
      { coluna: 'umidade_pct', tipo: 'numérico', descricao: 'Umidade relativa em porcentagem.' },
      { coluna: 'janela_aberta', tipo: 'binário', descricao: 'Vale 1 quando havia janela aberta durante a medição.' },
      { coluna: 'ventilacao_ligada', tipo: 'binário', descricao: 'Vale 1 quando o sistema de exaustão estava em operação.' },
      { coluna: 'classe_qualidade', tipo: 'categórico', descricao: 'Alvo do modelo: boa, moderada ou ruim.' },
    ],
    dicas: [
      'Peça ao agente uma matriz de confusão. Ela mostra em qual fronteira o modelo erra mais.',
      'A importância das variáveis em uma árvore revela qual poluente domina cada ambiente.',
      'Experimente treinar sem a coluna ambiente e veja se o desempenho cai. É um teste rápido de generalização.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'reservatorio',
    arquivo: 'reservatorio_nivel_vazao.csv',
    titulo: 'Nível de reservatório com vazão',
    icone: Droplets,
    cor: 'ciano',
    tarefa: 'Classificação ou regressão',
    nivel: 'Intermediário',
    linhas: 576,
    colunas: 9,
    periodo: 'Quatro dias com leitura a cada 10 minutos',
    sensores: 'Ultrassônico JSN-SR04T, sensor de fluxo YF-S201, transdutor de pressão',
    resumo:
      'Reservatório de 50 metros cúbicos com bomba automática, demanda variável e duas janelas de perda anormal.',
    cenario:
      'O reservatório abastece um bloco de laboratórios. A bomba liga quando o nível cai abaixo de 45% e desliga perto de 88%, o que cria o padrão de dente de serra típico desses sistemas. O consumo tem dois picos diários, no início da manhã e no fim da tarde. Em dois intervalos do registro a saída fica acima do esperado sem que ninguém tenha aberto torneira, o que caracteriza vazamento.',
    pergunta:
      'Dá para detectar o vazamento apenas comparando entrada, saída e variação de nível, sem instalar sensor novo?',
    alvo: 'vazamento_suspeito (classificação) ou nivel_pct (regressão)',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Instante da medição, a cada dez minutos.' },
      { coluna: 'nivel_pct', tipo: 'numérico', descricao: 'Nível do reservatório em porcentagem da capacidade total.' },
      { coluna: 'volume_m3', tipo: 'numérico', descricao: 'Volume armazenado em metros cúbicos.' },
      { coluna: 'vazao_entrada_l_min', tipo: 'numérico', descricao: 'Vazão de entrada em litros por minuto, vinda da bomba.' },
      { coluna: 'vazao_saida_l_min', tipo: 'numérico', descricao: 'Vazão de saída em litros por minuto, para o consumo do prédio.' },
      { coluna: 'pressao_bar', tipo: 'numérico', descricao: 'Pressão na tubulação em bar.' },
      { coluna: 'bomba_ligada', tipo: 'binário', descricao: 'Vale 1 quando a bomba estava em funcionamento.' },
      { coluna: 'temperatura_agua_c', tipo: 'numérico', descricao: 'Temperatura da água em graus Celsius.' },
      { coluna: 'vazamento_suspeito', tipo: 'binário', descricao: 'Alvo do modelo. Vale 1 nos intervalos com perda fora do padrão.' },
    ],
    dicas: [
      'Crie a variável balanço, que é entrada menos saída, e compare com a variação real do nível.',
      'A hora do dia importa: consumo alto às 8h é rotina, o mesmo consumo às 3h é suspeito.',
      'Volume e nível carregam a mesma informação. Manter os dois não acrescenta nada ao modelo.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'ocupacao',
    arquivo: 'ocupacao_sala_presenca.csv',
    titulo: 'Ocupação de sala por presença',
    icone: Users,
    cor: 'ambar',
    tarefa: 'Classificação binária',
    nivel: 'Iniciante',
    linhas: 672,
    colunas: 11,
    periodo: 'Uma semana completa, leitura a cada 15 minutos',
    sensores: 'PIR HC-SR501, MH-Z19, microfone KY-038, LDR',
    resumo:
      'Fusão de quatro sensores baratos para responder uma pergunta simples: tem gente na sala agora?',
    cenario:
      'Um sensor de presença sozinho falha quando as pessoas ficam paradas estudando. Ao juntar contagem de eventos do PIR, gás carbônico, ruído e luminosidade, o quadro fica muito mais confiável. A semana registrada tem blocos de aula pela manhã, tarde e noite, além de finais de semana quase vazios. É um bom ponto de partida para pensar em automação de iluminação e de climatização.',
    pergunta:
      'A sala está ocupada neste intervalo? E qual sensor sozinho chega mais perto de acertar?',
    alvo: 'sala_ocupada',
    dicionario: [
      { coluna: 'timestamp', tipo: 'data e hora', descricao: 'Início da janela de quinze minutos.' },
      { coluna: 'dia_semana', tipo: 'categórico', descricao: 'Dia da semana por extenso.' },
      { coluna: 'hora', tipo: 'numérico', descricao: 'Hora do dia, de 0 a 23.' },
      { coluna: 'eventos_pir', tipo: 'numérico', descricao: 'Quantidade de disparos do sensor de presença na janela.' },
      { coluna: 'co2_ppm', tipo: 'numérico', descricao: 'Concentração de dióxido de carbono em partes por milhão.' },
      { coluna: 'ruido_db', tipo: 'numérico', descricao: 'Nível médio de ruído em decibéis.' },
      { coluna: 'luminosidade_lux', tipo: 'numérico', descricao: 'Luminosidade em lux, somando luz natural e artificial.' },
      { coluna: 'temperatura_c', tipo: 'numérico', descricao: 'Temperatura do ambiente em graus Celsius.' },
      { coluna: 'porta_aberta', tipo: 'binário', descricao: 'Vale 1 quando o sensor de contato indicou porta aberta.' },
      { coluna: 'pessoas', tipo: 'numérico', descricao: 'Contagem de referência de pessoas, anotada manualmente.' },
      { coluna: 'sala_ocupada', tipo: 'binário', descricao: 'Alvo do modelo. Vale 1 quando havia ao menos uma pessoa.' },
    ],
    dicas: [
      'Deixe a coluna pessoas de fora ao treinar o classificador, porque ela entrega a resposta pronta.',
      'Depois do primeiro modelo, tente prever a contagem de pessoas. O problema vira regressão e fica mais difícil.',
      'Compare o resultado com a regra tradicional de acionar a luz sempre que o PIR disparar.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'ultrassonico',
    arquivo: 'ultrassonico_obstaculos.csv',
    titulo: 'Ultrassônico e detecção de obstáculos',
    icone: Ruler,
    cor: 'roxo',
    tarefa: 'Classificação em quatro classes',
    nivel: 'Iniciante',
    linhas: 600,
    colunas: 9,
    periodo: '600 janelas de 20 leituras cada, já resumidas em estatísticas',
    sensores: 'HC-SR04',
    resumo:
      'Cada linha resume uma janela curta do sensor e recebe um rótulo de situação, do caminho livre ao objeto que se aproxima.',
    cenario:
      'O HC-SR04 aponta para um corredor. Em vez de guardar leitura por leitura, o firmware agrupa vinte medições e calcula média, mínimo, máximo, desvio e taxa de variação. Esse resumo é exatamente o tipo de pré-processamento que roda dentro de um microcontrolador. A partir dele o modelo distingue corredor livre, objeto parado, alguém se aproximando e alguém se afastando.',
    pergunta:
      'O que está acontecendo à frente do sensor: nada, objeto parado, aproximação ou afastamento?',
    alvo: 'situacao',
    dicionario: [
      { coluna: 'id_janela', tipo: 'numérico', descricao: 'Identificador sequencial da janela de leituras.' },
      { coluna: 'distancia_media_cm', tipo: 'numérico', descricao: 'Distância média medida na janela, em centímetros.' },
      { coluna: 'distancia_min_cm', tipo: 'numérico', descricao: 'Menor distância registrada na janela.' },
      { coluna: 'distancia_max_cm', tipo: 'numérico', descricao: 'Maior distância registrada na janela.' },
      { coluna: 'desvio_padrao_cm', tipo: 'numérico', descricao: 'Desvio padrão das leituras. Quanto maior, mais movimento.' },
      { coluna: 'variacao_cm_por_s', tipo: 'numérico', descricao: 'Taxa de variação da distância. Valores negativos indicam aproximação.' },
      { coluna: 'leituras_validas', tipo: 'numérico', descricao: 'Quantas das vinte medições retornaram eco válido.' },
      { coluna: 'eco_perdido_pct', tipo: 'numérico', descricao: 'Porcentagem de pulsos sem retorno, um indicador de ruído.' },
      { coluna: 'situacao', tipo: 'categórico', descricao: 'Alvo do modelo: livre, objeto_parado, aproximando ou afastando.' },
    ],
    dicas: [
      'Este é o melhor conjunto para embarcar depois, porque as features cabem em poucas linhas de firmware.',
      'Uma árvore de decisão com profundidade pequena já resolve e ainda pode ser lida como código.',
      'Peça ao agente para desenhar a fronteira de decisão usando apenas desvio padrão e taxa de variação.',
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'acelerometro',
    arquivo: 'acelerometro_postura.csv',
    titulo: 'Acelerômetro, postura e queda',
    icone: Move3d,
    cor: 'verde',
    tarefa: 'Classificação em cinco classes',
    nivel: 'Intermediário',
    linhas: 540,
    colunas: 12,
    periodo: '540 janelas de sinal já resumidas em atributos',
    sensores: 'MPU-6050',
    resumo:
      'Janelas de acelerômetro e giroscópio rotuladas como em pé, sentado, deitado, caminhando ou queda.',
    cenario:
      'O MPU-6050 preso à cintura registra aceleração nos três eixos e velocidade angular. Cada janela de sinal virou uma linha com médias, desvio da magnitude e jerk máximo, que é a variação brusca da aceleração. A classe queda aparece em cerca de 12% das amostras, o que reproduz bem a realidade de um detector de eventos raros e mostra na prática o custo de um alarme perdido.',
    pergunta:
      'Qual postura o corpo está assumindo nesta janela, e o sistema consegue reconhecer uma queda a tempo?',
    alvo: 'postura',
    dicionario: [
      { coluna: 'id_janela', tipo: 'numérico', descricao: 'Identificador da janela de sinal.' },
      { coluna: 'acel_x_g', tipo: 'numérico', descricao: 'Aceleração média no eixo X, em unidades de g.' },
      { coluna: 'acel_y_g', tipo: 'numérico', descricao: 'Aceleração média no eixo Y, em unidades de g.' },
      { coluna: 'acel_z_g', tipo: 'numérico', descricao: 'Aceleração média no eixo Z, em unidades de g.' },
      { coluna: 'magnitude_media_g', tipo: 'numérico', descricao: 'Módulo do vetor de aceleração. Perto de 1 g quando há repouso.' },
      { coluna: 'magnitude_desvio_g', tipo: 'numérico', descricao: 'Desvio padrão da magnitude na janela. Mede a agitação do sinal.' },
      { coluna: 'giro_x_dps', tipo: 'numérico', descricao: 'Velocidade angular no eixo X, em graus por segundo.' },
      { coluna: 'giro_y_dps', tipo: 'numérico', descricao: 'Velocidade angular no eixo Y, em graus por segundo.' },
      { coluna: 'giro_z_dps', tipo: 'numérico', descricao: 'Velocidade angular no eixo Z, em graus por segundo.' },
      { coluna: 'giro_rms_dps', tipo: 'numérico', descricao: 'Valor eficaz da rotação combinada dos três eixos.' },
      { coluna: 'jerk_max_g_s', tipo: 'numérico', descricao: 'Maior variação de aceleração por segundo. Dispara em impactos.' },
      { coluna: 'postura', tipo: 'categórico', descricao: 'Alvo do modelo: em_pe, sentado, deitado, caminhando ou queda.' },
    ],
    dicas: [
      'Repare que o eixo dominante já separa boa parte das posturas estáticas. O desafio está em caminhar contra cair.',
      'Em um detector de queda, deixar de avisar custa mais caro que um alarme falso. Ajuste o limiar pensando nisso.',
      'O MPU-6050 é o mesmo chip da base pública IM-AccGyro, listada nesta página. Vale comparar os dois conjuntos.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Bases públicas do UCI Machine Learning Repository                  */
/* ------------------------------------------------------------------ */

export const basesPublicas = [
  {
    id: 'uci-har',
    titulo: 'UCI HAR',
    nomeCompleto: 'Human Activity Recognition Using Smartphones',
    icone: Smartphone,
    cor: 'ciano',
    tarefa: 'Classificação',
    descricao:
      'Reconhecimento de atividades como andar, sentar e subir escada a partir do acelerômetro e do giroscópio de um smartphone preso à cintura.',
    instancias: '10.299',
    tamanho: '58,2 MB',
    url: 'https://archive.ics.uci.edu/dataset/240/human+activity+recognition+using+smartphones',
    dica: 'Além do sinal bruto, a base traz atributos já calculados por janela, o que encurta bastante o caminho até o primeiro modelo.',
  },
  {
    id: 'harth',
    titulo: 'HARTH',
    nomeCompleto: 'Human Activity Recognition Trondheim',
    icone: Footprints,
    cor: 'verde',
    tarefa: 'Classificação de séries temporais',
    descricao:
      'Atividades humanas registradas por dois acelerômetros, na coxa e na lombar, com um arquivo CSV por participante.',
    instancias: '6.461.328',
    tamanho: '296,4 MB',
    url: 'https://archive.ics.uci.edu/dataset/779/harth',
    dica: 'O pacote é grande. Comece pelo CSV de um único participante antes de juntar todos.',
  },
  {
    id: 'im-accgyro',
    titulo: 'IM-AccGyro',
    nomeCompleto: 'Intelligent Media Accelerometer and Gyroscope',
    icone: Move3d,
    cor: 'roxo',
    tarefa: 'Classificação',
    descricao:
      'Acelerômetro e giroscópio com o GY-521, a placa do MPU-6050, em seis atividades: boxe, palmas, corrida, sentado, em pé e caminhada.',
    instancias: '800',
    tamanho: null,
    url: 'https://archive.ics.uci.edu/dataset/578/intelligent+media+accelerometer+and+gyroscope+im+accgyro+dataset',
    dica: 'É o mesmo chip da base sintética de postura, o que facilita comparar os resultados.',
    // Conferido em setembro de 2026: a página abre, mas a UCI não oferece
    // os arquivos (download de 0 bytes e API sem dados).
    aviso:
      'No momento, a UCI não disponibiliza os arquivos desta base. A página continua útil pela descrição e pela referência ao artigo original.',
  },
  {
    id: 'household-power',
    titulo: 'Individual Household Electric Power Consumption',
    nomeCompleto: null,
    icone: PlugZap,
    cor: 'ambar',
    tarefa: 'Regressão e séries temporais',
    descricao:
      'Consumo elétrico de uma residência medido minuto a minuto ao longo de quase quatro anos.',
    instancias: '2.075.259',
    tamanho: '19,7 MB',
    url: 'https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption',
    dica: 'São mais de dois milhões de linhas. Agregue por hora antes de treinar, como na base sintética de energia.',
  },
  {
    id: 'gas-drift',
    titulo: 'Gas Sensor Array Drift',
    nomeCompleto: null,
    icone: TestTubes,
    cor: 'verde',
    tarefa: 'Classificação',
    descricao:
      'Leituras de um conjunto de 16 sensores químicos expostos a seis gases, coletadas ao longo de 36 meses.',
    instancias: '13.910',
    tamanho: '9,5 MB',
    url: 'https://archive.ics.uci.edu/dataset/224/gas+sensor+array+drift+dataset',
    dica: 'O desvio dos sensores com o tempo é o grande desafio. Treine com os primeiros lotes e teste com os últimos.',
  },
];

/** Facilita buscas pontuais nas páginas. */
export const acharDataset = (id) => datasets.find((d) => d.id === id);

/** Filtros usados na aba de fontes de dados. */
export const filtrosTarefa = [
  { id: 'todos', rotulo: 'Todas as bases' },
  { id: 'classificacao', rotulo: 'Classificação' },
  { id: 'regressao', rotulo: 'Regressão' },
  { id: 'iniciante', rotulo: 'Bom para começar' },
];

export function aplicarFiltro(lista, filtro) {
  if (filtro === 'todos') return lista;
  // Bases públicas não têm nível; ficam de fora do filtro de iniciantes.
  if (filtro === 'iniciante') return lista.filter((d) => d.nivel === 'Iniciante');
  if (filtro === 'classificacao') return lista.filter((d) => d.tarefa.toLowerCase().includes('classifica'));
  return lista.filter((d) => d.tarefa.toLowerCase().includes('regress'));
}
