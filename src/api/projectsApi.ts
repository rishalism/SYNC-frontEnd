import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { PROJECTS_ENDPOINTS } from "@/services/endpoints/projectsEndpoints";
import { accessLevel } from "@/types/user";


export async function createProject(projectdetails: object) {
    try {
        const response = await Api.post(PROJECTS_ENDPOINTS.CREATE_PROJECT, projectdetails)
        return response
    } catch (error) {
        console.log('heeeey from errror');

        errorHandler(error)
    }
}


export async function getProject() {
    try {
        const projectData = await Api.get(PROJECTS_ENDPOINTS.GET_PROJECT)
        return projectData.data
    } catch (error) {
        errorHandler(error)
    }
}


export async function getCurrentProject(projectId: string | undefined) {
    try {

        const currentProjectData = await Api.get(`${PROJECTS_ENDPOINTS.GET_CURRENT_PROJECT}/${projectId}`)
        return currentProjectData
    } catch (error) {
        errorHandler(error)
    }
}



export async function editProject(projectId: string, projectData: object) {
    try {
        const response = await Api.put(`${PROJECTS_ENDPOINTS.EDIT_PROJECT}/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        errorHandler(error);

    }
}


export async function deleteProject(projectId: string | undefined) {
    try {
        const response = await Api.delete(`${PROJECTS_ENDPOINTS.DELETE_PROJECT}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function addMemberIntoProject(user: object) {

    try {
        const response = await Api.post(PROJECTS_ENDPOINTS.ADD_MEMBER, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}




export async function RemoveMember(user: object) {
    try {
        const response = await Api.post(PROJECTS_ENDPOINTS.REMOVE_MEMBER, user)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function UpdatePermission(projectId: string | undefined, userId: string | undefined, permissionType: string, access: accessLevel) {
    try {
        const response = await Api.patch(PROJECTS_ENDPOINTS.UPDATE_PERMISSIONS, { projectId, userId, permissionType, access })
        return response
    } catch (error) {
        errorHandler(error)
    }
}