export declare function handleLearnStart(goal: string): import("../engine/workflowRunner.js").StepResult;
export declare function handleLearnNext(sessionId: string, response: string): import("../engine/workflowRunner.js").StepResult;
export declare function handleLearnStatus(sessionId: string): import("../engine/contextStore.js").LearningContext | {
    error: string;
};
