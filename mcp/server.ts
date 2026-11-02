import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCP_TOOLS } from "./tools";

/**
 * KeyCheats MCP server(stdio):把站上快捷键数据集与纯函数逻辑
 * 暴露为 AI 可执行工具。人和 AI 用同一份经过测试的实现。
 *
 * 构建后运行:npx keycheats-mcp(或 node mcp/dist/server.mjs)
 */

export function createServer() {
  const server = new McpServer(
    { name: "keycheats", version: "1.0.0" },
    {
      instructions:
        "KeyCheats: keyboard shortcut reference sheets (https://keycheats.app). These executable tools search a curated dataset of 125+ real shortcuts for VS Code, macOS, Windows, Chrome and GitHub, detect duplicate bindings in a shortcut list, and render shortcuts as keycaps/formatted text. Sequence keys (GitHub 'G then B') are listed in press order.",
    },
  );

  for (const tool of MCP_TOOLS) {
    server.registerTool(tool.name, {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema,
    }, async (args) => {
      try {
        return tool.run(args ?? {});
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `error: ${(e as Error).message}` }],
          isError: true,
        };
      }
    });
  }
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdio 模式下保持进程存活;stderr 可写日志(stdout 是协议通道)
  console.error(`keycheats MCP server: ${MCP_TOOLS.length} tools ready`);
}

if (process.argv[1] && process.argv[1].includes("server")) {
  void runStdio();
}
