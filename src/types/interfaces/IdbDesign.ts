import { Edge, Node } from "@xyflow/react";

interface Field {
    key: string;
    type: string;
}

export interface CollectionState extends Record<string, unknown> {
    collectionName: string;
    fields: Field[];
}

export const initialNodes: Node<{ data: CollectionState }>[] = [];
export const initialEdges: Edge[] = [];

export interface NewCollectionModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    onAddCollection: (collectionState: CollectionState) => void;
}

export enum ConnectionLineType {
    Bezier = 'default',
    Straight = 'straight',
    Step = 'step',
    SmoothStep = 'smoothstep',
    SimpleBezier = 'simplebezier',
}



export interface IEdge {
    animated: boolean;
    id: string;
    source: string;
    sourceHandle: string;
    style: { stroke: string };
    target: string;
    targetHandle: string;
}

export interface NodeData {
    collectionName?: string;
    fields?: any[];
    data?: any;
}

export interface INode {
    data: NodeData;
    dragging: boolean;
    id: string;
    measured: { width: number; height: number };
    position: { x: number; y: number };
    selected: boolean;
    type: string;
}

export interface Viewport {
    x: number;
    y: number;
    zoom: number;
}

interface IDbDesign  {
    projectId: string | undefined;
    nodes: INode[];
    edges: IEdge[];
    viewport: Viewport;
}

export default IDbDesign;
