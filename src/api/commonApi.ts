import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { COMMON_ENDPOINTS } from "@/services/endpoints/CommonEndpoints";

export async function resendOtp(user: object) {
    try {
        const response = await Api.put(COMMON_ENDPOINTS.RESEND_OTP, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function refreshAccesToken() {
    try {
        const response = await Api.post(COMMON_ENDPOINTS.REFRESH_TOKEN, {}, { withCredentials: true });
        return response;
    } catch (error) {
        errorHandler(error);
    }
}

export async function logoutUsers() {
    try {
        const response = await Api.post(COMMON_ENDPOINTS.LOGOUT)
        return response
    } catch (error) {
        errorHandler(error)
    }
}