import { Avatar, AvatarGroup } from '@nextui-org/react';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { IProjectMembers } from './TaskInput';
import { Task } from '@/types/interfaces/IBoard';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { DeleteTask } from '@/api/CardApi';
import { toast } from 'sonner';

interface prop {
    id: string | undefined;
    index: number,
    teamMembers: IProjectMembers[],
    item: Task
    setTaskDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskItem({ index, teamMembers, item, setTaskDeleted, id }: prop) {

    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)

    async function HandleDeleteTask(_id: string | undefined) {
        if (ProjectleadInfo?.role) {
            const response = await DeleteTask({ taskId: _id, id })
            if (response) setTaskDeleted(prev => !prev)
        } else {
            toast.warning(`tasks can only be deleted by projectLead`)
        }
    }

    return (
        <li key={index} className='flex items-center gap-3 justify-between flex-row w-full'>
            <div className='flex gap-3 items-center flex-grow min-w-0'>
                <VscDebugBreakpointLog className="flex-shrink-0" />
                <ContextMenu>
                    <ContextMenuTrigger> <span className='text-start cursor-pointer break-words overflow-hidden text-ellipsis'>{item.task}</span></ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={() => HandleDeleteTask(item._id)}>
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
            <AvatarGroup max={3} className="flex-shrink-0">
                {item.assignedMembers?.map((memberId: string, memberIndex: number) => {
                    const member = teamMembers.find(m => m._id === memberId);
                    return (
                        <Avatar key={memberIndex} src={member?.avatar || "https://github.com/shadcn.png"} />
                    );
                })}
            </AvatarGroup>
        </li>
    )
}

export default TaskItem
