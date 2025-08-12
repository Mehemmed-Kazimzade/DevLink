"use client";
import { Container } from "@mui/material";
import PersonalInfo from "../components/profile/PersonalInfo";
import Projects from "../components/profile/Projects";
import Snippets from "../components/profile/Snippets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchProjects,
    fetchSnippets,
    fetchUserInfo,
    fetchUserSkills,
    fetchViewedUserInfo,
    fetchViewedUserProjects,
    fetchViewedUserSkills,
    fetchViewedUserSnippets,
} from "../stateManagement/thunks";
import type { AppDispatch } from "../slices/store";
import {
    getProjects,
    getSnippets,
    getTechStack,
    getUserInfo,
} from "../constants/urls";
import { useParams } from "react-router-dom";
import { setViewedUserFullName } from "../slices/viewedUserSlice";
import GetFullNameFromSlug from "../utils/GetFullNameFromSlug";
import CapitalizeString from "../utils/CapitalizeString";

export default function Profile() {
    const { userSlug } = useParams<{ userSlug: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const isCurrentUser = userSlug === "me" || !userSlug;

    useEffect(() => {
        if (isCurrentUser) {
            dispatch(fetchUserInfo(getUserInfo));
            dispatch(fetchUserSkills(getTechStack));
            dispatch(fetchProjects(getProjects));
            dispatch(fetchSnippets(getSnippets));
        } else {

            dispatch(
                setViewedUserFullName(
                    CapitalizeString(GetFullNameFromSlug(userSlug))
                )
            );

            dispatch(fetchViewedUserInfo(getUserInfo + userSlug));
            dispatch(fetchViewedUserSkills(getTechStack + userSlug));
            dispatch(fetchViewedUserProjects(getProjects + userSlug));
            dispatch(fetchViewedUserSnippets(getSnippets + userSlug));
        }
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PersonalInfo isCurrentUser={isCurrentUser} />

            <Projects isCurrentUser={isCurrentUser} />

            <Snippets isCurrentUser={isCurrentUser} />
        </Container>
    );
}
