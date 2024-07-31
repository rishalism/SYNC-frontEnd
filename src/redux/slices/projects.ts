import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isCurrentProject = localStorage.getItem('Current-Project');

interface ProjectState {
    currentProjectInfo: any;
}

const initialState: ProjectState = {
    currentProjectInfo: isCurrentProject ? JSON.parse(isCurrentProject) : null,
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setCurrentProjects: (state, action: PayloadAction<{ data: any }>) => {
            state.currentProjectInfo = action.payload.data;
            localStorage.setItem('Current-Project', JSON.stringify(action.payload.data));
        },
        clearCurrentProjects: (state) => {
            state.currentProjectInfo = null
            localStorage.removeItem('Current-Project')
        }
    },
});

export const { setCurrentProjects, clearCurrentProjects } = projectSlice.actions;
export default projectSlice.reducer;
