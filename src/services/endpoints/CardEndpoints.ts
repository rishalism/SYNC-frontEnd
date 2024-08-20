const base_Url = `/api/v3/cards`

export enum CARD_ENDPOINTS {
    ADD_CARD = `${base_Url}/card/create`,
    GET_CARDS = `${base_Url}/card/get`,
    UPDATE_CARD = `${base_Url}/card/update`,
    ADD_TASK = `${base_Url}/card/add-task`,
    GET_CARD_DETAIL_BY_ID = `${base_Url}/card/getone`,
    DELETE_CARD = `${base_Url}/card/delete`,
    DELETE_TASK = `${base_Url}/task/delete`
}