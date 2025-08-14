import { Avatar, Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import type { AnswerDto } from "../../types/questions";
import { Check, Flag, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import MarkdownViewer from "../profile/MarkdownViewer";

export default function AnswerItem({ answer }: {answer: AnswerDto}) {
    return (
        <Paper
            key={answer.id}
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderLeft: answer.isAccepted ? "4px solid" : "1px solid",
                borderLeftColor: answer.isAccepted ? "success.main" : "divider",
            }}
        >
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
                    Answered by
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        src={answer.user.profileImageUrl}
                        alt={answer.user.fullName}
                        sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {answer.user.fullName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                        >
                            answered {answer.createdAt}
                            {answer.lastEdited &&
                                ` • edited ${answer.lastEdited}`}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
                {/* Answer Vote Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 60,
                    }}
                >
                    <IconButton size="large" sx={{ color: "text.secondary" }}>
                        <ThumbUp />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600, my: 1 }}>
                        {answer.upVotes}
                    </Typography>
                    <IconButton size="large" sx={{ color: "text.secondary" }}>
                        <ThumbDown />
                    </IconButton>
                    {answer.isAccepted && (
                        <Box sx={{ mt: 2, color: "success.main" }}>
                            <Check fontSize="large" />
                        </Box>
                    )}
                </Box>

                {/* Answer Content */}
                <Box sx={{ flex: 1 }}>
                    <MarkdownViewer content={answer.content} />

                    {/* Answer Actions */}
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
        </Paper>
    );
}
