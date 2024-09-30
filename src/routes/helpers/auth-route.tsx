import { Navigate } from "react-router-dom";
import { AppChildrenProps } from "../../domain";
import { useAuth } from "../provider";

export const AuthRoute = ({ children }: AppChildrenProps) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />;
    } else {
        return children;
    }
};
