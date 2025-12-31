import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
// 学习数据存储目录
const DATA_DIR = join(process.env.HOME || "~", ".engineer-learning");
function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
}
function sanitizeTopicName(topic) {
    return topic
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 50);
}
function getSessionDir(topic) {
    return join(DATA_DIR, sanitizeTopicName(topic));
}
function getSessionFile(topic) {
    return join(getSessionDir(topic), "session.json");
}
const memoryStore = new Map();
export function createSession(sessionId, goal, topic) {
    ensureDataDir();
    const topicName = topic || goal.slice(0, 30);
    const sessionDir = getSessionDir(topicName);
    if (!existsSync(sessionDir)) {
        mkdirSync(sessionDir, { recursive: true });
    }
    const now = new Date().toISOString();
    const context = {
        goal,
        topic: topicName,
        currentStep: 0,
        conversations: [],
        createdAt: now,
        updatedAt: now
    };
    memoryStore.set(sessionId, context);
    saveSession(sessionId, context);
    return context;
}
export function getSession(sessionId) {
    return memoryStore.get(sessionId);
}
export function loadSessionByTopic(topic) {
    const sessionFile = getSessionFile(topic);
    if (!existsSync(sessionFile))
        return undefined;
    try {
        const data = JSON.parse(readFileSync(sessionFile, "utf-8"));
        const sessionId = `learn-${Date.now()}`;
        memoryStore.set(sessionId, data);
        return { sessionId, context: data };
    }
    catch {
        return undefined;
    }
}
export function updateSession(sessionId, updates) {
    const ctx = memoryStore.get(sessionId);
    if (ctx) {
        Object.assign(ctx, updates, { updatedAt: new Date().toISOString() });
        memoryStore.set(sessionId, ctx);
        saveSession(sessionId, ctx);
    }
    return ctx;
}
export function addConversation(sessionId, role, content, step, stepName) {
    const ctx = memoryStore.get(sessionId);
    if (ctx) {
        ctx.conversations.push({
            role,
            content,
            timestamp: new Date().toISOString(),
            step,
            stepName
        });
        ctx.updatedAt = new Date().toISOString();
        saveSession(sessionId, ctx);
    }
}
function saveSession(sessionId, context) {
    const sessionFile = getSessionFile(context.topic);
    writeFileSync(sessionFile, JSON.stringify(context, null, 2), "utf-8");
}
export function exportSession(sessionId) {
    const ctx = memoryStore.get(sessionId);
    if (!ctx)
        return undefined;
    const sessionDir = getSessionDir(ctx.topic);
    const exportFile = join(sessionDir, `export-${Date.now()}.md`);
    let markdown = `# 学习主题: ${ctx.topic}\n\n`;
    markdown += `**目标**: ${ctx.goal}\n\n`;
    markdown += `**创建时间**: ${ctx.createdAt}\n\n`;
    markdown += `**最后更新**: ${ctx.updatedAt}\n\n`;
    markdown += `**当前步骤**: ${ctx.currentStep + 1}/6\n\n`;
    markdown += `---\n\n## 对话记录\n\n`;
    for (const conv of ctx.conversations) {
        const roleLabel = conv.role === "user" ? "👤 用户" : conv.role === "assistant" ? "🤖 助手" : "📋 系统";
        const stepInfo = conv.stepName ? ` [${conv.stepName}]` : "";
        markdown += `### ${roleLabel}${stepInfo}\n`;
        markdown += `*${conv.timestamp}*\n\n`;
        markdown += `${conv.content}\n\n`;
        markdown += `---\n\n`;
    }
    if (ctx.clarifiedGoal) {
        markdown += `## 澄清后的目标\n\n${ctx.clarifiedGoal}\n\n`;
    }
    if (ctx.mkp) {
        markdown += `## 最小知识路径 (MKP)\n\n${ctx.mkp}\n\n`;
    }
    if (ctx.mrd) {
        markdown += `## 最小资源文档 (MRD)\n\n${ctx.mrd}\n\n`;
    }
    if (ctx.deepQuestions?.length) {
        markdown += `## 深度问题\n\n${ctx.deepQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\n`;
    }
    if (ctx.realOutput) {
        markdown += `## 实际输出\n\n${ctx.realOutput}\n\n`;
    }
    if (ctx.review) {
        markdown += `## 复盘总结\n\n${ctx.review}\n\n`;
    }
    writeFileSync(exportFile, markdown, "utf-8");
    return exportFile;
}
export function listSessions() {
    ensureDataDir();
    const sessions = [];
    try {
        const dirs = readdirSync(DATA_DIR, { withFileTypes: true });
        for (const dir of dirs) {
            if (dir.isDirectory()) {
                const sessionFile = join(DATA_DIR, dir.name, "session.json");
                if (existsSync(sessionFile)) {
                    try {
                        const data = JSON.parse(readFileSync(sessionFile, "utf-8"));
                        sessions.push({
                            topic: data.topic,
                            updatedAt: data.updatedAt,
                            currentStep: data.currentStep
                        });
                    }
                    catch { }
                }
            }
        }
    }
    catch { }
    return sessions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
export function deleteSession(sessionId) {
    return memoryStore.delete(sessionId);
}
export function getDataDir() {
    return DATA_DIR;
}
