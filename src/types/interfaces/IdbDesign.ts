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