import { describe, expect, it } from "vitest";
import {
  APP_CATEGORIES,
  SHORTCUTS,
  SHORTCUT_APPS,
  SHORTCUT_TOTAL,
  type AppId,
  type Os,
} from "@/tools/_lib/shortcuts-data";
import {
  findConflicts,
  formatKeys,
  normalizeKeys,
  parseKeysInput,
  parseShortcutLine,
  renderKeycaps,
} from "@/tools/_lib/shortcuts";

/* ------------------------------------------------------------------ */
/* dataset integrity: 5 apps, ≥20 each, complete fields, no duplicates */
/* ------------------------------------------------------------------ */

describe("shortcuts dataset integrity", () => {
  it("covers exactly the five apps", () => {
    expect(new Set(SHORTCUTS.map((s) => s.app)).size).toBe(5);
    expect([...new Set(SHORTCUTS.map((s) => s.app))].sort()).toEqual([...SHORTCUT_APPS].sort());
  });

  it("has ≥20 shortcuts per app and ≥100 in total", () => {
    for (const app of SHORTCUT_APPS) {
      const n = SHORTCUTS.filter((s) => s.app === app).length;
      expect(n, app).toBeGreaterThanOrEqual(20);
    }
    expect(SHORTCUT_TOTAL).toBe(SHORTCUTS.length);
    expect(SHORTCUT_TOTAL).toBeGreaterThanOrEqual(100);
  });

  it("every entry has non-empty mac+win key arrays, label and description", () => {
    for (const s of SHORTCUTS) {
      expect(Array.isArray(s.keys.mac), `${s.app}/${s.label} mac keys`).toBe(true);
      expect(Array.isArray(s.keys.win), `${s.app}/${s.label} win keys`).toBe(true);
      expect(s.keys.mac.length, `${s.app}/${s.label} mac empty`).toBeGreaterThan(0);
      expect(s.keys.win.length, `${s.app}/${s.label} win empty`).toBeGreaterThan(0);
      for (const k of [...s.keys.mac, ...s.keys.win]) {
        expect(typeof k).toBe("string");
        expect(k.trim().length, `${s.app}/${s.label} key "${k}"`).toBeGreaterThan(0);
      }
      expect(s.label.trim().length, `${s.app}/${s.label} label`).toBeGreaterThan(2);
      // 说明必须是真描述,不是占位
      expect(s.description.length, `${s.app}/${s.label} description too short`).toBeGreaterThanOrEqual(30);
      expect(s.description.toLowerCase()).not.toContain("todo");
      expect(s.description.toLowerCase()).not.toContain("placeholder");
    }
  });

  it("every category id resolves in its app's category list", () => {
    for (const s of SHORTCUTS) {
      const ids = APP_CATEGORIES[s.app as AppId].map((c) => c.id);
      expect(ids.includes(s.category), `${s.app}/${s.category}`).toBe(true);
    }
    // 每个分类都至少有一条数据(不留空分组)
    for (const app of SHORTCUT_APPS) {
      for (const cat of APP_CATEGORIES[app]) {
        const n = SHORTCUTS.filter((s) => s.app === app && s.category === cat.id).length;
        expect(n, `${app}/${cat.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("has no duplicate (app, keys) bindings — order-insensitive per OS", () => {
    const seen = new Map<string, string>();
    for (const s of SHORTCUTS) {
      for (const os of ["mac", "win"] as Os[]) {
        const sig = [...s.keys[os]].map((k) => k.toLowerCase()).sort().join("+");
        const id = `${s.app}:${os}:${sig}`;
        expect(seen.has(id), `${id} duplicated by ${s.label} vs ${seen.get(id)}`).toBe(false);
        seen.set(id, s.label);
      }
    }
  });

  it("labels are unique within an app (rows are clickable/copyable targets)", () => {
    for (const app of SHORTCUT_APPS) {
      const labels = SHORTCUTS.filter((s) => s.app === app).map((s) => s.label.toLowerCase());
      expect(new Set(labels).size, app).toBe(labels.length);
    }
  });

  it("documents the real references: quick open, spotlight, snap, reopen, sequence keys", () => {
    const has = (app: string, label: string) => SHORTCUTS.some((s) => s.app === app && s.label === label);
    expect(has("vscode", "Quick Open, Go to File")).toBe(true);
    expect(has("vscode", "Command Palette")).toBe(true);
    expect(has("macos", "Spotlight Search")).toBe(true);
    expect(has("windows", "Snap Window Left")).toBe(true);
    expect(has("chrome", "Reopen Closed Tab")).toBe(true);
    // GitHub 序列键:G 前缀 + 单键查找器
    expect(has("github", "Activate File Finder")).toBe(true);
    const gb = SHORTCUTS.find((s) => s.app === "github" && s.label === "Go to Notifications")!;
    expect(gb.keys.mac).toEqual(["G", "N"]);
    expect(gb.keys.win).toEqual(["G", "N"]);
  });
});

/* ------------------------------------------------------------------ */
/* formatKeys: mac tight symbols, win plus-notation, chords spaced     */
/* ------------------------------------------------------------------ */

describe("formatKeys", () => {
  it("formats the canonical examples: ⌘C vs Ctrl+C", () => {
    expect(formatKeys(["⌘", "C"], "mac")).toBe("⌘C");
    expect(formatKeys(["Ctrl", "C"], "win")).toBe("Ctrl+C");
  });

  it("chains mac modifiers tightly and keeps non-modifiers spaced", () => {
    expect(formatKeys(["⌘", "⇧", "P"], "mac")).toBe("⌘⇧P");
    expect(formatKeys(["⌃", "⌘", "Space"], "mac")).toBe("⌃⌘Space");
    expect(formatKeys(["⌘", "K", "Z"], "mac")).toBe("⌘K Z"); // 和弦
    expect(formatKeys(["G", "B"], "mac")).toBe("G B"); // 序列
    expect(formatKeys(["Fn", "⌃", "←"], "mac")).toBe("Fn ⌃←");
  });

  it("uses plus-notation on Windows and spaces between plain keys", () => {
    expect(formatKeys(["Ctrl", "Shift", "P"], "win")).toBe("Ctrl+Shift+P");
    expect(formatKeys(["Ctrl", "K", "Z"], "win")).toBe("Ctrl+K Z");
    expect(formatKeys(["Win", "."], "win")).toBe("Win+.");
    expect(formatKeys(["G", "B"], "win")).toBe("G B");
  });

  it("handles empty, single-key and whitespace input", () => {
    expect(formatKeys([], "mac")).toBe("");
    expect(formatKeys([], "win")).toBe("");
    expect(formatKeys(["F12"], "win")).toBe("F12");
    expect(formatKeys([""], "mac")).toBe("");
    expect(formatKeys(["  "], "win")).toBe("");
  });

  it("formats every dataset entry without throwing or producing stray separators", () => {
    for (const s of SHORTCUTS) {
      for (const os of ["mac", "win"] as Os[]) {
        const out = formatKeys(s.keys[os], os);
        expect(out.length, `${s.app}/${s.label}/${os}`).toBeGreaterThan(0);
        expect(out).not.toMatch(/^\s|\s$/);
        expect(out).not.toContain("  ");
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/* normalizeKeys: ⌘⌥⇧⌃ ↔ Ctrl/Alt/Shift                                */
/* ------------------------------------------------------------------ */

describe("normalizeKeys", () => {
  it("maps mac symbols to Windows names", () => {
    expect(normalizeKeys(["⌘", "C"], "win")).toEqual(["Ctrl", "C"]);
    expect(normalizeKeys(["⌥", "⌘", "F"], "win")).toEqual(["Alt", "Ctrl", "F"]);
    expect(normalizeKeys(["⇧", "⌘", "3"], "win")).toEqual(["Shift", "Ctrl", "3"]);
    expect(normalizeKeys(["⌃", "`"], "win")).toEqual(["Ctrl", "`"]);
    expect(normalizeKeys(["⎋"], "win")).toEqual(["Esc"]);
    expect(normalizeKeys(["⏎"], "win")).toEqual(["Enter"]);
    expect(normalizeKeys(["⌫"], "win")).toEqual(["Backspace"]);
    expect(normalizeKeys(["Return"], "win")).toEqual(["Enter"]);
    expect(normalizeKeys(["Option", "V"], "win")).toEqual(["Alt", "V"]);
  });

  it("maps Windows names to mac symbols", () => {
    expect(normalizeKeys(["Ctrl", "C"], "mac")).toEqual(["⌘", "C"]);
    expect(normalizeKeys(["Ctrl", "Alt", "Del"], "mac")).toEqual(["⌘", "⌥", "Del"]);
    expect(normalizeKeys(["Shift", "Ctrl", "P"], "mac")).toEqual(["⇧", "⌘", "P"]);
    expect(normalizeKeys(["Alt", "Tab"], "mac")).toEqual(["⌥", "Tab"]);
    expect(normalizeKeys(["Win", "L"], "mac")).toEqual(["⌘", "L"]);
    expect(normalizeKeys(["Esc"], "mac")).toEqual(["⎋"]);
    expect(normalizeKeys(["Backspace"], "mac")).toEqual(["⌫"]);
  });

  it("passes through neutral keys and uppercases single letters", () => {
    expect(normalizeKeys(["F12"], "mac")).toEqual(["F12"]);
    expect(normalizeKeys(["space"], "win")).toEqual(["Space"]);
    expect(normalizeKeys(["Space"], "win")).toEqual(["Space"]);
    expect(normalizeKeys(["↑", "↓", "←", "→"], "win")).toEqual(["↑", "↓", "←", "→"]);
    expect(normalizeKeys(["c"], "win")).toEqual(["C"]);
    expect(normalizeKeys(["c"], "mac")).toEqual(["C"]);
  });

  it("is order-safe and robust against junk", () => {
    expect(normalizeKeys([], "mac")).toEqual([]);
    expect(normalizeKeys([""], "win")).toEqual([]);
    expect(normalizeKeys([null as unknown as string, "  ", "⌘"], "win")).toEqual(["Ctrl"]);
    expect(normalizeKeys("not-an-array" as unknown as string[], "win")).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* renderKeycaps: HTML keycaps with escaping                            */
/* ------------------------------------------------------------------ */

describe("renderKeycaps", () => {
  it("wraps each key in a keycap kbd element", () => {
    expect(renderKeycaps(["⌘", "C"])).toBe('<kbd class="keycap">⌘</kbd><kbd class="keycap">C</kbd>');
    expect(renderKeycaps(["Ctrl"])).toBe('<kbd class="keycap">Ctrl</kbd>');
  });

  it("escapes HTML-special content (XSS safety for pasted keys)", () => {
    const out = renderKeycaps(['<script>alert("x")</script>']);
    expect(out).not.toContain("<script>");
    expect(out).toContain("&lt;script&gt;");
    expect(out).toContain("&quot;x&quot;");
    expect(renderKeycaps(["A&B<C>D'E"])).toContain("A&amp;B&lt;C&gt;D&#39;E");
  });

  it("returns '' for empty, whitespace or junk input", () => {
    expect(renderKeycaps([])).toBe("");
    expect(renderKeycaps(["", "   "])).toBe("");
    expect(renderKeycaps(null as unknown as string[])).toBe("");
    expect(renderKeycaps(undefined as unknown as string[])).toBe("");
    expect(renderKeycaps([42 as unknown as string])).toBe("");
  });

  it("passes CJK and emoji key labels through", () => {
    expect(renderKeycaps(["空格", "🚀"])).toBe('<kbd class="keycap">空格</kbd><kbd class="keycap">🚀</kbd>');
  });
});

/* ------------------------------------------------------------------ */
/* parseShortcutLine / findConflicts                                    */
/* ------------------------------------------------------------------ */

describe("parseShortcutLine", () => {
  it("splits keys from label in the documented formats", () => {
    expect(parseShortcutLine("⌘C Copy")).toMatchObject({ keys: ["⌘", "C"], label: "Copy", ok: true });
    expect(parseShortcutLine("Ctrl+Shift+P Command palette")).toMatchObject({ keys: ["Ctrl", "Shift", "P"], label: "Command palette" });
    expect(parseShortcutLine("G B File finder")).toMatchObject({ keys: ["G", "B"], label: "File finder" });
    expect(parseShortcutLine("F2 Rename")).toMatchObject({ keys: ["F2"], label: "Rename" });
  });

  it("accepts bare key lines with an empty label", () => {
    expect(parseShortcutLine("Ctrl+P")).toMatchObject({ keys: ["Ctrl", "P"], label: "", ok: true });
  });

  it("marks blank lines as skipped and keyless lines as unparsed", () => {
    expect(parseShortcutLine("")).toMatchObject({ skipped: true, ok: false });
    expect(parseShortcutLine("   ")).toMatchObject({ skipped: true });
    const bad = parseShortcutLine("hello world");
    expect(bad.skipped).toBe(false);
    expect(bad.ok).toBe(false);
    expect(bad.keys).toEqual([]);
  });

  it("does not throw on CJK, emoji, control chars or non-strings", () => {
    expect(parseShortcutLine("⌘C 复制全部内容").label).toBe("复制全部内容");
    expect(parseShortcutLine("Ctrl+V 🚀 paste")).toMatchObject({ keys: ["Ctrl", "V"], label: "🚀 paste" });
    // 控制字符粘进 token → 整个 token 不再像按键,行被标记为未解析而非抛异常
    const ctrl = parseShortcutLine("⌘C\u0000weird");
    expect(ctrl.ok).toBe(false);
    expect(ctrl.keys).toEqual([]);
    expect(parseShortcutLine(null as unknown as string).ok).toBe(false);
    expect(parseShortcutLine(undefined as unknown as string).skipped).toBe(true);
    expect(parseShortcutLine(42 as unknown as string).ok).toBe(false);
  });
});

describe("findConflicts", () => {
  it("detects the canonical duplicate pair", () => {
    const r = findConflicts(["⌘C Copy", "⌘C Copy again", "⌘V Paste"]);
    expect(r.checked).toBe(3);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].display).toBe("Ctrl+C");
    expect(r.conflicts[0].indices).toEqual([0, 1]);
    expect(r.conflicts[0].lines).toEqual(["⌘C Copy", "⌘C Copy again"]);
  });

  it("is case-insensitive", () => {
    const r = findConflicts(["Ctrl+C Copy", "ctrl+c Copy text", "CTRL+C third"]);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].indices).toEqual([0, 1, 2]);
  });

  it("is order-insensitive across modifiers", () => {
    const r = findConflicts(["Ctrl+Shift+P Palette", "Shift+Ctrl+P Old palette", "Ctrl+P Quick open"]);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].signature).toBe("cmd+p+shift"); // 签名按字母排序,与输入顺序/写法无关(Ctrl 归一为 cmd)
  });

  it("ignores the label in comparison", () => {
    const r = findConflicts(["Ctrl+C Copy", "Ctrl+C Paste"]);
    expect(r.conflicts).toHaveLength(1);
  });

  it("treats ⌘C, Cmd+C and Ctrl+C as the same binding", () => {
    const r = findConflicts(["⌘C Copy", "Cmd+C Copy", "Command+C Copy"]);
    expect(r.conflicts).toHaveLength(1);
    expect(r.conflicts[0].indices).toHaveLength(3);
  });

  it("keeps genuinely different bindings apart (chords, sequences)", () => {
    const r = findConflicts(["Ctrl+K Z Zen mode", "Ctrl+Z Undo", "G B Branches", "G N Notifications"]);
    expect(r.conflicts).toHaveLength(0);
    expect(r.checked).toBe(4);
  });

  it("handles empty lists and whitespace-only lists", () => {
    expect(findConflicts([])).toMatchObject({ checked: 0, conflicts: [], unparsed: [] });
    const blank = findConflicts(["", "   ", "\t"]);
    expect(blank.checked).toBe(0);
    expect(blank.ignored).toEqual([0, 1, 2]);
    expect(blank.conflicts).toHaveLength(0);
  });

  it("reports unparsed lines instead of throwing", () => {
    const r = findConflicts(["Ctrl+C Copy", "no keys here", "Ctrl+V Paste"]);
    expect(r.unparsed).toEqual([{ index: 1, line: "no keys here" }]);
    expect(r.checked).toBe(2);
  });

  it("survives huge lists and hostile content", () => {
    // 三段互不相交的键域(字母 a–j · 数字 1–100 · 字母 k–t)→ 10000 个签名互不重复的绑定
    const big = Array.from(
      { length: 10000 },
      (_, i) => `Ctrl+${"abcdefghij"[i % 10]}+${(Math.floor(i / 10) % 100) + 1}+${"klmnopqrst"[Math.floor(i / 1000)]} shortcut a`,
    );
    const r = findConflicts(big);
    expect(r.checked).toBe(10000);
    // 12 个不同的 Ctrl+1..Ctrl+12 绑定循环,互不冲突
    expect(r.conflicts).toHaveLength(0);
    const hostile = findConflicts(["⌘C 复制 🚀", "Ctrl+C emoji copy", "\u0000\u0001", "<img src=x onerror=1>"]);
    expect(hostile.conflicts).toHaveLength(1);
    expect(hostile.unparsed).toHaveLength(2);
    expect(findConflicts(null as unknown as string[]).checked).toBe(0);
  });
});

describe("parseKeysInput", () => {
  it("parses plus, space and compact notation", () => {
    expect(parseKeysInput("Ctrl+Shift+P")).toEqual(["Ctrl", "Shift", "P"]);
    expect(parseKeysInput("⌘⇧P")).toEqual(["⌘", "⇧", "P"]);
    expect(parseKeysInput("⌘C")).toEqual(["⌘", "C"]);
    expect(parseKeysInput("Ctrl K Z")).toEqual(["Ctrl", "K", "Z"]);
    expect(parseKeysInput("alt+tab")).toEqual(["Alt", "Tab"]);
  });

  it("drops junk and survives hostile input", () => {
    expect(parseKeysInput("")).toEqual([]);
    expect(parseKeysInput("+++")).toEqual([]);
    expect(parseKeysInput("<script>")).toEqual([]);
    expect(parseKeysInput("Ctrl+<b>+P")).toEqual(["Ctrl", "P"]);
    expect(parseKeysInput(null as unknown as string)).toEqual([]);
    expect(parseKeysInput("⌘⇧P 复制")).toEqual(["⌘", "⇧", "P"]);
  });
});
