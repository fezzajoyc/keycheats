import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "KeyCheats",
  tagline: "常に正しいキーボードショートカット早見表。",
  metaDesc: "VS Code・macOS・Windows・Chrome・GitHub の検索可能で印刷できるショートカット早見表。すべての項目に解説付き、Mac ⇄ Windows のキー対応、ブラウザ内で完結。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "押す価値のあるショートカットをすべて——検索できて、印刷できて、古くならない",
    heroSub: "解説付きのショートカット早見表 {n} 種類。OS に合わせたキー表示と即時検索。広告も登録もなし。",
    browseAll: "すべてのツールを見る",
    pinned: "ピン留め",
    pin: "トップに固定",
    unpin: "固定を解除",
    popular: "人気のツール",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "ファイルは端末内に留存",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating: [
      "VS Code・macOS・Windows・Chrome・GitHub——全表を公式ドキュメントと照合",
      "Mac ⇄ Windows を切り替えるとキーも自動で入れ替わり",
      "125 以上のショートカットを名前・解説・キーで検索",
      "ワンクリックで机に置ける早見表を印刷",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "アプリごとに 1 枚:すべてのショートカットを分類・解説・検索可能に。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "ショートカットはブラウザから出ません。",
    privacySub: "アップロードもサーバーもありません。早見表はブラウザで動くデータと JavaScript そのもの——ポリシーの約束ではなく、作り方の話です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "検索・OS 判定・キーキャップ描画・競合チェックはすべてデバイスのメモリ内で実行。データはどこにも送信されません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "キーを見つけて、押して、作業に戻る。",
    endSub: "検索可能・印刷可能・15 言語対応。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像", desc: "画像の圧縮・リサイズ・切り抜き・形式変換をブラウザ内で。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "日々のキーボード作業のためのショートカット早見表・キー表示・重複チェック。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "ユーティリティ", desc: "単位変換・電卓・日常のちょっとしたツール。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    nextStep: "次のステップ",
    copyLink: "リンクをコピー",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    openTool: "ツールを開く",
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "ショートカットはキーボードを通り、早見表はブラウザの中にあります。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "KeyCheats バッジ",
    desc: "KeyCheats バッジをサイトや README・ドキュメントに。ここへリンクし、正確さを保つショートカット早見表がブラウザ内で完結していることを伝えます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "KeyCheats は MCP(Model Context Protocol)サーバーを同梱:Claude や Cursor などの AI アシスタントが、ショートカットデータセットの検索・重複バインドのチェック・キーキャップの描画を、サイトと同じテスト済みロジックで実行できます。",
    desc2: "ツールはサイト独自の純粋関数で、同じキュレーションデータ(VS Code・macOS・Windows・Chrome・GitHub)を操作します。実行は npx 経由で AI クライアント側のマシン上——当社サーバーには何も送られません。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;
