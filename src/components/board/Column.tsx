import { ICard, ColumnProps, Icolumn } from '@/types/interfaces/IBoard';
import React, { useCallback, useEffect, useState } from 'react'
import DropIndicator from './DropIndicator';
import Card from './Card';
import AddCard from './AddCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setCards, updateCard } from '@/redux/slices/cardSlice';
import { GetCards, UpdateColumn } from '@/api/CardApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Spinner } from '@nextui-org/react';
import Lottie from "lottie-react";
import completeAnimation from '../../assets/animations/completedAnimation.json'

const Column: React.FC<ColumnProps> = ({ title, headingColor, column, Icon }) => {

    const [active, setActive] = useState(false);
    const [updated, setUpdated] = useState(false)
    const [newCardAdded, setNewCardAdded] = useState(false)
    const [isDeleted, setCardDeleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCompleted, setIscompleted] = useState(false)
    const cards = useSelector((state: RootState) => state.cards)
    const dispatch = useDispatch()
    const { projectId } = useParams()


    async function fetchCards() {
        if (projectId !== "undefined") {
            const response = await GetCards(projectId)
            dispatch(setCards(response?.data))
        }
    }

    useEffect(() => {
        fetchCards()
    }, [updated, newCardAdded, isDeleted])


    const handleDragStart = useCallback((e: React.DragEvent, card: ICard) => {
        e.dataTransfer.setData("cardId", card.id);
    }, []);

    const handleAnimation = useCallback(() => {
        setTimeout(() => {
            setIscompleted(false)
        }, 2000);

    }, [isCompleted])

    const handleDragEnd = useCallback(async (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");
        setActive(false);
        clearHighlights();
        const indicators = getIndicators();
        const { element }: any = getNearestIndicator(e, indicators);
        const before = element.dataset.before || "-1";
        if (before !== cardId) {
            const cardToUpdate = cards.find((c) => c.id === cardId);
            if (!cardToUpdate) return;
            const updatedCard: ICard = { ...cardToUpdate, column };
            if (updatedCard._id) {
                setIsLoading(true);
                dispatch(updateCard(updatedCard));
                try {
                    if (column == Icolumn.COMPLETED) {
                        setIscompleted(true)
                        handleAnimation()
                    }
                    const response = await UpdateColumn(updatedCard._id, column);
                    if (response) {
                        setUpdated(!updated);
                    } else {
                        toast.error('We are facing too much traffic! Please wait', { position: 'top-center' });
                    }
                } catch (error) {
                    // If the API call fails, revert the change
                    dispatch(updateCard({ ...updatedCard, column: cardToUpdate.column }));
                    toast.error('We are facing too much traffic! Please wait', { position: 'top-center' });
                } finally {
                    setIsLoading(false);
                }
            }
        }
    }, [cards, column, dispatch, updated]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    }, []);

    const clearHighlights = useCallback((els?: Element[]) => {
        const indicators = els || getIndicators();
        indicators.forEach((i) => {
            (i as HTMLElement).style.opacity = "0";
        });
    }, []);

    const highlightIndicator = useCallback((e: React.DragEvent) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        (el.element as HTMLElement).style.opacity = "1";
    }, []);




    const getNearestIndicator = useCallback((e: React.DragEvent, indicators: Element[]) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );
        return el;
    }, []);

    const getIndicators = useCallback(() => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }, [column]);

    const handleDragLeave = useCallback(() => {
        clearHighlights();
        setActive(false);
    }, []);

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <>
            {isLoading ?
                <div className='w-full items-center flex justify-center'>
                    <Spinner />
                </div>
                :
                <div className="w-56  shrink-0 ">
                    <div className={`mb-3 flex border-b-3  pb-1  ${headingColor} items-center justify-between`}>
                        <div className='flex gap-3 items-center'>
                            {Icon && <Icon className='text-neutral-600' />}
                            <h3>{title}</h3>
                        </div>
                        <span className="rounded text-sm text-neutral-400">
                            {filteredCards.length}
                        </span>
                    </div>
                    <div
                        onDrop={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`h-full w-full transition-colors space-y-1 hideScrollbar overflow-y-auto ${active ? "bg-neutral-800/10" : "bg-neutral-800/0"
                            }`}
                    >
                        {filteredCards.map((c) => {
                            return (
                                <>
                                    <Card setCardDeleted={setCardDeleted} key={c.id} {...c} handleDragStart={handleDragStart} />
                                    {isCompleted && <div className='w-full'>
                                        <Lottie size={600} animationData={completeAnimation} loop={true}></Lottie>
                                    </div>}
                                </>
                            )


                        })}
                        <DropIndicator beforeId={null} column={column} />
                        <AddCard setNewCardAdded={setNewCardAdded} column={column} />
                    </div>
                </div>
            }

        </>
    );
}

export default Column
