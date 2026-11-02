import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";
import { SHORTCUT_TOTAL } from "@/tools/_lib/shortcuts-data";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("keycheats MCP server", () => {
  it("exposes the three shortcut tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(["render_shortcut", "shortcut_conflicts", "shortcut_search"]);
    await client.close();
  });

  it("shortcut_search finds by label and reports both OS key styles", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "shortcut_search", arguments: { query: "command palette" } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.total_matches).toBeGreaterThanOrEqual(1);
    const vsCode = parsed.results.find((x: any) => x.app === "vscode");
    expect(vsCode.label).toBe("Command Palette");
    expect(vsCode.keys_mac).toBe("⌘⇧P");
    expect(vsCode.keys_win).toBe("Ctrl+Shift+P");
    expect(vsCode.category).toBe("general");
    await client.close();
  });

  it("shortcut_search respects the app filter and the limit", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "shortcut_search", arguments: { query: "tab", app: "chrome", limit: 3 } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.results.length).toBeGreaterThanOrEqual(1);
    expect(parsed.results.length).toBeLessThanOrEqual(3);
    for (const row of parsed.results) {
      expect(row.app).toBe("chrome");
    }
    await client.close();
  });

  it("shortcut_search finds sequence keys and flags them (GitHub G N)", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "shortcut_search", arguments: { query: "notifications" } });
    const parsed = JSON.parse((r.content as any)[0].text);
    const gn = parsed.results.find((x: any) => x.label === "Go to Notifications");
    expect(gn).toBeTruthy();
    expect(gn.keys_mac).toBe("G N");
    expect(gn.keys_win).toBe("G N");
    expect(gn.sequence).toBe(true);
    await client.close();
  });

  it("shortcut_search matches key notation ('⌘⇧T' finds reopen tab)", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "shortcut_search", arguments: { query: "⌘⇧T" } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.results.some((x: any) => x.label === "Reopen Closed Editor" && x.app === "vscode")).toBe(true);
    expect(parsed.results.some((x: any) => x.label === "Reopen Closed Tab" && x.app === "chrome")).toBe(true);
    await client.close();
  });

  it("shortcut_conflicts detects duplicates case-, order- and label-insensitively", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "shortcut_conflicts",
      arguments: {
        lines: [
          "Ctrl+Shift+P Command palette",
          "shift+ctrl+p Command palette (old config)",
          "Ctrl+C Copy line",
          "Ctrl+X Cut line",
          "not-a-key-line",
        ],
      },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.checked).toBe(4);
    expect(parsed.conflicts).toHaveLength(1);
    expect(parsed.conflicts[0].binding).toBe("Ctrl+Shift+P");
    expect(parsed.conflicts[0].count).toBe(2);
    expect(parsed.unparsed).toHaveLength(1);
    expect(parsed.unparsed[0].line).toBe("not-a-key-line");
    await client.close();
  });

  it("shortcut_conflicts treats ⌘C and Cmd+C as the same binding", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "shortcut_conflicts",
      arguments: { lines: ["⌘C Copy", "Cmd+C Copy selection", "Ctrl+V Paste"] },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.conflicts).toHaveLength(1);
    expect(parsed.conflicts[0].count).toBe(2);
    await client.close();
  });

  it("render_shortcut returns escaped keycap HTML and both text styles", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "render_shortcut",
      arguments: { keys: ["Ctrl", "Shift", "P"], os: "win" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.html).toBe('<kbd class="keycap">Ctrl</kbd><kbd class="keycap">Shift</kbd><kbd class="keycap">P</kbd>');
    expect(parsed.text_mac).toBe("⌘⇧P");
    expect(parsed.text_win).toBe("Ctrl+Shift+P");
    const evil = await client.callTool({ name: "render_shortcut", arguments: { keys: ["<b>"], os: "mac" } });
    const parsedEvil = JSON.parse((evil.content as any)[0].text);
    expect(parsedEvil.html).toContain("&lt;b&gt;");
    expect(parsedEvil.html).not.toContain("<b>");
    await client.close();
  });

  it("handles invalid input at both layers: schema (isError) and logic (isError)", async () => {
    const client = await connect();
    // schema 层:空 query 被 zod 拒绝 → SDK 返回 isError 结果(不 throw)
    const badQuery = await client.callTool({ name: "shortcut_search", arguments: { query: "" } });
    expect((badQuery as any).isError).toBe(true);
    // schema 层:lines 超 500 上限
    const tooMany = await client.callTool({
      name: "shortcut_conflicts",
      arguments: { lines: Array.from({ length: 501 }, (_, i) => `Ctrl+${i} X`) },
    });
    expect((tooMany as any).isError).toBe(true);
    // schema 层:render_shortcut 空 keys 数组(min 1)
    const emptyKeys = await client.callTool({ name: "render_shortcut", arguments: { keys: [], os: "mac" } });
    expect((emptyKeys as any).isError).toBe(true);
    // 逻辑层:全空白字符串的 keys → handler isError
    const blankKeys = await client.callTool({ name: "render_shortcut", arguments: { keys: ["  "], os: "mac" } });
    expect((blankKeys as any).isError).toBe(true);
    expect((blankKeys.content as any)[0].text).toContain("no usable keys");
    await client.close();
  });

  it("dataset backing the server is the site dataset", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "shortcut_search", arguments: { query: "the", limit: 25 } });
    const parsed = JSON.parse((r.content as any)[0].text);
    // 数据集存在且规模合理
    expect(SHORTCUT_TOTAL).toBeGreaterThanOrEqual(100);
    expect(parsed.results.length).toBeGreaterThan(0);
    await client.close();
  });
});
