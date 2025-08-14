import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionDto } from "../types/questions";

interface CachedQuestionsState {
  byId: Record<string, QuestionDto>;
  lastFetched: Record<string, number>;
}

const initialState: CachedQuestionsState = {
  byId: {},
  lastFetched: {},
};


const cachedQuestionSlice = createSlice({
    name: "cachedQuestionSlice",
    initialState: initialState,
    reducers: {
        cacheQuestion(state, action: PayloadAction<{id: string, data: QuestionDto}>) {
            state.byId[action.payload.id] = action.payload.data;
            state.lastFetched[action.payload.id] = Date.now();
        }
    }
})

export const {cacheQuestion} = cachedQuestionSlice.actions;
export default cachedQuestionSlice.reducer;
