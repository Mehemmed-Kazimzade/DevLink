"use client";
import { Container, Typography, Box } from "@mui/material";
import QuestionCard from "./QuestionCard";

const sampleQuestions = [
    {
        id: "1",
        title: "How to implement authentication in React with TypeScript?",
        excerpt:
            "I am trying to implement user authentication in my React TypeScript application. I want to use JWT tokens and protect certain routes. What is the best approach for this?",
        tags: ["react", "typescript", "authentication", "jwt"],
        votes: 15,
        answers: 3,
        views: 1250,
        author: {
            name: "John Developer",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 2847,
        },
        createdAt: "2 hours ago",
        isAnswered: true,
    },
    {
        id: "2",
        title: "Material-UI theme customization not working properly",
        excerpt:
            "I created a custom theme for Material-UI but the colors are not applying correctly to all components. The primary color works but secondary and custom colors do not.",
        tags: ["material-ui", "react", "theming", "css"],
        votes: 8,
        answers: 1,
        views: 892,
        author: {
            name: "Sarah Designer",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 1523,
        },
        createdAt: "5 hours ago",
        isAnswered: false,
    },
    {
        id: "3",
        title: "Best practices for state management in large React applications",
        excerpt:
            "What are the current best practices for managing state in large React applications? Should I use Redux, Zustand, or stick with React Context? Looking for performance considerations.",
        tags: [
            "react",
            "state-management",
            "redux",
            "context-api",
            "performance",
        ],
        votes: 23,
        answers: 7,
        views: 3421,
        author: {
            name: "Mike Architect",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 5692,
        },
        createdAt: "1 day ago",
        isAnswered: true,
    },
    {
        id: "4",
        title: "TypeScript generic constraints with React components",
        excerpt:
            "I am struggling with TypeScript generic constraints when creating reusable React components. How can I properly type a component that accepts different prop types based on a generic parameter?",
        tags: ["typescript", "react", "generics", "components"],
        votes: 12,
        answers: 2,
        views: 756,
        author: {
            name: "Alex TypeScript",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 3241,
        },
        createdAt: "3 days ago",
        isAnswered: true,
    },
];

export default function QuestionList() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 1, fontWeight: 600 }}
                >
                    Questions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Browse through community questions and find answers
                </Typography>
            </Box>

            <Box>
                {sampleQuestions.map((question) => (
                    <QuestionCard key={question.id} {...question} />
                ))}
            </Box>
        </Container>
    );
}
