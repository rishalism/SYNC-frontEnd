import { GetChats, SaveChats } from "@/api/chatApi";
import { RootState } from "@/app/store";
import socket from "@/services/socket/socketConfig";
import { CurrentUser, Message } from "@/types/interfaces/Ichats";
import ProjectMembers from "@/types/interfaces/IprojejectMembers";
import { UserRole } from "@/types/user";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


function ChatsPage() {
    const [members, setMembers] = useState<ProjectMembers[]>([])
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const { projectId } = useParams();
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (currentProjectInfo) {
            setMembers(currentProjectInfo.ProjectMembers);
        }

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
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [currentProjectInfo, ProjectleadInfo, TeamMemberInfo, messages]);


    async function fetchChats() {
        try {
            const response = await GetChats(projectId);
            setMessages(response?.data.messages || []);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }


    useEffect(() => {
        if (projectId) {
            socket.emit('join_room', projectId);
            fetchChats();
        }
        socket.on('receive_message', (message: Message) => {
            setMessages(prevMessages => {
                if (!prevMessages.some(msg => msg.id === message.id)) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
        });
        return () => {
            socket.off('receive_message');
            if (projectId) {
                socket.emit('leave_room', projectId);
            }
        };
    }, [projectId]);


    async function sendMessage() {
        if (projectId == 'undefined'){
            toast.warning('please select a project to start chating')
            return;
        }
            if (inputMessage.trim() && projectId && currentUser) {
                const newMessage: Message = {
                    projectId: projectId,
                    id: Date.now().toString(),
                    text: inputMessage,
                    sender: {
                        id: currentUser.id,
                        name: currentUser.name,
                        avatar: currentUser.avatar
                    },
                    timestamp: Date.now()
                };
                socket.emit('send_message', {
                    message: newMessage,
                    room: projectId
                });
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setInputMessage('');
                await SaveChats(newMessage)
            }
    }

    function handleKeydown(event: any) {
        if (event.key == 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className="w-full mt-12 flex flex-col md:flex-row items-center px-4 md:px-20 py-5 rounded-xl gap-5 justify-center">
            <div className="w-full md:w-full flex flex-col relative pb-2 h-full rounded-md shadow-xl">
                <div className="w-full p-3 items-center flex flex-row justify-between max-h-16 rounded-t-xl border-b-1 border-neutral-400">
                    <div>
                        <h1 className="text-2xl capitalize">{currentProjectInfo?.projectName}</h1>
                    </div>
                    <div>
                        <AvatarGroup max={4}>
                            {members?.map((member) => <Avatar key={member._id} src={member.avatar || 'https://github.com/shadcn.png'}></Avatar>)}
                        </AvatarGroup>
                    </div>
                </div>
                <div ref={chatContainerRef} className="w-full h-[calc(100vh-300px)] md:h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden p-4 hideScrollbar space-y-4">
                    {messages?.map((msg) => (
                        <div key={msg.id} className={`chat ${msg.sender.id === currentUser?.id ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="rounded-full">
                                    <Avatar src={msg.sender.avatar || "https://github.com/shadcn.png"} className="m-2" />
                                </div>
                            </div>
                            <div className="chat-header">
                                <p className="text-sm font-semibold">{msg.sender.name}</p>
                            </div>
                            <div className="chat-bubble">
                                <p>{msg.text}</p>
                                <time className="text-xs opacity-50">{new Date(msg.timestamp).toLocaleTimeString()}</time>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-row absolute bottom-0 max-h-10">
                    <input value={inputMessage} onKeyDown={handleKeydown} onChange={(e) => setInputMessage(e.target.value)} className="w-full text-black border-neutral-300 rounded-bl-lg h-10" type="text" placeholder="start typing..." />
                    <Button onClick={sendMessage} color="primary" className="rounded-none rounded-br-lg rounded-tr-lg h-10"><IoSendOutline /></Button>
                </div>
            </div>
        </div>
    )
}

export default ChatsPage
