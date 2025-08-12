import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";
import { fetchViewedUserInfo, fetchViewedUserProjects, fetchViewedUserSkills, fetchViewedUserSnippets } from "../stateManagement/thunks";

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
        setViewedUserFullName(state, action) {
            state.fullName = action.payload;
        }
    },

    extraReducers: builder => {
        builder
        
        .addCase(fetchViewedUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        })
        
        .addCase(fetchViewedUserProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
        })

        .addCase(fetchViewedUserSnippets.fulfilled, (state, action) => {
            state.snippets = action.payload;
        })

        .addCase(fetchViewedUserSkills.fulfilled, (state, action) => {
            state.skills = action.payload;
        })
    }
})

export const { setViewedUserFullName } = viewedUserSlice.actions;

export default viewedUserSlice.reducer;