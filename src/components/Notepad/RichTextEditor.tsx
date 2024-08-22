import React, { useEffect, useState } from 'react'
import { Editor } from 'primereact/editor';
import { Button, useSelect } from '@nextui-org/react';
import { FiEye } from "react-icons/fi";
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import { CreateNewNote, UpdateNotes } from '@/api/notePadApi';
import { ISVISIBLE, NotePadInterface } from '@/types/interfaces/Inotepad';
import { toast } from 'sonner';
import { SiGooglegemini } from "react-icons/si";
import AskAiModal from '../ui/AskAiModal';


type props = {
    currentNote: NotePadInterface | undefined;
    setCurrentNote: React.Dispatch<React.SetStateAction<NotePadInterface | undefined>>;
    setSaved: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: string | undefined
}

function RichTextEditor({ currentNote, setCurrentNote, setSaved, currentUser }: props) {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("untitled");
    const [openModal, setOpenModal] = useState(false)
    const createdAt = new Date();
    const updatedAt = new Date();
    const { projectId } = useParams();
    const [selectedValue, setSelectedValue] = useState<ISVISIBLE>(ISVISIBLE.TO_ME);

    useEffect(() => {
        if (currentNote?.notes) {
            setText(currentNote.notes);
            setTitle(currentNote.title);
            setSelectedValue(currentNote.is_visible);
        } else {
            setText("");
            setTitle("Untitled");
        }
    }, [currentNote]);

    const handleSelectionChange = (keys: any) => {
        const selectedKey = keys.currentKey as ISVISIBLE;
        setSelectedValue(selectedKey);
    };

    async function handleSubmit() {
        if (!projectId) {
            toast.warning('Please select a project');
            return;
        }

        if (currentNote?._id) {
            const response = await UpdateNotes({ notes: text, title, projectId, is_visible: selectedValue, _id: currentNote._id });
            if (response) toast.success('Saved');
            setCurrentNote({
                ...currentNote,
                notes: text,
                title: title,
                is_visible: selectedValue,
                updatedAt: new Date().toISOString(),
            });
        } else {
            if (text === " ") {
                toast.warning('Please enter some text');
            } else {
                const response = await CreateNewNote({ notes: text, title, projectId, is_visible: selectedValue });
                if (response) {
                    setSaved((prev) => !prev);
                    setCurrentNote(response.data);
                    toast.success('Saved');
                }
            }
        }
    }

    return (
        <div className='h-screen flex relative flex-col'>
            <div className='p-2 flex-shrink-0'>
                <div className='flex flex-row gap-1 items-center'>
                    <input
                        className='text-4xl w-full'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <Button onClick={handleSubmit} color='primary' className='rounded-md'>Save</Button>
                    {currentNote?.user_id == currentUser &&
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color='default' isIconOnly className='rounded-md'> <FiEye /></Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode='single'
                                selectedKeys={selectedValue ? [selectedValue] : undefined}
                                onSelectionChange={handleSelectionChange}
                            >
                                <DropdownItem key={ISVISIBLE.TO_ME}>only me</DropdownItem>
                                <DropdownItem key={ISVISIBLE.TO_EVERYONE}>everyone</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    }
                    {currentNote?.user_id == undefined &&
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color='default' isIconOnly className='rounded-md'> <FiEye /></Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode='single'
                                selectedKeys={selectedValue ? [selectedValue] : undefined}
                                onSelectionChange={handleSelectionChange}
                            >
                                <DropdownItem key={ISVISIBLE.TO_ME}>only me</DropdownItem>
                                <DropdownItem key={ISVISIBLE.TO_EVERYONE}>everyone</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    }
                </div>
                <div className='flex-row text-sm gap-4 mt-2 flex'>
                    <span>Created at: {currentNote?.createdAt || createdAt.toDateString()} </span>
                    <span>Updated at: {currentNote?.updatedAt || updatedAt.toDateString()} </span>
                </div>
            </div>
            <div className='flex-grow'>
                <Editor
                    className='h-full overflow-hidden'
                    style={{ minHeight: '200px', maxHeight: '480px' }}
                    value={text}
                    onTextChange={(e: any) => setText(e.htmlValue)}
                />
            </div>
            <Button color='secondary' onClick={() => setOpenModal(true)} className='absolute bottom-5 right-4' isIconOnly><SiGooglegemini size={25} /></Button>
            <AskAiModal openModal={openModal} setText={setText} setOpenModal={setOpenModal} />
        </div>
    )
}

export default RichTextEditor;
