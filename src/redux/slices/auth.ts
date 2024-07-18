import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
}

const isProjectleadStored = localStorage.getItem('Project-Lead');
const isTeamMemberStored = localStorage.getItem('Team-Member');

interface AuthState {
    ProjectleadInfo: UserInfo | null;
    TeamMemberInfo: UserInfo | null;
}

const initialState: AuthState = {
    ProjectleadInfo: isProjectleadStored ? JSON.parse(isProjectleadStored) : null,
    TeamMemberInfo: isTeamMemberStored ? JSON.parse(isTeamMemberStored) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginProjectlead: (state, action: PayloadAction<{ data: UserInfo; accesstoken: string }>) => {
            state.ProjectleadInfo = action.payload.data;
            localStorage.setItem('Project-Lead', JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", action.payload.accesstoken);
        },
        logoutProjectLead: (state) => {
            state.ProjectleadInfo = null;
            localStorage.removeItem('Project-Lead');
            localStorage.removeItem('accessToken');
        }
    }
});

export const { loginProjectlead, logoutProjectLead } = authSlice.actions;
export default authSlice.reducer;
