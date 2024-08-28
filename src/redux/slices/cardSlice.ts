import { ICard } from "@/types/interfaces/IBoard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ICard[] = []

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<ICard[]>) => {
            return action.payload; // Replace the entire state
        },
        addCard: (state, action: PayloadAction<ICard>) => {
            state.push(action.payload);
        },
        updateCard: (state, action: PayloadAction<ICard>) => {
            const index = state.findIndex(card => card.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCard: (state, action: PayloadAction<string>) => {
            return state.filter(card => card.id !== action.payload);
        }
    }
});

export const { setCards, addCard, updateCard, deleteCard } = cardSlice.actions;
export default cardSlice.reducer;