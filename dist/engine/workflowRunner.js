import { createSession, getSession, updateSession } from "./contextStore.js";
import { renderPrompt, getStepName } from "./promptRenderer.js";
export function startWorkflow(sessionId, goal) {
    const context = createSession(sessionId, goal);
    const prompt = renderPrompt(0, context);
    return {
        sessionId,
        step: 0,
        stepName: getStepName(0),
        prompt,
        isComplete: false
    };
}
export function nextStep(sessionId, response) {
    const context = getSession(sessionId);
    if (!context)
        throw new Error(`Session not found: ${sessionId}`);
    // Save response to appropriate field
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
        return {
            sessionId,
            step: nextStepNum,
            stepName: getStepName(nextStepNum),
            prompt,
            isComplete: false
        };
    }
    return {
        sessionId,
        step: nextStepNum,
        stepName: "complete",
        prompt: "Learning workflow complete!",
        isComplete: true
    };
}
export function getStatus(sessionId) {
    return getSession(sessionId);
}
