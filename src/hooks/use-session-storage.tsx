import { useEffect, useState } from "react";

export const useSessionStorage = <T,>(key: string) => {
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        if (key) {
            const storedLog = sessionStorage.getItem(key);
            return storedLog ? JSON.parse(storedLog) : undefined;
        }
        return undefined;
    });

    useEffect(() => {
        if (key) {
            const storedLog = sessionStorage.getItem(key);
            if (storedLog) {
                setStoredValue(JSON.parse(storedLog));
            } else {
                setStoredValue(undefined);
            }
        }
    }, [key]);

    const setSessionStoreValue = (value: T) => {
        sessionStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
    };

    const removeSessionStoreValue = () => {
        try {
            sessionStorage.removeItem(key);
            setStoredValue(undefined);
        } catch (error) {
            console.error("Error removing sessionStorage key", key, error);
        }
    };

    return { storedValue, setSessionStoreValue, removeSessionStoreValue };
};
