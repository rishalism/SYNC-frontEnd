import { GetAllMeeting } from "@/api/meetApi";
import { Meeting } from "@/redux/slices/Meetings";
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { Link, useParams, } from "react-router-dom";

function VideoCallPage() {
    const { projectId } = useParams()
    const [currentMeetings, setCurrentMeetings] = useState<Meeting[]>([])

    async function fetchAllMeetings() {
        if (projectId !== "undefined") {
            const meetings = await GetAllMeeting(projectId)
            setCurrentMeetings(meetings?.data)
        }
    }

    function sendNotification(){
        
    }


    function joinMeeting(url: string) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }


    useEffect(() => {
        fetchAllMeetings()
    }, [])

    return (
        <div className='flex flex-col md:flex-row p-4 md:p-10 space-y-8 md:space-y-0 md:space-x-6 w-full mt-12 h-auto'>
            <div className=" flex items-start space-y-14 justify-center flex-col w-full md:w-1/2">
                <h2 className="text-4xl font-semibold">
                    video calls and meetings
                    for everyone.
                </h2>
                <p className="text-neutral-500">Connect, collaborate, and celebrate anywhere with Sync.
                    Seamless video calls keep your team together, no matter the distance.</p>
                <div className="flex flex-row space-x-7">
                    <Button onClick={sendNotification} as={Link} to={'/Meet/true'} endContent={<GoPlus />} color="primary">New meeting</Button>
                </div>
            </div>
            <div className=" p-4 md:p-10 flex flex-col justify-center items-start md:items-end space-y-8 w-full md:w-1/2">
                <div className="w-full flex space-x-4 flex-row capitalize rounded-lg shadow-xl p-3">
                    <div className="w-[60px]">
                        <IoShieldCheckmark className="w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">your meetig is safe</h2>
                        <p className="text-sm">no one can join a meetings unless invited or admitted by the host.</p>
                    </div>
                </div>
                {
                    currentMeetings?.map((meeting, index) => {
                        if (meeting.projectId === projectId) {
                            return (
                                <div
                                    key={index} // Add a key for list rendering
                                    onClick={() => joinMeeting(meeting.MeetLink)}
                                    className="w-full flex space-x-4 flex-row capitalize rounded-lg shadow-xl p-3 cursor-pointer"
                                >
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-semibold">Meeting is Live</h2>
                                        <p className="text-sm">Click to join the meeting !!</p>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </div>
        </div >
    )
}

export default VideoCallPage
