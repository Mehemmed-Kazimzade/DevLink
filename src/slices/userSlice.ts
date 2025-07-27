import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";

const initialState: UserProfile = {
    userInfo: null,
    skill: null,
    projects: null,
    snippets: null,
    certifications: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },

        clearProfile(state) {
            state.userInfo = null;
        }
    }
});

export const { setUserInfo, clearProfile } = userSlice.actions;
export default userSlice.reducer;