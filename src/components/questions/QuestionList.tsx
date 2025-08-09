"use client";
import { Box } from "@mui/material";
import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store";

export default function QuestionList() {
    const questions = useSelector((state: RootState) => state.questions.questions);

    return (
        <Box>
            {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
            ))}
        </Box>
    );
}
