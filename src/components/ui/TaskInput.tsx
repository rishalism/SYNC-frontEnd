import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoSendOutline } from "react-icons/io5";
import { Button } from './button';
import ProjectMembers from '@/types/interfaces/IprojejectMembers';
import { accessLevel } from '@/types/user';
import { AddTaskAndAssignMembers } from '@/api/CardApi';
import { toast } from 'sonner';

interface Props {
    teamMembers: IProjectMembers[];
    id: string | undefined;
    setTaskAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProjectMembers {
    _id: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
    isGoogle: boolean;
    permissions: {
        dbDesign: accessLevel;
        modules: accessLevel;
        board: accessLevel;
    };
    created_at?: Date;
    updated_at?: Date;
}


const TaskInput: React.FC<Props> = ({ teamMembers, id, setTaskAdded }) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [assignedMemberIds, setAssignedMemberIds] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleMemberSelect = (memberId: string) => {
        const selectedMember = teamMembers.find(member => member._id === memberId);
        if (selectedMember && !assignedMemberIds.includes(memberId)) {
            setAssignedMemberIds([...assignedMemberIds, memberId]);
        }
    };

    const removeMember = (memberId: string) => {
        setAssignedMemberIds(assignedMemberIds.filter(id => id !== memberId));
    };

    async function handleSubmit() {
        if (inputValue.trim() !== '') {
            console.log(inputValue, assignedMemberIds);
            setInputValue('')
            setAssignedMemberIds([]);
            const response = await AddTaskAndAssignMembers({ id, inputValue, assignedMemberIds })
            if (response) {
                setTaskAdded((isadded) => !isadded)
            }
        } else {
            toast.warning("please enter a task to assign Member", { position: 'top-center' })
        }
    }

    return (
        <div className='w-full  px-1 py-1 '>
            <div className="flex flex-wrap  gap-2 mb-2">
                {assignedMemberIds.map(id => {
                    const member = teamMembers.find(m => m._id === id);
                    return (
                        <span key={id} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {member?.name}
                            <button onClick={() => removeMember(id)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                        </span>
                    );
                })}
            </div>
            <div className="flex  ">
                <input
                    className='flex-grow border-1 rounded-l-lg text-black text-sm border-neutral-300 p-2'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter task"
                />

                <Select onValueChange={handleMemberSelect}>
                    <SelectTrigger className="w-auto rounded-l-none">
                        @
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {teamMembers.map((member: IProjectMembers) => (
                                <SelectItem key={member._id} value={member._id}>
                                    {member.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button type='button' onClick={() => handleSubmit()} className='ml-2' ><IoSendOutline /></Button>
            </div>
        </div>
    );
};

export default TaskInput;