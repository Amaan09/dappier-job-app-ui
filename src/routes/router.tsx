import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { ProtectedRoute } from "./helpers/protected-route";
import { AppRoot } from "./root";

const router = createBrowserRouter([
    {
        path: "/signup",
        lazy: async () => {
            const { Signup } = await import("../pages/auth/signup");
            return { Component: Signup };
        },
    },
    {
        path: "/login",
        lazy: async () => {
            const { Login } = await import("../pages/auth/login");
            return { Component: Login };
        },
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <AppRoot />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "resume-upload",
                lazy: async () => {
                    const { ResumeUpload } = await import(
                        "../pages/resume-upload/resume-upload"
                    );
                    return { Component: ResumeUpload };
                },
            },
            {
                path: "resume-chatbot-jobs",
                lazy: async () => {
                    const { ResumeChatbotJobs } = await import(
                        "../pages/resume-chatbot-jobs/resume-chatbot-jobs"
                    );
                    return { Component: ResumeChatbotJobs };
                },
            },
            {
                path: "resume-chatbot",
                lazy: async () => {
                    const { ResumeChatbot } = await import(
                        "../pages/resume-chatbot/resume-chatbot"
                    );
                    return { Component: ResumeChatbot };
                },
            },
            {
                path: "",
                lazy: async () => {
                    const { Home } = await import("../pages/home/home");
                    return { Component: Home };
                },
            },
        ],
    },
    {
        path: "*",
        lazy: async () => {
            const isAuthenticated =
                localStorage.getItem("user-access-token") !== null;
            if (isAuthenticated) {
                return { Component: () => <Navigate to="/dashboard" /> };
            } else {
                return { Component: () => <Navigate to="/login" /> };
            }
        },
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
