import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/auth';
import projectReducer from '../redux/slices/projects'
const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
