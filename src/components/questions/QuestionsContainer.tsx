import { Box, Container, Typography } from "@mui/material";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store";

interface QuestionsContainerProps {
    questionsFrom: string;
}

export default function QuestionsContainer({
    questionsFrom,
}: QuestionsContainerProps) {
    const { error } = useSelector((state: RootState) => state.questions);

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {error ? (
                    <Typography
                        variant="h4"
                        sx={{ mb: 1, fontWeight: 600 }}
                        color="warning"
                    >
                        {error}
                    </Typography>
                ) : (
                    <>
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{ mb: 1, fontWeight: 600 }}
                            >
                                {"Questions from " + questionsFrom}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Browse through{" "}
                                <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    {questionsFrom}'s
                                </span>{" "}
                                questions and find answers
                            </Typography>
                        </Box>

                        <QuestionList />
                    </>
                )}
            </Container>
        </>
    );
}
