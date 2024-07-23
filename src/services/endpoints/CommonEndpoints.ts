const base_url = '/api/Common-Routes'

export enum COMMON_ENDPOINTS {
    RESEND_OTP = `${base_url}/resend`,
    REFRESH_TOKEN = `${base_url}/refreshtoken`,
    LOGOUT = `${base_url}/logout`
}