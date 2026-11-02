"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { findConflicts, renderKeycaps } from "../_lib/shortcuts";

/**
 * Shortcut Conflict Checker 引擎:粘贴自己应用的快捷键清单(每行一条,
 * 如 "⌘C Copy"),实时找出重复绑定。解析与检测走 _lib/shortcuts 纯函数。
 */

const L: Record<string, Record<string, string>> = {
  inputLabel: {
    en: "Your shortcut list — one per line: “Ctrl+Shift+P Command palette”",
    zh: "你的快捷键清单——每行一条,如“⌘⇧P 命令面板”",
    ja: "ショートカット一覧——1 行に 1 つ:「Ctrl+Shift+P コマンドパレット」",
    es: "Tu lista de atajos — uno por línea: «Ctrl+Shift+P Paleta de comandos»",
    pt: "Sua lista de atalhos — um por linha: “Ctrl+Shift+P Paleta de comandos”",
  },
  placeholder: {
    en: "Ctrl+C Copy\nCtrl+C Copy text\nCtrl+V Paste",
    zh: "⌘C 复制\n⌘C 拷贝文本\n⌘V 粘贴",
    ja: "Ctrl+C コピー\nCtrl+C テキストをコピー\nCtrl+V 貼り付け",
    es: "Ctrl+C Copiar\nCtrl+C Copiar texto\nCtrl+V Pegar",
    pt: "Ctrl+C Copiar\nCtrl+C Copiar texto\nCtrl+V Colar",
  },
  checked: {
    en: "{n} bindings checked",
    zh: "已检查 {n} 个绑定",
    ja: "{n} 個のバインドをチェック",
    es: "{n} combinaciones revisadas",
    pt: "{n} atalhos verificados",
  },
  clean: {
    en: "No duplicate bindings — every shortcut is unique.",
    zh: "没有重复绑定——每个快捷键都是唯一的。",
    ja: "重複するバインドなし——すべてのショートカットが一意です。",
    es: "Sin duplicados — cada atajo es único.",
    pt: "Sem duplicatas — cada atalho é único.",
  },
  conflictsTitle: {
    en: "Duplicate bindings",
    zh: "重复绑定",
    ja: "重複バインド",
    es: "Combinaciones duplicadas",
    pt: "Atalhos duplicados",
  },
  unparsedTitle: {
    en: "Lines with no recognisable keys (not compared)",
    zh: "未识别出按键的行(不参与比较)",
    ja: "キーを認識できない行(比較対象外)",
    es: "Líneas sin teclas reconocibles (no comparadas)",
    pt: "Linhas sem teclas reconhecíveis (não comparadas)",
  },
  formatHint: {
    en: "Keys come first, then an optional label: “⌘C Copy”, “Ctrl+Shift+P Palette”, “G B File finder”. Comparison ignores case, key order and the label.",
    zh: "按键在前,标签可选:“⌘C 复制”、“Ctrl+Shift+P 面板”、“G B 文件查找器”。比较忽略大小写、按键顺序和标签。",
    ja: "キーを先に、ラベルは任意:「⌘C コピー」「Ctrl+Shift+P パレット」「G B ファイル検索」。比較は大小文字・キー順・ラベルを無視します。",
    es: "Las teclas van primero, la etiqueta es opcional: «⌘C Copiar», «Ctrl+Shift+P Paleta», «G B Buscador de archivos». La comparación ignora mayúsculas, orden y etiqueta.",
    pt: "As teclas vêm primeiro, o rótulo é opcional: “⌘C Copiar”, “Ctrl+Shift+P Paleta”, “G B Buscador de arquivos”. A comparação ignora maiúsculas, ordem e rótulo.",
  },
  sample: {
    en: "Try an example",
    zh: "试试示例",
    ja: "例を試す",
    es: "Probar un ejemplo",
    pt: "Ver um exemplo",
  },
  count: {
    en: "{n}×",
    zh: "{n} 处",
    ja: "{n} 件",
    es: "{n}×",
    pt: "{n}×",
  },
};

const pick = (l: Record<string, string>, locale: string) => l[locale] ?? l.en;
const fill = (tpl: string, n: number) => tpl.replace(/\{n\}/g, String(n));

const SAMPLE = [
  "Ctrl+Shift+P Command palette",
  "Ctrl+P Quick open",
  "Shift+Ctrl+P Command palette",
  "Ctrl+C Copy line",
  "ctrl+c Copy selection",
  "Ctrl+X Cut line",
  "G B Go to branches",
  "B G Go to blame",
  "this line has no keys",
].join("\n");

function reportText(lines: string[]): string {
  const r = findConflicts(lines);
  if (r.conflicts.length === 0) return `No conflicts — ${r.checked} unique bindings.`;
  return r.conflicts
    .map((g) => `${g.display} (${g.indices.length}):\n${g.lines.map((l) => `  - ${l}`).join("\n")}`)
    .join("\n");
}

export function ShortcutConflictCheckerEngine() {
  const { locale, t } = useI18n();
  const [raw, setRaw] = useState("");

  const lines = useMemo(() => raw.split("\n"), [raw]);
  const report = useMemo(() => findConflicts(lines), [lines]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <label className="text-[13px] font-semibold text-[var(--color-sub)]" htmlFor="scc-input">
              {pick(L.inputLabel, locale)}
            </label>
            <button
              type="button"
              onClick={() => setRaw(SAMPLE)}
              className="no-print text-[13px] font-medium text-[var(--color-accent-strong)]"
            >
              {pick(L.sample, locale)}
            </button>
          </div>
          <textarea
            id="scc-input"
            className="field mono bg-[var(--color-surface)]"
            rows={8}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={pick(L.placeholder, locale)}
            spellCheck={false}
          />
        </div>

        <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{pick(L.formatHint, locale)}</p>

        {raw.trim().length > 0 && (
          <>
            <p className="text-[13px] text-[var(--color-sub)]" aria-live="polite">
              {fill(pick(L.checked, locale), report.checked)}
            </p>

            {report.conflicts.length === 0 ? (
              <p className="good-bg rounded-xl px-3.5 py-3 text-[14px] text-[var(--color-good)]">
                {pick(L.clean, locale)}
              </p>
            ) : (
              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-[var(--color-bad)]">{pick(L.conflictsTitle, locale)}</h3>
                {report.conflicts.map((g) => (
                  <div key={g.signature} className="error-bg rounded-xl px-3.5 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className="mono text-[15px]"
                        dangerouslySetInnerHTML={{ __html: renderKeycaps(g.display.split("+")) }}
                      />
                      <span className="mono text-[13px] font-semibold text-[var(--color-bad)]">
                        {fill(pick(L.count, locale), g.indices.length)}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {g.lines.map((l, i) => (
                        <li key={`${g.signature}-${i}`} className="mono text-[13px] text-[var(--color-ink)]">
                          <span className="text-[var(--color-sub)]">#{g.indices[i] + 1}</span> {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {report.unparsed.length > 0 && (
              <div>
                <h3 className="text-[13px] font-semibold text-[var(--color-sub)]">{pick(L.unparsedTitle, locale)}</h3>
                <ul className="mt-1.5 space-y-1">
                  {report.unparsed.map((u) => (
                    <li key={u.index} className="mono text-[13px] text-[var(--color-sub)]">
                      <span>#{u.index + 1}</span> {u.line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="no-print">
              <CopyButton value={() => reportText(lines)} label={t.common.copy} />
            </div>
          </>
        )}
      </div>
    </ToolPanel>
  );
}
