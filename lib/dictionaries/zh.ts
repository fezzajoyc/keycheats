import type { Dictionary } from "../i18n";

const zh: Dictionary = {
  brand: "KeyCheats",
  tagline: "键盘快捷键速查表,常查常新。",
  metaDesc: "VS Code、macOS、Windows、Chrome、GitHub 的可搜索、可打印快捷键速查表——每条都有真实说明,支持 Mac ⇄ Windows 按键映射,全部在浏览器里运行。",

  nav: {
    tools: "全部工具",
    categories: "分类",
    about: "关于",
    menu: "菜单",
    language: "语言",
  },

  home: {
    heroTitle: "值得按下的每个快捷键——可搜索、可打印、永不过时",
    heroSub: "{n} 张快捷键速查表:真实说明、按系统切换按键、即时搜索。无广告、无需注册,所有按键触手可及。",
    browseAll: "浏览全部工具",
    categoriesTitle: "分类",
    featuredTitle: "热门工具",
    trustLocal: "文件留在你的设备上",
    trustFree: "免费,无需账号",
    trustFast: "即开即用,离线可用",
    rotating: [
      "VS Code、macOS、Windows、Chrome、GitHub——每张表都对照官方文档核对",
      "切换 Mac ⇄ Windows,按键自动互换",
      "按名称、说明或按键搜索 125+ 条快捷键",
      "一键打印干净的桌面速查表",
    ],
    statsLabels: { tools: "工具", languages: "语言", uploads: "上传", accounts: "账号" },
    eyebrow: "永久免费",
    heroCtaSecondary: "了解工作方式",
    statsTools: "{n} 个工具",
    statsLanguages: "{n} 种语言",
    statsUploads: "0 次上传",
    statsAccounts: "0 个账号",
    categoriesSub: "每个应用一张表:快捷键全部分组、带说明、可搜索。",
    popularSub: "大家最常用的工具。",
    privacyTitle: "你的快捷键不会离开浏览器。",
    privacySub: "没有上传环节,也没有服务器。速查表就是跑在你浏览器里的数据加 JavaScript——这是构建方式,不是政策承诺。",
    privacyPoint1T: "本地处理",
    privacyPoint1D: "搜索、系统识别、键帽渲染和冲突检查都在你设备的内存里完成。任何数据都不会被传输。",
    privacyPoint2T: "没有账号",
    privacyPoint2D: "无需注册、不要邮箱、不留历史,打开即用。",
    privacyPoint3T: "诚实设计",
    privacyPoint3D: "浏览器做不到的事,我们直说,而不是假装做到。",
    privacyLink: "阅读完整隐私说明",
    endTitle: "找到按键,按下去,继续干活。",
    endSub: "可搜索、可打印,支持 15 种语言。",
  },

  tools: {
    title: "全部工具",
    subtitle: "搜索 {count} 个免费浏览器工具。无需上传,无需注册。",
    filterPlaceholder: "搜索工具…",
    count: "{count} 个工具",
    empty: "没有匹配“{query}”的工具。",
  },

  categories: {
    pdf: { name: "PDF", desc: "合并、拆分、转换、编辑 PDF,全程无需上传到任何服务器。" },
    image: { name: "图片", desc: "压缩、缩放、裁剪、格式转换,直接在浏览器里完成。" },
    text: { name: "文本", desc: "统计、清洗、排序、变换,边输入边出结果。" },
    developer: { name: "开发者", desc: "日常键盘工作的快捷键速查表、按键可视化与重复绑定检查。" },
    seo: { name: "SEO", desc: "Meta 标签、结构化数据、SERP 预览等页面级 SEO 助手。" },
    security: { name: "安全", desc: "密码、哈希与查询——都在你的设备上生成与校验。" },
    utility: { name: "实用工具", desc: "单位换算、计算器与日常小工具。" },
  },

  tool: {
    howTo: "使用方法",
    faq: "常见问题",
    related: "相关工具",
    privacyNote:
      "该工具完全在你的浏览器中运行,数据不会离开你的设备,不会上传到任何服务器。",
    inCategory: "{category}分类下的更多工具",
    backToCategory: "全部{category}工具",
  },

  common: {
    openTool: "打开工具",
    copy: "复制",
    copied: "已复制",
    download: "下载",
    reset: "重置",
    swap: "交换",
    clear: "清空",
    error: "出错了,请检查输入后重试。",
    input: "输入",
    output: "结果",
    settings: "选项",
    dropFiles: "拖拽文件到此处,或点击选择",
    dropFile: "拖拽文件到此处,或点击选择",
    processing: "处理中…",
    fileSize: "大小",
    sample: "试个例子",
    uppercase: "大写",
  },

  unit: {
    from: "从",
    to: "到",
    amount: "数值",
    result: "结果",
    common: "常用换算",
    formula: "公式",
    allUnits: "全部单位",
  },

  text: {
    stats: {
      words: "词数",
      characters: "字符数",
      charsNoSpaces: "不含空格",
      sentences: "句数",
      paragraphs: "段落数",
      lines: "行数",
      readingTime: "阅读时长",
      readingMinutes: "约 {n} 分钟",
    },
  },

  footer: {
    line: "每个快捷键都经过你的键盘——每张表都跑在你的浏览器里。",
    privacy: "隐私",
    terms: "条款",
    about: "关于",
    badges: "徽章",
    language: "语言",
  },

  badge: {
    title: "KeyCheats 徽章",
    desc: "把 KeyCheats 徽章放到你的网站、README 或文档里。它会链接回本站,并告诉访问者:这些快捷键速查表常查常新,完全在浏览器里运行。",
    voluntary: "嵌入完全出于自愿——喜欢这个项目就挑一枚,无需申请授权。",
    md: "Markdown(README)",
    html: "HTML(网页)",
    thanks: "感谢帮忙传播——每一次嵌入,都让更多人发现尊重自己文件的工具。",
  },

    embed: {
    title: "嵌入这个工具",
    desc: "一行代码把工具放到你的网站——它在访客的浏览器里运行。",
  },

    mcp: {
    title: "MCP 服务器——AI 可调用的工具",
    desc1: "KeyCheats 提供 MCP(Model Context Protocol)服务器:Claude、Cursor 等 AI 助手可以直接搜索快捷键数据集、检查清单里的重复绑定、渲染键帽——与网站同一套经过测试的逻辑,无需重新实现。",
    desc2: "这些工具用网站自己的纯函数操作同一份精选数据集(VS Code、macOS、Windows、Chrome、GitHub)。执行通过 npx 发生在 AI 客户端的机器上——不会发送到我们的服务器。",
    toolsTitle: "可执行工具({n} 个)",
    requiresNode: "需要 Node.js 18+。服务器通过 stdio 在本地运行;只有你发起的工具调用会在本机计算。",
    privacy: "需要 Node.js 18+。服务器通过 stdio 在本地运行;只有你发起的工具调用会在本机计算。",
  },

    notFound: {
    title: "页面不存在",
    body: "你要找的工具不存在,去看看全部工具吧。",
    home: "回到首页",
  },
};

export default zh;
