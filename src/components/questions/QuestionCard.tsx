"use client";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Avatar,
    Stack,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { ThumbUp, Visibility, AccessTime } from "@mui/icons-material";
import type { QuestionDto } from "../../types/questions";
import MarkdownViewer from "../profile/MarkdownViewer";
import FindDateDifference from "../../utils/FindDateDifference";
import { Link } from "react-router-dom";

interface QuestionCardProps {
    question: QuestionDto;
    handleMouseEnter: (questionSlug: string) => void;
    handleMouseLeave: () => void;
}

export default function QuestionCard({ question, handleMouseEnter, handleMouseLeave }: QuestionCardProps) {
    const isSmall = useMediaQuery("(max-width: 500px)");

    return (
        <Card
            onMouseEnter={() => handleMouseEnter(question.questionSlug)}
            onMouseLeave={handleMouseLeave}
            sx={{
                mb: 2,
                border: "1px solid #e0e0e0",
                "&:hover": {
                    boxShadow: 3,
                    borderColor: "#1976d2",
                },
                transition: "all 0.2s ease-in-out",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: isSmall ? "column-reverse" : "row",
                    }}
                >
                    {/* Stats Column */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isSmall ? "row" : "column",
                            alignItems: "center",
                            minWidth: 80,
                            gap: isSmall ? 3 : 1,
                        }}
                    >
                        {/* Votes */}
                        <Box sx={{ textAlign: "center" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <IconButton size="small" sx={{ p: 0.5 }}>
                                    <ThumbUp fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color:
                                        question.votes > 0
                                            ? "success.main"
                                            : "text.secondary",
                                }}
                            >
                                {question.votes}
                            </Typography>
                            <Typography variant="caption">votes</Typography>
                        </Box>

                        {/* Answers */}
                        <Box sx={{ textAlign: "center" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: question.isResolved
                                        ? "success.main"
                                        : "grey.300",
                                    color: question.isResolved
                                        ? "white"
                                        : "text.secondary",
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.5,
                                    minWidth: 40,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {question.answersCount}
                                </Typography>
                            </Box>
                            <Typography variant="caption">answers</Typography>
                        </Box>

                        {/* Views */}
                        <Box sx={{ textAlign: "center" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    justifyContent: "center",
                                }}
                            >
                                <Visibility fontSize="small" color="disabled" />
                                <Typography variant="body2">
                                    {question.views}
                                </Typography>
                            </Box>
                            <Typography variant="caption">views</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>

                        <Link to={question.questionSlug}>
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{mb: 1,color: "#1976d2",cursor: "pointer","&:hover": {color: "#1565c0",},
                                    fontWeight: 500,
                                    lineHeight: 1.3,}}>

                                {question.questionTitle}

                        </Typography>
                        </Link>

                        <Box mb={2}>
                            <MarkdownViewer
                                content={
                                    question.questionBody.slice(0, 247) + "..."
                                }
                            />
                        </Box>
                        {/* </Typography> */}

                        {/* Tags */}
                        <Box sx={{ mb: 2 }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                {question.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            bgcolor: "#e3f2fd",
                                            borderColor: "#90caf9",
                                            color: "#1565c0",
                                            fontSize: "0.75rem",
                                            height: 24,
                                            "&:hover": {
                                                bgcolor: "#bbdefb",
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {/* Author and Timestamp */}
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: isSmall ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: !isSmall ? "center" : "start",
                                gap: 2,
                            }}
                        >
                            <Link to={`/profile/${question.user.userSlug}`}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Avatar
                                        src={question.user.profileImageUrl}
                                        alt={question.user.fullName}
                                        sx={{ width: 24, height: 24 }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: "#1976d2",
                                            }}
                                        >
                                            {question.user.fullName}
                                        </Typography>
                                        {/* <Typography
                                        variant="caption"
                                    >
                                        {question.userDto.reputation.toLocaleString()}{" "}
                                        reputation
                                    </Typography> */}
                                    </Box>
                                </Box>
                            </Link>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <AccessTime fontSize="small" color="disabled" />
                                <Typography variant="caption">
                                    Created{" "}
                                    {FindDateDifference(
                                        new Date(question.createdAt).getTime()
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
