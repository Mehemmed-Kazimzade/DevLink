import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";
import { fetchProjects, fetchUserInfo, fetchUserSkills } from "../stateManagement/thunks";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";

const initialState: UserProfile = {
    fullName: "",
    userInfo: null,
    skills: null,
    projects: null,
    snippets: null,
    certifications: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setProjects(state, action) {
            state.projects = action.payload;
        },

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
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(fetchUserSkills.fulfilled, (state, action) => {
                state.skills = action.payload;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
            })
    },
});

export const { setUserSkills, setUserInfo, clearProfile } = userSlice.actions;
export default userSlice.reducer;
