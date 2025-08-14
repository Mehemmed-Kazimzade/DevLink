"use client";
import { Box } from "@mui/material";
import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import { useRef } from "react";
import useFetchQuestionsIfNeeded from "../../hooks/useFetchQuestionsIfNeeded";

export default function QuestionList() {
    const hoverTimer = useRef<number | null>(null);
    const questions = useSelector(
        (state: RootState) => state.questions.questions
    );
    const lastFetched = useSelector(
        (root: RootState) => root.cachedQuestions.lastFetched
    );

    const fetchQuestionsIfNeeded = useFetchQuestionsIfNeeded();

    const handleMouseEnter = (questionSlug: string) => {
        hoverTimer.current = setTimeout(async () => {
            fetchQuestionsIfNeeded(questionSlug, lastFetched);
        }, 500);
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };

    return (
        <Box>
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                />
            ))}
        </Box>
    );
}
