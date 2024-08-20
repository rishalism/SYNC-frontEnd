import { ICard } from "@/types/interfaces/IBoard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ICard[] = [
    // ToDo
    { title: "Look into render bug in dashboard", id: "1", column: "ToDo" },
    { title: "SOX compliance checklist", id: "2", column: "ToDo" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "ToDo" },
    { title: "Document Notifications service", id: "4", column: "ToDo" },
    // Inprogress
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "Inprogress",
    },
    { title: "Postmortem for outage", id: "6", column: "Inprogress" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "Inprogress" },

    // Testing
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "Testing",
    },
    { title: "Add logging to daily CRON", id: "9", column: "Testing" },
    // Completed
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "Completed",
    },
]

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