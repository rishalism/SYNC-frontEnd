const Project_lead_base_Url = '/api/Project-Lead'

export enum PROJECT_LEAD_ENDPOINTS {
    SIGNUP = `${Project_lead_base_Url}/signup`,
    LOGIN = `${Project_lead_base_Url}/login`,
    VERIFY_EMAIL = `${Project_lead_base_Url}/signup-verify`,
    GOOGLE_LOGIN = `${Project_lead_base_Url}/auth/google-signin`,
    GOOGLE_SIGNUP = `${Project_lead_base_Url}/auth/google-signup`,
    INVITE_TEAMMEMBER = `${Project_lead_base_Url}/invite-member`
} 