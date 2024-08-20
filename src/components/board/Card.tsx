import React, { useState } from 'react'
import DropIndicator from './DropIndicator';
import { motion } from "framer-motion";
import { CardProps } from '@/types/interfaces/IBoard';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu"
import CardDetailsModal from '../ui/CardDetailsModal';
import { useDispatch } from 'react-redux';
import { deleteCard } from '@/redux/slices/cardSlice';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DeleteCard } from '@/api/CardApi';



const Card: React.FC<CardProps> = ({ title, id, column, handleDragStart, _id, setCardDeleted }) => {

    const dispatch = useDispatch()

    async function handleDelete() {
        if (id) {
            const response = await DeleteCard({ _id })
            if (response) {
                setCardDeleted(prev => !prev)
                dispatch(deleteCard(id))
            }
        }
    }
    const [openModal, setOpenModal] = useState(false)


    return (
        <>
            <AlertDialog>
                <ContextMenu>
                    <DropIndicator beforeId={id} column={column} />
                    <ContextMenuTrigger>
                        <motion.div
                            layout
                            layoutId={id}
                            draggable="true"
                            onDragStart={(e: any) => handleDragStart(e, { title, id, column })}
                            className="cursor-grab rounded border shadow-md border-neutral-100  p-3 active:cursor-grabbing"
                            onClick={() => setOpenModal(true)}
                        >
                            <p className="text-sm">{title}</p>
                        </motion.div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <AlertDialogTrigger >
                            <ContextMenuItem>Delete</ContextMenuItem>
                        </AlertDialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete All your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction  onClick={() => handleDelete()} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {openModal && <CardDetailsModal title={title} id={_id} openModal={openModal} setOpenModal={setOpenModal} />}
        </>
    );
}

export default React.memo(Card)
