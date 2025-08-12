import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import extraSlices from "./extraSlices";
import questionReducer from "./questionSlice";
import viewedUserReducer from "./viewedUserSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionReducer,
        viewedUser: viewedUserReducer,
        extraSlices: extraSlices,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;