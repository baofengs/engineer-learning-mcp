import { createSession, getSession, updateSession, addConversation, loadSessionByTopic, exportSession, listSessions, getDataDir } from "./contextStore.js";
import { renderPrompt, getStepName } from "./promptRenderer.js";
export function startWorkflow(sessionId, goal, topic) {
    const context = createSession(sessionId, goal, topic);
    const prompt = renderPrompt(0, context);
    addConversation(sessionId, "system", `开始学习: ${goal}`, 0, getStepName(0));
    addConversation(sessionId, "assistant", prompt, 0, getStepName(0));
    return {
        sessionId,
        step: 0,
        stepName: getStepName(0),
        prompt,
        isComplete: false,
        topic: context.topic,
        dataDir: getDataDir()
    };
}
export function resumeWorkflow(topic) {
    const loaded = loadSessionByTopic(topic);
    if (!loaded) {
        return { error: `未找到主题 "${topic}" 的学习记录` };
    }
    const { sessionId, context } = loaded;
    const isComplete = context.currentStep >= 6;
    addConversation(sessionId, "system", `恢复学习: ${context.goal}`, context.currentStep, getStepName(context.currentStep));
    let prompt;
    if (isComplete) {
        prompt = "学习流程已完成！你可以使用 learn_export 导出学习记录。";
    }
    else {
        prompt = renderPrompt(context.currentStep, context);
        addConversation(sessionId, "assistant", prompt, context.currentStep, getStepName(context.currentStep));
    }
    return {
        sessionId,
        step: context.currentStep,
        stepName: isComplete ? "complete" : getStepName(context.currentStep),
        prompt,
        isComplete,
        topic: context.topic,
        previousContext: {
            goal: context.goal,
            clarifiedGoal: context.clarifiedGoal,
            mkp: context.mkp,
            mrd: context.mrd,
            deepQuestions: context.deepQuestions,
            realOutput: context.realOutput
        }
    };
}
export function nextStep(sessionId, response) {
    const context = getSession(sessionId);
    if (!context)
        throw new Error(`Session not found: ${sessionId}`);
    addConversation(sessionId, "user", response, context.currentStep, getStepName(context.currentStep));
    const fieldMap = {
        0: "clarifiedGoal",
        1: "mkp",
        2: "mrd",
        3: "deepQuestions",
        4: "realOutput",
        5: "review"
    };
    const field = fieldMap[context.currentStep];
    if (field) {
        if (field === "deepQuestions") {
            updateSession(sessionId, { [field]: response.split("\n").filter(Boolean) });
        }
        else {
            updateSession(sessionId, { [field]: response });
        }
    }
    const nextStepNum = context.currentStep + 1;
    const isComplete = nextStepNum >= 6;
    if (!isComplete) {
        updateSession(sessionId, { currentStep: nextStepNum });
        const updatedContext = getSession(sessionId);
        const prompt = renderPrompt(nextStepNum, updatedContext);
        addConversation(sessionId, "assistant", prompt, nextStepNum, getStepName(nextStepNum));
        return {
            sessionId,
            step: nextStepNum,
            stepName: getStepName(nextStepNum),
            prompt,
            isComplete: false,
            topic: context.topic
        };
    }
    addConversation(sessionId, "system", "学习流程完成！", nextStepNum, "complete");
    return {
        sessionId,
        step: nextStepNum,
        stepName: "complete",
        prompt: "学习流程完成！使用 learn_export 导出完整的学习记录。",
        isComplete: true,
        topic: context.topic
    };
}
export function exportWorkflow(sessionId) {
    const path = exportSession(sessionId);
    if (!path) {
        return { error: "Session not found or export failed" };
    }
    return { exportPath: path };
}
export function listWorkflows() {
    return {
        sessions: listSessions(),
        dataDir: getDataDir()
    };
}
export function getStatus(sessionId) {
    return getSession(sessionId);
}
