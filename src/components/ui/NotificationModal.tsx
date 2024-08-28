import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Modal } from "flowbite-react";
import { Avatar, usePagination } from "@nextui-org/react";
import { LuLineChart } from 'react-icons/lu';
import socket from "@/services/socket/socketConfig";
import { RootState } from "@/app/store";
import { Message } from "@/types/interfaces/Ichats";
import { Link, useParams } from "react-router-dom";
import { clearAllNotifications, getNotifications, saveNotification } from "@/api/notificationApi";
import notificationSound from '../../assets/notifications/notiifcationsound.mp3.mp3';
import videocallRingtone from '../../assets/notifications/messenger_video_call.mp3';

interface NotificationModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    setNotificationCount: React.Dispatch<React.SetStateAction<number>>
}

function NotificationModal({ openModal, setOpenModal, setNotificationCount }: NotificationModalProps) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth);
    const currentUserId = ProjectleadInfo?.id || TeamMemberInfo?.id;
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)
    const { projectId } = useParams()
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const videocallref = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const handleReceiveNotification = async (data: { message: string }) => {
            toast.info('New task alert! 🔔✨', { position: 'top-right' });
            addNotification(data.message);
            const currentTime = new Date().toLocaleString();
            const notifications = {
                message: data.message,
                time: currentTime
            }
            if (audioRef.current) {
                audioRef.current.play().catch(error => console.error('Error playing sound:', error));
            }
            await saveNotification({ notifications: notifications, projectId: currentProjectInfo._id, time: currentTime, userId: currentUserId })
        };

        const handleReceiveMessage = (message: Message) => {
            if (message.sender.id !== currentUserId) {
                addNotification(message.text, message.sender.avatar);
                showMessageToast(message);
                if (message.sender.url) {
                    if (videocallref.current) {
                        videocallref.current.play().catch(error => console.error('Error playing sound:', error));
                    }
                } else {
                    if (audioRef.current) {
                        audioRef.current.play().catch(error => console.error('Error playing sound:', error));
                    }
                }

            }
        };

        const addNotification = (message: string, avatar?: string) => {
            const currentTime = new Date().toLocaleString();
            setNotifications((prev) => [...prev, { message, time: currentTime, avatar }]);
            setNotificationCount((prev) => prev + 1)
        };

        const showMessageToast = (message: Message) => {
            toast.custom((t) => (
                <>
                    {
                        message.sender.url ?
                            <Link to={message.sender.url}>
                                <div className="flex items-center gap-4 min-w-72 p-2 bg-white rounded-lg shadow-md">
                                    <Avatar src={message.sender.avatar} alt="User Avatar" size="sm" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{message.text}</span>
                                        <span className="text-xs font-medium">click to join the Meeting !</span>
                                    </div>
                                </div>
                            </Link> : <div className="flex items-center gap-4 min-w-72 p-2 bg-white rounded-lg shadow-md">
                                <Avatar src={message.sender.avatar} alt="User Avatar" size="sm" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{message.text}</span>
                                </div>
                            </div>
                    }
                </>
            ), { position: 'top-right' });
        };

        socket.on('receive_notification', handleReceiveNotification);
        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_notification', handleReceiveNotification);
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [currentUserId]);

    useEffect(() => {
        fetchNotifications()
    }, [])

    useEffect(() => {
        audioRef.current = new Audio(notificationSound);
        videocallref.current = new Audio(videocallRingtone)
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (videocallref.current) {
                videocallref.current.pause();
                videocallref.current = null;
            }
        };
    }, []);

    async function fetchNotifications() {
        const response = await getNotifications(currentProjectInfo._id)
        if (response?.data) {
            const notifications = response.data.notifications
            setNotifications(notifications)
            setNotificationCount(notifications.length)
        }
    }



    async function clearallNotifications() {
        const response = await clearAllNotifications({ projectId: currentProjectInfo._id })
        if (response) {
            setNotifications([])
            setNotificationCount(0)
        }
    }

    return (
        <Modal dismissible show={openModal} position="top-right" size="sm" className="border-none" onClose={() => setOpenModal(false)}>
            <Modal.Body className="overflow-hidden">
                <div className="w-full flex gap-5 flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between w-full">
                            <div>
                                <h1 className="font-semibold text-2xl capitalize">notifications</h1>
                                <h2 className="text-xs capitalize text-neutral-500">you have {notifications.length} notifications.</h2>
                            </div>
                            <div className="items-end flex ">
                                <h2 onClick={clearallNotifications} className="text-xs capitalize cursor-pointer text-neutral-500">clear all</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 overflow-auto max-h-80 hideScrollbar items-center">
                        {notifications.map((notification, index) => (
                            <div key={index} className="w-full flex flex-row">
                                <div className="w-1/6 flex items-center">
                                    {notification.avatar ? <Avatar src={notification.avatar} size="sm" /> : <LuLineChart />}
                                </div>
                                <div className="w-full text-xs flex-col flex">
                                    <span>{notification.message}</span>
                                    <span>{notification.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default NotificationModal;