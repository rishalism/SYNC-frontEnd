const Project_lead_base_Url = '/api/Project-Lead'

export enum PROJECT_LEAD_ENDPOINTS {
    SIGNUP = `${Project_lead_base_Url}/signup`,
    LOGIN = `${Project_lead_base_Url}/login`,
    VERIFY_EMAIL = `${Project_lead_base_Url}/signup-verify`,
    CREATE_PROJECT = `${Project_lead_base_Url}/projects`,
    GET_PROJECTS = `${Project_lead_base_Url}/projects`,
} 