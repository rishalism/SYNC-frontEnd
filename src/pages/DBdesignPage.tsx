import NewCollectionModal from '@/components/ui/NewCollectionModal';
import { Button } from '@nextui-org/react';
import {
    Background, Controls, ReactFlow,
    useNodesState,
    useEdgesState,
    NodeTypes,
    addEdge,
    Connection,
    DefaultEdgeOptions,
    Panel,
    ReactFlowProvider,
    MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { CollectionState, initialEdges, initialNodes } from '@/types/interfaces/IdbDesign';
import DbCollectionNode from '@/components/reactFlow/DbCollection';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import usecheckDBdesignpermission from '@/customHook/DbPermissionCheck';
import BlockPage from './errorPage/BlockPage';

export type Viewport = {
    x: number;
    y: number;
    zoom: number;
};

function DBdesignPage() {
    const collections = useSelector((state: RootState) => state.collection);
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects);
    const [openModal, setOpenModal] = useState(false);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(collections);
    const [rfInstance, setRfInstance] = useState<any>(null);
    const [viewport, setViewport] = useState<Viewport>()
    const { projectId } = useParams()
    const flowKey: string | undefined = projectId;

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
        setOpenModal(false);
    };


    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            if (flowKey && flowKey == projectId) {
                const storedFlow = localStorage.getItem(flowKey);

                if (storedFlow) {
                    const flow = JSON.parse(storedFlow);

                    if (flow) {
                        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                        setNodes(flow.nodes || []);
                        setEdges(flow.edges || []);
                        setViewport(flow.viewport)
                    }
                }
            }
        };

        restoreFlow();
    }, [setNodes, flowKey]);


    const onSave = useCallback(() => {
        if (rfInstance && flowKey !== 'undefined' && flowKey) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
            toast.success('saved ')
        } else {
            toast.warning('select a project to save a collection')
        }
    }, [rfInstance]);


    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((oldEdges) => addEdge(connection, oldEdges));
        },
        [setEdges],
    );

    useEffect(() => {
        onRestore()
    }, [])


    const { isBlocked } = usecheckDBdesignpermission();

    if (isBlocked) {
        return <BlockPage />
    }


    return (
        <div className='w-full  mt-12 flex '>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    fitView
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    defaultEdgeOptions={edgeOptions}
                    onInit={setRfInstance}
                    viewport={viewport}
                >
                    <MiniMap nodeStrokeWidth={3} />
                    <Background />
                    <Panel position="top-right" className='gap-3 flex'>
                        <Button onClick={() => setOpenModal(true)} color='primary' className='rounded-md h-8 cursor-pointer' endContent={<GoPlus />}>New Collection</Button>
                        <Button color='default' className='w-8 capitalize font-semibold p-0 rounded-md h-8' onClick={onSave}>save</Button>
                    </Panel>
                    <Controls />
                </ReactFlow>
                <NewCollectionModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    onAddCollection={handleAddCollection}
                />
            </ReactFlowProvider>
        </div>
    )
}

export default DBdesignPage;
