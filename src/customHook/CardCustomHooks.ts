import { getCardDetailById } from "@/api/CardApi";
import { ICard } from "@/types/interfaces/IBoard";
import { useEffect, useState } from "react";

function useCardDetails(id: string | undefined, openModal: boolean, taskAdded: boolean, taskDeleted: boolean) {
    const [cardDetail, setCardDetail] = useState<ICard | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchDetails() {
            if (id) {
                setIsLoading(true);
                try {
                    const cardData = await getCardDetailById(id);
                    setCardDetail(cardData?.data || null);
                } catch (error) {
                    console.error("Error fetching card details:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchDetails();
    }, [id, openModal, taskAdded, taskDeleted]);

    return { cardDetail, isLoading };
}

export default useCardDetails