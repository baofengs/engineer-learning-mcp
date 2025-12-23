import { startWorkflow, nextStep, getStatus } from "../engine/workflowRunner.js";
export function handleLearnStart(goal) {
    const sessionId = `learn-${Date.now()}`;
    return startWorkflow(sessionId, goal);
}
export function handleLearnNext(sessionId, response) {
    return nextStep(sessionId, response);
}
export function handleLearnStatus(sessionId) {
    const status = getStatus(sessionId);
    if (!status)
        return { error: "Session not found" };
    return status;
}
