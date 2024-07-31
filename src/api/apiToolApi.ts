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


