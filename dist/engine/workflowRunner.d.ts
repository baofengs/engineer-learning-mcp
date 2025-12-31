import { listSessions, type LearningContext } from "./contextStore.js";
export interface StepResult {
    sessionId: string;
    step: number;
    stepName: string;
    prompt: string;
    isComplete: boolean;
    topic?: string;
    dataDir?: string;
}
export interface ResumeResult {
    sessionId: string;
    step: number;
    stepName: string;
    prompt: string;
    isComplete: boolean;
    topic: string;
    previousContext: {
        goal: string;
        clarifiedGoal?: string;
        mkp?: string;
        mrd?: string;
        deepQuestions?: string[];
        realOutput?: string;
    };
}
export declare function startWorkflow(sessionId: string, goal: string, topic?: string): StepResult;
export declare function resumeWorkflow(topic: string): ResumeResult | {
    error: string;
};
export declare function nextStep(sessionId: string, response: string): StepResult;
export declare function exportWorkflow(sessionId: string): {
    exportPath: string;
} | {
    error: string;
};
export declare function listWorkflows(): {
    sessions: ReturnType<typeof listSessions>;
    dataDir: string;
};
export declare function getStatus(sessionId: string): LearningContext | undefined;
