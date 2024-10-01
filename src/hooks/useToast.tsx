import { ToastOptions, toast } from "react-toastify";
import { Bounce } from "react-toastify";

type ToastType = "success" | "error";

const toastConfig: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

export const useToast = () => {
    const openToast = (type: ToastType, message: string) => {
        if (type === "success") {
            toast.success(message, toastConfig);
        } else if (type === "error") {
            toast.error(message, toastConfig);
        }
    };

    return openToast;
};
