import type { Dictionary } from "../i18n";

const pt: Dictionary = {
  brand: "KeyCheats",
  tagline: "Folhas de atalhos de teclado que permanecem exatas.",
  metaDesc: "Folhas de atalhos pesquisáveis e imprimíveis para VS Code, macOS, Windows, Chrome e GitHub. Descrições reais, teclas Mac ⇄ Windows — tudo no seu navegador.",

  nav: {
    tools: "Todas as ferramentas",
    categories: "Categorias",
    about: "Sobre",
    menu: "Menu",
    language: "Idioma",
  },

  home: {
    heroTitle: "Cada atalho que importa — pesquisável, imprimível, nunca desatualizado",
    heroSub: "{n} folhas de atalhos com descrições reais, teclas conforme o seu OS e busca instantânea. Sem anúncios nem cadastro.",
    browseAll: "Ver todas as ferramentas",
    categoriesTitle: "Categorias",
    featuredTitle: "Ferramentas populares",
    trustLocal: "Seus arquivos ficam no seu dispositivo",
    trustFree: "Grátis, sem conta",
    trustFast: "Instantâneo, funciona offline",
    rotating: [
      "VS Code, macOS, Windows, Chrome, GitHub — cada folha conferida com a documentação oficial",
      "Alterne entre Mac e Windows e as teclas se ajustam sozinhas",
      "Pesquise entre mais de 125 atalhos por nome, descrição ou tecla",
      "Imprima uma referência limpa para a mesa em um clique",
    ],
    statsLabels: { tools: "ferramentas", languages: "idiomas", uploads: "envios", accounts: "contas" },
    eyebrow: "Grátis sempre",
    heroCtaSecondary: "Como funciona",
    statsTools: "{n} ferramentas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 envios",
    statsAccounts: "0 contas",
    categoriesSub: "Uma folha por app: cada atalho agrupado, descrito e pesquisável.",
    popularSub: "As ferramentas mais usadas.",
    privacyTitle: "Seus atalhos nunca saem do navegador.",
    privacySub: "Não há etapa de envio nem servidor. As folhas são dados e JavaScript rodando no seu navegador — não é uma promessa de política, é como são construídas.",
    privacyPoint1T: "Processamento local",
    privacyPoint1D: "Busca, detecção de OS, desenho de teclas e verificação de conflitos rodam na memória do seu dispositivo. Nada é transmitido.",
    privacyPoint2T: "Sem contas",
    privacyPoint2D: "Sem cadastro, sem e-mail, sem histórico. Abra e use.",
    privacyPoint3T: "Honestos por design",
    privacyPoint3D: "Se algo não dá para fazer no navegador, dizemos em vez de fingir.",
    privacyLink: "Ler a nota de privacidade",
    endTitle: "Ache a tecla. Aperte. Volte ao trabalho.",
    endSub: "Pesquisável, imprimível, em 15 idiomas.",
  },

  tools: {
    title: "Todas as ferramentas",
    subtitle: "Pesquise entre {count} ferramentas gratuitas. Sem uploads, sem cadastro.",
    filterPlaceholder: "Pesquisar ferramentas…",
    count: "{count} ferramentas",
    empty: "Nenhuma ferramenta corresponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Junte, divida, converta e edite PDFs sem enviar nada para servidores." },
    image: { name: "Imagem", desc: "Comprima, redimensione, recorte e converta imagens no navegador." },
    text: { name: "Texto", desc: "Conte, limpe, ordene e transforme texto na hora, enquanto digita." },
    developer: { name: "Desenvolvedor", desc: "Folhas de atalhos, visualização de teclas e verificação de duplicatas para o trabalho diário no teclado." },
    seo: { name: "SEO", desc: "Meta tags, dados estruturados, prévia de SERP e outros auxiliares de SEO." },
    security: { name: "Segurança", desc: "Senhas, hashes e consultas — gerados e verificados no seu dispositivo." },
    utility: { name: "Utilidades", desc: "Conversores de unidades, calculadoras e ajudas do cotidiano." },
  },

  tool: {
    howTo: "Como usar",
    faq: "Perguntas frequentes",
    related: "Ferramentas relacionadas",
    privacyNote:
      "Esta ferramenta roda inteiramente no seu navegador. Seus dados nunca saem do seu dispositivo e não são enviados a nenhum servidor.",
    inCategory: "Mais em {category}",
    backToCategory: "Todas as ferramentas de {category}",
  },

  common: {
    copy: "Copiar",
    copied: "Copiado",
    download: "Baixar",
    reset: "Redefinir",
    swap: "Inverter",
    clear: "Limpar",
    error: "Algo deu errado. Verifique os dados e tente novamente.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opções",
    dropFiles: "Arraste arquivos aqui ou clique para escolher",
    dropFile: "Arraste um arquivo aqui ou clique para escolher",
    processing: "Processando…",
    fileSize: "Tamanho",
    sample: "Testar um exemplo",
    uppercase: "MAIÚSCULAS",
  },

  unit: {
    from: "De",
    to: "Para",
    amount: "Quantidade",
    result: "Resultado",
    common: "Conversões comuns",
    formula: "Fórmula",
    allUnits: "Todas as unidades",
  },

  text: {
    stats: {
      words: "Palavras",
      characters: "Caracteres",
      charsNoSpaces: "Sem espaços",
      sentences: "Frases",
      paragraphs: "Parágrafos",
      lines: "Linhas",
      readingTime: "Tempo de leitura",
      readingMinutes: "{n} min de leitura",
    },
  },

  footer: {
    line: "Cada atalho passa pelo seu teclado — cada folha roda no seu navegador.",
    privacy: "Privacidade",
    terms: "Termos",
    about: "Sobre",
    badges: "Selos",
    language: "Idioma",
  },

  badge: {
    title: "Selos do KeyCheats",
    desc: "Coloque um selo do KeyCheats no seu site, README ou documentação. Ele aponta para cá e conta que as folhas de atalhos permanecem exatas e rodam inteiramente no navegador.",
    voluntary: "Incorporar é totalmente voluntário — escolha um selo se gostar do projeto. Não precisa de permissão.",
    md: "Markdown (README)",
    html: "HTML (site)",
    thanks: "Obrigado por divulgar — cada incorporação ajuda mais pessoas a descobrir ferramentas que respeitam seus arquivos.",
  },

    embed: {
    title: "Incorporar esta ferramenta",
    desc: "Coloque esta ferramenta no seu site com uma linha — ela roda no navegador do visitante.",
  },

    mcp: {
    title: "Servidor MCP — ferramentas acessíveis para IA",
    desc1: "O KeyCheats traz um servidor MCP (Model Context Protocol): assistentes de IA como Claude ou Cursor podem pesquisar o conjunto de atalhos, detectar duplicatas e desenhar teclas — a mesma lógica testada do site, sem reimplementar.",
    desc2: "As ferramentas executam as funções puras do site sobre o mesmo conjunto curado (VS Code, macOS, Windows, Chrome, GitHub). A execução acontece na máquina do cliente de IA via npx — nada é enviado aos nossos servidores.",
    toolsTitle: "Ferramentas executáveis ({n})",
    requiresNode: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
    privacy: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
  },

    notFound: {
    title: "Página não encontrada",
    body: "A ferramenta que você procura não existe. Explore todas as ferramentas.",
    home: "Ir para a página inicial",
  },
};

export default pt;
