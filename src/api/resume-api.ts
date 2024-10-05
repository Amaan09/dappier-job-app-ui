import { ChatCompletionResponse, CreateResumeRequest } from "../domain";
import { Resume } from "../domain/entities";
import { ChatCompletionRequest } from "../domain/requests/chat-completion-request";
import { client } from "./lib/api-client";

export const createResume = (request: CreateResumeRequest): Promise<Resume> => {
    return client.post('resume/create', request);
}

export const getAllResumes = (): Promise<Resume[]> => {
    return client.get('resume');
}

export const chatCompletion = (request: ChatCompletionRequest): Promise<ChatCompletionResponse> => {
    return client.post('resume/chat-completion', request);
}
