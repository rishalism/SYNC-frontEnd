import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";
import { toast } from "sonner";

const errorHandler = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<unknown>;
        console.log(axiosError.response?.data, '-----------------error from errohandler---------------------------------');
        if (axiosError.response?.status == 404) {
            toast.error('invalid API call or we having trouble processing your request', { style: { color: "red" }, position: 'top-center' })
        }
        else {
            const errorMessage = axiosError.response?.data || "Something went wrong! Please try again or try reloading the page";
            toast.error(errorMessage as string, { style: { color: "red" }, position: 'top-center' })
        }
    } else {
        console.log(err),'---------err------------err------------------err------------------err-----------------err';
        toast.error("An unexpected error occurred Please try again or try reloading the page", { style: { color: "red" }, position: 'top-center' });
    }
};

export default errorHandler;