import { AddCardProps, ICard } from '@/types/interfaces/IBoard';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addCard } from '@/redux/slices/cardSlice';
import { AddcardIntoDB } from '@/api/CardApi';
import { useParams } from 'react-router-dom';

const AddCard: React.FC<AddCardProps> = ({ column, setNewCardAdded }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const dispatch = useDispatch()

    const { projectId } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard: ICard = {
            column,
            title: text.trim(),
            id: Math.random().toString(),
        };
        dispatch(addCard(newCard));
        setAdding(false);
        const response = await AddcardIntoDB({ ...newCard, projectId })
        if (response) {
            setNewCardAdded((prev) => !prev)
        }
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm placeholder-violet-300 focus:outline-0"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400  transition-colors "
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
}

export default React.memo(AddCard)
