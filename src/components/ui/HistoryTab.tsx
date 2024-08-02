import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Button } from '@nextui-org/react';
import { getAllApis, RemoveOneApi } from "@/api/apiToolApi";
import { useParams } from "react-router-dom";
import ApiToolInterface from "@/types/interfaces/Iapitest";
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from "@/components/ui/context-menu"
import { toast } from "sonner";


function HistoryTab({ isSaved, stateData, SaveStateData }: any) {
    const [saved, setSaved] = useState<ApiToolInterface[]>([]);
    const [deleted, setDeleted] = useState(false);
    const { projectId } = useParams();

    const fetchSavedApis = async () => {
        try {
            if (!projectId == undefined) {
                const response = await getAllApis(projectId);
                if (response?.data && response.data.length > 0) {
                    setSaved(response.data);
                } else {
                    setSaved([]); // Set an empty array if no data is returned
                }
            }
        } catch (error) {
            setSaved([]);
        }
    };

    useEffect(() => {
        fetchSavedApis();
    }, [projectId, deleted, isSaved]);

    const handlesetCurrent = () => {
        SaveStateData(saved)
    }

    const handleDelete = async (id: string | undefined) => {
        const response = await RemoveOneApi({ projectId, id });
        if (response) {
            toast.success('Deleted', { position: 'top-center' });
            setDeleted(!deleted);
        }
    }

    return (
        <div className="w-52 h-full border-r-2 absolute left-2">
            <div className="p-4 w-full border-b-1">
                <Button className="w-full rounded-sm" size="md" endContent={<GoPlus />}>
                    New Request
                </Button>
            </div>
            <div className="space-y-0">
                {saved.map((item, index) => (
                    <ContextMenu key={index}> {/* Move key prop to the ContextMenu component */}
                        <ContextMenuTrigger>
                            <div
                                className="w-full text-neutral-500 text-sm p-3 cursor-pointer flex-row space-x-3 z-0 border hover:scale-95 hover:shadow-lg hover:border-1 h-10 flex items-center"
                                onClick={handlesetCurrent}
                            >
                                <span>{item.method}</span>
                                <span className="text-wrap">{item.url.slice(0, 21)}...</span>
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="">
                            <ContextMenuItem onClick={() => handleDelete(item?._id)}>DELETE</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </div>
        </div>
    );
}

export default HistoryTab;
