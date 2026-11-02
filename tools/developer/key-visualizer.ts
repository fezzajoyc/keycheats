import { defineTool } from "../_lib/types";
import { KeyVisualizerEngine } from "../_engines/key-visualizer";

export default defineTool({
  slug: "key-visualizer",
  category: "developer",
  icon: "palette",
  engine: { component: KeyVisualizerEngine, props: {} },
  copy: {
    en: {
      name: "Key Visualizer",
      tagline:
        "Turn any keyboard shortcut into clean keycaps: paste ⌘⇧P or Ctrl+Shift+P and get the real key look, plus copy-ready Mac and Windows text.",
      intro: [
        "Documentation screenshots of key combos age badly and mockups with plain text like 'Cmd+Shift+P' read flat. This visualizer renders any shortcut as keyboard keycaps — the inset-shadow, thick-bottom-edge look of real keys — in a size you can screenshot or paste into docs.",
        "Paste a combo in any common notation ('⌘⇧P', 'Ctrl+Shift+P', 'Ctrl K Z' chord) or build one by tapping modifier keys and typing the main key. Toggle the OS and the same combo is rewritten in the other notation, so you can produce both the Mac and the Windows variant from one input.",
        "The copy button gives you plain text in the selected style: tight Mac symbols (⌘⇧P) or Windows plus-notation (Ctrl+Shift+P). Everything is parsed and rendered locally — nothing you paste leaves the page.",
      ],
      steps: [
        "Paste a shortcut in any notation, or tap modifier keys to build one.",
        "Type the main key (a letter, F-key or arrow) to complete the combo.",
        "Switch macOS / Windows to rewrite the combo in the other style.",
        "Copy the formatted text, or screenshot the rendered keycaps.",
      ],
      faqs: [
        {
          q: "Which input formats are understood?",
          a: "Modifier symbols (⌘ ⌥ ⇧ ⌃), Windows-style names joined with plus signs (Ctrl+Shift+P), space-separated chords (Ctrl K Z), and compact Mac notation (⌘⇧P). Unrecognised parts are ignored rather than crashing.",
        },
        {
          q: "Is the Mac ⇄ Windows rewrite mechanical?",
          a: "Yes, deliberately: this tool maps symbols by convention (⌘→Ctrl, ⌥→Alt, ⇧→Shift), which is what you want when styling the same app's shortcut for a second platform. It is different from the shortcut sheets tool, where the cross-OS column shows curated real equivalents.",
        },
        {
          q: "Can I use the keycaps in my own docs?",
          a: "Yes — screenshot them, or copy the formatted text. The rendering is plain HTML/CSS keycaps with no external assets, so it prints cleanly too.",
        },
      ],
    },
    zh: {
      name: "按键可视化",
      tagline:
        "把任意快捷键变成干净的键帽:粘贴 ⌘⇧P 或 Ctrl+Shift+P,得到真实键帽外观,并复制成 Mac 和 Windows 两种写法。",
      intro: [
        "文档截图里的按键组合很快就过时,而纯文本写法的「Cmd+Shift+P」又太单薄。这个可视化工具把任意快捷键渲染成键盘键帽——内阴影、加厚底边,真实的按键质感,大小适合截图或直接贴进文档。",
        "支持任意常见写法的粘贴(「⌘⇧P」「Ctrl+Shift+P」「Ctrl K Z」和弦),也可以点选修饰键、输入主键来拼装。切换操作系统,同一个组合会自动改写成另一种写法,一次输入同时得到 Mac 和 Windows 两个版本。",
        "复制按钮输出所选风格的纯文本:Mac 紧凑符号(⌘⇧P)或 Windows 加号写法(Ctrl+Shift+P)。解析和渲染全部在本地完成,粘贴的内容不会离开页面。",
      ],
      steps: [
        "粘贴任意写法的快捷键,或点选修饰键拼装。",
        "输入主键(字母、F 键或方向键)补全组合。",
        "切换 macOS / Windows,改写成另一种风格。",
        "复制格式化文本,或直接截图渲染好的键帽。",
      ],
      faqs: [
        {
          q: "支持哪些输入格式?",
          a: "修饰键符号(⌘ ⌥ ⇧ ⌃)、加号连接的 Windows 写法(Ctrl+Shift+P)、空格分隔的和弦(Ctrl K Z),以及紧凑的 Mac 写法(⌘⇧P)。无法识别的部分会被忽略,不会报错崩溃。",
        },
        {
          q: "Mac ⇄ Windows 改写是机械映射吗?",
          a: "是,而且是有意为之:本工具按约定映射符号(⌘→Ctrl、⌥→Alt、⇧→Shift),适合把同一个应用的快捷键排版到第二个平台。这与快捷键速查表不同——那边的跨系统列展示的是人工核对的真实等价键。",
        },
        {
          q: "键帽可以用在自己的文档里吗?",
          a: "可以——截图或复制格式化文本即可。渲染是纯 HTML/CSS 键帽,没有外部资源,打印效果同样干净。",
        },
      ],
    },
    ja: {
      name: "キービジュアライザー",
      tagline:
        "どんなショートカットも美しいキーキャップに:⌘⇧P や Ctrl+Shift+P を貼り付けると本物のキーの見た目で表示、Mac と Windows 両方の書き方をコピーできます。",
      intro: [
        "ドキュメントのスクリーンショットはすぐ古くなり、「Cmd+Shift+P」のような平文は味気ありません。このツールは任意のショートカットをキーボードのキーキャップとして描画します——内側の影と厚い下端、本物のキーの質感で、スクリーンショットやドキュメント貼り付けにちょうど良いサイズです。",
        "一般的な表記なら何でも貼り付けられます(「⌘⇧P」「Ctrl+Shift+P」「Ctrl K Z」チェーン)。修飾キーをタップしてメインキーを入力して組み立てることもできます。OS を切り替えると同じ組み合わせがもう一方の表記に書き直され、1 回の入力で Mac 版と Windows 版の両方が作れます。",
        "コピーボタンは選択したスタイルのプレーンテキストを出力します:Mac の密な記号(⌘⇧P)か Windows のプラス表記(Ctrl+Shift+P)。解析も描画もすべてローカルで、貼り付けた内容はページから出ません。",
      ],
      steps: [
        "ショートカットを任意の表記で貼り付け、または修飾キーをタップして組み立て。",
        "メインキー(英字、F キー、矢印)を入力して組み合わせを完成。",
        "macOS / Windows を切り替えて別のスタイルに書き直し。",
        "整形テキストをコピー、または描画されたキーキャップをスクリーンショット。",
      ],
      faqs: [
        {
          q: "どの入力形式に対応していますか?",
          a: "修飾キー記号(⌘ ⌥ ⇧ ⌃)、プラス記号でつなぐ Windows 式(Ctrl+Shift+P)、スペース区切りのチェーン(Ctrl K Z)、密な Mac 式(⌘⇧P)。認識できない部分はエラーではなく無視されます。",
        },
        {
          q: "Mac ⇄ Windows の書き換えは機械的ですか?",
          a: "はい、意図的にそうです:このツールは規約に従って記号を対応させます(⌘→Ctrl、⌥→Alt、⇧→Shift)。同じアプリのショートカットを別プラットフォーム向けに整えるのに向いています。ショートカット早見表ツールとは異なり、こちらはキュレーションされた実在の等価キーを示します。",
        },
        {
          q: "キーキャップを自分のドキュメントに使えますか?",
          a: "はい——スクリーンショットを撮るか、整形テキストをコピーしてください。描画は外部リソースなしの純粋な HTML/CSS キーキャップなので、印刷してもきれいです。",
        },
      ],
    },
    es: {
      name: "Visualizador de teclas",
      tagline:
        "Convierte cualquier atajo en teclas limpias: pega ⌘⇧P o Ctrl+Shift+P y obtén el aspecto real de teclas, además del texto listo para copiar en Mac y Windows.",
      intro: [
        "Las capturas de teclas en la documentación envejecen mal y el texto plano tipo «Cmd+Shift+P» se lee sin vida. Este visualizador dibuja cualquier atajo como teclas de teclado — con la sombra interna y el borde inferior grueso de las teclas reales — en un tamaño perfecto para capturar o pegar en documentación.",
        "Pega una combinación en cualquier notación habitual («⌘⇧P», «Ctrl+Shift+P», «Ctrl K Z» en cadena) o constrúyela tocando teclas modificadoras y escribiendo la tecla principal. Cambia de OS y la misma combinación se reescribe en la otra notación: una entrada produce la variante Mac y la de Windows.",
        "El botón de copiar da texto plano en el estilo elegido: símbolos Mac compactos (⌘⇧P) o notación con signos de Windows (Ctrl+Shift+P). Todo se analiza y dibuja en local: lo que pegues nunca sale de la página.",
      ],
      steps: [
        "Pega un atajo en cualquier notación, o toca teclas modificadoras para armarlo.",
        "Escribe la tecla principal (letra, tecla F o flecha) para completar la combinación.",
        "Cambia entre macOS / Windows para reescribir en el otro estilo.",
        "Copia el texto formateado o captura las teclas dibujadas.",
      ],
      faqs: [
        {
          q: "¿Qué formatos de entrada entiende?",
          a: "Símbolos modificadores (⌘ ⌥ ⇧ ⌃), nombres tipo Windows unidos con signos (Ctrl+Shift+P), cadenas separadas por espacios (Ctrl K Z) y notación compacta de Mac (⌘⇧P). Las partes no reconocidas se ignoran sin romper nada.",
        },
        {
          q: "¿La reescritura Mac ⇄ Windows es mecánica?",
          a: "Sí, a propósito: esta herramienta mapea símbolos por convención (⌘→Ctrl, ⌥→Alt, ⇧→Shift), justo lo que necesitas al maquetar el atajo de una app para una segunda plataforma. Es distinto de la hoja de atajos, donde la otra columna muestra equivalentes reales curados.",
        },
        {
          q: "¿Puedo usar las teclas en mis propios documentos?",
          a: "Sí — captura la imagen o copia el texto formateado. El dibujo es HTML/CSS puro sin recursos externos, así que también imprime limpio.",
        },
      ],
    },
    pt: {
      name: "Visualizador de teclas",
      tagline:
        "Transforme qualquer atalho em teclas limpas: cole ⌘⇧P ou Ctrl+Shift+P e receba o visual real de teclado, além do texto pronto para copiar em Mac e Windows.",
      intro: [
        "Capturas de teclas em documentação envelhecem mal, e texto plano tipo “Cmd+Shift+P” parece sem graça. Este visualizador desenha qualquer atalho como teclas de teclado — com a sombra interna e a borda inferior grossa das teclas reais — num tamanho perfeito para capturar ou colar em documentação.",
        "Cole uma combinação em qualquer notação comum (“⌘⇧P”, “Ctrl+Shift+P”, “Ctrl K Z” em sequência) ou monte-a tocando teclas modificadoras e digitando a tecla principal. Troque o OS e a mesma combinação é reescrita na outra notação: uma entrada produz a versão Mac e a do Windows.",
        "O botão de copiar dá texto plano no estilo escolhido: símbolos Mac compactos (⌘⇧P) ou notação com mais do Windows (Ctrl+Shift+P). Tudo é analisado e desenhado localmente — o que você cola nunca sai da página.",
      ],
      steps: [
        "Cole um atalho em qualquer notação, ou toque nas teclas modificadoras para montar.",
        "Digite a tecla principal (letra, tecla F ou seta) para completar a combinação.",
        "Alterne entre macOS / Windows para reescrever no outro estilo.",
        "Copie o texto formatado ou capture as teclas desenhadas.",
      ],
      faqs: [
        {
          q: "Quais formatos de entrada são aceitos?",
          a: "Símbolos modificadores (⌘ ⌥ ⇧ ⌃), nomes estilo Windows unidos por mais (Ctrl+Shift+P), sequências separadas por espaço (Ctrl K Z) e notação compacta de Mac (⌘⇧P). Partes não reconhecidas são ignoradas em vez de travar.",
        },
        {
          q: "A reescrita Mac ⇄ Windows é mecânica?",
          a: "Sim, de propósito: esta ferramenta mapeia símbolos por convenção (⌘→Ctrl, ⌥→Alt, ⇧→Shift), que é o que você quer ao diagramar o atalho de um app para uma segunda plataforma. É diferente da folha de atalhos, onde a outra coluna mostra equivalentes reais curados.",
        },
        {
          q: "Posso usar as teclas nos meus próprios documentos?",
          a: "Sim — capture a imagem ou copie o texto formatado. O desenho é HTML/CSS puro sem recursos externos, então também imprime limpo.",
        },
      ],
    },
  },
  related: ["shortcut-sheets", "shortcut-conflict-checker"],
});
