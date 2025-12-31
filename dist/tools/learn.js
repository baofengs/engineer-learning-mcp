import { startWorkflow, nextStep, getStatus, resumeWorkflow, exportWorkflow, listWorkflows } from "../engine/workflowRunner.js";
export function handleLearnStart(goal, topic) {
    const sessionId = `learn-${Date.now()}`;
    return startWorkflow(sessionId, goal, topic);
}
export function handleLearnResume(topic) {
    return resumeWorkflow(topic);
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
export function handleLearnExport(sessionId) {
    return exportWorkflow(sessionId);
}
export function handleLearnList() {
    return listWorkflows();
}
