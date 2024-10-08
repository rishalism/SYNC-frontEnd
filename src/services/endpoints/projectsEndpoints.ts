const BASE_URL = '/api/v1/projects'

export enum PROJECTS_ENDPOINTS {

    GET_PROJECT = `${BASE_URL}`,
    GET_CURRENT_PROJECT = `${BASE_URL}/get`,
    CREATE_PROJECT = `${BASE_URL}`,
    EDIT_PROJECT = `${BASE_URL}`,
    DELETE_PROJECT = `${BASE_URL}`,
    ADD_MEMBER = `${BASE_URL}/add-member`,
    REMOVE_MEMBER = `${BASE_URL}/remove`,
    UPDATE_PERMISSIONS = `${BASE_URL}/access`
}