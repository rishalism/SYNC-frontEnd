import { accessLevel } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearUserInfo, saveUserInfo } from "./userData";


export interface ProjectleadInfo {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
}

export interface TeamMemberInfo {
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
            const { name, role } = action.payload.data
            saveUserInfo({ name, role })
            state.ProjectleadInfo = action.payload.data;
            localStorage.setItem('Project-Lead', JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", action.payload.accesstoken);
        },
        logoutProjectLead: (state) => {
            clearUserInfo()
            state.ProjectleadInfo = null;
            localStorage.removeItem('Project-Lead');
            localStorage.removeItem('accessToken');
        },
        loginTeamMember: (state, action: PayloadAction<{ data: TeamMemberInfo; accesstoken: string }>) => {
            const { name, role } = action.payload.data
            saveUserInfo({ name, role })
            state.TeamMemberInfo = action.payload.data;
            localStorage.setItem('Team-Member', JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", action.payload.accesstoken);
        },
        logoutTeamMember: (state) => {
            clearUserInfo()
            state.TeamMemberInfo = null;
            localStorage.removeItem('Team-Member');
            localStorage.removeItem('accessToken');
            localStorage.removeItem("userData");

        }
    }
});

export const { loginProjectlead, logoutProjectLead, loginTeamMember, logoutTeamMember } = authSlice.actions;
export default authSlice.reducer;
