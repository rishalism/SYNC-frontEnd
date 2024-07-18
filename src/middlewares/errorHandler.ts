import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";
import { toast } from "sonner";

const errorHandler = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<unknown>;
        const errorMessage = axiosError.response?.data || "Something went wrong! Please try again or try reloading the page";
        toast.error(errorMessage as string, { style: { color: "red" }, position: 'top-center' })
    } else {
        toast.error("An unexpected error occurred", { style: { color: "red" }, position: 'top-center' });
    }
};

export default errorHandler;