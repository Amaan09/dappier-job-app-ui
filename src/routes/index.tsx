import { ToastContainer } from "react-toastify";
import AppProvider from "./provider";
import { AppRouter } from "./router";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
    return (
        <AppProvider>
            <AppRouter />
            <ToastContainer />
        </AppProvider>
    );
};
