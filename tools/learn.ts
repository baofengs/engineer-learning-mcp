import {
  startWorkflow,
  nextStep,
  getStatus,
  resumeWorkflow,
  exportWorkflow,
  listWorkflows
} from "../engine/workflowRunner.js";

export function handleLearnStart(goal: string, topic?: string) {
  const sessionId = `learn-${Date.now()}`;
  return startWorkflow(sessionId, goal, topic);
}

export function handleLearnResume(topic: string) {
  return resumeWorkflow(topic);
}

export function handleLearnNext(sessionId: string, response: string) {
  return nextStep(sessionId, response);
}

export function handleLearnStatus(sessionId: string) {
  const status = getStatus(sessionId);
  if (!status) return { error: "Session not found" };
  return status;
}

export function handleLearnExport(sessionId: string) {
  return exportWorkflow(sessionId);
}

export function handleLearnList() {
  return listWorkflows();
}
