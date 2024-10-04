import { PromptType } from "../constants";

export interface ChatHistory {
    prompt: string;

    type: PromptType;
}
