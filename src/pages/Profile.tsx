"use client";
import { Container } from "@mui/material";
import { EmojiEvents, School } from "@mui/icons-material";
import PersonalInfo from "../components/PersonalInfo";
import Projects from "../components/Projects";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import Snippets from "../components/Snippets";
import type { Certification } from "../types/userProfileTypes/Certification";
import Certifications from "../components/Certifications";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects, fetchSnippets, fetchUserInfo, fetchUserSkills } from "../stateManagement/thunks";
import type { AppDispatch } from "../slices/store";

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();

    const certifications: Certification[] = [
        {
            title: "AWS Certified Solutions Architect",
            icon: <School />,
            issued_at: "",
            issuer: "",
            url: "",
        },
        {
            title: "LeetCode Top 5%",
            icon: <EmojiEvents />,
            issued_at: "",
            issuer: "",
            url: "",
        },
        {
            title: "Google Cloud Professional",
            icon: <School />,
            issued_at: "",
            issuer: "",
            url: "",
        },
        {
            title: "HackerRank 5 Star Java",
            icon: <EmojiEvents />,
            issued_at: "",
            issuer: "",
            url: "",
        },
        {
            title: "Certified Kubernetes Administrator",
            icon: <School />,
            issued_at: "",
            issuer: "",
            url: "",
        },
    ];

    useEffect(() => {

        dispatch(fetchUserInfo());
        dispatch(fetchUserSkills());
        dispatch(fetchProjects());
        dispatch(fetchSnippets());
    
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PersonalInfo />

            <Projects />

            <Snippets />

            <Certifications certifications={certifications} />
        </Container>
    );
}
