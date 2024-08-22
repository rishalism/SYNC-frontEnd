const Team_Member_base_url = '/api/Team-Member'

export enum TEAM_MEMBER_ENDPOINTS {
  SIGNUP = `${Team_Member_base_url}/signup`,
  VERIFY = `${Team_Member_base_url}/signup-verify`,
  LOGIN = `${Team_Member_base_url}/login`,
  GOOGLE_LOGIN = `${Team_Member_base_url}/auth/google/login`,
  GOOGLE_SIGNUP = `${Team_Member_base_url}/auth/google/signup`,
  ACCEPT_INVITATION = `${Team_Member_base_url}/accept-invitation`,
  FORGOT_PASSWORD = `${Team_Member_base_url}/forgot-password`,
  RESET_PASSWORD_OTP = `${Team_Member_base_url}/forgot-password/otp`,
  RESET_PASSWORD = `${Team_Member_base_url}/forgot-password/reset-password`
}