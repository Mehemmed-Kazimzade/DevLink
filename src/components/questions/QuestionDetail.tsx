"use client";
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    Chip,
    Divider,
    Stack,
    IconButton,
    Button,
    TextField,
} from "@mui/material";
import {
    ThumbUp,
    ThumbDown,
    Bookmark,
    Share,
    Flag,
    AccessTime,
    Visibility,
} from "@mui/icons-material";
import MarkdownViewer from "../profile/MarkdownViewer";
import AnswerItem from "./AnswerItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../slices/store";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router-dom";
import HasQuestionExpired from "../../utils/HasQuestionExpired";
import { fetchViewedQuestion } from "../../stateManagement/thunks";
import { getViewedQuestion } from "../../constants/urls";
import { setViewedQuestion } from "../../slices/cachedQuestionSlice";

export default function QuestionDetailPage() {
    const { questionSlug } = useParams<{ questionSlug: string }>();

    const dispatch = useDispatch<AppDispatch>();
    const cachedQuestion = useSelector(
        (state: RootState) => state.cachedQuestions.byId[questionSlug || ""]
    );

    const lastFetched = useSelector(
        (state: RootState) =>
            state.cachedQuestions.lastFetched[questionSlug || ""]
    );

    const question = useSelector((state: RootState) => state.cachedQuestions.viewedQuestion);

    useEffect(() => {
        if (!cachedQuestion || HasQuestionExpired(lastFetched)) {
            dispatch(fetchViewedQuestion(getViewedQuestion + questionSlug));
        } else dispatch(setViewedQuestion(cachedQuestion));
    
    }, [questionSlug, cachedQuestion, lastFetched, dispatch]);

    if (!questionSlug)
        return <Typography variant="body1">PAGE NOT FOUND</Typography>;

    return (
        <>
            {question ? (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                {question.questionTitle}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={3}
                                sx={{
                                    mb: 2,
                                    color: "text.secondary",
                                    fontSize: "0.875rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <AccessTime fontSize="small" />
                                    <span>Asked {question.createdAt}</span>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <span>Modified {question.updatedAt}</span>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <Visibility fontSize="small" />
                                    <span>Viewed {question.views} times</span>
                                </Box>
                            </Stack>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Box
                            sx={{
                                mb: 3,
                                p: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{ mb: 1, color: "text.secondary" }}
                            >
                                Asked by
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Avatar
                                    src={question?.user.profileImageUrl}
                                    alt={question?.user.fullName}
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {question.user.fullName}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    minWidth: 60,
                                }}
                            >
                                <IconButton
                                    size="large"
                                    sx={{ color: "text.secondary" }}
                                >
                                    <ThumbUp />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600, my: 1 }}
                                >
                                    {question.votes}
                                </Typography>
                                <IconButton
                                    size="large"
                                    sx={{ color: "text.secondary" }}
                                >
                                    <ThumbDown />
                                </IconButton>
                                <IconButton
                                    sx={{ mt: 2, color: "text.secondary" }}
                                >
                                    <Bookmark />
                                </IconButton>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <MarkdownViewer
                                    content={question?.questionBody ?? ""}
                                />

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        marginBlock: 3,
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {question?.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                bgcolor: "#e3f2fd",
                                                borderColor: "#90caf9",
                                                color: "#1565c0",
                                                fontSize: "0.75rem",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                height: 24,
                                                "&:hover": {
                                                    bgcolor: "#bbdefb",
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        startIcon={<Share />}
                                        size="small"
                                        color="inherit"
                                    >
                                        Share
                                    </Button>
                                    <Button
                                        startIcon={<Flag />}
                                        size="small"
                                        color="inherit"
                                    >
                                        Flag
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, pl: 9 }}>
                            <Divider sx={{ mb: 2 }} />

                            <Typography
                                variant="body2"
                                sx={{ mb: 2, color: "text.secondary" }}
                            >
                                Add a comment
                            </Typography>

                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                placeholder="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments."
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />

                            <Button variant="outlined" size="small">
                                Add Comment
                            </Button>
                        </Box>
                    </Paper>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ mb: 3 }}>
                        {question.answers.length} Answer
                        {question.answers.length !== 1 ? "s" : ""}
                    </Typography>

                    <Stack spacing={3}>
                        {question.answers.map((answer) => (
                            <AnswerItem answer={answer} />
                        ))}
                    </Stack>
                </Container>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
