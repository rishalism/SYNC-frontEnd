import { RootState } from "@/app/store";
import socket from "@/services/socket/socketConfig";
import { CurrentUser, Message } from "@/types/interfaces/Ichats";
import { UserRole } from "@/types/user";
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams, } from "react-router-dom";
import { toast } from "sonner";





function VideoCallPage() {
    const { projectId } = useParams()
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [meetings, setMeetings] = useState<any[]>([])
    const navigate = useNavigate()


    function randomID(len: number) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
            maxPos = chars.length,
            i;
        len = len || 5;
        for (i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }

    useEffect(() => {
        if (ProjectleadInfo) {
            setCurrentUser({
                id: ProjectleadInfo.id,
                name: ProjectleadInfo.name,
                avatar: ProjectleadInfo.avatar,
                role: UserRole.projectlead
            });
        } else if (TeamMemberInfo) {
            setCurrentUser({
                id: TeamMemberInfo.id,
                name: TeamMemberInfo.name,
                avatar: TeamMemberInfo.avatar,
                role: UserRole.teammember
            });
        }

    }, [, ProjectleadInfo, TeamMemberInfo]);

    useEffect(() => {
        const handleReceiveMessage = (message: Message) => {
            const sender = message.sender;
            let id = null;
            if (sender.id !== currentUser?.id && id !== message.id) {
                const currentTime = new Date().toLocaleString();
                setMeetings((prev) => [...prev, { message: message.text, time: currentTime, url: sender.url }]);
            }
        };

        // Register event listeners
        socket.on('receive_message', handleReceiveMessage);

        // Cleanup event listeners on component unmount
        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [currentUser?.id]);

    function sendNotification() {
        if (projectId == 'undefined') {
            toast.warning('please select a project create a meeting')
            return;
        } else if (projectId && currentUser) {
            const roomid = randomID(5)
            console.log(import.meta.env.VITE_CLIENT_URL), 'client url';
            const url = `${import.meta.env.VITE_CLIENT_URL || 'https://sync-front-end.vercel.app'}/Meet/true?roomID=${roomid}`
            const newMessage: Message = {
                projectId: projectId,
                id: Date.now().toString(),
                text: `${currentUser.name} started a meeting !`,
                sender: {
                    id: currentUser.id,
                    name: currentUser.name,
                    avatar: currentUser.avatar,
                    url: url
                },
                timestamp: Date.now()
            };
            socket.emit('send_message', {
                message: newMessage,
                room: projectId
            });
            console.log(roomid, 'roomid');

            navigate(`/Meet/true?roomID=${roomid}`)
        }

    }

    console.log(meetings);


    function joinMeeting(url: string) {
        console.log(url, 'user clicked');
        window.open(url, '_blank', 'noopener,noreferrer');
    }



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
                    <Button onClick={sendNotification} endContent={<GoPlus />} color="primary">New meeting</Button>
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
                    meetings.map((meeting) => {
                        return (
                            meeting.url &&
                            <div
                                key={meeting.id} // Add a key for list rendering
                                onClick={() => joinMeeting(meeting.url)}
                                className="w-full flex space-x-4 flex-row capitalize rounded-lg shadow-xl p-3 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold animate-bounce">{meeting.message}</h2>
                                    <div className="flex gap-7 items-center">
                                        <p className="text-sm">Click to join the meeting !!</p>
                                        <p className="text-xs">{meeting.time}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default VideoCallPage
