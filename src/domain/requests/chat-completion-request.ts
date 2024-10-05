import { SearchQueryType } from "../constants";
import { ChatHistoryRequest } from "./chat-history-request";

export interface ChatCompletionRequest {
    userPrompt: string;

    namespaceId: string;

    chatHistory: ChatHistoryRequest[];

    searchQuery?: SearchQueryType;
}
