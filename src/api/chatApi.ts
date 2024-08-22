import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { CHAT_ENDPOINTS } from "@/services/endpoints/ChatEndpoints";



export async function SaveChats(chatDetails: object) {
    try {
        const response = await Api.post(CHAT_ENDPOINTS.SAVE_CHAT, chatDetails);
        return response
    } catch (error) {
        errorHandler(error)

    }
}


export async function GetChats(projectId: string | undefined) {
    try {
        const response = await Api.get(`${CHAT_ENDPOINTS.GET_CHAT}/${projectId}`);
        return response
    } catch (error) {
        errorHandler(error)

    }
}