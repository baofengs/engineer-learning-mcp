export declare function handleLearnStart(goal: string, topic?: string): import("../engine/workflowRunner.js").StepResult;
export declare function handleLearnResume(topic: string): import("../engine/workflowRunner.js").ResumeResult | {
    error: string;
};
export declare function handleLearnNext(sessionId: string, response: string): import("../engine/workflowRunner.js").StepResult;
export declare function handleLearnStatus(sessionId: string): import("../engine/contextStore.js").LearningContext | {
    error: string;
};
export declare function handleLearnExport(sessionId: string): {
    exportPath: string;
} | {
    error: string;
};
export declare function handleLearnList(): {
    sessions: ReturnType<typeof import("../engine/contextStore.js").listSessions>;
    dataDir: string;
};
