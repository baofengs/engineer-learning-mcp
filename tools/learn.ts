import { startWorkflow, nextStep, getStatus } from "../engine/workflowRunner.js";

export function handleLearnStart(goal: string) {
  const sessionId = `learn-${Date.now()}`;
  return startWorkflow(sessionId, goal);
}

export function handleLearnNext(sessionId: string, response: string) {
  return nextStep(sessionId, response);
}

export function handleLearnStatus(sessionId: string) {
  const status = getStatus(sessionId);
  if (!status) return { error: "Session not found" };
  return status;
}
