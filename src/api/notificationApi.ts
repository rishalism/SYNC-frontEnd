import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { NOTIFICATION_ENDPOINTS } from "@/services/endpoints/notificationEndpoints";






export async function saveNotification(notificationDetails: object) {
    try {
        const response = await Api.post(NOTIFICATION_ENDPOINTS.SAVE_NOTIFICATION, notificationDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function getNotifications(projectId: string | undefined) {
    try {
        const response = await Api.get(`${NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function clearAllNotifications(projectId: object) {
    try {
        const response = await Api.post(NOTIFICATION_ENDPOINTS.CLEAR_ALL_NOTIFICATIONS, projectId)
        return response
    } catch (error) {
        errorHandler(error)
    }
}