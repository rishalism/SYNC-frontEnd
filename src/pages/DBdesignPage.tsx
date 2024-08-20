import NewCollectionModal from '@/components/ui/NewCollectionModal';
import { Button } from '@nextui-org/react';
import {
    Background, Controls, ReactFlow,
    useNodesState,
    useEdgesState,
    NodeTypes,
    Node,
    addEdge,
    Connection,
    DefaultEdgeOptions,
    ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { CollectionState, initialEdges, initialNodes } from '@/types/interfaces/IdbDesign';
import DbCollectionNode from '@/components/reactFlow/DbCollection';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useDispatch } from "react-redux";
import { setCollection } from "@/redux/slices/collectionSlice";



function DBdesignPage() {

    const collections = useSelector((state: RootState) => state.collection);
    console.log(collections);
    const [openModal, setOpenModal] = useState(false);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(collections);
    const dispatch = useDispatch()

    const edgeOptions: DefaultEdgeOptions = {
        animated: true,
        style: {
            stroke: 'blue'
        }
    };
    const nodeTypes: NodeTypes = useMemo(() => ({ dbCollection: DbCollectionNode }), []);

    const handleAddCollection = (collectionState: CollectionState) => {
        const location = Math.random() * 800;
        const newNode = {
            id: crypto.randomUUID(),
            position: { x: location, y: location },
            type: 'dbCollection',
            data: { data: collectionState },
        };

        setNodes((prevNodes) => [
            ...prevNodes,
            newNode
        ]);
        dispatch(setCollection(newNode))
        setOpenModal(false);
    };

    console.log(nodes);


    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((oldEdges) => addEdge(connection, oldEdges));
        },
        [setEdges],
    );


    return (
        <div className='w-full relative mt-12 flex '>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                defaultEdgeOptions={edgeOptions}
            >
                <Background />
                <Button
                    onClick={() => setOpenModal(true)}
                    color='primary'
                    className='rounded-md z-10  absolute right-5 bottom-5 cursor-pointer'
                    endContent={<GoPlus />}
                >
                    New Collection
                </Button>
                <Controls />
            </ReactFlow>
            <NewCollectionModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                onAddCollection={handleAddCollection}
            />
        </div>
    )
}

export default DBdesignPage;
