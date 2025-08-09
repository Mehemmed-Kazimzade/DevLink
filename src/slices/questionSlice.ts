import { createSlice } from "@reduxjs/toolkit";
import { type QuestionDto } from "../types/questions";
import { fetchQuestions } from "../stateManagement/thunks";

interface InitialStateInterface {
    questions: QuestionDto[];
    loading: boolean;
    error: string | null;
}

const initialState: InitialStateInterface = {
    questions: [],
    loading: false,
    error: null,
};

const questionSlice = createSlice({
    name: "questions",
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state, _) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        })

        .addCase(fetchQuestions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export default questionSlice.reducer
