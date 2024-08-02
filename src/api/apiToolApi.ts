import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { API_TOOl_ENDPOINTS } from "@/services/endpoints/ApiToolEndpoints";


export async function sendTestingApi(data: object) {
    try {
        const response = await Api.post(API_TOOl_ENDPOINTS.API_TEST, data)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function saveApi(data: object) {
    try {
        const response = await Api.post(API_TOOl_ENDPOINTS.API_TEST_SAVE, data)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function getAllApis(projectId: string | undefined) {
    try {
        const response = await Api.post(`${API_TOOl_ENDPOINTS.API_TEST_GET}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}




export async function RemoveOneApi(Detail: object) {
    try {
        const response = await Api.post(API_TOOl_ENDPOINTS.API_TEST_DELETE, Detail)
        return response
    } catch (error) {
        errorHandler(error)
    }
}