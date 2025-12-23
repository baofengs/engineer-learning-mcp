import { type LearningContext } from "./contextStore.js";
export interface StepResult {
    sessionId: string;
    step: number;
    stepName: string;
    prompt: string;
    isComplete: boolean;
}
export declare function startWorkflow(sessionId: string, goal: string): StepResult;
export declare function nextStep(sessionId: string, response: string): StepResult;
export declare function getStatus(sessionId: string): LearningContext | undefined;
