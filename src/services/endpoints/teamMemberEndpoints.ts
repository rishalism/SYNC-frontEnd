const Team_Member_base_url = '/api/Team-Member'

export enum TEAM_MEMBER_ENDPOINTS {
  SIGNUP = `${Team_Member_base_url}/signup`,
  VERIFY = `${Team_Member_base_url}/signup-verify`,
  LOGIN = `${Team_Member_base_url}/login`,
  GOOGLE_LOGIN = `${Team_Member_base_url}/auth/google/login`,
  GOOGLE_SIGNUP = `${Team_Member_base_url}/auth/google/signup`
}