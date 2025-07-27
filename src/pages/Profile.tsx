"use client";
import { Container } from "@mui/material";
import { EmojiEvents, School } from "@mui/icons-material";
import PersonalInfo from "../components/PersonalInfo";
import type { Skill } from "../types/userProfileTypes/Skill";
import type { Project } from "../types/userProfileTypes/Project";
import Projects from "../components/Projects";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import Snippets from "../components/Snippets";
import type { Certification } from "../types/userProfileTypes/Certification";
import Certifications from "../components/Certifications";

export default function Profile() {
    const skills: Skill[] = [
        { skillName: "React" },
        { skillName: "Java" },
        { skillName: "TypeScript" },
        { skillName: "Node.js" },
        { skillName: "Python" },
        { skillName: "AWS" },
        { skillName: "Docker" },
    ];

    const projects: Project[] = [
        {
            title: "E-Commerce Platform",
            description:
                "Full-stack e-commerce solution with payment integration and admin dashboard.",
            techStack: [
                { skillName: "React" },
                { skillName: "Node.js" },
                { skillName: "MongoDB" },
                { skillName: "Stripe" },
            ],
            liveUrl: "#",
            repoUrl: "#",
        },
        {
            title: "Task Management App",
            description:
                "Collaborative task management tool with real-time updates and team features.",
            techStack: [
                { skillName: "Vue.js" },
                { skillName: "Express" },
                { skillName: "PostgreSQL" },
                { skillName: "Socket.io" },
            ],
            liveUrl: "#",
            repoUrl: "#",
        },
        {
            title: "Weather Dashboard",
            description:
                "Interactive weather dashboard with data visualization and location-based forecasts.",
            techStack: [
                { skillName: "React" },
                { skillName: "D3.js" },
                { skillName: "OpenWeather API" },
                { skillName: "Tailwind" },
            ],
            liveUrl: "#",
            repoUrl: "#",
        },
    ];

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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PersonalInfo skills={skills} />

            <Projects projects={projects} />

            <Snippets snippets={snippets} />

            <Certifications certifications={certifications} />
        </Container>
    );
}
