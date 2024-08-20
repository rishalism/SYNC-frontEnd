import { Edge, Node } from "@xyflow/react";

interface Field {
    key: string;
    type: string;
}

export interface CollectionState extends Record<string, unknown> {
    collectionName: string;
    fields: Field[];
}

export const initialNodes: Node<{ data: CollectionState }>[] = [
    // {
    //     id: '1',
    //     type: 'dbCollection',
    //     position: { x: 100, y: 100 },
    //     data: {
    //         data: {
    //             collectionName: "My Collection",
    //             fields: [
    //                 { key: 'name', type: 'string' },
    //                 { key: 'age', type: 'number' },
    //             ],
    //         },
    //     },
    // },
];


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