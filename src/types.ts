import { AsyncPromptConfig } from "@inquirer/prompts";

export type InputConfig = AsyncPromptConfig & {
  default?: string;
  transformer?: (value: string, { isFinal }: { isFinal: boolean }) => string;
};