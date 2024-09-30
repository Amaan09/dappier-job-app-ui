import { Navigate } from "react-router-dom";
import { AppChildrenProps } from "./domain";
import { useAuth } from "./routes/provider";

export const ProtectedRoute = ({ children }: AppChildrenProps) => {

    const auth = useAuth() ?? { token: null };

    if (!auth?.token) {
        return <Navigate to="/login" />
    } else {
        return children;
    }
}
