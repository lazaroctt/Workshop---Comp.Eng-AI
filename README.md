# Workshop de IA aplicada a sensores IoT

Plataforma educacional do **LACOP**, Laboratório de Comunicações Ópticas da **UFF**, para um
workshop sobre uso de inteligência artificial em dados de sensores. O tema central é aproveitar
o que o sensor já mede para trazer previsibilidade e eficiência a projetos de engenharia.

A plataforma reúne o material completo do encontro: descrição do workshop, oito bases de dados
sintéticas em CSV prontas para download, o roteiro passo a passo do case prático com prompts
para agentes de IA, artigos de apoio e espaços reservados para vídeos.

## Requisitos

* Node.js 18 ou superior
* npm

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # sobe o servidor de desenvolvimento em http://localhost:5173
```

Outros comandos disponíveis:

```bash
npm run build     # gera a versão de produção na pasta dist
npm run preview   # serve a pasta dist para conferência local
npm run datasets  # regenera os arquivos CSV em public/datasets
```

## Estrutura do projeto

```
.
├── public/
│   ├── datasets/                 8 arquivos CSV servidos para download
│   ├── logo-uff.svg              PLACEHOLDER do brasão da UFF
│   ├── logo-lacop.svg            PLACEHOLDER da marca do LACOP
│   └── favicon.svg
├── scripts/
│   └── gerar-datasets.mjs        gerador das bases sintéticas (Node puro)
├── src/
│   ├── components/               cabeçalho, rodapé, cartões, modal, prompts
│   ├── data/
│   │   ├── datasets.js           catálogo e dicionário de dados das bases
│   │   ├── roteiro.js            etapas do case e prompts para copiar
│   │   ├── posts.js              artigos do blog
│   │   └── videos.js             lista de vídeos e identificadores do YouTube
│   ├── lib/uteis.js              ganchos de cópia, revelação e leitura de CSV
│   ├── pages/                    Sobre, Fontes de Dados, Como Realizar, Blog, Vídeos
│   ├── styles/global.css         sistema de design completo, tema claro e escuro
│   ├── App.jsx                   navegação em abas com rota por hash
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Tarefas comuns de manutenção

### Trocar as logos institucionais

Os arquivos `public/logo-uff.svg` e `public/logo-lacop.svg` são **placeholders** e estão
marcados como tal dentro do próprio SVG. Substitua pelos arquivos oficiais mantendo os mesmos
nomes e nada mais precisa mudar. Se preferir outro caminho ou formato, ajuste as referências em
`src/components/Marca.jsx` e `src/components/Rodape.jsx`.

O endereço de contato no rodapé também é fictício e está sinalizado por comentário em
`src/components/Rodape.jsx`.

### Publicar um vídeo

Abra `src/data/videos.js` e preencha o campo `youtubeId` do item desejado com o identificador
que aparece na URL do YouTube, o trecho depois de `watch?v=`. Enquanto o campo estiver vazio, a
página exibe um espaço reservado indicando onde o vídeo entra.

```js
{ id: 'abertura', titulo: 'Abertura do workshop', youtubeId: 'AbCdEf12345' }
```

### Editar textos e conteúdo

Quase todo o conteúdo está isolado em `src/data`, separado da interface:

| Arquivo | O que controla |
| --- | --- |
| `datasets.js` | bases, cenários, dicionário de colunas, dicas e filtros |
| `roteiro.js` | preparação, oito etapas, prompts, extensões e checklist |
| `posts.js` | artigos do blog, em blocos simples de parágrafo, lista e citação |
| `videos.js` | vídeos e seus identificadores |

Agenda do encontro, objetivos e perguntas frequentes ficam no topo de `src/pages/Sobre.jsx`.

### Regenerar ou alterar as bases de dados

O gerador é um script Node sem dependências externas, com uma função por base e semente fixa,
o que garante que rodar de novo produz exatamente os mesmos arquivos.

```bash
npm run datasets
```

Para mudar o tamanho de uma base, a intensidade do ruído ou a regra de rotulagem, edite a
função correspondente em `scripts/gerar-datasets.mjs`. Ao alterar colunas, lembre de atualizar
o dicionário em `src/data/datasets.js`, que é o que aparece na interface.

## As bases de dados

| Arquivo | Tema | Tarefa | Alvo | Linhas |
| --- | --- | --- | --- | --- |
| `ambiente_temperatura_umidade.csv` | Temperatura e umidade de ambiente | Regressão ou classificação | `temperatura_c` ou `conforto` | 576 |
| `motor_vibracao_corrente.csv` | Manutenção preditiva de motor | Classificação binária | `falha_em_24h` | 600 |
| `consumo_energia_horario.csv` | Consumo elétrico de um prédio | Regressão | `consumo_kwh` | 720 |
| `qualidade_ar_interna.csv` | Qualidade do ar em ambiente fechado | Classificação, três classes | `classe_qualidade` | 600 |
| `reservatorio_nivel_vazao.csv` | Reservatório de água com bomba | Classificação ou regressão | `vazamento_suspeito` ou `nivel_pct` | 576 |
| `ocupacao_sala_presenca.csv` | Ocupação de sala por sensores | Classificação binária | `sala_ocupada` | 672 |
| `ultrassonico_obstaculos.csv` | Detecção de obstáculos com HC-SR04 | Classificação, quatro classes | `situacao` | 600 |
| `acelerometro_postura.csv` | Postura e queda com MPU-6050 | Classificação, cinco classes | `postura` | 540 |

Todos os arquivos usam vírgula como separador, ponto como marcador decimal e cabeçalho na
primeira linha. São dados **sintéticos**, gerados a partir de padrões físicos conhecidos, com
ruído gaussiano. Servem para ensinar o método, não para tirar conclusões sobre equipamentos
reais.

Uma árvore de decisão com profundidade 4 alcança entre 85% e 98% de acerto nessas bases, bem
acima do palpite pela classe majoritária, e o modelo linear prevê o consumo de energia com erro
médio próximo de 2 kWh. Existe margem de melhora em todas elas, que é justamente o espaço de
trabalho da turma.

## Publicação

O build gera arquivos estáticos, que funcionam em qualquer servidor web ou serviço de páginas.

```bash
npm run build
```

Se o site for hospedado em um subdiretório, informe o caminho na hora do build para que os
downloads e as imagens continuem apontando para o lugar certo:

```bash
npx vite build --base=/workshop-ia-sensores/
```

## Tecnologias

React 19, Vite, lucide-react para os ícones e CSS próprio com variáveis de tema. Sem
framework de estilo e sem dependência de backend: tudo roda no navegador, e os CSV são
servidos como arquivos estáticos.

## Créditos

Material produzido no Laboratório de Comunicações Ópticas da Universidade Federal Fluminense
para uso em sala de aula. O arquivo `Readme` na raiz guarda a lista original de ideias de
projeto com hardware que deu origem a este workshop.
