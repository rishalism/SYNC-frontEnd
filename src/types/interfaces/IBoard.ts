import { IconBaseProps, IconType } from "react-icons";


export interface Task {
    task: string;
    assignedMembers: string[];
    _id?: string
}

export enum Icolumn {
    TODO = "ToDo",
    INPROGRESS = "Inprogress",
    TESTING = "Testing",
    COMPLETED = "Completed"
}

export interface ICard {
    _id?: string
    projectId?: string;
    id: string;
    title: string;
    column: string;
    data?: Task[];
    TotalassignedMembers?: string[];
}




export interface ColumnProps {
    title: string;
    column: string;
    headingColor: string;
    Icon: IconType;
    setNewCardAdded: React.Dispatch<React.SetStateAction<boolean>>;
    setCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    updated: boolean

}

export interface CardProps extends ICard {
    handleDragStart: (e: React.DragEvent, card: ICard) => void;
    setCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DropIndicatorProps {
    beforeId: string | null;
    column: string;
}

export interface BurnBarrelProps {
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export interface AddCardProps {
    column: string;
    setNewCardAdded: React.Dispatch<React.SetStateAction<boolean>>;
}