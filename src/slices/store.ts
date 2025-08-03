import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import extraSlices from "./extraSlices";

export const store = configureStore({
    reducer: {
        user: userReducer,
        extraSlices: extraSlices
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;