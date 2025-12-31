#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  handleLearnStart,
  handleLearnNext,
  handleLearnStatus,
  handleLearnResume,
  handleLearnExport,
  handleLearnList
} from "./tools/learn.js";

const server = new Server(
  { name: "engineer-learning-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "learn_start",
      description: "开始一个新的学习流程。会根据主题创建专属目录存储学习数据。",
      inputSchema: {
        type: "object",
        properties: {
          goal: { type: "string", description: "学习目标，详细描述你想学什么" },
          topic: { type: "string", description: "主题名称（可选），用于创建目录和后续恢复学习" }
        },
        required: ["goal"]
      }
    },
    {
      name: "learn_resume",
      description: "恢复之前的学习进度，支持跨设备继续学习",
      inputSchema: {
        type: "object",
        properties: {
          topic: { type: "string", description: "要恢复的学习主题名称" }
        },
        required: ["topic"]
      }
    },
    {
      name: "learn_next",
      description: "继续学习流程的下一步",
      inputSchema: {
        type: "object",
        properties: {
          sessionId: { type: "string", description: "会话 ID" },
          response: { type: "string", description: "你对当前步骤的回答" }
        },
        required: ["sessionId", "response"]
      }
    },
    {
      name: "learn_status",
      description: "获取当前学习会话的状态",
      inputSchema: {
        type: "object",
        properties: {
          sessionId: { type: "string", description: "会话 ID" }
        },
        required: ["sessionId"]
      }
    },
    {
      name: "learn_export",
      description: "导出学习记录到 Markdown 文件，包含完整的对话历史",
      inputSchema: {
        type: "object",
        properties: {
          sessionId: { type: "string", description: "会话 ID" }
        },
        required: ["sessionId"]
      }
    },
    {
      name: "learn_list",
      description: "列出所有学习记录，查看可恢复的学习主题",
      inputSchema: {
        type: "object",
        properties: {}
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;
    switch (name) {
      case "learn_start":
        result = handleLearnStart(
          (args as { goal: string; topic?: string }).goal,
          (args as { goal: string; topic?: string }).topic
        );
        break;
      case "learn_resume":
        result = handleLearnResume((args as { topic: string }).topic);
        break;
      case "learn_next":
        result = handleLearnNext(
          (args as { sessionId: string }).sessionId,
          (args as { response: string }).response
        );
        break;
      case "learn_status":
        result = handleLearnStatus((args as { sessionId: string }).sessionId);
        break;
      case "learn_export":
        result = handleLearnExport((args as { sessionId: string }).sessionId);
        break;
      case "learn_list":
        result = handleLearnList();
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Engineer Learning MCP server running");
}

main().catch(console.error);
