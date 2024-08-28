import { accessLevel } from "../user";



export interface ProjectMembers {
    _id?: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
    isGoogle?: boolean;
    permissions?: {
        dbDesign: accessLevel;
        notepad: accessLevel;
        board: accessLevel;
    };
    created_at?: Date;
    updated_at?: Date;
}

export default ProjectMembers