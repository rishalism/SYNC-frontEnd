import errorHandler from "@/middlewares/errorHandler"
import Api from "@/services/axiosconfig"
import { DBDESIGN_ENDPOINTS } from "@/services/endpoints/DbDesignEndpoints"



export async function SaveDbDesign(dbDesign: object) {
    try {
        const response = await Api.post(DBDESIGN_ENDPOINTS.SAVE_DBDESIGN, { dbdesignData: dbDesign })
        return response
    } catch (error) {
        errorHandler(error)
    }

}


export async function GetDbDesign(projectId: string) {
    try {
        const response = await Api.get(`${DBDESIGN_ENDPOINTS.GET_DBDESIGN}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }

}