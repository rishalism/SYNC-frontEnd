import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Meeting {
    projectId: string,
    MeetLink: string
}
interface MeetingsState {
    meetings: Meeting[];
}
const initialState: MeetingsState = {
    meetings: [],
}

const meetingSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        createMeeting: (state, action: PayloadAction<Meeting>) => {
            const meetingExists = state.meetings.some(
                (meeting) => meeting.MeetLink === action.payload.MeetLink
            );

            if (!meetingExists) {
                state.meetings.push(action.payload);
            }
        },
        DeleteMeeting: (state, action: PayloadAction<string>) => {
            state.meetings = state.meetings.filter(
                (meeting) => meeting.MeetLink !== action.payload
            );
        },
    },
});

export const { DeleteMeeting, createMeeting } = meetingSlice.actions
export default meetingSlice.reducer