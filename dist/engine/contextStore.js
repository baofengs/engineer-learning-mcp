const store = new Map();
export function createSession(sessionId, goal) {
    const context = { goal, currentStep: 0 };
    store.set(sessionId, context);
    return context;
}
export function getSession(sessionId) {
    return store.get(sessionId);
}
export function updateSession(sessionId, updates) {
    const ctx = store.get(sessionId);
    if (ctx) {
        Object.assign(ctx, updates);
        store.set(sessionId, ctx);
    }
    return ctx;
}
export function deleteSession(sessionId) {
    return store.delete(sessionId);
}
