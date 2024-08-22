import { UserRole } from "../user";

export interface Message {
    projectId: string;
    id: string;
    text: string;
    sender: {
        id: string;
        name: string;
        avatar: string | undefined;
    };
    timestamp: number;
}

export type CurrentUser = {
    id: string;
    name: string;
    avatar: string | undefined;
    role: UserRole
}