import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { NOTEPAD_ENDPOINTS } from "@/services/endpoints/NotePadEndpoints";






export async function CreateNewNote(noteDetails: object) {
    try {
        const response = await Api.post(NOTEPAD_ENDPOINTS.CREATE_NOTE, noteDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function GetNotes(ProjectId: string | undefined) {
    try {
        const response = await Api.get(`${NOTEPAD_ENDPOINTS.GET_NOTES}/${ProjectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function UpdateNotes(updatedNotes: object) {
    try {
        const response = await Api.post(NOTEPAD_ENDPOINTS.UPDATE_NOTES, updatedNotes)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function DeleteNote(id: object | undefined) {
    try {
        const response = await Api.post(NOTEPAD_ENDPOINTS.DELETE_NOTE, id)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function AskAi(prompt: object) {
    try {
        const response = await Api.post(NOTEPAD_ENDPOINTS.ASK_AI, prompt)
        return response
    } catch (error) {
        errorHandler(error)
    }
}