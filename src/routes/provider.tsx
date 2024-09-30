import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppChildrenProps } from "../domain";

interface IAuthContext {
    token: string | null,
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AppProvider = ({ children }: AppChildrenProps) => {

    const [token, setToken_] = useState(localStorage.getItem("user-access-token"));

    const setToken = (token: string | null) => {
        setToken_(token);
    }

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
        () => ({ token, setToken }),
        [token]
    );

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

};

export const useAuth = () => {
    return useContext(AuthContext) ?? { token : null };
}

export default AppProvider;
