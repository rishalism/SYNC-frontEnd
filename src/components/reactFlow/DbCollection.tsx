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
                <h2 className="text-medium font-semibold">{data.data.collectionName}</h2>
                <span className="text-xs font-semibold">collection</span>
            </div>
            <div>
                <ul className="space-y-0 relative">
                    {data.data.fields.map((field, index) => (
                        <li key={index} className="relative"> {/* Add relative positioning here */}
                            <Handle
                                type="target"
                                position={Position.Left}
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                id={`${field.key}-target`} // Add unique id
                            />
                            <div className="flex items-center flex-row p-1 border-b-1 gap-5">
                                <div className="w-full text-sm capitalize p-1 font-semibold">{field.key}</div>
                                <div className="p-1 text-sm">{field.type}</div>
                            </div>
                            <Handle
                                type="source"
                                position={Position.Right}
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                id={`${field.key}-source`} // Add unique id
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DbCollectionNode;