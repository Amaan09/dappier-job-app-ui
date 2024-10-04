import { ChatBubbleProps } from "../../../domain";
import { PROMPT_TYPES } from "../../../domain/constants";

export const ChatBubble = ({ children, type, isDefault }: ChatBubbleProps) => {
    const avatarImage =
        type === PROMPT_TYPES.AI
            ? "https://dappier-job-app.s3.amazonaws.com/bot-8b069da4-ef53-4217-a26c-fb9ddeff0ea3.jpeg"
            : "https://dappier-job-app.s3.amazonaws.com/person-79c676a0-8723-4713-931d-b96489a67b17.png";

    const styles =
        type === PROMPT_TYPES.AI
            ? "relative max-w-xl rounded-xl rounded-tl-none px-4 py-2 bg-gray-100"
            : "relative max-w-xl rounded-xl rounded-tl-none text-white px-4 py-2 bg-indigo-600";

    return (
        <div className="flex my-8">
            <img
                className="inline-block mr-3 h-8 w-8 rounded-full"
                src={avatarImage}
            />
            <div className="flex w-11/12 text-sm">
                <div className={styles}>
                    {isDefault ? (
                        <div>
                            <p className="mb-2">
                                <span className="font-semibold">
                                    Hello! I'm Dappier,
                                </span>{" "}
                                your virtual mock interviewer. I'm here to help
                                you excel in your interviews!
                            </p>
                            <p className="mb-2">
                                Choose an option to get started:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-2">
                                <li className="text-gray-900">
                                    <span className="font-semibold">
                                        Resume Evaluation:
                                    </span>{" "}
                                    Click for tailored questions based on your
                                    resume.
                                </li>
                                <li className="text-gray-900">
                                    <span className="font-semibold">
                                        Job Description Evaluation:
                                    </span>{" "}
                                    Click for role-specific questions.
                                </li>
                            </ul>
                            <p>
                                Provide your answer, and I'll give you
                                constructive feedback to improve. Let's ace your
                                interview preparation!
                            </p>
                        </div>
                    ) : (
                        <span className="text-sm font-normal">{children}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
