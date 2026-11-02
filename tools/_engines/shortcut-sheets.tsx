"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import {
  APP_CATEGORIES,
  APP_META,
  SHORTCUTS,
  SHORTCUT_APPS,
  type AppId,
  type Os,
} from "../_lib/shortcuts-data";
import { formatKeys, renderKeycaps } from "../_lib/shortcuts";

/**
 * Shortcut Sheets 引擎:5 个 app 页签 + Mac/Windows 双系统切换(自动检测 + 手动覆盖)
 * + 全量搜索 + 分类分组 + 行点击复制 + 打印友好。
 * 数据直接来自 _lib/shortcuts-data(静态模块,客户端零请求)。
 */

const L: Record<string, Record<string, string>> = {
  search: {
    en: "Search shortcuts… (palette, reopen, screenshot)",
    zh: "搜索快捷键…(命令面板、重开、截屏)",
    ja: "ショートカットを検索…(パレット、再開、スクリーンショット)",
    es: "Buscar atajos… (paleta, reabrir, captura)",
    pt: "Pesquisar atalhos… (paleta, reabrir, captura)",
  },
  empty: {
    en: "No shortcut matches “{q}” in this app.",
    zh: "此应用中没有匹配“{q}”的快捷键。",
    ja: "このアプリで「{q}」に一致するショートカットはありません。",
    es: "Ningún atajo coincide con «{q}» en esta app.",
    pt: "Nenhum atalho corresponde a “{q}” neste app.",
  },
  osTitle: {
    en: "Keyboard layout",
    zh: "键盘布局",
    ja: "キーボード配列",
    es: "Tipo de teclado",
    pt: "Tipo de teclado",
  },
  print: {
    en: "Print sheet",
    zh: "打印速查表",
    ja: "印刷",
    es: "Imprimir",
    pt: "Imprimir",
  },
  detected: {
    en: "Detected from your device",
    zh: "已按你的设备自动选择",
    ja: "デバイスから自動検出",
    es: "Detectado en tu dispositivo",
    pt: "Detectado no seu dispositivo",
  },
  copyHint: {
    en: "Click any row to copy its keys",
    zh: "点击任意行即可复制按键",
    ja: "行をクリックするとキーをコピー",
    es: "Haz clic en una fila para copiar sus teclas",
    pt: "Clique em uma linha para copiar as teclas",
  },
  entries: {
    en: "shortcuts",
    zh: "条快捷键",
    ja: "個のショートカット",
    es: "atajos",
    pt: "atalhos",
  },
};

const pick = (l: Record<string, string>, locale: string) => l[locale] ?? l.en;
const fill = (tpl: string, q: string) => tpl.replace(/\{q\}/g, q);

function detectOs(): Os {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const plat = `${nav.platform ?? ""} ${nav.userAgent ?? ""} ${nav.userAgentData?.platform ?? ""}`.toLowerCase();
  return /mac|iphone|ipad|ipod/.test(plat) ? "mac" : "win";
}

export function ShortcutSheetsEngine() {
  const { locale, t } = useI18n();
  const [app, setApp] = useState<AppId>("vscode");
  const [os, setOs] = useState<Os>("mac");
  const [query, setQuery] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 自动检测 OS;localStorage 里的手动覆盖优先
  useEffect(() => {
    try {
      const saved = localStorage.getItem("keycheats-os");
      if (saved === "mac" || saved === "win") {
        setOs(saved);
        return;
      }
    } catch {
      /* 私密模式忽略 */
    }
    setOs(detectOs());
  }, []);

  const meta = APP_META.find((a) => a.id === app)!;
  const categories = APP_CATEGORIES[app];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = SHORTCUTS.filter((s) => s.app === app);
    const match = (s: (typeof rows)[number]) =>
      !q ||
      s.label.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      formatKeys(s.keys.mac, "mac").toLowerCase().includes(q) ||
      formatKeys(s.keys.win, "win").toLowerCase().includes(q) ||
      s.keys.mac.some((k) => k.toLowerCase().includes(q)) ||
      s.keys.win.some((k) => k.toLowerCase().includes(q));
    return categories
      .map((cat) => ({
        cat,
        rows: rows.filter((s) => s.category === cat.id && match(s)),
      }))
      .filter((g) => g.rows.length > 0);
  }, [app, query, categories]);

  const shown = useMemo(() => groups.reduce((n, g) => n + g.rows.length, 0), [groups]);
  const total = useMemo(() => SHORTCUTS.filter((s) => s.app === app).length, [app]);

  const copyRow = (globalIdx: number, keys: { mac: string[]; win: string[] }) => {
    const text = formatKeys(keys[os], os);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setCopiedIdx(globalIdx);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedIdx(null), 1600);
  };

  const printSheet = () => window.print();

  return (
    <ToolPanel>
      <div className="space-y-4">
        {/* OS 切换 + 打印 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label={pick(L.osTitle, locale)}
            className="inline-flex overflow-hidden rounded-full border hairline"
          >
            {(["mac", "win"] as Os[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setOs(o);
                  try {
                    localStorage.setItem("keycheats-os", o);
                  } catch {
                    /* 私密模式忽略 */
                  }
                }}
                aria-pressed={os === o}
                className={`px-4 py-1.5 text-[13.5px] font-medium transition-colors ${
                  os === o
                    ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
                    : "bg-transparent text-[var(--color-sub)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {o === "mac" ? "macOS" : "Windows"}
              </button>
            ))}
          </div>
          <div className="no-print flex items-center gap-3">
            <span className="hidden text-[12.5px] text-[var(--color-sub)] sm:inline">{pick(L.detected, locale)}</span>
            <button
              type="button"
              onClick={printSheet}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              <Icon name="file" size={14} />
              {pick(L.print, locale)}
            </button>
          </div>
        </div>

        {/* App 页签 */}
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5" role="tablist" aria-label={meta.name}>
          {SHORTCUT_APPS.map((id) => {
            const m = APP_META.find((a) => a.id === id)!;
            const active = id === app;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setApp(id);
                  setQuery("");
                }}
                className={`flex-none rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                  active
                    ? "bg-[var(--color-accent)] text-white"
                    : "border hairline text-[var(--color-sub)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {/* App 简介 */}
        <p className="max-w-2xl text-[14.5px] leading-6 text-[var(--color-sub)]">{meta.blurb[locale as "en"] ?? meta.blurb.en}</p>

        {/* 搜索 */}
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="field"
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder={pick(L.search, locale)}
            aria-label={pick(L.search, locale)}
          />
          <span className="mono flex-none text-[13px] text-[var(--color-sub)]" aria-live="polite">
            {shown}/{total}
          </span>
        </div>

        {shown === 0 ? (
          <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-4 text-[14px] text-[var(--color-sub)]">
            <p>{fill(pick(L.empty, locale), query.trim())}</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-2 font-medium text-[var(--color-accent-strong)]"
            >
              {t.common.clear}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((g) => (
              <section key={g.cat.id}>
                <h3 className="mb-1.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                  {g.cat.label[locale as "en"] ?? g.cat.label.en}
                  <span className="ml-1.5 font-normal normal-case">{g.rows.length}</span>
                </h3>
                <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {g.rows.map((s) => {
                    const idx = SHORTCUTS.indexOf(s);
                    return (
                      <button
                        key={`${s.app}-${s.category}-${s.label}`}
                        type="button"
                        onClick={() => copyRow(idx, s.keys)}
                        aria-label={`${s.label}: ${formatKeys(s.keys[os], os)} — ${t.common.copy}`}
                        className={`grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-3.5 py-2.5 text-left transition-colors hover:bg-[var(--color-surface)] sm:grid-cols-[minmax(12rem,16rem)_1fr_auto] ${
                          copiedIdx === idx ? "bg-[var(--color-surface)]" : ""
                        }`}
                      >
                        <span className="text-[14.5px] font-semibold leading-5">{s.label}</span>
                        <span className="col-span-2 text-[13px] leading-5 text-[var(--color-sub)] sm:col-span-1">
                          {s.description}
                        </span>
                        <span className="col-start-2 row-start-1 flex flex-col items-end gap-1 justify-self-end sm:col-start-3">
                          {/* 键帽是纯函数渲染的静态 HTML,内容已转义 */}
                          <span
                            className="mono text-[14px]"
                            dangerouslySetInnerHTML={{ __html: renderKeycaps(s.keys[os]) }}
                          />
                          {copiedIdx === idx && (
                            <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[var(--color-good)]">
                              <Icon name="check" size={12} />
                              {t.common.copied}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="text-[12.5px] text-[var(--color-sub)]">
          {pick(L.copyHint, locale)} · {total} {pick(L.entries, locale)} · {meta.name}
        </p>
      </div>
    </ToolPanel>
  );
}

function fallbackCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}
