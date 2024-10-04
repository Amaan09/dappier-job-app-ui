import { PromptType } from "../constants";
import { AppChildrenProps } from "./app-children-props";

export interface ChatBubbleProps extends AppChildrenProps {
    type: PromptType;

    isDefault?: boolean;
}
