import { z } from "zod";
import {
  SHORTCUTS,
  SHORTCUT_APPS,
  SHORTCUT_TOTAL,
  type AppId,
  type Os,
} from "../tools/_lib/shortcuts-data";
import { findConflicts, formatKeys, keysSignature, parseKeysInput, renderKeycaps } from "../tools/_lib/shortcuts";

/**
 * KeyCheats MCP 工具注册表:把站上的数据集与纯函数暴露为 AI 可执行工具。
 * 与浏览器引擎跑同一份实现(shortcuts-data.ts + shortcuts.ts)。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

const APP_ENUM = z.enum(["vscode", "macos", "windows", "chrome", "github"]);
const OS_ENUM = z.enum(["mac", "win"]).default("mac");

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "shortcut_search",
    title: "Search keyboard shortcuts",
    description:
      `Search a curated dataset of ${SHORTCUT_TOTAL} keyboard shortcuts for VS Code, macOS, Windows, Chrome and GitHub. Matches label, description and keys. Returns app, category, label, description and the keys for both macOS and Windows. Sequence keys (e.g. GitHub "G then B") are listed in order.`,
    schema: {
      query: z.string().min(1).max(100).describe("text to search across labels, descriptions and keys, e.g. 'palette', 'screenshot', 'Ctrl+Shift+T'"),
      app: APP_ENUM.optional().describe("restrict to one app; omit to search all five"),
      limit: z.number().int().min(1).max(25).default(10).describe("max results to return"),
    },
    run: (a) => {
      const q = String(a.query).trim().toLowerCase();
      // 查询若是按键写法("⇧⌘T"),按规范签名匹配——与修饰键顺序/写法无关
      const qSig = keysSignature(parseKeysInput(q));
      const rows = SHORTCUTS.filter((s) => (a.app ? s.app === a.app : true)).filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          formatKeys(s.keys.mac, "mac").toLowerCase().includes(q) ||
          formatKeys(s.keys.win, "win").toLowerCase().includes(q) ||
          s.keys.mac.some((k) => k.toLowerCase().includes(q)) ||
          s.keys.win.some((k) => k.toLowerCase().includes(q)) ||
          (qSig.length > 0 &&
            (keysSignature(s.keys.mac) === qSig || keysSignature(s.keys.win) === qSig)),
      );
      const limit = typeof a.limit === "number" ? a.limit : 10;
      const MODS = ["⌘", "⌥", "⇧", "⌃"];
      return json({
        total_matches: rows.length,
        results: rows.slice(0, limit).map((s) => ({
          app: s.app,
          category: s.category,
          label: s.label,
          description: s.description,
          keys_mac: formatKeys(s.keys.mac, "mac"),
          keys_win: formatKeys(s.keys.win, "win"),
          // 序列键:多个按键且不含修饰符(GitHub 的 G then B)
          sequence: s.keys.mac.length > 1 && s.keys.mac.every((k) => !MODS.includes(k)),
        })),
      });
    },
  },
  {
    name: "shortcut_conflicts",
    title: "Find duplicate shortcut bindings",
    description:
      "Given a list of shortcut declarations (one per line, keys first with optional label, e.g. 'Ctrl+Shift+P Command palette' or '⌘C Copy'), detect duplicate bindings. Case-insensitive, key-order-insensitive, labels ignored; modifier names and symbols normalize together (⌘ == Cmd == Ctrl). Unparseable lines are reported, not ignored silently.",
    schema: {
      lines: z
        .array(z.string())
        .min(1)
        .max(500)
        .describe("shortcut declarations, one per array element, e.g. ['Ctrl+C Copy', 'ctrl+c Copy text', 'Ctrl+V Paste']"),
    },
    run: (a) => {
      const report = findConflicts(Array.isArray(a.lines) ? a.lines : []);
      return json({
        checked: report.checked,
        conflicts: report.conflicts.map((g) => ({
          binding: g.display,
          count: g.indices.length,
          lines: g.lines,
        })),
        unparsed: report.unparsed,
      });
    },
  },
  {
    name: "render_shortcut",
    title: "Render a shortcut as keycaps + text",
    description:
      "Render one keyboard shortcut as HTML keycaps (<kbd class=\"keycap\">…</kbd>, safe to embed) and as formatted text in Mac style (⌘⇧P) or Windows style (Ctrl+Shift+P). Purely local string handling.",
    schema: {
      keys: z
        .array(z.string().min(1).max(24))
        .min(1)
        .max(8)
        .describe("keys in order, e.g. ['Ctrl','Shift','P'] or ['⌘','⇧','P']"),
      os: OS_ENUM.describe("notation for the formatted text output"),
    },
    run: (a) => {
      const os: Os = a.os === "win" ? "win" : "mac";
      const keys = (Array.isArray(a.keys) ? a.keys : []).map((k: unknown) => String(k ?? "").trim()).filter(Boolean);
      if (keys.length === 0) {
        return { content: [{ type: "text", text: "no usable keys — pass keys like ['Ctrl','Shift','P']" }], isError: true };
      }
      return json({
        os,
        html: renderKeycaps(keys),
        text_mac: formatKeys(keys, "mac"),
        text_win: formatKeys(keys, "win"),
      });
    },
  },
];

export const MCP_APP_IDS: AppId[] = SHORTCUT_APPS;
