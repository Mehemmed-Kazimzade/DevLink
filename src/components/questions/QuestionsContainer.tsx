import { Box, Container, Typography } from "@mui/material";
import QuestionList from "./QuestionList";

interface QuestionsContainerProps {
    questionsFrom: string;
}

export default function QuestionsContainer({ questionsFrom }: QuestionsContainerProps) {
    return (
        <>
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 1, fontWeight: 600 }}
                >
                    { questionsFrom }
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Browse through community questions and find answers
                </Typography>
            </Box>

            <QuestionList />
        </Container>
        </>
    );
}
