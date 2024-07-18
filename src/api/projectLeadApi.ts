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





export async function createProject(projectdetails: object) {
    try {
        const response = await Api.post(PROJECT_LEAD_ENDPOINTS.CREATE_PROJECT, projectdetails)
        return response
    } catch (error) {
        console.log('heeeey from errror');

        errorHandler(error)
    }
}


export async function getProject() {
    try {

        const projectData = await Api.get(PROJECT_LEAD_ENDPOINTS.GET_PROJECTS)
        return projectData.data
    } catch (error) {
        errorHandler(error)
    }
}