import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CommentDto, QuestionDto } from "../types/questions";
import { fetchViewedQuestion } from "../stateManagement/thunks";

interface CachedQuestionsState {
    byId: Record<string, QuestionDto>;
    lastFetched: Record<string, number>;
    viewedQuestion: QuestionDto | null;
}

const initialState: CachedQuestionsState = {
    byId: {},
    lastFetched: {},
    viewedQuestion: null
};

const cachedQuestionSlice = createSlice({
    name: "cachedQuestionSlice",
    initialState: initialState,
    reducers: {
        cacheQuestion(
            state,
            action: PayloadAction<{ id: string; data: QuestionDto }>
        ) {
            state.byId[action.payload.id] = action.payload.data;
            state.lastFetched[action.payload.id] = Date.now();
        },

        setViewedQuestion(state, action: PayloadAction<QuestionDto>) {
            state.viewedQuestion = action.payload;
        },

        setCommentsOnQuestion(state, action: PayloadAction<CommentDto>) {
            state.viewedQuestion?.comments.push(action.payload);
        },

        clearViewedQuestion(state, _) {
            state.viewedQuestion = null;
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchViewedQuestion.fulfilled, (state, action) => {
            state.viewedQuestion = action.payload;
        })
    }
});

export const { cacheQuestion, setViewedQuestion,setCommentsOnQuestion, clearViewedQuestion } = cachedQuestionSlice.actions;
export default cachedQuestionSlice.reducer;
