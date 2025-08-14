import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import extraSlices from "./extraSlices";
import questionReducer from "./questionSlice";
import viewedUserReducer from "./viewedUserSlice";
import cachedQuestions from "./cachedQuestionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionReducer,
        viewedUser: viewedUserReducer,
        extraSlices: extraSlices,
        cachedQuestions: cachedQuestions
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;