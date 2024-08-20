
import BurnBarrel from "@/components/board/BurnBarrel";
import Column from "@/components/board/Column";
import EmptyBoardPage from "@/components/EmptyBoardPage";
import { ICard, Icolumn } from "@/types/interfaces/IBoard";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { GrTest } from "react-icons/gr";
import { MdDoneOutline } from "react-icons/md";
import { useParams } from "react-router-dom";


function BoardPage() {

    const { projectId } = useParams();

    if (projectId == "undefined") {
        return <EmptyBoardPage />
    } else {


        return (
            <div className="flex w-full gap-10 mt-12   p-12">

                <Column
                    title="To Do"
                    column={Icolumn.TODO}
                    headingColor="border-red-400"
                    Icon={BsPencil}
                />
                <Column
                    title="In progress"
                    column={Icolumn.INPROGRESS}
                    headingColor="border-yellow-200"
                    Icon={GrInProgress}

                />
                <Column
                    title="Testing"
                    column={Icolumn.TESTING}
                    headingColor="border-blue-400"
                    Icon={GrTest}

                />
                <Column
                    title="Completed"
                    column={Icolumn.COMPLETED}
                    headingColor="border-emerald-400"
                    Icon={MdDoneOutline}
                />
                {/* <BurnBarrel setCards={setCards} /> */}
            </div>
        );
    }
}
export default BoardPage




