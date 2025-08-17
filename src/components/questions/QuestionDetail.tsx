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
    useMediaQuery,
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
import LoadingSpinner from "../LoadingSpinner";
import FindDateDifference from "../../utils/FindDateDifference";
import PendingIcon from "@mui/icons-material/Pending";
import CommentItem from "./CommentItem";
import useQuestionDetailPage from "../../hooks/useQuestionDetailPage";
import AddComment from "./AddComment";
import useSnackbar from "../../hooks/useSnackbar";
import GlobalSnackbar from "../Snackbar";
import { initialSnackbarState } from "../../constants/initialSnackbarState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearViewedQuestion } from "../../slices/cachedQuestionSlice";
import type { RootState } from "../../slices/store";
import AddAnswer from "./AddAnswer";
import { selectUserDto } from "../../stateManagement/selectors";
import type { UserDto } from "../../types/questions";

export default function QuestionDetailPage() {
    const isSmall = useMediaQuery("(max-width:507px)");
    const isXSmall = useMediaQuery("(max-width: 400px)");
    const { question, commentsToShow, setCommentsToShow } = useQuestionDetailPage();
    const { id, fullName, userSlug, profileImageUrl } = useSelector(selectUserDto);
    const { isSnackbarOpen, snackbarMessage, snackbarSeverity, setSnackbarState } = useSnackbar();
    const dispatch = useDispatch();

    const user: UserDto = {
        id: id,
        fullName: fullName,
        userSlug: userSlug,
        profileImageUrl: profileImageUrl ?? ""
    }

    useEffect(() => {

        return () => {
            dispatch(clearViewedQuestion({}));
        }

    }, []);

    return (
        <>
            <GlobalSnackbar
                open={isSnackbarOpen}
                handleClose={() => setSnackbarState(initialSnackbarState)}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />

            {question ? (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Paper elevation={0} sx={{p: 3,border: "1px solid",borderColor: "divider"}}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant={isSmall ? "h6" : "h4"} component="h1" sx={{ mb: 2, fontWeight: 600 }}>
                                {question.questionTitle}
                            </Typography>

                            <Stack
                                direction={isXSmall ? "column" : "row"}
                                spacing={3}
                                sx={{mb: 2,color: "text.secondary",fontSize: "0.875rem"}}>
                                
                                <Box sx={{display: "flex",alignItems: "center",gap: 0.5}}>
                                    <AccessTime fontSize="small" />
                                    <span>
                                        Asked{" "}
                                        {FindDateDifference(
                                            new Date(
                                                question.createdAt
                                            ).getTime()
                                        )}
                                    </span>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <span>
                                        Modified{" "}
                                        {FindDateDifference(
                                            new Date(
                                                question.updatedAt
                                            ).getTime()
                                        )}
                                    </span>
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
                            <Box display={"flex"} alignItems={"center"} gap={0.4} mb={1}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    Asked by 
                                </Typography>

                                {question.user.id === id && <Typography color="success"
                                    fontWeight={"bold"} variant="subtitle2">(Your Question)</Typography>}
                            </Box>

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

                        <Box sx={{ display: "flex", flexDirection: isSmall ? "column" : "row", gap: 3 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: isSmall ? "row" : "column",
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
                                    sx={{ mt: isSmall ? 0 : 2, color: "text.secondary" }}
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
                                            sx={{ bgcolor: "#e3f2fd", borderColor: "#90caf9",
                                                color: "#1565c0", fontSize: "0.75rem", fontWeight: "bold", cursor: "pointer", height: 24, "&:hover": { bgcolor: "#bbdefb",},}}
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

                        <Box sx={{ mt: 4, pl: isSmall ? 4 : 9 }}>
                            <Divider sx={{ mb: 2 }} />

                            {question.comments
                                .slice(0, commentsToShow)
                                .map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}

                            {commentsToShow < question.comments.length && (
                                <Typography
                                    variant="subtitle2"
                                    onClick={() =>
                                        setCommentsToShow((prev) => prev + 3)
                                    }
                                    sx={{
                                        mb: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        cursor: "pointer",
                                    }}
                                >
                                    <PendingIcon /> Load more comments.
                                </Typography>
                            )}

                            <AddComment questionId={question.id} setSnackbarState={setSnackbarState} user={user} />
                        </Box>
                    </Paper>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ mb: 3 }}>
                        {question.answers.length} Answer
                        {question.answers.length !== 1 ? "s" : ""}
                    </Typography>

                    <Stack spacing={3}>
                        {question.answers.map((answer) => (
                            <AnswerItem key={answer.id} answer={answer} setSnackbarState={setSnackbarState} />
                        ))}
                    </Stack>

                    <AddAnswer setSnackbarState={setSnackbarState} questionId={question.id} />

                </Container>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
