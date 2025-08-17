import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfileTypes/UserProfile";
import {
    fetchProjects,
    fetchSnippets,
    fetchUserInfo,
    fetchUserSkills,
} from "../stateManagement/thunks";

const initialState: UserProfile = {
    id: -1,
    userSlug: "",
    fullName: "",
    userInfo: null,
    skills: null,
    projects: null,
    snippets: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {

        // User Projects

        updateProject(state, action) {
            state.projects =
                state.projects?.map((project) =>
                    project.id === action.payload.id ? action.payload : project
                ) ?? [];
        },

        deleteProject(state, action) {
            state.projects =
                state.projects?.filter(
                    (project) => project.id !== action.payload
                ) ?? null;
        },

        addProject(state, action) {
            state.projects?.push(action.payload);
        },

        // User Snippets

        addSnippet(state, action) {
            state.snippets?.push(action.payload);
        },

        updateSnippet(state, action) {
            state.snippets =
                state.snippets?.map((snippet) =>
                    snippet.id === action.payload.id ? action.payload : snippet
                ) ?? null;
        },

        deleteSnippet(state, action) {
            state.snippets = state.snippets?.filter(snippet => snippet.id !== action.payload) ?? null;
        },

        // User Info

        setUserSkills(state, action) {
            state.skills = action.payload;
        },

        setFullName(state, action) {
            state.fullName = action.payload;
        },

        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },

        setId(state, action) {
            state.id = action.payload;
        },

        clearProfile(state) {
            state.id = -1;
            state.userSlug = "";
            state.fullName = "";
            state.skills = null;
            state.userInfo = null;
            state.projects = null;
            state.snippets = null;
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
            .addCase(fetchSnippets.fulfilled, (state, action) => {
                state.snippets = action.payload;
            });
    },
});

export const {
    setUserSkills,
    setFullName,
    addProject,
    setUserInfo,
    deleteProject,
    clearProfile,
    updateProject,
    deleteSnippet,
    updateSnippet,
    addSnippet,
    setId
} = userSlice.actions;
export default userSlice.reducer;
