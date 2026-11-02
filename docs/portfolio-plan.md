# KeyCheats — portfolio plan(需求证据)

上线工具必须有调研结论(同行在榜工具、公开流量研究、常青查询模式三选一)。本文记录首批发量 3 个工具的证据与差异化定位。

## 定位

**KeyCheats** — 键盘快捷键参考表站。垂直:developers / power users 的"每个按键一目了然"。

## 需求证据

1. **常青查询模式**:"vscode shortcuts"、"mac shortcuts"、"windows shortcuts"、"chrome shortcuts"、"github shortcuts" 是多年稳定的 evergreen 查询,单 app 月查询量大、意图明确(用户要的是一张可查的表,不是教程)。
2. **竞品格局**:搜索结果以广告农场博客为主——表格过期(2019–2022 的旧键位)、无结构化数据、无 Mac/Windows 双系统视图、无搜索、为 SEO 堆词而拆成多页。榜单上缺少"数据可机器校验 + 双系统 + 可打印"的专用站。
3. **工具层空白**:竞品做 AI 生成内容;快捷键表是纯静态数据 + 纯函数(normalize/format/conflict-detect),零后端、零 API、纯客户端即可做到最好——符合工作区"静态优先"纪律。

## 首批工具(2026-11)

| 工具 | 满足什么 | 数据/函数核心 |
|---|---|---|
| shortcut-sheets(featured) | 5 个 app(VS Code / macOS / Windows / Chrome / GitHub)× 24–27 条 = **129 条真实快捷键**,app 页签 + Mac⇄Windows 自动切换(navigator.platform 检测 + localStorage 覆盖)+ 全量搜索 + 分类分组 + 打印 | `tools/_lib/shortcuts-data.ts`(逐条对照官方文档人工核对;系统表的跨 OS 列为"最接近的真实等价键",非机械换符号) |
| key-visualizer | 粘贴/拼装快捷键 → 键帽渲染 + 复制为 ⌘C / Ctrl+C 两种写法 | `normalizeKeys` / `formatKeys` / `renderKeycaps` / `parseKeysInput` |
| shortcut-conflict-checker | 应用开发者粘贴自己 app 的快捷键清单 → 找重复绑定(大小写/顺序/标签无关) | `parseShortcutLine` / `findConflicts` / `keysSignature` |

## 与站群纪律的对应

- 单一垂直(快捷键),品牌/域名独立,站间不互链。
- MCP server(`npx keycheats-mcp`)暴露同一份纯函数与数据集:shortcut_search / shortcut_conflicts / render_shortcut。
- 每条快捷键自带真实 description(不是占位),工具页 FAQ/HowTo 全部原创、15 语字典逐一改写。
