"use client";
import { Container } from "@mui/material";
import PersonalInfo from "../components/profile/PersonalInfo";
import Projects from "../components/profile/Projects";
import Snippets from "../components/profile/Snippets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects, fetchSnippets, fetchUserInfo, fetchUserSkills } from "../stateManagement/thunks";
import type { AppDispatch } from "../slices/store";
import { getProjects, getSnippets, getTechStack, getUserInfo } from "../constants/urls";

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        dispatch(fetchUserInfo(getUserInfo));
        dispatch(fetchUserSkills(getTechStack));
        dispatch(fetchProjects(getProjects));
        dispatch(fetchSnippets(getSnippets));
    
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>

            <PersonalInfo />

            <Projects />

            <Snippets />

        </Container>
    );
}
