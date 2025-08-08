import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import extraSlices from "./extraSlices";
import questionReducer from "./questionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionReducer,
        extraSlices: extraSlices,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;