import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import RichTextEditor from '@/components/Notepad/RichTextEditor';
import EmptyNotepadPage from '@/components/EmptyNotepadPage';
import { DeleteNote, GetNotes } from '@/api/notePadApi';
import { useParams } from 'react-router-dom';
import { NotePadInterface } from '@/types/interfaces/Inotepad';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu"
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
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'sonner';


function NotepadPages() {
    const [noteEmpty, setNotEmpty] = useState(false)
    const [notes, setNotes] = useState<NotePadInterface[]>([])
    const [currentNote, setCurrentNote] = useState<NotePadInterface>()
    const [saved, setSaved] = useState(false)
    const { projectId } = useParams()
    const [deleted, setDeleted] = useState(false)
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const currentUser: string | undefined = ProjectleadInfo?.id || TeamMemberInfo?.id

    const fetchnotes = async () => {
        if (projectId !== 'undefined') {
            const data = await GetNotes(projectId)
            if (data?.data) {
                setNotes(data.data)
            } else {
                setNotEmpty(false)
            }

        }
    }


    const selectCurrentNotes = (id: string | undefined) => {
        const note = notes.find((note) => note._id == id)
        if (note) {
            setCurrentNote(note)
        }
    }
    useEffect(() => {
        if (notes.length > 0) {
            setCurrentNote(notes[0])
            setNotEmpty(true)
        }
    }, [])

    const createNewNote = () => {
        setCurrentNote(undefined);
        setNotEmpty(true)
    };

    useEffect(() => {
        fetchnotes()
        if (notes.length > 0) {
            setNotEmpty(true)
        }
    }, [currentNote, saved, deleted])

    async function handleDelete(id: string | undefined) {
        if (currentUser == currentNote?.user_id) {
            const response = await DeleteNote({ id })
            if (response) {
                setDeleted(!deleted)
                setCurrentNote(undefined)
            }
        } else {
            toast.warning('Only the creator can delete this note.')
        }
    } 2

    return (
        <div className="w-full mt-12 flex flex-row overflow-y-hidden  overflow-x-hidden">
            <div className="flex w-1/4  flex-col   overflow-y-hidden border-neutral-200">
                <div className="p-2 w-full  h-16">
                    <Button color="primary" onClick={createNewNote} startContent={<FaPlus />} className="w-full text-start flex justify-start gap-4 rounded-md">  New note </Button>
                </div>
                <div className='p-2 '>
                    {notes.map((note) => {
                        return (
                            <AlertDialog>
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <div onClick={() => selectCurrentNotes(note._id)} className={`${note._id === currentNote?._id ? "bg-neutral-300 text-black" : ""} w-full rounded-md text-neutral-500 text-sm p-3 cursor-pointer  flex-row space-x-3 z-0 border hover:scale-95 hover:shadow-lg hover:border-1 h-10 flex items-center`}>
                                            {note.title.slice(0, 50)}
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <AlertDialogTrigger asChild>
                                            <ContextMenuItem>Delete</ContextMenuItem>
                                        </AlertDialogTrigger>
                                    </ContextMenuContent>
                                </ContextMenu>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Deleting this note will permanently remove it from your account and erase all associated data. Are you sure you want to proceed?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(note._id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )
                    })}

                </div>
            </div>
            <div className="flex w-full  overflow-y-hidden  flex-col">
                {noteEmpty ? <RichTextEditor currentUser={currentUser} setSaved={setSaved} currentNote={currentNote} setCurrentNote={setCurrentNote} /> : <EmptyNotepadPage />}
            </div>
        </div >
    );
}

export default NotepadPages;