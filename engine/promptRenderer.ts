import { readFileSync } from "fs";
import { join } from "path";
import type { LearningContext } from "./contextStore.js";

const promptsDir = "/Users/bf/projects/bywork/engineer-learning-mcp/prompts/engineer-learning";

export function renderPrompt(step: number, context: LearningContext): string {
  const files = [
    "01-clarify-goal.md",
    "02-mkp.md",
    "03-mrd.md",
    "04-deep-questions.md",
    "05-real-output.md",
    "06-review.md"
  ];

  const file = files[step];
  if (!file) throw new Error(`Invalid step: ${step}`);

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

export function getStepName(step: number): string {
  const names = ["clarify-goal", "mkp", "mrd", "deep-questions", "real-output", "review"];
  return names[step] || "unknown";
}
