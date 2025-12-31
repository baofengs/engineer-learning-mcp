export interface ConversationEntry {
    role: "system" | "user" | "assistant";
    content: string;
    timestamp: string;
    step?: number;
    stepName?: string;
}
export interface LearningContext {
    goal: string;
    topic: string;
    clarifiedGoal?: string;
    mkp?: string;
    mrd?: string;
    deepQuestions?: string[];
    realOutput?: string;
    review?: string;
    currentStep: number;
    conversations: ConversationEntry[];
    createdAt: string;
    updatedAt: string;
}
export declare function createSession(sessionId: string, goal: string, topic?: string): LearningContext;
export declare function getSession(sessionId: string): LearningContext | undefined;
export declare function loadSessionByTopic(topic: string): {
    sessionId: string;
    context: LearningContext;
} | undefined;
export declare function updateSession(sessionId: string, updates: Partial<LearningContext>): LearningContext | undefined;
export declare function addConversation(sessionId: string, role: ConversationEntry["role"], content: string, step?: number, stepName?: string): void;
export declare function exportSession(sessionId: string): string | undefined;
export declare function listSessions(): {
    topic: string;
    updatedAt: string;
    currentStep: number;
}[];
export declare function deleteSession(sessionId: string): boolean;
export declare function getDataDir(): string;
