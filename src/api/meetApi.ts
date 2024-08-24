import errorHandler from "@/middlewares/errorHandler";
import { Meeting } from "@/redux/slices/Meetings";
import Api from "@/services/axiosconfig";
import { MEETING_ENDPOINTS } from "@/services/endpoints/MeetEndpoints";



export async function Meetingstarted(meetingDetails: Meeting) {
    try {
        const response = await Api.post(MEETING_ENDPOINTS.CREATE_MEETING, meetingDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function MeetingEnded(meetingDetails: Meeting) {
    try {
        const response = await Api.post(MEETING_ENDPOINTS.DELETE_MEETING, meetingDetails)
        return response
    } catch (error) {
        errorHandler(error)
    }
}


export async function GetAllMeeting(projectId: string | undefined) {
    try {
        const response = await Api.get(`${MEETING_ENDPOINTS.GET_MEETINGS}/${projectId}`)
        return response
    } catch (error) {
        errorHandler(error)
    }
}