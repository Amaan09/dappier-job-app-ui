import { useEffect, useState } from "react";
import { getAllResumes } from "../../api/resume-api";
import { ChatbotDropdownOption } from "../../domain";
import { ChatbotDropdown } from "./components/chat-bot-dropdown";
import { Chat } from "./components/chat";
import { NavLink } from "react-router-dom";

export const ResumeChatbot = () => {
    const [chatbots, setChatbots] = useState<ChatbotDropdownOption[]>([]);
    const [selectedChatbot, setSelectedChatbot] =
        useState<ChatbotDropdownOption>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllResumes();
                const chatbots: ChatbotDropdownOption[] = response.map((x) => ({
                    namespaceId: x.namespaceId,
                    fileUrl: x.fileUrl,
                    dateCreated: x.dateCreated,
                    nickName: x.nickName,
                    jobDescription: x.jobDescription,
                }));

                setChatbots(chatbots);
                setSelectedChatbot(chatbots[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const onChatbotSelect = (selectedChatbot: ChatbotDropdownOption) => {
        setSelectedChatbot(selectedChatbot);
    };

    return selectedChatbot ? (
        <>
            <ChatbotDropdown
                chatbots={chatbots}
                selectedChatbot={selectedChatbot}
                onChatbotSelect={onChatbotSelect}
            />
            <Chat chatbot={selectedChatbot} />
        </>
    ) : (
        <div>
            No chatbots avaliable. Please upload your training data{" "}
            <NavLink
                to="/dashboard/resume-upload"
                className="font-medium text-indigo-600 hover:text-indigo-500"
            >
                here.
            </NavLink>
        </div>
    );
};
