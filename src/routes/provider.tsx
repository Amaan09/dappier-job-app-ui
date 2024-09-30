import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppChildrenProps } from "../domain";
import { jwtDecode } from "jwt-decode";

interface IAuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: () => boolean;
    userId: string | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AppProvider = ({ children }: AppChildrenProps) => {
    const [token, setToken_] = useState(
        localStorage.getItem("user-access-token")
    );
    const [userId, setUserId] = useState<string | null>(null);

    const setToken = (token: string | null) => {
        setToken_(token);
    };

    const isAuthenticated = () => {
        return !!token; // Return true if token exists
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("user-access-token", token);
            const decodedToken: any = jwtDecode(token);
            setUserId(decodedToken.userId || null);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("user-access-token");
            setUserId(null);
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({ token, setToken, isAuthenticated, userId }),
        [token, userId]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return {
            token: null,
            setToken: () => {},
            isAuthenticated: () => false,
            userId: null,
        };
    }
    return context;
};

export default AppProvider;
