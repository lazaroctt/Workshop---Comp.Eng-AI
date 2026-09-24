/**
 * Catálogo de referências dos artigos, no formato da ABNT (NBR 6023).
 *
 * Cada obra foi conferida em setembro de 2026: artigos pelo DOI na base da
 * Crossref, livros e cursos nas páginas das universidades, editoras ou
 * repositórios. Os artigos em src/data/posts.js citam as obras pela chave.
 *
 * Campos:
 *   autores       sobrenome em maiúsculas e iniciais, como pede a ABNT
 *   titulo        título do capítulo ou artigo, quando houver
 *   obra          parte em negrito: título do livro ou nome do periódico
 *   detalhes      restante da referência, já com a pontuação inicial
 *   doi | url     endereço para consulta
 *   instituicao   etiqueta exibida ao lado: a universidade ou instituição dos
 *                 autores quando confirmada, ou o periódico da publicação
 */

export const ACESSO = 'Acesso em: 11 set. 2026.';

export const referencias = {
  /* Fundamentos -------------------------------------------------------- */
  samuel1959: {
    autores: 'SAMUEL, A. L.',
    titulo: 'Some studies in machine learning using the game of checkers',
    obra: 'IBM Journal of Research and Development',
    detalhes: ', v. 3, n. 3, p. 210-229, 1959.',
    doi: '10.1147/rd.33.0210',
    instituicao: 'IBM Research',
  },
  mitchell1997: {
    autores: 'MITCHELL, T. M.',
    obra: 'Machine learning',
    detalhes: '. New York: McGraw-Hill, 1997.',
    url: 'https://www.cs.cmu.edu/~tom/mlbook.html',
    instituicao: 'Carnegie Mellon',
  },
  ngCs229: {
    autores: 'NG, A.',
    obra: 'CS229: Machine Learning',
    detalhes: '. Notas de aula. Stanford: Stanford University, [s. d.].',
    url: 'https://cs229.stanford.edu/',
    instituicao: 'Stanford',
  },
  abuMostafa2012: {
    autores: 'ABU-MOSTAFA, Y. S.; MAGDON-ISMAIL, M.; LIN, H.-T.',
    obra: 'Learning from data: a short course',
    detalhes: '. [S. l.]: AMLBook, 2012. Base do curso CS 156 do Caltech.',
    url: 'https://work.caltech.edu/telecourse',
    instituicao: 'Caltech',
  },
  faceli2021: {
    autores: 'FACELI, K.; LORENA, A. C.; GAMA, J.; ALMEIDA, T. A.; CARVALHO, A. C. P. L. F.',
    obra: 'Inteligência artificial: uma abordagem de aprendizado de máquina',
    detalhes: '. 2. ed. Rio de Janeiro: LTC, 2021.',
    url: 'https://repositorio.usp.br/item/002208293',
    instituicao: 'USP · UFSCar',
  },
  domingos2012: {
    autores: 'DOMINGOS, P.',
    titulo: 'A few useful things to know about machine learning',
    obra: 'Communications of the ACM',
    detalhes: ', v. 55, n. 10, p. 78-87, 2012.',
    doi: '10.1145/2347736.2347755',
    instituicao: 'University of Washington',
  },
  jamesIslr2021: {
    autores: 'JAMES, G.; WITTEN, D.; HASTIE, T.; TIBSHIRANI, R.',
    obra: 'An introduction to statistical learning: with applications in R',
    detalhes: '. 2. ed. New York: Springer, 2021.',
    url: 'https://www.statlearning.com/',
    instituicao: 'Stanford',
  },
  izbicki2020: {
    autores: 'IZBICKI, R.; SANTOS, T. M.',
    obra: 'Aprendizado de máquina: uma abordagem estatística',
    detalhes: '. [S. l.]: edição dos autores, 2020.',
    url: 'https://rafaelizbicki.com/AME.pdf',
    instituicao: 'UFSCar',
  },
  souzaFilhoCpe775: {
    autores: 'SOUZA FILHO, J. B. O.',
    obra: 'Aprendizado de Máquina (CPE 775)',
    detalhes: '. Programa de Engenharia Elétrica. Rio de Janeiro: COPPE/UFRJ, [s. d.].',
    url: 'https://sites.google.com/site/jbosouzafilho/disc/pee-coppe/am',
    instituicao: 'UFRJ',
  },
  morettin2025: {
    autores: 'MORETTIN, P. A.; SINGER, J. M.',
    obra: 'Estatística e ciência de dados',
    detalhes: '. Rio de Janeiro: LTC, 2025.',
    url: 'https://repositorio.usp.br/item/003233917',
    instituicao: 'IME-USP',
  },
  yuCs50Ai: {
    autores: 'YU, B.; MALAN, D. J.',
    obra: "CS50's Introduction to Artificial Intelligence with Python",
    detalhes: '. Cambridge, MA: Harvard University, [s. d.].',
    url: 'https://cs50.harvard.edu/ai/',
    instituicao: 'Harvard',
  },

  /* Dados e sensores --------------------------------------------------- */
  wickham2014: {
    autores: 'WICKHAM, H.',
    titulo: 'Tidy data',
    obra: 'Journal of Statistical Software',
    detalhes: ', v. 59, n. 10, 2014.',
    doi: '10.18637/jss.v059.i10',
    instituicao: 'Journal of Statistical Software',
  },
  gebru2021: {
    autores: 'GEBRU, T. et al.',
    titulo: 'Datasheets for datasets',
    obra: 'Communications of the ACM',
    detalhes: ', v. 64, n. 12, p. 86-92, 2021.',
    doi: '10.1145/3458723',
    instituicao: 'Microsoft Research',
  },
  bulling2014: {
    autores: 'BULLING, A.; BLANKE, U.; SCHIELE, B.',
    titulo: 'A tutorial on human activity recognition using body-worn inertial sensors',
    obra: 'ACM Computing Surveys',
    detalhes: ', v. 46, n. 3, p. 1-33, 2014.',
    doi: '10.1145/2499621',
    instituicao: 'Max Planck Institute',
  },
  anguita2013: {
    autores: 'ANGUITA, D.; GHIO, A.; ONETO, L.; PARRA, X.; REYES-ORTIZ, J. L.',
    titulo: 'A public domain dataset for human activity recognition using smartphones',
    obra: 'Proceedings of the European Symposium on Artificial Neural Networks (ESANN)',
    detalhes: '. Bruges, 2013.',
    url: 'https://www.esann.org/sites/default/files/proceedings/legacy/es2013-84.pdf',
    instituicao: 'Università di Genova · UPC',
  },
  vergara2012: {
    autores: 'VERGARA, A. et al.',
    titulo: 'Chemical gas sensor drift compensation using classifier ensembles',
    obra: 'Sensors and Actuators B: Chemical',
    detalhes: ', v. 166-167, p. 320-329, 2012.',
    doi: '10.1016/j.snb.2012.01.074',
    instituicao: 'UC San Diego',
  },

  /* Avaliação e armadilhas --------------------------------------------- */
  fawcett2006: {
    autores: 'FAWCETT, T.',
    titulo: 'An introduction to ROC analysis',
    obra: 'Pattern Recognition Letters',
    detalhes: ', v. 27, n. 8, p. 861-874, 2006.',
    doi: '10.1016/j.patrec.2005.10.010',
    instituicao: 'Pattern Recognition Letters',
  },
  saito2015: {
    autores: 'SAITO, T.; REHMSMEIER, M.',
    titulo: 'The precision-recall plot is more informative than the ROC plot when evaluating binary classifiers on imbalanced datasets',
    obra: 'PLOS ONE',
    detalhes: ', v. 10, n. 3, e0118432, 2015.',
    doi: '10.1371/journal.pone.0118432',
    instituicao: 'University of Bergen',
  },
  hyndman2021: {
    autores: 'HYNDMAN, R. J.; ATHANASOPOULOS, G.',
    obra: 'Forecasting: principles and practice',
    detalhes: '. 3. ed. Melbourne: OTexts, 2021.',
    url: 'https://otexts.com/fpp3/',
    instituicao: 'Monash University',
  },
  kaufman2012: {
    autores: 'KAUFMAN, S.; ROSSET, S.; PERLICH, C.; STITELMAN, O.',
    titulo: 'Leakage in data mining: formulation, detection, and avoidance',
    obra: 'ACM Transactions on Knowledge Discovery from Data',
    detalhes: ', v. 6, n. 4, p. 1-21, 2012.',
    doi: '10.1145/2382577.2382579',
    instituicao: 'Tel Aviv University',
  },
  kapoor2023: {
    autores: 'KAPOOR, S.; NARAYANAN, A.',
    titulo: 'Leakage and the reproducibility crisis in machine-learning-based science',
    obra: 'Patterns',
    detalhes: ', v. 4, n. 9, 100804, 2023.',
    doi: '10.1016/j.patter.2023.100804',
    instituicao: 'Princeton',
  },
  he2009: {
    autores: 'HE, H.; GARCIA, E. A.',
    titulo: 'Learning from imbalanced data',
    obra: 'IEEE Transactions on Knowledge and Data Engineering',
    detalhes: ', v. 21, n. 9, p. 1263-1284, 2009.',
    doi: '10.1109/TKDE.2008.239',
    instituicao: 'Stevens Institute of Technology',
  },
  holte1993: {
    autores: 'HOLTE, R. C.',
    titulo: 'Very simple classification rules perform well on most commonly used datasets',
    obra: 'Machine Learning',
    detalhes: ', v. 11, n. 1, p. 63-90, 1993.',
    doi: '10.1023/A:1022631118932',
    instituicao: 'University of Ottawa',
  },
  sculley2015: {
    autores: 'SCULLEY, D. et al.',
    titulo: 'Hidden technical debt in machine learning systems',
    obra: 'Advances in Neural Information Processing Systems',
    detalhes: ', v. 28, 2015.',
    url: 'https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html',
    instituicao: 'Google Research · NeurIPS',
  },

  /* Ferramentas e agentes de IA ---------------------------------------- */
  pedregosa2011: {
    autores: 'PEDREGOSA, F. et al.',
    titulo: 'Scikit-learn: machine learning in Python',
    obra: 'Journal of Machine Learning Research',
    detalhes: ', v. 12, n. 85, p. 2825-2830, 2011.',
    url: 'https://jmlr.org/papers/v12/pedregosa11a.html',
    instituicao: 'INRIA',
  },
  breiman2017: {
    autores: 'BREIMAN, L.; FRIEDMAN, J. H.; OLSHEN, R. A.; STONE, C. J.',
    obra: 'Classification and regression trees',
    detalhes: '. New York: Routledge, 2017. Publicado originalmente em 1984.',
    doi: '10.1201/9781315139470',
    instituicao: 'UC Berkeley · Stanford',
  },
  mitSloanPrompts: {
    autores: 'MIT SLOAN TEACHING & LEARNING TECHNOLOGIES',
    obra: 'Effective prompts for AI: the essentials',
    detalhes: '. Cambridge, MA: MIT Sloan School of Management, [s. d.].',
    url: 'https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/',
    instituicao: 'MIT',
  },
  liu2023: {
    autores: 'LIU, J.; XIA, C. S.; WANG, Y.; ZHANG, L.',
    titulo: 'Is your code generated by ChatGPT really correct? Rigorous evaluation of large language models for code generation',
    obra: 'Advances in Neural Information Processing Systems',
    detalhes: ', v. 36, 2023.',
    url: 'https://proceedings.neurips.cc/paper_files/paper/2023/file/43e9d647ccd3e4b7b5baab53f0368686-Paper-Conference.pdf',
    instituicao: 'University of Illinois Urbana-Champaign',
  },

  buitinck2013: {
    autores: 'BUITINCK, L. et al.',
    titulo: 'API design for machine learning software: experiences from the scikit-learn project',
    obra: 'European Conference on Machine Learning and Principles and Practices of Knowledge Discovery in Databases (ECML PKDD)',
    detalhes: ', 2013.',
    url: 'https://arxiv.org/abs/1309.0238',
    instituicao: 'Inria · Universidade de Amsterdã',
  },
  sklearnSobre: {
    autores: 'SCIKIT-LEARN',
    obra: 'About us: history of the project',
    detalhes: '. Documentação oficial.',
    url: 'https://scikit-learn.org/stable/about.html',
    instituicao: 'Documentação técnica',
  },
  sklearnDepoimentos: {
    autores: 'SCIKIT-LEARN',
    obra: 'Who is using scikit-learn?',
    detalhes: '. Depoimentos de empresas e instituições.',
    url: 'https://scikit-learn.org/stable/testimonials/testimonials.html',
    instituicao: 'Documentação técnica',
  },
  sklearnGithub: {
    autores: 'SCIKIT-LEARN',
    obra: 'Repositório do projeto no GitHub',
    detalhes: '. Dados de contribuidores consultados em setembro de 2026.',
    url: 'https://github.com/scikit-learn/scikit-learn',
    instituicao: 'Dados públicos do projeto',
  },
  pypiEstatisticas: {
    autores: 'PYPI STATS',
    obra: 'scikit-learn: estatísticas de download',
    detalhes: '. Números consultados em setembro de 2026.',
    url: 'https://pypistats.org/packages/scikit-learn',
    instituicao: 'Dados públicos do projeto',
  },
  inriaMooc: {
    autores: 'INRIA',
    obra: 'Machine learning in Python with scikit-learn',
    detalhes: '. Curso aberto, mantido pela equipe que desenvolve a biblioteca.',
    url: 'https://inria.github.io/scikit-learn-mooc/',
    instituicao: 'Inria',
  },
  berkeleyData100: {
    autores: 'UNIVERSITY OF CALIFORNIA, BERKELEY',
    obra: 'Data 100: principles and techniques of data science',
    detalhes: '. Notas de aula, capítulo sobre sklearn.',
    url: 'https://ds100.org/course-notes/',
    instituicao: 'UC Berkeley',
  },
  univespSklearn: {
    autores: 'UNIVESP',
    obra: 'Introdução à Ciência de Dados: introdução às bibliotecas Scikit-Learn, MatPlotLib e Seaborn',
    detalhes: '. Videoaula. Professor José Eduardo Santarem Segundo.',
    url: 'https://www.youtube.com/watch?v=J4iwm0r2iwo',
    instituicao: 'UNIVESP',
  },

  /* Hardware e sistemas embarcados ------------------------------------- */
  warden2019: {
    autores: 'WARDEN, P.; SITUNAYAKE, D.',
    obra: 'TinyML: machine learning with TensorFlow Lite on Arduino and ultra-low-power microcontrollers',
    detalhes: '. Sebastopol: O\'Reilly Media, 2019.',
    instituicao: "O'Reilly",
  },
  reddi2022: {
    autores: 'JANAPA REDDI, V. et al.',
    titulo: 'Widening access to applied machine learning with TinyML',
    obra: 'Harvard Data Science Review',
    detalhes: ', 2022.',
    doi: '10.1162/99608f92.762d171a',
    instituicao: 'Harvard',
  },
  reddiMlsys: {
    autores: 'JANAPA REDDI, V.',
    obra: 'Machine learning systems',
    detalhes: '. Cambridge, MA: Harvard University, [s. d.]. Livro aberto.',
    url: 'https://mlsysbook.ai/',
    instituicao: 'Harvard',
  },
  espressifMemoria: {
    autores: 'ESPRESSIF SYSTEMS',
    obra: 'ESP-IDF programming guide: memory types (ESP32)',
    detalhes: '. [S. l.]: Espressif, [s. d.].',
    url: 'https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-guides/memory-types.html',
    instituicao: 'Documentação técnica',
  },
  domingues2022: {
    autores: 'DOMINGUES, R. M.',
    obra: 'Desenvolvimento de uma central de monitoramento ambiental baseada em sistema embarcado utilizando tecnologia IOT',
    detalhes: '. 2022. Trabalho de Conclusão de Curso (Licenciatura em Computação), Universidade Federal Fluminense, Santo Antônio de Pádua, 2022.',
    url: 'https://app.uff.br/riuff/handle/1/28921',
    instituicao: 'UFF',
  },
  guedes2018: {
    autores: 'GUEDES, F. S.',
    obra: 'Internet das coisas (IoT, Internet of Things): implementação de um medidor de energia elétrica com conexão a Internet',
    detalhes: '. 2018. Trabalho de Conclusão de Curso (Tecnologia em Sistemas de Computação), Universidade Federal Fluminense, Niterói, 2018.',
    url: 'https://app.uff.br/riuff/handle/1/8792',
    instituicao: 'UFF',
  },
};
