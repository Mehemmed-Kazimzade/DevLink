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
import { fetchProjects, fetchUserInfo, fetchUserSkills } from "../stateManagement/thunks";
import type { AppDispatch } from "../slices/store";

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();

    const snippets: Snippet[] = [
        {
            title: "React Custom Hook",
            language: "JavaScript",
            preview:
                "const useLocalStorage = (key, initialValue) => {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  ...",
        },
        {
            title: "Binary Search Algorithm",
            language: "Python",
            preview:
                "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
        },
        {
            title: "API Rate Limiter",
            language: "Node.js",
            preview:
                'const rateLimit = require("express-rate-limit");\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per windowMs\n  message: "Too many requests from this IP"\n});\n\napp.use(limiter);',
        },
    ];

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
    
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PersonalInfo />

            <Projects />

            <Snippets snippets={snippets} />

            <Certifications certifications={certifications} />
        </Container>
    );
}
