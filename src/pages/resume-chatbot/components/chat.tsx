import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChatProps } from "../../../domain/props/chat-props";
import { ChatBubble } from "./chat-bubble";
import {
    PROMPT_TYPES,
    PromptType,
    SEARCH_QUERY_TYPES,
    SESSION_STORAGE_TYPES,
    SearchQueryType,
} from "../../../domain/constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChatHistory } from "../../../domain/entities/chat-history";
import { SubmitHandler, useForm } from "react-hook-form";
import { chatCompletion } from "../../../api/resume-api";
import { ChatHistoryRequest } from "../../../domain/requests/chat-history-request";
import { ChatCompletionRequest } from "../../../domain/requests/chat-completion-request";
import { ChatForm } from "../../../domain";
import { useSessionStorage } from "../../../hooks/use-session-storage";

export const Chat = ({ chatbot }: ChatProps) => {
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { storedValue, setSessionStoreValue, removeSessionStoreValue } =
        useSessionStorage<ChatHistory[]>(
            `${SESSION_STORAGE_TYPES.ChatHistory}-${chatbot.namespaceId}`
        );
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const value = storedValue ?? [];
        setChatHistory([...value]);
    }, [storedValue]);

    useLayoutEffect(() => {
        scrollToBottom();
    }, [storedValue]);

    const updateChatHistory = (history: ChatHistory[]) => {
        setChatHistory(history);
        setSessionStoreValue(history);
    };

    const clearChatHistory = () => {
        setChatHistory([]);
        removeSessionStoreValue();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChatForm>();
    const onSubmit: SubmitHandler<ChatForm> = async (data: ChatForm) => {
        await submitForm(data);
    };

    const submitForm = async (data: ChatForm, searchType?: SearchQueryType) => {
        setLoading(true);
        reset();
        updateChatHistory([
            ...chatHistory,
            getChatPrompt(PROMPT_TYPES.User, data.prompt),
        ]);

        const request: ChatCompletionRequest = {
            userPrompt: data.prompt,
            namespaceId: chatbot.namespaceId,
            chatHistory: buildChatHistory(),
        };

        if (searchType) {
            request.searchQuery = searchType;
        }

        const response = await chatCompletion(request);

        updateChatHistory([
            ...chatHistory,
            getChatPrompt(PROMPT_TYPES.User, response.userPrompt),
            getChatPrompt(PROMPT_TYPES.AI, response.aiPrompt),
        ]);
        setLoading(false);
    };

    const buildChatHistory = () => {
        const request: ChatHistoryRequest[] = [];
        let current = { aiPrompt: "", userPrompt: "" };

        chatHistory.forEach((item) => {
            if (item.type === PROMPT_TYPES.AI) {
                current.aiPrompt = item.prompt;
            } else if (item.type === PROMPT_TYPES.User) {
                current.userPrompt = item.prompt;
            }

            if (current.aiPrompt && current.userPrompt) {
                request.push({ ...current });
                current = { aiPrompt: "", userPrompt: "" };
            }
        });

        return request;
    };

    const sendPrompt = async (searchQuery: SearchQueryType) => {
        await submitForm(
            { prompt: getPromptBasedOnSearchType(searchQuery) },
            searchQuery
        );
    };

    const getChatPrompt = (type: PromptType, prompt: string): ChatHistory => ({
        type,
        prompt,
    });

    const getPromptBasedOnSearchType = (type: SearchQueryType): string => {
        if (type === SEARCH_QUERY_TYPES.JobDescription) {
            return "Create a question based on the job description.";
        } else {
            return "Create a question based on the resume.";
        }
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg drop-shadow-2xl overflow-y-auto mt-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="font-bold text-2xl">{chatbot.nickName}</p>
                    <p className="font-semibold text-gray-400 text-xs">
                        Created at: {chatbot.dateCreated.substring(0, 10)}
                    </p>
                </div>

                <button
                    onClick={clearChatHistory}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Reset
                    <ArrowPathIcon
                        className="ml-3 -mr-1 h-4 w-4"
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div ref={containerRef} className="overflow-y-auto h-[45vh]">
                <ChatBubble type={PROMPT_TYPES.AI} isDefault={true} />

                {chatHistory?.map((history, index) => (
                    <ChatBubble type={history.type} key={index}>
                        {history.prompt}
                    </ChatBubble>
                ))}

                {loading && (
                    <>
                        <div className="flex my-8">
                            <img
                                className="inline-block mr-3 h-8 w-8 rounded-full"
                                src="https://dappier-job-app.s3.amazonaws.com/bot-8b069da4-ef53-4217-a26c-fb9ddeff0ea3.jpeg"
                            />
                            <img
                                className="h-8 w-16"
                                src="https://media.tenor.com/sMenWFrH3YsAAAAC/typing-text.gif"
                            ></img>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-end p-2">
                <button
                    onClick={() => sendPrompt(SEARCH_QUERY_TYPES.Resume)}
                    type="button"
                    className="mr-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                    Resume Evaluation
                </button>
                <button
                    onClick={() =>
                        sendPrompt(SEARCH_QUERY_TYPES.JobDescription)
                    }
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                    Job description Evaluation
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-1 relative flex items-center">
                    <input
                        {...register("prompt", {
                            required: "User message is required.",
                        })}
                        placeholder="Type your message..."
                        className="shadow-sm block w-full pr-12 sm:text-sm border-gray-200 rounded-md "
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <button
                            disabled={loading}
                            type="submit"
                            className="inline-flex items-center border border-gray-200 rounded px-4 py-1.5 text-sm font-sans font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {errors.prompt && (
                    <p className="mt-1 text-xs text-red-600">
                        {errors.prompt.message}
                    </p>
                )}
            </form>

            <div className="flex items-center justify-center mt-4 font-semibold text-xs text-gray-400">
                Powered by
                <img
                    className="h-5 w-auto ml-2"
                    src="https://dappier.com/wp-content/uploads/2023/12/logo-wht.png"
                    alt="Dappier Job App"
                />
            </div>
        </div>
    );
};
