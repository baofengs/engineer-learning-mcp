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

const store = new Map<string, LearningContext>();

export function createSession(sessionId: string, goal: string): LearningContext {
  const context: LearningContext = { goal, currentStep: 0 };
  store.set(sessionId, context);
  return context;
}

export function getSession(sessionId: string): LearningContext | undefined {
  return store.get(sessionId);
}

export function updateSession(sessionId: string, updates: Partial<LearningContext>): LearningContext | undefined {
  const ctx = store.get(sessionId);
  if (ctx) {
    Object.assign(ctx, updates);
    store.set(sessionId, ctx);
  }
  return ctx;
}

export function deleteSession(sessionId: string): boolean {
  return store.delete(sessionId);
}
