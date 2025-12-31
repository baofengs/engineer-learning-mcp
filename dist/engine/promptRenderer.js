import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsDir = join(__dirname, "..", "prompts", "engineer-learning");
export function renderPrompt(step, context) {
    const files = [
        "01-clarify-goal.md",
        "02-mkp.md",
        "03-mrd.md",
        "04-deep-questions.md",
        "05-real-output.md",
        "06-review.md"
    ];
    const file = files[step];
    if (!file)
        throw new Error(`Invalid step: ${step}`);
    let template = readFileSync(join(promptsDir, file), "utf-8");
    // Replace placeholders
    template = template.replace(/\{\{goal\}\}/g, context.goal || "");
    template = template.replace(/\{\{clarifiedGoal\}\}/g, context.clarifiedGoal || "");
    template = template.replace(/\{\{mkp\}\}/g, context.mkp || "");
    template = template.replace(/\{\{mrd\}\}/g, context.mrd || "");
    template = template.replace(/\{\{deepQuestions\}\}/g, context.deepQuestions?.join("\n") || "");
    template = template.replace(/\{\{realOutput\}\}/g, context.realOutput || "");
    return template;
}
export function getStepName(step) {
    const names = ["clarify-goal", "mkp", "mrd", "deep-questions", "real-output", "review"];
    return names[step] || "unknown";
}
