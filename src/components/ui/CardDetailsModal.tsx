import React, { useEffect, useState } from 'react'
import { Modal } from "flowbite-react";
import { Button } from './button';
import { Avatar, AvatarGroup } from '@nextui-org/react';
import TaskInput from './TaskInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { accessLevel } from '@/types/user';
import { getCardDetailById } from '@/api/CardApi';
import { ICard } from '@/types/interfaces/IBoard';
import { Spinner } from "@nextui-org/spinner";
import TaskItem from './TaskItem';
import useCardDetails from '@/customHook/CardCustomHooks';

interface IProjectMembers {
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

interface CardDetailsModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    id: string | undefined;
    title: string;
}

function CardDetailsModal({ openModal, setOpenModal, id, title }: CardDetailsModalProps) {
    const [taskAdded, setTaskAdded] = useState(false)
    const [taskDeleted, setTaskDeleted] = useState(false)
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)
    const [teamMembers, setTeamMembers] = useState<IProjectMembers[]>([])

    // cutom hook for fechting cardetails
    const { cardDetail, isLoading } = useCardDetails(id, openModal, taskAdded, taskDeleted);

    useEffect(() => {
        console.log('trigger useEffect');

        setTeamMembers(currentProjectInfo.ProjectMembers);
    }, [openModal, taskAdded, id, cardDetail, taskDeleted]);

    return (
        <Modal dismissible show={openModal} className='border-none' onClose={() => setOpenModal(false)}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body className="p-0 relative">
                {isLoading ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <Spinner />
                    </div>
                ) : (
                    <div className="w-full h-[400px] ">
                        <div className="w-full h-full overflow-y-auto py-3 px-2">
                            <ul className="space-y-2 w-full">
                                {cardDetail?.data && cardDetail.data.length > 0 ? (
                                    cardDetail.data.map((item, index) => (
                                        <TaskItem id={id} setTaskDeleted={setTaskDeleted} key={index} index={index} item={item} teamMembers={teamMembers} />
                                    ))
                                ) : (
                                    <li className="text-start font-semibold">
                                        Nothing here yet! Add tasks and assign them to your team to kick things off! 🚀
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 flex flex-row gap-2 ">
                            <TaskInput setTaskAdded={setTaskAdded} id={id} teamMembers={teamMembers} />
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className='flex items-center justify-between w-full'>
                <Button onClick={() => setOpenModal(false)}>Save Changes</Button>
                <AvatarGroup max={3}>
                    {cardDetail?.TotalassignedMembers?.map((memberId, index) => {
                        const member = teamMembers.find(m => m._id === memberId);
                        return (
                            <Avatar key={index} src={member?.avatar || "https://github.com/shadcn.png"} />
                        );
                    })}
                </AvatarGroup>
            </Modal.Footer>
        </Modal>
    )
}

export default CardDetailsModal