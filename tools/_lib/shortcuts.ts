import type { Os } from "./shortcuts-data";

/**
 * KeyCheats 纯函数库:按键规范化 / 格式化 / 键帽渲染 / 冲突检测。
 * 全部无副作用、无 DOM 依赖——浏览器引擎与 MCP server 跑同一份实现。
 */

/** mac 修饰键符号(顺序无关,格式化时按出现顺序紧贴后键) */
const MAC_SYMBOLS = new Set(["⌘", "⌥", "⇧", "⌃"]);
const WIN_MODIFIERS = new Set(["ctrl", "alt", "shift", "win"]);

/** 符号 ↔ 名称 的双向映射(约定式映射;数据集里的跨 OS 数组是人工核对的真值) */
const SYMBOL_TO_WIN: Record<string, string> = {
  "⌘": "Ctrl",
  "⌥": "Alt",
  "⇧": "Shift",
  "⌃": "Ctrl",
  "⎋": "Esc",
  "⏎": "Enter",
  "⌫": "Backspace",
  Return: "Enter",
  Option: "Alt",
  Cmd: "Ctrl",
  Command: "Ctrl",
};
const WIN_TO_SYMBOL: Record<string, string> = {
  ctrl: "⌘",
  control: "⌘",
  cmd: "⌘",
  command: "⌘",
  meta: "⌘",
  win: "⌘",
  super: "⌘",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
  esc: "⎋",
  escape: "⎋",
  enter: "⏎",
  return: "⏎",
  backspace: "⌫",
};

/** 别名归一:win 方向下输入的 Mac 风格别名(Cmd→Ctrl、Option→Alt…) */
const ALIAS_TO_WIN: Record<string, string> = {
  cmd: "Ctrl",
  command: "Ctrl",
  meta: "Ctrl",
  option: "Alt",
  return: "Enter",
  super: "Win",
};

/** 中性键名的规范写法(tab/space/home… 不随输入大小写漂移) */
const CANON_NAME: Record<string, string> = {
  ctrl: "Ctrl", control: "Ctrl", alt: "Alt", option: "Option", shift: "Shift",
  cmd: "Cmd", command: "Cmd", meta: "Meta", win: "Win", super: "Super",
  space: "Space", tab: "Tab", esc: "Esc", escape: "Esc", enter: "Enter", return: "Return",
  backspace: "Backspace", del: "Del", delete: "Delete", ins: "Ins", insert: "Insert",
  home: "Home", end: "End", pageup: "PageUp", pagedown: "PageDown", pgup: "PgUp", pgdn: "PgDn",
  up: "Up", down: "Down", left: "Left", right: "Right", prtscn: "PrtScn",
};

function canonicalName(k: string): string {
  const canon = CANON_NAME[k.toLowerCase()];
  if (canon) return canon;
  return /^[a-z]$/.test(k) ? k.toUpperCase() : k;
}

function isMacSymbolModifier(k: string): boolean {
  return MAC_SYMBOLS.has(k);
}
function isWinModifier(k: string): boolean {
  return WIN_MODIFIERS.has(k.toLowerCase());
}

/**
 * 把一组按键规范化为目标 OS 的书写习惯:Mac 符号(⌘⌥⇧⌃)↔ Windows 名称(Ctrl/Alt/Shift)。
 * 其余按键(字母、F 键、方向键、Space…)原样透传,单字母统一大写。
 */
export function normalizeKeys(keys: string[], os: Os): string[] {
  if (!Array.isArray(keys)) return [];
  return keys
    .filter((k) => typeof k === "string" && k.trim().length > 0)
    .map((k) => k.trim())
    .map((k) => {
      if (os === "win") {
        const mapped = SYMBOL_TO_WIN[k] ?? ALIAS_TO_WIN[k.toLowerCase()];
        if (mapped) return mapped;
        return canonicalName(k);
      }
      const mapped = WIN_TO_SYMBOL[k.toLowerCase()];
      if (mapped) return mapped;
      return canonicalName(k);
    });
}

/**
 * 把按键数组格式化为习惯写法:
 *   mac:修饰符符号紧贴后面的键(⌘⌥⇧P);非修饰键之间用空格(G B、⌘K Z)。
 *   win:修饰符与后键用 + 连接(Ctrl+Shift+P);非修饰键之间用空格(G B、Ctrl+K Z)。
 */
export function formatKeys(keys: string[], os: Os): string {
  const norm = normalizeKeys(keys, os);
  let out = "";
  let prevWasModifier = false;
  for (const k of norm) {
    if (out.length > 0) {
      out += prevWasModifier ? (os === "win" ? "+" : "") : " ";
    }
    out += k;
    prevWasModifier = os === "mac" ? isMacSymbolModifier(k) : isWinModifier(k);
  }
  return out;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 把按键数组渲染成 HTML 键帽串(真实键帽观感由 .keycap CSS 承担):
 * `<kbd class="keycap">⌘</kbd><kbd class="keycap">C</kbd>`。
 * 每个键独立 HTML 转义,内容来自用户输入也安全。空数组/全空 → ""。
 */
export function renderKeycaps(keys: string[]): string {
  if (!Array.isArray(keys)) return "";
  const clean = keys.filter((k) => typeof k === "string" && k.trim().length > 0);
  if (clean.length === 0) return "";
  return clean.map((k) => `<kbd class="keycap">${escapeHtml(k.trim())}</kbd>`).join("");
}

/** 单键 token:修饰符名、功能键、方向键、单个字母/数字或标点 */
const KEY_TOKEN_RE =
  /^(?:⌘|⌥|⇧|⌃|⎋|⏎|⌫|f[1-9]|f1[0-9]|[a-z]|\d{1,3}|ctrl|control|cmd|command|option|alt|shift|meta|win|super|space|tab|enter|return|esc|escape|backspace|del|delete|ins|insert|home|end|pageup|pagedown|pgup|pgdn|up|down|left|right|,|\.|\/|;|'|`|\[|\]|\\|-|=)$/i;

/**
 * 严格版单键 token:排除裸写的修饰符单词(避免把标签「Command palette」
 * 的 Command 当成按键)。"+"连接与紧凑符号写法不受影响。
 */
const KEY_TOKEN_STRICT_RE =
  /^(?:⌘|⌥|⇧|⌃|⎋|⏎|⌫|f[1-9]|f1[0-9]|[a-z]|\d{1,3}|space|tab|enter|return|esc|escape|backspace|del|delete|ins|insert|home|end|pageup|pagedown|pgup|pgdn|up|down|left|right|,|\.|\/|;|'|`|\[|\]|\\|-|=)$/i;

/** 紧凑 token(如 "⌘⇧P"、"⌘C"):符号连写 + 可选结尾单键 */
const COMPACT_TOKEN_RE = /^([⌘⌥⇧⌃⎋⏎⌫]+)([a-z0-9])?$/i;

/**
 * 展开单个 token 为按键数组("Ctrl+Shift+P" → 3 键,"⌘⇧P" → 3 键,"G" → 1 键)。
 * allowBareModifiers=false 时(冲突检查器的行解析),裸写的修饰符单词
 * 不算按键——否则 "Ctrl+Shift+P Command palette" 里的 Command 会被吃掉。
 */
function expandToken(token: string, allowBareModifiers = true): string[] | null {
  if (token.includes("+")) {
    const parts = token.split("+").filter((p) => p.length > 0);
    if (parts.length === 0) return null;
    if (!parts.every((p) => KEY_TOKEN_RE.test(p))) return null;
    return parts.map(canonicalName);
  }
  if (COMPACT_TOKEN_RE.test(token)) {
    const m = COMPACT_TOKEN_RE.exec(token)!;
    const keys = [...m[1]];
    if (m[2]) keys.push(m[2].toUpperCase());
    return keys;
  }
  if (allowBareModifiers ? KEY_TOKEN_RE.test(token) : KEY_TOKEN_STRICT_RE.test(token)) {
    return [canonicalName(token)];
  }
  return null;
}

/**
 * 冲突检测的标准键名:小写、符号归一(⌘/ctrl/cmd/meta/win → cmd…)、排序后用 + 连接。
 * ⌘ 与 Ctrl 合并为同一修饰键——跨平台清单(Mac 文档写 ⌘、Windows 文档写 Ctrl)
 * 无需预先转换即可互相比对。排序 → 与输入顺序无关;小写 → 大小写无关。
 */
function canonicalKey(k: string): string {
  const lower = k.toLowerCase();
  const table: Record<string, string> = {
    "⌘": "cmd", cmd: "cmd", command: "cmd", meta: "cmd", super: "cmd", win: "cmd",
    "⌃": "cmd", ctrl: "cmd", control: "cmd",
    "⌥": "alt", option: "alt", alt: "alt",
    "⇧": "shift", shift: "shift",
    "⎋": "esc", esc: "esc", escape: "esc",
    "⏎": "enter", enter: "enter", return: "enter",
    "⌫": "backspace", backspace: "backspace",
    del: "del", delete: "del",
  };
  return table[lower] ?? lower;
}

export type ParsedShortcutLine = {
  /** 原始行 */
  line: string;
  /** 解析出的按键(已展开);无法解析时为 [] */
  keys: string[];
  /** 键之后的剩余文本(标签);纯按键行 label 为 "" */
  label: string;
  /** 空行/纯空白 → skipped;有内容但不含合法按键 → ok=false */
  ok: boolean;
  skipped: boolean;
  /** 规范签名(排序后),仅 ok 行有 */
  signature: string | null;
};

/** 按键数组的规范签名(小写、符号归一、排序、+ 连接)——与输入顺序/大小写无关 */
export function keysSignature(keys: string[]): string {
  return keys.map(canonicalKey).sort().join("+");
}

/**
 * 解析一行快捷键声明:"⌘C Copy"、"Ctrl+Shift+P Command palette"、"G B File finder"。
 * 规则:前缀中所有「像按键」的 token 都算键(支持 + 连接与符号紧写),第一个
 * 不像按键的 token 起是标签。裸写的修饰符单词不算键(那是标签的一部分)。
 * 空白行 skipped;有内容但解析不出键 → ok=false 不抛异常。
 */
export function parseShortcutLine(line: string): ParsedShortcutLine {
  const trimmed = typeof line === "string" ? line.trim() : "";
  if (!trimmed) return { line: typeof line === "string" ? line : String(line ?? ""), keys: [], label: "", ok: false, skipped: true, signature: null };
  const tokens = trimmed.split(/\s+/);
  const keys: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    const expanded = expandToken(tokens[i], false);
    if (!expanded) break;
    keys.push(...expanded);
    i++;
  }
  if (keys.length === 0) {
    return { line, keys: [], label: trimmed, ok: false, skipped: false, signature: null };
  }
  const label = tokens.slice(i).join(" ");
  const signature = keysSignature(keys);
  return { line, keys, label, ok: true, skipped: false, signature };
}

export type ConflictGroup = {
  /** 规范签名(如 "cmd+c") */
  signature: string;
  /** 展示名(Windows 风格,Ctrl+Shift+P) */
  display: string;
  /** 冲突成员在输入列表中的下标(0 起) */
  indices: number[];
  /** 冲突成员的原始行 */
  lines: string[];
};

export type ConflictReport = {
  /** 非空且解析成功的行数 */
  checked: number;
  /** 未参与比较的行(skipped + 解析失败)的下标 */
  ignored: number[];
  /** 解析失败的行(有内容但不含合法按键) */
  unparsed: { index: number; line: string }[];
  /** 每组 ≥2 个成员即冲突;无冲突时为 [] */
  conflicts: ConflictGroup[];
};

/** 把规范签名渲染回 Windows 风格展示名:修饰符在前(c+cmd → Ctrl+C,ctrl+p+shift → Ctrl+Shift+P) */
function signatureDisplay(signature: string): string {
  const MOD_ORDER = ["cmd", "ctrl", "shift", "alt", "option", "meta", "win"];
  const names: Record<string, string> = { cmd: "Ctrl", ctrl: "Ctrl", alt: "Alt", shift: "Shift", esc: "Esc", enter: "Enter", backspace: "Backspace", del: "Delete" };
  const parts = signature.split("+");
  const mods = MOD_ORDER.filter((m) => parts.includes(m));
  const rest = parts.filter((p) => !MOD_ORDER.includes(p)).sort();
  return [...mods, ...rest]
    .map((k) => names[k] ?? (k.length === 1 ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)))
    .join("+");
}

/**
 * 从一份快捷键清单(每行一条,如 "⌘C Copy")中找出重复绑定。
 * 大小写无关(Ctrl+C == c^trl+C)、顺序无关(Ctrl+Shift+P == Shift+Ctrl+P)、
 * 标签不参与比较。非法行不抛异常,计入 unparsed/ignored。
 */
export function findConflicts(lines: string[]): ConflictReport {
  const ignored: number[] = [];
  const unparsed: { index: number; line: string }[] = [];
  const seen = new Map<string, number[]>();
  let checked = 0;
  const list = Array.isArray(lines) ? lines : [];
  for (let i = 0; i < list.length; i++) {
    const parsed = parseShortcutLine(list[i]);
    if (parsed.skipped) {
      ignored.push(i);
      continue;
    }
    if (!parsed.ok) {
      ignored.push(i);
      unparsed.push({ index: i, line: parsed.line.trim() });
      continue;
    }
    checked++;
    const idx = seen.get(parsed.signature!);
    if (idx) idx.push(i);
    else seen.set(parsed.signature!, [i]);
  }
  const conflicts: ConflictGroup[] = [...seen.entries()]
    .filter(([, idxs]) => idxs.length >= 2)
    .map(([signature, idxs]) => ({
      signature,
      display: signatureDisplay(signature),
      indices: idxs,
      lines: idxs.map((i) => list[i].trim()),
    }));
  return { checked, ignored, unparsed, conflicts };
}

/**
 * 解析用户输入的快捷键字符串为按键数组(visualizer 用):
 * "Ctrl+Shift+P" → ["Ctrl","Shift","P"]; "⌘⇧P" → ["⌘","⇧","P"]; "Ctrl K Z" → ["Ctrl","K","Z"]。
 * 无法识别的片段整体丢弃;返回的数组保证每项非空。
 */
export function parseKeysInput(input: string): string[] {
  if (typeof input !== "string") return [];
  const tokens = input.replace(/\+/g, " ").split(/\s+/).filter(Boolean);
  const keys: string[] = [];
  for (const token of tokens) {
    const expanded = expandToken(token);
    if (expanded) keys.push(...expanded);
  }
  return keys;
}
