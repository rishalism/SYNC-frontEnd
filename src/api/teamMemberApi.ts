import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { TEAM_MEMBER_ENDPOINTS } from "@/services/endpoints/teamMemberEndpoints";


export async function teamMemberSignup(user: object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.SIGNUP, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function teamMemberVerifyEmail(user: object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.VERIFY, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function teamMemberLogin(user: object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.LOGIN, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function teamMemberGoogleLogin(user: object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.GOOGLE_LOGIN, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function teamMemberGoogleSignup(user: object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.GOOGLE_SIGNUP, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}




export async function AcceptProjectInvitation(data:object) {
    try {
        const response = await Api.post(TEAM_MEMBER_ENDPOINTS.ACCEPT_INVITATION,data )
        return response
    } catch (error) {
        errorHandler(error)
    }
}
