import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";

const initialState: UserProfile = {
    userSlug: "",
    fullName: "",
    userInfo: null,
    skills: null,
    projects: null,
    snippets: null,
};

const viewedUserSlice = createSlice({
    name: "viewedUser",
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

    }
})