const base_url = '/api/meets'


export enum MEETING_ENDPOINTS{
    GET_MEETINGS = `${base_url}/get`,
    CREATE_MEETING = `${base_url}/create`,
    DELETE_MEETING = `${base_url}/delete`
}