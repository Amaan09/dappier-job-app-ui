import { SearchQueryType } from "../constants";
import { ChatHistory } from "./chat-history-request";

export interface ChatCompletionRequest {
    userPrompt: string;

    namespaceId: string;

    chatHistory: ChatHistory[];

    searchQuery?: SearchQueryType;
}
