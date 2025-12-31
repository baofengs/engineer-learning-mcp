# Agent 学习计划导出

## 学习目标
- 能自己从零构建一个 Agent
- 深入理解 Agent 架构原理
- 熟练使用主流 Agent 框架开发应用
- 能够优化调整别人的 Agent，达到自己的需求目的

## 当前水平
了解 Agent 概念，对细节有基本了解

## 时间线
5 天

---

## 最小知识路径 (MKP)

### 核心概念
- Agent 基础架构（感知-思考-行动循环）
- LLM 作为 Agent 大脑的原理
- Prompt Engineering 在 Agent 中的应用
- Tool/Function Calling 机制
- Memory 系统（短期/长期记忆）
- Planning 策略（ReAct、Chain of Thought）
- 主流框架：LangChain / LangGraph / AutoGen

### 可跳过
- 多 Agent 协作
- 评估基准
- 生产部署
- LLM 微调

### 学习顺序
- Day 1: Agent 核心概念 + Tool Calling
- Day 2: Memory 系统 + Planning 策略
- Day 3: LangChain/LangGraph 框架实践
- Day 4: 构建自己的第一个 Agent
- Day 5: 优化和调试技巧

---

## 推荐资源 (MRD)

### Day 1: Agent 核心概念 + Tool Calling (4-5h)
- Lilian Weng - LLM Powered Autonomous Agents (必读经典)
- OpenAI Function Calling 官方文档
- 动手：用 OpenAI API 实现简单 Tool Calling

### Day 2: Memory + Planning (4-5h)
- ReAct 论文解读
- Chain of Thought Prompting
- LangChain Memory 概念
- 动手：实现带记忆的对话 Agent

### Day 3: 框架实践 (5-6h)
- LangGraph 官方教程
- 跟着教程构建 ReAct Agent

### Day 4: 构建自己的 Agent (6h)
- 选一个实际场景从零构建
- 建议场景：代码助手 / 研究助手 / 任务自动化

### Day 5: 优化调试 (4h)
- LangSmith 调试指南
- 优化 Day 4 的 Agent

---

## 核心知识提炼

### Agent 是什么？
Agent = LLM + 感知 + 思考 + 行动

```
用户输入 → [感知] → [LLM思考] → [选择工具] → [执行行动] → 返回结果
              ↑___________________________|  (循环)
```

### 核心组件
- **大脑 (LLM)**：负责理解、推理、决策
- **工具 (Tools)**：Agent 能调用的外部能力
- **记忆 (Memory)**：保存对话历史和重要信息
- **规划 (Planning)**：分解复杂任务的策略

### ReAct 模式
```
思考(Thought) → 行动(Action) → 观察(Observation) → 循环
```

---

## 当前进度
- [x] Step 1: 明确目标
- [x] Step 2: 最小知识路径 (MKP)
- [ ] Step 3: 最小资源文档 (MRD) - 进行中
- [ ] Step 4: 深度问题
- [ ] Step 5: 实际产出
- [ ] Step 6: 复盘

导出时间: 2025-12-25
