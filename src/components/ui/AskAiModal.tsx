import { AskAi } from "@/api/notePadApi";
import { getUserInfo } from "@/redux/slices/userData";
import { Button } from "@nextui-org/react";
import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { Skeleton } from "@nextui-org/react";

interface prop {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

type Message = {
    type: 'user' | 'ai';
    content: string;
};

const user = getUserInfo()
function AskAiModal({ openModal, setOpenModal, setText }: prop) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null);


    function convertMarkdownToPlainText(markdown: string) {
        return markdown
            .replace(/## /g, '')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/[*-] /g, '')
            .replace(/\n\s*\n/g, '\n\n');
    }

    async function getanswerfromAI() {
        setIsLoading(true)
        try {
            if (!currentPrompt.trim()) return;

            // Add user message
            setMessages(prev => [...prev, { type: 'user', content: currentPrompt }]);
            setCurrentPrompt('');

            const result = await AskAi({ prompt: currentPrompt });
            if (result) {
                setIsLoading(false)
                setResponse(result.data)
                const formatted = convertMarkdownToPlainText(result.data);
                // Add AI response
                setMessages(prev => [...prev, { type: 'ai', content: formatted }]);
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            getanswerfromAI();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    function pasteInNotepad() {
        setText(prevText => prevText + (prevText ? "\n\n" : "") + response);
    }

    return (
        <Modal dismissible show={openModal} position={'bottom-right'} className='border-none' onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h1 className="text-lg">Hi, {user?.name}! What can I do for you today?</h1>
            </Modal.Header>
            <Modal.Body className="overflow-hidden">
                <div className="flex flex-col gap-3">
                    {
                        messages.length < 0 &&
                        <div className="flex flex-col gap-3">
                            <h1 className="text-neutral-500 font-semibold text-sm">suggested</h1>
                            <div className="flex flex-col gap-3">
                                <span className="bg-neutral-100  text-black text-sm  cursor-pointer p-1 rounded w-fit">Give me examples to include in my note.</span>
                                <span className="bg-neutral-100  text-black text-sm  cursor-pointer p-1 rounded w-fit">How can I simplify this concept?.</span>
                                <span className="bg-neutral-100  text-black text-sm  cursor-pointer p-1 rounded w-fit">Suggest related topics to explore.</span>
                                <span className="bg-neutral-100  text-black text-sm  cursor-pointer p-1 rounded w-fit">Suggest a title for this note.</span>
                            </div>
                        </div>
                    }
                    <div ref={chatContainerRef} className="overflow-y-auto max-h-72 hideScrollbar">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat ${message.type === 'user' ? 'chat-end' : 'chat-start'} flex flex-col`}>
                                <div className={`chat-bubble`}>
                                    {message.content}
                                </div>
                                {
                                    message.type == 'ai' &&
                                    <span onClick={pasteInNotepad} className="hover:underline cursor-pointer text-start text-xs capitalize">past in notepad</span>
                                }
                            </div>
                        ))}
                        {isLoading &&
                            <div className="chat chat-start max-w-[300px] w-full flex items-center gap-3">
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex  items-center justify-center  z-10 w-full gap-2">
                        <input onKeyDown={handleKeyDown} onChange={(e) => setCurrentPrompt(e.target.value)} value={currentPrompt} type="text" className="rounded-md w-full border-neutral-300" placeholder="What do you want to know? Ask AI..." /> <Button onClick={getanswerfromAI} color="primary" className="rounded-md" isIconOnly><BsStars size={18} /></Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AskAiModal
