import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { PROJECT_LEAD_ENDPOINTS } from "@/services/endpoints/projectLeadEndpoints";


export async function ProjectLeadSignup(user: object) {
    try {
        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.SIGNUP, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function projectLeadEmailVerification(details: object) {
    try {
        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.VERIFY_EMAIL, details);
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function ProjectLeadLogin(user: object) {
    try {
        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.LOGIN, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function SignUpWithGoogle(user: object) {
    try {

        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.GOOGLE_SIGNUP, user)
        return response

    } catch (error) {
        errorHandler(error)

    }
}


export async function SignInWithGoogle(user: object) {
    try {
        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.GOOGLE_LOGIN, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

