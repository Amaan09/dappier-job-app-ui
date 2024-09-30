import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppChildrenProps } from "../domain";

interface IAuthContext {
    token: string | null,
    setToken: (token: string | null) => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AppProvider = ({ children }: AppChildrenProps) => {

    const [token, setToken_] = useState(localStorage.getItem("user-access-token"));

    const setToken = (token: string | null) => {
        setToken_(token);
    }

    const isAuthenticated = () => {
        return !!token; // Return true if token exists
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("user-access-token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("user-access-token");
        }

    }, [token]);

    const contextValue = useMemo(
        () => ({ token, setToken, isAuthenticated }),
        [token]
    );

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return {
            token: null,
            setToken: () => { },
            isAuthenticated: () => false
        };
    }
    return context;
}

export default AppProvider;
