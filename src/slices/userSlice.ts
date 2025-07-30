import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";

const initialState: UserProfile = {
    fullName: "",
    userInfo: null,
    skills: null,
    projects: null,
    snippets: null,
    certifications: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserSkills(state, action) {
            state.skills = action.payload;
        },

        setFullName(state, action) {
            state.fullName = action.payload;
        },

        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },

        clearProfile(state) {
            state.userInfo = null;
        }
    }
});

export const { setUserSkills, setUserInfo, clearProfile } = userSlice.actions;
export default userSlice.reducer;