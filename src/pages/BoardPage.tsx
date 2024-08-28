import { GetCards } from "@/api/CardApi";
import BurnBarrel from "@/components/board/BurnBarrel";
import Column from "@/components/board/Column";
import EmptyBoardPage from "@/components/EmptyBoardPage";
import useBoardpermission from "@/customHook/BoardPermissionCheck";
import { setCards } from "@/redux/slices/cardSlice";
import { ICard, Icolumn } from "@/types/interfaces/IBoard";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { GrInProgress, GrTest } from "react-icons/gr";
import { MdDoneOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BlockPage from "./errorPage/BlockPage";

function BoardPage() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [newCardAdded, setNewCardAdded] = useState(false);
    const [isDeleted, setCardDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const { isBlocked } = useBoardpermission();

    useEffect(() => {
        async function fetchCards() {
            if (projectId !== "undefined") {
                const response = await GetCards(projectId);
                dispatch(setCards(response?.data));
            }
        }

        fetchCards();
    }, [projectId, updated, newCardAdded, isDeleted, dispatch]);

    if (isBlocked) {
        return <BlockPage />
    }

    if (projectId === "undefined") {
        return <EmptyBoardPage />;
    }

    return (
        <div className="flex w-full gap-10 mt-12 p-12">
            <Column
                key={1}
                title="To Do"
                column={Icolumn.TODO}
                headingColor="border-red-400"
                Icon={BsPencil}
                setNewCardAdded={setNewCardAdded}
                setCardDeleted={setCardDeleted}
                setUpdated={setUpdated}
                updated={updated}
            />
            <Column
                key={2}
                title="In Progress"
                column={Icolumn.INPROGRESS}
                headingColor="border-yellow-200"
                Icon={GrInProgress}
                setNewCardAdded={setNewCardAdded}
                setCardDeleted={setCardDeleted}
                setUpdated={setUpdated}
                updated={updated}
            />
            <Column
                key={3}
                title="Testing"
                column={Icolumn.TESTING}
                headingColor="border-blue-400"
                Icon={GrTest}
                setNewCardAdded={setNewCardAdded}
                setCardDeleted={setCardDeleted}
                setUpdated={setUpdated}
                updated={updated}
            />
            <Column
                key={4}
                title="Completed"
                column={Icolumn.COMPLETED}
                headingColor="border-emerald-400"
                Icon={MdDoneOutline}
                setNewCardAdded={setNewCardAdded}
                setCardDeleted={setCardDeleted}
                setUpdated={setUpdated}
                updated={updated}
            />
            {/* <BurnBarrel setCards={setCards} /> */}
        </div>
    );
}

export default BoardPage;
