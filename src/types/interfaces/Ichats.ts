import { UserRole } from "../user";

export interface Message {
    projectId: string;
    id: string;
    text: string;
    sender: {
        id: string;
        name: string;
        avatar: string | undefined;
        url?: string
    };
    timestamp: number;
}

export type CurrentUser = {
    id: string;
    name: string;
    avatar: string | undefined;
    role: UserRole
}

export interface NotificationMessage {
    message: string;
    time: string
}