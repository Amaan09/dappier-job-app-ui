import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { ProtectedRoute } from "./helpers/protected-route";
import { AuthRoute } from "./helpers/auth-route";

const router = createBrowserRouter([
    {
        path: "/signup",
        lazy: async () => {
            const { Signup } = await import("../pages/auth/signup");
            return {
                Component: () => (
                    <AuthRoute>
                        <Signup />
                    </AuthRoute>
                ),
            };
        },
    },
    {
        path: "/login",
        lazy: async () => {
            const { Login } = await import("../pages/auth/login");
            return {
                Component: () => (
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                ),
            };
        },
    },
    {
        path: "/dashboard",
        lazy: async () => {
            const { AppRoot } = await import("./root");
            return {
                Component: () => (
                    <ProtectedRoute>
                        <AppRoot />
                    </ProtectedRoute>
                ),
            };
        },
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
