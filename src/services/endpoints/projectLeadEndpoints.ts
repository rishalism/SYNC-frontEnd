const Project_lead_base_Url = '/api/Project-Lead'

export enum PROJECT_LEAD_ENDPOINTS {
    SIGNUP = `${Project_lead_base_Url}/signup`,
    LOGIN = `${Project_lead_base_Url}/login`,
    VERIFY_EMAIL = `${Project_lead_base_Url}/signup-verify`,
    GOOGLE_LOGIN = `${Project_lead_base_Url}/auth/google-signin`,
    GOOGLE_SIGNUP = `${Project_lead_base_Url}/auth/google-signup`,
    INVITE_TEAMMEMBER = `${Project_lead_base_Url}/invite-member`,
    FORGOT_PASSWORD = `${Project_lead_base_Url}/forgot-password`,
    RESET_PASSWORD_OTP = `${Project_lead_base_Url}/forgot-password/otp`,
    RESET_PASSWORD = `${Project_lead_base_Url}/forgot/password/reset`,
} 