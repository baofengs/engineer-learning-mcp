export interface LearningContext {
    goal: string;
    clarifiedGoal?: string;
    mkp?: string;
    mrd?: string;
    deepQuestions?: string[];
    realOutput?: string;
    review?: string;
    currentStep: number;
}
export declare function createSession(sessionId: string, goal: string): LearningContext;
export declare function getSession(sessionId: string): LearningContext | undefined;
export declare function updateSession(sessionId: string, updates: Partial<LearningContext>): LearningContext | undefined;
export declare function deleteSession(sessionId: string): boolean;
