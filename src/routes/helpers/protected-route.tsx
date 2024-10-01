import { Navigate } from "react-router-dom";
import { AppChildrenProps } from "../../domain";
import { useAuth } from "../provider";

export const ProtectedRoute = ({ children }: AppChildrenProps) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};
