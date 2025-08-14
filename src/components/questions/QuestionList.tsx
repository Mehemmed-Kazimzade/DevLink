"use client";
import { Box } from "@mui/material";
import QuestionCard from "./QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import { useRef } from "react";
import { cacheQuestion } from "../../slices/cachedQuestionSlice";
import useGetCredentials from "../../api/useGetCredentials";
import type { QuestionDto } from "../../types/questions";

export default function QuestionList() {
    const hoverTimer = useRef<number | null>(null);
    const questions = useSelector(
        (state: RootState) => state.questions.questions
    );
    const dispatch = useDispatch();

    const handleMouseEnter = (questionSlug: string) => {
        hoverTimer.current = setTimeout(async () => {
            const questionDetails = await useGetCredentials<QuestionDto>(
                `http://localhost:8080/api/v1/question/${questionSlug}`
            );

            console.log(questionDetails);

            dispatch(
                cacheQuestion({
                    id: questionSlug,
                    data: questionDetails.data,
                })
            );

            console.log("yes");
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
