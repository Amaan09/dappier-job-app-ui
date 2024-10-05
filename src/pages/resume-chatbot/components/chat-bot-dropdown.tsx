import { Fragment } from "react";
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../domain/utils";
import { ChatbotDropdownProps } from "../../../domain";

export const ChatbotDropdown = ({
    chatbots,
    selectedChatbot,
    onChatbotSelect,
}: ChatbotDropdownProps) => {
    return (
        <Listbox value={selectedChatbot} onChange={onChatbotSelect}>
            {({ open }) => (
                <>
                    <Label className="block text-sm font-medium text-gray-700">
                        Select a Chatbot
                    </Label>
                    <div className="mt-1 relative">
                        <ListboxButton className="cursor-pointer bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">
                                {selectedChatbot.nickName}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </ListboxButton>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {chatbots.map((chatbot) => (
                                    <ListboxOption
                                        key={chatbot.namespaceId}
                                        className={({ focus }) =>
                                            classNames(
                                                focus
                                                    ? "text-white bg-indigo-600"
                                                    : "text-gray-900",
                                                "cursor-pointer select-none relative py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={chatbot}
                                    >
                                        {({ selected, focus }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate"
                                                    )}
                                                >
                                                    {chatbot.nickName}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            focus
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};
