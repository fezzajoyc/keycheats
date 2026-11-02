import { defineTool } from "../_lib/types";
import { ShortcutConflictCheckerEngine } from "../_engines/shortcut-conflict-checker";

export default defineTool({
  slug: "shortcut-conflict-checker",
  category: "developer",
  icon: "shield",
  engine: { component: ShortcutConflictCheckerEngine, props: {} },
  copy: {
    en: {
      name: "Shortcut Conflict Checker",
      tagline:
        "Paste your app's shortcut list and instantly spot duplicate bindings — case-insensitive, order-insensitive, label-blind. Built for app developers and power users.",
      intro: [
        "Duplicate shortcut bindings are easy to create and annoying to find: 'Ctrl+C Copy' in one config file, 'ctrl+c Copy selection' in another, 'Shift+Ctrl+P' where 'Ctrl+Shift+P' already lives. This checker reads a plain list — one shortcut per line — and reports every group of lines that resolves to the same binding.",
        "The comparison is deliberately forgiving: case is ignored (Ctrl+C == ctrl+c), key order is ignored (Ctrl+Shift+P == Shift+Ctrl+P), and the trailing label never participates. Modifier symbols and names are the same key (⌘C and Cmd+C and Ctrl+C all match), so lists pasted from Mac and Windows sources still compare correctly.",
        "Paste straight from your keymap, README, editor config or design spec — the report also flags lines where no keys could be recognised, so typos don't silently skip the check. Everything runs locally as you type.",
      ],
      steps: [
        "Paste your shortcut list, one binding per line: 'Ctrl+Shift+P Command palette'.",
        "The report updates as you type — duplicates are grouped and highlighted.",
        "Fix the flagged lines in your source, re-paste to confirm.",
        "Copy the report text for a code review or issue comment.",
      ],
      faqs: [
        {
          q: "What line format does it expect?",
          a: "Keys first, then an optional label: '⌘C Copy', 'Ctrl+Shift+P Command palette', 'G B File finder'. Keys may be plus-joined, space-separated or written as compact Mac symbols. Lines with no recognisable keys are reported as unparsed instead of silently ignored.",
        },
        {
          q: "Are ⌘C and Ctrl+C treated as the same binding?",
          a: "Yes. ⌘, Cmd, Command, Meta and Win all normalise to the same modifier, so a list pasted from macOS documentation and one pasted from Windows docs can be checked together without pre-converting.",
        },
        {
          q: "Does 'Ctrl+Shift+P' conflict with 'Shift+Ctrl+P'?",
          a: "Yes — that is the point. Physical users press the same keys either way, so order is normalised before comparison. A genuine chord like 'Ctrl+K Z' is distinct from 'Ctrl+Z', but two spellings of the same chord are a conflict.",
        },
        {
          q: "Who is this for?",
          a: "App developers documenting a keymap, teams writing UX guidelines, plugin authors whose shortcut tables grew organically, and power users merging configs from multiple sources.",
        },
      ],
    },
    zh: {
      name: "快捷键冲突检查",
      tagline:
        "粘贴你应用的快捷键清单,立刻找出重复绑定——忽略大小写、忽略按键顺序、不比较标签。为应用开发者和高级用户打造。",
      intro: [
        "重复的快捷键绑定很容易产生,却很难发现:一个配置文件里写着「Ctrl+C 复制」,另一个写着「ctrl+c 拷贝文本」,还有人在「Ctrl+Shift+P」已存在的地方写了「Shift+Ctrl+P」。这个检查器读取纯文本清单——每行一条——并把解析成同一绑定的所有行分组报告。",
        "比较规则刻意宽松:忽略大小写(Ctrl+C == ctrl+c)、忽略按键顺序(Ctrl+Shift+P == Shift+Ctrl+P)、后面的标签不参与比较。修饰键的符号和名称视为同一个键(⌘C、Cmd+C、Ctrl+C 互相匹配),所以从 Mac 和 Windows 来源粘贴的清单也能直接对比。",
        "可以直接从键位表、README、编辑器配置或设计规范里粘贴——报告还会标出无法识别按键的行,避免拼写错误悄悄跳过检查。全部在输入时于本地完成。",
      ],
      steps: [
        "粘贴你的快捷键清单,每行一条:如「Ctrl+Shift+P 命令面板」。",
        "报告随输入实时更新——重复项会被分组并高亮。",
        "在源头修改被标记的行,再粘贴回来确认。",
        "复制报告文本,用于代码评审或 issue 评论。",
      ],
      faqs: [
        {
          q: "支持什么行格式?",
          a: "按键在前,标签可选:「⌘C 复制」「Ctrl+Shift+P 命令面板」「G B 文件查找器」。按键可以用加号连接、空格分隔或写成紧凑的 Mac 符号。没有可识别按键的行会被报告为「未解析」,而不是静默忽略。",
        },
        {
          q: "⌘C 和 Ctrl+C 会被视为同一个绑定吗?",
          a: "会。⌘、Cmd、Command、Meta 和 Win 都会归一为同一个修饰键,所以从 macOS 文档和 Windows 文档分别粘贴的清单可以直接放在一起检查,无需预先转换。",
        },
        {
          q: "「Ctrl+Shift+P」和「Shift+Ctrl+P」算冲突吗?",
          a: "算——这正是它的用途。用户两只手按同样的键没有顺序之分,所以比较前会归一按键顺序。真正的和弦键如「Ctrl+K Z」与「Ctrl+Z」不同,但同一个和弦的两种写法就是冲突。",
        },
        {
          q: "这个工具给谁用?",
          a: "写键位文档的应用开发者、制定 UX 规范的团队、快捷键表野蛮生长的插件作者,以及要合并多来源配置的高级用户。",
        },
      ],
    },
    ja: {
      name: "ショートカット競合チェッカー",
      tagline:
        "アプリのショートカット一覧を貼り付けると重複バインドを即検出——大小文字・キー順・ラベルを無視。アプリ開発者とパワーユーザーのために。",
      intro: [
        "重複したショートカット割り当ては作りやすく、見つけにくいものです:ある設定ファイルには「Ctrl+C コピー」、別のファイルには「ctrl+c テキストをコピー」、「Ctrl+Shift+P」があるのに「Shift+Ctrl+P」を追加——このチェッカーは 1 行 1 つのプレーンなリストを読み込み、同じバインドに解決される行をすべてグループ化して報告します。",
        "比較は意図的に寛容です:大小文字を無視(Ctrl+C == ctrl+c)、キー順を無視(Ctrl+Shift+P == Shift+Ctrl+P)、末尾のラベルは一切比較しません。修飾キーの記号と名前は同じキー(⌘C と Cmd+C と Ctrl+C はすべて一致)なので、Mac と Windows の資料から貼ったリストをそのまま比較できます。",
        "キーマップ、README、エディタ設定、デザイン仕様からそのまま貼り付けてください——キーを認識できなかった行も報告されるので、タイプミスが黙ってチェックをすり抜けることはありません。入力しながらすべてローカルで処理されます。",
      ],
      steps: [
        "ショートカット一覧を 1 行 1 つで貼り付け:「Ctrl+Shift+P コマンドパレット」。",
        "入力に合わせてレポートが更新——重複はグループ化して強調表示。",
        "ソース側で指摘行を修正し、貼り直して確認。",
        "レポートをコピーしてコードレビューや issue コメントに。",
      ],
      faqs: [
        {
          q: "どんな行形式に対応していますか?",
          a: "キーを先に、ラベルは任意:「⌘C コピー」「Ctrl+Shift+P コマンドパレット」「G B ファイル検索」。キーはプラス接続・スペース区切り・密な Mac 記号のいずれでも構いません。キーを認識できない行は黙って無視されず「未解析」として報告されます。",
        },
        {
          q: "⌘C と Ctrl+C は同じバインド扱いですか?",
          a: "はい。⌘・Cmd・Command・Meta・Win はすべて同じ修飾キーに正規化されるので、macOS のドキュメントから貼ったリストと Windows のドキュメントから貼ったリストを事前変換なしで一緒にチェックできます。",
        },
        {
          q: "「Ctrl+Shift+P」と「Shift+Ctrl+P」は競合しますか?",
          a: "します——それがこのツールの目的です。ユーザーはどちらの順序でも同じキーを押すので、比較前に順序を正規化します。本物のチェーン「Ctrl+K Z」は「Ctrl+Z」とは別ですが、同じチェーンの別の書き方は競合です。",
        },
        {
          q: "誰のためのツールですか?",
          a: "キーマップを文書化するアプリ開発者、UX ガイドラインを書くチーム、ショートカット表が有機的に育ったプラグイン作者、複数ソースの設定を統合するパワーユーザー。",
        },
      ],
    },
    es: {
      name: "Detector de atajos duplicados",
      tagline:
        "Pega la lista de atajos de tu app y detecta al instante las combinaciones duplicadas — sin distinción de mayúsculas, orden ni etiqueta. Para desarrolladores y usuarios avanzados.",
      intro: [
        "Las combinaciones duplicadas se crean con facilidad y cuesta encontrarlas: «Ctrl+C Copiar» en un archivo de configuración, «ctrl+c Copiar texto» en otro, «Shift+Ctrl+P» donde ya vivía «Ctrl+Shift+P». Este detector lee una lista simple — un atajo por línea — y agrupa todas las líneas que resuelven al mismo binding.",
        "La comparación es deliberadamente tolerante: ignora mayúsculas (Ctrl+C == ctrl+c), ignora el orden de las teclas (Ctrl+Shift+P == Shift+Ctrl+P) y la etiqueta final nunca participa. Los símbolos y nombres de modificadores son la misma tecla (⌘C, Cmd+C y Ctrl+C coinciden), así que las listas pegadas de fuentes Mac y Windows se comparan bien.",
        "Pega directo desde tu mapa de teclas, README, configuración del editor o especificación de diseño — el informe también marca las líneas donde no se reconocieron teclas, para que un typo no se salte la comprobación en silencio. Todo se ejecuta en local mientras escribes.",
      ],
      steps: [
        "Pega tu lista de atajos, una combinación por línea: «Ctrl+Shift+P Paleta de comandos».",
        "El informe se actualiza al escribir — los duplicados se agrupan y resaltan.",
        "Corrige las líneas marcadas en el origen y vuelve a pegar para confirmar.",
        "Copia el texto del informe para una revisión de código o un comentario.",
      ],
      faqs: [
        {
          q: "¿Qué formato de línea espera?",
          a: "Las teclas primero y una etiqueta opcional: «⌘C Copiar», «Ctrl+Shift+P Paleta», «G B Buscador de archivos». Las teclas pueden ir unidas por signos, separadas por espacios o en símbolos compactos de Mac. Las líneas sin teclas reconocibles se informan como no analizadas.",
        },
        {
          q: "¿⌘C y Ctrl+C cuentan como el mismo binding?",
          a: "Sí. ⌘, Cmd, Command, Meta y Win se normalizan al mismo modificador, así que una lista pegada de documentación de macOS y otra de Windows se pueden comprobar juntas sin convertir nada.",
        },
        {
          q: "¿«Ctrl+Shift+P» entra en conflicto con «Shift+Ctrl+P»?",
          a: "Sí — para eso existe. El usuario pulsa las mismas teclas en cualquier orden, así que el orden se normaliza antes de comparar. Una cadena real como «Ctrl+K Z» es distinta de «Ctrl+Z», pero dos escrituras de la misma cadena son un conflicto.",
        },
        {
          q: "¿Para quién es esta herramienta?",
          a: "Para desarrolladores que documentan un mapa de teclas, equipos que escriben guías de UX, autores de plugins cuyas tablas crecieron por acumulación y usuarios avanzados que combinan configuraciones de varias fuentes.",
        },
      ],
    },
    pt: {
      name: "Verificador de conflitos de atalhos",
      tagline:
        "Cole a lista de atalhos do seu app e encontre na hora as combinações duplicadas — ignora maiúsculas, ordem das teclas e rótulos. Feito para desenvolvedores e usuários avançados.",
      intro: [
        "Combinações duplicadas são fáceis de criar e difíceis de achar: “Ctrl+C Copiar” num arquivo de configuração, “ctrl+c Copiar texto” em outro, “Shift+Ctrl+P” onde “Ctrl+Shift+P” já existia. Este verificador lê uma lista simples — um atalho por linha — e agrupa todas as linhas que resolvem para o mesmo binding.",
        "A comparação é propositalmente tolerante: ignora maiúsculas (Ctrl+C == ctrl+c), ignora a ordem das teclas (Ctrl+Shift+P == Shift+Ctrl+P) e o rótulo no final nunca participa. Símbolos e nomes de modificadores são a mesma tecla (⌘C, Cmd+C e Ctrl+C coincidem), então listas coladas de fontes Mac e Windows se comparam corretamente.",
        "Cole direto do seu mapa de teclas, README, configuração do editor ou especificação de design — o relatório também marca as linhas em que nenhuma tecla foi reconhecida, para que um erro de digitação não escape da checagem em silêncio. Tudo roda localmente enquanto você digita.",
      ],
      steps: [
        "Cole sua lista de atalhos, uma combinação por linha: “Ctrl+Shift+P Paleta de comandos”.",
        "O relatório atualiza enquanto você digita — duplicatas são agrupadas e destacadas.",
        "Corrija as linhas marcadas na origem e cole de novo para confirmar.",
        "Copie o texto do relatório para uma revisão de código ou comentário.",
      ],
      faqs: [
        {
          q: "Qual formato de linha ele espera?",
          a: "Teclas primeiro, rótulo opcional: “⌘C Copiar”, “Ctrl+Shift+P Paleta”, “G B Buscador de arquivos”. As teclas podem vir unidas por mais, separadas por espaço ou em símbolos compactos de Mac. Linhas sem teclas reconhecíveis são reportadas como não analisadas.",
        },
        {
          q: "⌘C e Ctrl+C contam como o mesmo binding?",
          a: "Sim. ⌘, Cmd, Command, Meta e Win normalizam para o mesmo modificador, então uma lista colada da documentação do macOS e outra do Windows podem ser verificadas juntas sem conversão prévia.",
        },
        {
          q: "“Ctrl+Shift+P” conflita com “Shift+Ctrl+P”?",
          a: "Sim — é exatamente para isso. O usuário aperta as mesmas teclas em qualquer ordem, então a ordem é normalizada antes da comparação. Uma sequência real como “Ctrl+K Z” é distinta de “Ctrl+Z”, mas duas grafias da mesma sequência são um conflito.",
        },
        {
          q: "Para quem é esta ferramenta?",
          a: "Para desenvolvedores documentando um mapa de teclas, times escrevendo guias de UX, autores de plugins cujas tabelas cresceram organicamente e usuários avançados mesclando configurações de várias fontes.",
        },
      ],
    },
  },
  related: ["shortcut-sheets", "key-visualizer"],
});
