import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/auth';
import projectReducer from '../redux/slices/projects'
import collectionReducer from '../redux/slices/collectionSlice'
import cardReducer from '../redux/slices/cardSlice'
import meetingReducer from '../redux/slices/Meetings'
const persistedState = localStorage.getItem('collections') ? JSON.parse(localStorage.getItem('collections') || '{}') : [];


const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        collection: collectionReducer,
        cards: cardReducer,
        meetings: meetingReducer
    },
    // preloadedState: persistedState,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
