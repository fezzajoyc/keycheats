import { defineTool } from "../_lib/types";
import { ShortcutSheetsEngine } from "../_engines/shortcut-sheets";

export default defineTool({
  slug: "shortcut-sheets",
  category: "developer",
  icon: "key",
  featured: true,
  engine: { component: ShortcutSheetsEngine, props: {} },
  copy: {
    en: {
      name: "Shortcut Sheets",
      tagline:
        "Searchable, printable keyboard shortcut sheets for VS Code, macOS, Windows, Chrome and GitHub — real descriptions, Mac ⇄ Windows key mapping, zero ads.",
      intro: [
        "Most shortcut lists you find online are copy-pasted from a blog post that stopped being true in 2019. These sheets are a structured dataset: every shortcut carries its own description, is grouped by category inside its app, and shows the correct keys for the operating system you are actually on.",
        "Toggle between macOS and Windows and the keys swap automatically — ⌘C becomes Ctrl+C, Spotlight becomes Windows Search, Mission Control becomes Task View. For system-level sheets the other column is the closest real equivalent, not a mechanical symbol swap, and GitHub's sequence keys (G then B) are written the way GitHub itself documents them.",
        "Everything runs in the browser: search as you type across all 125+ shortcuts, click any row to copy its keys, and hit Print for a clean reference sheet for your desk.",
      ],
      steps: [
        "Pick an app tab: VS Code, macOS, Windows, Chrome or GitHub.",
        "Switch the OS toggle to match your keyboard — it auto-detects from your device.",
        "Type in the search box to filter by label, description or key.",
        "Click a row to copy the keys, or press Print for a desk reference.",
      ],
      faqs: [
        {
          q: "How accurate are the shortcuts?",
          a: "Each sheet is a curated dataset checked against official documentation — VS Code's keybindings reference, Apple's Mac keyboard shortcuts, Microsoft's Windows keyboard shortcuts, Chrome's help pages and GitHub's own keyboard shortcut docs. System-level sheets show the nearest real equivalent in the other OS column, and macOS 15 Sequoia's window-tiling keys are marked as such.",
        },
        {
          q: "Does the Mac ⇄ Windows toggle just swap symbols?",
          a: "No. Within an app like VS Code or Chrome the mapping is direct. For the macOS and Windows system sheets the other column shows the closest real-world equivalent (⌘Space Spotlight ↔ Win+S Search, ⌥⌘Esc Force Quit ↔ Ctrl+Shift+Esc Task Manager), because a mechanical ⌘→Ctrl swap would produce bindings that do not exist.",
        },
        {
          q: "Can I print a sheet?",
          a: "Yes — the Print button renders the active app sheet without navigation, buttons or other chrome, so it works as a desk reference.",
        },
        {
          q: "Is anything uploaded or tracked?",
          a: "No. The whole dataset ships with the page; search, OS detection and copy all run locally in your browser. Your OS preference is stored only in your browser's localStorage.",
        },
      ],
    },
    zh: {
      name: "快捷键速查表",
      tagline:
        "VS Code、macOS、Windows、Chrome、GitHub 的可搜索、可打印快捷键速查表——每条都有真实说明,Mac ⇄ Windows 按键自动切换,零广告。",
      intro: [
        "网上大部分快捷键表是从多年前的博客复制来的,早已过时。这里的每张表都是结构化数据:每条快捷键都带独立说明,在应用内按分类分组,并按你当前使用的操作系统显示正确的按键。",
        "在 macOS 和 Windows 之间切换,按键会自动互换——⌘C 变 Ctrl+C,Spotlight 变 Windows 搜索,Mission Control 变任务视图。系统级速查表的另一列给出的是最接近的真实等价键,而不是机械的符号替换;GitHub 的序列键(G 再按 B)也按 GitHub 官方文档的写法标注。",
        "全部在浏览器里完成:输入即搜全部 125+ 条快捷键,点击任意行复制按键,点打印即可得到一张干净的桌面速查表。",
      ],
      steps: [
        "选择应用页签:VS Code、macOS、Windows、Chrome 或 GitHub。",
        "把系统开关切到你的键盘——会按设备自动识别。",
        "在搜索框里按名称、说明或按键过滤。",
        "点击行复制按键,或按打印生成桌面速查表。",
      ],
      faqs: [
        {
          q: "这些快捷键准确吗?",
          a: "每张表都是人工核对的精选数据集,来源包括 VS Code 官方键位文档、Apple 的 Mac 键盘快捷键、微软的 Windows 键盘快捷键、Chrome 帮助页和 GitHub 官方快捷键文档。系统级表的另一列是最接近的真实等价键,macOS 15 Sequoia 的窗口贴靠键也做了标注。",
        },
        {
          q: "Mac ⇄ Windows 切换只是换符号吗?",
          a: "不是。在 VS Code、Chrome 这类应用里是直接映射;macOS 和 Windows 系统表的另一列展示的是最接近的真实等价键(⌘Space Spotlight ↔ Win+S 搜索,⌥⌘Esc 强制退出 ↔ Ctrl+Shift+Esc 任务管理器),因为机械地把 ⌘ 换成 Ctrl 会得到不存在的快捷键。",
        },
        {
          q: "可以打印吗?",
          a: "可以——打印按钮会把当前应用的速查表以无导航、无按钮的干净版式输出,适合贴在桌边。",
        },
        {
          q: "会上传或追踪数据吗?",
          a: "不会。整个数据集随页面一起加载;搜索、系统识别、复制全部在本地浏览器完成。你的系统偏好只保存在浏览器的 localStorage 里。",
        },
      ],
    },
    ja: {
      name: "ショートカット早見表",
      tagline:
        "VS Code・macOS・Windows・Chrome・GitHub の検索可能で印刷できるショートカット早見表——すべての項目に解説付き、Mac ⇄ Windows のキー自動切替、広告なし。",
      intro: [
        "ネットのショートカット一覧の多くは、何年も前に書かれたブログからのコピペで、もう正しくありません。ここは構造化データ:すべてのショートカットに解説が付き、アプリ内でカテゴリごとに分组され、今使っている OS に合わせた正しいキーが表示されます。",
        "macOS と Windows を切り替えると、キーが自動で入れ替わります——⌘C は Ctrl+C に、Spotlight は Windows 検索に、Mission Control はタスクビューに。システム系の表では、もう一方の列は機械的な記号変換ではなく実在する最も近い等価キーを示し、GitHub のシーケンスキー(G を押してから B)も GitHub 公式ドキュメントの書き方に従います。",
        "すべてブラウザ内で完結:125 以上のショートカットを入力しながら検索、行をクリックしてキーをコピー、印刷ボタンで机に置ける早見表に。",
      ],
      steps: [
        "アプリのタブを選ぶ:VS Code・macOS・Windows・Chrome・GitHub。",
        "OS トグルを自分のキーボードに合わせる——デバイスから自動判定。",
        "検索ボックスで名前・解説・キーから絞り込み。",
        "行をクリックしてキーをコピー、印刷ボタンでデスク用早見表に。",
      ],
      faqs: [
        {
          q: "ショートカットの正確性は?",
          a: "各表は VS Code の公式キーバインド、Apple の Mac キーボードショートカット、Microsoft の Windows キーボードショートカット、Chrome のヘルプ、GitHub 公式ドキュメントと照合したキュレーションデータです。システム系の表の相手列は最も近い実在の等価キーで、macOS 15 Sequoia のウィンドウタイリングキーも明記しています。",
        },
        {
          q: "Mac ⇄ Windows の切替は記号の置き換えだけ?",
          a: "いいえ。VS Code や Chrome などのアプリ内は直接マッピングです。macOS と Windows のシステム表では、実在する最も近い等価キーを表示します(⌘Space Spotlight ↔ Win+S 検索、⌥⌘Esc 強制終了 ↔ Ctrl+Shift+Esc タスクマネージャー)。機械的に ⌘ を Ctrl に置き換えると存在しないキーになってしまうためです。",
        },
        {
          q: "印刷できますか?",
          a: "はい。印刷ボタンでナビゲーションやボタンを除いた現在のアプリの表だけを出力し、机の横に置ける参照表になります。",
        },
        {
          q: "データの送信や追跡はありますか?",
          a: "ありません。データセットはページに同梱され、検索・OS 判定・コピーはすべてブラウザ内で完結します。OS の設定はブラウザの localStorage に保存されるだけです。",
        },
      ],
    },
    es: {
      name: "Hojas de atajos",
      tagline:
        "Hojas de atajos de teclado buscables e imprimibles para VS Code, macOS, Windows, Chrome y GitHub — descripciones reales, teclas Mac ⇄ Windows, sin anuncios.",
      intro: [
        "La mayoría de listas de atajos que encuentras en línea son copias de un blog que dejó de ser cierto en 2019. Estas hojas son un conjunto de datos estructurado: cada atajo lleva su propia descripción, se agrupa por categoría dentro de su app y muestra las teclas correctas para el sistema que usas de verdad.",
        "Alterna entre macOS y Windows y las teclas cambian solas — ⌘C se convierte en Ctrl+C, Spotlight en Búsqueda de Windows, Mission Control en Vista de tareas. En las hojas de sistema, la otra columna es el equivalente real más cercano, no un cambio mecánico de símbolos, y las teclas en secuencia de GitHub (G y luego B) están escritas como GitHub las documenta.",
        "Todo ocurre en el navegador: busca mientras escribes entre los 125+ atajos, haz clic en una fila para copiar sus teclas y pulsa Imprimir para tener una hoja de referencia limpia en el escritorio.",
      ],
      steps: [
        "Elige una pestaña de app: VS Code, macOS, Windows, Chrome o GitHub.",
        "Ajusta el interruptor de OS a tu teclado — se detecta automáticamente.",
        "Escribe en el buscador para filtrar por nombre, descripción o tecla.",
        "Haz clic en una fila para copiar las teclas, o pulsa Imprimir.",
      ],
      faqs: [
        {
          q: "¿Qué tan precisos son los atajos?",
          a: "Cada hoja es un conjunto de datos verificado contra documentación oficial: la referencia de combinaciones de VS Code, los atajos de teclado de Apple para Mac, los de Microsoft para Windows, las páginas de ayuda de Chrome y la documentación de GitHub. En las hojas de sistema, la otra columna muestra el equivalente real más cercano, y las teclas de ajuste de ventana de macOS 15 Sequoia están marcadas como tales.",
        },
        {
          q: "¿El interruptor Mac ⇄ Windows solo cambia símbolos?",
          a: "No. En apps como VS Code o Chrome el mapeo es directo. En las hojas de sistema de macOS y Windows, la otra columna muestra el equivalente real más cercano (⌘Space Spotlight ↔ Win+S Búsqueda, ⌥⌘Esc Forzar salida ↔ Ctrl+Shift+Esc Administrador de tareas), porque un cambio mecánico de ⌘ por Ctrl produciría combinaciones que no existen.",
        },
        {
          q: "¿Puedo imprimir una hoja?",
          a: "Sí — el botón Imprimir muestra la hoja activa sin navegación ni botones, ideal como referencia de escritorio.",
        },
        {
          q: "¿Se sube o rastrea algo?",
          a: "No. Todo el conjunto de datos viaja con la página; la búsqueda, la detección de OS y la copia se ejecutan en tu navegador. Tu preferencia de sistema se guarda solo en el localStorage de tu navegador.",
        },
      ],
    },
    pt: {
      name: "Folhas de atalhos",
      tagline:
        "Folhas de atalhos de teclado pesquisáveis e imprimíveis para VS Code, macOS, Windows, Chrome e GitHub — descrições reais, teclas Mac ⇄ Windows, sem anúncios.",
      intro: [
        "A maioria das listas de atalhos na internet é copiada de um blog que parou de ser verdade em 2019. Estas folhas são um conjunto de dados estruturado: cada atalho tem a própria descrição, é agrupado por categoria dentro do app e mostra as teclas corretas para o sistema que você realmente usa.",
        "Alterne entre macOS e Windows e as teclas trocam sozinhas — ⌘C vira Ctrl+C, Spotlight vira Pesquisa do Windows, Mission Control vira Visão de Tarefas. Nas folhas de sistema, a outra coluna é o equivalente real mais próximo, não uma troca mecânica de símbolos, e as teclas em sequência do GitHub (G e depois B) estão escritas como o próprio GitHub documenta.",
        "Tudo roda no navegador: pesquise enquanto digita entre os 125+ atalhos, clique em uma linha para copiar as teclas e imprima uma folha de referência limpa para a mesa.",
      ],
      steps: [
        "Escolha uma aba de app: VS Code, macOS, Windows, Chrome ou GitHub.",
        "Ajuste o seletor de OS para o seu teclado — detectado automaticamente.",
        "Digite na busca para filtrar por nome, descrição ou tecla.",
        "Clique em uma linha para copiar as teclas, ou clique em Imprimir.",
      ],
      faqs: [
        {
          q: "Os atalhos são precisos?",
          a: "Cada folha é um conjunto de dados conferido com documentação oficial — a referência de teclas do VS Code, os atalhos da Apple para Mac, os da Microsoft para Windows, as páginas de ajuda do Chrome e a documentação do GitHub. Nas folhas de sistema, a outra coluna mostra o equivalente real mais próximo, e as teclas de organização de janelas do macOS 15 Sequoia estão marcadas como tal.",
        },
        {
          q: "O seletor Mac ⇄ Windows só troca símbolos?",
          a: "Não. Em apps como VS Code e Chrome o mapeamento é direto. Nas folhas de sistema do macOS e do Windows, a outra coluna mostra o equivalente real mais próximo (⌘Space Spotlight ↔ Win+S Pesquisa, ⌥⌘Esc Forçar Encerrar ↔ Ctrl+Shift+Esc Gerenciador de Tarefas), porque uma troca mecânica de ⌘ por Ctrl produziria atalhos que não existem.",
        },
        {
          q: "Posso imprimir uma folha?",
          a: "Sim — o botão Imprimir mostra a folha ativa sem navegação nem botões, perfeita como referência de mesa.",
        },
        {
          q: "Algo é enviado ou rastreado?",
          a: "Não. Todo o conjunto de dados vem com a página; busca, detecção de OS e cópia rodam no seu navegador. Sua preferência de sistema fica apenas no localStorage do navegador.",
        },
      ],
    },
  },
  related: ["key-visualizer", "shortcut-conflict-checker"],
});
