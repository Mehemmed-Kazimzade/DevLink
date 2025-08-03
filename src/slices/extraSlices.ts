import { createSlice } from "@reduxjs/toolkit"

const initialState: { codeLanguage: string | null } = {
    codeLanguage: null,
}

const extraSlices = createSlice({
    name: "extraSlices",
    initialState: initialState,
    reducers: {
        updateCodeLanguage(state, action) {
            state.codeLanguage = action.payload;
        },
    }
})

export const { updateCodeLanguage } = extraSlices.actions;
export default extraSlices.reducer;
