export interface ChatbotDropdownProps {
    chatbots: ChatbotDropdownOption[]

    selectedChatbot: ChatbotDropdownOption;

    onChatbotSelect: (option: ChatbotDropdownOption) => void
}

export interface ChatbotDropdownOption { 
    namespaceId: string;

    dateCreated: string;

    fileUrl: string;

    nickName: string;

    jobDescription: string;
}
