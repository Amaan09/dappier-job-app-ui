import { useEffect, useState } from "react";
import { User } from "../../../domain/entities";
import { getCurrentUser } from "../../../api/user-api";

export const UserWelcome = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {user && <h1>Hello, {user.name} 👋. Welcome to the dashboard. </h1>}
        </>
    );
};
