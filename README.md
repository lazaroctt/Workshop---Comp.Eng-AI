# Workshop de IA aplicada a sensores IoT

Plataforma educacional do **LACOP**, Laboratório de Comunicações Ópticas da **UFF**, para um
workshop sobre uso de inteligência artificial em dados de sensores. O tema central é aproveitar
o que o sensor já mede para trazer previsibilidade e eficiência a projetos de engenharia.

A plataforma é voltada a quem estuda e tem cinco abas:

| Aba | Conteúdo |
| --- | --- |
| **Início** (página inicial) | objetivo do workshop, o que há na plataforma, o LACOP e sua pesquisa em IA, os projetos do laboratório e o formulário de interesse na Liga |
| **Artigos** | nove artigos em ordem de leitura, do conceito de aprendizado de máquina ao modelo rodando no ESP32, com prompts prontos dentro do texto |
| **Bases de dados** | oito bases sintéticas em CSV para download e cinco bases públicas do UCI Machine Learning Repository |
| **Dicas e vídeos** | o que ter em mãos, vídeos de apoio, dicas rápidas, biblioteca com todos os prompts e perguntas frequentes |
| **Liga de IA Acadêmica** | o que é uma liga, referências no Brasil (TAIL, LIA, Turing USP), a Canastra Leagues Network e a proposta da Liga do LACOP |

Na barra do desktop, a última aba aparece como "Liga de IA" para caber ao lado das marcas; o
nome completo segue no menu móvel, no rodapé e no título da página.

Endereços da versão anterior (`#/sobre`, `#/projeto`, `#/blog/...`, `#/dados`, `#/videos`) são
redirecionados para o conteúdo equivalente, então links já compartilhados continuam funcionando.
O endereço `#/inicio/interesse` abre o Início direto no formulário.

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
│   └── assets/
│       ├── uff/                  símbolo e logotipo oficiais da UFF
│       ├── lacop/                marca do LACOP
│       └── projetos/             fotos e animação dos projetos do Início
├── scripts/
│   └── gerar-datasets.mjs        gerador das bases sintéticas (Node puro)
├── src/
│   ├── components/               cabeçalho, rodapé, cartões, modal, prompts, player
│   │   ├── MarcaUFF.jsx          símbolo da UFF, versões azul e branca
│   │   ├── MarcaLacop.jsx        marca do laboratório e caminho do arquivo
│   │   ├── CartaoBasePublica.jsx cartão das bases externas, mesmo desenho das sintéticas
│   │   ├── VideoQuadro.jsx       cartão de vídeo com o player do YouTube
│   │   ├── FotoProjeto.jsx       foto de projeto com espaço reservado
│   │   └── FormularioInteresse.jsx  formulário de interesse na Liga
│   ├── data/
│   │   ├── posts.js              os nove artigos, escritos em blocos
│   │   ├── referencias.js        catálogo de referências dos artigos, formato ABNT
│   │   ├── prompts.js            prompts usados nos artigos e na biblioteca
│   │   ├── datasets.js           bases sintéticas e bases públicas
│   │   ├── projetos.js           projetos do LACOP exibidos no Início
│   │   ├── liga.js               conteúdo da Liga e ENDEREÇO DO FORMULÁRIO (PLACEHOLDER)
│   │   ├── videos.js             vídeos do YouTube exibidos na aba Dicas
│   │   └── livros.js             estante de livros recomendados
│   ├── lib/uteis.js              cópia, revelação, leitura de CSV e link do YouTube
│   ├── pages/                    Inicio, Artigos, BasesDeDados, Dicas, LigaIA
│   ├── styles/global.css         sistema de design completo, tema claro e escuro
│   ├── App.jsx                   cinco abas com rota por hash e redirecionamentos
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Tarefas comuns de manutenção

### Marcas institucionais

Cada instituição tem a sua pasta dentro de `public/assets`.

**UFF, já configurada.** Os arquivos vieram do pacote oficial de identidade visual publicado
pela Superintendência de Comunicação Social em <https://www.uff.br/scs/identidade-visual/>.

```
public/assets/uff/
├── simbolo-uff-azul.png                cabeçalho no tema claro
├── simbolo-uff-branco.png              cabeçalho no tema escuro e rodapé
├── logotipo-uff-vertical-azul.png      assinatura completa, para slides
├── logotipo-uff-horizontal-azul.png    assinatura completa, horizontal
└── logotipo-uff-horizontal-branco.png  assinatura horizontal, fundo escuro
```

O símbolo aparece no canto superior esquerdo com 40 px de altura e no rodapé com 46 px,
trocando de versão conforme o tema. Serve também de ícone de aba do navegador.

**LACOP, já configurada.**

```
public/assets/lacop/
├── lacop.png         versão original, para fundo claro
└── lacop-branco.png  versão para fundo escuro, gerada a partir da original
```

A marca fica no extremo direito do cabeçalho, com 44 px de altura, e no rodapé, com 46 px. A
versão usada acompanha o fundo: no cabeçalho ela troca conforme o tema, e no rodapé, que é
sempre azul escuro, a versão clara é fixa. Se o laboratório tiver uma versão oficial para fundo
escuro, substitua `lacop-branco.png` mantendo o nome.

Em telas abaixo de 1140 px a marca do laboratório sai do cabeçalho para dar espaço às abas, e
permanece no rodapé. Se a pasta ficar sem arquivo, aparece um espaço tracejado indicando a
posição reservada, e nenhuma marca é desenhada no lugar da oficial.

Para usar outros nomes ou formatos, ajuste as constantes no topo de
`src/components/MarcaUFF.jsx` e `src/components/MarcaLacop.jsx`. As duas pastas trazem um
arquivo `LEIA-ME.txt` com o mesmo resumo.

O endereço de contato do rodapé é fictício e está sinalizado por comentário em
`src/components/Rodape.jsx`.

### Vídeos

A aba Dicas e vídeos traz oito vídeos do YouTube em três grupos, conferidos em setembro de 2026:
todos públicos e com incorporação liberada.

| Grupo | Vídeo | Canal |
| --- | --- | --- |
| Conceitos | Introdução ao Machine Learning (quando o if já não resolve) | TensorFlow, canal do Google |
| Conceitos | Conceitos Básicos de Aprendizado de Máquina | UNIVESP, Prof. José Avelino Placca |
| Conceitos | Introdução à Ciência de Dados | UNIVESP, Prof. José Eduardo Santarem Segundo |
| Ferramentas e prática | Como usar o Google Colab para rodar Python? | Locaweb |
| Ferramentas e prática | Primeiros passos com Scikit-Learn | Programação Dinâmica |
| Ferramentas e prática | Árvores de Decisão com Python e Scikit-Learn | Insight Lab, UFC, Prof. Regis Pires |
| Ética em IA | Implicações éticas e sociais da inteligência artificial | Canal USP, USP Talks com Marcelo Finger |
| Ética em IA | Machine Learning: Ética e Privacidade | UNIVESP, Prof. José Eduardo Santarem Segundo |

Para trocar ou acrescentar um vídeo, edite `src/data/videos.js`: cada item tem título,
descrição, fonte, grupo e o link em `embedUrl`. Pode ser o link como aparece no navegador:

```js
embedUrl: 'https://www.youtube.com/watch?v=ID_DO_VIDEO',
```

Também funcionam os formatos `youtu.be/ID`, `youtube.com/embed/ID` e links de playlist. O
player usa o domínio de privacidade aprimorada do YouTube (`youtube-nocookie.com`), que só grava
cookies depois que a pessoa inicia o vídeo. Com o campo vazio, o cartão mostra "Vídeo em breve".

### Livros recomendados

A mesma aba tem uma estante com doze livros em três grupos (Para começar, Para aprofundar,
Ética e sociedade), definida em `src/data/livros.js`. As edições foram conferidas em setembro de
2026 nas páginas das editoras; o botão "Página da editora" aparece só quando o link foi
verificado.

### Fontes dos artigos

Cada artigo lista suas obras no campo `fontes` e marca os trechos que se apoiam nelas com
`ref: ['chave']`. A página numera as citações na ordem em que aparecem e monta a seção
Referências no fim do texto, no padrão da ABNT. Todas as obras foram conferidas em setembro de
2026: artigos científicos pelo DOI na base da Crossref, livros e cursos nas páginas das
universidades, editoras e repositórios.

Para acrescentar uma fonte, cadastre a obra em `src/data/referencias.js` e cite a chave no
artigo. Prefira obras com DOI ou página institucional estável.

### Mídia dos projetos

O Início mostra uma imagem à direita de cada projeto, com arquivos em `public/assets/projetos`:

| Projeto | Arquivo | Conteúdo |
| --- | --- | --- |
| City Science | `city science.jpeg` | apresentação do pôster na SBPC |
| Como Estou | `como-estou.webp` | animação em loop feita a partir de `como estou.mov` |
| SEMENDE Sustentável | `semende.jpeg` | página do projeto |

A animação do Como Estou usa o elemento `picture`: navegadores atuais recebem o WebP animado
(0,9 MB), os muito antigos recebem `como-estou.gif` (5,8 MB) e quem ativou a redução de
movimento no sistema vê só `como-estou-quadro.jpg`. O WebP roda sozinho e repete sem parar,
como um GIF, com cores completas e um décimo do tamanho.

Para gerar uma animação a partir de outro vídeo sem instalar nada no macOS, extraia os quadros
com o AVFoundation (Swift) e monte o WebP com Python e Pillow. Em `src/data/projetos.js`, os
campos `foto` ou `animacao`, `proporcao` e `posicao` controlam o arquivo, o formato do quadro e a
parte visível da imagem.

### Ativar o formulário de interesse da Liga

O formulário fica pronto, mas só envia depois que você informar para onde as respostas vão. Até
lá, aparece a frase "As inscrições abrem em breve" e o botão fica desativado. Há dois caminhos
gratuitos.

**Opção 1: Formspree**, o mais rápido. Crie uma conta em <https://formspree.io>, crie um
formulário e copie o endereço, algo como `https://formspree.io/f/abcdwxyz`. As respostas
chegam por e-mail e ficam no painel do Formspree.

**Opção 2: Google Planilhas com aviso por e-mail** (a escolhida para a Liga). Cada inscrição vira
uma linha na planilha e gera um e-mail para malazaro@id.uff.br. O script pronto fica em
`scripts/liga-google-planilha.gs`; o e-mail de destino está na constante `EMAIL_DESTINO`, no topo
dele, e não aparece no código do site.

1. Com a conta Google que vai guardar as inscrições, crie uma planilha em branco.
2. Na planilha, abra **Extensões > Apps Script**, apague o conteúdo e cole o arquivo
   `scripts/liga-google-planilha.gs` inteiro. Salve.
3. No seletor de funções, escolha **testar** e clique em **Executar**. O Google pede para
   autorizar o acesso à planilha e o envio de e-mails. Depois disso, a aba Inscrições aparece
   com uma linha de teste e chega um e-mail de aviso.
4. Clique em **Implantar > Nova implantação**, escolha o tipo **App da Web**, execute como
   você e deixe o acesso para **Qualquer pessoa**. Copie a URL gerada, que termina em `/exec`.
5. Abra essa URL no navegador: deve aparecer "Formulário da Liga de IA do LACOP: endereço ativo".

Se a conta institucional não oferecer a opção **Qualquer pessoa** no passo 4, é porque a
administração do domínio restringe o acesso externo. Nesse caso, faça a instalação com uma conta
Gmail pessoal; os avisos continuam indo para o e-mail definido em `EMAIL_DESTINO`.

Ao alterar o script depois de publicado, use **Implantar > Gerenciar implantações**, edite a
implantação existente e escolha uma nova versão. Assim a URL continua a mesma.

Com o endereço em mãos, escolha uma forma de informar:

* **No código:** cole em `ENDPOINT_CONFIGURADO`, no topo de `src/data/liga.js`.
* **Na Vercel, sem mexer no código:** em Settings > Environment Variables, crie
  `VITE_ENDPOINT_INTERESSE` com o endereço e faça um novo deploy. A variável é lida no build,
  então só vale depois da nova publicação.

O formulário envia nome, curso, período, e-mail, a resposta sobre experiência com IA ou ciência
de dados, a origem e a data. Ele tem validação de campos e um campo invisível que descarta
envios automáticos de robôs.

### Editar textos e conteúdo

Quase todo o conteúdo está isolado em `src/data`, separado da interface:

| Arquivo | O que controla |
| --- | --- |
| `posts.js` | artigos, na ordem de leitura. Cada um é uma lista de blocos: parágrafo, subtítulo, lista, passos, citação, código, prompt, dica, figura, tabela, checklist e chamada para outra aba |
| `referencias.js` | as 34 obras citadas nos artigos, em formato ABNT, com DOI ou link e a instituição dos autores |
| `prompts.js` | todos os prompts. Um artigo usa um prompt pelo id, e a aba Dicas lista todos agrupados |
| `datasets.js` | bases sintéticas (cenário, dicionário, dicas) e bases públicas (descrição, tarefa, link) |
| `videos.js` | vídeos da aba Dicas e seus links do YouTube |
| `projetos.js` | projetos do Início: texto, selos, técnica, link e nome da foto |
| `liga.js` | atividades de uma liga, ligas de referência, Canastra Leagues Network e endereço do formulário |

As dicas rápidas e as perguntas frequentes ficam no topo de `src/pages/Dicas.jsx`. Os textos do
Início e as três frentes da Liga do LACOP ficam em `src/pages/Inicio.jsx` e
`src/pages/LigaIA.jsx`.

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

### Bases públicas

Links conferidos em setembro de 2026. Todas estão sob licença CC BY 4.0.

| Base | Tarefa | Link |
| --- | --- | --- |
| UCI HAR | Classificação | <https://archive.ics.uci.edu/dataset/240/human+activity+recognition+using+smartphones> |
| HARTH | Classificação de séries temporais | <https://archive.ics.uci.edu/dataset/779/harth> |
| IM-AccGyro | Classificação | <https://archive.ics.uci.edu/dataset/578/intelligent+media+accelerometer+and+gyroscope+im+accgyro+dataset> |
| Individual Household Electric Power Consumption | Regressão e séries temporais | <https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption> |
| Gas Sensor Array Drift | Classificação | <https://archive.ics.uci.edu/dataset/224/gas+sensor+array+drift+dataset> |

A IM-AccGyro tem página ativa, mas a UCI não oferece os arquivos (download de 0 bytes e API sem
dados). O cartão avisa isso. Se a situação persistir, remova o item de `basesPublicas` em
`src/data/datasets.js`.

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

## Solução de problemas

**`npm run dev` ou `npm run build` param em "transforming..." e não saem disso.** O projeto fica
em `~/Documents`, que sincroniza com o iCloud Drive. Com a opção de otimizar o armazenamento, o
macOS tira do disco os arquivos pouco usados de `node_modules` e deixa só o marcador. A leitura
desses arquivos fica esperando o download e o build trava. Para conferir e resolver:

```bash
ls -lO node_modules/lucide-react/dist/esm/icons | grep -c dataless   # acima de 0 indica o problema
npm ci                                                                # reinstala as dependências
```

Para evitar que volte a acontecer, mantenha o projeto fora das pastas sincronizadas ou impeça o
iCloud de sincronizar o `node_modules`.

## Identidade visual

A referência é material de curso universitário, não interface de produto. Fundo claro,
tipografia serifada nos títulos com a família Lora, corpo de texto em Inter, código em IBM Plex
Mono. A paleta se resume a azul institucional, tons de cinza e três cores de apoio em tom
fechado, usadas apenas para diferenciar categorias. Bordas de um pixel no lugar de sombras
difusas, cantos discretos e ícones em traço fino.

O tema claro é o padrão da plataforma. O modo escuro fica como alternativa no botão do
cabeçalho e também segue tons sóbrios, sem brilho ou saturação alta.

Os tokens de cor, tipografia e espaçamento ficam no topo de `src/styles/global.css`, no bloco
`:root`. Ajustar a identidade passa por editar apenas esse trecho.

## Tecnologias

React 19, Vite, lucide-react para os ícones e CSS próprio com variáveis de tema. Sem
framework de estilo e sem dependência de backend: tudo roda no navegador, e os CSV são
servidos como arquivos estáticos.

## Créditos

Material produzido no Laboratório de Comunicações Ópticas da Universidade Federal Fluminense.
O arquivo `Readme` na raiz guarda a lista original de ideias de projeto com hardware que deu
origem a este workshop. Ele não aparece na plataforma.
