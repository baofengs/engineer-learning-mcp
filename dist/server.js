#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { handleLearnStart, handleLearnNext, handleLearnStatus } from "./tools/learn.js";
const server = new Server({ name: "engineer-learning-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "learn_start",
            description: "Start a new learning workflow with a goal",
            inputSchema: {
                type: "object",
                properties: {
                    goal: { type: "string", description: "The learning goal" }
                },
                required: ["goal"]
            }
        },
        {
            name: "learn_next",
            description: "Continue to the next step in the learning workflow",
            inputSchema: {
                type: "object",
                properties: {
                    sessionId: { type: "string", description: "The session ID" },
                    response: { type: "string", description: "Your response to the current step" }
                },
                required: ["sessionId", "response"]
            }
        },
        {
            name: "learn_status",
            description: "Get the current status of a learning session",
            inputSchema: {
                type: "object",
                properties: {
                    sessionId: { type: "string", description: "The session ID" }
                },
                required: ["sessionId"]
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
                result = handleLearnStart(args.goal);
                break;
            case "learn_next":
                result = handleLearnNext(args.sessionId, args.response);
                break;
            case "learn_status":
                result = handleLearnStatus(args.sessionId);
                break;
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Engineer Learning MCP server running");
}
main().catch(console.error);
