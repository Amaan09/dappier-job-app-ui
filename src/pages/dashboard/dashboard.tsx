import { AppChildrenProps } from "../../domain";
import { Fragment, useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {
    HomeIcon,
    XMarkIcon,
    Bars3Icon,
    UserCircleIcon,
    DocumentArrowUpIcon,
    PresentationChartLineIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../routes/provider";

const navigation = [
    {
        name: "Dashboard",
        to: "/dashboard",
        icon: HomeIcon,
    },
    {
        name: "Upload Resume",
        to: "/dashboard/resume-upload",
        icon: DocumentArrowUpIcon,
    },
    {
        name: "Chatbot Training Status",
        to: "/dashboard/resume-chatbot-jobs",
        icon: PresentationChartLineIcon,
    },
    {
        name: "Chatbot",
        to: "/dashboard/resume-chatbot",
        icon: ChatBubbleLeftRightIcon,
    },
];
const userNavigation = [{ name: "Sign out" }];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const Dashboard = ({ children }: AppChildrenProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setToken } = useAuth();

    const logout = () => {
        setToken(null);
    };

    return (
        <>
            <div>
                {/* Sidebar for mobile */}
                <Transition show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-40 flex md:hidden"
                        onClose={setSidebarOpen}
                    >
                        <TransitionChild
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <DialogBackdrop className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </TransitionChild>
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex-shrink-0 px-4 flex items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://dappier.com/wp-content/uploads/2023/12/logo-wht.png"
                                        alt="Dappier Job App"
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.to}
                                                className={({ isActive }) =>
                                                    classNames(
                                                        isActive
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                        "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                                                    )
                                                }
                                            >
                                                <item.icon
                                                    className="text-gray-500 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </TransitionChild>
                        <div className="flex-shrink-0 w-14">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition>

                {/* Sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                        <div className="flex-shrink-0 px-4 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://dappier.com/wp-content/uploads/2023/12/logo-wht.png"
                                alt="Dappier Job App"
                            />
                        </div>
                        <div className="flex-grow mt-5 flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                                            )
                                        }
                                        end
                                    >
                                        <item.icon
                                            className="text-gray-500 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="md:pl-64">
                    <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="flex-1 flex justify-between px-4 md:px-0">
                                <div className="flex-1 flex"></div>
                                <div className="ml-4 flex items-center md:ml-6">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <MenuButton className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <UserCircleIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <MenuItem key={item.name}>
                                                        {({ focus }) => (
                                                            <button
                                                                onClick={logout}
                                                                className={classNames(
                                                                    focus
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block py-2 px-4 text-sm text-gray-700 w-full"
                                                                )}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <main className="flex-1">
                            <div className="py-6">{children}</div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};
