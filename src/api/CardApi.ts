import errorHandler from "@/middlewares/errorHandler";
import Api from "@/services/axiosconfig";
import { CARD_ENDPOINTS } from "@/services/endpoints/CardEndpoints";
import { ICard, Icolumn } from "@/types/interfaces/IBoard";



export async function AddcardIntoDB(cards: ICard) {
    try {
        const response = await Api.post(CARD_ENDPOINTS.ADD_CARD, cards)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function GetCards(projectId: string | undefined) {
    try {
        const response = await Api.get(`${CARD_ENDPOINTS.GET_CARDS}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function UpdateColumn(_id: string, column: string) {
    try {
        const response = await Api.patch(CARD_ENDPOINTS.UPDATE_CARD, { _id, column })
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function AddTaskAndAssignMembers(taskDetails: object) {
    try {
        const response = await Api.patch(CARD_ENDPOINTS.ADD_TASK, taskDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function getCardDetailById(cardId: string) {
    try {
        const response = await Api.get(`${CARD_ENDPOINTS.GET_CARD_DETAIL_BY_ID}/${cardId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function DeleteCard(id: object) {
    try {
        const response = await Api.put(CARD_ENDPOINTS.DELETE_CARD, id)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function DeleteTask(id: object) {
    try {
        const response = await Api.put(CARD_ENDPOINTS.DELETE_TASK, id)
        return response
    } catch (error) {
        errorHandler(error)
    }
}