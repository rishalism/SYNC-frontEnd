import { accessLevel } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProjectleadInfo {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
}

interface TeamMemberInfo {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    permissions: {
        dbDesign: accessLevel;
        modules: accessLevel;
        board: accessLevel;
    }
}

const isProjectleadStored = localStorage.getItem('Project-Lead');
const isTeamMemberStored = localStorage.getItem('Team-Member');

interface AuthState {
    ProjectleadInfo: ProjectleadInfo | null;
    TeamMemberInfo: TeamMemberInfo | null;
}

const initialState: AuthState = {
    ProjectleadInfo: isProjectleadStored ? JSON.parse(isProjectleadStored) : null,
    TeamMemberInfo: isTeamMemberStored ? JSON.parse(isTeamMemberStored) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginProjectlead: (state, action: PayloadAction<{ data: ProjectleadInfo; accesstoken: string }>) => {
            state.ProjectleadInfo = action.payload.data;
            localStorage.setItem('Project-Lead', JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", action.payload.accesstoken);
        },
        logoutProjectLead: (state) => {
            state.ProjectleadInfo = null;
            localStorage.removeItem('Project-Lead');
            localStorage.removeItem('accessToken');
        },
        loginTeamMember: (state, action: PayloadAction<{ data: TeamMemberInfo; accesstoken: string }>) => {
            state.ProjectleadInfo = action.payload.data;
            localStorage.setItem('Team-Member', JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", action.payload.accesstoken);
        },
        logoutTeamMember: (state) => {
            state.ProjectleadInfo = null;
            localStorage.removeItem('Team-Member');
            localStorage.removeItem('accessToken');
        }
    }
});

export const { loginProjectlead, logoutProjectLead, loginTeamMember, logoutTeamMember } = authSlice.actions;
export default authSlice.reducer;
