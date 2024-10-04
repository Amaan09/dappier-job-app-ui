export const PROMPT_TYPES = {
    AI: 'AI',
    User: 'User'
}

export type PromptType = typeof PROMPT_TYPES[keyof typeof PROMPT_TYPES];
