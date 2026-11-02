"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Os } from "../_lib/shortcuts-data";
import { formatKeys, normalizeKeys, parseKeysInput, renderKeycaps } from "../_lib/shortcuts";

/**
 * Key Visualizer 引擎:粘贴或拼装一个快捷键 → 键帽渲染 + 复制为习惯写法
 * (Mac ⌘C / Windows Ctrl+C)。输入解析与渲染走 _lib/shortcuts 纯函数。
 */

const L: Record<string, Record<string, string>> = {
  inputLabel: {
    en: "Type or paste a shortcut",
    zh: "输入或粘贴一个快捷键",
    ja: "ショートカットを入力・貼り付け",
    es: "Escribe o pega un atajo",
    pt: "Digite ou cole um atalho",
  },
  placeholder: {
    en: "e.g. Ctrl+Shift+P · ⌘⇧P · Ctrl K Z",
    zh: "例如 Ctrl+Shift+P · ⌘⇧P · Ctrl K Z",
    ja: "例: Ctrl+Shift+P · ⌘⇧P · Ctrl K Z",
    es: "p. ej. Ctrl+Shift+P · ⌘⇧P · Ctrl K Z",
    pt: "ex.: Ctrl+Shift+P · ⌘⇧P · Ctrl K Z",
  },
  addModifier: {
    en: "Add modifier keys",
    zh: "点选修饰键",
    ja: "修飾キーを追加",
    es: "Añadir teclas modificadoras",
    pt: "Adicionar teclas modificadoras",
  },
  baseKey: {
    en: "Main key (letter, F-key, arrow…)",
    zh: "主键(字母、F 键、方向键…)",
    ja: "メインキー(英字、F キー、矢印…)",
    es: "Tecla principal (letra, F, flecha…)",
    pt: "Tecla principal (letra, F, seta…)",
  },
  rendered: {
    en: "Keycaps",
    zh: "键帽",
    ja: "キーキャップ",
    es: "Teclas",
    pt: "Teclas",
  },
  macText: {
    en: "Mac style",
    zh: "Mac 写法",
    ja: "Mac 表記",
    es: "Estilo Mac",
    pt: "Estilo Mac",
  },
  winText: {
    en: "Windows style",
    zh: "Windows 写法",
    ja: "Windows 表記",
    es: "Estilo Windows",
    pt: "Estilo Windows",
  },
  empty: {
    en: "Type a shortcut above, or tap modifier keys to build one — the keycaps render as you go.",
    zh: "在上方输入快捷键,或点选修饰键拼一个——键帽会即时渲染。",
    ja: "上でショートカットを入力するか、修飾キーをタップして組み立ててください——キーキャップが即座に描画されます。",
    es: "Escribe un atajo arriba o toca teclas modificadoras para armarlo — las teclas se dibujan al instante.",
    pt: "Digite um atalho acima ou toque nas teclas modificadoras para montar — as teclas aparecem na hora.",
  },
};

const pick = (l: Record<string, string>, locale: string) => l[locale] ?? l.en;

const MODIFIERS: Record<Os, string[]> = {
  mac: ["⌘", "⇧", "⌥", "⌃"],
  win: ["Ctrl", "Shift", "Alt", "Win"],
};

export function KeyVisualizerEngine() {
  const { locale, t } = useI18n();
  const [os, setOs] = useState<Os>("mac");
  const [keys, setKeys] = useState<string[]>([]);
  const [raw, setRaw] = useState("");
  const [base, setBase] = useState("");

  const setFromRaw = (value: string) => {
    setRaw(value);
    const parsed = parseKeysInput(value);
    setKeys(parsed);
    // 主键输入框跟随解析结果(取最后一个非修饰键)
    const nonMod = parsed.filter((k) => !["⌘", "⇧", "⌥", "⌃"].includes(k) && !MODIFIERS.win.some((w) => w.toLowerCase() === k.toLowerCase()));
    setBase(nonMod.length ? nonMod[nonMod.length - 1] : "");
  };

  const isMod = (k: string) => MODIFIERS.mac.includes(k) || MODIFIERS.win.includes(k);

  const toggleModifier = (mod: string) => {
    // 先归一到当前 OS,避免粘贴 ⌘ 后再点 Ctrl 造成混合
    const cur = normalizeKeys(keys, os);
    const next = cur.includes(mod) ? cur.filter((k) => k !== mod) : [...cur, mod];
    applyKeys(next);
  };

  const applyKeys = (next: string[]) => {
    setKeys(next);
    setRaw(formatKeys(next, os));
    const nonMod = next.filter((k) => !isMod(k));
    setBase(nonMod.length ? nonMod[nonMod.length - 1] : "");
  };

  const setBaseKey = (value: string) => {
    setBase(value);
    const parsed = parseKeysInput(value);
    const baseKeys = parsed.length ? [parsed[parsed.length - 1]] : [];
    const mods = keys.filter((k) => isMod(k));
    const next = [...mods, ...baseKeys];
    setKeys(next);
    setRaw(formatKeys(next, os));
  };

  const switchOs = (next: Os) => {
    setOs(next);
    const normalized = normalizeKeys(keys, next);
    setKeys(normalized);
    setRaw(formatKeys(normalized, next));
  };

  const keycapsHtml = useMemo(() => renderKeycaps(keys), [keys]);
  const macFormat = useMemo(() => formatKeys(normalizeKeys(keys, "mac"), "mac"), [keys]);
  const winFormat = useMemo(() => formatKeys(normalizeKeys(keys, "win"), "win"), [keys]);

  return (
    <ToolPanel>
      <div className="space-y-5">
        {/* OS 切换 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="OS" className="inline-flex overflow-hidden rounded-full border hairline">
            {(["mac", "win"] as Os[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => switchOs(o)}
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
          <div className="mono text-[13px] text-[var(--color-sub)]">
            {t.common.copy}: {os === "mac" ? macFormat || "—" : winFormat || "—"}
          </div>
        </div>

        {/* 粘贴输入 */}
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-[var(--color-sub)]" htmlFor="kv-input">
            {pick(L.inputLabel, locale)}
          </label>
          <input
            id="kv-input"
            type="text"
            className="field mono"
            value={raw}
            onChange={(e) => setFromRaw(e.target.value)}
            placeholder={pick(L.placeholder, locale)}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* 键帽渲染 */}
        <div>
          <p className="mb-2 text-[13px] font-semibold text-[var(--color-sub)]">{pick(L.rendered, locale)}</p>
          {keycapsHtml ? (
            <div
              className="flex min-h-14 flex-wrap items-center gap-2.5 rounded-2xl bg-[var(--color-surface)] px-4 py-4 text-[26px]"
              // renderKeycaps 对每个键做 HTML 转义,用户输入安全
              dangerouslySetInnerHTML={{ __html: keycapsHtml }}
              aria-label={os === "mac" ? macFormat : winFormat}
            />
          ) : (
            <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-6 text-center text-[14px] text-[var(--color-sub)]">
              {pick(L.empty, locale)}
            </div>
          )}
        </div>

        {/* 拼装器 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[13px] font-semibold text-[var(--color-sub)]">{pick(L.addModifier, locale)}</p>
            <div className="flex flex-wrap gap-2">
              {MODIFIERS[os].map((mod) => (
                <button
                  key={mod}
                  type="button"
                  onClick={() => toggleModifier(mod)}
                  aria-pressed={keys.includes(mod)}
                  className={`keycap text-[15px] transition-opacity ${keys.includes(mod) ? "" : "opacity-45"}`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[var(--color-sub)]" htmlFor="kv-base">
              {pick(L.baseKey, locale)}
            </label>
            <input
              id="kv-base"
              type="text"
              className="field mono"
              value={base}
              onChange={(e) => setBaseKey(e.target.value)}
              placeholder="P / F12 / ←"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* 两种写法 + 复制 */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border hairline px-3.5 py-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(L.macText, locale)}</p>
            <p className="mono mt-1 text-[17px] font-semibold">{macFormat || "—"}</p>
          </div>
          <div className="rounded-xl border hairline px-3.5 py-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(L.winText, locale)}</p>
            <p className="mono mt-1 text-[17px] font-semibold">{winFormat || "—"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyButton value={() => formatKeys(normalizeKeys(keys, os), os)} label={t.common.copy} />
          <button
            type="button"
            onClick={() => {
              setKeys([]);
              setRaw("");
              setBase("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}
