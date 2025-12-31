# Engineer Learning MCP

一个基于 MCP 协议的工程师学习助手，通过结构化的 6 步学习流程帮助你深入掌握新知识。

## 特性

- 📚 结构化学习流程：目标澄清 → MKP → MRD → 深度问题 → 实践输出 → 复盘
- 💾 持久化存储：学习数据保存在 `~/.engineer-learning/` 目录
- 🔄 跨设备同步：支持恢复之前的学习进度
- 📝 完整导出：将学习过程导出为 Markdown 文件

## 安装

```bash
npm install
npm run build
```

## MCP 配置

```json
{
  "mcpServers": {
    "engineer-learning": {
      "command": "node",
      "args": ["/path/to/engineer-learning-mcp/dist/server.js"]
    }
  }
}
```

## 工具说明

| 工具 | 说明 |
|------|------|
| `learn_start` | 开始新学习，自动创建主题目录 |
| `learn_resume` | 恢复之前的学习进度 |
| `learn_next` | 继续下一步 |
| `learn_status` | 查看当前状态 |
| `learn_export` | 导出完整学习记录 |
| `learn_list` | 列出所有学习记录 |

## 使用示例

```
# 开始学习
learn_start(goal: "学习 Rust 所有权机制", topic: "rust-ownership")

# 查看所有学习记录
learn_list()

# 恢复学习
learn_resume(topic: "rust-ownership")

# 导出学习记录
learn_export(sessionId: "learn-xxx")
```

## 数据存储

学习数据存储在 `~/.engineer-learning/` 目录：

```
~/.engineer-learning/
├── rust-ownership/
│   ├── session.json      # 学习状态和对话记录
│   └── export-xxx.md     # 导出的 Markdown 文件
└── another-topic/
    └── ...
```

## 项目结构

```
engineer-learning-mcp/
├── server.ts              # MCP 服务入口
├── tools/learn.ts         # 工具处理函数
├── engine/
│   ├── workflowRunner.ts  # 工作流引擎
│   ├── promptRenderer.ts  # 提示词渲染
│   └── contextStore.ts    # 数据存储
├── prompts/engineer-learning/
│   ├── 01-clarify-goal.md
│   ├── 02-mkp.md
│   ├── 03-mrd.md
│   ├── 04-deep-questions.md
│   ├── 05-real-output.md
│   └── 06-review.md
└── workflows/
    └── engineer-learning.workflow.json
```
