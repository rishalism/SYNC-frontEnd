import { CollectionState } from "@/types/interfaces/IdbDesign";
import { Handle, Node, Position, useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

interface DbCollectionNodeData extends Node<CollectionState> {
    data: CollectionState;
    resizing?: boolean;
    selected?: boolean;
    dragging?: boolean;
    focused?: boolean;
}

interface DbCollectionProps {
    data: DbCollectionNodeData;
}

function DbCollectionNode({ data }: DbCollectionProps) {

    if (!data.data) {
        toast.warning('we having trouble fetching data !')
    }

    

    return (
        <div className="rounded-md gap-5 flex flex-col z-10 border-neutral-400 border-2 shadow-lg">
            <div className="flex flex-row gap-5 border-b-1 p-3 items-center justify-between flex-grow">
                <h2 className="text-medium font-semibold" >{data.data.collectionName}</h2>
                <span className="text-xs font-semibold">collection</span>
            </div>
            <div className="">
                <ul className="space-y-0  relative">
                    {data.data.fields.map((field, index) => (
                        <li key={index}>
                            <Handle type="target" className="absolute  w-2 h-2 top-5 right-0 " position={Position.Left} />
                            <div className="flex items-center  flex-row p-1 border-b-1 gap-5">
                                <div className=" w-full text-sm capitalize  p-1 font-semibold">{field.key}</div>
                                <div className=" p-1 tex-sm ">{field.type}</div>
                            </div>
                            <Handle type="source" className="absolute  hover:w-5 hover:h-5 w-2 h-2  top-5 right-0 " position={Position.Right} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DbCollectionNode;