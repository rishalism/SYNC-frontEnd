const BASE_URL = '/api/v1/projects'

export enum PROJECTS_ENDPOINTS {

    GET_PROJECT = `${BASE_URL}`,
    CREATE_PROJECT = `${BASE_URL}`,
    EDIT_PROJECT = `${BASE_URL}`,
    DELETE_PROJECT = `${BASE_URL}`,
    ADD_MEMBER=`${BASE_URL}/add-member`
}