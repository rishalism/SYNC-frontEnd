import { CollectionState } from '@/types/interfaces/IdbDesign';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node } from '@xyflow/react';

export const initialState: Node<{ data: CollectionState }>[] = []


const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCollection(state, action: PayloadAction<Node<{ data: CollectionState }>>) {
            state.push(action.payload);
            localStorage.setItem('collections', JSON.stringify(action.payload));

        },
        removeCollection(state, action: PayloadAction<number>) {
            state.splice(action.payload, 1);
        },
    },
});

export const { setCollection, removeCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
